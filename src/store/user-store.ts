import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserStore {
  name: string
  email: string
  avatar: string
  emailNotifications: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  updateProfile: (data: { name?: string; email?: string }) => void
  setEmailNotifications: (enabled: boolean) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      name: "Nirav Thummar",
      email: "niravthummar4129@gmail.com",
      avatar: "",
      emailNotifications: true,
      isAuthenticated: false,

      login: (email, password) => {
        if (!email.trim() || !password.trim()) return false
        set({
          email: email.trim(),
          isAuthenticated: true,
        })
        return true
      },

      register: (name, email, password) => {
        if (!name.trim() || !email.trim() || password.length < 8) return false
        set({
          name: name.trim(),
          email: email.trim(),
          isAuthenticated: true,
        })
        return true
      },

      logout: () => {
        set({ isAuthenticated: false })
      },

      updateProfile: (data) => {
        set((state) => ({
          name: data.name ?? state.name,
          email: data.email ?? state.email,
        }))
      },

      setEmailNotifications: (enabled) => {
        set({ emailNotifications: enabled })
      },
    }),
    {
      name: "managex-user",
      partialize: (state) => ({
        name: state.name,
        email: state.email,
        avatar: state.avatar,
        emailNotifications: state.emailNotifications,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export function getGreetingByTime(name: string) {
  const hour = new Date().getHours()
  const firstName = name.split(" ")[0] || name
  if (hour >= 5 && hour < 12) return `Good Morning, ${firstName}!`
  if (hour >= 12 && hour < 18) return `Good Afternoon, ${firstName}!`
  if (hour >= 18 && hour < 22) return `Good Evening, ${firstName}!`
  return `Good Night, ${firstName}!`
}
