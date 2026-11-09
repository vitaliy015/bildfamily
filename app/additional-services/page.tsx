import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Footer } from "@/components/blocks/Footer"
import { HouseMap } from "@/components/blocks/HouseMap"
import { ServiceEnquiry } from "@/components/blocks/ServiceEnquiry"
import { business } from "@/lib/site"

// Deliberately not written for "painting Calgary" and the like. This page
// exists for people who are already talking to us about a bathroom; chasing
// general-contractor keywords here is what would blur the specialist
// positioning the rest of the site is built on.
const title = "While We're Already in Your Home | Inside The House"
const description =
  "Painting, flooring, drywall and kitchens — handled by the same crew during your bathroom renovation, so you are not booking a second contractor for a second mess."

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
        <section className="pt-32 pb-14 md:pt-40 md:pb-16">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <Eyebrow>
              For our bathroom clients &middot; {business.city}, {business.region}
            </Eyebrow>

            <h1
              className="mt-6 text-[11vw] font-black uppercase leading-[0.94] text-[#1c1a18] min-[430px]:text-[52px] md:text-[68px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              While we&rsquo;re
              <br />
              already in
              <br />
              <span className="text-[#8a8a5c]">your home</span>
            </h1>

            <div className="mt-8 max-w-2xl space-y-5">
              <p
                className="text-lg leading-relaxed text-[#4a4840]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Bathrooms are what we do, and that is not changing. But by the time
                your bathroom is underway, the crew, the tools and the dust sheets
                are already inside your house &mdash; and the hallway you walk past
                every day is still the hallway you walk past every day.
              </p>
              <p
                className="leading-relaxed text-[#6a6460]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                So this page is the rest of the walk. One crew, one set of dates, one
                clean-up at the end &mdash; instead of booking a second contractor and
                living through the whole thing twice.
              </p>
            </div>
          </div>
        </section>

        {/* ── The walk through the house ──────────────────────────────── */}
        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <HouseMap />
          </div>
        </section>

        {/* ── The honest part ─────────────────────────────────────────── */}
        <section className="border-t border-[#c4c0b8]/60 bg-[#faf9f5] py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <Eyebrow>Two things worth saying plainly</Eyebrow>

            <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <h2
                  className="mb-3 text-2xl font-black uppercase leading-tight text-[#1c1a18] md:text-3xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  We are still a bathroom company
                </h2>
                <p
                  className="leading-relaxed text-[#4a4840]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  This is add-on work, done alongside a bathroom renovation. We are
                  not pitching to gut your whole house, and we will say so if what
                  you are describing is really a job for a general contractor.
                </p>
              </div>

              <div>
                <h2
                  className="mb-3 text-2xl font-black uppercase leading-tight text-[#1c1a18] md:text-3xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Ask at the quote, not after
                </h2>
                <p
                  className="leading-relaxed text-[#4a4840]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Extra work is cheapest and least disruptive when it is planned into
                  the schedule from the start. Mention it during the walkthrough and
                  it goes on the same written quote, with the same dates.
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
