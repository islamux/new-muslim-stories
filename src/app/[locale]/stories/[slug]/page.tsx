import type { StoryData, Locale } from '@/types';
import { getStoryData, getAllStorySlugs } from '@/lib/stories';
import { notFound } from 'next/navigation';
import StoryContentDisplay from '@/components/StoryContentDisplay';

// Generate static params for all stories
export async function generateStaticParams() {
  return getAllStorySlugs().map((entry) => entry.params);
}

// Story page component
export default async function StoryPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: Locale };
}) {
  try {
    const story = await getStoryData(slug, locale);
    return <StoryContentDisplay story={story} />;
  } catch (error) {
    notFound();
  }
}
