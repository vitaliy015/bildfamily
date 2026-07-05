"use client"

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react"
import { useInView } from "motion/react"
import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: ReactNode
  /** Classes for the inner content wrapper (padding, flex layout, min-height…). */
  className?: string
  /** Featured cards get a slightly stronger, gold-leaning glow. */
  featured?: boolean
}

// Brand spotlight card — a warm gold→olive glow.
// • Desktop (mouse): the glow tracks the cursor inside the card.
// • Touch devices (no hover): the glow lights up (centered) while the card sits
//   in the middle of the screen as you scroll.
// Uses plain radial-gradient overlays (no mask-composite of the fill / fixed
// backgrounds), so it works reliably across browsers.
export function GlowCard({ children, className = "", featured = false }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Detect touch / no-hover devices, where hover can't fire.
  const [noHover, setNoHover] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)")
    const update = () => setNoHover(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // On touch devices, "active" while the card is near the middle of the screen.
  const centered = useInView(ref, { margin: "-40% 0px -40% 0px" })
  const active = noHover && centered

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return // keep the touch glow centered
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  const fillGlow = featured
    ? "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(210,182,110,0.55), rgba(138,138,92,0.26) 42%, transparent 74%)"
    : "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(210,182,110,0.42), rgba(138,138,92,0.22) 42%, transparent 74%)"

  const borderGlow =
    "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(224,196,120,0.95), rgba(150,150,96,0.5) 45%, transparent 72%)"

  // Visible on hover (desktop) OR while centered on a touch device.
  const glowOpacity = active ? "opacity-100" : "opacity-0 group-hover:opacity-100"

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#161512] shadow-[0_1rem_2rem_-1rem_black]"
    >
      {/* Border glow — a ring that lights up under the cursor / when centered */}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300", glowOpacity)}
        style={{
          background: borderGlow,
          padding: "3px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Fill glow — soft spotlight inside the card */}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-300", glowOpacity)}
        style={{ background: fillGlow }}
      />
      {/* Content sits above the glow layers */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}
