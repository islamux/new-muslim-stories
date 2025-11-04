import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { StoryData, Locale } from '@/types';

const storiesDirectory = path.join(process.cwd(), 'src/stories');

/**
 * Extracts slug from filename (handles both en and ar locales)
 */
function extractSlug(fileName: string): string {
  const isArabic = fileName.endsWith('-ar.md');
  return isArabic
    ? fileName.replace(/-ar\.md$/, '')
    : fileName.replace(/\.md$/, '');
}

/**
 * Parses a single markdown file into StoryData
 */
export async function parseStoryFile(fileName: string): Promise<StoryData> {
  const slug = extractSlug(fileName);

  const fullPath = path.join(storiesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the story metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  const data = matterResult.data as {
    title: string;
    firstName: string;
    age: number;
    country: string;
    previousReligion: string;
    profilePhoto: string;
    featured: boolean;
    language: string;
  };

  return {
    slug,
    contentHtml,
    ...data,
    language: data.language as Locale,
  };
}

/**
 * Gets all story file names from the stories directory
 */
export function getStoryFileNames(): string[] {
  return fs.readdirSync(storiesDirectory);
}

/**
 * Extracts slug and locale from filename
 */
export function extractSlugAndLocale(fileName: string): { slug: string; locale: string } {
  const isArabic = fileName.endsWith('-ar.md');
  const slug = extractSlug(fileName);
  const locale = isArabic ? 'ar' : 'en';

  return { slug, locale };
}

/**
 * Checks if a story file exists for given slug and locale
 */
export function storyFileExists(slug: string, locale: string): boolean {
  const fileName = locale === 'ar' ? `${slug}-ar.md` : `${slug}.md`;
  const fullPath = path.join(storiesDirectory, fileName);
  return fs.existsSync(fullPath);
}
