#!/usr/bin/env node
import { readTracker, writeTracker, findTask, touchAgent, TrackerState, Milestone, Subtask, Agent } from './tracker.js';
import { buildTaskContext, buildTaskSummary, buildProjectStatus, buildMilestoneOverview } from './context.js';

function error(msg: string): never {
  console.error(msg);
  process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command) {
    console.log(`Usage: command-center <command> [args...]
Commands:
  get-project-status
  get-task-context <task_id>
  get-task-summary <task_id>
  get-milestone-overview <milestone_id>
  list-tasks [--milestone <id>] [--status <status>] [--domain <name>]
  list-agents
  get-activity-feed [--agent <id>] [--limit <n>]
  start-task <task_id> [--agent <id>]
  complete-task <task_id> "<summary>" [--agent <id>]
  approve-task <task_id> [--feedback <text>] [--operator <id>]
  reject-task <task_id> "<feedback>" [--operator <id>]
  reset-task <task_id>
  block-task <task_id> "<reason>" [--agent <id>]
  unblock-task <task_id> [--resolution <text>] [--agent <id>]
  update-task <task_id> [--priority P1|P2|P3|P4] [--assignee <name>] [--execution_mode human|agent|pair] [--notes <text>]
  log-action <target_id> <action> "<description>" [--tags tag1,tag2]
  enrich-task <task_id> [--prompt <text>] [--acceptance_criteria a,b] [--constraints a,b]
  add-milestone-note <milestone_id> "<note>"
  set-milestone-dates <milestone_id> [--actual_start YYYY-MM-DD] [--actual_end YYYY-MM-DD]
  update-drift <milestone_id> <days>
  create-milestone <id> "<title>" [--domain <name>] [--phase <name>] [--planned_start YYYY-MM-DD] [--planned_end YYYY-MM-DD]
  add-milestone-task <milestone_id> "<label>" [--priority P1|P2|P3|P4] [--execution_mode human|agent|pair]
  register-agent <id> <name> <type> --permissions read,write [--color #hex] [--parent <id>]
`);
    process.exit(1);
  }
  
  try {
    const state = readTracker();
    let result = '';
    
    // Parse common args
    const getArg = (flag: string, defaultVal?: string): string | undefined => {
      const idx = args.indexOf(flag);
      return idx >= 0 && args[idx + 1] ? args[idx + 1] : defaultVal;
    };
    const hasFlag = (flag: string): boolean => args.includes(flag);
    
    switch (command) {
      case 'get-project-status':
        result = buildProjectStatus(state);
        break;
      
      case 'get-task-context': {
        const taskId = args[1];
        if (!taskId) error('Usage: get-task-context <task_id>');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const resultContext = buildTaskContext(state, found.subtask, found.milestone);
        result = resultContext;
        break;
      }
      
      case 'get-task-summary': {
        const taskId = args[1];
        if (!taskId) error('Usage: get-task-summary <task_id>');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const resultSummary = buildTaskSummary(state, found.subtask, found.milestone);
        result = resultSummary;
        break;
      }
      
      case 'get-milestone-overview': {
        const milestoneId = args[1];
        if (!milestoneId) error('Usage: get-milestone-overview <milestone_id>');
        const milestone = state.milestones.find(m => m.id === milestoneId);
        if (!milestone) error(`Milestone '${milestoneId}' not found`);
        const milestoneOverview = buildMilestoneOverview(milestone, state);
        result = milestoneOverview;
        break;
      }
      
      case 'list-tasks': {
        const milestoneFilter = getArg('--milestone');
        const statusFilter = getArg('--status');
        const domainFilter = getArg('--domain');
        let tasks = state.milestones.flatMap(m => m.subtasks.map(t => ({ ...t, _milestone: m })));
        if (milestoneFilter) tasks = tasks.filter(t => t._milestone.id === milestoneFilter);
        if (statusFilter) tasks = tasks.filter(t => t.status === statusFilter);
        if (domainFilter) tasks = tasks.filter(t => t._milestone.domain === domainFilter);
        result = '# Tasks\n';
        for (const task of tasks) {
          const icon = task.status === 'done' ? '✓' : task.status === 'in_progress' ? '→' : task.status === 'blocked' ? '⊘' : task.status === 'review' ? '?' : '○';
          result += `- ${icon} [${task.priority}] ${task.id}: ${task.label} (${task._milestone.id})\n`;
        }
        break;
      }
      
      case 'list-agents':
        result = '# Agents\n';
        for (const agent of state.agents) {
          const isActive = agent.last_action_at && (Date.now() - new Date(agent.last_action_at).getTime()) < 30 * 60 * 1000;
          result += `- ${agent.name} (${agent.id})\n`;
          result += `  Status: ${isActive ? 'ACTIVE' : 'IDLE'}\n`;
          result += `  Permissions: ${agent.permissions.join(', ')}\n`;
          result += `  Actions: ${agent.session_action_count}\n`;
        }
        break;
      
      case 'get-activity-feed': {
        const agentFilter = getArg('--agent');
        const limit = parseInt(getArg('--limit', '30') || '30');
        let logs = state.agent_log.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
        if (agentFilter) logs = logs.filter(l => l.agent_id === agentFilter);
        logs = logs.slice(0, limit);
        result = '# Activity Feed\n';
        let currentDate = '';
        for (const entry of logs) {
          const date = entry.timestamp.split('T')[0];
          if (date !== currentDate) {
            currentDate = date;
            result += `\n## ${date}\n`;
          }
          result += `- ${entry.timestamp.split('T')[1].slice(0,5)} ${entry.agent_id}: ${entry.action}\n`;
          result += `  ${entry.description}\n`;
        }
        break;
      }
      
      case 'start-task': {
        const taskId = args[1];
        if (!taskId) error('Usage: start-task <task_id>');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const agentId = getArg('--agent', 'orchestrator')!;
        const subtask = found.subtask;
        const milestone = found.milestone;
        
        subtask.status = 'in_progress';
        subtask.last_run_id = 'run_' + Date.now();
        if (!subtask.assignee) subtask.assignee = agentId;
        if (!milestone.actual_start) {
          milestone.actual_start = new Date().toISOString().split('T')[0];
          if (milestone.planned_start) {
            const planned = new Date(milestone.planned_start);
            milestone.drift_days = Math.round((new Date().getTime() - planned.getTime()) / (1000 * 60 * 60 * 24));
          }
        }
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: agentId,
          action: 'task_started',
          target_type: 'subtask',
          target_id: subtask.id,
          description: `Started task ${subtask.id}`,
          timestamp: new Date().toISOString(),
          tags: ['start', 'mcp']
        });
        
        touchAgent(state, agentId);
        writeTracker(state);
        result = `Started ${subtask.id}`;
        break;
      }
      
      case 'complete-task': {
        const taskId = args[1];
        const summary = args[2];
        if (!taskId || !summary) error('Usage: complete-task <task_id> "<summary>"');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const agentId = getArg('--agent', 'orchestrator')!;
        const { subtask, milestone } = found;
        
        subtask.status = 'review';
        subtask.blocked_by = null;
        subtask.blocked_reason = null;
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: agentId,
          action: 'task_submitted_for_review',
          target_type: 'subtask',
          target_id: subtask.id,
          description: summary,
          timestamp: new Date().toISOString(),
          tags: ['review', 'mcp']
        });
        
        touchAgent(state, agentId);
        writeTracker(state);
        
        const done = milestone.subtasks.filter(t => t.done).length;
        const total = milestone.subtasks.length;
        result = `Submitted ${subtask.id} for review. Milestone: ${done}/${total}`;
        break;
      }
      
      case 'approve-task': {
        const taskId = args[1];
        if (!taskId) error('Usage: approve-task <task_id>');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const { subtask, milestone } = found;
        if (subtask.status !== 'review') error(`Task '${taskId}' is in status '${subtask.status}', expected 'review'`);
        const operatorId = getArg('--operator', 'operator')!;
        const feedback = getArg('--feedback', '') || '';
        
        subtask.status = 'done';
        subtask.done = true;
        subtask.completed_at = new Date().toISOString();
        subtask.completed_by = operatorId;
        
        const allDone = milestone.subtasks.every(t => t.done);
        if (allDone) milestone.actual_end = new Date().toISOString().split('T')[0];
        
        for (const ms of state.milestones) {
          for (const task of ms.subtasks) {
            if (task.status === 'blocked' && task.depends_on.includes(subtask.id)) {
              const allDepsDone = task.depends_on.every(depId => {
                const dep = findTask(state, depId);
                return dep?.subtask.status === 'done';
              });
              if (allDepsDone) {
                task.status = 'todo';
                task.blocked_by = null;
                task.blocked_reason = null;
              }
            }
          }
        }
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: operatorId,
          action: 'task_approved',
          target_type: 'subtask',
          target_id: subtask.id,
          description: feedback,
          timestamp: new Date().toISOString(),
          tags: ['approved']
        });
        
        touchAgent(state, operatorId);
        writeTracker(state);
        result = `Approved ${subtask.id}`;
        break;
      }
      
      case 'reject-task': {
        const taskId = args[1];
        const feedback = args[2];
        if (!taskId || !feedback) error('Usage: reject-task <task_id> "<feedback>"');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const { subtask } = found;
        if (subtask.status !== 'review') error(`Task '${taskId}' is in status '${subtask.status}', expected 'review'`);
        const operatorId = getArg('--operator', 'operator')!;
        const revisions = state.agent_log.filter(e => e.target_id === subtask.id && e.action === 'revision_requested').length;
        
        subtask.status = 'in_progress';
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: operatorId,
          action: 'revision_requested',
          target_type: 'subtask',
          target_id: subtask.id,
          description: `Revision ${revisions + 1}: ${feedback}`,
          timestamp: new Date().toISOString(),
          tags: ['revision']
        });
        
        touchAgent(state, operatorId);
        writeTracker(state);
        result = `Revision ${revisions + 1} requested for ${subtask.id}`;
        break;
      }
      
      case 'reset-task': {
        const taskId = args[1];
        if (!taskId) error('Usage: reset-task <task_id>');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const { subtask } = found;
        const prevStatus = subtask.status;
        
        subtask.status = 'todo';
        subtask.done = false;
        subtask.assignee = null;
        subtask.blocked_by = null;
        subtask.blocked_reason = null;
        subtask.completed_at = null;
        subtask.completed_by = null;
        subtask.last_run_id = null;
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: 'system',
          action: 'task_reset',
          target_type: 'subtask',
          target_id: subtask.id,
          description: `Reset from ${prevStatus} to todo`,
          timestamp: new Date().toISOString(),
          tags: ['reset']
        });
        
        writeTracker(state);
        result = `Reset ${subtask.id} from ${prevStatus} to todo`;
        break;
      }
      
      case 'block-task': {
        const taskId = args[1];
        const reason = args[2];
        if (!taskId || !reason) error('Usage: block-task <task_id> "<reason>"');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const agentId = getArg('--agent', 'orchestrator')!;
        const { subtask } = found;
        
        subtask.status = 'blocked';
        subtask.blocked_reason = reason;
        subtask.blocked_by = agentId;
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: agentId,
          action: 'task_blocked',
          target_type: 'subtask',
          target_id: subtask.id,
          description: reason,
          timestamp: new Date().toISOString(),
          tags: ['blocked']
        });
        
        touchAgent(state, agentId);
        writeTracker(state);
        result = `Blocked ${subtask.id}: ${reason}`;
        break;
      }
      
      case 'unblock-task': {
        const taskId = args[1];
        if (!taskId) error('Usage: unblock-task <task_id>');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const { subtask } = found;
        if (subtask.status !== 'blocked') error(`Task '${taskId}' is not blocked`);
        const agentId = getArg('--agent', 'orchestrator')!;
        const resolution = getArg('--resolution', '');
        const prevReason = subtask.blocked_reason;
        
        subtask.status = subtask.last_run_id ? 'in_progress' : 'todo';
        subtask.blocked_by = null;
        subtask.blocked_reason = null;
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: agentId,
          action: 'task_unblocked',
          target_type: 'subtask',
          target_id: subtask.id,
          description: resolution || `Resolved: ${prevReason}`,
          timestamp: new Date().toISOString(),
          tags: ['unblocked']
        });
        
        touchAgent(state, agentId);
        writeTracker(state);
        result = `Unblocked ${subtask.id}`;
        break;
      }
      
      case 'update-task': {
        const taskId = args[1];
        if (!taskId) error('Usage: update-task <task_id> [...]');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const agentId = getArg('--agent', 'orchestrator')!;
        const { subtask } = found;
        
        const changes: string[] = [];
        const priority = getArg('--priority');
        const assignee = getArg('--assignee');
        const executionMode = getArg('--execution_mode');
        const notes = getArg('--notes');
        
        if (priority && subtask.priority !== priority) {
          subtask.priority = priority;
          changes.push(`priority: ${priority}`);
        }
        if (assignee !== undefined) {
          subtask.assignee = assignee || null;
          changes.push(`assignee: ${assignee || 'unassigned'}`);
        }
        if (executionMode && subtask.execution_mode !== executionMode) {
          subtask.execution_mode = executionMode as 'human' | 'agent' | 'pair';
          changes.push(`execution_mode: ${executionMode}`);
        }
        if (notes !== undefined) {
          subtask.notes = notes || null;
          changes.push('notes updated');
        }
        
        if (changes.length) {
          state.agent_log.push({
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            agent_id: agentId,
            action: 'task_updated',
            target_type: 'subtask',
            target_id: subtask.id,
            description: `Updated: ${changes.join(', ')}`,
            timestamp: new Date().toISOString(),
            tags: ['updated']
          });
          
          touchAgent(state, agentId);
          writeTracker(state);
        }
        
        result = changes.length ? `Updated ${subtask.id}: ${changes.join(', ')}` : `No changes to ${subtask.id}`;
        break;
      }
      
      case 'log-action': {
        const targetId = args[1];
        const action = args[2];
        const description = args[3];
        if (!targetId || !action || !description) error('Usage: log-action <target_id> <action> "<description>"');
        const agentId = getArg('--agent', 'orchestrator')!;
        const tagStr = getArg('--tags', '');
        const tags = tagStr ? tagStr.split(',') : [];
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: agentId,
          action,
          target_type: 'subtask',
          target_id: targetId,
          description,
          timestamp: new Date().toISOString(),
          tags: [...tags, 'mcp']
        });
        
        touchAgent(state, agentId);
        writeTracker(state);
        result = `Logged: ${action}`;
        break;
      }
      
      case 'enrich-task': {
        const taskId = args[1];
        if (!taskId) error('Usage: enrich-task <task_id> [...]');
        const found = findTask(state, taskId);
        if (!found) error(`Task '${taskId}' not found`);
        const agentId = getArg('--agent', 'orchestrator')!;
        const prompt = getArg('--prompt');
        const acceptanceStr = getArg('--acceptance_criteria');
        const constraintsStr = getArg('--constraints');
        const { subtask } = found;
        
        const changes: string[] = [];
        if (prompt !== undefined) {
          subtask.prompt = prompt || null;
          changes.push('prompt');
        }
        if (acceptanceStr) {
          subtask.acceptance_criteria = acceptanceStr.split(',');
          changes.push('acceptance_criteria');
        }
        if (constraintsStr) {
          subtask.constraints = constraintsStr.split(',');
          changes.push('constraints');
        }
        
        if (changes.length) {
          state.agent_log.push({
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            agent_id: agentId,
            action: 'task_enriched',
            target_type: 'subtask',
            target_id: subtask.id,
            description: `Enriched: ${changes.join(', ')}`,
            timestamp: new Date().toISOString(),
            tags: ['enriched']
          });
          
          touchAgent(state, agentId);
          writeTracker(state);
        }
        
        result = changes.length ? `Enriched ${subtask.id}: ${changes.join(', ')}` : `No enrichment for ${subtask.id}`;
        break;
      }
      
      case 'add-milestone-note': {
        const milestoneId = args[1];
        const note = args[2];
        if (!milestoneId || !note) error('Usage: add-milestone-note <milestone_id> "<note>"');
        const milestone = state.milestones.find(m => m.id === milestoneId);
        if (!milestone) error(`Milestone '${milestoneId}' not found`);
        
        milestone.notes.push(note);
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: 'system',
          action: 'milestone_note_added',
          target_type: 'milestone',
          target_id: milestone.id,
          description: note,
          timestamp: new Date().toISOString(),
          tags: ['note']
        });
        
        writeTracker(state);
        result = `Added note to ${milestone.id} (${milestone.notes.length} total)`;
        break;
      }
      
      case 'set-milestone-dates': {
        const milestoneId = args[1];
        if (!milestoneId) error('Usage: set-milestone-dates <milestone_id> [...]');
        let milestone = state.milestones.find(m => m.id === milestoneId);
        if (!milestone) error(`Milestone '${milestoneId}' not found`);
        const actualStart = getArg('--actual_start');
        const actualEnd = getArg('--actual_end');
        const ms = milestone;
        
        if (actualStart) {
          ms.actual_start = actualStart;
          if (ms.planned_start) {
            const planned = new Date(ms.planned_start);
            const actual = new Date(actualStart);
            ms.drift_days = Math.round((actual.getTime() - planned.getTime()) / (1000 * 60 * 60 * 24));
          }
        }
        if (actualEnd) ms.actual_end = actualEnd;
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: 'system',
          action: 'milestone_dates_set',
          target_type: 'milestone',
          target_id: ms.id,
          description: `Set dates: ${ms.actual_start} - ${ms.actual_end}`,
          timestamp: new Date().toISOString(),
          tags: ['dates']
        });
        
        writeTracker(state);
        result = `Updated ${ms.id}: drift ${ms.drift_days} days`;
        break;
      }
      
      case 'update-drift': {
        const milestoneId = args[1];
        const driftDays = parseInt(args[2]);
        if (!milestoneId || isNaN(driftDays)) error('Usage: update-drift <milestone_id> <days>');
        let milestone = state.milestones.find(m => m.id === milestoneId);
        if (!milestone) error(`Milestone '${milestoneId}' not found`);
        const ms = milestone;
        
        const old = ms.drift_days;
        ms.drift_days = driftDays;
        
        const drifts = state.milestones.map(m => m.drift_days);
        if (drifts.length > 0) {
          if (Math.max(...drifts) > 3) state.project.schedule_status = 'behind';
          else if (Math.min(...drifts) < -3) state.project.schedule_status = 'ahead';
          else state.project.schedule_status = 'on_track';
        }
        
        state.agent_log.push({
          id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          agent_id: 'system',
          action: 'drift_updated',
          target_type: 'milestone',
          target_id: ms.id,
          description: `Drift: ${old} → ${driftDays}`,
          timestamp: new Date().toISOString(),
          tags: ['drift']
        });
        
        writeTracker(state);
        result = `Updated ${ms.id} drift: ${old} → ${driftDays}`;
        break;
      }
      
      case 'create-milestone': {
        const id = args[1];
        const title = args[2];
        if (!id || !title) error('Usage: create-milestone <id> "<title>" [...]');
        if (state.milestones.find(m => m.id === id)) error(`Milestone '${id}' already exists`);
        
        const milestone: Milestone = {
          id,
          title,
          domain: getArg('--domain', 'general')!,
          phase: getArg('--phase', id)!,
          week: state.milestones.length + 1,
          planned_start: getArg('--planned_start') || null,
          planned_end: getArg('--planned_end') || null,
          actual_start: null,
          actual_end: null,
          drift_days: 0,
          is_key_milestone: false,
          key_milestone_label: null,
          subtasks: [],
          dependencies: [],
          notes: []
        };
        
        state.milestones.push(milestone);
        writeTracker(state);
        result = `Created milestone ${milestone.id}`;
        break;
      }
      
      case 'add-milestone-task': {
        const milestoneId = args[1];
        const label = args[2];
        if (!milestoneId || !label) error('Usage: add-milestone-task <milestone_id> "<label>" [...]');
        let milestone = state.milestones.find(m => m.id === milestoneId);
        if (!milestone) error(`Milestone '${milestoneId}' not found`);
        const ms = milestone;
        
        const taskNum = String(ms.subtasks.length + 1).padStart(3, '0');
        const task: Subtask = {
          id: `${ms.id}_${taskNum}`,
          label,
          status: 'todo',
          done: false,
          assignee: null,
          blocked_by: null,
          blocked_reason: null,
          completed_at: null,
          completed_by: null,
          priority: getArg('--priority', 'P2')!,
          notes: null,
          prompt: null,
          context_files: [],
          reference_docs: [],
          acceptance_criteria: [],
          constraints: [],
          agent_target: null,
          execution_mode: getArg('--execution_mode', 'agent') as 'human' | 'agent' | 'pair',
          depends_on: [],
          last_run_id: null,
          builder_prompt: null
        };
        
        ms.subtasks.push(task);
        writeTracker(state);
        result = `Created task ${task.id}`;
        break;
      }
      
      case 'register-agent': {
        const agentId = args[1];
        const name = args[2];
        const type = args[3];
        if (!agentId || !name || !type) error('Usage: register-agent <id> <name> <type> --permissions read,write');
        
        const permissionsStr = getArg('--permissions', 'read,write') ?? 'read,write';
        const permissions = permissionsStr.split(',');
        const color = getArg('--color', '#9B9BAA')!;
        const parentId = getArg('--parent');
        
        const existing = state.agents.find(a => a.id === agentId);
        
        if (existing) {
          existing.name = name;
          existing.type = type as 'orchestrator' | 'sub-agent' | 'human' | 'external';
          existing.permissions = permissions;
          existing.color = color;
          if (parentId) existing.parent_id = parentId;
          existing.status = 'active';
          existing.last_action_at = new Date().toISOString();
          
          state.agent_log.push({
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            agent_id: agentId,
            action: 'agent_updated',
            target_type: 'agent',
            target_id: existing.id,
            description: `Updated agent ${name}`,
            timestamp: new Date().toISOString(),
            tags: ['update']
          });
        } else {
          const newAgent: Agent = {
            id: agentId,
            name,
            type: type as 'orchestrator' | 'sub-agent' | 'human' | 'external',
            color,
            status: 'active',
            permissions,
            last_action_at: new Date().toISOString(),
            session_action_count: 0
          };
          if (parentId) newAgent.parent_id = parentId;
          
          state.agents.push(newAgent);
          
          state.agent_log.push({
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            agent_id: agentId,
            action: 'agent_registered',
            target_type: 'agent',
            target_id: newAgent.id,
            description: `Registered agent ${name}`,
            timestamp: new Date().toISOString(),
            tags: ['registered']
          });
        }
        
        writeTracker(state);
        result = `Registered agent ${name} (${agentId})`;
        break;
      }
      
      default:
        error(`Unknown command: ${command}`);
    }
    
    console.log(result);
  } catch (err) {
    error(err instanceof Error ? err.message : String(err));
  }
}

main();