# Code Cleanup Design

**Date:** 2026-06-30
**Project:** New Muslim Stories
**Approach:** B (Root-cause cleanup)

## Scope

Fix pre-existing lint errors, add missing devDependency, complete Tailwind v4 migration, and tighten ESLint configuration. No behavior changes to app code.

## Section 1: Fix 6 lint errors across 4 files

### public/sw.js (2 errors)
- **Line 112:** `catch (error)` → `catch` — the `error` binding is not used in the handler body
- **Line 203:** `clients.openWindow('/en')` → `self.clients.openWindow('/en')` — `clients` is a service-worker global available on `self`

### scripts/optimize-images.mjs (2 errors)
- **Line 4:** Remove `glob` from `import { glob } from 'fs'` — never referenced
- **Line 37:** Delete `const newExt = path.extname(webpPath).toLowerCase()` — variable never used

### src/hooks/useHasMounted.ts (1 error)
- **Line 6:** `setHasMounted(true)` triggers `react-hooks/set-state-in-effect`. This is a recognized hydration guard pattern. Add `// eslint-disable-next-line` comment with an explanation.

### src/lib/story-service.ts (1 error)
- **Line 31:** `catch (error)` → `catch` — the `error` binding is never used (the handler constructs a new error message without inspecting the caught error)

## Section 2: Add prettier to devDependencies

`"prettier": "^3.5.3"` — already used by `format` and `format:check` scripts but never declared. Run `pnpm install` after adding.

## Section 3: Migrate Tailwind v3 config to v4 CSS `@theme`

### Current state
- `tailwind.config.ts` defines custom colors (green, beige, gold, sky, coral, gray with 11 shades each), two font families (Inter, Montserrat), and dark mode via `class`
- `globals.css` includes `@config "../../tailwind.config.ts"` for backward compatibility, which triggers `MODULE_TYPELESS_PACKAGE_JSON` warning

### Migration
1. Add `@theme` block to `globals.css` with all color tokens and font families
2. Remove `@config "../../tailwind.config.ts"` from `globals.css`
3. Delete `tailwind.config.ts`

### Color token mapping
All 11 color palettes (green, beige, gold, sky, coral, gray) with their 11 shades each are moved into `@theme` as `--color-*` variables. Font families go as `--font-*` variables.

## Section 4: Tweak eslint.config.mjs

1. Add `...globals.serviceworker` to the `globals` spread — provides `clients`, `caches`, `skipWaiting`, etc. to service worker files
2. Add `'public/sw.js'` and `'scripts/**'` to the ignores array — these files are not app source code

## Verification

- `pnpm build` — must pass with zero new errors
- `pnpm lint` — must show 0 errors (all 6 pre-existing errors fixed)
- `pnpm format:check` — must pass once prettier is installed
