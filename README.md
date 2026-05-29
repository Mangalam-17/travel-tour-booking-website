# WanderLust — Travel & Tour Booking Website

A production-quality travel booking platform built with React.js, featuring a modern UI, full responsiveness, animations, and a complete booking flow.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + Vite | Core framework & build tool |
| React Router DOM | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Page & component animations |
| Swiper.js | Hero carousel & image gallery |
| React Icons | Icon library |

---

## Features

- **Home Page** — Hero carousel, search bar, featured destinations, popular tours, CTA, testimonials
- **Destinations Page** — Full tour listing with live search, filters (type, price, rating), sorting
- **Tour Details Page** — Image gallery with thumbnails, itinerary accordion, highlights, facilities, reviews
- **Booking Page** — Complete form with validation, live total calculation, success confirmation
- **Wishlist** — Heart icon on every card, persisted to `localStorage`
- **Skeleton Loaders** — Shown while content loads
- **Scroll To Top** — Floating button appears after scrolling 400px
- **Scroll Restoration** — Scrolls to top on every route change
- **Fully Responsive** — Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Glassmorphism** — Used in hero stats bar and mobile nav
- **15 Tour Packages** — Covering Adventure, Luxury, Family, Honeymoon, Beach, Wildlife

---

## Project Structure

```
src/
├── components/
│   ├── Navbar/          # Responsive navbar with scroll effect
│   ├── Footer/          # Links, contact, social, newsletter
│   ├── Hero/            # Full-screen Swiper carousel
│   ├── SearchBar/       # Quick search with popular tags
│   ├── TourCard/        # Reusable card + skeleton loader
│   ├── Filters/         # Sidebar filters component
│   ├── Testimonials/    # Customer reviews grid
│   ├── BookingForm/     # Validated booking form
│   ├── WishlistButton/  # Heart toggle button
│   └── ScrollToTop/     # Scroll restoration + FAB
├── pages/
│   ├── Home/            # Landing page
│   ├── Destinations/    # Tour listing with filters
│   ├── TourDetails/     # Full tour detail view
│   └── Booking/         # Booking form page
├── data/
│   └── tours.js         # 15 mock tour packages
├── hooks/
│   └── useWishlist.js   # localStorage wishlist hook
├── utils/
│   └── helpers.js       # formatPrice, filterTours, sortTours
└── App.jsx              # Router setup
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone or navigate to the project
cd travel-booking

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Pages & Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/destinations` | All Tours (with filters) |
| `/destinations?search=Bali` | Pre-filtered search |
| `/tour/:id` | Tour Detail |
| `/booking/:id` | Booking Form |

---

## Mock Data

All 15 tours are in `src/data/tours.js`. Each tour includes:

- `id`, `title`, `destination`, `country`
- `images[]` — 4 Unsplash images per tour
- `description`, `price`, `rating`, `duration`, `tourType`
- `highlights[]`, `facilities[]`
- `itinerary[]` — day-by-day breakdown
- `reviews[]` — with avatar, rating, comment

---

## License

MIT — free to use for portfolio and educational purposes.
