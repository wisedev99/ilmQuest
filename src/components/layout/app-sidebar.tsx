
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
  BookHeart,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/logo';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { APP_NAME } from '@/lib/constants';

// Mock current user - replace with actual auth logic
const currentUser = {
  id: 'user1',
  name: "Ali Hassan",
  avatarUrl: "https://placehold.co/40x40.png",
};


const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/questions', label: 'Browse Questions', icon: HelpCircle },
  { href: '/questions/ask', label: 'Ask a Question', icon: MessageSquarePlus },
  { href: '/profile/user1', label: 'My Profile', icon: User }, // Assuming user1 is current user
];

export function AppSidebar() {
  const pathname = usePathname();

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
         <Link href="/profile/user1" legacyBehavior passHref>
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
                <SidebarMenuButton tooltip={{children: "Settings", className: "ml-2"}} aria-label="Settings">
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/login" legacyBehavior passHref>
                <SidebarMenuButton tooltip={{children: "Logout", className: "ml-2"}} aria-label="Logout">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
