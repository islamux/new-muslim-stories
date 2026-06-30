import { StoryService } from '@/lib/story-service';
import HomePageClient from '@/components/HomePageClient';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const stories = await StoryService.getSortedStoriesData(locale);

  return <HomePageClient stories={stories} />;
}
