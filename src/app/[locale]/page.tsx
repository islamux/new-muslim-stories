import { getSortedStoriesData } from '@/lib/stories';
import HomePageClient from '@/components/HomePageClient';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const stories = await getSortedStoriesData(locale);

  return <HomePageClient stories={stories} />;
}
