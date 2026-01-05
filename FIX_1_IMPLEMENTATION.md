# Implementing "Fix 1: Global Message Provider" for `next-intl`

This document outlines the steps to implement "Fix 1: Global Message Provider" as described in the `DIAGNOSIS.md` file. The goal is to ensure that all Client Components in your application, including `HeroSection.tsx`, consistently receive the correct translations for the active locale by making all messages globally available.

## The Problem

As identified, the `HeroSection.tsx` component is currently not receiving its Arabic translations. This occurs because the messages for the `'Hero'` namespace are likely not being passed to the `NextIntlClientProvider` within its rendering context, causing `next-intl` to fall back to the default language (English).

This fix addresses the problem by ensuring that the primary `NextIntlClientProvider` located high in your component tree makes all available translations accessible to every Client Component.

## Implementation Steps

To implement the "Global Message Provider" strategy, you will primarily focus on your root layout file:

1.  **Locate the Root Layout File:**
    *   Open `src/app/[locale]/layout.tsx`. This file is responsible for setting up the main structure and providers for your application, including the internationalization context.

2.  **Fetch All Messages:**
    *   Within `src/app/[locale]/layout.tsx`, ensure that you are fetching all messages for the current locale. You should see a line similar to:
        ```
        const messages = await getMessages();
        ```
    *   The `getMessages()` function from `next-intl/server` is designed to retrieve the full set of messages defined in your `messages/{locale}.json` files.

3.  **Ensure Full Message Pass-through to `NextIntlClientProvider`:**
    *   The crucial step is to verify how these `messages` are passed to your `NextIntlClientProvider`. In your current setup, the `LocaleLayout` passes these messages to `ClientProviders`, which in turn passes them to `NextIntlClientProvider`.
    *   You must ensure that the entire `messages` object, as obtained from `await getMessages()`, is passed directly to the `messages` prop of the `NextIntlClientProvider` (or `ClientProviders`).
    *   **Check for and remove any filtering:** If you find any code that uses a utility function (like `pick` from `lodash`) or manual object destructuring/selection to pass only a subset of the `messages` object to the provider, you must remove it. The `messages` object must be passed as-is, without any modifications that would reduce its content.

    *   **Conceptual Example (do not copy-paste):** The conceptual idea is that the `messages` variable, after `await getMessages()`, should be directly assigned to the `messages` prop of the internationalization provider component. No intermediate steps should filter out namespaces like `'Hero'`.

## Post-Implementation Steps

After making these changes, it is critical to perform a clean build and clear caches to ensure the new configuration is fully applied.

1.  **Stop Development Server:**
    *   If your development server is running, stop it.

2.  **Thorough Clean and Rebuild:**
    *   Open your terminal in the project's root directory and run the following commands:
        ```bash
        pnpm dlx rimraf .next/
        pnpm install
        pnpm run build
        pnpm run dev
        ```
        *The `pnpm dlx rimraf .next/` command removes the Next.js build cache.
        *The `pnpm install` command ensures all dependencies are correctly installed.
        *The `pnpm run build` command creates a fresh production build.
        *The `pnpm run dev` command starts your development server with the fresh build.*

3.  **Clear Browser Cache:**
    *   In your web browser, clear the cache and cookies for your application's domain. Perform a hard refresh (usually `Ctrl+Shift+R` on Windows/Linux or `Cmd+Shift+R` on macOS).

4.  **Verify Translation:**
    *   Navigate to your application and switch the locale to Arabic.
    *   Verify that the text within `HeroSection.tsx` now correctly displays in Arabic.

By following these steps, the `Hero` namespace translations should become available to `HeroSection`, resolving the issue.
