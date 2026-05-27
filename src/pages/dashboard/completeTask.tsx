import PageHeader from "@/components/dashboard/PageHeader"
import DoubleCheckIcon from "@/components/ui/double-check-icon"

export default function CompleteTask() {
  return (
    <>
      <PageHeader
        icon={<DoubleCheckIcon />}
        title="Completed Tasks"
        description="Review all your accomplished tasks and track your productivity milestones."
      />
    </>
  )
}
