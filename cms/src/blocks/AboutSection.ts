import type { Block } from 'payload'

export const AboutSection: Block = {
  slug: 'aboutSection',
  labels: { singular: 'About Section', plural: 'About Sections' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}
