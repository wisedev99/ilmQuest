
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from '@/lib/constants';
import { AppThemeProvider } from '@/contexts/AppThemeProvider';
import { ColorThemeProvider } from '@/contexts/ColorThemeProvider';
import { I18nProviderClient } from '@/locales/client';
// Import getStaticParams for generateStaticParams
import { getStaticParams } from '@/locales/server';

export const metadata: Metadata = {
  title: APP_NAME,
  description: `A platform for Islamic questions and answers - ${APP_NAME}`,
};

// This function is needed for Next.js to generate static pages for each locale.
export async function generateStaticParams() {
  return getStaticParams(); // Returns [{ locale: 'en' }, { locale: 'tj' }, ...]
}

export default async function RootLayout({
  children,
  params, // Next.js passes params from generateStaticParams or dynamic segments
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }; // Expect locale to be passed as a route parameter
}>) {
  // Use the locale from params, which should be provided by Next.js
  // due to the [locale] dynamic segment implicitly created by next-international
  // and generateStaticParams.
  const locale = params.locale;

  // Basic validation, though middleware should ensure this.
  const validLocales = ['en', 'tj', 'ru', 'fa'];
  if (!validLocales.includes(locale)) {
    // This case should ideally be handled by middleware redirecting to a default/valid locale.
    // If we reach here, it means params.locale was not a valid one.
    // For I18nProviderClient to not crash, we must provide a valid locale.
    // Throwing notFound() here would result in the same error as before.
    console.warn(`RootLayout received invalid locale '${locale}' in params. Defaulting to 'en' for provider.`);
    const fallbackLocale = 'en';
    return (
      <html lang={fallbackLocale} className={`${GeistSans.variable} ${GeistMono.variable} h-full`} suppressHydrationWarning>
        <body className={`antialiased h-full flex flex-col`}>
          <I18nProviderClient locale={fallbackLocale}>
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
