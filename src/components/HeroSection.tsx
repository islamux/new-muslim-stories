"use client";

import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-gray-800 to-gray-950 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-coral-400 to-sky-400">
          Discover Inspiring Journeys
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10 font-sans">
          Explore stories of individuals embracing new beginnings, overcoming challenges, and creating positive change in their lives and communities.
        </p>
        <button className="bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-lg">
          Explore Stories
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
