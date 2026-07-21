import type { Block } from 'payload'
import { linkField } from './shared-fields'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Small label above the heading, e.g. "SPORTS INJURY RECOVERY". Optional.' } },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'image-right',
      options: [
        { label: 'Image Right', value: 'image-right' },
        { label: 'Image Left', value: 'image-left' },
        { label: 'Full-bleed Image Background', value: 'image-background' },
        { label: 'Centered, No Image', value: 'centered' },
      ],
    },
    linkField('primaryButton', 'Primary Button'),
    linkField('secondaryButton', 'Secondary Button'),
  ],
}
