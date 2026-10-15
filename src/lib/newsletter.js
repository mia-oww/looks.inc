import { EMAIL } from '../data/site.js'

// Set VITE_NEWSLETTER_URL (e.g. a Mailchimp, Brevo or ConvertKit form
// endpoint that accepts JSON) to post sign-ups there. Without it, sign-ups
// fall back to a pre-filled email to the team inbox.
const ENDPOINT = import.meta.env.VITE_NEWSLETTER_URL

export async function subscribe({ name, email }) {
  if (!ENDPOINT) {
    const subject = encodeURIComponent('Newsletter sign-up')
    const body = encodeURIComponent(`Please add me to the Look Steal newsletter.\n\nName: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    return 'mailto'
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  })
  if (!res.ok) throw new Error(`Sign-up failed (${res.status})`)
  return 'subscribed'
}
