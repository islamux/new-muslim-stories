"use client";

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useHasMounted } from '@/hooks/useHasMounted';

const HeroSection = () => {
  const t = useTranslations('Hero');
  const hasMounted = useHasMounted(); // avoid headration issues

  // Add debug logging here 
  // console.log('HeroSection - Available translation:', Object.keys(useTranslations('Hero').messages));

  // console.log('HeroSection - Translation:', useTranslations('Hero translation Object').messages);
  // console.log('Provider messages:', messages);
  // console.log('Translation loading order:', performance.now());
  // console.log('HeroSection - Current locale:', useLocale());
  // console.log('HeroSection - Translation for headline:', t('headline'));

  if (!hasMounted) return null;
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-coral-400 to-sky-400">
          {t('headline')}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 font-sans">
          {t('subheadline')}
        </p>
        <a
          href="#stories"
          className="bg-coral-500 hover:bg-coral-600 dark:bg-coral-600 dark:hover:bg-coral-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg"
        >
          {t('exploreStories')}
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
