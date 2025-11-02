'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useStorySections } from '@/hooks/useStorySections';
import ProfileHeader from './ProfileHeader';
import type { StoryContentDisplayProps } from '@/types';

export default function StoryContentDisplay({ story }: StoryContentDisplayProps) {
  const t = useTranslations('Story');
  const router = useRouter();

  // Extract story sections using custom hook
  const { lifeBeforeIslam, momentOfGuidance, reflections } = useStorySections(story.contentHtml);

  return (
    <article className="bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-start">
        <ProfileHeader story={story} />
        <button
          onClick={() => router.back()}
          className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors"
        >
          {t('return')}
        </button>
      </div>

      <section className="my-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">{t('lifeBeforeIslam')}</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lifeBeforeIslam }} />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">{t('momentOfGuidance')}</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: momentOfGuidance }} />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">{t('reflections')}</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: reflections }} />
      </section>
    </article>
  );
}
