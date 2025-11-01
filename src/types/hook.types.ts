// Custom hook type definitions

import { RefObject } from 'react';

// Intersection observer options
export interface UseIntersectionObserver {
  (elementRef: RefObject<HTMLElement>, options?: IntersectionObserverInit): void;
}

// Multiple intersection observer refs
export interface RefItem {
  ref: RefObject<HTMLElement>;
  id?: string;
}

export interface UseMultipleIntersectionObserver {
  (refs: RefItem[], options?: IntersectionObserverInit): void;
}

// Has mounted hook return type
export interface UseHasMountedReturn {
  hasMounted: boolean;
}
