import { firstLine, groupOf, shopCount } from '../lib/posts.js'
import FadeImage from './FadeImage.jsx'

export default function PostGrid({ posts, onOpen }) {
  return (
    <ul className="grid">
      {posts.map((post, i) => {
        const count = shopCount(post)
        const group = groupOf(post)
        return (
          <li key={post.id} style={{ '--n': i }}>
            <button type="button" className="tile" onClick={() => onOpen(i)}>
              <FadeImage src={post.image} alt={firstLine(post.caption)} loading="lazy" width="960" height="1200" />
              {group && <span className="tile__group">{group}</span>}
              {count > 0 && (
                <span className="tile__badge">
                  {count === 1 ? 'Shop' : `Shop ${count} items`}
                </span>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
