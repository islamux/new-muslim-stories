'use client';

import { useTranslations } from 'next-intl';
import type { ProfileHeaderProps } from '@/types';
import StoryImage from '@/components/ui/StoryImage';

export default function ProfileHeader({ story }: ProfileHeaderProps) {
  const t = useTranslations('Common');

  return (
    <div className="flex items-center mb-6">
      {story.profilePhoto && (
        <div className="relative w-20 h-20 me-4 rounded-full overflow-hidden flex-shrink-0">
          <StoryImage
            src={story.profilePhoto}
            alt={story.firstName}
            sizes="80px"
          />
        </div>
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
