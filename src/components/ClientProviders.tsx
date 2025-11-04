'use client';

import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from 'next-themes';
import PWAInstallPrompt from './PWAInstallPrompt';
import type { ClientProvidersProps } from '@/types/component.types';

export default function ClientProviders({ messages, locale, timeZone, children }: ClientProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone}>
        <ParallaxProvider>
          {children}
          <PWAInstallPrompt />
        </ParallaxProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
