
"use client";

import type { Translations, NestedTranslations } from "@/types/translations";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type LanguageCode = "en" | "tj" | "ru" | "fa"; // Export this type

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
  isLoaded: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const I18N_STORAGE_KEY = 'app-language';

// Helper function to safely get nested values
const getNestedValue = (obj: NestedTranslations, path: string): string | undefined => {
  const keys = path.split('.');
  let current: any = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
};


export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadTranslations = useCallback(async (lang: LanguageCode) => {
    try {
      setIsLoaded(false);
      const module = await import(`@/locales/${lang}.json`);
      setTranslations(module.default as Translations);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      // Fallback to English if current lang fails
      if (lang !== 'en') {
        try {
            const module = await import(`@/locales/en.json`);
            setTranslations(module.default as Translations);
        } catch (fallbackError) {
            console.error(`Failed to load fallback English translations:`, fallbackError);
            setTranslations(null); // Set to null if even fallback fails
        }
      } else {
        setTranslations(null); // Set to null if loading English fails
      }
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem(I18N_STORAGE_KEY) as LanguageCode | null;
    const validLanguages: LanguageCode[] = ["en", "tj", "ru", "fa"];
    const initialLang = storedLang && validLanguages.includes(storedLang) ? storedLang : 'en';
    
    setLanguageState(initialLang);
    loadTranslations(initialLang);
    if (typeof document !== 'undefined') {
        document.documentElement.lang = initialLang;
    }
  }, [loadTranslations]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(I18N_STORAGE_KEY, lang);
    loadTranslations(lang);
    if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
    }
  };

  const t = useCallback((key: string, replacements?: Record<string, string>): string => {
    if (!isLoaded || !translations) {
        // During loading or if translations failed to load, return the key or a loading indicator
        // console.warn(`Translations not ready for key "${key}" (lang: ${language}, loaded: ${isLoaded})`);
        return key; 
    }

    let translatedString = getNestedValue(translations as unknown as NestedTranslations, key);

    if (translatedString === undefined) {
      console.warn(`Translation key "${key}" not found for language "${language}".`);
      return key; // Key not found
    }

    if (replacements) {
      return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
        return acc.replace(new RegExp(`{${placeholder}}`, 'g'), value);
      }, translatedString);
    }
    return translatedString;
  }, [translations, language, isLoaded]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isLoaded }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
