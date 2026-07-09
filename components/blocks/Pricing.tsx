// Transparent "ballpark" pricing — a deliberate differentiator (Calgary
// competitors hide prices). Numbers are approximate placeholders for planning;
// swap for exact figures once the client confirms.

import { GlowCard } from "@/components/ui/spotlight-card"

type Tier = {
  id: string
  title: string
  range: string
  unit: string
  scope: string
  featured?: boolean
}

const TIERS: Tier[] = [
  {
    id: "01",
    title: "Bathroom\nRefresh",
    range: "$8,000 – $15,000",
    unit: "typical project",
    scope: "New tile, vanity, lighting & fixtures — same layout.",
  },
  {
    id: "02",
    title: "Full Bathroom\nRemodel",
    range: "$15,000 – $28,000",
    unit: "typical project",
    scope: "Down-to-studs rebuild: custom shower, waterproofing, vanity, lighting & glass.",
    featured: true,
  },
  {
    id: "03",
    title: "Custom Ensuite\n& Spa",
    range: "from $28,000",
    unit: "fully custom",
    scope: "Steam showers, freestanding tubs, heated floors & full custom tile.",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#eae6df] py-24 px-8 md:px-16 overflow-hidden scroll-mt-28">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-14">
        <div className="relative flex items-end justify-between flex-wrap gap-6">
          <span
            className="absolute -top-10 -left-4 text-[140px] font-black text-[#1c1a18]/[0.04] leading-none select-none pointer-events-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            03
          </span>

          <div className="relative flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#8a8a5c]" />
              <span
                className="text-[#8a8a5c] text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Honest Pricing
              </span>
            </div>

            <h2
              className="text-5xl md:text-6xl font-black uppercase leading-none text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ballpark<br />
              <span className="text-[#8a8a5c]">Pricing</span>
            </h2>
          </div>

          <div className="max-w-xs">
            <p
              className="text-sm text-[#6a6460] leading-relaxed border-l-2 border-[#b8b8b0] pl-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No hidden surprises. Real ranges so you can plan with confidence — your
              free quote is exact and no-obligation.
            </p>
          </div>
        </div>

        <div
          className="mt-10 h-px w-full"
          style={{ background: "linear-gradient(to right, #b8b8b0, #d4d0c8, transparent)" }}
        />
      </div>

      {/* Price cards — brand spotlight glow follows the cursor */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TIERS.map((t) => (
          <GlowCard key={t.id} featured={t.featured} className="flex flex-col gap-5 p-8 min-h-[320px] h-full">
            {/* Top row — number + featured flag */}
            <div className="flex items-start justify-between">
              <span
                className="text-5xl font-black leading-none text-white/10"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.id}
              </span>
              {t.featured && (
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c4a962] border border-[#c4a962]/50 px-2 py-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Most Popular
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className="text-2xl md:text-[26px] font-black uppercase leading-tight whitespace-pre-line text-[#f0ede8]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.title}
            </h3>

            {/* Price */}
            <div className="mt-auto">
              <div className={`w-8 h-px mb-4 ${t.featured ? "bg-[#c4a962]" : "bg-[#8a8a5c]"}`} />
              <p
                className={`text-2xl md:text-[28px] font-black leading-none ${t.featured ? "text-[#c4a962]" : "text-[#b6b676]"}`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.range}
              </p>
              <p
                className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9a8a]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t.unit}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#c9c6bf]" style={{ fontFamily: "var(--font-body)" }}>
                {t.scope}
              </p>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Secondary services */}
      <div className="max-w-7xl mx-auto mt-8">
        <p
          className="text-sm text-[#9a9690] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          + Powder rooms & small bathroom updates — priced per job
        </p>
      </div>

      {/* Disclaimer + CTA */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-[#c4c0b8] pt-8">
        <p
          className="text-sm text-[#6a6460] leading-relaxed max-w-xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="text-[#8a8a5c] font-bold">★</span>{" "}
          Every home is different — these are typical ranges for planning only. Book a
          free, no-obligation quote for exact pricing on your project.
        </p>
        <a
          href="/contact"
          className="shrink-0 inline-flex items-center gap-3 bg-[#8a8a5c] text-[#f5f2ee] px-7 py-4 hover:bg-[#7a7a4e] transition-colors duration-300 text-sm font-black uppercase tracking-widest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Get Your Free Quote →
        </a>
      </div>
    </section>
  )
}
