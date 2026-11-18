/**
 * Sends a real test lead through both live forms and reports whether each one
 * was delivered.
 *
 * The forms have silently broken before, and nothing short of an end-to-end
 * send proves they work: the page renders, the server action exists and the
 * Resend key authenticates even when delivery is failing. So this drives the
 * actual pages in a real browser, fills them like a visitor and waits for the
 * confirmation the visitor would see.
 *
 *   npm run smoke:forms                 # production
 *   npm run smoke:forms -- http://localhost:3000
 *
 * Both submissions are stamped "WEBSITE TEST" and carry the run's timestamp,
 * so they are obvious in the inbox and can be deleted without a second look.
 *
 * Needs Google Chrome installed. Nothing here runs in the app.
 */

import { spawn } from "node:child_process"
import { mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const args = process.argv.slice(2)
// --only=main | --only=extra, so re-running after a fix does not mail both.
const only = (args.find((a) => a.startsWith("--only=")) || "").split("=")[1] || "both"
const BASE = args.find((a) => !a.startsWith("--")) || "https://insidethehouseca.com"
const PORT = 9412
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

const stamp = new Date().toLocaleString("en-CA", {
  timeZone: "America/Edmonton",
  dateStyle: "short",
  timeStyle: "short",
})

/* ── CDP plumbing ──────────────────────────────────────────────────────── */

let msgId = 0

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const sock = new WebSocket(wsUrl)
    sock.onopen = () => resolve(sock)
    sock.onerror = reject
  })
}

function send(sock, method, params = {}) {
  const id = ++msgId
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`CDP timeout: ${method}`)),
      30_000,
    )
    const onMessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id !== id) return
      clearTimeout(timer)
      sock.removeEventListener("message", onMessage)
      if (msg.error) reject(new Error(`${method}: ${msg.error.message}`))
      else resolve(msg.result)
    }
    sock.addEventListener("message", onMessage)
    sock.send(JSON.stringify({ id, method, params }))
  })
}

async function evaluate(sock, expression) {
  const r = await send(sock, "Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  })
  if (r.exceptionDetails) {
    throw new Error(r.exceptionDetails.exception?.description || "eval failed")
  }
  return r.result.value
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/* ── filling React-controlled fields ───────────────────────────────────── */

// Assigning to .value does not notify React: it caches the previous value on
// the DOM node and skips the change. Calling the prototype's native setter and
// dispatching the event is what a real keystroke ends up doing.
const SET_FIELD = `
  window.__set = (selector, value) => {
    const el = document.querySelector(selector)
    if (!el) throw new Error("missing field: " + selector)
    const d = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value")
    if (!d || !d.set) throw new Error("not a text field: " + selector)
    d.set.call(el, value)
    el.dispatchEvent(new Event("input", { bubbles: true }))
    el.dispatchEvent(new Event("change", { bubbles: true }))
    return true
  }
`

/* ── one form ──────────────────────────────────────────────────────────── */

async function runForm(sock, { label, path, picker, fields, submitText }) {
  process.stdout.write(`\n${label}\n  ${BASE}${path}\n`)

  await send(sock, "Page.navigate", { url: BASE + path })
  await send(sock, "Page.loadEventFired").catch(() => {})
  await sleep(2500) // hydration — the handlers are useless before it

  await evaluate(sock, SET_FIELD)

  // A Base UI Select is a button plus a popup rendered in a portal — there is
  // no value to assign, so it has to be opened and clicked like a person would.
  if (picker) {
    await evaluate(sock, `document.querySelector(${JSON.stringify(picker.trigger)}).click()`)
    await sleep(600)
    const picked = await evaluate(
      sock,
      `(() => {
        const opt = [...document.querySelectorAll("[role=option]")]
          .find(o => o.textContent.trim() === ${JSON.stringify(picker.option)});
        if (!opt) return false;
        opt.click();
        return true;
      })()`,
    )
    if (!picked) return { ok: false, detail: `option "${picker.option}" not found in the dropdown` }
    await sleep(400)
  }

  for (const [selector, value] of Object.entries(fields)) {
    await evaluate(sock, `window.__set(${JSON.stringify(selector)}, ${JSON.stringify(value)})`)
  }
  await sleep(300)

  const clicked = await evaluate(
    sock,
    `(() => {
      const btn = [...document.querySelectorAll("button[type=submit]")]
        .find(b => b.textContent.toLowerCase().includes(${JSON.stringify(submitText.toLowerCase())}));
      if (!btn) return false;
      btn.click();
      return true;
    })()`,
  )
  if (!clicked) return { ok: false, detail: `submit button "${submitText}" not found` }

  // Both outcomes are announced through ARIA and nothing else on the site uses
  // those roles: role="status" is the thank-you that replaces the form,
  // role="alert" is the delivery failure. Matching on the visible wording
  // instead looked like a failure once when the confirmation was real — the
  // block sits inside a whileInView wrapper, and innerText is unreliable for
  // content the viewport has not reached.
  for (let i = 0; i < 40; i++) {
    await sleep(500)
    const state = await evaluate(
      sock,
      `(() => {
        const ok = document.querySelector("[role=status]");
        if (ok && ok.textContent.trim()) return "ok:" + ok.textContent.trim().replace(/\\s+/g, " ");
        const bad = document.querySelector("[role=alert]");
        if (bad && bad.textContent.trim()) return "err:" + bad.textContent.trim().replace(/\\s+/g, " ");
        return "";
      })()`,
    )
    if (state.startsWith("ok:")) {
      return { ok: true, detail: `${((i + 1) * 0.5).toFixed(1)}s — "${state.slice(3)}"` }
    }
    if (state.startsWith("err:")) return { ok: false, detail: state.slice(4) }
  }
  return { ok: false, detail: "no confirmation and no error after 20s" }
}

/* ── run ───────────────────────────────────────────────────────────────── */

const profile = mkdtempSync(join(tmpdir(), "smoke-forms-"))
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--no-first-run",
    "--hide-scrollbars",
    "about:blank",
  ],
  { stdio: "ignore" },
)

let failed = false
try {
  let target
  for (let i = 0; i < 40; i++) {
    await sleep(250)
    try {
      target = await (
        await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })
      ).json()
      break
    } catch {
      /* not up yet */
    }
  }
  if (!target) throw new Error("Chrome did not start")

  const sock = await connect(target.webSocketDebuggerUrl)
  await send(sock, "Page.enable")
  await send(sock, "Runtime.enable")

  const results = []

  if (only === "both" || only === "main") results.push([
    "Main quote form",
    await runForm(sock, {
      label: "Main quote form  (Contact.tsx → sendLead)",
      path: "/contact",
      fields: {
        "#name": `WEBSITE TEST ${stamp}`,
        "#phone": "+1 403 000 0000",
        "#email": "website-test@example.com",
        "#message":
          `Automated check that the contact form still delivers. Sent ${stamp} Calgary time. No reply needed — safe to delete.`,
      },
      submitText: "send request",
    }),
  ])

  if (only === "both" || only === "extra") results.push([
    "Additional work form",
    await runForm(sock, {
      label: "Additional work form  (ServiceEnquiry.tsx → sendServiceEnquiry)",
      path: "/additional-services#ask",
      picker: { trigger: "#service", option: "Painting" },
      fields: {
        "#question":
          `Automated check that the additional-services form still delivers. Sent ${stamp} Calgary time. No reply needed — safe to delete.`,
        "#enquiry-phone": "+1 403 000 0000",
        "#enquiry-email": "website-test@example.com",
      },
      submitText: "get a price",
    }),
  ])

  console.log("\n" + "─".repeat(64))
  for (const [name, r] of results) {
    console.log(`${r.ok ? "PASS" : "FAIL"}  ${name.padEnd(24)} ${r.detail}`)
    if (!r.ok) failed = true
  }
  console.log("─".repeat(64))
  console.log(
    failed
      ? "\nAt least one form did not deliver. Check Vercel logs for [sendLead] / [sendServiceEnquiry]."
      : `\nBoth delivered. Two emails stamped "${stamp}" are in the inbox — delete them.`,
  )
} catch (err) {
  failed = true
  console.error("\nSmoke test could not run:", err.message)
} finally {
  chrome.kill()
  try { rmSync(profile, { recursive: true, force: true }) } catch {}
}

process.exit(failed ? 1 : 0)
