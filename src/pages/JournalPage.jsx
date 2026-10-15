import ArticleGrid from '../components/ArticleGrid.jsx'
import PageHeader from '../components/PageHeader.jsx'
import journal from '../data/journal.json'

export default function JournalPage() {
  return (
    <div className="container">
      <PageHeader eyebrow="Journal" title="Style stories">
        <p>Deep dives into the outfits, brands and moments shaping K-pop fashion.</p>
      </PageHeader>
      <ArticleGrid articles={journal.articles} />
      <p className="center">
        <a className="btn btn--outline" href="https://looksteal.com/" target="_blank" rel="noreferrer">
          More on looksteal.com
        </a>
      </p>
    </div>
  )
}
