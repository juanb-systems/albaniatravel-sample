import type { Block } from 'payload'

export const TrustBar: Block = {
  slug: 'trustBar',
  labels: { singular: 'Trust Bar', plural: 'Trust Bars' },
  fields: [
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
