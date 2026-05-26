import HeroButton from "@/components/home/hero/HeroButton"
import HeroHeading from "@/components/home/hero/HeroHeading"
import HeroSubHeading from "@/components/home/hero/HeroSubHeading"
import Navigation from "@/components/home/Navigation"
import { motion } from "framer-motion"

const bubbles = Array.from({ length: 70 })

export default function Home() {
  return (
    <>
      {/* main */}
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        {/* Background Image */}
        <div
          className="fixed inset-0 -z-10 h-full w-full"
          style={{
            backgroundImage: "url('../src/assets/BG1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#AFD8BC]/70 via-[#191d23]/70 to-[#586c5e]/80" />

        {/* Color Bubbles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {bubbles.map((_, i) => {
            // Make the bubbles small: reduce max and min values
            const size = Math.random() * 8 + 3 // Was: Math.random() * 18 + 6
            const left = Math.random() * 100
            const duration = Math.random() * 15 + 10
            const delay = Math.random() * 5

            const colors = [
              "#AFD8BC",
              "#8FE3CF",
              "#B1AFFF",
              "#F9A8D4",
              "#93C5FD",
              "#FDE68A",
              "#86EFAC",
              "#C4B5FD",
            ]

            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  bottom: -100,
                  background: colors[Math.floor(Math.random() * colors.length)],
                  boxShadow: `0 0 20px ${
                    colors[Math.floor(Math.random() * colors.length)]
                  }`,
                  opacity: 0.7,
                }}
                animate={{
                  y: [0, -1200],
                  x: [0, Math.random() * 120 - 60],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "linear",
                }}
              />
            )
          })}
        </div>

        {/* Content */}
        <div className="relative flex min-h-screen flex-col items-center justify-between gap-8 py-4">
          {/* Navigation */}
          <nav className="mb-8 flex w-full max-w-3xl justify-center">
            <Navigation />
          </nav>

          {/* Header */}
          <div className="my-6 w-full max-w-3xl text-center">
            <HeroHeading />
            <HeroSubHeading />
          </div>

          {/* Button */}
          <div className="mb-15 flex w-full max-w-3xl justify-center">
            <HeroButton />
          </div>
        </div>
      </div>
    </>
  )
}
