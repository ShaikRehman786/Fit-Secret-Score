import { useState, useEffect, useRef } from 'react'

export function useLazyImage(options = {}) {
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.dataset.src
          if (src) {
            img.src = src
            img.onload = () => setLoaded(true)
            img.onerror = () => setError(true)
          }
          observer.unobserve(img)
        }
      },
      { rootMargin: options.rootMargin || '200px', threshold: options.threshold || 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.rootMargin, options.threshold])

  return { imgRef, loaded, error }
}
