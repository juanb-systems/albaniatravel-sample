// Local content source: reads the canonical content the AI authored for this
// client from <site>/content/, with no CMS running.
//
// This is the source used during the iteration phase (see Priority 1 of
// docs/NEXT-ITERATION-ROADMAP.md). Payload is a handoff step, not a build-time
// dependency, so the site must build standalone from these files.
//
// The canonical files are stored NORMALISED (services defined once; pages refer
// to them by slug, and to images by filename). This module resolves those
// references into the same fully-nested shapes Payload returns at depth=2, so
// components cannot tell which source they are on.

import fs from 'node:fs'
import path from 'node:path'
import type { Page, SiteSettings, Navigation, Service, TeamMember, Testimonial, Media, Tour, Place, Season, ProvenanceLink, ContactPerson } from './types'
import { toRichText } from './markdown-to-lexical'

// web/ is the cwd for `astro dev|build`, so the site root is one level up and
// holds content/ and assets/ as siblings. Both are overridable for tooling.
const SITE_ROOT = process.env.SITE_ROOT || path.resolve(process.cwd(), '..')
const CONTENT_DIR = process.env.CONTENT_DIR || path.join(SITE_ROOT, 'content')
const ASSETS_DIR = process.env.ASSETS_DIR || path.join(SITE_ROOT, 'assets')

function readJSON<T>(file: string, fallback: T): T {
  const full = path.join(CONTENT_DIR, file)
  if (!fs.existsSync(full)) return fallback
  return JSON.parse(fs.readFileSync(full, 'utf-8')) as T
}

// Stage 4's image-metadata.json is already the source of truth for every
// image's alt text and dimensions, so media resolution reads it rather than
// duplicating that data into the content files.
interface ImageMeta {
  filename: string
  visualDescription: string
  width?: number
  height?: number
}
let imageMetaCache: ImageMeta[] | null = null
function imageMeta(): ImageMeta[] {
  if (imageMetaCache) return imageMetaCache
  const full = path.join(ASSETS_DIR, 'image-metadata.json')
  imageMetaCache = fs.existsSync(full) ? JSON.parse(fs.readFileSync(full, 'utf-8')) : []
  return imageMetaCache!
}

/**
 * Resolve an image filename into a Media object matching Payload's shape.
 * Files are served from web/public/media (see the sync-media script), so the
 * URL is stable across both content sources.
 */
function resolveMedia(ref: unknown): Media | undefined {
  if (!ref) return undefined
  if (typeof ref === 'object') return ref as Media // already resolved
  const filename = String(ref)
  const meta = imageMeta().find((m) => m.filename === filename)
  return {
    id: filename,
    url: `/media/${filename}`,
    // Same rule the seed uses: the first sentence of the Stage B description.
    alt: meta ? meta.visualDescription.split('. ')[0] : '',
    width: meta?.width,
    height: meta?.height,
  }
}

function resolveService(raw: any): Service {
  return { ...raw, id: raw.id ?? raw.slug, description: toRichText(raw.description), image: resolveMedia(raw.image) }
}

function allServices(): Service[] {
  return readJSON<any[]>('services.json', [])
    .map(resolveService)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

function allTeam(): TeamMember[] {
  return readJSON<any[]>('team-members.json', [])
    .map((m) => ({ ...m, id: m.id ?? m.name, photo: resolveMedia(m.photo) }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

function allTestimonials(): Testimonial[] {
  return readJSON<any[]>('testimonials.json', []).map((t, i) => ({ ...t, id: t.id ?? String(i) }))
}

/* ---------------------------------------------------------------------------
   Albania Travel's own collections (Stage 3 blockPlan). Same normalisation
   rules as the kit collections: defined once, referenced by name/slug from
   pages.json, images resolved through image-metadata.json.
--------------------------------------------------------------------------- */

function allTours(): Tour[] {
  return readJSON<any[]>('tours.json', [])
    .map((t) => ({ ...t, id: t.id ?? t.slug }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

function allPlaces(): Place[] {
  return readJSON<any[]>('places.json', [])
    .map((p) => ({ ...p, id: p.id ?? p.name, image: resolveMedia(p.image) }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

function seasonsData(): { reviewedDate: string; seasons: Season[] } {
  const raw = readJSON<any>('seasons.json', { reviewedDate: '', seasons: [] })
  return {
    reviewedDate: raw.reviewedDate ?? '',
    seasons: (raw.seasons ?? []).sort((a: Season, b: Season) => (a.order ?? 0) - (b.order ?? 0)),
  }
}

function provenanceData(): { intro: string; links: ProvenanceLink[] } {
  const raw = readJSON<any>('provenance.json', { intro: '', links: [] })
  return {
    intro: raw.intro ?? '',
    links: (raw.links ?? []).sort((a: ProvenanceLink, b: ProvenanceLink) => (a.order ?? 0) - (b.order ?? 0)),
  }
}

function contactPeople(): ContactPerson[] {
  const settings = readJSON<any>('site-settings.json', null)
  return settings?.contact?.people ?? []
}

/**
 * Expand a block's references (images by filename, collection items by slug or
 * name) and convert its markdown fields, mirroring Payload depth=2. Omitting a
 * block's list means "all of them", matching how the seed usually passes the
 * full set.
 */
function resolveBlock(block: any): any {
  const b = { ...block }
  switch (b.blockType) {
    case 'hero':
      b.image = resolveMedia(b.image)
      break
    case 'aboutSection':
    case 'imageWithText':
      b.image = resolveMedia(b.image)
      b.body = toRichText(b.body)
      break
    case 'servicesGrid': {
      const all = allServices()
      b.services = Array.isArray(b.services)
        ? b.services.map((ref: any) => (typeof ref === 'string' ? all.find((s) => s.slug === ref) : resolveService(ref))).filter(Boolean)
        : all
      break
    }
    case 'teamGrid': {
      const all = allTeam()
      b.members = Array.isArray(b.members)
        ? b.members.map((ref: any) => (typeof ref === 'string' ? all.find((m) => m.name === ref || m.id === ref) : ref)).filter(Boolean)
        : all
      break
    }
    case 'testimonialsCarousel': {
      const all = allTestimonials()
      b.testimonials = Array.isArray(b.testimonials)
        ? b.testimonials.map((ref: any) => (typeof ref === 'string' ? all.find((t) => t.id === ref) : ref)).filter(Boolean)
        : all
      break
    }
    case 'contactSection':
      b.additionalInfo = toRichText(b.additionalInfo)
      break
    case 'faq':
      b.items = (b.items ?? []).map((item: any) => ({ ...item, answer: toRichText(item.answer) }))
      b.groups = (b.groups ?? []).map((group: any) => ({
        ...group,
        items: (group.items ?? []).map((item: any) => ({ ...item, answer: toRichText(item.answer) })),
      }))
      break
    /* Albania Travel's own blocks */
    case 'routeRibbon': {
      const all = allTours()
      b.tours = Array.isArray(b.tours)
        ? b.tours.map((ref: any) => (typeof ref === 'string' ? all.find((t) => t.slug === ref || t.name === ref) : ref)).filter(Boolean)
        : all
      break
    }
    case 'regionAtlas': {
      const all = allPlaces()
      b.places = Array.isArray(b.places)
        ? b.places.map((ref: any) => (typeof ref === 'string' ? all.find((p) => p.name === ref) : ref)).filter(Boolean)
        : all
      break
    }
    case 'provenanceList': {
      const data = provenanceData()
      b.links = Array.isArray(b.links) && b.links.length ? b.links : data.links
      b.intro = b.intro ?? data.intro
      break
    }
    case 'whenToGo': {
      const data = seasonsData()
      b.seasons = Array.isArray(b.seasons) && b.seasons.length ? b.seasons : data.seasons
      b.reviewedDate = b.reviewedDate ?? data.reviewedDate
      break
    }
    case 'travellerWords': {
      const all = allTestimonials()
      b.testimonials = Array.isArray(b.testimonials)
        ? b.testimonials.map((ref: any) => (typeof ref === 'string' ? all.find((t) => t.authorName === ref || t.id === ref) : ref)).filter(Boolean)
        : all
      break
    }
    case 'personCta':
    case 'enquiryForm':
      b.people = Array.isArray(b.people) && b.people.length ? b.people : contactPeople()
      break
    // ctaBanner, trustBar, processSteps and whatsIncluded carry no references.
  }
  return b
}

function resolvePage(raw: any): Page {
  return { ...raw, id: raw.id ?? raw.slug, layout: (raw.layout ?? []).map(resolveBlock) }
}

export async function getPages(): Promise<Page[]> {
  return readJSON<any[]>('pages.json', []).map(resolvePage)
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const page = readJSON<any[]>('pages.json', []).find((p) => p.slug === slug)
  return page ? resolvePage(page) : null
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const raw = readJSON<any>('site-settings.json', null)
  if (!raw) throw new Error(`No content/site-settings.json found in ${CONTENT_DIR}`)
  return { ...raw, logo: resolveMedia(raw.logo) }
}

export async function getNavigation(): Promise<Navigation> {
  return readJSON<Navigation>('navigation.json', { header: [], footer: [] })
}

export async function getServices(): Promise<Service[]> {
  return allServices()
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return allServices().find((s) => s.slug === slug) ?? null
}

export function mediaUrl(url: string): string {
  return url
}
