"use client"

import { useState } from "react"
import { motion } from "motion/react"

const EASE = [0.25, 0.46, 0.45, 0.94] as const

// ─── Contact details (placeholders — swap for real data later) ───────────────
const PHONE = "+1 (403) 000-0000"
const PHONE_TEL = `tel:${PHONE.replace(/\D/g, "")}`
const EMAIL = "insidethehouseca@gmail.com"
const INSTAGRAM_URL = "https://www.instagram.com/insidethehouse_renovations"
const WHATSAPP_URL = `https://wa.me/${PHONE.replace(/\D/g, "")}`

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.82c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.13-1.13l-.29-.17-3.11.82.83-3.04-.19-.31a8.02 8.02 0 0 1-1.24-4.28c0-4.46 3.63-8.09 8.1-8.09Zm-4.68 4.9c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.66 0 .98.72 1.93.82 2.06.1.13 1.4 2.14 3.4 3 .47.2.84.33 1.13.42.47.15.9.13 1.24.08.38-.06 1.16-.47 1.33-.93.16-.46.16-.85.11-.93-.05-.08-.18-.13-.38-.23-.2-.1-1.16-.57-1.34-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.15-.42.05-.2-.1-.83-.31-1.58-.98-.58-.52-.98-1.16-1.09-1.36-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.44-1.08-.61-1.48-.16-.38-.32-.33-.44-.34l-.38-.01Z" />
  </svg>
)

type FormFields = { name: string; phone: string; message: string }
type FormErrors = Partial<Record<keyof FormFields, string>>

// Требуем как минимум 7 цифр в номере (без учёта +, скобок, пробелов, дефисов)
const PHONE_RE = /^[+]?[\d\s()-]{7,}$/

function validate(form: FormFields): FormErrors {
  const errors: FormErrors = {}

  if (!form.name.trim()) {
    errors.name = "Please enter your name."
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters."
  }

  const phone = form.phone.trim()
  const digits = phone.replace(/\D/g, "")
  if (!phone) {
    errors.phone = "Please enter your phone number."
  } else if (!PHONE_RE.test(phone) || digits.length < 7) {
    errors.phone = "Please enter a valid phone number."
  }

  return errors
}

export function Contact() {
  const [form, setForm] = useState<FormFields>({ name: "", phone: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Убираем ошибку поля, как только пользователь его правит
    setErrors((prev) => (prev[name as keyof FormFields] ? { ...prev, [name]: undefined } : prev))
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name as keyof FormFields
    const fieldError = validate(form)[field]
    setErrors((prev) => ({ ...prev, [field]: fieldError }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return
    // TODO: подключить Resend, когда будут данные почты
    setSubmitted(true)
  }

  const inputBase =
    "w-full bg-[#faf9f5] border rounded-md px-4 py-3.5 text-[#1c1a18] placeholder-[#9a9690] focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
  const inputStateClasses = (field: keyof FormFields) =>
    errors[field]
      ? "border-[#b4402f] focus:ring-[#b4402f]"
      : "border-[#c4c0b8] focus:ring-[#8a8a5c]"

  return (
    <section className="relative min-h-screen bg-[#eae6df] pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-2xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#8a8a5c]/50" />
            <span
              className="text-[#8a8a5c] text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Free · No-Obligation Quote
            </span>
          </div>
          <h1
            className="text-[44px] md:text-[64px] font-black uppercase leading-[0.92] text-[#1c1a18]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Let&rsquo;s Talk About<br />
            <span className="text-[#8a8a5c]">Your Project</span>
          </h1>
          <p
            className="mt-5 text-base text-[#6a6460] leading-relaxed max-w-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            No shortcuts, no hidden surprises. Leave your details and we&rsquo;ll get
            back to you with honest pricing and a reliable timeline.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
        >
          {submitted ? (
            <div
              className="rounded-md border border-[#8a8a5c]/40 bg-[#faf9f5] px-6 py-8 text-center"
              role="status"
            >
              <p
                className="text-2xl font-bold uppercase text-[#8a8a5c] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Thank you!
              </p>
              <p
                className="text-[#6a6460]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                We&rsquo;ve received your request and will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs font-bold uppercase tracking-[0.15em] text-[#6a6460]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`${inputBase} ${inputStateClasses("name")}`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-sm text-[#b4402f]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-xs font-bold uppercase tracking-[0.15em] text-[#6a6460]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+1 (403) 000-0000"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`${inputBase} ${inputStateClasses("phone")}`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="text-sm text-[#b4402f]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-bold uppercase tracking-[0.15em] text-[#6a6460]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project (optional)"
                  className={`${inputBase} border-[#c4c0b8] focus:ring-[#8a8a5c] resize-none`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-3 bg-[#8a8a5c] text-[#f5f2ee] px-7 py-4 mt-1 group hover:bg-[#7a7a4e] transition-colors duration-300 rounded-md"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-sm font-black uppercase tracking-[0.15em]">
                  Send Request
                </span>
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <ArrowIcon />
                </span>
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact + social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
          className="mt-12 pt-10 border-t border-[#c4c0b8]"
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a9690] mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Or reach us directly
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#8a8a5c]/40 text-[#8a8a5c] hover:text-[#f5f2ee] hover:bg-[#8a8a5c] hover:border-[#8a8a5c] transition-colors duration-300"
              >
                <InstagramIcon />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-[#8a8a5c]/40 text-[#8a8a5c] hover:text-[#f5f2ee] hover:bg-[#8a8a5c] hover:border-[#8a8a5c] transition-colors duration-300"
              >
                <WhatsAppIcon />
              </a>
            </div>

            {/* Phone + email */}
            <div
              className="flex flex-col gap-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <a
                href={PHONE_TEL}
                className="text-base font-bold text-[#1c1a18] hover:text-[#8a8a5c] transition-colors"
              >
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm text-[#6a6460] hover:text-[#8a8a5c] transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
