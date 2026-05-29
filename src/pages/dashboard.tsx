import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars"
import NavBar from "@/components/dashboard/NavBar"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
          <GravityStarsBackground className="absolute inset-0 z-0" />
          <div className="relative z-10 w-full">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
