import FadeImage from './FadeImage.jsx'

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export default function ArticleGrid({ articles }) {
  return (
    <ul className="articles">
      {articles.map((article, i) => (
        <li key={article.id} style={{ '--n': i }}>
          <a className="article" href={article.url} target="_blank" rel="noreferrer">
            <div className="article__media">
              {article.image && <FadeImage src={article.image} alt="" loading="lazy" />}
            </div>
            <p className="eyebrow">
              {article.group && <span>{article.group}</span>}
              <time dateTime={article.date}>{dateFormat.format(new Date(article.date))}</time>
            </p>
            <h3 className="article__title">{article.title}</h3>
            <p className="article__excerpt">{article.excerpt}</p>
            <span className="link-arrow">Read article</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
