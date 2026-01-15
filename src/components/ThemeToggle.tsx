'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useHasMounted } from '@/hooks/useHasMounted';
import Button from './Button';

interface IconProps {
  theme: string | undefined;
}

const SunIcon = ({ theme }: IconProps) => (
  <svg
    className={`w-5 h-5 text-yellow-500 transition-all duration-200 ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
      }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = ({ theme }: IconProps) => (
  <svg
    className={`w-5 h-5 text-blue-400 transition-all duration-200 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
      }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

// --- 
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Common');
  const mounted = useHasMounted();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button
        disabled
        className='hover:bg-gray-200 dark:hover:bg-gray-700'
      >
        {t('theme')}
      </Button>
    );
  }
  return (
    <Button
      onClick={toggleTheme}
      className='hover:bg-gray-200 dark:hover:bg-gray-700'
    >
      <div className="flex flex-col items-center justify-center w-5 h-5">
        <SunIcon theme={theme} />
        <MoonIcon theme={theme} />
      </div>
      <span className="ml-2">{theme === 'light' ? t('dark') : t('light')} {t('theme')}</span>
    </Button>
  );
}
