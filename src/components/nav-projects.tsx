"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function NavProjects({
  Workspaces,
}: {
  Workspaces: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarMenu>
        {Workspaces.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              onClick={() => {
                if (isMobile) {
                  setOpenMobile(false)
                }
              }}
            >
              <Link to={item.url}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
