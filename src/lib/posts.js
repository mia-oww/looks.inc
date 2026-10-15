// Groups the feed can be filtered by, spelled as they appear in captions.
const GROUPS = [
  'aespa', 'BABYMONSTER', 'BLACKPINK', 'CLASSy', 'Hearts2Hearts', 'ILLIT', 'ITZY', 'IVE',
  'izna', 'KiiiKiii', 'LE SSERAFIM', 'NewJeans', 'NMIXX', 'Red Velvet', 'TWICE',
]

export function groupOf(post) {
  return GROUPS.find((group) => new RegExp(`(^|[^\\w])${group}([^\\w]|$)`).test(post.caption)) ?? null
}

// Groups present in the posts, most posts first.
export function groupsIn(posts) {
  const counts = new Map()
  for (const post of posts) {
    const group = groupOf(post)
    if (group) counts.set(group, (counts.get(group) ?? 0) + 1)
  }
  return [...counts].sort((a, b) => b[1] - a[1]).map(([group]) => group)
}

// A post is shoppable through either a single link or tagged items on the image.
export function shopLinks(post) {
  if (post.tags.length) return post.tags
  return post.link ? [{ title: 'Shop this look', url: post.link }] : []
}

export function shopCount(post) {
  return shopLinks(post).length
}

export function firstLine(caption) {
  return caption.split('\n')[0].trim()
}

// Splits a caption into the text and its trailing hashtags.
export function splitCaption(caption) {
  const tags = caption.match(/#[\p{L}\p{N}_]+/gu) ?? []
  const text = caption.replace(/#[\p{L}\p{N}_]+/gu, '').trim()
  return { text, tags }
}
