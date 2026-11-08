"use client"

import { motion, useReducedMotion } from "motion/react"

// The home headline uses the same mechanism as WorksHero: the line block is
// hinged at its bottom-left corner like a beam pinned to a wall, rests tilted
// up ~46°, then falls to horizontal and bounces twice as it settles.
//
// Kept in its own file so Hero itself stays a server component — only this
// headline ships JavaScript, the photo and the rest of the section do not.
export function HeroHeadline() {
  const reduce = useReducedMotion()

  const headingAnim = reduce
    ? { rotate: 0, opacity: 1 }
    : { rotate: [-46, 3, -1.5, 0], opacity: 1 }

  // rotate and opacity get separate transitions: sharing the rotate `times`
  // array with opacity de-syncs the two and flashes the text as it lands.
  const headingTransition = reduce
    ? { duration: 0 }
    : {
        rotate: { duration: 1.1, times: [0, 0.6, 0.82, 1], ease: [0.22, 1, 0.36, 1] as const },
        opacity: { duration: 0.35, ease: "easeOut" as const },
      }

  return (
    <motion.h1
      initial={reduce ? false : { rotate: -46, opacity: 0 }}
      animate={headingAnim}
      transition={headingTransition}
      className="origin-bottom-left text-[15vw] min-[430px]:text-[72px] md:text-[100px] font-black uppercase leading-[0.88] text-[#1c1a18]"
      style={{
        fontFamily: "var(--font-heading)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      Your<br />
      Bath&shy;room.<br />
      <span className="text-[#8a8a5c]">Trans&shy;formed.</span>
    </motion.h1>
  )
}
