'use client';

import type { HomePageClientProps } from '@/types';
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <HeroSection />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FeaturedStories stories={stories} />
        <WhoAreNewMuslims />
        <StoryOfTheDay />
        <WhatsNext />
      </main>
      <Footer />
    </div>
  );
}
