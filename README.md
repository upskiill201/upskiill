# Upskiill 2.0 🚀

> **Learn → Build → Earn** — Africa's leading AI-powered learning & marketplace platform.

---

## What is Upskiill?

Upskiill is a comprehensive web platform combining:
- 📚 **Course Marketplace** — Buy & sell online courses
- 🤖 **AI-Powered Learning** — Personal AI tutor, skill gap analyzer, learning paths
- 💼 **Student Marketplace** — Students sell services to clients after learning

---

## Project Structure

```
upskiill/
├── frontend/          # Next.js 14 + React + TypeScript (deployed on Vercel)
├── backend/           # NestJS + TypeScript (deployed on Render)
└── docs/              # Full project documentation & build guides
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + React + TypeScript |
| Backend | NestJS + TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Cache | Redis |
| Auth | Firebase Auth + JWT |
| Payments | Stripe + Paystack |
| AI | OpenAI GPT-4 API |
| Video | AWS S3 + CloudFront |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Live URLs

| Environment | URL |
|------------|-----|
| Frontend (Production) | https://upskiill.vercel.app |
| Backend API (Production) | https://upskiill-backend.onrender.com |

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm or pnpm
- Git

### Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:3000

### Run Backend
```bash
cd backend
npm install
npm run start:dev
```
Runs at: http://localhost:3001

---

## Build Roadmap

| Phase | Timeline | Focus | Status |
|-------|----------|-------|--------|
| Phase 1 | Months 1-3 | MVP Foundation | 🔨 In Progress |
| Phase 2 | Months 4-6 | AI & Engagement | ⏳ Planned |
| Phase 3 | Months 7-9 | Marketplace & Monetization | ⏳ Planned |
| Phase 4 | Months 10-12 | Scale & Optimization | ⏳ Planned |

---

## Documentation

| Doc | Description |
|-----|-------------|
| [Architecture](./docs/01-architecture.md) | Tech stack, system design, database schema |
| [Pages & Components](./docs/02-pages-and-components.md) | How to create pages & components |
| [**🎨 Color System**](./docs/08-color-system.md) | Brand colors, CSS variables, usage rules |
| [**📋 MVP Full Spec**](./docs/09-mvp-complete-spec.md) | All 14 pillars — every feature listed |
| [**📄 All Pages (49)**](./docs/10-all-pages.md) | Complete numbered page list with file paths |
| [**🔨 Build Workflow**](./docs/11-build-workflow.md) | UI design → code → PR → deploy process |
| [Phase 1 — MVP](./docs/03-phase1-mvp.md) | Phase 1 features with build order |
| [Phase 2 — AI Features](./docs/04-phase2-ai.md) | AI features in Months 4-6 |
| [Phase 3 — Marketplace](./docs/05-phase3-marketplace.md) | Marketplace features in Months 7-9 |
| [Phase 4 — Scale](./docs/06-phase4-scale.md) | Optimization in Months 10-12 |
| [**🌐 Hosting & Live Links**](./docs/13-hosting.md) | Where everything is hosted, env vars, local vs production |
| [**💰 Launch & Costs**](./docs/12-launch-and-costs.md) | Phase-by-phase costs, free alternatives, launch checklist |
| [Git Workflow](./docs/07-git-workflow.md) | Team git workflow & PR process |

---

## Team Workflow

1. Pick a task from the current phase
2. Create a branch: `git checkout -b feature/your-feature`
3. Build the feature
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request on GitHub
6. Wait for CodeRabbit AI review 🤖
7. Get approval from team lead
8. Merge → Auto-deploys to Vercel ✅

---

*Built with ❤️ for Africa*
