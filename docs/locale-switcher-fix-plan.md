# Plan to Fix the Locale Switcher Issue

This document outlines the plan to resolve the 404 error that occurs when switching locales.

## 1. The Problem

When you click the 'ar' button, the application incorrectly navigates to `http://localhost:3000/en/ar`, which results in a "404 Not Found" error. The new locale (`ar`) is being appended to the current locale (`en`) instead of replacing it.

## 2. The Cause

The issue lies within the `LanguageSwitcher.tsx` component. It currently uses the `usePathname` hook from `next-intl`'s navigation utilities. In your specific setup, this hook appears to be returning the pathname *with* the locale prefix (e.g., `/en/some-page`) instead of without it (e.g., `/some-page`). This causes the new path to be constructed incorrectly.

## 3. The Solution

To fix this, I will modify the `LanguageSwitcher.tsx` component to use a more reliable method for getting the current path without the locale. Instead of relying on the `usePathname` from `next-intl`, I will use the `useRouter` hook from `next/router`, which is the standard Next.js router. This hook provides the `asPath` property, which will give us the correct path to build the new URL.

**This approach is more robust because it uses the native Next.js router, which is guaranteed to be stable and work as expected.**

## 4. The Plan

1.  **Create `docs/locale-switcher-fix-plan.md`:** I will create this markdown file to outline the plan.
2.  **Wait for Approval:** I will wait for your approval before I modify any code.
3.  **Implement the Fix:** Once you approve, I will update the `LanguageSwitcher.tsx` component to use the `useRouter` hook from `next/router` and correctly construct the new navigation path.
4.  **Verify the Solution:** I will then ask you to test the application to confirm that the language switcher works correctly and the 404 error is gone.
