import Link from "next/link"

const INSTAGRAM_URL = "https://www.instagram.com/insidethehouse_renovations"
const PHONE = "+1 (403) 000-0000"
const PHONE_TEL = `tel:${PHONE.replace(/\D/g, "")}`
const EMAIL = "insidethehouseca@gmail.com"

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Works",    href: "/portfolio" },
  { label: "Contact",  href: "/contact" },
]

const SERVICE_LINKS = [
  { label: "Bathroom Remodeling", href: "/services/bathroom" },
  { label: "Kitchen Updates",     href: "/services/kitchen" },
  { label: "Basement Finishing",  href: "/services/basement" },
  { label: "Flooring Installation", href: "/services/flooring" },
]

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
  </svg>
)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#1c1a17] text-[#9a9a8a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="text-[#f0ede8] text-xl font-black uppercase tracking-[0.15em] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Inside<br />The House
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-body)" }}>
              No shortcuts, no hidden surprises — just reliable timelines, honest pricing, and craftsmanship you can trust.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — Inside The House"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-white/15 text-[#9a9a8a] hover:text-[#1c1a17] hover:bg-[#c4a962] hover:border-[#c4a962] transition-colors duration-300"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col gap-4" aria-label="Footer navigation">
            <span className="text-[#f0ede8] text-[11px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-heading)" }}>
              Explore
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-[#c4a962] transition-colors duration-200 w-fit"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Services */}
          <nav className="flex flex-col gap-4" aria-label="Services">
            <span className="text-[#f0ede8] text-[11px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-heading)" }}>
              Services
            </span>
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-[#c4a962] transition-colors duration-200 w-fit"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-[#f0ede8] text-[11px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-heading)" }}>
              Get in Touch
            </span>
            <a href={PHONE_TEL} className="text-sm hover:text-[#c4a962] transition-colors duration-200 w-fit" style={{ fontFamily: "var(--font-body)" }}>
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="text-sm hover:text-[#c4a962] transition-colors duration-200 w-fit break-all" style={{ fontFamily: "var(--font-body)" }}>
              {EMAIL}
            </a>
            <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Calgary, Alberta &amp; surrounding areas
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
            © {year} Inside The House. All rights reserved.
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#c4a962]/70" style={{ fontFamily: "var(--font-heading)" }}>
            Family-Owned · Est. 2015 · Calgary AB
          </p>
        </div>
      </div>
    </footer>
  )
}
