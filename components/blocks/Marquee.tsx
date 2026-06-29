"use client"

const ITEMS = [
  "Bathroom Remodeling",
  "Kitchen Updates",
  "Basement Finishing",
  "Flooring Installation",
  "Drywall & Painting",
  "Small Repairs",
  "Free Estimates",
  "Calgary, AB",
]

export function Marquee() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="relative overflow-hidden py-3.5 border-y border-[#c4c0b8]" style={{ background: "linear-gradient(135deg, #c8c8c0, #e0ddd8, #b8b8b0, #d4d0c8, #c0c0b8)" }}>
      {/* Scrolling track */}
      <div className="flex w-max animate-[marquee_30s_linear_infinite]">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-4 text-[#3a3830] text-sm font-black uppercase tracking-[0.2em] whitespace-nowrap"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {item}
            <span className="text-[#3a3830]/30 text-base">◆</span>
          </span>
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#c8c8c0] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#c0c0b8] to-transparent pointer-events-none" />
    </div>
  )
}
