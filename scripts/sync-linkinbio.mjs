// Pulls the Look Steal Inc Linkin.bio page (profile, buttons, shoppable posts)
// into src/data/looksteal.json and downloads the images into public/media/feed.
//
// Usage: npm run sync

import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const NICKNAME = 'looksteal'
const API = 'https://api-prod.linkin.bio/api/v2'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataFile = path.join(root, 'src/data/looksteal.json')
const mediaDir = path.join(root, 'public/media/feed')

// Strip Later's tracking params so outbound links stay clean.
function cleanUrl(url) {
  if (!url) return null
  const u = new URL(url)
  if (u.searchParams.get('utm_source') === 'later-linkinbio') {
    for (const key of ['utm_campaign', 'utm_medium', 'utm_source']) u.searchParams.delete(key)
  }
  return u.toString()
}

async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.json()
}

// The image CDN only returns an image when the request accepts webp.
async function download(url, file) {
  const res = await fetch(url, { headers: { Accept: 'image/webp,image/*' } })
  if (!res.ok) throw new Error(`${res.status} downloading ${url}`)
  await writeFile(file, Buffer.from(await res.arrayBuffer()))
}

const { linkinbio_page: page } = await getJson(`${API}/pages?nickname=${NICKNAME}`)
const blocks = Object.fromEntries(page.linkinbio_blocks.map((b) => [b.block_type, b]))
const social = page.social_profiles[0]

const { linkinbio_posts: rawPosts } = await getJson(
  `${API}/linkinbio_posts?social_profile_id=${social.id}&start_time=`,
)

await rm(mediaDir, { recursive: true, force: true })
await mkdir(mediaDir, { recursive: true })

const avatar = blocks.header.linkinbio_attachments.find((a) => a.name === 'avatar')
const avatarUrl = avatar?.variants.original.url ?? social.avatar_url
await download(avatarUrl, path.join(mediaDir, 'avatar.jpg'))

const posts = []
for (const p of rawPosts) {
  const image = `/media/feed/post-${p.id}.webp`
  await download(p.high_res_url, path.join(root, 'public', image))
  posts.push({
    id: p.id,
    caption: p.caption.trim(),
    postedAt: new Date(p.posted_time * 1000).toISOString(),
    image,
    link: cleanUrl(p.link_url),
    tags: p.linkinbio_post_links.map((t) => ({
      title: t.title,
      url: cleanUrl(t.link_url),
      x: t.x,
      y: t.y,
    })),
  })
}

const style = blocks.style.block_data
const data = {
  syncedAt: new Date().toISOString(),
  profile: {
    name: blocks.header.block_data.display_name,
    handle: social.nickname,
    title: social.name,
    bio: blocks.header.block_data.bio,
    avatar: '/media/feed/avatar.jpg',
    instagram: `https://www.instagram.com/${social.nickname}/`,
  },
  theme: {
    background: style.page_background,
    text: style.page_text_color,
    button: style.button_background,
    radius: style.button_shape,
    font: style.page_font_family,
  },
  buttons: blocks.button_list.block_data.buttons
    .filter((b) => b.enabled)
    .map((b) => ({ title: b.title, url: cleanUrl(b.url) })),
  posts,
}

await mkdir(path.dirname(dataFile), { recursive: true })
await writeFile(dataFile, `${JSON.stringify(data, null, 2)}\n`)
console.log(`Synced ${posts.length} posts and ${data.buttons.length} buttons.`)
