import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Contact } from "@/components/blocks/Contact"
import { Footer } from "@/components/blocks/Footer"

const title = "Contact | Inside The House — Calgary Renovations"
const description =
  "Get a free, no-obligation quote from Inside The House — family-owned renovations in Calgary, AB. Honest pricing and reliable timelines."

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/contact" },
  twitter: { title, description },
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <Contact />
      </main>
      <Footer />
    </>
  )
}
