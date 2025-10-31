# New Muslim Stories - Project Blueprint

## Overview

A Next.js 14 application showcasing inspiring stories of people who converted to Islam. Features:
- **Multi-language**: English & Arabic with RTL support
- **Markdown-based content**: Stories stored as `.md` files with YAML frontmatter
- **Static generation**: Pre-rendered pages for optimal performance
- **Modern stack**: App Router, TypeScript, Tailwind CSS, next-intl
- **Clean Architecture**: Separated parsing, business logic, and UI components
- **Custom Hooks**: Reusable intersection observer hooks for animations

---

## Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **Package Manager**: pnpm (v10.19.0+)
- **Git**: Latest version

---

## Quick Start

### 1. Project Initialization

```bash
pnpm create next-app@latest new-muslim-stories --typescript --tailwind --app --src-dir --eslint
cd new-muslim-stories
```

### 2. Install Dependencies

```bash
# Core packages
pnpm add next-intl gray-matter remark remark-html server-only

# Optional: UI enhancements
pnpm add framer-motion react-scroll-parallax

# Development
pnpm add -D @testing-library/react jest-environment-jsdom
```

### 3. Project Structure

```
new-muslim-stories/
├── messages/              # i18n translations
│   ├── en.json
│   └── ar.json
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/    # Dynamic locale routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── stories/
│   │   │       └── [slug]/
│   │   │           └── page.tsx
│   │   └── layout.tsx   # Root layout
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # UI primitives
│   │   │   └── Section.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedStories.tsx
│   │   ├── StoryOfTheDay.tsx
│   │   ├── WhatsNext.tsx
│   │   ├── WhoAreNewMuslims.tsx
│   │   ├── HomePageClient.tsx
│   │   └── ...
│   ├── lib/             # Core business logic & utilities
│   │   ├── stories.ts   # Public API & StoryData interface
│   │   ├── story-parser.ts    # Markdown parsing & file I/O
│   │   ├── story-service.ts   # Business logic & queries
│   │   └── index.ts     # Barrel exports
│   ├── hooks/           # Custom React hooks
│   │   ├── useIntersectionObserver.ts
│   │   ├── useMultipleIntersectionObserver.ts
│   │   └── useHasMounted.ts
│   └── stories/         # Markdown story files
│       ├── story-1.md
│       └── story-1-ar.md
├── middleware.ts         # i18n routing
├── i18n.ts              # next-intl configuration
└── next.config.mjs      # Next.js config
```

---

## Core Features Implementation

### Feature 1: Internationalization (i18n)

**1. Configure locales**
```typescript
// src/i18n.ts
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}));
```

**2. Setup middleware**
```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en'
});
```

**3. Create translation files**
```json
// messages/en.json
{
  "Home": {
    "title": "New Muslim Stories"
  }
}
```

```json
// messages/ar.json
{
  "Home": {
    "title": "قصص مسلمين جدد"
  }
}
```

### Feature 2: Story Content System

**1. Create story files**
```markdown
<!-- src/stories/my-story.md -->
---
title: "My Journey to Islam"
firstName: "John"
age: 30
country: "USA"
previousReligion: "Christianity"
profilePhoto: "/photos/john.jpg"
featured: true
language: "en"
---

This is my story content in markdown format...
```

**2. Build data fetching logic**

The story system is now refactored into three layers for better maintainability:

**a) StoryData Interface (src/lib/stories.ts)**
```typescript
// Public API interface - simplified to 24 lines (84% reduction)
export interface StoryData {
  slug: string;
  title: string;
  firstName: string;
  age: number;
  country: string;
  previousReligion: string;
  profilePhoto: string;
  featured: boolean;
  language: string;
  contentHtml: string;
}

// Re-export from story-service for backward compatibility
export { StoryService } from './story-service';

// Legacy function exports - delegate to StoryService
export const getSortedStoriesData = StoryService.getSortedStoriesData;
export const getStoryData = StoryService.getStoryData;
export const getAllStorySlugs = StoryService.getAllStorySlugs;
```

**b) Story Parser (src/lib/story-parser.ts)**
```typescript
// Parsing layer - handles file I/O and markdown conversion
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { StoryData } from './stories';

const storiesDirectory = path.join(process.cwd(), 'src/stories');

export async function parseStoryFile(fileName: string): Promise<StoryData> {
  const isArabic = fileName.endsWith('-ar.md');
  const slug = isArabic
    ? fileName.replace(/-ar\.md$/, '')
    : fileName.replace(/\.md$/, '');

  const fullPath = path.join(storiesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse frontmatter with gray-matter
  const matterResult = matter(fileContents);

  // Convert markdown to HTML with remark
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as Omit<StoryData, 'slug' | 'contentHtml'>),
  };
}

export function getStoryFileNames(): string[] {
  return fs.readdirSync(storiesDirectory);
}

export function extractSlugAndLocale(fileName: string): { slug: string; locale: string } {
  const isArabic = fileName.endsWith('-ar.md');
  return {
    slug: isArabic ? fileName.replace(/-ar\.md$/, '') : fileName.replace(/\.md$/, ''),
    locale: isArabic ? 'ar' : 'en',
  };
}
```

**c) Story Service (src/lib/story-service.ts)**
```typescript
// Business logic layer - filtering, sorting, and queries
import type { StoryData } from './stories';
import { parseStoryFile, getStoryFileNames } from './story-parser';

export class StoryService {
  // Get all stories for a specific locale, sorted alphabetically
  static async getSortedStoriesData(locale: string): Promise<StoryData[]> {
    const fileNames = getStoryFileNames();
    const allStoriesData = await Promise.all(
      fileNames.map((fileName) => parseStoryFile(fileName))
    );

    return allStoriesData
      .filter(story => story.language === locale)
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  // Get a specific story by slug and locale
  static async getStoryData(slug: string, locale: string): Promise<StoryData> {
    const fileName = locale === 'ar' ? `${slug}-ar.md` : `${slug}.md`;
    try {
      return await parseStoryFile(fileName);
    } catch (error) {
      throw new Error(`Story with slug '${slug}' not found`);
    }
  }

  // Get all story slugs for static generation
  static getAllStorySlugs() {
    const fileNames = getStoryFileNames();
    return fileNames.map((fileName) => {
      const { slug, locale } = extractSlugAndLocale(fileName);
      return { params: { slug, locale } };
    });
  }

  // NEW: Get featured stories
  static async getFeaturedStories(locale: string, limit: number = 6): Promise<StoryData[]> {
    const allStories = await this.getSortedStoriesData(locale);
    return allStories.filter(story => story.featured).slice(0, limit);
  }

  // NEW: Get stories by country
  static async getStoriesByCountry(locale: string, country: string): Promise<StoryData[]> {
    const allStories = await this.getSortedStoriesData(locale);
    return allStories.filter(story =>
      story.country.toLowerCase() === country.toLowerCase()
    );
  }

  // NEW: Get all unique countries
  static async getAllCountries(locale: string): Promise<string[]> {
    const allStories = await this.getSortedStoriesData(locale);
    return Array.from(new Set(allStories.map(story => story.country))).sort();
  }
}
```

**d) Barrel Export (src/lib/index.ts)**
```typescript
// Convenient single import point
export * from './stories';
export * from './story-service';
export * from './story-parser';
```

**3. Generate static params**
```typescript
// src/app/[locale]/stories/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = getAllStorySlugs();
  return slugs.map((slug) => ({
    slug: slug.params.slug,
    locale: slug.params.locale,
  }));
}
```

### Feature 3: UI Components

**1. Layout component**
```typescript
// src/app/[locale]/layout.tsx
import {ReactNode} from 'react';
import {getMessages} from 'next-intl/server';
import ClientProviders from '@/components/ClientProviders';

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <ClientProviders messages={messages} locale={locale}>
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </ClientProviders>
  );
}
```

**2. Home Page Structure**

The homepage is composed of multiple reusable components:

```typescript
// src/components/HomePageClient.tsx - Main orchestrator
import HeroSection from '@/components/HeroSection';
import FeaturedStories from '@/components/FeaturedStories';
import WhoAreNewMuslims from '@/components/WhoAreNewMuslims';
import StoryOfTheDay from '@/components/StoryOfTheDay';
import WhatsNext from '@/components/WhatsNext';

export default function HomePageClient({ stories }: { stories: StoryData[] }) {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <header>...</header>
      <main className="container mx-auto px-4 py-8">
        <FeaturedStories stories={stories} />
        <WhoAreNewMuslims />
        <StoryOfTheDay />
        <WhatsNext />
      </main>
      <footer>...</footer>
    </div>
  );
}
```

**3. Reusable Section Wrapper**

All page sections use a consistent Section wrapper component:

```typescript
// src/components/ui/Section.tsx
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`my-12 ${className}`}>
      {children}
    </section>
  );
}
```

**4. Component Examples**

**Featured Stories Component:**
```typescript
// src/components/FeaturedStories.tsx
import Section from '@/components/ui/Section';
import { Link } from '@/navigation';
import type { StoryData } from '@/lib/stories';

export default function FeaturedStories({ stories }: { stories: StoryData[] }) {
  return (
    <Section id="stories" className="my-12">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Featured Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div key={story.slug} className="story-card">
            <h3>{story.title}</h3>
            <p>{story.contentHtml.substring(0, 150)}...</p>
            <Link href={`/stories/${story.slug}`}>
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

**5. Custom React Hooks**

The project includes reusable custom hooks for common functionality:

**Intersection Observer Hook:**
```typescript
// src/hooks/useIntersectionObserver.ts
import { useEffect, RefObject } from 'react';

export const useIntersectionObserver = (
  elementRef: RefObject<HTMLElement>,
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

    return () => observer.unobserve(element);
  }, [elementRef, options]);
};
```

**Multiple Elements Observer Hook:**
```typescript
// src/hooks/useMultipleIntersectionObserver.ts
import { useEffect } from 'react';

export const useMultipleIntersectionObserver = (
  refs: Array<{ ref: React.RefObject<HTMLElement>; id?: string }>,
  options = { rootMargin: '0px', threshold: 0.1 }
) => {
  useEffect(() => {
    const validRefs = refs.filter((refItem) => refItem.ref.current);
    if (validRefs.length === 0) return;

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

    validRefs.forEach((refItem) => {
      if (refItem.ref.current) {
        observer.observe(refItem.ref.current);
      }
    });

    return () => {
      validRefs.forEach((refItem) => {
        if (refItem.ref.current) {
          observer.unobserve(refItem.ref.current);
        }
      });
    };
  }, [refs, options]);
};
```

**Usage Example:**
```typescript
// In a component
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function MyComponent() {
  const sectionRef = useRef<HTMLElement>(null);

  useIntersectionObserver(sectionRef);

  return <section ref={sectionRef}>...</section>;
}
```

**2. Story page**
```typescript
// src/app/[locale]/stories/[slug]/page.tsx
import {getStoryData} from '@/lib/stories';

export async function generateMetadata({params}: {params: {slug: string}}) {
  const story = await getStoryData(params.slug, params.locale);
  return {
    title: story.title,
    description: `Read ${story.firstName}'s story`,
  };
}

export default async function StoryPage({
  params
}: {
  params: {slug: string; locale: string};
}) {
  const story = await getStoryData(params.slug, params.locale);

  return (
    <article>
      <h1>{story.title}</h1>
      <div dangerouslySetInnerHTML={{__html: story.contentHtml}} />
    </article>
  );
}
```

### Feature 4: Client Providers

```typescript
// src/components/ClientProviders.tsx
'use client';

import {NextIntlClientProvider} from 'next-intl';
import {ParallaxProvider} from 'react-scroll-parallax';

export default function ClientProviders({
  messages,
  locale,
  children
}: {
  messages: any;
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ParallaxProvider>
        {children}
      </ParallaxProvider>
    </NextIntlClientProvider>
  );
}
```

---

## Development Workflow

### Running the Project

```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm start

# Linting
pnpm lint
```

### Adding New Stories

1. Create markdown file in `src/stories/`
2. Add frontmatter with metadata
3. Write content in markdown
4. Create translated version (if needed): `{name}-ar.md`
5. Restart dev server (auto-reload)

### Adding Translations

1. Add keys to `messages/en.json`
2. Add corresponding translations to `messages/ar.json`
3. Use in components: `const t = useTranslations('Section')` then `t('key')`

---

## Architecture Improvements

### Recent Refactoring Highlights

The codebase has been refactored following **Clean Architecture** and **SOLID principles**:

#### 1. Story Library Refactoring (84% Size Reduction)

**Before:** Single monolithic file (130 lines)
- Mixed file I/O, parsing, and business logic
- Code duplication in multiple functions
- Hard to test individual components

**After:** Three-layer architecture
- **story-parser.ts** (63 lines): Pure parsing logic
- **story-service.ts** (72 lines): Business logic & queries
- **stories.ts** (24 lines): Clean public API

**Benefits:**
- ✅ Zero code duplication
- ✅ Each layer testable independently
- ✅ Easier to maintain and extend
- ✅ Backward compatible (legacy functions still work)

#### 2. Enhanced Query Capabilities

Added powerful new query methods to `StoryService`:

```typescript
// Get featured stories with limits
const featured = await StoryService.getFeaturedStories('en', 3);

// Filter stories by country
const usaStories = await StoryService.getStoriesByCountry('en', 'USA');

// Get all unique countries
const countries = await StoryService.getAllCountries('en');
```

#### 3. Custom Hooks for Reusability

Created reusable intersection observer hooks:
- `useIntersectionObserver`: Single element animation trigger
- `useMultipleIntersectionObserver`: Multiple elements with one hook

#### 4. Component Organization

Structured components with clear separation:
- **HomePageClient**: Orchestrates all sections
- **Individual section components**: Focused, single-purpose
- **Section wrapper**: Consistent layout pattern

**Component Structure:**
```
src/components/
├── ui/Section.tsx          # Reusable section wrapper
├── HeroSection.tsx         # Hero banner
├── FeaturedStories.tsx     # Story grid
├── StoryOfTheDay.tsx       # Daily highlight
├── WhoAreNewMuslims.tsx    # Information section
├── WhatsNext.tsx           # Call-to-action
└── HomePageClient.tsx      # Main orchestrator
```

#### 5. Import Strategy

Barrel exports for cleaner imports:

```typescript
// Import everything from one place
import { StoryService, parseStoryFile, StoryData } from '@/lib';

// Or import specific items
import { getSortedStoriesData } from '@/lib/stories';
import { getFeaturedStories } from '@/lib/story-service';
```

#### 6. Testing Benefits

Each layer can now be tested independently:

```typescript
// Test parsing without file system
test('parseStoryFile converts markdown to HTML');

// Test service logic without I/O
test('getFeaturedStories returns limited results');

// Test components in isolation
test('FeaturedStories renders story cards');
```

---

## Configuration Files

### next.config.mjs
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig = {
  // Add any custom config
};

export default withNextIntl(nextConfig);
```

### tailwind.config.ts
```typescript
import type {Config} from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, select project settings
```

### Environment Variables

No environment variables required for basic setup.

### Build Settings

- **Build Command**: `pnpm build`
- **Output Directory**: `.next` (default)
- **Install Command**: `pnpm install`

---

## Best Practices

### Code Organization
1. **Separation of Concerns**: Keep parsing, business logic, and UI separate
   - Use `story-parser.ts` for file I/O and markdown conversion
   - Use `story-service.ts` for business logic and queries
   - Keep components focused and single-purpose

2. **Type Safety**: Always use TypeScript interfaces for story data
   - `StoryData` interface defines the contract
   - Use strict TypeScript configuration
   - Leverage TypeScript for better IDE support

3. **Custom Hooks**: Extract reusable logic into custom hooks
   - Animation logic in `useIntersectionObserver`
   - Keep hooks focused on one responsibility
   - Make hooks configurable with options

### Performance & SEO
4. **Static Generation**: Use `generateStaticParams` for all dynamic routes
   - Pre-render stories for optimal performance
   - Leverage Next.js SSG capabilities
   - Cache static pages at CDN level

5. **Images**: Store images in `public/` directory, reference with absolute paths
   - Use `next/image` for optimization
   - Provide alt text for accessibility
   - Optimize image sizes for different screen densities

6. **SEO**: Add metadata in `generateMetadata` functions
   - Include story titles and descriptions
   - Set proper Open Graph tags
   - Use semantic HTML structure

### Accessibility & UX
7. **Accessibility**: Use semantic HTML and proper ARIA labels
   - Ensure keyboard navigation works
   - Test with screen readers
   - Provide skip links for navigation

8. **Consistent Layout**: Use the `Section` wrapper component
   - Maintain consistent spacing and structure
   - Easier to make global design changes
   - Reduces CSS duplication

### Testing & Maintenance
9. **Testing**: Test each layer independently
   - Unit tests for parsing logic
   - Integration tests for service layer
   - Component tests for UI

10. **Code Quality**: Follow clean architecture principles
    - Single Responsibility Principle
    - Dependency inversion
    - Open/Closed principle

11. **Documentation**: Keep code self-documenting
    - Use meaningful variable and function names
    - Add JSDoc comments for complex functions
    - Update PROJECT_BLUEPRINT.md with changes

### Internationalization
12. **i18n**: Use translation keys consistently
    - Prefix keys with feature name: `Index.title`, `Common.learnMore`
    - Keep translations in separate files
    - Test both LTR and RTL layouts

### Error Handling
13. **Robust Error Handling**: Handle edge cases gracefully
    - Check file existence before reading
    - Provide meaningful error messages
    - Fallback UI for missing content

### Version Control
14. **Git Practices**: Write clear commit messages
    - Use conventional commits: `feat:`, `fix:`, `docs:`
    - Keep commits focused and atomic
    - Reference issue numbers in commits

---

## File Reference Guide

### Core Library Files

| File | Purpose | Lines | Key Exports |
|------|---------|-------|-------------|
| `src/lib/stories.ts` | Public API & StoryData interface | 24 | `StoryData`, `StoryService`, `getSortedStoriesData` |
| `src/lib/story-parser.ts` | Markdown parsing & file I/O | 63 | `parseStoryFile`, `getStoryFileNames`, `extractSlugAndLocale` |
| `src/lib/story-service.ts` | Business logic & queries | 72 | `StoryService` class with all query methods |
| `src/lib/index.ts` | Barrel exports | 8 | All library exports in one place |

### Custom Hooks

| File | Purpose | Use Case |
|------|---------|----------|
| `src/hooks/useIntersectionObserver.ts` | Single element intersection observer | Animating one section on scroll |
| `src/hooks/useMultipleIntersectionObserver.ts` | Multiple elements observer | Animating multiple sections |
| `src/hooks/useHasMounted.ts` | Component mount status | Preventing hydration mismatches |

### Component Files

| File | Purpose | Props |
|------|---------|-------|
| `src/components/HomePageClient.tsx` | Main page orchestrator | `stories: StoryData[]` |
| `src/components/FeaturedStories.tsx` | Story grid display | `stories: StoryData[]` |
| `src/components/ui/Section.tsx` | Reusable section wrapper | `children`, `id?`, `className?` |
| `src/components/HeroSection.tsx` | Hero banner | None |
| `src/components/StoryOfTheDay.tsx` | Daily story highlight | None |
| `src/components/WhoAreNewMuslims.tsx` | Information section | None |
| `src/components/WhatsNext.tsx` | Call-to-action section | None |

### Usage Patterns

**Importing from the library:**
```typescript
// Option 1: Legacy API (backward compatible)
import { getSortedStoriesData, StoryData } from '@/lib/stories';

// Option 2: Service API (new features)
import { StoryService } from '@/lib/stories';

// Option 3: Everything from index
import { StoryService, parseStoryFile, StoryData } from '@/lib';
```

**Using custom hooks:**
```typescript
// Single element
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

// Multiple elements
import useMultipleIntersectionObserver from '@/hooks/useMultipleIntersectionObserver';
```

**Component imports:**
```typescript
// Import individual components
import FeaturedStories from '@/components/FeaturedStories';
import Section from '@/components/ui/Section';
```

---

## Troubleshooting

### Issue: Locale switcher shows 404
**Fix**: Ensure `useRouter` and `usePathname` are from `next-intl/navigation`

### Issue: Arabic text renders left-to-right
**Fix**: Add `dir={locale === 'ar' ? 'rtl' : 'ltr'}` to layout

### Issue: Story not loading
**Check**: File path matches slug exactly (case-sensitive)

### Issue: ReferenceError - StoryService is not defined
**Problem**: Using StoryService before importing it
**Fix**: Ensure `import { StoryService } from './story-service';` appears before exports in `stories.ts`

### Issue: Fast Refresh runtime error
**Problem**: Duplicate component files or incorrect imports
**Fix**:
1. Check for duplicate component files (e.g., both `FeaturedStories.tsx` and `home/FeaturedStories.tsx`)
2. Verify all imports match actual file locations
3. Restart dev server after file structure changes

### Issue: TypeScript errors with new story service methods
**Problem**: Using new methods like `getFeaturedStories` without importing
**Fix**: Import from the correct location:
```typescript
import { StoryService } from '@/lib/stories';
// or
import { getFeaturedStories } from '@/lib/story-service';
```

### Issue: Build succeeds but runtime errors occur
**Problem**: Missing error handling in new service methods
**Fix**: Always wrap service calls in try-catch:
```typescript
try {
  const stories = await StoryService.getFeaturedStories('en');
} catch (error) {
  console.error('Failed to load stories:', error);
  // Show fallback UI
}
```

### Issue: Custom hooks not working
**Problem**: Forgetting to apply ref to JSX element
**Fix**: Always attach the ref:
```typescript
const sectionRef = useRef<HTMLElement>(null);
useIntersectionObserver(sectionRef);

return <section ref={sectionRef}>...</section>;
```

---

## Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Markdown Guide](https://www.markdownguide.org/)

---

## Changelog

### Version 2.0 - Architecture Refactoring (2025-10-31)

**Major Changes:**
- ✅ Refactored story library into 3-layer architecture (84% size reduction)
- ✅ Added custom hooks for intersection observer
- ✅ Enhanced StoryService with new query methods
- ✅ Improved component organization
- ✅ Added barrel exports for cleaner imports
- ✅ Zero breaking changes - fully backward compatible

**New Files:**
- `src/lib/story-parser.ts` - Markdown parsing layer
- `src/lib/story-service.ts` - Business logic layer
- `src/lib/index.ts` - Barrel exports
- `src/hooks/useIntersectionObserver.ts` - Single element observer
- `src/hooks/useMultipleIntersectionObserver.ts` - Multiple elements observer

**Modified Files:**
- `src/lib/stories.ts` - Simplified to 24 lines
- `src/components/HomePageClient.tsx` - Cleaner orchestration
- `docs/PROJECT_BLUEPRINT.md` - Comprehensive documentation update

**Benefits:**
- Better testability (each layer independent)
- Enhanced query capabilities (featured stories, by country, etc.)
- Cleaner separation of concerns
- Easier maintenance and extension
- Industry-standard architecture patterns

---

**Last Updated:** 2025-10-31
**Version:** 2.0
**Contributors:** Development Team
