# Font Color Fix Plan

**Issue:** White text on light theme background in story content

**Root Cause:** In `src/components/StoryContentDisplay.tsx:18`, the prose class uses `dark:prose-invert` but the HTML content from `dangerouslySetInnerHTML` may have inline styles or the prose configuration needs adjustment.

## Solution

Edit `src/components/StoryContentDisplay.tsx` and update the `div` with `dangerouslySetInnerHTML`:

**Current (line 18):**
```tsx
<div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
```

**Updated:**
```tsx
<div className="prose prose-slate dark:prose-invert max-w-none text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: content }} />
```

## Changes Made
1. Added `prose-slate` for better default prose colors in light mode
2. Added explicit `text-gray-900 dark:text-white` for direct color control
3. `prose-invert` handles dark mode prose color inversion

## Testing
1. Run `pnpm dev` to start the development server
2. Navigate to a story page
3. Toggle between light and dark themes
4. Verify text is readable in both modes
