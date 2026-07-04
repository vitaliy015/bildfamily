"use client"

import { useRef, useState } from "react"
import { motion } from "motion/react"

const EASE = [0.25, 0.46, 0.45, 0.94] as const

type Clip = {
  src: string
  label: string
  caption: string
}

const CLIPS: Clip[] = [
  { src: "/work/walkthrough-1.mp4", label: "Deck Restoration", caption: "Freshly sanded & re-stained" },
  { src: "/work/walkthrough-2.mp4", label: "Ensuite Reveal", caption: "Marble, brass & glass" },
  { src: "/work/walkthrough-3.mp4", label: "Finished Space", caption: "Walkthrough tour" },
]

function VideoCard({ clip, index }: { clip: Clip; index: number }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  const play = () => {
    setStarted(true)
    // Kick playback once the source starts loading.
    requestAnimationFrame(() => ref.current?.play().catch(() => {}))
  }

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: EASE }}
      className="relative"
    >
      {/* Olive accent bar */}
      <div className="h-1 w-full bg-[#8a8a5c]" />

      <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#1c1a17]">
        <video
          ref={ref}
          src={clip.src}
          controls={started}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-contain"
        />

        {/* Poster / click-to-play overlay */}
        {!started && (
          <button
            type="button"
            onClick={play}
            aria-label={`Play ${clip.label} walkthrough`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#2a2822] to-[#1c1a17] group"
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#8a8a5c] group-hover:bg-[#7a7a4e] transition-colors duration-200 shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#f5f2ee] ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#f0ede8]/80"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Watch
            </span>
          </button>
        )}
      </div>

      <figcaption className="mt-4">
        <span
          className="block text-lg font-bold leading-tight text-[#1c1a18]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {clip.label}
        </span>
        <span className="block text-sm text-[#6a6460]" style={{ fontFamily: "var(--font-body)" }}>
          {clip.caption}
        </span>
      </figcaption>
    </motion.figure>
  )
}

export function WorkVideos() {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#1c1a17]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p
            className="text-xs font-bold uppercase tracking-[0.35em] mb-5 text-[#c4a962]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Walkthroughs
          </p>
          <h2
            className="text-[38px] md:text-5xl font-black uppercase leading-[0.95] mb-5 text-[#f0ede8]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            See the finished space
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#9a9a8a]" style={{ fontFamily: "var(--font-body)" }}>
            Short walkthroughs shot on the last day of each job — the real result,
            room by room.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CLIPS.map((clip, i) => (
            <VideoCard key={clip.src} clip={clip} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
