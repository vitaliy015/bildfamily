"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import Image from "next/image"

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Works",    href: "/portfolio" },
  { label: "Contact",  href: "/contact" },
]

const EASE = [0.4, 0, 0.2, 1] as const

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const showLinks = !isScrolled || isHovered

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        layout
        transition={{ duration: 0.5, ease: EASE }}
        className="flex items-center gap-3 rounded-full bg-[#eae6df]/85 backdrop-blur-xl border border-[#c4c0b8]/60 shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-4 py-3 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo — white version */}
        <motion.div layout="position" transition={{ duration: 0.5, ease: EASE }}>
          <Link href="/" className="flex items-center px-3 py-1.5 shrink-0">
            <Image
              src="https://insidethehouseca.com/wp-content/uploads/2025/10/black-logo-1.png"
              alt="Inside The House — Calgary Renovations"
              width={160}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
        </motion.div>

        {/* Nav links */}
        <motion.nav
          initial={false}
          animate={{
            width: showLinks ? 480 : 0,
            opacity: showLinks ? 1 : 0,
          }}
          transition={{
            width: { duration: 0.5, ease: EASE },
            opacity: { duration: showLinks ? 0.3 : 0.2, delay: showLinks ? 0.1 : 0 },
          }}
          className="overflow-hidden shrink-0"
          style={{ pointerEvents: showLinks ? "auto" : "none" }}
        >
          <div className="flex items-center justify-between rounded-full bg-[#d8d4cc]/50 border border-[#c4c0b8]/50 px-2 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex-1 text-center py-1.5 rounded-full text-base text-[#4a4840] hover:text-[#1c1a18] hover:bg-white/60 transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.nav>

        {/* CTA Button */}
        <motion.div layout="position" transition={{ duration: 0.5, ease: EASE }}>
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-full bg-[#8a8a5c] text-[#f5f2ee] pl-6 pr-2.5 py-2.5 shrink-0 group hover:bg-[#7a7a4e] transition-colors duration-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-base font-bold uppercase tracking-wide whitespace-nowrap">Get a Free Quote</span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </header>
  )
}
