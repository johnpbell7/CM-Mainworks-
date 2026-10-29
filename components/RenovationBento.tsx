import Photo from "./Photo";
import type { Media } from "@/content/media";

/** Three finished rooms in one frame, one tall and two stacked beside it, wherever a full renovation is pitched. */
export default function RenovationBento({ photos, priority }: { photos: Media[]; priority?: boolean }) {
  return (
    <div className="bento">
      {photos.map((m, i) => (
        <Photo key={m.src} media={m} sizes={i ? "(max-width: 720px) 45vw, 22vw" : "(max-width: 720px) 55vw, 27vw"} priority={priority && !i} />
      ))}
    </div>
  );
}
