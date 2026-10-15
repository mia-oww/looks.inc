import PageHeader from '../components/PageHeader.jsx'
import { COMPANY } from '../data/site.js'
import { href } from '../lib/router.js'

export default function CompanyPage() {
  return (
    <div className="container container--narrow">
      <PageHeader eyebrow="Company" title="Look Steal Inc.">
        <p>
          Look Steal Inc. is a subsidiary of{' '}
          <a href={COMPANY.parent.url} target="_blank" rel="noreferrer">{COMPANY.parent.name}</a>.
        </p>
      </PageHeader>

      <dl className="facts">
        {COMPANY.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="eyebrow">{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <section className="prose-section">
        <h2 className="section__title">Our Mission</h2>
        <p>{COMPANY.summary}</p>
      </section>

      <div className="link-cards">
        <a className="card link-card" href={href('/about')}>
          <span className="eyebrow">About Us</span>
          <span>What we do and who we are</span>
        </a>
        <a className="card link-card" href={href('/careers')}>
          <span className="eyebrow">Careers</span>
          <span>Open roles at Look Steal</span>
        </a>
        <a className="card link-card" href={href('/legal')}>
          <span className="eyebrow">Legal</span>
          <span>Privacy policy and disclaimer</span>
        </a>
      </div>
    </div>
  )
}
