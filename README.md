# CM MainWorks website

Next.js (App Router) + TypeScript, deployed on Vercel. Read `CLAUDE.md` and `HANDOFF.md` first.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

## Environment variables (Vercel)

| Name | What it does |
|---|---|
| `RESEND_API_KEY` | Sends quote requests by email. Without it the form says it isn’t switched on yet and points people to phone and WhatsApp. |
| `QUOTE_TO_EMAIL` | Where leads go (waiting on Connor). |
| `QUOTE_FROM_EMAIL` | Verified sender, e.g. `CM MainWorks website <quotes@domain>`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for the sitemap, Open Graph and JSON-LD. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Set to `true` on production only. Staging stays `noindex`. |

No database is used.

## Photos

Every photo slot lives in `content/media.ts` and `content/projects.ts`. Drop the file in `public/images/`, set `src` and write the `alt`. While `src` is `null`, a labelled “Photo to come” placeholder shows instead.

## Voice

The whole site is written in Connor’s own voice (I, me, my), in plain British English. Keep new copy the same: friendly, open and plain, with short sentences and real situations. The main pitch is full renovations run by one team (less stress, competitive prices, one point of contact); smaller jobs are still welcome. No prices or claims he hasn’t confirmed.

## SEO

- Every page sets a unique title, description, canonical URL and social card through `pageMeta()` in `lib/seo.tsx`, and has exactly one H1.
- Structured data: `HomeAndConstructionBusiness` site-wide, plus `Service`, `FAQPage` and `BreadcrumbList` where they apply.
- Town pages live in `content/areas.ts` (served at `/areas/[slug]`). Each has its own copy; add a town there and it appears in the footer, the sitemap and the Areas page.
- Service page copy lives in `content/services.ts`; the list of services (renovation and smaller jobs) is in `content/site.ts`.
- `/renovations` is the main pitch page. `/prices` reads `content/prices.ts`, where every `from` is `null` (shown as “£ to confirm”) until Connor gives real figures.
- Placeholder projects are kept out of the projects page, the sitemap and search until real photos replace them.

## Where things live

- `components/Illustration.tsx` holds the section illustrations: ink line drawings over an offset block of the section colour. They stand in for photos until real ones arrive.
- `components/Intro.tsx` is the page-load animation: the CM badge halves snap together on navy, then the page splits open along a box-joint seam. It plays once per browser session and is skipped for reduced motion.
- `components/Motion.tsx` holds the GSAP scroll reveals, driven by `data-reveal` / `data-hero` attributes and `.hl` highlights.
- `components/QuoteForm.tsx` and `app/api/quote/route.ts` are the quote form and its email handler (honeypot and rate limit included).
- `content/` holds the copy, services, FAQs, projects and media.

## Logo video

`brand/animation/cm-logo-animation-square.mp4` is a 1080×1080, 5-second clip of the badge snapping together, for Connor to post. To re-render it after changing the animation, start the site and run:

```bash
node scripts/render-logo-video.mjs http://localhost:3000
```

The source page is `/logo-animation`. It isn’t linked from the site and isn’t indexed.

## Confirmed by Connor (Oct 2026)

- He’s insured.
- He brings in labourers he trusts on bigger jobs, and runs the job himself.
- He covers the wider Midlands, including Birmingham, Solihull, Leicester and Redditch.
- Main focus is full renovations, managed by him with one team: kitchens, bathrooms, roofs, floors, stairs, skirting, architrave, tiling and extensions (via John, Oct 2026).

## Still to confirm with Connor

- “From” prices for every package and room-by-room job in `content/prices.ts`.
- Which specialist trades he organises (electrics, plumbing, plastering, gas) and exactly what roofing work he takes on.
- Package contents on `/prices`, including help with plans and approvals for extensions.

- Over 10 years’ experience (taken from his pinned Facebook post).
- About copy, FAQ answers and the privacy policy wording (all drafts).
- Photos for the services, the portrait and the projects, plus the bay window “before” photo and town.
- Lead email address, domain and trading name.
