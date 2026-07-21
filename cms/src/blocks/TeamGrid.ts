import type { Block } from 'payload'

export const TeamGrid: Block = {
  slug: 'teamGrid',
  labels: { singular: 'Team Grid', plural: 'Team Grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'members', type: 'relationship', relationTo: 'team-members', hasMany: true },
  ],
}
