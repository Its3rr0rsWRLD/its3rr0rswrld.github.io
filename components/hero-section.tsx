"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Instagram, Youtube, Headphones, DogIcon as Mastodon, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const typingTextRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const genres = ["Emo Rap"]

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

  const socialLinks = [
    { href: "https://github.com/Its3rr0rsWRLD/", icon: Wallet, label: "GitHub" },
    { href: "https://www.instagram.com/its3rr0rswrld", icon: Instagram, label: "Instagram" },
    { href: "https://youtube.com/@Its3rr0rsWRLD", icon: Youtube, label: "YouTube" },
    { href: "https://mastodon.social/@Its3rr0rsWRLD", icon: Mastodon, label: "Mastodon" },
    { href: "https://soundcloud.com/3rr0rmusic", icon: Headphones, label: "SoundCloud" },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/95 z-10" />
        <div className="absolute inset-0 bg-grid-white/[0.02] z-0" />
      </div>

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
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 shadow-xl shadow-primary/20"
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
            className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-background"
          >
            3
          </motion.div>
        </div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary">3rr0r</span>'s Discography
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Creating <span ref={typingTextRef} className="text-primary font-medium"></span>
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:scale-110 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.label}</span>
              </Button>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={scrollToMusic} className="group relative overflow-hidden">
            <span className="relative z-10">Explore Music</span>
            <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.6 },
          y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
        }}
        onClick={scrollToMusic}
      >
        <ArrowDown className="h-6 w-6 text-primary" />
      </motion.div>
    </section>
  )
}

