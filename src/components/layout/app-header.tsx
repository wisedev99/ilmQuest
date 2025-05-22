
"use client";

import * as React from "react"; // Imported React for useState
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

// Mock current user - replace with actual auth logic
const currentUser = {
  name: "Ali Hassan",
  email: "ali.hassan@example.com",
  avatarUrl: "https://placehold.co/40x40.png",
};

export function AppHeader() {
  const { isMobile } = useSidebar();
  const [userMenuOpen, setUserMenuOpen] = React.useState(false); // State for dropdown

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
              placeholder="Search questions..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              aria-label="Search questions"
            />
          </div>
        </form>
        <ThemeSwitcher />
        <Button variant="outline" size="icon" className="rounded-full" asChild>
          <Link href="/questions/ask">
            <MessageSquarePlus className="h-5 w-5" />
            <span className="sr-only">Ask Question</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
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
              <Link href="/profile/user1"> {/* Mock current user ID */}
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserMenuOpen(false)}> {/* Assuming this would trigger an action and then close */}
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild onClick={() => setUserMenuOpen(false)}>
               <Link href="/login"> {/* For demo, link to login. Should be a logout action */}
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
