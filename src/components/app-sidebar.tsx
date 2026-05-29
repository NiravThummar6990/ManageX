"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUserStore } from "@/store/user-store"
import {
  TerminalSquareIcon,
  Motorbike,
  BookOpenCheck,
  Gpu,
  ListChecks,
  CalendarSearch,
  Signature,
  Users,
} from "lucide-react"

const sidebarData = {
  teams: [
    {
      name: "ManageX",
      logo: <Motorbike />,
      plan: "Pro", // plan based on your website
    },
    // {
    //   name: "Acme Corp.",
    //   logo: <AudioLinesIcon />,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: <TerminalIcon />,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <TerminalSquareIcon />,
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "My Tasks",
      url: "/dashboard/mytasks",
      icon: <BookOpenCheck />,
      // items: [
      //   {
      //     title: "Genesis",
      //     url: "#",
      //   },
      //   {
      //     title: "Explorer",
      //     url: "#",
      //   },
      //   {
      //     title: "Quantum",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "In Progress",
      url: "/dashboard/inprogress",
      icon: <Gpu />,

      // items: [
      //   {
      //     title: "Introduction",
      //     url: "#",
      //   },
      //   {
      //     title: "Get Started",
      //     url: "#",
      //   },
      //   {
      //     title: "Tutorials",
      //     url: "#",
      //   },
      //   {
      //     title: "Changelog",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Completed",
      url: "/dashboard/complete",
      icon: <ListChecks />,
      // items: [
      //   {
      //     title: "General",
      //     url: "#",
      //   },
      //   {
      //     title: "Team",
      //     url: "#",
      //   },
      //   {
      //     title: "Billing",
      //     url: "#",
      //   },
      //   {
      //     title: "Limits",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Calendar",
      url: "/dashboard/calender",
      icon: <CalendarSearch />,
      // items: [
      //   {
      //     title: "General",
      //     url: "#",
      //   },
      //   {
      //     title: "Team",
      //     url: "#",
      //   },
      //   {
      //     title: "Billing",
      //     url: "#",
      //   },
      //   {
      //     title: "Limits",
      //     url: "#",
      //   },
      // ],
    },
  ],
  Workspace: [
    {
      name: "Personal",
      url: "#",
      icon: <Signature />,
    },
    {
      name: "Team",
      url: "#",
      icon: <Users />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const name = useUserStore((s) => s.name)
  const email = useUserStore((s) => s.email)
  const avatar = useUserStore((s) => s.avatar)

  return (
    <Sidebar className="z-50" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavProjects Workspaces={sidebarData.Workspace} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name, email, avatar }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
