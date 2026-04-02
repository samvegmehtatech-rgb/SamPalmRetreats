import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=85',
    alt: 'Infinity pool overlooking gulf',
    label: 'Infinity Pool',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=700&q=85',
    alt: 'Master bedroom suite',
    label: 'Master Suite',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=85',
    alt: 'Luxury bathroom',
    label: 'Spa Bathroom',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=700&q=85',
    alt: 'Ocean view terrace',
    label: 'Rooftop Terrace',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=85',
    alt: 'Living room',
    label: 'Grand Living Room',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=85',
    alt: 'Beach access',
    label: 'Private Beach',
    span: '',
  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" className="bg-navy-800 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-12 bg-gold-400/60" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Gallery</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight">
            Every Frame,<br />
            <span className="gold-text italic">a Masterpiece</span>
          </h2>
          <p className="text-white/50 max-w-xs text-sm font-light leading-relaxed">
            Curated visuals of each space — designed to inspire before you even arrive.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span}`}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <ZoomIn className="text-white" size={28} />
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-gold-400 text-sm font-medium tracking-wide">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white bg-white/10 rounded-full p-2 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={22} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-gold-400 text-center mt-4 text-sm tracking-wider uppercase font-medium">
              {lightbox.label}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
