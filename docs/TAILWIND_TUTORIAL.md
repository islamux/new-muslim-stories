# Complete Tailwind CSS Tutorial

## Table of Contents
1. [Introduction to Tailwind CSS](#introduction-to-tailwind-css)
2. [Layout & Spacing](#layout--spacing)
3. [Typography](#typography)
4. [Colors & Dark Mode](#colors--dark-mode)
5. [Responsive Design](#responsive-design)
6. [Flexbox Layout](#flexbox-layout)
7. [Grid Layout](#grid-layout)
8. [Borders & Shadows](#borders--shadows)
9. [Transitions & Animations](#transitions--animations)
10. [Interactive States](#interactive-states)
11. [Advanced Concepts](#advanced-concepts)
12. [Custom Configuration](#custom-configuration)
13. [Best Practices](#best-practices)

---

## Introduction to Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML. Instead of writing custom CSS, you combine utility classes directly in your JSX/HTML.

### Why Use Tailwind?
- **Rapid Development**: Build UIs quickly without writing custom CSS
- **Consistency**: Design system enforced through utilities
- **Maintainability**: Styles are co-located with components
- **Small Bundle Size**: Only include classes you use
- **Easy Customization**: Configure everything in `tailwind.config.js`

### Key Concepts
- **Utility Classes**: Single-purpose classes like `text-center`, `bg-blue-500`
- **Responsive Prefixes**: `sm:`, `md:`, `lg:` for different screen sizes
- **State Variants**: `hover:`, `focus:`, `active:` for interactive states
- **Dark Mode**: `dark:` prefix for dark theme variants

---

## Layout & Spacing

### Width & Height
```html
<!-- Full width -->
<div className="w-full">Takes 100% width</div>

<!-- Fixed height -->
<div className="h-16">64px height</div>

<!-- Height based on viewport -->
<div className="h-screen">100vh (full screen height)</div>
```

**From the project:**
```tsx
// src/components/TopNav.tsx:10
<div className="flex items-center justify-between h-16">
  {/* Navigation items */}
</div>

// src/components/ThemeToggle.tsx:64
<button className="w-10 h-10 rounded-lg">
  {/* Toggle button */}
</button>
```

### Margin & Padding
```html
<!-- Padding (inside) -->
<div className="p-4">Padding 16px on all sides</div>
<div className="px-6 py-8">Padding 24px horizontal, 32px vertical</div>

<!-- Margin (outside) -->
<div className="m-4">Margin 16px on all sides</div>
<div className="mt-6 mb-4">Margin 24px top, 16px bottom</div>
<div className="mx-auto">Center horizontally</div>
```

**From the project:**
```tsx
// src/components/HeroSection.tsx:10
<section className="w-full py-20 md:py-32 lg:py-40">
  <div className="container mx-auto px-4 md:px-6">
    {/* Content with responsive padding */}
  </div>
</section>

// src/components/StoryCard.tsx:13
<div className="rounded-xl shadow-lg p-6">
  {/* Card content with padding */}
</div>
```

### Container
```html
<!-- Centered container with max-width -->
<div className="container mx-auto px-4">
  <!-- Automatically centers and adds responsive padding -->
</div>
```

**From the project:**
```tsx
// src/components/Header.tsx:10
<div className="container mx-auto px-4 text-center">
  {/* Centered content with padding */}
</div>
```

---

## Typography

### Font Size
```html
<div className="text-sm">Small text (14px)</div>
<div className="text-lg">Large text (18px)</div>
<div className="text-2xl">Extra large (24px)</div>
<div className="text-3xl">Even larger (30px)</div>
```

**From the project:**
```tsx
// src/components/HeroSection.tsx:12
<h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
  Hero Headline
</h1>

// src/components/StoryContentDisplay.tsx:17
<h2 className="text-2xl font-semibold text-green-700 mb-4">{title}</h2>
```

### Font Weight
```html
<div className="font-light">Light (300)</div>
<div className="font-normal">Normal (400)</div>
<div className="font-semibold">Semibold (600)</div>
<div className="font-bold">Bold (700)</div>
```

**From the project:**
```tsx
// src/components/HeroSection.tsx:12
<h1 className="font-heading font-bold mb-6">Title</h1>

// src/components/LanguageSwitcher.tsx:29
<button className="text-sm font-medium">
  Language Button
</button>
```

### Font Family
Configure custom fonts in `tailwind.config.ts`:
```typescript
// tailwind.config.ts:95-98
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  heading: ['Montserrat', 'sans-serif'],
}
```

Use in components:
```tsx
// src/components/HeroSection.tsx:15
<p className="font-sans text-lg">Inter font text</p>

// src/components/StoryCard.tsx:15
<h3 className="font-heading text-xl">Montserrat heading</h3>
```

### Text Alignment & Decoration
```html
<div className="text-left">Left aligned</div>
<div className="text-center">Center aligned</div>
<div className="text-right">Right aligned</div>
<div className="hover:underline">Underline on hover</div>
```

**From the project:**
```tsx
// src/components/FeaturedStories.tsx:14
<h2 className="text-2xl font-semibold text-center mb-6">
  Centered Heading
</h2>
```

---

## Colors & Dark Mode

### Standard Colors
Tailwind provides a color scale (50-900) for each color:
```html
<div className="text-gray-500">Gray 500</div>
<div className="text-gray-700">Gray 700 (darker)</div>
<div className="bg-white">White background</div>
<div className="bg-gray-100">Light gray background</div>
```

**From the project:**
```tsx
// src/components/Footer.tsx:11
<p className="text-sm text-gray-400 dark:text-gray-500">
  Copyright text
</p>

// src/components/StoryCard.tsx:18
<p className="text-gray-700 dark:text-gray-300 mb-4">
  Card description
</p>
```

### Custom Colors
The project defines custom color palettes in `tailwind.config.ts`:

```typescript
// tailwind.config.ts:12-93
colors: {
  green: { /* 50-950 scale */ },
  beige: { /* 50-950 scale */ },
  gold: { /* 50-950 scale */ },
  sky: { /* 50-950 scale */ },
  coral: { /* 50-950 scale */ },
  gray: { /* includes custom gray-850 */ }
}
```

Use custom colors:
```tsx
// src/components/HeroSection.tsx:20
<a className="bg-coral-500 hover:bg-coral-600">
  CTA Button
</a>

// src/components/WhoAreNewMuslims.tsx:13
<Section className="bg-beige-100 dark:bg-gray-800">
  {/* Content */}
</Section>
```

### Dark Mode
Enable with `darkMode: 'class'` in config. Use `dark:` prefix:

```tsx
// src/components/Header.tsx:9-12
<section className="bg-gray-100 dark:bg-gray-850 py-8">
  <h2 className="text-gray-900 dark:text-gray-100">
    Title
  </h2>
</section>
```

**Common dark mode patterns:**
```html
<!-- Background -->
<div className="bg-white dark:bg-gray-800">...</div>

<!-- Text -->
<div className="text-gray-900 dark:text-white">...</div>

<!-- Border -->
<div className="border-gray-200 dark:border-gray-700">...</div>
```

---

## Responsive Design

### Breakpoint Prefixes
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### Responsive Typography
```tsx
// src/components/HeroSection.tsx:12
<h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
  Responsive Headline
</h1>
```

### Responsive Spacing
```tsx
// src/components/WhoAreNewMuslims.tsx:13
<Section className="p-6 sm:p-8 md:p-12">
  Responsive padding
</Section>
```

### Responsive Layout
```tsx
// src/components/FeaturedStories.tsx:17
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* 1 column on mobile, 2 on md, 3 on lg */}
</div>
```

---

## Flexbox Layout

### Basic Flex Container
```tsx
// src/components/TopNav.tsx:10
<div className="flex items-center justify-between h-16">
  <div>Left side</div>
  <div>Right side</div>
</div>
```

**Common flex patterns:**
- `flex` - Enable flexbox
- `items-center` - Center items vertically
- `items-start` - Align items to top
- `items-end` - Align items to bottom
- `justify-between` - Space between items
- `justify-center` - Center items horizontally
- `justify-start` - Align to start
- `justify-end` - Align to end

### Inline Flex
```tsx
// src/components/LanguageSwitcher.tsx:22
<div className="inline-flex items-center">
  {/* Buttons in a row */}
</div>
```

### Flex Direction
```html
<div className="flex flex-col">Column layout</div>
<div className="flex flex-row">Row layout (default)</div>
```

### Flex Item Spacing
```tsx
// src/components/LanguageSwitcher.tsx:29-30
<div className="flex items-center gap-2 min-w-[100px] justify-center">
  <span className="text-base">{lang.flag}</span>
  <span className="font-sans">{lang.name}</span>
</div>
```

---

## Grid Layout

### Basic Grid
```tsx
// src/components/FeaturedStories.tsx:17
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {stories.map((story) => <StoryCard key={story.slug} story={story} />)}
</div>
```

**Grid utilities:**
- `grid` - Enable CSS Grid
- `grid-cols-1` - 1 column by default
- `md:grid-cols-2` - 2 columns on medium screens
- `lg:grid-cols-3` - 3 columns on large screens
- `gap-8` - 32px gap between grid items
- `gap-4`, `gap-6`, `gap-12` - Other gap sizes

### Grid Auto-flow
```html
<div className="grid grid-cols-3 gap-4">
  <!-- Auto places items -->
</div>
```

---

## Borders & Shadows

### Border Radius
```html
<div className="rounded">Small radius (4px)</div>
<div className="rounded-md">Medium radius (6px)</div>
<div className="rounded-lg">Large radius (8px)</div>
<div className="rounded-xl">Extra large (12px)</div>
<div className="rounded-full">Circle / pill</div>
```

**From the project:**
```tsx
// src/components/StoryCard.tsx:13
<div className="rounded-xl shadow-lg p-6">

// src/components/ProfileHeader.tsx:18
<Image className="rounded-full mr-4 object-cover" />
```

### Borders
```html
<div className="border">1px border on all sides</div>
<div className="border-t">Top border only</div>
<div className="border-b-2">Bottom border 2px</div>
<div className="border-gray-200">Gray border</div>
<div className="dark:border-gray-700">Dark mode border</div>
```

**From the project:**
```tsx
// src/components/LanguageSwitcher.tsx:22
<div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-1">
```

### Shadows
```html
<div className="shadow-sm">Small shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-xl">Extra large shadow</div>
```

**From the project:**
```tsx
// src/components/StoryCard.tsx:13
<div className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1">

// src/components/ThemeToggle.tsx:64
<button className="shadow-md border hover:shadow-lg">
```

---

## Transitions & Animations

### Transition Classes
```html
<div className="transition">Default transition</div>
<div className="transition-colors">Transition colors</div>
<div className="transition-all">Transition all properties</div>
<div className="duration-300">300ms duration</div>
<div className="duration-200">200ms duration</div>
<div className="ease-in-out">Ease in-out timing</div>
<div className="ease-in">Ease in timing</div>
<div className="ease-out">Ease out timing</div>
```

**From the project:**
```tsx
// src/components/HeroSection.tsx:20
<a className="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">

// src/components/StoryCard.tsx:13
<div className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
```

### Transform
```html
<div className="transform">Enable transform</div>
<div className="hover:scale-105">Scale on hover</div>
<div className="hover:-translate-y-1">Move up on hover</div>
<div className="active:scale-95">Scale down when active</div>
```

**Examples:**
```tsx
// src/components/ThemeToggle.tsx:64
<button className="hover:scale-105 active:scale-95">
  {/* Button scales on interaction */}
</button>
```

### Opacity & Visibility
```html
<div className="opacity-0">Invisible</div>
<div className="opacity-100">Fully visible</div>
<div className="opacity-50">Half transparent</div>
```

**From the project:**
```tsx
// src/components/ThemeToggle.tsx:12-14
<svg className={`w-5 h-5 text-yellow-500 transition-all duration-200 ${
  theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
}`}>
```

### Rotation
```html
<div className="rotate-0">No rotation</div>
<div className="rotate-90">90 degrees</div>
<div className="-rotate-90">-90 degrees</div>
```

**Example:**
```tsx
// src/components/ThemeToggle.tsx:32
<svg className={`absolute w-5 h-5 ${
  theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
}`}>
```

---

## Interactive States

### Hover States
```html
<div className="hover:bg-blue-600">Background on hover</div>
<div className="hover:text-white">Text color on hover</div>
<div className="hover:shadow-lg">Shadow on hover</div>
<div className="hover:underline">Underline on hover</div>
```

**From the project:**
```tsx
// src/components/StoryCard.tsx:23
<Link className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline">
  {commonT('learnMore')}
</Link>
```

### Focus States
```html
<button className="focus:ring-2 focus:ring-blue-500">
  Button with focus ring
</button>
```

### Active States
```html
<button className="active:bg-blue-700 active:scale-95">
  Button
</button>
```

**From the project:**
```tsx
// src/components/ThemeToggle.tsx:64
<button className="active:scale-95">
```

### Disabled States
```html
<button className="disabled:opacity-50 disabled:cursor-not-allowed" disabled>
  Disabled button
</button>
```

**From the project:**
```tsx
// src/components/LanguageSwitcher.tsx:27-36
<button
  disabled={locale === lang.code}
  className={`
    ${locale === lang.code ? 'cursor-default' : 'cursor-pointer'}
    disabled:cursor-default
  `}
>
```

### Conditional Classes
Use template literals for conditional styling:

```tsx
// src/components/LanguageSwitcher.tsx:28-37
className={`
  relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
  flex items-center gap-2 min-w-[100px] justify-center
  ${locale === lang.code
    ? 'bg-green-600 text-white shadow-sm'
    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
  }
  ${locale === lang.code ? 'cursor-default' : 'cursor-pointer'}
  disabled:cursor-default
`}
```

---

## Advanced Concepts

### Positioning
```html
<div className="relative">Relative positioning</div>
<div className="absolute">Absolute positioning</div>
<div className="fixed">Fixed positioning</div>
<div className="sticky">Sticky positioning</div>
<div className="top-0">Distance from top</div>
<div className="right-0">Distance from right</div>
<div className="bottom-0">Distance from bottom</div>
<div className="left-0">Distance from left</div>
<div className="z-50">Z-index 50</div>
```

**From the project:**
```tsx
// src/components/TopNav.tsx:8
<nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">

// src/components/ThemeToggle.tsx:31
<svg className="absolute w-5 h-5 text-blue-400">
```

### Z-Index
```html
<div className="z-0">z-index: 0</div>
<div className="z-10">z-index: 10</div>
<div className="z-50">z-index: 50</div>
```

### Backdrop Blur
```html
<div className="backdrop-blur-sm">Small blur</div>
<div className="backdrop-blur-md">Medium blur</div>
<div className="backdrop-blur-lg">Large blur</div>
```

**From the project:**
```tsx
// src/components/TopNav.tsx:8
<nav className="backdrop-blur-sm">
  {/* Sticky navigation with blur */}
</nav>
```

### Ring Effect
```html
<div className="ring-2 ring-blue-500">Ring with 2px width</div>
<div className="ring-4 ring-opacity-50">Ring with opacity</div>
```

**From the project:**
```tsx
// src/components/LanguageSwitcher.tsx:42
<div className="absolute inset-0 rounded-md ring-2 ring-green-600 ring-opacity-50" />
```

### Object Fit
```html
<div className="object-cover">Cover the container</div>
<div className="object-contain">Contain within container</div>
```

**From the project:**
```tsx
// src/components/ProfileHeader.tsx:18
<Image className="rounded-full mr-4 object-cover" />
```

### Gradient Text
```html
<div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
  Gradient text
</div>
```

**From the project:**
```tsx
// src/components/HeroSection.tsx:12
<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-coral-400 to-sky-400">
  {t('headline')}
</h1>
```

### Background Gradients
```html
<div className="bg-gradient-to-r from-blue-500 to-purple-600">Horizontal gradient</div>
<div className="bg-gradient-to-br from-red-400 to-yellow-500">Diagonal gradient</div>
```

**From the project:**
```tsx
// src/components/HeroSection.tsx:10
<section className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-950">
```

### CSS Variables
```html
<div className="bg-[var(--background)]">Using CSS variable</div>
```

**From the project config:**
```typescript
// tailwind.config.ts:13-14
colors: {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
}
```

---

## Custom Configuration

### tailwind.config.ts Overview
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Files to scan
  theme: {
    extend: {
      colors: { /* Custom color palette */ },
      fontFamily: { /* Custom fonts */ },
      spacing: { /* Custom spacing scale */ },
      // ... more customizations
    },
  },
  plugins: [],
} satisfies Config;
```

### Custom Colors in Project
```typescript
// Complete color palettes
green: { 50: '#F0FDF4', ..., 950: '#0F3D22' },
beige: { 50: '#FDFBF8', ..., 950: '#584018' },
gold: { 50: '#FFFBEB', ..., 950: '#451A03' },
sky: { 50: '#F0F9FF', ..., 950: '#082F49' },
coral: { 50: '#FFF0ED', ..., 950: '#800200' },
gray: { 50: '#F9FAFB', ..., 950: '#030712', 850: '#18212F' }, // Custom gray-850
```

### Custom Fonts
```typescript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  heading: ['Montserrat', 'sans-serif'],
}
```

---

## Best Practices

### 1. Combine Related Classes
❌ **Bad:**
```html
<div className="text-center"></div>
<div className="mt-4"></div>
```

✅ **Good:**
```html
<div className="text-center mt-4"></div>
```

### 2. Use Component Composition
**From the project - Button component:**
```tsx
// src/components/Button.tsx
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

**Usage:**
```tsx
// src/components/StoryContentDisplay.tsx:40-45
<Button
  onClick={() => router.back()}
  className="bg-green-700 text-white hover:bg-green-800 transition-colors"
>
  {t('return')}
</Button>
```

### 3. Organize Classes Logically
```tsx
// Recommended order
className={`
  /* Layout */
  flex items-center justify-between

  /* Spacing */
  p-4 m-2

  /* Typography */
  text-lg font-semibold

  /* Colors */
  bg-white text-gray-900

  /* Effects */
  shadow-lg rounded-lg

  /* States */
  hover:shadow-xl
`}
```

### 4. Use Responsive Prefixes Correctly
```tsx
// Mobile-first approach
className="text-sm md:text-base lg:text-lg"
```

### 5. Leverage Dark Mode
```tsx
// Always provide both variants
className="text-gray-900 dark:text-white"
className="bg-white dark:bg-gray-800"
className="border-gray-200 dark:border-gray-700"
```

### 6. Extract Repeated Patterns
**From the project - Section wrapper:**
```tsx
// src/components/ui/Section.tsx
const Section: React.FC<SectionProps> = ({ id, className, children }) => {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
};

// Usage
<Section className="my-12 bg-beige-100 dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-lg shadow-md">
  {/* Content */}
</Section>
```

### 7. Use Custom Fonts Consistently
```tsx
// Headings use font-heading
<h1 className="font-heading text-3xl">Heading</h1>

// Body text uses font-sans
<p className="font-sans text-lg">Body text</p>
```

### 8. Accessibility with Tailwind
```tsx
// Provide aria-labels
<button
  onClick={toggleTheme}
  className="..."
  aria-label="Toggle theme"
>
  {/* Icon */}
</button>
```

### 9. Performance Tips
- Only use what you need - don't add unnecessary classes
- Use `@apply` in custom CSS for repeated utilities
- Purge unused styles in production (handled automatically)

### 10. RTL Support
```tsx
// src/app/[locale]/layout.tsx
<div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  {/* Content */}
</div>
```

---

## Quick Reference

### Spacing
- `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, `p-6` = 24px, `p-8` = 32px
- `m-1` = 4px, `m-2` = 8px, `m-4` = 16px, `m-6` = 24px, `m-8` = 32px
- `gap-4` = 16px gap, `gap-6` = 24px gap, `gap-8` = 32px gap

### Font Sizes
- `text-sm` = 14px, `text-base` = 16px, `text-lg` = 18px, `text-xl` = 20px
- `text-2xl` = 24px, `text-3xl` = 30px, `text-4xl` = 36px

### Shadows
- `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`

### Breakpoints
- Default: 0px+
- `sm:` = 640px+
- `md:` = 768px+
- `lg:` = 1024px+
- `xl:` = 1280px+

### Flexbox
- `flex`, `inline-flex`
- `items-center`, `items-start`, `items-end`
- `justify-center`, `justify-between`, `justify-start`, `justify-end`
- `flex-col`, `flex-row`

### Grid
- `grid`, `grid-cols-1` to `grid-cols-12`
- `gap-4`, `gap-6`, `gap-8`

---

## Conclusion

Tailwind CSS allows rapid development of beautiful, responsive interfaces. This project demonstrates:

✅ **Dark mode support** with `dark:` prefix
✅ **Custom color palette** (coral, beige, gold, sky, green, gray)
✅ **Responsive design** with `sm:`, `md:`, `lg:` prefixes
✅ **Interactive states** with `hover:`, `active:`, `focus:`
✅ **Custom fonts** (Inter, Montserrat)
✅ **Transitions & animations** for smooth UX
✅ **Component composition** with reusable patterns

### Key Takeaways:
1. Start with utility classes, build up complexity
2. Use dark mode variants for theme support
3. Make everything responsive with mobile-first approach
4. Extract components to avoid repetition
5. Follow consistent patterns (font-heading for headings, etc.)

For more information, visit [tailwindcss.com](https://tailwindcss.com)

---

**Project Context**: This tutorial covers Tailwind concepts used in the New Muslim Stories project - a multilingual (English/Arabic) Next.js application showcasing conversion stories with dark mode, custom themes, and responsive design.

**Files Referenced**:
- `tailwind.config.ts` - Custom configuration
- `src/components/*.tsx` - Component examples
- Responsive, dark mode, and custom font implementations

