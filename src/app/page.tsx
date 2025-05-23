
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PopularQuestions } from "@/components/qa/popular-questions";
import { getPopularQuestions } from "@/lib/mock-data";
import { Logo } from "@/components/shared/logo";
import { AppFooter } from "@/components/layout/app-footer";
import Image from "next/image";
import { useI18n } from "@/contexts/i18n-provider";
import { APP_NAME } from "@/lib/constants"; // For app name if not translated

export default function HomePage() {
  const popularQuestions = getPopularQuestions();
  const { t, isLoaded: i18nIsLoaded, language } = useI18n();

  if (!i18nIsLoaded) {
    // Render a loading state or minimal content until translations are loaded
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30 items-center justify-center">
        <Logo iconSize={32} textSize="text-3xl" />
        <p className="mt-4">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <header className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Logo iconSize={32} textSize="text-3xl" />
        <nav className="flex gap-2 sm:gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">{t('home.login')}</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{t('home.signup')}</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <section className="text-center py-12 md:py-20">
          <Image 
            src="https://placehold.co/600x300.png" 
            alt="Islamic calligraphy or mosque silhouette" 
            width={600} 
            height={300} 
            className="mx-auto mb-8 rounded-lg shadow-xl w-full max-w-xl h-auto"
            data-ai-hint="islamic art"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
            {t('home.welcomeMessage', { appName: APP_NAME })}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            {t('home.tagline')}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="w-full max-w-xs sm:w-auto">
              <Link href="/questions/ask">{t('home.askQuestionButton')}</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full max-w-xs sm:w-auto">
              <Link href="/questions">{t('home.browseQuestionsButton')}</Link>
            </Button>
          </div>
        </section>

        <div className="py-12 md:py-16">
          <PopularQuestions questions={popularQuestions} />
        </div>
      </main>
      
      <AppFooter />
    </div>
  );
}
