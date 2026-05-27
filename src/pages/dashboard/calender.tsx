import PageHeader from "@/components/dashboard/PageHeader"
import CreditCard from "@/components/ui/credit-card"

export default function Calendar() {
  return (
    <>
      <PageHeader
        icon={<CreditCard />}
        title="Calendar Overview"
        description="Plan, organize, and track your schedule efficiently with your personalized calendar."
      />
    </>
  )
}
