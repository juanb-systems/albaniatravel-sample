import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'authorName' },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorRole', type: 'text', admin: { description: 'e.g. company, or "Client since 2023"' } },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
  ],
}
