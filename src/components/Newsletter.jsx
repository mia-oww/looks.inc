import { useId, useState } from 'react'
import { subscribe } from '../lib/newsletter.js'

const MESSAGES = {
  subscribed: 'You’re on the list! Watch your inbox for the latest looks.',
  mailto: 'Almost there! Send the email that just opened to finish signing up.',
}

export default function Newsletter({ className = '' }) {
  const id = useId()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setStatus('sending')
    setError(null)
    try {
      setStatus(await subscribe({ name: form.get('name').trim(), email: form.get('email').trim() }))
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <section className={`newsletter ${className}`} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="newsletter__title">Join Our Newsletter</h2>
      <p className="newsletter__text">Enter your email and we'll keep you posted with news and updates!</p>

      {MESSAGES[status] ? (
        <p className="newsletter__done" role="status">{MESSAGES[status]}</p>
      ) : (
        <form className="newsletter__form" onSubmit={onSubmit}>
          <label className="visually-hidden" htmlFor={`${id}-name`}>Your name</label>
          <input id={`${id}-name`} name="name" type="text" placeholder="Your Name" autoComplete="name" required />
          <label className="visually-hidden" htmlFor={`${id}-email`}>Your e-mail</label>
          <input id={`${id}-email`} name="email" type="email" placeholder="Your E-mail" autoComplete="email" required />
          <button type="submit" className="btn btn--solid" disabled={status === 'sending'}>
            {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {error && <p className="newsletter__error" role="alert">{error}</p>}
        </form>
      )}
    </section>
  )
}
