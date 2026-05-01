export function buildTaskContext(state, subtask, milestone) {
    let ctx = `# Task: ${subtask.id}\n`;
    ctx += `**${subtask.label}**\n\n`;
    ctx += `## Metadata\n`;
    ctx += `- Status: ${subtask.status}\n`;
    ctx += `- Priority: ${subtask.priority}\n`;
    ctx += `- Execution Mode: ${subtask.execution_mode}\n`;
    ctx += `- Assignee: ${subtask.assignee || 'unassigned'}\n`;
    if (subtask.blocked_reason) {
        ctx += `- ⚠️ Blocked: ${subtask.blocked_reason}\n`;
    }
    if (subtask.acceptance_criteria?.length) {
        ctx += `\n## Acceptance Criteria\n`;
        for (const criterion of subtask.acceptance_criteria) {
            ctx += `- [ ] ${criterion}\n`;
        }
    }
    if (subtask.constraints?.length) {
        ctx += `\n## Constraints\n`;
        for (const constraint of subtask.constraints) {
            ctx += `- ${constraint}\n`;
        }
    }
    if (subtask.context_files?.length) {
        ctx += `\n## Context Files\n`;
        for (const file of subtask.context_files) {
            ctx += `- ${file}\n`;
        }
    }
    if (subtask.reference_docs?.length) {
        ctx += `\n## Reference Docs\n`;
        for (const doc of subtask.reference_docs) {
            ctx += `- ${doc}\n`;
        }
    }
    // Milestone info
    ctx += `\n## Milestone\n`;
    ctx += `- Domain: ${milestone.domain}\n`;
    ctx += `- Phase: ${milestone.phase}\n`;
    ctx += `- Week: ${milestone.week}\n`;
    // Task history
    const history = state.agent_log.filter(e => e.target_id === subtask.id && e.action === 'revision_requested');
    if (history.length) {
        ctx += `\n## Revision History\n`;
        for (let i = 0; i < history.length; i++) {
            ctx += `${i + 1}. ${history[i].description} (${history[i].timestamp})\n`;
        }
    }
    return ctx;
}
export function buildTaskSummary(state, subtask, milestone) {
    return `# ${subtask.id}: ${subtask.label}
- Status: ${subtask.status}
- Priority: ${subtask.priority}
- Domain: ${milestone.domain}
${subtask.acceptance_criteria?.length ? `\n## Acceptance Criteria\n${subtask.acceptance_criteria.map(c => `- [ ] ${c}`).join('\n')}` : ''}
`;
}
export function buildProjectStatus(state) {
    const done = state.milestones.reduce((s, m) => s + m.subtasks.filter(t => t.done).length, 0);
    const total = state.milestones.reduce((s, m) => s + m.subtasks.length, 0);
    const inProgress = state.milestones.reduce((s, m) => s + m.subtasks.filter(t => t.status === 'in_progress').length, 0);
    const blocked = state.milestones.reduce((s, m) => s + m.subtasks.filter(t => t.status === 'blocked').length, 0);
    let status = `# ${state.project.name}\n`;
    status += `- Start: ${state.project.start_date}\n`;
    status += `- Target: ${state.project.target_date}\n`;
    status += `- Week: ${state.project.current_week}\n`;
    status += `- Schedule: ${state.project.schedule_status.toUpperCase()}\n`;
    status += `- Progress: ${done}/${total} (${Math.round(state.project.overall_progress * 100)}%)\n`;
    status += `- In Progress: ${inProgress}\n`;
    status += `- Blocked: ${blocked}\n`;
    status += `- Milestones: ${state.milestones.length}\n`;
    const currentPhase = state.schedule.phases.find(p => state.project.current_week >= p.start_week && state.project.current_week <= p.end_week);
    if (currentPhase) {
        status += `- Phase: ${currentPhase.title}\n`;
    }
    return status;
}
export function buildMilestoneOverview(milestone, state) {
    const done = milestone.subtasks.filter(t => t.done).length;
    const total = milestone.subtasks.length;
    const pct = total > 0 ? Math.round(done / total * 100) : 0;
    let overview = `# ${milestone.id}: ${milestone.title}\n`;
    overview += `- Domain: ${milestone.domain}\n`;
    overview += `- Phase: ${milestone.phase}\n`;
    overview += `- Week: ${milestone.week}\n`;
    overview += `- Progress: ${done}/${total} (${pct}%)\n`;
    overview += `- Drift: ${milestone.drift_days} days\n`;
    if (milestone.is_key_milestone && milestone.key_milestone_label) {
        overview += `- 📌 ${milestone.key_milestone_label}\n`;
    }
    if (milestone.notes.length) {
        overview += `\n## Exit Criteria\n`;
        for (const note of milestone.notes) {
            overview += `- ${note}\n`;
        }
    }
    overview += `\n## Tasks\n`;
    for (const task of milestone.subtasks) {
        const icon = task.status === 'done' ? '✓' : task.status === 'in_progress' ? '→' : task.status === 'blocked' ? '⊘' : '○';
        overview += `- ${icon} ${task.id}: ${task.label}\n`;
    }
    return overview;
}
//# sourceMappingURL=context.js.map