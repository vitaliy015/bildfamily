import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Portfolio } from "@/components/blocks/Portfolio"
import { Footer } from "@/components/blocks/Footer"

const title = "Our Work | Inside The House — Bathroom Renovations Calgary"
const description =
  "Browse completed bathroom renovations — ensuites, custom tile & showers, vanities and fixtures — by Inside The House, a family-owned company in Calgary, AB."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: { title, description, url: "/portfolio" },
  twitter: { title, description },
}

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main>
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}
