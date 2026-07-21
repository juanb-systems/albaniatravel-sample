import type { Block } from 'payload'

export const TestimonialsCarousel: Block = {
  slug: 'testimonialsCarousel',
  labels: { singular: 'Testimonials Carousel', plural: 'Testimonials Carousels' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'testimonials', type: 'relationship', relationTo: 'testimonials', hasMany: true },
  ],
}
