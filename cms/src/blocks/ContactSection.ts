import type { Block } from 'payload'

export const ContactSection: Block = {
  slug: 'contactSection',
  labels: { singular: 'Contact Section', plural: 'Contact Sections' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'showForm', type: 'checkbox', defaultValue: true },
    { name: 'showMap', type: 'checkbox', defaultValue: false },
    { name: 'additionalInfo', type: 'richText' },
  ],
}
