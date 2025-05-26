"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Star, GitFork, Eye, Code, Calendar, Github, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  created_at: string
  updated_at: string
  topics: string[]
  owner: {
    avatar_url: string
    login: string
  }
}

interface UserStats {
  public_repos: number
  followers: number
  following: number
}

export default function GitHubPage() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<string>("updated")
  const [hoveredRepo, setHoveredRepo] = useState<number | null>(null)
  const username = "Its3rr0rsWRLD"

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        if (userResponse.ok) {
          const userData = await userResponse.json()
          setUserStats({
            public_repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
          })
        }

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=${sortBy}`)
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories")
        const reposData = await reposResponse.json()
        setRepos(reposData)
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [sortBy, username])

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Language colors for badges
  const languageColors: Record<string, string> = {
    JavaScript: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    TypeScript: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    Python: "bg-green-500/20 text-green-500 border-green-500/30",
    HTML: "bg-orange-500/20 text-orange-500 border-orange-500/30",
    CSS: "bg-purple-500/20 text-purple-500 border-purple-500/30",
    Java: "bg-red-500/20 text-red-500 border-red-500/30",
    "C#": "bg-green-600/20 text-green-600 border-green-600/30",
    C: "bg-gray-500/20 text-gray-500 border-gray-500/30",
    "C++": "bg-pink-500/20 text-pink-500 border-pink-500/30",
    Ruby: "bg-red-600/20 text-red-600 border-red-600/30",
    Go: "bg-blue-400/20 text-blue-400 border-blue-400/30",
    PHP: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
    Shell: "bg-green-400/20 text-green-400 border-green-400/30",
  }

  // Determine neon color based on index
  const getNeonColor = (index: number) => {
    const colors = ["neon-text-pink", "neon-text-blue", "neon-text-purple"]
    return colors[index % colors.length]
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/90 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/95 z-10" />
        <div className="absolute inset-0 bg-grid-white/[0.02] z-0" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, hsla(${Math.random() * 360}, 100%, 70%, 0.3) 0%, transparent 70%)`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full glass-light hover:neon-glow">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold glitch neon-text-blue" data-text="GitHub Repositories">
              GitHub Repositories
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-light border border-border rounded-md px-3 py-1 text-sm"
              >
                <option value="updated">Recently Updated</option>
                <option value="created">Recently Created</option>
                <option value="stars">Stars</option>
                <option value="name">Name</option>
              </select>
            </div>

            <Link href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center gap-2 glass hover:neon-glow">
                <Github className="h-4 w-4" />
                <span>View Profile</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* GitHub Stats Summary */}
        {userStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass border-primary/10 hover:neon-glow transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Repositories</h3>
                <p className="text-3xl font-bold neon-text-blue">{userStats.public_repos}</p>
                <p className="text-sm text-muted-foreground mt-2">Public repos</p>
              </CardContent>
            </Card>

            <Card className="glass border-primary/10 hover:neon-glow transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Stars</h3>
                <p className="text-3xl font-bold neon-text-pink">
                  {repos.reduce((total, repo) => total + repo.stargazers_count, 0)}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Total stars earned</p>
              </CardContent>
            </Card>

            <Card className="glass border-primary/10 hover:neon-glow transition-all duration-300">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Followers</h3>
                <p className="text-3xl font-bold neon-text-purple">{userStats.followers}</p>
                <p className="text-sm text-muted-foreground mt-2">GitHub followers</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="glass border-primary/10 h-full animate-pulse">
                  <CardHeader className="p-6">
                    <div className="h-6 bg-muted rounded-md w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded-md w-1/2"></div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="h-16 bg-muted rounded-md w-full"></div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex justify-between w-full">
                      <div className="h-4 bg-muted rounded-md w-1/4"></div>
                      <div className="h-4 bg-muted rounded-md w-1/4"></div>
                    </div>
                  </CardFooter>
                </Card>
              ))
            : repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setHoveredRepo(repo.id)}
                  onMouseLeave={() => setHoveredRepo(null)}
                >
                  <Card
                    className={`glass border-primary/20 h-full flex flex-col ${hoveredRepo === repo.id ? "neon-glow" : ""}`}
                  >
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle
                          className={`text-xl font-bold truncate ${hoveredRepo === repo.id ? getNeonColor(index) : ""}`}
                        >
                          {repo.name}
                        </CardTitle>
                        {repo.language && (
                          <Badge
                            variant="outline"
                            className={`glass-light ${
                              languageColors[repo.language] || "bg-gray-500/20 text-gray-500 border-gray-500/30"
                            }`}
                          >
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Updated {formatDate(repo.updated_at)}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex-grow">
                      <p className="text-muted-foreground line-clamp-3">
                        {repo.description || "No description provided"}
                      </p>
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs glass-light">
                              {topic}
                            </Badge>
                          ))}
                          {repo.topics.length > 3 && (
                            <Badge variant="secondary" className="text-xs glass-light">
                              +{repo.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <GitFork className="h-4 w-4 text-blue-500" />
                          <span>{repo.forks_count}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Eye className="h-4 w-4 text-green-500" />
                          <span>{repo.watchers_count}</span>
                        </div>
                      </div>
                      <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="gap-1 glass-light hover:neon-glow">
                          <Code className="h-3 w-3" />
                          <span>Code</span>
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
        </div>

        {repos.length === 0 && !isLoading && (
          <div className="text-center py-12 glass p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 neon-text-pink">No repositories found</h3>
            <p className="text-muted-foreground">Check back later or visit the GitHub profile directly.</p>
          </div>
        )}
      </div>
    </main>
  )
}
