import Image from "next/image";
import Illustration, { type IllustrationKind } from "./Illustration";
import PhotoBasic, { type PhotoProps } from "./PhotoBasic";

type Props = PhotoProps & {
  /** The service's drawing. Shown on its own until a real photo arrives, then tucked into the photo's corner. */
  illo?: IllustrationKind;
  /** Cards keep the drawing even when a photo exists (see content/media.ts). */
  drawingOnly?: boolean;
};

/**
 * A photo slot with a drawing.
 *  - no photo yet, or a card: the drawing on its section colour
 *  - a feature row with a photo: Connor's photo leads, the drawing sits in the corner
 */
export default function Photo({ illo, drawingOnly, ...props }: Props) {
  const { media, sizes, className = "", style, priority, reveal = true } = props;
  const r = reveal ? { "data-reveal": "img" } : {};
  if (illo && (drawingOnly || !media.src)) {
    return (
      <div className={`ph ph-illo ${className}`} style={style} {...r}>
        <Illustration kind={illo} fit="bottom" />
      </div>
    );
  }
  if (illo && media.src) {
    return (
      <div className={`ph ph-pair ${className}`} style={style} {...r}>
        <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} fetchPriority={priority ? "high" : undefined} loading={priority ? undefined : "lazy"} />
        <span className="pair-ill" aria-hidden="true"><Illustration kind={illo} fit="bottom" decorative /></span>
      </div>
    );
  }
  return <PhotoBasic {...props} />;
}
