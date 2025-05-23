
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from '@/lib/constants';
import { AppThemeProvider } from '@/contexts/AppThemeProvider';
import { ColorThemeProvider } from '@/contexts/ColorThemeProvider';
import { I18nProviderClient } from '@/locales/client';
import { getCurrentLocale, getStaticParams } from '@/locales/server';

export const metadata: Metadata = {
  title: APP_NAME,
  description: `A platform for Islamic questions and answers - ${APP_NAME}`,
};

// This function is needed for Next.js to generate static pages for each locale.
export async function generateStaticParams() {
  return getStaticParams();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getCurrentLocale();

  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable} h-full`} suppressHydrationWarning>
      <body className={`antialiased h-full flex flex-col`}>
        <I18nProviderClient locale={locale}>
          <AppThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ColorThemeProvider>
              {children}
              <Toaster />
            </ColorThemeProvider>
          </AppThemeProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
