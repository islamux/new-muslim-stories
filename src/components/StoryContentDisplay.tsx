'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useStorySections } from '@/hooks/useStorySections';
import ProfileHeader from './ProfileHeader';
import Button from './Button';
import StoryImage from '@/components/ui/StoryImage';
import type { StoryContentDisplayProps } from '@/types';

function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') return html;
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const scripts = temp.querySelectorAll('script, iframe, object, embed');
  scripts.forEach((el) => el.remove());
  return temp.innerHTML;
}

interface StorySectionProps {
  title: string;
  content: string;
}

const StorySection = ({ title, content }: StorySectionProps) => {
  const sanitized = useMemo(() => sanitizeHtml(content), [content]);
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">{title}</h2>
      <div
        className="prose prose-slate dark:prose-invert max-w-none text-gray-900 dark:text-white"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    </section>
  );
};

export default function StoryContentDisplay({ story }: StoryContentDisplayProps) {
  const t = useTranslations('Story');
  const router = useRouter();

  const { lifeBeforeIslam, momentOfGuidance, reflections } = useStorySections(story.contentHtml);

  const sections = [
    { key: 'lifeBeforeIslam', content: lifeBeforeIslam },
    { key: 'momentOfGuidance', content: momentOfGuidance },
    { key: 'reflections', content: reflections },
  ];

  return (
    <article className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md p-8">
      {story.image && (
        <StoryImage
          src={story.image}
          alt={story.firstName}
          className="w-full h-64 mb-6 rounded-lg"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      )}
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
