# Plan to Fix Font Loading Error by Self-Hosting Fonts

This document outlines the plan to resolve the `FetchError` related to Google Fonts during the build process. The solution is to self-host the `Inter` and `Montserrat` fonts, as detailed in the existing `docs/self-hosting-fonts.md` guide.

### The Problem

The build is failing because it cannot fetch fonts from `fonts.gstatic.com`. This is likely due to a network issue or an environment without internet access.

### The Solution

We will self-host the fonts by following these steps:

**Step 1: Create Font Directory**

*   Create a new directory: `public/fonts`.

**Step 2: Obtain Font Files**

*   I will search for the `Inter` and `Montserrat` `.woff2` font files and add them to the `public/fonts` directory.

**Step 3: Update CSS**

*   Add `@font-face` rules to `src/app/globals.css` to define the `Inter` and `Montserrat` font families using the local font files.

**Step 4: Update Tailwind CSS Configuration**

*   Modify `tailwind.config.ts` to include `inter` and `montserrat` in the `theme.fontFamily` configuration. This will make `font-inter` and `font-montserrat` utility classes available.

**Step 5: Update Root Layout**

*   In `src/app/layout.tsx`:
    *   Remove the imports from `next/font/google`.
    *   Remove the `Inter` and `Montserrat` font object initializations.
    *   Apply the new `font-inter` and `font-montserrat` classes to the `<html>` element.

This plan follows the best practices outlined in the project's documentation and will result in a more robust build process that is not dependent on external font providers.
