// Story-related type definitions

// Supported locales in the application
export type Locale = 'en' | 'ar';

// Story data structure
export interface StoryData {
  slug: string;
  title: string;
  firstName: string;
  age: number;
  country: string;
  previousReligion: string;
  profilePhoto: string;
  featured: boolean;
  language: Locale;
  contentHtml: string;
}

// Story service return types
export type StoryList = StoryData[];

// Utility type for filtering stories by locale
export type StoriesByLocale = {
  [K in Locale]: StoryData[];
};
