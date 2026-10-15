import { useId } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { ABOUT, EMAIL } from '../data/site.js'

const TOPICS = ['General question', 'Outfit Finder request', 'Brand partnership', 'Press']

export default function ContactPage() {
  const id = useId()

  // No backend: compose the message in the visitor's email app.
  function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`${form.get('topic')} from ${form.get('name')}`)
    const body = encodeURIComponent(form.get('message'))
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div className="container container--narrow">
      <PageHeader eyebrow="Contact" title="Get in touch">
        <p>
          If you have any questions, feel free to reach out at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          Looking for a specific outfit? Send us the photo and we’ll find the exact pieces.
        </p>
      </PageHeader>

      <div className="contact">
        <form className="form" onSubmit={onSubmit}>
          <label htmlFor={`${id}-name`}>Name</label>
          <input id={`${id}-name`} name="name" autoComplete="name" required />

          <label htmlFor={`${id}-topic`}>Topic</label>
          <select id={`${id}-topic`} name="topic">
            {TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>

          <label htmlFor={`${id}-message`}>Message</label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows="6"
            placeholder="For outfit requests, include the idol, the event, and a link to the photo."
            required
          />

          <button type="submit" className="btn btn--solid">Write email</button>
          <p className="form__hint">This opens your email app with your message ready to send.</p>
        </form>

        <aside className="contact__aside">
          <div className="card">
            <p className="eyebrow">General</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          {ABOUT.team.map((person) => (
            <div key={person.email} className="card">
              <p className="eyebrow">{person.role}</p>
              <p>{person.name}</p>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </div>
          ))}
          <div className="card">
            <p className="eyebrow">Based in</p>
            <p>Toronto, Canada</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
