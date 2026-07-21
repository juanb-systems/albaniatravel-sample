# Albania Travel: sample site

A working sample rebuild of albania-travel.com.au, generated end to end by the
POC-AI-Website-Workflow pipeline (Astro static + Payload CMS + TypeScript +
Tailwind v4). Stages 1 to 7 complete; the Stage 8 QA pass is deliberately
deferred and recorded as such, so treat this as a preview, not a finished
handoff.

## Run it

```
cd web
npm install
npm run dev
```

Then open http://localhost:4328. The site builds fully from `content/` with no
CMS running (`CONTENT_SOURCE=local` is the default). `RUNNING.md` has the
longer version, including the optional Payload admin.

## What to look at

- `brand-direction.md`: why the site looks the way it does (design language:
  sunny-fresh-honest; the client's own plane-and-flight-path mark, re-inked).
- `site-structure.json`: the block plan; eight bespoke blocks, no generic CTA
  banner anywhere, every call to action is Geoff and James by name.
- `assets/IMAGE-CREDITS.md`: provenance for every image, including which of
  the live site's images are stock or AI-generated and were excluded.
- `motion-spec.json`: the authored motion and the per-block mobile design.

## Known open items

- Stage 8 QA has not run yet (deferred on instruction; the validator's one
  red check is exactly that).
- The enquiry form is not wired to a mailbox; the phone numbers are the live
  path.
- The logo redraw and the personality sliders need client sign-off, and a
  real photograph of James is needed (the live site currently uses an
  AI-generated one, which this rebuild refuses to ship).

Originals of every harvested image live in the workflow repo's
`assets/source-images/`; this sample carries the processed set in
`assets/raw/`.
