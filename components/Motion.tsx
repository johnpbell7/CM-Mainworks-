"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
  Site-wide motion, driven by data attributes so pages stay server components.
    data-hero            hero items, played once the intro has opened
    data-reveal="up"     fade up when scrolled into view
    data-reveal="stagger" children fade up one after another
    data-reveal="img"    photo wipes up from the bottom, image settles from a slight zoom
    .hl                  marker highlight draws across the words
    .steps .rule         step rules draw left to right
  Everything is skipped under prefers-reduced-motion.
*/
export default function Motion() {
  const path = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const once = (trigger: Element, start = "top 86%") => ({ trigger, start, once: true });

        // ---- hero ----
        const hero = document.querySelector(".hero");
        if (hero) {
          const items = hero.querySelectorAll("[data-hero]");
          const heroHl = hero.querySelectorAll(".hl");
          const bgImg = hero.querySelector(".hero-bg img");
          gsap.set(heroHl, { backgroundSize: "0% 74%" });

          const play = () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            if (bgImg) tl.fromTo(bgImg, { scale: 1.14 }, { scale: 1.04, duration: 2.6, ease: "power2.out" }, 0);
            tl.fromTo(items, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1.05, stagger: 0.09 }, 0.1)
              .to(heroHl, { backgroundSize: "100% 74%", duration: 0.75, ease: "power2.inOut" }, 0.65);
          };

          const w = window as unknown as { __cmIntroOpen?: boolean };
          if (document.documentElement.classList.contains("intro-on") && !w.__cmIntroOpen) {
            window.addEventListener("cm:intro-open", play, { once: true });
          } else {
            play();
          }

          // gentle parallax on the photo
          if (bgImg) {
            gsap.to(bgImg, {
              yPercent: 10, ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
            });
          }
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
          gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: once(el) });
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

        // ---- step rules draw across ----
        gsap.utils.toArray<HTMLElement>(".steps .rule").forEach((el, i) => {
          gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut", delay: (i % 3) * 0.12, scrollTrigger: once(el) });
        });

        // ---- FAQ rules ----
        gsap.utils.toArray<HTMLElement>(".faq > div").forEach((el, i) => {
          gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: (i % 2) * 0.1, scrollTrigger: once(el) });
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
