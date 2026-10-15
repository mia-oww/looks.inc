import { useState } from 'react'
import feed from '../data/looksteal.json'
import { groupOf, groupsIn } from '../lib/posts.js'
import PostGrid from './PostGrid.jsx'
import PostModal from './PostModal.jsx'

const { posts, profile } = feed
const groups = groupsIn(posts)

// The shoppable Instagram feed. `limit` shows a preview with no filters.
export default function Feed({ limit }) {
  const [group, setGroup] = useState(null)
  const [openIndex, setOpenIndex] = useState(null)

  const filtered = group ? posts.filter((p) => groupOf(p) === group) : posts
  const shown = limit ? filtered.slice(0, limit) : filtered
  const post = openIndex === null ? null : shown[openIndex]

  return (
    <>
      {!limit && (
        <div className="chips" role="group" aria-label="Filter by group">
          {[null, ...groups].map((g) => (
            <button
              key={g ?? 'all'}
              type="button"
              className="chip"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
            >
              {g ?? 'All looks'}
            </button>
          ))}
        </div>
      )}

      <PostGrid posts={shown} onOpen={setOpenIndex} />

      {post && (
        <PostModal
          post={post}
          instagram={profile.instagram}
          onClose={() => setOpenIndex(null)}
          onPrev={openIndex > 0 ? () => setOpenIndex(openIndex - 1) : null}
          onNext={openIndex < shown.length - 1 ? () => setOpenIndex(openIndex + 1) : null}
        />
      )}
    </>
  )
}
