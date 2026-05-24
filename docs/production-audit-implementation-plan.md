# Production Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the full production-grade audit requested in `docs/prompt-analyze-audit.md` and publish a prioritized findings report for the Next.js 16 app.

**Architecture:** Treat the audit as an evidence-gathering pipeline: inventory the app, run static and build checks, inspect high-risk code paths, test representative routes, then synthesize findings by production severity. Keep raw evidence separate from the final report so each claim can be traced to a file, command, route, or browser observation.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict mode, pnpm 10.28.0, Tailwind CSS v4, next-intl, Framer Motion, react-scroll-parallax, Markdown content via gray-matter and remark, PWA service worker.

---

## Output Files

- Create: `docs/production-audit-report.md`
- Create: `docs/production-audit-evidence.md`
- Read: `docs/prompt-analyze-audit.md`
- Read: `package.json`
- Read: `next.config.mjs`
- Read: `tsconfig.json`
- Read: `eslint.config.mjs`
- Read: `tailwind.config.ts`
- Read: `src/app/**`
- Read: `src/components/**`
- Read: `src/hooks/**`
- Read: `src/i18n/**`
- Read: `src/lib/**`
- Read: `src/types/**`
- Read: `src/stories/**`
- Read: `messages/*.json`
- Read: `public/manifest.json`
- Read: `public/sw.js`

## Audit Standards

- Every finding must include severity, category, exact location, technical explanation, production impact, exact fix strategy, and estimated impact after fixing.
- Severity labels are `CRITICAL`, `HIGH`, `MEDIUM`, and `LOW`.
- Evidence must be file-backed, command-backed, or route-backed. Do not include unsupported opinions.
- The final report must use the ten-section output format in `docs/prompt-analyze-audit.md`.
- If a production-breaking issue is found, place it before the executive summary in `docs/production-audit-report.md`.

### Task 1: Prepare Audit Workspace

**Files:**
- Modify: `project-tracker.json`
- Read: `docs/prompt-analyze-audit.md`
- Read: `package.json`
- Create: `docs/production-audit-evidence.md`

- [ ] **Step 1: Confirm package manager availability**

Run:

```bash
pnpm --version
```

Expected: prints `10.28.0` or another installed pnpm version.

If pnpm is missing, run:

```bash
corepack enable
corepack prepare pnpm@10.28.0 --activate
pnpm --version
```

Expected: prints `10.28.0`.

- [ ] **Step 2: Install dependencies exactly from lockfile**

Run:

```bash
pnpm install --frozen-lockfile
```

Expected: install completes without modifying `pnpm-lock.yaml`.

- [ ] **Step 3: Record baseline repository state**

Run:

```bash
git status --short
git branch --show-current
```

Expected: captures changed files and the current branch for `docs/production-audit-evidence.md`.

- [ ] **Step 4: Create evidence log**

Write `docs/production-audit-evidence.md` with this structure:

```markdown
# Production Audit Evidence

## Baseline

- Branch:
- Working tree:
- Package manager:
- Audit prompt:

## Command Results

## File Inventory

## Route Checks

## Finding Evidence
```

- [ ] **Step 5: Update tracker**

Run:

```bash
pnpm _cc start-task foundation_011 --agent codex
```

Expected: task is marked in progress or already in progress.

### Task 2: Build, Lint, and Type Baseline

**Files:**
- Read: `package.json`
- Read: `next.config.mjs`
- Read: `tsconfig.json`
- Modify: `docs/production-audit-evidence.md`

- [ ] **Step 1: Run lint**

Run:

```bash
pnpm lint
```

Expected: either success or a list of lint failures. Copy the exact command result summary into `docs/production-audit-evidence.md`.

- [ ] **Step 2: Run TypeScript compile check**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: either success or TypeScript diagnostics. Record every failing file and diagnostic code.

- [ ] **Step 3: Run production build**

Run:

```bash
pnpm build
```

Expected: either successful Next.js production build output or build-blocking errors. Record route rendering mode, bundle sizes, warnings, and errors.

- [ ] **Step 4: Inspect dependency and framework configuration**

Review:

```text
package.json
next.config.mjs
tsconfig.json
eslint.config.mjs
tailwind.config.ts
postcss.config.mjs
```

Record issues related to stale scripts, invalid Next.js 16 configuration, weak TypeScript strictness, disabled lint coverage, image settings, font loading, and Tailwind content scanning.

### Task 3: Architecture and App Router Audit

**Files:**
- Read: `src/app/layout.tsx`
- Read: `src/app/[locale]/layout.tsx`
- Read: `src/app/[locale]/page.tsx`
- Read: `src/app/[locale]/stories/[slug]/page.tsx`
- Read: `src/proxy.ts`
- Read: `src/navigation.ts`
- Modify: `docs/production-audit-evidence.md`

- [ ] **Step 1: Map route tree**

Run:

```bash
find src/app -maxdepth 5 -type f | sort
```

Expected: route files for root layout, localized layout, home page, story page, offline page, and favicon.

- [ ] **Step 2: Review static generation and locale handling**

Inspect `setRequestLocale`, `generateStaticParams`, `notFound`, metadata behavior, and locale validation. Record whether English and Arabic story paths are generated correctly and whether invalid locale or slug paths fail safely.

- [ ] **Step 3: Review server and client boundaries**

Run:

```bash
rg -n "^'use client'|^\"use client\"" src/app src/components src/hooks
```

Expected: a complete list of client components and client hooks. Classify each client boundary as required, removable, or needs deeper inspection.

- [ ] **Step 4: Identify architectural coupling**

Inspect `src/lib/stories.ts`, `src/lib/story-service.ts`, `src/lib/story-parser.ts`, `src/components/HomePageClient.tsx`, and story-page components. Record coupling between filesystem parsing, locale decisions, markdown HTML generation, and UI rendering.

### Task 4: Content and Markdown Safety Audit

**Files:**
- Read: `src/lib/story-parser.ts`
- Read: `src/lib/story-service.ts`
- Read: `src/hooks/useStorySections.ts`
- Read: `src/components/StoryContentDisplay.tsx`
- Read: `src/stories/*.md`
- Modify: `docs/production-audit-evidence.md`

- [ ] **Step 1: Inventory story files**

Run:

```bash
find src/stories -maxdepth 1 -type f -name '*.md' | sort | wc -l
```

Expected: records the total Markdown file count.

- [ ] **Step 2: Check locale pairing**

Run:

```bash
find src/stories -maxdepth 1 -type f -name '*.md' | sed 's#src/stories/##' | sort
```

Expected: list supports checking English and Arabic pairs, including naming exceptions such as Arabic files ending in `-ar.md`.

- [ ] **Step 3: Audit frontmatter assumptions**

Inspect required fields: `title`, `firstName`, `age`, `country`, `previousReligion`, `profilePhoto`, `image`, `featured`, and `language`. Record missing fields, weak casts, invalid image paths, and locale mismatches.

- [ ] **Step 4: Audit HTML rendering safety**

Inspect every `dangerouslySetInnerHTML` usage and the remark pipeline. Record whether markdown HTML is sanitized, whether unsupported HTML can pass through, and whether content splitting by heading regex can break localized stories.

### Task 5: Performance and Bundle Audit

**Files:**
- Read: `src/components/HomePageClient.tsx`
- Read: `src/components/FeaturedStories.tsx`
- Read: `src/components/HeroSection.tsx`
- Read: `src/components/StoryCard.tsx`
- Read: `src/components/StoryOfTheDay.tsx`
- Read: `src/components/WhatsNext.tsx`
- Read: `src/components/WhoAreNewMuslims.tsx`
- Read: `src/components/ui/StoryImage.tsx`
- Modify: `docs/production-audit-evidence.md`

- [ ] **Step 1: Capture production build metrics**

Run:

```bash
pnpm build
```

Expected: route size table, shared JS size, static or dynamic rendering modes, and warnings are recorded.

- [ ] **Step 2: Inspect hydration-heavy components**

Review all files returned by:

```bash
rg -n "^'use client'|useState|useEffect|useMemo|useRouter|useTranslations" src/components src/hooks
```

Expected: evidence log identifies components that hydrate only for translations, styling, static display, or simple composition.

- [ ] **Step 3: Inspect image loading**

Review every `StoryImage` usage and direct image reference:

```bash
rg -n "StoryImage|next/image|<img|profilePhoto|image:" src public
```

Expected: evidence log records priority usage, `sizes`, intrinsic layout stability, missing alt quality, and potentially oversized assets.

- [ ] **Step 4: Inspect animation cost**

Run:

```bash
rg -n "framer-motion|motion\\.|react-scroll-parallax|section-animate|IntersectionObserver|transition-" src
```

Expected: evidence log records CPU or GPU risks, reduced-motion support gaps, scroll-triggered effects, and mobile performance risks.

### Task 6: UX, Accessibility, SEO, and RTL Audit

**Files:**
- Read: `src/app/[locale]/layout.tsx`
- Read: `src/lib/metadata.ts`
- Read: `src/components/Header.tsx`
- Read: `src/components/TopNav.tsx`
- Read: `src/components/LanguageSwitcher.tsx`
- Read: `src/components/ThemeToggle.tsx`
- Read: `src/components/Button.tsx`
- Read: `src/components/Footer.tsx`
- Read: `messages/en.json`
- Read: `messages/ar.json`
- Modify: `docs/production-audit-evidence.md`

- [ ] **Step 1: Inspect metadata and crawlability**

Review static metadata, localized metadata, OpenGraph coverage, canonical behavior, manifest links, and route-specific story metadata. Record missing or incorrect SEO signals.

- [ ] **Step 2: Inspect semantic structure**

Run:

```bash
rg -n "<h1|<h2|<h3|<main|<nav|<article|aria-|role=|button|a href" src/components src/app
```

Expected: evidence log records heading hierarchy, landmarks, interactive element semantics, and keyboard path risks.

- [ ] **Step 3: Inspect RTL behavior**

Review Arabic translations, `dir="rtl"`, layout classes, spacing, icon direction, nav ordering, story content rendering, and any hard-coded left or right classes.

Run:

```bash
rg -n "\\b(left|right|ml-|mr-|pl-|pr-|text-left|text-right|translate-x|space-x)\\b" src
```

Expected: evidence log records RTL-sensitive classes and whether they need logical alternatives.

- [ ] **Step 4: Inspect mobile ergonomics**

Run the app and manually check `/en`, `/ar`, one English story, one Arabic story, and `/offline` at 390x844 and 768x1024. Record text overflow, touch target, focus, contrast, and layout stability issues.

### Task 7: PWA, Caching, and Runtime Safety Audit

**Files:**
- Read: `public/sw.js`
- Read: `public/manifest.json`
- Read: `src/components/ServiceWorkerRegistration.tsx`
- Read: `src/components/PWAInstall.tsx`
- Read: `src/app/offline/page.tsx`
- Modify: `docs/production-audit-evidence.md`

- [ ] **Step 1: Inspect service worker install and update behavior**

Record cache naming, precache URLs, activation cleanup, `skipWaiting`, `clients.claim`, and update risks.

- [ ] **Step 2: Inspect fetch strategies**

Record navigation caching, story route caching, static asset caching, offline fallbacks, opaque response behavior, cache growth risks, and stale shell risks.

- [ ] **Step 3: Inspect PWA install flow**

Review `beforeinstallprompt`, installed-state handling, browser support assumptions, and UI accessibility.

- [ ] **Step 4: Test offline routes**

With the production server running, visit `/en`, `/ar`, a story page, and `/offline`; then simulate offline mode in browser devtools. Record whether cached navigation and offline fallback work consistently.

### Task 8: Produce Final Audit Report

**Files:**
- Create: `docs/production-audit-report.md`
- Read: `docs/production-audit-evidence.md`
- Read: `docs/prompt-analyze-audit.md`

- [ ] **Step 1: Rank findings**

Group findings by `CRITICAL`, `HIGH`, `MEDIUM`, and `LOW`. Use production impact as the deciding factor, not implementation effort.

- [ ] **Step 2: Write executive scores**

Score overall quality, scalability, performance, maintainability, and production readiness out of 10. Each score must be supported by one sentence of evidence.

- [ ] **Step 3: Write required report sections**

Create `docs/production-audit-report.md` with exactly these top-level sections:

```markdown
# Production Audit Report

## 1. Executive Summary
## 2. Critical Findings
## 3. High Priority Findings
## 4. Medium Priority Findings
## 5. Low Priority Findings
## 6. Performance Deep Dive
## 7. Architecture Review
## 8. Quick Wins
## 9. Refactor Roadmap
## 10. Final Verdict
```

- [ ] **Step 4: Enforce finding format**

For each finding, include:

```markdown
### [SEVERITY] [Short Finding Title]

- **Category:**
- **Location:**
- **Technical explanation:**
- **Production impact:**
- **Fix strategy:**
- **Estimated impact after fixing:**
```

- [ ] **Step 5: Cross-check every claim**

Search the report for vague phrases:

```bash
rg -n "could be improved|might be optimized|etc\\.|TBD|TODO|probably|maybe" docs/production-audit-report.md
```

Expected: no matches. Rewrite any vague claim with a concrete location and fix strategy.

### Task 9: Verify and Submit Audit Work

**Files:**
- Read: `docs/production-audit-report.md`
- Read: `docs/production-audit-evidence.md`
- Modify: `project-tracker.json`

- [ ] **Step 1: Verify report completeness**

Run:

```bash
rg -n "^## [1-9]|^## 10\\." docs/production-audit-report.md
```

Expected: all ten required sections are present.

- [ ] **Step 2: Verify no unsupported findings**

For every finding in `docs/production-audit-report.md`, confirm that `docs/production-audit-evidence.md` contains the supporting file path, command, or route observation.

- [ ] **Step 3: Run final repository checks**

Run:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Expected: record final pass or fail status in `docs/production-audit-evidence.md`. If any command fails, the final report must include the failure under the relevant severity.

- [ ] **Step 4: Update tracker for review**

Run:

```bash
pnpm _cc complete-task foundation_011 "Created production audit plan and audit report evidence trail" --agent codex
```

Expected: task moves to review.

## Execution Handoff

Plan complete and saved to `docs/production-audit-implementation-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** - dispatch a fresh agent per audit section, review evidence between sections, then synthesize the report.

**2. Inline Execution** - execute tasks in this session with checkpoints after baseline checks, code inspection, browser inspection, and final synthesis.

