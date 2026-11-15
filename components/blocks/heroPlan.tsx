"use client"

import { motion } from "motion/react"

// The plan the pen draws: a bathroom in plan view, the way it would be set out
// on paper before anyone touches a wall. Room, tub, vanity with a basin, WC,
// door swing, and a dimension line under it.
//
// Every stroke animates with `pathLength`, which motion drives through
// stroke-dasharray — so the lines genuinely draw themselves end to end rather
// than fading in. Order matters: walls first, then what goes against them,
// then the dimension, which is how the drawing would actually be made.

const OLIVE = "#8a8a5c"
const EASE = [0.22, 1, 0.36, 1] as const

type Stroke = { d: string; at: number; dur: number; fill?: string }

const STROKES: Stroke[] = [
  // Room — drawn as one continuous wall line with the doorway left open
  { d: "M14 14 H306 V232 H70", at: 0.0, dur: 0.75 },
  { d: "M14 232 V14", at: 0.5, dur: 0.3 },

  // Door swing: the leaf, then the arc it sweeps
  { d: "M14 232 L14 176", at: 0.72, dur: 0.18 },
  { d: "M14 176 A56 56 0 0 0 70 232", at: 0.82, dur: 0.42 },

  // Bathtub, top right
  { d: "M190 26 H296 V96 H190 Z", at: 0.95, dur: 0.45 },
  { d: "M284 38 h0.01", at: 1.3, dur: 0.01 },

  // Vanity run along the bottom wall, with the basin
  { d: "M96 192 H212 V222 H96 Z", at: 1.2, dur: 0.4 },
  { d: "M140 198 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0", at: 1.45, dur: 0.35 },

  // WC against the left wall
  { d: "M28 96 H64 V140 H28 Z", at: 1.35, dur: 0.3 },

  // Dimension line under the room, with end ticks
  { d: "M14 252 H306", at: 1.6, dur: 0.5 },
  { d: "M14 246 V258", at: 1.95, dur: 0.12 },
  { d: "M306 246 V258", at: 1.95, dur: 0.12 },
]

export function HeroPlan({ opacity = 0.95 }: { opacity?: number }) {
  return (
    <svg
      viewBox="0 0 320 272"
      fill="none"
      aria-hidden
      className="absolute right-[5%] top-1/2 hidden h-auto w-[400px] -translate-y-1/2 md:block lg:right-[7%] lg:w-[520px]"
      style={{ opacity }}
    >
      {STROKES.map((s) => (
        <motion.path
          key={s.d}
          d={s.d}
          stroke={OLIVE}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: s.dur, delay: s.at, ease: EASE }}
        />
      ))}

      {/* The measurement itself, typed in once the line is there */}
      <motion.text
        x="160"
        y="247"
        textAnchor="middle"
        fill={OLIVE}
        className="text-[12px] font-bold uppercase"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.18em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.05, ease: EASE }}
      >
        Bathroom
      </motion.text>
    </svg>
  )
}
