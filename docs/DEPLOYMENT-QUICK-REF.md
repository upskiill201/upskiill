# Teyro Deployment Quick Reference

## The Flow in One Image

```
┌─ Your Laptop ──────────────────────────────────────────────────┐
│ Write code on: git checkout -b feature/your-feature            │
│ Commit: git add . && git commit -m "description"               │
│ Push: git push origin feature/your-feature                     │
│ Open PR on GitHub → CodeRabbit reviews → I (Joel) review       │
└────────────────────────────────────────────────────────────────┘
                              ↓
┌─ main Branch (Protected) ──────────────────────────────────────┐
│ ONLY JOEL can merge PRs to main                                │
│ (You cannot merge your own PR)                                 │
└────────────────────────────────────────────────────────────────┘
                              ↓
┌─ Staging: https://upskiill-git-staging-upskiill201s-projects.vercel.app/ ─┐
│ YOU deploy after I merge:                                      │
│ git checkout staging && git pull && git merge main && git push │
│ Vercel/Render auto-deploy in 1-2 minutes                       │
│ YOU test your feature end-to-end                               │
│ YOU tell me: "Feature X ready on staging"                      │
└───────────────────────────────────────────────────────────────┘
                              ↓
┌─ Production: https://teyro.app ────────────────────────────────┐
│ ONLY JOEL deploys after verifying staging                      │
│ Real users see the feature within 1-2 minutes                  │
└────────────────────────────────────────────────────────────────┘
```

---

## Who Can Do What

| Action | You | Joel |
|--------|-----|------|
| Create feature branch | ✅ | ✅ |
| Push to feature branch | ✅ | ✅ |
| Open Pull Request | ✅ | ✅ |
| Deploy to Staging | ✅ | ✅ |
| Test on Staging | ✅ | ✅ |
| **Merge PR to main** | ❌ | ✅ |
| **Deploy to Production** | ❌ | ✅ |

---

## Commands You Need

### Before Starting Work
```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature
```

### While Working
```bash
git add .
git commit -m "what you changed"
git push origin feature/your-feature
```

### Deploy to Staging (After I Merge Your PR)

Deploying to staging is **fully automated** from end to end once you push to the `staging` branch. Follow these steps:

1. **Pull Main & Push to Staging:**
   Bring the approved code from `main` into your local `staging` branch and push it:
   ```bash
   git checkout staging
   git pull origin staging
   git merge main
   git push origin staging
   ```

2. **Wait for Auto-Deployments:**
   Unlike production, **both the Frontend and Backend deploy automatically** as soon as you push to `staging`:
   - **Frontend:** Vercel immediately starts building the frontend.
   - **Backend:** A GitHub Action (`Deploy — Staging`) runs automatically to apply DB migrations and trigger the Render backend deployment.

3. **Test End-to-End:**
   Wait 1-2 minutes, then test your feature on: https://upskiill-git-staging-upskiill201s-projects.vercel.app/

### Deploy to Production (Admin Only)

Deploying to production requires updating the `main` branch and then manually triggering the backend deploy. Follow these exact steps:

1. **Push or Merge to Main:**
   Ensure your local `main` branch is up to date and push it to GitHub:
   ```bash
   git checkout main
   git pull origin main
   git merge staging   # (or merge your approved PR on GitHub)
   git push origin main
   ```

2. **Frontend Auto-Deploys:**
   As soon as `main` is pushed, **Vercel automatically deploys the Frontend**. You don't need to do anything else for the frontend.

3. **Trigger Backend & Migrations (Manual Safety Gate):**
   The **Backend** (Render) and Database Migrations do *not* auto-deploy. You must manually trigger them via GitHub Actions:
   - Open the repository on **GitHub.com**.
   - Go to the **Actions** tab at the top.
   - On the left sidebar, select **Deploy — Production**.
   - Click the **Run workflow** dropdown on the right.
   - Type **`DEPLOY`** in the confirmation field.
   - Click **Run workflow**.

This safely runs `prisma migrate deploy` on the production database and triggers Render to restart the backend API.

---

## Critical Rules

🔴 **NEVER DO THESE:**
- Push directly to `main`
- Merge your own PR
- Push directly to `production`
- Bypass staging
- Commit `.env` files
- Share API keys or passwords

---

## The Environments

| Env | Frontend | Backend | Database | For |
|-----|----------|---------|----------|-----|
| **Dev** | localhost:3000 | localhost:3001 | Your setup | Your laptop |
| **Staging** | upskiill-git-staging.vercel.app | upskiill-backend.onrender.com | teyro-staging | Testing |
| **Prod** | teyro.app | teyro-backend.onrender.com | teyro-production | Real users |

---

## If You Break Staging

1. Create a new feature branch: `git checkout -b fix/issue-name`
2. Fix the bug
3. Push and open PR
4. I review and merge
5. Redeploy: `git checkout staging && git pull && git merge main && git push`

**Do NOT hotfix staging directly.**

---

## Questions?

Ask in the team channel. 

The process protects real users. Follow it exactly.
