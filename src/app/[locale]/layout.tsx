import { getMessages } from 'next-intl/server';
import ClientProviders from '@/components/ClientProviders';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Import the new component

// Defines the expected shape of the 'params' object for this layout.
// For a route like /[locale]/..., Next.js should provide 'locale' as a string.
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string }; // Type 'params' as the resolved object.
}

export default async function LocaleLayout({
  children,
  params, // 'params' is typed as { locale: string } via LocaleLayoutProps
}: Readonly<LocaleLayoutProps>) {
  // Although 'params' is typed as an object, runtime errors suggest it might
  // behave like a Promise or its properties are not immediately available.
  // To robustly handle this and ensure 'locale' is resolved, we 'await params'.
  // This is a workaround for the persistent "params should be awaited" errors
  // encountered in this project.
  const resolvedParams = await params;

  // Destructure 'locale' from the 'resolvedParams' object.
  const { locale } = resolvedParams;

  // Fetch localized messages using the resolved 'locale'.
  const messages = await getMessages({ locale });

  return (
    <ClientProviders messages={messages} locale={locale}>
      <LanguageSwitcher /> {/* LanguageSwitcher component for changing locales */}
      {children}
    </ClientProviders>
  );
}
