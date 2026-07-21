// Markdown -> Lexical (Payload richText) JSON.
//
// Why this exists: during the iteration phase content is authored locally as
// markdown (see <site>/content/README.md for the format), but every component
// renders rich text through lib/richtext.ts, which walks Payload's Lexical JSON.
// This converter lets both content sources produce the SAME shape, so
// components never learn which source they are on.
//
// The emitted shapes are Payload's CANONICAL Lexical shapes, not a lookalike:
// links carry a `fields: { linkType, url, newTab }` object (not a top-level
// `url`), and lists carry `listType` + `start` with each item carrying a
// `value`. This matters because the seed importer writes these straight into
// Payload: if the shapes were only renderer-compatible, the content would show
// on the live site but the Payload admin editor could not hydrate a link or
// list, so the moment a client opened it to edit, the link URL was lost. Keep
// this in lockstep with lib/richtext.ts, which reads `fields.url`.
//
// Deliberately supports exactly what lib/richtext.ts can render: paragraph,
// heading, unordered/ordered list, link, and bold/italic inline marks. If a
// project needs more, extend this and richtext.ts together rather than
// reaching for a heavier markdown dependency.

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2

interface LexNode {
  type: string
  tag?: string
  format?: number | string
  text?: string
  url?: string
  fields?: { linkType: string; url: string; newTab: boolean }
  listType?: string
  start?: number
  value?: number
  version?: number
  indent?: number
  direction?: string
  children?: LexNode[]
}

function textNode(text: string, format = 0): LexNode {
  return { type: 'text', text, format, version: 1 }
}

/**
 * Parse inline markdown (bold, italic, links) into Lexical inline nodes.
 * Order matters: links first so their label text still gets mark parsing.
 */
function parseInline(input: string): LexNode[] {
  const nodes: LexNode[] = []
  // [label](url)
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = linkRe.exec(input))) {
    if (m.index > last) nodes.push(...parseMarks(input.slice(last, m.index)))
    // Payload LinkNode shape: url lives under `fields`, not on the node.
    nodes.push({
      type: 'link',
      fields: { linkType: 'custom', url: m[2], newTab: false },
      version: 3,
      indent: 0,
      format: '',
      direction: 'ltr',
      children: parseMarks(m[1]),
    })
    last = m.index + m[0].length
  }
  if (last < input.length) nodes.push(...parseMarks(input.slice(last)))
  return nodes.length ? nodes : [textNode(input)]
}

/** Split a run of text into bold/italic/plain text nodes. */
function parseMarks(input: string): LexNode[] {
  const nodes: LexNode[] = []
  // **bold** then *italic* / _italic_
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(_([^_]+)_)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(input))) {
    if (m.index > last) nodes.push(textNode(input.slice(last, m.index)))
    if (m[2] !== undefined) nodes.push(textNode(m[2], FORMAT_BOLD))
    else nodes.push(textNode(m[4] ?? m[6], FORMAT_ITALIC))
    last = m.index + m[0].length
  }
  if (last < input.length) nodes.push(textNode(input.slice(last)))
  return nodes
}

function block(type: string, children: LexNode[], tag?: string): LexNode {
  return { type, tag, version: 1, indent: 0, format: '', direction: 'ltr', children }
}

// Payload ListNode / ListItemNode shapes. The editor reads `listType` and
// `start` off the list and `value` off each item; without them it cannot
// hydrate the list in the admin UI (tag alone is not enough).
function listBlock(children: LexNode[], listType: string, tag: string): LexNode {
  return { type: 'list', listType, start: 1, tag, version: 1, indent: 0, format: '', direction: 'ltr', children }
}
function listItem(children: LexNode[], value: number): LexNode {
  return { type: 'listitem', value, version: 1, indent: 0, format: '', direction: 'ltr', children }
}

/**
 * Convert a markdown string into the Lexical richText JSON Payload stores and
 * lib/richtext.ts renders. Blank lines separate blocks.
 */
export function markdownToLexical(markdown: string): { root: LexNode } {
  const children: LexNode[] = []
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i++
      continue
    }

    // Heading: # .. ######
    const heading = /^(#{1,6})\s+(.*)$/.exec(line)
    if (heading) {
      children.push(block('heading', parseInline(heading[2].trim()), `h${heading[1].length}`))
      i++
      continue
    }

    // List: consecutive "- " / "* " (unordered) or "1." (ordered)
    const isUl = /^\s*[-*]\s+/.test(line)
    const isOl = /^\s*\d+\.\s+/.test(line)
    if (isUl || isOl) {
      const items: LexNode[] = []
      const itemRe = isUl ? /^\s*[-*]\s+(.*)$/ : /^\s*\d+\.\s+(.*)$/
      let value = 1
      while (i < lines.length && itemRe.test(lines[i])) {
        const item = itemRe.exec(lines[i])!
        items.push(listItem(parseInline(item[1].trim()), value++))
        i++
      }
      children.push(listBlock(items, isUl ? 'bullet' : 'number', isUl ? 'ul' : 'ol'))
      continue
    }

    // Paragraph: gather until a blank line or a new block starts
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      para.push(lines[i].trim())
      i++
    }
    children.push(block('paragraph', parseInline(para.join(' '))))
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}

/**
 * Content fields may already be Lexical JSON (when they came from Payload) or a
 * markdown string (when authored locally). Normalise either into Lexical.
 */
export function toRichText(value: unknown): unknown {
  if (typeof value === 'string') return markdownToLexical(value)
  return value
}
