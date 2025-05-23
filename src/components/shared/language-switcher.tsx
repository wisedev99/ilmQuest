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
import { useChangeLocale, useCurrentLocale, useI18n } from '@/locales/client';

// Define the structure for supported languages
interface LanguageOption {
  code: "en" | "tj" | "ru" | "fa";
  name: string;
}

const supportedLanguages: LanguageOption[] = [
  { code: "en", name: "English" },
  { code: "tj", name: "Тоҷикӣ" }, // Tajik
  { code: "ru", name: "Русский" }, // Russian
  { code: "fa", name: "فارسی" },    // Persian
];

export function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const t = useI18n();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLanguageChange = (langCode: LanguageOption["code"]) => {
    changeLocale(langCode);
  };

  if (!isMounted) {
    // Render a disabled button placeholder during server rendering and initial client hydration
    // to prevent hydration mismatch and avoid calling client hooks prematurely.
    return (
       <Button variant="outline" size="icon" disabled aria-label="Change language">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    );
  }

  // At this point, isMounted is true. currentLocale and t() can be safely used.
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t('header.languageSwitcherTooltip')}>
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="cursor-pointer"
            disabled={currentLocale === lang.code} // Optionally disable the current language
          >
            {lang.name}
            {currentLocale === lang.code && <Check className="ml-auto h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
