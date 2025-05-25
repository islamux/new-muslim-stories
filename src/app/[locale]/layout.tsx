import { getMessages } from 'next-intl/server';
import ClientProviders from '@/components/ClientProviders';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Import the new component

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<unknown>; // Use unknown instead of any to satisfy ESLint
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale } = params as unknown as { locale: string }; // Cast params to expected runtime type
  const messages = await getMessages({ locale });

  return (
    <ClientProviders messages={messages} locale={locale}>
      <LanguageSwitcher /> {/* Add the component here */}
      {children}
    </ClientProviders>
  );
}
