import { useEffect, RefObject } from 'react';
import type { UseIntersectionObserver } from '@/types/hook.types';

/**
 * Custom hook for observing element intersection with viewport
 * Adds 'is-visible' class when element enters viewport
 */
export const useIntersectionObserver: UseIntersectionObserver = (
  elementRef,
  options = { rootMargin: '0px', threshold: 0.1 }
) => {
  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      options
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [elementRef, options]);
};

export default useIntersectionObserver;
