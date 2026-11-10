"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import {
  PaintingArt,
  FlooringArt,
  DrywallArt,
  KitchenArt,
  type ArtProps,
} from "./roomArt"

const EASE = [0.25, 0.46, 0.45, 0.94] as const

// Four of the five rooms from /additional-services, drawn from the same file
// so the teaser and the page cannot drift apart. The bathroom is left out on
// purpose: by this point on the home page it has already been made at length.
const ROOMS: { label: string; note: string; Art: (p: ArtProps) => React.ReactElement }[] = [
  { label: "Painting", note: "Walls, ceilings, trim", Art: PaintingArt },
  { label: "Flooring", note: "Plank, laminate, hardwood", Art: FlooringArt },
  { label: "Drywall", note: "Cracks, patches, repairs", Art: DrywallArt },
  { label: "Kitchens", note: "Cabinets, counters, plumbing", Art: KitchenArt },
]

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden
    className="transition-transform duration-300 group-hover:translate-x-1"
  >
    <path
      d="M2 7h10M7.5 2.5L12 7l-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function ExtraWork() {
  const reduce = useReducedMotion()
  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: reduce ? { duration: 0 } : { duration: 0.6, delay, ease: EASE },
  })

  return (
    <section
      className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20"
      style={{ backgroundColor: "var(--brand-bg-light)" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...rise()} className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#8a8a5c]" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6a6460]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              While we&rsquo;re already there
            </span>
          </div>

          <h2
            className="mt-6 text-4xl font-black uppercase leading-[0.95] text-[#1c1a18] md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Additional
            <br />
            <span className="text-[#8a8a5c]">services</span>
          </h2>

          <p
            className="mt-6 text-lg leading-relaxed text-[#4a4840]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Add them to your bathroom renovation &mdash; or book them on their
            own.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-5 md:mt-16 md:grid-cols-4 md:gap-7">
          {ROOMS.map(({ label, note, Art }, i) => (
            <motion.div
              key={label}
              {...rise(reduce ? 0 : 0.06 * (i + 1))}
              className="rounded-lg border border-[#c4c0b8]/70 bg-[#faf9f5] p-4 md:p-6"
            >
              <Art className="h-auto w-full" />
              <p
                className="mt-4 text-base font-bold uppercase tracking-[0.06em] text-[#1c1a18] md:text-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {label}
              </p>
              <p
                className="mt-1 text-sm leading-snug text-[#6a6460]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {note}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...rise(reduce ? 0 : 0.3)}
          className="mt-12 flex md:mt-14"
        >
          <Link
            href="/additional-services"
            className="group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full bg-[#8a8a5c] px-7 py-3.5 text-[#f5f2ee] transition duration-300 ease-out hover:bg-[#7a7a4e] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 sm:px-8 sm:py-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-[15px] font-bold tracking-[0.01em] sm:text-base">
              See what else we do
            </span>
            <Arrow />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
