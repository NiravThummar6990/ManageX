import { create } from "zustand"
import { persist } from "zustand/middleware"
import { nextTaskId, todayISO } from "@/lib/task-utils"
import type { Priority, Status, Task } from "@/types/task"

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
    startedAt: "2026-05-25",
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
    completedDate: "2026-06-08",
  },
  {
    id: "6",
    description: "Implement OAuth2 authentication with Google and GitHub.",
    priority: "High",
    dueDate: "2026-06-15",
    status: "in-progress",
    createdAt: "2026-05-25",
    startedAt: "2026-05-26",
  },
  {
    id: "7",
    description: "Write unit tests for the user authentication module.",
    priority: "Medium",
    dueDate: "2026-06-20",
    status: "pending",
    createdAt: "2026-05-26",
  },
  {
    id: "8",
    description: "Fix navigation bug on mobile responsive menu.",
    priority: "Medium",
    dueDate: "2026-05-25",
    status: "completed",
    createdAt: "2026-05-18",
    completedDate: "2026-05-24",
  },
  {
    id: "9",
    description: "Update README with deployment instructions.",
    priority: "Low",
    dueDate: "2026-05-20",
    status: "completed",
    createdAt: "2026-05-15",
    completedDate: "2026-05-19",
  },
  {
    id: "10",
    description: "Configure ESLint and Prettier for consistent code style.",
    priority: "Medium",
    dueDate: "2026-05-22",
    status: "completed",
    createdAt: "2026-05-16",
    completedDate: "2026-05-21",
  },
  {
    id: "11",
    description: "Integrate Stripe payment gateway for subscriptions.",
    priority: "High",
    dueDate: "2026-05-30",
    status: "completed",
    createdAt: "2026-05-17",
    completedDate: "2026-05-29",
  },
  {
    id: "12",
    description: "Refactor authentication middleware for enhanced security.",
    priority: "High",
    dueDate: "2026-06-25",
    status: "in-progress",
    createdAt: "2026-05-27",
    startedAt: "2026-05-27",
  },
  {
    id: "13",
    description: "Optimize database queries for user dashboard analytics.",
    priority: "Medium",
    dueDate: "2026-06-08",
    status: "in-progress",
    createdAt: "2026-05-28",
    startedAt: "2026-05-28",
  },
  {
    id: "14",
    description: "Set up CI/CD pipeline for staging environment.",
    priority: "Low",
    dueDate: "2026-06-12",
    status: "in-progress",
    createdAt: "2026-05-24",
    startedAt: "2026-05-24",
  },
  {
    id: "15",
    description: "Finalize onboarding documentation for new hires.",
    priority: "Medium",
    dueDate: "2026-06-10",
    status: "pending",
    createdAt: "2026-05-19",
  },
  {
    id: "16",
    description: "Submit budget report to finance department.",
    priority: "High",
    dueDate: "2026-06-15",
    status: "pending",
    createdAt: "2026-05-20",
  },
]

interface AddTaskInput {
  description: string
  priority: Priority
  dueDate: string
  status?: Status
}

interface TaskStore {
  tasks: Task[]
  addTask: (input: AddTaskInput) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  completeTask: (id: string) => void
  pauseTask: (id: string) => void
  restoreTask: (id: string) => void
  startProgress: (id: string) => void
  toggleComplete: (id: string) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: INITIAL_TASKS,

      addTask: (input) =>
        set((state) => {
          const status = input.status ?? "pending"
          const today = todayISO()
          const newTask: Task = {
            id: nextTaskId(state.tasks),
            description: input.description.trim(),
            priority: input.priority,
            dueDate: input.dueDate,
            status,
            createdAt: today,
            ...(status === "in-progress" ? { startedAt: today } : {}),
            ...(status === "completed" ? { completedDate: today } : {}),
          }
          return { tasks: [...state.tasks, newTask] }
        }),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      completeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: "completed" as Status,
                  completedDate: todayISO(),
                }
              : task
          ),
        })),

      pauseTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: "pending" as Status,
                  startedAt: undefined,
                }
              : task
          ),
        })),

      restoreTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: "pending" as Status,
                  completedDate: undefined,
                  startedAt: undefined,
                }
              : task
          ),
        })),

      startProgress: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: "in-progress" as Status,
                  startedAt: task.startedAt ?? todayISO(),
                }
              : task
          ),
        })),

      toggleComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== id) return task
            if (task.status === "completed") {
              return {
                ...task,
                status: "pending" as Status,
                completedDate: undefined,
              }
            }
            return {
              ...task,
              status: "completed" as Status,
              completedDate: todayISO(),
            }
          }),
        })),
    }),
    {
      name: "managex-tasks",
    }
  )
)
