
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from '@/lib/constants';
import { AppThemeProvider } from '@/contexts/AppThemeProvider';
import { ColorThemeProvider } from '@/contexts/ColorThemeProvider';
import { I18nProvider } from '@/contexts/i18n-provider'; // Updated import

export const metadata: Metadata = {
  title: APP_NAME,
  description: `A platform for Islamic questions and answers - ${APP_NAME}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default lang, will be updated client-side by I18nProvider
  const initialLang = 'en'; 

  return (
    <html lang={initialLang} className={`${GeistSans.variable} ${GeistMono.variable} h-full`} suppressHydrationWarning>
      <body className={`antialiased h-full flex flex-col`}>
        <I18nProvider> {/* Custom I18nProvider */}
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
        </I18nProvider>
      </body>
    </html>
  );
}
