// src/components/FeaturedStories.tsx
'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { FeaturedStoriesProps, StoryData } from '@/types';
import Section from '@/components/ui/Section';
import StoryCard from '@/components/StoryCard';

export default function FeaturedStories({ stories }: FeaturedStoriesProps) {
  const t = useTranslations('Common');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const countries = useMemo(() => {
    const uniqueCountries = new Set<string>();
    stories.forEach((story) => {
      if (story.country) {
        uniqueCountries.add(story.country);
      }
    });
    return Array.from(uniqueCountries).sort();
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (!selectedCountry) return stories;
    return stories.filter((story) => story.country === selectedCountry);
  }, [stories, selectedCountry]);

  return (
    <Section id="stories" className="my-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-center text-coral-600 dark:text-coral-400">
          {t('featuredStories')}
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="country-filter" className="text-sm text-gray-600 dark:text-gray-300">
            {t('filterByCountry')}:
          </label>
          <select
            id="country-filter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500"
          >
            <option value="">{t('filterAll')}</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No stories found for the selected country.
        </p>
      )}
    </Section>
  );
}
