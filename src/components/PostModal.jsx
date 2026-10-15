import { useEffect, useRef, useState } from 'react'
import { shopLinks, splitCaption } from '../lib/posts.js'

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function PostModal({ post, instagram, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPrev, onNext])

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      // Clicking the backdrop lands on the dialog element itself.
      onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
    >
      <PostDetail
        key={post.id}
        post={post}
        instagram={instagram}
        onClose={() => dialogRef.current.close()}
        onPrev={onPrev}
        onNext={onNext}
      />
    </dialog>
  )
}

// Keyed by post so hover state and scroll position reset between posts.
function PostDetail({ post, instagram, onClose, onPrev, onNext }) {
  const [active, setActive] = useState(null)
  const links = shopLinks(post)
  const { text, tags } = splitCaption(post.caption)

  return (
    <div className="modal__body">
      <figure className="modal__media">
        <img src={post.image} alt="" width="960" height="1200" />
        {post.tags.map((tag, i) => (
          <a
            key={tag.url}
            className={`hotspot${active === i ? ' is-active' : ''}`}
            style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
            href={tag.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Shop ${tag.title}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            {i + 1}
          </a>
        ))}
      </figure>

      <div className="modal__info">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {links.length > 0 && (
          <section>
            <h2 className="modal__heading">Shop the look</h2>
            <ol className="shop-list">
              {links.map((link, i) => (
                <li key={link.url}>
                  <a
                    className={`shop-link${active === i ? ' is-active' : ''}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  >
                    {post.tags.length > 0 && <span className="shop-link__num">{i + 1}</span>}
                    <span className="shop-link__title">{link.title}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        <p className="modal__caption">{text}</p>
        {tags.length > 0 && <p className="modal__tags">{tags.join(' ')}</p>}

        <footer className="modal__footer">
          <time dateTime={post.postedAt}>{dateFormat.format(new Date(post.postedAt))}</time>
          <a href={instagram} target="_blank" rel="noreferrer">View on Instagram</a>
        </footer>

        <div className="modal__nav">
          <button type="button" onClick={onPrev} disabled={!onPrev}>← Prev</button>
          <button type="button" onClick={onNext} disabled={!onNext}>Next →</button>
        </div>
      </div>
    </div>
  )
}
