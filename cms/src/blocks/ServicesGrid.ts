import type { Block } from 'payload'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  labels: { singular: 'Services Grid', plural: 'Services Grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}
