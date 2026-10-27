# CM MainWorks: website handoff

> **Historical brief, written before the build.** For the current state, decisions and next steps, read `PROJECT-STATUS.md`.

**Client:** Connor, CM MainWorks (carpentry and construction, Lichfield)
**Designer / developer:** John, JB Design Agency
**Status:** brand approved, homepage design approved as a prototype, build not started
**Deal:** the website is free to Connor. He pays for hosting. A logo is an optional extra.

---

## 1. What's in this folder

| Path | What it is |
|---|---|
| `CLAUDE.md` | Short rules to follow on every task |
| `HANDOFF.md` | This brief |
| `prototype/index.html` | The approved homepage design, as one self-contained HTML file. This is the visual source of truth |
| `brand/tokens.css`, `brand/tokens.ts` | Colours, type and layout tokens, plus business details and section data |
| `brand/logo/main/` | Full logos: horizontal and stacked, light and navy, no-descriptor and one-colour versions |
| `brand/logo/badge/` | The CM badge on its own: main, on navy, jaunty, and two one-colour versions |
| `brand/logo/sections/` | A badge and a horizontal logo for each section (MainWorks, Carpentry, Building, Joinery, Decorating) |
| `brand/images/` | Square profile JPGs (navy and cream, 3000px) and the oak-boards hero placeholder SVG |
| `docs/brand-guide.pdf` | The brand guide Connor approved |
| `docs/client-proposal.pdf` | The proposal sent to Connor, with research, competitors and questions |

---

## 2. The brand

**Name:** CM MainWorks. This is the working trading name. Connor still has to confirm it officially (see section 10).
**Descriptor:** "Carpentry & Construction", with a capital C on Construction.
**Logo:** the CM badge, with C on navy and M on gold locked together by a box joint. "MainWorks" sits beside it in Bricolage Grotesque, with the descriptor underneath in gold. Connor's favourite is the **stacked** version.

**Logo files to use:**
- Site header: `main/cm-mainworks-horizontal-on-light.svg`, height 46px on desktop and 40px on mobile.
- Footer: the same file at 40px.
- Favicon and app icon: build from `badge/cm-badge.svg`, with a square, padded version for small sizes.
- Open Graph and social images: `images/CM-MainWorks-Logo-Square-Cream.jpg`.
- Section pages: `sections/cm-<section>-badge.svg` where a small badge helps.

**SVG note:** the logo files contain `clipPath` IDs. If you inline more than one on the same page, make the IDs unique. Alternatively, use them as `<img>` / `next/image` sources, which avoids the problem.

**Colours** (see `tokens.css`):
- **Ink #1A2238:** all text. It's a warm deep navy, a touch softer than the logo navy #16264A.
- **Gold #D9A441:** the primary button, link underlines and highlights. Use #8F6418 when gold has to be readable as text on white.
- **White, with very light grey #F5F5F4 sections:** there are no dark sections at all.
- **Section colours:**
  - **Carpentry:** oak #B07D45.
  - **Building:** steel #3D78B5.
  - **Joinery:** sage #3F7D5C.
  - **Decorating:** brick #B5473A.
- **Highlighter tints:** used for the marker-pen highlight behind key words, in the style of jbdesignagency.co.uk.

**Type:** Bricolage Grotesque, weights 400 to 700, for everything.
- **Headings:** weight 700, letter-spacing about −0.035em to −0.045em, line-height about 1.
- **Body:** 17px, line-height 1.6.

**Design principles (from client feedback):**
1. **Light and airy.** White space does the work. Sections are separated by hairlines or the light grey, never by heavy colour blocks.
2. **Calm.** No cards with shadows, no badges or chips, no marquees, no gradients. The client called the busier versions "very AI".
3. **Colour comes from the sections.** Each service carries its own colour, used in the photo tint, the highlight and the underline. Gold stays scarce.
4. **One highlight per section, at most.** It's a light marker-pen tint behind a key phrase.
5. **Photos lead.** The design is built around Connor's own job photos. Until they arrive, use labelled placeholders.

---

## 3. Site map

Area and town SEO pages are **out of scope for now**.

| Page | Route | Notes |
|---|---|---|
| Home | `/` | Build first, to match the prototype |
| Services | `/services` | Overview of the four sections |
| Carpentry / Building / Joinery / Decorating | `/services/[slug]` | Each themed in its section colour |
| Recent work | `/projects` | Grid of projects, filterable by section |
| Project detail | `/projects/[slug]` | Photos, a before/after slider, short write-up |
| About | `/about` | Connor's story |
| FAQs | `/faqs` | The homepage carries four. The full list lives here |
| Contact | `/contact` | The quote form, phone, WhatsApp and area covered |
| Privacy policy | `/privacy` | **Required**, because the form collects personal data and photos |
| Not found | `not-found.tsx` | Branded 404 page |

**Navigation:** Services, Recent work, About, FAQs, plus the phone number on the right.

**Footer:** the logo, the same links, "Back to top" and © CM MainWorks. Add a Privacy link once the page exists, and a Facebook link if Connor wants one.

---

## 4. Homepage spec, top to bottom

Match `prototype/index.html`. Copy below is draft unless marked as confirmed.

1. **Header.** Sticky and white, with a hairline appearing on scroll. Logo on the left, nav and phone (07742 135592) on the right. On mobile, the nav is hidden and only the logo and phone show.
2. **Hero.** Two columns on desktop, stacked on mobile.
   - **Left:**
     - **Headline:** "Carpentry and construction, **done properly.**", with a gold highlight on "done properly."
     - **Line:** "Doors, staircases, kitchens, fitted furniture and building work across Lichfield and the villages around it."
     - **Image:** 16:10 on desktop and 4:3 on mobile, showing the oak-boards placeholder until a real photo arrives.
   - **No calls to action in the hero.**
   - **Right:** the quote form (section 5).
3. **Services.**
   - **Heading:** "Services", with the line "From a single door to a full extension, with **one person looking after the job** from start to finish."
   - **Four columns**, each with:
     - **Photo:** 4:5, tinted in the section colour.
     - **Name:** highlighted in its tint.
     - **One line** from `tokens.ts`.
     - **Link:** "Ask about carpentry" (and so on), underlined in the section colour. It scrolls to the form and pre-selects that type of work.
   - **Mobile:** a horizontal scroll-snap row with the next card peeking in.
4. **Recent work** (light grey section).
   - **Left:** a before/after slider. It's keyboard accessible, with a range input, a white divider line and a round knob.
   - **Right:** two project photos.
   - **Captions:** "Project name" plus the section name in its colour.
   - **Mobile:** the slider stacks, and the two photos scroll horizontally.
5. **How it works.** Three steps on thin rules coloured oak, steel and sage, numbered 01 to 03.
   - **1. Send a few photos:** use the form or WhatsApp.
   - **2. Get a clear price:** Connor looks, visits if needed, and gives a written quote.
   - **3. The job, done properly:** work starts on the agreed date, and the place is left tidy.
   - **Line beside the heading:** "You know **the price before any work starts**." (steel highlight).
6. **About.** A portrait photo, 4:5, next to the heading "Hi, I'm Connor." and two short paragraphs, then the CM badge. The sage highlight goes on "do one job properly than rush three". **The copy is a draft for Connor to approve.**
7. **Reviews** (light grey section). One large quote. It's a placeholder until Google reviews exist: **do not invent reviews.** Later, pull them in from his Google Business Profile.
8. **FAQs.** Four questions in two columns, each with a 2px top rule in a section colour:
   - Do you take on small jobs?
   - Is the quote free?
   - Do you supply materials?
   - Which areas do you cover?
9. **Closing.** A large "Got a **job in mind?**" with three underlined links: call, WhatsApp and get a free quote.
10. **Footer.** One row.
11. **Mobile bar.** Fixed to the bottom of the screen, with "Call" (outline) and "Free quote" (gold). Allow for the iPhone safe-area inset at the bottom.

**Motion:** a single gentle fade-up on load for the hero only. Respect `prefers-reduced-motion`.

---

## 5. The quote form

**Fields:**
- **Name:** required.
- **Phone:** required, a UK number.
- **Postcode:** required, UK format.
- **Type of work:** a dropdown with Carpentry, Building, Joinery, Decorating and Something else.
- **About the job:** optional.
- **Photos:** optional, up to 6 images.

**Style:** underline fields with no boxes, and a full-width gold "Send request" button. Under the button: "Your details are only used to reply about your job."

**Behaviour:**
- **Validation:** inline on blur, with specific error messages. Focus moves to the first error on submit.
- **States:** a loading state ("Sending…"), then a success state: "Thanks, {first name}. Your request is with Connor. He'll call you on {phone}." Errors must be specific, never vague.

**Backend:**
- **Delivery:** a Next.js Server Action or route handler. Email each lead to Connor with something like Resend.
- **Photos:** compress or resize them, then attach them or upload to Vercel Blob and include the links.
- **Spam protection:** a honeypot field plus rate limiting, or Cloudflare Turnstile.
- **Storing leads:** optional. Email only is fine. If you do store leads in Supabase, **flag the schema change first.**
- **Data handling:** don't log personal data. Link the privacy policy near the button.

The prototype's form doesn't submit anywhere. It only shows the success state.

---

## 6. Technical requirements

- **Framework:** Next.js App Router with TypeScript. Server components by default, and client components only for the form, the slider and the header scroll state.
- **Styling:** CSS Modules or global CSS driven by `tokens.css`. Tailwind is fine if it's the repo standard, but map it to the tokens. No hard-coded colours.
- **Images:** `next/image`, AVIF/WebP, with `sizes` set. Use descriptive alt text and placeholder blur where appropriate.
- **Performance:** aim for 90+ on a mobile Lighthouse test.
  - LCP under 2.5s, INP under 200ms, CLS under 0.1.
  - The hero image is the likely LCP element, so give it priority loading.
- **Accessibility:**
  - Semantic landmarks and a skip link.
  - Visible focus states (gold outline).
  - Labels on every input, and errors linked with `aria-describedby`.
  - Colour contrast AA. Check gold used as text: use #8F6418 on white.
- **SEO basics** (even without area pages):
  - Per-page metadata, `sitemap.xml` and `robots.txt`.
  - LocalBusiness JSON-LD with name, phone, area served (the Lichfield area) and logo.
  - Open Graph image.
- **Content:** hard-coded content files to start, such as `content/services.ts` and `content/projects.ts`. Sanity can come later if Connor wants to edit things himself.
- **Analytics:** optional. Vercel Analytics, or nothing.

---

## 7. Workflow (staging first)

1. **Repo:** create the repo under `johnpbell7` and connect it to Vercel.
2. **Environments:** production is the `main` branch. Staging is a working branch served at `staging.<domain>` (a Vercel branch domain plus a CNAME at the registrar).
3. **Day to day:** build and push to staging, then tell John the staging URL and exactly what to review, including on his phone.
4. **Batching:** let changes build up on staging. Merge to `main` **only when John says "launch"**.
5. **Hotfixes:** branch off `main`, fix it, merge, then bring the fix back into staging.

---

## 8. Suggested build order

1. Project setup: tokens, font, layout, header, footer and the mobile bar.
2. Homepage, matching the prototype, with placeholder content.
3. The quote form, end to end: validation, email delivery, photo handling and spam protection.
4. Contact and Privacy pages.
5. Services overview and the four section pages, each themed in its colour.
6. Recent work list and detail template.
7. About and FAQs pages.
8. Metadata, JSON-LD, sitemap, OG image, favicon and the 404 page.
9. Lighthouse and accessibility pass, then stage for review.

---

## 9. Done means

- [ ] The homepage matches the prototype on desktop and on a 390px-wide phone.
- [ ] No navy blocks and no dark mode, with colour coming from the section colours.
- [ ] Services and Recent work scroll sideways on mobile, with snap.
- [ ] The form validates, sends email with photos, blocks spam and shows the success state.
- [ ] Privacy policy is live and linked from the form and the footer.
- [ ] Lighthouse mobile is 90+ for performance, accessibility, best practice and SEO.
- [ ] LocalBusiness JSON-LD validates.
- [ ] All placeholders are clearly marked and listed for Connor.
- [ ] Deployed to staging, and **not** merged to `main` without "launch".

---

## 10. Open questions and placeholders (waiting on Connor)

- **Trading name:** confirm CM MainWorks. Yell still lists him as "Main Man Carpentery and Building", with a spelling mistake that he's fixing.
- **Sections:** are all four needed (Carpentry, Building, Joinery, Decorating), or a shorter list?
- **About copy:** Connor's surname, years in the trade, insurance and qualifications. **Don't state any of these until he confirms them.**
- **Areas covered:** the current list is a draft.
- **FAQ answers:** drafts, especially on materials and free quotes.
- **Photos:** hero, four services, projects (including a before/after pair) and a portrait. He'll send them, possibly from his Facebook page.
- **Reviews:** none yet. A Google Business Profile still needs setting up.
- **Form delivery:** which email address leads should go to.
- **Domain:** not chosen yet. Note that **Mainworks Ltd** is registered to a London design agency, so check availability.
- **Hosting:** the price and whether the domain is included (hosting is "from £10 a month").
