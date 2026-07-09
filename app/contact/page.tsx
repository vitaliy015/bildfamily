import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Contact } from "@/components/blocks/Contact"
import { MapCard } from "@/components/blocks/MapCard"
import { Footer } from "@/components/blocks/Footer"

const title = "Contact | Inside The House — Bathroom Renovations Calgary"
const description =
  "Get a free, no-obligation bathroom renovation quote from Inside The House — a family-owned company in Calgary, AB. Honest pricing and reliable timelines."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
  twitter: { title, description },
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <Contact />
        <MapCard />
      </main>
      <Footer />
    </>
  )
}
