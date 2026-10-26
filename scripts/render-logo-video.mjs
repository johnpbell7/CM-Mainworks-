// Renders /logo-animation to a square MP4 for social posts.
// Usage: start the site (npm run dev or npm start), then
//   node scripts/render-logo-video.mjs [baseUrl] [out.mp4]
// Needs ffmpeg on the PATH and Playwright's Chromium.
import { createRequire } from "node:module";
// Playwright may be installed globally, so resolve it the CommonJS way (honours NODE_PATH).
const { chromium } = createRequire(import.meta.url)("playwright");
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const base = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "brand/animation/cm-logo-animation-square.mp4";
const SIZE = 1080, FPS = 30;

const dir = mkdtempSync(join(tmpdir(), "cm-frames-"));
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 1 });
await ctx.addInitScript(() => sessionStorage.setItem("cm-intro-seen", "1"));
const page = await ctx.newPage();
await page.goto(`${base}/logo-animation?render`, { waitUntil: "load" });
await page.evaluate(async () => { await document.fonts.ready; return true; });
await page.waitForFunction(() => window.__logoVideo);
const duration = await page.evaluate(() => window.__logoVideo.duration);
const frames = Math.ceil(duration * FPS);
for (let f = 0; f <= frames; f++) {
  await page.evaluate((t) => { window.__logoVideo.seek(t); }, f / FPS);
  await page.screenshot({ path: join(dir, `${String(f).padStart(4, "0")}.png`) });
}
await browser.close();
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", join(dir, "%04d.png"),
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-preset", "slow", "-movflags", "+faststart", out], { stdio: "inherit" });
rmSync(dir, { recursive: true, force: true });
console.log(`Wrote ${out} (${frames + 1} frames, ${duration.toFixed(2)}s)`);
