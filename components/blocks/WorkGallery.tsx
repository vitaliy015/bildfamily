"use client"

import { motion } from "motion/react"
import Image from "next/image"

const EASE = [0.25, 0.46, 0.45, 0.94] as const

type Shot = {
  src: string
  title: string
  type: string
}

const SHOTS: Shot[] = [
  { src: "/work/showcase-1.jpg", title: "Warm-Oak Ensuite",      type: "Bathroom Remodel" },
  { src: "/work/showcase-2.jpg", title: "Moody Powder Room",     type: "Bathroom Remodel" },
  { src: "/work/showcase-3.jpg", title: "Bright Basement Bath",  type: "Basement Finishing" },
  { src: "/work/showcase-4.jpg", title: "Freestanding Soaker",   type: "Bathroom Remodel" },
  { src: "/work/showcase-5.jpg", title: "White-Tile Shower",     type: "Tile & Shower" },
  { src: "/work/showcase-6.jpg", title: "Restored Cedar Deck",   type: "Exterior Refresh" },
]

function ShotCard({ shot, index }: { shot: Shot; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.06, duration: 0.5, ease: EASE }}
      className="group relative mb-5 break-inside-avoid overflow-hidden cursor-pointer"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
        <Image
          src={shot.src}
          alt={`${shot.title} — ${shot.type} by Inside The House Calgary`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <figcaption className="absolute inset-x-0 bottom-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] mb-1.5 text-[#c4a962]" style={{ fontFamily: "var(--font-heading)" }}>
            {shot.type}
          </span>
          <span className="block text-xl font-bold leading-tight text-white" style={{ fontFamily: "var(--font-heading)" }}>
            {shot.title}
          </span>
        </figcaption>
        <div className="absolute top-0 left-0 h-10 w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 bg-[#c4a962]" />
      </div>
    </motion.figure>
  )
}

export function WorkGallery() {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p
            className="text-xs font-bold uppercase tracking-[0.35em] mb-5 text-[#8a8a5c]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Finished Result
          </p>
          <h2
            className="text-[38px] md:text-5xl font-black uppercase leading-[0.95] text-[#1c1a18]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            A closer look
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {SHOTS.map((shot, i) => (
            <ShotCard key={shot.src} shot={shot} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
