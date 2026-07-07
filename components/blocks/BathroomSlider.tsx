"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"

type Slide = { src: string; type: string; title: string }

const SLIDES: Slide[] = [
  { src: "/uploads/2025/09/IMG_3483.jpg", type: "Bathroom Remodel", title: "Fireside Soaker Tub" },
  { src: "/work/ensuite-after.jpg",       type: "Master Ensuite",   title: "Navy & Marble Ensuite" },
  { src: "/uploads/2025/09/IMG_4359.jpg", type: "Tile & Shower",    title: "Frameless Glass Shower" },
  { src: "/work/showcase-2.jpg",          type: "Powder Room",      title: "Moody Powder Room" },
  { src: "/uploads/2025/09/IMG_6731.jpg", type: "Vanity & Fixtures", title: "Navy & Brass Vanity" },
  { src: "/work/showcase-4.jpg",          type: "Bathroom Remodel", title: "Freestanding Soaker" },
]

const DURATION = 5.2 // seconds per slide

export function BathroomSlider() {
  const [index, setIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<Array<HTMLDivElement | null>>([])
  const captionRef = useRef<HTMLDivElement>(null)

  const go = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length)

  // Auto-advance — timer resets whenever the index changes (manual or auto).
  useEffect(() => {
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), DURATION * 1000)
    return () => window.clearTimeout(id)
  }, [index])

  // GSAP transition on every index change.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ctx = gsap.context(() => {
      slideRefs.current.forEach((el, i) => {
        if (!el) return
        const img = el.querySelector<HTMLElement>("[data-img]")
        gsap.killTweensOf([el, img])
        if (i === index) {
          gsap.set(el, { zIndex: 2 })
          gsap.to(el, { autoAlpha: 1, duration: reduce ? 0 : 1, ease: "power2.out", overwrite: "auto" })
          if (img) {
            if (reduce) gsap.set(img, { scale: 1 })
            else gsap.fromTo(img, { scale: 1.14 }, { scale: 1, duration: DURATION + 0.4, ease: "none", overwrite: "auto" })
          }
        } else {
          gsap.to(el, { autoAlpha: 0, duration: reduce ? 0 : 0.8, ease: "power2.out", zIndex: 1, overwrite: "auto" })
        }
      })

      // Caption slides up
      if (captionRef.current) {
        gsap.fromTo(
          captionRef.current,
          { y: reduce ? 0 : 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.25, ease: "power2.out", overwrite: "auto" },
        )
      }

      // Segmented "stories" progress bar
      const fills = rootRef.current?.querySelectorAll<HTMLElement>("[data-seg]")
      fills?.forEach((f, i) => {
        gsap.killTweensOf(f)
        if (i < index) gsap.set(f, { scaleX: 1 })
        else if (i === index) gsap.fromTo(f, { scaleX: 0 }, { scaleX: 1, duration: reduce ? 0 : DURATION, ease: "none" })
        else gsap.set(f, { scaleX: 0 })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [index])

  const current = SLIDES[index]

  return (
    <div
      ref={rootRef}
      className="group relative w-full aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] overflow-hidden select-none"
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          ref={(el) => { slideRefs.current[i] = el }}
          className="absolute inset-0 opacity-0"
        >
          <div data-img className="absolute inset-0 will-change-transform">
            <Image
              src={slide.src}
              alt={`${slide.title} — ${slide.type} by Inside The House Calgary`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      ))}

      {/* Bottom gradient for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 z-[3] pointer-events-none bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Olive accent bar */}
      <div className="absolute top-0 left-0 h-14 w-[3px] z-[4] bg-[#8a8a5c]" />

      {/* Caption + counter */}
      <div className="absolute inset-x-0 bottom-0 z-[4] p-6 flex items-end justify-between gap-4">
        <div ref={captionRef}>
          <span
            className="block text-[10px] font-bold uppercase tracking-[0.3em] mb-1.5 text-[#c4a962]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {current.type}
          </span>
          <span
            className="block text-xl md:text-2xl font-black uppercase leading-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {current.title}
          </span>
        </div>
        <span
          className="shrink-0 text-xs font-bold tracking-[0.2em] text-white/70"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Prev / Next arrows (appear on hover) */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous bathroom"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-[5] w-10 h-10 flex items-center justify-center rounded-full bg-black/35 text-white opacity-0 group-hover:opacity-100 hover:bg-[#8a8a5c] transition-all duration-200 backdrop-blur-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next bathroom"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-[5] w-10 h-10 flex items-center justify-center rounded-full bg-black/35 text-white opacity-0 group-hover:opacity-100 hover:bg-[#8a8a5c] transition-all duration-200 backdrop-blur-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Segmented progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-[5] flex gap-1.5 px-4 pb-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to ${slide.title}`}
            className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/25"
          >
            <span data-seg className="absolute inset-0 origin-left bg-[#c4a962]" style={{ transform: "scaleX(0)" }} />
          </button>
        ))}
      </div>
    </div>
  )
}
