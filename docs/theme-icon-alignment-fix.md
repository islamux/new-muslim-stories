# Theme Toggle Icon Alignment Fix

**Issue:** Light theme icon not aligned above text like dark theme icon.

## Root Cause
In `src/components/ThemeToggle.tsx:74-78`, the icon wrapper uses `w-5 h-5` which is too small for proper flex layout.

## Solution

**Current (lines 74-78):**
```tsx
<div className="w-5 h-5">
  <SunIcon theme={theme} />
  <MoonIcon theme={theme} />
</div>
<span className="ml-2">{theme === 'light' ? t('dark') : t('light')} {t('theme')}</span>
```

**Updated:**
```tsx
<div className="flex flex-col items-center justify-center w-5 h-5">
  <SunIcon theme={theme} />
  <MoonIcon theme={theme} />
</div>
<span className="ml-2">{theme === 'light' ? t('dark') : t('light')} {t('theme')}</span>
```

## Alternative (if icons need to be stacked above text)
```tsx
<div className="flex flex-col items-center">
  <div className="w-5 h-5">
    <SunIcon theme={theme} />
    <MoonIcon theme={theme} />
  </div>
  <span className="text-xs">{theme === 'light' ? t('dark') : t('light')} {t('theme')}</span>
</div>
```

## File to Edit
`src/components/ThemeToggle.tsx`
