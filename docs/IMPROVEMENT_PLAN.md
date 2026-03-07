# Project Improvement Plan

**Created**: January 15, 2026
**Last Updated**: March 05, 2026
**Author**: Senior Developer
**For**: Junior Developer
**Version**: 1.1

---

> "Code is written once but read many times. Write for the reader, not just the writer."

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Progress Summary (March 2026)](#progress-summary-march-2026)
3. [Immediate Priorities (This Sprint)](#immediate-priorities-this-sprint)
4. [Code Quality Improvements](#code-quality-improvements)
5. [Performance Optimizations](#performance-optimizations)
6. [Security Enhancements](#security-enhancements)
7. [Developer Experience](#developer-experience)
8. [Architecture Improvements](#architecture-improvements)
9. [Testing Strategy](#testing-strategy)
10. [Documentation](#documentation)
11. [Technical Debt](#technical-debt)
12. [Learning Path](#learning-path)

---

## Executive Summary

This document outlines a comprehensive improvement plan for the New Muslim Stories project. As your senior developer, I've identified areas where the codebase can mature significantly. These improvements will make the application more maintainable, performant, and scalable.

**Key Focus Areas**:
- TypeScript strictness and type safety
- Component architecture and reusability
- Performance optimization
- Testing infrastructure
- Developer experience enhancements

---

## Progress Summary (March 2026)

**Completed:** 15 tasks ✅
**In Progress:** 2 tasks 🔄  
**Not Started:** 13 tasks ⏳
**Blocked:** 0 tasks 🚫

**Key Achievements (Jan-Mar 2026):**
1. ✅ Next.js 16 migration complete
2. ✅ React 19 upgrade complete
3. ✅ Tailwind v4 migration complete
4. ✅ Arabic translation system fixed
5. ✅ PWA fully implemented with offline support
6. ✅ Theme system working (light/dark mode)
7. ✅ Component refactoring (28-40% size reduction)
8. ✅ Profile photos added for stories
9. ✅ Story card improvements (HTML stripping, display fixes)
10. ✅ Icon components extracted to ui/Icon.tsx
11. ✅ i18n completed for all components
12. ✅ Middleware migrated to proxy.ts
13. ✅ Unused dependencies removed
14. ✅ Typography and text readability improved
15. ✅ Documentation consolidated and updated

**Current State:**
- Build: ✅ Passing
- Lint: ✅ No errors
- Tests: ⚠️ Not configured (Vitest planned)
- TypeScript: ✅ Strict mode enabled
- Dependencies: ✅ Up to date
- i18n: ✅ Full EN/AR support
- PWA: ✅ Fully functional

---

## Immediate Priorities (This Sprint)

### 1. Complete Middleware to Proxy Migration 🔴 ✅ COMPLETED

**File**: `src/middleware.ts`

**Status**: ✅ COMPLETED (January 2026)

**Action Taken**: Renamed `middleware.ts` to `proxy.ts` and updated configuration for Next.js 16.

**Commit**: `d2384e1`

---

### 2. Remove Unused Dependencies 🟡 ✅ COMPLETED

**Status**: ✅ COMPLETED (January 2026)

**Action Taken**: Removed `next-theme` dependency. The project uses `next-themes` (with 's').

**Why This Matters**:
- ✅ Reduced bundle size
- ✅ Eliminated confusion
- ✅ Removed dead code

---

### 3. Update Outdated Packages 🟡 ✅ COMPLETED

**Status**: ✅ COMPLETED (January 2026)

**Action Taken**: Updated all packages to latest versions:
- Next.js 16.0.10
- React 19.0.0
- Tailwind CSS 4.x
- All devDependencies updated

---

### 4. Extract Icon Components ✅ COMPLETED

**Status**: ✅ COMPLETED (January 2026)

**File**: `src/components/ui/Icon.tsx`

**Action Taken**: Created reusable Icon component with SunIcon and MoonIcon exports.

**Benefits**:
- ✅ Reusable across components
- ✅ Easier to maintain
- ✅ Better for theming

---

### 5. Complete Internationalization ✅ COMPLETED

**Status**: ✅ COMPLETED (January 2026)

**Files Updated**:
- ✅ `src/components/PWAInstall.tsx` - Added all translation keys
- ✅ `src/components/ThemeToggle.tsx` - Fixed aria-label accessibility

**Translation Keys Added**: See `messages/en.json` and `messages/ar.json` under "PWA" namespace.

---

## Code Quality Improvements

### 4. Enable TypeScript Strict Mode Enhancements

**Current State**: `tsconfig.json` has `strict: true` but could be stricter.

**Recommended Changes** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

**Why This Matters**:
- Catches more bugs at compile time
- Makes refactoring safer
- Self-documents code intent

**Affected Files You May Need to Fix**:
- `src/lib/story-parser.ts`
- `src/lib/story-service.ts`
- `src/components/ThemeToggle.tsx`

---

### 5. Component Architecture Improvements

#### 5.1 Extract Icon Components

**Current Issue**: `ThemeToggle.tsx` has inline SVGs (lines 13-46).

**What You Should Do**:
```tsx
// src/components/icons/SunIcon.tsx
export const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
  </svg>
);

// src/components/icons/MoonIcon.tsx
export const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);
```

**Create Directory Structure**:
```
src/components/
└── icons/
    ├── index.ts
    ├── SunIcon.tsx
    └── MoonIcon.tsx
```

**Benefits**:
- Reusable across components
- Easier to maintain
- Better for theming
- Easier to replace with icon library later

---

#### 5.2 Create Button Component System

**Current Issue**: `Button.tsx` is basic and components use inconsistent button styles.

**What You Should Do**:
```tsx
// src/components/ui/Button/Button.tsx
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-green-700 text-white hover:bg-green-800',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
        link: 'text-green-700 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

**Create Directory Structure**:
```
src/components/ui/
├── Button/
│   ├── index.ts
│   └── Button.tsx
└── utils.ts
```

**Benefits**:
- Consistent button styling
- Multiple variants (primary, secondary, outline, ghost, link)
- Multiple sizes
- Proper TypeScript support
- AsChild pattern for polymorphism

---

### 6. Complete Internationalization

**Current Issue**: `PWAInstall.tsx` has hardcoded fallback strings.

**What You Should Do**:
```tsx
// src/components/PWAInstall.tsx

// BEFORE (problematic):
const t = getTranslation('installAppTitle', 'Install App');

// AFTER (fixed):
const t = useTranslations('PWA');
// Use t('installAppTitle') directly
```

**Files to Update**:
- `src/components/PWAInstall.tsx` - Add missing translation keys
- `src/components/ThemeToggle.tsx` - Fix aria-label accessibility

**Translation Keys to Add** (`messages/en.json` and `messages/ar.json`):
```json
{
  "PWA": {
    "installAppTitle": "Install App",
    "installAppDescription": "Install New Muslim Stories for offline reading and faster access",
    "installFeatureOfflineReading": "Read stories offline",
    "installFeatureFasterLoading": "Faster loading",
    "installFeatureHomeScreenAccess": "Home screen access",
    "installButton": "Install",
    "notNowButton": "Not Now",
    "dismissAriaLabel": "Dismiss"
  }
}
```

---

## Performance Optimizations

### 7. Implement Code Splitting

**Current State**: All components load on initial page load.

**What You Should Do**:
```tsx
// src/app/[locale]/layout.tsx
import { lazy, Suspense } from 'react';

const PWAInstall = lazy(() => import('@/components/PWAInstall'));

// In your JSX:
<Suspense fallback={<div className="p-4">Loading...</div>}>
  <PWAInstall />
</Suspense>
```

**Components to Lazy Load**:
- `PWAInstall` - Only needed on first visit
- `StoryOfTheDay` - Below the fold
- `WhatsNext` - Below the fold
- `WhoAreNewMuslims` - Below the fold

**Benefits**:
- Faster initial page load
- Smaller bundle size
- Better Core Web Vitals

---

### 8. Image Optimization

**Current Issue**: Profile photos and story images may not be optimized.

**What You Should Do**:
```tsx
import Image from 'next/image';

// In StoryCard.tsx or similar:
<Image
  src={story.profilePhoto}
  alt={story.firstName}
  width={400}
  height={300}
  className="object-cover w-full h-48"
  loading="lazy"
/>
```

**Create Image Component**:
```tsx
// src/components/ui/Image/StoryImage.tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface StoryImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function StoryImage({ src, alt, className, priority = false }: StoryImageProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  );
}
```

**Benefits**:
- Automatic format conversion (WebP, AVIF)
- Responsive images
- Lazy loading
- Smaller file sizes

---

### 9. Font Optimization

**Current State**: `@fontsource/inter` and `@fontsource/montserrat` are loaded.

**What You Should Do**:
```tsx
// src/app/layout.tsx
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Benefits**:
- Self-hosted by Next.js
- No layout shift
- Better performance
- Automatic updates

---

## Security Enhancements

### 10. Content Security Policy (CSP)

**Current State**: No CSP headers configured.

**What You Should Do** (`next.config.mjs`):
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "worker-src 'self'",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

**Benefits**:
- Protection against XSS attacks
- Prevents clickjacking
- Controls resource loading
- Security best practice

---

### 11. Input Validation and Sanitization

**Current Issue**: Story content is rendered with `dangerouslySetInnerHTML`.

**What You Should Do**:
```tsx
import DOMPurify from 'isomorphic-dompurify';

// In story-service.ts or where content is processed:
export function sanitizeContent(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'strong', 'em', 'b', 'i', 'br', 'div', 'span'],
    ALLOWED_ATTR: ['href', 'class', 'id'],
  });
}
```

**Install Dependency**:
```bash
pnpm add isomorphic-dompurify
pnpm add -D @types/isomorphic-dompurify
```

**Benefits**:
- Prevents XSS attacks
- Sanitizes user-generated content
- Security compliance

---

## Developer Experience

### 12. Setup VS Code Settings

**Create**: `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

**Benefits**:
- Consistent formatting
- Auto-fix on save
- Better IntelliSense for Tailwind

---

### 13. Setup Prettier Configuration

**Create**: `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Install Plugin**:
```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

**Benefits**:
- Consistent code style
- Prettier handles formatting
- Tailwind class sorting

---

### 14. Git Hooks with lefthook

**Create**: `lefthook.yml`

```yaml
pre-commit:
  parallel: true
  commands:
    lint:
      run: pnpm lint
    prettier:
      run: pnpm prettier --write
    types:
      run: pnpm tsc --noEmit

commit-msg:
  commands:
    validate:
      run: grep -qE '^(feat|fix|docs|style|refactor|test|chore|build|ci|perf|revert)(\(.+\))?: .+' {1}

pre-push:
  commands:
    build:
      run: pnpm build
```

**Install**:
```bash
pnpm add -D lefthook
npx lefthook install
```

**Benefits**:
- Pre-commit linting
- Type checking before push
- Commit message validation
- Build verification

---

### 15. Create Development Scripts

**Update**: `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,md,mdx,json,css}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,md,mdx,json,css}\"",
    "storybook": "storybook dev -p 6006",
    "build:storybook": "storybook build"
  }
}
```

---

## Architecture Improvements

### 16. Implement Feature-Based Directory Structure

**Current Structure** (mixed):
```
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── StoryCard.tsx
│   └── ...
├── lib/
│   ├── stories.ts
│   ├── story-parser.ts
│   └── ...
└── hooks/
    ├── useHasMounted.ts
    ├── useThemeToggle.ts
    └── ...
```

**Recommended Structure** (feature-based):
```
src/
├── features/
│   ├── stories/
│   │   ├── components/
│   │   │   ├── StoryCard.tsx
│   │   │   ├── StoryContentDisplay.tsx
│   │   │   └── StoryList.tsx
│   │   ├── hooks/
│   │   │   ├── useStorySections.ts
│   │   │   └── useStoryData.ts
│   │   ├── lib/
│   │   │   ├── story-service.ts
│   │   │   └── story-parser.ts
│   │   ├── types/
│   │   │   └── story.types.ts
│   │   └── index.ts
│   ├── theme/
│   │   ├── components/
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── hooks/
│   │   │   └── useThemeToggle.ts
│   │   └── index.ts
│   └── i18n/
│       ├── components/
│       │   ├── LanguageSwitcher.tsx
│       │   └── LocaleProvider.tsx
│       ├── hooks/
│       │   └── useLocale.ts
│       └── index.ts
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── hooks/
│   │   ├── useHasMounted.ts
│   │   └── useIntersectionObserver.ts
│   ├── lib/
│   │   ├── cn.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
└── app/
    └── ...
```

**Benefits**:
- Better organization
- Easier to understand feature boundaries
- Scalable structure
- Clear separation of concerns

**Migration Strategy** (gradual):
1. Create new directories
2. Move files one feature at a time
3. Update imports
4. Run tests
5. Commit incrementally

---

### 17. Implement API Layer Pattern

**Current Issue**: Direct calls to data sources in components.

**What You Should Do**:
```tsx
// src/lib/api/client.ts
import { StoryData, Locale } from '@/types';

export interface ApiResponse<T> {
  data: T;
  error: Error | null;
  status: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getStories(locale: Locale): Promise<ApiResponse<StoryData[]>> {
    const response = await fetch(`${this.baseUrl}/stories?locale=${locale}`);
    if (!response.ok) {
      return { data: [], error: new Error('Failed to fetch stories'), status: response.status };
    }
    const data = await response.json();
    return { data, error: null, status: response.status };
  }

  async getStory(slug: string, locale: Locale): Promise<ApiResponse<StoryData>> {
    const response = await fetch(`${this.baseUrl}/stories/${slug}?locale=${locale}`);
    if (!response.ok) {
      return { data: {} as StoryData, error: new Error('Story not found'), status: response.status };
    }
    const data = await response.json();
    return { data, error: null, status: response.status };
  }
}

export const apiClient = new ApiClient();
```

**Benefits**:
- Centralized error handling
- Consistent API interface
- Easier to mock for testing
- Better logging and monitoring

---

## Testing Strategy

### 18. Setup Vitest

**Install**:
```bash
pnpm add -D vitest @vitest/ui @vitest/coverage-v8
pnpm add -D @testing-library/react @testing-library/user-event
pnpm add -D @testing-library/jest-dom
```

**Create**: `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Create**: `src/test/setup.ts`

```typescript
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));
```

---

### 19. Write Unit Tests

**Example Test** (`src/lib/utils.test.ts`):
```typescript
import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'active')).toBe('base active');
    expect(cn('base', false && 'active')).toBe('base');
  });

  it('handles empty values', () => {
    expect(cn('base', undefined, null, '')).toBe('base');
  });
});
```

**Example Component Test** (`src/components/Button/Button.test.tsx`):
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies variant classes', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');
  });

  it('applies size classes', () => {
    render(<Button size="sm">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-9');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

### 20. Write Integration Tests

**Example Integration Test** (`src/app/[locale]/page.test.tsx`):
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/[locale]/page';

// Mock data
const mockStories = [
  {
    slug: 'test-story',
    title: 'Test Story',
    firstName: 'Ahmed',
    country: 'Egypt',
    language: 'en' as const,
  },
];

describe('HomePage', () => {
  it('displays page title', () => {
    render(<HomePage params={{ locale: 'en' }} />);
    expect(screen.getByRole('heading')).toHaveTextContent(/stories/i);
  });

  it('renders story cards', () => {
    render(<HomePage params={{ locale: 'en' }} />);
    expect(screen.getAllByRole('article')).toHaveLength(mockStories.length);
  });

  it('displays language switcher', () => {
    render(<HomePage params={{ locale: 'en' }} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
```

---

## Documentation

### 21. Create Component Documentation

**Use Storybook**:

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'outline', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};
```

**Install Storybook**:
```bash
pnpm dlx storybook@latest init
```

---

### 22. Create API Documentation

**Create**: `docs/API.md`

```markdown
# API Documentation

## Stories API

### GET /api/stories

Returns all stories for a given locale.

**Query Parameters**:
- `locale` (required): 'en' | 'ar'

**Response**:
```json
{
  "data": [
    {
      "slug": "story-slug",
      "title": "Story Title",
      "firstName": "Ahmed",
      "age": 30,
      "country": "Egypt",
      "previousReligion": "Christianity",
      "profilePhoto": "/photos/ahmed.jpg",
      "featured": true,
      "language": "en",
      "contentHtml": "<p>Story content...</p>"
    }
  ],
  "error": null,
  "status": 200
}
```

### GET /api/stories/:slug

Returns a single story by slug.

**Response**:
```json
{
  "data": { ...storyData },
  "error": null,
  "status": 200
}
```

**Errors**:
- 404: Story not found
- 500: Server error
```

---

## Technical Debt

### 23. Create Technical Debt Backlog

**Create**: `docs/TECHNICAL_DEBT.md`

```markdown
# Technical Debt Backlog

## High Priority

- [ ] Migrate middleware.ts to proxy.ts
- [ ] Remove unused next-theme dependency
- [ ] Complete i18n for PWAInstall component

## Medium Priority

- [ ] Extract inline SVGs to separate icon components
- [ ] Implement code splitting for below-the-fold components
- [ ] Add Content Security Policy headers
- [ ] Implement input sanitization with DOMPurify

## Low Priority

- [ ] Migrate to feature-based directory structure
- [ ] Add Storybook documentation
- [ ] Implement comprehensive test suite
- [ ] Add API client layer pattern

## Backlog

- [ ] Replace inline SVGs with heroicons or lucide-react
- [ ] Add GraphQL layer (if needed in future)
- [ ] Implement database (if moving from Markdown)
- [ ] Add analytics integration
- [ ] Implement A/B testing infrastructure
```

---

## Learning Path

### For You (Junior Developer)

Here are recommended steps to grow as a developer while improving this project:

#### Phase 1: Foundation (Week 1-2)

1. **TypeScript Deep Dive**
   - Read: "Programming TypeScript" by Boris Cherny
   - Practice: Enable stricter TypeScript settings
   - Apply: Fix all TypeScript errors in the project

2. **React Patterns**
   - Read: React documentation on composition vs inheritance
   - Practice: Extract icon components from ThemeToggle
   - Apply: Implement compound component pattern for Button

#### Phase 2: Testing (Week 3-4)

1. **Testing Fundamentals**
   - Read: "Testing JavaScript Applications" by Lucas da Costa
   - Practice: Write tests for utility functions
   - Apply: Add integration tests for pages

2. **Test-Driven Development (TDD)**
   - Read: "Test-Driven Development by Example" by Kent Beck
   - Practice: Implement new feature using TDD
   - Apply: Refactor existing components with tests

#### Phase 3: Performance (Week 5-6)

1. **Web Performance**
   - Read: web.dev performance articles
   - Practice: Use Lighthouse to identify bottlenecks
   - Apply: Implement optimizations

2. **React Performance**
   - Read: React docs on performance optimization
   - Practice: Profile components with React DevTools
   - Apply: Memoization and code splitting

#### Phase 4: Architecture (Week 7-8)

1. **Design Patterns**
   - Read: "Design Patterns" by Gang of Four
   - Practice: Identify patterns in existing code
   - Apply: Implement API layer pattern

2. **Clean Code**
   - Read: "Clean Code" by Robert C. Martin
   - Practice: Refactor a component for clarity
   - Apply: Code review checklist

---

## Summary Checklist

### ✅ Completed This Sprint (Jan-Mar 2026)
- [x] Migrate middleware to proxy
- [x] Remove unused dependency (next-theme)
- [x] Update baseline-browser-mapping
- [x] Extract icon components
- [x] Complete i18n for PWAInstall
- [x] Fix theme icon alignment
- [x] Add profile photos for stories
- [x] Add explicit text colors for themes
- [x] Strip HTML from excerpts
- [x] Fix card display issues
- [x] Update documentation
- [x] Consolidate issues tracking
- [x] Next.js 16 migration
- [x] React 19 upgrade
- [x] Tailwind v4 migration

### 🔄 In Progress
- [ ] Setup Vitest
- [ ] Write unit tests for utils

### 📅 Next Month Priorities
- [ ] Setup Prettier and formatting
- [ ] Add lefthook for git hooks
- [ ] Implement code splitting
- [ ] Add image optimization

### 📅 This Quarter
- [ ] Complete image optimization
- [ ] Migrate to feature-based structure
- [ ] Implement API layer
- [ ] Add CSP headers
- [ ] Write comprehensive tests
- [ ] Add Storybook documentation

### 🔄 Ongoing
- [ ] Fix TypeScript errors as they appear
- [ ] Write tests for new features
- [ ] Update documentation regularly
- [ ] Refactor technical debt
- [ ] Learn and apply best practices

---

## Resources

### Recommended Reading

1. **TypeScript**
   - [TypeScript Documentation](https://www.typescriptlang.org/docs/)
   - [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

2. **React**
   - [React Documentation](https://react.dev/)
   - [Thinking in React](https://react.dev/learn/thinking-in-react)

3. **Testing**
   [Testing Library](https://testing-library.com/docs/)
   - [Vitest Documentation](https://vitest.dev/)

4. **Performance**
   - [web.dev](https://web.dev/)
   - [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

5. **Clean Code**
   - [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

### Tools

1. **TypeScript**
   - https://www.typescriptlang.org/play
   - https://ts.dev/

2. **Testing**
   - https://testing-playground.com/
   - https://mswjs.io/

3. **Performance**
   - https://pagespeed.web.dev/
   - https://developers.google.com/web/tools/lighthouse

4. **Code Quality**
   - https://prettier.io/
   - https://eslint.org/

---

## Conclusion

This improvement plan provides a roadmap for evolving the New Muslim Stories project from a functional application to a maintainable, scalable, and well-tested codebase.

**Key Principles to Remember**:

1. **Code is read more than written** - Write for the reader
2. **Test early and often** - Tests are your safety net
3. **Refactor continuously** - Technical debt accumulates
4. **Learn by doing** - Practice makes perfect
5. **Ask questions** - Senior developers expect questions

I'm here to help you grow as a developer. Don't hesitate to ask when you're stuck or need clarification on any of these items.

Let's build something great together.

---

**Questions? Comments? Suggestions?**

Open an issue or reach out for clarification.

---

*This document is a living guide. Update it as the project evolves and as you learn new things.*
