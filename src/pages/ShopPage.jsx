import Feed from '../components/Feed.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function ShopPage() {
  return (
    <div className="container">
      <PageHeader eyebrow="Shop the Feed" title="Idol looks, sourced">
        <p>Tap any look to see every tagged piece and shop it directly. Filter by group to find your bias.</p>
      </PageHeader>
      <Feed />
    </div>
  )
}
