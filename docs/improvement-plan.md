# Improvement Plan

## Goals
- Improve correctness, i18n/RTL, UX, SEO, performance, testing, and DX in small, safe steps.
- Assumption: use pnpm as the package manager.

## Phase 0: Repo hygiene (P0)
- Remove `package-lock.json`; keep `pnpm-lock.yaml`.
- Remove or fix `pnpm-workspace.yaml` (not a monorepo; delete file or convert to a real workspace definition).
- Add `autoprefixer` to PostCSS.
- Remove unused deps (e.g., `framer-motion`) or add first use.

## Phase 1: Correctness (P0)
- Fix `generateStaticParams` in `src/app/[locale]/stories/[slug]/page.tsx` to return `{ slug, locale }[]` (not `{ params: ... }`).
- Localize `<html>`: move `html` element to `src/app/[locale]/layout.tsx` and set `lang={locale}` and `dir={locale==='ar'?'rtl':'ltr'}`; make `src/app/layout.tsx` minimal wrapper.

## Phase 2: Content and UX (P1)
- Featured section: filter `stories` by `featured` and add “All Stories” section.
- Improve excerpts: strip HTML and truncate plain text (avoid cutting tags).
- Add empty state and error boundaries for stories.

## Phase 3: i18n and RTL polish (P1)
- Ensure all visible strings are in `messages/*`.
- Add RTL-friendly styles where needed; consider a Tailwind RTL plugin if necessary.
- Make `LanguageSwitcher` accessible (buttons -> proper controls, aria-current).

## Phase 4: SEO and sharing (P1)
- Implement `generateMetadata` for story pages from frontmatter (title, description, OG/Twitter images).
- Add `/robots.txt` and `/sitemap.xml` route handlers.

## Phase 5: Performance and SSG (P2)
- Set `export const dynamicParams = false` for stories; add `revalidate` if you plan incremental updates.
- Ensure `next/image` is used for photos with proper `sizes` and `alt`.
- Consider caching parsed stories or precomputing at build.

## Phase 6: Validation and resilience (P2)
- Validate frontmatter with Zod at load time; fail with clear errors.
- Enforce unique slugs and matching `-ar.md` pairs; add a dev check script.

## Phase 7: Testing and CI (P2)
- Unit tests:
  - story parsing (`src/lib/stories.ts`)
  - i18n layout picks correct `lang/dir`
  - language switching retains path
- E2E smoke with Playwright: home load (EN/AR), open a story, switch locale.
- Add GitHub Actions: lint, typecheck, test, build on PR.

## Phase 8: Roadmap items (optional, P3)
- Dark mode toggle (manual override of `prefers-color-scheme`).
- “Search” + filters by country/religion (client-side first, then server-side).
- Admin/content pipeline (Git-based CMS or headless CMS).
- Daily featured story rotation.

## Acceptance criteria
- P0 merged: builds green; localized `<html>`; correct static params; one package manager; autoprefixer active.
- P1: Featured/All sections correct; no raw-HTML truncation; story pages have correct metadata; all user-visible strings translated; RTL layout correct.
- CI: PRs run lint/typecheck/tests/build; Playwright smoke passes.

## Next actions
- Implement P0 + P1 correctness items and add autoprefixer.
- Clean lockfiles and workspace file.

## Progress log

- 2025-08-11
  - Merged `feat/add-new-stories` into `main`.
  - Created branch `chore/improvement-plan-phase-0` for ongoing work.
  - Added this plan at `docs/improvement-plan.md`.
  - Standardized on pnpm: removed `package-lock.json`, kept/updated `pnpm-lock.yaml`.
  - Build tooling: installed `autoprefixer` and updated `postcss.config.mjs` to include it.
  - Next.js correctness: fixed `generateStaticParams` in `src/app/[locale]/stories/[slug]/page.tsx` to return plain params.
  - i18n/HTML semantics: moved `<html>` wrapper to `src/app/[locale]/layout.tsx` with `lang` and `dir` (`rtl` for `ar`), simplified `src/app/layout.tsx` body wrapper.
  - Verified with `pnpm build`: production build succeeded and prerendered localized story routes.

### Up next (resume here)
- Content/UX
  - Home: filter featured stories; add an "All Stories" section.
  - Safer excerpts: strip HTML before truncation in `HomePageClient`.
- SEO
  - Implement `generateMetadata` for `[slug]` using frontmatter; add Open Graph/Twitter tags.
- Repo hygiene
  - Review `pnpm-workspace.yaml`: remove if not using workspaces.
