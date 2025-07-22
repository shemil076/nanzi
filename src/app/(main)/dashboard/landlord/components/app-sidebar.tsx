"use client"

import { Calendar, Home, House, Inbox, Search, Settings } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../../../../components/ui/sidebar"
import { Button } from "../../../../../components/ui/button"
import { useRouter } from "next/navigation"
import { Separator } from "../../../../../components/ui/separator"


// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard/landlord",
        icon: Home,
    },
    {
        title: "My Properties",
        url: "/dashboard/landlord/property",
        icon: House,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    const router = useRouter();
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-center justify-center flex flex-col my-5">
                        <div className="museo-font text-2xl ">
                            nanzi
                        </div >
                        <span className="text-sm">#landlord</span>
                    </SidebarGroupLabel>
                    <Separator className="mb-2"/>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Button variant="ghost" className="justify-start"
                                        onClick={() => {router.push(item.url)}}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Button>
                                        {/* <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a> */}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}