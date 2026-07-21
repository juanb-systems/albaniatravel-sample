// Minimal Lexical (Payload richText) -> HTML renderer.
// Covers the node types this template's content actually uses: paragraph,
// heading, text (bold/italic/underline), link, list/listitem. Extend here if
// a project needs more (e.g. quote, upload) rather than reaching for a
// heavier dependency.
//
// Reads Payload's canonical Lexical shapes, in lockstep with
// lib/markdown-to-lexical.ts: a link's URL lives under `fields.url` (a bare
// top-level `url` is still accepted for older content). Lists render from
// `tag`; listType/start/value are Payload editor metadata and need no handling
// here.

interface LexicalNode {
  type: string
  tag?: string
  format?: number
  text?: string
  url?: string
  fields?: { url?: string; newTab?: boolean; linkType?: string }
  children?: LexicalNode[]
}

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 8

function renderText(node: LexicalNode): string {
  let text = escapeHtml(node.text ?? '')
  const format = node.format ?? 0
  if (format & FORMAT_BOLD) text = `<strong>${text}</strong>`
  if (format & FORMAT_ITALIC) text = `<em>${text}</em>`
  if (format & FORMAT_UNDERLINE) text = `<u>${text}</u>`
  return text
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderNode(node: LexicalNode): string {
  const children = (node.children ?? []).map(renderNode).join('')
  switch (node.type) {
    case 'paragraph':
      return `<p>${children}</p>`
    case 'heading':
      return `<${node.tag ?? 'h3'}>${children}</${node.tag ?? 'h3'}>`
    case 'list':
      return `<${node.tag ?? 'ul'}>${children}</${node.tag ?? 'ul'}>`
    case 'listitem':
      return `<li>${children}</li>`
    case 'link': {
      const url = node.fields?.url ?? node.url ?? '#'
      const target = node.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${escapeHtml(url)}"${target}>${children}</a>`
    }
    case 'text':
      return renderText(node)
    default:
      return children
  }
}

export function renderRichText(value: unknown): string {
  const root = (value as { root?: LexicalNode })?.root
  if (!root?.children) return ''
  return root.children.map(renderNode).join('')
}
