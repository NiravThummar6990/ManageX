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
  CircleArrowOutUpRight,
  MoreHorizontalIcon,
  PlusSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  Check,
} from "lucide-react"
import { useState } from "react"
import { MdAssignment, MdPendingActions, MdTaskAlt } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

type Priority = "High" | "Medium" | "Low"
type Status = "pending" | "in-progress" | "completed"

interface Task {
  id: string
  description: string
  priority: Priority
  dueDate: string
  status: Status
}

function getGreetingByTime() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return "Good Morning, Nirav's !"
  if (hour >= 12 && hour < 18) return "Good Afternoon, Nirav's !"
  if (hour >= 18 && hour < 22) return "Good Evening, Nirav's !"
  return "Good Night, Nirav's !"
}

export default function DashboardHome() {
  const greeting = getGreetingByTime()
  const navigate = useNavigate()

  // Tasks state - aa dynamic thai jase
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      description: "Set up automated nightly cron jobs for PostgreSQL backup.",
      priority: "High",
      dueDate: "May 29, 2026",
      status: "pending",
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
      status: "pending",
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
      status: "pending",
    },
  ])

  // Modal states
  const [isCompleteOpen, setIsCompleteOpen] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState<string | null>(null)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

  // Add task form state
  const [newTaskDesc, setNewTaskDesc] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("Medium")
  const [newTaskDueDate, setNewTaskDueDate] = useState("")
  const [newTaskStatus, setNewTaskStatus] = useState<Status>("pending")

  // Stats - dynamic
  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((t) => t.status === "pending").length
  const completedTasks = tasks.filter((t) => t.status === "completed").length

  const CARDDATA = [
    {
      name: "Total Tasks",
      count: totalTasks,
      icon: <CircleArrowOutUpRight className="text-blue-500" />,
      color: "border-blue-500",
      url: "/dashboard/mytasks",
    },
    {
      name: "Pending Tasks",
      count: pendingTasks,
      icon: <AlertCircle className="text-yellow-500" />,
      color: "border-yellow-500",
      url: "/dashboard/inprogress",
    },
    {
      name: "Complete Tasks",
      count: completedTasks,
      icon: <CheckCircle2 className="text-green-500" />,

      color: "border-green-500",
      url: "/dashboard/complete",
    },
  ]

  const UPCOMMINGTASK = [
    {
      id: 1,
      task: "Compress and convert homepage graphics to WebP format.",
      dueDate: "June 05, 2026",
      is: true,
    },
    {
      id: 2,
      task: "Finalize onboarding documentation for new hires.",
      dueDate: "June 10, 2026",
      is: true,
    },
    {
      id: 3,
      task: "Submit budget report to finance department.",
      dueDate: "June 15, 2026",
      is: true,
    },
    {
      id: 4,
      task: "Review and merge feature branch 'dashboard-stats'.",
      dueDate: "June 20, 2026",
      is: true,
    },
    {
      id: 5,
      task: "Refactor authentication middleware for enhanced security.",
      dueDate: "June 25, 2026",
      is: true,
    },
  ]

  // Add task handler
  const handleAddTask = () => {
    if (!newTaskDesc.trim()) {
      toast.error("Please enter task description.")
      return
    }
    if (!newTaskDueDate) {
      toast.error("Please select due date.")
      return
    }

    const newTask: Task = {
      id: String(tasks.length + 1),
      description: newTaskDesc.trim(),
      priority: newTaskPriority,
      dueDate: new Date(newTaskDueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: newTaskStatus,
    }

    setTasks((prev) => [...prev, newTask])
    setIsAddTaskOpen(false)

    // Reset form
    setNewTaskDesc("")
    setNewTaskPriority("Medium")
    setNewTaskDueDate("")
    setNewTaskStatus("pending")

    toast.success("Task added successfully!")
  }

  // Delete task handler
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setIsDeleteOpen(null)
    toast.success(`Task #${id} deleted successfully.`)
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
        {/* LEFT SECTION: Recent Tasks Table */}
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
                {tasks.map((data) => (
                  <TableRow
                    key={data?.id}
                    className="transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        id={`checkbox-${data?.id}`}
                        aria-label="Select task"
                      />
                    </TableCell>
                    <TableCell className="max-w-xs text-sm font-medium md:max-w-md">
                      <span className="block truncate" title={data.description}>
                        {data.description}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={
                          data?.priority === "High"
                            ? "border-red-500/30 bg-red-500/10 text-red-500"
                            : data?.priority === "Medium"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                              : "border-green-500/30 bg-green-500/10 text-green-500"
                        }
                      >
                        {data?.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-xs text-muted-foreground">
                      {data?.dueDate}
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
                          <DropdownMenuItem className="cursor-pointer gap-2">
                            <PenIcon /> Edit
                          </DropdownMenuItem>

                          {/* Continue trigger */}
                          <DropdownMenuItem
                            className="cursor-pointer gap-2"
                            onSelect={() => setIsCompleteOpen(data.id)}
                          >
                            <CircleArrowOutUpRight className="h-4 w-4" />{" "}
                            Continue
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {/* Delete trigger */}
                          <DropdownMenuItem
                            className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
                            onSelect={() => setIsDeleteOpen(data.id)}
                          >
                            <TrashIcon /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* --- EXTERNAL DIALOGS TO PREVENT UI CRASH --- */}
                      <AlertDialog
                        open={isCompleteOpen === data.id}
                        onOpenChange={(open) =>
                          !open && setIsCompleteOpen(null)
                        }
                      >
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Task #{data?.id}: {data?.description}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Due Date: {data?.dueDate}
                              <br className="mt-2" />
                              "If you want to complete task then click
                              continue."
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                setIsCompleteOpen(null)
                                navigate("/dashboard/mytasks")
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog
                        open={isDeleteOpen === data.id}
                        onOpenChange={(open) => !open && setIsDeleteOpen(null)}
                      >
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Task #{data?.id}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              "Are you sure you want to delete this task? This
                              action cannot be undone."
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                              onClick={() => handleDeleteTask(data.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* RIGHT SECTION: Upcoming Deadlines */}
        <div className="col-span-1 overflow-hidden border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b bg-muted/40 p-4">
            <Clock className="h-4 w-4 text-orange-500" />
            <h2 className="text-base font-bold tracking-tight">
              Upcoming Deadlines
            </h2>
          </div>
          <div className="max-h-[385px] divide-y overflow-y-auto">
            {UPCOMMINGTASK.map((e) => (
              <AlertDialog key={e?.id}>
                <AlertDialogTrigger asChild>
                  <div className="flex cursor-pointer flex-col gap-1.5 p-3.5 text-left transition-colors hover:bg-muted/50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-muted-foreground">
                        #{e?.id}
                      </span>
                      <span className="bg-orange-500/10 px-2 py-0.5 text-xs font-semibold text-orange-500">
                        {e?.dueDate}
                      </span>
                    </div>
                    <p
                      className="line-clamp-2 text-xs font-medium text-card-foreground"
                      title={e?.task}
                    >
                      {e?.task}
                    </p>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Task #{e?.id}</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                      <span className="block font-semibold text-card-foreground">
                        {e?.task}
                      </span>
                      <span>Due Date: {e?.dueDate}</span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => navigate("/dashboard/inprogress")}
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

      {/* ========== ADD TASK DIALOG (MODAL) ========== */}
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
            {/* Description */}
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

            {/* Priority & Status */}
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

            {/* Due Date */}
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
                setNewTaskDesc("")
                setNewTaskPriority("Medium")
                setNewTaskDueDate("")
                setNewTaskStatus("pending")
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
    </>
  )
}
