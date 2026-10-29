# CM MainWorks website: project status and handover

**Read this first.** It is the current state of the project, and it replaces `HANDOFF.md` wherever they disagree. `HANDOFF.md` is the original brief from before the build, kept for history.

- **Client:** Connor, CM MainWorks.
- **Built by:** John Bell, JB Design Agency.
- **Last updated:** October 2026.

---

## 1. Where everything is

| What | Where |
|---|---|
| Code | GitHub `johnpbell7/CM-Mainworks-` |
| Working branch | `ccr-6ec0a5e9-9pzhmk` (currently the only branch; there is no `main` yet) |
| Preview site | https://cm-mainworks.vercel.app. Vercel auto-deploys every push to the working branch |
| Pitch deck | `docs/website-pitch.pdf`: a 17-slide tour of the site for showing Connor |
| Brand guide and proposal | `docs/brand-guide.pdf` and `docs/client-proposal.pdf` |
| Stack | Next.js 16 (App Router) with TypeScript, GSAP 3 for motion, Resend for the quote email, hosted on Vercel |

To carry on in a new session, open the repo on the working branch, run `npm install` and then `npm run dev`. Check with `npx tsc --noEmit` and `npm run build` before you push. There is no lint script.

---

## 2. The aim

Connor's main business is **full home renovations, managed by one team from start to finish**. That covers:

- kitchens, bathrooms, extensions and knock-throughs
- floors, tiling, stairs, doors, skirting and architrave
- roofing and decorating

He still takes on smaller jobs (carpentry, joinery and decorating), but they are secondary.

**The pitch:**
- One team and one number to ring.
- Less stress.
- Competitive prices: fewer overheads and no days lost between trades.
- Clear and honest: written quotes, **work done in phases and invoiced phase by phase**, and **regular sit-downs** to agree and check timescales and targets.

**Tone:** Connor's own voice (I, me, my). Friendly, approachable, transparent and understanding: working with the customer to get the home they want. British English, plain words, curly apostrophes.

**The site's single job:** get people to ask for a quote. Everything leads there.

---

## 3. Decisions John has made (these override the original brief)

- **Hero:** has a CTA. On phones, a "Get a free quote" button opens the quote form below it. On desktop the form sits to the right.
- **Calls to action:** keep them to the main ones. The quote form, the sticky Call / Free quote bar on phones, and the closing "Ring me / Get a free quote" block are enough.
  - Cards are tapped as a whole.
  - Don't add "See all…", "More about…" or "Find out more" links inside sections.
  - At most one link per section.
- **Copy:** keep it short. One clear point per section intro, card line, step or benefit.
  - The long-form text that matters for SEO stays: the service page body text and item titles, the town pages and the FAQ answers.
- **Lichfield:** never mention it on generic pages. Generic pages say "the Midlands". Lichfield only appears:
  - on its own town page (`/areas/lichfield`),
  - in town lists (the footer, the contact page's areas, the areas FAQ answer),
  - in the footer address line and the invisible business schema.
- **Prices (`/prices`):**
  - Four renovation packages, plus four broad smaller-job rows. No per-door or per-room rates.
  - Every "from" price has an asterisk, explained by: "Prices are a guide and subject to seeing the job…".
  - **All figures are placeholders (`£TBC`) until Connor supplies them.** Never invent prices.
- **Homepage before and afters:** at most three sliders, taken from jobs marked `homepage: true` in `content/projects.ts` (both photos needed); placeholder slots fill the gaps until there are three. Jobs with only one photo go on the projects page as single-photo posts.
- **Photos alongside the drawings (John, 27 Oct: keep every icon and drawing, work photography in; 29 Oct: never both in one frame):**
  - Cards (service cards, the renovation trades, smaller jobs, steps) always keep the drawing (`drawingOnly`).
  - The homepage renovation feature shows the full drawing too.
  - Every other feature row (a service's intro, a town's "Homes in …") shows Connor's photo on its own (`components/Photo.tsx`). The renovations page opens with three finished rooms from three jobs in a bento (conservatory, Cannock loft room, three-bed living room), none repeated on its photo wall.
  - Proof is photos only: project pages and cards, before and afters, the six job photos under them on the homepage, and the renovations page's "A renovation, trade by trade" wall (one photo per trade, rows that share a height so none is cropped; two across on phones).
  - Floors use the herringbone floor from the Cannock garage conversion (John, 29 Oct): a landscape crop on the floors page, the whole room on the renovations photo wall.
  - Photos are calm: same rounded corners as the tiles, no shadows or frames, the section colour only as the accent.
- **Projects (27 Oct):** 14 real jobs from Connor's Facebook posts (1 Apr to 1 Oct 2026), written from his own captions, nothing added. The town appears only where he named it (Cannock, Lichfield).
- **Before and afters:** a slider only where both photos were taken from the same spot (`aligned: true`, just the panelled wall so far); otherwise the two sit side by side (`BeforeAfterSplit`). Homepage order is set by `homepage: 1–3` in `content/projects.ts`.
- **Photo files:** `scripts/photos.json` lists every published photo (job, name, crop); `python3 scripts/make-photos.py` makes the 1400px JPEGs in `public/images/projects/` (no camera or location data) and `content/photos.ts`. The originals stay in the studio (`Clients/CM MainWorks/Documents/Facebook/photos/`), not in this public repo. Every photo is checked for faces, names, house numbers and number plates first; Connor's own face is left out until he says.
- **Reviews:** no customer comment goes on the site until Connor OKs it. The bay window review (homepage and bay window page) went in before that rule and is waiting on John.
- **FAQs:** every FAQ starts closed.
- **Structure (John, 29 Oct: easier to navigate):**
  - Menu: Renovations, Recent work, Prices, About (phones add Contact). FAQs are in the footer only.
  - Renovations is the one list of services; the service pages light up Renovations in the menu.
  - Prices live on the Prices page only; the homepage and renovations page each have one line linking there.
  - The homepage dropped "One team. Less stress." and "Prices from"; smaller jobs are a line under the nine service cards.
  - The 10 job pages left are still short (about 180 to 230 words) and the SEO check calls them thin. Only Connor's own words about each job can fix that: what the customer wanted, what he found, how long it took.
- **Header:**
  - The logo lockup has "Carpentry & Construction" made legible: `scripts/make-header-logo.mjs` rescales the supplied shapes, nothing is retyped.
  - On phones the header shows just the logo and the menu, because the bottom bar has Call.
  - The logo is 42px tall on desktop and 38px on phones (John, 27 and 29 Oct: smaller).
- **Footer:** navy, with the on-navy logo, light text and gold headings.
- **Town pages** (`/areas/[slug]`, 11 towns) are in scope. They are linked from the footer only, and there is no areas hub page (`/areas` redirects to `/`).
  - Each leads with renovation work (kitchens, bathrooms, extensions), has its own write-up of the local houses and three or four questions of its own.
  - Fradley, Shenstone and Whittington (and the other villages round Lichfield) are covered on the Lichfield page; their old addresses redirect there (27 Oct).
- **Renovations page:** a full renovation is shown as every trade Connor also does on its own, joined up: nine cards in job order, each with its photo spot (John, 27 Oct).
- **Service pages:** each has "How long, and how much disruption" (`time` in `content/services.ts`). Connor's typical time on site stays `null`, and hidden, until he gives it.
- **Page changes:** a quick slide-up transition (`app/template.tsx`). The logo link always lands at the very top.
- **Intro animation:** the CM halves snap together on navy, then the page splits open. It plays once per browser session and has failsafes, so a slow phone is never left on the navy screen.

**Still true from the brief:**
- Light theme only.
- Bricolage Grotesque throughout.
- Brand tokens only.
- Logos used as supplied, or rescaled from the supplied shapes only.
- No navy buttons.
- No invented facts.

---

## 4. Site map

| Route | What it is |
|---|---|
| `/` | Home: hero and quote form, renovation feature plus all nine services (smaller jobs as a line under them), before and afters, how it works (with one link to prices), about, review, FAQs |
| `/renovations` | **The main pitch page, and the one list of services.** It covers a renovation trade by trade in photos, the usual way versus one team, every trade as a card through to its page, built in phases (with one link to prices), FAQs and the quote form |
| `/prices` | The one place for prices: packages, how pricing works, smaller jobs, price FAQs and the quote form |
| `/services/[slug]` | Nine services, under Renovations in the breadcrumb and menu. Six are renovation services: extensions, kitchens, bathrooms, staircases, roofing, and flooring-and-tiling. Three are smaller jobs: carpentry, joinery and decorating. (`/services` redirects to renovations, `/services/building` to extensions) |
| `/areas/[slug]` | 11 town pages for local SEO (the villages round Lichfield are on its page), linked from the footer |
| `/projects` and `/projects/[slug]` | Recent work: every real job on the projects page; a job with four or more photos also gets its own page (11 now), the others are shown in full at `/projects#<slug>` |
| `/about`, `/faqs`, `/contact`, `/privacy` | As named |
| `/logo-animation` | Unlinked page used to render the square logo video |

---

## 5. Where things live

| Path | What it holds |
|---|---|
| `content/site.ts` | Business details, the service list (`sections`, with groups `renovation` and `smaller`), the job types in the quote form, and the nav |
| `content/services.ts` | Copy for each service page |
| `content/prices.ts` | Packages, smaller-job rows and the price note. Prices are `null` until Connor confirms them |
| `content/faqs.ts` | All FAQs (home, renovations, prices, the full list) |
| `content/areas.ts` | Town page copy |
| `content/projects.ts` | Connor's jobs. One entry per job feeds the projects page, its service and town pages (matched by `place`) and the homepage (`homepage: 1–3`); `hasPage` (four or more photos) decides which get their own page and sitemap entry, and `projectHref` where each links |
| `content/media.ts` | Every photo slot and `photo()`, which looks up one of Connor's photos by job and name. Where photos and drawings go is written at the top |
| `scripts/photos.json`, `scripts/make-photos.py` | The published photos and the script that makes their web copies |
| `components/` | Header, Footer, MobileMenu, MobileBar, QuoteForm, Intro, Motion (GSAP scroll reveals, set up lazily for speed), Illustration (all drawings), Phases, PackageCard, BeforeAfter, BeforeAfterSplit, ProjectGrid, FaqList and others |
| `lib/seo.tsx` | `pageMeta()`, breadcrumb and FAQ schema |
| `app/api/quote/route.ts` | The quote form handler (Resend email, honeypot, rate limit) |

---

## 6. Waiting on Connor

1. **"From" prices** for every package and smaller-job row (`content/prices.ts`).
2. **Photos.** 14 jobs are in from his Facebook (27 Oct). Still wanted:
   - a portrait of Connor (none of the Facebook photos show him clearly, and his face stays off until he says),
   - before and after pairs taken from the same spot, so more of them can be sliders,
   - finished photos of the garage and porch, a tiling job, and a bathroom,
   - a line or two from him per job (they're short at about 200 words each).
3. **A read-through of the wording**, including:
   - which trades he organises (electrics, plumbing, plastering, gas),
   - exactly what roofing he takes on,
   - whether he helps with plans and approvals for extensions,
   - "over 10 years" (taken from his Facebook).
4. **A domain**, so the site can go live and the quote form can send from it. (The email quotes go to is confirmed: his business Gmail, John 29 Oct.)

Confirmed so far: he's insured; he runs a team, with labourers he trusts; he covers the wider Midlands; renovations are his main focus; work is done in phases and invoiced phase by phase.

---

## 7. Going live (only when John says "launch")

1. Point the real domain at the Vercel project, and make the launch branch the production branch (or merge into `main` and use that).
2. Set the Vercel environment variables:
   - `NEXT_PUBLIC_SITE_URL` (the real domain)
   - `NEXT_PUBLIC_ALLOW_INDEXING=true`. Until this is set, the site tells Google not to index it, which is why Lighthouse SEO shows 69 on the preview
   - `RESEND_API_KEY`
   - `QUOTE_TO_EMAIL` (Connor's business Gmail, in the studio's client sheet; kept out of this public repo)
   - `QUOTE_FROM_EMAIL`
3. Send a test quote, then submit the sitemap (`/sitemap.xml`) in Google Search Console.

**Health at last check:** phone speed is in the 90s, desktop speed 100, accessibility 100 and best practices 100. SEO is 100 apart from the deliberate noindex.

---

## 8. Useful scripts

| Command | What it does |
|---|---|
| `node scripts/make-header-logo.mjs` | Rebuilds the header logo lockup |
| `node scripts/render-logo-video.mjs http://localhost:3000` | Re-renders `brand/animation/cm-logo-animation-square.mp4` |
