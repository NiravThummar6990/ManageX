import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import UnorderedListIcon from "../ui/unordered-list-icon"
import { SunMoon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
export default function Navigation() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const MENU = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
  ]

  return (
    <nav className="w-full">
      <div className="flex w-full flex-row items-center justify-between">
        {/* logo */}
        <div className="flex h-14 items-center pl-4 md:h-18">
          <img
            src="../src/assets/main.png"
            alt="ManageX Logo"
            className="h-12 w-32 object-contain md:h-30"
            width={20}
            height={20}
          />
        </div>
        {/* menu - centered for large screens */}
        <div className="pointer-events-none absolute right-0 left-0 z-10 mx-auto flex flex-1 justify-center md:pointer-events-auto md:static md:justify-center">
          <div className="hidden flex-row items-center gap-4 md:flex md:gap-8">
            {MENU.map((i) => (
              <Link
                key={i.name}
                to={i.link}
                className="pointer-events-auto text-base font-medium"
              >
                {i.name}
              </Link>
            ))}
          </div>
        </div>
        {/* login/signup buttons and mobile menu trigger */}
        <div className="flex flex-row items-center gap-2 pr-4 md:gap-4 md:pr-4">
          {/* Hamburger menu for mobile */}
          <button
            className="block p-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <UnorderedListIcon />
          </button>
          {/* Buttons only show on md+ screens */}
          <div className="hidden flex-row items-center gap-4 md:flex">
            {/* Theme switcher using theme-provider */}

            <Button
              variant={"secondary"}
              className="w-fit"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <SunMoon />
            </Button>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Sign Up</Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 z-1 flex h-full w-60 flex-col bg-[#131814] p-8 shadow-lg md:hidden">
          <button
            className="mb-6 ml-auto text-3xl font-bold"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <nav className="flex flex-col gap-6">
            {MENU.map((i) => (
              <Link
                key={i.name}
                to={i.link}
                className="text-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {i.name}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <Button className="w-full">
              <SunMoon />
            </Button>
            <Button onClick={() => navigate("/login")} className="w-full">
              Login
            </Button>
            <Button onClick={() => navigate("/register")} className="w-full">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
