// Builds the header lockup from the supplied no-descriptor logo: the badge is untouched,
// the "MainWorks" wordmark (original paths) is scaled up uniformly and centred on the badge.
// Usage: node scripts/make-header-logo.mjs [scale]
import fs from "node:fs";

const k = Number(process.argv[2] || 1.3);
const src = fs.readFileSync("brand/logo/main/cm-mainworks-horizontal-no-descriptor.svg", "utf8");
const open = '<g transform="translate(241.7 67.8)">';
const at = src.lastIndexOf(open);
const badge = src.slice(src.indexOf(">", src.indexOf("<svg")) + 1, at);
const word = src.slice(at, src.lastIndexOf("</svg>"));

// measured bounds (viewBox units) of the supplied artwork
const W = { x: 243.8, y: 28.9, w: 266.1, h: 39.7 };
const badgeRight = 219.6, badgeMid = 50, gap = 26;

const tx = badgeRight + gap, ty = badgeMid - (W.h * k) / 2;
const width = Math.ceil(tx + W.w * k + 8);
const out = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 100">${badge}<g transform="translate(${tx} ${ty.toFixed(2)}) scale(${k}) translate(${-W.x} ${-W.y})">${word}</g></svg>
`;
fs.writeFileSync("public/brand/logo/main/cm-mainworks-header-lockup.svg", out);
console.log(`wrote lockup at scale ${k}, viewBox width ${width}`);
