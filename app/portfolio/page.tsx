import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Portfolio } from "@/components/blocks/Portfolio"
import { Footer } from "@/components/blocks/Footer"

const title = "Our Work | Inside The House — Calgary Renovations"
const description =
  "Browse completed bathroom, kitchen, flooring and finishing projects by Inside The House — a family-owned renovation company in Calgary, AB."

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
