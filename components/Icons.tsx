type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M5 4h3.5l1.6 4-2.1 1.3a11 11 0 0 0 6.7 6.7l1.3-2.1 4 1.6V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" /></svg>
);
export const Arrow = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const Camera = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={1.7} {...p}><path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.5-2h7L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" /><circle cx="12" cy="13" r="3.5" /></svg>
);
export const Cross = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.4} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Alert = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></svg>
);
export const Swipe = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M14 8l4 4-4 4M6 12h12" /></svg>
);
export const Chevrons = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" /></svg>
);
export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 20l1.2-3.9A8 8 0 1 1 8 19z" /><path d="M9.2 9.3c.3 2.3 2.2 4.3 4.6 4.8l1-1.2 1.8.9c-.2 1.1-1 1.8-2.2 1.8-3.4-.2-6.3-3.1-6.4-6.5 0-1.1.7-2 1.8-2.2l.9 1.8z" /></svg>
);
export const ChevronDown = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}><path d="M6 9l6 6 6-6" /></svg>
);
export const QuoteDoc = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 14.5l2 2 4-4.5" /></svg>
);
export const Shield = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 3l7 3v5.5c0 4.4-3 7.9-7 9.5-4-1.6-7-5.1-7-9.5V6z" /><path d="M9 12l2 2 4-4.5" /></svg>
);
export const Award = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.3L7 21l5-2.6 5 2.6-1.5-7.7" /><path d="M10 9l1.4 1.4L14 7.8" /></svg>
);
export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 21s-6.5-6.2-6.5-11.3a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z" /><circle cx="12" cy="9.7" r="2.4" /></svg>
);
export const Team = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9.5" r="2.4" /><path d="M15.5 14.4A4.5 4.5 0 0 1 21 18.8" /></svg>
);
export const Pound = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M14.6 8.6a2.6 2.6 0 0 0-4.6 1.7V16M8.6 12.8h4.6M8.4 16h7" /></svg>
);
export const Calm = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
);
export const Eye = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></svg>
);
export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2.2} {...p}><path d="M5 12.5l4.2 4.2L19 7" /></svg>
);
