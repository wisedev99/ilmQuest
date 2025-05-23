
"use client";

import * as React from "react"; 
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, LogOut, Search, Settings, User as UserIcon, MessageSquarePlus } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { useI18n } from '@/contexts/i18n-provider';

// Mock current user - replace with actual auth logic
const currentUser = {
  id: 'user1', 
  name: "Ali Hassan",
  email: "ali.hassan@example.com",
  avatarUrl: "https://placehold.co/40x40.png",
};

export function AppHeader() {
  const { isMobile } = useSidebar();
  const [userMenuOpen, setUserMenuOpen] = React.useState(false); 
  const { t, isLoaded: i18nIsLoaded } = useI18n();

  if (!i18nIsLoaded) {
    // Render a minimal header or a loading state
    return (
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
        {isMobile && <SidebarTrigger />}
        {!isMobile && <Logo iconSize={24} textSize="text-xl" />}
        <div className="flex flex-1 items-center justify-end gap-2 md:ml-auto md:gap-2 lg:gap-4">
          <div className="h-8 w-10 bg-muted rounded-md animate-pulse"></div> {/* Language switcher placeholder */}
          <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div> {/* Theme switcher placeholder */}
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div> {/* Ask Question placeholder */}
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div> {/* Bell placeholder */}
          <div className="h-9 w-9 bg-muted rounded-full animate-pulse"></div> {/* Avatar placeholder */}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
      {isMobile && <SidebarTrigger />}
      {!isMobile && <Logo iconSize={24} textSize="text-xl" />}
      
      <div className="flex flex-1 items-center gap-2 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('header.searchPlaceholder')}
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              aria-label={t('header.searchPlaceholder')}
            />
          </div>
        </form>
        <LanguageSwitcher /> 
        <ThemeSwitcher />
        <Button variant="outline" size="icon" className="rounded-full" asChild>
          <Link href="/questions/ask" aria-label={t('header.askQuestionTooltip')}>
            <MessageSquarePlus className="h-5 w-5" />
            <span className="sr-only">{t('header.askQuestionTooltip')}</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label={t('header.notificationsTooltip')}>
          <Bell className="h-5 w-5" />
          <span className="sr-only">{t('header.notificationsTooltip')}</span>
        </Button>
        <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person" />
                <AvatarFallback>{currentUser.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild onClick={() => setUserMenuOpen(false)}>
              <Link href={`/profile/${currentUser.id}`}> 
                <UserIcon className="mr-2 h-4 w-4" />
                {t('header.profile')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserMenuOpen(false)}> 
              <Settings className="mr-2 h-4 w-4" />
              {t('header.settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild onClick={() => setUserMenuOpen(false)}>
               <Link href="/login"> 
                <LogOut className="mr-2 h-4 w-4" />
                {t('header.logout')}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
