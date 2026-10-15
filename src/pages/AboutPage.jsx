import PageHeader from '../components/PageHeader.jsx'
import { ABOUT } from '../data/site.js'
import { href } from '../lib/router.js'

export default function AboutPage() {
  return (
    <div className="container container--narrow">
      <PageHeader eyebrow="About Us" title="Your #1 source for K-pop fashion">
        <p>{ABOUT.intro}</p>
      </PageHeader>

      <section className="prose-section">
        <h2 className="section__title">What We Offer</h2>
        <div className="offers offers--stacked">
          {ABOUT.offers.map((offer, i) => (
            <div key={offer.title} className="offer">
              <span className="offer__num">0{i + 1}</span>
              <h3 className="offer__title">{offer.title}</h3>
              <p>{offer.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="prose-section">
        <h2 className="section__title">Meet the Team</h2>
        <ul className="team">
          {ABOUT.team.map((person) => (
            <li key={person.email} className="card">
              <p className="team__name">{person.name}</p>
              <p className="eyebrow">{person.role}</p>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </li>
          ))}
        </ul>
        <p>
          Want to join us? <a href={href('/careers')}>See open roles</a>.
        </p>
      </section>
    </div>
  )
}
