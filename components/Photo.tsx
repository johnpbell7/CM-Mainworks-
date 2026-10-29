import Illustration, { type IllustrationKind } from "./Illustration";
import PhotoBasic, { type PhotoProps } from "./PhotoBasic";

type Props = PhotoProps & {
  /** The service's drawing. Shown on its own until a real photo arrives. */
  illo?: IllustrationKind;
  /** Cards and the homepage keep the drawing even when a photo exists (see content/media.ts). */
  drawingOnly?: boolean;
};

/**
 * A photo slot with a drawing.
 *  - no photo yet, a card, or the homepage: the drawing on its section colour
 *  - anywhere else with a photo: Connor's photo on its own
 */
export default function Photo({ illo, drawingOnly, ...props }: Props) {
  const { media, className = "", style, reveal = true } = props;
  const r = reveal ? { "data-reveal": "img" } : {};
  if (illo && (drawingOnly || !media.src)) {
    return (
      <div className={`ph ph-illo ${className}`} style={style} {...r}>
        <Illustration kind={illo} fit="bottom" />
      </div>
    );
  }
  return <PhotoBasic {...props} />;
}
