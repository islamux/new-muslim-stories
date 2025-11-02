// src/components/FeaturedStories.tsx
'use client';

import { useTranslations } from 'next-intl';
import type { FeaturedStoriesProps } from '@/types';
import Section from '@/components/ui/Section';
import StoryCard from '@/components/StoryCard';

export default function FeaturedStories({ stories }: FeaturedStoriesProps) {
  const t = useTranslations('Index');

  return (
    <Section id="stories" className="my-12">
      <h2 className="text-2xl font-semibold text-center mb-6 text-coral-600 dark:text-coral-400">
        {t('featuredStories')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </Section>
  );
}
