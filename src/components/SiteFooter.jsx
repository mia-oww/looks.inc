import { EMAIL, NAV, REVIEWS_URL, SOCIALS } from '../data/site.js'
import { href } from '../lib/router.js'
import { Logo } from './SiteHeader.jsx'

const year = new Date().getFullYear()

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <a href={href('/')} aria-label="Look Steal home"><Logo /></a>
          <p>Your #1 source for K-pop fashion. Find, and shop, the exact pieces your favorite idols wear.</p>
          <a className="site-footer__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>

        <nav className="site-footer__col" aria-label="Shop">
          <h2>Shop</h2>
          <a href={href('/shop')}>Shop the Feed</a>
          <a href={href('/journal')}>Journal</a>
          <a href={href('/contact')}>Outfit Finder</a>
          <a href={REVIEWS_URL} target="_blank" rel="noreferrer">Customer Reviews</a>
        </nav>

        <nav className="site-footer__col" aria-label="Company">
          <h2>Company</h2>
          {NAV.map((item) => (
            <a key={item.path} href={href(item.path)}>{item.label}</a>
          ))}
        </nav>

        <nav className="site-footer__col" aria-label="Social">
          <h2>Follow</h2>
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
          ))}
        </nav>
      </div>

      <div className="site-footer__legal">
        <p>
          Some links on this site are affiliate links. We may earn a commission at no extra cost to you.{' '}
          <a href={href('/legal/disclaimer')}>Disclaimer</a> · <a href={href('/legal/privacy-policy')}>Privacy Policy</a>
        </p>
        <p>© {year} Look Steal Inc., a subsidiary of Setting Mind Media.</p>
      </div>
    </footer>
  )
}
