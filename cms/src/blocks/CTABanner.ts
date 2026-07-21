import type { Block } from 'payload'
import { linkField } from './shared-fields'

export const CTABanner: Block = {
  slug: 'ctaBanner',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    linkField('button', 'Button'),
    {
      name: 'style',
      type: 'select',
      defaultValue: 'solid',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Outline', value: 'outline' },
      ],
    },
  ],
}
