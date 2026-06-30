'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const PLAUSIBLE_URL = process.env.NEXT_PUBLIC_PLAUSIBLE_URL || 'https://plausible.io';
const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '';

declare global {
  interface Window {
    plausible?: (
      event: string,
      data?: { props?: Record<string, string>; callback?: () => void },
    ) => void;
  }
}

function loadPlausibleScript(): void {
  if (typeof window === 'undefined' || window.plausible || !DOMAIN) return;

  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = DOMAIN;
  script.src = `${PLAUSIBLE_URL}/js/script.js`;
  document.head.appendChild(script);

  window.plausible = function q(
    event: string,
    data?: { props?: Record<string, string>; callback?: () => void },
  ) {
    (q as unknown as { q: unknown[] }).q = (q as unknown as { q: unknown[] }).q || [];
    (q as unknown as { q: unknown[] }).q.push([event, data]);
  };
}

export function trackEvent(eventName: string, props?: Record<string, string>): void {
  if (typeof window === 'undefined' || !window.plausible) return;
  window.plausible(eventName, props ? { props } : undefined);
}

export default function PlausibleAnalytics(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    loadPlausibleScript();
  }, []);

  useEffect(() => {
    if (!DOMAIN || !pathname) return;

    const url = searchParams?.size ? `${pathname}?${searchParams.toString()}` : pathname;

    trackEvent('pageview', { url });
  }, [pathname, searchParams]);

  return null;
}
