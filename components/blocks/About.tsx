"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"

// ── Constants ──────────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const UPLOADS = "/uploads"

/** Couple portrait — Anatolii & Nataliia */
const COUPLE_PHOTO = `${UPLOADS}/2025/09/photo_2025-09-16_17-18-30.jpg`
/** Anatolii on the job — installing a round mirror */
const ANATOLII_AT_WORK = `${UPLOADS}/2025/10/image-1111.jpg`

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`

const SKILLS = [
  { label: "Tile & Waterproofing",          percent: 95 },
  { label: "Custom Showers & Wet Rooms",    percent: 92 },
  { label: "Vanities & Cabinetry",          percent: 90 },
  { label: "Plumbing Fixtures & Lighting",  percent: 88 },
]

const STATS = [
  { value: "10+", label: "Years of Experience"   },
  { value: "100+",label: "Projects Completed"    },
  { value: "5★",  label: "Average Client Rating" },
  { value: "$0",  label: "Hidden Fees. Ever."    },
]

const FAMILY_BULLETS = [
  "You speak directly to the person doing the work — no middlemen, no hand-offs",
  "Our family name is on every project. That's not a slogan. It's accountability.",
  "We take fewer clients so every job gets our full attention — quality over volume",
  "We treat your home exactly the way we'd treat our own — with care and respect",
]

const ANATOLII_BULLETS = [
  "10+ years hands-on construction experience",
  "Canadian & international projects",
  "Punctual. Precise. On every job site.",
]

const NATALIIA_BULLETS = [
  "Client communication & scheduling",
  "Material sourcing & procurement",
  "Project coordination, start to finish",
]

// ── ProgressBar ────────────────────────────────────────────────────────────

function ProgressBar({ label, percent, index }: { label: string; percent: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: EASE }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-heading)" }}
        >
          {label}
        </span>
        <span className="text-sm font-bold tabular-nums" style={{ color: "var(--brand-accent-olive)" }}>
          {percent}%
        </span>
      </div>
      <div className="h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "var(--brand-border-light)" }}>
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.15 + 0.2, ease: EASE }}
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--brand-bg-dark)" }}
        />
      </div>
    </motion.div>
  )
}

// ── Bullet list reused across panels ──────────────────────────────────────

function BulletList({ items, accentColor }: { items: string[]; accentColor: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-3">
          <div className="w-5 h-px shrink-0" style={{ backgroundColor: accentColor }} />
          <span className="text-sm leading-snug" style={{ color: "var(--brand-text-muted-light)", fontFamily: "var(--font-heading)" }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Directional signpost — wooden post + cross base + swaying arrow board ─────

function HangingSign() {
  // Warm dark walnut palette (test colours, close to --brand-bg-dark #1c1a17)
  const W0 = "#190e05"  // deepest shadow
  const W2 = "#3d2710"  // main mid-tone
  const W3 = "#5c3b1c"  // lighter grain / highlight

  return (
    <motion.div
      className="relative"
      style={{ width: 240, height: 340 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      {/* Float wrapper — bobs continuously after entrance completes */}
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
      >

      {/* ── Post + cross base (static) ── */}
      <svg
        viewBox="0 0 240 340"
        width="240"
        height="340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
        aria-hidden
      >
        {/* Vertical post */}
        <rect x="103" y="32" width="24" height="260" rx="3" fill={W2} />
        {/* Left-edge shadow */}
        <rect x="103" y="32" width="7"  height="260" rx="3" fill={W0} opacity="0.5" />
        {/* Right-edge highlight */}
        <rect x="119" y="32" width="5"  height="260"        fill={W3} opacity="0.2" />

        {/* Post top cap */}
        <rect x="97" y="28" width="36" height="10" rx="3" fill={W2} />
        <rect x="97" y="28" width="36" height="4"  rx="2" fill={W3} opacity="0.38" />

        {/* ── Cross base ── */}

        {/* Centre hub block */}
        <rect x="91" y="284" width="48" height="18" rx="3" fill={W2} />
        <rect x="91" y="284" width="48" height="5"  rx="2" fill={W3} opacity="0.28" />

        {/* Left diagonal brace */}
        <path d="M 94 290 L 30 310 L 40 322 L 104 300 Z"   fill={W2} />
        <path d="M 94 290 L 30 310 L 33 308 L 97 288 Z"    fill={W3} opacity="0.2" />
        <path d="M 40 322 L 104 300 L 104 304 L 44 326 Z"  fill={W0} opacity="0.3" />

        {/* Right diagonal brace */}
        <path d="M 136 290 L 200 310 L 190 322 L 126 300 Z" fill={W2} />
        <path d="M 136 290 L 200 310 L 197 308 L 133 288 Z" fill={W3} opacity="0.2" />
        <path d="M 190 322 L 126 300 L 126 304 L 186 326 Z" fill={W0} opacity="0.3" />

        {/* Main horizontal foot plank */}
        <rect x="20"  y="312" width="200" height="20" rx="4" fill={W2} />
        {/* Top-face bevel */}
        <rect x="20"  y="312" width="200" height="5"  rx="3" fill={W3} opacity="0.3" />
        {/* Bottom shadow strip */}
        <rect x="23"  y="327" width="194" height="5"         fill={W0} opacity="0.42" />
        {/* Wood grain lines on plank */}
        <line x1="20" y1="319" x2="220" y2="319" stroke={W0} strokeWidth="0.7" opacity="0.2" />
        <line x1="20" y1="325" x2="220" y2="325" stroke={W0} strokeWidth="0.7" opacity="0.2" />
      </svg>

      {/* ── Arrow sign board (sways around post centre) ── */}
      {/*
        Sign div: left=10, top=60, width=220, height=78
        Post centre in div coords: x = 115 − 10 = 105 , y = 78/2 = 39
        transformOrigin "105px 39px"  → pivot = post axis ✓
      */}
      <motion.div
        className="absolute"
        style={{ left: 10, top: 60, width: 220, height: 78, transformOrigin: "105px 39px" }}
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        {/* Arrow-shaped board */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: W2,
            clipPath: "polygon(0 0, 81% 0, 100% 50%, 81% 100%, 0 100%)",
            boxShadow: "0 18px 44px -14px rgba(0,0,0,0.6)",
            position: "relative",
          }}
        >
          {/* Left shadow strip */}
          <div style={{ position: "absolute", inset: 0, width: 9, backgroundColor: W0, opacity: 0.55 }} />

          {/* Wood grain lines */}
          {[20, 39, 57].map((y) => (
            <div
              key={y}
              style={{
                position: "absolute",
                left: 9, top: y,
                width: "72%", height: 1,
                backgroundColor: W0, opacity: 0.25,
              }}
            />
          ))}

          {/* Gold accent rules */}
          <div style={{ position: "absolute", left: 14, top: 10,    right: "22%", height: 1, backgroundColor: "var(--brand-accent-gold)", opacity: 0.5 }} />
          <div style={{ position: "absolute", left: 14, bottom: 10, right: "22%", height: 1, backgroundColor: "var(--brand-accent-gold)", opacity: 0.5 }} />

          {/* Brand text */}
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column", justifyContent: "center",
              paddingLeft: 18, paddingRight: 52,
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: 7.5, fontWeight: 700,
                letterSpacing: "0.26em", textTransform: "uppercase",
                color: "var(--brand-accent-gold)",
                fontFamily: "var(--font-heading)",
                marginBottom: 5, opacity: 0.9,
              }}
            >
              Inside The House
            </span>
            <span
              style={{
                display: "block",
                fontSize: 17, fontWeight: 800,
                letterSpacing: "0.05em", textTransform: "uppercase",
                color: "rgba(244,238,226,0.96)",
                fontFamily: "var(--font-heading)",
                lineHeight: 1,
              }}
            >
              Our Story
            </span>
          </div>

          {/* Gold chevron at arrow tip */}
          <div style={{ position: "absolute", right: 22, top: "50%", transform: "translateY(-50%)" }}>
            <svg viewBox="0 0 14 22" width="13" height="20" fill="none" aria-hidden>
              <path d="M3 3l8 8-8 8" stroke="var(--brand-accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </motion.div>

      </motion.div>{/* end float wrapper */}
    </motion.div>
  )
}

// ── 4-panel sticky horizontal scroll — all screen sizes ───────────────────────

function HorizontalPanels() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })

  // Pixel-based x — avoids string parsing on every frame (performance fix)
  const x = useTransform(scrollYProgress, (v) => {
    const w = typeof window !== "undefined" ? window.innerWidth : 0
    const p = Math.max(0, Math.min(1, (v - 0.15) / 0.85))
    return -p * w * 3
  })
  const barScale = useTransform(scrollYProgress, [0, 0.15, 1], [0, 0, 1])
  const dotLeft  = useTransform(scrollYProgress, [0, 0.15, 1], ["0%", "0%", "100%"])

  return (
    <div ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: "var(--brand-bg-light)" }}>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-50">
          <div className="flex items-center px-5 md:px-10 pb-2">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)", mixBlendMode: "difference" }}
            >
              Our Story
            </span>
          </div>
          <div className="relative h-[8px] md:h-[10px] w-full" style={{ backgroundColor: "rgba(255,255,255,0.10)" }}>
            <motion.div
              className="absolute inset-y-0 left-0 h-full w-full origin-left"
              style={{
                scaleX: barScale,
                backgroundColor: "var(--brand-accent-gold)",
                boxShadow: "0 0 20px 2px var(--brand-accent-gold)",
              }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-[18px] w-[18px] md:h-[20px] md:w-[20px] rounded-full"
              style={{
                left: dotLeft,
                backgroundColor: "var(--brand-accent-gold)",
                boxShadow: "0 0 16px 3px var(--brand-accent-gold)",
              }}
            />
          </div>
        </div>

        {/* Horizontal strip */}
        <motion.div style={{ x, width: "400vw", willChange: "transform" }} className="flex h-full">

          {/* ── Panel 1: Philosophy + Signpost ──────────────────────── */}
          <div
            className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden"
            style={{ backgroundColor: "var(--brand-bg-light)" }}
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: NOISE, backgroundSize: "120px" }} />
            <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(100,100,70,1) 1px,transparent 1px),linear-gradient(90deg,rgba(100,100,70,1) 1px,transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Signpost — decorative, desktop only */}
            <div className="absolute right-[15%] top-1/2 -translate-y-1/2 z-0">
              <HangingSign />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 w-full">
              <div className="max-w-2xl">
                <p
                  className="text-xs font-bold uppercase tracking-[0.35em] mb-7"
                  style={{ color: "var(--brand-accent-olive)", fontFamily: "var(--font-heading)" }}
                >
                  About Inside The House
                </p>

                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -top-10 -left-2 text-[160px] font-black leading-none select-none pointer-events-none"
                    style={{ color: "rgba(28,26,24,0.04)", fontFamily: "var(--font-heading)" }}
                  >
                    02
                  </span>
                  <h2
                    className="relative text-5xl md:text-7xl font-black uppercase leading-[0.88] mb-8"
                    style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
                  >
                    Bathrooms
                    <br />
                    <span style={{ color: "var(--brand-accent-olive)" }}>Are Our Art.</span>
                    <br />
                    Your Home
                    <br />
                    Is Our Canvas.
                  </h2>
                </div>

                <p
                  className="text-base leading-relaxed max-w-md mb-10"
                  style={{ color: "var(--brand-text-body)", fontFamily: "var(--font-body)" }}
                >
                  {"When your name is on the line — not a logo, not a brand — every nail, every tile, every finish matters. That's the standard Anatolii and Nataliia have held for over a decade."}
                </p>
              </div>
            </div>
          </div>

          {/* ── Panel 2: Anatolii ────────────────────────────────────── */}
          <div
            className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden"
            style={{ backgroundColor: "var(--brand-bg-light)" }}
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: NOISE, backgroundSize: "120px" }} />

            {/* Photo — left */}
            <div className="absolute left-0 top-0 h-full w-[38%] sm:w-[44%]">
              <Image src={ANATOLII_AT_WORK} alt="Anatolii installing a mirror on site — Owner and Lead Renovator" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#eae6df] via-[#eae6df]/40 to-transparent" />
            </div>

            {/* Content — right */}
            <div className="relative z-10 ml-auto px-5 sm:px-10 md:px-20 lg:px-24 w-[62%] sm:w-[56%] max-w-lg">
              <p
                className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.35em] mb-3 sm:mb-5"
                style={{ color: "var(--brand-accent-olive)", fontFamily: "var(--font-heading)" }}
              >
                The Hands Behind The Work
              </p>
              <h3
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none mb-3 sm:mb-6"
                style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                Anatolii
              </h3>
              <p
                className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-8"
                style={{ color: "var(--brand-text-body)", fontFamily: "var(--font-body)" }}
              >
                {"Over a decade of hands-on construction across Canadian and international projects. Anatolii doesn't manage renovations from an office — he's on the tools, on the site, and on the phone with you. Every measurement is precise. Every finish is personal."}
              </p>
              <BulletList items={ANATOLII_BULLETS} accentColor="var(--brand-accent-olive)" />
            </div>
          </div>

          {/* ── Panel 3: Nataliia ────────────────────────────────────── */}
          <div
            className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden"
            style={{ backgroundColor: "var(--brand-bg-dark)" }}
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: NOISE, backgroundSize: "120px" }} />

            {/* Photo — right */}
            <div className="absolute right-0 top-0 h-full w-[38%] sm:w-[44%]">
              <Image src={COUPLE_PHOTO} alt="Nataliia and Anatolii — Inside The House Calgary" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1c1a17] via-[#1c1a17]/40 to-transparent" />
            </div>

            {/* Content — left */}
            <div className="relative z-10 px-5 sm:px-10 md:px-20 lg:px-28 w-[62%] sm:w-[56%] max-w-lg">
              <p
                className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.35em] mb-3 sm:mb-5"
                style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
              >
                The Mind Behind The Team
              </p>
              <h3
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none mb-3 sm:mb-6"
                style={{ color: "var(--brand-text-light)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                Nataliia
              </h3>
              <p
                className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-8"
                style={{ color: "var(--brand-text-muted-dark)", fontFamily: "var(--font-body)" }}
              >
                {"Every project that runs on time, every material that arrives on schedule, every client call answered same-day — that's Nataliia. She manages the entire operation so Anatolii can focus on what he does best: the craft."}
              </p>
              <div className="flex flex-col gap-2 sm:gap-2.5">
                {NATALIIA_BULLETS.map((item) => (
                  <div key={item} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-4 sm:w-5 h-px shrink-0" style={{ backgroundColor: "var(--brand-accent-gold)" }} />
                    <span className="text-xs sm:text-sm leading-snug" style={{ color: "var(--brand-text-muted-dark)", fontFamily: "var(--font-heading)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Panel 4: Family advantage ────────────────────────────── */}
          <div
            className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden"
            style={{ backgroundColor: "var(--brand-bg-dark)" }}
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: NOISE, backgroundSize: "120px" }} />
            <div aria-hidden
              className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 text-[22vw] sm:text-[18vw] font-black uppercase leading-none select-none pointer-events-none"
              style={{ color: "rgba(255,255,255,0.03)", fontFamily: "var(--font-heading)" }}
            >
              FAMILY
            </div>

            <div className="relative z-10 px-5 sm:px-10 md:px-20 lg:px-28 max-w-3xl">
              <p
                className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.35em] mb-3 sm:mb-6"
                style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
              >
                Why Family-Owned Changes Everything
              </p>
              <h3
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-5 sm:mb-10"
                style={{ color: "var(--brand-text-light)", fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
              >
                {"When It's Your Name on the Door —"}<br className="hidden sm:block" />{" You Don't Cut Corners."}
              </h3>
              <div className="flex flex-col gap-3 sm:gap-7 mb-6 sm:mb-12">
                {FAMILY_BULLETS.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 sm:gap-6">
                    <span
                      className="shrink-0 text-base sm:text-xl font-black leading-none mt-0.5 tabular-nums"
                      style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: "var(--brand-text-muted-dark)" }}>
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-widest transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: "var(--brand-accent-gold)", color: "var(--brand-bg-dark)", fontFamily: "var(--font-heading)" }}
              >
                Get Your Free Quote
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

// ── Mobile / tablet: 6-panel horizontal scroll ────────────────────────────
// Pattern: heading → photo → text → photo → text → family.
// Each panel is full-screen — no squeezing of content.

function MobileHorizontalPanels() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })

  // Pixel-based x — avoids string parsing on every frame (performance fix)
  const x = useTransform(scrollYProgress, (v) => {
    const w = typeof window !== "undefined" ? window.innerWidth : 0
    const p = Math.max(0, Math.min(1, (v - 0.15) / 0.85))
    return -p * w * 5
  })
  const barScaleMob = useTransform(scrollYProgress, [0, 0.15, 1], [0, 0, 1])
  const dotLeftMob  = useTransform(scrollYProgress, [0, 0.15, 1], ["0%", "0%", "100%"])

  return (
    <div ref={sectionRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ backgroundColor: "var(--brand-bg-light)" }}>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-50">
          <div className="flex items-center px-5 pb-2">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)", mixBlendMode: "difference" }}
            >
              Our Story
            </span>
          </div>
          <div className="relative h-[8px] w-full" style={{ backgroundColor: "rgba(255,255,255,0.10)" }}>
            <motion.div
              className="absolute inset-y-0 left-0 h-full w-full origin-left"
              style={{ scaleX: barScaleMob, backgroundColor: "var(--brand-accent-gold)", boxShadow: "0 0 16px 2px var(--brand-accent-gold)" }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-[16px] w-[16px] rounded-full"
              style={{ left: dotLeftMob, backgroundColor: "var(--brand-accent-gold)", boxShadow: "0 0 12px 3px var(--brand-accent-gold)" }}
            />
          </div>
        </div>

        {/* 6-panel strip */}
        <motion.div style={{ x, width: "600vw", willChange: "transform" }} className="flex h-full">

          {/* ── 1: Heading + Signpost ── */}
          <div
            className="relative flex-shrink-0 w-screen h-full flex items-start pt-[18vh] overflow-hidden"
            style={{ backgroundColor: "var(--brand-bg-light)" }}
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: NOISE, backgroundSize: "120px" }} />
            <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(100,100,70,1) 1px,transparent 1px),linear-gradient(90deg,rgba(100,100,70,1) 1px,transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Signpost — centered horizontally on mobile */}
            <div
              className="absolute z-0 left-1/2"
              style={{ bottom: "15%", transform: "translateX(-50%) scale(0.62)", transformOrigin: "bottom center" }}
            >
              <HangingSign />
            </div>

            {/* Heading — full width, big proportions */}
            <div className="relative z-10 w-full px-6 sm:px-10">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.35em] mb-5"
                style={{ color: "var(--brand-accent-olive)", fontFamily: "var(--font-heading)" }}
              >
                About Inside The House
              </p>
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -top-6 -left-1 text-[100px] sm:text-[130px] font-black leading-none select-none pointer-events-none"
                  style={{ color: "rgba(28,26,24,0.04)", fontFamily: "var(--font-heading)" }}
                >
                  02
                </span>
                <h2
                  className="relative text-[40px] sm:text-5xl md:text-6xl font-black uppercase leading-[0.88] mb-6"
                  style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
                >
                  Bathrooms
                  <br />
                  <span style={{ color: "var(--brand-accent-olive)" }}>Are Our Art.</span>
                  <br />
                  Your Home
                  <br />
                  Is Our Canvas.
                </h2>
              </div>
              <p
                className="text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm"
                style={{ color: "var(--brand-text-body)", fontFamily: "var(--font-body)" }}
              >
                {"When your name is on the line — not a logo, not a brand — every nail, every tile, every finish matters."}
              </p>
            </div>
          </div>

          {/* ── 2: Anatolii — full-bleed photo ── */}
          <div className="relative flex-shrink-0 w-screen h-full overflow-hidden">
            <Image src={ANATOLII_AT_WORK} alt="Anatolii — Owner and Lead Renovator, Inside The House Calgary" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-20 left-6 z-10">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.35em] mb-2"
                style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
              >
                The Hands Behind The Work
              </p>
              <h3
                className="text-5xl sm:text-6xl font-black uppercase leading-none"
                style={{ color: "#ffffff", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                Anatolii
              </h3>
            </div>
          </div>

          {/* ── 3: Anatolii — text ── */}
          <div
            className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden"
            style={{ backgroundColor: "var(--brand-bg-light)" }}
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: NOISE, backgroundSize: "120px" }} />
            <div className="relative z-10 w-full px-6 sm:px-10">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.35em] mb-4"
                style={{ color: "var(--brand-accent-olive)", fontFamily: "var(--font-heading)" }}
              >
                The Hands Behind The Work
              </p>
              <h3
                className="text-6xl sm:text-7xl font-black uppercase leading-none mb-6"
                style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                Anatolii
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed mb-7"
                style={{ color: "var(--brand-text-body)", fontFamily: "var(--font-body)" }}
              >
                {"Over a decade of hands-on construction across Canadian and international projects. Anatolii doesn't manage renovations from an office — he's on the tools, on the site, and on the phone with you. Every measurement is precise. Every finish is personal."}
              </p>
              <BulletList items={ANATOLII_BULLETS} accentColor="var(--brand-accent-olive)" />
            </div>
          </div>

          {/* ── 4: Nataliia — full-bleed photo ── */}
          <div className="relative flex-shrink-0 w-screen h-full overflow-hidden">
            <Image src={COUPLE_PHOTO} alt="Nataliia and Anatolii — Inside The House Calgary" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-20 left-6 z-10">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.35em] mb-2"
                style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
              >
                The Mind Behind The Team
              </p>
              <h3
                className="text-5xl sm:text-6xl font-black uppercase leading-none"
                style={{ color: "#ffffff", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                Nataliia
              </h3>
            </div>
          </div>

          {/* ── 5: Nataliia — text ── */}
          <div
            className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden"
            style={{ backgroundColor: "var(--brand-bg-dark)" }}
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: NOISE, backgroundSize: "120px" }} />
            <div className="relative z-10 w-full px-6 sm:px-10">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.35em] mb-4"
                style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
              >
                The Mind Behind The Team
              </p>
              <h3
                className="text-6xl sm:text-7xl font-black uppercase leading-none mb-6"
                style={{ color: "var(--brand-text-light)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                Nataliia
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed mb-7"
                style={{ color: "var(--brand-text-muted-dark)", fontFamily: "var(--font-body)" }}
              >
                {"Every project that runs on time, every material that arrives on schedule, every client call answered same-day — that's Nataliia. She manages the entire operation so Anatolii can focus on what he does best: the craft."}
              </p>
              <div className="flex flex-col gap-2.5">
                {NATALIIA_BULLETS.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-px shrink-0" style={{ backgroundColor: "var(--brand-accent-gold)" }} />
                    <span className="text-sm" style={{ color: "var(--brand-text-muted-dark)", fontFamily: "var(--font-heading)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 6: Family advantage ── */}
          <div
            className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden"
            style={{ backgroundColor: "var(--brand-bg-dark)" }}
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: NOISE, backgroundSize: "120px" }} />
            <div aria-hidden
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[28vw] font-black uppercase leading-none select-none pointer-events-none"
              style={{ color: "rgba(255,255,255,0.03)", fontFamily: "var(--font-heading)" }}
            >
              FAMILY
            </div>
            <div className="relative z-10 px-6 sm:px-10 max-w-xl">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.35em] mb-4"
                style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
              >
                Why Family-Owned Changes Everything
              </p>
              <h3
                className="text-2xl sm:text-3xl font-black uppercase leading-tight mb-7"
                style={{ color: "var(--brand-text-light)", fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
              >
                {"When It's Your Name on the Door — You Don't Cut Corners."}
              </h3>
              <div className="flex flex-col gap-4 mb-8">
                {FAMILY_BULLETS.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span
                      className="shrink-0 text-base font-black leading-none mt-0.5 tabular-nums"
                      style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--brand-text-muted-dark)" }}>
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: "var(--brand-accent-gold)", color: "var(--brand-bg-dark)", fontFamily: "var(--font-heading)" }}
              >
                Get Your Free Quote
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

// ── Stats + Progress bars ──────────────────────────────────────────────────

function StatsAndSkills() {
  return (
    <div className="py-24 md:py-32 px-8 md:px-16 lg:px-24" style={{ backgroundColor: "var(--brand-bg-light)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold uppercase tracking-[0.35em] mb-16"
          style={{ color: "var(--brand-accent-olive)", fontFamily: "var(--font-heading)" }}
        >
          By The Numbers
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: EASE }}
              >
                <div
                  className="text-5xl md:text-6xl font-black leading-none mb-2"
                  style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-[0.2em]"
                  style={{ color: "var(--brand-text-muted-light)", fontFamily: "var(--font-heading)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="flex flex-col gap-8 justify-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-[0.35em] mb-2"
              style={{ color: "var(--brand-text-muted-light)", fontFamily: "var(--font-heading)" }}
            >
              Our Expertise
            </motion.p>
            {SKILLS.map((skill, i) => (
              <ProgressBar key={skill.label} label={skill.label} percent={skill.percent} index={i} />
            ))}
          </div>

        </div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-10 border-t"
          style={{ borderColor: "var(--brand-border-light)" }}
        >
          <p
            className="text-xl md:text-2xl leading-relaxed mb-4 max-w-3xl"
            style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-body)", fontStyle: "italic" }}
          >
            {`"Always arrived on time and cleaned the work site after every day. Completed ahead of schedule and under budget — I couldn't recommend them more highly."`}
          </p>
          <cite
            className="text-xs font-bold uppercase tracking-[0.25em] not-italic"
            style={{ color: "var(--brand-accent-olive)", fontFamily: "var(--font-heading)" }}
          >
            — Jennifer Yaholnitsky, Calgary
          </cite>
        </motion.blockquote>

      </div>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────

export function About() {
  return (
    <section id="about" aria-label="About Inside The House" className="scroll-mt-28">
      {/* Desktop lg+: 4-panel horizontal scroll */}
      <div className="hidden lg:block">
        <HorizontalPanels />
      </div>
      {/* Mobile / tablet below lg: 6-panel horizontal scroll */}
      <div className="lg:hidden">
        <MobileHorizontalPanels />
      </div>
      <StatsAndSkills />
    </section>
  )
}
