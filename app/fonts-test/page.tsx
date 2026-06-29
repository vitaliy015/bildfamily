import {
  Bebas_Neue,
  Nunito,
  Space_Grotesk,
  Lora,
  Syne,
  Inter,
  Oswald,
  Source_Serif_4,
} from "next/font/google"

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ["400"] })
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600"] })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"] })
const lora = Lora({ subsets: ["latin"], weight: ["400", "500"] })
const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] })
const oswald = Oswald({ subsets: ["latin"], weight: ["600", "700"] })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"] })

const VARIANTS = [
  {
    number: "01",
    name: "Bold & Strong",
    desc: "Used by trades, construction, renovation leaders",
    heading: bebasNeue,
    body: nunito,
    headingLabel: "Bebas Neue",
    bodyLabel: "Nunito",
    bg: "#0f0f0f",
    accent: "#d97706",
    text: "#f5f0e8",
    tag: "MOST POPULAR IN RENOVATION",
  },
  {
    number: "02",
    name: "Modern & Trustworthy",
    desc: "Used by premium interior studios",
    heading: spaceGrotesk,
    body: lora,
    headingLabel: "Space Grotesk",
    bodyLabel: "Lora",
    bg: "#fafaf8",
    accent: "#1a1a2e",
    text: "#1a1a2e",
    tag: "TRENDING 2025",
  },
  {
    number: "03",
    name: "Architecture & Design",
    desc: "Used by design-build firms and architects",
    heading: syne,
    body: inter,
    headingLabel: "Syne",
    bodyLabel: "Inter",
    bg: "#f0ede6",
    accent: "#c2440e",
    text: "#1c1208",
    tag: "DESIGN STUDIOS",
  },
  {
    number: "04",
    name: "Classic & Professional",
    desc: "Timeless — works perfectly for Google Ads",
    heading: oswald,
    body: sourceSerif,
    headingLabel: "Oswald",
    bodyLabel: "Source Serif 4",
    bg: "#1e2d40",
    accent: "#e8b44d",
    text: "#f0efe9",
    tag: "HIGH TRUST / CONVERSION",
  },
]

export default function FontsTestPage() {
  return (
    <main>
      {VARIANTS.map((v) => (
        <section
          key={v.number}
          style={{ backgroundColor: v.bg, color: v.text }}
          className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-20"
        >
          {/* Top labels */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <span
              style={{
                backgroundColor: v.accent,
                fontFamily: v.body.style.fontFamily,
                color: v.number === "02" ? "#fff" : v.bg,
              }}
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1"
            >
              {v.tag}
            </span>
            <span
              style={{ color: v.text + "60", fontFamily: v.body.style.fontFamily }}
              className="text-xs uppercase tracking-widest"
            >
              {v.headingLabel} + {v.bodyLabel}
            </span>
          </div>

          {/* Variant label */}
          <p
            style={{ color: v.accent, fontFamily: v.body.style.fontFamily }}
            className="text-xs font-semibold uppercase tracking-widest mb-4"
          >
            {v.number} / {v.name} — {v.desc}
          </p>

          {/* H1 */}
          <h1
            style={{ fontFamily: v.heading.style.fontFamily, color: v.text }}
            className="text-6xl md:text-8xl leading-none mb-6 max-w-4xl uppercase"
          >
            Renovations<br />
            <span style={{ color: v.accent }}>You Can Trust</span>
          </h1>

          {/* H2 */}
          <h2
            style={{ fontFamily: v.heading.style.fontFamily, color: v.text + "bb" }}
            className="text-2xl md:text-3xl uppercase mb-8"
          >
            Bathrooms · Kitchens · Basements — Calgary, AB
          </h2>

          {/* Body */}
          <p
            style={{ fontFamily: v.body.style.fontFamily, color: v.text + "99" }}
            className="text-base md:text-lg leading-relaxed max-w-xl mb-10"
          >
            A family business with 10+ years of hands-on experience. Anatolii and Nataliia
            personally on every job. No surprises — honest pricing, reliable timelines,
            and a clean job site every single day.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <button
              style={{
                backgroundColor: v.accent,
                fontFamily: v.body.style.fontFamily,
                color: v.number === "02" ? "#fff" : v.bg,
              }}
              className="px-8 py-4 text-sm font-bold uppercase tracking-widest cursor-pointer"
            >
              Get a Free Quote
            </button>
            <button
              style={{
                border: `2px solid ${v.text}40`,
                fontFamily: v.body.style.fontFamily,
                color: v.text,
              }}
              className="px-8 py-4 text-sm font-semibold uppercase tracking-widest cursor-pointer"
            >
              View Our Work →
            </button>
          </div>

          {/* Services row */}
          <div
            className="flex flex-wrap gap-10 pt-8"
            style={{ borderTop: `1px solid ${v.text}20` }}
          >
            {["Bathrooms", "Kitchens", "Basements", "Flooring", "Painting", "Small Repairs"].map((s) => (
              <span
                key={s}
                style={{ fontFamily: v.body.style.fontFamily, color: v.text + "70" }}
                className="text-xs uppercase tracking-widest"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
