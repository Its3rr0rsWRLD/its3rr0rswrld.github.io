"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Music, AppleIcon, Youtube, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react"

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
  const [currentPage, setCurrentPage] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const carouselRef = useRef<HTMLDivElement>(null)

  // Set YouTube as default on page load
  useEffect(() => {
    setEmbedType("youtube")
  }, [])

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
      // Sort by release date (newest first)
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    } else if (sortBy === "oldest") {
      // Sort by release date (oldest first)
      return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    } else if (sortBy === "title") {
      // Sort alphabetically by title
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  // Calculate pages for carousel
  const songsPerPage = 3
  const totalPages = Math.ceil(sortedSongs.length / songsPerPage)
  const currentSongs = sortedSongs.slice(currentPage * songsPerPage, (currentPage + 1) * songsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

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
    <section id="music-section" className="py-20 px-4 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block glitch" data-text="Discography">
            Discography
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary neon-glow"
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

            <div className="glass p-1 rounded-lg inline-flex relative">
              {/* Sliding background */}
              <motion.div
                className="absolute top-1 bottom-1 bg-primary/20 rounded-md z-0 neon-glow"
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
                className={`flex items-center gap-2 z-10 relative hover:text-primary hover:bg-primary/10 ${embedType === "youtube" ? "neon-text-pink" : ""}`}
              >
                <Youtube className="h-4 w-4" />
                <span className="hidden sm:inline">YouTube</span>
              </Button>
              <Button
                ref={appleMusicButtonRef}
                variant="ghost"
                size="sm"
                onClick={() => setEmbedType("apple_music")}
                className={`flex items-center gap-2 z-10 relative hover:text-primary hover:bg-primary/10 ${embedType === "apple_music" ? "neon-text-blue" : ""}`}
              >
                <AppleIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Apple Music</span>
              </Button>
              <Button
                ref={spotifyButtonRef}
                variant="ghost"
                size="sm"
                onClick={() => setEmbedType("spotify")}
                className={`flex items-center gap-2 z-10 relative hover:text-primary hover:bg-primary/10 ${embedType === "spotify" ? "neon-text-purple" : ""}`}
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
              <SelectTrigger className="w-[180px] glass-light">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="glass">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        {/* Carousel navigation */}
        <div className="relative">
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 glass-light p-2 rounded-full hover:neon-glow z-10 md:-left-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 glass-light p-2 rounded-full hover:neon-glow z-10 md:-right-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div ref={carouselRef} className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {currentSongs.map((song, index) => (
                  <SongCard key={`${song.title}-${index}`} song={song} index={index} embedType={embedType} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentPage ? "bg-primary neon-glow" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
