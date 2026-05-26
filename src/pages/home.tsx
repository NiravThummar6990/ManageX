import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars"

import HeroButton from "@/components/home/hero/HeroButton"
import HeroHeading from "@/components/home/hero/HeroHeading"
import HeroSubHeading from "@/components/home/hero/HeroSubHeading"
import Navigation from "@/components/home/Navigation"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Gravity Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#AFD8BC]/70 via-[#191d23]/70 to-[#586c5e]/80">
        <GravityStarsBackground />
      </div>

      {/* Overlay */}
      {/* pointer-events-none mukvu important che */}
      <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-between py-4">
        {/* Navigation */}
        <nav className="flex w-full max-w-3xl justify-center">
          <Navigation />
        </nav>

        {/* Hero Section */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="w-full max-w-3xl">
            <HeroHeading />
            <HeroSubHeading />
          </div>

          <div className="mt-10 flex justify-center">
            <HeroButton />
          </div>
        </div>
      </div>
    </div>
  )
}
