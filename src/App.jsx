import { useEffect, useState } from 'react'
import BackToTop from './components/BackToTop.jsx'
import PageHeader from './components/PageHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import { href, useRoute } from './lib/router.js'
import AboutPage from './pages/AboutPage.jsx'
import CareersPage from './pages/CareersPage.jsx'
import CompanyPage from './pages/CompanyPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FollowPage from './pages/FollowPage.jsx'
import HomePage from './pages/HomePage.jsx'
import JournalPage from './pages/JournalPage.jsx'
import LegalPage from './pages/LegalPage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import './App.css'

const ROUTES = {
  '/': HomePage,
  '/shop': ShopPage,
  '/journal': JournalPage,
  '/about': AboutPage,
  '/contact': ContactPage,
  '/follow': FollowPage,
  '/company': CompanyPage,
  '/careers': CareersPage,
}

function NotFound() {
  return (
    <div className="container container--narrow">
      <PageHeader eyebrow="404" title="Page not found">
        <p>
          That page doesn’t exist. <a href={href('/')}>Head back home</a>.
        </p>
      </PageHeader>
    </div>
  )
}

function renderRoute(path) {
  if (path === '/legal' || path.startsWith('/legal/')) {
    return <LegalPage slug={path.split('/')[2]} />
  }
  const Page = ROUTES[path] ?? NotFound
  return <Page />
}

// Tabs whose intro has played since the page loaded. A refresh resets it.
const seenPaths = new Set()

// Plays the intro animation (see index.css) the first time each tab is
// opened, and ends it once its animations finish.
function useRouteIntro(path) {
  const [intro, setIntro] = useState({ path, playing: true })

  // Decide during render, so a new tab never paints before its intro starts.
  if (intro.path !== path) {
    setIntro({ path, playing: !seenPaths.has(path) })
  }

  useEffect(() => {
    if (!intro.playing) return
    seenPaths.add(intro.path)
    let active = true
    Promise.allSettled(document.getAnimations().map((a) => a.finished)).then(() => {
      document.documentElement.classList.remove('intro')
      if (active) setIntro((s) => (s.path === intro.path ? { ...s, playing: false } : s))
    })
    return () => {
      active = false
    }
  }, [intro])

  return intro.path === path && intro.playing
}

function App() {
  const path = useRoute()
  const intro = useRouteIntro(path)

  return (
    <>
      <SiteHeader path={path} />
      <main className={`site-main${intro ? ' intro' : ''}`}>{renderRoute(path)}</main>
      <SiteFooter />
      <BackToTop />
    </>
  )
}

export default App
