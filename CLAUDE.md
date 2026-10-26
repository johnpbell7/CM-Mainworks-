# CM MainWorks website: rules for Claude Code

Read `HANDOFF.md` before starting. It has the full brief, site map, page spec and open questions.

## Always
- **Stack:** Next.js (App Router) + TypeScript, deployed on Vercel.
- **Staging first.** Work on the staging branch and push to the staging site. Never merge to `main` until John explicitly says **"launch"**.
- **Prototype:** `prototype/index.html` is the approved homepage design. Match its layout, spacing, type and colours.
- **Tokens:** use the values in `brand/tokens.css` / `brand/tokens.ts`. Don't invent new colours.
- **Logos:** use the SVG files in `brand/logo/` exactly as supplied. Never redraw, recolour, stretch or retype them.
- **Light only.** No dark mode. This was the client's decision.
- **Font:** one family throughout, Bricolage Grotesque, loaded via `next/font/google`.
- **Writing style:** British English, sentence case, plain words, curly apostrophes.

## Never
- Navy-heavy blocks or navy buttons. Navy is for text and the logo only.
- Orange, a slanted or italic name, or a rule beside the badge. All were rejected in design rounds.
- Decorative clutter: marquees, chips, badges on cards, gradients, drop-shadow cards or emoji.
- Calls to action in the hero. The hero is headline, one line, a photo, and the quote form.
- Merging to `main` without "launch".
- Invented facts about Connor: insurance, years in the trade, reviews or prices. Placeholders stay clearly marked.

## Heads-up rule
If any change needs a database or Supabase schema change, say so explicitly before doing it.
