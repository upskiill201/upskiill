# CLAUDE.md — Teyro Project Configuration

> **This file is the single source of truth for Claude Code on the Teyro project.**
> Read this entire file before writing a single line of code. Every section is mandatory.
> Last updated: 2026-06-12

---

## 1. What Teyro Is

Teyro (teyro.app) is an AI-powered personalized learning platform that solves the 94% online course dropout rate. It is not a generic LMS. Its core differentiator is a 4-phase pedagogical lesson structure — Learn, Apply, Reflect, Deepen — enforced at the data model level, not just the UI. Every architectural and design decision must serve this mission.

**Live URLs:**
- Production frontend: https://teyro.app (pointing to Vercel)
- Production backend: https://upskiill-backend.onrender.com
- GitHub: https://github.com/upskiill201/upskiill

**The founder is a solo operator.** Every architectural recommendation must be scoped to what one person can maintain. Do not recommend solutions that require a dedicated DevOps team, a 3-person backend team, or enterprise tooling.

---

## 2. Monorepo Structure

```
upskiill/                          ← repo root
├── CLAUDE.md                      ← you are here
├── docs/
│   ├── PRODUCTION_PRINCIPLES.md   ← mandatory reading before any backend work
│   ├── AVOID_AI_SLOP.md           ← mandatory reading before any UI work
│   ├── 01-architecture.md
│   ├── 08-color-system.md         ← Teyro brand colors and CSS variables
│   └── ...
├── frontend/
│   ├── app/                       ← Next.js 14 App Router pages
│   │   ├── layout.tsx             ← root layout (shared header/footer)
│   │   ├── page.tsx               ← homepage /
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx           ← /courses browse
│   │   │   └── [id]/page.tsx      ← /courses/:id detail
│   │   ├── learn/[courseId]/page.tsx
│   │   ├── creator/
│   │   │   └── courses/
│   │   │       └── [id]/
│   │   │           └── lesson-builder/
│   │   │               └── [lessonId]/page.tsx  ← active build
│   │   └── instructor/
│   ├── components/
│   │   ├── ui/                    ← base components: Button, Input, Modal, etc.
│   │   ├── features/              ← CourseCard, VideoPlayer, LessonList, etc.
│   │   └── homepage/              ← homepage-specific sections
│   ├── lib/                       ← utilities, API client, helpers
│   ├── hooks/                     ← custom React hooks
│   ├── store/                     ← Redux state management
│   ├── types/                     ← TypeScript types and interfaces
│   └── public/
│       └── Teyro Logo.png         ← official logo asset — use this path only
└── backend/
    ├── src/
    │   ├── main.ts
    │   ├── app.module.ts
    │   ├── auth/
    │   ├── users/
    │   ├── courses/
    │   ├── lessons/
    │   ├── payments/
    │   └── common/                ← guards, interceptors, pipes, filters
    └── prisma/
        ├── schema.prisma
        └── migrations/            ← NEVER delete. All migrations live here.
```

---

## 3. Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14 (App Router) | Framework |
| React | 19 | UI library |
| TypeScript | Latest | Type safety |
| Tailwind CSS | v4 | Styling |
| GSAP (Club Business) | Latest | Complex animations (modal open/close, choreographed sequences) |
| Rive | Latest | Looping animated icons and state machine animations |
| Redux | Latest | Global state management |
| Framer Motion | Latest | Component-level micro-animations |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| NestJS | 11 | Backend framework |
| TypeScript | Latest | Type safety |
| Prisma | Latest | ORM and migrations |
| PostgreSQL | Latest | Primary database |
| Redis | Latest | Caching and session store |
| Firebase Admin SDK | Latest | Auth token verification |

### Infrastructure
| Service | Purpose | Environment |
|---|---|---|
| Vercel | Frontend hosting | All environments |
| Render | Backend hosting | All environments |
| Supabase | PostgreSQL database | All environments |
| AWS S3 | File and video storage | All environments |
| Firebase Auth | User authentication | All environments |
| Stripe | Payments (global) | Production |
| Paystack | Payments (Africa) | Production |
| SendGrid | Transactional email | All environments |

---

## 4. Environment Architecture

Teyro has **three environments**. Always confirm which environment you are targeting before writing any code involving URLs, database connections, or secrets.

```
Development  →  localhost:3000 (frontend)  +  localhost:3001 (backend)
Staging      →  teyro-git-staging.vercel.app  +  upskiill-backend.onrender.com  +  teyro-staging Supabase
Production   →  teyro.app                     +  teyro-backend.onrender.com     +  teyro-production Supabase
```

> **Note on naming:** The staging backend URL still says "upskiill" because Render does not allow renaming the subdomain of an existing service. The service is labelled `teyro-backend-staging` in the Render dashboard. This is intentional — staging is for testing, not for users to see.

### Deployment Flow

```
feature/xyz branch
        ↓  PR → staging
   staging branch  →  Render staging auto-deploys  →  test it
        ↓  PR → main (after testing)
      main branch  →  click "Deploy to Production" in GitHub Actions  →  production deploys
```

**Key rule:** `main` is always what's in production. `staging` is always what you're testing. Features never skip staging.

### Environment Variables Pattern

**Frontend `.env.local` (development — never committed):**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Vercel Preview environment (staging branch):**
```
NEXT_PUBLIC_API_URL=https://upskiill-backend.onrender.com
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Vercel Production environment (main branch → teyro.app):**
```
NEXT_PUBLIC_API_URL=https://teyro-backend.onrender.com
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### The API URL Rule (Hard Stop)

**In local development:** use `http://localhost:3001` — never the production or staging backend.
**In staging:** use the staging backend URL via environment variable.
**In production:** use the production backend URL via environment variable.

The frontend code must always read from `process.env.NEXT_PUBLIC_API_URL` — never hardcode any URL in application code.

```typescript
// CORRECT
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);

// WRONG — never do this
const response = await fetch('https://teyro-backend.onrender.com/courses');
const response = await fetch('https://upskiill-backend.onrender.com/courses');
const response = await fetch('http://localhost:3001/courses');
```

### GitHub Secrets Required

For GitHub Actions CI/CD to work, these secrets must be set in GitHub → repo → Settings → Secrets:
```
STAGING_DATABASE_URL              ← Supabase teyro-staging connection string (transaction mode)
STAGING_DIRECT_URL                ← Supabase teyro-staging direct URL
PRODUCTION_DATABASE_URL           ← Supabase teyro-production connection string
PRODUCTION_DIRECT_URL             ← Supabase teyro-production direct URL
RENDER_STAGING_DEPLOY_HOOK_URL    ← from Render teyro-backend-staging → Settings → Deploy Hook
RENDER_PRODUCTION_DEPLOY_HOOK_URL ← from Render teyro-backend → Settings → Deploy Hook
```

---

## 5. Brand Identity and Design System

### Core Brand Feel
Every page, every component, every interaction on Teyro must feel: **smooth, delightful, playful, and premium.** The product must feel alive and responsive to every user gesture. This is not optional polish — it is the product identity.

### Brand Colors (from `docs/08-color-system.md`)

```css
/* Core palette — use CSS variables, never raw hex in components */
--brand-blue:        #3D5AFE;   /* primary CTAs, logo, links */
--brand-blue-hover:  #2D4AEE;
--soft-blue:         #6C8CFF;   /* secondary highlights */
--light-blue-bg:     #EEF2FF;   /* blue-tinted section backgrounds */
--text-primary:      #1F2A44;   /* headings, body */
--text-secondary:    #64748B;   /* subtext, captions */
--text-muted:        #94A3B8;   /* placeholders */
--bg-page:           #FFFFFF;
--bg-section:        #F5F7FB;
--border:            #E2E8F0;
--success-green:     #22C55E;
--error-red:         #EF4444;
--gradient-brand:    linear-gradient(135deg, #3D5AFE 0%, #7B61FF 100%);
```

### Component Builder Standard (Course Builder Aesthetic)
For complex builder interfaces, use the `/creator/courses` Promo Banner as the visual source of truth:
- **Background:** `linear-gradient(135deg, #EEF2FF 0%, #F5F7FB 100%)`
- **Borders:** `1px solid #E2E8F0`
- **Radii:** `16px` for cards, `10px` for buttons and inputs
- **Shadows:** `box-shadow: 0 4px 20px rgba(61, 90, 254, 0.02), 0 1px 4px rgba(61, 90, 254, 0.01)`

### Typography
- **Headings:** established Teyro type scale — do not default to Inter + Space Grotesk without a brand reason
- **Body:** follow the established scale
- **Spacing:** 8px base unit — all spacing values must be multiples of 8 (8, 16, 24, 32, 48, 64px)

### Border Radius System
- Buttons and inputs: `10px`
- Cards: `12px`
- Large builder panels: `16px`
- Pills and badges: `999px`

### Icon Libraries
Only two icon libraries are permitted across the entire codebase:
- `lucide-react` — for all UI and form icons
- `react-icons/fa` — for feature, brand, and social icons

No other icon library. No emoji as icons. No inline SVG icons unless they are GSAP-animated brand moments.

### Logo
```
frontend/public/Teyro Logo.png
```
This is the only approved logo asset path. Never reference it any other way.

---

## 6. Motion and Animation Standards

### When to Use Each Tool
| Tool | Use For |
|---|---|
| **GSAP** | Modal open/close, page transitions, choreographed multi-element sequences, scroll-triggered animations, file upload completion bursts |
| **Rive** | Looping animated icons (upload spinner, success states, AI processing indicators) |
| **Framer Motion** | Component-level micro-animations: hover lift, press scale, list item enter/exit |
| **CSS transitions** | Simple hover states, color transitions, border changes — anything under 200ms with a single property |

### Animation Principles
- Modal open: scale from 0.95 → 1.0, fade in, duration 200ms, ease-out
- Modal close: reverse, duration 150ms, ease-in
- Button press: scale to 0.98, duration 100ms
- Card hover: translateY(-2px), shadow deepens, duration 150ms
- Upload complete: progress bar fills to 100%, transitions to green checkmark with a 3-particle GSAP burst
- AI text streaming: text appears character by character, textarea border pulses in brand indigo
- New resource added to list: GSAP slide-in from above, fade in, duration 250ms
- All animations must respect `prefers-reduced-motion` — wrap GSAP animations in a check

```typescript
// Always wrap GSAP in reduced motion check
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.to(element, { scale: 1, opacity: 1, duration: 0.2 });
} else {
  gsap.set(element, { scale: 1, opacity: 1 });
}
```

---

## 7. The 4-Phase Lesson Model (Teyro's Core Moat)

Every lesson on Teyro is structured into exactly four phases. This is not a UI concept — it is a data architecture concept that must be enforced at every layer.

```
1. Learn    — teach the concept (video, text, audio, interactive demo)
2. Apply    — engage with practice (activities, exercises)
3. Reflect  — reinforce learning (journaling prompts, self-assessment)
4. Deepen   — provide more resources (supplemental materials, rabbit holes)
```

### Data Architecture for Phases

Each phase stores content as an independent `contentBlocks` JSON array — never as loose columns:

```typescript
// Lesson schema (Prisma)
model Lesson {
  id              String   @id @default(cuid())
  courseId        String
  title           String   @db.VarChar(100)
  description     String   @db.VarChar(300)
  status          LessonStatus @default(DRAFT)
  version         Int      @default(1)           // for optimistic locking
  xpValue         Int      @default(0)           // computed server-side only
  estimatedSeconds Int     @default(0)           // computed server-side only
  
  // Phase content — stored as independent JSON blocks
  learnBlocks     Json     @default("[]")
  applyBlocks     Json     @default("[]")
  reflectBlocks   Json     @default("[]")
  deepenBlocks    Json     @default("[]")
  
  stepCompletion  Json     @default("{}")        // tracks each phase done state
  displayOrder    Int
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  publishedAt     DateTime?
}
```

### Content Block Structure

```typescript
interface ContentBlock {
  id: string;
  type: 'video' | 'text' | 'audio' | 'interactive';
  payload: VideoPayload | TextPayload | AudioPayload | InteractivePayload;
  displayOrder: number;
}

interface VideoPayload {
  uploadUrl: string;
  durationSeconds: number;
  thumbnailUrl: string;
  processingStatus: 'pending' | 'processing' | 'ready' | 'failed';
  sizeBytes: number;
}
```

---

## 8. API Design Standards

### Versioning (Mandatory)
All API endpoints must be versioned from day one:
```
/api/v1/courses
/api/v1/lessons
/api/v1/users
```
Never create an unversioned endpoint. When a breaking change is needed, `/api/v2/` runs in parallel.

### Granular Lesson Save Endpoints
Never use a single `PUT` for an entire lesson. Use granular endpoints:
```
PATCH  /api/v1/lessons/:id/metadata          ← title, description
PATCH  /api/v1/lessons/:id/phases/:phase     ← learn | apply | reflect | deepen
POST   /api/v1/lessons/:id/resources         ← add a resource
DELETE /api/v1/lessons/:id/resources/:rid    ← remove a resource
POST   /api/v1/lessons/:id/resources/reorder ← update display order (single transaction)
POST   /api/v1/lessons/:id/publish           ← gated publish with server-side validation
```

### Optimistic Locking
Every save request from the frontend must include the current `version` number. The backend must reject saves where the incoming version does not match the stored version, returning a 409 Conflict. This prevents data loss when the same lesson is open in two tabs.

```typescript
// On every PATCH request body
{ ...changes, version: currentVersion }

// Backend response on conflict
{ statusCode: 409, message: 'Version conflict', serverVersion: latestLesson }
```

### Rate Limiting (Mandatory on All Public Endpoints)
Every public endpoint must have `@nestjs/throttler` applied:
- Auth endpoints: 5 requests per 15 minutes per IP
- Search endpoints: 30 requests per minute per user
- AI assist endpoints: 20 requests per hour per creator (tracked against plan)
- General API: 100 requests per minute per user

### Input Validation (Mandatory)
`ValidationPipe` must be applied globally with these exact options:
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,           // strip unknown properties
  forbidNonWhitelisted: true, // throw on unknown properties
  transform: true,           // auto-transform types
}));
```

### Webhook Security
Every Stripe and Paystack webhook endpoint must verify the signature before processing:
```typescript
// Stripe
const event = stripe.webhooks.constructEvent(
  rawBody,
  request.headers['stripe-signature'],
  process.env.STRIPE_WEBHOOK_SECRET
);
```
Never process a webhook payload without signature verification. A missing or invalid signature returns 400 immediately.

### CORS Configuration
CORS must be locked to known origins — never use wildcard `*` in production:
```typescript
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
});
```

Environment variable `ALLOWED_ORIGINS` contains:
- Development: `http://localhost:3000`
- Staging: `https://teyro-staging.vercel.app`
- Production: `https://teyro.app`

---

## 9. Database and Migration Standards

> Full rules are in `docs/PRODUCTION_PRINCIPLES.md`. These are the operational commands.

### The Only Commands Claude Code May Suggest for Database Changes

```bash
# Local development — generates migration file from schema change
npx prisma migrate dev --name describe_the_change

# Production deployment — applies pending migrations, never touches data
npx prisma migrate deploy

# View migration status
npx prisma migrate status
```

### Commands Claude Code Must NEVER Suggest
```bash
npx prisma db push          # BANNED on any real data — destroys schema without migration history
npx prisma migrate reset    # BANNED on production — wipes everything
```

### Migration File Requirements
Every migration Claude Code generates must include at the top:
```sql
-- Migration: add_xp_value_to_lessons
-- Type: ADDITIVE ONLY (safe to deploy)
-- Rollback: ALTER TABLE lessons DROP COLUMN xp_value;
-- Backup required: NO (additive only)
-- Deployment order: migration first, then code
```

---

## 10. File Upload Standards

### Mandatory: Presigned URL Pattern
File bytes must NEVER transit through the NestJS backend. The upload flow is always:

```
1. Frontend → POST /api/v1/uploads/presign   (get signed URL + pending_asset_id)
2. Frontend → PUT {signedUrl}                (upload directly to AWS S3)
3. Frontend → POST /api/v1/lessons/:id/resources  (confirm upload, create record)
```

This is non-negotiable. Routing file bytes through Render will crash the server.

### Chunked Upload for Video
All video uploads must use multipart chunked upload (5–10MB chunks):
- On chunk failure: retry that chunk only, not the full upload
- Show granular progress from XHR `onprogress` events
- Never block the UI during upload — show inline progress state

---

## 11. Authentication Standards

### Session Lifecycle
1. User authenticates via Firebase Auth (email/password or Google OAuth)
2. Firebase returns an ID token
3. Frontend sends Firebase ID token to `POST /api/v1/auth/session`
4. Backend verifies with Firebase Admin SDK
5. Backend issues a NestJS JWT stored in an `httpOnly` cookie (7-day expiry)
6. All subsequent requests use the JWT cookie — never the Firebase token
7. On logout: invalidate the JWT, clear the cookie, sign out of Firebase

### JWT Storage
```typescript
// CORRECT — httpOnly cookie
response.cookie('auth_token', jwt, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

// WRONG — never store JWT in localStorage or a regular cookie
localStorage.setItem('token', jwt);
```

### Role-Based Access
Roles: `STUDENT`, `INSTRUCTOR`, `ADMIN`. Route guards must be applied at the controller level using NestJS Guards, never in the service layer. The frontend may hide UI based on role but must never rely on that for security — the backend enforces roles on every request.

---

## 12. Error Handling Standards

### Backend: Global Exception Filter
NestJS must have a global exception filter that:
- Catches all unhandled exceptions
- Returns a consistent error shape: `{ statusCode, message, timestamp, path }`
- Logs to the error tracking service (Sentry)
- Never exposes stack traces in production responses

### Frontend: Error Boundaries
Every page-level component must be wrapped in a React Error Boundary. The `app/error.tsx` file in Next.js App Router handles this at the route level.

### API Call Pattern
Every frontend API call must follow this pattern:
```typescript
try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/endpoint`, {
    credentials: 'include', // always include for cookie-based auth
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
} catch (error) {
  // Surface to user via toast notification
  // Log to Sentry
}
```

### Loading, Error, and Empty States
Every data-fetching component must implement all three states. This is non-negotiable — missing states are a rejection reason in code review.

---

## 13. Autosave and State Management Standards

### Debounced Autosave
- Debounce delay: 2 seconds after the last keystroke
- Show "Saving…" while the request is in flight
- Show "Saved just now" on success, transitioning to "Saved 2 min ago"
- Queue saves during offline periods; flush when `online` event fires

### Dirty State Tracking
Track `isDirty` boolean at all times in builder components:
- Set to `true` on any field change
- Set to `false` after successful save
- Block navigation with `beforeunload` when `isDirty` is true
- Show modal when navigating within the app with unsaved changes

### localStorage Safety Net
Every 30 seconds, serialize builder state to localStorage keyed by `lesson_${lessonId}`:
- On builder load, compare localStorage `savedAt` to server `updatedAt`
- If localStorage is newer, offer restore: "We found unsaved changes from X minutes ago"

---

## 14. Component Standards

### Before Creating Any New Component
1. Check `components/ui/` for base components
2. Check `components/features/` for feature components
3. Check `components/homepage/` for homepage sections
4. Only create a new component if none of the above meets the need

### Component File Structure
```typescript
// components/features/LessonResourceCard.tsx

import { type FC } from 'react';

interface LessonResourceCardProps {
  // explicitly typed — no `any`
}

const LessonResourceCard: FC<LessonResourceCardProps> = ({ ... }) => {
  return (
    // JSX
  );
};

export default LessonResourceCard;
```

### Required Component States
Every component that fetches data or handles user input must have:
- Loading state (skeleton screen, not spinner where possible)
- Error state (inline error message, not modal)
- Empty state (actionable — tells the user what to do, not just "nothing here")
- Success state

### AI Features — Phase Two Only
AI assist features (Generate Description, Summarise Content, Extract Key Points, AI Tutor, Skill Gap Analyzer) are strictly Phase Two. Do not build, scaffold, or stub these features during Phase One. When a Phase One component includes an AI Assist section in the UI design, render it as a visual placeholder only — no wiring, no endpoint, no state.

---

## 15. Seeding and Test Data

```typescript
// Every seed script must start with this guard
if (process.env.NODE_ENV === 'production') {
  throw new Error('SEED SCRIPT CANNOT RUN IN PRODUCTION. Exiting.');
}

if (process.env.ENVIRONMENT === 'production') {
  throw new Error('SEED SCRIPT CANNOT RUN IN PRODUCTION. Exiting.');
}
```

Use `upsert()` for all seed data — never `deleteMany()` followed by `create()`. Seed scripts update what exists and insert what doesn't. They never wipe.

---

## 16. Security Checklist (Apply to Every Feature)

Before marking any backend feature complete, verify:
- [ ] Input validated with class-validator DTOs
- [ ] Role guard applied at controller level
- [ ] Rate limit applied to the endpoint
- [ ] No sensitive data in response (no password hashes, no raw tokens)
- [ ] Webhook endpoints verify signature if applicable
- [ ] CORS allows only known origins
- [ ] `httpOnly` cookie used for auth token storage
- [ ] SQL injection impossible (Prisma parameterizes by default — do not use raw queries unless absolutely necessary, and if you do, parameterize explicitly)

---

## 17. Avoid AI Slop (Mandatory UI Pre-Check)

Before building any UI component, section, or page, read `docs/AVOID_AI_SLOP.md` and verify the design does not fall into any banned pattern.

Banned patterns summary:
- Generic purple/blue gradient glow in hero sections
- Glassmorphism used decoratively with no structural purpose
- The "3-card icon/heading/text grid" as a primary layout
- Oversized empty spacing hiding a lack of content
- Placeholder marquee logos or generic 3D illustrations
- Inter + Space Grotesk typography defaults without brand motivation
- Shadcn-clone navigation or sidebar layouts

Violating this principle is a PR rejection regardless of functionality.

---

## 18. Git Workflow Summary

```bash
# Always start from latest main
git checkout main && git pull origin main

# Create feature branch
git checkout -b feature/describe-the-feature

# Work, then commit with meaningful message
git add .
git commit -m "add resumable video upload to lesson builder"

# Push
git push origin feature/describe-the-feature

# Open PR → CodeRabbit auto-reviews → Tech Lead approves → Merge
```

Branch naming: `feature/`, `fix/`, `design/`, `migration/`, `docs/`

**Never push directly to `main`.** Every change goes through a PR.

---

## 19. What Claude Code Must Never Do

This section is absolute. These are hard stops regardless of how the request is framed.

**Database:**
- Never suggest `prisma db push` on any environment with real user data
- Never generate a migration that drops a table or column still referenced in code
- Never suggest recreating a table as a schema change solution
- Never generate seed scripts without the production environment guard

**API:**
- Never hardcode backend URLs — always use `process.env.NEXT_PUBLIC_API_URL`
- Never create an unversioned API endpoint (`/courses` instead of `/api/v1/courses`)
- Never skip input validation on a controller
- Never process a payment webhook without signature verification

**Auth:**
- Never store JWTs in localStorage
- Never return password hashes, raw tokens, or Firebase credentials in an API response
- Never skip role guard on a protected endpoint

**Uploads:**
- Never route file bytes through the NestJS backend
- Never suggest a single-request upload for video files

**UI:**
- Never build AI Assist features during Phase One
- Never use an icon library other than `lucide-react` or `react-icons/fa`
- Never reference the logo from any path other than `/public/Teyro Logo.png`
- Never hardcode colors — always use CSS variables from the brand system

---

## 20. Quick Reference Commands

```bash
# Frontend
cd frontend && npm run dev              # start local dev server (port 3000)
cd frontend && npm run build            # production build
cd frontend && npm run lint             # lint check

# Backend
cd backend && npm run start:dev         # start local backend (port 3001)
cd backend && npm run build
cd backend && npm run test
cd backend && npm run test:e2e

# Database
npx prisma migrate dev --name name     # create migration (local only)
npx prisma migrate deploy              # apply migrations (production)
npx prisma migrate status              # check pending migrations
npx prisma studio                      # visual DB browser (local only)
npx prisma generate                    # regenerate Prisma client after schema change

# Git
git checkout main && git pull          # always before starting work
git checkout -b feature/name           # create branch
git status                             # check changes
git add . && git commit -m "message"   # commit
git push origin feature/name           # push
```