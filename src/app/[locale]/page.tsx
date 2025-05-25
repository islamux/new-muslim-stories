'use client';

import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'; // Updated import for next-intl Link

export default function Home() {
  const t = useTranslations('Index');
  const commonT = useTranslations('Common');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-green-700">
            {t('title')}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Stories Section */}
        <section className="my-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gold-600">
            {t('featuredStories')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for Story Cards */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-medium">Story Card 1</h3>
              <p className="text-gray-600">Short description...</p>
              <Link href="/stories/sample-story" className="text-blue-500 hover:underline">
                {commonT('learnMore')}
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-medium">Story Card 2</h3>
              <p className="text-gray-600">Short description...</p>
              <Link href="/stories/sample-story" className="text-blue-500 hover:underline">
                {commonT('learnMore')}
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-medium">Story Card 3</h3>
              <p className="text-gray-600">Short description...</p>
              <Link href="/stories/sample-story" className="text-blue-500 hover:underline">
                {commonT('learnMore')}
              </Link>
            </div>
          </div>
        </section>

        {/* Who Are the New Muslims? Section */}
        <section className="my-12 bg-beige-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
            {t('whoAreNewMuslims')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            This section will provide an overview of new Muslims, their diverse backgrounds, and the common threads that lead them to Islam. It will highlight the beauty of their journeys and the peace they find.
          </p>
          <div className="text-center mt-6">
            <Link href="#" className="text-blue-500 hover:underline">
              {commonT('learnMore')}
            </Link>
          </div>
        </section>

        {/* Story of the Day Section */}
        <section className="my-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gold-600">
            {commonT('storyOfTheDay')}
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-medium">Daily Featured Story Title</h3>
            <p className="text-gray-600">A brief excerpt from today's inspiring story.</p>
            <Link href="/stories/sample-story" className="text-blue-500 hover:underline">
              {commonT('learnMore')}
            </Link>
          </div>
        </section>

        {/* What's Next? Section */}
        <section className="my-12 bg-sky-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
            {t('whatsNext')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you are inspired by these stories and wish to learn more about Islam or connect with local Islamic communities, here are some resources.
          </p>
          <div className="text-center mt-6">
            <Link href="#" className="text-blue-500 hover:underline">
              {t('contactCenters')}
            </Link>
          </div>
        </section>
      </main>


      <footer className="bg-gray-800 text-white py-6 text-center">
      </footer>
    </div>
  );
}
