// Shared by the quote form (client) and the /api/quote route (server).
export const MAX_PHOTOS = 6;

export const rules = {
  name: (v: string) => (v.trim().length >= 2 ? "" : v.trim() ? "Enter your full name." : "Enter your name."),
  phone: (v: string) => {
    const digits = v.replace(/[^\d+]/g, "");
    if (!digits) return "Enter a phone number so Connor can call you back.";
    return /^(\+44|0)\d{9,10}$/.test(digits) ? "" : "Enter a UK phone number, like 07700 900123.";
  },
  postcode: (v: string) => {
    if (!v.trim()) return "Enter the postcode of the job.";
    return /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(v.trim()) ? "" : "Enter a full UK postcode, like WS13 6AA.";
  },
} as const;

export type RuleKey = keyof typeof rules;
export const ruleKeys = Object.keys(rules) as RuleKey[];

export function formatPostcode(v: string) {
  const s = v.replace(/\s+/g, "").toUpperCase();
  return s.length > 3 ? `${s.slice(0, -3)} ${s.slice(-3)}` : s;
}
