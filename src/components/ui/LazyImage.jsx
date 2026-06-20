import { useLazyImage } from '../../hooks/useLazyImage'
import { FiImage } from 'react-icons/fi'

export default function LazyImage({ src, alt, className = '', wrapperClass = '' }) {
  const { imgRef, loaded, error } = useLazyImage()

  return (
    <div className={`relative overflow-hidden ${wrapperClass}`}>
      {!loaded && !error && <div className="absolute inset-0 skeleton" />}
      {error && (
        <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center gap-1.5">
          <FiImage className="text-gray-300 text-xl" />
          <span className="text-gray-400 text-[11px] font-medium">{alt?.slice(0, 28) || 'Unavailable'}</span>
        </div>
      )}
      <img
        ref={imgRef}
        data-src={src}
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      />
    </div>
  )
}
