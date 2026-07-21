// Payload content source: reads the client's content from a running Payload
// instance over its REST API at build time.
//
// This is the source used AFTER handoff, once the settled content has been
// imported into Payload and the client owns their editable admin. During the
// iteration phase the site uses source-local.ts instead and no CMS runs.
// See lib/content.ts for the dispatch.

import type { Page, SiteSettings, Navigation, Service } from './types'

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL || 'http://localhost:3000'

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${PAYLOAD_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Payload request failed: ${path} (${res.status})`)
  }
  return res.json() as Promise<T>
}

export async function getPages(): Promise<Page[]> {
  const data = await fetchJSON<{ docs: Page[] }>('/api/pages?limit=100&depth=2')
  return data.docs
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const data = await fetchJSON<{ docs: Page[] }>(
    `/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`,
  )
  return data.docs[0] ?? null
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchJSON<SiteSettings>('/api/globals/site-settings?depth=2')
}

export async function getNavigation(): Promise<Navigation> {
  return fetchJSON<Navigation>('/api/globals/navigation?depth=1')
}

export async function getServices(): Promise<Service[]> {
  const data = await fetchJSON<{ docs: Service[] }>('/api/services?limit=100&depth=1&sort=order')
  return data.docs
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = await fetchJSON<{ docs: Service[] }>(
    `/api/services?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`,
  )
  return data.docs[0] ?? null
}

export function mediaUrl(url: string): string {
  return url.startsWith('http') ? url : `${PAYLOAD_URL}${url}`
}
