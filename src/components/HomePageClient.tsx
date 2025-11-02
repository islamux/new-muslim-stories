'use client';

import type { HomePageClientProps } from '@/types';
import TopNav from '@/components/TopNav';
import HeroSection from '@/components/HeroSection';
import Header from '@/components/Header';
import FeaturedStories from '@/components/FeaturedStories';
import WhoAreNewMuslims from '@/components/WhoAreNewMuslims';
import StoryOfTheDay from '@/components/StoryOfTheDay';
import WhatsNext from '@/components/WhatsNext';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';

export default function HomePageClient({ stories }: HomePageClientProps) {
  const t = useTranslations('Index');
  const commonT = useTranslations('Common');

  // Get the first story for "Story of the Day"
  const storyOfTheDay = stories[0];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <TopNav />
      <HeroSection />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FeaturedStories stories={stories} />
        <WhoAreNewMuslims />
        <Section className="my-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-coral-600 dark:text-coral-400">
            {commonT('storyOfTheDay')}
          </h2>
          {storyOfTheDay && <StoryOfTheDay story={storyOfTheDay} />}
        </Section>
        <WhatsNext />
      </main>
      <Footer />
    </div>
  );
}
