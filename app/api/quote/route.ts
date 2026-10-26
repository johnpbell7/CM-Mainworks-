import { NextResponse } from "next/server";
import { jobTypes } from "@/content/site";
import { MAX_PHOTOS, formatPostcode, ruleKeys, rules } from "@/lib/validation";

/*
  Quote form handler. Emails each lead to Connor through Resend, with photos attached.
  Env vars (set in Vercel):
    RESEND_API_KEY    Resend API key
    QUOTE_TO_EMAIL    where leads go (waiting on Connor)
    QUOTE_FROM_EMAIL  verified sender, e.g. "CM MainWorks website <quotes@yourdomain>"
  Nothing personal is logged. No database is used.
*/

export const runtime = "nodejs";

const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4.2 * 1024 * 1024; // Vercel functions accept bodies up to 4.5 MB

// Best-effort rate limit: 5 requests per 10 minutes per IP, per server instance.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const fail = (status: number, error: string, message?: string) => NextResponse.json({ error, message }, { status });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return fail(429, "rate_limited");

  let data: FormData;
  try {
    data = await req.formData();
  } catch {
    return fail(413, "too_large");
  }

  // Honeypot: bots fill every field. Pretend it worked.
  if (String(data.get("company") ?? "").trim()) return NextResponse.json({ ok: true });

  const val = (k: string) => String(data.get(k) ?? "").trim();
  for (const k of ruleKeys) {
    const msg = rules[k](val(k));
    if (msg) return fail(400, "invalid", msg);
  }
  const job = val("job");
  if (job && !(jobTypes as readonly string[]).includes(job)) return fail(400, "invalid", "Choose a type of work from the list.");
  const message = val("message").slice(0, 2000);

  const photos = data.getAll("photos").filter((p): p is File => p instanceof File && p.size > 0);
  if (photos.length > MAX_PHOTOS) return fail(400, "invalid", `You can send up to ${MAX_PHOTOS} photos.`);
  let total = 0;
  for (const p of photos) {
    if (!p.type.startsWith("image/")) return fail(400, "invalid", "Only photos can be attached.");
    if (p.size > MAX_PHOTO_BYTES) return fail(413, "too_large");
    total += p.size;
  }
  if (total > MAX_TOTAL_BYTES) return fail(413, "too_large");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  if (!key || !to) return fail(503, "not_configured");

  const name = val("name");
  const phone = val("phone");
  const postcode = formatPostcode(val("postcode"));

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Postcode", postcode],
    ["Type of work", job || "Not given"],
    ["About the job", message || "Not given"],
    ["Photos", photos.length ? `${photos.length} attached` : "None"],
  ];
  const html = `<div style="font-family:system-ui,sans-serif;color:#1A2238;font-size:16px;line-height:1.5">
<h2 style="margin:0 0 16px">New quote request</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#5F6575;vertical-align:top;border-top:1px solid #E8E4DC">${k}</td><td style="border-top:1px solid #E8E4DC;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>
<p style="margin-top:20px"><a href="tel:${esc(phone.replace(/[^\d+]/g, ""))}" style="color:#8F6418;font-weight:600">Call ${esc(name.split(/\s+/)[0])}</a></p>
</div>`;

  const attachments = await Promise.all(
    photos.map(async (p, i) => ({
      filename: p.name || `photo-${i + 1}.jpg`,
      content: Buffer.from(await p.arrayBuffer()).toString("base64"),
    }))
  );

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL || "CM MainWorks website <onboarding@resend.dev>",
      to: [to],
      subject: `Quote request: ${job || "general"} in ${postcode}`,
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      attachments,
    }),
  });

  if (!res.ok) {
    console.error("Quote email failed", res.status); // status only, no personal data
    return fail(502, "send_failed");
  }
  return NextResponse.json({ ok: true });
}
