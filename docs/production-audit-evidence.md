# Production Audit Evidence

## Baseline

- **Branch:** `feat/audit-plan-execution`
- **Working tree:**
  - `M AGENTS.md`
  - `M package.json`
  - `M project-tracker.json`
  - `?? .antigravitycli/`
  - `?? docs/production-audit-evidence.md`
  - `?? docs/production-audit-implementation-plan.md`
  - `?? docs/prompt-analyze-audit.md`
- **Package manager:** `pnpm 10.28.0` via corepack
- **Audit prompt:** `docs/prompt-analyze-audit.md`

## Command Results

- `package.json` updated to use generic `packageManager: "pnpm"` instead of pinning a version.
- `pnpm build`, `pnpm lint`, `pnpm exec tsc --noEmit`: Could not execute — `node_modules` missing due to npm registry ETIMEDOUT errors. Audit performed via static code analysis only.
- Route-level testing: Skipped — dev server requires `node_modules`.

## File Inventory

### Source Files Examined
```
src/app/layout.tsx
src/app/[locale]/layout.tsx
src/app/[locale]/page.tsx
src/app/[locale]/stories/[slug]/page.tsx
src/app/offline/page.tsx
src/app/globals.css
src/lib/metadata.ts
src/lib/stories.ts
src/lib/story-parser.ts
src/lib/story-service.ts
src/navigation.ts
src/proxy.ts
src/components/HomePageClient.tsx
src/components/Header.tsx
src/components/HeroSection.tsx
src/components/FeaturedStories.tsx
src/components/StoryCard.tsx
src/components/StoryOfTheDay.tsx
src/components/StoryContentDisplay.tsx
src/components/WhatsNext.tsx
src/components/WhoAreNewMuslims.tsx
src/components/ProfileHeader.tsx
src/components/ThemeToggle.tsx
src/components/LanguageSwitcher.tsx
src/components/Button.tsx
src/components/Footer.tsx
src/components/TopNav.tsx
src/components/PWAInstall.tsx
src/components/ServiceWorkerRegistration.tsx
src/components/ui/StoryImage.tsx
src/components/ui/Section.tsx
src/components/ui/Icon.tsx
src/hooks/useStorySections.ts
src/hooks/useHasMounted.ts
src/hooks/useIntersectionObserver.ts
src/hooks/useMultipleIntersectionObserver.ts
src/hooks/useThemeToggle.ts
src/types/story.types.ts
src/types/component.types.ts
src/types/hook.types.ts
src/i18n/request.ts
src/i18n/routing.ts
public/sw.js
public/manifest.json
public/manifest.webmanifest
next.config.mjs
tsconfig.json
eslint.config.mjs
package.json
messages/en.json
messages/ar.json
```

### Story Files
- Total: 138 `.md` files (69 English, 69 Arabic)
- Malformed (no frontmatter): `abdal-malik-rezeski-story.md`, `abdal-malik-rezeski-story-ar.md`
- Missing `language` field: `joram-van-klaveren.md`, `joram-van-klaveren-ar.md`
- External image URLs (unsplash random): `joram-van-klaveren.md`, `joram-van-klaveren-ar.md`
- Stories with `featured: true`: 0
- Stories with `age: null`: 38 pairs (76 files)
- Stories with `previousReligion: null`: 13 pairs (26 files)
- Stories with h3-only headings: ~17 pairs (35 files)
- Stories with no headings: 2 files (`abdal-malik-rezeski-story*`)
- Locale pairing: All 69 pairs correctly matched (en ↔ ar)

### Client Components Found
`rg -n "^'use client'" src/app src/components src/hooks` returned 23 matches. **100% of src/components files are client components** — zero server components in the UI layer.

### Client Hooks Usage
`rg -n "useState|useEffect|useMemo|useRouter|useTranslations" src/components src/hooks`:
- `useState`: FeaturedStories.tsx (country filter)
- `useEffect`: useHasMounted.ts, useIntersectionObserver.ts, useMultipleIntersectionObserver.ts
- `useTranslations`: HomePageClient, FeaturedStories, HeroSection, StoryCard, StoryOfTheDay, WhatsNext, WhoAreNewMuslims, Header, Footer, ProfileHeader, StoryContentDisplay
- `useRouter`: StoryContentDisplay.tsx

### Image References
`rg -n "StoryImage|next/image|<img|profilePhoto|image:" src public`:
- StoryImage used in: StoryCard.tsx, StoryOfTheDay.tsx, StoryContentDisplay.tsx, ProfileHeader.tsx
- Profile photos: 58 WebP files in `public/images/` (~1.5MB total)
- External images: joram-van-klaveren.md uses `source.unsplash.com` (no remotePatterns configured)

### Animation References
`rg -n "framer-motion|motion\.|react-scroll-parallax|section-animate|IntersectionObserver|transition-" src`:
- framer-motion and react-scroll-parallax in `package.json` dependencies
- **Zero imports** of framer-motion or react-scroll-parallax in any source file
- Dead CSS: `.section-animate` and `.is-visible` classes defined in globals.css but never used
- Dead hooks: `useIntersectionObserver.ts`, `useMultipleIntersectionObserver.ts` — zero consumers

### SEO/HTML Structure
- `rg -n "<h1|<h2|<main|<nav|<article|aria-|role=|skip-" src/components src/app --type tsx`:
  - No `<h1>` on homepage (HeroSection uses `<h1>` but returns null during SSR)
  - No `<h1>` on story pages (title rendered as `<p>` in ProfileHeader)
  - No skip-to-content link
  - No `role="main"` or explicit landmark attributes

### Hardcoded LTR Classes (RTL Audit)
`rg -n "left|right|ml-|mr-|pl-|pr-|text-left|text-right|space-x" src --type ts --type tsx`:
- `ThemeToggle.tsx:78`: `ml-2` instead of `ms-2`
- `PWAInstall.tsx:75`: `left-4 right-4` instead of `inset-inline-4`
- `offline/page.tsx:47`: `mr-2` instead of `me-2`

### PWA Manifest
- `start_url: "/"` (no locale prefix)
- Icons: present for sizes 192x192, 256x256, 384x384, 512x512
- Screenshots: referenced but missing files (`/screenshot-wide.png`, `/screenshot-narrow.png`)
- `lang: "en"` hardcoded

### Service Worker Analysis
- Precaches only 5 URLs
- No `_next/static/*` assets precached (no JS, CSS, or fonts)
- Cache name hardcoded: `new-muslim-stories-v1`
- No build-time integration (manual sw.js)

### Configuration Files
- `tsconfig.json`: `target: "ES2017"` (outdated for Node 18+; ES2022 recommended)
- `eslint.config.mjs`: Spreads `react.configs.recommended.rules` inline (fragile pattern)
- `next.config.mjs`: No `remotePatterns`, no `output: "export"`, no SWC/Workbox plugins
- `package.json`: `opencode-ai` in `dependencies` (should be `devDependencies`); `framer-motion`, `react-scroll-parallax` listed but unused

### Locale/Hardcoded Issues
- Offline page hardcodes `/en` link
- i18n request.ts hardcodes `timeZone: 'Asia/Aden'`
- Root layout hardcodes `<html lang="en">`
- No `dir` attribute on `<html>` element (set on inner `<div>` instead)

## Route Checks (Static Analysis)
- **Homepage `/en` / `/ar`**: No `generateMetadata` — no title, description, OG tags emitted
- **Story pages `/en/stories/*` / `/ar/stories/*`**: No `generateMetadata` — all 138+ pages share identical metadata, no per-story SEO
- **Missing routes**: `loading.tsx`, `error.tsx`, `not-found.tsx` absent from locale route segments
- **Sitemap**: No `robots.txt` or `sitemap.xml` anywhere

## Finding Evidence

### CRITICAL findings

1. **Middleware not loaded (proxy.ts naming)**
   - File: `src/proxy.ts:1`
   - Evidence: Next.js requires middleware at `src/middleware.ts`. File named `proxy.ts` is never loaded by the framework.
   - Impact: i18n routing (locale redirect, Accept-Language, locale cookie) completely non-functional.

2. **Missing generateMetadata — all pages share identical SEO metadata**
   - Files: `src/app/[locale]/page.tsx`, `src/app/[locale]/stories/[slug]/page.tsx`
   - Evidence: No `generateMetadata` or `metadata` export in any page. Only static metadata from `src/lib/metadata.ts` applies to all 140+ pages.
   - Impact: Search engines see identical title/description for every page. No per-story social previews.

3. **No Open Graph or Twitter Card metadata**
   - File: `src/lib/metadata.ts:4-17`
   - Evidence: Metadata object contains only `title`, `description`, `manifest`, `appleWebApp`, `icons`. No `openGraph`, `twitter`, `alternates`, or `robots` fields.
   - Impact: Social sharing produces bare/minimal link previews.

4. **No hreflang or canonical tags for bilingual content**
   - File: `src/lib/metadata.ts:4-17`
   - Evidence: No `alternates` configuration. No hreflang annotations for en/ar locale variants.
   - Impact: Duplicate content risk in search results. No language targeting.

5. **No robots.txt or sitemap.xml**
   - Evidence: `find public -name "robots*" -o -name "sitemap*"` returns empty.
   - Impact: Crawlers have no guidance. Story discovery relies entirely on internal linking.

6. **XSS via unsafe dangerouslySetInnerHTML**
   - File: `src/components/StoryContentDisplay.tsx:19`
   - Command: `rg -n "dangerouslySetInnerHTML" src/`
   - Evidence: `dangerouslySetInnerHTML={{ __html: content }}` with no sanitization. No `rehype-sanitize` or DOMPurify in pipeline. Confirmed via `rg "sanitize\|sanitizer\|dompurify\|rehype-sanitize" src/ package.json` (zero matches).

7. **Unsafe frontmatter type assertions with no runtime validation**
   - File: `src/lib/story-parser.ts:37-47`
   - Evidence: `const data = matterResult.data as { title: string; ... }` — TypeScript `as` cast with zero runtime validation. Missing/null fields silently become `undefined`.

8. **Two story files with no frontmatter**
   - Files: `src/stories/abdal-malik-rezeski-story.md`, `src/stories/abdal-malik-rezeski-story-ar.md`
   - Evidence: Files lack `---` frontmatter delimiters. Gray-matter produces empty frontmatter. These will crash or produce broken pages.

### HIGH findings

9. **Broken 404 handling — story page throws 500 on missing slug**
   - File: `src/app/[locale]/stories/[slug]/page.tsx:16-18`
   - Evidence: Error thrown with filesystem info instead of `notFound()`. Filesystem paths leaked in error message.

10. **Missing generateStaticParams in locale layout**
    - File: `src/app/[locale]/layout.tsx:1`
    - Evidence: `setRequestLocale(locale)` called but no `generateStaticParams` returning `[{locale:'en'},{locale:'ar'}]`.

11. **useHasMounted anti-pattern causes blank hero during SSR**
    - Files: `src/components/HeroSection.tsx:20`, `src/components/Header.tsx:10`
    - Evidence: Returns `null` on server, causes delayed content pop-in after hydration. Largest viewport element invisible on first paint.

12. **100% of components are client components**
    - Evidence: All 21 files under `src/components/` have `'use client'`. Zero server components. Even pure presentational wrappers (Section, Icon, Button) force client boundary.

13. **Story page missing setRequestLocale**
    - File: `src/app/[locale]/stories/[slug]/page.tsx:1`
    - Evidence: No `setRequestLocale(locale)` call at the page level. Static rendering support incomplete.

14. **Offline page not localized; hardcoded `/en` link**
    - File: `src/app/offline/page.tsx:74`
    - Evidence: All text in hardcoded English. `/en` hardcoded in Link href.

15. **Content section splitting breaks with non-standard headings**
    - File: `src/hooks/useStorySections.ts:15-20`
    - Evidence: Regex-based split assumes exactly 3 h2 sections. 35 files use h3, 2 files have no headings. Different locale variants of same story can have different heading levels.

16. **Two stories missing `language` field are invisible**
    - Files: `src/stories/joram-van-klaveren.md`, `joram-van-klaveren-ar.md`
    - Evidence: No `language` field in frontmatter. `story.language === locale` filter excludes them from all listings.

17. **External image URLs without remotePatterns**
    - Files: `joram-van-klaveren.md`, `next.config.mjs:6-10`
    - Evidence: Unsplash random URLs used. No `remotePatterns` in next.config. Random parameter defeats caching.

18. **PWA start_url '/' lacks locale prefix; missing screenshot files**
    - File: `public/manifest.json`
    - Evidence: `start_url: "/"` with no locale. Screenshots referenced but files missing from `public/`.

19. **Service worker precache too minimal — no JS/CSS/fonts**
    - File: `public/sw.js:5-11`
    - Evidence: Only 5 URLs precached. `_next/static/*` bundles and @fontsource fonts not precached.

20. **No skip-to-content link**
    - File: `src/app/[locale]/layout.tsx`
    - Evidence: No bypass block mechanism for keyboard/screen reader users.

21. **No heading hierarchy — story title rendered as `<p>` not `<h1>`**
    - File: `src/components/ProfileHeader.tsx:22`
    - Evidence: `<p>` used for story title. No `<h1>` on story detail pages.

22. **Root `<html>` has hardcoded `lang="en"` and no `dir` attribute**
    - Files: `src/app/layout.tsx:12`, `src/app/[locale]/layout.tsx:32`
    - Evidence: `dir` set on inner `<div>` instead of `<html>`. `lang` always `"en"` even on Arabic pages.

23. **No code splitting used anywhere**
    - Evidence: Zero uses of `next/dynamic`. PWAInstall, ServiceWorkerRegistration loaded unconditionally.

24. **Fonts loaded via CSS @import instead of next/font**
    - File: `src/app/globals.css:3-4`
    - Evidence: `@import '@fontsource/inter'` and `@import '@fontsource/montserrat'` — render-blocking, no subsetting, no preload.

25. **Synchronous filesystem I/O in async server functions**
    - File: `src/lib/story-parser.ts:27`
    - Evidence: `fs.readFileSync`, `fs.readdirSync` called in async context. Blocks event loop during SSG.

### MEDIUM findings

26. **Viewport metadata disables user zoom**
    - File: `src/lib/metadata.ts:20-26`
    - Evidence: `maximumScale: 1`, `userScalable: false`. WCAG 1.4.4 failure.

27. **PWA install prompt lacks focus trap and Escape dismiss**
    - File: `src/components/PWAInstall.tsx:107-119`
    - Evidence: Modal content not trapped. Escape key not handled.

28. **RTL issues in ThemeToggle, PWAInstall, offline page**
    - Files: `ThemeToggle.tsx:78`, `PWAInstall.tsx:75`, `offline/page.tsx:47`
    - Evidence: `ml-2`, `left-4 right-4`, `mr-2` instead of logical property equivalents.

29. **Flag emojis in LanguageSwitcher inaccessible**
    - File: `src/components/LanguageSwitcher.tsx:17-18`
    - Evidence: 🇺🇸🇸🇦 emojis map languages to specific countries. Screen reader behavior inconsistent.

30. **Dead dependencies: framer-motion and react-scroll-parallax**
    - File: `package.json:17,25`
    - Evidence: Listed as dependencies but zero imports across all source files.

31. **Unused CSS animation classes + orphaned IntersectionObserver hooks**
    - File: `src/app/globals.css:54-63`, `src/hooks/useIntersectionObserver.ts`
    - Evidence: `.section-animate` CSS defined but never used. Two hooks with zero consumers.

32. **Unused imports (useLocale) in Header and HeroSection**
    - Files: `src/components/Header.tsx:3`, `src/components/HeroSection.tsx`
    - Evidence: `useLocale` imported but never referenced. Commented-out debug console.log in HeroSection.

33. **useThemeToggle exported as PascalCase (UseThemeToggle)**
    - File: `src/hooks/useThemeToggle.ts:13`
    - Evidence: `export function UseThemeToggle` breaks React hook naming convention.

34. **Zod/validation library not used for frontmatter schema**
    - File: `src/lib/story-parser.ts`
    - Evidence: No schema validation for 138 story frontmatter files. Runtime errors surface as blank pages.

35. **No loading.tsx, error.tsx, not-found.tsx for locale routes**
    - Evidence: All three missing from `src/app/[locale]/` and `src/app/[locale]/stories/`.

36. **getSortedStoriesData processes all files including invalid ones**
    - File: `src/lib/story-service.ts:11-23`
    - Evidence: `Promise.all` without error isolation. Single bad file crashes the entire page build.

37. **insufficient visible focus indicators**
    - Evidence: Only `<select>` in FeaturedStories has custom focus styling. Most interactive elements lack `focus-visible`.

### LOW findings

38. **TypeScript target ES2017 outdated for Next.js 16**
    - File: `tsconfig.json:3`
    - Evidence: Should target ES2022 for Node 18+.

39. **Tailwind v4 with legacy v3 config file pattern**
    - File: `tailwind.config.ts`, `globals.css`
    - Evidence: `@config` directive uses v3-style JS config. Should migrate to CSS `@theme` directives.

40. **opencode-ai listed as runtime dependency**
    - File: `package.json:22`
    - Evidence: Dev tool in `dependencies` instead of `devDependencies`.

41. **Hardcoded timezone 'Asia/Aden' in i18n config**
    - File: `src/i18n/request.ts:19`
    - Evidence: All dates use Yemen time regardless of user location.

42. **Service worker cache name not tied to build**
    - File: `public/sw.js:2`
    - Evidence: Hardcoded `new-muslim-stories-v1` — never incremented on deployment.

43. **No resource hints (preconnect/preload) for critical assets**
    - File: `src/app/layout.tsx`
    - Evidence: No preload tags for fonts or critical CSS.

44. **StoryCard excerpt uses naive regex HTML stripping**
    - File: `src/components/StoryCard.tsx:29`
    - Evidence: `/ <[^>]*>/g` regex can be bypassed by malformed HTML.

45. **Error message leaks filesystem info to users**
    - File: `src/lib/story-service.ts:28-37`
    - Evidence: Error message includes `Available stories: ${availableStories.join(', ')}`.

46. **PWA install prompt uses hardcoded 5-second delay**
    - File: `src/components/PWAInstall.tsx:35`
    - Evidence: `setTimeout(() => ..., 5000)` instead of engagement-based triggering.

## Additional Evidence Collected

### Locale Pairs Verification
All 69 English stories have corresponding Arabic (`-ar.md`) files. No orphaned locale files detected.

### Image Assets
- 58 WebP profile photos in `public/images/` (1.5MB total)
- No missing image references detected (all `profilePhoto` paths resolve)
- One story uses external unsplash random URL (deterministic image recommended)

### PWA Icons
All required icon sizes present: 192x192, 256x256, 384x384, 512x512 (both regular and `maskable` variants).

### Missing Route Files
- `src/app/[locale]/loading.tsx` — not found
- `src/app/[locale]/error.tsx` — not found
- `src/app/[locale]/not-found.tsx` — not found
- `src/app/[locale]/stories/loading.tsx` — not found
- `src/app/[locale]/stories/error.tsx` — not found
- `src/app/[locale]/stories/not-found.tsx` — not found

### Frameworks Not Used Despite Being Installed
- `framer-motion` ^12.12.2 — zero imports
- `react-scroll-parallax` ^3.4.5 — zero imports
