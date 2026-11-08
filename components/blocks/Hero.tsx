import Image from "next/image"
import { HeroHeadline } from "@/components/blocks/HeroHeadline"

const PLASTER_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#efece7] overflow-hidden">

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#efece7] via-[#efece7]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#efece7]/20 via-transparent to-[#efece7]/40" />
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

          {/* Heading — hinged "falling beam" entrance, matching WorksHero */}
          <HeroHeadline />

          {/* Body text */}
          <p className="text-base text-[#6a6460] leading-relaxed max-w-xl mt-2" style={{ fontFamily: "var(--font-body)" }}>
            Calgary&rsquo;s family-owned bathroom renovation specialists — full remodels,
            custom showers and ensuites with honest pricing, reliable timelines, and
            craftsmanship you can trust.
          </p>

          {/* CTA buttons — kept in one row at every width, never stacked */}
          <div className="flex flex-row items-center gap-4 sm:gap-6 pt-1">
            {/* Primary — olive pill, matching the nav above */}
            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#8a8a5c] text-[#f5f2ee] px-4 sm:px-8 py-3.5 sm:py-4 whitespace-nowrap shadow-[0_2px_0_rgba(28,26,24,0)] transition duration-300 ease-out hover:bg-[#7a7a4e] hover:shadow-[0_8px_18px_rgba(28,26,24,0.18)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 active:shadow-[0_2px_6px_rgba(28,26,24,0.14)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-[15px] sm:text-[18px] font-medium tracking-[0.01em]">
                Get a free quote
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Secondary — same pill, black. No arrow: two of them read as
                competing primaries and the pair would not fit at 375px. */}
            <a
              href="/works"
              className="inline-flex items-center justify-center rounded-full bg-[#1c1a18] text-[#f5f2ee] px-4 sm:px-8 py-3.5 sm:py-4 whitespace-nowrap shadow-[0_2px_0_rgba(28,26,24,0)] transition duration-300 ease-out hover:bg-[#2a2720] hover:shadow-[0_8px_18px_rgba(28,26,24,0.26)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 active:shadow-[0_2px_6px_rgba(28,26,24,0.2)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-[15px] sm:text-[18px] font-medium tracking-[0.01em]">
                View our work
              </span>
            </a>
          </div>

          {/* Stats — nav-style pill */}
          <div className="grid grid-cols-3 gap-x-3 sm:inline-flex sm:flex-wrap sm:items-center sm:gap-x-12 gap-y-4 mt-6 w-full sm:w-fit rounded-2xl bg-[#efece7]/85 backdrop-blur-xl border border-[#c4c0b8]/60 shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-5 sm:px-10 py-5">
            {[
              { value: "10+",  label: "Years" },
              { value: "100+", label: "Bathrooms" },
              { value: "2 Years", label: "Warranty" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-black text-[#8a8a5c] whitespace-nowrap" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#9a9690] uppercase tracking-[0.12em] sm:tracking-[0.2em] whitespace-nowrap" style={{ fontFamily: "var(--font-heading)" }}>
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
