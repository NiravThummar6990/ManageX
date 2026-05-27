import PageHeader from "@/components/dashboard/PageHeader"
import { StatusCard } from "@/components/dashboard/StatusCard"
import BrainCircuitIcon from "@/components/ui/brain-circuit-icon"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MoreHorizontalIcon, PlusSquare } from "lucide-react"
import { MdAssignment, MdPendingActions, MdTaskAlt } from "react-icons/md"

function getGreetingByTime() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    return "Good Morning, Nirav's !"
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon, Nirav's !"
  } else if (hour >= 18 && hour < 22) {
    return "Good Evening, Nirav's !"
  } else {
    return "Good Night, Nirav's !"
  }
}
export default function DashboardHome() {
  const greeting = getGreetingByTime()
  const CARDDATA = [
    {
      name: "Total Tasks",
      count: 16,
      icon: <MdAssignment className="text-blue-500" />,
      color: "border-blue-500",
    },
    {
      name: "Pending Tasks",
      count: 5,
      icon: <MdPendingActions className="text-yellow-500" />,
      color: "border-yellow-500",
    },
    {
      name: "Complete Tasks",
      count: 11,
      icon: <MdTaskAlt className="text-green-500" />,
      color: "border-green-500",
    },
  ]

  const RECENTTASKS = [
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
  ]
  return (
    <>
      <PageHeader
        icon={<BrainCircuitIcon />}
        title={greeting}
        description="Organize and track your tasks to stay productive and ahead of your
            goals."
        btnname="Add Task"
        btnIcon={<PlusSquare />}
        onButtonClick={() => alert("Added")}
      />
      <StatusCard data={CARDDATA} />
      <div className="ml-4">
        <Table className="w-3/4">
          <TableHeader className="bg-accent/70">
            <TableRow>
              <TableHead></TableHead>
              <TableHead align="center" className="w-20 text-center">
                Task
              </TableHead>
              <TableHead className="text-center">Priority</TableHead>
              <TableHead className="text-center">Due Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-accent/25">
            {RECENTTASKS.map((data) => (
              <TableRow key={data?.id}>
                <TableCell className="text-center">
                  <FieldGroup>
                    <Field orientation="horizontal">
                      <Checkbox
                        id="terms-checkbox-basic"
                        name="terms-checkbox-basic"
                      />
                    </Field>
                  </FieldGroup>
                </TableCell>
                <TableCell>
                  {data.description}
                  {/* <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {data?.description.length > 20
                          ? `${data?.description.slice(0, 30)}...`
                          : data?.description}
                      </TooltipTrigger>
                      <TooltipContent>{data?.description}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider> */}
                </TableCell>

                <TableCell
                  className={
                    data?.priority === "High"
                      ? "text-center font-semibold text-red-600"
                      : data?.priority === "Medium"
                        ? "text-center font-semibold text-yellow-600"
                        : "text-center font-semibold text-green-600"
                  }
                >
                  {data?.priority}
                </TableCell>
                <TableCell className="text-center">{data?.dueDate}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="size-8"
                      >
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
