#!/usr/bin/env node
// Share images (Open Graph and X, 1200 x 630 JPEG) for the main pages and each service page.
// Run:  node scripts/make-share-images.mjs            (all)
//       node scripts/make-share-images.mjs home about  (just those)
// Needs macOS (sips) and Google Chrome. Writes public/images/share/<name>.jpg, each under 300 KB.
// Wired in lib/seo.tsx (pageMeta's `image`). Look: brand only. Flat navy, chalk text, gold for the key words,
// Bricolage Grotesque (brand/fonts), and the horizontal logo on navy exactly as supplied. No gradients or shadows.
// Words come from each page's own heading and intro on the site; change them here when the page changes.
import { mkdirSync, writeFileSync, statSync, existsSync, rmSync, mkdtempSync } from "node:fs";
import { spawnSync, spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const U = (p) => pathToFileURL(p).href;
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MAX_KB = 280;
const NAVY = "#16264A", GOLD = "#D9A441", CHALK = "#F5EFE4";

// name -> eyebrow, title (<b> marks the gold words), sub line
export const pages = {
  home: { eyebrow: "Home renovations · the Midlands", title: "Your whole renovation, <b>one team.</b>", sub: "Kitchens, bathrooms, extensions and whole homes across the Midlands, managed start to finish." },
  renovations: { eyebrow: "Full home renovations", title: "Full home renovations, <b>one team.</b>", sub: "Kitchens, bathrooms, extensions, floors, stairs and decorating, planned with you and managed by me in clear phases." },
  prices: { eyebrow: "Renovation prices", title: "Clear prices, <b>no surprises.</b>", sub: "A rough guide before we talk. You’ll always get a written quote for your home." },
  services: { eyebrow: "Services", title: "Everything your home needs, <b>one team.</b>", sub: "Whole renovations are my main work, all managed by me. Smaller jobs are welcome too." },
  about: { eyebrow: "About", title: "Hi, I’m <b>Connor.</b>", sub: "I run CM MainWorks, managing home renovations from start to finish." },
  contact: { eyebrow: "Contact", title: "Get a <b>free quote.</b>", sub: "Send me a few details and photos and I’ll come back to you with a clear, written price." },
  "service-extensions": { eyebrow: "Extensions", title: "Extensions, built and finished by <b>one team</b>", sub: "More room without moving house. Planned, built and finished inside by one team." },
  "service-kitchens": { eyebrow: "Kitchens", title: "Kitchen renovations, <b>start to finish</b>", sub: "Old kitchen out, new one in, and the room finished around it. One team throughout." },
  "service-bathrooms": { eyebrow: "Bathrooms", title: "Bathroom renovations, <b>done properly</b>", sub: "Lots of trades in one small room. I organise them all, so you get a finished bathroom." },
  "service-staircases": { eyebrow: "Stairs, doors and skirting", title: "Stairs, doors and skirting that <b>finish a home</b>", sub: "A solid staircase, doors that close with a click, and skirting and architrave that sit tight." },
  "service-roofing": { eyebrow: "Roofing", title: "Roofing, as part of the job or <b>on its own</b>", sub: "Repairs, new roofs on extensions, and the fascias and guttering that keep the weather out." },
  "service-flooring-and-tiling": { eyebrow: "Flooring and tiling", title: "Floors and tiling, <b>laid flat and straight</b>", sub: "Floors laid flat and tiles set straight, on a properly prepared base." },
  "service-carpentry": { eyebrow: "Carpentry", title: "Carpentry jobs, <b>big or small</b>", sub: "I started as a carpenter, and small jobs are still welcome. One sticking door included." },
  "service-joinery": { eyebrow: "Joinery", title: "Joinery, <b>made to fit</b>", sub: "Media walls, alcove units and storage, made for the room they’re going in." },
  "service-decorating": { eyebrow: "Decorating", title: "Decorating, <b>right to the last coat</b>", sub: "Clean lines, proper prep and paint that lasts, inside and out." },
};

const css = `
@font-face{font-family:'Bricolage Grotesque';font-weight:200 800;font-stretch:75% 100%;src:url(${U(join(ROOT, "brand/fonts/BricolageGrotesque.woff2"))}) format('woff2')}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:'Bricolage Grotesque',sans-serif;font-optical-sizing:auto;background:${NAVY};color:${CHALK};position:relative;-webkit-font-smoothing:antialiased}
.copy{position:absolute;left:80px;top:72px;width:1040px;height:410px;display:flex;flex-direction:column;justify-content:center}
.eyebrow{font-weight:600;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:${GOLD};margin-bottom:28px}
h1{font-weight:700;letter-spacing:-.035em;line-height:1.02;color:${CHALK};text-wrap:balance;max-width:980px}
h1 b{font-weight:700;color:${GOLD}}
.sub{font-weight:400;font-size:30px;line-height:1.4;color:rgba(245,239,228,.82);margin-top:30px;max-width:880px;text-wrap:balance}
.logo{position:absolute;left:80px;bottom:60px;height:64px;display:block}
`;

const html = (name, p) => {
  const plain = p.title.replace(/<\/?b>/g, "");
  const size = plain.length <= 28 ? 104 : plain.length <= 46 ? 84 : 72;
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>${name}</title><style>${css}</style></head><body>
<div class="copy"><div class="eyebrow">${p.eyebrow}</div><h1 style="font-size:${size}px">${p.title}</h1><p class="sub">${p.sub}</p></div>
<img class="logo" src="${U(join(ROOT, "brand/logo/main/cm-mainworks-horizontal-on-navy.svg"))}" alt="">
</body></html>`;
};

async function render(htmlFile, png) {
  rmSync(png, { force: true });
  const profile = mkdtempSync(join(tmpdir(), "cm-share-"));
  const args = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--mute-audio", "--no-first-run", "--no-default-browser-check",
    "--disable-component-update", "--disable-background-networking", "--disable-sync", "--disable-default-apps", "--allow-file-access-from-files",
    "--force-device-scale-factor=1", `--user-data-dir=${profile}`, "--window-size=1200,630", `--screenshot=${png}`, "--virtual-time-budget=6000", U(htmlFile)];
  const child = spawn(CHROME, args, { stdio: "ignore" });
  for (let i = 0; i < 120; i++) {
    if (existsSync(png) && statSync(png).size > 0) { await new Promise((r) => setTimeout(r, 800)); break; }
    if (child.exitCode !== null) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  child.kill("SIGKILL");
  rmSync(profile, { recursive: true, force: true });
  if (!existsSync(png)) throw new Error("Chrome made no screenshot");
}

const work = mkdtempSync(join(tmpdir(), "cm-share-work-"));
const out = join(ROOT, "public/images/share");
mkdirSync(out, { recursive: true });
const only = process.argv.slice(2);
for (const [name, p] of Object.entries(pages)) {
  if (only.length && !only.includes(name)) continue;
  const h = join(work, `${name}.html`), png = join(work, `${name}.png`), jpg = join(out, `${name}.jpg`);
  writeFileSync(h, html(name, p));
  await render(h, png);
  let q = 88;
  for (; q >= 50; q -= 6) {
    spawnSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", String(q), png, "--out", jpg], { stdio: "ignore" });
    if (statSync(jpg).size / 1024 <= MAX_KB) break;
  }
  console.log(name.padEnd(30), Math.round(statSync(jpg).size / 1024) + " KB", "q" + q);
}
rmSync(work, { recursive: true, force: true });
