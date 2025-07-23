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
import { useRouter } from 'next/navigation';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/dashboard/landlord',
    icon: Home,
  },
  {
    title: 'My Properties',
    url: '/dashboard/landlord/properties',
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
  return (
    <Sidebar className="border-l" collapsible="icon">
      <SidebarHeader className="h-12 bg-white border-b">
        <SidebarMenu className="w-full h-full flex justify-center">
          <SidebarMenuItem className="flex items-center gap-3">
            <SidebarMenuButton className="hover:bg-transparent" asChild>
              <div className="items-center ">
                <span className="museo-font text-4xl">nanzi </span>
                <span className="text-base">landlord</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white flex-1 flex flex-col">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <span
                      onClick={() => {
                        router.push(item.url);
                      }}
                    >
                      <item.icon size={16} />
                      <span>{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
