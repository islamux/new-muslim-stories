// src/components/FeaturedStories.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import type { StoryData } from '@/lib/stories';
import Section from '@/components/ui/Section';



interface FeaturedStoriesProps {
  stories: StoryData[];
}

export default function FeaturedStories({ stories }: FeaturedStoriesProps) {
  const t = useTranslations('Index');
  const commonT = useTranslations('Common');

  return (
    <Section id="stories" className="my-12">
      <h2 className="text-2xl font-semibold text-center mb-6 text-coral-600 dark:text-coral-400">
        {t('featuredStories')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.slug}
            className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">
              {story.title}
            </h3>
            <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">
              {story.contentHtml.substring(0, 150)}...
            </p>
            <Link
              href={`/stories/${story.slug}`}
              className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline"
            >
              {commonT('learnMore')}
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
