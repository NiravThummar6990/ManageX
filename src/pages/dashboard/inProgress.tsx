"use client"

import PageHeader from "@/components/dashboard/PageHeader"
import { StatusCard } from "@/components/dashboard/StatusCard"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TrashIcon from "@/components/ui/trash-icon"
import {
  Clock,
  MoreHorizontalIcon,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  CircleArrowOutUpRight,
} from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import AccessibilityIcon from "@/components/ui/accessibility-icon"
import { formatDate, getTaskStats } from "@/lib/task-utils"
import { useTaskStore } from "@/store/task-store"
import type { Priority, Status } from "@/types/task"

export default function InProgress() {
  const tasks = useTaskStore((s) => s.tasks)
  const completeTask = useTaskStore((s) => s.completeTask)
  const pauseTask = useTaskStore((s) => s.pauseTask)
  const deleteTask = useTaskStore((s) => s.deleteTask)

  const inProgressTasks = useMemo(
    () => tasks.filter((t) => t.status === "in-progress"),
    [tasks]
  )

  const stats = getTaskStats(tasks)

  const [isCompleteOpen, setIsCompleteOpen] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState<string | null>(null)
  const [isPauseOpen, setIsPauseOpen] = useState<string | null>(null)

  const CARDDATA = [
    {
      name: "Total Tasks",
      count: stats.total,
      icon: <CircleArrowOutUpRight className="text-blue-500" />,
      color: "border-blue-500",
      url: "/dashboard/mytasks",
    },
    {
      name: "Pending Tasks",
      count: stats.pending,
      icon: <AlertCircle className="text-yellow-500" />,
      color: "border-yellow-500",
      url: "/dashboard/mytasks",
    },
    {
      name: "In Progress",
      count: stats.inProgress,
      icon: <PlayCircle className="text-orange-500" />,
      color: "border-orange-500",
      url: "/dashboard/inprogress",
    },
    {
      name: "Complete Tasks",
      count: stats.completed,
      icon: <CheckCircle2 className="text-green-500" />,
      color: "border-green-500",
      url: "/dashboard/complete",
    },
  ]

  const handleComplete = (id: string) => {
    completeTask(id)
    setIsCompleteOpen(null)
    toast.success(`Task #${id} marked as completed!`)
  }

  const handleDelete = (id: string) => {
    deleteTask(id)
    setIsDeleteOpen(null)
    toast.success(`Task #${id} deleted successfully.`)
  }

  const handlePause = (id: string) => {
    pauseTask(id)
    setIsPauseOpen(null)
    toast.success(`Task #${id} moved to pending.`)
  }

  const getPriorityBadge = (priority: Priority) => {
    const styles = {
      High: "border-red-500/30 bg-red-500/10 text-red-500",
      Medium: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
      Low: "border-green-500/30 bg-green-500/10 text-green-500",
    }
    return styles[priority]
  }

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "in-progress":
        return <Clock className="h-4 w-4 animate-pulse text-orange-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <>
      <PageHeader
        icon={
          <AccessibilityIcon
            rotateFrom={0}
            rotateTo={360}
            duration={1}
            ease="linear"
            personDuration={1.5}
            personEase="easeInOut"
            exitDuration={0.7}
          />
        }
        title="In Progress Tasks"
        description="Track and manage tasks currently being worked on."
      />
      <StatusCard data={CARDDATA} />

      <div className="m-4 grid grid-cols-1 items-start gap-6 md:grid-cols-4">
        <div className="col-span-1 overflow-hidden border bg-card shadow-sm md:col-span-4">
          <div className="flex items-center gap-2 border-b bg-muted/40 p-4">
            <PlayCircle className="h-5 w-5 text-orange-500" />
            <h2 className="text-base font-bold tracking-tight">
              Currently In Progress
            </h2>
            <Badge variant="secondary" className="ml-2 text-[10px]">
              {inProgressTasks.length} Tasks
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[800px]">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Task Description</TableHead>
                  <TableHead className="w-28 text-center">Priority</TableHead>
                  <TableHead className="w-36 text-center">Due Date</TableHead>
                  <TableHead className="w-36 text-center">Started On</TableHead>
                  <TableHead className="w-28 text-center">Status</TableHead>
                  <TableHead className="w-16 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inProgressTasks.length > 0 ? (
                  inProgressTasks.map((data) => (
                    <TableRow
                      key={data.id}
                      className="transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="text-center text-xs font-bold text-muted-foreground">
                        {data.id}
                      </TableCell>
                      <TableCell className="max-w-xs text-sm font-medium md:max-w-md">
                        <span
                          className="block truncate"
                          title={data.description}
                        >
                          {data.description}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={getPriorityBadge(data.priority)}
                        >
                          {data.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-xs text-muted-foreground">
                        {formatDate(data.dueDate)}
                      </TableCell>
                      <TableCell className="text-center text-xs text-muted-foreground">
                        {data.startedAt ? formatDate(data.startedAt) : "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {getStatusIcon(data.status)}
                          <Badge
                            variant="secondary"
                            className="bg-orange-500/10 text-[10px] text-orange-500"
                          >
                            In Progress
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="cursor-pointer gap-2 text-green-600 focus:text-green-600"
                              onSelect={() => setIsCompleteOpen(data.id)}
                            >
                              <CheckCircle2 className="h-4 w-4" /> Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer gap-2 text-yellow-600 focus:text-yellow-600"
                              onSelect={() => setIsPauseOpen(data.id)}
                            >
                              <PauseCircle className="h-4 w-4" /> Pause
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
                              onSelect={() => setIsDeleteOpen(data.id)}
                            >
                              <TrashIcon /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialog
                          open={isCompleteOpen === data.id}
                          onOpenChange={(open) =>
                            !open && setIsCompleteOpen(null)
                          }
                        >
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                Complete Task #{data.id}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to mark this task as
                                completed?
                                <br />
                                <span className="mt-2 block font-medium text-card-foreground">
                                  {data.description}
                                </span>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-green-600 text-white hover:bg-green-700"
                                onClick={() => handleComplete(data.id)}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Mark Complete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog
                          open={isPauseOpen === data.id}
                          onOpenChange={(open) => !open && setIsPauseOpen(null)}
                        >
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <PauseCircle className="h-5 w-5 text-yellow-500" />
                                Pause Task #{data.id}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will move the task back to pending status.
                                <br />
                                <span className="mt-2 block font-medium text-card-foreground">
                                  {data.description}
                                </span>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-yellow-600 text-white hover:bg-yellow-700"
                                onClick={() => handlePause(data.id)}
                              >
                                <PauseCircle className="mr-2 h-4 w-4" />
                                Move to Pending
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog
                          open={isDeleteOpen === data.id}
                          onOpenChange={(open) =>
                            !open && setIsDeleteOpen(null)
                          }
                        >
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Task #{data.id}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this task? This
                                action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                                onClick={() => handleDelete(data.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                        <Clock className="h-8 w-8 text-muted-foreground/40" />
                        <p className="text-sm font-medium">
                          No tasks in progress
                        </p>
                        <p className="text-xs">
                          All caught up! Start a new task from pending.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
