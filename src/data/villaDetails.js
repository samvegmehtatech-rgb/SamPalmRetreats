// Extended data for each villa — gallery images, long description, amenities
const galleryImages = {
  livingRoom:  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
  masterBed:   'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
  dining:      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
  kitchen:     'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
  bathroom:    'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&q=80',
  spa:         'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
  pool1:       'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  pool2:       'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
  beach:       'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80',
  bedroom2:    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
  bedroom3:    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
  terrace:     'https://images.unsplash.com/photo-1594563703937-fdc640497dcd?w=1200&q=80',
  garden:      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80',
  exterior:    'https://images.unsplash.com/photo-1551882547-ff40c63fe2e2?w=1200&q=80',
  cinema:      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80',
  winecellar:  'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=1200&q=80',
}

const g = galleryImages

const villaDetails = {
  'al-nakheel': {
    images: [g.pool1, g.livingRoom, g.masterBed, g.beach, g.bathroom, g.dining],
    longDesc: `Villa Al Nakheel is the quintessential Palm Jumeirah beachfront escape — a sweeping contemporary masterpiece that places you directly on 25 metres of private white-sand beach with unobstructed views across the Arabian Gulf. Inside, soaring double-height ceilings, floor-to-ceiling glass, and a hand-selected palette of marble, timber, and burnished brass create an atmosphere of restrained opulence.

The six bedroom suites each command their own private terrace or balcony, while the ground-floor master opens directly onto the pool terrace. A dedicated chef's kitchen, formal dining for 14, and a show-kitchen island mean every culinary experience unfolds without compromise. Outside, the 18-metre infinity pool merges visually with the Gulf horizon at dusk — a view that has to be seen to be believed.`,
    amenities: {
      indoor: ['6 Ensuite Bedroom Suites', 'Chef\'s Kitchen & Show Island', 'Formal Dining for 14', 'Home Theatre Room', 'Gym & Fitness Studio', 'Smart Home System'],
      outdoor: ['18m Infinity Pool', '25m Private Beach', 'Pool Cabana & Sun Terrace', 'Outdoor Dining Pavilion', 'Fire Pit & Lounge', 'Landscaped Gardens'],
      services: ['24/7 Dedicated Butler', 'Private Chef (on request)', 'Daily Housekeeping', 'Airport Rolls-Royce Transfer', 'Beach & Pool Attendant', 'Concierge & Reservations'],
    },
  },
  'zafar': {
    images: [g.pool2, g.livingRoom, g.cinema, g.masterBed, g.terrace, g.dining],
    longDesc: `Villa Zafar is a landmark waterfront estate that commands the Palm's most coveted Frond B position — where the Dubai skyline, Atlantis, and open Gulf converge in a single panoramic sweep. The villa's crown jewel is its rooftop observatory: a glass-enclosed sky lounge where the entire Dubai coastline stretches before you, best experienced with a glass of vintage Champagne at sunset.

A private cinema seats 12 in custom leather recliners, the bespoke yacht dock accommodates vessels up to 30 metres, and the professional kitchen is designed for serious culinary performance. Seven master suites are each themed around a different dimension of Arabian luxury, from minimalist sand tones to rich jewel-toned silk.`,
    amenities: {
      indoor: ['7 Themed Master Suites', 'Rooftop Observatory Lounge', 'Cinema for 12', 'Professional Chef\'s Kitchen', 'Champagne Bar & Cellar', 'Home Automation System'],
      outdoor: ['20m Infinity Pool', 'Private Yacht Dock (30m)', '32m Beach Frontage', 'Rooftop Terrace & Jacuzzi', 'Outdoor Dining for 20', 'BBQ & Outdoor Kitchen'],
      services: ['24/7 Butler & House Manager', 'Yacht Captain (on request)', 'In-Villa Private Chef', 'Daily Housekeeping × 2', 'Airport Limousine Transfer', 'Personal Concierge'],
    },
  },
  'qamar': {
    images: [g.pool1, g.spa, g.masterBed, g.bathroom, g.livingRoom, g.beach],
    longDesc: `Villa Qamar is a study in contemporary minimalism elevated to an art form. Set on Frond G with a tranquil 20-metre beach frontage, this five-bedroom retreat is designed around stillness, natural light, and the healing quality of water. The heated mosaic infinity pool, finished in hand-cut turquoise glass, shimmers at the edge of the sea — a feature so photographed it has become an icon of Palm Jumeirah.

The interiors are deliberately calm: pale limestone floors, custom Japanese joinery, linen drapery, and a carefully curated art collection from Gulf-region artists. The full spa suite — with hammam, sauna, and treatment room — makes Qamar perfect for those seeking restoration as much as celebration.`,
    amenities: {
      indoor: ['5 Ensuite Suites', 'Spa Suite with Hammam & Sauna', 'Treatment Room', 'Open-Plan Living & Dining', 'Chef\'s Kitchen', 'Meditation Loft'],
      outdoor: ['Heated Mosaic Infinity Pool', '20m Private Beach', 'Poolside Cabana', 'Yoga Terrace', 'Tropical Garden & Water Feature', 'Outdoor Shower'],
      services: ['24/7 Butler', 'Spa Therapist (on request)', 'Private Chef (on request)', 'Daily Housekeeping', 'Airport Transfer', 'Wellness Concierge'],
    },
  },
  'rashid': {
    images: [g.exterior, g.livingRoom, g.dining, g.masterBed, g.pool2, g.beach],
    longDesc: `Villa Rashid is without question the most iconic private estate on Palm Jumeirah — a palatial residence of 1,350 m² that rivals the finest royal residences in the world. With eight master bedroom suites, a grand ballroom for 80 guests, a floodlit tennis court, and 45 metres of uninterrupted private beach, Rashid is designed for guests who accept nothing less than the absolute finest.

The entrance hall alone — with its 9-metre ceilinged atrium, hand-laid marble, and cascading chandelier — announces the scale of what awaits. Full household staff including a house manager, head butler, two chefs, housekeeping team, and security ensure every aspect of your stay unfolds without friction. Rashid is available for intimate family retreats, grand celebrations, and corporate summits of equal distinction.`,
    amenities: {
      indoor: ['8 Master Bedroom Suites', 'Grand Ballroom (80 guests)', 'Formal Library & Study', 'Full Professional Kitchen', 'Indoor Pool & Spa', 'Private Cinema'],
      outdoor: ['25m Outdoor Pool', '45m Private Beach', 'Tennis Court (floodlit)', 'Beach Bar & Pavilion', 'Landscaped Formal Gardens', 'Outdoor Events Lawn'],
      services: ['House Manager & Head Butler', 'Two Private Chefs', 'Full Housekeeping Team', 'Dedicated Security', 'Airport Rolls-Royce (×2)', 'Events Coordination'],
    },
  },
  'amira': {
    images: [g.spa, g.garden, g.masterBed, g.bathroom, g.pool1, g.livingRoom],
    longDesc: `Villa Amira is the Peninsula's preeminent wellness sanctuary — a five-bedroom haven built around the principles of holistic restoration. At its heart lies a freestanding spa pavilion housing a full treatment room, cedar sauna, steam room, and cold plunge pool. Adjacent, a walled meditation garden with tiered water features and mature frangipani trees creates a space of absolute tranquility rarely found in a city of Dubai's energy.

The organic chef's kitchen — stocked each morning with produce from curated UAE farms — is the domain of an in-house nutritionist-chef who designs menus around your wellness goals. Yoga mats, meditation cushions, and sunrise sessions on the beach terrace are choreographed for those who know that true luxury is feeling extraordinary from the inside out.`,
    amenities: {
      indoor: ['5 Ensuite Wellness Suites', 'Full Spa Pavilion', 'Sauna, Steam & Cold Plunge', 'Organic Chef\'s Kitchen', 'Yoga & Movement Studio', 'Nutritionist Consultation Room'],
      outdoor: ['Heated Lap Pool', '22m Private Beach', 'Walled Meditation Garden', 'Sunrise Yoga Terrace', 'Tropical Gardens & Water Features', 'Outdoor Shower & Hot Tub'],
      services: ['Wellness Concierge', 'Nutritionist-Chef', 'Spa Therapists On-Site', 'Daily Housekeeping', 'Airport Transfer', '24/7 Butler'],
    },
  },
  'safa': {
    images: [g.pool2, g.exterior, g.livingRoom, g.dining, g.terrace, g.masterBed],
    longDesc: `Villa Safa is the most exclusive address in our entire portfolio — an ultra-premium 1,600 m² estate that redefines what is possible in private villa accommodation. With nine master suites, a private helipad, a lagoon-style pool of 35 metres, and a vantage point that frames the Burj Al Arab in perpetual golden silhouette, Safa exists in a category of its own.

The estate was conceived by a team of three internationally acclaimed designers who drew on influences from Bali, Morocco, and contemporary Dubai to create spaces that feel simultaneously exotic and effortlessly liveable. The beach club — with its private bar, DJ booth, and 55-metre beach frontage — rivals the finest venues in the city. A full team of 12 household staff operates around the clock to ensure every moment exceeds the last.`,
    amenities: {
      indoor: ['9 Ultra-Premium Master Suites', 'Private Helipad Access', 'Ballroom & Event Space', 'Underground Wine Vault', 'Cinema & Games Suite', 'Spa with 4 Treatment Rooms'],
      outdoor: ['35m Lagoon Pool', '55m Private Beach', 'Private Beach Club & Bar', 'Rooftop Infinity Terrace', 'Professional BBQ Kitchen', 'Floodlit Tennis & Padel Courts'],
      services: ['12-Person Household Staff', 'Private Helicopter (on request)', 'Executive Chef & Sommelier', 'Security Team', 'Airport Transfer (fleet)', 'Personal Lifestyle Manager'],
    },
  },
  'noor': {
    images: [g.garden, g.pool1, g.masterBed, g.livingRoom, g.beach, g.bathroom],
    longDesc: `Villa Noor is the jewel of Frond L — a lushly intimate four-bedroom garden villa where the boundary between tropical paradise and the Gulf of Arabia dissolves entirely. The extensive landscaping, designed by a renowned Bali-based garden architect, weaves mature palms, hibiscus, bougainvillea, and water lilies through paths of hand-laid sandstone to create a living garden that envelops the villa on every side.

At its centre, a ceramic mosaic pool mirrors the sky and the swaying palms above. An evening spent around the sunken fire pit under the stars, with the gentle sound of the sea beyond the garden wall, is the kind of experience that endures long after the return flight home. Noor is perfectly sized for couples, small families, and those who prefer intimacy over grandeur.`,
    amenities: {
      indoor: ['4 Garden-View Suites', 'Open-Plan Living Room', 'Fully Equipped Kitchen', 'Cosy Cinema Nook', 'Dressing Rooms', 'Outdoor Shower Suite'],
      outdoor: ['Mosaic Pool', '18m Private Beach', 'Sunken Fire Pit Terrace', 'Jacuzzi Under the Stars', 'Bali-Inspired Garden', 'Outdoor Hammock Lounge'],
      services: ['Personal Butler', 'Private Chef (on request)', 'Daily Housekeeping', 'Airport Transfer', 'Concierge', 'Beach Setup Service'],
    },
  },
  'khalid': {
    images: [g.winecellar, g.livingRoom, g.kitchen, g.masterBed, g.pool1, g.terrace],
    longDesc: `Villa Khalid is the definitive executive retreat on Palm Jumeirah — a seven-bedroom smart estate engineered for the modern principal who demands seamless performance from every system. The full KNX smart home platform controls lighting, climate, audio, security, and entertainment across all zones via a single tablet or voice command. A boardroom-grade meeting room seats 10 and is equipped with the latest AV conferencing technology.

The private wine cellar holds over 1,200 bottles curated by a Dubai-based Master Sommelier, available by the glass, the bottle, or as a guided tasting experience. A private jetty accommodates up to a 20-metre yacht for those preferring to arrive by sea. The kitchen — designed in collaboration with a two-Michelin-star chef — is both a functional workspace and an architectural showpiece of smoked steel and Italian marble.`,
    amenities: {
      indoor: ['7 Executive Suites', 'Smart Home (KNX System)', 'Boardroom (10 seats)', 'Curated Wine Cellar (1,200 bottles)', 'Chef\'s Design Kitchen', 'Private Gym & Sauna'],
      outdoor: ['22m Heated Pool', 'Private Yacht Jetty (20m)', '35m Beach Frontage', 'Rooftop Terrace Bar', 'Outdoor Dining & BBQ', 'Covered Parking (6 cars)'],
      services: ['House Manager & Butler', 'Sommelier On-Call', 'Private Chef', 'Chauffeur Fleet', 'Daily Housekeeping', 'IT & AV Support'],
    },
  },
  'mariam': {
    images: [g.pool1, g.masterBed, g.bathroom, g.livingRoom, g.dining, g.terrace],
    longDesc: `Villa Mariam was conceived for love — a west-facing Frond J residence where every room is positioned to capture the magical palette of Gulf sunsets that no camera can fully do justice. The living spaces cascade from inside to outside in a seamless flow: the main salon opens to a vine-draped terrace, which flows to the pool terrace, and then to the private beach where the sun descends into the sea each evening.

The four bedroom suites are dressed in silk, cashmere, and hand-embroidered linens, with the master suite featuring a freestanding rose-gold bathtub positioned to face the sunset. A champagne bar stocked with rare Vintage Dom Pérignon and Krug sits at the heart of the entertainment space. The in-house couples spa offers signature treatments designed exclusively for two.`,
    amenities: {
      indoor: ['4 Romantic Suites', 'Champagne Bar (Vintage Selection)', 'Couples Spa Treatment Room', 'Rose Gold Freestanding Bath (Master)', 'Living Room with Gulf Views', 'Bespoke Dressing Rooms'],
      outdoor: ['Heated Pool (Sunset-Facing)', '20m Private Beach', 'Vine-Draped Terrace', 'Outdoor Dining for 8', 'Flower Garden & Water Feature', 'Beach Cabana for Two'],
      services: ['Romantic Concierge', 'Couples Spa Therapists', 'Private Chef & Champagne Service', 'Daily Housekeeping', 'Airport Transfer', 'Honeymoon Setup'],
    },
  },
  'jasmine': {
    images: [g.pool2, g.garden, g.livingRoom, g.dining, g.masterBed, g.beach],
    longDesc: `Villa Jasmine is the most exclusive private address in our entire collection — a 1,850 m² tropical paradise that operates on the scale and standard of a boutique resort, yet with all the privacy of a personal home. Ten master bedroom suites each open to their own terrace or private garden, while the central resort-style pool meanders through lush tropical landscaping across 60 metres of beach frontage.

The private beach club — complete with a full bar, cabana beds, and live music on request — sets the stage for legendary evenings. A team of 15 household staff, including a personal concierge dedicated exclusively to your party, ensures that every desire is anticipated before it is expressed. Jasmine is the destination for those who require the world's finest, and know exactly what that means.`,
    amenities: {
      indoor: ['10 Luxury Master Suites', 'Grand Dining Room (24 seats)', 'Private Cinema & Event Space', 'Professional Catering Kitchen', 'Spa with 5 Treatment Rooms', 'Butler Pantry per Floor'],
      outdoor: ['Resort Pool (60m)', '60m Private Beach', 'Private Beach Club & Bar', 'Tropical Garden (5,000 m²)', 'Multiple Outdoor Dining Areas', 'Children\'s Pool & Play Area'],
      services: ['Personal Concierge (Dedicated)', '15 Household Staff', 'Executive & Pastry Chefs', 'Beach Club Manager', 'Airport Transfer (Fleet)', 'Security & Guest Services'],
    },
  },
  'hessa': {
    images: [g.terrace, g.livingRoom, g.masterBed, g.bathroom, g.kitchen, g.pool1],
    longDesc: `Villa Hessa is a testament to the power of clean, considered contemporary design — a four-bedroom villa on Frond M where a striking floating staircase, raw concrete, smoked glass, and precision joinery create interiors of arresting visual confidence. The rooftop terrace — one of the finest on the Palm — frames a 270° panorama of the Gulf, the Atlantis towers, and the Dubai Marina skyline.

Despite its architectural boldness, Hessa is an exceptionally liveable home: the open-plan kitchen and living space flows naturally to the pool terrace, the bedrooms are warm and deeply considered, and the direct beach access at the rear ensures the sea is always close. Hessa attracts design-forward guests who want contemporary sophistication without sacrificing the warmth of a true private home.`,
    amenities: {
      indoor: ['4 Design Suites', 'Floating Staircase Feature', 'Open-Plan Kitchen & Living', 'Cinema & Entertainment Room', 'Walk-In Wardrobes', 'Smart Lighting System'],
      outdoor: ['14m Pool', '16m Direct Beach Access', 'Panoramic Rooftop Terrace', 'Outdoor Dining Area', 'Sun Deck & Loungers', 'Covered Parking (2 cars)'],
      services: ['Butler On-Call', 'Private Chef (on request)', 'Daily Housekeeping', 'Airport Transfer', 'Concierge', 'Grocery Pre-Stock Service'],
    },
  },
  'fanar': {
    images: [g.exterior, g.livingRoom, g.pool2, g.dining, g.masterBed, g.bathroom],
    longDesc: `Villa Fanar is a love letter to classical Arabian architecture — the only villa on Palm Jumeirah built in the true tradition of Gulf palatial design, with hand-carved mashrabiya screens, pointed arched colonnades, intricate plasterwork ceilings, and an ornate central courtyard that recalls the great houses of old Dubai and Oman.

Six master suites are dressed in hand-woven silk from Iran, hand-knotted carpets from Tabriz, and solid rosewood furniture crafted by Emirati artisans. The rooftop pool, reached by a carved stone staircase, offers a meditative view of the palm fronds and the distant city skyline. Fanar offers the extremely rare combination of authentic heritage aesthetics with all the modern comforts a discerning guest could require.`,
    amenities: {
      indoor: ['6 Heritage-Styled Suites', 'Ornate Central Courtyard', 'Majlis Reception Room', 'Formal Dining (Arabian Style)', 'Library & Reading Room', 'Hand-carved Plasterwork Throughout'],
      outdoor: ['Rooftop Pool & Lounging Deck', '28m Private Beach', 'Arched Colonnade Terrace', 'Courtyard Fountain & Gardens', 'Traditional Outdoor Majlis', 'Shaded Dining Area'],
      services: ['Heritage Concierge', 'Traditional Emirati Chef', '24/7 Butler', 'Arabic Cultural Experiences', 'Airport Transfer', 'Daily Housekeeping'],
    },
  },
}

export default villaDetails
