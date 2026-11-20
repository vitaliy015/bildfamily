"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"

// Not a secret: the pixel id is visible in the page source of every site that
// runs one, and Meta identifies the account by it rather than authenticating
// with it. Kept here instead of in an env var so a deploy cannot silently lose
// it and leave the ad spend untracked.
const PIXEL_ID = "663031569543244"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Meta Pixel, for the paid traffic being pointed at this site.
 *
 * Two things the snippet Meta hands out does not handle on its own:
 *
 * 1. `afterInteractive`, not `beforeInteractive`. The home page already misses
 *    its LCP budget and the headline is the paint that decides it, so nothing
 *    new is allowed to compete for the main thread before that paint. This
 *    loads once hydration is under way.
 * 2. Navigation inside the site is client-side — the nav and footer use
 *    `next/link`, so moving from the home page to /works or /contact never
 *    reloads the document and the snippet's one PageView would be the only one
 *    Meta ever sees. The effect below fires the rest.
 * 3. `autoConfig` off. Left on, Meta's Automatic Advanced Matching reads
 *    contact details out of the page and sends them along as user data — and
 *    on this site what it finds is the company's OWN address and number, which
 *    are printed in the footer. Verified in the browser: `fbq.getState()`
 *    came back carrying `insidethehouseca@gmail.com` and the business phone as
 *    `userDataWebsiteVariables`. Every visitor would have been reported to Meta
 *    as the same person, which is worse for ad matching than sending nothing,
 *    and the same feature reads what visitors type into the quote form.
 *    Turning it off also drops Meta's automatic button-click events; PageView
 *    here is explicit, so nothing we rely on is lost.
 */
/**
 * Reports a submitted quote request so Meta has something worth optimising
 * for. Without it the only signal the ad account gets is PageView, and the
 * algorithm goes looking for people who browse rather than people who ask for
 * a price.
 *
 * Carries no personal information on purpose — see `autoConfig` above. The
 * labels only say which form it was and, for the add-on form, which trade,
 * which is enough to break the reporting down in Events Manager.
 */
export function trackLead(detail: { form: string; service?: string }) {
  window.fbq?.("track", "Lead", {
    content_name: detail.form,
    ...(detail.service ? { content_category: detail.service } : {}),
  })
}

export function MetaPixel() {
  const pathname = usePathname()
  const landing = useRef(true)

  useEffect(() => {
    // The init snippet already reported the page the visitor arrived on;
    // counting it twice would inflate every landing page in Events Manager.
    if (landing.current) {
      landing.current = false
      return
    }
    window.fbq?.("track", "PageView")
  }, [pathname])

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('set', 'autoConfig', false, '${PIXEL_ID}');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>

      {/* Counts visitors with JavaScript off. It has to be a plain <img>: it is
          a tracking request, not artwork, and next/image would rewrite the URL
          through the optimizer and never reach Meta. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hidden"
          height="1"
          width="1"
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
