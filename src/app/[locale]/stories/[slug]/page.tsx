import type { Locale } from '@/types';
import { getStoryData, getAllStorySlugs } from '@/lib/stories';
import StoryContentDisplay from '@/components/StoryContentDisplay';

// Generate static params for all stories
export async function generateStaticParams() {
  return getAllStorySlugs().map((entry) => entry.params);
}

// Story page component
export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const story = await getStoryData(slug, locale)
  return <StoryContentDisplay story={story} />;
}

