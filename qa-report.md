# QA report: albania-travel

Date: 2026-07-21. Run by the QA pass of the same build session (Stage 8 was
first deferred on the client's instruction, then run the same day once usage
reset). Build tested: `CONTENT_SOURCE=local`, no CMS running, 6 pages,
`astro preview` on port 4328, workflow repo at commit `cb6c37b` plus this
stage's fixes. Validator result, final run after all fixes below:
**27 passed, 0 warnings, 0 failures, exit 0.**

Everything below was observed in a real browser (Chromium via Playwright) or
in command output. Where a check was mechanical, the tool and the measured
number are stated. Fixed FAILs are recorded as FAIL, then the fix, then the
re-check.

## Writing quality

- **FAIL, fixed: internal build voice leaked into client-facing copy in six
  places.** The rendered site said "the client's own destination library"
  (home atlas intro), "condenses the client's own destination writing"
  (places hero), "the client's own published answers" (planning hero), "The
  client's own answers" (FAQ eyebrow), "Published by the client" (reviews
  intro), "The client's first/second pick" and "from the client's own
  published advice" (season guidance), plus three more inside FAQ answers and
  the how-it-works hero. All rewritten into the site's own voice. Re-check:
  a full-text scan of the rendered HTML now finds exactly one "client"
  mention, inside Tanina's verbatim testimonial ("for the benefit of their
  clients"), which is hers to keep.
- **PASS: unauthorised numbers.** Every digit group in the rendered text of
  all six pages was extracted (102 unique contexts) and checked against the
  client-published list: the six tier prices, durations, phone numbers,
  inclusions, and their own destination facts (120 km Riviera, 588 BC, 627
  BC, 1,100 m Llogara, 270 km Vjosa, 90-day visa, 230 V, AU $3.03/litre as
  of November 2024, and so on). One mismatch found and fixed: Lake Komani
  was written as "34-kilometre" where the client publishes 34.5; now 34.5.
  No invented statistics, no satisfaction percentages, no years-in-business,
  no decorative index numerals anywhere.
- **PASS: contrastive-device count.** Three authored instances sitewide
  ("instead of a new bed every night", "for two nights instead of one",
  "shown in full rather than trimmed" was removed in the voice-leak fix, so
  now two prose instances plus the repeated UI label "Send an enquiry
  instead", which is a consistent button label, not prose). Under the
  checklist's threshold; NJ shipped two.
- **PASS with a note: word clusters.** "Private" (27) and "shape" (originally
  20) cluster, but mostly through data renders (tour style strings and nav
  labels repeating across three blocks). Five "shape" instances in chrome
  were rewritten to "tour" (home button, contact strip heading, form select
  label); the remainder is the deliberate "three shapes" device on the tours
  page. "Unhurried" (8) traces to the client's own tour name rendering in
  three places plus the hero; accepted as the brand word.
- **PASS: no near-duplicated prose across pages.** The only cross-page
  repeats are chrome: the footer tagline and partnership line (by design, on
  every page), and "at the local operator's rates", which appeared twice in
  prose and was reduced to once.
- **PASS: no generic marketing taglines.** Read every page end to end at
  1440px; the copy stays specific to this business (named people, named
  guides, real prices, real places). Testimonials are verbatim, shortened
  only by omission, attribution as published.

## Mobile responsiveness

- **PASS: no horizontal scroll at 320, 390, 768, 1024 or 1440px.** Measured
  `scrollWidth > clientWidth` on all six pages at 320px (all false), and on
  tours and places at 768 and 1024 (false); 390 and 1440 were swept earlier
  in the session with the same result.
- **FAIL, fixed: mobile menu nav rows measured 40px**, under the 44px touch
  minimum (py-2.5). Changed to py-3; re-measured at 44px on all five rows.
  The panel's two call buttons measure 44px; the sticky call bar's two
  buttons measure 44px.
- **PASS: menu semantics.** `aria-expanded` observed switching false to true
  on open; the accessible label swaps between "Open menu" and "Close menu"
  (the hidden sr-only span verified while open); Escape closes the menu
  (observed) and outside-click close is bound by the header script.
- **PASS: spec conformance.** `motion-spec.json` covers every block in
  site-structure.json (validator check plus the merged variant entries);
  what it records at 390px is what the browser shows: atlas 2-up with arches
  holding proportion, route cards stacking with the dotted spine intact,
  provenance chain rotating to a vertical dotted spine with the same nodes,
  reviews stacking attribution-above-quote, forms single column.
- **PASS: nothing hidden without replacement.** The three `hidden md:*`
  sites (header nav relocated into the panel, provenance chain rotated,
  ProcessSteps which is dead kit rendered on no page) are recorded in the
  spec's `hiddenOnMobileAudit`.
- **PASS: mobile gets something desktop does not.** The sticky two-person
  tap-to-call bar (site-wide, 61px tall, spacer keeps it off the footer),
  plus tap-to-call on every number. Observed at 320 and 390px.
- **PASS: display headings step.** Heroes run text-3xl to lg:text-5xl
  (2xl to 4xl on the sentence hero); section padding steps py-16 md:py-24
  lg:py-28. Breakpoint prefix counts in components: sm 98, md 68, lg 97
  (validator output), plus xl in PersonCta.

## Motion & interaction

- **PASS: all four layers observed in the browser.** Load entrance: h1
  computed `animation-name: enter-rise` on every page; the two arched heroes
  additionally run `arch-open` (clip-path mask) on their lead image. Scroll
  reveal with stagger: home atlas cards measured `transition-delay` 0s,
  0.09s, 0.18s, 0.27s (the authored 90ms), cap at 6 in the CSS. Interaction
  feedback: buttons lift and deepen on hover, press translates back
  (observed); links underline. Route transition: `<ClientRouter />` plus
  `data-astro-transition-scope` present on the page-heading h1 of every
  page, header persisted.
- **PASS: signature motion exists where the spec says.** `arch-open` on the
  home and how-it-works hero images (load form) and `.arch-reveal` on
  ImageWithText images and each atlas grid's lead card (scroll form).
- **PASS: tokens match and no literals.** Built CSS contains `enter-rise`
  and `arch-open` keyframes and one `prefers-reduced-motion` block (grepped
  `dist/_astro/*.css`); the validator's no-hardcoded-motion check passes;
  spec values match tokens.css (180/360/640/90ms, the language's curve).
- **PASS: reduced motion.** Emulated `prefers-reduced-motion: reduce` and
  loaded home and tours: zero `.reveal` sections below opacity 0.9 without
  any scrolling, h1 `animation-name: none`, arch mask fully open
  (`inset(0px round ...)` computed). The noscript fallback covers the
  JS-disabled case.
- **PASS: budget.** One reveal idea (10px fade-up) plus the one signature
  (arch-open on a single lead image per section); no continuous motion, and
  the spec records why the language's permitted hero crossfade was declined
  (no two genuine frames of the same place; faking the pair with two
  different places would be dishonest motion).

## Accessibility

- **PASS: semantics.** Exactly one h1 per page (measured on all six);
  heading order has zero skipped levels after a FAIL was fixed: tours and
  places each had one h1-to-h3 skip (route names and region headings were
  h3 under headingless blocks); both promoted to h2 and re-measured at zero
  skips. `nav`, `main`, `footer` landmarks present on every page.
- **PASS: alt text.** Zero images with missing alt across all six pages
  (measured); content-image alts come from the Stage B visual descriptions
  via image-metadata.json; the header mark's alt is empty on purpose because
  the wordmark text sits beside it in the same link.
- **PASS: contrast.** All pairings measured with the WCAG formula in Stage 2
  and recorded in brand-direction.json (body ink 13.31:1 on surface, muted
  5.62:1, text-invert 7.05:1 on the green ground, accent-tint 11.89:1 on
  dark). The two standing constraints (raw accent never as text anywhere;
  ruleLight decorative only) were held in the components: accent text on
  light uses accent-strong (6.45:1), accent text on green uses accent-tint.
- **PASS: keyboard.** Tab reaches skip-free through header links with a
  visible 2px accent-strong outline (measured `outline: 2px solid` on the
  focused element); the FAQ accordions and mobile menu are native
  details/summary and operable by Enter/Space; Escape closes the menu and
  returns focus to the toggle.
- **PASS: forms.** Every field on the contact form has an explicit `<label
  for>` (name, adults, children, phone, email, tour select, notes) or a
  fieldset legend (preferred contact); nothing is placeholder-labelled.

## Visual quality / brand consistency

- **PASS: no generic-AI tropes.** No purple-blue gradient, no
  people-around-laptop stock, no Inter anywhere, no centered-hero-plus-three-
  cards page, six distinct hero treatments (verified block order per page
  against site-structure.json), one component language sitewide
  (soft-rounded, arches, pill buttons).
- **PASS: favicon and logo are this brand's.** `/favicon.svg` serves 200 and
  is the re-inked plane-and-path mark; `/favicon.ico` returns 404 because
  the stale template file was deleted, not overridden. The header lockup is
  the harvested mark redrawn plus the wordmark re-set in Alegreya.
- **PASS: every page polished evenly.** All six pages screenshotted at
  1440px and three at 390px and compared: the content pages (planning,
  contact) carry the same eyebrow motif, arch imagery, band rhythm and
  button language as home. The base body background is the surface token, so
  the cream and sage bands read as deliberate on every page (checked
  visually while scrolling; the Jubilee base-background trap does not
  apply).
- **PASS: accents actually visible.** The offset tint blocks behind arch
  images use solid tokens (accent-tint, primary-soft), not low opacity, and
  are clearly visible in the screenshots. Hover accents exist only on real
  links and buttons; non-interactive cards carry static accents (region
  labels, dots).
- **PASS: images match slots.** Every image was individually viewed in Stage
  B; slot assignments follow confirmedRole (the mislabelled "Gjipe" umbrella
  beach was renamed riviera-beach-umbrellas and is captioned as the Riviera
  drive, not Gjipe; the real Gjipe aerial carries the Gjipe card). The one
  imageless place (Porto Palermo) renders the designed typographic arch
  tile, not a stock substitute.
- **PASS: signature blocks beyond the kit.** Eight bespoke components exist
  in `src/components/blocks/` (routeRibbon, regionAtlas, provenanceList,
  whenToGo, whatsIncluded, travellerWords, personCta, enquiryForm),
  including the language's own provenanceList candidate, built.
- **Knowingly left open: eight unused kit component files** (AboutSection,
  CTABanner, ContactSection, ProcessSteps, ServicesGrid, TeamGrid,
  TestimonialsCarousel, TrustBar) remain on disk, unwired from
  BlockRenderer. Deleting them may affect the Stage 9 CMS schema decision,
  the same open call recorded on the NJ build. They render on no page.

## Performance

- PASS: `output: 'static'` in astro.config.mjs; build is 6 static pages in
  ~400ms; no framework hydration, the only scripts are the reveal observer
  and the menu enhancer.
- PASS: responsive images. Every large-rendering image ships a 900w
  derivative plus the original with true widths in `srcset` (heroes,
  imageWithText, both atlas variants); below-the-fold images are
  `loading="lazy" decoding="async"`; exactly one `fetchpriority="high"`
  image per page (the hero).
- PASS: fonts load via Google Fonts with `display=swap`, weights limited to
  those used (Alegreya 600/700, Nunito 400/600/700, Caveat 600).

## Payload functionality

- N-A: Stage 9 has not run and the CMS is not part of QA. All content
  renders from `content/*.json` through the adapter; nothing visible is
  hardcoded in components except UI labels (form field labels, "Three ways
  to take it"), which is the same boundary the kit draws. The enquiry form
  posts nowhere and says so honestly in its responseNote; wiring it is a
  recorded handoff task.

## Code quality

- PASS: `astro check` 0 errors, 0 warnings after adding @types/node (a
  machine-wide gap that also currently affects NJ's recorded result; noted
  in the work log).
- PASS: no hardcoded hex/fonts/motion literals in components (validator
  checks); naming follows conventions; one block per file.
- Knowingly left open: the eight dead kit files above.
