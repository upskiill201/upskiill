# Teyro / Upskiill Codebase Agent Guide

Welcome to the Teyro/Upskiill codebase! This guide is for AI agents (like Jules) interacting with the repository to understand the stack, architecture, workflows, and **Production Principles**.

---

## 🛑 STRICT PRODUCTION PRINCIPLES (MUST READ)

The following principles from `docs/PRODUCTION_PRINCIPLES.md` are non-negotiable for all agents working on this project:

### 1. STRICT BACKEND URL RULE
All frontend fetch calls MUST use `https://upskiill-backend.onrender.com` ALWAYS.
NEVER point to the local backend on `localhost:3001` ever, even during local development and testing.

### 2. STRICT BRANCHING RULE
All work must always be pushed to a new branch to facilitate Pull Requests (PR), Code Reviews, and optimization BEFORE merging into the main branch. Direct pushes to the main branch are strictly prohibited.

### 3. COMPONENT SYSTEM & REUSE
- All UI components use the established design system with 10px rounded corners, 48px input height, and brand colors.
- **Component Reuse Principle:** Before creating any new UI component, check if an existing component in `components/ui/` or `components/features/` meets the requirements. Only create new ones if necessary.

### 4. ESTABLISHED ICON SYSTEM
Only TWO icon libraries are used across the entire codebase:
- **Lucide React** (`lucide-react`): For all UI & form icons.
- **React Icons FA6** (`react-icons/fa`): For feature, brand & social icons.
No emojis should be used as icons.

### 5. LOGO ASSET PRINCIPLE
The official Teyro logo asset is located at `frontend/public/teyro-logo-blue.png` (Note: ensure you are referencing the correct updated name if changed).

### 6. SEEDING POLICY
Do NOT run `deleteMany()` at the start of the seeder as a default. Use `upsert()` or existence checks for core test data.

### 7. AVOID AI SLOP (MANDATORY UI PRE-CHECK)
Before building any UI component, you MUST consult `docs/AVOID_AI_SLOP.md`. Banned patterns include generic purple/blue gradients, non-structural glassmorphism, default 3-card grids, sterile oversized spacing, and Shadcn-clone navigation. Violating this will result in rejected code.

---

## Stack Overview
The project is organized into a monorepo structure.

### Frontend (`/frontend/`)
- **Framework:** Next.js (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** CSS Modules & Tailwind CSS
- **Authentication:** Firebase Auth and Supabase
*Note: See `frontend/AGENTS.md` for Next.js-specific instructions.*

### Backend (`/backend/`)
- **Framework:** NestJS
- **Database/ORM:** Prisma

---

## How to Run Local Development

### Running the Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Setup environment variables: `cp .env.example .env.local`
4. Start the dev server: `npm run dev` (Runs on `http://localhost:3000`)

To build the frontend, be sure to provide the required Supabase environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost NEXT_PUBLIC_SUPABASE_ANON_KEY=local npm run build
```

### Running the Backend
*Note: Due to Principle 1, you rarely need to run the local backend for frontend tasks, as the frontend uses the live Render backend.*
- `cd backend && npm install && npm run start:dev`

---

## General Guidelines
- **Verification:** Always use playwright to write automated test scripts and capture video / screenshots when making visual changes to the UI (`frontend_verification_instructions`).
- **Tests:** Always run the respective `npm test` or `npm run build` commands in the directory you're working on to ensure code changes don't introduce typescript errors.
- **Pull Requests / Submitting:** Ensure tests pass and the build succeeds before calling the submit tool.