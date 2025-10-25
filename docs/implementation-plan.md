# Implementation Plan: Fixing ESLint and Final Verification

This document outlines the step-by-step plan to resolve the project's ESLint configuration issues and verify the initial bug fix.

## Phase 1: Fix the ESLint Configuration

The goal of this phase is to create a modern, working ESLint setup that is compatible with the project's updated dependencies.

*   **Step 1: Create a New `eslint.config.mjs` File**
    I will write a new `eslint.config.mjs` file from scratch. This file will use the modern "flat config" format required by the latest version of ESLint.

*   **Step 2: Integrate Next.js Rules with `FlatCompat`**
    To ensure the official Next.js ESLint rules are applied correctly, I will use the `FlatCompat` utility from `@eslint/eslintrc`. This tool acts as a bridge, allowing the older format of the Next.js configuration to work within the new flat config structure.

*   **Step 3: Add TypeScript and Global Variable Support**
    I will add the necessary configurations to enable ESLint to understand TypeScript code and recognize global variables for environments like browsers and Node.js.

*   **Step 4: Add Custom Rules**
    I will re-add the existing custom rule `"react/no-unescaped-entities": "off"` to the new configuration.

*   **Step 5: Verify the ESLint Fix**
    After creating the new configuration file, I will run the command `pnpm exec eslint .` to confirm that the linter executes successfully without any configuration errors.

## Phase 2: Verify the Original Bug Fix

After the ESLint issue is resolved, we need to confirm that the original problem that started this process is also fixed.

*   **Step 1: Final Verification**
    I will ask you to run the application to ensure that the initial `TypeError: usePathname is not a function` error in the `LanguageSwitcher` component is gone and that the language switching functionality works as expected.
