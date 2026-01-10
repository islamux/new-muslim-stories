# PWA Install Component - Fixed Version

## Current Issues Identified

The current `PWAInstall.tsx` component has some hardcoded values and potential improvements:

### Issues:
1. **Hardcoded feature keys**: `PWA_FEATURES` array uses hardcoded strings that don't match translation keys
2. **Fallback logic**: Uses `getTranslation` with fallbacks instead of direct translation usage
3. **Feature translation mapping**: Complex string manipulation for feature names

## Fixed Version

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Icon from './ui/Icon';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Fixed: Use translation keys that match the actual message files
const PWA_FEATURES = [
  { key: 'featureOffline', icon: 'offline' },
  { key: 'featureFast', icon: 'speed' },
  { key: 'featureHome', icon: 'home' }
];

export default function PWAInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const t = useTranslations('PWA');

  useEffect(() => {
    const dismissedStorage = localStorage.getItem('pwa-install-dismissed');
    if (dismissedStorage) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowInstallPrompt(true), 5000);
    };

    const handleAppInstalled = () => {
      setShowInstallPrompt(false);
      localStorage.setItem('pwa-install-dismissed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === 'accepted') {
      localStorage.setItem('pwa-install-dismissed', 'true');
    }

    setShowInstallPrompt(false);
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Fixed: Direct translation usage without fallback logic
  if (!showInstallPrompt || !installPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 animate-in slide-in-from-bottom-5">
        <div className="flex items-start mb-3">
          <div className="flex-shrink-0">
            <Icon name="app" className="w-8 h-8 text-green-600" />
          </div>
          <div className="ms-3 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('installTitle')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('installDescription')}
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Dismiss"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        <ul className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          {PWA_FEATURES.map((feature) => (
            <li key={feature.key} className="flex items-center">
              <Icon name="check" className="w-4 h-4 text-green-600 me-2" />
              {t(feature.key)}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {t('install')}
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {t('notNow')}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Key Improvements Made

### 1. Fixed Translation Keys
**Before:**
```typescript
const PWA_FEATURES = ['offlineReading', 'fasterLoading', 'homeScreenAccess'];
```

**After:**
```typescript
const PWA_FEATURES = [
  { key: 'featureOffline', icon: 'offline' },
  { key: 'featureFast', icon: 'speed' },
  { key: 'featureHome', icon: 'home' }
];
```

### 2. Direct Translation Usage
**Before:**
```typescript
const getTranslation = (key: string, fallback: string) => t(key) || fallback;
```

**After:**
```typescript
// Direct usage without fallback logic
{t('installTitle')}
```

### 3. Simplified Feature Rendering
**Before:**
```typescript
{getTranslation(`installFeature${feature.charAt(0).toUpperCase() + feature.slice(1)}`, 
  feature.replace(/([A-Z])/g, ' $1').trim())}
```

**After:**
```typescript
{t(feature.key)}
```

### 4. Updated Button Translations
**Before:**
```typescript
{t('installButton', 'Install')}
{t('notNowButton', 'Not Now')}
```

**After:**
```typescript
{t('install')}
{t('notNow')}
```

## Translation Keys Mapping

The fixed version uses these translation keys from the PWA namespace:

```json
{
  "PWA": {
    "installTitle": "Install the App",
    "installDescription": "Install 'Stories of New Muslims' to read offline and enjoy faster access",
    "featureOffline": "Read stories offline",
    "featureFast": "Faster loading",
    "featureHome": "Access from the home screen",
    "install": "Install",
    "notNow": "Not now"
  }
}
```

## Benefits of the Fixed Version

✅ **Proper i18n Integration**: Uses actual translation keys from message files
✅ **Simpler Code**: Removes complex string manipulation and fallback logic
✅ **Better Maintainability**: Clear mapping between features and translation keys
✅ **Consistency**: Follows the same pattern as other translated components
✅ **Type Safety**: Easier to validate translation keys

## Implementation Notes

1. **Translation Files**: Ensure your `messages/en.json` and `messages/ar.json` contain the correct PWA translation keys
2. **Testing**: Test both English and Arabic versions to ensure all translations display correctly
3. **Fallback**: The component will naturally fall back to translation keys if any are missing
4. **Icons**: The icon names in the feature array can be adjusted based on your available icons

This fixed version maintains all the existing functionality while properly integrating with the i18n system and removing hardcoded values.