"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Play, Calendar, AppleIcon, Youtube, ExternalLink, X } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Song } from "@/types/song"
import type { EmbedType } from "./music-section"

interface SongCardProps {
  song: Song
  index: number
  embedType: EmbedType
}

export function SongCard({ song, index, embedType }: SongCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [videoId, setVideoId] = useState("")
  const [spotifyId, setSpotifyId] = useState("")
  const [appleMusicId, setAppleMusicId] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  // Format the release date
  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  useEffect(() => {
    // Extract YouTube video ID from URL
    if (song.links.youtube) {
      const url = new URL(song.links.youtube)
      let id = ""

      if (url.hostname.includes("youtube.com")) {
        if (url.pathname.includes("watch")) {
          id = url.searchParams.get("v") || ""
        } else if (url.pathname.includes("embed")) {
          id = url.pathname.split("/").pop() || ""
        } else if (url.pathname.includes("playlist")) {
          // For playlists, use the first video
          id = url.searchParams.get("list") || ""
        }
      } else if (url.hostname.includes("youtu.be")) {
        id = url.pathname.substring(1)
      }

      setVideoId(id)
    }

    // Extract Spotify ID from URL
    if (song.links.spotify) {
      const url = song.links.spotify
      const matches = url.match(/album\/([a-zA-Z0-9]+)/)
      if (matches && matches[1]) {
        setSpotifyId(matches[1])
      }
    }

    // Extract Apple Music ID from URL
    if (song.links.apple_music) {
      const url = song.links.apple_music
      const matches = url.match(/album\/[^/]+\/([0-9]+)/)
      if (matches && matches[1]) {
        setAppleMusicId(matches[1])
      }
    }

    // Close preview when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        setShowPreview(false)
      }
    }

    if (showPreview) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [song.links.youtube, song.links.spotify, song.links.apple_music, showPreview])

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  const platformIcons = {
    apple_music: AppleIcon,
    spotify: Music,
    youtube: Youtube,
  }

  const renderEmbed = () => {
    switch (embedType) {
      case "youtube":
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={song.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        )
      case "spotify":
        return (
          <iframe
            src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        )
      case "apple_music":
        return (
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder="0"
            height="100%"
            width="100%"
            style={{ overflow: "hidden", background: "transparent" }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={`https://embed.music.apple.com/us/album/${appleMusicId}`}
            className="w-full h-full"
          ></iframe>
        )
      default:
        return null
    }
  }

  // Determine which neon color to use based on index
  const neonColors = ["neon-text-pink", "neon-text-blue", "neon-text-purple"]
  const neonColor = neonColors[index % neonColors.length]

  return (
    <>
      <motion.div
        variants={item}
        whileHover={{ y: -5 }}
        className="h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="border-primary/20 glass overflow-hidden h-full hover:neon-glow transition-all duration-300">
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 glass-light">
                {song.genre}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 glass-light">
                <Calendar className="h-3 w-3" />
                {formatReleaseDate(song.releaseDate)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="relative aspect-square mb-4 overflow-hidden rounded-md group">
              <Image
                src={song.art || "/placeholder.svg"}
                alt={song.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full glass-light border-white/20 text-white hover:bg-white hover:text-primary hover:neon-glow"
                  onClick={() => setShowPreview(true)}
                >
                  <Play className="h-6 w-6" />
                </Button>
              </motion.div>
            </div>
            <h3 className={`font-bold text-lg line-clamp-1 ${isHovered ? neonColor : ""}`}>{song.title}</h3>
            <p className="text-muted-foreground text-sm">{song.album}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 grid grid-cols-3 gap-2">
            {Object.entries(song.links).map(([platform, url]) => {
              const PlatformIcon = platformIcons[platform as keyof typeof platformIcons] || ExternalLink

              return (
                <Link key={platform} href={url} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center gap-2 glass-light hover:neon-glow transition-colors duration-300"
                  >
                    <PlatformIcon className="h-4 w-4" />
                    <span className="sr-only">{platform.replace("_", " ")}</span>
                  </Button>
                </Link>
              )
            })}
          </CardFooter>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              ref={previewRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-4xl glass rounded-lg overflow-hidden shadow-2xl neon-border"
            >
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full glass-light hover:bg-primary/80 hover:neon-glow"
                  onClick={() => setShowPreview(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="aspect-video w-full">{renderEmbed()}</div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 neon-text-pink">{song.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {song.album} • {formatReleaseDate(song.releaseDate)}
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <Link href={song.links.youtube || "#"} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant={embedType === "youtube" ? "default" : "outline"}
                      className="w-full justify-center gap-2 hover:scale-105 transition-transform glass-light hover:neon-glow"
                      disabled={!song.links.youtube}
                    >
                      <Youtube className="h-5 w-5" />
                      <span>YouTube</span>
                    </Button>
                  </Link>
                  <Link href={song.links.apple_music || "#"} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant={embedType === "apple_music" ? "default" : "outline"}
                      className="w-full justify-center gap-2 hover:scale-105 transition-transform glass-light hover:neon-glow"
                      disabled={!song.links.apple_music}
                    >
                      <AppleIcon className="h-5 w-5" />
                      <span>Apple Music</span>
                    </Button>
                  </Link>
                  <Link href={song.links.spotify || "#"} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant={embedType === "spotify" ? "default" : "outline"}
                      className="w-full justify-center gap-2 hover:scale-105 transition-transform glass-light hover:neon-glow"
                      disabled={!song.links.spotify}
                    >
                      <Music className="h-5 w-5" />
                      <span>Spotify</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
