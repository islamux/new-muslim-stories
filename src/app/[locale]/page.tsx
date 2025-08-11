import { getSortedStoriesData } from '@/lib/stories';
import HomePageClient from '@/components/HomePageClient';

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const stories = await getSortedStoriesData(locale);

  return <HomePageClient stories={stories} />;
}