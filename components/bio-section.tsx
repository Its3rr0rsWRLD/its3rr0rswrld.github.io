"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Github, Code, Music, ExternalLink, GitBranch, Star, ChevronRight, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

interface GitHubStats {
  public_repos: number
  followers: number
  stars: number
}

interface TimelineItem {
  year: string
  title: string
  description: string
  icon: React.ReactNode
  color: "pink" | "blue" | "purple"
}

export function BioSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0)
  const username = "Its3rr0rsWRLD"

  const timelineItems: TimelineItem[] = [
    {
      year: "2019",
      title: "Started Coding at 10",
      description: "Began my coding journey during COVID freetime, diving into programming as a kid.",
      icon: <Code className="h-6 w-6" />,
      color: "blue",
    },
    {
      year: "2020",
      title: "First GitHub Projects",
      description: "Started uploading random projects to GitHub, experimenting with different ideas.",
      icon: <Github className="h-6 w-6" />,
      color: "purple",
    },
    {
      year: "2023",
      title: "First Music Release",
      description: "Made my first song, overcoming my fear of making music and being bad at it.",
      icon: <Music className="h-6 w-6" />,
      color: "pink",
    },
    {
      year: "2024",
      title: "Music Expansion",
      description:
        "Uploaded several songs, worked on an unreleased EP, and did collabs with Lil Wave who helped me get past my fears.",
      icon: <Music className="h-6 w-6" />,
      color: "pink",
    },
    {
      year: "2025",
      title: "Found My Sound",
      description: "Finally found my unique sound and I'm expanding on that while continuing to code random stuff.",
      icon: <Code className="h-6 w-6" />,
      color: "blue",
    },
  ]

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        setIsLoading(true)

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        if (!userResponse.ok) throw new Error("Failed to fetch user data")
        const userData = await userResponse.json()

        // Fetch repositories to calculate stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories")
        const reposData = await reposResponse.json()

        // Calculate total stars
        const totalStars = reposData.reduce((total: number, repo: any) => total + repo.stargazers_count, 0)

        setGithubStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          stars: totalStars,
        })
      } catch (error) {
        console.error("Error fetching GitHub stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isInView) {
      fetchGitHubStats()
    }
  }, [isInView, username])

  const bioItems = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Developer",
      description: "I code stuff when I'm not making music. Mostly because I can't stop myself from building things.",
    },
    {
      icon: <Music className="h-8 w-8 text-primary" />,
      title: "Musical Artist",
      description:
        "Making emo rap tracks in my bedroom at 3am is basically my therapy. It's cheaper than the real thing.",
    },
    {
      icon: <Github className="h-8 w-8 text-primary" />,
      title: "Open Source Nerd",
      description:
        "I push code to GitHub and hope nobody notices the weird variable names and commented-out debug prints.",
    },
  ]

  const tabs = ["About", "Timeline", "Skills"]

  const nextTimelineItem = () => {
    setCurrentTimelineIndex((prev) => (prev === timelineItems.length - 1 ? 0 : prev + 1))
  }

  const prevTimelineItem = () => {
    setCurrentTimelineIndex((prev) => (prev === 0 ? timelineItems.length - 1 : prev - 1))
  }

  const getNeonClass = (color: "pink" | "blue" | "purple") => {
    return {
      pink: "neon-text-pink",
      blue: "neon-text-blue",
      purple: "neon-text-purple",
    }[color]
  }

  return (
    <section id="bio-section" className="py-20 px-4 bg-secondary/5 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block glitch" data-text="About Me">
            About Me
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary neon-glow"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here's the deal with me (it's weird, just warning you now).
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-full p-1 flex">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeTab === index ? "glass-light neon-glow" : "hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass p-6 rounded-lg border border-primary/10 neon-border"
              >
                <h3 className="text-2xl font-bold mb-4 neon-text-blue">Who I Am</h3>
                <p className="text-muted-foreground mb-4">
                  Hey, I'm 3rr0r. I make music and code random stuff. I spend most of my time working on music or random
                  projects that I end up not publishing.
                </p>
                <p className="text-muted-foreground">
                  I mainly make emo rap tracks and building apps that probably only I will use. Sometimes I stay up way
                  too late trying to fix bugs in my code or tweaking my vocals until it sounds just right.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {bioItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="glass-light p-4 rounded-lg border border-primary/5 flex flex-col items-center text-center hover:neon-glow transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="mb-3 bg-primary/10 p-3 rounded-full">{item.icon}</div>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass p-8 rounded-lg neon-border relative">
                <button
                  onClick={prevTimelineItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 glass-light p-2 rounded-full hover:neon-glow z-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextTimelineItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 glass-light p-2 rounded-full hover:neon-glow z-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="relative h-[300px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    {timelineItems.map(
                      (item, index) =>
                        index === currentTimelineIndex && (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                          >
                            <div className={`text-6xl font-bold mb-4 ${getNeonClass(item.color)}`}>{item.year}</div>
                            <div className={`bg-primary/10 p-4 rounded-full mb-4 ${getNeonClass(item.color)}`}>
                              {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                          </motion.div>
                        ),
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center mt-6 gap-2">
                  {timelineItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTimelineIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentTimelineIndex ? "bg-primary neon-glow" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass p-8 rounded-lg neon-border">
                <h3 className="text-2xl font-bold mb-6 text-center neon-text-purple">My Skills</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 neon-text-blue">Development</h4>

                    {[
                      { name: "JavaScript/TypeScript", level: 60 },
                      { name: "React & Next.js", level: 30 },
                      { name: "Node.js", level: 75 },
                      { name: "HTML", level: 75 },
                      { name: "CSS", level: 35 },
                      { name: "Python", level: 60 },
                    ].map((skill, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            className="h-full bg-blue-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 neon-text-pink">Music Production</h4>

                    {[
                      { name: "Vocal Production", level: 80 },
                      { name: "Mixing", level: 75 },
                    ].map((skill, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            className="h-full bg-pink-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 glass p-6 rounded-lg border border-primary/10 neon-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h3 className="text-2xl font-bold mb-4 md:mb-0 neon-text-blue">GitHub Stats</h3>
            <Link href="/github">
              <Button className="group relative overflow-hidden glass-light neon-border hover:neon-glow">
                <Github className="mr-2 h-4 w-4" />
                <span className="relative z-10">View All Repositories</span>
                <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GitHub Stats Card */}
            <div className="col-span-1 lg:col-span-2">
              <div className="glass-light rounded-lg border border-primary/5 p-4 h-full">
                <iframe
                  src="https://github-readme-stats.vercel.app/api?username=its3rr0rswrld&show_icons=true&bg_color=00000000&text_color=ffffff&icon_color=e11d48&title_color=e11d48&hide_border=true&count_private=true"
                  frameBorder="0"
                  className="w-full h-[200px]"
                ></iframe>
              </div>
            </div>

            {/* GitHub Languages Card */}
            <div className="col-span-1">
              <div className="glass-light rounded-lg border border-primary/5 p-4 h-full">
                <iframe
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=its3rr0rswrld&layout=compact&bg_color=00000000&text_color=ffffff&icon_color=e11d48&title_color=e11d48&hide_border=true"
                  frameBorder="0"
                  className="w-full h-[200px]"
                ></iframe>
              </div>
            </div>
          </div>

          {/* GitHub Activity Stats - Using live data from API */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="glass-light rounded-lg border border-primary/5 p-6 flex flex-col items-center hover:neon-glow transition-all duration-300">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-1">Contributions</h4>
              {isLoading ? (
                <div className="h-10 w-20 bg-muted/30 rounded-md animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold neon-text-blue">{githubStats?.followers || 0}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">Followers</p>
            </div>

            <div className="glass-light rounded-lg border border-primary/5 p-6 flex flex-col items-center hover:neon-glow transition-all duration-300">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-1">Repositories</h4>
              {isLoading ? (
                <div className="h-10 w-20 bg-muted/30 rounded-md animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold neon-text-purple">{githubStats?.public_repos || 0}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">Public repos</p>
            </div>

            <div className="glass-light rounded-lg border border-primary/5 p-6 flex flex-col items-center hover:neon-glow transition-all duration-300">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-1">Stars Earned</h4>
              {isLoading ? (
                <div className="h-10 w-20 bg-muted/30 rounded-md animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold neon-text-pink">{githubStats?.stars || 0}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">From the community</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="https://github.com/Its3rr0rsWRLD" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/10 hover:text-primary glass-light hover:neon-glow"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Visit GitHub Profile</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
