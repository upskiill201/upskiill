# CLAUDE.md — Teyro Project Configuration

> **Single source of truth for Claude Code on Teyro.** Mandatory read before writing code. Last updated: 2026-08-24.

---

## 1. What Teyro Is

**Teyro is Duolingo for people who want to learn, build practical skills, and still play.**
It is an AI-powered gamified learning platform that makes mastering real-world skills as addictive, engaging, and fun as mobile games and social media, eliminating the 94% online course dropout rate.

- **Core Pedagogy (Data-level Moat):** 4-phase lesson structure: **Learn → Apply → Reflect → Deepen**.
- **Solo Operator Rule:** Keep all architecture lightweight and maintainable by one person. Avoid enterprise/multi-team DevOps bloat.
- **Full Vision & Mission:** See [`docs/00-vision-and-mission.md`](docs/00-vision-and-mission.md) — the Teyro Vision School summary (why Teyro exists, the two-sided learner/creator model, monetization, culture, and long-term vision). Read it for context beyond code-level decisions.
- **Live URLs:**
  - Production Frontend: https://teyro.app (Vercel)
  - Production Backend: https://teyro-backend.onrender.com (Render)
  - GitHub: https://github.com/upskiill201/upskiill

---

## 2. Monorepo & Tech Stack

- **Frontend (`/frontend`):** Next.js 14 (App Router), TypeScript, Redux, Tailwind CSS v4, Framer Motion, GSAP, Rive.
- **Backend (`/backend`):** NestJS 11, Prisma ORM, PostgreSQL (Supabase), Redis, Firebase Admin SDK.
- **Infra:** Vercel (Frontend), Render (Backend), Cloudflare R2 (Media/Uploads), Firebase Auth, Stripe/Paystack.
- *UI/Design System & Motion Standards live in `frontend/CLAUDE.md` and `docs/08-color-system.md`.*

---

## 3. Environments & Deployment Flow

| Layer | Local Dev | Staging | Production |
|---|---|---|---|
| **Frontend** | `localhost:3000` | `upskiill-git-staging-upskiill201s-projects.vercel.app` (`staging` branch) | `teyro.app` / `upskiill.vercel.app` (`main` branch) |
| **Backend** | `localhost:3001` | `https://upskiill-backend.onrender.com` (`teyro-backend-staging`) | `https://teyro-backend.onrender.com` (`teyro-backend`) |
| **Database** | Local / Supabase pooler | Supabase `iobdpmczxikgocvfzouo` (`aws-1-eu-west-1`) | Supabase `lemajgyltvxjqvwjqvtg` (`aws-0-eu-west-1`) |
| **Storage** | Cloudflare R2 `teyro-production` / public URL `pub-d1eea6d3cd36417ea274a8c49e11c316.r2.dev` | Same | Same |

### Deployment Pipeline
1. **Local Dev:** Build & test on `localhost:3000` / `localhost:3001`.
2. **Staging:** Push to `staging` branch → Vercel & Render auto-deploy → test on staging URL.
3. **Production:** PR to `main` (requires approval) → Manually trigger "Deploy — Production" GitHub Action (`prisma migrate deploy` runs automatically).

### ⛔ API URL Rule (Hard Stop)
Never hardcode backend URLs. Always use `process.env.NEXT_PUBLIC_API_URL`:
```typescript
// ✅ CORRECT
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses`);
```

---

## 4. 4-Phase Lesson Model (Core Moat)

Every lesson enforces 4 phases in data model & schema (`schema.prisma`):
1. **Learn:** Core concept delivery (video, text, audio, interactive).
2. **Apply:** Active practice & exercises.
3. **Reflect:** Reinforcement, journaling, self-assessment.
4. **Deepen:** Supplemental resources & deep-dives.

Phases are stored as independent JSON arrays (`learnBlocks`, `applyBlocks`, `reflectBlocks`, `deepenBlocks`) with optimistic `version` locking and server-calculated XP/time.

---

## 5. API & Backend Standards

- **Versioning:** All NEW routes must be versioned: `/api/v1/...`.
  - ⚠️ **Conscious deviation (2026-08-26):** the live API currently serves an *unversioned* root (`/auth/...`, `/courses/...`, `/user-onboarding/...`) — only some modules sit under `/api`. Flipping everything to `/api/v1` in one move is unsafe this pass: externally-configured WhatsApp/Stripe webhook URLs and Render's `/health` check depend on current paths, and the Next.js fallback rewrite strips `/api`. Migration is tracked as a follow-up; until then, new modules should match the existing layout rather than invent a second convention.
- **Granular Lesson Saves:** Never PUT entire lessons. Use granular endpoints:
  - `PATCH /api/v1/lessons/:id/metadata`
  - `PATCH /api/v1/lessons/:id/phases/:phase`
  - `POST/DELETE /api/v1/lessons/:id/resources`
  - `POST /api/v1/lessons/:id/publish`
- **Optimistic Locking:** Frontend passes `{ ...data, version }`. Backend rejects mismatch with `409 Conflict`.
- **Throttling & Validation:** Global `ValidationPipe` (`whitelist: true`, `forbidNonWhitelisted: true`). Rate limiting on public/auth/AI endpoints.
- **Direct Uploads (Presigned URLs):** Never route file bytes through NestJS. ⚠️ **Correction (2026-09-09):** the backend has *no* upload endpoints at all — every storage route lives in the frontend's Next.js API routes (`frontend/app/api/upload/*`), signing against Cloudflare R2 via `frontend/lib/uploadS3Server.ts`. Browser PUTs directly to R2; multipart chunked uploads for video. The one exception is `/api/upload/avatar`, which proxies bytes through the Next server rather than presigning.
- **Webhooks & CORS:** Always verify Stripe/Paystack webhook signatures. Strict CORS origin whitelist (`ALLOWED_ORIGINS`).

---

## 6. Authentication & Roles

- **Lifecycle:** Firebase Auth (Client) → Send ID token to `POST /api/v1/auth/session` → Backend verifies & sets 7-day `httpOnly` JWT cookie (`access_token`). Subsequent requests use cookie. *(Cookie name corrected 2026-08-26 — it was documented as `auth_token` but every controller reads/writes `access_token`.)*
- **Roles:** `STUDENT`, `INSTRUCTOR`, `ADMIN` guarded at the NestJS Controller level.

---

## 7. Database & Migration Rules (Hard Stop)

- **BANNED Commands:** Never run `prisma db push` on real data or `prisma migrate reset` in production/staging.
- **Migrations:** Additive only with comments (`-- Type: ADDITIVE ONLY`, rollback SQL).
- **Seeding Guard:** Seed scripts must throw if `NODE_ENV === 'production'` and must use `upsert()`, never wipe.

---

## 8. UI, Gamification & Brand Rules

- **Avoid AI Slop:** Consult `docs/AVOID_AI_SLOP.md`. PRs with generic gradients, bland 3-card grids, or sloppy spacing will be rejected.
- **Gamification Currency:** Strictly **"Coins"** (never "gems").
- **Asset Paths:**
  - Logo: `frontend/public/Teyro Logo.png`
  - Streak Icon: `/Icons/burn.png` | XP: `/Icons/gem.png` | Hearts: `/Icons/heart.png`
- **Icons:** Only `lucide-react` (UI) and `react-icons/fa` (brand/social). No other icon sets or raw emojis.
- **Component States:** Every data component must implement Loading (skeletons), Error, Empty, and Success states.
- **Phase One Guard:** AI generation/assist features are Phase Two. Render UI placeholders only.

---

## 9. ⛔ Absolute Hard Stops Summary

| Domain | Prohibited Action |
|---|---|
| **Database** | `prisma db push` on real DBs; `migrate reset` on prod/staging; non-guarded seeds; non-upsert seeds. |
| **API / Networking** | Hardcoding API URLs; unversioned routes; unvalidated DTOs; unverified webhook signatures. |
| **Uploads** | Streaming file bytes through NestJS backend; unchunked large video uploads. |
| **Auth** | Storing JWTs in `localStorage`; exposing password hashes / credentials; skipping controller guards. |
| **UI / Design** | Hardcoding hex colors; unauthorized icon libraries; calling currency "gems"; shipping AI features in Phase 1. |
| **Git** | Direct pushes to `main` branch. All work goes through feature branches and PRs. |
