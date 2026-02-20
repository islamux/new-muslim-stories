'use client';

import { Link } from '@/navigation';
import Image from 'next/image';
import type { StoryCardProps } from '@/types';
import { useTranslations } from 'next-intl';

export default function StoryCard({ story }: StoryCardProps) {
  const commonT = useTranslations('Common');

  return (
    <div
      key={story.slug}
      className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
    >
      {story.profilePhoto && (
        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src={story.profilePhoto}
            alt={story.firstName}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">
        {story.title}
      </h3>
      <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">
        {story.contentHtml.replace(/<[^>]*>/g, '').substring(0, 150)}...
      </p>
      <Link
        href={`/stories/${story.slug}`}
        className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline"
      >
        {commonT('learnMore')}
      </Link>
    </div>
  );
}
