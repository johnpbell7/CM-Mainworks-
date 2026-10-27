import Illustration, { type IllustrationKind } from "./Illustration";
import PhotoBasic, { type PhotoProps } from "./PhotoBasic";

type Props = PhotoProps & {
  /** Shown instead of the placeholder label until a real photo arrives */
  illo?: IllustrationKind;
};

/** A photo slot. Shows the real image (lazy loaded) when `src` is set, otherwise the drawing or a labelled placeholder. */
export default function Photo({ illo, ...props }: Props) {
  if (!props.media.src && illo) {
    const r = props.reveal === false ? {} : { "data-reveal": "img" };
    return (
      <div className={`ph ph-illo ${props.className ?? ""}`} style={props.style} {...r}>
        <Illustration kind={illo} fit="bottom" />
      </div>
    );
  }
  return <PhotoBasic {...props} />;
}
