'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ParallaxProvider } from 'react-scroll-parallax';

interface ClientProvidersProps {
  messages: Record<string, string>;
  locale: string;
  children: React.ReactNode;
}

export default function ClientProviders({ messages, locale, children }: ClientProvidersProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </NextIntlClientProvider>
  );
}
