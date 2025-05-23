
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
const VALID_LANGUAGES: LanguageCode[] = ["en", "tj", "ru", "fa"];

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
  const [translations, setTranslations] = useState<Translations | {}>({}); // Initialize with empty object
  const [isLoaded, setIsLoaded] = useState(false);

  const loadTranslations = useCallback(async (langToLoad: LanguageCode) => {
    let effectiveLang = langToLoad;
    if (!VALID_LANGUAGES.includes(langToLoad)) {
      console.error(`Attempted to load translations for invalid language: ${langToLoad}. Defaulting to 'en'.`);
      effectiveLang = 'en';
    }

    setIsLoaded(false);
    try {
      // Dynamically import the JSON file
      const module = await import(`@/locales/${effectiveLang}.json`);
      setTranslations(module.default as Translations);
    } catch (error) {
      console.error(`Failed to load translations for ${effectiveLang}:`, error);
      if (effectiveLang !== 'en') {
        try {
          console.warn(`Attempting to load fallback English translations.`);
          const module = await import(`@/locales/en.json`);
          setTranslations(module.default as Translations);
        } catch (fallbackError) {
          console.error(`Failed to load fallback English translations:`, fallbackError);
          setTranslations({}); 
        }
      } else {
        setTranslations({});
      }
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    let storedLang: LanguageCode | null = null;
    try {
      // Ensure this code only runs on the client
      if (typeof window !== 'undefined') {
        storedLang = localStorage.getItem(I18N_STORAGE_KEY) as LanguageCode | null;
      }
    } catch (e) {
      console.warn("Could not access localStorage to get language:", e);
    }
    
    const initialLang = storedLang && VALID_LANGUAGES.includes(storedLang) ? storedLang : 'en';
    
    setLanguageState(initialLang);
    if (typeof document !== 'undefined') {
        document.documentElement.lang = initialLang;
    }
    loadTranslations(initialLang);
  }, [loadTranslations]);

  const setLanguage = (lang: LanguageCode) => {
    if (!VALID_LANGUAGES.includes(lang)) {
      console.error(`Attempted to set invalid language: ${lang}. Ignoring.`);
      return;
    }
    setLanguageState(lang);
    try {
      // Ensure this code only runs on the client
      if (typeof window !== 'undefined') {
        localStorage.setItem(I18N_STORAGE_KEY, lang);
      }
    } catch (e) {
      console.warn("Could not access localStorage to set language:", e);
    }
    if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
    }
    loadTranslations(lang);
  };

  const t = useCallback((key: string, replacements?: Record<string, string>): string => {
    if (!isLoaded) {
        return key; // Return key if translations are not loaded yet
    }
    const currentTranslations = translations || {};
    let translatedString = getNestedValue(currentTranslations as NestedTranslations, key);

    if (translatedString === undefined) {
      // console.warn(`Translation key "${key}" not found for language "${language}".`);
      return key; 
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
