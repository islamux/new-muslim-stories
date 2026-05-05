# Setup Command Center in a New Project

## Prerequisites

- Node.js 18+, pnpm, Git
- A project directory to set up

---

## Step 1: Copy Command Center Directories

```bash
# From the source project
SOURCE=/path/to/source-project
TARGET=/path/to/new-project

cp -r $SOURCE/command-center-mcp $TARGET/
cp -r $SOURCE/command-center-tui $TARGET/

# Remove old builds (will rebuild in step 3)
rm -rf $TARGET/command-center-mcp/node_modules $TARGET/command-center-mcp/dist $TARGET/command-center-mcp/pnpm-lock.yaml
rm -rf $TARGET/command-center-tui/node_modules $TARGET/command-center-tui/dist $TARGET/command-center-tui/pnpm-lock.yaml
```

## Step 2: Create project-tracker.json

Create `$TARGET/project-tracker.json`:

```json
{
  "schemaVersion": 1,
  "project": {
    "name": "Your Project Name",
    "start_date": "2026-01-01",
    "target_date": "2026-06-30",
    "current_week": 1,
    "schedule_status": "on_track",
    "overall_progress": 0
  },
  "milestones": [],
  "agents": [],
  "agent_log": [],
  "schedule": {
    "phases": []
  }
}
```

## Step 3: Build MCP Server + TUI

```bash
cd $TARGET/command-center-mcp && pnpm install && pnpm build
cd $TARGET/command-center-tui && pnpm install && pnpm build
```

## Step 4: Create .mcp.json

Create `$TARGET/.mcp.json` with the **absolute path** to your MCP server:

```json
{
  "command-center": {
    "command": "node",
    "args": ["/absolute/path/to/new-project/command-center-mcp/dist/index.js"]
  }
}
```

> **Note:** The `.mcp.json` file requires an absolute path for MCP mode (used by AI agents). The CLI `cc` does NOT need this — it auto-detects the project.

## Step 5: Add Auto-Detecting Shell Functions

Add these functions to `~/.bash_aliases` (or your shell's config):

```bash
# Command Center CLI — auto-detects project from cwd
cc() {
  local dir=$(pwd)
  while [ "$dir" != "/" ]; do
    if [ -f "$dir/command-center-mcp/dist/cli.js" ]; then
      node "$dir/command-center-mcp/dist/cli.js" "$@"
      return
    fi
    dir=$(dirname "$dir")
  done
  echo "Error: Command Center not found in any parent directory" >&2
  return 1
}

# Command Center TUI — auto-detects project from cwd
ccui() {
  local dir=$(pwd)
  while [ "$dir" != "/" ]; do
    if [ -f "$dir/command-center-tui/dist/index.js" ]; then
      node "$dir/command-center-tui/dist/index.js"
      return
    fi
    dir=$(dirname "$dir")
  done
  echo "Error: Command Center TUI not found in any parent directory" >&2
  return 1
}
```

> **Key benefit:** These functions work from any subdirectory of any project. No hardcoded paths, no `PROJECT_ROOT` env var. Works with multiple projects seamlessly.

## Step 6: Verify

```bash
# Navigate into your project
cd $TARGET

# Test CLI auto-detection
cc get-project-status
```

## Step 7: Register Agents

```bash
cc register-agent opencode "OpenCode" orchestrator --permissions read,write
cc register-agent gemini-cli "Gemini CLI" orchestrator --permissions read,write
```

## Step 8: Start Using

```bash
cc create-milestone m1 "First Milestone" --domain core --planned_start 2026-01-06
cc add-milestone-task m1 "Set up project structure"
cc start-task m1_001
```

## TUI Dashboard

Run from anywhere inside the project:

```bash
ccui
```

Keys: `1-4` tabs | `q` quit | `r` refresh | `t` theme | `[`/`]` milestones | `h`/`l` calendar navigation

## How Auto-Detection Works

Both `cc` and `ccui` walk up the directory tree from `cwd` looking for:
- `cc`: nearest `command-center-mcp/dist/cli.js`
- `ccui`: nearest `command-center-tui/dist/index.js`

This means:
- Works from any subdirectory (`src/`, `components/`, etc.)
- Works with multiple projects on the same machine
- No environment variables or hardcoded paths needed
- Simply copy `command-center-mcp/` and `command-center-tui/` into any project
