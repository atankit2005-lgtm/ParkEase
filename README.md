# ParkEase — Smart Parking Reservation System

**Slot In, Stress Out.**

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── assets/          # images, icons
├── components/
│   ├── common/      # Loader, ProtectedRoute
│   ├── layout/       # Navbar, Footer
│   ├── home/         # Hero, SearchCard, Features, etc.
│   └── ui/           # Button, Input, Card, SectionTitle
├── pages/            # Route-level pages
├── context/           # AuthContext (mock auth for now)
├── routes/            # AppRoutes.jsx — all routing
├── data/              # dummyData.js — mock data until backend is ready
├── hooks/              # (for custom hooks as needed)
├── services/           # (for API service files — Axios calls go here)
└── utils/               # (for helper functions)
```

## Pages Included
- Landing / Home (Hero, Stats, Features, How It Works, Popular Parking, Testimonials, FAQ, CTA)
- Login / Signup (mock auth — wire to real backend in `context/AuthContext.jsx`)
- Browse Parking (search, filter, sort)
- Parking Details (slot selection)
- Booking (confirmation flow)
- My Bookings (view/cancel)
- Profile
- About / Contact
- Admin Dashboard (Overview, Parking Lots, Bookings)
- 404 Not Found

## Connecting to the Backend

All dummy data lives in `src/data/dummyData.js`. Once the backend team's API is
ready:

1. Create service files in `src/services/` (e.g. `authService.js`, `bookingService.js`) using Axios.
2. Replace the dummy data imports in each page with calls to those services.
3. Replace the mock `login()` calls in `Login.jsx` / `Signup.jsx` with real API calls that store the JWT.
4. Wire `AuthContext.jsx` to read/persist the token (e.g. via an httpOnly cookie or memory — avoid localStorage for tokens in production).

## Design System
- Primary: `#2563EB` · Success: `#10B981` · Background: `#F8FAFC`
- Font: Inter
- Radius: rounded-xl (buttons/inputs), rounded-2xl (cards)
- Shadows: soft only, no heavy drop shadows
