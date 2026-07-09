import { Intro } from "@/components/blocks/Intro"
import { Nav } from "@/components/blocks/Nav"
import { Hero } from "@/components/blocks/Hero"
import { Marquee } from "@/components/blocks/Marquee"
import { Services } from "@/components/blocks/Services"
import { Pricing } from "@/components/blocks/Pricing"
import { About } from "@/components/blocks/About"
import { Gallery } from "@/components/blocks/Gallery"
import { FAQ } from "@/components/blocks/FAQ"
import { Footer } from "@/components/blocks/Footer"

export default function Home() {
  return (
    <>
      <Intro />
      <main>
        <Nav />
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Pricing />
        <Gallery />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
