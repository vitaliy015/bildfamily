"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Phone, Menu, X } from "lucide-react"
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

const PHONE = "+1 (403) 000-0000"
const PHONE_TEL = `tel:${PHONE.replace(/\D/g, "")}`

const LOGO_SRC = "https://insidethehouseca.com/wp-content/uploads/2025/10/black-logo-1.png"

const QuoteArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!phoneOpen) return
    const close = () => setPhoneOpen(false)
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [phoneOpen])

  // Lock body scroll + close on Escape while the mobile overlay is open
  useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  // Close the overlay if the viewport grows to desktop (e.g. rotate / resize)
  useEffect(() => {
    if (!menuOpen) return
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [menuOpen])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const showLinks = !isScrolled || isHovered
  // Nav list grows to fit the phone number when it's revealed inside the list
  const navWidth = showLinks ? (phoneOpen ? 628 : 480) : 0

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* ───────────── Desktop pill (lg and up) ───────────── */}
      <motion.div
        layout
        transition={{ duration: 0.5, ease: EASE }}
        className="hidden lg:flex items-center gap-3 rounded-full bg-[#eae6df]/85 backdrop-blur-xl border border-[#c4c0b8]/60 shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-4 py-3 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <motion.div layout="position" transition={{ duration: 0.5, ease: EASE }}>
          <Link href="/" onClick={scrollToTop} className="flex items-center px-3 py-1.5 shrink-0">
            <Image
              src={LOGO_SRC}
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
            width: navWidth,
            opacity: showLinks ? 1 : 0,
          }}
          transition={{
            width: { duration: 0.45, ease: EASE },
            opacity: { duration: showLinks ? 0.3 : 0.2, delay: showLinks ? 0.1 : 0 },
          }}
          className="overflow-hidden shrink-0"
          style={{ pointerEvents: showLinks ? "auto" : "none" }}
        >
          <div className="flex items-center rounded-full bg-[#d8d4cc]/50 border border-[#c4c0b8]/50 px-2 py-2">
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

            {/* Phone — list member, expands inline to reveal the number */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setPhoneOpen((v) => !v) }}
              aria-label="Show phone number"
              className="flex items-center shrink-0 py-1.5 pl-2.5 pr-2.5 rounded-full text-[#4a4840] hover:text-[#1c1a18] hover:bg-white/60 transition-colors duration-200"
            >
              <Phone size={17} strokeWidth={1.8} className="shrink-0" aria-hidden />
              <AnimatePresence initial={false}>
                {phoneOpen && (
                  <motion.a
                    href={PHONE_TEL}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE, delay: phoneOpen ? 0.12 : 0 }}
                    className="whitespace-nowrap pl-2 pr-1 text-sm font-bold text-[#1c1a18]"
                    style={{ fontFamily: "var(--font-heading)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {PHONE}
                  </motion.a>
                )}
              </AnimatePresence>
            </button>
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
              <QuoteArrow />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* ───────────── Mobile bar (below lg) — compresses on scroll ───────────── */}
      <motion.div
        layout
        transition={{ duration: 0.5, ease: EASE }}
        className={`flex lg:hidden items-center gap-2 rounded-full bg-[#eae6df]/85 backdrop-blur-xl border border-[#c4c0b8]/60 shadow-[0_4px_24px_rgba(0,0,0,0.08)] pl-4 pr-2 py-2 pointer-events-auto ${isScrolled ? "w-auto" : "w-full max-w-md justify-between"}`}
      >
        <motion.div layout="position" transition={{ duration: 0.5, ease: EASE }}>
          <Link href="/" onClick={scrollToTop} className="flex items-center shrink-0" aria-label="Inside The House — home">
            <Image
              src={LOGO_SRC}
              alt="Inside The House — Calgary Renovations"
              width={160}
              height={48}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        </motion.div>

        <motion.div layout="position" transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPhoneOpen((v) => !v) }}
            aria-label="Show phone number"
            className="flex items-center h-11 px-3 rounded-full text-[#4a4840] hover:text-[#1c1a18] hover:bg-white/60 transition-colors duration-200"
          >
            <Phone size={20} strokeWidth={1.8} className="shrink-0" aria-hidden />
            <AnimatePresence initial={false}>
              {phoneOpen && (
                <motion.a
                  href={PHONE_TEL}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden whitespace-nowrap pl-2 text-sm font-bold text-[#1c1a18]"
                  style={{ fontFamily: "var(--font-heading)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {PHONE}
                </motion.a>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#4a4840] hover:text-[#1c1a18] hover:bg-white/60 transition-colors duration-200"
          >
            <Menu size={22} strokeWidth={1.8} aria-hidden />
          </button>
        </motion.div>
      </motion.div>

      {/* ───────────── Mobile full-screen overlay ───────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="lg:hidden fixed inset-0 z-[60] flex flex-col bg-[#eae6df]/95 backdrop-blur-xl pointer-events-auto"
          >
            {/* Top row — logo + close */}
            <div className="flex items-center justify-between px-6 pt-7">
              <Link
                href="/"
                onClick={() => { setMenuOpen(false); scrollToTop() }}
                className="flex items-center shrink-0"
                aria-label="Inside The House — home"
              >
                <Image
                  src={LOGO_SRC}
                  alt="Inside The House — Calgary Renovations"
                  width={160}
                  height={48}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded-full text-[#4a4840] hover:text-[#1c1a18] hover:bg-white/60 transition-colors duration-200"
              >
                <X size={26} strokeWidth={1.8} aria-hidden />
              </button>
            </div>

            {/* Links + CTA */}
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="flex-1 flex flex-col justify-center gap-2 px-8"
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-3xl text-[#1c1a18] hover:text-[#8a8a5c] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href={PHONE_TEL}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                }}
                className="flex items-center gap-3 mt-6 text-lg font-bold text-[#4a4840] hover:text-[#1c1a18] transition-colors duration-200"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <Phone size={20} strokeWidth={1.8} aria-hidden />
                {PHONE}
              </motion.a>
            </motion.nav>

            {/* Bottom CTA */}
            <div className="px-8 pb-10">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full rounded-full bg-[#8a8a5c] text-[#f5f2ee] px-6 py-4 group hover:bg-[#7a7a4e] transition-colors duration-300"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-base font-bold uppercase tracking-wide">Get a Free Quote</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                  <QuoteArrow />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
