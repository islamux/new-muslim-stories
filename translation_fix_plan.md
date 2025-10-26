# Plan to Fix Hero Object Translation Issue

## Problem Description
When the application language is switched to Arabic, the "Hero" object's content (headline, subheadline, exploreStories) in the `HeroSection` component remains in English, despite the `messages/ar.json` file containing the correct Arabic translations.

## Analysis

1.  **Internationalization Library:** The project uses `next-intl` for internationalization, as evidenced by `src/i18n.ts` and `src/components/HeroSection.tsx`.
2.  **`src/i18n.ts`:** This file configures `next-intl/server` to load messages dynamically based on the `locale` from `../messages/${currentLocale}.json`. It includes `en` and `ar` in its `locales` array. A `console.log` statement exists to show loaded messages.
3.  **`src/components/HeroSection.tsx`:** This component is a client component (`"use client"`) and uses `useTranslations('Hero')` to fetch translations from the "Hero" namespace using keys like `headline`, `subheadline`, and `exploreStories`.
4.  **`messages/ar.json` and `messages/en.json`:** Both files contain a "Hero" object with the necessary keys and their respective translations (Arabic in `ar.json`, English in `en.json`).

The issue likely stems from the `next-intl` middleware or the language switching mechanism not correctly propagating the selected Arabic locale to the server-side `getRequestConfig` or the client-side `useTranslations` hook.

## Phases

### Phase 1: Verify `next-intl` Configuration and Message Loading

1.  **Confirm `next-intl` setup:**
    *   Review `src/i18n.ts` to ensure `getRequestConfig` is correctly configured and the `locales` array (`['en', 'ar']`) is accurate.
    *   Verify that the dynamic import path `../messages/${currentLocale}.json` is correct and resolves to the actual message files.
2.  **Examine `HeroSection.tsx`:**
    *   Confirm that `useTranslations('Hero')` is used correctly and that the translation keys (`headline`, `subheadline`, `exploreStories`) match those in the JSON message files.

### Phase 2: Debugging and Identifying the Root Cause

1.  **Runtime Message Loading Check (Server-side):**
    *   Run the application in development mode.
    *   Switch the language to Arabic using the application's language switcher.
    *   **Crucially, check the server-side console output** for the `console.log` message from `src/i18n.ts`.
        *   **Expected:** The log should show `i18n.ts - Loaded messages for ar:` followed by the Arabic content of the `Hero` object.
        *   **If English messages are logged for Arabic locale, or no log for 'ar':** This indicates that the `locale` being passed to `getRequestConfig` is incorrect or not being updated. This points to an issue in the middleware or how the locale is determined from the request.
2.  **Client-side `next-intl` Context Inspection:**
    *   Using browser developer tools (e.g., React DevTools), inspect the `HeroSection` component and its props/context after switching to Arabic.
    *   Look for the `next-intl` context or any props related to translations to see what messages are actually available to the component. This helps determine if the client is receiving the correct translations from the server.
3.  **Review Language Switching Mechanism:**
    *   Identify and examine the `LanguageSwitcher` component (likely `src/components/LanguageSwitcher.tsx`).
    *   Understand how it triggers a language change. Does it modify the URL (e.g., `/ar/stories` vs. `/en/stories`) or set a cookie?
    *   Examine `src/middleware.ts` to see how `next-intl`'s middleware is configured to detect and handle locale changes from the request. Ensure it correctly reads the locale from the URL path or a cookie.
    *   Check `src/navigation.ts` if it's involved in generating locale-aware URLs.

### Phase 3: Proposed Solution Steps

Based on the debugging in Phase 2, the solution will likely involve one or more of the following:

1.  **Correcting `middleware.ts` for Locale Detection:**
    *   Ensure `src/middleware.ts` is correctly configured to use `next-intl`'s `createIntlMiddleware` and that it's properly detecting the locale from the request (e.g., from the URL path segment like `/ar` or `/en`).
    *   Verify that the `localePrefix` in `middleware.ts` (if used) matches the application's routing strategy.
2.  **Ensuring Language Switcher Updates Locale Correctly:**
    *   Modify `src/components/LanguageSwitcher.tsx` to ensure that when a language is selected, it correctly updates the URL path with the new locale (e.g., navigating to `/ar/current-page` when Arabic is selected). This is the standard way `next-intl` works with Next.js App Router.
3.  **Verifying `next-intl` Provider in Root Layout:**
    *   Confirm that the `next-intl` `IntlProvider` (or equivalent) is correctly wrapping the application in `src/app/[locale]/layout.tsx` and receiving the `messages` prop from `i18n.ts`. This ensures that server-loaded messages are passed down to client components.

### Phase 4: Verification

1.  **Run the application:** Start the development server (`pnpm dev`).
2.  **Navigate to a page:** Access a page that displays the `HeroSection`.
3.  **Switch to Arabic:** Use the language switcher to change the application language to Arabic.
4.  **Observe UI:** Confirm that the text within the `HeroSection` (headline, subheadline, exploreStories) now correctly displays in Arabic.
5.  **Check Server Logs:** Verify that the `console.log` in `src/i18n.ts` shows the Arabic messages being loaded for the `ar` locale.
6.  **Check Browser Network/Console:** Look for any errors or unexpected behavior related to i18n.

This plan adheres to the guidelines by providing a detailed, step-by-step approach to diagnose and resolve the issue, focusing on understanding the existing setup and proposing changes in an MD file rather than directly modifying code.
