import PageHeader from "@/components/dashboard/PageHeader"
import AccessibilityIcon from "@/components/ui/accessibility-icon"

export default function InProgress() {
  return (
    <>
      <PageHeader
        icon={
          <AccessibilityIcon
            rotateFrom={0}
            rotateTo={360}
            duration={1}
            ease="linear"
            personDuration={1.5}
            personEase="easeInOut"
            exitDuration={0.7}
          />
        }
        title="In Progress Tasks"
        description="Monitor and update your tasks that are currently in progress."
      />
    </>
  )
}
