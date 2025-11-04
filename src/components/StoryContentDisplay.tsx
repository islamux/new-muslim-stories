'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useStorySections } from '@/hooks/useStorySections';
import ProfileHeader from './ProfileHeader';
import Button from './Button';
import type { StoryContentDisplayProps } from '@/types';

interface StorySectionProps {
  title: string;
  content: string;
}

const StorySection = ({ title, content }: StorySectionProps) => (
  <section className="my-8">
    <h2 className="text-2xl font-semibold text-green-700 mb-4">{title}</h2>
    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
  </section>
);

export default function StoryContentDisplay({ story }: StoryContentDisplayProps) {
  const t = useTranslations('Story');
  const router = useRouter();

  // Extract story sections using custom hook
  const { lifeBeforeIslam, momentOfGuidance, reflections } = useStorySections(story.contentHtml);

  // Define story sections for cleaner rendering
  const sections = [
    { key: 'lifeBeforeIslam', content: lifeBeforeIslam },
    { key: 'momentOfGuidance', content: momentOfGuidance },
    { key: 'reflections', content: reflections }
  ];

  return (
    <article className="bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-start">
        <ProfileHeader story={story} />
        <Button
          onClick={() => router.back()}
          className="bg-green-700 text-white hover:bg-green-800 transition-colors"
        >
          {t('return')}
        </Button>
      </div>

      {sections.map(({ key, content }) => (
        <StorySection key={key} title={t(key)} content={content} />
      ))}
    </article>
  );
}
