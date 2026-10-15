import ArticleGrid from '../components/ArticleGrid.jsx'
import FadeImage from '../components/FadeImage.jsx'
import Feed from '../components/Feed.jsx'
import Newsletter from '../components/Newsletter.jsx'
import feed from '../data/looksteal.json'
import journal from '../data/journal.json'
import { ABOUT, EMAIL, REVIEWS_URL, SOCIALS } from '../data/site.js'
import { href } from '../lib/router.js'

const heroImages = feed.posts.slice(0, 3)

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">K-pop Fashion Source</p>
          <h1 className="hero__title">Steal the look your favorite idol is wearing.</h1>
          <p className="hero__text">
            We track down the exact pieces K-pop girl groups wear on and off stage, and link you straight to the shop.
          </p>
          <div className="hero__actions">
            <a className="btn btn--solid" href={href('/shop')}>Shop the looks</a>
            <a className="btn btn--outline" href={href('/contact')}>Find my outfit</a>
          </div>
          <a className="hero__reviews" href={REVIEWS_URL} target="_blank" rel="noreferrer">
            Read our customer reviews on Trustpilot
          </a>
        </div>
        <div className="hero__collage" aria-hidden="true">
          {heroImages.map((post) => (
            <FadeImage key={post.id} src={post.image} alt="" width="960" height="1200" />
          ))}
        </div>
      </section>

      <section className="offers" aria-label="What we offer">
        {ABOUT.offers.map((offer, i) => (
          <div key={offer.title} className="offer">
            <span className="offer__num">0{i + 1}</span>
            <h2 className="offer__title">{offer.title}</h2>
            <p>{offer.text}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">Fresh from Instagram</p>
            <h2 className="section__title">Shop the Feed</h2>
          </div>
          <a className="link-arrow" href={href('/shop')}>View all looks</a>
        </div>
        <Feed limit={8} />
      </section>

      <section className="finder">
        <div className="finder__inner">
          <p className="eyebrow">Personalized Outfit Finder</p>
          <h2 className="finder__title">Seen a look you can’t stop thinking about?</h2>
          <p>Send us your celeb outfit inspiration, and our experts will find the exact clothing pieces for you.</p>
          <a className="btn btn--light" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Outfit Finder request')}`}>
            Send us your inspo
          </a>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">Style stories</p>
            <h2 className="section__title">From the Journal</h2>
          </div>
          <a className="link-arrow" href={href('/journal')}>All articles</a>
        </div>
        <ArticleGrid articles={journal.articles.slice(0, 3)} />
      </section>

      <section className="follow-band">
        <p className="eyebrow">@look.steal.inc</p>
        <h2 className="section__title">Follow Along</h2>
        <ul className="follow-band__list">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
            </li>
          ))}
        </ul>
      </section>

      <Newsletter className="newsletter--band" />
    </>
  )
}
