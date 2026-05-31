# Bug Fix: Dark Theme Background Color Issue

## Issue Description

In the Arabic story page (`/ar/stories/hamza-story`), the background color is hardcoded to white (`bg-white`), which causes visibility issues in dark theme mode. When users switch to dark mode, the story content remains on a white background instead of adapting to the dark theme.

## Problem Location

**File**: `src/app/[locale]/stories/[slug]/page.tsx` (line 18)
**Component**: `StoryContentDisplay`

The story page renders `StoryContentDisplay` component which contains hardcoded Tailwind class `bg-white` for the article background.

## Affected URLs
- `/ar/stories/hamza-story` (Arabic stories)
- `/en/stories/{any-story}` (English stories)
- All individual story pages

## Solution

### Option 1: Update StoryContentDisplay Component (Recommended)

Modify `src/components/StoryContentDisplay.tsx` to use theme-aware background classes:

**Current**:
```tsx
<article className="bg-white rounded-lg shadow-md p-8">
```

**Fixed**:
```tsx
<article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
```

This change will:
- Use `bg-white` in light mode (default)
- Use `dark:bg-gray-800` in dark mode
- Maintain consistency with the rest of the application
- Ensure proper contrast for both themes

### Option 2: Update All Tailwind CSS Classes

Ensure all components that might have theme issues are using dark mode classes. Check:

1. **StoryContentDisplay.tsx** - Article background
2. **FeaturedStories.tsx** - Card backgrounds
3. **HeroSection.tsx** - Section backgrounds
4. **Header.tsx** - Navigation background
5. **Footer.tsx** - Footer background

## Testing Steps

1. **Light Mode Test**:
   - Open `/ar/stories/hamza-story`
   - Verify background is white
   - Verify text is readable

2. **Dark Mode Test**:
   - Click theme toggle (🌙 icon)
   - Verify background changes to dark gray
   - Verify text remains readable
   - Check contrast ratios

3. **Cross-Locale Test**:
   - Test both `/en/stories/` and `/ar/stories/` routes
   - Verify both locales work correctly
   - Check RTL layout compatibility

## Implementation

### Quick Fix (Single Line Change)

Edit `src/components/StoryContentDisplay.tsx`:

```diff
- <article className="bg-white rounded-lg shadow-md p-8">
+ <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
```

### Comprehensive Fix

Audit all components for theme-aware classes:

```bash
# Search for hardcoded background classes
grep -r "bg-white" src/components/
grep -r "bg-gray-50" src/components/
grep -r "text-gray-900" src/components/
```

Update any missing dark mode variants.

## Technical Details

### Tailwind Dark Mode Configuration

The project uses Tailwind CSS with dark mode support configured in `tailwind.config.ts`:

```typescript
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',  // Enables class-based dark mode
  theme: {
    // ...
  },
  plugins: [],
}
```

The `dark:` prefix allows targeting dark mode variants when a parent element has the `dark` class.

### Theme Provider Integration

The `ThemeProvider` in `src/components/ClientProviders.tsx` manages the dark/light theme state. When users toggle themes:

1. Class `dark` is added/removed from `<html>` or `<body>` element
2. Tailwind's dark mode detects this change
3. Elements with `dark:` prefixed classes switch accordingly

## Expected Outcome

After the fix:
- ✅ Light mode: White background (`bg-white`)
- ✅ Dark mode: Dark gray background (`dark:bg-gray-800`)
- ✅ Smooth theme transitions
- ✅ Proper contrast ratios
- ✅ Consistent across all story pages

## Related Files

- `src/components/StoryContentDisplay.tsx` - Primary fix location
- `src/components/ThemeToggle.tsx` - Theme switching logic
- `tailwind.config.ts` - Tailwind configuration
- `src/globals.css` - Global styles

## Notes

- The fix maintains backward compatibility
- No breaking changes to existing functionality
- Aligns with Tailwind CSS best practices
- Consistent with other theme-aware components in the project
