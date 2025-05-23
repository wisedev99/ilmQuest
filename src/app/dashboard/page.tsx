
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PopularQuestions } from "@/components/qa/popular-questions";
import { getPopularQuestions, mockUsers, mockQuestions } from "@/lib/mock-data";
import { Activity, HelpCircle, MessageSquarePlus, User } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/contexts/i18n-provider";
import { APP_NAME } from "@/lib/constants";

export default function DashboardPage() {
  const { t, isLoaded: i18nIsLoaded } = useI18n();
  const currentUser = mockUsers[0]; // Assuming Ali Hassan is logged in
  const popularQuestions = getPopularQuestions();
  
  if (!i18nIsLoaded) {
     return (
      <AppLayout>
        <div className="flex flex-col gap-6 items-center justify-center h-full">
          <p>Loading dashboard...</p>
        </div>
      </AppLayout>
    );
  }
  
  const appNameToDisplay = t('appName') || APP_NAME;

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl">{t('dashboard.title', { name: currentUser.name })}</CardTitle>
            <CardDescription>{t('dashboard.description', { appName: appNameToDisplay })}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-6">
            <Image 
              src="https://placehold.co/300x200.png" 
              alt="Abstract Islamic pattern" 
              width={300} 
              height={200} 
              className="rounded-lg object-cover"
              data-ai-hint="islamic pattern"
            />
            <div className="flex-1">
              <p className="text-muted-foreground mb-4">
                {currentUser.userType === "Ulama" 
                  ? "Share your wisdom by answering questions or explore recent discussions." 
                  : "Continue your journey of knowledge. Ask a new question or explore topics."}
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/questions/ask">
                    <MessageSquarePlus className="mr-2 h-4 w-4" /> {t('dashboard.askQuestion')}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/questions">
                    <HelpCircle className="mr-2 h-4 w-4" /> {t('dashboard.browseQuestions')}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Questions</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.questionsAsked.length}</div>
              <p className="text-xs text-muted-foreground">
                questions you&apos;ve asked
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Answers</CardTitle>
              <MessageSquarePlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.answersProvided.length}</div>
              <p className="text-xs text-muted-foreground">
                answers you&apos;ve provided
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.followersCount}</div>
              <p className="text-xs text-muted-foreground">
                people following you
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <PopularQuestions questions={popularQuestions} />
        </div>

      </div>
    </AppLayout>
  );
}
