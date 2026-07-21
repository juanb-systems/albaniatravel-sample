// Hand-maintained mirror of the Payload collection/global shapes this frontend
// consumes. Keep in sync with template/cms/src/collections and src/globals.
// (A future iteration of this workflow could generate this file directly from
// Payload's payload-types.ts: see docs/recommendations-and-scaling.md.)

export interface Media {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
}

export interface Link {
  label: string
  url: string
}

export interface Service {
  id: string
  title: string
  slug: string
  summary: string
  description?: unknown
  icon?: string
  image?: Media
  order?: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  photo?: Media
  order?: number
}

export interface Testimonial {
  id: string
  quote: string
  authorName: string
  authorRole?: string
  rating?: number
}

export interface HeroBlock {
  blockType: 'hero'
  eyebrow?: string
  heading: string
  subheading?: string
  image?: Media
  /* This build's six hero treatments (one per page, all distinct). The kit's
     `layout` values are kept for template compatibility but unused here. */
  variant?: 'arched-daylight' | 'compact-type' | 'image-full' | 'type-only' | 'split-founding' | 'compact-warm'
  layout?: 'image-right' | 'image-left' | 'image-background' | 'centered'
  primaryButton?: Link
  secondaryButton?: Link
}

export interface AboutSectionBlock {
  blockType: 'aboutSection'
  heading: string
  body?: unknown
  image?: Media
  imagePosition: 'left' | 'right'
}

export interface ServicesGridBlock {
  blockType: 'servicesGrid'
  eyebrow?: string
  heading: string
  subheading?: string
  services: Service[]
  columns: '2' | '3' | '4'
}

export interface TeamGridBlock {
  blockType: 'teamGrid'
  eyebrow?: string
  heading: string
  subheading?: string
  members: TeamMember[]
}

export interface TestimonialsCarouselBlock {
  blockType: 'testimonialsCarousel'
  eyebrow?: string
  heading?: string
  testimonials: Testimonial[]
}

export interface ImageWithTextBlock {
  blockType: 'imageWithText'
  eyebrow?: string
  heading?: string
  body?: unknown
  image: Media
  /* This build: side via `layout`, band via `background` (no dark band: the
     language forbids moody sections). Kit fields kept optional for template
     compatibility. */
  layout?: 'image-left' | 'image-right'
  background?: SectionBackground
  imagePosition?: 'left' | 'right'
  backgroundStyle?: 'none' | 'tint' | 'dark'
}

export interface CTABannerBlock {
  blockType: 'ctaBanner'
  heading: string
  body?: string
  button?: Link
  style: 'solid' | 'outline'
}

export interface ContactSectionBlock {
  blockType: 'contactSection'
  heading: string
  showForm: boolean
  showMap: boolean
  additionalInfo?: unknown
}

export interface FAQBlock {
  blockType: 'faq'
  eyebrow?: string
  heading?: string
  background?: SectionBackground
  items?: { question: string; answer: unknown }[]
  /* This build groups its FAQ by topic; a flat items list still renders. */
  groups?: { title: string; items: { question: string; answer: unknown }[] }[]
}

export interface TrustBarBlock {
  blockType: 'trustBar'
  stats: { value: string; label: string }[]
}

export interface ProcessStepsBlock {
  blockType: 'processSteps'
  heading?: string
  steps: { title: string; description?: string; icon?: string }[]
}

/* ---------------------------------------------------------------------------
   Albania Travel's own collections and blocks (Stage 3 blockPlan). These are
   this client's vocabulary, not kit: routeRibbon, regionAtlas, provenanceList,
   whenToGo, whatsIncluded, travellerWords, personCta, enquiryForm.
--------------------------------------------------------------------------- */

export type SectionBackground = 'surface' | 'neutral' | 'primarySoft' | 'accentTint' | 'primary'

export interface TourPriceTier {
  label: string
  fromEUR: number
  covers: string
}

export interface TourRouteStop {
  days: string
  place: string
  note: string
}

export interface Tour {
  id: string
  name: string
  slug: string
  style: string
  days: number
  nights: number
  priceFromEUR: number
  summary: string
  priceTiers: TourPriceTier[]
  entryOption?: string | null
  countries: string[]
  routeStops: TourRouteStop[]
  order?: number
}

export interface Place {
  id: string
  name: string
  region: string
  blurb: string
  image?: Media
  order?: number
}

export interface Season {
  period: string
  note: string
  bestFor: string
  order?: number
}

export interface ProvenanceLink {
  name: string
  location: string
  role: string
  note?: string
  order?: number
}

export interface ContactPerson {
  name: string
  phone: string
  email: string
}

export interface RouteRibbonBlock {
  blockType: 'routeRibbon'
  variant: 'featured' | 'full' | 'strip'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  tours: Tour[]
}

export interface RegionAtlasBlock {
  blockType: 'regionAtlas'
  variant: 'sampler' | 'by-region'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  places: Place[]
  regionIntros?: Record<string, string>
  moreLink?: Link
}

export interface ProvenanceListBlock {
  blockType: 'provenanceList'
  variant: 'chain' | 'full'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  links: ProvenanceLink[]
  moreLink?: Link
}

export interface WhenToGoBlock {
  blockType: 'whenToGo'
  variant: 'full' | 'strip'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  reviewedDate: string
  seasons: Season[]
  moreLink?: Link
}

export interface WhatsIncludedBlock {
  blockType: 'whatsIncluded'
  variant: 'full'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  included: string[]
  upgrades: string[]
  note?: string
}

export interface TravellerWordsBlock {
  blockType: 'travellerWords'
  variant: 'single' | 'stacked'
  background?: SectionBackground
  eyebrow?: string
  heading?: string
  intro?: string
  testimonials: Testimonial[]
}

export interface PersonCtaBlock {
  blockType: 'personCta'
  variant: 'banner'
  heading: string
  note?: string
  formLink?: boolean
  people: ContactPerson[]
}

export interface EnquiryFormBlock {
  blockType: 'enquiryForm'
  variant: 'full'
  background?: SectionBackground
  heading: string
  intro?: string
  tourOptions: string[]
  responseNote?: string
  people: ContactPerson[]
}

export type PageBlock =
  | HeroBlock
  | AboutSectionBlock
  | ServicesGridBlock
  | TeamGridBlock
  | TestimonialsCarouselBlock
  | ImageWithTextBlock
  | CTABannerBlock
  | ContactSectionBlock
  | FAQBlock
  | TrustBarBlock
  | ProcessStepsBlock
  | RouteRibbonBlock
  | RegionAtlasBlock
  | ProvenanceListBlock
  | WhenToGoBlock
  | WhatsIncludedBlock
  | TravellerWordsBlock
  | PersonCtaBlock
  | EnquiryFormBlock

export interface Page {
  id: string
  title: string
  slug: string
  navLabel?: string
  showInNav: boolean
  seo?: { metaTitle?: string; metaDescription?: string }
  layout: PageBlock[]
}

export interface SiteSettings {
  businessName: string
  tagline?: string
  logo?: Media
  brand: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    neutralColor: string
    headingFont?: string
    bodyFont?: string
  }
  contact: {
    phone?: string
    phoneLabel?: string
    emergencyPhone?: string
    emergencyLabel?: string
    email?: string
    address?: string
    serviceArea?: string
    hours?: { days: string; hours: string }[]
    /* Albania Travel's two named contacts: the product is a person. */
    people?: ContactPerson[]
  }
  partnership?: {
    line: string
    operator: string
    operatorLocation: string
  }
  socials?: { platform: string; url: string }[]
}

export interface Navigation {
  header: Link[]
  footer: Link[]
}
