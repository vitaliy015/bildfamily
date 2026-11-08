import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/blocks/Nav"
import { Footer } from "@/components/blocks/Footer"
import { business } from "@/lib/site"

const title = "Privacy Policy | Inside The House — Bathroom Renovations Calgary"
const description =
  "How Inside The House collects, uses and protects the personal information you share when requesting a bathroom renovation quote in Calgary, AB."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title, description, url: "/privacy-policy" },
  twitter: { title, description },
}

// Shown to visitors and cited in the footer. Update this date whenever the
// policy changes materially — Google Ads reviewers check that it is current.
const EFFECTIVE_DATE = "November 8, 2026"

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2
        className="text-xl md:text-2xl font-bold uppercase tracking-wide text-[#1c1a18]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {heading}
      </h2>
      <div
        className="flex flex-col gap-3 text-[#4a4840] leading-relaxed"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </div>
    </section>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#eae6df] pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12 flex flex-col gap-10">

          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#8a8a5c]/50" />
              <span
                className="text-[#6a6460] text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Effective {EFFECTIVE_DATE}
              </span>
            </div>
            <h1
              className="text-[11vw] min-[430px]:text-[52px] md:text-[64px] font-black uppercase leading-[0.92] text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Privacy Policy
            </h1>
            <p
              className="text-base text-[#4a4840] leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {business.name} is a family-owned bathroom renovation company based in{" "}
              {business.city}, {business.region}. This page explains what personal
              information we collect, why we collect it, and what you can ask us to do
              with it.
            </p>
          </header>

          <Section heading="What we collect">
            <p>
              We only collect what you give us. When you submit the quote form on this
              website, we receive your <strong>name</strong>, <strong>phone number</strong>,{" "}
              <strong>email address</strong> and, if you write one, your{" "}
              <strong>project message</strong>.
            </p>
            <p>
              If you call, text or email us instead, we hold whatever you choose to share
              in that conversation. We do not buy contact lists and we do not collect
              information about you from other companies.
            </p>
          </Section>

          <Section heading="Why we collect it">
            <p>
              To answer your enquiry: to call or email you back, prepare a quote, arrange a
              site visit, and keep records of the work we do. That is the only purpose.
            </p>
            <p>
              We do not sell, rent or trade your information, and we do not use it to
              advertise to you.
            </p>
          </Section>

          <Section heading="Your consent">
            <p>
              Submitting the form is your consent for us to contact you about your enquiry.
              You can withdraw it at any time by telling us — call{" "}
              <a href={`tel:${business.phone.replace(/\D/g, "")}`} className="text-[#6a6460] underline underline-offset-4 hover:text-[#1c1a18]">
                {business.phone}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${business.email}`} className="text-[#6a6460] underline underline-offset-4 hover:text-[#1c1a18] break-all">
                {business.email}
              </a>
              {" "}— and we will stop and delete your details unless we are required to keep
              them for tax or warranty records.
            </p>
          </Section>

          <Section heading="Who else handles your information">
            <p>
              Running the website means two service providers touch your data on our
              behalf. Neither uses it for their own purposes:
            </p>
            <ul className="flex flex-col gap-2 list-disc pl-5">
              <li>
                <strong>Vercel</strong> hosts this website and keeps short-lived technical
                logs of requests, which can include your IP address.
              </li>
              <li>
                <strong>Resend</strong> delivers the quote form to our inbox, so the
                contents of your submission pass through their email service.
              </li>
            </ul>
            <p>
              Both operate servers outside Canada, which means your information may be
              stored or processed in another country and can be subject to the laws there.
            </p>
          </Section>

          <Section heading="How long we keep it">
            <p>
              Enquiries that do not become projects are kept while we are still in contact
              with you and then removed. For completed work we keep the file as long as we
              need it for warranty, accounting and tax obligations.
            </p>
          </Section>

          <Section heading="Cookies and tracking">
            <p>
              This website does not use advertising or analytics cookies. The only thing it
              stores in your browser is a note that you have already seen the opening
              animation, so it does not replay on every page. That note stays on your
              device, is cleared when you close the tab, and tells us nothing about you.
            </p>
            <p>
              If we add website analytics later, we will update this page before turning
              them on.
            </p>
          </Section>

          <Section heading="Keeping it safe">
            <p>
              The site is served over an encrypted connection, form submissions are
              transmitted encrypted, and access to our inbox is limited to the two of us
              who run the company. No method of transmission over the internet is perfectly
              secure, so we cannot promise absolute security.
            </p>
          </Section>

          <Section heading="Your rights">
            <p>
              Under Canada&rsquo;s <em>Personal Information Protection and Electronic
              Documents Act</em> (PIPEDA) and Alberta&rsquo;s{" "}
              <em>Personal Information Protection Act</em> (PIPA), you can ask us to show
              you the personal information we hold about you, correct it if it is wrong, or
              delete it. Write to{" "}
              <a href={`mailto:${business.email}`} className="text-[#6a6460] underline underline-offset-4 hover:text-[#1c1a18] break-all">
                {business.email}
              </a>{" "}
              and we will respond within 30 days.
            </p>
            <p>
              If you are not satisfied with how we handled your request, you can complain
              to the{" "}
              <a
                href="https://www.priv.gc.ca/en/report-a-concern/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6a6460] underline underline-offset-4 hover:text-[#1c1a18]"
              >
                Office of the Privacy Commissioner of Canada
              </a>
              .
            </p>
          </Section>

          <Section heading="Children">
            <p>
              This website is meant for homeowners. We do not knowingly collect information
              from anyone under 18.
            </p>
          </Section>

          <Section heading="Changes to this policy">
            <p>
              If we change how we handle personal information, we will revise this page and
              move the effective date at the top. Material changes will be reflected here
              before they take effect.
            </p>
          </Section>

          <Section heading="Contact us">
            <p>
              {business.name}
              <br />
              {business.city}, {business.region}, Canada
              <br />
              <a href={`tel:${business.phone.replace(/\D/g, "")}`} className="text-[#6a6460] underline underline-offset-4 hover:text-[#1c1a18]">
                {business.phone}
              </a>
              <br />
              <a href={`mailto:${business.email}`} className="text-[#6a6460] underline underline-offset-4 hover:text-[#1c1a18] break-all">
                {business.email}
              </a>
            </p>
          </Section>

          <div className="pt-4 border-t border-[#c4c0b8]">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#8a8a5c] text-[#f5f2ee] px-6 sm:px-8 py-3.5 sm:py-4 whitespace-nowrap shadow-[0_2px_0_rgba(28,26,24,0)] transition duration-300 ease-out hover:bg-[#7a7a4e] hover:shadow-[0_8px_18px_rgba(28,26,24,0.18)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
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
                <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
