import type { Block } from 'payload'

export const ProcessSteps: Block = {
  slug: 'processSteps',
  labels: { singular: 'Process Steps', plural: 'Process Steps Blocks' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'text', admin: { description: 'Icon name from the shared icon set (see astro-conventions.md)' } },
      ],
    },
  ],
}
