'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import type { StoryContentDisplayProps } from '@/types';

export default function StoryContentDisplay({ story }: StoryContentDisplayProps) {
  const t = useTranslations('Story');
  const router = useRouter();

  // Split the contentHtml into sections based on the headings
  const sections = story.contentHtml.split(/<h3>(.*?)<\/h3>/g);

  const lifeBeforeIslamContent = sections[2] || '';
  const momentOfGuidanceContent = sections[4] || '';
  const reflectionsContent = sections[6] || '';

  return (
    <article className="bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-start">
        <div className="flex items-center mb-6">
          {story.profilePhoto && (
            <Image
              src={story.profilePhoto}
              alt={story.firstName}
              width={80}
              height={80}
              className="rounded-full mr-4 object-cover"
            />
          )}
          <div>
            <p className="text-xl font-semibold text-gold-600">{story.firstName}</p>
            <p className="text-gray-600">{story.age} years old, from {story.country}</p>
            <p className="text-gray-500 text-sm">Previous Religion: {story.previousReligion}</p>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors"
        >
          {t('return')}
        </button>
      </div>

      <section className="my-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">{t('lifeBeforeIslam')}</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lifeBeforeIslamContent }} />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">{t('momentOfGuidance')}</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: momentOfGuidanceContent }} />
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">{t('reflections')}</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: reflectionsContent }} />
      </section>
    </article>
  );
}
