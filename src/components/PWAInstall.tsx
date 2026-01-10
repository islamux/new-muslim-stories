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

const PWA_FEATURES = ['offlineReading', 'fasterLoading', 'homeScreenAccess'];

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

  const getTranslation = (key: string, fallback: string) => t(key) || fallback;

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
              {getTranslation('installAppTitle', 'Install App')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {getTranslation('installAppDescription', 'Install New Muslim Stories for offline reading and faster access')}
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
            <li key={feature} className="flex items-center">
              <Icon name="check" className="w-4 h-4 text-green-600 me-2" />
              {getTranslation(`installFeature${feature.charAt(0).toUpperCase() + feature.slice(1)}`, feature.replace(/([A-Z])/g, ' $1').trim())}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {getTranslation('installButton', 'Install')}
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {getTranslation('notNowButton', 'Not Now')}
          </button>
        </div>
      </div>
    </div>
  );
}
