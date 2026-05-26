import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars"
import { LoginForm } from "@/components/login-form"

export default function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted bg-gradient-to-br from-[#93b49e] via-[#191d23] to-[#586c5e] p-6 md:p-8">
      <GravityStarsBackground className="absolute inset-0 z-0" />
      <div className="relative z-10 w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
