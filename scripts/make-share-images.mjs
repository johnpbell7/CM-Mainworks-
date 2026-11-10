#!/usr/bin/env node
// Link pictures (Open Graph and X: what shows when a link is sent on WhatsApp, Facebook, iMessage…), 1200 x 630
// JPEG, in the site's own look (John, 10 Nov 2026). Each one is the card page /share-card/<name> (the sky, the
// heading with its gold underline, and the page's drawing on the street, as in the page heads), photographed
// in Chrome with motion off.
// Needs: the dev server running (npm run dev -- -p 3201, or SITE=http://localhost:<port>), Google Chrome and macOS (sips).
// Writes public/images/share/<name>.jpg, and the default card to public/images/og-cm-mainworks.jpg, each under 300 KB.
// Run:  node scripts/make-share-images.mjs              (all)
//       node scripts/make-share-images.mjs home prices  (just those)
//       node scripts/make-share-images.mjs projects     (every project)    areas (every town)
// Words for the main pages: content/share-cards.json. Towns and projects come from content/areas.ts and content/projects.ts.
// Wired in lib/seo.tsx (pageMeta's `image`, and the default card).
import { mkdirSync, readFileSync, statSync, existsSync, rmSync, mkdtempSync } from "node:fs";
import { spawnSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = (process.env.SITE || "http://localhost:3201").replace(/\/$/, "");
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MAX_KB = 280;

const read = (f) => readFileSync(join(ROOT, f), "utf8");
const words = JSON.parse(read("content/share-cards.json"));
const towns = [...read("content/areas.ts").matchAll(/\n    slug: "([^"]+)"/g)].map((m) => `area-${m[1]}`);
const jobs = read("content/projects.ts").split(/\n  \{\n    slug: /).slice(1)
  .filter((b) => !/\n    placeholder: true/.test(b))
  .map((b) => `project-${(b.match(/^"([^"]+)"/) || [])[1]}`);
const all = [...Object.keys(words), ...towns, ...jobs];

const only = process.argv.slice(2);
const wanted = all.filter((n) => !only.length || only.includes(n)
  || (only.includes("projects") && n.startsWith("project-")) || (only.includes("areas") && n.startsWith("area-")));

async function shoot(url, png) {
  rmSync(png, { force: true });
  const profile = mkdtempSync(join(tmpdir(), "cm-share-"));
  const args = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--mute-audio", "--no-first-run", "--no-default-browser-check",
    "--disable-component-update", "--disable-background-networking", "--disable-sync", "--disable-default-apps",
    "--force-prefers-reduced-motion", "--force-device-scale-factor=1", `--user-data-dir=${profile}`, "--window-size=1200,630",
    `--screenshot=${png}`, "--virtual-time-budget=8000", url];
  const child = spawn(CHROME, args, { stdio: "ignore" });
  for (let i = 0; i < 160; i++) {
    if (existsSync(png) && statSync(png).size > 0) { await new Promise((r) => setTimeout(r, 800)); break; }
    if (child.exitCode !== null) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  child.kill("SIGKILL");
  rmSync(profile, { recursive: true, force: true });
  if (!existsSync(png)) throw new Error("Chrome made no screenshot");
}

const work = mkdtempSync(join(tmpdir(), "cm-share-work-"));
mkdirSync(join(ROOT, "public/images/share"), { recursive: true });
for (const name of wanted) {
  const url = `${SITE}/share-card/${name}`;
  const res = await fetch(url).catch(() => null); // also gets the dev server to compile the page first
  if (!res) { console.error(`The dev server isn't answering at ${SITE}. Start it: npm run dev -- -p 3201`); process.exit(1); }
  if (!res.ok) { console.log(name.padEnd(40), "skipped (no card)"); continue; }
  const png = join(work, `${name}.png`);
  const jpg = name === "default" ? join(ROOT, "public/images/og-cm-mainworks.jpg") : join(ROOT, "public/images/share", `${name}.jpg`);
  await shoot(url, png);
  let q = 88;
  for (; q >= 50; q -= 6) {
    spawnSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", String(q), png, "--out", jpg], { stdio: "ignore" });
    if (statSync(jpg).size / 1024 <= MAX_KB) break;
  }
  console.log(name.padEnd(40), Math.round(statSync(jpg).size / 1024) + " KB", "q" + q);
}
rmSync(work, { recursive: true, force: true });
