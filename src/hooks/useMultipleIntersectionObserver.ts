import { useEffect } from 'react';

interface UseMultipleIntersectionObserver {
  (
    refs: Array<{ ref: React.RefObject<HTMLElement>; id?: string }>,
    options?: IntersectionObserverInit
  ): void;
}

/**
 * Custom hook for observing multiple elements with intersection observer
 * Adds 'is-visible' class when each element enters viewport
 */
export const useMultipleIntersectionObserver: UseMultipleIntersectionObserver = (
  refs,
  options = { rootMargin: '0px', threshold: 0.1 }
) => {
  useEffect(() => {
    // Filter out null refs
    const validRefs = refs.filter((refItem) => refItem.ref.current);

    if (validRefs.length === 0) return;

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

    // Observe all valid elements
    validRefs.forEach((refItem) => {
      if (refItem.ref.current) {
        observer.observe(refItem.ref.current);
      }
    });

    // Cleanup function
    return () => {
      validRefs.forEach((refItem) => {
        if (refItem.ref.current) {
          observer.unobserve(refItem.ref.current);
        }
      });
    };
  }, [refs, options]);
};

export default useMultipleIntersectionObserver;
