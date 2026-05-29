"use client"

import * as React from "react"
import PageHeader from "@/components/dashboard/PageHeader"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  ListTodo,
  Check,
  X,
  RefreshCcw,
  CircleArrowOutUpRight,
  CheckCircle2,
  PlayCircle,
  AlertCircle,
} from "lucide-react"
import CreditCard from "@/components/ui/credit-card"
import { StatusCard } from "@/components/dashboard/StatusCard"

// Calendar task data
const TASKS_DATA = [
  {
    id: "1",
    description: "Set up automated nightly cron jobs for PostgreSQL backup.",
    priority: "High",
    dueDate: "May 29, 2026",
    status: "completed",
  },
  {
    id: "2",
    description:
      "Sync the new design system components with the frontend team.",
    priority: "Medium",
    dueDate: "June 01, 2026",
    status: "pending",
  },
  {
    id: "3",
    description: "Resolve token expiration redirect loop on the client side.",
    priority: "High",
    dueDate: "May 28, 2026",
    status: "in-progress",
  },
  {
    id: "4",
    description: "Generate Swagger/OpenAPI spec files for the v2 endpoints.",
    priority: "Low",
    dueDate: "June 05, 2026",
    status: "pending",
  },
  {
    id: "5",
    description: "Compress and convert homepage graphics to WebP format.",
    priority: "Low",
    dueDate: "June 10, 2026",
    status: "completed",
  },
]

// Status card data
const STATUSCARDS = [
  {
    name: "Total Tasks",
    count: TASKS_DATA.length,
    color: "border-blue-500",
    icon: <CircleArrowOutUpRight className="text-blue-500" />,
  },
  {
    name: "Pending",
    count: TASKS_DATA.filter((t) => t.status === "pending").length,
    color: "border-yellow-500",
    icon: <AlertCircle className="text-yellow-500" />,
  },

  {
    name: "In Progress",
    count: TASKS_DATA.filter((t) => t.status === "in-progress").length,
    color: "border-orange-500",
    icon: <PlayCircle className="text-orange-500" />,
  },
  {
    name: "Completed",
    count: TASKS_DATA.filter((t) => t.status === "completed").length,
    color: "border-green-500",
    icon: <CheckCircle2 className="text-green-500" />,
  },
]

/**
 * Utility function to compare a string date (e.g. 'May 29, 2026')
 * to a JS Date object. Returns true if it's exactly the same day.
 */
function isSameDay(dateStr: string, calendarDate: Date) {
  const d = new Date(dateStr)
  return (
    d.getDate() === calendarDate.getDate() &&
    d.getMonth() === calendarDate.getMonth() &&
    d.getFullYear() === calendarDate.getFullYear()
  )
}

export default function CalendarPage() {
  // Select today's date by default
  const [date, setDate] = React.useState<Date | undefined>(() => new Date())

  // Filter tasks for currently selected date
  const filteredTasks = TASKS_DATA.filter(
    (task) => date && isSameDay(task.dueDate, date)
  )

  return (
    <>
      <PageHeader
        icon={<CreditCard />}
        title="Calendar Overview"
        description="Plan, organize, and track your schedule efficiently with your personalized calendar."
      />
      <StatusCard data={STATUSCARDS} />
      <div className="m-4 grid grid-cols-1 items-start gap-6 md:grid-cols-3">
        {/* Calendar - occupies two columns on desktop */}
        <div className="col-span-1 flex justify-center border bg-card p-4 shadow-sm md:col-span-2">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full max-w-full border bg-background/50"
            modifiers={{
              hasTask: (day) =>
                TASKS_DATA.some((task) => isSameDay(task.dueDate, day)),
            }}
            modifiersClassNames={{
              hasTask:
                "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-orange-500 after:rounded-full font-bold text-foreground",
            }}
          />
        </div>

        {/* Tasks for the selected day */}
        <div className="col-span-1 flex flex-col gap-4">
          <Card className="border bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-muted/40 p-4">
              <CardTitle className="flex items-center gap-2 text-sm font-bold">
                <ListTodo className="h-4 w-4 text-blue-500" />
                {date
                  ? date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Select a date"}
              </CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1 ? "Task" : "Tasks"}
              </Badge>
            </CardHeader>
            <CardContent className="max-h-[400px] space-y-3 overflow-y-auto p-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex flex-col gap-2 rounded-md bg-muted/30 p-3 transition-all hover:bg-muted/50 ${
                      task.priority === "High"
                        ? "border-l-4 border-red-500"
                        : task.priority === "Medium"
                          ? "border-l-4 border-yellow-500"
                          : "border-l-4 border-green-500"
                    } `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground">
                        #{task.id}
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          task.priority === "High"
                            ? "border-red-500/20 bg-red-500/10 text-[10px] text-red-500"
                            : task.priority === "Medium"
                              ? "border-yellow-500/20 bg-yellow-500/10 text-[10px] text-yellow-500"
                              : "border-green-500/20 bg-green-500/10 text-[10px] text-green-500"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={
                          task.status === "completed"
                            ? "border-green-200 bg-green-100 text-green-600"
                            : task.status === "in-progress"
                              ? "border-yellow-200 bg-yellow-100 text-yellow-700"
                              : "border-gray-200 bg-gray-100 text-gray-700"
                        }
                      >
                        {task.status === "completed" && (
                          <Check className="mr-1 h-3 w-3" />
                        )}
                        {task.status === "in-progress" && (
                          <RefreshCcw className="mr-1 h-3 w-3" />
                        )}
                        {task.status === "pending" && (
                          <X className="mr-1 h-3 w-3" />
                        )}
                        <span className="capitalize">
                          {task.status.replace("-", " ")}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-xs leading-relaxed font-medium text-card-foreground">
                      {task.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-muted-foreground">
                  <Clock className="h-8 w-8 text-muted-foreground/40" />
                  <p className="text-xs font-medium">
                    No tasks scheduled on this day.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
