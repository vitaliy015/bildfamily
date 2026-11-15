"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { BeforeAfter } from "./BeforeAfter"
import { TRANSFORMATIONS } from "@/lib/works"

const EASE = [0.25, 0.46, 0.45, 0.94] as const
const UPLOADS = "/uploads"

type Project = {
  src: string
  title: string
  type: string
}

// Real completed projects pulled from the client's photo library
const PROJECTS: Project[] = [
  { src: `${UPLOADS}/2025/09/IMG_3494.jpg`, title: "Freestanding Tub Suite",      type: "Bathroom Remodel" },
  { src: `${UPLOADS}/2025/09/IMG_5674.jpg`, title: "Emerald & Gold Shower",       type: "Tile & Shower"    },
  { src: `${UPLOADS}/2025/09/IMG_3481.jpg`, title: "Arched-Mirror Double Vanity", type: "Bathroom Remodel" },
  { src: `${UPLOADS}/2025/09/IMG_6731.jpg`, title: "Navy & Brass Powder Room",    type: "Bathroom Update"  },
  { src: `${UPLOADS}/2025/09/IMG_3488.jpg`, title: "Orchid & Oak Vanity",         type: "Bathroom Remodel" },
  { src: `${UPLOADS}/2025/09/IMG_5495.jpg`, title: "Brushed-Gold Vessel Sink",    type: "Vanities & Fixtures" },
  { src: `${UPLOADS}/2025/09/IMG_6733.jpg`, title: "Marble Soaker Nook",          type: "Bathroom Remodel" },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.6, ease: EASE }}
      className="group relative mb-5 break-inside-avoid overflow-hidden cursor-pointer"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
        <Image
          src={project.src}
          alt={`${project.title} — ${project.type} by Inside The House Calgary`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* ── Desktop: hover reveal ── */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <figcaption className="hidden lg:block absolute inset-x-0 bottom-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] mb-1.5" style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}>
            {project.type}
          </span>
          <span className="block text-xl font-bold leading-tight" style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}>
            {project.title}
          </span>
        </figcaption>
        <div className="hidden lg:block absolute top-0 left-0 h-10 w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" style={{ backgroundColor: "var(--brand-accent-gold)" }} />

        {/* ── Mobile: scroll reveal ── */}
        <motion.div
          className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, ease: EASE }}
        />
        <motion.figcaption
          className="lg:hidden absolute inset-x-0 bottom-0 p-5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        >
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] mb-1.5" style={{ color: "var(--brand-accent-gold)", fontFamily: "var(--font-heading)" }}>
            {project.type}
          </span>
          <span className="block text-lg font-bold leading-tight" style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}>
            {project.title}
          </span>
        </motion.figcaption>
        <motion.div
          className="lg:hidden absolute top-0 left-0 h-10 w-[3px] origin-top"
          style={{ backgroundColor: "var(--brand-accent-gold)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>
    </motion.figure>
  )
}

export function Gallery() {
  return (
    <section
      id="our-work"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "var(--brand-bg-subtle)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── General heading + lead before/after ──
            The right half of this row used to be empty. The strongest thing a
            renovation company owns is the same room photographed twice, so it
            goes here, beside the claim it proves, rather than a click away on
            /works. */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.35em] mb-5"
            style={{ color: "var(--brand-accent-olive)", fontFamily: "var(--font-heading)" }}
          >
            Our Work
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl md:text-6xl font-black uppercase leading-[0.92] mb-6"
            style={{ color: "var(--brand-text-dark)", fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            Real Bathrooms.
            <br />
            <span style={{ color: "var(--brand-accent-olive)" }}>Real Calgary Homes.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--brand-text-body)", fontFamily: "var(--font-body)" }}
          >
            Every photo below is a real bathroom we transformed — no stock images, no staged showrooms. Drag the slider to see one of them before we started.
          </motion.p>
          </div>

          <BeforeAfter {...TRANSFORMATIONS[0]} />
        </div>

        {/* ── Masonry grid ── */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.src} project={project} index={i} />
          ))}

          {/* Seven photos across three columns leaves the foot of one column
              bare. CSS columns balance by height, so a short tile drops into
              whichever column is shortest — which is the hole. It pays for the
              space by sending people to the four sliders on /works. */}
          <motion.a
            href="/works"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="group mb-5 break-inside-avoid flex flex-col justify-between gap-10 bg-[#8a8a5c] text-[#f5f2ee] p-8 hover:bg-[#7a7a4e] transition-colors duration-300"
          >
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f2ee]/70"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Before &amp; After
            </span>
            <span className="flex items-end justify-between gap-4">
              <span
                className="text-2xl font-bold uppercase leading-[1.05]"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.01em" }}
              >
                Drag to see
                <br />
                four of them
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className="shrink-0 mb-1 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M2 7h10M7.5 2.5L12 7l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.a>
        </div>

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
