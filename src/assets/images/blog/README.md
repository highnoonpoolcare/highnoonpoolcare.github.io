# Blog post images

Drop post images in this folder named after the post slug:

    src/assets/images/blog/<slug>.jpg

e.g. `january-pool-equipment-check.jpg` for `src/data/post/january-pool-equipment-check.md`.

Then run:

    node scripts/link-blog-images.mjs

That points each post's frontmatter `image:` at its matching file. Posts with no
matching file keep the default hero image, so partial coverage is fine.

## Specs

- **Format**: `.jpg` (or `.png` / `.webp` — the script accepts all three)
- **Aspect**: landscape, roughly 16:9
- **Size**: 1600x900 or larger. Astro generates optimised, resized WebP at build,
  so a big original is good. Do not pre-compress.
- **Orientation**: shoot landscape, not portrait.

## Why your own photos

Original photography of your own work is worth more here than stock. It is a real
E-E-A-T signal, it cannot be reverse-image-searched to a stock library, and the same
shots are reusable on your Google Business Profile, which is the highest-leverage
local SEO asset you have.

See `BLOG-IMAGE-SHOTLIST.md` in the repo root for what each post needs.
