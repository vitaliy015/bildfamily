"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"

const EASE = [0.25, 0.46, 0.45, 0.94] as const

type BeforeAfterProps = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  title: string
  type: string
  description: string
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  title,
  type,
  description,
}: BeforeAfterProps) {
  // Divider position, 0–100. Left of the divider shows "before", right "after".
  const [pos, setPos] = useState(50)

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group"
    >
      <div className="relative w-full overflow-hidden select-none aspect-[3/4] sm:aspect-[4/3]">
        {/* Base layer — AFTER */}
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />

        {/* Overlay layer — BEFORE, clipped to the left of the divider */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Corner labels */}
        <span
          className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-black/45 backdrop-blur-sm"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Before
        </span>
        <span
          className="absolute top-4 right-4 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-[#8a8a5c]/80 backdrop-blur-sm"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          After
        </span>

        {/* Divider line + grabber knob (visual only — driven by pos) */}
        <div
          className="absolute inset-y-0 w-[2px] bg-white/90 pointer-events-none shadow-[0_0_8px_rgba(0,0,0,0.35)]"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#8a8a5c]">
              <path d="M9 6l-4 6 4 6M15 6l4 6-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Range input drives the divider — native mouse, touch & keyboard support */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal after image for ${title}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>

      {/* Caption */}
      <figcaption className="mt-5">
        <span
          className="block text-[10px] font-bold uppercase tracking-[0.3em] mb-1.5 text-[#c4a962]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {type}
        </span>
        <span
          className="block text-2xl font-bold leading-tight text-[#1c1a18] mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </span>
        <p className="text-base leading-relaxed text-[#6a6460]" style={{ fontFamily: "var(--font-body)" }}>
          {description}
        </p>
      </figcaption>
    </motion.figure>
  )
}
