# Arabic Translation Fix Guide

Following the audit of the homepage and translation system, here is the analysis of why some Arabic translations are incomplete and how to resolve them manually.

## 1. Eliminate Duplicate Translation Folders

There are two `messages` directories:

- `messages/` (root) - **Used** by `src/i18n.ts`
- `src/messages/` - **Duplicate / Unused**

**Action**: Delete the `src/messages/` folder to avoid configuration confusion.

## 2. Hardcoded Strings (Internationalization Needed)

Severalcomponents have hardcoded English strings that are not using `next-intl`.

### `PWAInstallPrompt.tsx`

This component has fallback hardcoded English strings that should be properly internationalized:

- **Header**: "Install App" (fallback for `installAppTitle`)
- **Description**: "Install New Muslim Stories for offline reading and faster access" (fallback for `installAppDescription`)
- **Features List**: 
  - "Read stories offline" (fallback for `installFeatureOfflineReading`)
  - "Faster loading" (fallback for `installFeatureFasterLoading`)
  - "Home screen access" (fallback for `installFeatureHomeScreenAccess`)
- **Buttons**: 
  - "Install" (fallback for `installButton`)
  - "Not Now" (fallback for `notNowButton`)
- **Dismiss button**: `aria-label="Dismiss"` (hardcoded, not using translations)

**Current Status**: The component uses a `getTranslation()` fallback system but still has hardcoded English strings as fallbacks. These should be properly internationalized using the existing translation keys in `messages/en.json` and `messages/ar.json`.

### `ThemeToggle.tsx`

- **Aria-label**: The component has `aria-label="Dismiss"` in the dismiss button that is hardcoded in English
- **Theme labels**: Uses translations for "Theme", "Light", and "Dark" but could benefit from proper aria-labels

**Current Status**: Most text is properly internationalized, but accessibility attributes need attention.

### Additional Findings

#### `aria-label` Issues
- `PWAInstallPrompt.tsx` line 88: `aria-label="Dismiss"` - This accessibility label is hardcoded

#### Translation Key Analysis
The translation files (`messages/en.json` and `messages/ar.json`) already contain proper translations for:
- PWA installation strings under `PWA` namespace
- Theme-related strings under `Common` namespace

**Recommendation**: Remove fallback hardcoded strings and rely entirely on the translation system to ensure consistent Arabic support.

### Action Plan for Hardcoded Strings Fix

#### Step 1: Update PWAInstallPrompt.tsx
- Remove the `getTranslation()` fallback function
- Replace all hardcoded fallback strings with direct translation calls
- Add proper aria-label translation for the dismiss button
- Example: Replace `getTranslation('installAppTitle', 'Install App')` with `t('installAppTitle')`

#### Step 2: Update ThemeToggle.tsx  
- Add proper aria-label for theme toggle button using translations
- Ensure all theme-related strings use the existing translation keys

#### Step 3: Verify Translation Files
- Confirm all required translation keys exist in both `messages/en.json` and `messages/ar.json`
- Add missing keys if any are found during implementation

#### Step 4: Test Arabic Support
- Switch application to Arabic locale
- Verify all PWA prompt text appears in Arabic
- Verify theme toggle accessibility labels work in Arabic
- Test on both mobile and desktop views

#### Expected Outcome
After implementing these changes:
- All user-facing text will be properly internationalized
- Arabic users will see complete Arabic translations
- Accessibility will be improved with proper aria-labels
- No hardcoded English strings will remain in the UI

---


