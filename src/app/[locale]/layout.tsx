import { ReactNode } from 'react';
import { getLocale, getMessages, getTimeZone } from 'next-intl/server';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import type { Locale } from '@/types';

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone}>
        <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          {children}
          <PWAInstallPrompt />
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
