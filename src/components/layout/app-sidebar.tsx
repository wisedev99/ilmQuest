
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  HelpCircle,
  User,
  LogOut,
  Settings,
  MessageSquarePlus,
  BookOpen,
  Info, // Added Info icon for About Us
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/logo';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useI18n } from '@/contexts/i18n-provider';

const currentUser = {
  id: 'user1',
  name: "Ali Hassan",
  avatarUrl: "https://placehold.co/40x40.png",
};

export function AppSidebar() {
  const pathname = usePathname();
  const { t, isLoaded: i18nIsLoaded } = useI18n();

  const navItems = i18nIsLoaded ? [
    { href: '/dashboard', label: t('dashboard.title', {name: ''}).replace('Welcome back, !', 'Dashboard').trim(), icon: Home },
    { href: '/questions', label: t('dashboard.browseQuestions'), icon: HelpCircle },
    { href: '/questions/ask', label: t('dashboard.askQuestion'), icon: MessageSquarePlus },
    { href: '/bukhari', label: t('sidebar.hadithBukhari'), icon: BookOpen },
    { href: `/profile/${currentUser.id}`, label: t('header.profile'), icon: User },
    { href: '/about', label: t('sidebar.aboutUs'), icon: Info }, // Added About Us
  ] : [];


  if (!i18nIsLoaded) {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
           <Logo iconSize={28} textSize="text-2xl" />
        </SidebarHeader>
        <SidebarContent>
          {/* Placeholder for loading items */}
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
         <Logo iconSize={28} textSize="text-2xl" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, className: "ml-2" }}
                  aria-label={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2" />
         <Link href={`/profile/${currentUser.id}`} legacyBehavior passHref>
          <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-auto">
            <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person" />
                <AvatarFallback>{currentUser.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium">{currentUser.name}</span>
            </div>
          </Button>
        </Link>
        <SidebarMenu>
           <SidebarMenuItem>
             <Link href="/settings" legacyBehavior passHref>
                <SidebarMenuButton tooltip={{children: t('header.settings'), className: "ml-2"}} aria-label={t('header.settings')}>
                  <Settings />
                  <span>{t('header.settings')}</span>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/login" legacyBehavior passHref>
                <SidebarMenuButton tooltip={{children: t('header.logout'), className: "ml-2"}} aria-label={t('header.logout')}>
                  <LogOut />
                  <span>{t('header.logout')}</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
