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
```bash
git checkout staging
git pull origin staging
git merge main
git push origin staging
```

Then test on: https://upskiill-git-staging-upskiill201s-projects.vercel.app/

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
