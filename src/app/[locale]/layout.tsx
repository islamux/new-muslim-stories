// Import the project-specific configured instance of getRequestConfig from src/i18n.ts
import getIntlConfig from '@/i18n'; // Using path alias as '@/' points to 'src/'
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
  // Renaming to routeLocale to avoid confusion with locale from intlConfig.
  const { locale: routeLocale } = resolvedParams;

  // Fetch the full internationalization configuration using the resolved 'routeLocale'.
  // Use the project-specific getIntlConfig from src/i18n.ts (aliased as getMessages in original setup).
  // This ensures that our message loading logic (e.g., from JSON files) and timezone are applied.
  // This object is expected to contain:
  // - messages: The localized messages for the given locale.
  // - locale: The actual locale string (e.g., 'en', 'ar'), confirming what was processed.
  // - timeZone: The configured time zone string (e.g., 'America/New_York', 'Asia/Dubai').
  const intlConfig = await getIntlConfig({ locale: routeLocale });

  // Pass the specific properties from intlConfig to ClientProviders.
  // - intlConfig.messages: Provides the translations.
  // - intlConfig.locale: Ensures the client-side provider uses the same locale that server-side rendering determined.
  // - intlConfig.timeZone: Provides the time zone for date/time formatting on the client.
  return (
    <ClientProviders
      messages={intlConfig.messages}
      locale={intlConfig.locale}
      timeZone={intlConfig.timeZone}
    >
      <LanguageSwitcher /> {/* LanguageSwitcher component for changing locales */}
      {children}
    </ClientProviders>
  );
}
