"use client"

import { useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { MusicSection } from "@/components/music-section"
import { songData } from "@/data/songs"

export default function Home() {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const glowContainer = document.getElementById("glow-container")
      if (glowContainer) {
        glowContainer.style.setProperty("--x", `${clientX}px`)
        glowContainer.style.setProperty("--y", `${clientY}px`)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/90 relative">
      <HeroSection />
      <MusicSection songs={songData.songs} />
    </main>
  )
}
