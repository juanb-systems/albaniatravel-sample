# Intake: Albania Travel

Human-readable rollup of `intake.csv`, per `references/intake-questionnaire.md`.

> **Source note.** The client did not fill in the questionnaire. Everything here
> is derived from their live site (albania-travel.com.au, HTTP 200 on
> 2026-07-21, six pages fetched) and is marked **inferred** where they did not
> state it. The personality sliders and feel-words are inferred from their own
> published copy and should be confirmed with Geoff or James before launch.

## Business

- **Albania Travel** is the Australian planning and booking side of a
  partnership with **Wander Albania**, the local operator who runs the tours.
- Their own words on why they exist: *"Albania Travel was established to
  minimise the number of third parties extracting payments from Australians
  booking to travel to Albania."* That sentence is the brand. Two Australians,
  a direct line to the local operator, and no stack of middlemen each taking a
  cut.
- Two named contacts, each with a personal mobile:
  **Geoff** 0432 848 573 · geoff@albania-travel.com.au
  **James** 0433 944 603 · james@albania-travel.com.au
- No physical address published. No booking portal: enquiries go through a
  form, then planning happens person to person.

## What they sell

Three private, customisable tour shapes, all run by the local operator:

1. **Albania Highlights**: 9 days / 8 nights, from EUR 1,220 pp. North-to-south
   cultural tour: historic towns, castles, archaeological sites, two days on
   the Riviera.
2. **Albania Discovery with Extended Stays**: 9 days / 8 nights, from
   EUR 1,220 pp. Their own word for it is "unhurried": multi-day stays in
   fewer places (Riviera, Berat, Tirana) with daily excursions chosen on the
   day. Can start from Tirana or enter by ferry from Corfu.
3. **Balkans Explorer**: 14 days / 13 nights, from EUR 2,740 pp. Albania plus
   Kosovo, North Macedonia and Corfu.

Standard inclusions on every tour, published by the client: minimum 3-star
accommodation, half-board meals, private vehicle, insurance, fuel, tolls,
parking, airport transfers, entrance fees. Every itinerary is customisable;
these are starting shapes, not fixed products.

## The buyer

Inferred: **Australian couples and small private groups, experienced
travellers**, people who have done the obvious European destinations and want
somewhere genuinely good value that is not yet crowded. The testimonials say
"decades of travelling". These are not backpackers and not luxury-lodge
clients: they are people who notice value and dislike being processed.

## Brand personality (the five sliders, INFERRED, needs client confirmation)

Playful-Serious **2** · Traditional-Modern **3** · Minimal-Bold **3** ·
Corporate-Approachable **5** · Luxury-Everyday **4**

Overall feel, three words (from their own copy, not supplied directly):
**unhurried, genuine, undiscovered.**

The evidence: their tours are literally named "Leisurely" and "Unhurried";
their pitch is built on honesty about middlemen and prices; and their framing
of Albania is *"the hidden treasure in Europe waiting to be found"* with the
gentle urgency of *"the secret is getting out"*. Corporate-Approachable is the
strongest signal on the board: the founding story is explicitly
anti-corporate and both principals publish their personal mobile numbers.

## Visual preferences

- Heading font: no preference stated. Stage 2 to choose and record as inferred.
- Body font: no preference stated. **Ledger constraint:** must not repeat
  Geist (nj-electrical) or Cabin (mojo-steel).
- Colours: no preference stated. Stage 2 derives from personality and the
  destination photography rather than defaulting.
- **Logo: they have one, and it must be harvested before anything is
  generated** (Hard Rule 14). Header mark at
  `/wp-content/uploads/2022/01/Group-11.png`, footer variant at
  `/wp-content/uploads/2024/11/Group-11-1.png`. Keep/refresh/replace decision
  belongs to Stage 2b and is recorded in `brand-direction.md`.
- No admired business or reference site named. Noted for `brand-direction.md`.

## Assets

- **Image source: existing website.** The site is WordPress (Hello Elementor)
  and returned HTTP 200 on every page fetched on 2026-07-21.
- **A complication their site created for us:** their own media library mixes
  three kinds of image. Genuine destination photography (e.g. a Valbona
  Valley file), stock (Unsplash-named files, numbered stock-agency files),
  and **AI-generated images** (files literally named
  `Gemini_Generated_Image_*.png`). Stage 4 must separate these. The genuine
  photography and the real people (Geoff and James's portraits) are the
  assets worth keeping; AI-generated hero images should not survive into a
  rebuild whose brand is honesty.
- Faces: Geoff and James are pictured on their own site. Already public.

## Content sourcing

- **Testimonials: real and published.** Five detailed reviews on the live
  site, two of them naming the guides Ermal and Ylli. Use verbatim, none
  invented, no invented attribution.
- **Real numbers exist and may be used** because the client publishes them:
  the three tour prices (from EUR 1,220 / EUR 1,220 / EUR 2,740 pp), the
  durations (9/8 and 14/13), and the inclusions list. Their destination pages
  also publish Albania facts (population about 3 million, the 120 km
  Riviera, and so on) which are the client's own published content and may be
  reused. Nothing beyond what they publish is to be invented (Hard Rule 4).
- No surnames, no bios, no company registration details published. None to be
  invented.

## Scope for this run

Full 9-stage build, local only, ports web 4328 / cms 3465. **No git remote and
no push**: there is no repo for this client. Australian English throughout.
