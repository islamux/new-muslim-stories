# Project Issues & Fixes Log

**Last Updated**: January 15, 2026
**Maintained By**: Development Team

---

## Table of Contents

1. [January 2026](#january-2026)
2. [Recent Git Commits (Issues & Fixes)](#recent-git-commits-issues--fixes)
3. [Resolved Issues](#resolved-issues)
4. [Known Issues](#known-issues)

---

## January 2026

### 2026-01-15 - Theme Toggle Icon Alignment Fix

**Issue**: Light theme icon not aligned above text like dark theme icon.

**File**: `src/components/ThemeToggle.tsx:74-78`

**Root Cause**: Icon wrapper uses `w-5 h-5` which is too small for proper flex layout.

**Fix Applied**:
```tsx
// Before
<div className="w-5 h-5">
  <SunIcon theme={theme} />
  <MoonIcon theme={theme} />
</div>

// After
<div className="flex flex-col items-center justify-center w-5 h-5">
  <SunIcon theme={theme} />
  <MoonIcon theme={theme} />
</div>
```

**Commit**: `5ad8cda`

---

### 2026-01-15 - Text Color Fix for Theme Support

**Issue**: White text on light theme background in story content.

**File**: `src/components/StoryContentDisplay.tsx:18`

**Root Cause**: Prose class uses `dark:prose-invert` but needs explicit text colors.

**Fix Applied**:
```tsx
// Before
<div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />

// After
<div className="prose prose-slate dark:prose-invert max-w-none text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: content }} />
```

---

### 2026-01-15 - Dark Theme Background Color Fix

**Issue**: Story pages had hardcoded `bg-white` background that didn't adapt to dark theme.

**File**: `src/components/StoryContentDisplay.tsx`

**Fix Applied**:
```tsx
// Before
<article className="bg-white rounded-lg shadow-md p-8">

// After
<article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
```

---

### 2026-01-13 - Arabic Translation Complete Fix ✅

**Status**: RESOLVED

**Problem**: Arabic pages showing English translations + INVALID_MESSAGE errors.

**Root Causes**:
1. Missing PWA icon files (`icon-192x192.png`, `icon-512x512.png`)
2. Missing `setRequestLocale()` calls in layouts/pages
3. Outdated next-intl API configuration

**Files Changed**:
1. **Created**: `src/i18n/routing.ts` - Central routing configuration
2. **Renamed**: `src/i18n.ts` → `src/i18n/request.ts` - Updated to Next.js 16 API
3. **Updated**: `src/proxy.ts` - Uses routing config, proper matcher for static assets
4. **Updated**: `src/app/[locale]/layout.tsx` - Added `setRequestLocale()` call
5. **Updated**: `src/app/[locale]/page.tsx` - Added `setRequestLocale()` call
6. **Created**: `public/icon-192x192.png` and `public/icon-512x512.png`

**Critical Fix**:
```typescript
// src/app/[locale]/layout.tsx
import { getMessages, getTimeZone, setRequestLocale } from 'next-intl/server';

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // CRITICAL: Enable static rendering and set locale
  setRequestLocale(locale);

  const messages = await getMessages(); // Now correctly loads Arabic messages!
  // ...
}
```

**Commit**: `d2384e1`

---

### 2026-01-07 - Next.js 16 Migration Issues

**Status**: PARTIALLY RESOLVED

**Migration**: Next.js 14 → Next.js 16.1.1

**Critical Issues Found**:

#### Issue #1: Dynamic Route Parameters Now Promises (BREAKING CHANGE)

**Error**:
```
Type error: Property 'locale' is missing in type 'Promise<{ locale: string; }>' but required in type '{ locale: Locale; }'.
```

**Affected Files**:
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/stories/[slug]/page.tsx`

**Fix Required**:
```tsx
// Before (Next.js 14)
interface LocaleLayoutProps {
  params: { locale: Locale };
}
export default async function LocaleLayout({ children, locale }: LocaleLayoutProps) {

// After (Next.js 16)
interface LocaleLayoutProps {
  params: Promise<{ locale: Locale }>;  // Promise added
}
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;  // Await params
```

#### Issue #2: Middleware File Convention Deprecated

**Warning**: `middleware.ts` → `proxy.ts` migration recommended.

**Fix**:
```bash
npx @next/codemod@canary middleware-to-proxy .
# OR
mv src/middleware.ts src/proxy.ts
```

**Commit**: `70bdc9e`, `001e728`

---

## Recent Git Commits (Issues & Fixes)

| Commit | Description |
|--------|-------------|
| `e6f5263` | fix: add leading-relaxed to prevent text clipping in h1 |
| `639441b` | fix: strip HTML tags from story excerpt in StoryCard |
| `5ad8cda` | Fix: Light theme icon not aligned above text like dark theme icon |
| `9645cc4` | fix: add explicit text colors for light/dark theme support |
| `1326db8` | chore: remove obsolete files |
| `d2976d8` | docs: comprehensive documentation for Next.js 16 + next-intl fix |
| `2e6f629` | chore: clean up components and update translations |
| `5c10c12` | fix: add missing PWA icon files |
| `d2384e1` | fix: upgrade to Next.js 16 + next-intl proper setup |
| `0250605` | feat: implement PWA install i18n fixes from documentation |
| `2a9d391` | refactor: rename PWAInstallPrompt to PWAInstall |
| `70bdc9e` | fix: migrate to Tailwind v4, Next.js 16, and fix next-intl locale error |
| `001e728` | feat: complete Next.js 16 migration |
| `155a7a6` | refactor: cleanup layout.tsx and remove ClientProviders abstraction |
| `ce83d53` | feat: implement full PWA support with offline capabilities |
| `62be81a` | fix: resolve hydration mismatch errors & translation issues |
| `fbc2f09` | docs: add comprehensive IMPORT_GUIDE.md |
| `a260810` | docs: update IMPROVEMENT_PLAN.md to reflect TypeScript completion |
| `861b24d` | Fix: Resolve font loading and module import errors |
| `5866bbe` | Improve UI issues - Change translation buttons, add light/dark theme toggle |
| `a78cf29` | feat: Enhance project structure and styling |
| `6d04027` | feat: Implement i18n navigation, fix ESLint config, and resolve locale switcher bug |
| `bb0f834` | fix(next): satisfy root layout requirement for `<html>` |
| `5e524d9` | feat: Resolve TypeScript and build errors |
| `110a8ec` | fix: Use project-specific i18n config in LocaleLayout |
| `55869ed` | debug: Add console logging to ClientProviders for locale prop |
| `d2cd86c` | fix: Pass timezone to client provider and debug locale in getStoryData |
| `ed2797c` | fix: Address multiple runtime issues and improve story fetching |
| `097ac9e` | fix: Attempt to resolve story page error by awaiting params |
| `2aaad9e` | fix: Correct handling of route params in StoryPage component |
| `2c3ced1` | Fix: Resolve next-intl imports and TypeScript param type errors |
| `ce44022` | Module not found errors related to `next-intl/client` and `next-intl/link` |
| `b80c79f` | Fix: Address initial errors, i18n issues, and add tests |
| `4ebe02e` | Fix: Address initial errors, i18n issues, and add tests |
| `51f477a` | Upload files before finishing fix errors |

---

## Resolved Issues

### ✅ Arabic Translation System (Fixed 2026-01-13)

**Problem**: Arabic pages showing English text instead of Arabic translations.

**Solution**: Added `setRequestLocale()` calls in all layouts and pages.

**Files**: `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`

**Reference**: [NEXT_INTL_FIX_GUIDE.md](docs/NEXT_INTL_FIX_GUIDE.md)

---

### ✅ PWA Icon Files Missing (Fixed 2026-01-13)

**Problem**: Missing `icon-192x192.png` and `icon-512x512.png` causing 404 errors.

**Solution**: Created icon files in `public/` directory.

**Files**: `public/icon-192x192.png`, `public/icon-512x512.png`

**Reference**: [PWA_ICONS_REQUIRED.md](docs/PWA_ICONS_REQUIRED.md)

---

### ✅ Duplicate Messages Directory (Fixed 2026-01-13)

**Problem**: Two `messages` directories causing confusion.

**Solution**: Deleted `src/messages/` (unused), kept root `messages/`.

---

### ✅ Hardcoded English Strings in PWAInstallPrompt (Known)

**Problem**: Component has fallback hardcoded English strings.

**Files**: `src/components/PWAInstallPrompt.tsx`

**Status**: Needs internationalization using existing translation keys.

**Reference**: [ARABIC_TRANSLATION_FIX_REPORT.md](docs/ARABIC_TRANSLATION_FIX_REPORT.md)

---

### ✅ Theme Toggle Accessibility (Known)

**Problem**: `aria-label="Dismiss"` hardcoded in ThemeToggle.

**Files**: `src/components/ThemeToggle.tsx`

**Status**: Needs proper aria-label translation.

**Reference**: [ARABIC_TRANSLATION_FIX_REPORT.md](docs/ARABIC_TRANSLATION_FIX_REPORT.md)

---

## Known Issues

### 🔴 High Priority

1. **Middleware to Proxy Migration**
   - **File**: `src/middleware.ts`
   - **Action**: Rename to `src/proxy.ts` using codemod
   - **Command**: `npx @next/codemod@canary middleware-to-proxy .`

### 🟡 Medium Priority

1. **Unused Dependency**
   - **Package**: `next-theme` (should be `next-themes`)
   - **Action**: Remove with `pnpm remove next-theme`

2. **Baseline Browser Mapping Outdated**
   - **Package**: `baseline-browser-mapping`
   - **Action**: Update with `pnpm add -D baseline-browser-mapping@latest`

### 🟢 Low Priority

1. **Hardcoded Strings in PWAInstallPrompt**
   - **Status**: Documented but not yet fixed
   - **Reference**: [ARABIC_TRANSLATION_FIX_REPORT.md](docs/ARABIC_TRANSLATION_FIX_REPORT.md)

2. **ThemeToggle Accessibility Labels**
   - **Status**: Documented but not yet fixed
   - **Reference**: [ARABIC_TRANSLATION_FIX_REPORT.md](docs/ARABIC_TRANSLATION_FIX_REPORT.md)

---

## Documentation Files Reference

| File | Description |
|------|-------------|
| [NEXT_INTL_FIX_GUIDE.md](docs/NEXT_INTL_FIX_GUIDE.md) | Complete guide for next-intl + Next.js 16 fix |
| [TRANSLATION_ISSUE_ANALYSIS.md](docs/TRANSLATION_ISSUE_ANALYSIS.md) | Arabic translation issue analysis |
| [NEXTJS_16_MIGRATION_REPORT.md](docs/NEXTJS_16_MIGRATION_REPORT.md) | Next.js 14 to 16 migration report |
| [ARABIC_TRANSLATION_FIX_REPORT.md](docs/ARABIC_TRANSLATION_FIX_REPORT.md) | Arabic translation fix guide |
| [BUGFIX_BACKGROUND_COLOR.md](docs/BUGFIX_BACKGROUND_COLOR.md) | Dark theme background color fix |
| [PWA_ICONS_REQUIRED.md](docs/PWA_ICONS_REQUIRED.md) | PWA icon requirements |
| [font-color-fix-plan.md](docs/font-color-fix-plan.md) | Font color fix plan |
| [theme-icon-alignment-fix.md](docs/theme-icon-alignment-fix.md) | Theme toggle icon alignment fix |

---

## Testing Checklist

After applying fixes:

- [ ] Run `pnpm build` - Build should succeed
- [ ] Run `pnpm lint` - No errors
- [ ] Test English locale: `http://localhost:3000/en`
- [ ] Test Arabic locale: `http://localhost:3000/ar`
- [ ] Test story pages: `http://localhost:3000/en/stories/[slug]`
- [ ] Test Arabic RTL layout
- [ ] Test theme toggle (dark/light mode)
- [ ] Test language switcher
- [ ] Test PWA functionality
- [ ] Verify no 404 errors for static assets
- [ ] Verify no INVALID_MESSAGE errors in console

---

*This file is updated regularly as issues are discovered and fixed.*
