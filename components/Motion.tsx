"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  Site-wide motion, driven by data attributes so pages stay server components.
    data-reveal="up"     fade up when scrolled into view
    data-reveal="stagger" children fade up one after another
    data-reveal="img"    photo fades in, image settles from a slight zoom
    .hl                  marker highlight draws across the words
    [data-illustration]  drawing fades up as one piece
  Everything is skipped under prefers-reduced-motion.
  Kept light so scrolling stays smooth on phones: only opacity and transform are
  animated (no clip-path wipes, no line-by-line drawing, which repaint every frame),
  everything starts as it reaches the screen, and nothing runs longer than 0.8s.
*/
export default function Motion() {
  const path = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", (_ctx, contextSafe) => {
        const once = (trigger: Element, start = "top 86%") => ({ trigger, start, once: true });

        // ---- hero: text is static; only the photo settles and drifts ----
        const hero = document.querySelector(".hero");
        const bgImg = hero?.querySelector(".hero-bg img");
        if (hero && bgImg) {
          gsap.fromTo(bgImg, { scale: 1.1 }, { scale: 1.03, duration: 1.8, ease: "power2.out" });
          // The slow drift on scroll is for bigger screens only: on a phone it makes the
          // frosted strip over the photo re-blur on every frame.
          if (window.matchMedia("(min-width: 721px) and (pointer: fine)").matches) {
            gsap.to(bgImg, {
              yPercent: 8, ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
            });
          }
        }

        // Everything else waits until the browser is idle, so it never holds up
        // the first paint. Content is never hidden waiting for script: anything
        // already on screen just stays put, and only what's further down the
        // page is tucked away to animate in when it's scrolled to.
        const setup = contextSafe!(() => {
          const vh = window.innerHeight;
          const pick = <T extends Element>(sel: string) =>
            gsap.utils.toArray<T>(sel).filter((el) => !el.closest(".hero") && el.getBoundingClientRect().top > vh);

          // read every position first, then write, so the page is measured once
          const ups = pick<HTMLElement>('[data-reveal="up"]');
          const staggers = pick<HTMLElement>('[data-reveal="stagger"]');
          const tiles = pick<HTMLElement>('.ph-illo[data-reveal="img"]');
          const photos = pick<HTMLElement>('[data-reveal="img"]:not(.ph-illo)');
          const marks = pick<HTMLElement>(".hl");
          const drawings = pick<SVGSVGElement>("[data-illustration]");
          const badge = pick<HTMLElement>(".closing .big-badge")[0];

          gsap.set(ups, { opacity: 0, y: 18 });
          ScrollTrigger.batch(ups, {
            start: "top 98%", once: true,
            onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 }),
          });

          staggers.forEach((el) => gsap.set(el.children, { opacity: 0, y: 34 }));
          ScrollTrigger.batch(staggers, {
            start: "top 94%", once: true,
            onEnter: (els) => els.forEach((el) =>
              gsap.to(el.children, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 })),
          });

          // illustration tiles just fade in quickly; the drawing does the work
          gsap.set(tiles, { opacity: 0 });
          ScrollTrigger.batch(tiles, {
            start: "top 98%", once: true,
            onEnter: (els) => gsap.to(els, { opacity: 1, duration: 0.35, ease: "power1.out" }),
          });

          gsap.set(photos, { opacity: 0 });
          ScrollTrigger.batch(photos, {
            start: "top 96%", once: true,
            onEnter: (els) => els.forEach((el, i) => {
              const img = el.querySelector("img");
              gsap.to(el, { opacity: 1, duration: 0.5, ease: "power1.out", delay: i * 0.06 });
              if (img) gsap.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 0.8, ease: "power3.out", delay: i * 0.06, clearProps: "transform" });
            }),
          });

          // ---- marker highlights ----
          gsap.set(marks, { backgroundSize: "0% 74%" });
          ScrollTrigger.batch(marks, {
            start: "top 94%", once: true,
            onEnter: (els) => gsap.to(els, { backgroundSize: "100% 74%", duration: 0.45, ease: "power2.inOut", delay: 0.05 }),
          });

          // ---- illustrations fade up as a whole ----
          // Moving anything inside a drawing (drawing each line in, sliding its colour
          // block) repaints the whole drawing on every frame, which was the slowest thing
          // on the site. Fading the drawing as one piece is handled by the graphics chip.
          gsap.set(drawings, { autoAlpha: 0, y: 14 });
          ScrollTrigger.batch(drawings, {
            start: "top 98%", once: true,
            onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.05, force3D: true, clearProps: "transform" }),
          });

          // ---- closing badge drifts in ----
          if (badge) {
            gsap.fromTo(badge, { rotation: -14, y: 60, opacity: 0 }, {
              rotation: 0, y: 0, opacity: 1, duration: 1.3, ease: "back.out(1.6)", scrollTrigger: once(badge, "top 92%"),
            });
          }
        });

        const run = () => { setup(); };
        const hasIdle = typeof window.requestIdleCallback === "function";
        const idle = hasIdle ? window.requestIdleCallback(run, { timeout: 1200 }) : window.setTimeout(run, 200);

        // No re-measuring when photos finish loading: every photo sits in a frame with
        // a fixed shape, so a late photo never moves anything. Re-measuring every trigger
        // mid-scroll was the biggest single freeze on a phone with a slow connection.
        // (ScrollTrigger still re-measures by itself on page load and resize.)
        return () => {
          if (hasIdle) window.cancelIdleCallback(idle);
          else clearTimeout(idle);
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-hero]", { opacity: 1, clearProps: "transform" });
      });
    },
    { dependencies: [path], revertOnUpdate: true }
  );

  return null;
}
