import type { Metadata } from "next"
import { Nav } from "@/components/blocks/Nav"
import { Contact } from "@/components/blocks/Contact"

export const metadata: Metadata = {
  title: "Contact | Inside The House — Calgary Renovations",
  description:
    "Get a free, no-obligation quote from Inside The House — family-owned renovations in Calgary, AB. Honest pricing and reliable timelines.",
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <Contact />
      </main>
    </>
  )
}
