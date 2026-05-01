'use client';

import Image from 'next/image';
import type { StoryImageProps } from '@/types';

export default function StoryImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: StoryImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
      />
    </div>
  );
}
