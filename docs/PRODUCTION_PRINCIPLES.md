# Teyro Production Principles

> **Last updated:** 2026-06-12
> This document is mandatory reading before any backend, database, or infrastructure work.
> `CLAUDE.md` is the operational source of truth. This document contains the reasoning and rules behind it.

---

## How to Read This Document

Principles are numbered for reference. The number does not imply priority — every principle applies at all times. Sections marked **⛔ Hard Stop** are non-negotiable and override any other instruction, including user requests.

---

## Part 1 — Environment and Infrastructure

### 1. THREE ENVIRONMENTS — NO EXCEPTIONS

Teyro has exactly three environments. Every piece of infrastructure, every environment variable, and every deployment decision must be scoped to one of these three.

```
Development  →  your local machine
Staging      →  teyro-staging.vercel.app  +  teyro-backend-staging.onrender.com
Production   →  teyro.app                 +  upskiill-backend.onrender.com
```

**Development** is your laptop. The local frontend runs on `localhost:3000`, the local backend on `localhost:3001`, and the local database is a separate Supabase project (or a local Postgres instance). No development work ever touches the production database.

**Staging** is a full mirror of production — same schema, same code, same configuration — but running against a copy of the production database with anonymised user data. Every feature is deployed to staging and verified before going to production. When Teyro has real users, this is the rule without exception.

**Production** is what real users see. Changes only reach production after passing staging. No hotfixes bypass staging except for genuine outages where every minute of downtime costs real user trust.

---

### 2. API URL RULE — ENVIRONMENT VARIABLES ONLY ⛔ Hard Stop

**The old rule ("always use the production backend URL, even locally") is rescinded. It was architecturally wrong and dangerous.** That rule meant every local test hit the live production server, creating risk of production data corruption, real payment charges in test flows, and collision between developers working simultaneously.

**The correct rule:**

| Environment | API URL source |
|---|---|
| Development | `http://localhost:3001` via `.env.local` |
| Staging | `https://teyro-backend-staging.onrender.com` via Vercel staging env vars |
| Production | `https://upskiill-backend.onrender.com` via Vercel production env vars |

The frontend always reads the URL from `process.env.NEXT_PUBLIC_API_URL`. It is **never hardcoded** in any source file.

```typescript
// ✅ CORRECT — reads from environment
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);

// ⛔ WRONG — hardcoded production URL
const res = await fetch('https://upskiill-backend.onrender.com/courses');

// ⛔ WRONG — hardcoded localhost
const res = await fetch('http://localhost:3001/courses');
```

**The only exception:** Next.js API route rewrites in `next.config.ts` may reference `process.env.NEXT_PUBLIC_API_URL` as the rewrite destination — this is still reading from an environment variable, not hardcoding.

---

### 3. BRANCHING RULE ⛔ Hard Stop

All work must be pushed to a feature branch to facilitate Pull Requests, code review, and staged deployment.

- Branch naming: `feature/`, `fix/`, `design/`, `migration/`, `docs/`
- Direct pushes to `main` are strictly prohibited
- Every PR must pass linting and build before merge
- Every migration branch must have its migration applied to staging before the PR is merged to main

---

## Part 2 — Database and Schema

### 4. DATABASE CHANGE PRINCIPLES ⛔ Hard Stop

**The core rule:** Never modify production data or schema in a way that destroys existing records. Every database change must be a migration file committed to the repository — never a schema sync, never a table recreation.

#### Migration Commands

```bash
# ✅ LOCAL ONLY — generates migration file from schema changes
npx prisma migrate dev --name describe_the_change

# ✅ PRODUCTION — applies pending migration files safely
npx prisma migrate deploy

# ✅ CHECK STATUS — view applied and pending migrations
npx prisma migrate status

# ⛔ BANNED on any environment with real data
npx prisma db push

# ⛔ BANNED on production — wipes everything
npx prisma migrate reset
```

#### Migration Discipline

**Additive before subtractive.**
- Adding a column, table, or index: safe to deploy immediately.
- Removing a column, table, or index: only after the code that references it has been removed in a prior deployment.
- Renaming anything: three-phase pattern across three separate deployments — add new column, migrate data, remove old column. Never rename in a single step.

**No destructive statement without explicit review.**
Any migration containing `DROP TABLE`, `TRUNCATE`, `DELETE FROM`, or `DROP COLUMN` must include:
- A comment explaining why the data is safe to destroy
- Confirmation that no application code still references the target
- Explicit approval before merging

If uncertain, add `-- DESTRUCTIVE: review required` and stop.

**Every migration must have a rollback.** Write both the forward change and the reverse change before deploying.

#### Required Migration File Header

Every migration generated must include this header:

```sql
-- Migration: describe_what_this_does
-- Type: ADDITIVE ONLY | REQUIRES BACKFILL | DESTRUCTIVE
-- Rollback: <the SQL to undo this migration>
-- Backup required: YES | NO
-- Deployment order: migration first, then code | code first, then migration
```

#### Schema Change Deployment Order

**New column needed by new code:**
1. Deploy migration adding the column with a safe default.
2. Deploy the code that uses the column.
Never deploy code before the column exists.

**Removing a column:**
1. Deploy code that no longer references the column.
2. In a later deployment, deploy the migration that drops the column.
Never drop a column while code references it.

**Data type change:**
1. Add new column with the new type.
2. Deploy code that writes to both columns simultaneously.
3. Run backfill migration to copy data from old column to new.
4. Deploy code that reads from new column only.
5. Drop the old column.

#### Pre-Change Checklist

Before writing any migration, answer these explicitly:

1. Does this change remove or rename anything? If yes — has the referencing code already been removed in a prior deployment?
2. Does this change alter existing data? If yes — is there a database snapshot, and has the backfill been tested on a copy of production data?
3. Can this change be rolled back? If no — why not, and has that been explicitly accepted?
4. Does this contain a destructive statement? If yes — has it been reviewed?

If any answer is uncertain, stop and resolve it before proceeding.

#### Backups Before Risky Migrations

Before any migration that touches existing data (backfills, type changes, column removals):
- Take a manual database snapshot before running the migration
- On Supabase: use the dashboard point-in-time restore
- Document the snapshot timestamp in the migration file as a comment

---

### 5. SEEDING POLICY

Seed scripts exist for local development and staging only. Every seed script must include this guard as its first executable statement:

```typescript
if (process.env.NODE_ENV === 'production' || process.env.ENVIRONMENT === 'production') {
  throw new Error('SEED SCRIPT CANNOT RUN IN PRODUCTION. Exiting immediately.');
}
```

Use `upsert()` for all seed data — never `deleteMany()` followed by `create()`. Seed scripts update what exists and insert what doesn't. They never wipe.

Test data cleanup (truncating tables, resetting sequences) is only permitted on databases explicitly flagged as `ENVIRONMENT=test` or `ENVIRONMENT=development`.

---

## Part 3 — Security

### 6. AUTHENTICATION AND SESSION LIFECYCLE

Teyro uses a dual-layer auth system: Firebase Auth handles identity verification; NestJS issues a session JWT. This creates two token systems. The rules below define exactly what each system does and when each token is valid — to prevent security gaps from the interaction between them.

**Session flow:**
1. User authenticates via Firebase Auth (email/password or Google OAuth)
2. Firebase returns a short-lived ID token (1 hour expiry)
3. Frontend sends the Firebase ID token to `POST /api/v1/auth/session`
4. Backend verifies the Firebase token with Firebase Admin SDK — rejects if invalid or expired
5. Backend issues a NestJS JWT stored in an `httpOnly` cookie with 7-day expiry
6. All subsequent API requests use the NestJS JWT cookie — the Firebase token is never sent to the backend again after step 3
7. On logout: invalidate the NestJS JWT, clear the cookie, sign out of Firebase client SDK

**Token rules:**
- NestJS JWT is the only token the backend trusts for protected routes
- Firebase token is used only for initial session creation (step 3)
- If a Firebase account is disabled or deleted, existing NestJS JWTs remain valid until they expire — this is a known gap. Mitigation: implement a `POST /api/v1/auth/revoke` endpoint that adds the JWT `jti` to a blocklist checked on every request. This is a Phase 2 security task.
- JWTs are stored in `httpOnly`, `Secure`, `SameSite=lax` cookies — never in `localStorage` or a regular cookie

**Role-based access:**
Roles: `STUDENT`, `INSTRUCTOR`, `ADMIN`. Guards are applied at the controller level using NestJS Guards. The frontend may hide UI based on role, but the backend enforces roles on every request — frontend role checks are cosmetic only.

---

### 7. CORS POLICY — SPECIFIC ORIGINS ONLY ⛔ Hard Stop

CORS must be locked to known origins. A wildcard `*` in production is a security vulnerability that allows any website to make authenticated requests to your API.

```typescript
// ✅ CORRECT — reads allowed origins from environment variable
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
});
```

`ALLOWED_ORIGINS` environment variable per environment:
- Development: `http://localhost:3000`
- Staging: `https://teyro-staging.vercel.app`
- Production: `https://teyro.app`

---

### 8. RATE LIMITING — MANDATORY ON ALL PUBLIC ENDPOINTS ⛔ Hard Stop

Every public endpoint must have `@nestjs/throttler` applied. Without rate limiting, a single bad actor can exhaust your Render instance with automated requests.

Required limits:
- Auth endpoints (`/auth/login`, `/auth/register`): **5 requests per 15 minutes per IP**
- Search endpoints: **30 requests per minute per authenticated user**
- AI assist endpoints: **20 requests per hour per creator** (tracked against plan tier)
- General API endpoints: **100 requests per minute per authenticated user**
- Webhook endpoints: exempt (protected by signature verification instead)

Apply the `ThrottlerGuard` globally and override per-endpoint where needed.

---

### 9. INPUT VALIDATION — MANDATORY ON ALL CONTROLLERS ⛔ Hard Stop

`ValidationPipe` must be applied globally with these exact options. Without it, any user can send a payload of any shape to any endpoint.

```typescript
// main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,            // strip properties not in the DTO
  forbidNonWhitelisted: true, // throw 400 on unknown properties
  transform: true,            // auto-transform types (string → number etc.)
}));
```

Every controller method that accepts a body must have a corresponding DTO class decorated with `class-validator` decorators. Raw `@Body()` without a DTO class is never acceptable on a protected or public-facing endpoint.

---

### 10. WEBHOOK SIGNATURE VERIFICATION ⛔ Hard Stop

Every payment webhook endpoint must verify the provider's signature before processing any payload. An unsigned webhook means anyone can send a fake "payment successful" event and receive free course enrollment.

```typescript
// Stripe webhook handler
const event = stripe.webhooks.constructEvent(
  rawBody,                                     // must be raw bytes, not parsed JSON
  request.headers['stripe-signature'],
  process.env.STRIPE_WEBHOOK_SECRET,
);
// If constructEvent throws, return 400 immediately — do not process

// Paystack webhook handler
const hash = crypto
  .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
  .update(JSON.stringify(request.body))
  .digest('hex');
if (hash !== request.headers['x-paystack-signature']) {
  return response.status(400).send('Invalid signature');
}
```

Webhook endpoints must use raw body parsing — `express.raw({ type: 'application/json' })` — not the global JSON parser, because JSON parsing before signature verification changes the byte sequence and makes verification fail.

---

## Part 4 — API Design

### 11. API VERSIONING — MANDATORY FROM DAY ONE ⛔ Hard Stop

All API endpoints must be versioned. An unversioned endpoint can never be changed without breaking every client that calls it.

```
✅ /api/v1/courses
✅ /api/v1/lessons/:id
⛔ /courses
⛔ /api/courses
```

When a breaking change is needed, `/api/v2/` runs in parallel until all clients migrate. `/api/v1/` is never modified in a way that breaks existing callers.

---

### 12. FILE UPLOAD — PRESIGNED URLS ONLY ⛔ Hard Stop

File bytes must never transit through the NestJS backend. Render instances have limited RAM. A single large video upload routed through the backend will exhaust memory and crash the server for all users.

The only permitted upload pattern:
```
1. Frontend → POST /api/v1/uploads/presign      (get signed URL + pending asset ID)
2. Frontend → PUT {signedUrl}                   (upload directly to Cloudflare R2)
3. Frontend → POST /api/v1/lessons/:id/resources (confirm upload, create DB record)
```

Video uploads must use multipart chunked upload (5–10MB chunks). On chunk failure, retry that chunk only — not the full upload.

---

## Part 5 — Error Handling and Observability

### 13. ERROR HANDLING STRATEGY

Without a defined error handling strategy, silent failures cause data loss and broken user experiences that go undetected until a user complains.

**Backend — Global Exception Filter:**
NestJS must have a global exception filter that:
- Catches all unhandled exceptions
- Returns a consistent error shape: `{ statusCode, message, timestamp, path }`
- Logs to Sentry with full context (user ID, request path, request body shape)
- Never exposes stack traces or internal error details in production responses

**Frontend — Error Boundaries:**
Every page-level component must be wrapped in a React Error Boundary. In Next.js App Router, `app/error.tsx` handles this at the route level. Each major feature (Lesson Builder, Course Builder, Checkout) must have its own `error.tsx` so a crash in one feature does not blank the entire page.

**Frontend — API Call Pattern:**
Every fetch call must follow this pattern without exception:

```typescript
try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/endpoint`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }
  return res.json();
} catch (err) {
  // 1. Surface to user via toast notification (never silent)
  // 2. Log to Sentry with context
  toast.error('Something went wrong. Please try again.');
  Sentry.captureException(err, { extra: { endpoint } });
}
```

**Every data-fetching component must implement three states:**
- Loading (skeleton screen preferred over spinner)
- Error (inline, actionable — "Try again" button)
- Empty (actionable — tells the user what to do next, not just "nothing here")

A component missing any of these three states is a PR rejection.

**Alerting:**
- Sentry alert threshold: any new error type appearing more than 5 times in 10 minutes triggers a notification
- Payment-related errors trigger immediate alerts regardless of frequency

---

## Part 6 — Design and UI

### 14. COMPONENT REUSE PRINCIPLE

Before creating any new UI component:
1. Check `components/ui/` for base components (Button, Input, Modal, etc.)
2. Check `components/features/` for feature-specific components (CourseCard, LessonList, etc.)
3. Only create a new component if nothing existing meets the requirement

### 15. COMPONENT SYSTEM STANDARDS

- Border radius: `10px` for buttons and inputs, `12px` for cards, `16px` for large builder panels, `999px` for pills
- Input height: `48px`
- Spacing: 8px base unit — all spacing values must be multiples of 8
- Shadows: use the preset from `CLAUDE.md` Section 5 — never invent ad-hoc shadow values

### 16. ICON SYSTEM — TWO LIBRARIES ONLY ⛔ Hard Stop

Only two icon libraries are permitted across the entire codebase:
- **`lucide-react`** — for all UI and form icons
- **`react-icons/fa`** — for feature, brand, and social icons

No other icon library. No emojis as icons. No inline SVG icons unless they are GSAP-animated brand moments.

### 17. AVOID AI SLOP — MANDATORY UI PRE-CHECK ⛔ Hard Stop

Before building any UI component, section, or page, read [`docs/AVOID_AI_SLOP.md`](./AVOID_AI_SLOP.md) and confirm the design passes the checklist.

Banned patterns:
- Generic purple/blue gradient glow in hero sections or buttons
- Glassmorphism used decoratively with no structural purpose
- The "3-card icon/heading/text grid" as a primary layout
- Oversized empty spacing hiding a lack of content
- Placeholder marquee logos or generic 3D illustrations
- Inter + Space Grotesk typography defaults without brand motivation
- Shadcn-clone navigation or sidebar layouts

Violating this principle is a PR rejection regardless of functionality.

---

## Part 7 — What Must Never Happen

This section is a consolidated hard stop list. These apply regardless of how a request is framed.

### Database
- ⛔ Never run `prisma db push` on any environment with real user data
- ⛔ Never generate a migration that drops a table or column still referenced in application code
- ⛔ Never suggest recreating a table as a schema change solution
- ⛔ Never generate seed scripts without the production environment guard
- ⛔ Never run `prisma migrate reset` on any environment other than a fully local test database

### API
- ⛔ Never hardcode backend URLs in source files — always use `process.env.NEXT_PUBLIC_API_URL`
- ⛔ Never create an unversioned endpoint (`/courses` instead of `/api/v1/courses`)
- ⛔ Never accept a request body without a validated DTO
- ⛔ Never process a payment webhook without signature verification
- ⛔ Never allow wildcard CORS (`*`) in staging or production

### Auth
- ⛔ Never store JWTs in `localStorage` or a regular (non-httpOnly) cookie
- ⛔ Never return password hashes, raw tokens, or Firebase credentials in an API response
- ⛔ Never skip a role guard on a protected endpoint

### Uploads
- ⛔ Never route file bytes through the NestJS backend
- ⛔ Never use a single-request upload for video files

### UI
- ⛔ Never build AI Assist features during Phase One (Phase Two only)
- ⛔ Never use an icon library other than `lucide-react` or `react-icons/fa`
- ⛔ Never hardcode colors — always use CSS variables from the brand system
- ⛔ Never reference the logo from any path other than `frontend/public/Teyro Logo.png`

---

## Appendix — Quick Reference

| Concern | Rule | Detail in |
|---|---|---|
| API URL | Always from `process.env.NEXT_PUBLIC_API_URL` | Section 2, `CLAUDE.md` §4 |
| Environments | Development / Staging / Production | Section 1 |
| Database migrations | `prisma migrate dev` locally, `prisma migrate deploy` in CI | Section 4 |
| Seeding | `upsert()` only, production guard required | Section 5 |
| Auth session | Firebase → NestJS JWT → httpOnly cookie | Section 6 |
| CORS | Specific origins from env var, never `*` | Section 7 |
| Rate limiting | `@nestjs/throttler` on every public endpoint | Section 8 |
| Input validation | Global `ValidationPipe` with whitelist + forbidNonWhitelisted | Section 9 |
| Webhooks | Signature verification before any processing | Section 10 |
| API versioning | `/api/v1/` prefix on every endpoint | Section 11 |
| File uploads | Presigned URL pattern — never route bytes through backend | Section 12 |
| Error handling | Global filter + Error Boundary + 3-state components | Section 13 |
| Icons | `lucide-react` and `react-icons/fa` only | Section 16 |
| UI quality | Read `AVOID_AI_SLOP.md` before building anything | Section 17 |