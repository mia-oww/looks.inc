import { useCallback, useState } from 'react'

// An <img> that fades in when it finishes loading. Images the browser already
// has (e.g. when switching back to a tab) show immediately, without the fade.
export default function FadeImage({ className = '', ...props }) {
  const [state, setState] = useState('loading')

  const ref = useCallback((img) => {
    if (img?.complete && img.naturalWidth > 0) setState('cached')
  }, [])

  return (
    <img
      {...props}
      ref={ref}
      className={`fade-img is-${state} ${className}`.trim()}
      onLoad={() => setState((s) => (s === 'cached' ? s : 'loaded'))}
      onError={() => setState('loaded')}
    />
  )
}
