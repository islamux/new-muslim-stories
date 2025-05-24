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

export async function getSortedStoriesData(): Promise<StoryData[]> {
  // Get file names under /stories
  const fileNames = fs.readdirSync(storiesDirectory);
  const allStoriesData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

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
  // Sort stories by title alphabetically
  return allStoriesData.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else {
      return 1;
    }
  });
}

export function getAllStorySlugs() {
  const fileNames = fs.readdirSync(storiesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getStoryData(slug: string): Promise<StoryData> {
  const fullPath = path.join(storiesDirectory, `${slug}.md`);
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
}
