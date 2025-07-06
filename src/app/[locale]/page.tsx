import { getSortedStoriesData } from '@/lib/stories';
import HomePageClient from '@/components/HomePageClient';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const stories = await getSortedStoriesData(locale);

  return <HomePageClient stories={stories} />;
}