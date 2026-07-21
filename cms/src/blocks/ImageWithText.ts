import type { Block } from 'payload'

export const ImageWithText: Block = {
  slug: 'imageWithText',
  labels: { singular: 'Image With Text', plural: 'Image With Text Blocks' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Tinted', value: 'tint' },
        { label: 'Dark', value: 'dark' },
      ],
    },
  ],
}
