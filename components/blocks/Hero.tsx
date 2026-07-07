import Image from "next/image"

const PLASTER_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#eae6df] overflow-hidden">

      {/* Plaster / concrete noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ backgroundImage: PLASTER_SVG, backgroundSize: "120px" }}
      />

      {/* Subtle grid — blueprint light */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,100,70,1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,70,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Right side — couple photo */}
      <div className="absolute right-0 top-0 h-full w-[46%] hidden md:block">
        <Image
          src="/uploads/2025/09/photo_2025-09-16_17-18-30.jpg"
          alt="Anatolii and Nataliia — Inside The House Calgary"
          fill
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover object-top"
          priority
        />
        {/* Fade to bg colour */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#eae6df] via-[#eae6df]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#eae6df]/20 via-transparent to-[#eae6df]/40" />
        {/* Silver shimmer stripe on edge */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#b8b8b0]/60 to-transparent" />
      </div>

      {/* Vertical text — left edge */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-20">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#8a8a5c]/50" />
        <span
          className="text-[10px] font-bold text-[#8a8a5c]/60 uppercase tracking-[0.4em]"
          style={{
            fontFamily: "var(--font-heading)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Since 2015 · Calgary AB
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#8a8a5c]/50" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 md:px-20 py-32 w-full">
        <div className="max-w-2xl flex flex-col gap-7">

          {/* Tag */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#8a8a5c]/50" />
            <span className="text-[#8a8a5c] text-[11px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-heading)" }}>
              Family-Owned · Calgary, Alberta
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-[72px] md:text-[100px] font-black uppercase leading-[0.88] text-[#1c1a18]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your<br />
            Home.<br />
            <span className="text-[#8a8a5c]">Trans&shy;formed.</span>
          </h1>

          {/* Body text */}
          <p className="text-base text-[#6a6460] leading-relaxed max-w-xl mt-2" style={{ fontFamily: "var(--font-body)" }}>
            Bathrooms, kitchens, basements and more — renovated with
            honest pricing, reliable timelines, and craftsmanship you can trust.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {/* Olive CTA */}
            <a
              href="/contact"
              className="flex items-center gap-3 bg-[#8a8a5c] text-[#f5f2ee] pl-7 pr-3 py-3.5 group hover:bg-[#7a7a4e] transition-colors duration-300"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-sm font-black uppercase tracking-[0.15em]">Get a Free Quote</span>
              <span className="w-9 h-9 bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>

            {/* Silver CTA */}
            <a
              href="/works"
              className="flex items-center gap-2 text-[#6a6460] hover:text-[#1c1a18] text-xs font-black uppercase tracking-[0.25em] transition-colors border border-[#b8b8b0] px-5 py-3.5 hover:border-[#8a8a5c]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              View Our Work →
            </a>
          </div>

          {/* Stats — nav-style pill */}
          <div className="inline-flex flex-wrap items-center gap-x-12 gap-y-4 mt-6 w-fit rounded-2xl bg-[#eae6df]/85 backdrop-blur-xl border border-[#c4c0b8]/60 shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-10 py-5">
            {[
              { value: "10+",  label: "Years" },
              { value: "200+", label: "Projects" },
              { value: "100%", label: "On Time" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-black text-[#8a8a5c]" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </span>
                <span className="text-[10px] text-[#9a9690] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Corner stamp */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1 z-20 opacity-30">
        <div className="w-10 h-px bg-[#8a8a5c]" />
        <span className="text-[10px] text-[#8a8a5c] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-heading)" }}>
          Est. 2015
        </span>
        <div className="w-10 h-px bg-[#8a8a5c]" />
      </div>

      {/* Bottom silver line */}
      <div className="absolute bottom-0 inset-x-0 h-px" style={{
        background: "linear-gradient(to right, transparent, #b8b8b0, #d4d4cc, #b8b8b0, transparent)"
      }} />
    </section>
  )
}
