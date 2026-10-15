// Pulls the latest journal articles and the legal documents from looksteal.com
// (WordPress) into src/data/journal.json and src/data/legal.json, and
// downloads article images into public/media/journal.
//
// Usage: npm run sync

import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const API = 'https://looksteal.com/wp-json/wp/v2'
const ARTICLE_COUNT = 9

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const mediaDir = path.join(root, 'public/media/journal')

const ENTITIES = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', hellip: '…' }

function decode(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&(\w+);/g, (m, name) => ENTITIES[name] ?? m)
}

function toText(html) {
  return decode(html.replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .trim()
}

async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.json()
}

async function download(url, file) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} downloading ${url}`)
  await writeFile(file, Buffer.from(await res.arrayBuffer()))
}

// Flattens WordPress page HTML into heading / paragraph / list blocks.
// A paragraph that is entirely bold is treated as a heading.
function toBlocks(html) {
  const blocks = []
  for (const [, tag, inner] of html.matchAll(/<(p|li|h[1-6])[^>]*>([\s\S]*?)<\/\1>/g)) {
    const text = toText(inner)
    if (!text) continue
    if (tag === 'li') {
      const last = blocks.at(-1)
      if (last?.type === 'list') last.items.push(text)
      else blocks.push({ type: 'list', items: [text] })
    } else if (tag.startsWith('h') || /^\s*<strong>[^]*<\/strong>\s*$/.test(inner)) {
      blocks.push({ type: 'heading', text })
    } else {
      blocks.push({ type: 'paragraph', text })
    }
  }
  return blocks
}

// Journal articles
const posts = await getJson(
  `${API}/posts?per_page=${ARTICLE_COUNT}&_embed=wp:featuredmedia,wp:term`,
)

await rm(mediaDir, { recursive: true, force: true })
await mkdir(mediaDir, { recursive: true })

const articles = []
for (const post of posts) {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const sizes = media?.media_details?.sizes ?? {}
  const source = (sizes.medium_large ?? sizes.large ?? media)?.source_url
  let image = null
  if (source) {
    image = `/media/journal/${post.slug}${path.extname(new URL(source).pathname)}`
    await download(source, path.join(root, 'public', image))
  }
  const terms = post._embedded?.['wp:term']?.flat() ?? []
  articles.push({
    id: post.id,
    title: toText(post.title.rendered),
    excerpt: toText(post.excerpt.rendered).replace(/\s*\[…\]$/, '…'),
    date: post.date,
    url: post.link,
    image,
    group: terms.find((t) => t.taxonomy === 'category')?.name ?? null,
  })
}

await writeFile(
  path.join(root, 'src/data/journal.json'),
  `${JSON.stringify({ syncedAt: new Date().toISOString(), articles }, null, 2)}\n`,
)

// Legal documents
const legalPages = await getJson(`${API}/pages?slug=disclaimer,privacy-policy`)
const legal = Object.fromEntries(
  ['disclaimer', 'privacy-policy'].map((slug) => {
    const page = legalPages.find((p) => p.slug === slug)
    return [slug, { title: toText(page.title.rendered), url: page.link, blocks: toBlocks(page.content.rendered) }]
  }),
)

await writeFile(path.join(root, 'src/data/legal.json'), `${JSON.stringify(legal, null, 2)}\n`)
console.log(`Synced ${articles.length} articles and ${Object.keys(legal).length} legal documents.`)
