import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'businessName', type: 'text', required: true },
    { name: 'tagline', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'brand',
      type: 'group',
      label: 'Brand Colours & Typography',
      admin: { description: 'Mirrors brand-direction.json produced during the design stage' },
      fields: [
        { name: 'primaryColor', type: 'text', required: true, defaultValue: '#0f4c3a' },
        { name: 'secondaryColor', type: 'text', required: true, defaultValue: '#123326' },
        { name: 'accentColor', type: 'text', required: true, defaultValue: '#ff7a45' },
        { name: 'neutralColor', type: 'text', required: true, defaultValue: '#f5f3ee' },
        { name: 'headingFont', type: 'text', defaultValue: 'Fraunces' },
        { name: 'bodyFont', type: 'text', defaultValue: 'Inter' },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'address', type: 'text' },
        {
          name: 'hours',
          type: 'array',
          fields: [
            { name: 'days', type: 'text', required: true },
            { name: 'hours', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
