import { describe, it, expect } from 'vitest';
import { extractSlugAndLocale, storyFileExists } from '@/lib/story-parser';

describe('story-parser', () => {
  describe('extractSlugAndLocale', () => {
    it('extracts english slug and locale from .md files', () => {
      const result = extractSlugAndLocale('ahmed-story.md');
      expect(result).toEqual({ slug: 'ahmed-story', locale: 'en' });
    });

    it('extracts arabic slug and locale from -ar.md files', () => {
      const result = extractSlugAndLocale('ahmed-story-ar.md');
      expect(result).toEqual({ slug: 'ahmed-story', locale: 'ar' });
    });
  });

  describe('storyFileExists', () => {
    it('returns false for non-existent story', () => {
      const result = storyFileExists('non-existent-story', 'en');
      expect(result).toBe(false);
    });
  });
});
