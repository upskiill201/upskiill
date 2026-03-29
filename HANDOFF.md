# Upskiill — Session Handoff
> Last updated: 2026-03-29 02:54 WAT · Keep this file current at the end of every session.

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
- [x] Landing/home page (`/`) — premium design with hero section
- [x] Login page (`/login`) — split-panel UI, form with validation, JWT stored in localStorage
- [x] Signup page (`/signup`) — matching split-panel UI
- [x] Global header component
- [x] `NEXT_PUBLIC_API_URL` env var used for all API calls (falls back to `http://localhost:3001`)

### Auth Flow (Local & Live — working ✅)
- [x] Signup → POST `/auth/signup` → returns `{ access_token, user }`
- [x] Login → POST `/auth/login` → returns `{ access_token, user }`
- [x] Token stored in `localStorage` as `access_token`
- [x] Redirects to `/dashboard` (page currently 404)
- [x] Live Vercel frontend communicates correctly with Live Render backend

---

## 🟢 Current Status (2026-03-29 02:54 WAT)

### Authentication: ✅ Working (Local & Live)
The authentication flow is fully operational end-to-end. Connection issues with Supabase on Render have been resolved by using Connection Pooler URLs.

**Next Immediate Goal:** Build the `/dashboard` page to handle successful logins without showing a 404.

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
| `npm install --include=dev` on Render build | Build tools (`@nestjs/cli`, `tsc`) are devDeps but needed to compile |
| `render.yaml` at repo root | Render auto-detects it; `rootDir: backend` scopes it to the backend folder |
| `NEXT_PUBLIC_API_URL` env var | Allows same frontend code to target local or production backend without code changes |
| Supabase Pooler URLs | Fixes P1001 error and connection instability from cloud providers like Render |

---

## 🗂️ Key Files Reference

```
upskiill/
├── render.yaml                          # Render deploy config (rootDir: backend)
├── .gitignore                           # Ignores .env, .env.local, node_modules, dist
├── backend/
│   ├── .env                             # LOCAL ONLY — never committed
│   ├── src/
│   │   ├── main.ts                      # Entry: CORS, ValidationPipe, port binding
│   │   ├── app.module.ts                # Root module: PrismaModule + AuthModule
│   │   ├── auth/
│   │   │   ├── auth.controller.ts       # POST /auth/signup, POST /auth/login
│   │   │   ├── auth.service.ts          # Business logic: hash, compare, sign JWT
│   │   │   ├── auth.module.ts           # JwtModule, PassportModule, JwtStrategy
│   │   │   ├── dto/signup.dto.ts
│   │   │   └── dto/login.dto.ts
│   │   └── prisma/
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   └── prisma/schema.prisma             # User model definition
└── frontend/
    ├── .env.local                       # LOCAL ONLY — NEXT_PUBLIC_API_URL=http://localhost:3001
    ├── .env.example                     # Committed template for Vercel setup
    └── app/
        ├── page.tsx                     # Landing page
        ├── login/page.tsx               # Login form + split UI
        └── signup/page.tsx              # Signup form + split UI
```

---

## 🖥️ Local Dev Commands

```bash
# Terminal 1 — Frontend (runs on http://localhost:3000)
cd frontend && npm run dev

# Terminal 2 — Backend (runs on http://localhost:3001)
cd backend && npm run start:dev
```

Both must be running simultaneously for local auth to work.

---

## 🔗 Live URLs
- **Frontend:** https://upskiill.vercel.app
- **Backend:** https://upskiill-backend.onrender.com
- **Render health check:** https://upskiill-backend.onrender.com/ → should return `{ "message": "Hello World!" }`
- **GitHub:** https://github.com/upskiill201/upskiill
