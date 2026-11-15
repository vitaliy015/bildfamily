"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"

const EASE = [0.25, 0.46, 0.45, 0.94] as const

type Shot = {
  src: string
  title: string
  type: string
}

// Bathroom showcase — nine shots, cut down from twenty-two. The old set
// repeated itself and carried weak frames: a sideways photo, a bare toilet, a
// towel ring styled with a fake plant, two flat builder-grade rooms. Nine is
// also what the three-column masonry wants, so no column ends short.
//
// The nine are chosen to span what a bathroom job actually consists of rather
// than to show nine pretty rooms: three wide shots that establish a whole
// room, two vanities, two tile surfaces, and two fixture close-ups. Order is
// interleaved so each column gets a wide shot, a surface and a detail instead
// of clumping by kind.
const SHOTS: Shot[] = [
  { src: "/work/showcase-1.jpg",          title: "Warm-Oak Ensuite",         type: "Bathroom Remodel"    },
  { src: "/uploads/2025/09/IMG_5674.jpg", title: "Emerald & Gold Shower",    type: "Tile & Shower"       },
  { src: "/uploads/2025/09/IMG_5495.jpg", title: "Brushed-Gold Vessel Sink", type: "Vanities & Fixtures" },
  { src: "/uploads/2025/09/IMG_3494.jpg", title: "Fireside Tub Suite",       type: "Bathroom Remodel"    },
  { src: "/uploads/2025/09/IMG_6731.jpg", title: "Navy & Brass Vanity",      type: "Bathroom Remodel"    },
  { src: "/uploads/2025/09/IMG_6727.jpg", title: "Waterfall Tub Filler",     type: "Vanities & Fixtures" },
  { src: "/uploads/2025/09/IMG_3481.jpg", title: "Arched-Mirror Vanity",     type: "Bathroom Remodel"    },
  { src: "/work/showcase-2.jpg",          title: "Bright Ensuite",           type: "Bathroom Remodel"    },
  { src: "/uploads/2025/09/IMG_3484.jpg", title: "Marble Shower Niche",      type: "Tile & Shower"       },
]

// Detect touch / no-hover devices once — there hover can't fire, so we reveal
// captions on scroll instead.
function useNoHover() {
  const [noHover, setNoHover] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)")
    const update = () => setNoHover(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return noHover
}

function ShotCard({ shot, index }: { shot: Shot; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const noHover = useNoHover()
  // On touch devices, treat the card as "active" while it sits near the middle
  // of the screen — as you scroll, each card reveals its caption in turn.
  const centered = useInView(ref, { margin: "-42% 0px -42% 0px" })
  const revealed = noHover && centered

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.06, duration: 0.5, ease: EASE }}
      className="group relative mb-5 break-inside-avoid overflow-hidden cursor-pointer"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
        <Image
          src={shot.src}
          alt={`${shot.title} — ${shot.type} by Inside The House Calgary`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${revealed ? "scale-105" : "scale-100"}`}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-100 ${revealed ? "opacity-100" : "opacity-0"}`}
        />
        <figcaption
          className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 ${revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] mb-1.5 text-[#c4a962]" style={{ fontFamily: "var(--font-heading)" }}>
            {shot.type}
          </span>
          <span className="block text-xl font-bold leading-tight text-white" style={{ fontFamily: "var(--font-heading)" }}>
            {shot.title}
          </span>
        </figcaption>
        <div
          className={`absolute top-0 left-0 h-10 w-[3px] origin-top transition-transform duration-500 group-hover:scale-y-100 bg-[#c4a962] ${revealed ? "scale-y-100" : "scale-y-0"}`}
        />
      </div>
    </motion.figure>
  )
}

export function WorkGallery() {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p
            className="text-xs font-bold uppercase tracking-[0.35em] mb-5 text-[#8a8a5c]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Bathroom Gallery
          </p>
          <h2
            className="text-[38px] md:text-5xl font-black uppercase leading-[0.95] mb-5 text-[#1c1a18]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            A closer look
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#4a4840]" style={{ fontFamily: "var(--font-body)" }}>
            Vanities, showers, soaker tubs and finishing details — a cross-section of the
            bathrooms we&apos;ve built across Calgary.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {SHOTS.map((shot, i) => (
            <ShotCard key={shot.src} shot={shot} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
