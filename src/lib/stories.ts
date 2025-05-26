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

// Generates all possible story paths (slugs and locales) based on frontmatter.
// This is used by Next.js's generateStaticParams to pre-render dynamic routes.
export function getAllStorySlugs() {
  // Get file names under /stories
  const fileNames = fs.readdirSync(storiesDirectory);
  const allSlugs = fileNames.flatMap((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(storiesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the story metadata section
    const matterResult = matter(fileContents);
    // Explicitly type frontmatter to ensure slug and language are checked
    const frontmatter = matterResult.data as { slug?: string; language?: string; [key: string]: any };

    // Ensure slug and language exist in frontmatter to create a valid path
    // The 'language' field from frontmatter is used as 'locale' in the path parameters.
    if (frontmatter.slug && frontmatter.language) {
      return [{ params: { slug: frontmatter.slug, locale: frontmatter.language } }];
    }
    return []; // Return an empty array if slug or language is missing, effectively skipping this file
  });
  return allSlugs;
}

// Fetches data for a single story based on its slug and locale (language from frontmatter).
export async function getStoryData(slug: string, locale: string): Promise<StoryData> {
  // ADD THIS LINE FOR DIAGNOSTICS:
  console.log(`[getStoryData] Attempting to fetch story with slug: "${slug}", locale: "${locale}"`);

  const fileNames = fs.readdirSync(storiesDirectory);

  for (const fileName of fileNames) {
    const fullPath = path.join(storiesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    // Assume frontmatter structure matches StoryData, which includes 'slug' and 'language'
    const frontmatter = matterResult.data as StoryData;

    // Match story if both slug and language (as locale) from frontmatter match the arguments
    if (frontmatter.slug === slug && frontmatter.language === locale) {
      const processedContent = await remark().use(html).process(matterResult.content);
      const contentHtml = processedContent.toString();
      // Return the complete story data, ensuring frontmatter fields are spread
      // and slug/language from frontmatter are explicitly included for clarity.
      return {
        ...frontmatter, // Spread all fields from frontmatter (title, firstName, age, etc.)
        contentHtml,    // Add the processed HTML content
        slug: frontmatter.slug,         // Ensure slug from frontmatter is used
        language: frontmatter.language, // Ensure language from frontmatter is used
      };
    }
  }
  // If no matching story is found after checking all files, throw an error.
  // This will be caught by the StoryPage component, which should then render a 404 page.
  throw new Error(`Story with slug '${slug}' and locale '${locale}' not found.`);
}
