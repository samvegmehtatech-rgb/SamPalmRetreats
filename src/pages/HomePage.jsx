import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import VillaOverview from '../components/VillaOverview'
import Gallery from '../components/Gallery'
import Amenities from '../components/Amenities'
import Experience from '../components/Experience'
import Location from '../components/Location'
import Testimonials from '../components/Testimonials'
import Booking from '../components/Booking'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function HomePage() {
  return (
    <div className="bg-navy-900 text-white font-sans">
      <Navbar />
      <Hero />
      <VillaOverview />
      <Gallery />
      <Amenities />
      <Experience />
      <Location />
      <Testimonials />
      <Booking />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
