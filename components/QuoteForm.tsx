"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { business, jobTypes, sections, type JobType } from "@/content/site";
import { MAX_PHOTOS, formatPostcode, ruleKeys, rules, type RuleKey } from "@/lib/validation";
import { Alert, Arrow, Camera, Cross } from "./Icons";

type Pic = { file: File; url: string };
type Status = "idle" | "sending" | "sent";

const jobColor = (j: JobType) => sections.find((s) => s.name === j)?.color ?? "var(--gold)";

/** Resize a photo in the browser so uploads stay small (long edge 1600px, JPEG). */
async function shrink(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * scale);
    c.height = Math.round(bmp.height * scale);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    bmp.close();
    return await new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej()), "image/jpeg", 0.78));
  } catch {
    return file; // e.g. HEIC the browser can't decode; send as-is and let the server check size
  }
}

export default function QuoteForm({ headingLevel = 2 }: { headingLevel?: 2 | 1 }) {
  const formRef = useRef<HTMLFormElement>(null);
  const againRef = useRef<HTMLButtonElement>(null);
  const [errors, setErrors] = useState<Partial<Record<RuleKey, string>>>({});
  const [job, setJob] = useState<JobType | "">("");
  const [pics, setPics] = useState<Pic[]>([]);
  const [picNote, setPicNote] = useState("");
  const [over, setOver] = useState(false);
  const [more, setMore] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<React.ReactNode>(null);
  const [thanks, setThanks] = useState({ first: "", phone: "" });

  // "Ask about carpentry" buttons and ?job= links pre-select the type of work
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("job");
    const match = jobTypes.find((j) => j.toLowerCase() === fromUrl?.toLowerCase());
    if (match) setJob(match);
    const on = (e: Event) => setJob((e as CustomEvent<JobType>).detail);
    window.addEventListener("cm:job", on);
    return () => window.removeEventListener("cm:job", on);
  }, []);

  useEffect(() => () => pics.forEach((p) => URL.revokeObjectURL(p.url)), [pics]);

  const check = (k: RuleKey, value: string) => {
    const msg = rules[k](value);
    setErrors((e) => ({ ...e, [k]: msg }));
    return msg;
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const imgs = Array.from(list).filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name));
    const room = MAX_PHOTOS - pics.length;
    const take = imgs.slice(0, Math.max(0, room));
    const skipped = imgs.length - take.length;
    const notImages = list.length - imgs.length;
    setPicNote(
      skipped > 0 ? `You can send up to ${MAX_PHOTOS} photos, so ${skipped} ${skipped === 1 ? "wasn’t" : "weren’t"} added.`
      : notImages > 0 ? "Only photos can be added. Other files were left out."
      : ""
    );
    setPics((p) => [...p, ...take.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
  };

  const removePic = (i: number) => {
    setPics((p) => p.filter((_, j) => j !== i));
    setPicNote("");
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setFormError(null);

    const next: Partial<Record<RuleKey, string>> = {};
    ruleKeys.forEach((k) => (next[k] = rules[k]((form.elements.namedItem(k) as HTMLInputElement).value)));
    setErrors(next);
    const firstBad = ruleKeys.find((k) => next[k]);
    if (firstBad) {
      (form.elements.namedItem(firstBad) as HTMLInputElement).focus();
      return;
    }

    setStatus("sending");
    const data = new FormData(form);
    data.set("postcode", formatPostcode(String(data.get("postcode"))));
    data.delete("photos");
    try {
      const blobs = await Promise.all(pics.map((p) => shrink(p.file)));
      blobs.forEach((b, i) => data.append("photos", b, `photo-${i + 1}.jpg`));

      const res = await fetch("/api/quote", { method: "POST", body: data });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error(body.message || ""), { code: body.error, status: res.status });

      setThanks({ first: String(data.get("name")).trim().split(/\s+/)[0], phone: String(data.get("phone")).trim() });
      setStatus("sent");
    } catch (err) {
      const { code, message } = err as { code?: string; message?: string };
      setStatus("idle");
      const fallback = (
        <>Please try again, or call Connor on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</>
      );
      if (code === "rate_limited") setFormError(<>You’ve sent a few requests in a short time. Please wait a few minutes, or call Connor on <a href={business.phoneHref}>{business.phoneDisplay}</a>.</>);
      else if (code === "too_large") setFormError(<>Those photos are too big to send together. Remove one or two and try again.</>);
      else if (code === "not_configured") setFormError(<>The form isn’t switched on yet, so your request hasn’t been sent. Please call or <a href={business.whatsapp} target="_blank" rel="noopener">WhatsApp Connor</a> on {business.phoneDisplay}.</>);
      else if (code === "invalid" && message) setFormError(<>{message}</>);
      else if (!navigator.onLine) setFormError(<>You seem to be offline, so the request wasn’t sent. Check your connection and try again.</>);
      else setFormError(<>Your request didn’t send. {fallback}</>);
    }
  }

  useEffect(() => {
    if (status === "sent") againRef.current?.focus({ preventScroll: true });
  }, [status]);

  const reset = () => {
    formRef.current?.reset();
    setPics([]);
    setJob("");
    setErrors({});
    setMore(false);
    setStatus("idle");
    setTimeout(() => (formRef.current?.elements.namedItem("name") as HTMLInputElement)?.focus(), 0);
  };

  const H = headingLevel === 1 ? "h1" : "h2";

  if (status === "sent") {
    return (
      <div className="quote" id="quote">
        <div className="done" role="status" aria-live="polite">
          <svg className="tick" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="var(--t-gold)" />
            <path d="M20 33l8 8 16-17" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: "draw .6s .15s var(--ease) forwards" }} />
          </svg>
          <H>Thanks, {thanks.first}.</H>
          <p>Your request is with Connor. He’ll call you on {thanks.phone}.</p>
          <button type="button" ref={againRef} onClick={reset}>Send another request</button>
          <style>{`@keyframes draw{to{stroke-dashoffset:0}}`}</style>
        </div>
      </div>
    );
  }

  const field = (k: RuleKey) => ({
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => { if (e.target.value) check(k, e.target.value); },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => { if (errors[k]) check(k, e.target.value); },
  });
  const err = (k: RuleKey) =>
    errors[k] ? <span className="err" id={`e-${k}`}><Alert />{errors[k]}</span> : null;

  return (
    <div className="quote" id="quote" data-hero>
      <div className="quote-head">
        <H>Get a free quote</H>
        <p>A few details and Connor will come back with a price.</p>
      </div>

      <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="q-note">
        <div className={`field${errors.name ? " invalid" : ""}`}>
          <label htmlFor="q-name">Name</label>
          <input className="input" id="q-name" type="text" autoComplete="name" {...field("name")} />
          <span className="bar" />
          {err("name")}
        </div>

        <div className="row2">
          <div className={`field${errors.phone ? " invalid" : ""}`}>
            <label htmlFor="q-phone">Phone</label>
            <input className="input" id="q-phone" type="tel" autoComplete="tel" inputMode="tel" {...field("phone")} />
            <span className="bar" />
            {err("phone")}
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
          {more ? "Hide details and photos" : "Add details or photos"}
          <span className="opt">{pics.length ? `${pics.length} ${pics.length === 1 ? "photo" : "photos"} added` : "Optional"}</span>
        </button>

        <div className="more-panel" id="q-more" data-open={more} inert={!more}>
          <div>
            <div className="field">
              <label htmlFor="q-msg">About the job</label>
              <textarea className="input" id="q-msg" name="message" rows={2} maxLength={2000}
                placeholder="A line or two is plenty, e.g. hang three internal doors" />
              <span className="bar" />
            </div>

            <div className="field" style={{ marginBottom: 4 }}>
              <span className="label" id="q-photos-label">Photos <span className="opt">Up to {MAX_PHOTOS}</span></span>
              {pics.length < MAX_PHOTOS && (
                <label
                  className={`drop${over ? " over" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setOver(true); }}
                  onDragLeave={() => setOver(false)}
                  onDrop={(e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
                >
                  <input type="file" name="photos" accept="image/*" multiple aria-labelledby="q-photos-label"
                    onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                  <span className="drop-ico"><Camera /></span>
                  <span>
                    <strong>{pics.length ? "Add more photos" : "Add photos of the job"}</strong>
                    <small>Tap to choose, or drag them here</small>
                  </span>
                </label>
              )}
              {pics.length > 0 && (
                <ul className="thumbs" aria-label={`${pics.length} ${pics.length === 1 ? "photo" : "photos"} added`}>
                  {pics.map((p, i) => (
                    <li key={p.url}>
                      <img src={p.url} alt="" />
                      <button type="button" onClick={() => removePic(i)} aria-label={`Remove photo ${i + 1}`}><Cross /></button>
                    </li>
                  ))}
                </ul>
              )}
              {picNote && <span className="err" role="status"><Alert />{picNote}</span>}
            </div>
          </div>
        </div>

        {/* Honeypot for bots. People never see or fill this. */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="q-company">Company</label>
          <input id="q-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button className="send" type="submit" disabled={status === "sending"}>
          {status === "sending" ? <><span className="spin" aria-hidden="true" />Sending…</> : <>Send request<Arrow /></>}
        </button>

        {formError && <p className="form-error" role="alert"><Alert />{<span>{formError}</span>}</p>}

        <p className="note" id="q-note">
          Your details are only used to reply about your job. <Link href="/privacy">Privacy</Link>
        </p>
      </form>
    </div>
  );
}
