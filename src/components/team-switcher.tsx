"use client"

import * as React from "react"

import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const activeTeam = teams[0]

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg">
                {activeTeam.logo}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-[20px] font-extrabold tracking-tight text-transparent select-none">
                  Manage
                  <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text font-black text-transparent">
                    X
                  </span>
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
