"use server"

import { Resend } from "resend"
import { business } from "@/lib/site"

// Where leads land. Defaults to the public business inbox; override with
// LEAD_TO_EMAIL once a dedicated domain mailbox exists.
const TO_EMAIL = process.env.LEAD_TO_EMAIL || business.email

// Resend only allows a custom From address once the sending domain is verified.
// Until then their shared sender delivers fine — swap via LEAD_FROM_EMAIL.
const FROM_EMAIL =
  process.env.LEAD_FROM_EMAIL || "Inside The House <onboarding@resend.dev>"

// Caps keep a malicious payload from turning into a multi-megabyte email.
const MAX = { name: 100, phone: 40, email: 200, message: 2000 } as const

// Deliberately loose: a strict RFC regex rejects valid addresses, and the real
// proof an address works is the reply landing. We only block obvious typos.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export type LeadInput = {
  name: string
  phone: string
  email: string
  message: string
  // Honeypot — hidden from real users, bots fill it in.
  company?: string
}

export type LeadResult = { ok: true } | { ok: false; error: string }

// Never surface internal failures to the visitor — give them a way to reach us.
const GENERIC_ERROR = `Something went wrong sending your request. Please call ${business.phone} — we'll pick up.`

// User input lands inside an HTML email, so escape it.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function sendLead(input: LeadInput): Promise<LeadResult> {
  // Report success to bots so they don't retry, but send nothing.
  if (input.company?.trim()) return { ok: true }

  const name = (input.name ?? "").trim().slice(0, MAX.name)
  const phone = (input.phone ?? "").trim().slice(0, MAX.phone)
  // Lowercased so the reply-to header is clean regardless of how it was typed.
  const email = (input.email ?? "").trim().toLowerCase().slice(0, MAX.email)
  const message = (input.message ?? "").trim().slice(0, MAX.message)

  // The client-side checks are for UX only — validate again here.
  if (name.length < 2) {
    return { ok: false, error: "Please enter your name." }
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return { ok: false, error: "Please enter a valid phone number." }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Log the lead so it is recoverable from Vercel logs instead of lost.
    console.error("[sendLead] RESEND_API_KEY missing — lead not delivered:", { name, phone, email })
    return { ok: false, error: GENERIC_ERROR }
  }

  const receivedAt = new Date().toLocaleString("en-CA", {
    timeZone: "America/Edmonton",
    dateStyle: "medium",
    timeStyle: "short",
  })

  const tel = phone.replace(/[^\d+]/g, "")
  const messageHtml = message
    ? escapeHtml(message).replace(/\n/g, "<br>")
    : "<em>No message provided</em>"

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      // Hitting Reply in the inbox answers the customer, not Resend.
      replyTo: email,
      subject: `New quote request — ${name}`,
      text: [
        `New quote request from ${business.name} website`,
        ``,
        `Name:    ${name}`,
        `Phone:   ${phone}`,
        `Email:   ${email}`,
        `Message: ${message || "(none)"}`,
        ``,
        `Received: ${receivedAt} (Calgary time)`,
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px">
          <h2 style="margin:0 0 4px">New quote request</h2>
          <p style="margin:0 0 20px;color:#6a6460;font-size:14px">
            ${escapeHtml(receivedAt)} &middot; Calgary time
          </p>
          <table style="border-collapse:collapse;width:100%;font-size:15px">
            <tr>
              <td style="padding:8px 0;color:#6a6460;width:90px">Name</td>
              <td style="padding:8px 0"><strong>${escapeHtml(name)}</strong></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6a6460">Phone</td>
              <td style="padding:8px 0">
                <a href="tel:${escapeHtml(tel)}" style="color:#8a8a5c"><strong>${escapeHtml(phone)}</strong></a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6a6460">Email</td>
              <td style="padding:8px 0">
                <a href="mailto:${escapeHtml(email)}" style="color:#8a8a5c"><strong>${escapeHtml(email)}</strong></a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6a6460;vertical-align:top">Message</td>
              <td style="padding:8px 0">${messageHtml}</td>
            </tr>
          </table>
        </div>
      `,
    })

    if (error) {
      console.error("[sendLead] Resend rejected the email:", error, { name, phone, email })
      return { ok: false, error: GENERIC_ERROR }
    }

    return { ok: true }
  } catch (err) {
    console.error("[sendLead] Unexpected failure:", err, { name, phone, email })
    return { ok: false, error: GENERIC_ERROR }
  }
}
