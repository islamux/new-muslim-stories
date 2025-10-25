# Project Blueprint: New Muslim Stories

This document outlines the steps to build the "New Muslim Stories" website from scratch. This project is a Next.js application that displays inspiring stories of people who have converted to Islam. The site supports multiple languages (English and Arabic) and fetches story content from local Markdown files.

## Phase 1: Project Setup and Initialization

1.  **Initialize a new Next.js project:**
    *   Use `pnpm create next-app` to start a new Next.js project.
    *   When prompted, choose the following options:
        *   TypeScript
        *   ESLint
        *   Tailwind CSS
        *   `src/` directory
        *   App Router

2.  **Install necessary dependencies:**
    *   **Core dependencies:**
        *   `next-intl`: For internationalization (i18n).
        *   `gray-matter`: To parse metadata from Markdown files.
        *   `remark` and `remark-html`: To convert Markdown to HTML.
        *   `framer-motion`: For animations.
        *   `react-scroll-parallax`: For parallax scrolling effects.
        *   `server-only`: To ensure certain modules are only used on the server.
    *   **Development dependencies:**
        *   `@testing-library/jest-dom`, `@testing-library/react`, `jest`, `jest-environment-jsdom`: For setting up testing.
        *   `autoprefixer`, `postcss`: For Tailwind CSS.

    You can install them using `pnpm`:
    ```bash
    pnpm add next-intl gray-matter remark remark-html framer-motion react-scroll-parallax server-only
    pnpm add -D @testing-library/jest-dom @testing-library/react jest jest-environment-jsdom
    ```

3.  **Set up project structure:**
    *   Create the following directories:
        *   `messages`: To store i18n translation files (`en.json`, `ar.json`).
        *   `src/stories`: To store the story Markdown files.
        *   `src/components`: For reusable React components.
        *   `src/lib`: For utility functions and data fetching logic.

## Phase 2: Internationalization (i18n)

1.  **Create translation files:**
    *   Inside the `messages` directory, create `en.json` and `ar.json`.
    *   Add some basic translations to these files, for example:
        ```json
        // en.json
        {
          "HomePage": {
            "title": "New Muslim Stories"
          }
        }
        ```
        ```json
        // ar.json
        {
          "HomePage": {
            "title": "قصص مسلمين جدد"
          }
        }
        ```

2.  **Configure `next-intl`:**
    *   Create `src/i18n.ts` to configure the locales and load the translation messages.
    *   Create `src/middleware.ts` to handle locale detection and redirection.
    *   Wrap your `next.config.mjs` with the `next-intl` plugin.

## Phase 3: Story Content and Display

1.  **Create sample story files:**
    *   In the `src/stories` directory, create a few Markdown files (e.g., `sample-story.md` and `sample-story-ar.md`).
    *   Each file should have a "frontmatter" section at the top for metadata:
        ```markdown
        ---
        title: "Sample Story"
        firstName: "John"
        age: 30
        country: "USA"
        previousReligion: "Christianity"
        profilePhoto: "/path/to/photo.jpg"
        featured: true
        language: "en"
        ---

        This is the content of the story...
        ```

2.  **Create the story library:**
    *   In `src/lib/stories.ts`, create functions to:
        *   Read the Markdown files from the `src/stories` directory.
        *   Parse the frontmatter using `gray-matter`.
        *   Convert the Markdown content to HTML using `remark` and `remark-html`.
        *   Provide functions to get all stories (`getSortedStoriesData`) and a single story (`getStoryData`).

3.  **Create the story page:**
    *   Use Next.js App Router's dynamic segments to create a page for individual stories at `src/app/[locale]/stories/[slug]/page.tsx`.
    *   Use `generateStaticParams` to pre-render all the story pages.
    *   Fetch the story data using `getStoryData` and display the title, metadata, and content.

## Phase 4: Building the UI

1.  **Create the main layout:**
    *   Modify `src/app/[locale]/layout.tsx` to include the basic HTML structure, header, and footer.
    *   Use `NextIntlClientProvider` to provide the i18n messages to the component tree.

2.  **Create the home page:**
    *   In `src/app/[locale]/page.tsx`, create the home page.
    *   Fetch the sorted list of stories using `getSortedStoriesData`.
    *   Create a `HomePageClient.tsx` component to display the stories in a grid or list format.
    *   Implement a `HeroSection.tsx` component for the top of the home page.

3.  **Create UI components:**
    *   **`LanguageSwitcher.tsx`**: A component to allow users to switch between English and Arabic.
    *   **`StoryContentDisplay.tsx`**: A component to render the HTML content of a story.
    *   **`ClientProviders.tsx`**: A component to wrap the application with client-side providers like `ParallaxProvider`.

## Phase 6: Refactoring and Bug Fixing

1.  **Refactor `next-intl` navigation:**
    *   Created a centralized `src/navigation.ts` file to handle `next-intl` navigation hooks, following the recommended best practices.
    *   Updated all components to import navigation hooks (`usePathname`, `useRouter`, `Link`) from the new `src/navigation.ts` file.

2.  **Fix ESLint configuration:**
    *   Upgraded the ESLint configuration to the new flat config format (`eslint.config.mjs`).
    *   Installed and configured all the necessary ESLint plugins to work with Next.js, TypeScript, and React.
    *   Resolved all the linting errors in the codebase.

3.  **Fix locale switcher:**
    *   Fixed a bug in the `LanguageSwitcher.tsx` component that was causing a 404 error when switching locales.
    *   The component now uses the `useRouter` and `usePathname` hooks from `next/navigation` to correctly construct the new path.


1.  **Write tests:**
    *   Set up Jest for testing using `jest.config.js` and `jest.setup.js`.
    *   Write unit tests for your components (e.g., `HeroSection.test.tsx`).

2.  **Lint your code:**
    *   Use the `pnpm lint` command to check for any ESLint errors.

3.  **Build and deploy:**
    *   Use `pnpm build` to create a production build of your application.
    *   Deploy the application to a hosting provider like Vercel.
