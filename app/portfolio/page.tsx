import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Portfolio } from "@/components/blocks/Portfolio"
import { Footer } from "@/components/blocks/Footer"

export const metadata: Metadata = {
  title: "Our Work | Inside The House — Calgary Renovations",
  description:
    "Browse completed bathroom, kitchen, flooring and finishing projects by Inside The House — a family-owned renovation company in Calgary, AB.",
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
