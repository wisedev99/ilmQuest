
"use client";

import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useI18n } from '@/contexts/i18n-provider';

interface AppFooterProps {
  className?: string;
}

export function AppFooter({ className }: AppFooterProps) {
  const currentYear = new Date().getFullYear();
  const { t, isLoaded } = useI18n();

  if (!isLoaded) {
    return (
      <footer className={cn("border-t bg-background text-center text-sm text-muted-foreground py-4", className)}>
        <p>&copy; {currentYear} {APP_NAME}. All rights reserved.</p>
      </footer>
    );
  }

  return (
    <footer className={cn("border-t bg-background text-center text-sm text-muted-foreground py-4", className)}>
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p>&copy; {currentYear} {APP_NAME}. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link href="/about" className="hover:text-primary hover:underline">
            {t('footer.aboutUsLink')}
          </Link>
          {/* You can add more links here, e.g., Terms of Service, Privacy Policy */}
        </div>
      </div>
      <p className="text-xs mt-2">Seeking knowledge is an obligation upon every Muslim.</p>
    </footer>
  );
}
