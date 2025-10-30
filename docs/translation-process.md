# Step-by-Step Translation Process

This document outlines the process for managing and implementing translations within this Next.js project, which utilizes `next-intl` for internationalization.

## 1. Defining Locales

First, the supported locales (languages) are defined in `src/i18n.ts` and `src/middleware.ts`. Currently, the project supports English (`en`) and Arabic (`ar`).

*   **`src/i18n.ts`:**
    ```typescript
    const locales = ['en', 'ar'];
    // ...
    export default getRequestConfig(async ({ locale }) => {
      // ...
      if (!locales.includes(currentLocale)) notFound();
      // ...
    });
    ```

*   **`src/middleware.ts`:**
    ```typescript
    export default createMiddleware({
      locales: ['en', 'ar'],
      defaultLocale: 'en',
    });

    export const config = {
      matcher: ['/', '/(ar|en)/:path*'],
    };
    ```
    The `matcher` in `middleware.ts` ensures that only internationalized paths are processed, allowing for URL structures like `/en/about` or `/ar/about`.

## 2. Creating Message Files

Translation messages for each locale are stored in separate JSON files within the `messages/` directory. Each file corresponds to a locale (e.g., `messages/en.json` for English, `messages/ar.json` for Arabic).

**Example (`messages/en.json`):**
```json
{
  "Index": {
    "title": "Stories of Guidance from Around the World",
    "featuredStories": "Featured Stories"
    // ...
  },
  "Hero": {
    "headline": "Discover Inspiring Journeys"
    // ...
  }
}
```

**To add a new language:**
1.  Create a new JSON file in the `messages/` directory (e.g., `messages/es.json` for Spanish).
2.  Add the new locale to the `locales` array in both `src/i18n.ts` and `src/middleware.ts`.
3.  Update the `matcher` in `src/middleware.ts` to include the new locale (e.g., `matcher: ['/', '/(ar|en|es)/:path*']`).

## 3. Loading Translations

The `next-intl/server`'s `getRequestConfig` function in `src/i18n.ts` is responsible for loading the correct message file based on the detected locale.

```typescript
// src/i18n.ts
// ...
export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || 'en';
  // ...
  const messages = (await import(`../messages/${currentLocale}.json`)).default;
  return {
    locale: currentLocale,
    messages,
    timeZone: 'Asia/Aden',
  };
});
```
This setup ensures that the appropriate translations are available for server-side rendering.

## 4. Using Translations in Components

In React components, the `useTranslations` hook from `next-intl` is used to access the translated messages. You specify a namespace (e.g., `Index`, `Hero`, `Common`) to retrieve translations from a specific section of your JSON message files.

**Example (Conceptual):**
```typescript
// In a React component (e.g., src/app/[locale]/page.tsx)
'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Index'); // Accessing translations from the 'Index' namespace

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('featuredStories')}</p>
      {/* ... */}
    </div>
  );
}
```

## 5. Locale-Aware Navigation

The project uses `next-intl/navigation` to provide locale-aware versions of Next.js's navigation hooks and components. This ensures that when users navigate, the locale is preserved or correctly updated in the URL.

*   **`src/navigation.ts`:**
    ```typescript
    import { createNavigation } from 'next-intl/navigation';
    import { locales } from './i18n';

    export const { Link, redirect, usePathname, useRouter } = createNavigation({ locales });
    ```

*   **Usage in Components:**
    ```typescript
    // In a React component
    import { Link } from '@/src/navigation'; // Using the locale-aware Link

    function MyComponent() {
      return (
        <Link href="/about">
          About Us
        </Link>
      );
    }
    ```
    When using this `Link` component, `next-intl` will automatically prepend the current locale to the `href` (e.g., `/en/about` or `/ar/about`).

## 6. Adding New Translatable Content

To add new translatable text to the project:

1.  **Identify the Text:** Determine the text that needs to be translated.
2.  **Choose a Namespace:** Decide which section of your message JSON files (e.g., `Index`, `Common`, `Story`) the new text belongs to. If it's a new logical grouping, you might create a new top-level key.
3.  **Add to JSON Files:** Add a new key-value pair to the appropriate JSON files for *all* supported locales. Ensure the key is consistent across all language files.
    ```json
    // messages/en.json
    {
      "Common": {
        "newFeatureText": "This is a new feature!"
      }
    }

    // messages/ar.json
    {
      "Common": {
        "newFeatureText": "هذه ميزة جديدة!"
      }
    }
    ```
4.  **Use in Component:** In your React component, import `useTranslations` and use the new key.
    ```typescript
    import { useTranslations } from 'next-intl';

    function MyNewComponent() {
      const t = useTranslations('Common');
      return <p>{t('newFeatureText')}</p>;
    }
    ```

By following these steps, you can effectively manage and implement translations throughout the project.