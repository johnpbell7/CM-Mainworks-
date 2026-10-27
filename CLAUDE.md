# CM MainWorks website: rules for Claude Code

**Read `PROJECT-STATUS.md` before starting.** It covers what has been built, the aims, every decision made so far, what's still waiting on Connor, and how to launch. `HANDOFF.md` is the original pre-build brief; where they disagree, `PROJECT-STATUS.md` wins.

## Always
- **Stack:** Next.js (App Router) and TypeScript, deployed on Vercel. Read `AGENTS.md`: this Next.js version differs from older docs.
- **Branch:** work on `ccr-6ec0a5e9-9pzhmk`, which the preview at cm-mainworks.vercel.app deploys from. Never go live until John explicitly says **"launch"**.
- **Pitch:** full home renovations, managed by one team, in clear phases, invoiced phase by phase, with regular sit-downs. Smaller jobs are welcome but secondary.
- **Voice:** Connor's own (I, me, my). Friendly, open, short. British English, sentence case, curly apostrophes.
- **Calls to action:** one main action, getting a quote. At most one link per section; cards are tapped as a whole.
- **Copy:** trim it, but keep the long-form service, town and FAQ text that search relies on.
- **Lichfield:** only on town pages, town lists and the footer. Generic pages say "the Midlands".
- **Tokens:** use the values in `brand/tokens.css` and `brand/tokens.ts`. Don't invent new colours.
- **Logos:** use the SVGs in `brand/logo/` as supplied, or rescale the supplied shapes with a script. Never redraw, recolour or retype them.
- **Light only, one font:** no dark mode. Bricolage Grotesque, loaded via `next/font/google`.
- **Checks before every push:** `npx tsc --noEmit` and `npm run build`, then look at the page on a phone width.

## Never
- Invent facts about Connor: prices, qualifications, guarantees, reviews or years in the trade. Placeholders stay clearly marked; prices stay `£TBC` until he gives figures.
- Get round Facebook's login to take photos.
- Use navy buttons, gradients, drop-shadow cards, marquees, chips or emoji.
- Go live, or point a production domain, without "launch".

## Heads-up rule
If any change needs a database or Supabase schema change, say so explicitly before doing it.
