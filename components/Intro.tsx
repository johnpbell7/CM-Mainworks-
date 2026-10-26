"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LogoArt, addSnap } from "./LogoParts";

gsap.registerPlugin(useGSAP);

/*
  Page-load intro. The two halves of the CM badge (C on navy, M on gold) fly in,
  wobble, then snap together along the box joint. The wordmark pops up, the badge
  gives a little nod, and the navy screen splits open along a box-joint seam to
  reveal the site, each half of the badge riding away on its own panel.

  Shown once per browser session. Skipped for reduced motion (decided in the inline
  head script, which sets html.intro-on before first paint).
*/

const SESSION_KEY = "cm-intro-seen";

export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.classList.contains("intro-on")) {
        setDone(true);
        return;
      }
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}

      const el = root.current!;
      const q = gsap.utils.selector(el);

      let opened = false;
      const open = () => {
        if (opened) return;
        opened = true;
        (window as unknown as { __cmIntroOpen?: boolean }).__cmIntroOpen = true;
        window.dispatchEvent(new Event("cm:intro-open"));
      };
      const finish = () => {
        open();
        html.classList.remove("intro-on");
        setDone(true);
      };

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });
      const { L, R, word, desc } = addSnap(tl, el);

      // Split open along the joint, each half riding out on its panel
      tl.addLabel("open", "snap+=1.75")
        .to([word, desc], { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" }, "open")
        .call(open, [], "open+=0.55")
        .to(q(".intro-panel.l"), { xPercent: -100, duration: 1.05, ease: "power4.inOut" }, "open+=0.25")
        .to(q(".intro-panel.r"), { xPercent: 100, duration: 1.05, ease: "power4.inOut" }, "open+=0.25")
        .to(L, { x: () => -window.innerWidth * 0.62, rotation: -12, duration: 1.05, ease: "power4.inOut" }, "open+=0.25")
        .to(R, { x: () => window.innerWidth * 0.62, rotation: 12, duration: 1.05, ease: "power4.inOut" }, "open+=0.25");

      // Click, tap or any key skips ahead to the split
      const skip = () => {
        if (tl.time() < tl.labels.open) tl.seek("open");
        tl.timeScale(1.6);
      };
      el.addEventListener("click", skip);
      window.addEventListener("keydown", skip);

      // Belt and braces: never leave the overlay up
      const safety = window.setTimeout(finish, 7000);

      return () => {
        el.removeEventListener("click", skip);
        window.removeEventListener("keydown", skip);
        window.clearTimeout(safety);
      };
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div className="intro" ref={root} aria-hidden="true">
      <div className="intro-panel l" />
      <div className="intro-panel r" />
      <div className="intro-stage">
        <LogoArt />
      </div>
      <button type="button" className="intro-skip" tabIndex={-1}>Skip</button>
    </div>
  );
}
