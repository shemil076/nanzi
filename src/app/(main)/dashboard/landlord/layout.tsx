import { SidebarProvider, SidebarTrigger } from "../../../../components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
    <div className="flex h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <div className="h-12 flex items-center justify-start border-b">
            <SidebarTrigger className="ml-2 p-4 cursor-pointer border" />
          </div>
          <main className="flex-1 overflow-auto p-10 bg-gray-100">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
    )
}