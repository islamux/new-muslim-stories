'use client';

import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Index');

  return (
    <header className="bg-gray-100 dark:bg-gray-850 shadow-md py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t('title')}
        </div>
      </div>
    </header>
  );
}
