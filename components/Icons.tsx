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
