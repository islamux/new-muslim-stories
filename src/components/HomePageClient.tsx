'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import type { StoryData } from '@/lib/stories';
import HeroSection from '@/components/HeroSection';

const { Link } = createNavigation();

interface HomePageClientProps {
  stories: StoryData[];
}

export default function HomePageClient({ stories }: HomePageClientProps) {
  const t = useTranslations('Index');
  const commonT = useTranslations('Common');

  const heroRef = useRef<HTMLDivElement>(null);
  const featuredStoriesRef = useRef<HTMLElement>(null);
  const whoAreNewMuslimsRef = useRef<HTMLElement>(null);
  const storyOfTheDayRef = useRef<HTMLElement>(null);
  const whatsNextRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.1 }
    );

    const sections = [
      heroRef.current,
      featuredStoriesRef.current,
      whoAreNewMuslimsRef.current,
      storyOfTheDayRef.current,
      whatsNextRef.current,
    ];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <div ref={heroRef} className="section-animate">
        <HeroSection />
      </div>
      <header className="bg-gray-100 dark:bg-gray-850 shadow-md py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('title')}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section id="stories" ref={featuredStoriesRef} className="my-12 section-animate">
          <h2 className="text-2xl font-semibold text-center mb-6 text-coral-600 dark:text-coral-400">
            {t('featuredStories')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.slug}
                className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">
                  {story.title}
                </h3>
                <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">
                  {story.contentHtml.substring(0, 150)}...
                </p>
                <Link
                  href={`/stories/${story.slug}`}
                  className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline"
                >
                  {commonT('learnMore')}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section ref={whoAreNewMuslimsRef} className="my-12 bg-beige-100 dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-lg shadow-md section-animate">
          <h2 className="font-heading text-3xl text-gray-800 dark:text-beige-50 text-center mb-6">
            {t('whoAreNewMuslims')}
          </h2>
          <p className="font-sans text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('whoAreNewMuslimsDescription')}
          </p>
          <div className="text-center mt-8">
            <Link href="#" className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline">
              {commonT('learnMore')}
            </Link>
          </div>
        </section>

        {/* Story of the Day Section - Redesigned */}
        <section ref={storyOfTheDayRef} className="my-12 section-animate">
          <h2 className="text-2xl font-semibold text-center mb-6 text-coral-600 dark:text-coral-400">
            {commonT('storyOfTheDay')}
          </h2>
          <div className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">{t('dailyStoryTitle')}</h3>
            <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">{t('dailyStoryExcerpt')}</p>
            <Link href="/stories/sample-story" className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline">
              {commonT('learnMore')}
            </Link>
          </div>
        </section>

        {/* What's Next? Section - Restyled */}
        <section ref={whatsNextRef} className="my-12 bg-sky-100 dark:bg-sky-800 p-6 sm:p-8 md:p-12 rounded-lg shadow-md section-animate">
          <h2 className="font-heading text-3xl text-gray-800 dark:text-beige-50 text-center mb-6">
            {t('whatsNext')}
          </h2>
          <p className="font-sans text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('whatsNextDescription')}
          </p>
          <div className="text-center mt-8">
            <Link href="#" className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline">
              {t('contactCenters')}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-10 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-400 dark:text-gray-500 font-sans">
            {t('footerCopyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </div>
  );
}
