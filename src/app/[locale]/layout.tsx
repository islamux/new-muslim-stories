import { ReactNode } from 'react';
import { getLocale, getMessages, getTimeZone } from 'next-intl/server';
import ClientProviders from '@/components/ClientProviders';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <ClientProviders messages={messages} locale={locale} timeZone={timeZone}>
      <LanguageSwitcher />
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>{children}</div>
    </ClientProviders>
  );
}