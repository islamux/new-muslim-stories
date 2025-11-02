// Component prop type definitions

import type { Locale, StoryData } from './story.types';

// Common prop types
export interface WithClassName {
  className?: string;
}

export interface WithId {
  id?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

// Theme type
export type Theme = 'light' | 'dark';

// Button component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// Featured stories component props
export interface FeaturedStoriesProps {
  stories: StoryData[];
}

// Story card component props
export interface StoryCardProps {
  story: StoryData;
}

// Story content display component props
export interface StoryContentDisplayProps {
  story: StoryData;
}

// Client providers props
export interface ClientProvidersProps {
  messages: any; // AbstractIntlMessages from next-intl
  locale: Locale;
  timeZone: string;
  children: React.ReactNode;
}

// Section component props
export interface SectionProps extends WithClassName, WithId {
  children: React.ReactNode;
}

// Homepage client props
export interface HomePageClientProps {
  stories: StoryData[];
}

// Language switcher props (for future extensibility)
export interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange?: (locale: Locale) => void;
}

// Theme toggle props (for future extensibility)
export interface ThemeToggleProps {
  initialTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
}

// Profile header component props
export interface ProfileHeaderProps {
  story: StoryData;
}

// Story of the day component props
export interface StoryOfTheDayProps {
  story: StoryData;
}
