
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { sampleBukhariHadith } from "@/lib/bukhari-data";
import type { Hadith } from "@/types";
import React, { useState, useMemo, useEffect } from "react";
import { useI18n, type LanguageCode } from "@/contexts/i18n-provider";
import { BookOpen, Search, Link2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function BukhariPage() {
  const { t, language, isLoaded: i18nIsLoaded } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (i18nIsLoaded) {
      setIsLoading(false);
    }
  }, [i18nIsLoaded]);

  const filteredHadith = useMemo(() => {
    if (!searchTerm) {
      return sampleBukhariHadith;
    }
    return sampleBukhariHadith.filter((hadith) => {
      const lang = language as LanguageCode;
      
      const textKey = 'text_' + lang;
      const text = (hadith as any)[textKey] || hadith.text_en;

      const bookNameKey = 'bookName_' + lang;
      const bookName = (hadith as any)[bookNameKey] || hadith.bookName_en;

      const narratorKey = 'narrator_' + lang;
      const narratorChain = (hadith as any)[narratorKey] || hadith.narrator_en;
      
      const hadithNumber = hadith.hadithNumber;

      const term = searchTerm.toLowerCase();
      return (
        text.toLowerCase().includes(term) ||
        (bookName && bookName.toLowerCase().includes(term)) ||
        (narratorChain && narratorChain.toLowerCase().includes(term)) ||
        hadithNumber.toLowerCase().includes(term)
      );
    });
  }, [searchTerm, language, sampleBukhariHadith]);

  const getHadithText = (hadith: Hadith) => {
    const lang = language as LanguageCode;
    const key = 'text_' + lang;
    return (hadith as any)[key] || hadith.text_en;
  };

  const getBookName = (hadith: Hadith) => {
    const lang = language as LanguageCode;
    const key = 'bookName_' + lang;
    return (hadith as any)[key] || hadith.bookName_en;
  }

  const getNarratorChain = (hadith: Hadith) => {
    const lang = language as LanguageCode;
    const key = 'narrator_' + lang;
    return (hadith as any)[key] || hadith.narrator_en;
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-6 items-center justify-center h-full">
          <BookOpen className="h-12 w-12 animate-pulse text-primary" />
          <p>{t('bukhariPage.loading') || 'Loading Hadith Collection...'}</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6 h-full">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              {t('bukhariPage.title')}
            </CardTitle>
            <CardDescription>
              {t('bukhariPage.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('bukhariPage.searchPlaceholder')}
                className="pl-10 w-full text-base md:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="flex-1 pr-4 -mr-4"> {/* pr-4 and -mr-4 to compensate for scrollbar width */}
          <div className="space-y-6 pb-6">
            {filteredHadith.length > 0 ? (
              filteredHadith.map((hadith) => (
                <Card key={hadith.id} className="shadow-md" id={`hadith-${hadith.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        {getBookName(hadith) && (
                           <p className="text-sm text-primary font-medium mb-1">{t('bukhariPage.book')} {getBookName(hadith)}</p>
                        )}
                        <CardTitle className="text-lg">
                          {t('bukhariPage.hadithNo')} {hadith.hadithNumber}
                        </CardTitle>
                        {getNarratorChain(hadith) && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-start">
                            <Link2 className="h-3.5 w-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                            <span className="font-semibold mr-1">{t('bukhariPage.narratorsLabel')}</span>
                            <span>{getNarratorChain(hadith)}</span>
                          </p>
                        )}
                      </div>
                       <Badge variant="secondary">{hadith.collection}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/90 whitespace-pre-line leading-relaxed text-sm md:text-base">
                      {getHadithText(hadith)}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">{t('bukhariPage.noResults')}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  );
}
