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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Textarea } from "@/components/ui/textarea"
import {
  ListTodo,
  PlusSquare,
  MoreHorizontal,
  PenIcon,
  TrashIcon,
  Search,
  Filter,
  Calendar as CalendarIcon,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  CircleArrowOutUpRight,
  Check,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import LayoutDashboardIcon from "@/components/ui/layout-dashboard-icon"

// Fix: MoreHorizontalIcon was not defined; use MoreHorizontal from lucide-react
const MoreHorizontalIcon = MoreHorizontal

type Priority = "High" | "Medium" | "Low"
type Status = "pending" | "in-progress" | "completed"

interface Task {
  id: string
  description: string
  priority: Priority
  dueDate: string
  status: Status
  createdAt: string
}

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    description: "Set up automated nightly cron jobs for PostgreSQL backup.",
    priority: "High",
    dueDate: "2026-05-29",
    status: "pending",
    createdAt: "2026-05-20",
  },
  {
    id: "2",
    description:
      "Sync the new design system components with the frontend team.",
    priority: "Medium",
    dueDate: "2026-06-01",
    status: "in-progress",
    createdAt: "2026-05-21",
  },
  {
    id: "3",
    description: "Resolve token expiration redirect loop on the client side.",
    priority: "High",
    dueDate: "2026-05-28",
    status: "pending",
    createdAt: "2026-05-22",
  },
  {
    id: "4",
    description: "Generate Swagger/OpenAPI spec files for the v2 endpoints.",
    priority: "Low",
    dueDate: "2026-06-05",
    status: "pending",
    createdAt: "2026-05-23",
  },
  {
    id: "5",
    description: "Compress and convert homepage graphics to WebP format.",
    priority: "Low",
    dueDate: "2026-06-10",
    status: "completed",
    createdAt: "2026-05-24",
  },
  {
    id: "6",
    description: "Implement OAuth2 authentication with Google and GitHub.",
    priority: "High",
    dueDate: "2026-06-15",
    status: "in-progress",
    createdAt: "2026-05-25",
  },
  {
    id: "7",
    description: "Write unit tests for the user authentication module.",
    priority: "Medium",
    dueDate: "2026-06-20",
    status: "pending",
    createdAt: "2026-05-26",
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all")
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "created">(
    "dueDate"
  )

  // Dialog states
  const [isDeleteOpen, setIsDeleteOpen] = useState<string | null>(null)
  const [isEditOpen, setIsEditOpen] = useState<string | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // Form states
  const [editForm, setEditForm] = useState<Partial<Task>>({})
  const [addForm, setAddForm] = useState<Partial<Task>>({
    priority: "Medium",
    status: "pending",
    dueDate: new Date().toISOString().split("T")[0],
  })

  // Stats
  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((t) => t.status === "pending").length
  const completedTasks = tasks.filter((t) => t.status === "completed").length

  const CARDDATA = [
    {
      name: "Total Tasks",
      count: totalTasks,
      icon: <CircleArrowOutUpRight className="text-blue-500" />,
      color: "border-blue-500",
      url: "#",
    },
    {
      name: "Pending Tasks",
      count: pendingTasks,
      icon: <AlertCircle className="text-yellow-500" />,
      color: "border-yellow-500",
      url: "#",
    },
    {
      name: "Complete Tasks",
      count: completedTasks,
      icon: <CheckCircle2 className="text-green-500" />,
      color: "border-green-500",
      url: "#",
    },
  ]

  // Filter and sort
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      if (sortBy === "dueDate")
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      if (sortBy === "priority") {
        const prioMap = { High: 3, Medium: 2, Low: 1 }
        return prioMap[b.priority] - prioMap[a.priority]
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setIsDeleteOpen(null)
    toast.success(`Task #${id} deleted successfully.`)
  }

  const handleStatusToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status:
                t.status === "completed" ? "pending" : ("completed" as Status),
            }
          : t
      )
    )
    const task = tasks.find((t) => t.id === id)
    const newStatus = task?.status === "completed" ? "pending" : "completed"
    toast.success(`Task marked as ${newStatus}.`)
  }

  const handleEdit = (task: Task) => {
    setEditForm({ ...task })
    setIsEditOpen(task.id)
  }

  const saveEdit = () => {
    if (!editForm.id || !editForm.description || !editForm.dueDate) {
      toast.error("Please fill all required fields.")
      return
    }
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editForm.id ? ({ ...t, ...editForm } as Task) : t
      )
    )
    setIsEditOpen(null)
    toast.success("Task updated successfully.")
  }

  const handleAdd = () => {
    if (!addForm.description || !addForm.dueDate) {
      toast.error("Please fill all required fields.")
      return
    }
    const newTask: Task = {
      id: String(tasks.length + 1),
      description: addForm.description!,
      priority: (addForm.priority as Priority) || "Medium",
      dueDate: addForm.dueDate!,
      status: (addForm.status as Status) || "pending",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTasks((prev) => [...prev, newTask])
    setIsAddOpen(false)
    setAddForm({
      priority: "Medium",
      status: "pending",
      dueDate: new Date().toISOString().split("T")[0],
    })
    toast.success("Task added successfully.")
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
  }

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <>
      <div className="">
        {" "}
        <PageHeader
          icon={<LayoutDashboardIcon size={2} />}
          title="My Tasks"
          description="Manage, organize, and track all your tasks in one centralized view."
          btnname="Add Task"
          btnIcon={<PlusSquare />}
          onButtonClick={() => setIsAddOpen(true)}
        />
        <StatusCard data={CARDDATA} />
        <div className="m-4">
          {/* Filters Bar */}
          <div className="flex flex-col gap-4 border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative max-w-[350px] flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={(v) => setStatusFilter(v as Status | "all")}
                >
                  <SelectTrigger className="w-[160px]">
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={priorityFilter}
                  onValueChange={(v) =>
                    setPriorityFilter(v as Priority | "all")
                  }
                >
                  <SelectTrigger className="w-[160px]">
                    <AlertCircle className="mr-2 h-3.5 w-3.5" />
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={sortBy}
                  onValueChange={(v) => setSortBy(v as typeof sortBy)}
                >
                  <SelectTrigger className="w-[160px]">
                    <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="created">Created Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {filteredTasks.length} of {tasks.length} tasks
            </div>
          </div>

          {/* Tasks Table */}
          <div className="border bg-card shadow-sm">
            <div>
              <Table className="w-full">
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-12 text-center">
                      <Check size={"16px"} />{" "}
                    </TableHead>
                    <TableHead>Task Description</TableHead>
                    <TableHead className="w-28 text-center">Priority</TableHead>
                    <TableHead className="w-36 text-center">Due Date</TableHead>
                    <TableHead className="w-28 text-center">Status</TableHead>
                    <TableHead className="w-16 text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TableRow
                        key={task.id}
                        className={`transition-colors hover:bg-muted/40 ${
                          task.status === "completed" ? "opacity-60" : ""
                        }`}
                      >
                        <TableCell className="text-center">
                          <Checkbox
                            id={`checkbox-${task.id}`}
                            checked={task.status === "completed"}
                            onCheckedChange={() => handleStatusToggle(task.id)}
                            aria-label="Mark as complete"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            <span
                              className={`w-118 truncate text-sm font-medium ${
                                task.status === "completed"
                                  ? "text-muted-foreground line-through"
                                  : "text-card-foreground"
                              }`}
                            >
                              {task.description}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              #{task.id} • Created {formatDate(task.createdAt)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={
                              task.priority === "High"
                                ? "border-red-500/30 bg-red-500/10 text-red-500"
                                : task.priority === "Medium"
                                  ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                                  : "border-green-500/30 bg-green-500/10 text-green-500"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <CalendarIcon
                              className={`h-3.5 w-3.5 ${
                                isOverdue(task.dueDate) &&
                                task.status !== "completed"
                                  ? "text-red-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <span
                              className={`text-xs ${
                                isOverdue(task.dueDate) &&
                                task.status !== "completed"
                                  ? "font-semibold text-red-500"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {formatDate(task.dueDate)}
                              {isOverdue(task.dueDate) &&
                                task.status !== "completed" &&
                                " (Overdue)"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {getStatusIcon(task.status)}
                            <Badge
                              variant="secondary"
                              className={`text-[10px] capitalize ${
                                task.status === "completed"
                                  ? "bg-green-500/10 text-green-500"
                                  : task.status === "in-progress"
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "bg-yellow-500/10 text-yellow-500"
                              }`}
                            >
                              {task.status.replace("-", " ")}
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
                                className="cursor-pointer gap-2"
                                onSelect={() => handleEdit(task)}
                              >
                                <PenIcon className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer gap-2"
                                onSelect={() => handleStatusToggle(task.id)}
                              >
                                {getStatusIcon(
                                  task.status === "completed"
                                    ? "pending"
                                    : "completed"
                                )}
                                {task.status === "completed"
                                  ? "Mark Pending"
                                  : "Mark Complete"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
                                onSelect={() => setIsDeleteOpen(task.id)}
                              >
                                <TrashIcon className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          {/* Delete Dialog */}
                          <AlertDialog
                            open={isDeleteOpen === task.id}
                            onOpenChange={(open) =>
                              !open && setIsDeleteOpen(null)
                            }
                          >
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Task #{task.id}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this task?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                                  onClick={() => handleDelete(task.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          {/* Edit Dialog */}
                          <Dialog
                            open={isEditOpen === task.id}
                            onOpenChange={(open) =>
                              !open && setIsEditOpen(null)
                            }
                          >
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Edit Task #{task.id}</DialogTitle>
                                <DialogDescription>
                                  Make changes to your task here. Click save
                                  when you're done.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-desc">Description</Label>
                                  <Textarea
                                    id="edit-desc"
                                    value={editForm.description || ""}
                                    onChange={(e) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    placeholder="Task description..."
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-priority">
                                      Priority
                                    </Label>
                                    <Select
                                      value={editForm.priority}
                                      onValueChange={(v) =>
                                        setEditForm((prev) => ({
                                          ...prev,
                                          priority: v as Priority,
                                        }))
                                      }
                                    >
                                      <SelectTrigger id="edit-priority">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="High">
                                          High
                                        </SelectItem>
                                        <SelectItem value="Medium">
                                          Medium
                                        </SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-status">Status</Label>
                                    <Select
                                      value={editForm.status}
                                      onValueChange={(v) =>
                                        setEditForm((prev) => ({
                                          ...prev,
                                          status: v as Status,
                                        }))
                                      }
                                    >
                                      <SelectTrigger id="edit-status">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">
                                          Pending
                                        </SelectItem>
                                        <SelectItem value="in-progress">
                                          In Progress
                                        </SelectItem>
                                        <SelectItem value="completed">
                                          Completed
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-due">Due Date</Label>
                                  <Input
                                    id="edit-due"
                                    type="date"
                                    value={editForm.dueDate || ""}
                                    onChange={(e) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        dueDate: e.target.value,
                                      }))
                                    }
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setIsEditOpen(null)}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={saveEdit}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                          <ListTodo className="h-8 w-8 text-muted-foreground/40" />
                          <p className="text-sm font-medium">No tasks found</p>
                          <p className="text-xs">
                            Try adjusting your filters or add a new task.
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
        {/* Add Task Dialog */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task to add to your list. Fill in the details
                below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="add-desc">Description *</Label>
                <Textarea
                  id="add-desc"
                  value={addForm.description || ""}
                  onChange={(e) =>
                    setAddForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="What needs to be done?"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="add-priority">Priority</Label>
                  <Select
                    value={addForm.priority}
                    onValueChange={(v) =>
                      setAddForm((prev) => ({
                        ...prev,
                        priority: v as Priority,
                      }))
                    }
                  >
                    <SelectTrigger id="add-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="add-status">Status</Label>
                  <Select
                    value={addForm.status}
                    onValueChange={(v) =>
                      setAddForm((prev) => ({ ...prev, status: v as Status }))
                    }
                  >
                    <SelectTrigger id="add-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-due">Due Date *</Label>
                <Input
                  id="add-due"
                  type="date"
                  value={addForm.dueDate || ""}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, dueDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>
                <PlusSquare className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
