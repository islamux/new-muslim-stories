'use client';

import dynamic from 'next/dynamic';
import type { HomePageClientProps } from '@/types';
import TopNav from '@/components/TopNav';
import HeroSection from '@/components/HeroSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';
import Section from '@/components/ui/Section';

const FeaturedStories = dynamic(() => import('@/components/FeaturedStories'), {
  ssr: true,
  loading: () => (
    <Section className="my-12">
      <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </Section>
  ),
});

const WhoAreNewMuslims = dynamic(() => import('@/components/WhoAreNewMuslims'), {
  ssr: true,
  loading: () => (
    <Section className="my-12">
      <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </Section>
  ),
});

const StoryOfTheDay = dynamic(() => import('@/components/StoryOfTheDay'), {
  ssr: true,
  loading: () => <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl" />,
});

const WhatsNext = dynamic(() => import('@/components/WhatsNext'), {
  ssr: true,
  loading: () => (
    <Section className="my-12">
      <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg" />
    </Section>
  ),
});

export default function HomePageClient({ stories }: HomePageClientProps) {
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
