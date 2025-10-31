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
  contentHtml: string;
}

// Import StoryService locally to create function aliases
import { StoryService } from './story-service';

// Re-export from story-service for backward compatibility
export { StoryService } from './story-service';

// Legacy function exports - delegate to StoryService
export const getSortedStoriesData = StoryService.getSortedStoriesData;
export const getStoryData = StoryService.getStoryData;
export const getAllStorySlugs = StoryService.getAllStorySlugs;
