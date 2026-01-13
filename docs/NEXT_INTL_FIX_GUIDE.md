# Next.js 16 + next-intl Complete Fix Guide

**Date**: January 13, 2026
**Issue**: Arabic pages showing English translations + INVALID_MESSAGE errors
**Status**: ✅ RESOLVED

---

## Table of Contents

1. [Problem Summary](#problem-summary)
2. [Root Cause Analysis](#root-cause-analysis)
3. [Complete Solution](#complete-solution)
4. [File-by-File Changes](#file-by-file-changes)
5. [Verification Steps](#verification-steps)
6. [Key Learnings](#key-learnings)

---

## Problem Summary

### Issues Encountered

1. **INVALID_MESSAGE Error**: Browser requests for missing static assets (icon files) were being processed as locale routes
2. **Arabic pages showing English text**: Visiting `/ar` displayed English translations instead of Arabic
3. **Outdated i18n configuration**: Using old next-intl API incompatible with Next.js 16

### Error Messages Seen

```
Error: INVALID_MESSAGE: Incorrect locale information provided
    at Footer (src/components/Footer.tsx:12:12)
```

```
Header - Current locale: icon-192x192.png
Header - Current locale: ar
Header - Translation for title: Stories of Guidance from Around the World
```

---

## Root Cause Analysis

### Issue 1: Missing Static Assets

The `public/` folder was missing `icon-192x192.png` and `icon-512x512.png` files that were referenced in:
- `src/app/layout.tsx` (favicon links)
- `public/manifest.json` (PWA icons)

When the browser requested these files, Next.js treated them as routes and passed them through the i18n middleware, which tried to process `icon-192x192.png` as a locale.

### Issue 2: Missing `setRequestLocale` Calls

The layout and pages were calling `getMessages()` without first calling `setRequestLocale(locale)`. This is **required** in next-intl to tell the library which locale's messages to load.

Without `setRequestLocale()`, next-intl couldn't determine the correct locale and defaulted to English messages.

### Issue 3: Outdated i18n Configuration

The project was using the old next-intl API:
- Old: `src/i18n.ts` with `({ locale })` parameter
- Old: Manual locale validation without `routing.ts`
- Old: Importing `locales` directly from i18n config

Next.js 16 with next-intl requires:
- New: `src/i18n/request.ts` with `({ requestLocale })` parameter
- New: `src/i18n/routing.ts` for centralized routing config
- New: `setRequestLocale()` in all layouts and pages

---

## Complete Solution

### Architecture Overview

The proper next-intl setup for Next.js 16 requires these files:

```
src/
├── i18n/
│   ├── routing.ts      # Central routing configuration
│   └── request.ts      # Request configuration (renamed from i18n.ts)
├── proxy.ts            # Middleware (renamed from middleware.ts in Next.js 16)
├── navigation.ts       # Navigation APIs
└── app/
    └── [locale]/
        ├── layout.tsx  # Must call setRequestLocale()
        └── page.tsx    # Must call setRequestLocale()
```

---

## File-by-File Changes

### 1. Created Missing Icon Files

**Location**: `public/`

```bash
# Created using ImageMagick
convert -size 192x192 xc:'#22C55E' -gravity center -pointsize 72 -fill white -annotate +0+0 "NM" public/icon-192x192.png
convert -size 512x512 xc:'#22C55E' -gravity center -pointsize 180 -fill white -annotate +0+0 "NM" public/icon-512x512.png
```

**Result**: Eliminated 404 errors for icon requests that were being processed as locale routes.

---

### 2. Created `src/i18n/routing.ts`

**Purpose**: Central place to define routing configuration used by proxy, navigation, and request config.

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en'
});
```

**Why this matters**:
- Single source of truth for locale configuration
- Used by `proxy.ts`, `navigation.ts`, and `request.ts`
- Required for Next.js 16 + next-intl integration

---

### 3. Renamed `src/i18n.ts` → `src/i18n/request.ts`

**Old Code** (`src/i18n.ts`):
```typescript
export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || 'en';
  if (!locales.includes(currentLocale)) notFound();
  const messages = (await import(`../messages/${currentLocale}.json`)).default;
  return { locale: currentLocale, messages, timeZone: 'Asia/Aden' };
});
```

**New Code** (`src/i18n/request.ts`):
```typescript
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  // Validate locale using routing config
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    timeZone: 'Asia/Aden',
  };
});
```

**Key Changes**:
- ✅ Parameter renamed: `{ locale }` → `{ requestLocale }`
- ✅ Uses `hasLocale()` helper from next-intl
- ✅ Imports `routing` from central config
- ✅ Path adjusted for messages: `../messages/` → `../../messages/` (moved to `i18n/` subdirectory)

---

### 4. Updated `next.config.mjs`

**Changed the plugin path**:
```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
//                                    ^^^^^^^^^^^^^^^^^^^^
//                                    Changed from './src/i18n.ts'

const nextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
```

---

### 5. Updated `src/navigation.ts`

**Old Code**:
```typescript
import { createNavigation } from 'next-intl/navigation';
import { locales } from './i18n'; // ❌ Old import path

export const { Link, redirect, usePathname, useRouter } = createNavigation({ locales });
```

**New Code**:
```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/i18n/routing'; // ✅ Import from routing.ts

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

---

### 6. Updated `src/proxy.ts`

**Old Code**:
```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],      // ❌ Hardcoded
  defaultLocale: 'en',        // ❌ Hardcoded
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*'], // ❌ Incorrect matcher
};
```

**New Code**:
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing); // ✅ Uses routing config

export const config = {
  // Match only internationalized pathnames.
  // This regex excludes paths for static assets, API routes, and Next.js internal files.
  matcher: ['/((?!api|_next|.*\\..*).*)'], // ✅ Proper matcher
};
```

**Matcher Explanation**:
- `(?!api|_next|.*\\..*)` = Negative lookahead (exclude if matches)
- `api` = Exclude API routes
- `_next` = Exclude Next.js internal files
- `.*\\..*` = Exclude paths with dots (static files like `.png`, `.json`, etc.)

---

### 7. Updated `src/app/[locale]/layout.tsx` ⭐ **CRITICAL**

**This was the main cause of Arabic pages showing English!**

**Old Code**:
```typescript
import { getMessages, getTimeZone } from 'next-intl/server'; // ❌ Missing setRequestLocale

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages(); // ❌ Doesn't know which locale to use!
  // ...
}
```

**New Code**:
```typescript
import { getMessages, getTimeZone, setRequestLocale } from 'next-intl/server'; // ✅ Import setRequestLocale
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // ⭐ CRITICAL: Enable static rendering and set locale for all next-intl calls
  setRequestLocale(locale);

  const messages = await getMessages(); // ✅ Now knows to use Arabic messages!
  // ...
}
```

**Why `setRequestLocale()` is Critical**:

According to [next-intl documentation](https://next-intl.dev/docs/routing/setup):

> `setRequestLocale` needs to be called before you invoke any functions from `next-intl` like `useTranslations` or `getMessages`.

Without this:
- `getMessages()` doesn't know which locale to load
- Defaults to the first available messages (English)
- All pages show English regardless of URL locale

With this:
- Sets the locale in a request-scoped store
- All next-intl APIs (`getMessages`, `useTranslations`, etc.) use the correct locale
- Pages display proper translations

---

### 8. Updated `src/app/[locale]/page.tsx`

**Added `setRequestLocale()` call**:

```typescript
import { getSortedStoriesData } from '@/lib/stories';
import HomePageClient from '@/components/HomePageClient';
import { setRequestLocale } from 'next-intl/server'; // ✅ Import

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale); // ✅ Call before using any next-intl APIs

  const stories = await getSortedStoriesData(locale);
  return <HomePageClient stories={stories} />;
}
```

---

### 9. Cleaned Up `src/components/Header.tsx`

**Removed debug logging**:
```typescript
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useHasMounted } from '@/hooks/useHasMounted';

export default function Header() {
  const t = useTranslations('Index');
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;
  return (
    <section className="bg-gray-100 dark:bg-gray-850 py-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t('title')}
        </h2>
      </div>
    </section>
  );
}
```

---

## Verification Steps

### 1. Restart Development Server

```bash
# Stop any existing server
pkill -9 -f "next dev"

# Start fresh
pnpm dev
```

### 2. Test English Page

Visit: `http://localhost:3000/en`

**Expected**:
- ✅ Title: "Stories of Guidance from Around the World"
- ✅ All content in English
- ✅ No errors in console
- ✅ Direction: LTR (left-to-right)

### 3. Test Arabic Page

Visit: `http://localhost:3000/ar`

**Expected**:
- ✅ Title: "قصص هداية من جميع أنحاء العالم"
- ✅ All content in Arabic
- ✅ No errors in console
- ✅ Direction: RTL (right-to-left)

### 4. Test Static Assets

Check browser console for 404 errors:
- ✅ No 404 errors for `icon-192x192.png`
- ✅ No 404 errors for `icon-512x512.png`
- ✅ No `INVALID_MESSAGE` errors

### 5. Test Locale Switching

Click language switcher or manually change URL:
- ✅ `/en` → `/ar` switches to Arabic
- ✅ `/ar` → `/en` switches to English
- ✅ Content updates immediately
- ✅ No page reload required for client components

---

## Key Learnings

### 1. Next.js 16 Changed `middleware.ts` → `proxy.ts`

In Next.js 16, the middleware file is now called `proxy.ts`. The functionality is the same, just renamed.

### 2. next-intl Requires `setRequestLocale()` for Static Rendering

**This is the most important takeaway**:

```typescript
// ❌ WRONG - Doesn't work
export default async function Page({ params }) {
  const { locale } = await params;
  const messages = await getMessages(); // Doesn't know locale!
  // ...
}

// ✅ CORRECT - Works properly
export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale); // Must call first!
  const messages = await getMessages(); // Now knows locale
  // ...
}
```

### 3. Static Assets Need Proper Matcher

The middleware matcher must exclude static files:

```typescript
matcher: ['/((?!api|_next|.*\\..*).*)']
//         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//         Exclude: api routes, _next internals, files with dots
```

### 4. Centralized Routing Config

The new `src/i18n/routing.ts` pattern provides:
- Single source of truth for locales
- Type safety across the app
- Easier maintenance
- Consistent configuration

### 5. The `requestLocale` Parameter

In Next.js 16, the parameter changed from `locale` to `requestLocale`:
- Old: `getRequestConfig(async ({ locale }) => ...)`
- New: `getRequestConfig(async ({ requestLocale }) => ...)`

This is because Next.js now passes the `params` promise directly.

---

## Common Issues & Solutions

### Issue: "Couldn't find next-intl config file"

**Solution**: Ensure `next.config.mjs` points to the correct path:
```javascript
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
```

### Issue: Arabic shows English text

**Solution**: Add `setRequestLocale(locale)` before any `getMessages()` or `useTranslations()` calls.

### Issue: Static assets show INVALID_MESSAGE error

**Solution**:
1. Create missing static files
2. Update proxy matcher to exclude files with dots: `.*\\..*`

### Issue: "Cannot read property 'locales' of undefined"

**Solution**: Ensure `routing.ts` is created and properly exported:
```typescript
export const routing = defineRouting({ locales: ['en', 'ar'], defaultLocale: 'en' });
```

---

## File Structure Summary

### Before (Broken)
```
src/
├── i18n.ts                    # ❌ Old API
├── proxy.ts                   # ❌ Using hardcoded locales
├── navigation.ts              # ❌ Importing from wrong place
└── app/[locale]/
    ├── layout.tsx             # ❌ Missing setRequestLocale
    └── page.tsx               # ❌ Missing setRequestLocale
```

### After (Fixed)
```
src/
├── i18n/
│   ├── routing.ts             # ✅ Central routing config
│   └── request.ts             # ✅ New API with requestLocale
├── proxy.ts                   # ✅ Using routing config
├── navigation.ts              # ✅ Importing from routing
└── app/[locale]/
    ├── layout.tsx             # ✅ Calls setRequestLocale
    └── page.tsx               # ✅ Calls setRequestLocale
```

---

## References

### Official Documentation
- [next-intl Routing Setup](https://next-intl.dev/docs/routing/setup)
- [next-intl Middleware/Proxy](https://next-intl.dev/docs/routing/middleware)
- [next-intl Server & Client Components](https://next-intl.dev/docs/environments/server-client-components)

### Key Documentation Points
1. Always call `setRequestLocale(locale)` before `getMessages()`
2. Use `routing.ts` for centralized configuration
3. Updated `requestLocale` parameter for Next.js 16
4. Proper matcher to exclude static assets

---

## Conclusion

This fix involved:
1. ✅ Creating missing static assets (icons)
2. ✅ Updating to Next.js 16 + next-intl API
3. ✅ Adding `setRequestLocale()` calls (critical!)
4. ✅ Creating proper file structure with `routing.ts` and `request.ts`
5. ✅ Updating proxy matcher to exclude static files

The main issue was **missing `setRequestLocale()` calls**, which prevented next-intl from knowing which locale's messages to load, causing all pages to show English regardless of the URL.

---

**Last Updated**: January 13, 2026
**Next.js Version**: 16.1.1
**next-intl Version**: 4.4.0
