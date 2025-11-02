# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: pnpm (version 10.19.0+)

**Core Commands**:
- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Build production application
- `pnpm start` - Start production server after build
- `pnpm lint` - Run ESLint for code quality
- `pnpm test` - Run unit tests (configured with Jest)

**Story Files**:
- Stories are stored in `src/stories/` as Markdown files
- English stories: `{story-name}.md`
- Arabic stories: `{story-name}-ar.md`
- Each story has YAML frontmatter with metadata (title, author, age, country, etc.)
- Frontmatter fields: title, author, date, image, language

## Architecture Overview

**Framework**: Next.js 14 with App Router and TypeScript

**Key Features**:
- **Internationalization (i18n)**: Built with `next-intl` supporting English (en) and Arabic (ar)
  - Middleware: `src/middleware.ts` handles locale routing
  - Config: `src/i18n.ts` defines locale settings and message loading
  - Messages: `messages/{locale}.json` contains translation strings
- **Content Management**: Markdown-based story system using `gray-matter` and `remark`
  - Story data loader: `src/lib/stories.ts`
  - Stories directory: `src/stories/`
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion and React Scroll Parallax (via `ParallaxProvider` in `ClientProviders.tsx`)
- **Themes**: Dark/Light mode support with `next-themes`
- **Fonts**: Inter and Montserrat via `@fontsource`

## Directory Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── [locale]/            # Dynamic locale routes (en/ar)
│   │   ├── layout.tsx       # Root layout with ClientProviders
│   │   ├── page.tsx         # Homepage
│   │   └── stories/
│   │       └── [slug]/
│   │           └── page.tsx # Individual story pages
│   └── layout.tsx           # Root HTML layout
├── components/              # React components
│   ├── Button.tsx
│   ├── ClientProviders.tsx  # NextIntl, Parallax, Theme providers
│   ├── FeaturedStories.tsx
│   ├── HeroSection.tsx
│   ├── HomePageClient.tsx
│   ├── LanguageSwitcher.tsx
│   ├── StoryContentDisplay.tsx
│   ├── StoryOfTheDay.tsx
│   ├── ThemeToggle.tsx
│   ├── WhatsNext.tsx
│   ├── WhoAreNewMuslims.tsx
│   └── ui/
│       └── Section.tsx
├── lib/
│   └── stories.ts           # Story data fetching utilities
├── middleware.ts            # i18n middleware (routes: /, /en, /ar)
├── i18n.ts                  # next-intl configuration
└── stories/                 # Markdown story files (*.md and *-ar.md)
```

**Translation Files**:
```
messages/
├── en.json  # English translations
└── ar.json  # Arabic translations
```

## Key Configuration Files

- **next.config.mjs**: Next.js config with `next-intl` plugin
- **tailwind.config.ts**: Tailwind CSS configuration
- **tsconfig.json**: TypeScript configuration (strict mode enabled)
- **.eslintrc.json**: ESLint extends Next.js core web vitals + TypeScript rules
- **middleware.ts**: Handles locale-based routing (matches `/`, `/en/:path*`, `/ar/:path*`)

## Important Implementation Details

**Locale Handling**:
- Locale is set via URL segment `/[locale]/`
- Default locale: `en`
- RTL support: Arabic pages use `dir="rtl"` in `src/app/[locale]/layout.tsx:18`
- Timezone: Set to `'Asia/Aden'` in `src/i18n.ts:18`

**Story Data Structure** (from `src/lib/stories.ts:9-20`):
```typescript
interface StoryData {
  slug: string;
  title: string;
  firstName: string;
  age: number;
  country: string;
  previousReligion: string;
  profilePhoto: string;
  featured: boolean;
  language: string;  // 'en' or 'ar'
  contentHtml: string;
}
```

**Data Fetching**:
- `getSortedStoriesData(locale)` - Get all stories filtered by locale
- `getAllStorySlugs()` - Generate static params for all stories
- `getStoryData(slug, locale)` - Get specific story by slug and locale

**Client Providers** (`src/components/ClientProviders.tsx`):
- NextIntlClientProvider: i18n support
- ParallaxProvider: Scroll-based animations
- ThemeProvider: Dark/light mode toggle

**ESLint Configuration**:
- Extends: `next/core-web-vitals` and `next/typescript`
- Config file: `.eslintrc.json`

**TypeScript Interface Patterns**:
- Component props use named interfaces (e.g., `RootLayoutProps` in `src/app/layout.tsx:9`)
- Layout components define explicit props interfaces for clarity and reusability
- Interface naming convention: `{ComponentName}Props` (e.g., `LocaleLayoutProps`, `RootLayoutProps`)
- Benefits: Better IDE support, self-documenting code, and clear component contracts

## Story Content Format

Stories use YAML frontmatter followed by Markdown content:

```yaml
---
title: "Story Title"
author: "Author Name"
date: "YYYY-MM-DD"
image: "/path/to/image"
language: "en"  # or "ar"
---
```

## Package Manager Notes

- **pnpm** is configured as the package manager (version 10.19.0+)
- Always use `pnpm` commands instead of `npm` or `yarn`
- Lockfile: `pnpm-lock.yaml`

## Recent Changes Context

Current branch: `feat/ui-improvement`
- Recent commits include UI improvements, translation button changes, theme toggle implementation, i18n navigation fixes, font loading/module import error fixes, RootLayoutProps interface addition for better TypeScript type safety, Header/Footer component extraction for improved code reusability, and StoryCard component extraction for better component composition.
