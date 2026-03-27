# Architecture & Technology Stack

## System Overview

```
                    ┌─────────────┐
                    │   Browser   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Cloudflare │ (CDN + DDoS)
                    └──────┬──────┘
                           │
               ┌───────────▼───────────┐
               │   Next.js Frontend    │ ← Vercel
               │  (React + TypeScript) │
               └───────────┬───────────┘
                           │ API calls
               ┌───────────▼───────────┐
               │   NestJS Backend API  │ ← Render
               │     (TypeScript)      │
               └──┬────────┬───────────┘
                  │        │
        ┌─────────▼──┐ ┌───▼──────┐
        │ PostgreSQL │ │  Redis   │
        │ (Database) │ │  (Cache) │
        └────────────┘ └──────────┘
```

---

## Frontend Architecture

**Framework:** Next.js 14 (App Router)

### Folder Structure
```
frontend/
├── app/                    # Pages (App Router)
│   ├── layout.tsx          # Root layout (shared header/footer)
│   ├── page.tsx            # Homepage /
│   ├── login/
│   │   └── page.tsx        # /login
│   ├── signup/
│   │   └── page.tsx        # /signup
│   ├── dashboard/
│   │   └── page.tsx        # /dashboard
│   ├── courses/
│   │   ├── page.tsx        # /courses (browse)
│   │   └── [id]/
│   │       └── page.tsx    # /courses/:id (detail)
│   └── api/                # API routes (Next.js)
├── components/             # Reusable UI components
│   ├── ui/                 # Base components (buttons, inputs)
│   ├── layout/             # Header, Footer, Sidebar
│   └── features/           # Feature-specific components
├── lib/                    # Utilities, helpers, API client
├── hooks/                  # Custom React hooks
├── store/                  # Redux state management
├── types/                  # TypeScript types
└── public/                 # Static assets
```

---

## Backend Architecture

**Framework:** NestJS (TypeScript)

### Folder Structure
```
backend/
├── src/
│   ├── main.ts             # Entry point
│   ├── app.module.ts       # Root module
│   ├── auth/               # Authentication module
│   ├── users/              # Users module
│   ├── courses/            # Courses module
│   ├── payments/           # Payments module
│   ├── ai/                 # AI features module
│   └── common/             # Shared utilities, guards, interceptors
├── prisma/
│   └── schema.prisma       # Database schema
└── test/                   # Tests
```

---

## Database Schema (Phase 1)

```
users
├── id, email, password_hash
├── name, avatar, bio, role
└── created_at, updated_at

courses
├── id, title, description, price
├── instructor_id → users.id
├── thumbnail, status (draft/published)
└── created_at, updated_at

lessons
├── id, course_id → courses.id
├── title, video_url, duration, order
└── created_at

enrollments
├── id, user_id → users.id
├── course_id → courses.id
├── progress (0-100), completed_at
└── enrolled_at

payments
├── id, user_id, course_id
├── amount, currency, status
├── stripe_payment_id
└── created_at

reviews
├── id, user_id, course_id
├── rating (1-5), comment
└── created_at
```

---

## Authentication Flow

```
User signs up/logs in
        ↓
Firebase Auth (handles social login, email verification)
        ↓
Returns Firebase token
        ↓
Frontend sends token to NestJS backend
        ↓
Backend verifies with Firebase Admin SDK
        ↓
Issues JWT token for subsequent requests
        ↓
JWT stored in httpOnly cookie
```

---

## Deployment Architecture

| Service | Platform | Auto-Deploy |
|---------|----------|-------------|
| Frontend | Vercel | ✅ On push to `main` |
| Backend | Render | ✅ On push to `main` |
| Database | AWS RDS / Render PostgreSQL | Manual |
| Cache | Redis Cloud / Render Redis | Manual |
