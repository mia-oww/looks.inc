import PageHeader from '../components/PageHeader.jsx'
import legal from '../data/legal.json'
import { href } from '../lib/router.js'

const DOCS = [
  { slug: 'privacy-policy', blurb: 'How we collect, use, and safeguard your personal information.' },
  { slug: 'disclaimer', blurb: 'Our liability, external links, and affiliate relationships.' },
]

function Document({ doc }) {
  return (
    <article className="legal-doc">
      {doc.blocks.map((block, i) => {
        if (block.type === 'heading') return <h2 key={i}>{block.text}</h2>
        if (block.type === 'list') {
          return <ul key={i}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
        }
        return <p key={i}>{block.text}</p>
      })}
    </article>
  )
}

export default function LegalPage({ slug }) {
  const doc = slug && legal[slug]

  if (doc) {
    return (
      <div className="container container--narrow">
        <a className="back-link" href={href('/legal')}>← Legal</a>
        <PageHeader eyebrow="Legal" title={doc.title} />
        <Document doc={doc} />
      </div>
    )
  }

  return (
    <div className="container container--narrow">
      <PageHeader eyebrow="Legal" title="Legal">
        <p>
          Find Look Steal Inc.’s Privacy Policy and Disclaimer below for detailed information regarding your rights,
          obligations, and data privacy when using our platform.
        </p>
      </PageHeader>
      <div className="link-cards link-cards--two">
        {DOCS.map(({ slug: docSlug, blurb }) => (
          <a key={docSlug} className="card link-card" href={href(`/legal/${docSlug}`)}>
            <span className="link-card__title">{legal[docSlug].title}</span>
            <span>{blurb}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
