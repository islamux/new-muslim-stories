import { getStoryData, getAllStorySlugs, StoryData } from '@/lib/stories';
import { notFound } from 'next/navigation';
import StoryContentDisplay from '@/components/StoryContentDisplay';

// Defines the expected shape of the 'params' object once it's resolved.
// For a route like /[locale]/stories/[slug], Next.js should provide 'locale' and 'slug'.
interface StoryPageProps {
  params: { locale: string; slug: string };
  // Add other props if any, e.g., searchParams if used
}

// This function is required for dynamic routes in Next.js App Router (Server Components).
// It tells Next.js which dynamic segments (slugs and locales) to pre-render at build time.
// This is crucial for static site generation (SSG) or improving performance for common routes.
export async function generateStaticParams() {
  // getAllStorySlugs is expected to return an array of objects,
  // where each object contains the 'slug' and potentially 'locale' for a story.
  // Example: [{ slug: 'aisha-story-of-peace', locale: 'en' }, { slug: 'another-story', locale: 'en' }]
  const slugs = getAllStorySlugs();
  return slugs;
}

// This is the main React component for displaying a single story page.
// It's an async Server Component, allowing us to fetch data directly within it.
export default async function StoryPage({ params }: Readonly<StoryPageProps>) {
  // According to Next.js documentation for async Server Components, 'params' should be a resolved object.
  // However, runtime errors suggest 'params' (or its properties) are not resolved when accessed.
  // As a workaround, we explicitly await 'params' here.
  // This is not a typical pattern for page props if types are correctly inferred by Next.js,
  // but it's an attempt to resolve the persistent "params should be awaited" error.
  const resolvedParams = await params;

  // Now, destructure 'slug' and 'locale' from the 'resolvedParams' object.
  // This assumes 'params' resolves to an object matching the StoryPageProps['params'] type.
  const { slug, locale } = resolvedParams;

  // 'locale' can be used if needed later, e.g., for fetching localized story data.
  // For now, it's extracted to ensure 'resolvedParams' has the expected shape.
  let story: StoryData; // This will hold the data for the story we fetch.

  try {
    // Diagnostic log to check slug and locale values immediately before calling getStoryData
    console.log(`[StoryPage] Calling getStoryData with slug: "${slug}", locale: "${locale}"`);
    // Attempt to fetch the story data using both 'slug' and 'locale'.
    // getStoryData is an async function, so we use 'await'.
    story = await getStoryData(slug, locale); // Ensuring locale is passed
  } catch (error) {
    // If fetching the story data fails (e.g., story not found for the given slug, or any other error),
    // we log the error for server-side debugging and then call notFound().
    // notFound() is a Next.js function that will render the nearest 404 page (not-found.tsx).
    console.error(`Error fetching story data for slug "${slug}" (locale: ${locale}):`, error);
    notFound();
  }

  // If story data is successfully fetched, we render the page content.
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header - Re-use or create a dedicated header component */}
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-green-700">
            {story.title}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <StoryContentDisplay story={story} />
      </main>

      {/* Footer - Re-use or create a dedicated footer component */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} New Muslim Stories. All rights reserved.</p>
      </footer>
    </div>
  );
}
