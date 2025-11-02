'use client';

import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Index');

  return (
    <section className="bg-gray-100 dark:bg-gray-850 py-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t('title')}
        </h2>
      </div>
    </section>
  );
}
