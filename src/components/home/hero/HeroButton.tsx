import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function HeroButton() {
  const navigate = useNavigate()

  return (
    <div className="mt-8 flex flex-row items-center justify-center gap-4">
      <Button
        onClick={() => navigate("/dashboard")}
        className="px-8 py-6 transition-transform duration-150 ease-in-out hover:scale-105 focus:scale-105 active:scale-95"
      >
        Get Started
      </Button>
    </div>
  )
}
