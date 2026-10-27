import Image from "next/image";
import type { CSSProperties } from "react";
import type { Media } from "@/content/media";
import { Camera } from "./Icons";

export type PhotoProps = {
  media: Media;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  reveal?: boolean;
};

/**
 * A photo slot without the drawings: the real image when `src` is set, otherwise a
 * labelled placeholder. Browser-side components (the before-and-after slider, the
 * project grid) use this one, so the drawings aren't sent to the phone as script.
 */
export default function PhotoBasic({ media, sizes, className = "", style, priority, reveal = true }: PhotoProps) {
  const r = reveal ? { "data-reveal": "img" } : {};
  if (!media.src) {
    return (
      <div className={`ph ph-empty ${className}`} style={style} role="img" aria-label={`Space for a photo: ${media.label}`} {...r}>
        <span className="ph-label">
          <Camera />
          {media.label}
          <em>Photo to come</em>
        </span>
      </div>
    );
  }
  return (
    <div className={`ph ${className}`} style={style} {...r}>
      <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} fetchPriority={priority ? "high" : undefined} loading={priority ? undefined : "lazy"} />
    </div>
  );
}
