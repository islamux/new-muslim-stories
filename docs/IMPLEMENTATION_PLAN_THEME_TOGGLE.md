# Implementation Plan: ThemeToggle Refactoring using Spec Kit

## Overview

This guide shows you how to implement the `REFACTOR_THEME_TOGGLE_SPEC.md` using the Spec Kit workflow tools (`specify-cli`).

---

## Step 1: Create Feature with Spec Kit

### Navigate to Project Root
```bash
cd /media/islamux/Variety/JavaScriptProjects/new-muslim-stories
```

### Create New Feature
```bash
.bash/create-new-feature.sh "Refactor ThemeToggle component to improve testability"
```

**Expected Output:**
- Branch created: `XXX-refactor-theme-toggle-component`
- Directory created: `specs/XXX-refactor-theme-toggle-component/`
- Spec file: `specs/XXX-refactor-theme-toggle-component/spec.md`
- Environment variable set: `SPECIFY_FEATURE=XXX-refactor-theme-toggle-component`

---

## Step 2: Update the Specification

### Open the Generated Spec
```bash
code specs/XXX-refactor-theme-toggle-component/spec.md
```

### Copy Content from REFACTOR_THEME_TOGGLE_SPEC.md

Replace the template content with your existing spec:

```markdown
# Feature Specification: Refactor ThemeToggle Component

**Feature Branch**: `XXX-refactor-theme-toggle-component`
**Created**: 2025-01-09
**Status**: Draft
**Input**: Refactor ThemeToggle.tsx to improve code structure and testability

---

## Problem Statement

### Current Issues
- Component is 37 lines (should be smaller)
- Mixed concerns: theme logic + rendering logic in one file
- Inline `toggleTheme` function (hard to test in isolation)
- Conditional rendering could be cleaner
- Theme logic cannot be reused in other components
- Violates single responsibility principle

### Why This Matters
- Hard to test theme logic independently
- Difficult to reuse theme toggle pattern across the app
- Harder to maintain and understand
- Not following React best practices for custom hooks

---

## User Scenarios & Testing

### User Story 1 - Extract Theme Logic (Priority: P1)

As a developer, I want theme logic extracted to a custom hook so that I can test it independently and reuse it elsewhere.

**Why this priority**: Foundation for better code organization

**Independent Test**: Can be tested by importing and using the hook in a simple component

**Acceptance Scenarios**:
1. Given the hook, When called, Then it returns theme state and toggle function
2. Given the hook, When tested, Then all logic works without the component
3. Given the hook, When imported elsewhere, Then it functions correctly

### User Story 2 - Simplify Component (Priority: P1)

As a developer, I want ThemeToggle component to be a simple orchestrator so that it's easy to understand and maintain.

**Why this priority**: Improves readability and maintainability

**Acceptance Scenarios**:
1. Given the component, When counted, Then it's under 25 lines
2. Given the component, When reviewed, Then only rendering logic remains
3. Given the component, When tested, Then all existing functionality works

---

## Requirements

### Functional Requirements

- **FR-001**: Component MUST remain functionally identical
- **FR-002**: Theme logic MUST be extracted to `useThemeToggle` hook
- **FR-003**: Component size MUST be reduced by at least 30%
- **FR-004**: All existing functionality MUST be preserved
- **FR-005**: Hook MUST be reusable in other components

### Success Criteria

- **SC-001**: Component reduced from 37 to under 25 lines
- **SC-002**: Custom hook created at `src/hooks/useThemeToggle.ts`
- **SC-003**: All TypeScript checks pass
- **SC-004**: All existing tests continue to pass
- **SC-005**: Hook returns: `{ theme, toggleTheme, mounted, t }`

---

## Refactoring Strategy

### Target Architecture

```
ThemeToggle/
├── src/
│   ├── hooks/
│   │   └── useThemeToggle.ts      (NEW - theme logic)
│   └── components/
│       └── ThemeToggle.tsx        (SIMPLIFIED - rendering only)
```

### Migration Plan

1. Create `src/hooks/useThemeToggle.ts` custom hook
2. Move all theme logic from component to hook
3. Simplify `ThemeToggle.tsx` to use the hook
4. Remove inline functions
5. Clean up imports
6. Verify functionality

---

## Implementation Details

### New Hook Structure

Create `src/hooks/useThemeToggle.ts`:

```typescript
'use client';

import { useTheme } from 'next-themes';
import { useHasMounted } from '@/hooks/useHasMounted';

interface UseThemeToggleReturn {
  theme: string | undefined;
  toggleTheme: () => void;
  mounted: boolean;
}

export function useThemeToggle(): UseThemeToggleReturn {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    toggleTheme,
    mounted,
  };
}
```

### Simplified Component Structure

Update `src/components/ThemeToggle.tsx`:

```typescript
'use client';

import Button from '@/components/Button';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useThemeToggle();

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
    >
      <SunIcon theme={theme} />
      <MoonIcon theme={theme} />
      <div
        className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
          theme === 'dark'
            ? 'bg-blue-500 opacity-0 group-hover:opacity-20'
            : 'bg-yellow-400 opacity-0 group-hover:opacity-20'
        }`}
      />
    </button>
  );
}

interface IconProps {
  theme: string | undefined;
}

const SunIcon = ({ theme }: IconProps) => (
  <svg
    className={`w-5 h-5 text-yellow-500 transition-all duration-200 ${
      theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = ({ theme }: IconProps) => (
  <svg
    className={`absolute w-5 h-5 text-blue-400 transition-all duration-200 ${
      theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);
```

---

## Step 3: Create Implementation Plan

### Navigate to Feature Directory
```bash
cd specs/XXX-refactor-theme-toggle-component
```

### Generate Plan
```bash
speckit.plan
```

**This creates:**
- `plan.md` - Technical approach and complexity analysis
- `research.md` - Research findings (Phase 0)
- `data-model.md` - Data structures (Phase 1)
- `quickstart.md` - Setup guide (Phase 1)

---

## Step 4: Break Down into Tasks

### Generate Task Breakdown
```bash
speckit.tasks
```

**This creates:**
- `tasks.md` - Actionable tasks for implementation

**Example tasks:**
```markdown
## Tasks

### Phase 1: Setup
- [ ] 1.1: Create backup of current ThemeToggle.tsx
- [ ] 1.2: Verify current functionality works
- [ ] 1.3: Run TypeScript check (baseline)

### Phase 2: Create Hook
- [ ] 2.1: Create hooks directory if needed
- [ ] 2.2: Create useThemeToggle.ts file
- [ ] 2.3: Implement hook logic
- [ ] 2.4: Export hook with proper types

### Phase 3: Refactor Component
- [ ] 3.1: Import useThemeToggle hook
- [ ] 3.2: Remove inline theme logic
- [ ] 3.3: Use hook in component
- [ ] 3.4: Clean up unused imports

### Phase 4: Verify
- [ ] 4.1: Run TypeScript check
- [ ] 4.2: Test functionality manually
- [ ] 4.3: Measure line count
- [ ] 4.4: Verify hook reusability

### Phase 5: Complete
- [ ] 5.1: Update this spec status
- [ ] 5.2: Document any issues
- [ ] 5.3: Prepare for code review
```

---

## Step 5: Implement Features

### Follow the Task List

Execute tasks in order from `tasks.md`:

```bash
# Example:
# Task 1.1: Create backup
cp src/components/ThemeToggle.tsx src/components/ThemeToggle.tsx.backup

# Task 2.1: Check hooks directory
ls -la src/hooks/

# Task 2.2: Create useThemeToggle.ts
touch src/hooks/useThemeToggle.ts

# Continue with remaining tasks...
```

---

## Step 6: Verify Success Criteria

### Check Each Success Criterion

- [ ] **SC-001**: Component reduced from 37 to under 25 lines
  ```bash
  wc -l src/components/ThemeToggle.tsx
  ```

- [ ] **SC-002**: Custom hook created at `src/hooks/useThemeToggle.ts`
  ```bash
  ls -la src/hooks/useThemeToggle.ts
  ```

- [ ] **SC-003**: All TypeScript checks pass
  ```bash
  npx tsc --noEmit
  ```

- [ ] **SC-004**: All existing tests continue to pass
  ```bash
  pnpm test
  ```

- [ ] **SC-005**: Hook returns correct interface
  ```bash
  # Verify in code: theme, toggleTheme, mounted
  ```

---

## Step 7: Update Specification

### Mark as Complete

Edit `specs/XXX-refactor-theme-toggle-component/spec.md`:

```markdown
**Status**: Complete
**Completed**: 2025-01-09
```

---

## Step 8: Commit and Push

### Commit Changes
```bash
git add .
git commit -m "$(cat <<'EOF'
refactor: extract theme logic to custom hook

- Create useThemeToggle hook for reusable theme logic
- Simplify ThemeToggle component to rendering only
- Reduce component size by 35% (37 → 24 lines)
- Improve testability and maintainability

Closes: REFACTOR_THEME_TOGGLE_SPEC.md

🤖 Generated with [Claude Code](https://claude.com/claude-code)

EOF
)"
```

### Push Branch
```bash
git push origin XXX-refactor-theme-toggle-component
```

---

## Step 9: Create Pull Request

### Use GitHub CLI
```bash
gh pr create --title "refactor: ThemeToggle component refactoring" \
  --body "$(cat <<'EOF'
## Summary

Refactor ThemeToggle component to improve code structure and testability by extracting theme logic to a custom hook.

## Implementation

Following spec: `specs/XXX-refactor-theme-toggle-component/spec.md`

### Changes
- Extract theme logic to `useThemeToggle` hook
- Simplify component to focus on rendering
- Improve testability and reusability

## Success Criteria

- [x] Component reduced from 37 to 24 lines (35% reduction)
- [x] Custom hook created at `src/hooks/useThemeToggle.ts`
- [x] All TypeScript checks pass
- [x] All existing functionality preserved
- [x] Hook is reusable in other components

## Testing

- [x] Manual testing of theme toggle functionality
- [x] TypeScript compilation
- [x] Line count verification

EOF
)"
```

---

## Useful Spec Kit Commands Reference

### List All Features
```bash
ls specs/
```

### Check Feature Status
```bash
cat specs/XXX-refactor-theme-toggle-component/spec.md | grep "Status:"
```

### Get Current Feature Name
```bash
echo $SPECIFY_FEATURE
```

### Find Feature by Name
```bash
grep -r "ThemeToggle" specs/*/spec.md
```

---

## Key Benefits of Using Spec Kit

1. ✅ **Structured Workflow** - Clear steps from spec to implementation
2. ✅ **Documentation First** - Everything is documented before coding
3. ✅ **Task Tracking** - Break down complex tasks into actionable items
4. ✅ **Branch Management** - Automatic numbering and naming
5. ✅ **Consistency** - Same process for all features
6. ✅ **Audit Trail** - Complete history of decisions and changes

---

## Troubleshooting

### Branch Already Exists
```bash
git branch -a
.bash/create-new-feature.sh "ThemeToggle refactor" --number 10
```

### Environment Variable Not Set
```bash
export SPECIFY_FEATURE=XXX-refactor-theme-toggle-component
```

### Template Not Found
```bash
ls -la .specify/templates/
```

---

**Next Steps:**

1. ✅ Create feature with `.bash/create-new-feature.sh`
2. ✅ Update spec with content from `REFACTOR_THEME_TOGGLE_SPEC.md`
3. ✅ Generate plan with `speckit.plan`
4. ✅ Generate tasks with `speckit.tasks`
5. ✅ Implement following tasks
6. ✅ Verify success criteria
7. ✅ Commit and push
8. ✅ Create pull request

---

**Reference Documents:**
- Spec Kit Quick Reference: `docs/SPEC_KIT_QUICK_REFERENCE.md`
- Spec Kit Tutorial: `docs/SPEC_KIT_TUTORIAL.md`
- Original Spec: `REFACTOR_THEME_TOGGLE_SPEC.md`
