import { useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"
import { Button } from "../ui/button"
import BulbSvg from "../ui/bulb-svg"
import { useTheme } from "../theme-provider"
import { useLocation } from "react-router-dom"

export default function NavBar() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const path = location.pathname

  const routes: Record<string, string> = {
    myTasks: "/dashboard/mytasks",
    inprogress: "/dashboard/inprogress",
    complete: "/dashboard/complete",
    calendar: "/dashboard/calender", // Fixed typo matching your route
  }

  const currentKey = Object.keys(routes).find((key) => routes[key] === path)

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full shrink-0 items-center justify-between border-b bg-background px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      {/* LEFT SECTION: Sidebar toggle & Breadcrumbs */}
      <div className="z-30 flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 hidden data-[orientation=vertical]:h-6 sm:block"
        />
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[18px] hover:text-white/50">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>

            {currentKey && (
              <>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[18px] text-white capitalize">
                {currentKey}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* CENTER SECTION: Mobile & Tablet Branding */}
      {/* pointer-events-none lets clicks pass through the container wrapper, pointer-events-auto restores interaction for the logo itself if needed */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center justify-center md:hidden">
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="block h-2 w-2 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 p-1.5 shadow-md"></span>
          <span className="text-xl font-extrabold tracking-wider text-[#164070] dark:text-blue-400">
            ManageX
          </span>
        </div>
        <span className="mt-0.5 text-center text-[10px] text-muted-foreground">
          Your productivity hub
        </span>
      </div>

      {/* RIGHT SECTION: Theme Toggle Button */}
      <div className="z-30 flex items-center gap-4">
        <Button
          variant="outline"
          className="w-fit rounded-full px-3 py-1"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <BulbSvg />
        </Button>
      </div>
    </header>
  )
}
