import { getStoryData, getAllStorySlugs, StoryData } from '@/lib/stories';
import { notFound } from 'next/navigation';
import StoryContentDisplay from '@/components/StoryContentDisplay';

// This function is required for dynamic routes in Next.js App Router
export async function generateStaticParams() {
  const slugs = getAllStorySlugs();
  return slugs;
}

export default async function StoryPage({ params }: { params: { locale: string; slug: string } }) {
  const { slug } = params;
  let story: StoryData;

  try {
    story = await getStoryData(slug);
  } catch (_error) {
    notFound();
  }

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
