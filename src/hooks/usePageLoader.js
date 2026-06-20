import { useState, useEffect } from 'react'

export function usePageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loader = document.getElementById('page-loader')
    const interval = window.__loaderInterval

    const done = () => {
      if (interval) clearInterval(interval)
      if (loader) {
        const bar = loader.querySelector('.loader-bar')
        if (bar) bar.style.width = '100%'
      }
      setTimeout(() => {
        if (loader) loader.style.opacity = '0'
        setTimeout(() => {
          if (loader) loader.style.display = 'none'
          setLoading(false)
        }, 400)
      }, 400)
    }

    if (document.readyState === 'complete') {
      done()
    } else {
      window.addEventListener('load', done)
      return () => window.removeEventListener('load', done)
    }
  }, [])

  return loading
}
