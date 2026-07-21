// Copy the client's prepared images into public/media so the site can serve
// them when CONTENT_SOURCE=local (no CMS running to serve /api/media/...).
//
// Runs automatically before `npm run dev` and `npm run build`. Cheap and
// idempotent: it only copies files that are missing or newer.
//
// When CONTENT_SOURCE=payload, Payload serves media itself and this is a no-op
// as far as the site is concerned, but syncing anyway keeps the two modes
// rendering identically.

import fs from 'node:fs'
import path from 'node:path'

const SITE_ROOT = process.env.SITE_ROOT || path.resolve(process.cwd(), '..')
const SRC = process.env.ASSETS_DIR ? path.join(process.env.ASSETS_DIR, 'raw') : path.join(SITE_ROOT, 'assets', 'raw')
const DEST = path.resolve(process.cwd(), 'public', 'media')

if (!fs.existsSync(SRC)) {
  console.log(`[sync-media] no assets at ${SRC}, skipping`)
  process.exit(0)
}

fs.mkdirSync(DEST, { recursive: true })

let copied = 0
for (const file of fs.readdirSync(SRC)) {
  const from = path.join(SRC, file)
  if (!fs.statSync(from).isFile()) continue
  const to = path.join(DEST, file)
  if (fs.existsSync(to) && fs.statSync(to).mtimeMs >= fs.statSync(from).mtimeMs) continue
  fs.copyFileSync(from, to)
  copied++
}

console.log(`[sync-media] ${copied} file(s) copied to public/media`)
