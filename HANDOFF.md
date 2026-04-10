> Last updated: 2026-04-10 11:39 WAT · Keep this file current at the end of every session.
> **STRICT RULE:** We proceed to the next Pillar ONLY when the current one is 100% complete.
> **STRICT BACKEND URL RULE:** All frontend fetch calls MUST use `https://upskiill-backend.onrender.com` ALWAYS. NEVER point to the local backend on `localhost:3001` ever, even during local development and testing. This is a foundational code-based rule and principle.
> **STRICT BRANCHING RULE:** All work must always be pushed to a new branch to facilitate Pull Requests (PR), Code Reviews, and optimization BEFORE merging into the main branch. Direct pushes to the main branch are strictly prohibited.
> **STRICT COMPONENT SYSTEM RULE:** All UI components use the established design system with 10px rounded corners, 48px input height, and brand colors. New pages MUST utilize the shared component library (`components/ui/*` and `components/features/*`) to maintain design coherence across the entire application. DO NOT create custom styles that deviate from established patterns.
> **SEEDING POLICY:** Do NOT run `deleteMany()` at the start of the seeder as a default. Use `upsert()` or existence checks for core test data (Instructors & Students) to ensure we update what exists and preserve history instead of wiping the DB on every build.

---

## 🔄 Rebranding Plan — ⏳ PENDING NEW NAME

> **Strategic Decision (2026-04-05):** This platform is being re-launched as a **new product under a new brand name** (TBD). The codebase currently uses "Upskiill" / "upskiill" throughout. When the new name is confirmed, a full targeted find-and-replace will be run across all files listed below in a single session.

### When the name is ready, change it in this exact order:

#### 1. User-Facing Frontend Text
| File | What to Change |
|---|---|
| `frontend/app/layout.tsx` | `<title>` tag, meta description, site name |
| `frontend/public/meta.json` | `name`, `short_name`, `description` (PWA manifest) |
| `frontend/components/Header.tsx` | Logo text / brand name in navbar |
| `frontend/components/layout/Footer.tsx` | Brand name, copyright line |
| `frontend/components/homepage/HeroSection.tsx` | Headline, sub-headline, all brand copy |
| `frontend/app/login/page.tsx` | "Welcome back to Upskiill" copy |
| `frontend/app/signup/page.tsx` | "Join Upskiill" copy |
| `frontend/app/dashboard/layout.tsx` | Dashboard title references |
| `frontend/app/certificates/[id]/page.tsx` | "Upskiill" printed on certificate |
| `frontend/components/features/CoursePlayerLayout.tsx` | Player brand name |
| `frontend/context/CartContext.tsx` | `localStorage` key `upskiill-cart` → `[newname]-cart` |

#### 2. Backend / Auth / Seed Data
| File | What to Change |
|---|---|
| `backend/src/auth/auth.service.ts` | Brand strings in responses |
| `backend/src/auth/strategy/jwt.strategy.ts` | JWT issuer if branded |
| `backend/prisma/seed.ts` | Seed emails: `@upskiill.com` → `@[newname].com` |
| `backend/.env` | Any branded callback/redirect URLs |

#### 3. Config & Infrastructure
| File | What to Change |
|---|---|
| `frontend/next.config.ts` | API proxy target URL if backend URL changes |
| `render.yaml` | Service name `upskiill-backend` → `[newname]-backend` |
| `PROGRESS.md` | "Upskiill" in all headings |
| `HANDOFF.md` | "Upskiill" throughout this document |

#### 4. External Dashboards (Manual — no code)
| Service | Action |
|---|---|
| **GitHub** | Rename repo `upskiill201/upskiill` → `[org]/[newname]` |
| **Vercel** | Update project name + custom domain |
| **Render** | Update service name + custom domain |
| **Supabase** | Update project display name |
| **Stripe** | Update business name |
| **MeSomb** | Update app name |

> ✅ **Ready to rebrand?** Just tell me the new name in chat. I will update every file above in a single session and push a PR for you to merge.

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
- [x] **Premium Dual-Payment API**: Integrated **Stripe** and **MeSomb** Mobile Money into `PaymentModule`. Supports USSD push prompts and Webhook-based server-side enrollments. ✅ (2026-04-04)

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
- [x] **Premium Redesigned Order Flow**: Successfully decoupled `/cart` and `/checkout`, implementing a satisfying, brand-aligned white/blue premium UI for both. ✅ (2026-04-05)
- [x] **Separated Payment Methods**: Stripe (Cards/Wallets) and MeSomb (Mobile Money) are now split into clean, animated tabs with provider-specific validation. ✅ (2026-04-05)
- [x] **Student Dashboard Layout & UX Fixes**: Fixed sidebar scrolling issue (position: fixed) and implemented full backend-integrated logout logic. ✅ (2026-04-06)
- [x] **Production Deployment Stability**: Fixed Vercel TypeScript build failures by accurately typing `Map<string, Enrollment>` in `CoursesPage`. ✅ (2026-04-06)
- [x] **Instructor Routing & Auth Fixes**: Corrected the marketing `/teach` page to isolate and strictly route instructors down the `/instructor/signup` funnel, separating them from the generic student flow. ✅ (2026-04-06)
- [x] **Instantaneous Logout Engine**: Upgraded both Student & Instructor dashboards to use hard Navigation (`window.location.href`) during logout for immediate, 1-click state clearance without double-clicking. ✅ (2026-04-06)
- [x] **Firebase Auth Robustness**: Fortified NestJS `ValidationPipe` to securely parse `FirebaseLoginDto` ensuring `idToken` payload is never stripped during social sign-on. ✅ (2026-04-06)
- [x] **Dashboard Render Stability**: Guarded Prisma JSON arrays against corrupted strings preventing fatal Next.js "dark screen" hydrated errors rendering for seeded users over `.reduce` operations. ✅ (2026-04-06)
- [x] **Global Auth Header State**: Revamped `Header.tsx` to instantly sync with JWT state exposing a dynamic Profile/Avatar interactive dropdown mirroring the logged-in user. Include fully stylized mobile-slider navigation. ✅ (2026-04-06)
- [x] **Mobile Navigation Menu**: Implemented a full-screen slide-in hamburger drawer for `Header.tsx` with auth-aware state (shows Avatar+links for logged-in users, Login/Signup for guests). ✅ (2026-04-07)
- [x] **Course Creation Wizard (Part 1)**: Built the 4-step instructor onboarding wizard at `/instructor/create`. ✅ (2026-04-08)

---

## 🧙 Course Creation Wizard — Architecture Reference

> **Branch:** `course-creator-part-one` | **Status:** Part 1 Complete ✅ — Paused for Part 2 screenshots.

### Part 1: The Wizard (Steps 1–4) at `/instructor/create`

The wizard is a single-page client component (`InstructorLayout`-wrapped with shared `ComingSoonContext`). Steps are tracked in local state. The UI follows Udemy's minimalist design pattern with heavy black borders, animated grey selection cards, and sticky header/footer controls.

| Step | Route | Content | Validation |
|---|---|---|---|
| **1/4** | `/instructor/create` | Select "Course" vs "Practice Test". Tapping "Practice Test" fires the global `triggerComingSoon()` modal from the layout context — no page change. | Requires a type selection to enable "Continue" |
| **2/4** | Same page (local state) | Title input (`maxLength=60`). Placeholder: _e.g. Learn Photoshop CS6 from Scratch_ | Title must be non-empty |
| **3/4** | Same page (local state) | Category dropdown with all 13 official categories + "I don't know yet" | Category must be selected |
| **4/4** | Same page (local state) | Time commitment radio buttons (4 options: 0-2h / 2-4h / 5+h / Undecided). Final button says **"Create Course"** | A radio option must be selected |

**On Submit:** A `POST /api/courses` request is fired to `NEXT_PUBLIC_API_URL` (production) with `{ title, category, creatorTimeWeekly }` and `credentials: 'include'`. Backend auto-generates a collision-proof slug and creates a `published: false` course draft. The response `data.id` is used to redirect to the Course Studio.

### Part 2: The Course Studio Shell at `/instructor/courses/[id]/manage`

Currently a **placeholder shell** with:
- A dark header bar: `← Back to courses | Course Draft Studio | [DRAFT] | [Save]`
- A white `280px` sidebar stub (awaiting layout screenshots)
- A main canvas showing a success message + the new course's UUID

> **⏸️ PAUSED HERE** — Once the user provides the remaining course builder screenshots (sidebar nav, "Intended Learners" form, Curriculum builder, etc.), we will build the full multi-section course studio.

### Backend: `POST /api/courses` Endpoint

| Layer | File | Change |
|---|---|---|
| **Schema** | `backend/prisma/schema.prisma` | Added `creatorTimeWeekly String?` field to `Course` model. Applied via `prisma db push` (non-destructive). |
| **Service** | `backend/src/course/course.service.ts` | Added `createCourse(userId, data)` method. Generates `baseSlug` from title + 6-char random hash. Creates draft with `published: false`. |
| **Controller** | `backend/src/course/course.controller.ts` | Added `POST /courses` route guarded by `@UseGuards(AuthGuard('jwt'))`. Extracts `instructorId` from `req.user.id`. |

### Pillar 4: Student Learning System — 🟢 Complete (98%)
- [x] Student Dashboard (`/dashboard`) - Fixed Sidebar & Layout 
- [x] Secure Logout System - Integrated Backend Clear Cookie
- [x] Immersive Course Player (`/learn/[id]`) - Mobile Optimized
- [x] Dual Payment Engine (Stripe + MeSomb) - Deployed & Live
- [x] Premium Order UI (`/cart` & `/checkout`) - Redesigned & Polished
- [ ] **FINAL STEP:** End-to-end Live Transaction Verification (P0)

### Pillar 5: Instructor Tools & Insights 🏗️ (In Progress - 85%)
- [x] Instructor Marketing Funnel (`/teach`) — 10x redesigned with interactive earnings calculator, platform comparison matrix, and floating UI animations ✅
- [x] Instructor Authentication (`/instructor/login` & `/instructor/signup`) — Explicitly isolated creators UI ✅
- [x] Instructor Dashboard Layout (`/instructor/layout.tsx`) — fixed sidebar, role badge, proper overflow handling ✅
- [x] Instructor Overview Page (`/instructor/page.tsx`) — Seeded stats, table metrics, instructor score ✅
- [x] Analytics Page (`/instructor/analytics/page.tsx`) — Deeper insights: heatmaps, drop-off analysis, student funnel ✅
- [x] Dynamic Browse UI Fixes — Fixed hardcoded result counts & added "Continue Learning" status detection for enrolled students ✅ (NEW: 2026-04-06)
- [x] **Course Creation Wizard Part 1** (`/instructor/create`) — 4-step wizard: type → title → category → time commitment → creates DB draft + redirects to Course Studio. ✅ (2026-04-08)
- [ ] **Course Studio (`/instructor/courses/[id]/manage`)** — ⏸️ Shell built. Awaiting builder UI screenshots to implement full layout.
- [ ] Course Creation Wizard Part 2 — Intended Learners, Curriculum Builder, Video Upload
- [ ] Course Creation Wizard (`/instructor/create`)
- [ ] Curriculum Video Upload (S3)


### Auth Flow (Local & Live — working ✅ — Tested 2026-04-06)
- [x] Signup → POST `/api/auth/signup` → sets `httpOnly` cookie, returns `{ access_token, user }`
- [x] Login → POST `/api/auth/login` → sets `httpOnly` cookie, returns `{ access_token, user }`
- [x] Frontend uses `credentials: 'include'` on all auth fetches — cookie accepted by browser
- [x] No `localStorage` usage — 100% cookie-based session
- [x] Route Protection active: Unauthorized routing is immediately swept via SPA cache-busting redirects (`window.location.href`)
- [x] Strict Role Engine active: Instructors cannot view Student Dashboard, Students cannot access Instructor Studio.

### Seed Database Credentials (For Live Testing)
When the application seeds the production Postgres database via `npx prisma db seed`:

**Instructors:**
- **Alex Rivera**: `alex@rivera.com` / `password123`
- **Sarah Chen**: `sarah@chen.com` / `password123`
- **Marcus Johnson**: `marcus@johnson.com` / `password123`

**Test Student:**
- **Jane Student**: `jane@student.com` / `password123`
- **Enrollments**: Enrolled in 3 Premium Courses (Next.js, Digital Marketing, Python).

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
   - [/] **Premium Dual-Payment Integration (Deployed, Untested 🟡)**: Full backend gateway built. Stripe supports Card/Apple Pay/Google Pay. MeSomb supports MTN, Orange, Express Union, Wave. Live keys injected to Render + Vercel. Build passes on both platforms. **NEEDS: End-to-end live transaction test with a real card and real phone.**
   - [/] **Cart & Checkout Pages (Functional, Needs UI Polish 🟡)**: Cart (`/cart`) and Checkout (`/checkout`) are correctly separated. Checkout is login-required. Functional flow works. **NEEDS: A full premium UI redesign pass for both pages — better layout, animations, trust signals, mobile optimization.**
   - [ ] End-to-end Payment Testing (test a real $1 Stripe charge + real MoMo prompt)
   - [ ] Premium Cart & Checkout UI Redesign
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

## 🎯 Established Design System — Project Standard (Agreed 2026-04-10)

> **Rule:** All new pages and features MUST use the shared component library to maintain design coherence. Custom styles that deviate from established patterns are NOT allowed.

### UI Components (components/ui/*)

| Component | Border Radius | Height | Notes |
|-----------|---------------|--------|-------|
| **Button** | 10px | 36px (sm), 44px (md), 52px (lg) | Uses `--brand-blue` with hover states |
| **Input** | 10px | 48px | Border `--border`, focus ring `--brand-blue` |
| **Textarea** | 10px | auto | Character counter support |
| **Badge** | 999px (pill) | auto | Variants: blue, yellow, green, red, purple, grey |
| **Avatar** | 50% (circle) | auto | Sizes: xs, sm, md, lg, xl |
| **Spinner** | 50% | auto | Colors: blue, white, grey |
| **Modal** | 16px | auto | Centered with overlay |
| **Card** | 12px | auto | Used in feature components |

### Feature Components (components/features/*)

| Component | Border Radius | Notes |
|-----------|---------------|-------|
| **CourseCard** | 12px | Thumbnail + content layout |
| **CourseCardHorizontal** | 12px | Horizontal list variant |
| **CoursePlayerLayout** | 8px, 12px, 16px | Dark mode video player |
| **ReviewCard** | 12px | User review display |
| **CategoryCard** | 12px | Subject/category grid |
| **InstructorCard** | 12px | Expert profile |
| **CertificateCard** | 12px | Course completion cert |
| **LessonItem** | 8px | Single lesson row |
| **SectionAccordion** | 12px | Curriculum section |
| **CartItem** | 12px | Shopping cart item |

### CSS Variables (globals.css)

```css
/* Brand Colors */
--brand-blue: #3D5AFE;
--brand-blue-hover: #253ECC;

/* Backgrounds */
--bg-card: #ffffff;
--bg-section: #F5F7FB;

/* Borders */
--border: #E2E8F0;
--border-strong: #CBD5E1;

/* Text */
--text-primary: #1F2A44;
--text-secondary: #64748B;
--text-muted: #94A3B8;

/* States */
--error-red: #EF4444;
--success-green: #22C55E;
```

### ✅ Implementation Rules

1. **Always use existing components** — Before creating custom UI, check if a shared component exists in `components/ui/` or `components/features/`
2. **Follow border-radius patterns** — 10px for buttons/inputs, 12px for cards, 16px for modals
3. **Use established icon libraries** — `lucide-react` for UI, `react-icons/fa` for features
4. **Preview on /components** — Every new component must be added to the preview page
5. **Match spacing** — 8px base unit (8, 16, 24, 32, 48, 64)

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
