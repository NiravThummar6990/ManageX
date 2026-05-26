import { LoginForm } from "@/components/login-form"

export default function Login() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted bg-gradient-to-br from-[#93b49e] via-[#191d23] to-[#586c5e] p-6 md:p-8">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm />
        </div>
      </div>
    </>
  )
}
