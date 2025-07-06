import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const storiesDirectory = path.join(process.cwd(), 'src/stories');

export interface StoryData {
  slug: string;
  title: string;
  firstName: string;
  age: number;
  country: string;
  previousReligion: string;
  profilePhoto: string;
  featured: boolean;
  language: string;
  contentHtml: string; // Changed from 'content' to 'contentHtml'
}

export async function getSortedStoriesData(locale: string): Promise<StoryData[]> {
  // Get file names under /stories
  const fileNames = fs.readdirSync(storiesDirectory);
  const allStoriesData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get slug
      const isArabic = fileName.endsWith('-ar.md');
      const slug = isArabic
        ? fileName.replace(/-ar\.md$/, '')
        : fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(storiesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the story metadata section
      const matterResult = matter(fileContents);

      // Use remark to convert markdown into HTML string
      const processedContent = await remark().use(html).process(matterResult.content);
      const contentHtml = processedContent.toString();

      // Combine the data with the slug and contentHtml
      return {
        slug,
        contentHtml, // Use contentHtml
        ...(matterResult.data as {
          title: string;
          firstName: string;
          age: number;
          country: string;
          previousReligion: string;
          profilePhoto: string;
          featured: boolean;
          language: string;
        }),
      };
    })
  );
  // Filter stories by locale
  const filteredStories = allStoriesData.filter(story => story.language === locale);

  // Sort stories by title alphabetically
  return filteredStories.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else {
      return 1;
    }
  });
}

// Generates all possible story paths (slugs and locales) based on frontmatter.
// This is used by Next.js's generateStaticParams to pre-render dynamic routes.
export function getAllStorySlugs() {
  const fileNames = fs.readdirSync(storiesDirectory);

  return fileNames.map((fileName) => {
    const isArabic = fileName.endsWith('-ar.md');
    const slug = isArabic
      ? fileName.replace(/-ar\.md$/, '')
      : fileName.replace(/\.md$/, '');
    const locale = isArabic ? 'ar' : 'en';

    return {
      params: {
        slug,
        locale,
      },
    };
  });
}

export async function getStoryData(slug: string, locale: string): Promise<StoryData> {
  const fileName = locale === 'ar' ? `${slug}-ar.md` : `${slug}.md`;
  const fullPath = path.join(storiesDirectory, fileName);

  // Handle cases where the file might not exist
  if (!fs.existsSync(fullPath)) {
    // A more specific error message can be helpful for debugging
    throw new Error(`Story with slug '${slug}' not found at ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the story metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      firstName: string;
      age: number;
      country: string;
      previousReligion: string;
      profilePhoto: string;
      featured: boolean;
      language: string;
    }),
  };
}
