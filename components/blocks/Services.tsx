const SERVICES = [
  {
    id: "01",
    title: "Bathroom\nRemodeling",
    desc: "Modern tiles, custom vanities, lighting — full bathroom transformation from concept to finish.",
    photo: "https://insidethehouseca.com/wp-content/uploads/2025/09/IMG_6731.jpg",
    href: "/services/bathroom",
  },
  {
    id: "02",
    title: "Kitchen\nUpdates",
    desc: "Cabinets, countertops, backsplash — a complete kitchen refresh that adds real value.",
    photo: "https://insidethehouseca.com/wp-content/uploads/2025/09/IMG_4360.jpg",
    href: "/services/kitchen",
  },
  {
    id: "03",
    title: "Basement\nFinishing",
    desc: "Family room, home office, gym or guest suite — permits included, done right.",
    photo: "https://insidethehouseca.com/wp-content/uploads/2025/09/IMG_3488.jpg",
    href: "/services/basement",
  },
  {
    id: "04",
    title: "Flooring\nInstallation",
    desc: "Hardwood, laminate, tile, vinyl — every surface installed with precision and care.",
    photo: "https://insidethehouseca.com/wp-content/uploads/2025/09/IMG_5605.jpg",
    href: "/services/flooring",
  },
]

export function Services() {
  return (
    <section className="bg-[#eae6df] py-24 px-8 md:px-16 overflow-hidden">

      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="relative flex items-end justify-between flex-wrap gap-6">

          {/* Giant faded number */}
          <span
            className="absolute -top-10 -left-4 text-[140px] font-black text-[#1c1a18]/[0.04] leading-none select-none pointer-events-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            02
          </span>

          <div className="relative flex flex-col gap-4">
            {/* Tag */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#8a8a5c]" />
              <span
                className="text-[#8a8a5c] text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                What We Do
              </span>
            </div>

            <h2
              className="text-5xl md:text-6xl font-black uppercase leading-none text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our<br />
              <span className="text-[#8a8a5c]">Services</span>
            </h2>
          </div>

          {/* Right side text */}
          <div className="max-w-xs">
            <p
              className="text-sm text-[#6a6460] leading-relaxed border-l-2 border-[#b8b8b0] pl-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              From a single room refresh to a full basement build-out — we handle every stage, personally.
            </p>
          </div>
        </div>

        {/* Silver divider */}
        <div
          className="mt-10 h-px w-full"
          style={{ background: "linear-gradient(to right, #b8b8b0, #d4d0c8, transparent)" }}
        />
      </div>

      {/* Cards grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-[#c4c0b8]">
        {SERVICES.map((s) => (
          <a
            key={s.id}
            href={s.href}
            className="group relative overflow-hidden bg-[#eae6df] aspect-[4/3] flex flex-col justify-between p-8"
          >
            {/* Photo */}
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.photo}
                alt={s.title.replace("\n", " ")}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-30 group-hover:opacity-50"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#eae6df] via-[#eae6df]/60 to-transparent" />

            {/* Top row — number */}
            <div className="relative flex items-start justify-between z-10">
              <span
                className="text-7xl font-black text-[#1c1a18]/10 leading-none"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {s.id}
              </span>
              {/* Arrow — appears on hover */}
              <span
                className="w-10 h-10 border border-[#8a8a5c] flex items-center justify-center text-[#8a8a5c] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                →
              </span>
            </div>

            {/* Bottom row — title + desc */}
            <div className="relative z-10 flex flex-col gap-3">
              <div
                className="w-8 h-px transition-all duration-300 group-hover:w-14"
                style={{ background: "linear-gradient(to right, #8a8a5c, #b8b8b0)" }}
              />
              <h3
                className="text-3xl md:text-4xl font-black uppercase leading-tight text-[#1c1a18] whitespace-pre-line"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm text-[#6a6460] leading-relaxed max-w-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {s.desc}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto mt-12 flex items-center justify-between flex-wrap gap-4">
        <p
          className="text-sm text-[#9a9690] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          + Drywall · Painting · Small Repairs · Handyman
        </p>
        <a
          href="/services"
          className="flex items-center gap-3 border border-[#8a8a5c] text-[#8a8a5c] px-6 py-3 hover:bg-[#8a8a5c] hover:text-[#f5f2ee] transition-colors duration-300 text-sm font-black uppercase tracking-widest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          All Services →
        </a>
      </div>

    </section>
  )
}
