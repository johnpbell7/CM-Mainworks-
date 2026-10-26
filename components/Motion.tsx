"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

/*
  Site-wide motion, driven by data attributes so pages stay server components.
    data-reveal="up"     fade up when scrolled into view
    data-reveal="stagger" children fade up one after another
    data-reveal="img"    photo wipes up from the bottom, image settles from a slight zoom
    .hl                  marker highlight draws across the words
    [data-illustration]  ink lines draw in, colour blocks slide into their offset
  Everything is skipped under prefers-reduced-motion.
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
          gsap.fromTo(bgImg, { scale: 1.1 }, { scale: 1.03, duration: 2.4, ease: "power2.out" });
          gsap.to(bgImg, {
            yPercent: 8, ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          });
        }

        // Everything else waits until the browser is idle, so it never holds up
        // the first paint. Content is never hidden waiting for script: anything
        // already on screen just stays put, and only what's further down the
        // page is tucked away to animate in when it's scrolled to.
        let timer = 0;
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
            start: "top 92%", once: true,
            onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08 }),
          });

          staggers.forEach((el) => gsap.set(el.children, { opacity: 0, y: 34 }));
          ScrollTrigger.batch(staggers, {
            start: "top 86%", once: true,
            onEnter: (els) => els.forEach((el) =>
              gsap.to(el.children, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out", stagger: 0.1 })),
          });

          // illustration tiles just fade in quickly; the drawing does the work
          gsap.set(tiles, { opacity: 0 });
          ScrollTrigger.batch(tiles, {
            start: "top 95%", once: true,
            onEnter: (els) => gsap.to(els, { opacity: 1, duration: 0.35, ease: "power1.out" }),
          });

          photos.forEach((el) => {
            const img = el.querySelector("img");
            gsap.set(el, { clipPath: "inset(100% 0% 0% 0% round 6px)" });
            ScrollTrigger.create({
              trigger: el, start: "top 90%", once: true,
              onEnter: () => {
                const tl = gsap.timeline();
                tl.to(el, { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.15, ease: "power4.inOut", clearProps: "clipPath" });
                if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.5, ease: "power3.out", clearProps: "transform" }, 0.1);
              },
            });
          });

          // ---- marker highlights ----
          gsap.set(marks, { backgroundSize: "0% 74%" });
          marks.forEach((el) => ScrollTrigger.create({
            trigger: el, start: "top 90%", once: true,
            onEnter: () => gsap.to(el, { backgroundSize: "100% 74%", duration: 0.55, ease: "power2.inOut", delay: 0.1 }),
          }));

          // ---- illustrations draw themselves ----
          // Measuring every line for DrawSVG is the costly part, so each drawing
          // is only set up when it reaches the screen.
          gsap.set(drawings, { autoAlpha: 0 });
          drawings.forEach((svg) => ScrollTrigger.create({
            trigger: svg, start: "top 95%", once: true,
            onEnter: () => {
              const q = gsap.utils.selector(svg);
              const outlined = q(".l, .lt, .lw, .lg, .lc, .p, .fs, .fds, .fls, .g, .pole-o, .pole-i");
              gsap.set(svg, { autoAlpha: 1 });
              gsap.timeline()
                .fromTo(q(".bg"), { scale: 0.92, opacity: 0, transformOrigin: "50% 100%" }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out", immediateRender: true }, 0)
                .fromTo(outlined, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.5, ease: "power2.inOut", stagger: { amount: 0.45 }, immediateRender: true }, 0.05)
                .fromTo(q(".p, .fs, .fds, .fls, .g"), { fillOpacity: 0 }, { fillOpacity: 1, duration: 0.3, stagger: { amount: 0.4 }, immediateRender: true }, 0.2)
                .fromTo(q(".f:not(.roll), .fl, .fd, .d, .ht"), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: { amount: 0.3 }, immediateRender: true }, 0.15)
                .from(q(".off"), { x: 0, y: 0, duration: 0.45, ease: "back.out(2)" }, 0.55)
                .fromTo(q(".roll"), { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 0.7, ease: "power2.inOut", immediateRender: true }, 0.1);
            },
          }));

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

        // Images loading late can shift layout; re-measure once they settle,
        // not once per image.
        const refresh = () => {
          clearTimeout(timer);
          timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
        };
        const imgs = Array.from(document.images).filter((i) => !i.complete);
        imgs.forEach((i) => i.addEventListener("load", refresh, { once: true }));
        return () => {
          if (hasIdle) window.cancelIdleCallback(idle);
          else clearTimeout(idle);
          clearTimeout(timer);
          imgs.forEach((i) => i.removeEventListener("load", refresh));
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
