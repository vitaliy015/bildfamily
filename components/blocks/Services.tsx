import { BathroomSlider } from "@/components/blocks/BathroomSlider"

// What we do inside bathrooms (our specialty)
const BATH_SCOPE = [
  "Full bathroom & ensuite remodels",
  "Custom tile, showers & steam rooms",
  "Vanities, countertops & lighting",
  "Freestanding tubs & fixtures",
  "Basement & powder-room baths",
  "Accessibility & aging-in-place updates",
]

export function Services() {
  return (
    <section id="services" className="bg-[#eae6df] py-24 px-8 md:px-16 overflow-hidden scroll-mt-28">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-14">
        <div className="relative flex items-end justify-between flex-wrap gap-6">
          <span
            className="absolute -top-10 -left-4 text-[140px] font-black text-[#1c1a18]/[0.04] leading-none select-none pointer-events-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            02
          </span>

          <div className="relative flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#8a8a5c]" />
              <span
                className="text-[#8a8a5c] text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Our Specialty
              </span>
            </div>

            <h2
              className="text-5xl md:text-6xl font-black uppercase leading-none text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Bathroom<br />
              <span className="text-[#8a8a5c]">Specialists</span>
            </h2>
          </div>

          <div className="max-w-xs">
            <p
              className="text-sm text-[#6a6460] leading-relaxed border-l-2 border-[#b8b8b0] pl-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We focus on what we do best — bathrooms — and do them properly, start to finish.
            </p>
          </div>
        </div>

        <div
          className="mt-10 h-px w-full"
          style={{ background: "linear-gradient(to right, #b8b8b0, #d4d0c8, transparent)" }}
        />
      </div>

      {/* Two columns — description + image */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text */}
        <div className="flex flex-col gap-8">
          <p className="text-lg md:text-xl leading-relaxed text-[#4a4840]" style={{ fontFamily: "var(--font-body)" }}>
            Bathrooms are what we do best. From dated ensuites to spa-like retreats, we
            handle the whole job — design, tile, plumbing and finish — with the care of a
            family business that&rsquo;s personally on site every day.
          </p>

          {/* Scope list */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {BATH_SCOPE.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 shrink-0 rotate-45 bg-[#8a8a5c]" />
                <span className="text-base text-[#4a4840]" style={{ fontFamily: "var(--font-body)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="/works"
              className="flex items-center gap-3 bg-[#8a8a5c] text-[#f5f2ee] px-7 py-4 hover:bg-[#7a7a4e] transition-colors duration-300 text-sm font-black uppercase tracking-widest"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              See Our Bathroom Work →
            </a>
            <a
              href="/contact"
              className="flex items-center gap-2 text-[#6a6460] hover:text-[#1c1a18] text-xs font-black uppercase tracking-[0.25em] transition-colors border border-[#b8b8b0] px-5 py-4 hover:border-[#8a8a5c]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Free Quote
            </a>
          </div>
        </div>

        {/* Bathroom slider (GSAP) */}
        <BathroomSlider />
      </div>

      {/* Secondary services line */}
      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-[#c4c0b8]">
        <p
          className="text-sm text-[#6a6460] leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="text-[#8a8a5c] font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
            Beyond bathrooms:
          </span>{" "}
          we also renovate kitchens, finish basements, install flooring, and handle drywall,
          painting and small repairs — one trusted team for your whole home.
        </p>
      </div>
    </section>
  )
}
