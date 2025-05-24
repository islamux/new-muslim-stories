import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` is one of our configured `locales`
  const currentLocale = locale || 'en'; // Provide a fallback or handle undefined

  if (!locales.includes(currentLocale)) notFound();

  const messages = (await import(`../messages/${currentLocale}.json`)).default;
  console.log(`i18n.ts - Loaded messages for ${currentLocale}:`, messages);

  return {
    locale: currentLocale,
    messages,
    timeZone: 'Asia/Aden', // Added timeZone
  };
});
