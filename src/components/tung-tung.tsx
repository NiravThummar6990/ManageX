import { BrainCircuitIcon, PlusSquare } from "lucide-react"
import PageHeader from "./dashboard/PageHeader"

export function TungTung() {
  return (
    <div className="w-full">
      <div className="w-full">
        <PageHeader
          icon={<BrainCircuitIcon />}
          title="All Tasks"
          description="Organize and track your tasks to stay productive and ahead of your goals."
          btnIcon={<PlusSquare className="mr-1" />}
          btnname="Add Task"
        />
      </div>
    </div>
  )
}
