"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // 👈 ૧. આ હૂક પહેલેથી ઇમ્પોર્ટ છે જ
} from "@/components/ui/sidebar"
import {
  MoreHorizontalIcon,
  FolderIcon,
  ArrowRightIcon,
  Trash2Icon,
} from "lucide-react"
import { Link } from "react-router-dom" // 👈 ૨. પેજ રીફ્રેશ અટકાવવા માટે Link ઇમ્પોર્ટ કરો

export function NavProjects({
  Workspaces,
}: {
  Workspaces: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  // 👈 ૩. હૂકમાંથી setOpenMobile પણ લઈ લો
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarMenu>
        {Workspaces.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              // 👈 ૪. અહિયાં ઓન-ક્લિક ઇવેન્ટ સેટ કરો
              onClick={() => {
                if (isMobile) {
                  setOpenMobile(false)
                }
              }}
            >
              {/* 👈 ૫. <a> ની જગ્યાએ <Link> વાપરો જેથી સ્મૂધલી પેજ ચેન્જ થાય */}
              <Link to={item.url}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="aria-expanded:bg-muted"
                >
                  <MoreHorizontalIcon />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowRightIcon className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2Icon className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
