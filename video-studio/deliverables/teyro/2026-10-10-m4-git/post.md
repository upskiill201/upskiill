# The exact difference between Git and GitHub: Motion Explainer post kit

**Account:** Teyro
**Promotes:** the free Teyro course **Learn Git, GitHub and GitHub Actions** (Git → GitHub Actions, everything a beginner needs to collaborate as a software developer)
**Video file:** `git-vs-github.mp4` (1080×1920, 30 fps, H.264 + AAC, 2:23). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg`. Frame 0 = the hook: "GIT vs GITHUB · THE EXACT DIFFERENCE" with the Git (laptop) ≠ GitHub (website) tiles.
**Hook:** "This is the exact difference between Git and GitHub." (founder pick, "exact difference" template)
**Narrator:** Liam (ElevenLabs) · **Host:** Remi
**QA:** see the table at the bottom

---

## Instagram

**Caption** (paste as-is)
```
This is the exact difference between Git and GitHub 💻
Plus the robot that tests and ships your code 👇

Git = a tool on your laptop that remembers every version
GitHub = a website that keeps that history online for your team

1 · Commit: a save point for your whole project
2 · Branch: a safe parallel copy (just 41 bytes!)
3 · Push / pull: send it to GitHub, bring teammates' work down
4 · Pull request: ask before you change main
5 · Merge conflict: two people, same line, you pick
6 · GitHub Actions: tests + deploys on every push

Git saves your code. GitHub shares it. That's the difference.

Send this to the friend still naming files final_v2_REAL.
Learn Git, GitHub and GitHub Actions free on Teyro (link in bio).

Have you ever hit a merge conflict? 😅👇

#git #github #githubactions #learntocode #teyro
```

**Pinned comment**
```
Save this for your first team project. Quick one: what's the first git command you ever typed? 👇
```

**Alt text**
```
Animated explainer on a dark background: Git is shown as a laptop tracking commits and branches, GitHub as a website where a team pushes, pulls and reviews pull requests, and GitHub Actions as a robot that tests and deploys one line of code until the site is live.
```

---

## TikTok
**Caption**
```
The exact difference between Git and GitHub (and what GitHub Actions does) #git #github #learntocode #teyro
```
**Pinned comment**
```
What's the first git command you ever typed? 👇
```

---

## Reply bank (first hour)
- **"What app is this?"** → It's Teyro. Learn Git, GitHub and GitHub Actions is a free course there: short lessons, a few minutes a day. Link in bio.
- **"GitLab / Bitbucket do this too"** → True. They host Git repos like GitHub does. Git is the tool; these are websites built around it.
- **"Branches are 41 bytes? Really?"** → Yes: a branch is a tiny file holding a 40-character commit ID plus a newline (Pro Git, "Branches in a Nutshell").
- **"Isn't SHA-1 being replaced?"** → Git is adding SHA-256 support, but classic commit IDs are still 40-character SHA-1 hashes.
- **"Is the course really free?"** → Yes, it's free on Teyro.
- **"Does it work for beginners?"** → Yes. It starts from your first commit and goes all the way to GitHub Actions.

## Facts check
| Claim in video | Source (checked 2026-10-10) |
|---|---|
| Git stores snapshots; each commit has a 40-character SHA-1 ID | Pro Git, "What is Git?" |
| Git was built in 2005 by the Linux community (Linus Torvalds) | Pro Git, "A Short History of Git" |
| A branch is a 41-byte file pointing at a commit | Pro Git, "Branches in a Nutshell" |
| 180 million-plus developers build on GitHub | GitHub Octoverse 2025 |
| GitHub Actions = CI/CD: automate build, test, deploy; workflows in .github/workflows | GitHub Docs, "Understanding GitHub Actions" |
| Commit IDs, repo, PR #12, YAML file, kemi.github.io | example values, labelled "example" where shown |
| Teyro course "Learn Git, GitHub and GitHub Actions" is free, Git → Actions | founder (2026-10-10) |
| Teyro: "a few minutes a day" | teyro.app (2026-10-10) |

## QA (`pipeline/motion/qa.mjs`, 2026-10-10)
| Gate | Result |
|---|---|
| Length 2:00–2:58 | ✓ 2:23 |
| Visual events ≥ 1.5 / s | ✓ 1.57 / s (one every 0.64 s) |
| Longest still ≤ 2.5 s | ✓ 1.5 s |
| Near-still frames 55–80 % | ✓ 78 % |
| No hard cuts | ✓ none |
| Loudness −14 ±0.5 LUFS | ✓ −14.0 LUFS |
| LRA ≤ 3 LU | ✓ 1.4 LU |
| No silence ≥ 0.5 s | ✓ none |
