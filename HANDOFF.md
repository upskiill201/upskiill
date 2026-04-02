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
    - [x] **Why Learn with Upskiill?**: 12 interactive cards with premium 64px circular icon backgrounds and FA6 iconography.
    - [ ] **Top Categories**: Grid for browsing by subject (Next Step).
    - [ ] **Top Courses**: Dynamic list of high-performing courses.
    - [ ] **Become an Instructor Banner**: Call-to-action for educators.
    - [ ] **Homepage Footer**: Site-wide links and brand info.
- [x] Login page (`/login`) — split-panel UI, form with validation, JWT stored in localStorage
- [x] Signup page (`/signup`) — matching split-panel UI
- [x] Shared Loading Spinners
- [x] Course Cards (Thumbnail, title, instructor, price)
- [x] Rating Stars component
- [x] Global header component with search and navigation
- [x] **Student Dashboard (`/dashboard`)** — High-fidelity premium "Learning Hub"
    - [x] Personalized Welcome Stats with shadow elevation
    - [x] AI Growth Advisor (Purple Gradient Widget)
    - [x] "Pick Up Where You Left Off" section using CourseCardHorizontal
    - [x] Learning Activity Analytics (Smooth SVG Charts)
    - [x] Skill Mastery Radar with circular boundary
    - [x] Global "Coming Soon" Context & Modal for unbuilt features
- [x] `NEXT_PUBLIC_API_URL` env var used for all API calls (falls back to `http://localhost:3001`)
- [x] Font Awesome 6 (Solid) integrated via CDN for lightweight iconography.

### Auth Flow (Local & Live — working ✅)
- [x] Signup → POST `/auth/signup` → returns `{ access_token, user }`
- [x] Login → POST `/auth/login` → returns `{ access_token, user }`
- [x] Token stored in `localStorage` as `access_token`
- [x] Redirects to `/dashboard` (page currently 404)
- [x] Live Vercel frontend communicates correctly with Live Render backend

---

## 🟢 Current Status (2026-04-02 01:45 WAT)

### Student Dashboard: ✅ Complete (100%)
The "My Learning Hub" is fully implemented as a high-fidelity, interactive dashboard. It includes gamification stats, AI-powered growth insights, and real-world analytics. All unbuilt modules (AI Tutor, Community, etc.) are safely wrapped in a premium "Coming Soon" modal to maintain a seamless user experience.

### Homepage Sections: 🟡 Ongoing (2/5 Complete)
The Hero (with Category Slider) and the "Why Learn" section are finished. Remaining sections are pending.

---

## 📋 What's Next (Priority Order)

1. **[ ] Persist auth state** — move token from `localStorage` to `httpOnly` cookie or add a `/auth/me` endpoint
2. **[ ] Protected routes** — middleware to redirect unauthenticated users away from `/dashboard`
3. **[ ] Build `/courses` Browse UI** — core discovery engine
4. **[ ] Instructor Card** — next component in library

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
| **Image Optimization** | Added refined `sizes` prop (`calc(100vw - 40px)`, etc.) to accurately match CSS padding/flex distribution. |
| **Feature Card Design** | Defined brand-specific 64x64px circular icon containers with `#EEF2FF` backdrop and `#3D5AFE` icons for consistency. |
| **Icon System — TWO libraries only** | `lucide-react` for all UI/form icons. `react-icons/fa` (FA6) for feature, brand & social icons. NO other icon libraries. NO emojis as icons in components. Established 2026-03-31. |
| **Component Preview Strategy** | Every newly built component MUST be immediately showcased on the `/components` route for visual review and interaction testing. |

---

## 🎨 Icon System — Project Standard (Agreed 2026-03-31)

> **Rule:** Only TWO icon libraries are used across the entire Upskiill codebase. No exceptions.

| Library | Package | Use Case | Example Icons |
|---|---|---|---|
| **Lucide React** | `lucide-react` | All UI & form icons — inputs, navigation, actions | `Search`, `Mail`, `Lock`, `Eye`, `EyeOff`, `User`, `ArrowRight`, `ChevronRight`, `Plus`, `X`, `Check`, `BookOpen` |
| **React Icons FA6** | `react-icons/fa` or `react-icons/fa6` | Feature icons, brand icons, social buttons | `FaGraduationCap`, `FaRocket`, `FaVideo`, `FaAward`, `FaApple`, `FaLinkedin`, `FaFacebook`, `FaTrash` |
| **React Icons FC** | `react-icons/fc` | Google colored icon ONLY | `FcGoogle` |

### ❌ What is NOT allowed:
- Emojis used as icons inside components
- Installing any other icon library (Heroicons, Material Icons, Phosphor, etc.)
- Inline SVGs unless absolutely no alternative exists
- Font Awesome CDN in new components (only kept in existing HeroSection for now)

### ✅ Import Pattern:
```tsx
// UI icons — use lucide-react
import { Search, Mail, Lock, Eye, EyeOff, ArrowRight, User } from 'lucide-react';

// Feature/brand icons — use react-icons/fa
import { FaGraduationCap, FaRocket, FaVideo, FaTrash } from 'react-icons/fa';

// Google icon only
import { FcGoogle } from 'react-icons/fc';
```

---

## 🧩 Component Library Status

> Full build plan: `docs/design/COMPONENT_BUILD_PLAN.md`
> Live preview page: `http://localhost:3000/components`

| Phase | Description | Status |
|---|---|---|
| Phase 1 — Shared UI | Button, Input, Badge, Avatar, StarRating, etc. (16 components) | 🟢 Complete (16/16 done) |
| Phase 2 — Layout | Footer, Sidebar | 🟢 Complete (2/2 done) |
| Phase 3 — Features | CourseCard ⭐, CoursePlayerLayout, etc. | 🟡 In Progress (3/10 done) |
| Phase 4 — Homepage | CategoryGrid, TopCourses, StatsBanner, etc. (6 components) | 🔴 Not started |

**Components built so far:** Header ✅ | HeroSection ✅ | Button ✅ | Badge ✅ | Spinner ✅ | Avatar ✅ | Input ✅ | Textarea ✅ | StarRating ✅ | ProgressBar ✅ | Modal ✅ | Tabs ✅ | Dropdown ✅ | SearchBar ✅ | Toast ✅ | Tooltip ✅ | Pagination ✅ | EmptyState ✅ | Footer ✅ | Sidebar ✅ | CoursePlayerLayout ✅ | CourseCard ✅ | CourseCardHorizontal ✅ | ReviewCard ✅ | CategoryCard ✅ | InstructorCard (Next 🚀) | **ComingSoonModal ✅**

- [x] Category Card
- [x] Coming Soon Sidebar/Context Infrastructure
- [ ] Instructor Card (Next 🚀)

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
