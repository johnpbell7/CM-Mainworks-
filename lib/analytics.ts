import { track } from "@vercel/analytics";

/*
  Counting quote requests and calls (John, 15 Nov 2026), with Vercel Web Analytics: no
  cookies, nothing that identifies a visitor, and nothing about what they typed. Each event
  carries two things only: the page it happened on and where on that page.
  Seen in Vercel: project cm-mainworks > Analytics > Events.
    "Contact: WhatsApp" / "Contact: email"  a filled-in quote form opened WhatsApp or their email app
                                            (the site can't see whether they then pressed send). Place is
                                            the form, or "Tried again" / "Switched from …" for the links
                                            shown after sending
    "Contact: call"                         any phone link on the site
    "Contact: WhatsApp link"                the plain "WhatsApp me" links (footer, menu, contact page), not the form
    "Quote button"                          a "Free quote" / "Get a free quote" / "Start my quote" button that opens
                                            or leads to the quote form. Compare with the WhatsApp and email counts to
                                            see how many who start a quote send it
  Nothing is sent in development.
*/

const page = () => window.location.pathname;

/** Which quote form: the homepage hero, the contact page, or the one at the foot of a page. */
function formPlace(form: Element | null) {
  if (form?.closest(".vh-form")) return "Homepage hero";
  if (page() === "/contact") return "Contact page";
  return "Foot of the page";
}

/** Where a phone link sits. */
function callPlace(link: Element) {
  if (link.closest("#site-menu")) return "Menu";
  if (link.closest(".mbar")) return "Phone bar";
  if (link.closest("header.head")) return "Header";
  if (link.closest("footer.foot")) return "Footer";
  if (link.closest(".quote, .quote-call, .vh-form")) return "Quote form";
  if (link.closest(".closing")) return "Ring me block";
  return "In the page";
}

/** `again`: the links shown after sending ("Didn’t open? Try again", "Send it by email instead"…), counted apart from first tries. */
export function trackQuote(via: "whatsapp" | "email", form: Element | null, again?: string) {
  track(via === "whatsapp" ? "Contact: WhatsApp" : "Contact: email", { page: page(), place: again ?? formPlace(form) });
}

export function trackCall(link: Element) {
  track("Contact: call", { page: page(), place: callPlace(link) });
}

export function trackWhatsAppLink(link: Element) {
  track("Contact: WhatsApp link", { page: page(), place: callPlace(link) });
}

/** Where a quote button sits. */
function quotePlace(el: Element) {
  if (el.closest(".q-start, .quote-cta")) return "Homepage hero";
  return callPlace(el);
}

export function trackQuoteButton(el: Element) {
  track("Quote button", { page: page(), place: quotePlace(el) });
}
