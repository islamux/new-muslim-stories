import { readTracker, writeTracker, findTask, touchAgent, autoUnblockDependents } from './tracker.js';
import { buildTaskContext, buildTaskSummary, buildProjectStatus, buildMilestoneOverview } from './context.js';
function makeTool(name, description, inputSchema, handler) {
    return {
        name,
        description,
        inputSchema,
        handler
    };
}
// READ TOOLS
export const getTaskContextTool = makeTool('get_task_context', 'Get comprehensive context for a task', {
    type: 'object',
    properties: { task_id: { type: 'string', description: 'The subtask ID' } },
    required: ['task_id']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found in any milestone`, isError: true };
    return buildTaskContext(state, found.subtask, found.milestone);
});
export const getTaskSummaryTool = makeTool('get_task_summary', 'Get slim summary for a task', {
    type: 'object',
    properties: { task_id: { type: 'string', description: 'The subtask ID' } },
    required: ['task_id']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found in any milestone`, isError: true };
    return buildTaskSummary(state, found.subtask, found.milestone);
});
export const getProjectStatusTool = makeTool('get_project_status', 'Get overall project status', { type: 'object', properties: {} }, () => buildProjectStatus(readTracker()));
export const getMilestoneOverviewTool = makeTool('get_milestone_overview', 'Get overview for a milestone', {
    type: 'object',
    properties: { milestone_id: { type: 'string', description: 'The milestone ID' } },
    required: ['milestone_id']
}, (args) => {
    const state = readTracker();
    const milestone = state.milestones.find(m => m.id === args.milestone_id);
    if (!milestone)
        return { text: `Milestone '${args.milestone_id}' not found`, isError: true };
    return buildMilestoneOverview(milestone, state);
});
export const listTasksTool = makeTool('list_tasks', 'List tasks with optional filters', {
    type: 'object',
    properties: {
        milestone_id: { type: 'string' },
        status: { type: 'string', enum: ['todo', 'in_progress', 'review', 'done', 'blocked'] },
        domain: { type: 'string' }
    }
}, (args) => {
    const state = readTracker();
    let tasks = state.milestones.flatMap(m => m.subtasks.map(t => ({ ...t, _milestone: m })));
    if (args.milestone_id) {
        tasks = tasks.filter(t => t._milestone.id === args.milestone_id);
    }
    if (args.status) {
        tasks = tasks.filter(t => t.status === args.status);
    }
    if (args.domain) {
        tasks = tasks.filter(t => t._milestone.domain === args.domain);
    }
    let output = '# Tasks\n';
    for (const task of tasks) {
        const icon = task.status === 'done' ? '✓' : task.status === 'in_progress' ? '→' : task.status === 'blocked' ? '⊘' : task.status === 'review' ? '?' : '○';
        output += `- ${icon} [${task.priority}] ${task.id}: ${task.label} (${task._milestone.id})\n`;
    }
    return output;
});
export const getTaskHistoryTool = makeTool('get_task_history', 'Get history for a task', {
    type: 'object',
    properties: { task_id: { type: 'string', description: 'The subtask ID' } },
    required: ['task_id']
}, (args) => {
    const state = readTracker();
    const history = state.agent_log.filter(e => e.target_id === args.task_id);
    if (!history.length)
        return 'No history found';
    let output = '# Task History\n';
    for (const entry of history.sort((a, b) => b.timestamp.localeCompare(a.timestamp))) {
        output += `- ${entry.timestamp}: ${entry.action} by ${entry.agent_id}\n  ${entry.description}\n`;
    }
    return output;
});
export const listAgentsTool = makeTool('list_agents', 'List all registered agents', { type: 'object', properties: {} }, () => {
    const state = readTracker();
    let output = '# Agents\n';
    for (const agent of state.agents) {
        const isActive = agent.last_action_at &&
            (Date.now() - new Date(agent.last_action_at).getTime()) < 30 * 60 * 1000;
        output += `- ${agent.name} (${agent.id})\n`;
        output += `  Status: ${isActive ? 'ACTIVE' : 'IDLE'}\n`;
        output += `  Permissions: ${agent.permissions.join(', ')}\n`;
        output += `  Actions: ${agent.session_action_count}\n`;
    }
    return output;
});
export const getActivityFeedTool = makeTool('get_activity_feed', 'Get recent activity log', {
    type: 'object',
    properties: {
        agent_id: { type: 'string' },
        limit: { type: 'number', default: 30 }
    }
}, (args) => {
    const state = readTracker();
    let logs = state.agent_log.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    if (args.agent_id) {
        logs = logs.filter(l => l.agent_id === args.agent_id);
    }
    logs = logs.slice(0, args.limit || 30);
    let output = '# Activity Feed\n';
    let currentDate = '';
    for (const entry of logs) {
        const date = entry.timestamp.split('T')[0];
        if (date !== currentDate) {
            currentDate = date;
            output += `\n## ${date}\n`;
        }
        output += `- ${entry.timestamp.split('T')[1].slice(0, 5)} ${entry.agent_id}: ${entry.action}\n`;
        output += `  ${entry.description}\n`;
    }
    return output;
});
// WRITE TOOLS - Task Lifecycle
export const startTaskTool = makeTool('start_task', 'Start working on a task', {
    type: 'object',
    properties: {
        task_id: { type: 'string', description: 'The subtask ID' },
        agent_id: { type: 'string', default: 'orchestrator' }
    },
    required: ['task_id']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found`, isError: true };
    found.subtask.status = 'in_progress';
    found.subtask.last_run_id = 'run_' + Date.now();
    if (!found.subtask.assignee) {
        found.subtask.assignee = args.agent_id;
    }
    // Auto-stamp milestone
    if (!found.milestone.actual_start) {
        found.milestone.actual_start = new Date().toISOString().split('T')[0];
        const planned = found.milestone.planned_start ? new Date(found.milestone.planned_start) : null;
        if (planned) {
            found.milestone.drift_days = Math.round((new Date().getTime() - planned.getTime()) / (1000 * 60 * 60 * 24));
        }
    }
    // Log
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: args.agent_id,
        action: 'task_started',
        target_type: 'subtask',
        target_id: found.subtask.id,
        description: `Started task ${found.subtask.id}`,
        timestamp: new Date().toISOString(),
        tags: ['start', 'mcp']
    });
    touchAgent(state, args.agent_id);
    writeTracker(state);
    return `Started ${found.subtask.id} in milestone ${found.milestone.id}`;
});
export const completeTaskTool = makeTool('complete_task', 'Mark task as complete (for review)', {
    type: 'object',
    properties: {
        task_id: { type: 'string', description: 'The subtask ID' },
        summary: { type: 'string', description: 'Summary of work done' },
        agent_id: { type: 'string', default: 'orchestrator' }
    },
    required: ['task_id', 'summary']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found`, isError: true };
    found.subtask.status = 'review';
    found.subtask.blocked_by = null;
    found.subtask.blocked_reason = null;
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: args.agent_id,
        action: 'task_submitted_for_review',
        target_type: 'subtask',
        target_id: found.subtask.id,
        description: args.summary,
        timestamp: new Date().toISOString(),
        tags: ['review', 'mcp']
    });
    touchAgent(state, args.agent_id);
    writeTracker(state);
    const done = found.milestone.subtasks.filter(t => t.done).length;
    const total = found.milestone.subtasks.length;
    return `Submitted ${found.subtask.id} for review. Milestone: ${done}/${total}`;
});
export const approveTaskTool = makeTool('approve_task', 'Approve a completed task (operator only)', {
    type: 'object',
    properties: {
        task_id: { type: 'string', description: 'The subtask ID' },
        feedback: { type: 'string' },
        operator_id: { type: 'string', default: 'operator' }
    },
    required: ['task_id']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found`, isError: true };
    if (found.subtask.status !== 'review') {
        return { text: `Task '${args.task_id}' is in status '${found.subtask.status}', expected 'review'`, isError: true };
    }
    found.subtask.status = 'done';
    found.subtask.done = true;
    found.subtask.completed_at = new Date().toISOString();
    found.subtask.completed_by = args.operator_id;
    // Auto-stamp milestone
    const allDone = found.milestone.subtasks.every(t => t.done);
    if (allDone) {
        found.milestone.actual_end = new Date().toISOString().split('T')[0];
    }
    // Auto-unblock dependents
    const unblocked = autoUnblockDependents(state, found.subtask.id, found.milestone.id);
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: args.operator_id,
        action: 'task_approved',
        target_type: 'subtask',
        target_id: found.subtask.id,
        description: args.feedback || 'Approved',
        timestamp: new Date().toISOString(),
        tags: ['approved']
    });
    touchAgent(state, args.operator_id);
    writeTracker(state);
    const msg = `Approved ${found.subtask.id}`;
    return unblocked.length ? msg + `. Unblocked: ${unblocked.join(', ')}` : msg;
});
export const rejectTaskTool = makeTool('reject_task', 'Reject a task for revision', {
    type: 'object',
    properties: {
        task_id: { type: 'string', description: 'The subtask ID' },
        feedback: { type: 'string', description: 'What needs to change' },
        operator_id: { type: 'string', default: 'operator' }
    },
    required: ['task_id', 'feedback']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found`, isError: true };
    if (found.subtask.status !== 'review') {
        return { text: `Task '${args.task_id}' is in status '${found.subtask.status}', expected 'review'`, isError: true };
    }
    const revisions = state.agent_log.filter(e => e.target_id === found.subtask.id && e.action === 'revision_requested').length;
    found.subtask.status = 'in_progress';
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: args.operator_id,
        action: 'revision_requested',
        target_type: 'subtask',
        target_id: found.subtask.id,
        description: `Revision ${revisions + 1}: ${args.feedback}`,
        timestamp: new Date().toISOString(),
        tags: ['revision']
    });
    touchAgent(state, args.operator_id);
    writeTracker(state);
    return `Revision ${revisions + 1} requested for ${found.subtask.id}: ${args.feedback}`;
});
export const resetTaskTool = makeTool('reset_task', 'Reset a task to TODO', {
    type: 'object',
    properties: {
        task_id: { type: 'string', description: 'The subtask ID' }
    },
    required: ['task_id']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found`, isError: true };
    const prevStatus = found.subtask.status;
    found.subtask.status = 'todo';
    found.subtask.done = false;
    found.subtask.assignee = null;
    found.subtask.blocked_by = null;
    found.subtask.blocked_reason = null;
    found.subtask.completed_at = null;
    found.subtask.completed_by = null;
    found.subtask.last_run_id = null;
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: 'system',
        action: 'task_reset',
        target_type: 'subtask',
        target_id: found.subtask.id,
        description: `Reset from ${prevStatus} to todo`,
        timestamp: new Date().toISOString(),
        tags: ['reset']
    });
    writeTracker(state);
    return `Reset ${found.subtask.id} from ${prevStatus} to todo`;
});
export const blockTaskTool = makeTool('block_task', 'Block a task', {
    type: 'object',
    properties: {
        task_id: { type: 'string', description: 'The subtask ID' },
        reason: { type: 'string', description: 'Why the task is blocked' },
        agent_id: { type: 'string', default: 'orchestrator' }
    },
    required: ['task_id', 'reason']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found`, isError: true };
    found.subtask.status = 'blocked';
    found.subtask.blocked_reason = args.reason;
    found.subtask.blocked_by = args.agent_id;
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: args.agent_id,
        action: 'task_blocked',
        target_type: 'subtask',
        target_id: found.subtask.id,
        description: args.reason,
        timestamp: new Date().toISOString(),
        tags: ['blocked']
    });
    touchAgent(state, args.agent_id);
    writeTracker(state);
    return `Blocked ${found.subtask.id}: ${args.reason}`;
});
export const unblockTaskTool = makeTool('unblock_task', 'Unblock a task', {
    type: 'object',
    properties: {
        task_id: { type: 'string', description: 'The subtask ID' },
        resolution: { type: 'string' },
        agent_id: { type: 'string', default: 'orchestrator' }
    },
    required: ['task_id']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found`, isError: true };
    if (found.subtask.status !== 'blocked') {
        return { text: `Task '${args.task_id}' is not blocked`, isError: true };
    }
    const prevReason = found.subtask.blocked_reason;
    found.subtask.status = found.subtask.last_run_id ? 'in_progress' : 'todo';
    found.subtask.blocked_by = null;
    found.subtask.blocked_reason = null;
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: args.agent_id,
        action: 'task_unblocked',
        target_type: 'subtask',
        target_id: found.subtask.id,
        description: args.resolution || `Resolved: ${prevReason}`,
        timestamp: new Date().toISOString(),
        tags: ['unblocked']
    });
    touchAgent(state, args.agent_id);
    writeTracker(state);
    return `Unblocked ${found.subtask.id}`;
});
export const updateTaskTool = makeTool('update_task', 'Update task fields', {
    type: 'object',
    properties: {
        task_id: { type: 'string', description: 'The subtask ID' },
        priority: { type: 'string', enum: ['P1', 'P2', 'P3', 'P4'] },
        assignee: { type: 'string' },
        execution_mode: { type: 'string', enum: ['human', 'agent', 'pair'] },
        notes: { type: 'string' },
        agent_id: { type: 'string', default: 'orchestrator' }
    },
    required: ['task_id']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found`, isError: true };
    const changes = [];
    if (args.priority && found.subtask.priority !== args.priority) {
        found.subtask.priority = args.priority;
        changes.push(`priority: ${args.priority}`);
    }
    if (args.assignee !== undefined) {
        const assigneeVal = typeof args.assignee === 'string' ? args.assignee : null;
        found.subtask.assignee = assigneeVal;
        changes.push(`assignee: ${assigneeVal || 'unassigned'}`);
    }
    if (args.execution_mode && found.subtask.execution_mode !== args.execution_mode) {
        found.subtask.execution_mode = args.execution_mode;
        changes.push(`execution_mode: ${args.execution_mode}`);
    }
    if (args.notes !== undefined) {
        const notesVal = typeof args.notes === 'string' ? args.notes : null;
        found.subtask.notes = notesVal;
        changes.push('notes updated');
    }
    if (changes.length) {
        state.agent_log.push({
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            agent_id: args.agent_id,
            action: 'task_updated',
            target_type: 'subtask',
            target_id: found.subtask.id,
            description: `Updated: ${changes.join(', ')}`,
            timestamp: new Date().toISOString(),
            tags: ['updated']
        });
        touchAgent(state, args.agent_id);
        writeTracker(state);
    }
    return changes.length ? `Updated ${found.subtask.id}: ${changes.join(', ')}` : `No changes to ${found.subtask.id}`;
});
export const logActionTool = makeTool('log_action', 'Log an action to the activity feed', {
    type: 'object',
    properties: {
        target_id: { type: 'string' },
        action: { type: 'string' },
        description: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        agent_id: { type: 'string', default: 'orchestrator' }
    },
    required: ['target_id', 'action', 'description']
}, (args) => {
    const state = readTracker();
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: args.agent_id,
        action: args.action,
        target_type: 'subtask',
        target_id: args.target_id,
        description: args.description,
        timestamp: new Date().toISOString(),
        tags: [...(args.tags || []), 'mcp']
    });
    touchAgent(state, args.agent_id);
    writeTracker(state);
    return `Logged: ${args.action}`;
});
// Task Enrichment
export const enrichTaskTool = makeTool('enrich_task', 'Enrich task with additional details', {
    type: 'object',
    properties: {
        task_id: { type: 'string' },
        prompt: { type: 'string' },
        builder_prompt: { type: 'string' },
        acceptance_criteria: { type: 'array', items: { type: 'string' } },
        constraints: { type: 'array', items: { type: 'string' } },
        context_files: { type: 'array', items: { type: 'string' } },
        reference_docs: { type: 'array', items: { type: 'string' } },
        agent_id: { type: 'string', default: 'orchestrator' }
    },
    required: ['task_id']
}, (args) => {
    const state = readTracker();
    const found = findTask(state, args.task_id);
    if (!found)
        return { text: `Task '${args.task_id}' not found`, isError: true };
    const changes = [];
    if (args.prompt !== undefined) {
        found.subtask.prompt = args.prompt || null;
        changes.push('prompt');
    }
    if (args.builder_prompt !== undefined) {
        found.subtask.builder_prompt = args.builder_prompt || null;
        changes.push('builder_prompt');
    }
    if (args.acceptance_criteria !== undefined) {
        found.subtask.acceptance_criteria = args.acceptance_criteria || [];
        changes.push('acceptance_criteria');
    }
    if (args.constraints !== undefined) {
        found.subtask.constraints = args.constraints || [];
        changes.push('constraints');
    }
    if (args.context_files !== undefined) {
        found.subtask.context_files = args.context_files || [];
        changes.push('context_files');
    }
    if (args.reference_docs !== undefined) {
        found.subtask.reference_docs = args.reference_docs || [];
        changes.push('reference_docs');
    }
    if (changes.length) {
        state.agent_log.push({
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            agent_id: args.agent_id,
            action: 'task_enriched',
            target_type: 'subtask',
            target_id: found.subtask.id,
            description: `Enriched: ${changes.join(', ')}`,
            timestamp: new Date().toISOString(),
            tags: ['enriched']
        });
        touchAgent(state, args.agent_id);
        writeTracker(state);
    }
    return changes.length ? `Enriched ${found.subtask.id}: ${changes.join(', ')}` : `No enrichment for ${found.subtask.id}`;
});
// Milestone Management
export const addMilestoneNoteTool = makeTool('add_milestone_note', 'Add a note to a milestone', {
    type: 'object',
    properties: {
        milestone_id: { type: 'string' },
        note: { type: 'string' }
    },
    required: ['milestone_id', 'note']
}, (args) => {
    const state = readTracker();
    const milestone = state.milestones.find(m => m.id === args.milestone_id);
    if (!milestone)
        return { text: `Milestone '${args.milestone_id}' not found`, isError: true };
    milestone.notes.push(args.note);
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: 'system',
        action: 'milestone_note_added',
        target_type: 'milestone',
        target_id: milestone.id,
        description: args.note,
        timestamp: new Date().toISOString(),
        tags: ['note']
    });
    writeTracker(state);
    return `Added note to ${milestone.id} (${milestone.notes.length} total)`;
});
export const setMilestoneDatesTool = makeTool('set_milestone_dates', 'Set actual dates for a milestone', {
    type: 'object',
    properties: {
        milestone_id: { type: 'string' },
        actual_start: { type: 'string' },
        actual_end: { type: 'string' }
    },
    required: ['milestone_id']
}, (args) => {
    const state = readTracker();
    const milestone = state.milestones.find(m => m.id === args.milestone_id);
    if (!milestone)
        return { text: `Milestone '${args.milestone_id}' not found`, isError: true };
    if (args.actual_start) {
        milestone.actual_start = args.actual_start;
        if (milestone.planned_start) {
            const planned = new Date(milestone.planned_start);
            const actual = new Date(milestone.actual_start);
            milestone.drift_days = Math.round((actual.getTime() - planned.getTime()) / (1000 * 60 * 60 * 24));
        }
    }
    if (args.actual_end) {
        milestone.actual_end = args.actual_end;
    }
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: 'system',
        action: 'milestone_dates_set',
        target_type: 'milestone',
        target_id: milestone.id,
        description: `Set dates: ${milestone.actual_start} - ${milestone.actual_end}`,
        timestamp: new Date().toISOString(),
        tags: ['dates']
    });
    writeTracker(state);
    return `Updated ${milestone.id}: drift ${milestone.drift_days} days (${state.project.schedule_status})`;
});
export const updateDriftTool = makeTool('update_drift', 'Update milestone drift days', {
    type: 'object',
    properties: {
        milestone_id: { type: 'string' },
        drift_days: { type: 'number' }
    },
    required: ['milestone_id', 'drift_days']
}, (args) => {
    const state = readTracker();
    const milestone = state.milestones.find(m => m.id === args.milestone_id);
    if (!milestone)
        return { text: `Milestone '${args.milestone_id}' not found`, isError: true };
    const old = milestone.drift_days;
    milestone.drift_days = args.drift_days;
    // Recalculate schedule status
    const drifts = state.milestones.map(m => m.drift_days);
    if (drifts.length > 0) {
        if (Math.max(...drifts) > 3)
            state.project.schedule_status = 'behind';
        else if (Math.min(...drifts) < -3)
            state.project.schedule_status = 'ahead';
        else
            state.project.schedule_status = 'on_track';
    }
    state.agent_log.push({
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        agent_id: 'system',
        action: 'drift_updated',
        target_type: 'milestone',
        target_id: milestone.id,
        description: `Drift: ${old} → ${args.drift_days}`,
        timestamp: new Date().toISOString(),
        tags: ['drift']
    });
    writeTracker(state);
    return `Updated ${milestone.id} drift: ${old} → ${args.drift_days}`;
});
export const createMilestoneTool = makeTool('create_milestone', 'Create a new milestone', {
    type: 'object',
    properties: {
        id: { type: 'string', description: 'Unique snake_case ID' },
        title: { type: 'string', description: 'Display name' },
        domain: { type: 'string', default: 'general' },
        phase: { type: 'string' },
        planned_start: { type: 'string' },
        planned_end: { type: 'string' }
    },
    required: ['id', 'title']
}, (args) => {
    const state = readTracker();
    if (state.milestones.find(m => m.id === args.id)) {
        return { text: `Milestone '${args.id}' already exists`, isError: true };
    }
    const milestone = {
        id: args.id,
        title: args.title,
        domain: args.domain || 'general',
        phase: args.phase || args.id,
        week: state.milestones.length + 1,
        planned_start: args.planned_start || null,
        planned_end: args.planned_end || null,
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
    return `Created milestone ${milestone.id}`;
});
export const addMilestoneTaskTool = makeTool('add_milestone_task', 'Add a task to a milestone', {
    type: 'object',
    properties: {
        milestone_id: { type: 'string' },
        label: { type: 'string' },
        priority: { type: 'string', default: 'P2' },
        acceptance_criteria: { type: 'array', items: { type: 'string' } },
        constraints: { type: 'array', items: { type: 'string' } },
        depends_on: { type: 'array', items: { type: 'string' } },
        execution_mode: { type: 'string', default: 'agent' }
    },
    required: ['milestone_id', 'label']
}, (args) => {
    const state = readTracker();
    const milestone = state.milestones.find(m => m.id === args.milestone_id);
    if (!milestone)
        return { text: `Milestone '${args.milestone_id}' not found`, isError: true };
    const taskNum = String(milestone.subtasks.length + 1).padStart(3, '0');
    const task = {
        id: `${milestone.id}_${taskNum}`,
        label: args.label,
        status: 'todo',
        done: false,
        assignee: null,
        blocked_by: null,
        blocked_reason: null,
        completed_at: null,
        completed_by: null,
        priority: args.priority || 'P2',
        notes: null,
        prompt: null,
        context_files: [],
        reference_docs: [],
        acceptance_criteria: args.acceptance_criteria || [],
        constraints: args.constraints || [],
        agent_target: null,
        execution_mode: args.execution_mode || 'agent',
        depends_on: args.depends_on || [],
        last_run_id: null,
        builder_prompt: null
    };
    milestone.subtasks.push(task);
    writeTracker(state);
    return `Created task ${task.id} in milestone ${milestone.id}`;
});
export const registerAgentTool = makeTool('register_agent', 'Register an agent', {
    type: 'object',
    properties: {
        agent_id: { type: 'string' },
        name: { type: 'string' },
        type: { type: 'string', enum: ['orchestrator', 'sub-agent', 'human', 'external'] },
        permissions: { type: 'array', items: { type: 'string' } },
        color: { type: 'string' },
        parent_id: { type: 'string' }
    },
    required: ['agent_id', 'name', 'type', 'permissions']
}, (args) => {
    const state = readTracker();
    const existing = state.agents.find(a => a.id === args.agent_id);
    if (existing) {
        existing.name = args.name;
        existing.type = args.type;
        existing.permissions = args.permissions;
        if (args.color)
            existing.color = args.color;
        if (args.parent_id)
            existing.parent_id = args.parent_id;
        existing.status = 'active';
        existing.last_action_at = new Date().toISOString();
        state.agent_log.push({
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            agent_id: args.agent_id,
            action: 'agent_updated',
            target_type: 'agent',
            target_id: existing.id,
            description: `Updated agent ${existing.name}`,
            timestamp: new Date().toISOString(),
            tags: ['update']
        });
    }
    else {
        const agent = {
            id: args.agent_id,
            name: args.name,
            type: args.type,
            color: args.color || '#9B9BAA',
            status: 'active',
            permissions: args.permissions,
            last_action_at: new Date().toISOString(),
            session_action_count: 0
        };
        if (args.parent_id)
            agent.parent_id = args.parent_id;
        state.agents.push(agent);
        state.agent_log.push({
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            agent_id: agent.id,
            action: 'agent_registered',
            target_type: 'agent',
            target_id: agent.id,
            description: `Registered agent ${agent.name}`,
            timestamp: new Date().toISOString(),
            tags: ['registered']
        });
    }
    writeTracker(state);
    return `Registered agent ${args.name} (${args.agent_id})`;
});
export const tools = [
    getTaskContextTool,
    getTaskSummaryTool,
    getProjectStatusTool,
    getMilestoneOverviewTool,
    listTasksTool,
    getTaskHistoryTool,
    listAgentsTool,
    getActivityFeedTool,
    startTaskTool,
    completeTaskTool,
    approveTaskTool,
    rejectTaskTool,
    resetTaskTool,
    blockTaskTool,
    unblockTaskTool,
    updateTaskTool,
    logActionTool,
    enrichTaskTool,
    addMilestoneNoteTool,
    setMilestoneDatesTool,
    updateDriftTool,
    createMilestoneTool,
    addMilestoneTaskTool,
    registerAgentTool
];
//# sourceMappingURL=tools.js.map