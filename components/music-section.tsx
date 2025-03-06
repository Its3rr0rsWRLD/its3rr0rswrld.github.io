"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Music, AppleIcon, Youtube, ArrowDown } from "lucide-react"

import { SongCard } from "@/components/song-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Song } from "@/types/song"

export type EmbedType = "youtube" | "spotify" | "apple_music"

interface MusicSectionProps {
  songs: Song[]
}

export function MusicSection({ songs }: MusicSectionProps) {
  const [sortBy, setSortBy] = useState<string>("newest")
  const [embedType, setEmbedType] = useState<EmbedType>("youtube")
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Refs for button elements
  const youtubeButtonRef = useRef<HTMLButtonElement>(null)
  const appleMusicButtonRef = useRef<HTMLButtonElement>(null)
  const spotifyButtonRef = useRef<HTMLButtonElement>(null)

  // State for slider position and dimensions
  const [sliderStyle, setSliderStyle] = useState({
    width: "33.333%",
    left: "0%",
  })

  // Update slider position and dimensions when embedType changes
  useEffect(() => {
    const updateSliderStyle = () => {
      let targetButton: HTMLButtonElement | null = null

      switch (embedType) {
        case "youtube":
          targetButton = youtubeButtonRef.current
          break
        case "apple_music":
          targetButton = appleMusicButtonRef.current
          break
        case "spotify":
          targetButton = spotifyButtonRef.current
          break
      }

      if (targetButton && targetButton.parentElement) {
        const parentRect = targetButton.parentElement.getBoundingClientRect()
        const buttonRect = targetButton.getBoundingClientRect()

        // Calculate width and position as percentages of parent width
        const width = (buttonRect.width / parentRect.width) * 100
        const left = ((buttonRect.left - parentRect.left) / parentRect.width) * 100

        setSliderStyle({
          width: `${width}%`,
          left: `${left}%`,
        })
      }
    }

    // Initial update
    updateSliderStyle()

    // Update on window resize
    window.addEventListener("resize", updateSliderStyle)
    return () => window.removeEventListener("resize", updateSliderStyle)
  }, [embedType])

  // Sort songs
  const sortedSongs = [...songs].sort((a, b) => {
    if (sortBy === "newest") {
      return b.year - a.year
    } else if (sortBy === "oldest") {
      return a.year - b.year
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="music-section" className="py-20 px-4" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            Discography
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Check out my latest releases and music across different platforms.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center mb-8"
          >
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <ArrowDown className="h-3 w-3 animate-bounce" />
              <span>Changes what service the songs play through</span>
              <ArrowDown className="h-3 w-3 animate-bounce" />
            </div>

            <div className="bg-secondary/30 backdrop-blur-sm p-1 rounded-lg inline-flex relative">
              {/* Sliding background */}
              <motion.div
                className="absolute top-1 bottom-1 bg-primary/20 rounded-md z-0"
                initial={false}
                animate={{
                  width: sliderStyle.width,
                  left: sliderStyle.left,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              <Button
                ref={youtubeButtonRef}
                variant="ghost"
                size="sm"
                onClick={() => setEmbedType("youtube")}
                className={`flex items-center gap-2 z-10 relative ${embedType === "youtube" ? "text-primary" : ""}`}
              >
                <Youtube className="h-4 w-4" />
                <span className="hidden sm:inline">YouTube</span>
              </Button>
              <Button
                ref={appleMusicButtonRef}
                variant="ghost"
                size="sm"
                onClick={() => setEmbedType("apple_music")}
                className={`flex items-center gap-2 z-10 relative ${embedType === "apple_music" ? "text-primary" : ""}`}
              >
                <AppleIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Apple Music</span>
              </Button>
              <Button
                ref={spotifyButtonRef}
                variant="ghost"
                size="sm"
                onClick={() => setEmbedType("spotify")}
                className={`flex items-center gap-2 z-10 relative ${embedType === "spotify" ? "text-primary" : ""}`}
              >
                <Music className="h-4 w-4" />
                <span className="hidden sm:inline">Spotify</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-end items-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedSongs.map((song, index) => (
            <SongCard key={`${song.title}-${index}`} song={song} index={index} embedType={embedType} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

