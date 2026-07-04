"use client"

import { motion, useReducedMotion } from "motion/react"

// Reuse Hero's plaster-noise texture for visual continuity across pages.
const PLASTER_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`

export function WorksHero() {
  const reduce = useReducedMotion()

  // The headline is hinged at its bottom-left corner, like a beam pinned to a
  // wall. It rests tilted up ~46° and mechanically "falls" to horizontal on
  // load, bouncing twice as it settles — an impact that nudges the copy below.
  const headingAnim = reduce
    ? { rotate: 0, opacity: 1 }
    : { rotate: [-46, 3, -1.5, 0], opacity: 1 }

  // rotate & opacity get separate transitions: sharing the rotate `times` array
  // with opacity de-syncs the two and flashes the text as it lands.
  const headingTransition = reduce
    ? { duration: 0 }
    : {
        rotate: { duration: 1.1, times: [0, 0.6, 0.82, 1], ease: [0.22, 1, 0.36, 1] as const },
        opacity: { duration: 0.35, ease: "easeOut" as const },
      }

  return (
    <section className="relative overflow-hidden bg-[#eae6df] pt-40 pb-20 md:pt-48 md:pb-28">
      {/* Plaster / concrete noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ backgroundImage: PLASTER_SVG, backgroundSize: "120px" }}
      />
      {/* Subtle blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,100,70,1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,70,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Eyebrow */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-[#8a8a5c]/50" />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8a8a5c]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Calgary Bathroom Specialists · Before &amp; After
          </span>
        </motion.div>

        {/* Falling headline — hinged at bottom-left */}
        <div className="min-h-[9.5rem] md:min-h-[15rem] lg:min-h-[19rem] flex items-end">
          <motion.h1
            initial={reduce ? false : { rotate: -46, opacity: 0 }}
            animate={headingAnim}
            transition={headingTransition}
            className="origin-bottom-left font-black uppercase leading-[0.82] text-[#1c1a18] text-[64px] sm:text-[96px] md:text-[140px] lg:text-[180px]"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            Our<br />
            <span className="text-[#8a8a5c]">Work</span>
          </motion.h1>
        </div>

        {/* Intro copy — settles downward as the headline lands (mechanism push) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-2xl"
        >
          <div className="w-full h-px bg-gradient-to-r from-[#c4c0b8] to-transparent mb-7" />
          <p
            className="text-lg md:text-xl leading-relaxed text-[#4a4840]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Bathrooms are our specialty — dated ensuites, basement baths and tired
            showers rebuilt into spaces you look forward to. Drag the sliders for the
            before &amp; after, then watch the walkthroughs of the finished rooms.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
