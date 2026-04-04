> Last updated: 2026-04-04 12:23 WAT · Keep this file current at the end of every session.
> **STRICT RULE:** We proceed to the next Pillar ONLY when the current one is 100% complete.
> **BACKEND URL RULE:** All frontend fetch calls MUST use `https://upskiill-backend.onrender.com`. Local `localhost:3001` is reserved for temporary local testing ONLY. Emphasize this in all new features.

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
- [x] **SEO Slug System**: Dual lookup via ID or Slug in `CourseService`
- [x] **Build Optimization**: Fixed `dist/src/main` pathing for Render.com deployment ✅ (2026-04-03)
- [x] **Cart & Checkout Engine**: Implemented `Orders` controller for course enrollment & checkout processes. ✅ (2026-04-03)
- [x] **Dynamic Curriculum (JSON)**: Courses now support nested sections and lessons via `curriculum` field. ✅ (2026-04-03)

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
    - [x] **Industry-Standard Responsiveness**: Collapsible sidebar on desktop, full-screen drawer on mobile.
    - [x] **Fluid Typography**: Implemented `clamp()` for perfect scaling across all device sizes.
    - [x] Personalized Welcome Stats with shadow elevation
    - [x] AI Growth Advisor (Purple Gradient Widget)
    - [x] "Pick Up Where You Left Off" section using CourseCardHorizontal
    - [x] Learning Activity Analytics (Smooth SVG Charts)
    - [x] Skill Mastery Radar with circular boundary
    - [x] Global "Coming Soon" Context & Modal for unbuilt features
    - [x] **Failsafe Image Assets**: Verified high-availability Unsplash production IDs.
- [x] `NEXT_PUBLIC_API_URL` env var used for all API calls (falls back to `http://localhost:3001`)
- [x] Font Awesome 6 (Solid) integrated via CDN for lightweight iconography.
- [x] **Next.js 15 Compatibility**: Fixed asynchronous `params` unwrapping in dynamic routes ✅ (2026-04-03)
- [x] **Marketplace Live Data**: Transitioned from Mock to DB fetching with robust error handling
- [x] **Shopping Cart (localStorage)**: Persistent cart with badge and checkout integration.
- [x] **Guest Checkout Flow**: Guests can checkout; system creates automatic accounts via `/orders/checkout`.
- [x] **Dynamic Curriculum Render**: Refactored `CourseDetailPage` to render data-driven sections and lessons.
- [x] **Production API Enforcement**: All hardcoded `localhost:3001` replaced with `https://upskiill-backend.onrender.com`. ✅
- [x] **Cross-Domain Auth Fix (PR 48)**: Renamed `middleware.ts` to `proxy.ts`, added Next.js API `rewrites`, and configured auth fetches to `/api` to bypass strict 3rd-party cookie drops on Vercel.
- [x] **Course Player UI (`/learn/[id]`)**: Implemented mobile-responsive sidebar drawer, immersive 80vh video container, and "Coming Soon" premium placeholders. ✅ (2026-04-04)
- [x] **Dynamic Enrollment Architecture**: Established `GET /api/auth/me/enrollments`. Dashboard securely queries sessions and maps live progress into `CourseCardHorizontal`.
- [x] **Marketplace Smart CTAs**: Browse (`/courses`) and Details (`/courses/[id]`) natively detect enrollment ownership, morphing "Buy Now" into "Continue Learning". 
- [x] **Unified Hub Routing**: Decoupled the `isEnrolled` condition from `CourseCard` navigation, guaranteeing that clicking any card (Dashboard or Marketplace) routes the user solidly to the centralized Details page (`/courses/[id]`) first as the single path to launch the player.
- [x] **Vercel Build Fix**: Rectified severe TypeScript Type Checks surrounding outdated component prototypes (`CoursePlayerLayout`).

### Auth Flow (Local & Live — working ✅ — Tested 2026-04-03)
- [x] Signup → POST `/auth/signup` → sets `httpOnly` cookie, returns `{ access_token, user }`
- [x] Login → POST `/auth/login` → sets `httpOnly` cookie, returns `{ access_token, user }`
- [x] Frontend uses `credentials: 'include'` on all auth fetches — cookie accepted by browser
- [x] No `localStorage` usage — 100% cookie-based session
- [x] Redirects to `/dashboard` after login/signup ✅
- [x] Live Vercel frontend communicates correctly with Live Render backend

---

### Pillar 1: User & Auth System — ✅ 100% Complete & Tested (2026-04-03)
Fully hardened and verified:
- JWTs stored in `httpOnly` secure cookies (7-day expiry)
- `credentials: 'include'` on all auth fetches
- `/auth/me` session persistence endpoint (JWT-guarded)
- Route protection middleware active on frontend
- Cookie set/cleared correctly on login, signup, and logout
- All 5 manual tests passed locally ✅

### Pillar 2: Course Marketplace — 🟡 In Progress
Focus: Finish component library → Build `/courses` page → Build `/courses/[id]` → Connect Course API.

### Homepage & Instructor Landing Page: ⏸️ PIVOTED TO WAITLIST STRATEGY
> **🛑 CRITICAL DECISION (2026-04-04):** We are strictly **NOT** building the rest of the generic Homepage right now. The strategy is to adapt the Homepage and an Instructor page strictly as **Waitlist Capture Systems** to acquire users and instructors while we build the core app.
Hero + Category Slider + "Why Learn" section are finished. Remaining sections are pivoted to waitlist forms.

---

## 📋 Phase 1: Pillar-by-Pillar Roadmap
_Current Focus: Pillar 2 (Course Marketplace)_

1. **[x] Pillar 1: User & Auth (100% Done)**
   - [x] Add `role` field to Prisma User model (`STUDENT`, `INSTRUCTOR`, `ADMIN`)
   - [x] Implement `GET /auth/me` endpoint in NestJS
   - [x] Switch JWT storage to `httpOnly` secure cookies
   - [x] Implement Middleware for protected routes
2. **[ ] Pillar 2: Course Marketplace (Target: 100%)**
   - **Step A — Finish Feature Components (Phase 3): ✅ COMPLETE**
     - [x] `CertificateCard` — `components/features/CertificateCard.tsx`
     - [x] `LessonItem` — `components/features/LessonItem.tsx`
     - [x] `SectionAccordion` — `components/features/SectionAccordion.tsx`
     - [x] `CartItem` — `components/features/CartItem.tsx`
   - **Step B — Build Waitlist Landing Pages (Phase 4): ⏸️ PIVOTED TO WAITLIST**
     > **NOTE:** We are shifting the homepage focus purely to Waitlist Lead Capture for Students and Instructors.
     - [ ] `CategoryGrid` — `components/homepage/CategoryGrid.tsx`
     - [ ] `TopCourses` — `components/homepage/TopCourses.tsx`
     - [ ] `StatsBanner` — `components/homepage/StatsBanner.tsx`
     - [ ] `HowItWorks` — `components/homepage/HowItWorks.tsx`
     - [ ] `InstructorCTA` — `components/homepage/InstructorCTA.tsx`
     - [ ] `Testimonials` — `components/homepage/Testimonials.tsx`
   - **Step C — Build Marketplace Pages: ✅ COMPLETE & RESPONSIVE**
     - [x] `/courses` Browse UI (Responsive Grid + Pixel-perfect Mobile Optimization)
     - [x] `/courses/[id]` Course Detail/Sales Page (Responsive Sticky Card & Layout Stack)
   - **Step D — Build Course API (Backend): ✅ COMPLETE**
     - [x] Prisma Schema updated with robust Course metadata & relations
     - [x] DB seeded with high-fidelity marketplace mock data
     - [x] `GET /courses` — list all published courses (with active filters)
     - [x] `GET /courses/:id` — single course detail with Instructor payload
     - [x] `GET /courses/categories` — list all categories
- [x] **Course Landing Page (100% DONE)**: Responsive sticky card, dynamic curriculum, instructor details. ✅
4. **[ ] Pillar 4: Student Learning System (Current Focus)**
   - [x] Finalize Video Player curriculum logic & Sidebar Layout (`CoursePlayerLayout`)
   - [x] **Build the Full Enrollment System**: Constructed the core NestJS synchronization logic translating consumed `completedLessons` into the `progress` Prisma integer (`0-100%`) cleanly driving the interactive Dashboard bars.
   - [x] **API & UI Security Lockdown**: Wrapped the API endpoints in hard `403 Forbidden` checks intercepting non-owners. Next.js `/learn/[id]` correctly deploys a full-screen "Course Locked" aesthetic terminating DOM loading.
   - [ ] Integrate full Stripe payment logic
5. **[ ] Pillar 5: Instructor Tools (Phase 1E)**
   - [ ] Instructor Dashboard & Analytics
   - [ ] Course Creation UI & AWS S3 Video Uploader
6. **[ ] Pillar 6: Admin & Polish (Phase 1F)**
   - [ ] Admin Portal & Moderation tools
   - [ ] Legal pages and SendGrid Email integrations

---

## 🛠️ Deployment Notes (Render & Vercel)

### **Render (Backend)**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod` (Now maps to `dist/src/main.js` correctly)
- **Problem Fixed**: Previously failed with `MODULE_NOT_FOUND` because `dist/main.js` didn't exist due to TypeScript nesting. Fixed via `tsconfig.json` excludes and path update.

### **Vercel (Frontend)**
- **Environment Variable**: `NEXT_PUBLIC_API_URL` MUST be set to your Render URL (e.g., `https://upskiill-backend.onrender.com`).
- **Middleware**: Ensure authentication middleware is configured to handle `httpOnly` cookies in production.

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
| **Production API URL** | Enforced `https://upskiill-backend.onrender.com` in code fallbacks to prevent "forgotten" env vars from breaking CI/CD. |
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
- **Test Course Player (Live):** https://upskiill.vercel.app/learn/advanced-product-design-ux-strategy (Login directly with Alex's credentials to view)

---

## 🧪 Testing Accounts
Use the following officially seeded accounts to verify the platform, access the dashboard, and view the enrolled Player UI.
- **Student Account (Alex)**
  - **Email:** `alex@upskiill.com`
  - **Password:** `password123`
