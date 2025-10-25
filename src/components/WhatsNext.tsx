// src/components/WhatsNext.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Section from '@/components/ui/Section';


export default function WhatsNext() {
  const t = useTranslations('Index');

  return (
    <Section className="my-12 bg-sky-100 dark:bg-sky-800 p-6 sm:p-8 md:p-12 rounded-lg shadow-md">
      <h2 className="font-heading text-3xl text-gray-800 dark:text-beige-50 text-center mb-6">
        {t('whatsNext')}
      </h2>
      <p className="font-sans text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        {t('whatsNextDescription')}
      </p>
      <div className="text-center mt-8">
        <Link
          href="#"
          className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline"
        >
          {t('contactCenters')}
        </Link>
      </div>
    </Section>
  );
}
