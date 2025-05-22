
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PopularQuestions } from "@/components/qa/popular-questions";
import { getPopularQuestions } from "@/lib/mock-data";
import { Logo } from "@/components/shared/logo";
import { AppFooter } from "@/components/layout/app-footer";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

export default function HomePage() {
  const popularQuestions = getPopularQuestions();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <header className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Logo iconSize={32} textSize="text-3xl" />
        <nav className="flex gap-2 sm:gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
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
            className="mx-auto mb-8 rounded-lg shadow-xl"
            data-ai-hint="islamic art"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
            Welcome to {APP_NAME}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Your trusted platform for seeking and sharing Islamic knowledge. Ask questions, get answers from verified Ulama, and deepen your understanding.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/questions/ask">Ask a Question</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/questions">Browse Questions</Link>
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
