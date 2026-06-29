import { Nav } from "@/components/blocks/Nav"
import { Hero } from "@/components/blocks/Hero"
import { Marquee } from "@/components/blocks/Marquee"
import { Services } from "@/components/blocks/Services"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Services />

      {/* Placeholder sections for scroll testing */}
      {["Bathrooms", "Kitchens", "Basements", "Flooring", "About Us"].map((title) => (
        <section
          key={title}
          className="min-h-screen flex items-center justify-center border-t border-slate-200"
        >
          <h2 className="text-5xl font-bold text-slate-300 uppercase tracking-widest">
            {title}
          </h2>
        </section>
      ))}
    </main>
  )
}
