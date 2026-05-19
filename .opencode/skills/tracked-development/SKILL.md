---
name: tracked-development
description: Use when working on any task in a project with a project tracker (project-tracker.json, Command Center, or similar). Triggers include starting new work, finishing work, switching tasks, or discovering existing work needs tracking.
---

# Tracked Development

## Overview

Reflect all work in the project tracker immediately on start AND on finish. Never batch updates. Every task transition (start, finish, block, unblock) is an update event.

## When to Use

- Starting any task → update tracker BEFORE writing code
- Finishing any task → update tracker BEFORE moving to next task
- Switching between tasks → log the switch
- Discovering untracked work → create task, then update

**When NOT to use:** Projects without a tracker. Read-only/investigation-only sessions (but still log findings).

## Core Pattern

```
Start Task:
  1. Update tracker: log-action or start-task
  2. Do the work
  3. Update tracker: log-action or complete-task

Every task gets TWO tracker touches. Never zero. Never one.
```

## Tracker Commands

Most projects expose a CLI. Common patterns:

```
# Log activity
pnpm _cc log-action <task_id> <action> "<description>"

# Start a task
pnpm _cc start-task <task_id> --agent <name>

# Complete a task
pnpm _cc complete-task <task_id> "<summary>" --agent <name>

# Check status
pnpm _cc get-project-status
```

Check the project's AGENTS.md or package.json for the exact command.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| "I'll update after this code change" | Update BEFORE the code change, or it won't happen |
| "I'll batch at the end" | Batching loses context. Update per-event. |
| "This is obvious, no need to track" | If it's work, it goes in the tracker. No exceptions. |
| "I forgot" | Add the update step to your mental checklist. First thing on start, last thing on finish. |
| "The task is too small" | Small tasks tracked = accurate status. 10-second update. |

## Red Flags

- "I'll log it later" or "After this commit"
- "I'll update everything at the end"
- "This task doesn't need tracking"
- "I already know what I'm doing"
- Not checking project status before starting work

## Implementation

1. **At session start:** Run `get-project-status` (or equivalent) to understand current state
2. **When starting task X:** Immediately run `start-task X` or `log-action X in_progress "starting work"`
3. **When finishing task X:** Immediately run `complete-task X "summary"` or `log-action X done "completed"`
4. **When blocked:** Run `block-task X "reason"` immediately
5. **When switching:** Close current task tracking, open new task tracking

## Integration with Milestones

When activating work from a milestone:

1. If milestone is in backlog: activate it first (BACKLOG → active)
2. Start the specific task
3. Log the activation

## The Rule

**If you wrote code without updating the tracker, you skipped a step.**

Go back. Update it now. Then continue.
