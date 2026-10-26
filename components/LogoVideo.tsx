"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LogoArt, addSnap } from "./LogoParts";
import { business } from "@/content/site";

gsap.registerPlugin(useGSAP);

/*
  Square logo animation for social posts. Rendered frame by frame into an MP4 by
  scripts/render-logo-video.mjs, which calls window.__logoVideo.seek(t).
  Plays normally in the browser too.
*/
export const HOLD = 2.2;

export default function LogoVideo() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current!;
    const lines = Array.from(el.querySelectorAll(".lv-line"));
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
    addSnap(tl, el, lines);
    tl.to({}, { duration: HOLD });
    (window as unknown as { __logoVideo: unknown }).__logoVideo = {
      duration: tl.duration(),
      seek: (t: number) => { tl.seek(t, false); },
    };
    if (!new URLSearchParams(location.search).has("render")) tl.play();
  }, { scope: root });

  return (
    <div className="lv" ref={root}>
      <div className="intro-stage lv-stage">
        <LogoArt />
        <div className="lv-text">
          <p className="lv-line lv-tel">{business.phoneDisplay}</p>
        </div>
      </div>
    </div>
  );
}
