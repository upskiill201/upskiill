# Vibe Coding: Build Apps with AI — Course Outline

> AI category, short format. **Status: WRITTEN (2026-10-24), committed on `feat/vibe-coding-original`, not pushed.**
> Rules: docs/ORIGINALS_PLAYBOOK.md (§4–§8a). Cast: docs/originals/CAST.md ("The Esplanade Brass").
> Sits next to Working with AI Coding Agents (The Delivery Board). That course practises agent habits on a simulated agent in the browser and assumes some Python. **This one assumes nothing**: the learner installs a real AI coding tool on their own computer and ships real software with it.

## Why this course

"Vibe coding" means building software by describing what you want to an AI and letting it write the code. It's real: people with no programming background now ship working sites and apps this way. It also goes wrong in very predictable ways: a page that looks right and adds numbers wrong, a "fixed it!" that fixed nothing, a whole project rewritten at midnight with no way back, a database anyone on the internet can read, a secret key pushed to GitHub.

This course teaches a beginner to do it properly, with one real tool, on their own machine, from install to a live app with data and login.

| | |
|---|---|
| **Course title** | **Vibe Coding: Build Apps with AI** |
| **Storyline** | **Second Line** |
| Tagline | *No coding background. Eight weeks. One real app, live.* |
| Course-page hook | "Build real apps with an AI coding tool, even if you've never coded. Install it, brief it, check its work, test it, fix it when it's wrong, keep it safe, and put your app live." |

## The tool: Claude Code, and why

Founder brief: "niche down, choose one, make the learner know why." The course teaches **Claude Code** (Anthropic's AI coding tool). Lesson 1.2 explains the choice to the learner; lesson 8.8 shows how every skill moves to other tools.

Compared (checked on the web, October 2026): Claude Code, OpenAI Codex (CLI and app), Cursor, GitHub Copilot agent mode in VS Code, Replit Agent, Lovable, Bolt, Gemini CLI.

**Why Claude Code for this course:**
1. **Your computer, your files.** It works in a folder on the learner's own machine. What they build is ordinary files they own, can open, back up with git and put live anywhere. Browser builders (Lovable, Bolt, Replit Agent) are faster to a first demo, but the app lives on their platform and hides the parts a learner needs to understand to fix and secure it.
2. **A real agent, the way professionals work.** It reads the whole project, plans, edits several files, runs commands and tests, and reports back. The habits the course builds (brief, plan, review, test, commit) are the ones teams now hire for.
3. **A beginner on-ramp without a dead end.** There's a desktop app (Code tab on Mac and Windows, Linux in beta at the time of writing) with no terminal needed and visual before/after changes, and the terminal version, which works on Mac, Windows and Linux. The course teaches the terminal (it's the same everywhere) and notes the desktop route.
4. **Safe by default.** It asks before editing files or running commands, has a plan-only mode, and keeps checkpoints you can rewind.
5. **Honest cost.** It is **not free**: it needs a paid Claude plan (the cheapest, Pro, was about $20 a month at the time of writing) or pay-as-you-go API credits. The course is designed to be done inside one month of the cheapest plan, and says so. If cost is a blocker, lesson 1.3 names a free alternative (GitHub Copilot's free plan in VS Code has an agent mode with a small monthly allowance) and promises, truthfully, that the skills transfer.

**Neutrality note for the founder:** this course was drafted by Claude, which makes Claude Code. The reasons above stand on their own (own-machine files, agent workflow, desktop on-ramp, permission prompts), and the cost downside is stated plainly, but the choice is the founder's to overrule. Swapping the tool means rewriting about 12 lessons with tool-specific commands (1.2–1.4, 1.6, 1.9, 2.4, 2.6, 4.2, 6.6, 8.6, 8.7, 8.8); the other 68 are tool-neutral habits.

### Facts policy (this field moves monthly)

- **Prices appear in one place only: lesson 1.3**, phrased "at the time of writing (October 2026)", with the advice to check the pricing page. Everywhere else says "your plan's limits".
- Commands and keys used, all from the official docs (code.claude.com, checked October 2026): install `curl -fsSL https://claude.ai/install.sh | bash` (Mac/Linux) and `irm https://claude.ai/install.ps1 | iex` (Windows PowerShell); `claude --version`; `claude` in a project folder; Shift+Tab to cycle modes (incl. plan mode); Esc Esc or `/rewind` for checkpoints; `/init` for CLAUDE.md; `/clear`, `/compact`, `/usage`, `/model`, `/help`; `@` to mention a file; `!` to run a shell command. Each lesson that uses one says "at the time of writing" in its notes and teaches `/help` as the way to check.
- Checkpoints don't undo changes made by shell commands, and the docs say they are not a replacement for git (taught in 4.2).
- Stack for the real app (Chapters 5–8): plain HTML, CSS and JavaScript, **Supabase** for the database and email login, **Vercel** for hosting, **GitHub** for the code. All have free plans with limits; no numbers quoted. Vercel's free Hobby plan is for personal, non-commercial projects (stated in 8.3 with "check the terms").
- No vendor logos. No productivity statistics.

## How "practical" works

The phone teaches; the computer builds. Every lesson:
- **In the app:** real artefacts to judge: prompts to choose and build, AI replies and diffs to check, terminal output to read, bugs to spot, steps to put in order.
- **On your computer (Deepen):** one small real step in the learner's own project, with the exact prompt or command.
- **Every chapter ends with something the learner built on their own machine** (the Unit Challenge's Deepen is the chapter's build):

| Ch | The learner ships |
|---|---|
| 1 | A one-page personal site, made with Claude Code, open in their browser |
| 2 | A small tool of their own (a tracker or calculator) built from a planned brief |
| 3 | The same tool with a checklist and automated tests that pass |
| 4 | The project in git, backed up on GitHub, with a branch merged |
| 5 | A real app with a database and email login, running on their machine |
| 6 | A bug found, reproduced, fixed and covered by a test |
| 7 | The app's security pass: secrets out of the code, database rules on, a dependency checked |
| 8 | The app live on the internet at a real address |

No AI is called inside Teyro (Phase One guard): in-app AI replies are written examples.

## The story: Second Line

**New Orleans, USA. Eight weeks.** The Esplanade Brass, the brass band at Esplanade High School, has been invited to the National Brass Showcase in Washington, D.C. Twenty-four kids, a bus, three nights in a hotel: **$18,000**. The band's whole fundraising system is a clipboard: gig sign-ups, parent volunteers and pledges on paper. On the first Saturday, a second line parade in the rain turns the clipboard into pulp, two gigs get double-booked, and $1,400 of pledges are lost.

**Hazel Broussard**, the band director, has never written a line of code. Her trumpet captain, Benny, says, "Just vibe code it, Miss B." So she does: one real AI coding tool, one chapter a week, until the band's app is live.

| Character | Role |
|---|---|
| **Hazel** (lead) | Band director, 29. Learns to build with an AI from zero. Arc: from "make it do everything" to someone who briefs, checks, tests and ships, and explains why her app is safe. |
| **Benny** | Trumpet, band captain, 16. Fast, fearless, "just ship it". The first user and the bug-finder. Arc: learns why "it works on my phone" isn't a test. |
| **Ruth** | Booster club treasurer, 66, retired software engineer (32 years, mostly banks). Sceptical of AI ("Show me."). The reviewer. Arc: from "I don't trust it" to "I don't trust it *unchecked*", and the one who signs off launch. |
| **Tey** | Teaches in chat cards; narrates. |
| Principal Dupree, Mr Lionel (Crescent Coach Lines), parents | Narrated only. |

### Running device

Hazel's **brief card**, a sticky note on her laptop that grows each chapter (v1 in Ch2 → v8 at launch: goal, context, limits, done when, checks, commit, secrets, deploy).

Fundraising thermometer on the map markers: "8 weeks to go" → "Showcase week".

## The course at a glance

| | |
|---|---|
| Who it's for | Complete beginners with a computer (Mac, Windows or Linux) who want to build real things with AI: founders, creators, students, career-changers. Also coders new to AI tools, who can jump ahead. |
| End outcome | Plan, build, check, test, fix, secure and put live a small real app with an AI coding tool, and explain why you trust it. |
| Size | **8 chapters × 10 lessons = 80 lessons** (short format: Checkpoint at 5, Chapter Challenge at 10). |
| Lesson length | 10–15 minutes, ~10 exercises, at least 4 types |
| Free | Chapter 1, lessons 1–5 (install and first site happen in the free stretch) |

**Why 8 × 10:** the founder's checklist has nine topics (setup; prompting and planning; reading and checking; testing; debugging; git; security; deploying; costs). Five chapters (the usual short course) would cram three of them into single lessons; the full 10–15 × 20 format would bury a beginner before they ship anything. Eight short chapters gives each topic a chapter (checking + testing share one; deploy + costs share the last), keeps a real build at the end of every chapter, and is about the size of two short courses, which fits "signature course" and "done inside one month of the cheapest plan".

## Chapters

| # | Chapter | Marker | Learners can... |
|---|---|---|---|
| 1 | The Clipboard | 8 weeks to go | Install Claude Code, start it in a project folder, and build and change a one-page site |
| 2 | Too Many Ideas | 7 weeks to go | Write a brief (goal, context, limits, done when), plan first, and build a small tool step by step |
| 3 | It Looks Right | 6 weeks to go | Read what the AI changed, check it against the brief, and make tests the judge |
| 4 | The Night It Broke | 5 weeks to go | Use checkpoints and git: commit, branch, undo and back up to GitHub |
| 5 | The Real App | 4 weeks to go | Build an app with a database and email login, one layer at a time |
| 6 | The Fix Loop | 3 weeks to go | Debug with the AI: real errors, reproduce, stop fix loops, take over |
| 7 | Locks on the Doors | 2 weeks to go | Keep secrets out, turn on database rules, distrust pasted text and unknown packages |
| 8 | Showcase Week | Showcase week | Put the app live, watch costs and limits, and keep building with any tool |

### Chapter 1 — The Clipboard (8 weeks to go)
*Rain at the second line. The clipboard dies. Benny: "Just vibe code it." Climax: Hazel's own lessons page opens in her browser, made by an AI, changed by her words.*
1. Just vibe code it (myth/fact: what vibe coding is and isn't) · 2. Why Claude Code (reading: the choice, and what transfers) · 3. What you need (cards: computer, plan, terminal; the one place prices live) · 4. Install it (steps) · **5 Checkpoint: Saturday morning** · 6. A folder and a first hello (tap to explore: the first session) · 7. The first prompt (story: a one-page site) · 8. Ask for changes, not restarts (before/after) · 9. Who's allowed to do what (chat: permission modes) · **10 Chapter Challenge: Hazel's page** (build: personal one-page site)

### Chapter 2 — Too Many Ideas (7 weeks to go)
*Hazel asks for "an app that does everything for the band" and gets a 14-file mess she can't follow. Ruth: "What's it for? Who uses it? When is it done?" Climax: brief card v1 and a working fundraising thermometer and gig-fee calculator.*
1. Make it do everything (story) · 2. The brief: goal, context, limits, done when (cards) · 3. Examples beat adjectives (before/after) · 4. Plan first (steps: plan mode) · **5 Checkpoint: the booster meeting** · 6. CLAUDE.md, the project's memory (tap to explore) · 7. One step at a time (chat) · 8. Let it ask you questions (myth/fact) · 9. Reading a plan before you say yes (reading) · **10 Chapter Challenge: the thermometer** (build: a small tool)

### Chapter 3 — It Looks Right (6 weeks to go)
*The thermometer says the band has hit $18,000. They have $1,800. "1200" + "600" became "1200600". Climax: Ruth's checklist, and tests that catch it.*
1. $18,000 (story) · 2. What did it actually change? (tap to explore a diff) · 3. Ask it to explain (chat) · 4. Check it against the brief (before/after) · **5 Checkpoint: Benny's numbers** · 6. Test it like a user (steps: a manual checklist) · 7. Edge cases (myth/fact) · 8. Automated tests, written by the AI, judged by you (cards) · 9. "All tests pass" (reading: claims vs proof, and tests that were weakened) · **10 Chapter Challenge: Ruth signs off** (build: checklist + passing tests)

### Chapter 4 — The Night It Broke (5 weeks to go)
*Midnight: "make it look more professional". The AI rewrites everything; the thermometer vanishes the night before the booster meeting. Climax: rewind, then git, then a backup nobody can rain on.*
1. Make it look professional (story) · 2. Checkpoints and rewind (cards) · 3. Git in plain words (myth/fact) · 4. Your first commit (steps) · **5 Checkpoint: the morning after** · 6. Commit little, commit often (chat) · 7. Undo with git (before/after) · 8. GitHub: the backup off your laptop (tap to explore: a repo page) · 9. Branches: try things safely (reading) · **10 Chapter Challenge: never again** (build: repo on GitHub, a branch merged)

### Chapter 5 — The Real App (4 weeks to go)
*Thirty parents want to sign up for gigs from their phones. A web page can't remember anything. Climax: sign-ups saved in a real database, with email login.*
1. A page can't remember (story) · 2. Front end, back end, database (cards) · 3. Choosing the stack with the AI (chat) · 4. Your database on Supabase (steps) · **5 Checkpoint: the first sign-up** · 6. Tables for the band (tap to explore) · 7. Login by email link (reading) · 8. Building in layers (before/after) · 9. Environment variables: settings outside the code (myth/fact) · **10 Chapter Challenge: thirty parents** (build: app with data + login, local)

### Chapter 6 — The Fix Loop (3 weeks to go)
*The login link doesn't arrive and sign-ups appear twice. The AI tries five fixes; each breaks something new. Climax: Hazel stops the loop, reproduces it, and gives one precise fix.*
1. The fifth fix (story) · 2. Give it the real error (before/after) · 3. The browser console (steps) · 4. Reproduce first (cards) · **5 Checkpoint: double bookings** · 6. Stop the loop: rewind, fresh session (chat) · 7. Ask why, not "fix it" (myth/fact) · 8. When to take over (reading) · 9. A test for every bug (tap to explore) · **10 Chapter Challenge: the Friday bug** (build: one bug fixed + a test)

### Chapter 7 — Locks on the Doors (2 weeks to go)
*Benny opens the app on his phone and can read every parent's phone number, and delete them. Ruth finds the secret key on GitHub. Climax: a security pass Ruth would sign.*
1. Benny can see everything (story) · 2. Secrets: never in code, chats or GitHub (cards) · 3. The key on GitHub (steps: rotate, remove, .gitignore) · 4. Database rules (row level security) (reading) · **5 Checkpoint: the parents' list** · 6. Don't trust it blindly (before/after: generated code with holes) · 7. Instructions hidden in pasted text (myth/fact) · 8. Packages: real, fake and look-alike (tap to explore) · 9. What the AI may run without asking (chat) · **10 Chapter Challenge: Ruth's security pass** (build: security pass)

### Chapter 8 — Showcase Week (showcase week)
*Ten days to the bus. The app has to be live, at a real address, for the big fundraiser night. Climax: the thermometer passes $18,000 on a live link, and the bus leaves for D.C.*
1. It only works on my laptop (story) · 2. What "live" means (cards) · 3. Deploy to Vercel (steps) · 4. Settings for the live app (before/after) · **5 Checkpoint: the test run** · 6. Costs and limits (reading) · 7. Long sessions: /clear, /compact, context (chat) · 8. Same skills, any tool (tap to explore) · 9. What to build next (myth/fact) · **10 Chapter Challenge: opening night** (build: app live)

## What the founder is approving

1. Tool: Claude Code, with the honest cost note and the free alternative named.
2. Title and storyline (Second Line, New Orleans, USD) and three new cast members: Hazel (lead), Benny, Ruth.
3. 8 chapters × 10 lessons, AI category (no in-browser runner: the real coding happens in the learner's own tool, so the Coding category's "Write and run in every lesson" rule doesn't fit).
4. Stack for the real app: HTML/CSS/JS + Supabase + Vercel + GitHub.
