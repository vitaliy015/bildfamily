"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { HeroPlan } from "./heroPlan"

// The hero's intro, and it is two different things by width.
//
// From md up the photograph is on screen, so the drawing has something to be
// drawn over: a bathroom plan sets itself out in the right-hand third under a
// soft haze, and the left half of the page — headline, copy, buttons — is left
// completely alone. A detail in the corner rather than an event.
//
// Below md the photograph is hidden entirely (`hidden md:block` on it), so
// there is nothing for a plan to sit against and it would land on the copy.
// The phone keeps the earlier full-bleed treatment instead: rules ruled across
// the screen, registration crosses, and a pen that crosses once. Same idea,
// the only form of it that fits the width.
//
// Why it mounts only AFTER hydration rather than animating the hero's own
// elements: the home page already misses its LCP budget (~3.6s against 2.5s)
// and the headline is the paint that decides it. Starting the headline or the
// photo at opacity 0 moves that paint later — HeroHeadline already costs about
// 600ms that way. Nothing here is in the server HTML, so the metric cannot
// move. It is decoration over a page that is already finished.
//
// Once per session, not once per page view: an intro on every navigation stops
// being an intro and becomes a toll.

const EASE = [0.22, 1, 0.36, 1] as const
const OLIVE = "#8a8a5c"

// The phone's pen crosses in SWEEP; every rule is timed to appear as it passes,
// so the drawing follows the nib rather than racing it. Both tracks are done
// drawing by DRAW, which is what the single unmount timer is set against.
const SWEEP = 1.05
const DRAW = 1.6
const HOLD = 0.3
const FADE = 0.55
const TOTAL = DRAW + HOLD + FADE

// Rules land off-centre on purpose: evenly spaced thirds read as a table, not
// as a drawing.
const H_RULES = [18, 50, 82]
const V_RULES = [14, 46, 78]

// Four of the nine intersections — the ones framing the headline. All nine
// would read as noise.
const CROSSES = [
  { x: 14, y: 18 },
  { x: 46, y: 18 },
  { x: 14, y: 82 },
  { x: 78, y: 50 },
]

const STORAGE_KEY = "hero-intro"

// The canonical "are we past hydration" read: server snapshot false, client
// snapshot true, reconciled by React without a mismatch. Preferred over a
// mounted flag set from an effect, which would be a synchronous setState there.
const subscribeNever = () => () => {}
const onClient = () => true
const onServer = () => false

// A plain read, safe during render. It can throw in a private window or with
// site data blocked, in which case the intro simply plays.
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

  const washTimes = {
    duration: TOTAL,
    times: [0, 0.3 / TOTAL, (DRAW + HOLD) / TOTAL, 1],
    ease: "easeInOut" as const,
  }

  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          key="hero-intro"
          aria-hidden
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
          exit={{ opacity: 0 }}
        >
          {/* ── Phone: the full sheet ─────────────────────────────────── */}
          <div className="absolute inset-0 md:hidden">
            <motion.div
              className="absolute inset-0 bg-[#efece7]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.82, 0.82, 0] }}
              transition={washTimes}
            />

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
          </div>

          {/* ── md and up: the plan alone ─────────────────────────────── */}
          {/* The haze covers the right side only, feathered left so it has no
              edge, and sits below the content at z-20 — enough for olive
              hairlines to hold against a bright autumn photograph without
              touching the headline. */}
          <motion.div
            className="absolute inset-y-0 right-0 hidden w-[52%] md:block"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(239,236,231,0.62) 38%, rgba(239,236,231,0.62))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={washTimes}
          />

          <HeroPlan />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
