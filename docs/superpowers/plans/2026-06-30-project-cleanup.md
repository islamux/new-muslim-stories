# Project Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove dead dependencies, delete the command-center subsystem, fix broken configs, and clean up documentation.

**Architecture:** This is a structural cleanup — deleting files, modifying configs, and updating docs. No runtime behavior changes. Each task is independent and can be executed in order.

**Tech Stack:** pnpm, Next.js 16, TypeScript

---

### Task 1: Remove Unused Dependencies

**Files:**
- Modify: `package.json` (automatically by pnpm)
- Check: `pnpm-lock.yaml` (auto-updated)

- [ ] **Step 1: Remove 4 unused packages**

```bash
pnpm remove framer-motion react-scroll-parallax server-only opencode-ai
```

Expected: Packages removed from `package.json` and `pnpm-lock.yaml`, `node_modules` cleaned up.

- [ ] **Step 2: Verify no remaining imports in source code**

```bash
rg "from ['\"]framer-motion['\"]" src/ || echo "No framer-motion imports — clean"
rg "from ['\"]react-scroll-parallax['\"]" src/ || echo "No react-scroll-parallax imports — clean"
rg "from ['\"]server-only['\"]" src/ || echo "No server-only imports — clean"
rg "from ['\"]opencode-ai['\"]" src/ || echo "No opencode-ai imports — clean"
```

Expected: All four show "No ... imports — clean"

---

### Task 2: Delete Command Center Directory & Related Artifacts

**Files:**
- Delete: `command-center/` (entire subtree, ~500 files)
- Delete: `.cc-backups/` (tracker backups)
- Delete: `.mcp.json` (broken MCP config)
- Delete: `project-tracker.json` (1420-line tracker)
- Delete: `.opencode/skills/tracked-development/` (references removed tooling)
- Delete: `graphify-out/` (code analysis artifact)

- [ ] **Step 1: Remove directories**

```bash
rm -rf command-center .cc-backups .opencode/skills/tracked-development graphify-out
```

- [ ] **Step 2: Remove root-level files**

```bash
rm .mcp.json project-tracker.json
```

- [ ] **Step 3: Verify deletions**

```bash
ls -d command-center .cc-backups .mcp.json project-tracker.json .opencode/skills/tracked-development graphify-out 2>&1 | grep -c "No such file" | xargs -I{} echo "{} of 6 paths confirmed deleted"
```

---

### Task 3: Fix Root Config Files

**Files:**
- Modify: `package.json`
- Modify: `pnpm-workspace.yaml`
- Modify: `.gitignore`
- Modify: `.prettierignore`
- Delete: `.eslintrc.json`

- [ ] **Step 1: Remove `_cc` script from `package.json`**

Edit the scripts block in `package.json`: remove the `"_cc"` line.

- [ ] **Step 2: Remove workspace paths from `pnpm-workspace.yaml`**

Delete the entire file — after removing command-center references, only `- '.'` (root self-reference) remains, which is meaningless for a single-package project.

- [ ] **Step 3: Remove command-center lines from `.gitignore`**

Remove lines: `.project-tracker.json`, `command-center/node_modules/`, `command-center/packages/*/dist/`, `.cc-backups/`

- [ ] **Step 4: Remove `project-tracker.json` from `.prettierignore`**

Remove the `project-tracker.json` line.

- [ ] **Step 5: Delete legacy `.eslintrc.json`**

```bash
rm .eslintrc.json
```

---

### Task 4: Fix `tailwind.config.ts`

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Remove Pages Router content glob**

Remove `"./src/pages/**/*.{js,ts,jsx,tsx,mdx}"` from the `content` array. The App Router uses `./src/app/**/*`.

---

### Task 5: Fix `manifest.json` (PWA)

**Files:**
- Modify: `public/manifest.json`

- [ ] **Step 1: Remove missing screenshots**

Remove the `"screenshots"` array (references `screenshot-wide.png` and `screenshot-narrow.png` which don't exist).

---

### Task 6: Delete Dead Documentation

**Files:**
- Delete: `docs/SETUP_COMMAND_CENTER.md`
- Delete: `docs/COMMAND_CENTER_MANUAL_SETUP.md`
- Delete: `docs/COMMAND_CENTER_AUDIT.md`
- Delete: `docs/archive/command-center-blueprint.md`
- Delete: `docs/archive/command-center-blueprint-textual.md`
- Delete: `docs/production-audit-implementation-plan.md`
- Delete: `docs/production-audit-evidence.md`

- [ ] **Step 1: Delete 7 docs files**

```bash
rm docs/SETUP_COMMAND_CENTER.md docs/COMMAND_CENTER_MANUAL_SETUP.md docs/COMMAND_CENTER_AUDIT.md docs/archive/command-center-blueprint.md docs/archive/command-center-blueprint-textual.md docs/production-audit-implementation-plan.md docs/production-audit-evidence.md
```

---

### Task 7: Update `AGENTS.md`

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Strip Command Center section**

Remove lines 108-259 (the entire "## 3. Command Center" section through the end of the "Workflow Rules" block). Update the header/description references to no longer mention Command Center or tracked-development skill.

Key changes:
- Description line: remove "project Command Center (MCP server + TUI dashboard)" mention
- Commands table: remove `pnpm _cc` row
- Remove tracked-development skill requirement from "Required Skill" section

---

### Task 8: Update `CLAUDE.md`

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Remove Command Center section**

Remove the "## Command Center" section (approximately lines 172-180).

---

### Task 9: Update `README.md`

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Remove command-center references**

Remove mentions from:
- Description line (line 46): remove "Command Center" mention
- Commands table (line 81): remove `pnpm _cc` row
- Directory tree (lines 88-91): remove `command-center/` subtree entries
- Files list (lines 125-126, 128): remove `.mcp.json`, `project-tracker.json`, `pnpm-workspace.yaml` references
- Links (line 185): remove `project-tracker.json` link

---

### Task 10: Verify Everything Works

- [ ] **Step 1: Clean install**

```bash
pnpm install
```

Expected: Clean install succeeds with no errors. The removed packages should no longer appear in the lockfile.

- [ ] **Step 2: Lint**

```bash
pnpm lint
```

Expected: No lint errors.

- [ ] **Step 3: Build**

```bash
pnpm build
```

Expected: Production build succeeds.

- [ ] **Step 4: Format check**

```bash
pnpm format
```

Expected: No formatting issues (or auto-format fixes applied).

---

### Task 11: Git Branch Cleanup

- [ ] **Step 1: Stage all changes**

```bash
git add -A
git status
```

- [ ] **Step 2: Commit**

```bash
git commit -m "chore: full production cleanup

- Remove unused deps (framer-motion, react-scroll-parallax, server-only, opencode-ai)
- Delete command-center directory and all related files/configs
- Remove tracked-development skill
- Fix broken configs (.mcp.json, tailwind.config.ts, .eslintrc.json)
- Clean up docs (remove 7 stale files, update AGENTS.md/CLAUDE.md/README.md)
- Fix PWA manifest (remove missing screenshots)
- Delete dead artifacts (graphify-out/, production-audit docs)"
```

- [ ] **Step 3: Push and merge to main**

```bash
git push -u origin refresh-agents-readme-docs
gh pr create --fill
gh pr merge --squash
```

- [ ] **Step 4: Prune stale branches**

```bash
git checkout main && git pull
git branch --merged main | grep -v "\*\|main" | xargs -r git branch -d
```
