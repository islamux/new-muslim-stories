import { ReactNode } from 'react';
import { getMessages, getTimeZone, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import PWAInstall from '@/components/PWAInstall';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering and set locale for all next-intl calls
  setRequestLocale(locale);

  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone}>
        <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          {children}
          <PWAInstall />
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
