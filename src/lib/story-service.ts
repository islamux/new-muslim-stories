import type { StoryData } from './stories';
import { parseStoryFile, getStoryFileNames } from './story-parser';

/**
 * Service for managing story data operations
 */
export class StoryService {
  /**
   * Get all stories for a specific locale, sorted alphabetically
   */
  static async getSortedStoriesData(locale: string): Promise<StoryData[]> {
    const fileNames = getStoryFileNames();

    const allStoriesData = await Promise.all(
      fileNames.map((fileName) => parseStoryFile(fileName))
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

  /**
   * Get a specific story by slug and locale
   */
  static async getStoryData(slug: string, locale: string): Promise<StoryData> {
    const fileName = locale === 'ar' ? `${slug}-ar.md` : `${slug}.md`;

    try {
      return await parseStoryFile(fileName);
    } catch (error) {
      throw new Error(`Story with slug '${slug}' not found`);
    }
  }

  /**
   * Get all story slugs with their locales for static generation
   */
  static getAllStorySlugs() {
    const fileNames = getStoryFileNames();

    return fileNames.map((fileName) => {
      const { slug, locale } = extractSlugAndLocale(fileName);

      return {
        params: {
          slug,
          locale,
        },
      };
    });
  }

  /**
   * Get featured stories for a specific locale
   */
  static async getFeaturedStories(locale: string, limit: number = 6): Promise<StoryData[]> {
    const allStories = await this.getSortedStoriesData(locale);

    return allStories
      .filter(story => story.featured)
      .slice(0, limit);
  }

  /**
   * Get stories by country
   */
  static async getStoriesByCountry(locale: string, country: string): Promise<StoryData[]> {
    const allStories = await this.getSortedStoriesData(locale);

    return allStories.filter(story =>
      story.country.toLowerCase() === country.toLowerCase()
    );
  }

  /**
   * Get all unique countries
   */
  static async getAllCountries(locale: string): Promise<string[]> {
    const allStories = await this.getSortedStoriesData(locale);
    const countries = new Set(allStories.map(story => story.country));

    return Array.from(countries).sort();
  }
}

// Re-export the parser's helper function
import { extractSlugAndLocale } from './story-parser';
