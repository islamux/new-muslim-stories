# Root Cause Analysis for i18n Issue in `HeroSection.tsx`

This document provides a root-cause analysis for the internationalization (i18n) issue where the `HeroSection.tsx` component exclusively renders in English, ignoring the locale switch to Arabic (`ar`).

## 1. Executive Summary

**Most Likely Cause:** The `HeroSection` component is not receiving the Arabic messages from its context provider. `next-intl` is therefore gracefully falling back to the default locale's messages (English) for the `Hero` namespace, which is why you see English text instead of a crash.

This is not a bug in the component itself, but rather an issue with how the `NextIntlClientProvider` is configured on the page where `HeroSection` is used. It's highly probable that a "per-page" message optimization strategy has been incompletely implemented.

**Assumption:** You are using a message-splitting strategy, where the root layout (`[locale]/layout.tsx`) provides messages for shared components (e.g., `Navigation`), and individual pages are responsible for providing their own specific messages.

---

## 2. Detailed Explanation

In the Next.js App Router, `next-intl` uses a provider model to deliver messages to Client Components:

1.  **Server-Side Fetching:** A Server Component (typically a layout or page) fetches the required translation messages for the current locale.
2.  **Provider Context:** It then passes these messages via the `<NextIntlClientProvider />` to Client Components (`"use client"`) within its subtree.
3.  **Client-Side Hook:** The Client Component, `HeroSection.tsx` in this case, uses the `useTranslations()` hook to access those messages from the provider's context.

The failure occurs when the messages provided to the context **do not include the `'Hero'` namespace**. While your `LanguageSwitcher` and other components work (likely because their namespaces like `'languageSwitcher'` are correctly provided in the root layout), the `HeroSection` is left without its specific translations.

This scenario is common when optimizing message delivery. For instance, `[locale]/layout.tsx` might only provide messages for a shared header and footer:

-   The root layout's provider is configured with `messages` for `Navigation` and `Footer`.
-   The home page (`[locale]/page.tsx`) renders the `HeroSection`.
-   **Crucially, the home page fails to wrap its content in a *new* `<NextIntlClientProvider />` to provide the `'Hero'` messages.**

As a result, `useTranslations('Hero')` finds a provider but not its required namespace, triggering the fallback to English.

---

## 3. High-Confidence Fixes

Based on the analysis, here are two distinct solutions. I will not provide code, only the strategic approach.

### Fix 1: Global Message Provider (Simplest)

This approach prioritizes simplicity over granular optimization.

-   **Strategy:** Configure the single `<NextIntlClientProvider />` in your root layout (`src/app/[locale]/layout.tsx`) to receive **all** translation messages for the current locale.
-   **Action:** In that file, ensure you are passing the entire `messages` object to the provider, without using a utility like `pick` to select a subset of namespaces. This guarantees that all Client Components in your application, including `HeroSection`, have access to all translations they could possibly need.

### Fix 2: Per-Page Message Provider (Optimized)

This approach is for when you intentionally want to split translations to minimize the client-side bundle size.

-   **Strategy:** Explicitly provide the `Hero` messages at the page level.
-   **Action:** In the file that renders `<HeroSection />` (most likely `src/app/[locale]/page.tsx`), you must fetch the messages and wrap the page's contents in another `<NextIntlClientProvider />`. This nested provider should be configured to receive the specific namespaces needed for that page, including `'Hero'`.

---

## 4. Diagnostic Checklist

Follow these steps to confirm the diagnosis before applying a fix.

1.  **Confirm Message Integrity:**
    -   [ ] Open `messages/ar.json`.
    -   [ ] Verify that the top-level key `"Hero"` exists and that it contains the translated Arabic strings for `"headline"`, `"subheadline"`, and `"exploreStories"`. This check rules out the simplest cause of the problem.

2.  **Analyze the Root Layout:**
    -   [ ] Open `src/app/[locale]/layout.tsx`.
    -   [ ] Locate the `<NextIntlClientProvider />`.
    -   [ ] Examine the `messages` prop being passed to it. Is it the complete `messages` object, or is a utility like `pick` used to only pass certain namespaces (e.g., `pick(messages, ['Navigation'])`)? This is the most critical diagnostic question.

3.  **Analyze the Page Component:**
    -   [ ] Open the file that renders `HeroSection` (likely `src/app/[locale]/page.tsx`).
    -   [ ] **If your answer to step #2 was "a subset of messages is being passed",** then you must check the following: Is the `<HeroSection />` component (or the entire page content) wrapped in its own `<NextIntlClientProvider />`? If not, you have found the cause of the issue.

4.  **Confirm with Component Relocation (Sanity Check):**
    -   [ ] Identify a component where translations are working correctly (e.g., the `Footer`).
    -   [ ] Temporarily edit that component's file to import and render `<HeroSection />` inside of it.
    -   [ ] Switch the site to Arabic. If `HeroSection` now correctly displays in Arabic, it definitively confirms that the issue is not with the component itself, but with the missing provider context at its original location.
