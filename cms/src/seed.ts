// Handoff importer: loads this client's canonical content into Payload.
//
// Run with: npm run seed
//
// This is the LAST step of a build, not the middle one. During the whole
// iteration phase the site builds straight from <site>/content/*.json with no
// CMS running (CONTENT_SOURCE=local). Once the content has settled, this script
// imports it into Payload so the client gets an admin they can edit, and the
// site switches to CONTENT_SOURCE=payload.
//
// Note what this file deliberately does NOT contain: content. Earlier builds
// hand-wrote a bespoke seed per client with the copy embedded in TypeScript,
// which made the content a code artifact and the CMS a build-time dependency.
// This is a generic importer: the content lives in data, the AI generates it
// per client, and this script is the same for every project.
//
// Content format and rules: see <site>/content/README.md

import 'dotenv/config'
import { getPayload } from 'payload'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import config from './payload.config'
import { toRichText } from './lib/markdown-to-lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = process.env.SITE_ROOT || path.resolve(dirname, '..', '..')
const CONTENT_DIR = process.env.CONTENT_DIR || path.join(SITE_ROOT, 'content')
const ASSETS_DIR = process.env.ASSETS_DIR || path.join(SITE_ROOT, 'assets')
const RAW_DIR = path.join(ASSETS_DIR, 'raw')

function readJSON<T>(file: string, fallback: T): T {
  const full = path.join(CONTENT_DIR, file)
  if (!fs.existsSync(full)) return fallback
  return JSON.parse(fs.readFileSync(full, 'utf-8')) as T
}

// Stage 4's image-metadata.json is the single source of truth for alt text and
// dimensions, exactly as the local content source uses it.
const imageMeta: Array<{ filename: string; visualDescription: string }> = (() => {
  const full = path.join(ASSETS_DIR, 'image-metadata.json')
  return fs.existsSync(full) ? JSON.parse(fs.readFileSync(full, 'utf-8')) : []
})()

function altFor(filename: string, fallback: string): string {
  const entry = imageMeta.find((e) => e.filename === filename)
  return entry ? entry.visualDescription.split('. ')[0] : fallback
}

function mimeFor(filename: string): string {
  const ext = path.extname(filename).slice(1).toLowerCase()
  if (ext === 'png') return 'image/png'
  if (ext === 'webp') return 'image/webp'
  if (ext === 'svg') return 'image/svg+xml'
  return 'image/jpeg'
}

const content = {
  pages: readJSON<any[]>('pages.json', []),
  services: readJSON<any[]>('services.json', []),
  team: readJSON<any[]>('team-members.json', []),
  testimonials: readJSON<any[]>('testimonials.json', []),
  settings: readJSON<any>('site-settings.json', null),
  navigation: readJSON<any>('navigation.json', { header: [], footer: [] }),
}

/** Every image filename referenced anywhere in the content. */
function referencedMedia(): string[] {
  const refs = new Set<string>()
  const add = (v: unknown) => {
    if (typeof v === 'string' && v.trim()) refs.add(v)
  }
  add(content.settings?.logo)
  content.services.forEach((s) => add(s.image))
  content.team.forEach((m) => add(m.photo))
  content.pages.forEach((p) => (p.layout ?? []).forEach((b: any) => add(b.image)))
  return [...refs]
}

async function main() {
  if (!content.settings) throw new Error(`No content found at ${CONTENT_DIR}. Nothing to import.`)

  const payload = await getPayload({ config })
  console.log(`Importing canonical content from ${CONTENT_DIR} ...`)

  // Payload writes uploads to cms/media, and deleting cms.db does NOT delete
  // them. On a re-import those orphans collide and Payload silently renames
  // around them (hero.jpg -> hero-1.jpg), so the handed-off site ends up
  // serving different filenames than the local source did. On a genuinely fresh
  // import (no media rows in the DB) the files on disk are orphans by
  // definition, so clear them first. They are reproducible from assets/raw.
  const existingMedia = await payload.count({ collection: 'media' })
  const uploadDir = path.resolve(dirname, '..', 'media')
  if (existingMedia.totalDocs === 0 && fs.existsSync(uploadDir)) {
    const orphans = fs.readdirSync(uploadDir).filter((f) => fs.statSync(path.join(uploadDir, f)).isFile())
    orphans.forEach((f) => fs.unlinkSync(path.join(uploadDir, f)))
    if (orphans.length) console.log(`  cleared ${orphans.length} orphaned upload(s) from cms/media`)
  }

  // --- Media (only what the content actually references) ---
  const media: Record<string, any> = {}
  for (const filename of referencedMedia()) {
    const file = path.join(RAW_DIR, filename)
    if (!fs.existsSync(file)) {
      console.warn(`  ! skipped ${filename} (not found in assets/raw)`)
      continue
    }
    const buffer = fs.readFileSync(file)
    media[filename] = await payload.create({
      collection: 'media',
      data: { alt: altFor(filename, content.settings.businessName ?? filename) },
      file: { data: buffer, mimetype: mimeFor(filename), name: filename, size: buffer.length },
    })
    console.log(`  uploaded ${filename}`)
  }
  const mediaId = (ref: unknown) => (typeof ref === 'string' ? media[ref]?.id : undefined)

  // --- Collections ---
  const serviceIdBySlug: Record<string, any> = {}
  for (const s of content.services) {
    const doc = await payload.create({
      collection: 'services',
      data: { ...s, description: toRichText(s.description), image: mediaId(s.image) },
    })
    serviceIdBySlug[s.slug] = doc.id
  }
  console.log(`  created ${content.services.length} service(s)`)

  const teamIdByName: Record<string, any> = {}
  for (const m of content.team) {
    const doc = await payload.create({
      collection: 'team-members',
      data: { ...m, photo: mediaId(m.photo) },
    })
    teamIdByName[m.name] = doc.id
  }
  console.log(`  created ${content.team.length} team member(s)`)

  const testimonialIdByRef: Record<string, any> = {}
  for (const [i, t] of content.testimonials.entries()) {
    const { id: localId, ...rest } = t
    const doc = await payload.create({ collection: 'testimonials', data: rest })
    testimonialIdByRef[localId ?? `t${i + 1}`] = doc.id
  }
  console.log(`  created ${content.testimonials.length} testimonial(s)`)

  // --- Globals ---
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { ...content.settings, logo: mediaId(content.settings.logo) },
  })
  await payload.updateGlobal({ slug: 'navigation', data: content.navigation })
  console.log('  updated globals')

  // --- Pages (resolve every reference back into Payload ids) ---
  const resolveBlock = (b: any) => {
    const out = { ...b }
    if ('image' in out) out.image = mediaId(out.image)
    switch (out.blockType) {
      case 'aboutSection':
      case 'imageWithText':
        out.body = toRichText(out.body)
        break
      case 'servicesGrid':
        out.services = (out.services ?? content.services.map((s) => s.slug)).map(
          (ref: string) => serviceIdBySlug[ref],
        ).filter(Boolean)
        break
      case 'teamGrid':
        out.members = (out.members ?? content.team.map((m) => m.name)).map(
          (ref: string) => teamIdByName[ref],
        ).filter(Boolean)
        break
      case 'testimonialsCarousel':
        out.testimonials = (out.testimonials ?? Object.keys(testimonialIdByRef)).map(
          (ref: string) => testimonialIdByRef[ref],
        ).filter(Boolean)
        break
      case 'contactSection':
        out.additionalInfo = toRichText(out.additionalInfo)
        break
      case 'faq':
        out.items = (out.items ?? []).map((i: any) => ({ ...i, answer: toRichText(i.answer) }))
        break
    }
    return out
  }

  for (const p of content.pages) {
    await payload.create({
      collection: 'pages',
      // Pages have drafts enabled, so _status defaults to 'draft' and the
      // public API hides drafts. An imported page must be published or the
      // handed-off site builds empty: the content is there, the API just will
      // not serve it. Publish explicitly rather than relying on a default.
      data: { ...p, _status: 'published', layout: (p.layout ?? []).map(resolveBlock) },
    })
    console.log(`  created page: ${p.title}`)
  }

  console.log('\nImport complete. Switch the site to CONTENT_SOURCE=payload for handoff.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
