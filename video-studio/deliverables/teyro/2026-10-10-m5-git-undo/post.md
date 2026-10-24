# How to undo anything in Git: Motion Explainer post kit

**Account:** Teyro
**Promotes:** the free Teyro course **Learn Git, GitHub and GitHub Actions**
**Video file:** `undo-anything-in-git.mp4` (1080×1920, 30 fps, H.264 + AAC, 2:11). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg`. Frame 0 = the hook: "UNDO ANYTHING IN GIT · I WISH I KNEW THIS SOONER" with a failed push, a folder heading for the trash and a big UNDO key.
**Hook:** "I wish someone told me this before I started coding. You can undo almost anything in Git." (founder template)
**Narrator:** Liam (ElevenLabs) · **Host:** Remi
**QA:** see the table at the bottom

---

## Instagram

**Caption** (paste as-is)
```
I wish someone told me this before I started coding 😮‍💨
You can undo almost anything in Git 👇

1 · Committed too early → git commit --amend (or git reset --soft HEAD~1)
2 · Staged the wrong file → git restore --staged <file>
3 · Broke a file → git restore <file> (careful: uncommitted work is gone. Not sure? git stash)
4 · Already pushed → git revert <commit>, never reset shared history
5 · Deleted a branch → git reflog, then git branch rescued <commit>

Git doesn't punish mistakes. It just needs you to commit.

Save this for your next "oh no" moment. Send it to the friend who deletes the folder and starts over.
Learn Git, GitHub and GitHub Actions free on Teyro (link in bio).

Which oh-no have you hit the most? 1-5 👇

#git #github #coding #learntocode #teyro
```

**Pinned comment**
```
Save this cheat sheet 📌 Quick one: which of the 5 oh-no moments have you hit? Drop the number 👇
```

**Alt text**
```
Animated explainer on a dark background: Git's working area, staging area and commits are shown as three panels, files move between them as five common mistakes are fixed with git commit --amend, git reset --soft, git restore --staged, git restore or git stash, git revert, and git reflog.
```

---

## TikTok
**Caption**
```
How to undo anything in Git: 5 oh-no moments and the exact command for each #git #coding #learntocode #teyro
```
**Pinned comment**
```
Which oh-no have you hit the most? 1-5 👇
```

---

## Reply bank (first hour)
- **"What app is this?"** → It's Teyro. Learn Git, GitHub and GitHub Actions is a free course there: short lessons, a few minutes a day. Link in bio.
- **"What about git checkout -- file?"** → That's the older way. Since Git 2.23, `git restore` does the same job with a clearer name.
- **"Can't I just reset and force push?"** → On your own branch, sometimes. On shared branches it rewrites history your teammates already have; `git revert` is the safe default.
- **"Does reflog work after I deleted the repo?"** → No: the reflog lives inside your local `.git` folder. Delete the folder and it's gone (that's why we say: don't delete the folder!).
- **"30 days? I read 90"** → Both are defaults: entries still reachable from your branches are kept 90 days, lost/unreachable ones 30 days (git gc docs).
- **"Does it work for beginners?"** → Yes. The course starts from your first commit.

## Facts check
| Claim in video | Source (checked 2026-10-10) |
|---|---|
| `git commit --amend` replaces the last commit (forgot a file / typo) | Pro Git, "Undoing Things" |
| `git reset --soft HEAD~1` undoes a commit, keeps changes | git-scm.com/docs/git-reset ("Undo a commit and redo") |
| `git restore --staged` unstages; `git restore` discards uncommitted changes | Pro Git, "Undoing Things"; git-scm.com/docs/git-restore |
| `git stash` saves uncommitted changes to bring back later | git-scm.com/docs/git-stash |
| `git revert` adds a new commit that reverses an earlier one | git-scm.com/docs/git-revert |
| Don't rewrite history you've already pushed | Pro Git, "Rewriting History" |
| Reflog records every HEAD move; recover a deleted branch with reflog + `git branch` | Pro Git, "Data Recovery"; git-scm.com/docs/git-reflog |
| Amend-overwritten commits are recoverable; committed = almost always recoverable, never committed = likely gone | Pro Git, "Undoing Things" |
| Lost (unreachable) reflog entries kept 30 days by default | git-scm.com/docs/git-gc (gc.reflogExpireUnreachable) |
| Commit IDs, file names, branch names | example values |
| Course "Learn Git, GitHub and GitHub Actions" is free | founder (2026-10-10) |

## QA (`pipeline/motion/qa.mjs`, 2026-10-10)
| Gate | Result |
|---|---|
| Length 2:00–2:58 | ✓ 2:11 |
| Visual events ≥ 1.5 / s | ✓ 2.02 / s (one every 0.50 s) |
| Longest still ≤ 2.5 s | ✓ 1.8 s |
| Near-still frames 55–80 % | ✓ 70 % |
| No hard cuts | ✓ none |
| Loudness −14 ±0.5 LUFS | ✓ −14.0 LUFS |
| LRA ≤ 3 LU | ✓ 1.2 LU |
| No silence ≥ 0.5 s | ✓ none |
