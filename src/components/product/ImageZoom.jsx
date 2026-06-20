import { useState, useRef } from 'react'
import LazyImage from '../ui/LazyImage'

export default function ImageZoom({ src, alt }) {
  const [zoomed, setZoomed] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const ref = useRef(null)

  const handleMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-gray-50 cursor-crosshair h-full min-h-[300px] sm:min-h-[400px]"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMove}
    >
      <LazyImage
        src={src}
        alt={alt}
        wrapperClass="w-full h-full"
        className="w-full h-full object-cover"
        style={zoomed ? {
          transform: 'scale(2)',
          transformOrigin: `${pos.x}% ${pos.y}%`,
          transition: 'transform 0.05s ease-out',
        } : {}}
      />
    </div>
  )
}
