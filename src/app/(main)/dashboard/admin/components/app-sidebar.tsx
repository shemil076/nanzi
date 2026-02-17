'use client';

import {
  BadgeAlert,
  BellDot,
  Building2,
  Home,
  Settings,
  Users,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../../../../components/ui/sidebar';
import { useRouter, usePathname } from 'next/navigation';

const items = [
  {
    title: 'Home',
    url: '/dashboard/admin',
    icon: Home,
  },
  {
    title: 'Properties',
    url: '#',
    icon: Building2,
  },
  {
    title: 'Tenants',
    url: '#',
    icon: Users,
  },
  {
    title: 'Maintenance',
    url: '#',
    icon: BadgeAlert,
  },
  {
    title: 'Notifications',
    url: '#',
    icon: BellDot,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="h-12">
        <SidebarMenu className="w-full h-full flex justify-center my-5">
          <SidebarMenuItem className="flex items-center gap-3">
            <SidebarMenuButton className="hover:bg-transparent" asChild>
              <div>
                <div className="museo-font text-4xl">
                  <span className="text-red-500 font-bold">n</span>anzi
                </div>
                <span className="text-base self-start">#admin</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white h-screen w-full flex-1 flex flex-col text-black">
        <SidebarGroup className="my-10">
          <SidebarGroupContent>
            <SidebarMenu className="gap-5">
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${
                        isActive
                          ? 'bg-white text-black '
                          : 'hover:bg-white/10 text-gray-400'
                      } flex gap-2 items-center px-3 py-2 rounded-md transition-colors duration-200 `}
                    >
                      <span
                        onClick={() => router.push(item.url)}
                        className="flex gap-2 items-center cursor-pointer"
                      >
                        <item.icon size={16} />
                        <span>{item.title}</span>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
