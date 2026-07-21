import type { Field } from 'payload'

export const linkField = (name: string, label: string): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    // Not required: these are optional CTAs (a Hero/CTABanner button group may be
    // omitted entirely). Marking the sub-fields required would force every block
    // to include a button even when the design calls for none.
    { name: 'label', type: 'text' },
    { name: 'url', type: 'text' },
  ],
})
