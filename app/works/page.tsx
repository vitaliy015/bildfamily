import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Footer } from "@/components/blocks/Footer"
import { WorksHero } from "@/components/blocks/WorksHero"
import { BeforeAfter } from "@/components/blocks/BeforeAfter"
import { TRANSFORMATIONS } from "@/lib/works"
import { VideoFeature } from "@/components/blocks/VideoFeature"
import { WorkGallery } from "@/components/blocks/WorkGallery"
import { HowWeWork } from "@/components/blocks/HowWeWork"

const title = "Bathroom Renovations & Our Work | Inside The House — Calgary"
const description =
  "Before & after sliders, photo gallery and video walkthroughs of real bathroom renovations in Calgary by Inside The House — a family-owned company."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/works" },
  openGraph: { title, description, url: "/works" },
  twitter: { title, description },
}

export default function WorksPage() {
  return (
    <>
      <Nav />
      <main>
        <WorksHero />

        {/* ── Before / After ── */}
        <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#efece7]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12 md:mb-16">
              <p
                className="text-xs font-bold uppercase tracking-[0.35em] mb-5 text-[#8a8a5c]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Bathrooms · Before &amp; After
              </p>
              <h2
                className="text-[38px] md:text-5xl font-black uppercase leading-[0.95] mb-5 text-[#1c1a18]"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                Drag to reveal the transformation
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-[#4a4840]" style={{ fontFamily: "var(--font-body)" }}>
                Bathrooms are what we do best — from dated ensuites to spa-like retreats.
                Same room, same angle: before we started and the day we handed it back.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
              {TRANSFORMATIONS.map((t) => (
                <BeforeAfter key={t.slug} {...t} />
              ))}
            </div>
          </div>
        </section>

        <VideoFeature />
        <WorkGallery />
        <HowWeWork />

        {/* ── CTA ── */}
        <section className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-[#efece7]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p
              className="text-2xl md:text-3xl font-bold max-w-md text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.01em" }}
            >
              Your home could be next.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-widest bg-[#8a8a5c] text-[#f5f2ee] hover:bg-[#7a7a4e] transition-colors duration-200"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Start Your Project
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
