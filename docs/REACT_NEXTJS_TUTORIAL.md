# Complete React & Next.js Tutorial
## Real-World Examples from New Muslim Stories Project

Welcome! This tutorial teaches you React and Next.js concepts by examining a real, production-ready application. Each concept is explained with actual code from the project.

---

## Table of Contents
1. [React vs Next.js: What's the Difference?](#1-react-vs-nextjs-whats-the-difference)
2. [Next.js 14 App Router Basics](#2-nextjs-14-app-router-basics)
3. [Server vs Client Components](#3-server-vs-client-components)
4. [File-Based Routing & Dynamic Routes](#4-file-based-routing--dynamic-routes)
5. [Layouts in Next.js](#5-layouts-in-nextjs)
6. [Data Fetching in Server Components](#6-data-fetching-in-server-components)
7. [Static Generation (generateStaticParams)](#7-static-generation-generatestaticparams)
8. [TypeScript with Next.js](#8-typescript-with-nextjs)
9. [Custom Hooks](#9-custom-hooks)
10. [Internationalization (i18n)](#10-internationalization-i18n)
11. [Providers & Context](#11-providers--context)
12. [Middleware](#12-middleware)
13. [Client-Side Navigation](#13-client-side-navigation)
14. [Component Composition Patterns](#14-component-composition-patterns)
15. [Type Definitions & Interfaces](#15-type-definitions--interfaces)
16. [Barrel Exports](#16-barrel-exports)

---

## 1. React vs Next.js: What's the Difference?

### What is React?
React is a **JavaScript library** for building user interfaces, particularly web applications. It focuses on creating **components** and managing **component state**.

**Key React Concepts:**
- Components (functional and class-based)
- JSX (JavaScript XML)
- State management (useState, useReducer)
- Props (passing data between components)
- Event handling
- Lifecycle methods (in class components)

### What is Next.js?
Next.js is a **React framework** that provides:
- **Server-side rendering (SSR)**
- **Static site generation (SSG)**
- **File-based routing**
- **API routes**
- **Image optimization**
- **Built-in CSS support**
- **Internationalization (i18n)**
- **Middleware**

Think of it this way:
- **React** = The **library** for building UI components
- **Next.js** = The **framework** that uses React and adds tons of features on top

---

### Direct Comparison with Real Examples

## Example 1: Creating a Page/Routes

### In Pure React (using React Router)
You need React Router library and manual setup.

**File Structure:**
```
src/
├── components/
│   ├── Home.jsx
│   ├── Story.jsx
│   └── Header.jsx
├── pages/
│   ├── Home.jsx
│   └── Story.jsx
├── App.jsx
└── main.jsx
```

**App.jsx:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Story from './pages/Story';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories/:slug" element={<Story />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

**Problems with Pure React:**
- ❌ Need to install additional library (react-router-dom)
- ❌ Manual route configuration
- ❌ No built-in SEO support
- ❌ Manual code splitting required
- ❌ More setup work

### In Next.js (using App Router)
File-based routing - just create files!

**File Structure:**
```
src/
├── app/
│   ├── page.tsx                    # Homepage (/)
│   ├── layout.tsx                  # Root layout
│   └── stories/
│       └── [slug]/
│           └── page.tsx            # Story page (/stories/slug)
└── components/
```

**File:** `src/app/[locale]/page.tsx`
```typescript
// Just create the file - Next.js automatically handles routing!
export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const stories = await getSortedStoriesData(locale);

  return <HomePageClient stories={stories} />;
}
```

**Benefits of Next.js:**
- ✅ No router library needed
- ✅ Automatic routing based on file structure
- ✅ Built-in SEO support
- ✅ Automatic code splitting
- ✅ Less configuration

---

## Example 2: Data Fetching

### In Pure React
You need to:
1. Fetch data on the client side
2. Handle loading states
3. Manage loading/error states
4. Possibly use libraries like SWR or React Query

**Home.jsx:**
```jsx
import { useState, useEffect } from 'react';

function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Client-side fetch - visible to users
    fetch(`/api/stories`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setStories(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {stories.map(story => (
        <div key={story.slug}>{story.title}</div>
      ))}
    </div>
  );
}
```

**Problems with Pure React:**
- ❌ Data fetched in browser (slower)
- ❌ SEO issues (search engines see empty page initially)
- ❌ Must handle loading/error states
- ❌ User sees loading spinner

### In Next.js
Server components fetch data on the server!

**File:** `src/app/[locale]/page.tsx`
```typescript
export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Server-side fetch - not visible to users, faster!
  const stories = await getSortedStoriesData(locale);

  // No loading state needed - page is complete when sent to browser
  return <HomePageClient stories={stories} />;
}
```

**Benefits of Next.js:**
- ✅ Data fetched on server (faster, more secure)
- ✅ Perfect SEO - search engines see complete page
- ✅ No loading spinners for initial data
- ✅ Can access databases, file system directly
- ✅ Better performance

---

## Example 3: Dynamic Routes

### In Pure React
Need React Router's dynamic routes.

**App.jsx:**
```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/stories/:slug" element={<Story />} />
      {/* Need to manually handle locale */}
      <Route path="/en/stories/:slug" element={<Story />} />
      <Route path="/ar/stories/:slug" element={<Story />} />
    </Routes>
  );
}
```

**Problems:**
- ❌ Verbose route configuration
- ❌ Manual locale handling
- ❌ Must validate slug manually

### In Next.js
File structure = route structure!

**File:** `src/app/[locale]/stories/[slug]/page.tsx`
```typescript
// URL: /en/stories/barbara-story
// Automatically provides: { locale: 'en', slug: 'barbara-story' }

export default async function StoryPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: Locale };
}) {
  const story = await getStoryData(slug, locale);
  return <StoryContentDisplay story={story} />;
}
```

**Benefits:**
- ✅ Clean, intuitive file structure
- ✅ Automatic params extraction
- ✅ Built-in type safety
- ✅ Easy to understand

---

## Example 4: Internationalization (i18n)

### In Pure React
Need react-i18next library and complex setup.

**Setup:**
1. Install react-i18next, i18next
2. Create i18n configuration
3. Wrap app in I18nextProvider
4. Manual locale detection
5. Manual translation loading

**Code:**
```jsx
// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { title: 'New Muslim Stories' } },
      ar: { translation: { title: 'قصص المسلمين الجدد' } }
    },
    lng: 'en',
    fallbackLng: 'en'
  });

// Component
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();
  return <h1>{t('title')}</h1>;
}
```

**Problems:**
- ❌ Complex setup
- ❌ Additional dependencies
- ❌ Manual locale detection
- ❌ More code to maintain

### In Next.js
Built-in i18n support with next-intl!

**Configuration:** `src/i18n.ts`
```typescript
export const locales = ['en', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages };
});
```

**Middleware:** `src/middleware.ts`
```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
```

**Usage:** `src/components/HomePageClient.tsx`
```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function HomePageClient({ stories }: HomePageClientProps) {
  const t = useTranslations('Index');

  return (
    <div>
      <h1>{t('title')}</h1>
      {/* That's it! */}
    </div>
  );
}
```

**Benefits:**
- ✅ Zero setup - just configure locales
- ✅ Automatic locale detection
- ✅ SEO-friendly URLs (/en/, /ar/)
- ✅ Clean API
- ✅ Works with server components

---

## Example 5: Styling

### In Pure React
Need to choose: CSS modules, styled-components, emotion, etc.

**With CSS Modules:**
```jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.primary}>Click me</button>;
}
```

**Problems:**
- ❌ Choose your own solution
- ❌ Need additional setup
- ❌ Possible class name conflicts
- ❌ No built-in optimization

### In Next.js
Built-in support for multiple CSS solutions.

**Tailwind CSS (used in this project):**
```jsx
// globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// Component: src/components/StoryCard.tsx
export default function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <h3 className="font-bold text-xl mb-3">{story.title}</h3>
      <p className="text-gray-700">{story.content}</p>
    </div>
  );
}
```

**Benefits:**
- ✅ Built-in CSS support
- ✅ Automatic optimization
- ✅ Works with server components
- ✅ No configuration needed for Tailwind

---

## Example 6: Static Generation

### In Pure React
Need a build tool (Webpack, Vite) and static generation library.

**Setup:**
1. Configure static export in build tool
2. Use tools like react-static or Gatsby
3. Complex routing configuration
4. Manual pre-render setup

**Problems:**
- ❌ Complex setup
- ❌ Need additional tools
- ❌ Manual configuration

### In Next.js
Built-in SSG with `generateStaticParams`!

**File:** `src/app/[locale]/stories/[slug]/page.tsx`
```typescript
// Generate static pages at build time
export async function generateStaticParams() {
  const stories = await getAllStorySlugs();

  return stories.map((story) => ({
    slug: story.params.slug,
    locale: story.params.locale,
  }));
}

// Pre-generated pages are served instantly!
export default async function StoryPage({ params }) {
  // ...
}
```

**Result:**
- ✅ Pages pre-generated at build time
- ✅ Super fast loading (just serve HTML files)
- ✅ Perfect SEO
- ✅ Zero configuration

---

## Example 7: API Routes

### In Pure React
Need a separate backend server (Node.js, Express, etc.)

**Backend:** `server.js`
```javascript
const express = require('express');
const app = express();

app.get('/api/stories', (req, res) => {
  res.json(stories);
});

app.listen(3001);
```

**Frontend:** React app runs separately on port 3000

**Problems:**
- ❌ Separate server needed
- ❌ CORS configuration
- ❌ Two codebases to maintain
- ❌ More infrastructure

### In Next.js
Built-in API routes!

**File:** `src/app/api/stories/route.ts`
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const stories = await getAllStories();

  return NextResponse.json(stories);
}
```

**Benefits:**
- ✅ Same codebase
- ✅ No CORS issues
- ✅ Easy deployment
- ✅ Type-safe API routes

---

## When to Use What?

### Use Pure React When:
- ✅ Building a simple SPA (Single Page Application)
- ✅ You don't need SEO
- ✅ All interactions happen on client
- ✅ Prototypes or internal tools
- ✅ Learning React fundamentals

**Example Projects:**
- Dashboard with authentication
- Admin panel
- Interactive data visualization tool
- Browser-based game

### Use Next.js When:
- ✅ Building a public website
- ✅ SEO is important
- ✅ Need server-side rendering
- ✅ Want better performance
- ✅ Need internationalization
- ✅ Want static generation
- ✅ Building production apps

**Example Projects:**
- E-commerce sites
- Blogs and content sites
- Marketing websites
- Portfolios
- Documentation sites
- This project! (New Muslim Stories)

---

## Key Differences Summary

| Feature | React | Next.js |
|---------|-------|---------|
| **Type** | Library | Framework |
| **Routing** | Manual (React Router) | File-based (automatic) |
| **Data Fetching** | Client-side only | Server & client-side |
| **SEO** | Manual setup | Built-in |
| **Static Generation** | Requires Gatsby/react-static | Built-in |
| **API Routes** | Separate server | Built-in |
| **i18n** | Manual setup | Built-in |
| **Setup** | Minimal but manual | More features, same ease |
| **Performance** | Depends on setup | Optimized by default |
| **File Structure** | Flexible but manual | Convention-based |
| **Learning Curve** | Lower | Slightly higher but worth it |

---

## Why This Project Uses Next.js

This **New Muslim Stories** project uses Next.js because:

1. **SEO Critical** - Search engines need to find and index stories
2. **Internationalization** - English and Arabic versions
3. **Performance** - Stories should load fast globally
4. **Static Generation** - Pre-generate all stories for speed
5. **Developer Experience** - File-based routing, automatic code splitting
6. **Scalability** - Easy to add new features

If this was a **private dashboard** or **internal tool**, React alone might be sufficient. But for a **public-facing website** with **content that needs to be found**, Next.js is the better choice.

---

## Which Should You Learn First?

### Recommended Path:
1. **Start with React fundamentals** - Components, props, state, hooks
2. **Build a few projects with React** - To understand the basics
3. **Learn Next.js** - To build production-ready apps
4. **Use both as needed**:
   - React for SPAs and internal tools
   - Next.js for public websites

### Learning Tips:
- **Don't get overwhelmed** - Next.js is just React with superpowers
- **Understand the "why"** - Why does Next.js add these features?
- **Practice both** - Build one project with each
- **Start simple** - You can use Next.js without using all features

---

## Conclusion

**React** and **Next.js** are not competing technologies - they work together:

- **React** is the foundation (UI library)
- **Next.js** builds on React (full-stack framework)

For the New Muslim Stories project:
- **React** handles component logic and UI
- **Next.js** provides routing, data fetching, SEO, i18n, and performance optimizations

**Key Takeaway:** If you're building anything beyond a simple prototype, **Next.js is worth learning**. It takes the same React knowledge you already have and adds professional-grade features.

---

Now let's dive deeper into the Next.js concepts used in this project!
2. [Server vs Client Components](#2-server-vs-client-components)
3. [File-Based Routing & Dynamic Routes](#3-file-based-routing--dynamic-routes)
4. [Layouts in Next.js](#4-layouts-in-nextjs)
5. [Data Fetching in Server Components](#5-data-fetching-in-server-components)
6. [Static Generation (generateStaticParams)](#6-static-generation-generatestaticparams)
7. [TypeScript with Next.js](#7-typescript-with-nextjs)
8. [Custom Hooks](#8-custom-hooks)
9. [Internationalization (i18n)](#9-internationalization-i18n)
10. [Providers & Context](#10-providers--context)
11. [Middleware](#11-middleware)
12. [Client-Side Navigation](#12-client-side-navigation)
13. [Component Composition Patterns](#13-component-composition-patterns)
14. [Type Definitions & Interfaces](#14-type-definitions--interfaces)
15. [Barrel Exports](#15-barrel-exports)

---

## 1. Next.js 14 App Router Basics

### What is the App Router?
Next.js 14 uses the **App Router**, a new file-based routing system that organizes pages using the `src/app` directory. Each folder represents a route segment.

### File Structure
```
src/
├── app/                      # App Router directory
│   ├── [locale]/            # Dynamic route parameter (locale)
│   │   ├── page.tsx         # Homepage (/)
│   │   └── stories/
│   │       └── [slug]/
│   │           └── page.tsx # Story page (/stories/some-story)
│   └── layout.tsx           # Root layout
└── components/              # Reusable components
```

### Example: Homepage Component
**File:** `src/app/[locale]/page.tsx`

```typescript
import { getSortedStoriesData } from '@/lib/stories';
import HomePageClient from '@/components/HomePageClient';

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const stories = await getSortedStoriesData(locale);

  return <HomePageClient stories={stories} />;
}
```

**Key Points:**
- The `async` keyword makes this a **Server Component**
- `params` is automatically provided by Next.js
- Data fetching happens on the **server** (not sent to the client)
- Returns JSX, which Next.js renders

---

## 2. Server vs Client Components

### Server Components (Default)
Server components run on the server, keep sensitive logic private, reduce bundle size, and can access databases directly.

**Example: Server Component**
**File:** `src/app/[locale]/page.tsx`

```typescript
export default async function Home({ params }: { params: { locale: string } }) {
  // ✅ Can access server-only code (file system, database, APIs)
  const stories = await getSortedStoriesData(locale);

  // ✅ No 'use client' directive needed
  return <HomePageClient stories={stories} />;
}
```

**Benefits:**
- Can use `await` for data fetching
- No JavaScript sent to browser
- Access to server-only modules
- Better performance

### Client Components
Client components run in the browser, support interactivity, and use React hooks.

**Example: Client Component**
**File:** `src/components/HomePageClient.tsx`

```typescript
'use client';  // ← This directive makes it a client component

import type { HomePageClientProps } from '@/types';
import { useTranslations } from 'next-intl';

export default function HomePageClient({ stories }: HomePageClientProps) {
  const t = useTranslations('Index'); // ← Client hooks work here

  return (
    <div>
      <h1>{t('title')}</h1>
      {/* Render stories */}
    </div>
  );
}
```

**When to use Client Components:**
- Need React hooks (`useState`, `useEffect`, `useContext`)
- Need event handlers (`onClick`, `onChange`)
- Need browser APIs (`localStorage`, `window`)
- Need animations (Framer Motion)

---

## 3. File-Based Routing & Dynamic Routes

### Static Routes
Fixed paths that don't change.

```
src/app/about/page.tsx        → /about
src/app/contact/page.tsx      → /contact
```

### Dynamic Routes
Use square brackets `[param]` to create dynamic segments.

**Example: Dynamic Story Route**
**File:** `src/app/[locale]/stories/[slug]/page.tsx`

```typescript
import { getStoryData, getAllStorySlugs } from '@/lib/stories';
import { notFound } from 'next/navigation';

export default async function StoryPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: Locale };
}) {
  try {
    const story = await getStoryData(slug, locale);
    return <StoryContentDisplay story={story} />;
  } catch (error) {
    notFound(); // ← Show 404 page
  }
}
```

**URL Examples:**
- `/en/stories/barbara-story` → `params: { locale: 'en', slug: 'barbara-story' }`
- `/ar/stories/ahmad-story` → `params: { locale: 'ar', slug: 'ahmad-story' }`

---

## 4. Layouts in Next.js

### Root Layout
The root layout wraps all pages in the app. Defined in `src/app/layout.tsx`.

**File:** `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

**Key Points:**
- `suppressHydrationWarning` prevents React hydration warnings
- Renders once per request
- Good for global configurations

### Nested Layouts
Layouts can be nested for different route groups.

**File:** `src/app/[locale]/layout.tsx`

```typescript
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <ClientProviders messages={messages} locale={locale} timeZone={timeZone}>
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </ClientProviders>
  );
}
```

**Features:**
- Async function (Server Component)
- Fetches i18n messages
- Sets text direction (RTL for Arabic)
- Wraps children in providers

---

## 5. Data Fetching in Server Components

### Direct Database/File Access
Server components can directly access databases, file system, and APIs.

**Example: Story Data Service**
**File:** `src/lib/story-service.ts`

```typescript
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { StoryData, Locale, StoryList } from '@/types';

export class StoryService {
  static async getSortedStoriesData(locale: Locale): Promise<StoryList> {
    const fileNames = await fs.readdir(this.getStoriesDirectory(locale));

    const stories = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const fullPath = path.join(this.getStoriesDirectory(locale), fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          const processedContent = await remark().use(html).process(content);
          const contentHtml = processedContent.toString();

          return {
            slug: fileName.replace('.md', ''),
            ...data,
            language: locale,
            contentHtml,
          } as StoryData;
        })
    );

    return stories.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}
```

**Usage in Page:**
**File:** `src/app/[locale]/page.tsx`

```typescript
export default async function Home({ params }: { params: { locale: string } }) {
  // Server-side data fetching - not sent to client
  const stories = await getSortedStoriesData(locale);

  // Pass data to client component
  return <HomePageClient stories={stories} />;
}
```

**Benefits:**
- No API calls needed
- No loading states
- Better security (credentials stay on server)
- Faster initial page load

---

## 6. Static Generation (generateStaticParams)

### Pre-Generate Pages at Build Time
`generateStaticParams` tells Next.js which pages to pre-generate for static sites.

**File:** `src/app/[locale]/stories/[slug]/page.tsx`

```typescript
// Generate static params for all stories
export async function generateStaticParams() {
  return getAllStorySlugs().map((entry) => entry.params);
}
```

**How it works:**
1. Runs at **build time**
2. Returns array of params objects
3. Next.js pre-generates pages for each param
4. Great for SEO and performance

**Example Return:**
```typescript
[
  { slug: 'barbara-story', locale: 'en' },
  { slug: 'ahmad-story', locale: 'en' },
  { slug: 'barbara-story', locale: 'ar' },
  { slug: 'ahmad-story', locale: 'ar' },
]
```

**Result:**
- `/en/stories/barbara-story` → Pre-generated
- `/ar/stories/barbara-story` → Pre-generated
- `/en/stories/ahmad-story` → Pre-generated
- `/ar/stories/ahmad-story` → Pre-generated

---

## 7. TypeScript with Next.js

### Type-Safe Props
Define explicit interfaces for component props.

**File:** `src/types/component.types.ts`

```typescript
// Button component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

// Story card component props
export interface StoryCardProps {
  story: StoryData;
}
```

**Usage:**
```typescript
import type { ButtonProps } from '@/types';

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
```

### Type-Safe Routing
Define types for route parameters.

**File:** `src/types/story.types.ts`

```typescript
// Supported locales
export type Locale = 'en' | 'ar';

// Story data structure
export interface StoryData {
  slug: string;
  title: string;
  firstName: string;
  age: number;
  country: string;
  previousReligion: string;
  profilePhoto: string;
  featured: boolean;
  language: Locale;
  contentHtml: string;
}
```

**Usage in Page:**
```typescript
export default async function StoryPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: Locale }; // ← Type-safe!
}) {
  // TypeScript ensures slug is string and locale is 'en' | 'ar'
}
```

### Utility Types
TypeScript provides powerful utility types.

**File:** `src/types/component.types.ts`

```typescript
// Combine multiple interfaces
export interface SectionProps extends WithClassName, WithId {
  children: React.ReactNode;
}

// Define optional props
export interface WithClassName {
  className?: string; // ← Optional property
}
```

---

## 8. Custom Hooks

### What are Custom Hooks?
Functions that use React hooks, allowing you to extract component logic into reusable functions.

### Example 1: useHasMounted
Prevents hydration mismatches by checking if component has mounted.

**File:** `src/hooks/useHasMounted.ts`

```typescript
import { useState, useEffect } from 'react';

export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
```

**Usage in ThemeToggle:**
**File:** `src/components/ThemeToggle.tsx`

```typescript
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted(); // ← Use custom hook

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

### Example 2: useStorySections
Parses story HTML into sections.

**File:** `src/hooks/useStorySections.ts`

```typescript
export interface StorySections {
  lifeBeforeIslam: string;
  momentOfGuidance: string;
  reflections: string;
}

export function useStorySections(contentHtml: string): StorySections {
  // Split content by h3 headings
  const sections = contentHtml.split(/<h3>(.*?)<\/h3>/g);

  return {
    lifeBeforeIslam: sections[2] || '',
    momentOfGuidance: sections[4] || '',
    reflections: sections[6] || '',
  };
}
```

**Usage:**
```typescript
export default function StoryContentDisplay({ story }: StoryContentDisplayProps) {
  const { lifeBeforeIslam, momentOfGuidance, reflections } =
    useStorySections(story.contentHtml);

  return (
    <article>
      <section>
        <h2>Life Before Islam</h2>
        <div dangerouslySetInnerHTML={{ __html: lifeBeforeIslam }} />
      </section>
      <section>
        <h2>Guidance</h2>
        <div dangerouslySetInnerHTML={{ __html: momentOfGuidance }} />
      </section>
      <section>
        <h2>Reflections</h2>
        <div dangerouslySetInnerHTML={{ __html: reflections }} />
      </section>
    </article>
  );
}
```

### Example 3: useIntersectionObserver
Observes when elements enter the viewport.

**File:** `src/hooks/useIntersectionObserver.ts`

```typescript
import { useEffect, RefObject } from 'react';

export const useIntersectionObserver: UseIntersectionObserver = (
  elementRef,
  options = { rootMargin: '0px', threshold: 0.1 }
) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      options
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [elementRef, options]);
};
```

**Why Custom Hooks?**
- Share logic between components
- Keep components clean and focused
- Testable in isolation
- Reusable across the app

---

## 9. Internationalization (i18n)

### Setting Up i18n with next-intl

**Configuration:**
**File:** `src/i18n.ts`

```typescript
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || 'en';

  if (!locales.includes(currentLocale)) notFound();

  const messages = (await import(`../messages/${currentLocale}.json`)).default;

  return {
    locale: currentLocale,
    messages,
    timeZone: 'Asia/Aden',
  };
});
```

**Translation Files:**
```
messages/
├── en.json  # English translations
└── ar.json  # Arabic translations
```

**File:** `messages/en.json`

```json
{
  "Index": {
    "title": "New Muslim Stories",
    "subtitle": "Inspiring journeys to Islam"
  },
  "Story": {
    "return": "Go Back",
    "lifeBeforeIslam": "Life Before Islam",
    "momentOfGuidance": "The Moment of Guidance",
    "reflections": "Reflections"
  }
}
```

**Usage in Server Components:**
**File:** `src/app/[locale]/layout.tsx`

```typescript
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  const messages = await getMessages(); // ← Get translations

  return (
    <ClientProviders messages={messages}>
      {children}
    </ClientProviders>
  );
}
```

**Usage in Client Components:**
**File:** `src/components/HomePageClient.tsx`

```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function HomePageClient({ stories }: HomePageClientProps) {
  const t = useTranslations('Index'); // ← Access translations

  return (
    <div>
      <h1>{t('title')}</h1>  {/* "New Muslim Stories" */}
      <p>{t('subtitle')}</p>  {/* "Inspiring journeys to Islam" */}
    </div>
  );
}
```

**Dynamic Locale Handling:**
**File:** `src/middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
```

**RTL Support:**
```typescript
<div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  {children}
</div>
```

---

## 10. Providers & Context

### What are Providers?
Providers pass data through the component tree without explicit prop threading.

**Creating Providers:**
**File:** `src/components/ClientProviders.tsx`

```typescript
'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from 'next-themes';
import type { ClientProvidersProps } from '@/types/component.types';

export default function ClientProviders({
  messages,
  locale,
  timeZone,
  children,
}: ClientProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone}>
        <ParallaxProvider>
          {children}
        </ParallaxProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
```

**Using Providers:**
- Wrap components that need access to context
- Nest providers for multiple contexts
- Order matters (outer providers → inner providers)

**ThemeProvider Example:**
```typescript
'use client';

import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme(); // ← Access theme context

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

**Why Providers?**
- Avoid "prop drilling" (passing props through many levels)
- Share state/data across many components
- Cleaner component code

---

## 11. Middleware

### What is Middleware?
Code that runs before requests are completed. Used for redirects, headers, authentication, etc.

**File:** `src/middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
```

**How it works:**
1. User visits `/`
2. Middleware checks browser's language
3. Redirects to `/en` (default) or `/ar`
4. Routes become `/en/page` or `/ar/page`

**Custom Middleware Example:**
```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'value');

  // Redirect logic
  if (request.nextUrl.pathname === '/old-route') {
    return NextResponse.redirect(new URL('/new-route', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/old-route'],
};
```

---

## 12. Client-Side Navigation

### useRouter Hook
Navigate between pages programmatically.

**Example:**
**File:** `src/components/StoryContentDisplay.tsx`

```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function StoryContentDisplay({ story }: StoryContentDisplayProps) {
  const router = useRouter(); // ← Get router instance

  return (
    <div>
      <button
        onClick={() => router.back()} // ← Go back to previous page
      >
        Go Back
      </button>
      <button
        onClick={() => router.push('/en/stories')} // ← Navigate to new page
      >
        All Stories
      </button>
    </div>
  );
}
```

**Available Methods:**
- `router.push('/path')` - Navigate to new page (adds to history)
- `router.replace('/path')` - Navigate without adding to history
- `router.back()` - Go back to previous page
- `router.forward()` - Go forward in history
- `router.refresh()` - Revalidate data and refresh page

---

## 13. Component Composition Patterns

### 1. Passing Children
**File:** `src/components/ui/Section.tsx`

```typescript
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={`container mx-auto px-4 ${className || ''}`}>
      {children}
    </section>
  );
}
```

**Usage:**
```typescript
<Section className="my-12">
  <h2>Title</h2>
  <p>Content</p>
</Section>
```

### 2. Component Composition with Props
**File:** `src/components/StoryContentDisplay.tsx`

```typescript
// Reusable sub-component defined inside parent
const StorySection = ({ title, content }: StorySectionProps) => (
  <section className="my-8">
    <h2>{title}</h2>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </section>
);

export default function StoryContentDisplay({ story }: StoryContentDisplayProps) {
  const { lifeBeforeIslam, momentOfGuidance, reflections } =
    useStorySections(story.contentHtml);

  // Use array.map for clean rendering
  const sections = [
    { key: 'lifeBeforeIslam', content: lifeBeforeIslam },
    { key: 'momentOfGuidance', content: momentOfGuidance },
    { key: 'reflections', content: reflections }
  ];

  return (
    <article>
      {sections.map(({ key, content }) => (
        <StorySection
          key={key}
          title={t(key)}
          content={content}
        />
      ))}
    </article>
  );
}
```

### 3. Extending Base Interfaces
```typescript
// Base interface
export interface WithClassName {
  className?: string;
}

// Extended interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, WithClassName {
  children: React.ReactNode;
}
```

---

## 14. Type Definitions & Interfaces

### Centralized Types
All types organized in `src/types/` directory.

**File Structure:**
```
src/types/
├── index.ts           # Barrel export
├── story.types.ts     # Story-related types
├── component.types.ts # Component prop types
└── hook.types.ts      # Custom hook types
```

### Story Types
**File:** `src/types/story.types.ts`

```typescript
// Type alias for locale
export type Locale = 'en' | 'ar';

// Interface for story data
export interface StoryData {
  slug: string;
  title: string;
  firstName: string;
  age: number;
  country: string;
  previousReligion: string;
  profilePhoto: string;
  featured: boolean;
  language: Locale;  // ← Union type
  contentHtml: string;
}

// Type alias for convenience
export type StoryList = StoryData[];

// Mapped type for organizing stories by locale
export type StoriesByLocale = {
  [K in Locale]: StoryData[];
};
```

### Component Types
**File:** `src/types/component.types.ts`

```typescript
import type { Locale, StoryData } from './story.types';

// Utility interfaces
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

// Extended HTML attributes
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

// Component-specific props
export interface FeaturedStoriesProps {
  stories: StoryData[];
}
```

### Type Imports
Always use `import type` for types (tree-shaking).

```typescript
// ✅ Type import (not included in bundle)
import type { StoryData, Locale } from '@/types';

// ❌ Value import (included in bundle)
import { StoryData } from '@/types';

// For type-only exports
export type { StoryData, Locale };
```

---

## 15. Barrel Exports

### What are Barrel Exports?
A single file that re-exports multiple modules, creating a clean import interface.

**File:** `src/types/index.ts`

```typescript
// Barrel export for all types
export * from './story.types';
export * from './component.types';
export * from './hook.types';
```

**Usage:**
```typescript
// Instead of multiple imports:
import type { StoryData } from '@/types/story.types';
import type { Locale } from '@/types/story.types';
import type { ButtonProps } from '@/types/component.types';

// One clean import:
import type { StoryData, Locale, ButtonProps } from '@/types';
```

### Library Barrel Export
**File:** `src/lib/index.ts`

```typescript
// Re-export all types
export * from '@/types';

// Import StoryService
import { StoryService } from './story-service';

// Create function aliases for backward compatibility
export const getSortedStoriesData = StoryService.getSortedStoriesData;
export const getStoryData = StoryService.getStoryData;
export const getAllStorySlugs = StoryService.getAllStorySlugs;
```

**Benefits:**
- Single import point for entire library
- Easier refactoring (change internal structure without breaking imports)
- Better tree-shaking
- Cleaner code organization

---

## Additional Concepts

### Metadata API
Set page metadata for SEO.

**File:** `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Muslim Stories',
  description: 'Inspiring journeys to Islam from around the world',
  openGraph: {
    title: 'New Muslim Stories',
    description: 'Inspiring journeys to Islam from around the world',
    url: 'https://example.com',
    siteName: 'New Muslim Stories',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

### Conditional Rendering
**File:** `src/components/HomePageClient.tsx`

```typescript
export default function HomePageClient({ stories }: HomePageClientProps) {
  // Get first story for "Story of the Day"
  const storyOfTheDay = stories[0];

  return (
    <div>
      <FeaturedStories stories={stories} />
      <WhoAreNewMuslims />
      <Section className="my-12">
        <h2>{commonT('storyOfTheDay')}</h2>
        {/* Conditional rendering */}
        {storyOfTheDay && <StoryOfTheDay story={storyOfTheDay} />}
      </Section>
      <WhatsNext />
    </div>
  );
}
```

### useEffect for Side Effects
**File:** `src/hooks/useIntersectionObserver.ts`

```typescript
import { useEffect } from 'react';

export function useIntersectionObserver(elementRef, options) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(element);

    // Cleanup function
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [elementRef, options]);
}
```

---

## Best Practices Summary

### ✅ Do's
1. **Use Server Components by default** - Better performance
2. **Add `'use client'` only when needed** - When using hooks or browser APIs
3. **Define explicit TypeScript interfaces** - For all props and data
4. **Use barrel exports** - For cleaner imports
5. **Keep components small and focused** - Single responsibility
6. **Use custom hooks for shared logic** - Reusable across components
7. **Prefer async/await over promises** - Cleaner code
8. **Type all props explicitly** - Better IDE support
9. **Use `import type` for types** - Better tree-shaking
10. **Organize code by feature** - Easier to maintain

### ❌ Don'ts
1. **Don't use client components when server components work** - Slower performance
2. **Don't pass too many props** - Use context/providers instead
3. **Don't define interfaces inline** - Use separate files
4. **Don't use `any` type** - Defeats TypeScript purpose
5. **Don't duplicate logic** - Extract to custom hooks
6. **Don't use `dangerouslySetInnerHTML` unnecessarily** - Security risk
7. **Don't forget cleanup in useEffect** - Memory leaks
8. **Don't mix server and client code** - In same component

---

## Quick Reference

### App Router File Conventions
```
page.tsx              → Page component
layout.tsx            → Layout component
not-found.tsx         → 404 page
error.tsx             → Error boundary
loading.tsx           → Loading UI
template.tsx          → Re-renders on navigation
```

### Common Hooks
- `useState` → Component state
- `useEffect` → Side effects
- `useContext` → Access context
- `useRouter` → Navigation
- `useTranslations` → i18n
- `useTheme` → Theme access

### Common Patterns
- **Server Component**: Default for pages
- **Client Component**: Add `'use client'` directive
- **Dynamic Route**: `[param]` in folder name
- **Layout**: Wrap children, define once per segment
- **Metadata**: Export `metadata` object
- **Type-Safe**: Define interfaces for all props

---

## Conclusion

This tutorial covered the essential React and Next.js concepts used in a real production application. Key takeaways:

1. **Next.js 14 App Router** revolutionizes how we build React applications
2. **Server Components** improve performance and security
3. **TypeScript** makes code more maintainable
4. **Custom Hooks** enable code reuse
5. **i18n** makes apps globally accessible
6. **Providers** simplify state management
7. **File-based routing** makes organization intuitive

### Next Steps
1. Try modifying the code in this project
2. Add a new page following the patterns
3. Create a new custom hook
4. Add a new component with TypeScript
5. Practice with the TypeScript strict mode

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://typescriptlang.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app)

Happy coding! 🚀
