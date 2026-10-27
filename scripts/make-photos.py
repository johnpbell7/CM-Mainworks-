"""
Makes the web copies of Connor's job photos from the originals, and the list the site reads.

    python3 scripts/make-photos.py

Reads scripts/photos.json (which photos, per job, and any crop), takes each original from
`source` (kept outside this repo, in the studio's client folder), and writes:

  public/images/projects/<job>/<name>.jpg   longest edge 1400px, JPEG, no camera or
                                            location data, turned the right way up
  content/photos.ts                         every photo's address, width and height

Next.js then makes the smaller WebP and AVIF sizes each screen needs, so only these
masters live in the repo. Crops are fractions of the original (left, top, right, bottom),
used to line up before-and-after pairs or to keep people out of shot.
Check every new photo for faces, names, house numbers and number plates before adding it.
"""
import json
import os
import sys
from PIL import Image, ImageOps

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
spec = json.load(open(os.path.join(here, "photos.json")))
source = os.path.normpath(os.path.join(root, spec["source"]))
max_edge, quality = spec["maxEdge"], spec["quality"]

if not os.path.isdir(source):
    sys.exit(f"Originals not found at {source}")

entries, total = [], 0
for job, photos in spec["projects"].items():
    out_dir = os.path.join(root, "public", "images", "projects", job)
    os.makedirs(out_dir, exist_ok=True)
    keep = set()
    for p in photos:
        im = ImageOps.exif_transpose(Image.open(os.path.join(source, f"{p['fbid']}.jpg"))).convert("RGB")
        if "crop" in p:
            l, t, r, b = p["crop"]
            im = im.crop((round(l * im.width), round(t * im.height), round(r * im.width), round(b * im.height)))
        im.thumbnail((max_edge, max_edge), Image.LANCZOS)
        name = f"{p['name']}.jpg"
        path = os.path.join(out_dir, name)
        im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)  # saved without EXIF
        keep.add(name)
        total += os.path.getsize(path)
        entries.append((f"{job}/{p['name']}", f"/images/projects/{job}/{name}", im.width, im.height))
    for stale in set(os.listdir(out_dir)) - keep:
        os.remove(os.path.join(out_dir, stale))

lines = [
    "// Made by scripts/make-photos.py from scripts/photos.json. Don't edit by hand.",
    "export type PhotoFile = { src: string; w: number; h: number };",
    "",
    "export const photoFiles: Record<string, PhotoFile> = {",
    *[f'  "{key}": {{ src: "{src}", w: {w}, h: {h} }},' for key, src, w, h in entries],
    "};",
    "",
]
open(os.path.join(root, "content", "photos.ts"), "w").write("\n".join(lines))
print(f"{len(entries)} photos, {total / 1024 / 1024:.1f} MB")
