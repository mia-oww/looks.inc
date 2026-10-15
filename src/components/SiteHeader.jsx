import { useEffect, useState } from 'react'
import { NAV } from '../data/site.js'
import { href } from '../lib/router.js'
import Newsletter from './Newsletter.jsx'

const SHOP_NAV = [
  { label: 'Shop', path: '/shop' },
  { label: 'Journal', path: '/journal' },
]

export function Logo() {
  return <img className="logo" src="/brand/logo.png" alt="Look Steal" width="1999" height="241" />
}

export default function SiteHeader({ path }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastPath, setLastPath] = useState(path)

  // Close the menu whenever the route changes.
  if (path !== lastPath) {
    setLastPath(path)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const isActive = (itemPath) => path === itemPath || path.startsWith(`${itemPath}/`)

  return (
    <>
      <div className="announce">
        <span className="announce__lead">Your #1 source for K-pop fashion · </span><a href={href('/shop')}>Shop the latest idol looks</a>
      </div>

      <header className="site-header">
        <div className="site-header__inner">
          <a className="site-header__logo" href={href('/')} aria-label="Look Steal home">
            <Logo />
          </a>

          <nav className="site-nav" aria-label="Main">
            {[...SHOP_NAV, ...NAV].map((item) => (
              <a
                key={item.path}
                href={href(item.path)}
                className={isActive(item.path) ? 'is-active' : undefined}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mobile-menu__top">
            <a href={href('/')} aria-label="Look Steal home" onClick={() => setMenuOpen(false)}>
              <Logo />
            </a>
            <button type="button" className="mobile-menu__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
            </button>
          </div>

          <nav className="mobile-menu__nav" aria-label="Main">
            {[...SHOP_NAV, ...NAV].map((item) => (
              <a
                key={item.path}
                href={href(item.path)}
                aria-current={isActive(item.path) ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Newsletter />
        </div>
      )}
    </>
  )
}
