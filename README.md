# Roamly — Indian Travel & Tour Booking Platform

A full-stack travel booking platform focused on Indian destinations. Built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend, featuring role-based authentication, an admin dashboard, real-time form validation, and a complete booking flow.

---

## Tech Stack

### Frontend (`client/`)
| Tool | Purpose |
|------|---------|
| React 19 + Vite | Core framework & build tool |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Swiper.js | Hero carousel & image gallery |
| React Icons | Icon library |

### Backend (`server/`)
| Tool | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| cors | Cross-origin resource sharing |
| dotenv | Environment variable management |
| nodemon | Dev auto-restart |

---

## Features

### Public
- **Home Page** — Hero carousel (Indian destinations), search bar, featured destinations, popular tours, CTA, testimonials
- **Destinations Page** — Full tour listing with live search, filters (type, price ₹, rating), server-side sorting
- **Tour Details Page** — Image gallery with thumbnails, itinerary accordion, highlights, facilities, reviews
- **About Page** — Team, mission, milestones timeline, core values
- **Contact Page** — Contact form (saved to DB), map, FAQ accordion
- **Wishlist** — Per-user heart toggle, persisted to `localStorage` keyed by user ID

### Authentication
- **Register / Login** — JWT-based auth with bcrypt password hashing
- **Role-based access** — `user` and `admin` roles
- **Protected routes** — Booking requires login; Admin dashboard requires admin role
- **Avatar dropdown** — Clean navbar with user menu (Admin Dashboard + Logout)
- **Dynamic form validation** — Real-time field validation with animated error messages, green/red border states, password strength meter on register

### Booking
- **Booking Form** — Validated form (name, email, 10-digit phone, future date, guests)
- **Saved to MongoDB** — Every booking stored in `bookings` collection
- **Live total** — Price × guests updates in real time

### Admin Dashboard (`/admin`)
- **Dashboard** — Stats cards (bookings, revenue ₹, messages, users, tours) + recent bookings table
- **Bookings** — Full table with inline status update (confirmed/pending/cancelled), search, pagination
- **Contacts** — Expandable message cards, filter by status (unread/read/replied), mark as read/replied
- **Users** — All registered users with role badges

---

## Project Structure

```
travel-booking/
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/            # Responsive navbar with avatar dropdown
│   │   │   ├── Footer/            # Links, contact info
│   │   │   ├── Hero/              # Full-screen Swiper carousel
│   │   │   ├── SearchBar/         # Quick search with popular Indian tags
│   │   │   ├── TourCard/          # Reusable card + skeleton loader
│   │   │   ├── Filters/           # Sidebar filters (₹ price range)
│   │   │   ├── Testimonials/      # Indian traveler reviews
│   │   │   ├── BookingForm/       # Dynamic validated booking form
│   │   │   ├── WishlistButton/    # Per-user heart toggle
│   │   │   ├── ScrollToTop/       # Scroll restoration + FAB
│   │   │   └── ProtectedRoute/    # ProtectedRoute + AdminRoute wrappers
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Global auth state (login/register/logout)
│   │   ├── hooks/
│   │   │   ├── useTours.js        # useTours(filters) + useTour(id) — fetch from API
│   │   │   └── useWishlist.js     # Per-user localStorage wishlist
│   │   ├── lib/
│   │   │   └── api.js             # apiFetch wrapper (base URL from env)
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Destinations/
│   │   │   ├── TourDetails/
│   │   │   ├── Booking/
│   │   │   ├── About/
│   │   │   ├── Contact/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   └── Admin/             # AdminLayout, Dashboard, Bookings, Contacts, Users
│   │   ├── utils/
│   │   │   └── helpers.js         # formatPrice (₹ INR), renderStars, truncateText
│   │   └── App.jsx                # Router setup with PublicLayout + AdminRoute
│   ├── .env                       # VITE_API_BASE_URL
│   └── .gitignore
│
├── server/                        # Express + MongoDB backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Mongoose connection
│   │   ├── models/
│   │   │   ├── Tour.js            # Tour schema (embedded itinerary + reviews)
│   │   │   ├── Booking.js         # Booking schema
│   │   │   ├── Contact.js         # Contact message schema
│   │   │   └── User.js            # User schema (bcrypt, role)
│   │   ├── controllers/
│   │   │   ├── tourController.js
│   │   │   ├── bookingController.js
│   │   │   ├── contactController.js
│   │   │   ├── authController.js
│   │   │   └── adminController.js
│   │   ├── routes/
│   │   │   ├── tourRoutes.js      # GET /api/tours, GET /api/tours/:id
│   │   │   ├── bookingRoutes.js   # POST /api/bookings (auth required)
│   │   │   ├── contactRoutes.js   # POST /api/contacts
│   │   │   ├── authRoutes.js      # POST /register, /login, GET /me
│   │   │   └── adminRoutes.js     # All /api/admin/* (admin only)
│   │   ├── middleware/
│   │   │   └── auth.js            # protect + adminOnly middleware
│   │   ├── seed.js                # Seeds 12 Indian tours into MongoDB
│   │   └── index.js               # Express app entry point
│   ├── .env                       # PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN
│   └── .gitignore
│
├── supabase_setup.sql             # Legacy — Supabase schema (no longer used)
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & install

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 2. Configure environment variables

**`server/.env`**
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/roamly
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
```

**`client/.env`**
```
VITE_API_BASE_URL=http://localhost:5001
```

### 3. Seed the database

```bash
cd server
npm run seed
```

Output: `🌱 Seeded 12 Indian tours successfully`

### 4. Start both servers

```bash
# Terminal 1 — backend (port 5001)
cd server
npm run dev

# Terminal 2 — frontend (port 5173)
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

### Tours
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/tours` | — | Get all tours (with filters & sort) |
| GET | `/api/tours/:id` | — | Get single tour |

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/auth/me` | JWT | Get current user |

### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/bookings` | JWT | Create booking |
| GET | `/api/bookings` | Admin | Get all bookings |

### Contacts
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contacts` | — | Submit contact message |
| GET | `/api/contacts` | Admin | Get all messages |

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/stats` | Admin | Dashboard stats |
| GET | `/api/admin/bookings` | Admin | All bookings (paginated) |
| PATCH | `/api/admin/bookings/:id` | Admin | Update booking status |
| GET | `/api/admin/contacts` | Admin | All contact messages |
| PATCH | `/api/admin/contacts/:id` | Admin | Update contact status |
| GET | `/api/admin/users` | Admin | All registered users |

---

## Pages & Routes

| Route | Page | Auth |
|-------|------|------|
| `/` | Home | — |
| `/destinations` | All Tours (filters) | — |
| `/tour/:id` | Tour Detail | — |
| `/booking/:id` | Booking Form | Login required |
| `/about` | About Roamly | — |
| `/contact` | Contact Form | — |
| `/login` | Login | — |
| `/register` | Register | — |
| `/admin` | Admin Dashboard | Admin only |
| `/admin/bookings` | Manage Bookings | Admin only |
| `/admin/contacts` | Manage Messages | Admin only |
| `/admin/users` | Manage Users | Admin only |

---

## Making a User Admin

After registering, update the role in MongoDB:

```js
// MongoDB shell or Compass
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

Then log out and log back in — the Admin Dashboard link will appear in the navbar dropdown.

---

## Tour Data

12 Indian tour packages covering:

| Tour | Type | Price |
|------|------|-------|
| Rajasthan Royal Heritage | Heritage | ₹24,999 |
| Kerala Backwaters Honeymoon | Honeymoon | ₹29,999 |
| Ladakh Bike Expedition | Adventure | ₹34,999 |
| Goa Beach & Culture | Beach | ₹14,999 |
| Varanasi Spiritual Journey | Spiritual | ₹12,999 |
| Andaman Island Escape | Beach | ₹27,999 |
| Himachal Hill Stations Tour | Adventure | ₹19,999 |
| Golden Triangle Classic | Heritage | ₹17,999 |
| Meghalaya & Northeast Explorer | Adventure | ₹22,999 |
| Ranthambore Wildlife Safari | Wildlife | ₹18,999 |
| Rishikesh Yoga & Adventure | Adventure | ₹11,999 |
| Coorg Coffee & Nature Retreat | Family | ₹15,999 |

---

## License

MIT — free to use for portfolio and educational purposes.
