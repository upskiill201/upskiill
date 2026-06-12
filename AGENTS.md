# Teyro / Upskiill Codebase Agent Guide

Welcome to the Teyro codebase. This guide is for AI agents interacting with the repository to understand the stack, architecture, workflows, and Production Principles.

> **Primary source of truth:** `CLAUDE.md` (full context) and `docs/PRODUCTION_PRINCIPLES.md` (rules and reasoning).
> Read both before writing any code.

---

## 🛑 STRICT PRODUCTION PRINCIPLES (MUST READ)

The following principles are non-negotiable for all agents working on this project.

### 1. API URL RULE ⛔ Hard Stop

**The old rule ("always use the production backend URL, even locally") is RESCINDED.** It was architecturally wrong.

The correct rule: **always read the API URL from `process.env.NEXT_PUBLIC_API_URL`** — never hardcode any URL in source code.

```typescript
// ✅ CORRECT
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);

// ⛔ WRONG — never do this
const res = await fetch('https://upskiill-backend.onrender.com/courses');
const res = await fetch('http://localhost:3001/courses');
```

Environments:
- **Development**: `NEXT_PUBLIC_API_URL=http://localhost:3001`
- **Staging**: `NEXT_PUBLIC_API_URL=https://teyro-backend-staging.onrender.com`
- **Production**: `NEXT_PUBLIC_API_URL=https://upskiill-backend.onrender.com`

### 2. BRANCHING RULE ⛔ Hard Stop
All work must always be pushed to a new branch to facilitate Pull Requests (PR), Code Reviews, and optimization BEFORE merging into the main branch. Direct pushes to the main branch are strictly prohibited.

### 3. DATABASE RULE ⛔ Hard Stop
- Never run `prisma db push` on any environment with real user data
- Never run `prisma migrate reset` on production or staging
- Use `prisma migrate dev` locally, `prisma migrate deploy` in CI/CD
- Every migration is a committed file — never a one-off manual SQL command
- See `docs/PRODUCTION_PRINCIPLES.md` Section 4 for the full migration discipline

### 4. COMPONENT SYSTEM & REUSE
- All UI components use the established design system with 10px rounded corners, 48px input height, and brand colors.
- **Component Reuse Principle:** Before creating any new UI component, check if an existing component in `components/ui/` or `components/features/` meets the requirements. Only create new ones if necessary.

### 5. ESTABLISHED ICON SYSTEM
Only TWO icon libraries are used across the entire codebase:
- **Lucide React** (`lucide-react`): For all UI & form icons.
- **React Icons FA6** (`react-icons/fa`): For feature, brand & social icons.
No other icon library. No emojis as icons.

### 6. LOGO ASSET PRINCIPLE
The official Teyro logo asset is located at `frontend/public/Teyro Logo.png`.
All references to the logo must use this exact path.

### 7. SEEDING POLICY ⛔ Hard Stop
Every seed script must check `NODE_ENV` and throw immediately if it is `'production'`.
Use `upsert()` for all seed data — never `deleteMany()` followed by `create()`.

### 8. AVOID AI SLOP (MANDATORY UI PRE-CHECK) ⛔ Hard Stop
Before building any UI component, you MUST consult `docs/AVOID_AI_SLOP.md`. Banned patterns include generic purple/blue gradients, non-structural glassmorphism, default 3-card grids, sterile oversized spacing, and Shadcn-clone navigation. Violating this will result in rejected code.

---

## Stack Overview
The project is organized into a monorepo structure.

### Frontend (`/frontend/`)
- **Framework:** Next.js 14 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** CSS Modules & Tailwind CSS v4
- **Animations:** Framer Motion (micro-animations), GSAP (complex sequences), Rive (looping icons)
- **State:** Redux
- **Authentication:** Firebase Auth (client-side identity) + NestJS JWT (session cookie)

### Backend (`/backend/`)
- **Framework:** NestJS 11
- **Database/ORM:** PostgreSQL (Supabase) + Prisma
- **Auth:** Firebase Admin SDK for token verification, then NestJS JWT in httpOnly cookie

---

## How to Run Local Development

### Running the Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Setup environment variables: `cp .env.example .env.local`
4. Set `NEXT_PUBLIC_API_URL=http://localhost:3001` in `.env.local`
5. Start the dev server: `npm run dev` (runs on `http://localhost:3000`)

To build the frontend, provide the required environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost NEXT_PUBLIC_SUPABASE_ANON_KEY=local npm run build
```

### Running the Backend
```bash
cd backend && npm install && npm run start:dev
```
The backend runs on `http://localhost:3001`. The frontend `.env.local` must point to this for local development.

---

## General Guidelines
- **Verification:** Always use Playwright to write automated test scripts and capture video/screenshots when making visual changes to the UI.
- **Tests:** Always run the respective `npm test` or `npm run build` in the directory you're working on to ensure code changes don't introduce TypeScript errors.
- **Pull Requests / Submitting:** Ensure tests pass and the build succeeds before calling the submit tool.