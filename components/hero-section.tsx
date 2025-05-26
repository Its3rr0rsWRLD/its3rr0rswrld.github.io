"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowDown, Instagram, Youtube, Headphones, DogIcon as Mastodon, Github, BookOpen, Music } from "lucide-react"

import { Button } from "@/components/ui/button"

// Social Button component with animated tooltip
interface SocialButtonProps {
  href: string
  icon: React.ElementType
  label: string
  color: "pink" | "blue" | "purple"
}

const SocialButton = ({ href, icon: Icon, label, color }: SocialButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  const neonClass = {
    pink: "neon-text-pink",
    blue: "neon-text-blue",
    purple: "neon-text-purple",
  }[color]

  return (
    <div
      className="relative inline-block hoverable"
      ref={buttonRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        target={href.startsWith("/") ? undefined : "_blank"}
        rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
      >
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full glass-light hover:scale-110 hover:neon-glow transition-all duration-300 ${isHovered ? neonClass : ""}`}
        >
          <Icon className={`h-5 w-5 ${isHovered ? neonClass : ""}`} />
          <span className="sr-only">{label}</span>
        </Button>
      </Link>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mt-[-10px] z-50"
            style={{
              transformOrigin: "bottom center",
              pointerEvents: "none",
            }}
          >
            <div className="relative">
              <div className={`glass px-3 py-1 rounded-md text-sm font-medium shadow-lg ${neonClass}`}>{label}</div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 glass rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function HeroSection() {
  const typingTextRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const genres = ["Emo Rap", "Developer", "Music Producer"]
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    let currentGenreIndex = 0
    let currentCharIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    const type = () => {
      const currentGenre = genres[currentGenreIndex]

      if (typingTextRef.current) {
        if (isDeleting) {
          typingTextRef.current.textContent = currentGenre.substring(0, currentCharIndex - 1)
          currentCharIndex--
          typingSpeed = 50
        } else {
          typingTextRef.current.textContent = currentGenre.substring(0, currentCharIndex + 1)
          currentCharIndex++
          typingSpeed = 100
        }

        if (!isDeleting && currentCharIndex === currentGenre.length) {
          isDeleting = true
          typingSpeed = 1500
        } else if (isDeleting && currentCharIndex === 0) {
          isDeleting = false
          currentGenreIndex = (currentGenreIndex + 1) % genres.length
          setCurrentTextIndex(currentGenreIndex)

          // Trigger glitch effect when changing text
          setIsGlitching(true)
          setTimeout(() => setIsGlitching(false), 500)
        }
      }

      setTimeout(type, typingSpeed)
    }

    type()
  }, [])

  const scrollToMusic = () => {
    const musicSection = document.getElementById("music-section")
    if (musicSection) {
      musicSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToBio = () => {
    const bioSection = document.getElementById("bio-section")
    if (bioSection) {
      bioSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const socialLinks = [
    { href: "/github", icon: Github, label: "GitHub", color: "blue" as const },
    { href: "https://www.instagram.com/its3rr0rswrld", icon: Instagram, label: "Instagram", color: "pink" as const },
    { href: "https://youtube.com/@Its3rr0rsWRLD", icon: Youtube, label: "YouTube", color: "pink" as const },
    { href: "https://mastodon.social/@Its3rr0rsWRLD", icon: Mastodon, label: "Mastodon", color: "purple" as const },
    { href: "https://soundcloud.com/3rr0rmusic", icon: Headphones, label: "SoundCloud", color: "blue" as const },
  ]

  // Determine neon color class based on current text
  const neonColorClass = ["neon-text-pink", "neon-text-blue", "neon-text-purple"][currentTextIndex % 3]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <motion.div style={{ opacity, y }} className="container relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 shadow-xl shadow-primary/20 neon-glow"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/92172873?v=4"
              alt="3rr0r's Profile Picture"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-background neon-glow"
          >
            3
          </motion.div>
        </div>

        <motion.h1
          className={`text-4xl md:text-6xl font-bold mb-4 glitch ${isGlitching ? "animate-glitch" : ""}`}
          data-text="Yo, It's 3rr0r"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Yo, It's <span className={`${neonColorClass}`}>3rr0r</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-4 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I'm a <span ref={typingTextRef} className={`font-medium ${neonColorClass}`}></span>
        </motion.p>

        <motion.p
          className="text-muted-foreground max-w-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Developer, musical artist, and a complete nerd who loves creating music and code.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {socialLinks.map((link, index) => (
            <SocialButton key={index} href={link.href} icon={link.icon} label={link.label} color={link.color} />
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={scrollToBio} className="group relative overflow-hidden glass neon-border hover:neon-glow">
              <BookOpen className="mr-2 h-4 w-4" />
              <span className="relative z-10">About Me</span>
              <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={scrollToMusic}
              variant="outline"
              className="group relative overflow-hidden glass-light neon-border hover:neon-glow"
            >
              <Music className="mr-2 h-4 w-4" />
              <span className="relative z-10">My Music</span>
              <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hoverable"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.6 },
          y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
        }}
        onClick={scrollToBio}
      >
        <ArrowDown className="h-6 w-6 text-primary neon-text-pink" />
      </motion.div>
    </section>
  )
}
