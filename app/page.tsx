"use client"

import { HeroSection } from "@/components/hero-section"
import { BioSection } from "@/components/bio-section"
import { MusicSection } from "@/components/music-section"
import { ContactForm } from "@/components/contact-form"
import { songData } from "@/data/songs"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/90 relative">
      <HeroSection />
      <BioSection />
      <MusicSection songs={songData.songs} />

      <section id="contact" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
