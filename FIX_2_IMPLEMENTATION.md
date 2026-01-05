# Implementing "Fix 2: Per-Page Message Provider" (Pure JS Alternative)

This document provides the code to implement the "Per-Page Message Provider" strategy using only pure JavaScript, without any external libraries like `lodash`.

### **Important Context**

As previously discussed, your application's `src/app/[locale]/layout.tsx` is already configured to provide **all** messages globally. The "Per-Page" strategy is typically used when you intentionally *split* translations for optimization (e.g., the root layout only provides shared navigation translations).

Therefore, implementing this fix adds a **redundant, nested provider** on your homepage. While this might resolve the symptom by forcing the `Hero` messages to be explicitly re-provided, please be aware that the underlying root cause is still most likely a **caching or stale build issue**, which should be addressed with a thorough cache-clearing and rebuild process.

---

## 1. Modify `src/app/[locale]/page.tsx`

The goal is to wrap the content of your homepage with its own `NextIntlClientProvider` that explicitly provides the translations needed for that page.

**Changes to be made:**
1.  Import `getMessages` and `NextIntlClientProvider` from `next-intl`.
2.  Define a small helper function that replicates the behavior of `lodash/pick` using pure JavaScript.
3.  In the `Home` component, get all messages using `getMessages()`.
4.  Use your new helper function to select the namespaces used on the homepage (e.g., `Index`, `Hero`, `Common`).
5.  Wrap the returned `HomePageClient` component in a `<NextIntlClientProvider>` and pass the picked messages to it.

Below is the complete code for `src/app/[locale]/page.tsx` with these changes applied.

```typescript
import { getSortedStoriesData } from '@/lib/stories';
import HomePageClient from '@/components/HomePageClient';

// Add these imports
import { getMessages, NextIntlClientProvider } from 'next-intl';
import { AbstractIntlMessages } from 'next-intl';

// Pure JavaScript alternative to lodash.pick
function pick(object: AbstractIntlMessages, keys: string[]) {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // @ts-ignore - This is a safe way to dynamically build the object
      obj[key] = object[key];
    }
    return obj;
  }, {} as AbstractIntlMessages);
}

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const stories = await getSortedStoriesData(locale);

  // 1. Get all messages on the server
  const messages = await getMessages();

  return (
    // 2. Wrap the client component in a new provider
    // 3. Pick only the messages this page needs using the helper function
    <NextIntlClientProvider
      messages={pick(messages, ['Index', 'Hero', 'Common', 'languageSwitcher'])}
    >
      <HomePageClient stories={stories} />
    </NextIntlClientProvider>
  );
}
```

---

## 2. Alternative: Using lodash (If Already Installed)

If your project already has `lodash` installed as a dependency, you can use the simpler approach with `lodash.pick`:

### **Installation** (if not already installed)
```bash
pnpm add lodash
pnpm add -D @types/lodash
```

### **Changes to `src/app/[locale]/page.tsx`**

```typescript
import { getSortedStoriesData } from '@/lib/stories';
import HomePageClient from '@/components/HomePageClient';

// Add these imports
import { getMessages, NextIntlClientProvider } from 'next-intl';
import { AbstractIntlMessages } from 'next-intl';
import pick from 'lodash/pick';

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const stories = await getSortedStoriesData(locale);

  // Get all messages on the server
  const messages = await getMessages();

  return (
    // Wrap the client component in a new provider
    // Pick only the messages this page needs
    <NextIntlClientProvider
      messages={pick(messages, ['Index', 'Hero', 'Common', 'languageSwitcher'])}
    >
      <HomePageClient stories={stories} />
    </NextIntlClientProvider>
  );
}
```

**Note**: The `lodash/pick` import uses the ES module import syntax. Ensure your `tsconfig.json` has `"esModuleInterop": true` (which is included in Next.js's default TypeScript configuration).

---

## 3. Post-Implementation Steps

After applying the changes, you must perform a clean build to ensure they take effect.

1.  **Stop Development Server:** If it's running, stop it.
2.  **Thorough Clean and Rebuild:**
    ```bash
    pnpm dlx rimraf .next/
    pnpm install
    pnpm run build
    pnpm run dev
    ```
3.  **Clear Browser Cache:** Clear your browser's cache for the application domain or perform a hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`).

---

## 4. Comparison: Pure JS vs lodash

| Aspect | Pure JavaScript | lodash |
|--------|----------------|--------|
| **Dependencies** | No additional dependencies | Requires `lodash` package |
| **Bundle Size** | ~0 KB (code is already in your bundle) | ~67 KB minified |
| **Code Complexity** | Slightly more verbose | Cleaner, more concise |
| **Performance** | Native JavaScript (fastest) | Slight overhead from function call |
| **Installation** | None required | `pnpm add lodash @types/lodash` |
| **Use Case** | Prefer for minimal dependencies | Good if already using lodash elsewhere |

**Recommendation**: If your project doesn't already use lodash, the Pure JavaScript approach is recommended to avoid adding unnecessary dependencies. If lodash is already a core dependency in your project, using `lodash.pick` is acceptable for consistency with your existing codebase.