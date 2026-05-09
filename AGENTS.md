# Teyro / Upskiill Codebase Agent Guide

Welcome to the Teyro/Upskiill codebase! This guide is for AI agents (like Jules) interacting with the repository to understand the stack, architecture, and workflows.

## Stack Overview
The project is organized into a monorepo structure with a frontend and backend directory.

### Frontend
- **Framework:** Next.js (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** CSS Modules & Tailwind CSS
- **Authentication:** Firebase Auth and Supabase
- **Location:** `/frontend/`

*Note: The frontend project currently runs on Next.js 16.2.1. See `frontend/AGENTS.md` for Next.js-specific instructions.*

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database/ORM:** Prisma
- **Location:** `/backend/`

## How to Run Local Development

### Running the Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies (if you haven't already): `npm install`
3. Setup environment variables by copying the example: `cp .env.example .env.local`
4. Start the development server: `npm run dev` (Runs on `http://localhost:3000`)

To build the frontend, be sure to provide the required Supabase environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost NEXT_PUBLIC_SUPABASE_ANON_KEY=local npm run build
```

### Running the Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run start:dev` (Runs on port 5000 typically)

## General Guidelines
- **Verification:** Always use playwright to write automated test scripts and capture video / screenshots when making visual changes to the UI (`frontend_verification_instructions`).
- **Tests:** Always run the respective `npm test` or `npm run build` commands in the directory you're working on to ensure code changes don't introduce typescript errors.
- **Pull Requests / Submitting:** Ensure tests pass and the build succeeds before calling the submit tool.

## Useful Commands
- `cd frontend && npm run dev`
- `cd frontend && npm run build`
- `cd backend && npm run start:dev`