"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { business, jobColor, jobTypes, type JobType } from "@/content/site";
import { formatPostcode, rules } from "@/lib/validation";
import { Alert, ChevronDown, WhatsApp } from "./Icons";

/*
  The quote form (John, 10 Nov 2026: Connor works from WhatsApp, not email). Nothing is sent from the
  website. "Send on WhatsApp" opens WhatsApp with the details written out, ready to send, and photos go
  in with the paperclip. Email is the other way: it opens the visitor's own email app with Connor's
  address and the same details filled in, and photos are attached there. The site stores nothing.
  (app/api/quote, the old emailing route, isn't used by the form any more.)
*/

const keys = ["name", "postcode"] as const;
type Key = (typeof keys)[number];
type Sent = { first: string; via: "whatsapp" | "email"; text: string; subject: string };

const isPhone = () => matchMedia("(pointer: coarse)").matches;

function compose(f: FormData) {
  const name = String(f.get("name") ?? "").trim();
  const postcode = formatPostcode(String(f.get("postcode") ?? ""));
  const job = String(f.get("job") ?? "").trim();
  const about = String(f.get("message") ?? "").trim();
  const lines = [
    "Hi Connor, I’d like a free quote.",
    "",
    `Name: ${name}`,
    `Postcode: ${postcode}`,
    ...(job ? [`Type of work: ${job}`] : []),
    ...(about ? [`About the job: ${about}`] : []),
  ];
  return { first: name.split(/\s+/)[0], text: lines.join("\n"), subject: `Quote request${job ? `: ${job}` : ""}${postcode ? `, ${postcode}` : ""}` };
}

const whatsappUrl = (text: string) => `${business.whatsapp}?text=${encodeURIComponent(text)}`;
const mailUrl = (to: string, subject: string, text: string) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

function QuoteCard({ headingLevel = 2, defaultJob = "" }: { headingLevel?: 2 | 1; defaultJob?: JobType | "" }) {
  const formRef = useRef<HTMLFormElement>(null);
  const againRef = useRef<HTMLButtonElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [job, setJob] = useState<JobType | "">(defaultJob);
  const [more, setMore] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const [mail, setMail] = useState(""); // joined after the page loads, so it isn't in the page for bots

  useEffect(() => setMail(business.emailParts.join("@")), []);

  // "Ask about carpentry" buttons and ?job= links pre-select the type of work
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("job");
    const match = jobTypes.find((j) => j.toLowerCase() === fromUrl?.toLowerCase());
    if (match) setJob(match);
    const on = (e: Event) => setJob((e as CustomEvent<JobType>).detail);
    window.addEventListener("cm:job", on);
    return () => window.removeEventListener("cm:job", on);
  }, []);

  const check = (k: Key, value: string) => {
    const msg = rules[k](value);
    setErrors((e) => ({ ...e, [k]: msg }));
    return msg;
  };

  // checks the name and postcode, then writes out the message; null if something needs fixing
  const ready = () => {
    const form = formRef.current!;
    const next: Partial<Record<Key, string>> = {};
    keys.forEach((k) => (next[k] = rules[k]((form.elements.namedItem(k) as HTMLInputElement).value)));
    setErrors(next);
    const firstBad = keys.find((k) => next[k]);
    if (firstBad) {
      (form.elements.namedItem(firstBad) as HTMLInputElement).focus();
      return null;
    }
    return compose(new FormData(form));
  };

  const open = (url: string, newTab: boolean) => {
    if (newTab) window.open(url, "_blank", "noopener");
    else window.location.href = url;
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const m = ready();
    if (!m) return;
    open(whatsappUrl(m.text), !isPhone()); // phones go straight to the app; computers open WhatsApp in a new tab
    setSent({ ...m, via: "whatsapp" });
  }

  function byEmail() {
    const m = ready();
    if (!m || !mail) return;
    open(mailUrl(mail, m.subject, m.text), false);
    setSent({ ...m, via: "email" });
  }

  useEffect(() => {
    if (sent) againRef.current?.focus({ preventScroll: true });
  }, [sent]);

  const reset = () => {
    formRef.current?.reset();
    setJob(defaultJob);
    setErrors({});
    setMore(false);
    setSent(null);
    setTimeout(() => (formRef.current?.elements.namedItem("name") as HTMLInputElement)?.focus(), 0);
  };

  const H = headingLevel === 1 ? "h1" : "h2";

  if (sent) {
    const wa = sent.via === "whatsapp";
    return (
      <div className="quote">
        <div className="done" role="status" aria-live="polite">
          <svg className="tick" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="var(--t-gold)" />
            <path d="M20 33l8 8 16-17" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: "draw .6s .15s var(--ease) forwards" }} />
          </svg>
          <H>Nearly there{sent.first ? `, ${sent.first}` : ""}.</H>
          <p>
            {wa
              ? <>WhatsApp should be open with your details written out. Add any photos with the paperclip, then tap send.</>
              : <>Your email should be open with your details filled in. Add any photos, then send it.</>}
          </p>
          <ul className="done-links">
            <li>
              {wa
                ? <a href={whatsappUrl(sent.text)} target="_blank" rel="noopener">Didn’t open? Try WhatsApp again</a>
                : <a href={mailUrl(mail, sent.subject, sent.text)}>Didn’t open? Try email again</a>}
            </li>
            <li>
              {wa
                ? <a href={mailUrl(mail, sent.subject, sent.text)}>Send it by email instead</a>
                : <a href={whatsappUrl(sent.text)} target="_blank" rel="noopener">Send it on WhatsApp instead</a>}
            </li>
            <li>Or ring me on <a href={business.phoneHref}>{business.phoneDisplay}</a></li>
          </ul>
          <button type="button" ref={againRef} onClick={reset}>Start again</button>
          <style>{`@keyframes draw{to{stroke-dashoffset:0}}`}</style>
        </div>
      </div>
    );
  }

  const field = (k: Key) => ({
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => { if (e.target.value) check(k, e.target.value); },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => { if (errors[k]) check(k, e.target.value); },
  });
  const err = (k: Key) =>
    errors[k] ? <span className="err" id={`e-${k}`}><Alert />{errors[k]}</span> : null;

  return (
    <div className="quote">
      <div className="quote-head">
        <H>Get a free quote</H>
        <p>A few details and I’ll come back to you with a price.</p>
      </div>

      <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="q-note">
        <div className="row2">
          <div className={`field${errors.name ? " invalid" : ""}`}>
            <label htmlFor="q-name">Name</label>
            <input className="input" id="q-name" type="text" autoComplete="name" {...field("name")} />
            <span className="bar" />
            {err("name")}
          </div>
          <div className={`field${errors.postcode ? " invalid" : ""}`}>
            <label htmlFor="q-post">Postcode</label>
            <input className="input" id="q-post" type="text" autoComplete="postal-code" autoCapitalize="characters" {...field("postcode")} />
            <span className="bar" />
            {err("postcode")}
          </div>
        </div>

        <div className="field">
          <label htmlFor="q-job">Type of work</label>
          <div className={`select${job ? " chosen" : ""}`} style={{ "--c": job ? jobColor(job) : "var(--line-2)" } as React.CSSProperties}>
            <select className="input" id="q-job" name="job" value={job} onChange={(e) => setJob(e.target.value as JobType | "")}>
              <option value="">Choose one</option>
              {jobTypes.map((j) => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
          <span className="bar" />
        </div>

        <button type="button" className={`more${more ? " open" : ""}`} aria-expanded={more} aria-controls="q-more" onClick={() => setMore((m) => !m)}>
          <span className="more-ico" aria-hidden="true" />
          {more ? "Hide details" : "Add a few details"}
          <span className="opt">Optional</span>
        </button>

        <div className="more-panel" id="q-more" data-open={more} inert={!more}>
          <div>
            <div className="field">
              <label htmlFor="q-msg">About the job</label>
              <textarea className="input" id="q-msg" name="message" rows={2} maxLength={1500}
                placeholder="A line or two is plenty, e.g. hang three internal doors" />
              <span className="bar" />
            </div>
          </div>
        </div>

        <button className="send" type="submit">
          <WhatsApp />Send on WhatsApp
        </button>
        <p className="or-email">
          Or <button type="button" onClick={byEmail}>send it by email</button>
          {mail && <> to <span className="addr">{mail}</span></>}
        </p>

        <p className="note" id="q-note">
          It opens with your details written out. Add photos there, then send. <Link href="/privacy">Privacy</Link>
        </p>
      </form>
    </div>
  );
}

/*
  The quote form. With `collapsible` (the homepage hero), phones see a single
  "Get a free quote" button above the fold that slides the form open underneath.
  Tablets and desktop always show the form. "Ask about…" buttons, the mobile bar
  and links to #quote open it too.
*/
export default function QuoteForm({ headingLevel = 2, collapsible = false, defaultJob = "" }: { headingLevel?: 2 | 1; collapsible?: boolean; defaultJob?: JobType | "" }) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!collapsible) return;
    const mq = matchMedia("(max-width: 720px)");
    const sync = () => setMobile(mq.matches);
    const openUp = () => setOpen(true);
    sync();
    if (location.hash === "#quote") setOpen(true);
    mq.addEventListener("change", sync);
    window.addEventListener("cm:job", openUp);
    window.addEventListener("cm:open-quote", openUp);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("cm:job", openUp);
      window.removeEventListener("cm:open-quote", openUp);
    };
  }, [collapsible]);

  if (!collapsible) {
    return <div className="quote-wrap" id="quote"><QuoteCard headingLevel={headingLevel} defaultJob={defaultJob} /></div>;
  }

  const openForm = () => {
    setOpen(true);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => panel.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }), 120);
  };

  return (
    <div className={`quote-wrap collapsible${open ? " is-open" : ""}`} id="quote">
      <div className="quote-cta-wrap">
        <button type="button" className="quote-cta" aria-expanded={open} aria-controls="quote-panel" onClick={openForm}>
          Get a free quote <ChevronDown />
        </button>
        <a className="quote-call" href={business.phoneHref}>Or ring me on {business.phoneDisplay}</a>
      </div>
      <div className="quote-panel" id="quote-panel" ref={panel} inert={mobile && !open}>
        <div><QuoteCard headingLevel={headingLevel} /></div>
      </div>
    </div>
  );
}
