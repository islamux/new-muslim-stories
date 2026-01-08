'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Index');

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-10 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-400 dark:text-gray-500 font-sans">
          {t('footerCopyright', { year: new Date().getFullYear().toString() })}
        </p>
      </div>
    </footer>
  );
}
