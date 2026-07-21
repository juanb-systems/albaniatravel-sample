// Content-source adapter. THIS is the module components import.
//
// The site's client-facing artifact is static HTML; the CMS is one swappable
// build-time content source, not a hard dependency. Which source is used is a
// config switch, so the same components serve both:
//
//   CONTENT_SOURCE=local   (default) read <site>/content/*.json. No CMS needed.
//                          Used during the iteration phase: fast loop, nothing
//                          to stand up or re-seed on every design change.
//   CONTENT_SOURCE=payload  read a running Payload instance over REST at build
//                          time. Used after handoff, once the settled content
//                          has been imported and the client owns their admin.
//
// Both sources return identical shapes (see lib/types.ts), so no component,
// page or layout knows or cares which one is active. Adding another source
// later means adding one module here, nothing downstream.

import type { Page, SiteSettings, Navigation, Service } from './types'
import * as local from './source-local'
import * as payload from './source-payload'

const SOURCE = (import.meta.env.CONTENT_SOURCE || process.env.CONTENT_SOURCE || 'local').toLowerCase()

if (SOURCE !== 'local' && SOURCE !== 'payload') {
  throw new Error(`Unknown CONTENT_SOURCE "${SOURCE}". Use "local" or "payload".`)
}

const source = SOURCE === 'payload' ? payload : local

export const contentSource = SOURCE

export function getPages(): Promise<Page[]> {
  return source.getPages()
}

export function getPageBySlug(slug: string): Promise<Page | null> {
  return source.getPageBySlug(slug)
}

export function getSiteSettings(): Promise<SiteSettings> {
  return source.getSiteSettings()
}

export function getNavigation(): Promise<Navigation> {
  return source.getNavigation()
}

export function getServices(): Promise<Service[]> {
  return source.getServices()
}

export function getServiceBySlug(slug: string): Promise<Service | null> {
  return source.getServiceBySlug(slug)
}

export function mediaUrl(url: string): string {
  return source.mediaUrl(url)
}
