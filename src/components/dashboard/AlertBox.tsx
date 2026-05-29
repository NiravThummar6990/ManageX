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

export function AlertBox({
  title,
  content,
  heading,
  btn1name,
  btn2name,
}: {
  title?: string
  heading: string
  content: string
  btn1name?: string
  btn2name?: string
}) {
  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogTrigger>{title}</AlertDialogTrigger>
        <AlertDialogHeader>
          <AlertDialogTitle>{heading}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {btn1name ? btn1name : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction>
            {btn2name ? btn2name : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
