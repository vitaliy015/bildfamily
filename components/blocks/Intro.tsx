"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function Intro() {
  const [show, setShow] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const playing = useRef(false)

  useEffect(() => {
    const seen = sessionStorage.getItem("intro-seen")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (seen || reduce) {
      const raf = requestAnimationFrame(() => setShow(false))
      return () => cancelAnimationFrame(raf)
    }
    document.body.style.overflow = "hidden"

    const root = rootRef.current
    const ring = ringRef.current

    // Punch a circular hole in the overlay exactly inside the "O" ring, so the
    // site shows through it (the portal). Set the zoom origin to the same point.
    const placeHole = () => {
      if (!root || !ring) return
      const rr = ring.getBoundingClientRect()
      const base = root.getBoundingClientRect()
      const border = parseFloat(getComputedStyle(ring).borderTopWidth) || 0
      const hx = rr.left + rr.width / 2 - base.left
      const hy = rr.top + rr.height / 2 - base.top
      const hr = Math.max(4, rr.width / 2 - border)
      root.style.setProperty("--hx", `${hx}px`)
      root.style.setProperty("--hy", `${hy}px`)
      root.style.setProperty("--hr", `${hr}px`)
      root.style.transformOrigin = `${hx}px ${hy}px`
    }
    placeHole()
    window.addEventListener("resize", placeHole)

    const finish = () => {
      sessionStorage.setItem("intro-seen", "1")
      document.body.style.overflow = ""
      setShow(false)
    }

    const play = () => {
      if (playing.current) return
      playing.current = true
      if (!root) return finish()
      const tl = gsap.timeline({ onComplete: finish })
      tl.to(hintRef.current, { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, 0)
      // Grow: scaling the whole overlay grows the hole from the O until it fills
      // the screen — the site is revealed through the portal.
      tl.to(root, { scale: 40, duration: 1.5, ease: "power3.inOut" }, 0)
      tl.to(root, { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, 1.15)
    }

    const onGesture = () => play()
    window.addEventListener("wheel", onGesture, { passive: true, once: true })
    window.addEventListener("touchmove", onGesture, { passive: true, once: true })
    window.addEventListener("keydown", onGesture, { once: true })
    window.addEventListener("click", onGesture, { once: true })
    const auto = window.setTimeout(play, 4500)

    return () => {
      window.clearTimeout(auto)
      window.removeEventListener("resize", placeHole)
      window.removeEventListener("wheel", onGesture)
      window.removeEventListener("touchmove", onGesture)
      window.removeEventListener("keydown", onGesture)
      window.removeEventListener("click", onGesture)
      document.body.style.overflow = ""
    }
  }, [])

  if (!show) return null

  const maskCss =
    "radial-gradient(circle at var(--hx, 50%) var(--hy, 50%), transparent var(--hr, 0px), #000 calc(var(--hr, 0px) + 2px))"

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#1c1a17] cursor-pointer will-change-transform"
      style={{ WebkitMaskImage: maskCss, maskImage: maskCss }}
      aria-hidden
    >
      {/* Faint blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(196,169,98,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,169,98,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <p
        className="relative mb-2 md:mb-4 text-sm sm:text-base md:text-xl font-bold uppercase tracking-[0.4em] text-[#c4a962]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Transform your
      </p>

      <h1
        className="relative flex items-center leading-none font-black uppercase text-[#f0ede8] text-[24vw] select-none"
        style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}
      >
        <span>H</span>
        <span
          ref={ringRef}
          className="inline-block rounded-full border-[#c4a962]"
          style={{ width: "0.72em", height: "0.72em", borderWidth: "0.08em", margin: "0 0.02em" }}
        />
        <span>ME</span>
      </h1>

      <div
        ref={hintRef}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-[#9a9a8a]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.35em]">Scroll to enter</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="animate-bounce" aria-hidden>
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
