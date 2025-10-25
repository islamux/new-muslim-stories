// src/components/WhoAreNewMuslims.tsx
'use client';

import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';
import { Link } from '@/navigation';

export default function WhoAreNewMuslims() {
  const t = useTranslations('Index');
  const commonT = useTranslations('Common');

  return (
    <Section className="my-12 bg-beige-100 dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-lg shadow-md">
      <h2 className="font-heading text-3xl text-gray-800 dark:text-beige-50 text-center mb-6">
        {t('whoAreNewMuslims')}
      </h2>
      <p className="font-sans text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        {t('whoAreNewMuslimsDescription')}
      </p>
      <div className="text-center mt-8">
        <Link
          href="#"
          className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline"
        >
          {commonT('learnMore')}
        </Link>
      </div>
    </Section>
  );
}
