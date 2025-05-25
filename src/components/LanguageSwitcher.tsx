'use client';

import { createNavigation } from 'next-intl/navigation';
import { useLocale } from 'next-intl';

const { useRouter, usePathname } = createNavigation();

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}>
      <strong>Language Switcher:</strong>
      <button 
        onClick={() => switchLocale('en')} 
        style={{ fontWeight: locale === 'en' ? 'bold' : 'normal', margin: '0 5px' }}
      >
        English
      </button>
      <button 
        onClick={() => switchLocale('ar')} 
        style={{ fontWeight: locale === 'ar' ? 'bold' : 'normal', margin: '0 5px' }}
      >
        العربية
      </button>
    </div>
  );
}
