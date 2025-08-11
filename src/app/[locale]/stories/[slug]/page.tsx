import { getStoryData, getAllStorySlugs, StoryData } from '@/lib/stories';
import { notFound } from 'next/navigation';
import StoryContentDisplay from '@/components/StoryContentDisplay';



// This function is required for dynamic routes in Next.js App Router (Server Components).
// It tells Next.js which dynamic segments (slugs and locales) to pre-render at build time.
// This is crucial for static site generation (SSG) or improving performance for common routes.
export async function generateStaticParams() {
  // getAllStorySlugs is expected to return an array of objects,
  // where each object contains the 'slug' and potentially 'locale' for a story.
  // Example: [{ slug: 'aisha-story-of-peace', locale: 'en' }, { slug: 'another-story', locale: 'en' }]
  const entries = getAllStorySlugs();
  // Next.js App Router expects an array of plain params objects
  return entries.map((entry) => entry.params);
}

// This is the main React component for displaying a single story page.
// It's an async Server Component, allowing us to fetch data directly within it.
export default async function StoryPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { slug, locale } = params;
  let story: StoryData;

  try {
    story = await getStoryData(slug, locale);
  } catch (error) {
    console.error(`Error fetching story data for slug "${slug}":`, error);
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
