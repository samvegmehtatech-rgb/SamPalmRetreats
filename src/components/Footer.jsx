import { Phone, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

// Simple inline SVG social icons (brand icons removed from lucide-react)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

const navLinks = {
  Villa: [
    { label: 'All Villas', to: '/villas' },
    { label: 'Gallery', to: '/#gallery' },
    { label: 'Amenities', to: '/#amenities' },
    { label: 'Our Experience', to: '/#experience' },
  ],
  Experience: [
    { label: 'Experiences & Add-ons', to: '/experiences' },
    { label: 'Pricing & Seasons', to: '/pricing' },
    { label: 'Guest Reviews', to: '/#reviews' },
    { label: 'Contact Us', to: '/contact' },
  ],
  Reservations: [
    { label: 'Book Now', to: '/villas' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Add-ons', to: '/experiences' },
    { label: 'Contact', to: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-gold-400/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 gold-gradient-bg rounded-full flex items-center justify-center shadow-lg shadow-gold-400/30">
                <span className="text-navy-900 font-serif font-bold text-xl">S</span>
              </div>
              <div>
                <p className="gold-text font-serif font-semibold text-2xl">Sam Palm Retreats</p>
                <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Palm Jumeirah · Dubai</p>
              </div>
            </div>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs mb-8">
              The most extraordinary private villa experience on Palm Jumeirah. Where Arabian luxury meets
              the boundless horizon of the Gulf.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              {[
                { icon: Phone, text: '+971 4 200 1234', href: 'tel:+97142001234' },
                { icon: Mail,  text: 'hello@sampalmretreats.com', href: 'mailto:hello@sampalmretreats.com' },
                { icon: MapPin,text: 'Frond K, Palm Jumeirah, Dubai UAE', href: '#' },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href} className="flex items-start gap-3 text-white/40 hover:text-gold-400 transition-colors text-sm group">
                  <Icon size={14} className="mt-0.5 flex-shrink-0 group-hover:text-gold-400 transition-colors text-gold-400/60" />
                  {text}
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              {[
                { icon: InstagramIcon, href: '#' },
                { icon: FacebookIcon,  href: '#' },
                { icon: YoutubeIcon,   href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 glass-light rounded-full flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-400/40 transition-all border border-white/10"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(navLinks).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-gold-400 text-xs tracking-[0.25em] uppercase font-medium mb-5">{category}</h4>
              <ul className="flex flex-col gap-3">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-white/40 hover:text-white/80 text-sm transition-colors font-light">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Sam Palm Retreats. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
