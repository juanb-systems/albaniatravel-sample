// Section background cycle for Albania Travel (brand-direction.json
// layoutRhythm). The base body canvas is the warm off-white surface token;
// these classes are only applied where a block explicitly asks for a band,
// so every band reads as deliberate. 'primary' is the deep foliage-green
// ground, used at most twice per page (personCta and the footer): the
// language forbids moody dark sections, so there is no near-black band.

import type { SectionBackground } from './types'

export const sectionBg: Record<SectionBackground, string> = {
  surface: 'bg-brand-surface',
  neutral: 'bg-brand-neutral',
  primarySoft: 'bg-brand-primary-soft',
  accentTint: 'bg-brand-accent-tint',
  primary: 'bg-brand-primary',
}

export function bgClass(background?: SectionBackground): string {
  return sectionBg[background ?? 'surface']
}
