"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

const HEADLINE = "We don't leave\nuntil it's done right."
const TYPE_SPEED = 55 // ms per character

export function VideoFeature() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })
  const reduce = useReducedMotion()
  const [typedState, setTypedState] = useState("")
  const [doneState, setDoneState] = useState(false)

  // Typewriter — starts when the block scrolls into view. State updates happen
  // inside the interval callback (async), never synchronously in the effect.
  useEffect(() => {
    if (!inView || reduce) return
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTypedState(HEADLINE.slice(0, i))
      if (i >= HEADLINE.length) {
        window.clearInterval(id)
        setDoneState(true)
      }
    }, TYPE_SPEED)
    return () => window.clearInterval(id)
  }, [inView, reduce])

  // Reduced motion → show the full text immediately (derived, no effect needed).
  const typed = reduce ? HEADLINE : typedState
  const done = reduce ? true : doneState

  return (
    <section ref={ref} className="bg-[#1c1a17] py-20 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text — typewriter */}
        <div className="order-2 lg:order-1">
          <p
            className="text-xs font-bold uppercase tracking-[0.35em] mb-6 text-[#c4a962]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Final Walk-Through
          </p>

          {/* Full text reserved invisibly so the layout never shifts as it types */}
          <h2
            className="relative text-[34px] sm:text-5xl md:text-[56px] font-black uppercase leading-[0.98] text-[#f0ede8]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            <span aria-hidden className="invisible whitespace-pre-line">{HEADLINE}</span>
            <span className="absolute inset-0 whitespace-pre-line">
              {typed}
              <span
                aria-hidden
                className="ml-1 inline-block w-[3px] h-[0.9em] translate-y-[0.12em] bg-[#c4a962] animate-[caret-blink_1s_step-end_infinite]"
              />
            </span>
          </h2>

          {/* Subtext — fades in once typing finishes */}
          <motion.p
            initial={false}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-7 text-base md:text-lg leading-relaxed text-[#9a9a8a] max-w-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Every project ends the same way — a clean, finished home you&rsquo;re proud to
            walk through, handed back on time.
          </motion.p>
        </div>

        {/* Video — autoplaying, no controls */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-[340px] aspect-[9/16] overflow-hidden rounded-xl border border-[#8a8a5c]/40 bg-black shadow-[0_1.5rem_3rem_-1rem_rgba(0,0,0,0.6)]">
            <video
              src="/work/stairs-walkthrough.mp4"
              poster="/work/stairs-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Walk-through of a finished renovation by Inside The House"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute top-0 left-0 h-14 w-[3px] bg-[#c4a962]" />
          </div>
        </div>
      </div>
    </section>
  )
}
