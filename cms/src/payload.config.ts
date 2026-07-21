import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonials } from './collections/Testimonials'
import { Pages } from './collections/Pages'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// The Astro frontend (template/web) runs on a separate dev port and fetches
// content from this API at build time. CORS must allow that origin.
const ASTRO_DEV_URL = process.env.ASTRO_DEV_URL || 'http://localhost:4321'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Live preview: renders the actual page in a panel beside the editor, so a
    // client can see what they are changing instead of editing fields blind.
    // This was the single biggest gap found when the admin was first exercised
    // properly (see docs/payload-admin-findings.md).
    //
    // Requires the Astro site to be RUNNING (npm run dev in web/) with
    // CONTENT_SOURCE=payload, because the preview is a live fetch. It is not a
    // preview of the deployed static build: that only changes on a rebuild.
    livePreview: {
      // `collections` is required: without it the Live Preview tab never
      // appears, even though the url function is perfectly valid.
      collections: ['pages'],
      url: ({ data }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        return slug && slug !== 'home' ? `${ASTRO_DEV_URL}/${slug}` : ASTRO_DEV_URL
      },
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Services, TeamMembers, Testimonials, Pages],
  globals: [SiteSettings, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || '',
    },
  }),
  cors: [ASTRO_DEV_URL],
  sharp,
  plugins: [],
})
