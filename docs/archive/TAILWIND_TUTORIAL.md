# Complete Tailwind CSS Tutorial

**Date**: January 15, 2026

## Real-World Examples from New Muslim Stories Project

Welcome! This comprehensive tutorial teaches you Tailwind CSS by examining a real, production-ready application. Each concept is explained with actual code from the project.

---

## Table of Contents
1. [What is Tailwind CSS?](#1-what-is-tailwind-css)
2. [Installation & Setup](#2-installation--setup)
3. [Configuration](#3-configuration)
4. [Core Concepts](#4-core-concepts)
5. [Layout & Display](#5-layout--display)
6. [Flexbox](#6-flexbox)
7. [Grid System](#7-grid-system)
8. [Spacing](#8-spacing)
9. [Colors & Dark Mode](#9-colors--dark-mode)
10. [Typography](#10-typography)
11. [Borders & Shadows](#11-borders--shadows)
12. [Backgrounds](#12-backgrounds)
13. [Transitions & Animations](#13-transitions--animations)
14. [Hover States & Interactive Elements](#14-hover-states--interactive-elements)
15. [Responsive Design](#15-responsive-design)
16. [Custom Colors & Design System](#16-custom-colors--design-system)
17. [Best Practices](#17-best-practices)
18. [Common Patterns](#18-common-patterns)

---

## 1. What is Tailwind CSS?

### What is Tailwind?
**Tailwind CSS** is a **utility-first** CSS framework that provides low-level utility classes to build custom designs without writing custom CSS.

### Traditional CSS vs Tailwind

**Traditional CSS:**
```css
/* Write your own CSS */
.button {
  background-color: #FF7060;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #E65A4B;
  transform: scale(1.05);
}
```

```html
<button class="button">Click me</button>
```

**Tailwind CSS:**
```html
<button class="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
  Click me
</button>
```

**Benefits of Tailwind:**
- ✅ No custom CSS to maintain
- ✅ Consistent design system
- ✅ Rapid development
- ✅ Small production bundle (purged unused styles)
- ✅ Easy to make design changes
- ✅ Mobile-first responsive design built-in

---

## 2. Installation & Setup

### File Structure
```
project/
├── tailwind.config.ts        # Tailwind configuration
├── postcss.config.mjs        # PostCSS configuration
├── src/
│   ├── app/
│   │   └── globals.css       # Main CSS file
│   └── components/
```

### Main CSS File
**File:** `src/app/globals.css`

```css
@import '@fontsource/inter';
@import '@fontsource/montserrat';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

**What's happening:**
- `@tailwind base` - Resets and base styles
- `@tailwind components` - Component classes
- `@tailwind utilities` - Utility classes

---

## 3. Configuration

### Tailwind Config
**File:** `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',  // Enable dark mode with 'class' strategy
  content: [         // Which files to scan for classes
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom colors, fonts, spacing, etc.
    },
  },
  plugins: [],
} satisfies Config;
```

**Configuration Options:**
- `darkMode`: Enable dark mode
- `content`: Files to scan for Tailwind classes
- `theme.extend`: Customize default theme
- `plugins`: Add Tailwind plugins

### PostCSS Config
**File:** `postcss.config.mjs`

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

---

## 4. Core Concepts

### Utility-First Approach
Tailwind provides thousands of utility classes for common CSS properties.

```html
<!-- Create a card without writing CSS -->
<div class="bg-white rounded-lg shadow-md p-6 text-center">
  <h3 class="font-bold text-xl mb-3">Title</h3>
  <p class="text-gray-700">Content</p>
</div>
```

### Naming Convention
Tailwind classes follow a pattern: `{property}{screen}{state}:{value}`

**Examples:**
- `p-4` = padding: 1rem
- `md:p-6` = padding: 1.5rem on medium screens
- `hover:bg-red-500` = background red on hover
- `dark:text-white` = white text in dark mode

### Prefixes:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)
- `2xl:` - 2X large screens (1536px+)

---

## 5. Layout & Display

### Display Classes
**File:** `src/components/ui/Section.tsx`

```typescript
export default function Section({ id, className, children }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
```

**Common Display Classes:**
- `block` - display: block
- `inline` - display: inline
- `inline-block` - display: inline-block
- `flex` - display: flex
- `grid` - display: grid
- `hidden` - display: none

### Container
**File:** `src/components/TopNav.tsx`

```jsx
<nav className="sticky top-0 z-50">
  <div className="container mx-auto px-4">
    {/* content */}
  </div>
</nav>
```

- `container` - Centered container with max-width
- `mx-auto` - margin-left and margin-right auto (center)
- `px-4` - padding-left and padding-right

### Position
- `static` - position: static
- `relative` - position: relative
- `absolute` - position: absolute
- `fixed` - position: fixed
- `sticky` - position: sticky (scrolls with page, then sticks)

**Example from TopNav:**
```jsx
<nav className="sticky top-0 z-50">
  {/* Sticks to top when scrolling */}
</nav>
```

### Z-Index
- `z-0` - z-index: 0
- `z-10` - z-index: 10
- `z-50` - z-index: 50 (common for modals, navbars)

---

## 6. Flexbox

### Basic Flexbox
**File:** `src/components/TopNav.tsx`

```jsx
<div className="flex items-center justify-between h-16">
  <div className="flex items-center">
    <LanguageSwitcher />
  </div>
  <div className="flex items-center">
    <ThemeToggle />
  </div>
</div>
```

**Flex Classes:**
- `flex` - display: flex
- `items-center` - align-items: center
- `items-start` - align-items: flex-start
- `items-end` - align-items: flex-end
- `justify-between` - justify-content: space-between
- `justify-center` - justify-content: center
- `justify-start` - justify-content: flex-start
- `justify-end` - justify-content: flex-end
- `gap-4` - gap: 1rem (space between children)

### Flex Direction
- `flex-row` - flex-direction: row (default)
- `flex-col` - flex-direction: column
- `flex-row-reverse` - flex-direction: row-reverse
- `flex-col-reverse` - flex-direction: column-reverse

### Flex Sizing
- `flex-1` - flex: 1 1 0% (grow to fill space)
- `flex-auto` - flex: 1 1 auto
- `flex-none` - flex: none (don't grow or shrink)

---

## 7. Grid System

### Grid Layout
**File:** `src/components/FeaturedStories.tsx`

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {stories.map((story) => (
    <StoryCard key={story.slug} story={story} />
  ))}
</div>
```

**Grid Classes:**
- `grid` - display: grid
- `grid-cols-1` - grid-template-columns: repeat(1, minmax(0, 1fr))
- `md:grid-cols-2` - 2 columns on medium screens
- `lg:grid-cols-3` - 3 columns on large screens
- `gap-8` - gap: 2rem
- `gap-x-4` - column-gap: 1rem
- `gap-y-6` - row-gap: 1.5rem

### Grid Spans
- `col-span-2` - span 2 columns
- `col-span-full` - span all columns
- `row-span-2` - span 2 rows

### Custom Grid
```jsx
<!-- Custom grid: 2 columns on mobile, 4 on desktop -->
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

---

## 8. Spacing

### Padding
**File:** `src/components/StoryCard.tsx`

```jsx
<div className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6">
  <h3>{story.title}</h3>
  <p className="mb-4">{story.content}</p>
</div>
```

**Padding Classes:**
- `p-6` - padding: 1.5rem (all sides)
- `px-4` - padding-left and padding-right
- `py-3` - padding-top and padding-bottom
- `pt-4` - padding-top only
- `pr-6` - padding-right only
- `pb-8` - padding-bottom only
- `pl-2` - padding-left only

### Margin
- `m-4` - margin: 1rem
- `mx-auto` - margin-left and margin-right auto (center)
- `my-6` - margin-top and margin-bottom
- `mt-4` - margin-top
- `mr-2` - margin-right
- `mb-8` - margin-bottom
- `ml-2` - margin-left

### Spacing Scale
| Class | Size | Pixels |
|-------|------|--------|
| `p-1` | 0.25rem | 4px |
| `p-2` | 0.5rem | 8px |
| `p-3` | 0.75rem | 12px |
| `p-4` | 1rem | 16px |
| `p-5` | 1.25rem | 20px |
| `p-6` | 1.5rem | 24px |
| `p-8` | 2rem | 32px |
| `p-10` | 2.5rem | 40px |
| `p-12` | 3rem | 48px |

### Negative Margin
- `-m-4` - margin: -1rem
- `-mt-8` - margin-top: -2rem

---

## 9. Colors & Dark Mode

### Background Colors
**File:** `src/components/HomePageClient.tsx`

```jsx
<div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
  {/* content */}
</div>
```

**Color Classes:**
- `bg-white` - background-color: white
- `bg-gray-50` - background-color: #F9FAFB
- `bg-gray-900` - background-color: #111827
- `bg-coral-500` - custom coral color
- `bg-beige-100` - custom beige color
- `bg-green-600` - green color

### Text Colors
- `text-gray-900` - text color
- `text-white` - white text
- `text-coral-600` - coral text
- `dark:text-gray-50` - gray-50 in dark mode

### Dark Mode Setup
**File:** `tailwind.config.ts`

```typescript
export default {
  darkMode: 'class',  // Use 'class' strategy
  // ...
}
```

**File:** `src/app/globals.css`

```css
@layer base {
  body {
    @apply text-gray-900 dark:text-gray-50;
  }
  a {
    @apply text-coral-600 hover:text-sky-600 dark:text-coral-400 dark:hover:text-sky-400;
  }
}
```

**How it works:**
1. Add `class="dark"` to HTML element
2. Use `dark:` prefix for dark mode styles
3. Tailwind automatically switches based on `dark` class

### Color Variants
Each color has 10 shades (50-900):

```css
green-50:  #F0FDF4  (lightest)
green-100: #DCFCE7
green-200: #BBF7D0
green-300: #86EFAC
green-400: #4ADE80
green-500: #22C55E  (base)
green-600: #16A34A
green-700: #15803D
green-800: #166534
green-900: #14532D  (darkest)
```

### Custom Colors from Project

**File:** `tailwind.config.ts`

```typescript
colors: {
  coral: {
    50: '#FFF0ED',
    100: '#FFE0D9',
    200: '#FFC9BF',
    300: '#FFAF9F',
    400: '#FF8F7F',
    500: '#FF7060',  // Main coral
    600: '#E65A4B',
    700: '#CC4436',
    800: '#B32E22',
    900: '#99180D',
  },
  beige: { /* custom beige palette */ },
  sky: { /* custom sky palette */ },
  gold: { /* custom gold palette */ },
}
```

**Usage:**
```html
<div class="bg-coral-500 text-coral-600 hover:bg-coral-700">
  Button
</div>
```

---

## 10. Typography

### Font Size
**File:** `src/components/HeroSection.tsx`

```jsx
<h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
  New Muslim Stories
</h1>
<p className="text-lg md:text-xl">
  Inspiring journeys to Islam
</p>
```

**Size Classes:**
- `text-xs` - 0.75rem (12px)
- `text-sm` - 0.875rem (14px)
- `text-base` - 1rem (16px)
- `text-lg` - 1.125rem (18px)
- `text-xl` - 1.25rem (20px)
- `text-2xl` - 1.5rem (24px)
- `text-3xl` - 1.875rem (30px)
- `text-4xl` - 2.25rem (36px)
- `text-6xl` - 3.75rem (60px)
- `text-7xl` - 4.5rem (72px)

### Font Weight
- `font-thin` - font-weight: 100
- `font-light` - font-weight: 300
- `font-normal` - font-weight: 400
- `font-medium` - font-weight: 500
- `font-semibold` - font-weight: 600
- `font-bold` - font-weight: 700
- `font-extrabold` - font-weight: 800

**File:** `src/components/StoryContentDisplay.tsx`

```jsx
<h2 className="text-2xl font-semibold text-green-700 mb-4">
  Life Before Islam
</h2>
```

### Font Family
**File:** `tailwind.config.ts`

```typescript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  heading: ['Montserrat', 'sans-serif'],
}
```

**Usage:**
```html
<p class="font-sans">Inter font</p>
<h1 class="font-heading">Montserrat font</h1>
```

### Text Alignment
- `text-left` - text-align: left
- `text-center` - text-align: center
- `text-right` - text-align: right
- `text-justify` - text-align: justify

### Line Height
- `leading-none` - line-height: 1
- `leading-tight` - line-height: 1.25
- `leading-snug` - line-height: 1.375
- `leading-normal` - line-height: 1.5
- `leading-relaxed` - line-height: 1.625
- `leading-loose` - line-height: 2

**File:** `src/components/WhoAreNewMuslims.tsx`

```jsx
<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
  Description text with relaxed line height
</p>
```

### Text Gradient
**File:** `src/components/HeroSection.tsx`

```jsx
<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-coral-400 to-sky-400">
  Gradient Text
</h1>
```

**Classes:**
- `text-transparent` - text color transparent
- `bg-clip-text` - background-clip: text
- `bg-gradient-to-r from-coral-400 to-sky-400` - gradient background

---

## 11. Borders & Shadows

### Border Radius
**File:** `src/components/StoryCard.tsx`

```jsx
<div className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6">
  Card content
</div>
```

**Radius Classes:**
- `rounded-none` - border-radius: 0
- `rounded-sm` - border-radius: 0.125rem
- `rounded` - border-radius: 0.25rem
- `rounded-md` - border-radius: 0.375rem
- `rounded-lg` - border-radius: 0.5rem
- `rounded-xl` - border-radius: 0.75rem
- `rounded-2xl` - border-radius: 1rem
- `rounded-3xl` - border-radius: 1.5rem
- `rounded-full` - border-radius: 9999px (circle)

### Border Width
- `border` - border-width: 1px
- `border-2` - border-width: 2px
- `border-4` - border-width: 4px
- `border-8` - border-width: 8px
- `border-t` - border-top-width: 1px
- `border-r` - border-right-width: 1px
- `border-b` - border-bottom-width: 1px
- `border-l` - border-left-width: 1px

**File:** `src/components/TopNav.tsx`

```jsx
<nav className="bg-white border-b border-gray-200 dark:border-gray-800">
  {/* content */}
</nav>
```

### Shadows
- `shadow-sm` - box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- `shadow` - box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
- `shadow-md` - box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
- `shadow-lg` - box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
- `shadow-xl` - box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
- `shadow-2xl` - box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)
- `shadow-inner` - box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)
- `shadow-none` - box-shadow: none

---

## 12. Backgrounds

### Solid Backgrounds
```html
<div class="bg-white">White background</div>
<div class="bg-gray-900">Dark gray background</div>
<div class="bg-coral-500">Coral background</div>
```

### Gradients
**File:** `src/components/HeroSection.tsx`

```jsx
<section className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-950">
  {/* content */}
</section>
```

**Gradient Classes:**
- `bg-gradient-to-r` - gradient-to-right
- `bg-gradient-to-l` - gradient-to-left
- `bg-gradient-to-t` - gradient-to-top
- `bg-gradient-to-b` - gradient-to-bottom
- `bg-gradient-to-br` - gradient-to-bottom-right
- `bg-gradient-to-bl` - gradient-to-bottom-left
- `bg-gradient-to-tr` - gradient-to-top-right
- `bg-gradient-to-tl` - gradient-to-top-left

**Usage:**
```html
<!-- Left to right gradient -->
<div class="bg-gradient-to-r from-coral-400 to-sky-400">
  Gradient background
</div>

<!-- With multiple colors -->
<div class="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">
  Rainbow gradient
</div>
```

### Background Opacity
- `bg-white/90` - background with 90% opacity
- `bg-gray-800/75` - 75% opacity
- `bg-black/50` - 50% opacity

**File:** `src/components/TopNav.tsx`

```jsx
<nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
  {/* Semi-transparent background */}
</nav>
```

### Backdrop Blur
- `backdrop-blur-sm` - backdrop-filter: blur(4px)
- `backdrop-blur` - backdrop-filter: blur(8px)
- `backdrop-blur-md` - backdrop-filter: blur(12px)
- `backdrop-blur-lg` - backdrop-filter: blur(16px)
- `backdrop-blur-xl` - backdrop-filter: blur(24px)

---

## 13. Transitions & Animations

### Basic Transitions
**File:** `src/app/globals.css`

```css
@layer base {
  a {
    @apply transition-colors duration-300 ease-in-out;
  }
}
```

**Transition Classes:**
- `transition` - transition-property: all
- `transition-colors` - transition-property: color, background-color, border-color
- `transition-opacity` - transition-property: opacity
- `transition-transform` - transition-property: transform
- `transition-all` - transition-property: all
- `duration-200` - transition-duration: 200ms
- `duration-300` - transition-duration: 300ms
- `duration-500` - transition-duration: 500ms
- `ease-in` - transition-timing-function: cubic-bezier(0.4, 0, 1, 1)
- `ease-out` - transition-timing-function: cubic-bezier(0, 0, 0.2, 1)
- `ease-in-out` - transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)

### Transform
**File:** `src/components/ThemeToggle.tsx`

```jsx
<button className="hover:scale-105 active:scale-95 transition-all duration-200">
  {/* content */}
</button>
```

**Transform Classes:**
- `transform` - transform: var(--tw-transform)
- `scale-0` - transform: scale(0)
- `scale-50` - transform: scale(0.5)
- `scale-75` - transform: scale(0.75)
- `scale-100` - transform: scale(1)
- `scale-105` - transform: scale(1.05)
- `scale-110` - transform: scale(1.1)
- `hover:scale-105` - scale on hover
- `active:scale-95` - scale when clicked

### Rotation
- `rotate-0` - transform: rotate(0deg)
- `rotate-45` - transform: rotate(45deg)
- `rotate-90` - transform: rotate(90deg)
- `rotate-180` - transform: rotate(180deg)
- `-rotate-45` - negative rotation

**File:** `src/components/ThemeToggle.tsx`

```jsx
<svg className={`w-5 h-5 text-yellow-500 transition-all duration-200 ${
  theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
}`}>
  {/* icon */}
</svg>
```

### Custom Animations
**File:** `src/app/globals.css`

```css
/* Styles for section entrance animations */
.section-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.section-animate.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Usage:**
```html
<div class="section-animate">
  Content animates in when .is-visible class is added
</div>
```

---

## 14. Hover States & Interactive Elements

### Hover
**File:** `src/components/StoryCard.tsx`

```jsx
<div className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
  Card content
</div>
```

**Hover Classes:**
- `hover:bg-red-500` - background red on hover
- `hover:text-white` - white text on hover
- `hover:shadow-lg` - shadow on hover
- `hover:-translate-y-1` - move up on hover
- `hover:scale-105` - scale on hover

### Focus States
- `focus:outline-none` - remove outline
- `focus:ring-2` - ring on focus
- `focus:ring-blue-500` - blue ring on focus
- `focus:border-blue-500` - blue border on focus

### Active States
- `active:bg-blue-700` - darker background when clicked
- `active:scale-95` - scale down when clicked

### Disabled States
- `disabled:opacity-50` - 50% opacity when disabled
- `disabled:cursor-not-allowed` - not-allowed cursor

---

## 15. Responsive Design

### Mobile-First Approach
Tailwind is mobile-first by default. Classes without prefixes apply to all screen sizes.

**File:** `src/components/HeroSection.tsx`

```jsx
<section className="py-20 md:py-32 lg:py-40">
  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
    Responsive Heading
  </h1>
</section>
```

**Breakpoints:**
- No prefix = applies to all screens
- `sm:` = 640px and up
- `md:` = 768px and up
- `lg:` = 1024px and up
- `xl:` = 1280px and up
- `2xl:` = 1536px and up

### Example: Responsive Grid
**File:** `src/components/FeaturedStories.tsx`

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* 1 column on mobile, 2 on md, 3 on lg */}
</div>
```

### Example: Responsive Padding
```html
<!-- Mobile: py-8, Tablet: py-12, Desktop: py-16 -->
<div className="py-8 md:py-12 lg:py-16">
  Content
</div>
```

### Example: Responsive Text
```html
<!-- Mobile: text-lg, Tablet: text-xl, Desktop: text-2xl -->
<p class="text-lg md:text-xl lg:text-2xl">
  Responsive text
</p>
```

### Example: Responsive Flex
```html
<!-- Mobile: column, Desktop: row -->
<div class="flex flex-col md:flex-row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## 16. Custom Colors & Design System

### Project Color Palette
**File:** `tailwind.config.ts`

```typescript
colors: {
  coral: {
    50: '#FFF0ED',
    100: '#FFE0D9',
    200: '#FFC9BF',
    300: '#FFAF9F',
    400: '#FF8F7F',
    500: '#FF7060',  // Main brand color
    600: '#E65A4B',
    700: '#CC4436',
    800: '#B32E22',
    900: '#99180D',
  },
  beige: {
    50: '#FDFBF8',
    100: '#F8F5EF',
    200: '#F0EADF',
    // ... more shades
  },
  sky: { /* blue color palette */ },
  gold: { /* yellow color palette */ },
  green: { /* green color palette */ },
  gray: { /* neutral gray palette */ },
}
```

**Usage in Components:**
```html
<!-- Primary color (coral) -->
<button class="bg-coral-500 hover:bg-coral-600">
  Primary Button
</button>

<!-- Secondary color (sky) -->
<button class="bg-sky-500 hover:bg-sky-600">
  Secondary Button
</button>

<!-- Neutral (gray) -->
<div class="bg-gray-50 dark:bg-gray-900">
  Container
</div>
```

### Custom Color System Benefits
- ✅ Consistent brand colors across the app
- ✅ Easy to update entire design system
- ✅ Dark mode support built-in
- ✅ All shades available (50-900)

---

## 17. Best Practices

### 1. Keep Classes Organized
**File:** `src/components/ThemeToggle.tsx`

```jsx
<button
  onClick={toggleTheme}
  className="
    group
    relative
    inline-flex
    items-center
    justify-center
    w-10
    h-10
    rounded-lg
    bg-white
    dark:bg-gray-800
    shadow-md
    border
    border-gray-200
    dark:border-gray-700
    hover:shadow-lg
    transition-all
    duration-200
    ease-in-out
    hover:scale-105
    active:scale-95
  "
  aria-label="Toggle theme"
>
```

**Best Practice:** Order classes logically:
1. Display & Layout
2. Positioning
3. Flexbox/Grid
4. Sizing
5. Typography
6. Colors
7. Borders
8. Backgrounds
9. Transitions

### 2. Use Responsive Prefixes
```html
<!-- Good: Mobile-first approach -->
<div class="flex flex-col md:flex-row gap-4">

<!-- Avoid: Desktop-first approach -->
<div class="md:flex flex-col lg:flex-row gap-4">
```

### 3. Extract to Components
If you use the same classes multiple times, create a component.

**File:** `src/components/ui/Section.tsx`

```typescript
interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`container mx-auto px-4 ${className || ''}`}
    >
      {children}
    </section>
  );
}
```

### 4. Use Dark Mode Systematically
**File:** `src/app/globals.css`

```css
@layer base {
  body {
    @apply text-gray-900 dark:text-gray-50;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading font-bold;
  }
  a {
    @apply text-coral-600 hover:text-sky-600 dark:text-coral-400 dark:hover:text-sky-400;
  }
}
```

**Benefits:**
- Automatic dark mode for all elements
- Consistent color system
- Less code in components

### 5. Combine Classes Wisely
```html
<!-- Good: Related classes grouped -->
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">

<!-- Avoid: Scattered classes -->
<div class="bg-white p-4 items-center rounded shadow flex justify-between">
```

### 6. Use Transitions for Interactivity
```html
<!-- Good: Smooth hover transition -->
<button class="bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
  Click me
</button>

<!-- Bad: Instant change -->
<button class="bg-blue-500 hover:bg-blue-600">
  Click me
</button>
```

---

## 18. Common Patterns

### Pattern 1: Card Component
**File:** `src/components/StoryCard.tsx`

```jsx
<div className="
  bg-beige-100
  dark:bg-gray-800
  rounded-xl
  shadow-lg
  p-6
  text-center
  hover:shadow-xl
  hover:-translate-y-1
  transition-all
  duration-300
  ease-in-out
">
  <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">
    {story.title}
  </h3>
  <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">
    {story.content}
  </p>
</div>
```

**Pattern Breakdown:**
1. Container: background, padding, border-radius, shadow
2. Hover states: lift up, increase shadow
3. Typography: font family, size, color
4. Spacing: margins, padding

### Pattern 2: Button Variants
```html
<!-- Primary Button -->
<button class="
  bg-coral-500
  hover:bg-coral-600
  text-white
  font-semibold
  py-3
  px-8
  rounded-lg
  shadow-lg
  transition-all
  duration-300
  ease-in-out
  transform
  hover:scale-105
">
  Primary
</button>

<!-- Secondary Button -->
<button class="
  bg-transparent
  border-2
  border-coral-500
  text-coral-500
  hover:bg-coral-500
  hover:text-white
  font-semibold
  py-3
  px-8
  rounded-lg
  transition-all
  duration-300
">
  Secondary
</button>
```

### Pattern 3: Navigation Bar
**File:** `src/components/TopNav.tsx`

```jsx
<nav className="
  sticky
  top-0
  z-50
  bg-white/90
  dark:bg-gray-900/90
  backdrop-blur-sm
  border-b
  border-gray-200
  dark:border-gray-800
  shadow-sm
">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        <NavLinks />
        <ThemeToggle />
      </div>
    </div>
  </div>
</nav>
```

### Pattern 4: Hero Section
**File:** `src/components/HeroSection.tsx`

```jsx
<section className="
  w-full
  py-20
  md:py-32
  lg:py-40
  bg-gradient-to-br
  from-gray-100
  to-gray-200
  dark:from-gray-800
  dark:to-gray-950
  text-gray-900
  dark:text-white
  transition-colors
  duration-300
">
  <div className="container mx-auto px-4 md:px-6 text-center">
    <h1 className="
      text-3xl
      sm:text-4xl
      md:text-6xl
      lg:text-7xl
      font-heading
      font-bold
      mb-6
      text-transparent
      bg-clip-text
      bg-gradient-to-r
      from-coral-400
      to-sky-400
    ">
      {t('headline')}
    </h1>
    <p className="
      max-w-3xl
      mx-auto
      text-lg
      md:text-xl
      text-gray-700
      dark:text-gray-300
      mb-10
      font-sans
    ">
      {t('subheadline')}
    </p>
    <a href="#stories" className="
      bg-coral-500
      hover:bg-coral-600
      dark:bg-coral-600
      dark:hover:bg-coral-700
      text-white
      font-semibold
      py-3
      px-8
      rounded-lg
      shadow-lg
      transition
      duration-300
      ease-in-out
      transform
      hover:scale-105
      text-lg
    ">
      {t('exploreStories')}
    </a>
  </div>
</section>
```

### Pattern 5: Language Switcher
**File:** `src/components/LanguageSwitcher.tsx`

```jsx
<div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-1">
  {languages.map((lang) => (
    <button
      key={lang.code}
      onClick={() => switchLocale(lang.code)}
      disabled={locale === lang.code}
      className={`
        relative
        px-4
        py-2
        rounded-md
        text-sm
        font-medium
        transition-all
        duration-200
        ease-in-out
        flex
        items-center
        gap-2
        min-w-[100px]
        justify-center
        ${locale === lang.code
          ? 'bg-green-600 text-white shadow-sm'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }
        ${locale === lang.code ? 'cursor-default' : 'cursor-pointer'}
        disabled:cursor-default
      `}
    >
      <span className="text-base">{lang.flag}</span>
      <span className="font-sans">{lang.name}</span>
      {locale === lang.code && (
        <div className="absolute inset-0 rounded-md ring-2 ring-green-600 ring-opacity-50" />
      )}
    </button>
  ))}
</div>
```

---

## Quick Reference

### Common Class Combinations
```html
<!-- Button -->
<button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">

<!-- Card -->
<div class="bg-white rounded-lg shadow-md p-6">

<!-- Container -->
<div class="container mx-auto px-4">

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Flex -->
<div class="flex items-center justify-between">

<!-- Navigation -->
<nav class="sticky top-0 z-50 bg-white border-b">

<!-- Hero -->
<section class="w-full py-20 bg-gradient-to-br from-gray-100 to-gray-200">
```

### Responsive Shorthands
```html
<!-- Margin -->
m-4        <!-- all sides -->
mx-auto    <!-- horizontal center -->
my-6       <!-- vertical -->
mt-8       <!-- top -->
mr-2       <!-- right -->
mb-4       <!-- bottom -->
ml-2       <!-- left -->

<!-- Padding -->
p-4        <!-- all sides -->
px-6       <!-- horizontal -->
py-3       <!-- vertical -->
pt-4       <!-- top -->
pr-6       <!-- right -->
pb-8       <!-- bottom -->
pl-2       <!-- left -->

<!-- Text -->
text-sm    <!-- small -->
text-base  <!-- base -->
text-lg    <!-- large -->
text-xl    <!-- extra large -->
text-2xl   <!-- 2x large -->

<!-- Font Weight -->
font-light     <!-- 300 -->
font-normal    <!-- 400 -->
font-medium    <!-- 500 -->
font-semibold  <!-- 600 -->
font-bold      <!-- 700 -->

<!-- Spacing -->
space-y-4   <!-- gap between children -->
gap-6       <!-- grid/flex gap -->
```

### Color Naming Convention
```html
<!-- Text -->
text-gray-900     <!-- text color -->
text-blue-500     <!-- blue text -->

<!-- Background -->
bg-white          <!-- white background -->
bg-blue-500       <!-- blue background -->

<!-- Border -->
border-gray-200   <!-- gray border -->
border-blue-500   <!-- blue border -->

<!-- Dark Mode -->
dark:bg-gray-900       <!-- dark background -->
dark:text-white        <!-- dark text -->
dark:border-gray-800   <!-- dark border -->

<!-- Hover -->
hover:bg-blue-600      <!-- hover background -->
hover:text-white       <!-- hover text -->
```

---

## Best Practices Summary

### ✅ Do's
1. **Use mobile-first approach** - Start with mobile, add `md:` for larger screens
2. **Keep classes organized** - Group related classes together
3. **Use transitions for interactivity** - Add `transition` for smooth hover effects
4. **Be consistent with spacing** - Use Tailwind's spacing scale (4, 8, 12, 16, 24, 32...)
5. **Create component abstractions** - Extract repeated class combinations
6. **Use dark mode systematically** - Set up in globals.css
7. **Leverage the color system** - Use your custom colors consistently
8. **Use responsive prefixes** - `sm:`, `md:`, `lg:`, `xl:`
9. **Combine related utilities** - `transition-all duration-200`
10. **Use semantic HTML** - Don't replace HTML semantics with classes

### ❌ Don'ts
1. **Don't write custom CSS** - Use Tailwind utilities instead
2. **Don't use arbitrary values** - Stick to Tailwind's scale
3. **Don't forget responsive prefixes** - Ensure mobile looks good
4. **Don't use inline styles** - Everything in Tailwind classes
5. **Don't over-nest HTML** - Keep HTML structure simple
6. **Don't duplicate classes** - Extract to components
7. **Don't ignore dark mode** - Test both light and dark themes
8. **Don't use too many classes** - Sometimes a component is better
9. **Don't forget about accessibility** - Use proper semantic HTML
10. **Don't skip the documentation** - Tailwind docs are excellent

---

## Conclusion

This tutorial covered the essential Tailwind CSS concepts using real examples from the New Muslim Stories project:

### Key Takeaways:
1. **Utility-First** - Build designs with utility classes
2. **Mobile-First** - Responsive design built-in
3. **Dark Mode** - Easy theming support
4. **Custom Configuration** - Tailor to your project
5. **Performance** - Only include used styles
6. **Rapid Development** - No custom CSS needed
7. **Consistency** - Enforced design system

### Next Steps:
1. **Practice** - Build components using these patterns
2. **Experiment** - Try different color combinations
3. **Read Docs** - [Tailwind CSS Documentation](https://tailwindcss.com/docs)
4. **Build Something** - Create a small project with Tailwind
5. **Explore Components** - Look at component libraries built on Tailwind

### Resources:
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS UI Components](https://ui.shadcn.com/)
- [Tailwind CSS Cheat Sheet](https://tailwindcomponents.com/cheatsheet)
- [Tailwind Play](https://play.tailwindcss.com/) - Interactive playground

Happy styling! 🎨
