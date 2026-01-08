# Arabic Translation Fix Guide

Following the audit of the homepage and translation system, here is the analysis of why some Arabic translations are incomplete and how to resolve them manually.

## 1. Eliminate Duplicate Translation Folders

There are two `messages` directories:

- `messages/` (root) - **Used** by `src/i18n.ts`
- `src/messages/` - **Duplicate / Unused**

**Action**: Delete the `src/messages/` folder to avoid configuration confusion.

## 2. Hardcoded Strings (Internationalization Needed)

Several components have hardcoded English strings that are not using `next-intl`.

### `PWAInstallPrompt.tsx`

This component is completely hardcoded in English.

- **Header**: "Install App"
- **Description**: "Install New Muslim Stories for offline reading and faster access"
- **Features List**: "Read stories offline", "Faster loading", "Home screen access"
- **Buttons**: "Install", "Not Now"

### `ThemeToggle.tsx`

- The `aria-label="Toggle theme"` is hardcoded in English.

---

## 3. RTL (Right-to-Left) Styling Issues

Some components use physical spacing (`mr-*`, `ml-*`) instead of logical properties (`me-*`, `ms-*`), which causes inconsistent margins in Arabic.

### `ProfileHeader.tsx`

- **Current**: `className="rounded-full mr-4 object-cover"`
- **Fix**: Change `mr-4` to `me-4` (margin-end) so it works correctly for both LTR and RTL.

---

## 4. Why Hero/Header showed English on `/ar`

The `TRANSLATION_ISSUE_ANALYSIS.md` indicated that Hero and Header components were failing to show Arabic.

- Ensure that the `Hero` and `Index` namespaces in `messages/ar.json` are properly formatted.
- Verify that `NextIntlClientProvider` in `LocaleLayout` is receiving the correct `messages` object.

---

## Recommended Manual Fix Steps

### Step 1: Update `messages/ar.json`

Add a new `PWA` namespace and update `Common` for the theme toggle:

```json
{
  "PWA": {
    "installTitle": "تثبيت التطبيق",
    "installDescription": "قم بتثبيت 'قصص المسلمين الجدد' للقراءة بدون إنترنت ووصول أسرع",
    "featureOffline": "قراءة القصص بدون إنترنت",
    "featureFast": "تحميل أسرع",
    "featureHome": "وصول من الشاشة الرئيسية",
    "install": "تثبيت",
    "notNow": "ليس الآن"
  }
}
```

### Step 2: Use Translations in Components

Update `PWAInstallPrompt.tsx` to use the `useTranslations('PWA')` hook and replace strings with `{t('key')}`.

### Step 3: Switch to Logical CSS

Search the codebase for `mr-` and `ml-` and replace them with `me-` and `ms-` where they relate to horizontal layout spacing.
