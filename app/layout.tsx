import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { CustomCursor } from "@/components/custom-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "3rr0r",
  description: "Developer, musical artist, and a complete nerd who loves creating music and code.",
  manifest: "/manifest.json",
  openGraph: {
    title: "3rr0r",
    description: "Developer, musical artist, and a complete nerd who loves creating music and code.",
    images: ["https://avatars.githubusercontent.com/u/92172873?v=4"],
    url: "https://3rr0r.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "3rr0r",
    description: "Developer, musical artist, and a complete nerd who loves creating music and code.",
    images: ["https://avatars.githubusercontent.com/u/92172873?v=4"],
  },
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
        {children}
        <CustomCursor />
        <Toaster />
      </body>
    </html>
  )
}
