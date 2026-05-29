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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import BrainCircuitIcon from "@/components/ui/brain-circuit-icon"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PenIcon from "@/components/ui/pen-icon"
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
import { Textarea } from "@/components/ui/textarea"
import TrashIcon from "@/components/ui/trash-icon"
import {
  formatDate,
  getTaskStats,
  getUpcomingTasks,
} from "@/lib/task-utils"
import { useTaskStore } from "@/store/task-store"
import { getGreetingByTime, useUserStore } from "@/store/user-store"
import type { Priority, Status, Task } from "@/types/task"
import {
  CircleArrowOutUpRight,
  MoreHorizontalIcon,
  PlusSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  Check,
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function DashboardHome() {
  const navigate = useNavigate()
  const userName = useUserStore((s) => s.name)
  const greeting = getGreetingByTime(userName)

  const tasks = useTaskStore((s) => s.tasks)
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const startProgress = useTaskStore((s) => s.startProgress)
  const toggleComplete = useTaskStore((s) => s.toggleComplete)

  const pendingTasksList = tasks.filter((t) => t.status === "pending")
  const stats = getTaskStats(tasks)
  const upcomingTasks = getUpcomingTasks(tasks)

  const [isCompleteOpen, setIsCompleteOpen] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState<string | null>(null)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState<string | null>(null)

  const [newTaskDesc, setNewTaskDesc] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("Medium")
  const [newTaskDueDate, setNewTaskDueDate] = useState("")
  const [newTaskStatus, setNewTaskStatus] = useState<Status>("pending")
  const [editForm, setEditForm] = useState<Partial<Task>>({})

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

  const resetAddForm = () => {
    setNewTaskDesc("")
    setNewTaskPriority("Medium")
    setNewTaskDueDate("")
    setNewTaskStatus("pending")
  }

  const handleAddTask = () => {
    if (!newTaskDesc.trim()) {
      toast.error("Please enter task description.")
      return
    }
    if (!newTaskDueDate) {
      toast.error("Please select due date.")
      return
    }

    addTask({
      description: newTaskDesc.trim(),
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      status: newTaskStatus,
    })
    setIsAddTaskOpen(false)
    resetAddForm()
    toast.success("Task added successfully!")
  }

  const handleEditSave = () => {
    if (!editForm.id || !editForm.description?.trim() || !editForm.dueDate) {
      toast.error("Please fill all required fields.")
      return
    }
    updateTask(editForm.id, editForm)
    setIsEditOpen(null)
    toast.success("Task updated successfully.")
  }

  const openEdit = (task: Task) => {
    setEditForm({ ...task })
    setIsEditOpen(task.id)
  }

  return (
    <>
      <PageHeader
        icon={<BrainCircuitIcon />}
        title={greeting}
        description="Organize and track your tasks to stay productive and ahead of your goals."
        btnname="Add Task"
        btnIcon={<PlusSquare />}
        onButtonClick={() => setIsAddTaskOpen(true)}
      />
      <StatusCard data={CARDDATA} />

      <div className="m-4 grid grid-cols-1 items-start gap-6 md:grid-cols-4">
        <div className="col-span-1 overflow-hidden border bg-card shadow-sm md:col-span-3">
          <div className="border-b bg-muted/40 p-4">
            <h2 className="text-base font-bold tracking-tight">
              Recent Pending Tasks
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[600px]">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12 text-center">
                    <Check size={16} />
                  </TableHead>
                  <TableHead>Task Description</TableHead>
                  <TableHead className="w-28 text-center">Priority</TableHead>
                  <TableHead className="w-36 text-center">Due Date</TableHead>
                  <TableHead className="w-16 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingTasksList.length > 0 ? (
                  pendingTasksList.map((data) => (
                    <TableRow
                      key={data.id}
                      className="transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="text-center">
                        <Checkbox
                          id={`checkbox-${data.id}`}
                          aria-label="Select task"
                          onCheckedChange={() => toggleComplete(data.id)}
                        />
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
                          className={
                            data.priority === "High"
                              ? "border-red-500/30 bg-red-500/10 text-red-500"
                              : data.priority === "Medium"
                                ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                                : "border-green-500/30 bg-green-500/10 text-green-500"
                          }
                        >
                          {data.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-xs text-muted-foreground">
                        {formatDate(data.dueDate)}
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
                              onSelect={() => openEdit(data)}
                            >
                              <PenIcon /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer gap-2"
                              onSelect={() => setIsCompleteOpen(data.id)}
                            >
                              <CircleArrowOutUpRight className="h-4 w-4" />{" "}
                              Continue
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
                              <AlertDialogTitle>
                                Task #{data.id}: {data.description}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Due Date: {formatDate(data.dueDate)}
                                <br className="mt-2" />
                                Start working on this task? It will move to In
                                Progress.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  startProgress(data.id)
                                  setIsCompleteOpen(null)
                                  navigate("/dashboard/inprogress")
                                }}
                              >
                                Continue
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
                                onClick={() => {
                                  deleteTask(data.id)
                                  setIsDeleteOpen(null)
                                  toast.success(
                                    `Task #${data.id} deleted successfully.`
                                  )
                                }}
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
                    <TableCell colSpan={5} className="h-24 text-center text-sm text-muted-foreground">
                      No pending tasks. Great job!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="col-span-1 overflow-hidden border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b bg-muted/40 p-4">
            <Clock className="h-4 w-4 text-orange-500" />
            <h2 className="text-base font-bold tracking-tight">
              Upcoming Deadlines
            </h2>
          </div>
          <div className="max-h-[385px] divide-y overflow-y-auto">
            {upcomingTasks.map((e) => (
              <AlertDialog key={e.id}>
                <AlertDialogTrigger asChild>
                  <div className="flex cursor-pointer flex-col gap-1.5 p-3.5 text-left transition-colors hover:bg-muted/50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-muted-foreground">
                        #{e.id}
                      </span>
                      <span className="bg-orange-500/10 px-2 py-0.5 text-xs font-semibold text-orange-500">
                        {formatDate(e.dueDate)}
                      </span>
                    </div>
                    <p
                      className="line-clamp-2 text-xs font-medium text-card-foreground"
                      title={e.description}
                    >
                      {e.description}
                    </p>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Task #{e.id}</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                      <span className="block font-semibold text-card-foreground">
                        {e.description}
                      </span>
                      <span>Due Date: {formatDate(e.dueDate)}</span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        startProgress(e.id)
                        navigate("/dashboard/inprogress")
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PlusSquare className="h-5 w-5" />
              Add New Task
            </DialogTitle>
            <DialogDescription>
              Enter task details below to create a new task.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-desc">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="task-desc"
                placeholder="What needs to be done?"
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select
                  value={newTaskPriority}
                  onValueChange={(v) => setNewTaskPriority(v as Priority)}
                >
                  <SelectTrigger id="task-priority">
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
                <Label htmlFor="task-status">Status</Label>
                <Select
                  value={newTaskStatus}
                  onValueChange={(v) => setNewTaskStatus(v as Status)}
                >
                  <SelectTrigger id="task-status">
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
              <Label htmlFor="task-due">
                Due Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="task-due"
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddTaskOpen(false)
                resetAddForm()
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              <PlusSquare className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditOpen !== null}
        onOpenChange={(open) => !open && setIsEditOpen(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task #{editForm.id}</DialogTitle>
            <DialogDescription>
              Make changes to your task here. Click save when you&apos;re done.
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
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-priority">Priority</Label>
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
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
