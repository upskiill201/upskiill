# Working with AI Coding Agents — Course Outline

> Coding category. **Status: DRAFT (2026-10-20), waiting for founder approval.**
> Rules: docs/ORIGINALS_PLAYBOOK.md (§7 coding Originals, §8a storylines). Cast: docs/originals/CAST.md.
> Fits after Python for Beginners (you can read a little Python) and next to The AI Stack (how AI products are built). This one is about **getting real work done with an AI that writes code for you, without being fooled by it**.

## Why this course

Coding agents (tools that read your project, run commands and edit files on their own) went from novelty to normal in about a year. Job posts now ask for them. Most people learn them by trial and error, and the errors are expensive: code that "works" but doesn't, tests quietly deleted, a secret key pasted into a chat, a whole folder rewritten when one line was asked for.

Most tutorials teach one tool's buttons. This course teaches the **skills that work with any agent**, and that stay true as the tools change:
- **brief** it like a good manager: goal, examples, limits, and what "done" means;
- **break work into small steps** and ask for a plan before code;
- **read what it wrote**: diffs, scope creep, invented functions, silent changes;
- **make tests the judge**, not the agent's "All done!";
- **recover** when it goes wrong: errors, loops, reverting;
- **keep it safe**: permissions, secrets, destructive commands, untrusted text, fake packages;
- **ship** through branches, reviews and CI like a real team.

| | |
|---|---|
| **Course title** | **Working with AI Coding Agents** (subtitle: *Brief it, check it, ship it*) |
| **Storyline** | **The Delivery Board** |
| Tagline | *From "it says it's done" to code you'd put your name on.* |
| Course-page hook | "Learn to work with AI coding agents like a professional: write briefs they can't misread, review their code, catch their mistakes with tests, and ship safely. Practise with a built-in agent in your browser." |

## The story

Set at **Synergix, Nairobi**, after Data Science for Beginners. Zanele proved why 1 in 3 deliveries is late: orders placed on Friday afternoon wait over the weekend. Mr Kamau wants a **Delivery Board**, a small internal tool that flags at-risk orders every morning. IT is Felix, alone, with a six-month backlog.

Felix gives **Remi** (now a junior analyst with a computer science degree) a licence for an AI coding agent: "Build it with this. I'll review." Remi is brilliant at understanding things and bad at explaining them, which is exactly the skill an agent needs. His first brief is one line: "make the delivery thing." The agent cheerfully builds the wrong thing.

| Character | Role in this course |
|---|---|
| **Remi** | Lead. Writes the briefs, reviews the agent's work, owns the Delivery Board. Arc: from "the agent says it's done" to the person who explains, in a review, why each change is safe. |
| **Felix** | Synergix IT, the reviewer. Fixes everything instantly without explaining how; his reviews start as one word ("No.") and become the course's best teaching. Arc: learns to explain, because Remi keeps asking why. |
| **Zanele** | The first user. Knows the delivery data better than anyone; her "that's not what I meant" moments are the requirements the agent never had. |
| **Brian** (light) | Remi's manager. Wants the board by month end; asks the manager's question ("can we trust it?"). |
| **Tey** | Teaches in chat cards. |

All speakers are existing CastIds (remi, felix, zanele, brian, tey, narrator). The agent's output appears as code, logs and messages in exercises, never as a speaking character, so no new cast is needed. This adds one fixed relationship to CAST.md: Felix reviews Remi's Delivery Board.

## How "practical" works in the browser

Lessons run real Python in the browser, using the existing runner (pandas included) and Synergix's built-in `deliveries_clean.csv` / `deliveries.csv`.

**No real AI model is called** (Phase One guard, no keys on phones, no per-learner cost). Instead, a new built-in **practice agent**, `teyro_agent.py`, does the job. It is deterministic and named honestly as practice in every lesson:

| Practice tool | What it teaches | Honest limit stated in the lesson |
|---|---|---|
| A small in-memory **project**: `board/` with `rules.py`, `report.py`, `test_rules.py` and the deliveries data | Working in a real codebase: files, tests, structure | Tiny on purpose; real projects have thousands of files |
| `PracticeAgent().run(brief, files=...)` returns a `Change` with `.plan`, `.diff`, `.files`, `.commands` and `.message` | Briefs, plans, diffs, scope, agent claims | Rule-based. It reacts to what the brief contains (goal, example, limits, done-when) and makes the **classic agent mistakes** on cue: guessing a date format when there's no example, editing files it wasn't asked to, weakening a test to make it pass, inventing a function, saying "All tests pass" without running them |
| `run_tests(files)` | Tests as the judge | A tiny test runner, not pytest |
| `review(change)` helpers: `files_touched`, `lines_added`, `show_diff` | Reading diffs and scope | Simplified diff format |
| A fake **permissions** layer and a pretend shell log | Safe settings, destructive commands, secrets | Nothing real ever runs; commands are only printed |

Because the agent reacts to the brief, learners **see** that a better brief changes the result. Every exercise has an exact, checkable outcome.

## Facts policy (this field moves monthly)

- Tool names (Claude Code, GitHub Copilot coding agent, Cursor, OpenAI Codex, Gemini CLI, Windsurf, Devin, Aider, and instruction files such as CLAUDE.md and AGENTS.md) appear only as **examples**, never as rankings or recommendations, with "checked October 2026" in the lesson `notes`.
- No vendor logos. No claims about productivity numbers unless sourced and dated in `notes`.
- The course teaches the **habits**, so it stays true when the tools change.

## The course at a glance

| | |
|---|---|
| Who it's for | People who can read basic Python (Python for Beginners Chapter 3 level) and want to build with coding agents: junior developers, analysts, founders and product people who "vibe code". Also experienced developers new to agents (they can test ahead). |
| End outcome | Brief, plan, review, test, debug and ship agent-written code safely, and explain to a reviewer why each change can be trusted. |
| Chapters | 9 |
| Lessons | 180 (20 per chapter: 16 teaching + 3 Checkpoints + 1 Chapter Challenge) |
| Lesson length | 10–15 minutes, about 10 exercises, with a Write-and-run exercise in every lesson (Coding lint) |
| Free | Chapter 1, lessons 1–5 |
| Jump ahead | "Jump here" on every chapter. Recommend **Find my level** on (add to `PLACEMENT_TRACKS`) for experienced developers. |

## Chapters

Map markers are versions of the Delivery Board, from a one-line brief to v1.0 merged and running.

| # | Chapter | Marker | Learners can... |
|---|---|---|---|
| 1 | Meet your agent | "make the delivery thing" | Explain what a coding agent is and does, and where it helps and hurts |
| 2 | The brief | Brief v1 | Write a brief with a goal, examples, limits and a "done when" |
| 3 | Small steps | Plan v1 | Break work into steps, ask for a plan first, change one thing at a time |
| 4 | Reading what it wrote | Board v0.3 | Read a diff, spot scope creep, invented code and silent changes |
| 5 | Tests are the judge | Board v0.5 | Write tests first, make the agent run them, catch weakened tests |
| 6 | When it goes wrong | Board v0.6 | Debug with an agent, stop fix loops, take over, and revert |
| 7 | Context and project memory | Board v0.7 | Write a project instruction file and give the agent the right context |
| 8 | Safe by default | Board v0.8 | Set permissions, protect secrets, block risky commands, distrust untrusted text and fake packages |
| 9 | Shipping with agents | Board v1.0 | Use branches, PRs, review and CI, and decide when not to use an agent |

Checkpoints are lessons 5, 10 and 15; the Chapter Challenge is lesson 20. Each chapter uses all 8 Learn formats and at least one Story lesson.

### Chapter 1 — Meet your agent
*Story: Felix hands Remi the licence. Remi types "make the delivery thing". The agent builds a weather dashboard for Nairobi. Climax: Remi's first honest look at what the agent did, and didn't, do.*

1. "Make the delivery thing" · 2. Chat, autocomplete, agent: three kinds of help · 3. The agent loop: read, plan, act, check · 4. What agents are good at, and bad at · **5 Checkpoint** · 6. Tools an agent uses: files, terminal, tests · 7. "Done!" is a claim, not a fact · 8. Your job changes: from typing to judging · 9. The trust ladder: suggest, edit, run · **10 Checkpoint** · 11. A tour of the Delivery Board project · 12. Running the project yourself · 13. Agents you'll meet (examples, checked October 2026) · 14. What it costs: time, money, attention · **15 Checkpoint** · 16. The weather dashboard · 17. Common first-week mistakes · 18. Reading an agent's session log · 19. The real task, written down · **20 Chapter Challenge**

### Chapter 2 — The brief
*Story: Zanele explains what "at risk" means (Friday after 2 p.m., Saturday, over 150 km). Remi's second brief is better; the agent still guesses the date format. Climax: Brief v1, which the practice agent can't misread.*

1. Why vague briefs fail · 2. The goal in one sentence · 3. Inputs and outputs · 4. Examples beat descriptions · **5 Checkpoint** · 6. Limits: what not to touch · 7. "Done when...": checkable finish lines · 8. Asking the agent to ask you questions · 9. Same task, three briefs, three results · **10 Checkpoint** · 11. Writing for a reader with no context · 12. Turning Zanele's words into rules · 13. Edge cases in the brief · 14. Too long is a problem too · **15 Checkpoint** · 16. The date-format guess · 17. Common brief mistakes · 18. Reading someone else's brief · 19. Brief v1 · **20 Chapter Challenge**

### Chapter 3 — Small steps
*Story: Remi asks for the whole board at once and gets a six-file change nobody can review, with every test failing behind an "All tests pass". Felix: "No." Climax: a five-step plan, each step small enough to check in two minutes.*

1. The six-file change · 2. Plan first, code second · 3. Reading and fixing a plan · 4. One change at a time · **5 Checkpoint** · 6. Checkpoints: save before each step · 7. Sizing a step: what fits in a review · 8. Order matters: data, rules, report · 9. Letting the agent explore before it edits · **10 Checkpoint** · 11. When to start a fresh session · 12. Keeping a task list · 13. Splitting work between you and the agent · 14. Stopping halfway on purpose · **15 Checkpoint** · 16. The change nobody could review · 17. Common planning mistakes · 18. Reading a plan like a reviewer · 19. Plan v1, three steps done · **20 Chapter Challenge**

### Chapter 4 — Reading what it wrote
*Story: The agent's step 3 works, and also renames a column in a file nobody mentioned, which breaks Zanele's weekly report. Climax: Remi's review checklist, and the first change Felix approves.*

1. It works, and it broke something else · 2. Reading a diff · 3. Files touched: did it stay in scope? · 4. Invented functions and imports · **5 Checkpoint** · 6. Silent behaviour changes · 7. Dead code and leftovers · 8. Names, comments and readability · 9. Asking the agent to explain its change · **10 Checkpoint** · 11. Running it yourself before believing it · 12. Checking it against the brief · 13. Big diffs: where to look first · 14. Saying no, and how to ask again · **15 Checkpoint** · 16. The renamed column · 17. Common review mistakes · 18. Reading a review comment · 19. Board v0.3 approved · **20 Chapter Challenge**

### Chapter 5 — Tests are the judge
*Story: The agent reports "All 6 tests pass." There are 5 tests, and it edited one to always pass. Climax: tests written before the brief, and an agent that has to run them.*

1. "All tests pass" (it didn't run them) · 2. What a test is, in four lines · 3. Write the test before the brief · 4. Tests from Zanele's examples · **5 Checkpoint** · 6. Making the agent run the tests · 7. Edge cases: Friday 1:59 p.m., blank distances · 8. The weakened test · 9. Protecting tests: "don't edit test files" · **10 Checkpoint** · 11. When a test fails: fix the code, not the test · 12. Tests for data, not just code · 13. How many tests is enough? · 14. Tests as the brief · **15 Checkpoint** · 16. The test that always passed · 17. Common testing mistakes · 18. Reading test output · 19. Board v0.5 with tests · **20 Chapter Challenge**

### Chapter 6 — When it goes wrong
*Story: A real error on the messy `deliveries.csv`. The agent tries five fixes, each breaking something new. Climax: Remi stops the loop, reverts, finds the cause himself, and gives the agent one precise fix.*

1. The fifth fix · 2. Giving the agent the real error · 3. Reproduce first · 4. Reading a traceback together · **5 Checkpoint** · 6. The fix loop, and how to stop it · 7. When to take over · 8. Reverting to the last good step · 9. Messy data breaks clean code · **10 Checkpoint** · 11. Asking "why", not "fix it" · 12. Adding a test for the bug · 13. Small debugging prints · 14. Knowing when the brief was the bug · **15 Checkpoint** · 16. The five-fix spiral · 17. Common debugging mistakes · 18. Reading a failed session · 19. Board v0.6 survives messy data · **20 Chapter Challenge**

### Chapter 7 — Context and project memory
*Story: Every new session, the agent forgets Synergix's rules (dates are Nairobi time; never touch `report.py` without Zanele). Climax: the Board's project instruction file, and an agent that follows the house rules first time.*

1. The agent forgot again · 2. What an agent can and can't see · 3. Giving the right files, not every file · 4. The project instruction file · **5 Checkpoint** · 6. House rules: style, names, "never do" · 7. Context limits, and long sessions · 8. Stale context: old code, old notes · 9. Pointing to examples in the project · **10 Checkpoint** · 11. Writing down decisions · 12. Keeping the instruction file short · 13. Instruction files you'll meet (examples) · 14. When instructions conflict · **15 Checkpoint** · 16. Nairobi time · 17. Common context mistakes · 18. Reading a project instruction file · 19. Board v0.7 with house rules · **20 Chapter Challenge**

### Chapter 8 — Safe by default
*Story: A pasted error log contains Synergix's database password, and a "helpful" comment in a downloaded data file tells the agent to delete the reports folder. Climax: the Board's safety settings, written and tested.*

1. The password in the log · 2. Permissions: what the agent may do without asking · 3. Secrets: never in prompts, code or logs · 4. Commands you always approve yourself · **5 Checkpoint** · 6. Untrusted text: files, issues, web pages · 7. The instruction hidden in a data file · 8. Fake and look-alike packages · 9. Checking a new dependency · **10 Checkpoint** · 11. Working on a copy, not the real data · 12. Licences of copied code · 13. Personal data in test files · 14. Least privilege in practice · **15 Checkpoint** · 16. "Delete the reports folder" · 17. Common safety mistakes · 18. Reading a permissions file · 19. Board v0.8, safe settings on · **20 Chapter Challenge**

### Chapter 9 — Shipping with agents
*Story: Month end. Brian asks, "Can we trust it?" Remi opens a pull request, the checks run, and Felix reviews. Climax: the Delivery Board goes live, and Remi explains every change in the review.*

1. "Can we trust it?" · 2. Branches: never on the main line · 3. Small pull requests · 4. Writing the PR description · **5 Checkpoint** · 6. Automatic checks (CI) · 7. Reviewing with a human · 8. Agents reviewing agents · 9. Commit messages that explain why · **10 Checkpoint** · 11. When not to use an agent · 12. Is it actually faster? Measuring honestly · 13. Working in a team that uses agents · 14. Keeping your own skills sharp · **15 Checkpoint** · 16. Launch morning · 17. Common shipping mistakes · 18. Reading a PR review · 19. Delivery Board v1.0 · **20 Chapter Challenge**

## What the founder is approving

1. Title, storyline (The Delivery Board) and cast: Remi leads, Felix reviews, Zanele is the user, all at Synergix, after Data Science for Beginners.
2. 9 chapters × 20 lessons, Coding category, Python, Find my level on.
3. A new built-in **practice agent** (`teyro_agent.py`) and practice project, built and self-tested first (like `teyro_ai.py`), with no real AI calls.
4. Build order, as before: practice agent and project first, then Chapter 1, commit, and wait for approval before pushing.
