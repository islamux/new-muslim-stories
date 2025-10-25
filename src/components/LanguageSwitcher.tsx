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

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}>
      <button
        onClick={() => switchLocale('en')}
        disabled={locale === 'en'}
        style={{
          fontWeight: locale === 'en' ? 'bold' : 'normal',
          margin: '0 5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        English
      </button>
      <button
        onClick={() => switchLocale('ar')}
        disabled={locale === 'ar'}
        style={{
          fontWeight: locale === 'ar' ? 'bold' : 'normal',
          margin: '0 5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        العربية
      </button>
    </div>
  );
}