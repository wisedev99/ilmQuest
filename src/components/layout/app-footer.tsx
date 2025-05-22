
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AppFooterProps {
  className?: string;
}

export function AppFooter({ className }: AppFooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={cn("border-t bg-background text-center text-sm text-muted-foreground py-4", className)}>
      <p>&copy; {currentYear} {APP_NAME}. All rights reserved.</p>
      <p className="text-xs mt-1">Seeking knowledge is an obligation upon every Muslim.</p>
    </footer>
  );
}
