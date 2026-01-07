import { ReactNode } from 'react';
import { getMessages, getTimeZone } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
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
