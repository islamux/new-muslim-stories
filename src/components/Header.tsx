'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useHasMounted } from '@/hooks/useHasMounted';

export default function Header() {
  const t = useTranslations('Index');
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;
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
