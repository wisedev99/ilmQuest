"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ColorTheme = 'sky' | 'crimson' | 'emerald';

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

const COLOR_THEME_STORAGE_KEY = 'app-color-theme';

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('sky');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem(COLOR_THEME_STORAGE_KEY) as ColorTheme | null;
    if (storedTheme && ['sky', 'crimson', 'emerald'].includes(storedTheme)) {
      setColorThemeState(storedTheme);
      document.documentElement.setAttribute('data-color-theme', storedTheme);
    } else {
      document.documentElement.setAttribute('data-color-theme', 'sky');
    }
  }, []);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-color-theme', theme);
  };
  
  if (!isMounted) {
     // Prevent hydration mismatch by rendering nothing or a loader on the server/initial client render
    return null;
  }

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
}
