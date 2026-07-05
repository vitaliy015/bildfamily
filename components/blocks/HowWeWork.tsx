"use client"

import { motion } from "motion/react"

const EASE = [0.25, 0.46, 0.45, 0.94] as const

type Step = {
  n: string
  time: string
  title: string
  desc: string
}

const STEPS: Step[] = [
  {
    n: "01",
    time: "24–48 hrs",
    title: "Free Quote",
    desc: "We visit, measure and listen — then give you a clear, no-obligation quote. No pressure, no hidden surprises.",
  },
  {
    n: "02",
    time: "1–2 weeks",
    title: "Design & Materials",
    desc: "We help you choose tiles, vanities and finishes, then lock the full scope and price in writing.",
  },
  {
    n: "03",
    time: "Flexible",
    title: "Schedule & Build",
    desc: "Dates that fit you — evenings and weekends available. We protect your home and clean up every single day.",
  },
  {
    n: "04",
    time: "Final day",
    title: "Walkthrough & Handover",
    desc: "We walk the finished space together. You only sign off when everything is exactly right.",
  },
]

export function HowWeWork() {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#1c1a17]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p
            className="text-xs font-bold uppercase tracking-[0.35em] mb-5 text-[#c4a962]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How We Work
          </p>
          <h2
            className="text-[38px] md:text-5xl font-black uppercase leading-[0.95] mb-5 text-[#f0ede8]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            From first call to final walkthrough
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#9a9a8a]" style={{ fontFamily: "var(--font-body)" }}>
            A simple, honest process — reliable timelines and a clean job site at every
            stage. You always know what happens next.
          </p>
        </div>

        {/* Timeline line (decorative) */}
        <div className="hidden lg:block h-px w-full mb-10 bg-gradient-to-r from-[#c4a962]/50 via-[#8a8a5c]/30 to-transparent" />

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
              className="relative flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-6xl font-black leading-none text-white/10"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.n}
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c4a962] border border-[#c4a962]/40 rounded-full px-3 py-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.time}
                </span>
              </div>

              <div className="w-8 h-px bg-[#8a8a5c]" />

              <h3
                className="text-xl md:text-2xl font-black uppercase leading-tight text-[#f0ede8]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#9a9a8a]" style={{ fontFamily: "var(--font-body)" }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <p
          className="mt-14 text-sm text-[#9a9a8a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="text-[#c4a962] font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Typical bathroom:
          </span>{" "}
          1–3 weeks on site. Anatolii and Nataliia are personally involved on every job.
        </p>
      </div>
    </section>
  )
}
