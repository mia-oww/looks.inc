import PageHeader from '../components/PageHeader.jsx'
import { EEO, EMAIL, JOBS } from '../data/site.js'

function List({ title, items }) {
  return (
    <>
      <h3 className="job__subhead">{title}</h3>
      <ul className="job__list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </>
  )
}

export default function CareersPage() {
  return (
    <div className="container container--narrow">
      <PageHeader eyebrow="Careers" title="Work with us">
        <p>Available roles at Look Steal Inc.</p>
      </PageHeader>

      {JOBS.map((job) => (
        <details key={job.id} className="job" open={JOBS.length === 1}>
          <summary className="job__summary">
            <span className="job__title">{job.title}</span>
            <span className="job__meta">{job.location} · {job.type}</span>
          </summary>
          <div className="job__body">
            <p className="job__lead">{job.summary}</p>
            <p>{job.description}</p>
            <List title="Role duties" items={job.duties} />
            <List title="Other important info" items={job.notes} />
            <List title="Why you should apply" items={job.perks} />
            <h3 className="job__subhead">How to apply</h3>
            <p>{job.apply}</p>
            <a
              className="btn btn--solid"
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
            >
              Apply by email
            </a>
          </div>
        </details>
      ))}

      <p className="fine-print">{EEO}</p>
    </div>
  )
}
