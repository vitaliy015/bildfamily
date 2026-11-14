import { Nav } from "@/components/blocks/Nav"
import { Hero } from "@/components/blocks/Hero"
import { Marquee } from "@/components/blocks/Marquee"
import { Services } from "@/components/blocks/Services"
import { Pricing } from "@/components/blocks/Pricing"
import { About } from "@/components/blocks/About"
import { Gallery } from "@/components/blocks/Gallery"
import { ExtraWork } from "@/components/blocks/ExtraWork"
import { FAQ } from "@/components/blocks/FAQ"
import { Footer } from "@/components/blocks/Footer"
import { FAQ_DATA } from "@/lib/faq"
import { costFaqs, services } from "@/lib/services"
import { siteUrl } from "@/lib/site"

export default function Home() {
  // The block at the bottom of this page answers fourteen questions, so the
  // page declares them. One of them — the cost question — is also answered on
  // /services, which is the page meant to rank for it; emitting the same
  // question from two URLs only sets them against each other, so the duplicate
  // is dropped here rather than there.
  const answeredOnServices = new Set(
    [...costFaqs, ...services.flatMap((s) => s.faqs)].map((f) => f.question),
  )

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: FAQ_DATA.filter((f) => !answeredOnServices.has(f.question)).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        <Nav />
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Pricing />
        <Gallery />
        <ExtraWork />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
