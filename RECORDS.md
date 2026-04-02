# Sam Palm Retreats — Project Records

## Project Overview

**App Name:** Sam Palm Retreats
**Type:** Luxury Villa Booking Web App (React)
**Location:** Palm Jumeirah, Dubai, UAE
**Created:** April 1, 2026
**Author:** Samveg Mehta

---

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Framework   | React 18 + Vite               |
| Styling     | Tailwind CSS v3               |
| Icons       | Lucide React                  |
| Routing     | React Router DOM              |
| Fonts       | Playfair Display + Inter (Google Fonts) |
| Images      | Unsplash (high-res, free)     |

---

## App Structure

```
SamPalmRetreats/
├── index.html                  ← Entry HTML, Google Fonts, meta tags
├── tailwind.config.js          ← Custom colors (gold, navy), animations, fonts
├── RECORDS.md                  ← This file
└── src/
    ├── main.jsx                ← React root mount
    ├── App.jsx                 ← Page composition
    ├── index.css               ← Tailwind + custom utilities (gold-text, glass, etc.)
    └── components/
        ├── Navbar.jsx          ← Sticky glass navbar, mobile hamburger, CTA
        ├── Hero.jsx            ← Fullscreen hero, animated entrance, villa stats
        ├── VillaOverview.jsx   ← Villa specs, story, floating price card
        ├── Gallery.jsx         ← Masonry-style image grid + lightbox modal
        ├── Amenities.jsx       ← 12-amenity icon grid (pool, chef, spa, yacht...)
        ├── Experience.jsx      ← 3 curated experience cards + brand philosophy
        ├── Location.jsx        ← Dubai aerial image, distance cards
        ├── Testimonials.jsx    ← Interactive review carousel + ratings stats
        ├── Booking.jsx         ← Package selector + reservation form with success state
        └── Footer.jsx          ← Brand, contact, social links, nav columns
```

---

## Villa Details (Fictional — for the app)

| Detail          | Value                               |
|-----------------|-------------------------------------|
| Villa Name      | Villa Al Nakheel                    |
| Address         | Frond K, Palm Jumeirah, Dubai, UAE  |
| Bedrooms        | 6 Master Suites                     |
| Bathrooms       | 7 Luxury Bathrooms                  |
| Living Area     | 850 m²                              |
| Plot Size       | 1,200 m²                            |
| Private Beach   | 25m frontage                        |
| Max Guests      | 12                                  |
| Parking         | 4 spaces                            |
| Pool            | Infinity (saltwater, heated)        |
| Internet        | 1 Gbps fiber                        |
| Phone           | +971 4 200 1234                     |
| Email           | hello@sampalmretreats.com           |

---

## Booking Packages

| Package          | Price/Night  | Inclusions                                      |
|------------------|--------------|-------------------------------------------------|
| Standard Stay    | AED 18,500   | Villa + Butler + Chef Breakfast                 |
| Premium Escape   | AED 24,000   | Standard + Yacht Day + Spa for 2                |
| Ultimate Luxury  | AED 38,500   | Premium + Rolls-Royce + All Inclusive           |

**All packages include:**
- Airport Rolls-Royce transfer
- Welcome champagne & gifts
- Daily housekeeping
- 24/7 butler & concierge
- Private beach access

---

## Design System

### Colors
- **Gold:** `#C9A96E` → `#D4AF37` → `#B8860B` (gradient)
- **Navy Dark:** `#0A0E1A` (bg), `#0F1629` (sections), `#030712` (footer)
- **Text:** White at various opacities (`/80`, `/60`, `/40`, `/30`)

### Typography
- **Headings:** Playfair Display (serif) — italic for accents
- **Body:** Inter — light weight (300) for elegance

### Key Utility Classes (custom in index.css)
| Class          | Effect                                             |
|----------------|----------------------------------------------------|
| `gold-text`    | Gold gradient text (background-clip technique)     |
| `glass`        | Dark glass morphism card with gold border          |
| `glass-light`  | Lighter transparent card (white/6)                 |
| `gold-border`  | Subtle gold border (rgba gold 0.4)                 |
| `shimmer-text` | Animated shimmer gold text                         |
| `dark-overlay` | Bottom-heavy dark gradient for hero images         |

---

## Update Log

| Date        | Update                                         | By           |
|-------------|------------------------------------------------|--------------|
| 2026-04-01  | Initial build — all sections, full UI complete | Samveg Mehta |

---

## Pending / Next Steps

- [ ] Add React Router for multi-page (Villa detail page, Booking confirmation page)
- [ ] Connect booking form to a real backend (Node/Express or Firebase)
- [ ] Add scroll-triggered animations (Intersection Observer or Framer Motion)
- [ ] Implement date availability calendar (React-DatePicker or custom)
- [ ] Add WhatsApp CTA floating button
- [ ] SEO meta tags and Open Graph image
- [ ] Deploy to Vercel / Netlify

---

*Maintained by Samveg Mehta — Sam Palm Retreats Project*
