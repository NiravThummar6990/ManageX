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
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-40 backdrop-blur-3xl">
            <GravityStarsBackground />
          </div>
          <div className="relative z-10">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
