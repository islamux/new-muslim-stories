'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ProfileHeaderProps } from '@/types';

export default function ProfileHeader({ story }: ProfileHeaderProps) {
  const t = useTranslations('Common');

  return (
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
        <p className="text-gray-600">
          {t('yearsOldFrom', { age: story.age, country: story.country })}
        </p>
        <p className="text-gray-500 text-sm">
          {t('previousReligion', { religion: story.previousReligion })}
        </p>
      </div>
    </div>
  );
}
