# HeroSection Arabic Translation Guide

This guide explains how the `HeroSection` component is translated to Arabic and how to verify/extend translations.

---

## Current State

### ✅ Good News: Translations Already Exist!

The `HeroSection` component is **already fully translated** to Arabic. The translation keys are defined in both language files:

**Location**: `messages/en.json` and `messages/ar.json`

---

## How It Works

### 1. Component Uses Translation Hook

```typescript
// src/components/HeroSection.tsx
const HeroSection = () => {
  const t = useTranslations('Hero');  // 👈 Uses 'Hero' namespace

  return (
    <h1>{t('headline')}</h1>  // 👈 Gets translated text
    <p>{t('subheadline')}</p>
    <button>{t('exploreStories')}</button>
  );
};
```

### 2. Translation Keys Mapping

| Component Usage | Translation Key | English | Arabic |
|----------------|-----------------|---------|---------|
| `t('headline')` | `Hero.headline` | "Discover Inspiring Journeys" | "اكتشف رحلات ملهمة" |
| `t('subheadline')` | `Hero.subheadline` | Full English text | Full Arabic text |
| `t('exploreStories')` | `Hero.exploreStories` | "Explore Stories" | "استكشف القصص" |

---

## Step-by-Step Verification

### Step 1: Check Translation Files Exist

**Verify English translations:**
```bash
cat messages/en.json | grep -A 5 '"Hero"'
```

**Verify Arabic translations:**
```bash
cat messages/ar.json | grep -A 5 '"Hero"'
```

### Step 2: Start Development Server

```bash
pnpm dev
```

### Step 3: Test English Version

Visit: `http://localhost:3000/en`

You should see:
- Headline: "Discover Inspiring Journeys"
- Subheadline: "Explore the stories of individuals..."
- Button: "Explore Stories"

### Step 4: Test Arabic Version

Visit: `http://localhost:3000/ar`

You should see:
- Headline: "اكتشف رحلات ملهمة"
- Subheadline: Arabic text
- Button: "استكشف القصص"
- Page direction: RTL (right-to-left)

---

## How to Add New Translations

If you want to add new text to the HeroSection:

### Step 1: Update Component

Add new translation key in `src/components/HeroSection.tsx`:

```typescript
const HeroSection = () => {
  const t = useTranslations('Hero');

  return (
    <section>
      <h1>{t('headline')}</h1>
      <p>{t('subheadline')}</p>
      <button>{t('exploreStories')}</button>
      <p>{t('newKey')}</p>  {/* 👈 New translation */}
    </section>
  );
};
```

### Step 2: Add English Translation

Edit `messages/en.json`:

```json
{
  "Hero": {
    "headline": "Discover Inspiring Journeys",
    "subheadline": "Explore the stories...",
    "exploreStories": "Explore Stories",
    "newKey": "Your new English text here"  {/* 👈 Add this */}
  }
}
```

### Step 3: Add Arabic Translation

Edit `messages/ar.json`:

```json
{
  "Hero": {
    "headline": "اكتشف رحلات ملهمة",
    "subheadline": "استكشف قصص الأفراد...",
    "exploreStories": "استكشف القصص",
    "newKey": "النص العربي الجديد هنا"  {/* 👈 Add this */}
  }
}
```

### Step 4: Verify

Restart dev server and check both `/en` and `/ar` routes.

---

## RTL (Right-to-Left) Support

### Current RTL Implementation

The RTL direction is handled in `src/app/[locale]/layout.tsx`:

```typescript
<div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  {children}
</div>
```

### What This Does

- **English (`/en`)**: `dir="ltr"` (left-to-right)
- **Arabic (`/ar`)**: `dir="rtl"` (right-to-left)

### Visual Changes in RTL

✅ **Automatically handled by browser**:
- Text alignment switches to right
- Layout mirrors appropriately
- No additional code needed in HeroSection

---

## Testing Checklist

### ✅ Functional Tests

- [ ] English version displays correctly at `/en`
- [ ] Arabic version displays correctly at `/ar`
- [ ] All three translation keys render properly
- [ ] No console errors
- [ ] Button click works (anchor to #stories)

### ✅ Visual Tests

- [ ] English: Text aligns left
- [ ] Arabic: Text aligns right
- [ ] Gradients and colors work in both languages
- [ ] Button hover effects work
- [ ] Responsive design works on mobile

### ✅ Translation Quality

- [ ] Arabic translations are accurate
- [ ] Text fits in containers (no overflow)
- [ ] Font supports Arabic characters
- [ ] Line breaks look good

---

## Common Issues & Solutions

### Issue 1: Translation Not Showing

**Problem**: Seeing translation key instead of text (e.g., "Hero.headline" instead of "اكتشف رحلات ملهمة")

**Solution**:
1. Check key exists in both `en.json` and `ar.json`
2. Restart dev server: `pnpm dev`
3. Clear browser cache

### Issue 2: Arabic Text Looks Wrong

**Problem**: Arabic text appears disconnected or malformed

**Solution**:
1. Ensure fonts support Arabic characters
2. Check `dir="rtl"` is set on Arabic pages
3. Verify CSS doesn't override text direction

### Issue 3: Layout Breaks in Arabic

**Problem**: Elements overlap or misalign in Arabic

**Solution**:
1. Check CSS uses logical properties (margin-inline vs margin-left)
2. Test on actual Arabic locale: `/ar`
3. Use browser dev tools to inspect RTL layout

---

## File Locations

| File | Purpose |
|------|---------|
| `src/components/HeroSection.tsx` | Component with translation calls |
| `messages/en.json` | English translations (source language) |
| `messages/ar.json` | Arabic translations |
| `src/app/[locale]/layout.tsx` | RTL direction handler |

---

## Quick Reference

### View Current Translations

```bash
# English
cat messages/en.json | jq '.Hero'

# Arabic
cat messages/ar.json | jq '.Hero'
```

### Test Both Languages

```bash
# Terminal 1: Start server
pnpm dev

# Terminal 2: Test English
curl http://localhost:3000/en | grep -o "Discover Inspiring Journeys"

# Terminal 3: Test Arabic
curl http://localhost:3000/ar | grep -o "اكتشف رحلات ملهمة"
```

---

## Summary

✅ **HeroSection is already fully translated to Arabic!**

The component uses the `useTranslations('Hero')` hook, which automatically pulls the correct language based on the URL (`/en` or `/ar`).

To verify: Visit `http://localhost:3000/ar` and see the Arabic version with proper RTL layout.

To extend: Add new keys to both `messages/en.json` and `messages/ar.json` under the `"Hero"` section.

🚀 **No additional work needed** - it's ready to use!
