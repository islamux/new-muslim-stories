'use client';
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useHasMounted } from "./useHasMounted";

interface UseThemeToggleReturn {
  theme: string | undefined;
  toggleTheme: () => void;
  mounted: boolean;
  t: (key: string) => string;
}

export function UseThemeToggle(): UseThemeToggleReturn {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Common");
  const mounted = useHasMounted();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    toggleTheme,
    mounted,
    t
  };
}

