# Local SEO: Recommended Actions

Ordered by expected impact. Items marked **[you]** cannot be done from the codebase.

---

## Tier 1 — Highest impact

### 1. ~~Verify the contact form~~ — DONE (confirmed 2026-09-23)

Endpoint `https://formspree.io/f/xlgozjzz` in `src/components/ui/Form.astro` is
confirmed to be your Formspree account and submissions are arriving. No action needed.

### 2. Claim and complete your Google Business Profile **[you]**

For "pool service near me" the map pack sits above organic results, and it is driven by
your Business Profile, not by this website. Nothing in this repo substitutes for it.

- Primary category: **Pool Cleaning Service**
- Add every service area city
- Hours matching the site (Mon–Fri, 7:00–18:00)
- Real photos of actual work, added regularly
- NAP must match the site **exactly**: `High Noon Pool Care` / `+1-940-222-2308` /
  `Corinth, TX 76208`

### 3. Build a steady review flow **[you]**

Review count, recency, and velocity are among the strongest local ranking signals. A
consistent trickle of genuine reviews beats every on-page change in this document.

Ask after a completed green-to-clean or at the three-month mark on weekly service.

---

## Tier 2 — Done in this change (needs your review)

### 4. Fixed: LocalBusiness schema pointed at a 404

`src/components/LocalBusinessSchema.astro` used a hardcoded `/assets/...` path. Astro
emits hashed files under `/_astro/`, so that URL 404'd and Google silently dropped the
image. The logo is now imported so the path is always correct.

Also enriched: `geo` coordinates, `priceRange`, `@id`, `areaServed` as 16 structured
`City` objects, and a `hasOfferCatalog` of 6 `Service` entities.

### 5. Added 6 service pages + hub

`/services` plus `/services/{weekly-pool-service, pool-cleaning, chemical-balancing,
filter-cleaning, green-to-clean, one-time-pool-service}`.

Each targets how people actually search, with FAQ sections that compete for long-tail
queries.

### 6. Added 5 city pages

`/pool-service/{denton,corinth,highland-village,lake-dallas,lewisville}-tx`

**These are deliberately not templated.** Thin city pages that differ only by name get
treated as doorway pages and can hurt you. Each page leads with something genuinely
specific — Denton's mature pecan canopy and older pool stock, Corinth as home base,
Highland Village's larger custom pools and spas, Lake Dallas's wind off the lake and aging
equipment, Lewisville's forty-year spread of construction.

**Review these for accuracy.** I wrote them from general North Texas knowledge; you know
these neighborhoods far better. Correct anything that does not match what you see on your
routes — specificity is the entire value.

### 7. Added the blog with a scheduled queue

16 posts in `src/data/post/`, dated to successive Thursdays at 08:00 America/Chicago
starting **2026-09-24**, running through **2027-01-07**.

---

## Tier 3 — Worth doing next

### 8. ~~Rewrite the homepage H1~~ — DONE

Was "Crystal Clear Pools, Reliable Service" (no service term, no location). Now:
**"Pool Cleaning & Weekly Service in Denton & Surrounding Areas"**.

### 9. Replace the testimonials **[you]**

The three on the homepage are placeholders. No `Review` schema has been added to them,
and none should be until they are real — marking up fabricated reviews violates Google's
policy and FTC endorsement guidelines, and gets rich results revoked.

Once you have genuine reviews, add `Review` / `aggregateRating` markup and they become a
star rating in search results, which is a real click-through gain.

### 10. Google Search Console **[you]**

Switch to the `www` property (the canonical host changed during the Cloudflare migration)
and submit `https://www.highnoonpoolcare.com/sitemap-index.xml`.

### 11. Add the remaining service-area cities — DEFERRED by request

Eleven more cities appear in `areaServed` with no page: Argyle, Ponder, Justin, Hickory
Creek, Little Elm, Shady Shores, Cross Roads, Oak Point, Bartonville, Lantana, Double Oak.

Deliberately not built — the five existing city pages are the priority, and thin filler
pages would hurt. Revisit only where you can write something genuinely local.

---

## Tier 2b — Structured data & AIO (done 2026-09-23)

### 12. FAQPage markup on all 47 Q&A pairs

The `FAQs` widget (`src/components/widgets/FAQs.astro`) now emits `FAQPage` JSON-LD
built from the same `items` array it renders, so the marked-up text always matches
what a visitor sees — which is Google's requirement.

Coverage: **11 pages, 47 question/answer pairs**, previously all unmarked. This is the
single biggest AI-answer-engine win available, because FAQ markup is what gets lifted
into AI Overviews, ChatGPT and Perplexity citations, and rich results.

### 13. BlogPosting schema on posts — and the bug that was hiding it

`src/pages/[...blog]/index.astro` already _built_ a full `BlogPosting` object and
passed it as `<StructuredData slot="head" ... />`. It never rendered: **neither
`Layout.astro` nor `PageLayout.astro` had a `head` slot**, so Astro silently discarded
it. Added the named slot to both.

Posts now emit `BlogPosting` with headline, description, datePublished, dateModified,
image, articleSection, keywords, mainEntityOfPage, and an Organization author
(`author: 'High Noon Pool Care'` added to all 16 posts).

### 14. Per-page Service schema

New `src/components/ServiceSchema.astro`, on all 6 service pages. Each declares
itself as a specific `Service` with `provider` pointing at the LocalBusiness `@id`,
so the two graphs join rather than describing separate entities.

### 15. llms.txt

New `public/llms.txt` — a structured plain-text summary for AI crawlers: services,
service areas, contact details, and a "notes for answer engines" section covering
North Texas specifics (pools are not winterized here, freeze protection is the real
winter risk, hard fill water concentrates calcium).

### 16. Deliberate robots.txt

`public/robots.txt` was bare (`User-agent: * / Disallow:`). Now explicitly allows the
AI crawlers you want citing you: Google-Extended, GPTBot, OAI-SearchBot, ClaudeBot,
Claude-SearchBot, PerplexityBot, Applebot-Extended, and others. The build still appends
the sitemap line.

### 17. Header logo

`src/components/Logo.astro` no longer renders the site name beside the logo image —
the wordmark is already in the artwork, and the duplicate text was widening the header
enough to scroll sideways.

**Still worth a look:** the logo image is `h-[150px] w-[150px]`, which is very large for
a nav bar and is likely still contributing to header width. Reducing it is a separate
call since you did not ask for it.

---

## Blog queue: how it works

Astro is a static site, so a post appears only when the site is **built**. Two pieces make
the queue work:

1. **`src/utils/blog.ts`** now filters out posts whose `publishDate` is in the future.
   Without this, all 16 posts would publish immediately.
2. **`.github/workflows/scheduled-build.yml`** rebuilds and redeploys weekly, which is
   what actually releases the next post.

Two cron entries (13:00 and 14:00 UTC) cover CDT and CST, since GitHub Actions cron does
not follow DST. Running both is safe: the `publishDate` gate decides what is visible, so
the "early" run rebuilds without releasing anything.

### Required before the queue works **[you]**

Add two repository secrets under **Settings → Secrets and variables → Actions**:

| Secret                  | Value                                              |
| ----------------------- | -------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | A **long-lived** token with `Workers Scripts:Edit` |
| `CLOUDFLARE_ACCOUNT_ID` | `8f1fe4febc0430ee7dbc3baf4cf246a2`                 |

The migration token expires 2026-09-23 and will **not** work for this. Create a new one
with no short TTL.

### Queued posts

| #   | Thursday   | Title                                                   |
| --- | ---------- | ------------------------------------------------------- |
| 1   | 2026-09-24 | Getting Your North Texas Pool Ready for Fall            |
| 2   | 2026-10-01 | Why Your Pool Filter Works Hardest in October           |
| 3   | 2026-10-08 | Leaf Drop Season: How to Stay Ahead of It               |
| 4   | 2026-10-15 | Is It Still Worth Swimming in October?                  |
| 5   | 2026-10-22 | Calcium Hardness: The North Texas Pool Problem          |
| 6   | 2026-10-29 | Cutting Pump Run Time as the Days Get Shorter           |
| 7   | 2026-11-05 | The First Cold Front: A Short Pool Checklist            |
| 8   | 2026-11-12 | Freeze Protection for North Texas Pools                 |
| 9   | 2026-11-19 | Why We Don't Close Pools in North Texas                 |
| 10  | 2026-11-26 | Winter Pool Chemistry: Less Attention, Not No Attention |
| 11  | 2026-12-03 | What a Hard Freeze Actually Does to Pool Equipment      |
| 12  | 2026-12-10 | Winter Algae: Yes, It Happens Here                      |
| 13  | 2026-12-17 | Getting the Pool Presentable Before the Family Arrives  |
| 14  | 2026-12-24 | Your Pool Pump in Winter: Run Times That Make Sense     |
| 15  | 2026-12-31 | Five Pool Problems Worth Fixing This Year               |
| 16  | 2027-01-07 | The January Equipment Check Worth Doing                 |

### Backlog: spring and summer topics

The queue covers fall and winter. To carry the four-season arc through 2027, continue
weekly from 2027-01-14 with these. Copy any existing post as a template — only the
frontmatter `publishDate`, `title`, `excerpt`, and body need changing.

**Late winter into spring (Jan–Apr)**

- Reading your pool's water before the season starts
- February: the cheapest month to replace equipment
- Spring startup for a pool that circulated all winter
- Oak pollen season and what it does to your filter
- Spring storms: why the visit after a storm matters most
- When is North Texas water warm enough to swim?
- Getting stabilizer right before the sun gets strong
- Pool safety checks worth doing before summer

**Summer (May–Aug)**

- Chlorine demand in triple-digit heat
- Evaporation, topping off, and creeping calcium
- Why pools go green over a long weekend in July
- Bather load: what a pool party does to your chemistry
- Salt cell care in hard North Texas water
- Vacation prep: leaving a pool for ten days in summer
- Reading filter pressure in peak season
- Late-summer algae and why August is the riskiest month

**Early fall (Sep)**

- The September transition: what changes first
- Ending the season without closing the pool

---

## Not recommended

- **Templated city pages at scale.** Doorway-page territory. Quality over coverage.
- **Review schema on placeholder testimonials.** See item 9.
- **Keyword-stuffing city names** into the homepage. The city pages do that job properly.
