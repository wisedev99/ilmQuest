
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useI18n, type LanguageCode } from "@/contexts/i18n-provider"; // Import LanguageCode

type LanguageOption = {
  code: LanguageCode; // Use the imported LanguageCode type
  name: string;
};

// Ensure these codes match the LanguageCode type and your JSON file names
const supportedLanguages: LanguageOption[] = [
  { code: "en", name: "English" },
  { code: "tj", name: "Тоҷикӣ" }, // Tajik
  { code: "ru", name: "Русский" }, // Russian
  { code: "fa", name: "فارسی" },   // Persian
];

export function LanguageSwitcher() {
  const { language: currentLang, setLanguage, t, isLoaded: i18nIsLoaded } = useI18n();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLanguageChange = (langCode: LanguageCode) => { // Ensure langCode is of type LanguageCode
    setLanguage(langCode);
  };

  if (!isMounted) {
    // Render a disabled button placeholder during server rendering and initial client hydration
    // This helps avoid hydration mismatches if the button structure is complex.
    // Alternatively, return null if you prefer nothing to be shown initially.
    return (
       <Button variant="outline" size="icon" disabled aria-label="Change language">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    );
  }
  
  if (!i18nIsLoaded) {
    // After mount, if i18n is still loading translations, show a disabled button.
    // Using a static string for aria-label here is safest.
    return (
       <Button variant="outline" size="icon" disabled aria-label="Change language (loading...)">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    );
  }

  // isMounted is true AND i18nIsLoaded is true
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t('header.languageSwitcherTooltip') || "Change language"}>
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="cursor-pointer"
            disabled={currentLang === lang.code} // Disable current language
          >
            {lang.name}
            {currentLang === lang.code && <Check className="ml-auto h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
