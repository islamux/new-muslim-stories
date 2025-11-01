'use client';

import type { HomePageClientProps } from '@/types';
import HeroSection from '@/components/HeroSection';
import FeaturedStories from '@/components/FeaturedStories';
import WhoAreNewMuslims from '@/components/WhoAreNewMuslims';
import StoryOfTheDay from '@/components/StoryOfTheDay';
import WhatsNext from '@/components/WhatsNext';
import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';

export default function HomePageClient({ stories }: HomePageClientProps) {
  const t = useTranslations('Index');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <HeroSection />
      <header className="bg-gray-100 dark:bg-gray-850 shadow-md py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('title')}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <FeaturedStories stories={stories} />
        <WhoAreNewMuslims />
        <StoryOfTheDay />
        <WhatsNext />
      </main>
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-10 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-400 dark:text-gray-500 font-sans">
            {t('footerCopyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </div>
  );
}
