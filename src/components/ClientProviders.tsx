'use client';

import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { ParallaxProvider } from 'react-scroll-parallax';

interface ClientProvidersProps {
  messages: AbstractIntlMessages;
  locale: string;
  timeZone: string;
  children: React.ReactNode;
}

export default function ClientProviders({ messages, locale, timeZone, children }: ClientProvidersProps) {
  // Diagnostic log to inspect the props received by ClientProviders,
  // especially to check if 'locale' is defined before being passed to NextIntlClientProvider.
  return (
    <NextIntlClientProvider
    messages={messages}
    locale={locale}
    timeZone={timeZone}
  >
    <ParallaxProvider>{children}</ParallaxProvider>
    </NextIntlClientProvider>
  );
}
