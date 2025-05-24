
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/about/contact-form";
import { useI18n } from "@/contexts/i18n-provider";
import { Info, Mail } from "lucide-react";
import Image from "next/image";

export default function AboutUsPage() {
  const { t, isLoaded } = useI18n();

  if (!isLoaded) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-6 items-center justify-center h-full">
          <p>Loading page...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="mb-12 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 sm:p-8 text-center">
             <Info className="h-12 w-12 mx-auto text-primary mb-4" />
            <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">
              {t('aboutPage.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <Image
              src="https://placehold.co/700x300.png"
              alt="Abstract Islamic art or community photo"
              width={700}
              height={300}
              className="rounded-lg mb-8 w-full h-auto object-cover shadow-md"
              data-ai-hint="islamic art community"
            />
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                {t('aboutPage.missionTitle')}
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {t('aboutPage.missionText')}
              </p>
            </section>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-1">
              <Mail className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl sm:text-3xl font-semibold">
                {t('aboutPage.contactUsTitle')}
              </CardTitle>
            </div>
            <CardDescription>
              {t('aboutPage.contactUsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
