import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import pino from 'pino';
import { backupTracker } from './backup.js';
const CURRENT_SCHEMA_VERSION = 1;
function findProjectRoot() {
    let dir = process.cwd();
    while (dir !== path.parse(dir).root) {
        const envPath = path.join(dir, '.env');
        if (fs.existsSync(envPath)) {
            try {
                const content = fs.readFileSync(envPath, 'utf-8');
                const match = content.match(/^PROJECT_ROOT=(.+)$/m);
                if (match)
                    return match[1].trim();
            }
            catch { }
        }
        const trackerPath = path.join(dir, 'project-tracker.json');
        if (fs.existsSync(trackerPath))
            return dir;
        dir = path.dirname(dir);
    }
    return process.cwd();
}
export const PROJECT_ROOT = process.env.PROJECT_ROOT ?? findProjectRoot();
export const TRACKER_PATH = path.resolve(path.join(PROJECT_ROOT, 'project-tracker.json'));
const logger = pino({
    level: process.env.LOG_LEVEL ?? 'info',
    transport: {
        targets: [
            {
                target: 'pino/file',
                options: {
                    destination: path.join(os.homedir(), '.command-center', 'logs', 'command-center.log'),
                    mkdir: true,
                },
            },
        ],
    },
});
export { logger };
export function migrateTracker(state) {
    let version = state.schemaVersion ?? 0;
    while (version < CURRENT_SCHEMA_VERSION) {
        switch (version) {
            case 0:
                state.schemaVersion = 1;
                break;
        }
        version++;
    }
    return state;
}
export function readTracker() {
    const raw = fs.readFileSync(TRACKER_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return migrateTracker(parsed);
}
export function writeTracker(state, toolName) {
    const total = state.milestones.reduce((s, m) => s + m.subtasks.length, 0);
    const done = state.milestones.reduce((s, m) => s + m.subtasks.filter(t => t.done).length, 0);
    state.project.overall_progress = total > 0
        ? parseFloat((done / total).toFixed(4))
        : 0;
    state.project.current_week = selectCurrentWeek(state);
    state.project.schedule_status = selectScheduleStatus(state);
    state.schemaVersion = CURRENT_SCHEMA_VERSION;
    backupTracker(TRACKER_PATH);
    fs.writeFileSync(TRACKER_PATH, JSON.stringify(state, null, 2));
    logger.debug({ tool: toolName, milestones: state.milestones.length, tasks: total }, 'tracker written');
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
    for (const milestone of state.milestones) {
        for (const subtask of milestone.subtasks) {
            if (!subtask.depends_on.includes(completedTaskId))
                continue;
            if (subtask.status !== 'blocked')
                continue;
            const allDepsDone = subtask.depends_on.every(depId => {
                const found = findTask(state, depId);
                return found && found.subtask.status === 'done';
            });
            if (allDepsDone) {
                subtask.status = 'todo';
                subtask.blocked_by = null;
                subtask.blocked_reason = null;
                unblocked.push(`Unblocked task ${subtask.id} in milestone ${milestone.id}`);
                state.agent_log.push({
                    id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                    agent_id: 'system',
                    action: 'task_auto_unblocked',
                    target_type: 'subtask',
                    target_id: subtask.id,
                    description: `Auto-unblocked after task ${completedTaskId} completed`,
                    timestamp: new Date().toISOString(),
                    tags: ['auto-unblock', 'system'],
                });
            }
        }
    }
    const completedMilestone = state.milestones.find(m => m.id === completedMilestoneId);
    if (completedMilestone) {
        const allDone = completedMilestone.subtasks.every(t => t.done);
        if (allDone) {
            for (const milestone of state.milestones) {
                if (!milestone.dependencies.includes(completedMilestoneId))
                    continue;
                const allDepsDone = milestone.dependencies.every(depId => {
                    const dep = state.milestones.find(m => m.id === depId);
                    return dep && dep.subtasks.every(t => t.done);
                });
                if (allDepsDone) {
                    for (const subtask of milestone.subtasks) {
                        if (subtask.status === 'blocked') {
                            subtask.status = 'todo';
                            subtask.blocked_by = null;
                            subtask.blocked_reason = null;
                            unblocked.push(`Unblocked task ${subtask.id} in downstream milestone ${milestone.id}`);
                        }
                    }
                }
            }
        }
    }
    return unblocked;
}
export function selectCurrentWeek(tracker) {
    const start = new Date(tracker.project.start_date);
    const now = new Date();
    const diffDays = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const totalWeeks = Math.ceil((new Date(tracker.project.target_date).getTime() - start.getTime())
        / (1000 * 60 * 60 * 24 * 7));
    return Math.max(1, Math.min(totalWeeks, Math.floor(diffDays / 7) + 1));
}
export function selectCurrentWeekFractional(tracker) {
    const start = new Date(tracker.project.start_date);
    const now = new Date();
    const diffDays = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const totalWeeks = Math.ceil((new Date(tracker.project.target_date).getTime() - start.getTime())
        / (1000 * 60 * 60 * 24 * 7));
    return Math.max(1, Math.min(totalWeeks + 0.99, diffDays / 7 + 1));
}
export function selectCurrentPhase(tracker) {
    const week = selectCurrentWeek(tracker);
    const phase = tracker.schedule.phases.find(p => week >= p.start_week && week <= p.end_week);
    return phase?.title ?? '';
}
export function selectScheduleStatus(tracker) {
    if (tracker.milestones.length === 0)
        return 'on_track';
    const drifts = tracker.milestones.map(m => m.drift_days);
    if (Math.max(...drifts) > 3)
        return 'behind';
    if (Math.min(...drifts) < -3)
        return 'ahead';
    return 'on_track';
}
export function selectMilestoneProgress(milestone) {
    const total = milestone.subtasks.length;
    const done = milestone.subtasks.filter(t => t.done).length;
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}
export function generateTaskId(milestoneId, existingSubtasks) {
    const nnn = String(existingSubtasks.length + 1).padStart(3, '0');
    return `${milestoneId}_${nnn}`;
}
export function generateLogId() {
    return `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
export function todayDateString() {
    return new Date().toISOString().split('T')[0];
}
//# sourceMappingURL=tracker.js.map