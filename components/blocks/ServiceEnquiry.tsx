"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Select } from "@base-ui/react/select"
import { sendServiceEnquiry } from "@/app/actions"
import { ENQUIRY_SERVICES, isEnquiryService } from "@/lib/enquiry"
import { business } from "@/lib/site"

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const PHONE = business.phone
const PHONE_TEL = `tel:${PHONE.replace(/\D/g, "")}`
const EMAIL = business.email

type Fields = { service: string; question: string; email: string; phone: string }
type Errors = Partial<Record<keyof Fields, string>>

// Matches the server exactly. An earlier form on this site used a stricter
// phone pattern than the action behind it and silently turned away numbers
// like "403.667.6148"; count digits and nothing else.
function validate(form: Fields): Errors {
  const errors: Errors = {}

  if (!form.service) {
    errors.service = "Pick what you would like done."
  } else if (!isEnquiryService(form.service)) {
    errors.service = "Pick one of the options in the list."
  }

  const digits = form.phone.replace(/\D/g, "")
  if (!form.phone.trim()) {
    errors.phone = "We need a number to call you back on."
  } else if (digits.length < 7) {
    errors.phone = "That number looks too short."
  }

  const email = form.email.trim()
  if (!email) {
    errors.email = "We need an email to send the quote to."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "That email address looks wrong."
  }

  return errors
}

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden
    className="transition-transform duration-300 group-hover:translate-x-1"
  >
    <path
      d="M2 7h10M7.5 2.5L12 7l-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const labelClass =
  "mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#1c1a18]"

const fieldClass =
  "w-full rounded-md border bg-[#faf9f5] px-4 py-3.5 text-[#1c1a18] placeholder:text-[#7a756c] outline-none transition-colors duration-200 focus:border-[#1c1a18]"

export function ServiceEnquiry() {
  const [form, setForm] = useState<Fields>({
    service: "",
    question: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [company, setCompany] = useState("")
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const doneRef = useRef<HTMLDivElement>(null)

  // The confirmation is a fraction of the form's height and the scroll
  // position does not move, so without this it renders above the viewport and
  // the person who just pressed send sees nothing happen.
  useEffect(() => {
    const node = doneRef.current
    if (!sent || !node) return
    node.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    })
    node.focus({ preventScroll: true })
  }, [sent])

  const change = (field: keyof Fields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  const blur = (field: keyof Fields) =>
    setErrors((prev) => ({ ...prev, [field]: validate(form)[field] }))

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validate(form)
    setErrors(next)
    if (Object.values(next).some(Boolean)) return

    setPending(true)
    setSendError(null)
    const result = await sendServiceEnquiry({ ...form, company })
    setPending(false)
    if (result.ok) setSent(true)
    else setSendError(result.error)
  }

  // If the send fails, the enquiry is still in front of them — hand it over
  // rather than making them type it again.
  const mailtoFallback =
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(`Additional work — ${form.service || "enquiry"}`)}` +
    `&body=${encodeURIComponent(
      [
        `Wants:  ${form.service}`,
        `Phone:  ${form.phone}`,
        `Email:  ${form.email}`,
        ``,
        form.question || "",
      ].join("\n"),
    )}`

  const borderFor = (field: keyof Fields) =>
    errors[field] ? "border-[#7d2e1c]" : "border-[#6f6f47]"

  return (
    <section id="ask" className="scroll-mt-24 bg-[#8a8a5c] py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:px-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* ── the ask ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#1c1a18]" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Free quote
            </span>
          </div>

          <h2
            className="mt-6 text-3xl font-black uppercase leading-[0.95] text-[#1c1a18] md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What do
            <br />
            you need?
          </h2>

          <p
            className="mt-6 max-w-md leading-relaxed text-[#1c1a18]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Free to ask, same-day reply.
          </p>

          <div className="mt-10 border-t border-[#6f6f47] pt-8">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1c1a18]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Or just call
            </p>
            <a
              href={PHONE_TEL}
              className="mt-3 inline-flex items-center gap-3 text-2xl font-black text-[#1c1a18] transition-colors duration-300 hover:text-[#f5f2ee] md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.8 2.5A17 17 0 0 1 3.5 5.8 2.5 2.5 0 0 1 6 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              {PHONE}
            </a>
            <p
              className="mt-3 text-sm text-[#1c1a18]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Evenings and weekends are fine.
            </p>
          </div>
        </motion.div>

        {/* ── the form ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={reduce ? { duration: 0 } : { duration: 0.65, delay: 0.08, ease: EASE }}
        >
          {sent ? (
            <div
              ref={doneRef}
              tabIndex={-1}
              role="status"
              className="rounded-lg border border-[#1c1a18]/25 bg-[#faf9f5] px-6 py-10 text-center outline-none"
            >
              <p
                className="mb-3 text-2xl font-black uppercase text-[#5f5f3d]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Got it
              </p>
              <p
                className="leading-relaxed text-[#4a4840]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                We&rsquo;ll be in touch shortly with a price for the
                {form.service ? ` ${form.service.toLowerCase()}` : " work"}.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-6">
              {/* which trade */}
              <div>
                <label htmlFor="service" className={labelClass} style={{ fontFamily: "var(--font-heading)" }}>
                  What you need
                </label>
                {/* A native <select> draws its list with the operating
                    system, which no CSS can reach. This is Base UI's select:
                    same keyboard behaviour and ARIA, a popup we own. */}
                <Select.Root
                  value={form.service || null}
                  onValueChange={(value) => change("service", (value as string) ?? "")}
                  onOpenChange={(open) => {
                    if (!open) blur("service")
                  }}
                >
                  <Select.Trigger
                    id="service"
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    className={`${fieldClass} ${borderFor("service")} flex items-center justify-between gap-3 text-left data-[popup-open]:border-[#1c1a18]`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <Select.Value
                      placeholder={
                        <span className="text-[#8d887f]">Choose one&hellip;</span>
                      }
                    />
                    <Select.Icon className="shrink-0 transition-transform duration-200 data-[popup-open]:-rotate-180">
                      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
                        <path
                          d="M1 1l6 6 6-6"
                          stroke="#1c1a18"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Positioner
                      sideOffset={8}
                      alignItemWithTrigger={false}
                      className="z-50 outline-none"
                    >
                      <Select.Popup
                        className="max-h-[var(--available-height)] w-[var(--anchor-width)] overflow-y-auto rounded-md border border-[#6f6f47] bg-[#faf9f5] p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.45)] outline-none origin-[var(--transform-origin)] transition-[transform,opacity] duration-200 data-[starting-style]:scale-98 data-[starting-style]:opacity-0 data-[ending-style]:scale-98 data-[ending-style]:opacity-0"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {ENQUIRY_SERVICES.map((option) => (
                          <Select.Item
                            key={option}
                            value={option}
                            className="flex cursor-pointer select-none items-center justify-between gap-3 rounded px-3.5 py-2.5 text-[#1c1a18] outline-none transition-colors duration-150 data-[highlighted]:bg-[#e8e5db] data-[selected]:font-bold data-[selected]:text-[#5f5f3d]"
                          >
                            <Select.ItemText>{option}</Select.ItemText>
                            <Select.ItemIndicator className="shrink-0">
                              <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden>
                                <path
                                  d="M1 5.5L5 9.5L13 1.5"
                                  stroke="#5f5f3d"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
                {errors.service && (
                  <p id="service-error" className="mt-2 text-sm text-[#4f190f]" style={{ fontFamily: "var(--font-body)" }}>
                    {errors.service}
                  </p>
                )}
              </div>

              {/* the question */}
              <div>
                <label htmlFor="question" className={labelClass} style={{ fontFamily: "var(--font-heading)" }}>
                  Details{" "}
                  <span className="font-normal normal-case tracking-normal text-[#1c1a18]">
                    optional
                  </span>
                </label>
                <textarea
                  id="question"
                  name="question"
                  rows={4}
                  value={form.question}
                  onChange={(e) => change("question", e.target.value)}
                  placeholder="Rough size, condition, what you already know you want…"
                  className={`${fieldClass} resize-y border-[#6f6f47]`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

              {/* phone + email */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="enquiry-phone" className={labelClass} style={{ fontFamily: "var(--font-heading)" }}>
                    Phone
                  </label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => change("phone", e.target.value)}
                    onBlur={() => blur("phone")}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
                    placeholder="(403) 000-0000"
                    className={`${fieldClass} ${borderFor("phone")}`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.phone && (
                    <p id="enquiry-phone-error" className="mt-2 text-sm text-[#4f190f]" style={{ fontFamily: "var(--font-body)" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="enquiry-email" className={labelClass} style={{ fontFamily: "var(--font-heading)" }}>
                    Email
                  </label>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => change("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "enquiry-email-error" : undefined}
                    placeholder="you@example.com"
                    className={`${fieldClass} ${borderFor("email")}`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.email && (
                    <p id="enquiry-email-error" className="mt-2 text-sm text-[#4f190f]" style={{ fontFamily: "var(--font-body)" }}>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* honeypot — off-screen, never shown, never announced */}
              <div className="absolute left-[-9999px]" aria-hidden>
                <label htmlFor="enquiry-company">Company</label>
                <input
                  id="enquiry-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              {sendError && (
                <div
                  role="alert"
                  className="rounded-md border border-[#7d2e1c]/50 bg-[#faf9f5] px-5 py-5"
                >
                  <p className="text-[#4f190f]" style={{ fontFamily: "var(--font-body)" }}>
                    {sendError}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={PHONE_TEL}
                      className="inline-flex items-center rounded-full bg-[#1c1a18] px-5 py-2.5 text-sm font-bold text-[#f5f2ee]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Call {PHONE}
                    </a>
                    <a
                      href={mailtoFallback}
                      className="inline-flex items-center rounded-full border border-[#6f6f47] px-5 py-2.5 text-sm font-bold text-[#1c1a18]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Send as email instead
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={pending}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1c1a18] px-8 py-4 text-[#f5f2ee] transition duration-300 ease-out hover:bg-[#33301f] disabled:cursor-not-allowed disabled:opacity-60 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 sm:w-auto sm:self-start"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-[15px] font-bold uppercase tracking-[0.08em] sm:text-base">
                  {pending ? "Sending…" : "Get a price"}
                </span>
                {!pending && <Arrow />}
              </button>

              <p className="text-xs text-[#1c1a18]" style={{ fontFamily: "var(--font-body)" }}>
                Your details are used to answer this enquiry and nothing else.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
