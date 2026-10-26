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
        gsap.utils.toArray<HTMLElement>('[data-reveal="up"]').forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: once(el, "top 92%") });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
          gsap.set(el, { opacity: 1 });
          gsap.fromTo(el.children, { opacity: 0, y: 34 }, {
            opacity: 1, y: 0, duration: 0.95, ease: "power3.out", stagger: 0.1, scrollTrigger: once(el),
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="img"]').forEach((el) => {
          if (el.closest(".hero")) return;
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: once(el, "top 90%") });
          tl.fromTo(el, { opacity: 1, clipPath: "inset(100% 0% 0% 0% round 6px)" }, {
            clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.15, ease: "power4.inOut",
            clearProps: "clipPath",
          });
          if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.5, ease: "power3.out", clearProps: "transform" }, 0.1);
        });

        // ---- marker highlights (outside the hero) ----
        gsap.utils.toArray<HTMLElement>(".hl").forEach((el) => {
          if (el.closest(".hero")) return;
          gsap.fromTo(el, { backgroundSize: "0% 74%" }, {
            backgroundSize: "100% 74%", duration: 0.85, ease: "power2.inOut", delay: 0.25,
            scrollTrigger: once(el, "top 82%"),
          });
        });

        // ---- illustrations draw themselves ----
        gsap.utils.toArray<SVGSVGElement>("[data-illustration]").forEach((svg) => {
          const q = gsap.utils.selector(svg);
          const tl = gsap.timeline({ scrollTrigger: once(svg, "top 88%"), delay: 0.2 });
          tl.fromTo(q(".l, .p"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, ease: "power2.inOut", stagger: 0.035 }, 0)
            .fromTo(q(".p"), { fillOpacity: 0 }, { fillOpacity: 1, duration: 0.5, stagger: 0.03 }, 0.45)
            .fromTo(q(".d"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, ease: "back.out(3)", stagger: 0.04 }, 0.8)
            .from(q(".f:not(.roll)"), { x: 0, y: 0, opacity: 0, duration: 0.7, ease: "back.out(2)", stagger: 0.08 }, 0.75)
            .fromTo(q(".f.roll"), { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 1, ease: "power2.inOut" }, 0.6);
        });

        // ---- closing badge drifts in ----
        const bb = document.querySelector(".closing .big-badge");
        if (bb) {
          gsap.fromTo(bb, { rotation: -14, y: 60, opacity: 0 }, {
            rotation: 0, y: 0, opacity: 1, duration: 1.3, ease: "back.out(1.6)", scrollTrigger: once(bb, "top 92%"),
          });
        }

        // Images loading late can shift layout; re-measure when they arrive.
        const imgs = Array.from(document.images).filter((i) => !i.complete);
        const refresh = () => ScrollTrigger.refresh();
        imgs.forEach((i) => i.addEventListener("load", refresh, { once: true }));
        return () => imgs.forEach((i) => i.removeEventListener("load", refresh));
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-hero]", { opacity: 1, clearProps: "transform" });
      });
    },
    { dependencies: [path], revertOnUpdate: true }
  );

  return null;
}
