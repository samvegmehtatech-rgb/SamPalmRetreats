import { useState } from 'react'

/**
 * Lazy-loaded image with gold shimmer placeholder.
 * Drop-in replacement for <img> — accepts same props.
 */
export default function LazyImage({ src, alt, className = '', ...props }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-navy-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/5 to-transparent animate-shimmer-slide" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  )
}
