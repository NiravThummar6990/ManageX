import PageHeader from "@/components/dashboard/PageHeader"
import BookIcon from "@/components/ui/book-icon"
import { PlusSquare } from "lucide-react"

export default function MyTasks() {
  return (
    <>
      <PageHeader
        icon={<BookIcon />}
        title="My Tasks"
        description="View, Manage and Add all your assigned tasks in one place."
        btnIcon={<PlusSquare className="mr-1" />}
        btnname="Add Task"
      />
    </>
  )
}
