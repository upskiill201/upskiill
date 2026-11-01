# Git can undo almost anything: 4 commands: post kit

**Account:** Teyro
**Video file:** `git-undo-commands.mp4` (1080×1920, 30 fps, H.264 + AAC, ~43 s). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg` (the full hook line + the terminal with the "lost" commits back; pick it as the Reel/TikTok cover)
**Hook type:** Curiosity + List/Number
**CTA type:** Link in bio

---

## Instagram

**Caption**
```
You didn't lose that code. Git secretly kept it. 4 commands that undo almost anything:

1. git reflog: a diary of everywhere your branch has been. Lost commits stay findable for 30 days by default.
2. git restore <file>: puts a file back the way it was before your edits.
3. git stash / git stash pop: park half-done work, switch branches, bring it back.
4. git revert <commit>: undo a commit you already pushed to GitHub, without rewriting history.

Send this to the friend who just ran git reset --hard.

Practise real code a few minutes a day: link in bio.

Which one would have saved you last month: 1, 2, 3 or 4?

#git #github #coding #programmingtips #teyro
```

**Pinned comment**
```
Which one would have saved you last month: 1, 2, 3 or 4?
```

**Alt text**
```
Animated explainer: Ada, a cartoon host, walks through four Git commands on recreated terminal screens: git reflog to recover commits after a bad reset, git restore to undo file edits, git stash to park work, and git revert to safely undo a commit already pushed to GitHub.
```

---

## TikTok

**Caption** (99 characters)
```
You didn't lose that code. 4 git commands that undo almost anything. #git #github #coding #teyro
```

**Pinned comment**
```
Which one would have saved you last month: 1, 2, 3 or 4?
```

---

## Reply bank (first hour)
- **"Does reflog work after I deleted the folder / cloned fresh?"** → No. The reflog is local to your machine's repo. If the .git folder is gone, so is the reflog.
- **"Why not git reset for pushed commits?"** → Reset rewrites history, so anyone who already pulled gets a mess and you'd need a force push. Revert adds a new commit instead, which is safe on shared branches.
- **"restore vs checkout?"** → `git restore` (Git 2.23+) does the file-undo part of the old `git checkout -- file`, with a clearer name.
- **"30 days or 90?"** → 90 days for entries still reachable from a branch, 30 days for unreachable ones (the "lost" commits). Both are defaults you can change.
- **"What app is this?"** → Teyro: short daily coding and AI lessons where you write and fix real code with instant feedback. Link in bio.

## Facts check
| Claim in video | Source (checked 2026-10-08) |
|---|---|
| Reflog records where your branch has been (local repo) | git-scm.com/docs/git-reflog |
| Lost commits kept 30 days by default | git-scm.com/docs/git-reflog (`gc.reflogExpireUnreachable` defaults to 30 days) |
| `git reset --hard HEAD@{1}` jumps back | git-scm.com/docs/git-reflog (HEAD@{n} syntax) + git-reset |
| restore puts a file back to before your edits | git-scm.com/docs/git-restore (restores working tree from the index by default) |
| stash parks changes; stash pop brings them back | git-scm.com/docs/git-stash |
| revert adds a new commit that undoes an earlier one | git-scm.com/docs/git-revert |
| Practise real code, a few minutes a day | teyro.app |
| Commit hashes, file names, branch names | Illustrative terminal recreations |
