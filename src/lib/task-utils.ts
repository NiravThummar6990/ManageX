import type { Priority, Task, TaskStats } from "@/types/task"

export function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0]
}

export function isSameDay(dateStr: string, calendarDate: Date): boolean {
  const d = new Date(`${dateStr}T00:00:00`)
  return (
    d.getDate() === calendarDate.getDate() &&
    d.getMonth() === calendarDate.getMonth() &&
    d.getFullYear() === calendarDate.getFullYear()
  )
}

export function isOverdue(dueDate: string, status: Task["status"]): boolean {
  if (status === "completed") return false
  return new Date(`${dueDate}T00:00:00`) < new Date(new Date().setHours(0, 0, 0, 0))
}

export function getTaskStats(tasks: Task[]): TaskStats {
  return {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }
}

export function getUpcomingTasks(tasks: Task[], limit = 5): Task[] {
  return tasks
    .filter((t) => t.status !== "completed")
    .sort(
      (a, b) =>
        new Date(`${a.dueDate}T00:00:00`).getTime() -
        new Date(`${b.dueDate}T00:00:00`).getTime()
    )
    .slice(0, limit)
}

export function sortTasksByDueDate(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) =>
      new Date(`${a.dueDate}T00:00:00`).getTime() -
      new Date(`${b.dueDate}T00:00:00`).getTime()
  )
}

export function sortTasksByPriority(tasks: Task[]): Task[] {
  const prioMap: Record<Priority, number> = { High: 3, Medium: 2, Low: 1 }
  return [...tasks].sort(
    (a, b) => prioMap[b.priority] - prioMap[a.priority]
  )
}

export function sortTasksByCreated(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) =>
      new Date(`${b.createdAt}T00:00:00`).getTime() -
      new Date(`${a.createdAt}T00:00:00`).getTime()
  )
}

export function nextTaskId(tasks: Task[]): string {
  const maxId = tasks.reduce((max, task) => {
    const numericId = Number.parseInt(task.id, 10)
    return Number.isNaN(numericId) ? max : Math.max(max, numericId)
  }, 0)
  return String(maxId + 1)
}
