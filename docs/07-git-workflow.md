# Git Workflow — Team Guide

## Overview

This is how the Upskiill team works with Git and GitHub every day.
**Nobody pushes directly to `main`.** All code goes through a Pull Request.

---

## The Golden Rule

```
main branch = production code = what's live on the internet

Never commit directly to main.
Always create a branch → PR → review → merge.
```

---

## Daily Workflow (Step by Step)

### Step 1 — Always start from latest main
```bash
git checkout main
git pull origin main
```
> This makes sure you have the latest code before starting new work.

---

### Step 2 — Create your feature branch
```bash
git checkout -b feature/your-feature-name
```

**Branch naming rules:**
| Type | Format | Example |
|------|--------|---------|
| New feature | `feature/name` | `feature/login-page` |
| Bug fix | `fix/name` | `fix/video-not-loading` |
| UI/Design | `design/name` | `design/homepage-hero` |
| Docs | `docs/name` | `docs/update-readme` |

---

### Step 3 — Write your code
Work on your feature. Make small, focused changes.

---

### Step 4 — Save your work
```bash
git add .
git commit -m "short description of what you did"
```

**Good commit messages:**
```
✅ "add login page with email and password fields"
✅ "fix video player not loading on mobile"
✅ "update homepage hero section design"

❌ "changes"
❌ "fix stuff"
❌ "wip"
```

---

### Step 5 — Push your branch to GitHub
```bash
git push origin feature/your-feature-name
```

---

### Step 6 — Open a Pull Request on GitHub
1. Go to `https://github.com/upskiill201/upskiill`
2. Click **"Compare & pull request"**
3. Write a clear title and description
4. Click **"Create pull request"**

---

### Step 7 — Wait for CodeRabbit Review 🤖
CodeRabbit will automatically review your code within 30 seconds.
- Read its comments
- Fix any issues it flags
- Push your fixes (repeat Steps 4-5)

---

### Step 8 — Get Approval from Team Lead
The Tech Lead reviews your PR and either:
- ✅ **Approves** → you can merge
- 💬 **Requests changes** → fix the feedback and re-request review

---

### Step 9 — Merge
Once approved, click **"Merge pull request"** → **"Confirm merge"**

Vercel auto-deploys within ~1 minute 🚀

---

## Quick Reference Commands

```bash
# Check what branch you're on
git branch

# Check what files you've changed
git status

# See your changes
git diff

# Go back to main
git checkout main

# Get latest code from GitHub
git pull origin main

# Create a new branch
git checkout -b feature/my-feature

# Save changes
git add .
git commit -m "description"

# Upload to GitHub
git push origin feature/my-feature

# If you made a mistake on last commit
git commit --amend -m "corrected message"
```

---

## If You Have a Conflict

A conflict happens when two people changed the same file.

```bash
# 1. Get latest main
git checkout main
git pull origin main

# 2. Go back to your branch
git checkout feature/your-feature

# 3. Merge main into your branch
git merge main

# 4. VS Code will show conflict markers — resolve them
# 5. Then commit the resolved version
git add .
git commit -m "resolve merge conflict"
git push origin feature/your-feature
```

---

## Branch Lifecycle

```
main (protected — no direct push)
  │
  ├── feature/login-page       ← team member 1
  ├── feature/course-player    ← team member 2
  └── fix/payment-bug          ← team member 3
```

All branches are merged via PRs.
Old branches are deleted after merging.

---

## Team Responsibilities

| Role | Responsibility |
|------|---------------|
| **Tech Lead** | Review & approve all PRs, maintain `main` |
| **Developers** | Create branches, write code, open PRs |
| **Everyone** | Read CodeRabbit comments and fix issues |
