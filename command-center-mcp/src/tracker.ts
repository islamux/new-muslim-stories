import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface ProjectMeta {
  name: string;
  start_date: string;
  target_date: string;
  current_week: number;
  schedule_status: 'on_track' | 'behind' | 'ahead';
  overall_progress: number;
}

export interface Subtask {
  id: string;
  label: string;
  status: 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';
  done: boolean;
  assignee: string | null;
  blocked_by: string | null;
  blocked_reason: string | null;
  completed_at: string | null;
  completed_by: string | null;
  priority: string;
  notes: string | null;
  prompt: string | null;
  context_files: string[];
  reference_docs: string[];
  acceptance_criteria: string[];
  constraints: string[];
  agent_target: string | null;
  execution_mode: 'human' | 'agent' | 'pair';
  depends_on: string[];
  last_run_id: string | null;
  builder_prompt: string | null;
}

export interface Milestone {
  id: string;
  title: string;
  domain: string;
  week: number;
  phase: string;
  planned_start: string | null;
  planned_end: string | null;
  actual_start: string | null;
  actual_end: string | null;
  drift_days: number;
  is_key_milestone: boolean;
  key_milestone_label: string | null;
  subtasks: Subtask[];
  dependencies: string[];
  notes: string[];
}

export interface Agent {
  id: string;
  name: string;
  type: 'orchestrator' | 'sub-agent' | 'human' | 'external';
  parent_id?: string;
  color: string;
  status: string;
  permissions: string[];
  last_action_at: string | null;
  session_action_count: number;
}

export interface AgentLogEntry {
  id: string;
  agent_id: string;
  action: string;
  target_type: 'subtask' | 'milestone' | 'agent';
  target_id: string;
  description: string;
  timestamp: string;
  tags: string[];
}

export interface Phase {
  id: string;
  title: string;
  start_week: number;
  end_week: number;
}

export interface Schedule {
  phases: Phase[];
}

export interface TrackerState {
  project: ProjectMeta;
  milestones: Milestone[];
  agents: Agent[];
  agent_log: AgentLogEntry[];
  schedule: Schedule;
}

function getTrackerPath(): string {
  const projectRoot = process.env.PROJECT_ROOT || process.cwd();
  return join(projectRoot, 'project-tracker.json');
}

export function readTracker(): TrackerState {
  const path = getTrackerPath();
  if (!existsSync(path)) {
    throw new Error(`Tracker file not found at ${path}`);
  }
  const content = readFileSync(path, 'utf-8');
  return JSON.parse(content);
}

export function writeTracker(state: TrackerState): void {
  const path = getTrackerPath();
  
  // Recompute derived fields
  const total = state.milestones.reduce((s, m) => s + m.subtasks.length, 0);
  const done = state.milestones.reduce((s, m) => s + m.subtasks.filter(t => t.done).length, 0);
  state.project.overall_progress = total > 0 ? done / total : 0;
  
  // Calculate current week
  const start = new Date(state.project.start_date);
  const now = new Date();
  const diffDays = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  const totalWeeks = Math.ceil((new Date(state.project.target_date).getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7));
  state.project.current_week = Math.max(1, Math.min(totalWeeks, Math.floor(diffDays / 7) + 1));
  
  // Calculate schedule status
  const drifts = state.milestones.map(m => m.drift_days);
  if (drifts.length > 0) {
    if (Math.max(...drifts) > 3) state.project.schedule_status = 'behind';
    else if (Math.min(...drifts) < -3) state.project.schedule_status = 'ahead';
    else state.project.schedule_status = 'on_track';
  }
  
  writeFileSync(path, JSON.stringify(state, null, 2));
}

export function findTask(state: TrackerState, taskId: string): { subtask: Subtask; milestone: Milestone } | null {
  for (const milestone of state.milestones) {
    const subtask = milestone.subtasks.find(t => t.id === taskId);
    if (subtask) return { subtask, milestone };
  }
  return null;
}

export function touchAgent(state: TrackerState, agentId: string = 'orchestrator'): void {
  const agent = state.agents.find(a => a.id === agentId);
  if (agent) {
    agent.last_action_at = new Date().toISOString();
    agent.session_action_count += 1;
    agent.status = 'active';
  }
}

export function autoUnblockDependents(state: TrackerState, completedTaskId: string, completedMilestoneId: string): string[] {
  const unblocked: string[] = [];
  
  // Find dependent tasks
  for (const milestone of state.milestones) {
    for (const task of milestone.subtasks) {
      if (task.status === 'blocked' && task.depends_on.includes(completedTaskId)) {
        // Check if all dependencies are done
        const allDepsDone = task.depends_on.every(depId => {
          const dep = findTask(state, depId);
          return dep?.subtask.status === 'done';
        });
        
        if (allDepsDone) {
          task.status = 'todo';
          task.blocked_by = null;
          task.blocked_reason = null;
          unblocked.push(task.id);
        }
      }
    }
  }
  
  return unblocked;
}