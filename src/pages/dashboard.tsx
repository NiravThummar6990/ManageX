import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SunMoon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"

export default function Dashboard() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="relative flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    onClick={() => navigate("/")}
                    className="text-[18px]"
                  >
                    Home{" "}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {/* <BreadcrumbItem>
                  <BreadcrumbPage className="text-[18px]"> */}
                <span className="flex items-center gap-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-[20px] font-extrabold tracking-tight text-transparent select-none">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    className="mr-1 inline text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="14" width="7" height="7" rx="2" />
                    <rect x="3" y="14" width="7" height="7" rx="2" />
                  </svg>
                  Manage
                  <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text font-black text-transparent">
                    X
                  </span>
                </span>

                {/* </BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="absolute right-4">
            {" "}
            <Button
              variant={"outline"}
              className="px-x w-fit rounded-full py-1"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <SunMoon />
            </Button>
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
