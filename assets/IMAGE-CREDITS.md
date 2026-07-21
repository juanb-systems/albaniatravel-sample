# Image credits and harvest evidence: Albania Travel

Provenance for every asset, per Hard Rule 14 and `references/image-workflow.md`.
Harvest run 2026-07-21 against https://albania-travel.com.au/ (WordPress, Hello
Elementor theme). Full request-by-request evidence in `harvest-log.json`;
dedupe and rename decisions in `curation-manifest.json` and
`resize-manifest.json`.

## Step Zero: the logo (harvested first, before any content image)

| File | Source URL | HTTP | Size |
|---|---|---|---|
| `brand/logo-header-Group-11.png` | `https://albania-travel.com.au/wp-content/uploads/2022/01/Group-11.png` | **200** | 1,597 B |
| `brand/logo-footer-Group-11-1.png` | `https://albania-travel.com.au/wp-content/uploads/2024/11/Group-11-1.png` | **200** | 1,876 B |

The mark is a small turquoise plane trailing a dotted flight path with a navy
all-caps wordmark. Both originals are preserved untouched. Stage 2b's decision
(keep the mark, redraw as SVG, re-ink to the new palette) is recorded in
`brand-direction.md`; the redraw is a refresh needing client sign-off.

## The crawl

Nine pages fetched, **all HTTP 200** (home, why-albania, itineraries-tours,
places-to-visit-in-albania, faqs, contact, and the three tour product pages).
92 unique images downloaded, **92 of 92 HTTP 200, zero failures**. No
crawl-failure claim is made anywhere in this build because nothing failed.

After byte-level dedupe (15 duplicate groups: the client's site reuses several
files under different names, including the same fortress aerial serving as
both "South towards Kruja" and "Decan Monastery and Prizren") and curation, 42
images were resized into `raw/` (fit 2000px, JPEG q82) and every one was
individually viewed for Stage B. `image-metadata.json` is the single source of
truth for what each shows.

## What the client's own media library turned out to contain

Four categories, and the difference matters for a brand whose pitch is honesty:

1. **Genuine destination photography** (most of the kept set): real frames of
   Berat, Theth, Valbona, Komani, Gjipe, Saranda, Kruja and so on. These carry
   the site.
2. **Third-party watermarked images** (kept in `raw/` but marked
   `do-not-use-watermarked`): `autumn-mountain-valley.jpg` (Thethi-guide
   watermark), `riviera-gorge-swimmer.jpg` (alpventurer watermark). Not the
   client's to reuse; they are excluded from the build and the client should
   replace them on their current site too. `mountain-ridge-view.jpg` carries
   the **operator's own** wander (Wander Albania) watermark: usable only with
   a crop that removes it, credited to the operator.
3. **AI-generated or AI-suspect images, all excluded:**
   - `Gemini_Generated_Image_7p11w57p11w57p11-2.png`: literally named as a
     Gemini output, and used on the client's live site as the portrait of
     ambassador **James C.** (alt text "james"). **This build does not ship an
     AI face as a real person.** James renders typographically; the flagged
     action item is one real photo of James.
   - `pogradec-waterfront.jpg` (kept in raw as evidence, marked
     `do-not-use-ai-suspect`): melted geometry and painterly textures
     consistent with AI generation or heavy AI upscaling.
   - `3ba25ab...png`, `fae4c7b...png`, `dc76d1198e...webp`,
     `Hidden-gems-...-Gjirokaster.jpg` (excluded at curation): hashed-name
     square PNGs and a painterly composite with the same synthetic look.
4. **Stock stand-ins on their own site, excluded here:** three Unsplash files
   (`jakob-owens`, `nicolas-meunier`, `adventure-albania`), two numbered
   stock-agency files of posed hikers (`211288460_m`, `212970938_m`), a
   cabins photo (`158266924`), and one file named
   `dragons-teeth-valley-...russia_396174-630.avif`, which is **a stock photo
   of Russia** used on an Albania travel site. None are reused.

## People

- `geoff-portrait.jpg`: Geoff, published on the client's own site with alt
  "Geoff S.". Real photo, used with role `portrait-geoff`. Confirm consent at
  launch as a courtesy.
- `travellers-saranda-harbour.jpg`, `kruja-bazaar.jpg`,
  `old-bazaar-street.jpg`, `berat-old-town.jpg`, `ksamil-beaches-aerial.jpg`:
  incidental identifiable people, all already public on the client's site.
  None are named or presented as staff.
- **James has no genuine photograph anywhere in the harvest.** The only
  "James" image on the live site is the Gemini render above.

## Reference material (not design assets)

The client's route maps (`9-days.jpg`, `14-days.jpg`,
`Example-Tour-2-Map-1_page-0001.jpg`, `albania_physical_map.png`, `a.png`)
remain in `source-images/` as data sources for the tour route content. They
carry baked-in labels and are not used as imagery.

## Licence position

Everything used ships from the client's own published media library, on the
same basis their current site displays it. The two third-party watermarked
files and all AI/stock material are excluded from use. No new stock was
introduced in this build: genuine harvested coverage was sufficient for every
composed slot. If a future edit needs stock, it must be of the actual named
place and credited here per the fallback ladder.
