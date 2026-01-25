'use client';

export interface StorySections {
  lifeBeforeIslam: string;
  momentOfGuidance: string;
  reflections: string;
}

/**
 * Custom hook to parse story content HTML into sections
 * Extracts content between h3 headings into separate sections
 */
export function useStorySections(contentHtml: string): StorySections {
  // Split the contentHtml into sections based on the headings
  const sections = contentHtml.split(/<h[23]>(.*?)<\/h[23]>/g);

  return {
    lifeBeforeIslam: sections[2] || '',
    momentOfGuidance: sections[4] || '',
    reflections: sections[6] || '',
  };
}
