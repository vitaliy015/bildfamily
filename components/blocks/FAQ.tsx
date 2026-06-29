"use client"

import { useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "motion/react"

// ── Types ──────────────────────────────────────────────────────────────────

type FAQEntry = {
  id: number
  category: string
  question: string
  answer: string
}

type Category = {
  id: string
  label: string
}

// ── Data ───────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { id: "all",        label: "All Questions"      },
  { id: "pricing",   label: "Pricing & Budget"   },
  { id: "process",   label: "Timeline & Process" },
  { id: "permits",   label: "Licenses & Permits" },
  { id: "living",    label: "During Renovation"  },
  { id: "guarantees",label: "Results & Warranty" },
]

const FAQ_DATA: FAQEntry[] = [
  // ── Pricing & Budget ───────────────────────────────────────────────────
  {
    id: 1,
    category: "pricing",
    question: "How much does a bathroom or kitchen renovation cost in Calgary?",
    answer:
      "Our projects typically range from $10,000 to $40,000 depending on scope and materials. A bathroom refresh — new tile, vanity, lighting — usually runs $8,000–$20,000. A kitchen cabinet and countertop update is $5,000–$15,000. Full interior refresh projects fall between $20,000–$40,000. Every project starts with a free, no-obligation estimate — you'll have the exact number before we lift a single tool.",
  },
  {
    id: 2,
    category: "pricing",
    question: "Do you offer a fixed price, or can the quote change after we sign?",
    answer:
      "We offer a fixed-price contract. The number we put in writing is the number you pay — no line items that appear after the fact, no surprise charges at handover. If you book within 7 days of your estimate, we lock that price regardless of material fluctuations.",
  },
  {
    id: 3,
    category: "pricing",
    question: "What happens if hidden problems are discovered during demolition?",
    answer:
      "Before any work starts, we do a thorough pre-renovation inspection to catch as much as possible. We always recommend setting aside a 10–15% contingency. If something unexpected surfaces — old plumbing, water damage, outdated wiring — we stop work immediately, show you exactly what we found, explain your options clearly, and get your sign-off before proceeding. You're never surprised by extra costs.",
  },
  {
    id: 4,
    category: "pricing",
    question: "How is payment structured?",
    answer:
      "We use milestone-based payments tied to project progress: a deposit to secure your start date, a mid-project payment when major structural work is complete, and a final payment only after you've walked through and approved the finished result. We never ask for the full amount upfront.",
  },

  // ── Timeline & Process ────────────────────────────────────────────────
  {
    id: 5,
    category: "process",
    question: "How long will my project take?",
    answer:
      "A bathroom refresh typically takes 5–10 working days. A kitchen update runs 3–7 days. Full interior renovation projects covering multiple rooms take 3–5 weeks. We provide a written timeline before work begins and commit to it — if we run over through any fault of ours, we cover the extra days at our cost.",
  },
  {
    id: 6,
    category: "process",
    question: "What does the process look like from first call to finished project?",
    answer:
      "Step 1: Free on-site consultation — we come to you, measure everything, and discuss your vision. Step 2: Written quote with a fixed price and timeline, delivered within 48 hours. Step 3: Materials selection — we guide you through choices that match your style and budget. Step 4: Work begins on your agreed start date. Step 5: Daily end-of-day cleanup and direct progress updates from Anatolii. Step 6: Final walkthrough — we address anything that doesn't meet your expectations before the final payment.",
  },
  {
    id: 7,
    category: "process",
    question: "Do you work evenings and weekends?",
    answer:
      "Yes — and this is one of the things our clients appreciate most. We can schedule work around your life, not the other way around. Many of our bathroom projects are completed over a single weekend, so your family barely notices the disruption. Because we're family-owned, we have the flexibility that large renovation companies simply don't.",
  },

  // ── Licenses & Permits ────────────────────────────────────────────────
  {
    id: 8,
    category: "permits",
    question: "Are you licensed and insured in Alberta?",
    answer:
      "Yes. We carry full general liability insurance and operate under a valid Alberta contractor's licence. You can request our certificate of insurance at any time — we send it same-day. Because Anatolii and Nataliia personally stand behind every project, maintaining proper coverage is non-negotiable for us.",
  },
  {
    id: 9,
    category: "permits",
    question: "Who handles building permits — us or you?",
    answer:
      "We handle the entire permit process on your behalf. Permits are required whenever the scope includes plumbing changes, electrical work, structural modifications, or basement development. We know Calgary's building code inside-out and manage all paperwork, inspections, and sign-offs so you don't have to think about it.",
  },

  // ── Living During Renovation ──────────────────────────────────────────
  {
    id: 10,
    category: "living",
    question: "Can we stay in our home during the renovation?",
    answer:
      "In most cases, yes. For bathroom and kitchen updates, we isolate the work zone so the rest of your home stays fully livable. For larger multi-room projects, we'll be honest with you upfront about whether staying is practical — and help you plan around it. We work efficiently so the disruption window is as short as possible.",
  },
  {
    id: 11,
    category: "living",
    question: "How do you keep the job site clean?",
    answer:
      "Cleanliness is something we're genuinely known for — read our reviews. Every evening before we leave, we sweep, bag all debris, and fully contain dust to the work zone. We use protective coverings on floors and furniture in adjacent rooms. Anatolii was raised to believe a clean site is a sign of respect for the homeowner — we treat your home exactly the way we'd treat our own.",
  },
  {
    id: 12,
    category: "living",
    question: "Who exactly will be working in my home?",
    answer:
      "Anatolii personally leads or is on-site for every project. For larger jobs, we bring in a small, trusted crew we've worked alongside for years — not random subcontractors found online. You'll meet everyone before work begins. Because we're family-owned and intentionally limit our volume, we only take on projects we can personally oversee.",
  },

  // ── Results & Warranty ────────────────────────────────────────────────
  {
    id: 13,
    category: "guarantees",
    question: "Do you offer a warranty on your work?",
    answer:
      "All our workmanship is warranted for 2 years. If something we built or installed has a defect within that period, we come back and fix it at no charge. We also pass through all applicable manufacturer warranties on materials and fixtures. The goal is simple: if you're not genuinely happy with the result, we're not finished.",
  },
  {
    id: 14,
    category: "guarantees",
    question: "Will a renovation increase the value of my home?",
    answer:
      "Bathroom and kitchen renovations consistently rank as the top ROI improvements in Canadian real estate — typically returning 70–80% of the renovation cost in added home value, and often much more in Calgary's market. A $15,000 bathroom refresh can add $35,000–$50,000 to your listing price. During your free consultation, we'll walk you through which specific updates give you the best return for your situation.",
  },
]

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

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
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
        )}
      </AnimatePresence>
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
    <section className="relative py-24 md:py-32" style={{ backgroundColor: "var(--brand-bg-dark)" }}>

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
            href="#contact"
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
