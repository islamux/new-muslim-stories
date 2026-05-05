# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: pnpm (version 10.28.0+)

**Core Commands**:
- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Build production application
- `pnpm start` - Start production server after build
- `pnpm lint` - Run ESLint for code quality

**Story Files**:
- Stories are stored in `src/stories/` as Markdown files
- English stories: `{story-name}.md`
- Arabic stories: `{story-name}-ar.md`
- Each story has YAML frontmatter with metadata (title, author, age, country, etc.)
- Frontmatter fields: title, author, date, image, language

## Architecture Overview

**Framework**: Next.js 16 with App Router, TypeScript, and React 19

**Key Features**:
- **Internationalization (i18n)**: Built with `next-intl` v4 supporting English (en) and Arabic (ar)
  - Proxy: `src/proxy.ts` handles locale routing (Next.js 16 `proxy.ts` convention)
  - Config: `src/i18n/routing.ts` and `src/i18n/request.ts`
  - Messages: `messages/{locale}.json` contains translation strings
- **Content Management**: Markdown-based story system using `gray-matter`, `remark`, and `remark-html`
  - Story parsing: `src/lib/stories.ts`, `src/lib/story-parser.ts`, `src/lib/story-service.ts`
  - Stories directory: `src/stories/` (~69 stories x 2 languages)
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`
- **Animations**: Framer Motion and React Scroll Parallax (via `ParallaxProvider` in `ClientProviders.tsx`)
- **Themes**: Dark/Light mode support with `next-themes`
- **Fonts**: Inter and Montserrat via `@fontsource`
- **PWA**: Service worker, web manifest, install prompt
- **Custom Hooks**: `src/hooks/` (useIntersectionObserver, useMultipleIntersectionObserver, useHasMounted, useStorySections)

## Directory Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root HTML layout
│   ├── [locale]/             # Dynamic locale routes (en/ar)
│   │   ├── layout.tsx        # Locale layout with ClientProviders
│   │   ├── page.tsx          # Homepage
│   │   └── stories/
│   │       └── [slug]/
│   │           └── page.tsx  # Individual story pages
│   └── offline/              # PWA offline fallback page
├── components/               # React components
│   ├── Button.tsx
│   ├── ClientProviders.tsx   # NextIntl, Parallax, Theme providers
│   ├── FeaturedStories.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── HomePageClient.tsx
│   ├── LanguageSwitcher.tsx
│   ├── ProfileHeader.tsx
│   ├── PWAInstall.tsx
│   ├── ServiceWorkerRegistration.tsx
│   ├── StoryCard.tsx
│   ├── StoryContentDisplay.tsx
│   ├── StoryOfTheDay.tsx
│   ├── ThemeToggle.tsx
│   ├── TopNav.tsx
│   ├── WhatsNext.tsx
│   ├── WhoAreNewMuslims.tsx
│   └── ui/
│       ├── Section.tsx       # UI primitive with animation support
│       └── Icon.tsx
├── hooks/                    # Custom React hooks
│   ├── useIntersectionObserver.ts
│   ├── useMultipleIntersectionObserver.ts
│   ├── useHasMounted.ts
│   └── useStorySections.ts
├── lib/
│   ├── stories.ts            # Story data fetching utilities
│   ├── story-parser.ts       # Markdown parsing logic
│   └── story-service.ts      # Story service layer
├── i18n/
│   ├── routing.ts            # Central locale routing configuration
│   └── request.ts            # Request configuration (timezone: Asia/Aden)
├── proxy.ts                  # i18n proxy/middleware (Next.js 16)
└── stories/                  # Markdown story files (*.md and *-ar.md)
```

**Translation Files**:
```
messages/
├── en.json  # English translations
└── ar.json  # Arabic translations
```

## Key Configuration Files

- **next.config.mjs**: Next.js config with `next-intl` plugin
- **postcss.config.mjs**: PostCSS with `@tailwindcss/postcss`
- **tsconfig.json**: TypeScript configuration (strict mode enabled, `@/*` path alias to `src/`)
- **eslint.config.mjs**: ESLint flat config with TypeScript, React, and Next.js plugins
- **proxy.ts**: Handles locale-based routing (matches `/`, `/en/:path*`, `/ar/:path*`)

## Important Implementation Details

**Locale Handling**:
- Locale is set via URL segment `/[locale]/`
- Default locale: `en`
- RTL support: Arabic pages use `dir="rtl"` in `src/app/[locale]/layout.tsx`
- Timezone: Set to `'Asia/Aden'` in `src/i18n/request.ts`
- `setRequestLocale()` must be called in all layouts and pages before using `getMessages()` or `useTranslations()`

**Story Data Structure**:
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
- Flat config (`eslint.config.mjs`) with typescript-eslint, eslint-plugin-react, eslint-plugin-jsx-a11y, eslint-plugin-import, eslint-config-next
- Next.js 16 uses the flat config format

**TypeScript Interface Patterns**:
- Component props use named interfaces (e.g., `RootLayoutProps`, `LocaleLayoutProps`)
- Layout components define explicit props interfaces for clarity and reusability
- Interface naming convention: `{ComponentName}Props`
- Use `import type` for type-only imports

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

- **pnpm** is configured as the package manager (version 10.28.0)
- Always use `pnpm` commands instead of `npm` or `yarn`
- Lockfile: `pnpm-lock.yaml`

## Command Center

This project includes a Command Center for AI-assisted project management:
- **MCP Server**: `command-center-mcp/` — 24 MCP tools for task/milestone/agent management
- **TUI Dashboard**: `command-center-tui/` — Terminal UI (Node.js/blessed) with 4 views
- **CLI**: `cc` shell function (auto-detects project from cwd)
- **TUI**: `ccui` shell function (auto-detects project from cwd)
- **Tracker**: `project-tracker.json` — single source of truth
- See `docs/SETUP_COMMAND_CENTER.md` for setup in new projects
