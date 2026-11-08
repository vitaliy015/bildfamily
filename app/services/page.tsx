import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Nav } from "@/components/blocks/Nav"
import { Footer } from "@/components/blocks/Footer"
import { services } from "@/lib/services"
import { siteUrl, business } from "@/lib/site"

const title = "Bathroom Renovation Services in Calgary | Inside The House"
const description =
  "Full bathroom remodels, ensuite renovations and custom tile showers in Calgary, AB. Transparent price bands from $8,000. Family-owned. Free quote."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
  twitter: { title, description },
}

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden
    className="transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ServicesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bathroom renovation services in Calgary",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${siteUrl}/services/${s.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="bg-[#eae6df]">
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#8a8a5c]" />
              <span
                className="text-[#6a6460] text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Bathrooms only &middot; {business.city}, {business.region}
              </span>
            </div>

            <h1
              className="text-[11vw] min-[430px]:text-[52px] md:text-[68px] font-black uppercase leading-[0.94] text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What We Build
            </h1>

            <p
              className="text-base md:text-lg text-[#4a4840] leading-relaxed max-w-3xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We renovate bathrooms and nothing else. Every project below is work Anatolii
              does on site himself, with a written price before anyone picks up a hammer.
              Pick the one closest to your room — each page has real costs, timelines and
              what is actually included.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto px-6 md:px-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-xl overflow-hidden border border-[#c4c0b8] bg-[#faf9f5] transition duration-300 hover:border-[#8a8a5c] hover:shadow-[0_10px_28px_rgba(28,26,24,0.10)] motion-safe:hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.hero.src}
                    alt={s.hero.alt}
                    fill
                    sizes="(min-width: 768px) 320px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <h2
                    className="text-xl font-bold uppercase tracking-wide text-[#1c1a18] leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.name}
                  </h2>
                  <p
                    className="text-sm text-[#4a4840] leading-relaxed flex-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {s.metaDescription}
                  </p>
                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-[#c4c0b8]">
                    <span
                      className="text-base font-black text-[#1c1a18] pt-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {s.priceRange}
                    </span>
                    <span className="text-[#8a8a5c] pt-3" aria-hidden>
                      <Arrow />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#faf9f5] py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-start gap-5 [&>p]:max-w-3xl">
            <h2
              className="text-2xl md:text-3xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Not sure which one you need?
            </h2>
            <p className="text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Most people are not, and that is fine. The cost page walks through what
              changes the price of a bathroom in Calgary — size, tile, whether plumbing has
              to move — so you can work out roughly where your room lands before you call us.
            </p>
            <Link
              href="/bathroom-renovation-cost-calgary"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#1c1a18] text-[#f5f2ee] px-6 sm:px-8 py-3.5 sm:py-4 whitespace-nowrap transition duration-300 ease-out hover:bg-[#2a2720] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-[15px] sm:text-[18px] font-medium tracking-[0.01em]">
                Bathroom renovation costs explained
              </span>
              <Arrow />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
