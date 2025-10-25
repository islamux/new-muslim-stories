// src/components/StoryOfTheDay.tsx
'use client';

import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';
import { Link } from '@/navigation';

export default function StoryOfTheDay() {
  const t = useTranslations('Index');
  const commonT = useTranslations('Common');

  return (
    <Section className="my-12">
      <h2 className="text-2xl font-semibold text-center mb-6 text-coral-600 dark:text-coral-400">
        {commonT('storyOfTheDay')}
      </h2>
      <div className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
        <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">
          {t('dailyStoryTitle')}
        </h3>
        <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">
          {t('dailyStoryExcerpt')}
        </p>
        <Link
          href="/stories/sample-story"
          className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline"
        >
          {commonT('learnMore')}
        </Link>
      </div>
    </Section>
  );
}
