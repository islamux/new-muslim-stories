import pino from 'pino';
export interface TrackerState {
    schemaVersion: number;
    project: ProjectMeta;
    milestones: Milestone[];
    agents: Agent[];
    agent_log: AgentLogEntry[];
    schedule: {
        phases: Phase[];
    };
}
export interface ProjectMeta {
    name: string;
    start_date: string;
    target_date: string;
    current_week: number;
    schedule_status: 'on_track' | 'behind' | 'ahead';
    overall_progress: number;
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
    target_type: string;
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
export interface FindTaskResult {
    subtask: Subtask;
    milestone: Milestone;
}
export declare const PROJECT_ROOT: string;
export declare const TRACKER_PATH: string;
declare const logger: pino.Logger<never, boolean>;
export { logger };
export declare function migrateTracker(state: any): TrackerState;
export declare function readTracker(): TrackerState;
export declare function writeTracker(state: TrackerState, toolName?: string): void;
export declare function findTask(state: TrackerState, taskId: string): FindTaskResult | null;
export declare function touchAgent(state: TrackerState, agentId?: string): void;
export declare function autoUnblockDependents(state: TrackerState, completedTaskId: string, completedMilestoneId: string): string[];
export declare function selectCurrentWeek(tracker: TrackerState): number;
export declare function selectCurrentWeekFractional(tracker: TrackerState): number;
export declare function selectCurrentPhase(tracker: TrackerState): string;
export declare function selectScheduleStatus(tracker: TrackerState): 'on_track' | 'behind' | 'ahead';
export declare function selectMilestoneProgress(milestone: Milestone): {
    done: number;
    total: number;
    pct: number;
};
export declare function generateTaskId(milestoneId: string, existingSubtasks: Subtask[]): string;
export declare function generateLogId(): string;
export declare function todayDateString(): string;
