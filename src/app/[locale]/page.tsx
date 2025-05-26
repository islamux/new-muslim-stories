'use client';

import { useEffect, useRef } from 'react'; // Import useEffect and useRef
import { useTranslations } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';

import HeroSection from '@/components/HeroSection';
const { Link } = createNavigation();

export default function Home() {
  const t = useTranslations('Index');
  const commonT = useTranslations('Common');

  // Refs for sections to animate
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
            observer.unobserve(entry.target); // Optional: unobserve after animation
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const sections = [
      heroRef.current,
      featuredStoriesRef.current,
      whoAreNewMuslimsRef.current,
      storyOfTheDayRef.current,
      whatsNextRef.current,
    ];

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      {/* Wrap HeroSection's content or HeroSection itself if it forwards refs */}
      {/* For simplicity, assuming HeroSection is a direct div or we wrap its output if needed */}
      {/* If HeroSection is complex, it might need internal ref handling or forwardRef */}
      <div ref={heroRef} className="section-animate">
        <HeroSection />
      </div>
      {/* Header - Enhanced */}
      <header className="bg-gray-100 dark:bg-gray-850 shadow-md py-6">
        <div className="container mx-auto px-4 text-center">
          {/* Changed h1 to div for semantic correctness (Hero has the main h1) */}
          <div className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('title')}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Stories Section */}
        <section ref={featuredStoriesRef} className="my-12 section-animate">
          <h2 className="text-2xl font-semibold text-center mb-6 text-coral-600 dark:text-coral-400">
            {t('featuredStories')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for Story Cards - Redesigned */}
            <div className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
              <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">Story Card 1</h3>
              <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">Short description...</p>
              <Link href="/stories/sample-story" className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline">
                {commonT('learnMore')}
              </Link>
            </div>
            <div className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
              <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">Story Card 2</h3>
              <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">Short description...</p>
              <Link href="/stories/sample-story" className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline">
                {commonT('learnMore')}
              </Link>
            </div>
            <div className="bg-beige-100 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
              <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">Story Card 3</h3>
              <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">Short description...</p>
              <Link href="/stories/sample-story" className="font-semibold text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-500 hover:underline">
                {commonT('learnMore')}
              </Link>
            </div>
          </div>
        </section>

        {/* Who Are the New Muslims? Section - Restyled */}
        <section ref={whoAreNewMuslimsRef} className="my-12 bg-beige-100 dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-lg shadow-md section-animate">
          <h2 className="font-heading text-3xl text-gray-800 dark:text-beige-50 text-center mb-6">
            {t('whoAreNewMuslims')}
          </h2>
          <p className="font-sans text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            This section will provide an overview of new Muslims, their diverse backgrounds, and the common threads that lead them to Islam. It will highlight the beauty of their journeys and the peace they find.
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
            <h3 className="font-heading text-xl text-gray-800 dark:text-beige-50 mb-3">Daily Featured Story Title</h3>
            <p className="font-sans text-gray-700 dark:text-gray-300 mb-4">A brief excerpt from today's inspiring story.</p>
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
            If you are inspired by these stories and wish to learn more about Islam or connect with local Islamic communities, here are some resources.
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
            © {new Date().getFullYear()} Discover Islam. All Rights Reserved.
          </p>
          {/* Optional: Add simple nav/social links here if desired in future */}
        </div>
      </footer>
    </div>
  );
}
