'use client';

import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function TopNav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Language Switcher */}
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>

          {/* Right side - Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
