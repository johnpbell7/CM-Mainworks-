"use client";

import { useState } from "react";
import type { Media } from "@/content/media";
import Photo from "./PhotoBasic";
import { Chevrons } from "./Icons";

/** Before/after comparison. Keyboard accessible through a native range input. */
export default function BeforeAfter({ before, after, label = "Compare before and after" }: { before: Media; after: Media; label?: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="ba" style={{ "--pos": `${pos}%` } as React.CSSProperties} data-reveal="img">
      <Photo media={before} className="before" sizes="(max-width: 1080px) 100vw, 60vw" reveal={false} />
      <Photo media={after} className="after" sizes="(max-width: 1080px) 100vw, 60vw" reveal={false} />
      <span className="tag l">Before</span>
      <span className="tag r">After</span>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label={label} aria-valuetext={`${pos}% before`} />
      <div className="line" />
      <div className="knob"><Chevrons /></div>
    </div>
  );
}
