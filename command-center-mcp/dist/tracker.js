import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
function getTrackerPath() {
    const projectRoot = process.env.PROJECT_ROOT || process.cwd();
    return join(projectRoot, 'project-tracker.json');
}
export function readTracker() {
    const path = getTrackerPath();
    if (!existsSync(path)) {
        throw new Error(`Tracker file not found at ${path}`);
    }
    const content = readFileSync(path, 'utf-8');
    return JSON.parse(content);
}
export function writeTracker(state) {
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
        if (Math.max(...drifts) > 3)
            state.project.schedule_status = 'behind';
        else if (Math.min(...drifts) < -3)
            state.project.schedule_status = 'ahead';
        else
            state.project.schedule_status = 'on_track';
    }
    writeFileSync(path, JSON.stringify(state, null, 2));
}
export function findTask(state, taskId) {
    for (const milestone of state.milestones) {
        const subtask = milestone.subtasks.find(t => t.id === taskId);
        if (subtask)
            return { subtask, milestone };
    }
    return null;
}
export function touchAgent(state, agentId = 'orchestrator') {
    const agent = state.agents.find(a => a.id === agentId);
    if (agent) {
        agent.last_action_at = new Date().toISOString();
        agent.session_action_count += 1;
        agent.status = 'active';
    }
}
export function autoUnblockDependents(state, completedTaskId, completedMilestoneId) {
    const unblocked = [];
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
//# sourceMappingURL=tracker.js.map