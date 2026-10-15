import { useEffect, useSyncExternalStore } from 'react'

// Hash-based routing (#/about) so the site works on any static host
// without rewrite rules.

function subscribe(callback) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function getPath() {
  const path = window.location.hash.replace(/^#/, '')
  return path.startsWith('/') ? path : '/'
}

export function href(path) {
  return `#${path}`
}

export function useRoute() {
  const path = useSyncExternalStore(subscribe, getPath)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  return path
}
