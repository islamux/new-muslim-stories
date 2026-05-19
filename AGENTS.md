# New Muslim Stories - Agent Guide

This repository hosts a Next.js 16 application for "New Muslim Stories", featuring internationalization (English/Arabic), Markdown-based content management, a modern UI with Tailwind CSS v4, and a project Command Center (MCP server + TUI dashboard).

## Required Skill

**Tracked Development:** You MUST use the `tracked-development` skill (`.opencode/skills/tracked-development/SKILL.md`) when working on any task. It enforces immediate tracker updates on start AND finish.

## 1. Build, Lint, and Test Commands

**Package Manager:** `pnpm` (v10.28.0)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server at `http://localhost:3000` |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server after building |
| `pnpm lint` | Run ESLint to check for code quality and errors |

**Testing:**
- Testing is not currently configured in `package.json`.
- If adding tests, use Jest as the runner (`@types/jest` is already a dev dependency).
- Run specific test: `npx jest path/to/file.test.ts` (once configured).

## 2. Code Style & Guidelines

### Technology Stack
- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4, Framer Motion
- **i18n:** `next-intl` v4 (en/ar) with `src/i18n/` routing and request config
- **Content:** Markdown files in `src/stories/` with YAML frontmatter (parsed via `gray-matter`, `remark`, `remark-html`)
- **PWA:** Service worker, web manifest, install prompt
- **Dark Mode:** `next-themes`
- **Animations:** `framer-motion`, `react-scroll-parallax`

### Key Dependencies
- `next` ^16.0.10, `react` ^19.0.0, `react-dom` ^19.0.0
- `next-intl` ^4.1.0, `next-themes` ^0.4.6
- `framer-motion` ^12.12.2, `react-scroll-parallax` ^3.4.5
- `gray-matter` ^4.0.3, `remark` ^15.0.1, `remark-html` ^16.0.1
- `server-only` ^0.0.1
- Fonts: `@fontsource/inter`, `@fontsource/montserrat`

### Formatting & Syntax
- **Indentation:** 2 spaces.
- **Semicolons:** Always use semicolons.
- **Quotes:** Single quotes `'` for JS/TS strings, double quotes `"` for JSX attributes.
- **Directives:** Use `'use client';` at the top of client-side components.

### Naming Conventions
- **Components:** PascalCase (e.g., `StoryCard.tsx`, `HeroSection.tsx`).
- **Files:** PascalCase for components, camelCase for utilities/hooks (e.g., `stories.ts`, `useScroll.ts`), kebab-case for config/scripts.
- **Interfaces:** PascalCase, often suffixed with `Props` for component props (e.g., `RootLayoutProps`, `ButtonProps`).
- **Variables/Functions:** camelCase.

### TypeScript & Types
- **Strict Mode:** Enabled. Avoid `any`.
- **Imports:** Use `import type` for type-only imports.
- **Props:** Define explicit interfaces for component props.
  ```typescript
  import type { ButtonProps } from '@/types/component.types';
  // or locally
  interface MyComponentProps { ... }
  ```
- **Path Aliases:** Use `@/` to refer to `src/` (e.g., `import X from '@/components/X'`).

### Component Structure
- Use functional components.
- Destructure props in the function signature.
- Keep components small and focused. Extract logic to hooks or utility functions if complex.
- **i18n:** Use `next-intl` hooks (`useTranslations`) for UI text.
  ```typescript
  import { useTranslations } from 'next-intl';
  const t = useTranslations('HomePage');
  // Usage: {t('title')}
  ```
- **Server Component Pattern:** Any `page.tsx` is always a server component. It fetches data/imports server-only functions and passes them as props to a client component which handles interactivity and UI rendering.

### CSS & Styling
- Use Tailwind CSS utility classes (v4 with `@tailwindcss/postcss`).
- Support RTL (Right-to-Left) layouts using logical properties or `rtl:` modifiers where necessary, though usually handled by `dir="rtl"` layout.
- Dark mode is supported via `next-themes`.

### Error Handling
- Use React Error Boundaries for UI recovery.
- For async operations/API calls, use `try/catch` blocks.
- Log errors meaningfully (console.error in dev, monitoring service in prod).

### File Organization
- `src/app/[locale]`: Locale-aware routes and pages (dynamic `[locale]` segment).
- `src/app/[locale]/stories/[slug]`: Individual story pages.
- `src/app/offline`: Offline/PWA fallback page.
- `src/components`: Reusable UI components (includes `ui/` subdirectory).
- `src/hooks`: Custom React hooks (e.g., `useIntersectionObserver`, `useStorySections`).
- `src/i18n`: i18n configuration (`request.ts`, `routing.ts`).
- `src/lib`: Utilities and data fetching (e.g., story parsing).
- `src/stories`: Markdown content files (en + ar pairs, ~69 stories x 2 languages).
- `src/types`: TypeScript type definitions (`story.types.ts`, `component.types.ts`, `hook.types.ts`).
- `messages`: Translation JSON files (`en.json`, `ar.json`).
- `public`: Static assets, PWA icons, `manifest.json`, `sw.js`.
- `docs`: Project documentation, plans, blueprints, and tutorials.

## 3. Command Center

The project includes a custom project management toolchain. All data lives in `project-tracker.json` at project root (single source of truth).

### Architecture

```
AI Agents (opencode, gemini-cli, etc.)
        │ MCP protocol
        ▼
MCP Server (command-center-mcp/) ──► project-tracker.json ◄── TUI Dashboard (command-center-tui/)
        │                                    ▲                         │
        ▼                                    │                         ▼
     CLI (`cc`)                    file watcher (chokidar)    keyboard interaction
```

### MCP Server (`command-center-mcp/`)

- Build: `cd command-center-mcp && pnpm install && pnpm build`
- Configured in `.mcp.json` at project root
- 24 MCP tools available to AI agents (see tool list below)
- Logs to `~/.command-center/logs/command-center.log`

### CLI (`cc`)

Shell function configured in `~/dotfiles/bash/.bash_aliases`. Auto-detects project by walking up from cwd to find `command-center-mcp/`. Works from any project directory.

#### Read Commands

| Command | Description |
|---------|-------------|
| `cc get-project-status` | Overall project status (week, progress, schedule) |
| `cc get-task-context <task_id>` | Full task details (acceptance criteria, constraints, history) |
| `cc get-task-summary <task_id>` | Slim task summary |
| `cc get-milestone-overview <milestone_id>` | Milestone details with all tasks |
| `cc list-tasks [--milestone <id>] [--status <status>] [--domain <name>]` | List tasks with filters |
| `cc list-agents` | List registered agents with active/idle status |
| `cc get-activity-feed [--agent <id>] [--limit <n>]` | Recent activity log |

#### Task Lifecycle Commands

| Command | Description |
|---------|-------------|
| `cc start-task <task_id> [--agent <id>]` | Move task to `in_progress` |
| `cc complete-task <task_id> "<summary>" [--agent <id>]` | Submit task for review |
| `cc approve-task <task_id> [--feedback <text>] [--operator <id>]` | Approve task (moves to `done`, auto-unblocks dependents) |
| `cc reject-task <task_id> "<feedback>" [--operator <id>]` | Request revision (back to `in_progress`) |
| `cc reset-task <task_id>` | Reset task to `todo` |
| `cc block-task <task_id> "<reason>" [--agent <id>]` | Block a task |
| `cc unblock-task <task_id> [--resolution <text>] [--agent <id>]` | Unblock a task |
| `cc update-task <task_id> [--priority P1\|P2\|P3\|P4] [--assignee <name>] [--execution_mode human\|agent\|pair] [--notes <text>]` | Update task fields |
| `cc enrich-task <task_id> [--prompt <text>] [--acceptance_criteria a,b] [--constraints a,b]` | Add details to a task |

#### Milestone Commands

| Command | Description |
|---------|-------------|
| `cc create-milestone <id> "<title>" [--domain <name>] [--phase <name>] [--planned_start YYYY-MM-DD] [--planned_end YYYY-MM-DD]` | Create a new milestone |
| `cc add-milestone-task <milestone_id> "<label>" [--priority P1\|P2\|P3\|P4] [--execution_mode human\|agent\|pair]` | Add a task to a milestone |
| `cc add-milestone-note <milestone_id> "<note>"` | Add a note to a milestone |
| `cc set-milestone-dates <milestone_id> [--actual_start YYYY-MM-DD] [--actual_end YYYY-MM-DD]` | Set actual dates |
| `cc update-drift <milestone_id> <days>` | Update drift days |

#### Agent & Logging Commands

| Command | Description |
|---------|-------------|
| `cc register-agent <id> <name> <type> --permissions read,write [--color #hex] [--parent <id>]` | Register or update an agent |
| `cc log-action <target_id> <action> "<description>" [--tags tag1,tag2]` | Log an action to activity feed |

#### Task States

```
TODO ──► IN_PROGRESS ──► REVIEW ──► DONE
              │              │
              │              └──► IN_PROGRESS (reject)
              ▼
           BLOCKED ──► TODO or IN_PROGRESS (unblock)
```

### MCP Tools (for AI agents)

All CLI commands are also available as MCP tools with `_` instead of `-`:
`get_task_context`, `get_task_summary`, `get_project_status`, `get_milestone_overview`, `list_tasks`, `get_task_history`, `list_agents`, `get_activity_feed`, `start_task`, `complete_task`, `approve_task`, `reject_task`, `reset_task`, `block_task`, `unblock_task`, `update_task`, `log_action`, `enrich_task`, `add_milestone_note`, `set_milestone_dates`, `update_drift`, `create_milestone`, `add_milestone_task`, `register_agent`

### TUI Dashboard (`command-center-tui/`)

Terminal UI dashboard for visualizing project status. Run: `ccui` or `cd command-center-tui && pnpm dev`

#### Global Keys

| Key | Action |
|-----|--------|
| `1` | Swim Lane view (timeline by domain) |
| `2` | Task Board view (Kanban columns) |
| `3` | Agent Hub view (agents + activity feed) |
| `4` | Calendar view (completed tasks by week) |
| `[` / `]` | Navigate between milestones |
| `r` | Refresh from disk |
| `t` | Toggle dark/light theme |
| `Escape` | Return to current view |
| `q` / `Ctrl+C` | Quit |

#### Task Board Keys (Tab 2)

| Key | Action |
|-----|--------|
| `Tab` / `Shift+Tab` | Switch between columns (Todo → In Progress → Review → Done → Blocked) |
| `s` | Cycle task status forward (todo → in_progress → review → done) |
| `b` | Block selected task |
| `Enter` | Open task detail modal |
| `f1` | Filter: All tasks |
| `f2` | Filter: Agent-assigned tasks |
| `f3` | Filter: Blocked tasks |

#### Task Detail Modal Keys

| Key | Action |
|-----|--------|
| `s` | Cycle task status |
| `p` | Cycle priority (planned, not implemented) |
| `Escape` / `q` | Close modal |

#### Calendar Keys (Tab 4)

| Key | Action |
|-----|--------|
| `h` / `Left` | Previous week |
| `l` / `Right` | Next week |
| `t` | Go to current week |

#### Swim Lane Keys (Tab 1)

| Key | Action |
|-----|--------|
| `n` | Scroll to NOW marker |
| `j/k` or arrow keys | Scroll up/down |

### Data & Storage

- **Tracker file:** `project-tracker.json` (project root, single source of truth)
- **Backups:** `~/.command-center/backups/` (last 20 snapshots, auto-created on every write)
- **Undo log:** `~/.command-center/undo-log.jsonl` (last 50 entries)
- **Logs:** `~/.command-center/logs/command-center.log`

### Setup Guide

See `docs/SETUP_COMMAND_CENTER.md` for full setup instructions in new projects.

### Workflow Rules

- **Project tracker reflection:** When starting any subtask, reflect it immediately in the project tracker — use BACKLOG to move milestones from backlog → active and set task status (in_progress, blocked, etc.) at the moment you begin. When the subtask is finished, update the tracker again to reflect the final state (review, done, etc.). Never batch updates — reflect on start AND on finish, each at the right moment.

### GitHub Flow

```
1. git add <files>
2. git commit -m "<message>"
3. git push -u origin <branch>
4. Create PR (gh pr create)
5. Accept/merge PR
6. git checkout main && git pull
```

## 4. Agent & Prompt Configurations

- **Speckit Agents:** `~/.github/agents/` — 9 agent definitions (analyze, checklist, clarify, constitution, implement, plan, specify, tasks, tasks-to-issues).
- **Speckit Prompts:** `~/.github/prompts/` — matching prompt templates for each agent.

## 5. Cursor & Copilot Rules

- **Cursor:** No specific `.cursorrules` found.
- **Copilot:** No specific `.github/copilot-instructions.md` found.

---
*Updated May 2026 based on repository analysis.*
