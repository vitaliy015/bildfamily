import { business } from "@/lib/site"

// Google Maps Embed API key (client-visible; restrict by HTTP referrer + limit
// to the Maps Embed API in Google Cloud). Until it's set, we show a branded
// fallback that still links to Google Maps.
const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const { lat, lng } = business.geo
const embedSrc = MAPS_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${lat},${lng}&zoom=13`
  : null

const PinIcon = ({ className = "" }: { className?: string }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)

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
          {embedSrc ? (
            <iframe
              src={embedSrc}
              title="Inside The House — Calgary service area map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ border: 0, filter: "saturate(0.92) sepia(0.06) brightness(0.98)" }}
            />
          ) : (
            /* Fallback — whole card links to Google Maps */
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open our Calgary location in Google Maps"
              className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#232019] transition-colors duration-300 hover:bg-[#2a2720]"
            >
              {/* Blueprint grid for a subtle map feel */}
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(196,169,98,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,169,98,1) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <PinIcon className="relative text-[#c4a962]" />
              <span
                className="relative text-xl font-bold uppercase tracking-wide text-[#f0ede8]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Calgary, AB
              </span>
              <span
                className="relative inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c4a962]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Open in Google Maps <ArrowIcon />
              </span>
            </a>
          )}

          {/* Overlay CTA (with the live map) */}
          {embedSrc && (
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open our Calgary location in Google Maps"
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 bg-[#8a8a5c] text-[#f5f2ee] px-5 py-3 rounded-md shadow-lg hover:bg-[#7a7a4e] transition-colors duration-300 text-xs font-black uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Open in Google Maps <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
