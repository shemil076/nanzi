'use client';

import { Calendar, Home, House, Search, Settings } from 'lucide-react';
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

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/dashboard/tenant',
    icon: Home,
  },
  {
    title: 'My Properties',
    url: '/dashboard/tenant/',
    icon: House,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
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
      <SidebarHeader className="h-12 bg-[#31204a] text-white">
        <SidebarMenu className="w-full h-full flex justify-center my-5">
          <SidebarMenuItem className="flex items-center gap-3">
            <SidebarMenuButton
              className="hover:bg-transparent hover:text-white"
              asChild
            >
              <div>
                <div className="museo-font text-4xl">
                  <span className="text-purple-500 font-bold">n</span>anzi
                </div>
                <span className="text-base self-start">#tenant</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent
        className="bg-gradient-to-b from-[#31204a] via-[#141414] to-[#0F0F0F] via-[40%]

 h-screen w-full flex-1 flex flex-col text-white"
      >
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
