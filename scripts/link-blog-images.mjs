#!/usr/bin/env node
/**
 * Point each blog post's frontmatter `image:` at its matching file in
 * src/assets/images/blog/<slug>.<ext>, if one exists.
 *
 * Posts with no matching image are left alone, so partial coverage is fine —
 * run this again each time you add more photos.
 *
 *   node scripts/link-blog-images.mjs           apply
 *   node scripts/link-blog-images.mjs --dry-run  show what would change
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const POSTS_DIR = 'src/data/post';
const IMAGES_DIR = 'src/assets/images/blog';
const EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

const dryRun = process.argv.includes('--dry-run');

if (!existsSync(POSTS_DIR)) {
  console.error(`No ${POSTS_DIR} directory — run this from the repo root.`);
  process.exit(1);
}

const available = existsSync(IMAGES_DIR)
  ? readdirSync(IMAGES_DIR).filter((f) => EXTS.includes(extname(f).toLowerCase()))
  : [];

const bySlug = new Map(available.map((f) => [basename(f, extname(f)), f]));

let changed = 0;
let alreadyLinked = 0;
let noImage = 0;

for (const file of readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))) {
  const slug = basename(file, extname(file));
  const match = bySlug.get(slug);

  if (!match) {
    noImage++;
    continue;
  }

  const path = join(POSTS_DIR, file);
  const source = readFileSync(path, 'utf8');
  const target = `~/assets/images/blog/${match}`;

  if (source.includes(target)) {
    alreadyLinked++;
    continue;
  }

  // Only touch the frontmatter block, never the body.
  const fm = source.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) {
    console.warn(`  ! ${file}: no frontmatter block, skipped`);
    continue;
  }

  const updatedFm = fm[1].match(/^image:/m)
    ? fm[1].replace(/^image:.*$/m, `image: '${target}'`)
    : `${fm[1]}\nimage: '${target}'`;

  if (dryRun) {
    console.log(`  would link ${file} -> ${match}`);
  } else {
    writeFileSync(path, source.replace(fm[0], `---\n${updatedFm}\n---`), 'utf8');
    console.log(`  linked ${file} -> ${match}`);
  }
  changed++;
}

console.log(
  `\n  ${dryRun ? 'would change' : 'changed'}: ${changed} | already linked: ${alreadyLinked} | no image yet: ${noImage}`
);

if (noImage > 0) {
  console.log(`  (posts with no image keep the default hero — see BLOG-IMAGE-SHOTLIST.md)`);
}
