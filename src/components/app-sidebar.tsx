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

// This is sample data.
const data = {
  user: {
    name: "Nirav Thummar",
    email: "nirathummar4129@gmail.com",
    avatar: "../src/assets/NT_avatar.jpeg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <Motorbike />,
      plan: "Enterprise",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects Workspaces={data.Workspace} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
