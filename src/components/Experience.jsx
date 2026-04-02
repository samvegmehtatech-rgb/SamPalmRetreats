const experiences = [
  {
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=85',
    title: 'Private Dining on the Beach',
    desc: 'Your Michelin-trained chef prepares a multi-course feast as the sun melts into the Arabian Gulf. Candlelit tables on your private beach, the gentle tide as your backdrop.',
    tag: 'Culinary',
  },
  {
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=85',
    title: 'Yacht & Gulf Adventure',
    desc: 'Set sail on your private 50ft yacht and explore the Dubai coastline, discover secluded coves, snorkel vibrant reefs, or watch the city skyline from the open water.',
    tag: 'Adventure',
  },
  {
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&q=85',
    title: 'In-Villa Spa Rituals',
    desc: 'Our resident therapists bring world-class spa treatments directly to your villa. From hammam rituals to couples massages, restoration is always at hand.',
    tag: 'Wellness',
  },
]

import FadeIn from './FadeIn'

export default function Experience() {
  return (
    <section id="experience" className="bg-navy-800 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">The Experience</span>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight">
              Crafted Moments,<br />
              <span className="gold-text italic">Lasting Memories</span>
            </h2>
            <p className="text-white/50 max-w-xs text-sm font-light leading-relaxed">
              Beyond accommodation — curated experiences that define the Sam Palm Retreats signature.
            </p>
          </div>
        </FadeIn>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <FadeIn key={i} delay={i * 150}>
            <div
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={exp.img}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-gold-400 bg-gold-400/10 border border-gold-400/30 rounded-full px-3 py-1 mb-3">
                  {exp.tag}
                </span>
                <h3 className="font-serif text-xl text-white font-semibold mb-2 leading-snug">{exp.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                  {exp.desc}
                </p>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>

        {/* Pull quote */}
        <FadeIn delay={100}>
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="font-serif text-2xl md:text-3xl text-white/80 italic leading-relaxed">
            "We don't just host guests — we curate the most unforgettable chapter of their lives."
          </p>
          <div className="w-12 h-px bg-gold-400/50 mx-auto mt-6" />
          <p className="text-gold-400 text-xs tracking-widest uppercase mt-4">Sam Palm Retreats Philosophy</p>
        </div>
        </FadeIn>
      </div>
    </section>
  )
}
