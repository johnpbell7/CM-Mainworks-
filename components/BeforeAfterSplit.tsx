import type { CSSProperties } from "react";
import type { Media } from "@/content/media";
import PhotoBasic from "./PhotoBasic";

/** Before and after side by side, for pairs that weren't taken from the same spot (so a slider wouldn't line up). */
export default function BeforeAfterSplit({ before, after, sizes, style }: { before: Media; after: Media; sizes: string; style?: CSSProperties }) {
  return (
    <div className="ba-split" style={style} data-reveal="img">
      <div className="half">
        <PhotoBasic media={before} sizes={sizes} reveal={false} />
        <span className="tag">Before</span>
      </div>
      <div className="half">
        <PhotoBasic media={after} sizes={sizes} reveal={false} />
        <span className="tag">After</span>
      </div>
    </div>
  );
}
