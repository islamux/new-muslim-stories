# i18n Namespace Strategy

This document outlines the recommended strategy for managing translation namespaces in this project.

## Analysis of the Current Namespace Structure

The current internationalization (i18n) setup uses multiple namespaces within the JSON translation files (`messages/en.json`, `messages/ar.json`). For example:

-   `const t = useTranslations('Hero');` in `HeroSection.tsx`
-   `const t = useTranslations('Index');` in `WhatsNext.tsx`
-   `const t = useTranslations('Common');` for shared translations.

This is a deliberate and recommended practice for several reasons:

1.  **Organization and Co-location:** It keeps translations grouped by the component or page they belong to. When you work on the `HeroSection`, you know that all its related text is under the `Hero` namespace. This makes finding and updating text much easier.

2.  **Scalability:** As the application grows, having a single, massive `Common.json` file becomes very difficult to manage. Splitting translations into logical namespaces keeps the files clean and manageable.

3.  **Performance:** `next-intl` is optimized to load only the necessary translations for a given page. By using namespaces, you ensure that a page only loads the translations it actually needs, which can improve initial load times. For instance, the story page doesn't need to load the translations for the `HeroSection`.

4.  **Reduced Conflicts:** When multiple developers work on different features, separating translations by namespace reduces the chance of merge conflicts in the JSON files.

## Evaluating the Single Namespace Proposal

Your suggestion to consolidate everything into a single `Common` namespace is understandable and has one primary benefit:

*   **Initial Simplicity:** You don't have to decide where to put a new translation; it just goes into `Common`.

However, this approach has significant downsides, especially for a project that is expected to grow:

*   **Poor Organization:** The `Common` namespace would become a "junk drawer" for all text in the application, making it hard to find anything.
*   **Maintenance Overhead:** A single large file is more difficult to read, navigate, and maintain.
*   **Lost Context:** It becomes unclear which component or page uses a specific translation, making it risky to change or remove text.

## Recommendation

**I strongly recommend continuing with the current strategy of using multiple, logical namespaces.**

The current structure is excellent:
*   **`Index`**: For content specific to the home page.
*   **`Hero`**: For the `HeroSection` component.
*   **`Story`**: For text related to the individual story pages.
*   **`Common`**: For truly generic text that is reused across many different, unrelated parts of the site (e.g., "Learn More", "Search").

This is a professional and scalable approach that will serve the project well in the long run.

### A Note on Folder Structure

You also mentioned changing the folder structure to `[locale]/common`. It's important to clarify that i18n namespaces are defined as keys within the `messages/*.json` files and are not related to the file-system routing in the `app/[locale]/` directory. The page structure and the translation structure are two separate things.
