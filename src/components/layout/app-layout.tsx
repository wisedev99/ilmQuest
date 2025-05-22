
import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';
import { AppFooter } from './app-footer';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AppSidebar />
        <div className="flex flex-col sm:gap-4 sm:pl-14 flex-1"> {/* Removed sm:py-4 */}
          <AppHeader />
          <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-auto">
            {children}
          </main>
          <AppFooter className="sm:pl-14" />
        </div>
      </div>
    </SidebarProvider>
  );
}
