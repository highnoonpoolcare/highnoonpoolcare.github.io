# TODO before pushing the revamped site

Status as of 2026-09-29 (originally 2026-09-23). Nothing is committed — `git status` shows ~25 changed paths,
0 commits ahead of `origin/main`. The live site is untouched and still serving the
pre-revamp build.

---

## 🔴 Blockers — must happen before push

### 1. Eyeball review of the whole site

Dev server: `npm run dev` → <http://localhost:4321/>

| Page                          | What to check                                                       |
| ----------------------------- | ------------------------------------------------------------------- |
| `/`                           | New H1, logo with no wordmark text, header does not scroll sideways |
| `/services` + 6 service pages | Accuracy of what's described                                        |
| `/pool-service/*-tx` (5)      | **Local accuracy — highest priority**                               |
| `/blog` (3 pages, 16 posts)   | Wording (see #2)                                                    |

The five city pages lead on claims written from general North Texas knowledge, not
from your routes. Verify or correct:

- **Denton** — mature pecan/oak canopy, heavy fall leaf drop, many 70s/80s pools, rental turnover near UNT/TWU
- **Corinth** — home base, mostly 90s/2000s builds, east side catches wind off the lake
- **Highland Village** — large lots, heaviest leaf load, spas/water features/automation common
- **Lake Dallas** — wind-blown debris off Lake Lewisville, older equipment, tighter access
- **Lewisville** — pools spanning four decades, Old Town vs Vista Ridge, HOA neighborhoods

### 2. Reword the 16 blog post BODIES

Titles, excerpts and meta descriptions have been rewritten in an owner's voice
(2026-09-29) — the colon-subtitle constructions, "Actually", and "Here is what..."
openers are gone. **The bodies are still as originally drafted** and are what you
flagged as reading AI-generated. Files: `src/data/post/*.md`.
Rendered preview at `/blog` — dev mode shows the whole queue; production hides
future-dated posts.

Publishing order (Thursdays 08:00 Central):

| #   | Date       | Title                                             |
| --- | ---------- | ------------------------------------------------- |
| 1   | 2026-10-01 | Getting Your Pool Through a North Texas Fall      |
| 2   | 2026-10-08 | We Clean More Filters in October Than in July     |
| 3   | 2026-10-15 | When the Pecans Start Dropping, Skim First        |
| 4   | 2026-10-22 | Most People Quit Swimming Three Weeks Too Early   |
| 5   | 2026-10-29 | Hard Water Is What Kills Heaters Around Here      |
| 6   | 2026-11-05 | Cutting Pump Hours Without Turning the Pool Green |
| 7   | 2026-11-12 | The First Norther Is Your Cue                     |
| 8   | 2026-11-19 | Keep the Pump Running When It Freezes             |
| 9   | 2026-11-26 | We Don't Close Pools Down Here                    |
| 10  | 2026-12-03 | Winter Chemistry Is Easier, Not Optional          |
| 11  | 2026-12-10 | What Cracks First in a Hard Freeze                |
| 12  | 2026-12-17 | Algae Doesn't Take the Winter Off                 |
| 13  | 2026-12-24 | Nobody's Swimming, But Everyone's Looking at It   |
| 14  | 2026-12-31 | How Few Hours Can You Run the Pump in January?    |
| 15  | 2027-01-07 | Five Things to Fix Before Next Summer             |
| 16  | 2027-01-14 | Thirty Minutes at the Equipment Pad in January    |

> **Dates shifted +1 week on 2026-09-29.** Post #1 now publishes 2026-10-01 rather
> than a date already in the past, so **nothing goes live on push any more** — a
> production build currently emits 0 posts. That removes the earlier urgency, but the
> first post is only 2 days out, so its wording is still the most time-sensitive item.
>
> DST was handled: the post moving from 2026-10-29 to 2026-11-05 crosses the Nov 1
> boundary and its offset changed from -05:00 to -06:00. All 16 remain Thursday 08:00
> Central.

### 3. Blog photography — 16 shots needed

All 16 posts currently share the same `hero_pool.png`, which is wrong for most of them
(the January equipment-check post should show an equipment pad, not clean water).

**I cannot generate photographs** — no image generation available here. What exists:

- `BLOG-IMAGE-SHOTLIST.md` — what to photograph for each post, matched to article intent
- `src/assets/images/blog/` — drop files here named `<slug>.jpg`
- `node scripts/link-blog-images.mjs` — points each post's frontmatter at its image

Partial coverage is fine; posts without a photo keep the current hero. Your own photos
beat stock here — original imagery is a real E-E-A-T signal and every shot doubles as
Google Business Profile content.

### 4. Replace the placeholder testimonials

`src/pages/index.astro` — "Sarah M.", "Michael T.", "Jennifer K." are fabricated.
They are currently live on the production site.

No `Review`/`aggregateRating` schema has been added and none should be until they are
real: marking up fabricated reviews violates Google policy and FTC endorsement rules.
Once genuine, add the markup — it produces a star rating in search results.

### 5. Create a Cloudflare Deploy Hook and add it as a secret

The weekly publish needs exactly **one** secret now, not two.

**Cloudflare dashboard** → Workers & Pages → `highnoonpoolcare` → Settings → Builds →
**Deploy Hooks** → create one named e.g. `weekly-blog-publish`, branch `main`, copy the URL.

**GitHub** → Settings → Secrets and variables → Actions → add:

| Secret                       | Value                        |
| ---------------------------- | ---------------------------- |
| `CLOUDFLARE_DEPLOY_HOOK_URL` | the hook URL you just copied |

Treat that URL as a credential — it has no auth header, so anyone holding it can trigger
a build. It can only ever trigger a build of `main`, which is a much smaller blast radius
than the `Workers Scripts:Edit` API token the earlier design needed.

`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are **no longer required** — the
workflow no longer builds or deploys anything itself.

---

## 🟡 Should do soon after push

### 6. Google Business Profile

Highest-impact local SEO item, and nothing in this repo substitutes for it.
Category **Pool Cleaning Service**, all service-area cities, hours Mon–Fri 7:00–18:00,
real photos. NAP must match exactly: `High Noon Pool Care` / `+1-940-222-2308` /
`Corinth, TX 76208`.

### 7. Google Search Console

Switch to the **`www`** property (canonical host changed during the Cloudflare
migration) and submit `https://www.highnoonpoolcare.com/sitemap-index.xml`.

### 8. Start a review flow

Review count, recency and velocity are among the strongest local ranking signals.
Ask after a completed green-to-clean or at the three-month mark on weekly service.

---

## 🟢 Optional / judgement calls

### 9. Logo size

`src/components/Logo.astro` is `h-[150px] w-[150px]` — very large for a nav bar and
likely still widening the header on narrow screens. The wordmark text is already
removed. Reducing it was not requested, so it was left alone.

### 10. Queue runs dry 2027-01-14

16 posts ends the queue. Spring/summer topic backlog is in `SEO-ACTIONS.md`.

### 11. Remaining 11 service-area cities — deferred by request

Argyle, Ponder, Justin, Hickory Creek, Little Elm, Shady Shores, Cross Roads,
Oak Point, Bartonville, Lantana, Double Oak. Add only where genuinely local content
is possible; thin pages read as doorway pages and can hurt.

### 12. Astro 7 / Tailwind 4 migration

Not required for security. The one remaining critical (`define:vars` XSS) is not
exploitable here — both usages pass a build-time config string, and the companion
advisory needs SSR, which this site does not use.

---

## ✅ Done this session (verify during review)

**Hosting migration**

- GitHub Pages → Cloudflare Workers; apex 301s to `www` preserving path and query
- SSL valid on both hosts; all 12 email/DNS records untouched
- GitHub Pages unpublished, domain claim released

**Content**

- Blog titles, excerpts and meta descriptions rewritten in owner voice (2026-09-29)

- 6 service pages + hub, 5 city pages, 16-post blog queue
- Homepage H1 now carries local + service intent
- Contact email `info@highnoonpoolcare.com` throughout
- Header logo wordmark removed

**Structured data / AIO**

- `FAQPage` on 11 pages / 47 Q&A pairs (was 0)
- `BlogPosting` on posts — fixed a bug where the schema was built but silently
  discarded, because neither layout had a `head` slot
- Per-page `Service` schema on 6 pages, joined to the business `@id`
- `LocalBusiness` fixed: image was 404ing; added geo, priceRange, `@id`,
  16 structured `City` objects, 6-service `OfferCatalog`
- `llms.txt` added; `robots.txt` now explicitly allows AI crawlers

**Security & housekeeping**

- npm vulnerabilities **42 → 14**; all 3 criticals and 23 of 28 highs resolved
- Root cause was `astro-compress` and `sharp` being pinned exactly, blocking `audit fix`
- `npm audit fix --force` deliberately NOT run — it wanted to downgrade
  `@astrojs/tailwind` 5.1.5 → 2.1.3 and revert `astro-compress`
- `npm run check` now passes fully (was already failing before this work)

**Regression (clean `npm ci` + build)**

- 16 pages, 0 invalid JSON-LD, all 18 routes 200, all 16 posts render in dev
- Blog queue correctly publishes 0 posts in production
- Canonicals all on `www`; `dist/CNAME` gone
