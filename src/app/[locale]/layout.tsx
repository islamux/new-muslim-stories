import { getMessages } from 'next-intl/server';
import ClientProviders from '@/components/ClientProviders';

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
      {children}
    </ClientProviders>
  );
}
