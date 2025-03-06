import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "3rr0r's Discography",
  description: "Explore 3rr0r's music across different platforms",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="https://avatars.githubusercontent.com/u/92172873?v=4" sizes="any" />
      </head>
      <body className={inter.className}>
        <div id="glow-container" className="fixed inset-0 pointer-events-none z-50" />
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'