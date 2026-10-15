import { useEffect, useState } from 'react'

// Appears once the visitor has scrolled a full screen down the page.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  function scrollToTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={scrollToTop}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  )
}
