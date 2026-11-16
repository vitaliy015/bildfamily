"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

// A drafting pen rules the sheet, then the ink dries away and leaves the hero.
//
// It went through a plan of a bathroom drawing itself here, which the client
// did not want — and with the plan gone the cream wash that existed to make it
// legible went too, along with the split that gave phones a different version.
// One treatment at every width: rules in the pen's wake, four registration
// crosses, and the nib itself.
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

// The pen crosses in SWEEP; every rule is timed to appear as it passes, so the
// drawing follows the nib rather than racing it. Both tracks are done drawing
// by DRAW, which is what the single unmount timer is set against.
//
// Every number below is a third off an earlier, slower pass — the client asked
// for a shorter intro. The hand moves faster but it still draws in the same
// order, so the gesture reads the same; what it is NOT allowed to do is take
// the cut out of FADE, because that fade is what stopped the photograph
// snapping back. 0.9s is short of the 1.2s it had and still well clear of the
// 0.55s that read as abrupt.
//
// DRAW must outlast the slowest track or the ink is cut off mid-stroke. At
// SWEEP 0.7 the last vertical finishes at 0.78 * 0.7 + 0.34 = 0.886, the last
// cross at 0.816, the last horizontal at 0.77. Hence 0.9.
const SWEEP = 0.7
const DRAW = 0.9
const HOLD = 0.2
const FADE = 0.9
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
      transition={{ duration: 0.19, delay, ease: EASE }}
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
          // Everything dissolves together rather than the wash fading while the
          // rules snap away at unmount — that mismatch is what made the photo
          // appear to jump back rather than return. One gesture, and a slow one:
          // the reveal is the part worth watching.
          animate={{ opacity: [1, 1, 0] }}
          transition={{
            opacity: {
              duration: TOTAL,
              times: [0, (DRAW + HOLD) / TOTAL, 1],
              ease: ["linear", [0.37, 0, 0.63, 1]],
            },
          }}
        >
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-[#efece7]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.82, 0.82] }}
              // Fades in, then simply holds — the container's dissolve is what
              // takes it away, so the photograph is never uncovered by two
              // curves at once.
              transition={{
                duration: TOTAL,
                times: [0, 0.2 / TOTAL, 1],
                ease: ["easeOut", "linear"],
              }}
            />

            {H_RULES.map((top, i) => (
              <motion.div
                key={`h${top}`}
                className="absolute left-0 right-0 h-px origin-left"
                style={{ top: `${top}%`, backgroundColor: OLIVE, opacity: 0.38 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SWEEP, delay: i * 0.035, ease: EASE }}
              />
            ))}

            {V_RULES.map((left) => (
              <motion.div
                key={`v${left}`}
                className="absolute top-0 bottom-0 w-px origin-top"
                style={{ left: `${left}%`, backgroundColor: OLIVE, opacity: 0.32 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.34, delay: (left / 100) * SWEEP, ease: EASE }}
              />
            ))}

            {CROSSES.map((c) => (
              <Cross key={`${c.x}-${c.y}`} x={c.x} y={c.y} delay={(c.x / 100) * SWEEP + 0.08} />
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

        </motion.div>
      )}
    </AnimatePresence>
  )
}
