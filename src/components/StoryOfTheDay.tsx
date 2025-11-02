'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import type { StoryOfTheDayProps } from '@/types';

export default function StoryOfTheDay({ story }: StoryOfTheDayProps) {
  const commonT = useTranslations('Common');

  // Create excerpt from contentHtml (first 150 characters)
  const excerpt = story.contentHtml.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

  return (
    <div className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">
        {story.title}
      </h3>
      <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">
        {excerpt}
      </p>
      <Link
        href={`/stories/${story.slug}`}
        className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline"
      >
        {commonT('learnMore')}
      </Link>
    </div>
  );
}
