import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Footer } from "@/components/blocks/Footer"
import { WorksHero } from "@/components/blocks/WorksHero"
import { BeforeAfter } from "@/components/blocks/BeforeAfter"
import { WorkVideos } from "@/components/blocks/WorkVideos"
import { WorkGallery } from "@/components/blocks/WorkGallery"
import { HowWeWork } from "@/components/blocks/HowWeWork"

const title = "Bathroom Renovations & Our Work | Inside The House — Calgary"
const description =
  "Before & after sliders, a bathroom gallery, and video walkthroughs of real ensuite, basement bath and shower renovations by Inside The House — a family-owned renovation company in Calgary, AB."

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
        <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#eae6df]">
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
              <BeforeAfter
                beforeSrc="/work/ensuite-before.jpg"
                afterSrc="/work/ensuite-after.jpg"
                beforeAlt="Dated master ensuite with green walls and corner tub before renovation, Calgary"
                afterAlt="Renovated master ensuite with navy vanity, freestanding tub and marble tile, Calgary"
                title="Master Ensuite"
                type="Bathroom Remodel"
                description="A dated corner-tub ensuite reworked into a bright spa bath — navy vanity, freestanding soaker, and full marble tile."
              />
              <BeforeAfter
                beforeSrc="/work/basement-before.jpg"
                afterSrc="/work/basement-after.jpg"
                beforeAlt="Dark basement bathroom with brown walls and dated tile before renovation, Calgary"
                afterAlt="Bright basement bathroom with white walls, black glass shower and vinyl plank floor, Calgary"
                title="Basement Bathroom"
                type="Basement Finishing"
                description="A dim, brown basement bath opened up with white walls, a frameless black shower and warm vinyl plank."
              />
              <BeforeAfter
                beforeSrc="/work/steam-before.jpg"
                afterSrc="/work/steam-after.jpg"
                beforeAlt="Dated beige tiled corner shower with bench before renovation, Calgary"
                afterAlt="Modern stone steam shower with brushed-gold fixtures and hexagon floor, Calgary"
                title="Steam Shower Suite"
                type="Tile & Shower"
                description="The same corner-bench footprint rebuilt as a stone steam room — seamless slabs, brushed gold, and a heated bench."
              />
              <BeforeAfter
                beforeSrc="/work/tub-before.jpg"
                afterSrc="/work/tub-after.jpg"
                beforeAlt="Dated bathroom with beige tile-surround tub and busy border before renovation, Calgary"
                afterAlt="Refreshed bathroom with clean tile surround, brushed-gold fixtures and dark vanity, Calgary"
                title="Guest Bath Refresh"
                type="Bathroom Update"
                description="Busy tile and dated fittings swapped for calm large-format tile, warm brushed-gold taps and a dark vanity."
              />
            </div>

            {/* Beyond bathrooms — one exterior example */}
            <div className="mt-14 md:mt-16">
              <p
                className="text-xs font-bold uppercase tracking-[0.35em] mb-8 text-[#8a8a5c]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Beyond the bathroom
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
                <BeforeAfter
                  beforeSrc="/work/deck-before.jpg"
                  afterSrc="/work/deck-after.jpg"
                  beforeAlt="Weathered grey backyard deck covered in leaves before restoration, Calgary"
                  afterAlt="Backyard cedar deck freshly sanded and re-stained a warm tone, Calgary"
                  title="Cedar Deck Restoration"
                  type="Exterior Refresh"
                  description="Years of grey weathering sanded away and sealed with a warm stain — the same boards, brought back to life."
                />
              </div>
            </div>
          </div>
        </section>

        <WorkVideos />
        <WorkGallery />
        <HowWeWork />

        {/* ── CTA ── */}
        <section className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-[#eae6df]">
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
