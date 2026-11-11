import { business } from "@/lib/site"

// Keyless Google Maps embed — the same URL Google's own "Share → Embed a map"
// button hands out. No API key, no Google Cloud project, no billing account,
// and nothing secret sitting in the page source. `pb` is Google's packed
// parameter format: `1s` carries the point, `6i` the zoom level. The map always
// follows the viewer's own browser language — neither `hl` nor a language block
// inside `pb` overrides it, both were tested — so a Calgary visitor sees English.
const { lat, lng } = business.geo
const embedSrc = `https://www.google.com/maps/embed?pb=!1m3!2m1!1s${lat},${lng}!6i13`

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function MapCard() {
  return (
    <section className="bg-[#1c1a17] py-20 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-10 md:mb-12">
          <p
            className="text-xs font-bold uppercase tracking-[0.35em] mb-5 text-[#c4a962]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Find Us
          </p>
          <h2
            className="text-[38px] md:text-5xl font-black uppercase leading-[0.95] mb-5 text-[#f0ede8]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
          >
            Serving Calgary &amp; Area
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#9a9a8a]" style={{ fontFamily: "var(--font-body)" }}>
            Based in Calgary, AB — we work across the city and surrounding communities.
            Tap the map for directions.
          </p>
        </div>

        {/* Map card */}
        <div className="relative overflow-hidden rounded-2xl border border-[#8a8a5c]/40 aspect-[16/11] sm:aspect-[16/8] lg:aspect-[16/6]">
          <iframe
            src={embedSrc}
            title="Inside The House — Calgary service area map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ border: 0, filter: "saturate(0.92) sepia(0.06) brightness(0.98)" }}
          />

          {/* Overlay CTA */}
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open our Calgary location in Google Maps"
            className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 bg-[#8a8a5c] text-[#f5f2ee] px-3.5 py-2.5 rounded-md shadow-lg hover:bg-[#7a7a4e] transition-colors duration-300 text-[10px] font-black uppercase tracking-[0.12em] sm:bottom-4 sm:right-4 sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.15em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Open in Google Maps <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
