// Shared between the Additional Services form and the server action that
// mails it. It cannot live in app/actions.ts: a "use server" module may only
// export async functions, so a plain list or type there would fail the build.

export const ENQUIRY_SERVICES = [
  "Painting",
  "Flooring",
  "Drywall & repairs",
  "Kitchens",
  "More than one of these",
  "Not sure yet",
] as const

export type EnquiryService = (typeof ENQUIRY_SERVICES)[number]

export type EnquiryInput = {
  service: string
  question: string
  email: string
  phone: string
  // Honeypot — hidden from real users, bots fill it in.
  company?: string
}

export type EnquiryResult = { ok: true } | { ok: false; error: string }

export function isEnquiryService(value: string): value is EnquiryService {
  return (ENQUIRY_SERVICES as readonly string[]).includes(value)
}
