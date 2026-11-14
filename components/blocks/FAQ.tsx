"use client"

import { useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { CATEGORIES, FAQ_DATA, type FAQEntry } from "@/lib/faq"

// ── Sub-components ─────────────────────────────────────────────────────────

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQEntry
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.055, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-t border-white/10"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        className="w-full flex items-start gap-5 py-7 text-left cursor-pointer"
      >
        {/* Decorative number */}
        <motion.span
          animate={{ opacity: isOpen ? 0.18 : 0.07, scale: isOpen ? 1.08 : 1 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-hidden
          className="hidden sm:block shrink-0 text-5xl font-bold leading-none select-none"
          style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
        >
          {String(item.id).padStart(2, "0")}
        </motion.span>

        {/* Question */}
        <span
          className="flex-1 text-[17px] font-semibold leading-snug transition-colors duration-200"
          style={{
            color: isOpen ? "var(--brand-accent-gold)" : "var(--brand-text-light)",
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.01em",
          }}
        >
          {item.question}
        </span>

        {/* + → × indicator */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-hidden
          className="shrink-0 mt-0.5 text-2xl leading-none select-none"
          style={{ color: "var(--brand-accent-gold)" }}
        >
          +
        </motion.span>
      </button>

      {/* The answer stays mounted and is collapsed by height, never by
          `{isOpen && ...}`. Google indexes text that sits in the DOM behind CSS,
          but it does not click an accordion open — so a conditionally rendered
          answer is an answer the crawler never reads. Before this, thirteen of
          the fourteen answers were simply absent from the served HTML. */}
      <motion.div
        id={`faq-answer-${item.id}`}
        aria-hidden={!isOpen}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{
          height:  { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] },
          opacity: { duration: 0.28, ease: "easeOut" },
        }}
        className="overflow-hidden"
      >
        <p
          className="pb-7 text-base leading-relaxed sm:pl-[68px]"
          style={{ color: "var(--brand-text-muted-dark)" }}
        >
          {item.answer}
        </p>
      </motion.div>
    </motion.div>
  )
}

function FAQTabs({
  active,
  onChange,
}: {
  active: string
  onChange: (id: string) => void
}) {
  return (
    <LayoutGroup>
      <div className="flex flex-wrap gap-2" role="tablist">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={active === cat.id}
            onClick={() => onChange(cat.id)}
            className="relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "0.05em",
              color: active === cat.id ? "var(--brand-bg-dark)" : "var(--brand-text-muted-dark)",
            }}
          >
            {active === cat.id && (
              <motion.span
                layoutId="faq-tab-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "var(--brand-accent-gold)" }}
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  )
}

// ── Main export ────────────────────────────────────────────────────────────

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [openItem, setOpenItem] = useState<number | null>(1)

  const filtered =
    activeCategory === "all"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === activeCategory)

  function handleToggle(id: number) {
    setOpenItem((prev) => (prev === id ? null : id))
  }

  function handleCategoryChange(id: string) {
    setActiveCategory(id)
    setOpenItem(null)
  }

  return (
    <section id="faq" aria-label="Frequently asked questions" className="relative scroll-mt-28 py-24 md:py-32" style={{ backgroundColor: "var(--brand-bg-dark)" }}>

      {/* Noise texture — matches Hero */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "120px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">

        {/* ── Section header ── */}
        <div className="mb-14 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}
          >
            Got Questions?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold uppercase leading-tight mb-6"
            style={{ color: "var(--brand-text-light)", fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
          >
            Everything You Need to Know<br className="hidden md:block" /> Before You Call
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base leading-relaxed max-w-lg"
            style={{ color: "var(--brand-text-muted-dark)" }}
          >
            Straight answers from the people actually doing the work. Anatolii and Nataliia personally stand behind every word on this page.
          </motion.p>
        </div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mb-10"
        >
          <FAQTabs active={activeCategory} onChange={handleCategoryChange} />
        </motion.div>

        {/* ── Accordion list ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {filtered.map((item, index) => (
              <FAQItem
                key={item.id}
                item={item}
                index={index}
                isOpen={openItem === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
            <div className="border-t border-white/10" />
          </motion.div>
        </AnimatePresence>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-10 border-t border-white/10"
        >
          <div className="flex-1">
            <p
              className="text-lg font-semibold mb-1"
              style={{ color: "var(--brand-text-light)", fontFamily: "var(--font-heading)", letterSpacing: "0.01em" }}
            >
              Still have a question?
            </p>
            <p className="text-sm" style={{ color: "var(--brand-text-muted-dark)" }}>
              Talk to Anatolii directly — no sales team, no waiting, no runaround.
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest rounded transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: "var(--brand-accent-gold)", color: "var(--brand-bg-dark)", fontFamily: "var(--font-heading)" }}
          >
            Get a Free Quote
          </a>
        </motion.div>

      </div>
    </section>
  )
}
