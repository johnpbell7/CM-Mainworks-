import Image from "next/image";
import type { CSSProperties } from "react";
import type { Media } from "@/content/media";
import { Camera } from "./Icons";

type Props = {
  media: Media;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  reveal?: boolean;
};

/** A photo slot. Shows the real image (lazy loaded) when `src` is set, otherwise a labelled placeholder. */
export default function Photo({ media, sizes, className = "", style, priority, reveal = true }: Props) {
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
      <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : "lazy"} />
    </div>
  );
}
