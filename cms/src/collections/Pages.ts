import type { CollectionConfig } from 'payload'
import { pageBlocks } from '../blocks'

const ASTRO_DEV_URL = process.env.ASTRO_DEV_URL || 'http://localhost:4321'

/** The public URL for a page, given its slug. Home lives at the root. */
const pageUrl = (slug: unknown): string => {
  const s = typeof slug === 'string' ? slug : ''
  return s && s !== 'home' ? `${ASTRO_DEV_URL}/${s}` : ASTRO_DEV_URL
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    // "Preview" button on the edit screen: opens the real page.
    preview: (doc) => pageUrl(doc?.slug),
  },
  // Drafts give the client an undo: they can change their mind without the live
  // site changing, and every save is versioned so bad edits are recoverable.
  // A client who can overwrite good copy with no way back is a support problem
  // waiting to happen, and this was flagged as a gap when the admin was first
  // exercised properly (see docs/payload-admin-findings.md).
  //
  // autosave is deliberately OFF: with drafts + autosave, a half-finished edit
  // becomes a draft on every keystroke, which confuses non-technical users more
  // than it helps. Explicit Save/Publish is easier to explain and to teach.
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  access: {
    // Only published pages are public. Drafts stay invisible until published,
    // which is the entire point of having them.
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'navLabel',
      type: 'text',
      admin: { position: 'sidebar', description: 'Label shown in nav, if different from Title' },
    },
    { name: 'showInNav', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: pageBlocks,
    },
  ],
}
