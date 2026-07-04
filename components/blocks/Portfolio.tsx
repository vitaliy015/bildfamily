"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"

const EASE = [0.25, 0.46, 0.45, 0.94] as const
const UPLOADS = "/uploads/2025/09"

type Category = "Bathroom" | "Kitchen" | "Flooring" | "Fixtures"

type Project = {
  src: string
  title: string
  type: string
  category: Category
}

// Real completed projects from the client's photo library, sorted by area.
const PROJECTS: Project[] = [
  // ── Bathrooms ──
  { src: `${UPLOADS}/IMG_3480.jpg`, title: "Freestanding Tub Suite",      type: "Bathroom Remodel", category: "Bathroom" },
  { src: `${UPLOADS}/IMG_3483.jpg`, title: "Fireside Soaker Tub",         type: "Bathroom Remodel", category: "Bathroom" },
  { src: `${UPLOADS}/IMG_3481.jpg`, title: "Arched-Mirror Double Vanity", type: "Bathroom Remodel", category: "Bathroom" },
  { src: `${UPLOADS}/IMG_3488.jpg`, title: "Orchid & Oak Vanity",         type: "Bathroom Remodel", category: "Bathroom" },
  { src: `${UPLOADS}/IMG_3491.jpg`, title: "Marble Water Closet",         type: "Bathroom Remodel", category: "Bathroom" },
  { src: `${UPLOADS}/IMG_4359.jpg`, title: "Frameless Glass Shower",      type: "Tile & Shower",    category: "Bathroom" },
  { src: `${UPLOADS}/IMG_5674.jpg`, title: "Emerald & Gold Shower",       type: "Tile & Shower",    category: "Bathroom" },
  { src: `${UPLOADS}/IMG_3484.jpg`, title: "Marble Shower Niche",         type: "Tile & Shower",    category: "Bathroom" },
  { src: `${UPLOADS}/IMG_6731.jpg`, title: "Navy & Brass Powder Room",    type: "Bathroom Update",  category: "Bathroom" },
  { src: `${UPLOADS}/IMG_6733.jpg`, title: "Marble Soaker Nook",          type: "Bathroom Remodel", category: "Bathroom" },
  { src: `${UPLOADS}/IMG_6752.jpg`, title: "Black Vanity & Cage Lights",  type: "Bathroom Update",  category: "Bathroom" },
  { src: `${UPLOADS}/IMG_5678.jpg`, title: "Vessel-Sink Vanity",          type: "Bathroom Remodel", category: "Bathroom" },
  // ── Kitchens ──
  { src: `${UPLOADS}/IMG_3516.jpg`, title: "Warm Oak Kitchen Island",     type: "Kitchen Renovation", category: "Kitchen" },
  { src: `${UPLOADS}/IMG_3510.jpg`, title: "Subway-Tile Backsplash",      type: "Kitchen Update",     category: "Kitchen" },
  { src: `${UPLOADS}/IMG_3513.jpg`, title: "Wet Bar & Quartz Counter",    type: "Kitchen Update",     category: "Kitchen" },
  // ── Flooring ──
  { src: `${UPLOADS}/IMG_5605.jpg`, title: "White Oak Staircase",         type: "Flooring", category: "Flooring" },
  { src: `${UPLOADS}/IMG_6740.jpg`, title: "Oak Stairs & Vinyl Floor",    type: "Flooring", category: "Flooring" },
  { src: `${UPLOADS}/IMG_6745.jpg`, title: "Luxury Vinyl Plank",          type: "Flooring", category: "Flooring" },
  // ── Fixtures & Finishing ──
  { src: `${UPLOADS}/IMG_5495.jpg`, title: "Brushed-Gold Vessel Sink",    type: "Fixtures & Finishing", category: "Fixtures" },
  { src: `${UPLOADS}/IMG_6727.jpg`, title: "Waterfall Tub Filler",        type: "Fixtures & Finishing", category: "Fixtures" },
  { src: `${UPLOADS}/IMG_4363.jpg`, title: "Matte-Black Faucet",          type: "Fixtures & Finishing", category: "Fixtures" },
  { src: `${UPLOADS}/IMG_6749.jpg`, title: "Brushed-Gold Details",        type: "Fixtures & Finishing", category: "Fixtures" },
  { src: `${UPLOADS}/IMG_3485.jpg`, title: "Matte-Black Tub Filler",      type: "Fixtures & Finishing", category: "Fixtures" },
]

const FILTERS = ["All", "Bathroom", "Kitchen", "Flooring", "Fixtures"] as const
type Filter = (typeof FILTERS)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 3) * 0.06, duration: 0.5, ease: EASE }}
      className="group relative mb-5 break-inside-avoid overflow-hidden cursor-pointer"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
        <Image
          src={project.src}
          alt={`${project.title} — ${project.type} by Inside The House Calgary`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient + caption reveal */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <figcaption className="absolute inset-x-0 bottom-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] mb-1.5" style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}>
            {project.type}
          </span>
          <span className="block text-xl font-bold leading-tight text-white" style={{ fontFamily: "var(--font-heading)" }}>
            {project.title}
          </span>
        </figcaption>
        <div className="absolute top-0 left-0 h-10 w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" style={{ backgroundColor: "var(--brand-accent-gold)" }} />
      </div>
    </motion.figure>
  )
}

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All")

  const visible = filter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter)

  return (
    <section
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "var(--brand-bg-subtle)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.35em] mb-5"
            style={{ color: "var(--brand-accent-olive)", fontFamily: "var(--font-heading)" }}
          >
            Our Work · Calgary, AB
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[44px] md:text-6xl font-black uppercase leading-[0.92] mb-6"
            style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            Real Projects.
            <br />
            <span style={{ color: "var(--brand-accent-olive)" }}>Real Calgary Homes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--brand-text-body)", fontFamily: "var(--font-body)" }}
          >
            Every photo is a real home we transformed — no stock images, no staged showrooms.
            Browse by type or explore the full collection.
          </motion.p>
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-wrap gap-3 mb-12">
          {FILTERS.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] border rounded-full transition-colors duration-300 ${
                  active
                    ? "bg-[#8a8a5c] text-[#f5f2ee] border-[#8a8a5c]"
                    : "text-[#6a6460] border-[#c4c0b8] hover:border-[#8a8a5c] hover:text-[#8a8a5c]"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* ── Masonry grid ── */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.src} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t"
          style={{ borderColor: "var(--brand-border-light)" }}
        >
          <p
            className="text-xl md:text-2xl font-bold max-w-md"
            style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-heading)", letterSpacing: "0.01em" }}
          >
            Your home could be next.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-widest transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: "var(--brand-accent-olive)", color: "var(--brand-text-on-accent)", fontFamily: "var(--font-heading)" }}
          >
            Start Your Project
          </a>
        </motion.div>

      </div>
    </section>
  )
}
