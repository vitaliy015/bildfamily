@AGENTS.md

# Inside The House — Calgary, Alberta, Canada

## Role
Claude acts as **Senior Full-Stack Developer + Web Designer + Marketing Strategist + QA Tester** on this project.
- Technical decisions → Senior Dev lens (Next.js, GSAP, Sanity, Vercel)
- Visual decisions → Web Designer lens
- Copy, positioning, offers, funnels → Marketing Strategist lens (market data from COMPETITIVE-ANALYSIS.md)
- **QA / Testing → after every block: TypeScript check, ESLint, browser render test, mobile/tablet/desktop responsive check, performance check**

Content assembled together with the client.

---

## Client Business

**Company name:** Inside The House
**Website (old):** insidethehouseca.com
**Instagram:** @insidethehouse_renovations
**Email (current):** insidethehouseca@gmail.com ← needs professional domain email
**Location:** Calgary, Alberta + surrounding areas
**Type:** Family-owned renovation company
**Experience:** 10+ years

### Team
- **Anatolii** — Owner / Lead Renovator. 10+ years hands-on experience (Canadian + international projects). Known for punctuality, precision, solution-oriented approach.
- **Nataliia** — Operations Manager. Client communication, project coordination, material sourcing, bookkeeping.

### Brand Voice
Approachable, honest, transparent. Key phrase:
> "No shortcuts, no hidden surprises — just reliable timelines, honest pricing, and craftsmanship you can trust."

Personal, family-owned feel. Not corporate. Stress-free process.

### Unique Strengths
- Flexible scheduling — evenings and weekends
- Commitment to cleanliness on every job site
- On-time, on-budget track record
- Full range: major renovations → small repairs (one company)
- Free, no-obligation quotes

---

## Services

| Service | Description |
|---------|-------------|
| **Bathroom Remodeling** | Modern tiles, custom vanities, lighting |
| **Basement Finishing** | Family room, home office, gym, guest suite — permits included |
| **Kitchen Updates** | Cabinets, countertops, backsplash, full kitchen refresh |
| **Flooring Installation** | Hardwood, laminate, tile, vinyl |
| **Drywall & Painting** | New walls, repairs, finishing |
| **Small Repairs** | Leaks, squeaks, everyday maintenance |
| **Furniture Assembly** | Leveling, quality checks |
| **Appliance / Electrical / Plumbing** | Minor installs, code-compliant |

Primary focus for new site: **Bathroom · Basement · Kitchen · Flooring**
Secondary: Drywall/Painting, Small Repairs, Handyman services

---

## Tech Stack

- **Frontend:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** GSAP 3.x — scroll-анимации, before/after слайдер
- **CMS:** Sanity v3 — заказчик редактирует контент через Sanity Studio
- **Forms:** Resend — заявки на email
- **Deploy:** Vercel
- **Analytics:** Google Analytics 4 + Search Console
- **Domain:** TBD (нужен профессиональный домен + email)

---

## Правила кода

- Один блок = `components/blocks/BlockName.tsx` + логика внутри
- GSAP логика → отдельный файл `blockName.gsap.ts` если большая
- Никаких inline-стилей (`style=""`) — только Tailwind классы
- `'use client'` только там где нужен GSAP, hover state или браузерный интерактив
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `alt` у каждого изображения (SEO + accessibility)
- TypeScript строго — никаких `any`

## Рабочий процесс (блок за блоком)

1. Пишем **десктоп-версию** блока
2. Открываем в браузере — заказчик смотрит
3. Если одобрено → добавляем **адаптив** (tablet 768px + mobile 375px)
4. **Тестируем:** TypeScript + ESLint + браузер + мобилка
5. Переходим к следующему блоку

## Брейкпоинты (Tailwind)

```
sm:  640px   (mobile landscape)
md:  768px   (tablet)
lg:  1024px  (desktop)
xl:  1280px  (wide desktop)
2xl: 1536px  (ultra wide)
```

## Google Ads совместимость

- LCP < 2.5s: Next.js Image, WebP, preload hero
- CLS < 0.1: фиксированные размеры у всех изображений
- Structured Data: JSON-LD LocalBusiness в layout.tsx
- Sitemap.xml + robots.txt
- Каждая страница услуги — уникальный URL + уникальный meta

---

## What to Build (vs Current Site Weaknesses)

| Current site problem | New site solution |
|---------------------|-------------------|
| Gmail address | Professional domain email |
| Portfolio — 48+ photos, no descriptions | Sanity CMS: each project has title, type, description, before/after photos |
| No before/after comparison | GSAP-powered before/after slider |
| No pricing info | Transparent price ranges per service type |
| No certifications/trust signals | Insurance, licenses on first screen |
| No online booking | Contact form + optional scheduling |
| No process explanation | Visual "How We Work" steps with timelines |
| No phone number visible | Phone number in header |

---

## Market Positioning

**Niche:** Home Refresh / Interior Update ($10,000 – $40,000)
All major Calgary competitors (Reborn, Ultimate, Pinnacle) work $50,000+.
Inside The House owns the underserved mid-range segment.

**Target audience:** Calgary homeowners 30–55 who want a refreshed home without a full gut renovation.

### Family Business as Competitive Advantage
Being family-owned is a core sales argument. Anatolii and Nataliia personally on every job.
- Direct accountability — you talk to the person doing the work
- Reputation is personal — family name on the line
- Care > volume
This angle must appear on hero, About section, and every offer.

---

## Competitors Studied
- **Calgary:** Reborn Renovations, Ultimate Renovations, Transform, LivingScape, Pinnacle, Trademark, Kangaroo
- **Canada-wide (reference):** SOSNA, MENATWORK, Senso Design, Easy Renovation (Toronto)
- Full analysis: see `COMPETITIVE-ANALYSIS.md` / `COMPETITIVE-ANALYSIS.pdf`
