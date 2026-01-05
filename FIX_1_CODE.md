# Real Code for Implementing "Fix 1: Global Message Provider"

This document contains the explicit code for implementing the "Global Message Provider" strategy. The goal is to ensure that your setup perfectly matches the recommended approach for making all translations globally available via `next-intl`.

By design, this code fetches all translation messages in the root server-side layout and passes them down to the client-side provider, making them available to all Client Components, including `HeroSection.tsx`.

---

## 1. `src/app/[locale]/layout.tsx`

This file serves as the root server-side layout. Its responsibility is to fetch the messages and pass them to the client-side providers.

**Why this code is correct:**
-   `await getMessages()`: This function from `next-intl/server` correctly fetches the complete set of messages for the given `locale`.
-   **No Filtering:** The `messages` object is passed directly to the `ClientProviders` component without any filtering or subsetting (e.g., using a `pick` function). This is the core of the "Global" strategy.

```typescript
import { ReactNode } from 'react';
import { getMessages, getTimeZone } from 'next-intl/server';
import ClientProviders from '@/components/ClientProviders';
import type { Locale } from '@/types';

interface LocaleLayoutProps  {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  // Fetches all messages for the active locale
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  // Passes the complete messages object to the client-side providers
  return (
    <ClientProviders messages={messages} locale={locale} timeZone={timeZone}>
      <html lang={locale}>
        <body className="bg-white dark:bg-gray-900 transition-colors duration-300">
          <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>{children}</div>
        </body>
      </html>
    </ClientProviders>
  );
}
```

---

## 2. `src/components/ClientProviders.tsx`

This file is a Client Component (`'use client'`) that wraps all the necessary client-side providers, including `NextIntlClientProvider`.

**Why this code is correct:**
-   It receives the `messages` object from the server-side `LocaleLayout`.
-   It passes this `messages` object directly to `NextIntlClientProvider`, which establishes the context for all child components to access translations.

```typescript
'use client';

import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from 'next-themes';
import PWAInstallPrompt from './PWAInstallPrompt';
import type { ClientProvidersProps } from '@/types/component.types';

export default function ClientProviders({ messages, locale, timeZone, children }: ClientProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone}>
        <ParallaxProvider>
          {children}
          <PWAInstallPrompt />
        </ParallaxProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
```

---

## Post-Implementation Steps

After confirming your files match the code above, the most critical step is to perform a thorough cleanup of all caches and rebuild the project. This ensures that your application serves the correct, most recent bundles.

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
    *These commands will remove the build cache, reinstall dependencies, create a fresh production build, and start the development server.*

3.  **Clear Browser Cache:**
    *   In your web browser, clear the cache and cookies for your application's domain. Perform a hard refresh (usually `Ctrl+Shift+R` on Windows/Linux or `Cmd+Shift+R` on macOS).

By following these steps, you will have a confirmed and correct implementation of the "Global Message Provider" strategy, which should resolve the translation issue in `HeroSection.tsx`.
