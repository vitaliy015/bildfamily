import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Nav } from "@/components/blocks/Nav"
import { Footer } from "@/components/blocks/Footer"
import { services, getService } from "@/lib/services"
import { siteUrl, business } from "@/lib/site"

// Every service is known at build time, so each URL is prerendered as static HTML.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  const url = `/services/${service.slug}`
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: service.metaTitle, description: service.metaDescription, url },
    twitter: { title: service.metaTitle, description: service.metaDescription },
  }
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

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 shrink-0">
    <path d="M3 8.5L6.5 12L13 4.5" stroke="#8a8a5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 h-px bg-[#8a8a5c]" />
      <span
        className="text-[#6a6460] text-[11px] font-bold uppercase tracking-[0.25em]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {children}
      </span>
    </div>
  )
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const others = services.filter((s) => s.slug !== service.slug)
  const pageUrl = `${siteUrl}/services/${service.slug}`

  // Service + FAQ + breadcrumbs. The FAQ block is what can earn an expanded
  // result in Google, so the questions here must match the visible ones exactly.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.metaDescription,
        url: pageUrl,
        provider: { "@type": "GeneralContractor", name: business.name, "@id": `${siteUrl}#business` },
        areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
        offers: {
          "@type": "Offer",
          priceCurrency: "CAD",
          description: `${service.name} — ${service.priceRange}`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
          { "@type": "ListItem", position: 3, name: service.name, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="bg-[#eae6df]">

        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-6">
            <nav aria-label="Breadcrumb">
              <ol
                className="flex flex-wrap items-center gap-2 text-xs text-[#6a6460]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <li><Link href="/" className="hover:text-[#1c1a18] transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/services" className="hover:text-[#1c1a18] transition-colors">Services</Link></li>
                <li aria-hidden>/</li>
                <li className="text-[#1c1a18]" aria-current="page">{service.name}</li>
              </ol>
            </nav>

            <Eyebrow>Calgary, Alberta &amp; surrounding areas</Eyebrow>

            <h1
              className="text-[11vw] min-[430px]:text-[52px] md:text-[68px] font-black uppercase leading-[0.94] text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {service.h1}
            </h1>

            <p
              className="text-base md:text-lg text-[#4a4840] leading-relaxed max-w-3xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {service.intro}
            </p>

            <dl className="flex flex-wrap gap-x-12 gap-y-4 mt-2">
              <div className="flex flex-col gap-1">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[#6a6460]" style={{ fontFamily: "var(--font-heading)" }}>
                  Typical cost
                </dt>
                <dd className="text-2xl font-black text-[#1c1a18]" style={{ fontFamily: "var(--font-heading)" }}>
                  {service.priceRange}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[#6a6460]" style={{ fontFamily: "var(--font-heading)" }}>
                  Timeline
                </dt>
                <dd className="text-2xl font-black text-[#1c1a18]" style={{ fontFamily: "var(--font-heading)" }}>
                  {service.timeline}
                </dd>
              </div>
            </dl>

            <div className="flex flex-row items-center gap-4 sm:gap-6 mt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#8a8a5c] text-[#f5f2ee] px-4 sm:px-8 py-3.5 sm:py-4 whitespace-nowrap shadow-[0_2px_0_rgba(28,26,24,0)] transition duration-300 ease-out hover:bg-[#7a7a4e] hover:shadow-[0_8px_18px_rgba(28,26,24,0.18)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-[15px] sm:text-[18px] font-medium tracking-[0.01em]">Get a free quote</span>
                <Arrow />
              </Link>
              <Link
                href="/bathroom-renovation-cost-calgary"
                className="inline-flex items-center justify-center rounded-full bg-[#1c1a18] text-[#f5f2ee] px-4 sm:px-8 py-3.5 sm:py-4 whitespace-nowrap shadow-[0_2px_0_rgba(28,26,24,0)] transition duration-300 ease-out hover:bg-[#2a2720] hover:shadow-[0_8px_18px_rgba(28,26,24,0.26)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-[15px] sm:text-[18px] font-medium tracking-[0.01em]">See full pricing</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16 md:pb-20">
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
            <Image
              src={service.hero.src}
              alt={service.hero.alt}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* What's included */}
        <section className="bg-[#faf9f5] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <Eyebrow>What the price covers</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Included as standard
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check />
                  <span className="text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <Eyebrow>How it runs</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Start to finish
            </h2>
            <ol className="flex flex-col gap-8">
              {service.steps.map((step, i) => (
                <li key={step.title} className="flex gap-5 md:gap-8">
                  <span
                    className="text-3xl md:text-4xl font-black text-[#8a8a5c]/40 leading-none shrink-0 w-12"
                    style={{ fontFamily: "var(--font-heading)" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-lg md:text-xl font-bold uppercase tracking-wide text-[#1c1a18]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Gallery */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <Eyebrow>Recent work</Eyebrow>
            <div className="grid sm:grid-cols-3 gap-4">
              {service.gallery.map((photo) => (
                <div key={photo.src} className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 300px, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <Link
              href="/works"
              className="group inline-flex items-center gap-2 text-[#4a4840] hover:text-[#1c1a18] transition-colors w-fit"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-[15px] font-medium border-b border-[#b8b8b0] group-hover:border-[#8a8a5c] pb-0.5 transition-colors">
                See all our bathroom work
              </span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#faf9f5] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <Eyebrow>Questions we get asked</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {service.name} FAQ
            </h2>
            <div className="flex flex-col divide-y divide-[#c4c0b8] max-w-3xl">
              {service.faqs.map((faq) => (
                <div key={faq.question} className="py-6 flex flex-col gap-3">
                  <h3
                    className="text-lg font-bold text-[#1c1a18]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {faq.question}
                  </h3>
                  <p className="text-[#4a4840] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-8">
            <Eyebrow>Also by us</Eyebrow>
            <div className="grid sm:grid-cols-2 gap-4">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex flex-col gap-2 rounded-xl border border-[#c4c0b8] bg-[#faf9f5] p-6 transition duration-300 hover:border-[#8a8a5c] motion-safe:hover:-translate-y-0.5"
                >
                  <h3
                    className="text-xl font-bold uppercase tracking-wide text-[#1c1a18]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {other.name}
                  </h3>
                  <p className="text-sm text-[#6a6460]" style={{ fontFamily: "var(--font-heading)" }}>
                    {other.priceRange}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-[#1c1a17] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-start gap-6 [&>p]:max-w-2xl">
            <h2
              className="text-3xl md:text-5xl font-black uppercase leading-tight text-[#f0ede8]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Free quote, no obligation
            </h2>
            <p className="text-[#9a9a8a] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Tell us about the room and we will come and look at it. You get one written
              number, a start date and a finish date — and if we are not the right fit, we
              will say so.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#c4a962] text-[#1c1a17] px-6 sm:px-8 py-3.5 sm:py-4 whitespace-nowrap transition duration-300 ease-out hover:bg-[#d4ba74] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-[15px] sm:text-[18px] font-bold tracking-[0.01em]">Get a free quote</span>
              <Arrow />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
