export type Priority = "High" | "Medium" | "Low"
export type Status = "pending" | "in-progress" | "completed"

export interface Task {
  id: string
  description: string
  priority: Priority
  dueDate: string
  status: Status
  createdAt: string
  startedAt?: string
  completedDate?: string
}

export interface TaskStats {
  total: number
  pending: number
  inProgress: number
  completed: number
}
