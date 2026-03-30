# Upskiill — Session Handoff
> Last updated: 2026-03-30 01:45 WAT · Keep this file current at the end of every session.

---

## 🗺️ Project Overview
Full-stack learning platform. Monorepo at `c:\Users\HP\upskiill`.

| Layer | Tech | Hosted |
|---|---|---|
| Frontend | Next.js 16 (App Router, TypeScript) | Vercel |
| Backend | NestJS 11 (TypeScript) | Render (free tier) |
| Database | PostgreSQL via Supabase | Supabase |
| ORM | Prisma 5.22 | — |
| Auth | JWT (passport-jwt) + bcrypt | — |
| Repo | GitHub `upskiill201/upskiill` | — |

---

## ✅ What Is Done

### Infrastructure
- [x] Monorepo structure: `/frontend`, `/backend`, `/docs`
- [x] GitHub repo with branch protection and PR workflow
- [x] Vercel connected to repo (auto-deploys on merge to `main`)
- [x] Render connected to repo (auto-deploys on merge to `main`)
- [x] Supabase PostgreSQL database provisioned and connected

### Backend (`/backend`)
- [x] NestJS app bootstrapped
- [x] Prisma schema with `User` model (id, email, password, fullName)
- [x] `AuthModule` with `/auth/signup` and `/auth/login` POST endpoints
- [x] Password hashing with bcrypt
- [x] JWT token signing (7-day expiry)
- [x] `ValidationPipe` with whitelist enabled
- [x] CORS configured to allow `*.vercel.app` and `localhost:*`
- [x] Binds to `process.env.PORT ?? 3001` for Render compatibility
- [x] `render.yaml` at repo root for Render deploy config
- [x] Production DB connectivity via Supabase Connection Pooler (P1001 fix)

### Frontend (`/frontend`)
- [x] Next.js App Router setup
- [ ] **Homepage UI (Partial)** — Implementing section-by-section.
    - [x] **100vh Hero Fold**: Captures the entire user viewport for maximum immersion.
    - [x] **3D Breakout Effect**: Instructor image extends physically above the banner top.
    - [x] **Floating Badges**: Staggered icon boxes (Shield, Chart, Sparkles) with vertical float animations.
    - [x] **Category Slider**: Multi-group carousel (12 categories) with auto-play and hover-pause logic.
    - [x] **Why Learn with Upskiill?**: 12 interactive cards (6 live features, 6 AI "Coming Soon" features).
    - [ ] **Top Courses**: Dynamic list of high-performing courses (Next Step).
    - [ ] **Become an Instructor Banner**: Call-to-action for educators.
    - [ ] **Homepage Footer**: Site-wide links and brand info.
- [x] Login page (`/login`) — split-panel UI, form with validation, JWT stored in localStorage
- [x] Signup page (`/signup`) — matching split-panel UI
- [x] Global header component with search and navigation
- [x] `NEXT_PUBLIC_API_URL` env var used for all API calls (falls back to `http://localhost:3001`)
- [x] Font Awesome 6 (Solid) integrated via CDN for lightweight iconography.

### Auth Flow (Local & Live — working ✅)
- [x] Signup → POST `/auth/signup` → returns `{ access_token, user }`
- [x] Login → POST `/auth/login` → returns `{ access_token, user }`
- [x] Token stored in `localStorage` as `access_token`
- [x] Redirects to `/dashboard` (page currently 404)
- [x] Live Vercel frontend communicates correctly with Live Render backend

---

## 🟢 Current Status (2026-03-30 01:45 WAT)

### Homepage Sections: 🟡 Ongoing (2/5 Complete)
The Hero (with Category Slider) and the "Why Learn" section are finished and follow strict pixel-perfect specifications. The remaining homepage sections (Top Courses, Instructor CTA, Footer) are still pending.

**Next Immediate Goal:** Continue building the next homepage section or the `/dashboard` page.

---

## 📋 What's Next (Priority Order)

1. **[ ] Build `/dashboard` page** — currently login redirects there but page doesn't exist (shows 404)
2. **[ ] Persist auth state** — move token from `localStorage` to `httpOnly` cookie or add a `/auth/me` endpoint for session hydration
3. **[ ] Protected routes** — middleware to redirect unauthenticated users away from `/dashboard`
4. **[ ] User profile** — avatar, name, role display in header once logged in
5. **[ ] Course listing page** — core product feature
6. **[ ] Forgot password flow**

---

## 🏛️ Key Decisions Made

| Decision | Rationale |
|---|---|
| NestJS on Render free tier | Simple, no cost, auto-sleeps after inactivity (15min cold start) |
| JWT in localStorage | Simple for now; plan to move to httpOnly cookies later |
| `origin: true` → explicit regex CORS | Locked down to `*.vercel.app` only, avoids open CORS |
| Prisma in `dependencies` (not dev) | Required at runtime for Prisma Client; must be present in production install |
| Supabase Pooler URLs | Fixes P1001 error and connection instability |
| **100vh Hero Fold** | Enforces a high-converting, immersive landing page experience common in premium LMS sites. |
| **3D Breakout Effect** | Uses `overflow: visible` and `height: 110%` to create a modern, deep visual aesthetic. |
| **FA6 CDN Integration** | Rapid access to professional icons without increasing component bundle size via inline SVGs. |
| **Image Optimization** | Added `sizes` prop to instructor image with responsive viewport values to resolve Next.js warnings and improve LCP performance. |

---

## 🗂️ Key Files Reference

```
upskiill/
├── render.yaml                          # Render deploy config
├── backend/
│   ├── src/
│   │   ├── main.ts                      # Entry: CORS, ValidationPipe, port binding
│   │   ├── auth/                        # Signup, Login, JWT logic
│   └── prisma/schema.prisma             # User model definition
└── frontend/
    ├── app/
    │   ├── page.tsx                     # Landing page (homepage)
    │   ├── layout.tsx                   # Root layout (Fonts, FA6 CDN)
    │   ├── globals.css                  # Design system variables
    │   ├── login/page.tsx               # Login UI
    │   └── signup/page.tsx              # Signup UI
    ├── components/
    │   ├── Header.tsx                   # Sticky nav with search
    │   └── homepage/
    │       ├── HeroSection.tsx          # Banner, Slider, Features combined
    │       └── HeroSection.module.css   # Pixel-perfect absolute styles
    └── public/
        └── homepage/                    # instructor.png and all cat-*.png assets
```

---

## 🖥️ Local Dev Commands

```bash
# Terminal 1 — Frontend (runs on http://localhost:3000)
cd frontend && npm run dev

# Terminal 2 — Backend (runs on http://localhost:3001)
cd backend && npm run start:dev
```

---

## 🔗 Live URLs
- **Frontend:** https://upskiill.vercel.app
- **Backend:** https://upskiill-backend.onrender.com
- **GitHub:** https://github.com/upskiill201/upskiill
- **PR for Latest UI:** https://github.com/upskiill201/upskiill/pull/31
