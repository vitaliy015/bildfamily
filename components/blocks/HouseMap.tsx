"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import {
  type ArtProps,
  BathroomArt,
  PaintingArt,
  FlooringArt,
  DrywallArt,
  KitchenArt,
} from "./roomArt"

const EASE = [0.25, 0.46, 0.45, 0.94] as const

/* ────────────────────────────────────────────────────────────────────────────
   Five stops, one house. Every room is the same isometric corner seen from the
   same angle, so walking down the page reads as walking through a home rather
   than flicking past five unrelated icons. Nothing is stock: these are drawn
   here, in the site's own two colours, which also means no licence travels
   with them. The geometry lives in isoRoom.tsx — positions are named in room
   space (a spot on the floor, a spot on a wall) and projected there.
   ──────────────────────────────────────────────────────────────────────── */


/* ──────────────────────────────────────────────────────────────────────── */

type Stop = {
  id: string
  room: string
  service: string
  body: string
  aside: string
  Art: (props: ArtProps) => React.ReactElement
}

const STOPS: Stop[] = [
  {
    id: "bathroom",
    room: "Where we start",
    service: "Your bathroom",
    body:
      "This is the job you called us about, and it stays the job. Down to the studs, waterproofed properly, tiled, finished, cleaned up behind us.",
    aside: "You are here",
    Art: BathroomArt,
  },
  {
    id: "painting",
    room: "Step out the door",
    service: "Painting",
    body:
      "The hallway takes the beating on the way in and out — and our dust sheets are already down. Walls, ceilings and trim, cut in by hand, in the same visit.",
    aside: "Same crew, same week",
    Art: PaintingArt,
  },
  {
    id: "flooring",
    room: "Carry on down the hall",
    service: "Flooring",
    body:
      "Vinyl plank, laminate or engineered hardwood. Floors are the cheapest thing to add while the house is already a worksite, and the first thing anyone notices afterwards.",
    aside: "Transitions matched to the new bathroom",
    Art: FlooringArt,
  },
  {
    id: "drywall",
    room: "The walls you stopped seeing",
    service: "Drywall & repairs",
    body:
      "Cracks above the doors, the dent behind the handle, somebody else's patch job. Boarded, taped, sanded and finished so it does not show up under a side light.",
    aside: "Ready to paint, not just filled",
    Art: DrywallArt,
  },
  {
    id: "kitchens",
    room: "The far end of the house",
    service: "Kitchens",
    body:
      "The bigger one, and we treat it that way. Cabinets, counters, backsplash and the plumbing behind them. Ask while we are on site and you get a real quote instead of a guess.",
    aside: "Quoted properly, in person",
    Art: KitchenArt,
  },
]

export function HouseMap() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // The route draws itself as the page moves, so the line is always a little
  // ahead of where the reader is — it leads, rather than reporting.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 70%"],
  })
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1])

  // `initial` is read once, on mount — and useReducedMotion still reports
  // false at that moment, so branching on it there leaves these elements
  // stuck at opacity 0 for exactly the people who asked for less movement.
  // Keep one initial state for everybody and take the motion out of the
  // transition instead.
  const reveal = (y: number, delay = 0) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-110px" },
    transition: reduce
      ? { duration: 0, delay: 0 }
      : { duration: 0.6 + delay, delay, ease: EASE },
  })

  return (
    <div ref={trackRef} className="relative pb-16">
      {/* The route the way a map draws one: the part still ahead is dashed,
          the part already walked is solid. A 1px line in the same two greys
          was there but invisible, which wasted the whole gesture. */}
      <div
        className="absolute top-2 bottom-[44px] w-0 border-l-2 border-dashed border-[#c4c0b8] left-[18px] md:left-[26px] lg:left-1/2 lg:-translate-x-px"
        aria-hidden
      />
      <motion.div
        className="absolute top-2 bottom-[44px] w-0.5 origin-top bg-[#8a8a5c] left-[18px] md:left-[26px] lg:left-1/2 lg:-translate-x-px"
        style={{ scaleY: reduce ? 1 : drawn }}
        aria-hidden
      />

      <ol className="relative space-y-20 md:space-y-24 lg:space-y-28">
        {STOPS.map((stop, i) => {
          const { Art } = stop
          const flip = i % 2 === 1
          return (
            <li key={stop.id} className="relative">
              {/* the pin on the route */}
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }}
                className="absolute top-1.5 z-10 flex h-[13px] w-[13px] items-center justify-center rounded-full border-2 border-[#8a8a5c] bg-[#f5f2ee] left-[12px] md:left-[20px] lg:left-1/2 lg:-translate-x-1/2"
                aria-hidden
              >
                {i === 0 && <span className="h-[5px] w-[5px] rounded-full bg-[#8a8a5c]" />}
              </motion.span>

              <div className="grid gap-8 pl-10 md:pl-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pl-0">
                {/* words */}
                <motion.div
                  {...reveal(26)}
                  className={
                    flip
                      ? "lg:order-2 lg:pl-20"
                      : "lg:order-1 lg:pr-20 lg:text-right"
                  }
                >
                  <p
                    className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8a8a5c]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stop.room}
                  </p>
                  <h3
                    className="mb-4 text-[34px] font-black uppercase leading-[0.95] text-[#1c1a18] md:text-[46px]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stop.service}
                  </h3>
                  <p
                    className="max-w-[46ch] leading-relaxed text-[#4a4840] lg:inline-block"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {stop.body}
                  </p>
                  <p
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c4c0b8] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a6460]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {i === 0 && (
                      <span className="h-[6px] w-[6px] rounded-full bg-[#8a8a5c]" />
                    )}
                    {stop.aside}
                  </p>
                </motion.div>

                {/* the room */}
                <motion.div
                  {...reveal(34, 0.08)}
                  className={flip ? "lg:order-1 lg:pr-20" : "lg:order-2 lg:pl-20"}
                >
                  <div className="rounded-lg border border-[#c4c0b8]/70 bg-[#faf9f5] p-4 sm:p-6 md:p-9">
                    <Art className="h-auto w-full" />
                  </div>
                </motion.div>
              </div>
            </li>
          )
        })}
      </ol>

      {/* the route runs out, pointing on to what comes next */}
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        className="absolute bottom-[28px] left-[12px] md:left-[20px] lg:left-1/2 lg:-translate-x-1/2"
        aria-hidden
      >
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
          <path
            d="M6.5 0v13M1.5 8.5l5 5 5-5"
            stroke="#8a8a5c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </div>
  )
}
