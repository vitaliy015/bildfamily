"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { HeroPlan } from "./heroPlan"

// A drafting pen rules the sheet, then the ink dries away and leaves the hero.
//
// Why it is an overlay that appears only AFTER hydration, rather than an
// entrance animation on the hero's own elements: the home page already misses
// its LCP budget (~3.6s against a 2.5s target), and the headline is the paint
// that decides it. Anything that starts the headline or the photo at opacity 0
// pushes that paint later — HeroHeadline already costs about 600ms that way.
// This component renders nothing on the server and nothing on first paint, so
// the hero's own markup is untouched and the metric cannot move. It is pure
// decoration laid over a page that is already finished.
//
// It plays once per session rather than once per page view. An intro that
// fires on every navigation stops being an intro and becomes a toll.

const EASE = [0.22, 1, 0.36, 1] as const
const OLIVE = "#8a8a5c"

// The nib crosses the hero in SWEEP seconds; every rule is timed to appear as
// the nib reaches it, so the drawing follows the pen rather than racing it.
const SWEEP = 1.05
// The plan keeps drawing after the nib has crossed, so the hold has to cover
// it: the last stroke lands at ~2.1s and the label at ~2.35s.
const HOLD = 1.6
const FADE = 0.7
const TOTAL = SWEEP + HOLD + FADE

// Rules land off-centre on purpose: evenly spaced thirds read as a table, not
// as a drawing.
const H_RULES = [18, 50, 82]
const V_RULES = [14, 46, 78]

// Registration crosses mark four of the nine intersections — the ones framing
// the headline. All nine would read as noise.
const CROSSES = [
  { x: 14, y: 18 },
  { x: 46, y: 18 },
  { x: 14, y: 82 },
  { x: 78, y: 50 },
]

const STORAGE_KEY = "hero-intro"

// The canonical "are we past hydration" read: the server snapshot is false,
// the client snapshot true, and React reconciles the two without a mismatch.
// Preferred over a mounted flag set from an effect, which would be a
// synchronous setState inside useEffect.
const subscribeNever = () => () => {}
const onClient = () => true
const onServer = () => false

// A plain read, safe to call during render. It can throw in a private window
// or with site data blocked, in which case the intro simply plays.
function notPlayedYet() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "played"
  } catch {
    return true
  }
}

function Cross({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 0.85, scale: 1 }}
      transition={{ duration: 0.28, delay, ease: EASE }}
    >
      <path d="M8.5 0v17M0 8.5h17" stroke={OLIVE} strokeWidth="1.3" />
    </motion.svg>
  )
}

export function HeroIntro() {
  const reduce = useReducedMotion()
  const mounted = useSyncExternalStore(subscribeNever, onClient, onServer)
  const [finished, setFinished] = useState(false)

  // The flag is written when the run ENDS, not when it starts, so this read
  // stays true for every render during the animation.
  const playing = mounted && !reduce && !finished && notPlayedYet()

  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "played")
      } catch {
        /* nothing to remember it with — it plays again next time */
      }
      setFinished(true)
    }, TOTAL * 1000)
    return () => window.clearTimeout(t)
  }, [playing])

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          key="hero-intro"
          aria-hidden
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
          exit={{ opacity: 0 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{
            opacity: {
              duration: TOTAL,
              times: [0, (SWEEP + HOLD) / TOTAL, 1],
              ease: "easeInOut",
            },
          }}
        >
          {/* A cream wash so the drawing reads. It sits at z-10, which is above
              the photo but BELOW the content at z-20 — so it mutes the busy
              autumn photograph the plan is drawn over and leaves the headline
              and buttons at full strength. */}
          <motion.div
            className="absolute inset-0 bg-[#efece7]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.82, 0.82, 0] }}
            transition={{
              duration: TOTAL,
              times: [0, SWEEP * 0.5 / TOTAL, (SWEEP + HOLD) / TOTAL, 1],
              ease: "easeInOut",
            }}
          />

          {/* Horizontal rules — each grows from the left in the nib's wake */}
          {H_RULES.map((top, i) => (
            <motion.div
              key={`h${top}`}
              className="absolute left-0 right-0 h-px origin-left"
              style={{ top: `${top}%`, backgroundColor: OLIVE, opacity: 0.38 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SWEEP, delay: i * 0.05, ease: EASE }}
            />
          ))}

          {/* Verticals drop as the nib passes their x position */}
          {V_RULES.map((left) => (
            <motion.div
              key={`v${left}`}
              className="absolute top-0 bottom-0 w-px origin-top"
              style={{ left: `${left}%`, backgroundColor: OLIVE, opacity: 0.32 }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: (left / 100) * SWEEP, ease: EASE }}
            />
          ))}

          {CROSSES.map((c) => (
            <Cross key={`${c.x}-${c.y}`} x={c.x} y={c.y} delay={(c.x / 100) * SWEEP + 0.12} />
          ))}

          <HeroPlan />

          {/* The nib — one bright rule that crosses the hero and is gone */}
          <motion.div
            className="absolute top-0 bottom-0 w-[2px]"
            style={{ backgroundColor: OLIVE, boxShadow: `0 0 26px 3px ${OLIVE}88` }}
            initial={{ left: "-2%", opacity: 0 }}
            animate={{ left: ["-2%", "102%"], opacity: [0, 1, 1, 0] }}
            transition={{
              left: { duration: SWEEP, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: SWEEP, times: [0, 0.08, 0.85, 1] },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
