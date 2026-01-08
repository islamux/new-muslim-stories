# Bug Fix: Tailwind CSS v4 Migration Guide

The build is failing because Tailwind CSS v4 handles configuration and framework imports differently than v3. Below is the step-by-step guide to fix the `font-sans` and `font-heading` errors.

## Recommended Fix (Method A): Link Legacy Config

This is the fastest fix. You keep your `tailwind.config.ts` and just tell Tailwind v4 where it is.

### 1. Update [globals.css](file:///media/islamux/Variety/JavaScriptProjects/new-muslim-stories/src/app/globals.css)

Replace your top imports with this exact order:

```css
@import "tailwindcss";
@config "../../tailwind.config.ts";

@import "@fontsource/inter";
@import "@fontsource/montserrat";
```

> [!IMPORTANT]
> The `@import "tailwindcss"` and `@config` lines must be at the very top of the file for Tailwind to correctly discover your custom fonts like `font-heading`.

---

## Clean Fix (Method B): Native CSS Theme (Recommended for v4)

If you want to move away from the `.ts` config and use v4 features natively, do this instead:

### 1. Update [globals.css](file:///media/islamux/Variety/JavaScriptProjects/new-muslim-stories/src/app/globals.css)

```css
@import "tailwindcss";

/* Define your theme variables directly in CSS */
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Montserrat", sans-serif;

  --color-coral-500: #ff7060;
  --color-sky-500: #0ea5e9;
  /* Add other colors from your config here if needed */
}

@import "@fontsource/inter";
@import "@fontsource/montserrat";
```

## Verification

After applying either method, run:

```bash
pnpm build
```

The errors `Cannot apply unknown utility class font-sans` and `font-heading` should disappear.
