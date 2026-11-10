import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Footer } from "@/components/blocks/Footer"
import { HouseMap } from "@/components/blocks/HouseMap"
import { ServiceEnquiry } from "@/components/blocks/ServiceEnquiry"

// Deliberately not written for "painting Calgary" and the like. This page
// exists for people who are already talking to us about a bathroom; chasing
// general-contractor keywords here is what would blur the specialist
// positioning the rest of the site is built on.
const title = "Painting, Flooring, Drywall & Kitchens | Inside The House"
const description =
  "Painting, flooring, drywall and kitchens in Calgary. Add them to your bathroom renovation, or book them on their own. Free quote, same-day reply."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/additional-services" },
  openGraph: { title, description, url: "/additional-services" },
  twitter: { title, description },
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-[#8a8a5c]" />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6a6460]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {children}
      </span>
    </div>
  )
}

export default function AdditionalServicesPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#f5f2ee]">
        {/* ── Opening ─────────────────────────────────────────────────── */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <h1
              className="text-[12vw] font-black uppercase leading-[0.92] text-[#1c1a18] min-[430px]:text-[58px] md:text-[76px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Additional
              <br />
              <span className="text-[#8a8a5c]">services</span>
            </h1>

            <p
              className="mt-7 max-w-xl text-lg leading-relaxed text-[#4a4840] md:text-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Painting, flooring, drywall, kitchens. Add them to your bathroom
              renovation &mdash; or book them on their own.
            </p>
          </div>
        </section>

        {/* ── The walk through the house ──────────────────────────────── */}
        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <HouseMap />
          </div>
        </section>

        {/* ── Two ways to book ────────────────────────────────────────── */}
        <section className="border-t border-[#c4c0b8]/60 bg-[#faf9f5] py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <Eyebrow>Two ways to book</Eyebrow>

            <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <h2
                  className="mb-3 text-2xl font-black uppercase leading-tight text-[#1c1a18] md:text-3xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  With your bathroom
                </h2>
                <p
                  className="text-lg leading-relaxed text-[#4a4840]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  One crew, one set of dates, one quote. Cheaper, because we are
                  already there.
                </p>
              </div>

              <div>
                <h2
                  className="mb-3 text-2xl font-black uppercase leading-tight text-[#1c1a18] md:text-3xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  On its own
                </h2>
                <p
                  className="text-lg leading-relaxed text-[#4a4840]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  We come, we price it, we do it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ServiceEnquiry />
      </main>
      <Footer />
    </>
  )
}
