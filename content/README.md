# Canonical content

This folder is the single source of truth for one client's content.

- **During iteration**, the site reads these files directly (`CONTENT_SOURCE=local`). No CMS runs, so the design loop with the client is fast.
- **At handoff**, `cms/src/seed.ts` imports these same files into Payload, and the site switches to `CONTENT_SOURCE=payload` so the client can edit their own copy and images.

One format, two consumers. Nothing here is duplicated into the CMS by hand.

## These files ship EMPTY on purpose

Per the project's governing principle, **content is never a template**. The design language is the only reusable, authored template; the AI generates this client's copy and their page composition fresh at build time. The files in this folder are empty skeletons that document the shape. If you ever find real copy sitting here in `template/`, that is a bug: delete it.

## Format rules

- **Normalised, not duplicated.** Services, team members and testimonials are defined once in their own file. Pages refer to them by slug (or name), and to images by filename. `src/lib/source-local.ts` resolves those references into the same fully-nested objects Payload returns at `depth=2`, so components never know which source they are on.
- **Rich text is markdown.** Any field that is rich text in the CMS (`description`, `body`, `additionalInfo`, an FAQ `answer`) is authored here as a markdown string and converted to Payload's Lexical JSON on read. Supported: paragraphs, `#` headings, `-`/`1.` lists, `[links](url)`, `**bold**`, `*italic*`.
- **Images are filenames.** Reference `"hero-storefront.jpg"`, not a path. Alt text, width and height come from `assets/image-metadata.json`, which Stage 4 already produces, so image data lives in exactly one place. `npm run sync:media` copies `assets/raw/` into `web/public/media/` automatically on dev and build.
- **Omitting a list means "all of them."** A `servicesGrid` with no `services` key renders every service, matching the usual seed behaviour.

## Files

| File | Shape |
|---|---|
| `site-settings.json` | object: `businessName`, `tagline`, `logo` (filename), `brand`, `contact`, `socials` |
| `navigation.json` | object: `header[]`, `footer[]` of `{ label, url }` |
| `services.json` | array of `{ title, slug, summary, description (markdown), image (filename), order }` |
| `team-members.json` | array of `{ name, role, bio, photo (filename), order }` |
| `testimonials.json` | array of `{ quote, authorName, authorRole, rating }` |
| `pages.json` | array of `{ title, slug, showInNav, layout[] }` |

## Annotated example

Illustrative only. Do not copy this as starting content.

```jsonc
// services.json
[
  {
    "title": "Sports Injury Assessment",
    "slug": "sports-injury-assessment",
    "summary": "One-line summary used on cards.",
    "description": "Markdown body.\n\nA second paragraph, with **bold** and a [link](/contact).",
    "image": "service-assessment.jpg",
    "order": 1
  }
]

// pages.json
[
  {
    "title": "Home",
    "slug": "home",
    "showInNav": true,
    "layout": [
      {
        "blockType": "hero",
        "eyebrow": "Eyebrow text",
        "heading": "Headline",
        "subheading": "Supporting line.",
        "image": "hero-main.jpg",
        "layout": "image-right",
        "primaryButton": { "label": "Book Now", "url": "/contact" }
      },
      {
        "blockType": "servicesGrid",
        "heading": "How we help",
        "services": ["sports-injury-assessment"],
        "columns": "4"
      },
      {
        "blockType": "faq",
        "heading": "Common questions",
        "items": [{ "question": "Do I need a referral?", "answer": "No referral is needed." }]
      }
    ]
  }
]
```

The block vocabulary is a **kit, not a menu**: compose the pieces this client actually needs, and build new ones where the design language calls for it. Do not fill a fixed set of blocks for every site.
