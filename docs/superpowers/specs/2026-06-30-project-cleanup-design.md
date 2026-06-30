# Project Cleanup Design

**Date:** 2026-06-30
**Project:** New Muslim Stories (Next.js 16)

## Overview

Full production cleanup of the New Muslim Stories codebase — remove dead code, fix broken configs, delete the command-center subsystem and all its traces, and tidy up documentation.

## Scope

### 1. Remove Unused Dependencies

| Dependency | Reason |
|---|---|
| `framer-motion` | 0 imports in `src/` |
| `react-scroll-parallax` | 0 imports |
| `server-only` | 0 imports |
| `opencode-ai` | 0 imports in app code |

**Action:** `pnpm remove` each one. Verify build still passes.

### 2. Delete Command Center & All Related Files

**Delete directories:**
- `command-center/` (MCP server + TUI dashboard + shared packages + scripts + internal docs — ~500 files)
- `.cc-backups/` (tracker backups)

**Delete root files:**
- `.mcp.json` (MCP config pointing to non-existent path)
- `project-tracker.json` (1420-line tracker JSON)

**Remove associated skill:**
- `.opencode/skills/tracked-development/` (references and enforces tracker usage)

### 3. Fix Config Files

- **`package.json`** — Remove `"_cc"` script (line 14)
- **`pnpm-workspace.yaml`** — Remove workspace paths for `command-center`, `command-center/packages/*`, `command-center-mcp`, `command-center-tui`. If no other workspaces remain, delete the file entirely.
- **`.gitignore`** — Remove lines tracking `.project-tracker.json`, `command-center/node_modules/`, `command-center/packages/*/dist/`, `.cc-backups/`
- **`.prettierignore`** — Remove `project-tracker.json` line
- **`tailwind.config.ts`** — Remove `./src/pages/**/*.{js,ts,jsx,tsx,mdx}` glob (Pages Router artifact)
- **Remove legacy `.eslintrc.json`** (superseded by `eslint.config.mjs`)

### 4. Update Documentation

- **`AGENTS.md`** — Strip the entire Command Center section (lines 108-259 in current), remove references in header/commands table, remove tracked-development skill references
- **`CLAUDE.md`** — Remove Command Center section (lines 172-180)
- **`README.md`** — Remove command-center from description, directory tree, commands table, and references
- **Delete `docs/SETUP_COMMAND_CENTER.md`**
- **Delete `docs/COMMAND_CENTER_MANUAL_SETUP.md`**
- **Delete `docs/COMMAND_CENTER_AUDIT.md`**
- **Delete `docs/archive/command-center-blueprint.md`**
- **Delete `docs/archive/command-center-blueprint-textual.md`**

### 5. Delete Dead Files & Artifacts

- `graphify-out/` (one-off code analysis artifact)
- `docs/production-audit-implementation-plan.md` — references project-tracker
- `docs/production-audit-evidence.md` — references project-tracker
- Empty `node_modules/` dirs in command-center packages (already gone with parent deletion)

### 6. Fix PWA Missing Assets

`manifest.json` references `screenshot-wide.png` and `screenshot-narrow.png` which don't exist.
**Action:** Remove the `screenshots` array from `manifest.json` (placeholders not worth creating for an audit).

### 7. Git Branch Cleanup

- Merge `refresh-agents-readme-docs` branch to `main`
- Delete stale local branches
- Push changes

## Files Modified

| Action | Files |
|--------|-------|
| Delete (dirs) | `command-center/`, `.cc-backups/`, `.opencode/skills/tracked-development/`, `graphify-out/` |
| Delete (files) | `.mcp.json`, `project-tracker.json`, `.eslintrc.json`, 5 docs files |
| Edit | `package.json`, `pnpm-workspace.yaml`, `.gitignore`, `.prettierignore`, `tailwind.config.ts`, `public/manifest.json`, `AGENTS.md`, `CLAUDE.md`, `README.md` |
| Remove deps | `framer-motion`, `react-scroll-parallax`, `server-only`, `opencode-ai` |

## Risk Assessment

- **Low risk:** Most changes are deletions of dead code or dead config. No behavior changes.
- **Medium risk:** Removing `framer-motion` / `react-scroll-parallax` — verify no runtime imports exist (confirmed by code search). Removing command-center tooling — verify nothing in the app depends on it (confirmed).
- **No behavior changes to:** Story rendering, i18n, routing, PWA, dark mode, layout, or user-facing functionality.

## Verification

1. `pnpm install` — clean install after dep removal
2. `pnpm lint` — passes
3. `pnpm build` — succeeds (production build)
4. `pnpm format` — consistent formatting
