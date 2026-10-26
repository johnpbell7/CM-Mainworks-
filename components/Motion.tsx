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

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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

        // ---- reviews photo drifts behind the quote ----
        const rev = document.querySelector(".reviews");
        const revImg = rev?.querySelector(".reviews-bg img");
        if (rev && revImg) {
          gsap.fromTo(revImg, { yPercent: -8, scale: 1.18 }, {
            yPercent: 8, scale: 1.18, ease: "none",
            scrollTrigger: { trigger: rev, start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        // ---- generic reveals ----
        // Tweens are built only when an element scrolls into view, so the page
        // doesn't pay for every animation up front on a phone.
        ScrollTrigger.batch('[data-reveal="up"]', {
          start: "top 92%", once: true,
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08 }),
        });

        ScrollTrigger.batch('[data-reveal="stagger"]', {
          start: "top 86%", once: true,
          onEnter: (els) => els.forEach((el) => {
            gsap.set(el, { opacity: 1 });
            gsap.fromTo(el.children, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out", stagger: 0.1 });
          }),
        });

        // illustration tiles just fade in quickly; the drawing does the work
        ScrollTrigger.batch('.ph-illo[data-reveal="img"]', {
          start: "top 95%", once: true,
          onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" }),
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="img"]:not(.ph-illo)').forEach((el) => {
          if (el.closest(".hero")) return;
          ScrollTrigger.create({
            trigger: el, start: "top 90%", once: true,
            onEnter: () => {
              const img = el.querySelector("img");
              const tl = gsap.timeline();
              tl.fromTo(el, { opacity: 1, clipPath: "inset(100% 0% 0% 0% round 6px)" }, {
                clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.15, ease: "power4.inOut",
                clearProps: "clipPath",
              });
              if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.5, ease: "power3.out", clearProps: "transform" }, 0.1);
            },
          });
        });

        // ---- marker highlights (outside the hero) ----
        gsap.utils.toArray<HTMLElement>(".hl").forEach((el) => {
          if (el.closest(".hero")) return;
          gsap.set(el, { backgroundSize: "0% 74%" });
          ScrollTrigger.create({
            trigger: el, start: "top 90%", once: true,
            onEnter: () => gsap.to(el, { backgroundSize: "100% 74%", duration: 0.55, ease: "power2.inOut", delay: 0.1 }),
          });
        });

        // ---- illustrations draw themselves ----
        // Measuring every line for DrawSVG is the costly part, so each drawing
        // is only set up when it reaches the screen.
        gsap.utils.toArray<SVGSVGElement>("[data-illustration]").forEach((svg) => {
          gsap.set(svg, { autoAlpha: 0 });
          ScrollTrigger.create({
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
          });
        });

        // ---- closing badge drifts in ----
        const bb = document.querySelector(".closing .big-badge");
        if (bb) {
          gsap.fromTo(bb, { rotation: -14, y: 60, opacity: 0 }, {
            rotation: 0, y: 0, opacity: 1, duration: 1.3, ease: "back.out(1.6)", scrollTrigger: once(bb, "top 92%"),
          });
        }

        // Images loading late can shift layout; re-measure once they settle,
        // not once per image.
        let timer = 0;
        const refresh = () => {
          clearTimeout(timer);
          timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
        };
        const imgs = Array.from(document.images).filter((i) => !i.complete);
        imgs.forEach((i) => i.addEventListener("load", refresh, { once: true }));
        return () => {
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
