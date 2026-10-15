import PageHeader from '../components/PageHeader.jsx'
import { SOCIALS } from '../data/site.js'

export default function FollowPage() {
  return (
    <div className="container container--narrow">
      <PageHeader eyebrow="Follow" title="Follow us">
        <p>To keep up to date on the latest from Look Steal Inc, follow our social media accounts.</p>
      </PageHeader>

      <ul className="socials">
        {SOCIALS.map((s) => (
          <li key={s.name}>
            <a className="social" href={s.url} target="_blank" rel="noreferrer">
              <span className="social__name">{s.name}</span>
              <span className="social__handle">{s.handle}</span>
              <span className="social__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
