# Brand Direction: Albania Travel

Prose summary of `brand-direction.json`. Stage 2 of the pipeline; written before
any structure, content or code.

## Stage 2a: the design language

**Selected: `sunny-fresh-honest`. Runner-up: `warm-inviting-handmade`.**

Selection was keyed on the sliders and feel-words, not the industry (Hard
Rule 5). The client's sliders, inferred from their own published copy and
flagged for confirmation, are Playful-Serious 2, Traditional-Modern 3,
Minimal-Bold 3, Corporate-Approachable 5, Luxury-Everyday 4. Feel-words:
**unhurried, genuine, undiscovered**, all three taken from language the client
already uses about themselves.

Scoring the fourteen languages on slider distance:

- **warm-inviting-handmade: distance 0**, an exact match.
- **sunny-fresh-honest: distance 1** (it sits one step further toward
  Everyday).
- Everything else is at distance 4 or worse. quick-bright-cheerful (4) is
  excluded by its own NOT list, which names "unhurried" verbatim.
  airy-still-unhurried owns the word "unhurried" but sits at distance 7, and
  its register (sparse, silent, near-monochrome) is the opposite of a client
  whose strongest asset is thirty-plus places described in loving detail.
  calm-precise-reassuring also answers to "unhurried" but at distance 6 and in
  a clinical register this brand has no claim to.

The tie between the two front-runners broke to **sunny-fresh-honest** on three
grounds:

1. **Feel-words.** It answers to "sunny, fresh, honest, unfussy, abundant".
   Honesty is literally the client's founding sentence: *"established to
   minimise the number of third parties extracting payments from Australians
   booking to travel to Albania."* "Genuine" and "undiscovered" map to honest
   and unfussy far more directly than to warm-inviting-handmade's "tactile,
   characterful, human".
2. **Register.** warm-inviting-handmade describes itself as timber and amber
   *indoors*, the room you sit down in. This client sells daylight, coastline
   and mountain valleys; sunny-fresh-honest describes itself as *outside*.
   The language's foliage green is the client's own copy: their Alps page
   promises "meadows, pastures and lakes in vivid greens".
3. **The ledger.** warm-inviting-handmade shipped on ember-and-rye;
   sunny-fresh-honest has never been used in eight builds. Its signature
   provenance block ("Where It Comes From": named suppliers, because a generic
   'we source locally' paragraph is the approximation the block exists to
   prevent") maps one-to-one onto this client's actual product: a named
   supply chain. You, Geoff and James in Australia, Wander Albania in Tirana,
   your driver and your guide. That block becomes this site's honesty made
   visible.

The previous build (nj-electrical) used sharp-current-spare, so the
consecutive-build rule was not in play; it is noted here because the ledger
was read before choosing, as required. No admired business or reference site
was named in intake, so no reference-matching was done.

## Stage 2b: the brand inside the language

### Personality interpretation

Two Australians with their personal mobiles on the website, selling private
unhurried tours of a sunlit, underrated country, at prices they are proud to
publish. The site should feel like being shown holiday photographs by a friend
who has done the trip and knows the driver by name: warm, specific, generous,
and completely unglossy. The one thing it must never feel like is a booking
portal.

### Palette (measured, not estimated)

Daylight and growth, per the language: green from foliage, a warm
produce-derived accent, warm off-white base, light mode only.

| Role | Hex | Used for |
|---|---|---|
| primary | `#2E5B3E` | deep leaf green: headings accents, links, CTA band, footer |
| secondary | `#1E2A21` | ink green: the darkest text tone |
| accent | `#A85A1B` | apricot: buttons and small warm highlights (fill only) |
| accentStrong | `#8A4A15` | deepened apricot for accent text on light grounds |
| accentTint | `#F6E3C8` | pale apricot: accent text on the green ground, soft highlight band |
| neutral | `#F4EDDC` | warm cream section band |
| primarySoft | `#E3EDE0` | pale sage section band |
| surface | `#FBF8F1` | warm off-white base canvas (the body background) |
| text / textMuted | `#232E24` / `#5A675A` | body ink and muted ink |
| textInvert / textInvertMuted | `#F6F3E9` / `#C3D0BE` | text on the green grounds |

All pairings were measured with a WCAG relative-luminance script on
2026-07-21 (full table in `brand-direction.json`). The language file warns
that mid-tone greens on cream fail more often than they look like they
should, so this was measured rather than eyeballed: primary green clears 6.5
to 7.4:1 on all three light grounds. Two standing constraints: raw accent
`#A85A1B` is a **fill colour only** (4.24:1 as text on surface, 2.94:1 on the
green grounds, both failing); and `ruleLight` is decorative only, with
`borderLight` (3.5 to 3.9:1) carrying any interactive boundary.

No gradient anywhere. The Ionian turquoise of the client's current logo was
deliberately not made the palette: it would fight the language's daylight
warmth, and the immediately previous build (nj-electrical) already shipped a
teal accent.

### Typography

- **Headings: Alegreya**, 600/700, sentence case throughout. The language
  asks for a warm humanist serif that never shouts; Alegreya has a slightly
  calligraphic Mediterranean warmth and holds up at long-read sizes for the
  destination writing. Not used by any prior build.
- **Body: Nunito**, 400/600/700 at a 17px base, line height 1.65. Chosen from
  the language's candidate list (Nunito, Quicksand, Hanken Grotesk) per Hard
  Rule 4: Quicksand is too geometric-childlike for multi-paragraph reading,
  Hanken Grotesk reads cooler than this brand should, and Nunito's fully
  rounded terminals are exactly the sunny register the language names. Ledger
  check: last two builds used Geist and Cabin, no conflict. Nunito is not
  Nunito Sans (anthony-pearce, five builds back): different terminals,
  different voice, and outside the two-build window regardless.
- **Handwritten accent: Caveat 600**, the language's permitted single
  handwritten label. At most one appearance per page, never load-bearing,
  reserved for the "from Geoff and James" sign-off register.
- Scale ratio 1.25; display 2.75rem desktop to 1.875rem mobile per the
  language's Mobile section.

### Component style

**Soft-rounded-with-shadow**, the only one of the two template component
languages this design language permits: 12-24px radii (0.75 / 1.25 / 1.5rem),
very soft shadow, light borders, buttons in solid accent with generous
rounding, card images bleeding to the card edge. The recurring crop shape is
the **arch**: rounded-top lead imagery, kept in proportion on mobile per the
language's Mobile section.

### The motif: the flight path

The client's own logo is a small plane trailing a dotted flight path. That
line is genuinely ownable and becomes the brand motif (Hard Rule 12: authored
for this client, never in the template): the dotted route line in the tour
day-rhythm block, the small connector under section eyebrows, and the header
mark itself. Re-inked from turquoise into foliage green.

### The logo decision

**Keep the mark, redraw, re-ink.** Both source files were harvested before
anything was generated (Hard Rule 14; HTTP 200 on both, evidence in
`assets/IMAGE-CREDITS.md`, originals preserved in `assets/raw/`). The
concept is kept because it is distinctive and the motif is built from it. It
is redrawn as SVG because the source is a 1.6KB PNG too small for a retina
header, and re-inked (foliage-green plane and path, ink wordmark re-set in
Alegreya) because the original turquoise-on-navy belongs to the old site's
palette, not this one. This is a refresh of their identity, not a
replacement, and **it needs client sign-off before launch**.

### Motion (authored in Stage 7, recorded here per the stage's derivation rule)

Every figure is the language's own stated value: fast 180ms, base 360ms, slow
640ms, easing `cubic-bezier(0.25, 0.8, 0.35, 1)` (quick to leave, slow to
arrive, no bounce), stagger 90ms capped at six, and a 10px text travel. The
reveal is the language's mask-grow: one lead arched image per section opens
its rounded-top mask from 92% to full height while it settles to full
opacity; everything else does the plain 10px fade-up. The signature move is
`arch-open`, the page reading as doors opening onto daylight. The permitted
continuous move (a hero crossfade of two genuine frames of the same place)
was declined: the harvest holds no such pair and faking one with two
different places would be the wrong kind of motion for this brand. Ledger
check: no duration and no curve is shared with nj-electrical or mojo-steel.
Full spec in `motion-spec.json`.

### Layout rhythm

Base body background is the warm off-white surface token, so the cream and
pale-sage bands only appear where a section explicitly asks for them (the
Jubilee lesson). Section grounds cycle surface, cream, pale sage, with the
deep green ground appearing at most twice per page: the pre-footer CTA band
and the footer. No near-black band anywhere; the language forbids moody
sections. Image-with-text blocks alternate sides sitewide. Every page keeps
"talk to Geoff or James" visible: the language's guardrail is that the
booking path must be obvious on every page, and here the booking path is a
person.
