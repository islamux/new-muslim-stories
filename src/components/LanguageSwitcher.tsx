'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPath);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          disabled={locale === lang.code}
          className={`
            relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
            flex items-center gap-2 min-w-[100px] justify-center
            ${locale === lang.code
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
            ${locale === lang.code ? 'cursor-default' : 'cursor-pointer'}
            disabled:cursor-default
          `}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="font-sans">{lang.name}</span>
          {locale === lang.code && (
            <div className="absolute inset-0 rounded-md ring-2 ring-green-600 ring-opacity-50" />
          )}
        </button>
      ))}
    </div>
  );
}