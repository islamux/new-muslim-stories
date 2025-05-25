import { getMessages } from 'next-intl/server';
import ClientProviders from '@/components/ClientProviders';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Import the new component

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params; // Await params before destructuring
  const messages = await getMessages({ locale });

  return (
    <ClientProviders messages={messages} locale={locale}>
      <LanguageSwitcher /> {/* Add the component here */}
      {children}
    </ClientProviders>
  );
}
