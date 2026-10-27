// Builds the header lockup from the supplied horizontal logo (with descriptor).
// The badge is untouched. The "MainWorks" wordmark and the "Carpentry & Construction"
// descriptor keep their original paths and colours; they are only scaled uniformly so
// the descriptor runs the full width of the wordmark and is legible at header size.
// Usage: node scripts/make-header-logo.mjs [wordmarkHeight]
import fs from "node:fs";

const W = Number(process.argv[2] || 50); // wordmark height in viewBox units (badge is 100)
const src = fs.readFileSync("brand/logo/main/cm-mainworks-horizontal-on-light.svg", "utf8");
const body = src.slice(src.indexOf(">", src.indexOf("<svg")) + 1, src.lastIndexOf("</svg>"));
const iWord = body.indexOf('<g transform="translate(241.7 57.8)">');
const iDesc = body.indexOf('<g transform="translate(243.7 82.8)">');
const badge = body.slice(0, iWord), word = body.slice(iWord, iDesc), desc = body.slice(iDesc);

// measured bounds (absolute viewBox units) of the supplied artwork
const wordBox = { x: 243.86, y: 18.97, w: 266.03, h: 39.58 };
const descBox = { x: 244.56, y: 70.41, w: 206.99, h: 15.38 };
const badgeRight = 219.6, gap = 24, lineGap = 6;

const k = W / wordBox.h;
const ww = wordBox.w * k;
const s = ww / descBox.w;
const dh = descBox.h * s;
const top = (100 - (W + lineGap + dh)) / 2;
const x0 = badgeRight + gap;
const place = (box, scale, y) => `translate(${x0.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(4)}) translate(${-box.x} ${-box.y})`;
const width = Math.ceil(x0 + ww + 6);

const out = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 100">${badge}<g transform="${place(wordBox, k, top)}">${word}</g><g transform="${place(descBox, s, top + W + lineGap)}">${desc}</g></svg>
`;
fs.writeFileSync("public/brand/logo/main/cm-mainworks-header-lockup.svg", out);
console.log(`wrote header lockup: viewBox ${width} x 100, descriptor scale ${s.toFixed(2)}`);
