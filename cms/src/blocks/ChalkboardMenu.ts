import type { Block } from 'payload'

// SIGNATURE BLOCK: Warm / Inviting / Handmade.
//
// Not part of the shared kit every site reaches for. This exists because a
// cafe/bakery/bar has a menu, and a menu is not a "services grid": it is
// sections of named items with prices and no images. Rendering it through
// ServicesGrid is the silent approximation Hard Rule 10 forbids.
//
// See references/design-languages/warm-inviting-handmade.md -> Signature blocks.
export const ChalkboardMenu: Block = {
  slug: 'chalkboardMenu',
  labels: { singular: 'Chalkboard Menu', plural: 'Chalkboard Menus' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'note',
      type: 'text',
      admin: { description: 'Small line under the heading, e.g. "Baked fresh daily. Sold out when it\'s gone."' },
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Menu Section', plural: 'Menu Sections' },
      fields: [
        { name: 'name', type: 'text', required: true, admin: { description: 'e.g. Bread, Pastry, Coffee' } },
        {
          name: 'items',
          type: 'array',
          required: true,
          minRows: 1,
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'description', type: 'text' },
            {
              name: 'price',
              type: 'text',
              admin: { description: 'Text, not a number: allows "6.5", "from 4", "mkt".' },
            },
          ],
        },
      ],
    },
  ],
}
