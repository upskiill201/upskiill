# Teyro Originals — Course Playbook

> The rulebook for every course Teyro makes itself. **Status: v1.0 — SIGNED OFF by the founder (2026-10-13).** v1.0: final launch line-up (6 Originals), forgiving hearts in Beginner. v0.5: $9.99/mo, $59.99/yr; pilot = AI at Work. v0.4: subscription paywall before lesson 6, shared cast (Ada, Remi), ready at launch. v0.3: 20+ lessons per unit, a Checkpoint every 5th lesson. v0.2: full-length courses, 10–15 minute lessons, linked levels (tracks), Tey as the voice.
> Nothing in the Originals build (data, pipeline, lesson engine, code runner) should be built until this is signed off, because every later piece exists to support the rules written here.

---

## 1. What an Original is

A **Teyro Original** is a course written in-house by Teyro, not by a creator.

- **No video.** Originals teach through rich interactive lessons: reading, stories, conversations, walkthroughs, exercises, and (for coding) real code that runs in the lesson.
- **Many categories.** Not limited to Coding/AI like the creator side. Originals cover coding, communication, career, thinking, and life skills.
- **Full-length.** An Original is a complete course, not a mini-course: many units, many lessons, hours of learning per level.
- **Leveled and linked.** Every topic is a **Track** of Beginner → Intermediate → Advanced. Finishing one level carries the learner straight into the next.
- **Taught by Tey.** Tey is the teacher in every Original. The whole course speaks in Tey's voice.
- **Special placement.** Originals get a "Teyro Originals" badge, a pinned row on home/explore/dashboard, and Teyro shown as the author.
- **Paid, through the subscription.** One Teyro Originals subscription, **$9.99/month or $59.99/year** (yearly = 6 months' price, the same rule as the rest of Teyro's pricing), unlocks **every** Original, every level. Each Original's **lessons 1–5 are free**; the paywall appears **before lesson 6**, right after the learner passes their first Checkpoint.
- **Ready at launch.** Originals are part of Teyro's launch, not an add-on afterwards.
- **Same home map.** Originals play on the existing home-screen map view. Units = `Section`, lessons = `Lesson`. No new map UI.
- **Same game.** XP, Coins, streaks, combos, hearts, leagues, and celebrations work exactly as on any lesson.

**What Originals are for:** the first course a learner takes on Teyro, and the course that shows creators what "great" looks like. Where a topic overlaps with creator courses, Originals stay at the foundation level and hand learners on to creator courses for depth.

---

## 2. Course shape

```
Track          (one topic, all levels)        e.g. "Clear Writing at Work"
 └─ Course     (one level)                    e.g. "Clear Writing at Work — Beginner"
     └─ Unit   (Section, 20+ lessons)         e.g. "Unit 2: Emails people actually read"
         └─ Lesson (10–15 minutes)            e.g. "Subject lines that get opened"
             ├─ Learn    (teach)        ~4–6 min
             ├─ Apply    (practise)     ~5–7 min
             ├─ Reflect  (make it personal) ~1–2 min
             └─ Deepen   (optional extras)
```

These are **full courses**. A learner should be able to come back every day for months on one Track.

| | Target |
|---|---|
| Units per level (course) | **10–15** |
| Lessons per unit | **20 or more** (every 5th is a Checkpoint; the last is the Unit Challenge) |
| Lessons per level | roughly **200–300+** |
| Lesson length | **10–15 minutes** |
| Learning time per level | roughly **35–75 hours** |
| Learning time per full Track (3 levels) | roughly **100–225+ hours** |
| Unit ending | The unit's last Checkpoint is the **Unit Challenge**: it covers the whole unit instead of just the last 4 lessons, and is harder than normal |
| Checkpoints | **Every 5th lesson is a Checkpoint** (lessons 5, 10, 15, 20...): no new teaching, it reviews the 4 lessons before it and mixes in older material. The learner must pass it to continue down the map |
| Level ending | A **Final Challenge** plus a real-world **Project**: something the learner does outside the app (send the email, run the mock interview, ship the script) |

Because these courses are long, they are written and released **unit by unit**. A level can go live with its first units published and the rest marked "coming soon" on the map, as long as **the first unit is complete** (20+ lessons, roughly 4–5 hours of learning). After launch, a new unit is released every 1–2 weeks, and the next unit should always be finished before learners can reach the end of the last published one.

Every course has, written down before any lesson is drafted:

1. **Starting point.** Who it's for and what they can already do. (`Course.startingPoint`)
2. **End outcome.** The one concrete thing they can do after, phrased as an action: "Write a work email that gets a reply the same day." (`Course.endOutcome`)
3. **Unit outcomes.** One action per unit. (`Section.goal`)
4. **Lesson outcome.** One idea per lesson. If a lesson needs two ideas, it's two lessons.

---

## 3. Levels

| Level | Assumes | Feels like |
|---|---|---|
| **Beginner** | Nothing. No jargon without an explanation the first time it appears. | "Oh, that's what that means." Lots of guidance, small steps, quick wins in the first 2 minutes. |
| **Intermediate** | The Beginner course in the same topic, or equivalent. | "Now I can actually use this." Less hand-holding, longer exercises, combining ideas. |
| **Advanced** | Real experience. | "The messy real version." Edge cases, trade-offs, judgement calls with no single perfect answer. |

### Linked levels (Tracks)

The three levels of a topic are one continuous journey, not three separate courses the learner has to find.

- **Finish Beginner → Intermediate opens automatically.** On completing the Beginner Final Challenge, Tey celebrates, the level-complete scene plays, and the learner is enrolled in Intermediate and taken straight to its first lesson. No searching, no second enrol button.
- **One continuous map.** On the home map view, the next level continues the path from where the last one ended, with a clear "Level 2: Intermediate" marker between them.
- **Progress carries over.** XP, streak, and Track progress ("Level 1 of 3 complete") continue across levels.
- **Locked until earned.** A learner can see the next level's units but can't start them until the previous level is finished, or until they pass a placement test (below).
- **Placement test (skip ahead), after launch.** Learners who already know the basics can take a placement test at the start of a Track to jump into a later level or later unit, like Duolingo's "test out". Not needed on day one; built once a Track has more than one level live.

### Access and the paywall

- **Subscription unlocks all Originals.** There is no per-course price for Originals. Subscribed learners can start any Original and any level they've reached.
- **Lessons 1–5 of each Original are free.** Lesson 5 is the first Checkpoint, so the free stretch ends on a win (about an hour of learning, usually spread over a few days of streak).
- **Paywall before lesson 6.** After the Checkpoint 1 celebration, the next lesson on the map shows the paywall, using the existing honest-pricing paywall (yearly-first, exact billing line). Gating is enforced on the server, never just hidden in the UI.
- **Free lessons are per Original.** A non-subscriber can try lessons 1–5 of any Original, so they can sample several before paying.
- **Later levels need the subscription.** Intermediate and Advanced have no free lessons; a non-subscriber who reaches them sees the paywall.

---

## 4. Learn formats — rich, never repetitive

Learn is **not** always a card deck. Each lesson picks the teaching format that best fits its idea.

| Format | What the learner experiences | Best for | Status |
|---|---|---|---|
| **Card deck** | Swipe through bite-size cards: text, code, image, tip, quick check | Quick concepts, definitions, vocabulary | Exists |
| **Reading lesson** | A full article-style page that scrolls, with highlighted key lines, tip boxes, and inline questions along the way | Deeper "why" explanations, context, history | To build (reading lessons exist from the importer; needs inline checks + richer styling) |
| **Story** | Follow a character through a real situation (e.g. Ada's first week at a new job); the lesson is what happens to her, and the learner decides at key moments | Soft skills, career, consequences | To build |
| **Chat with Tey** | Tey teaches in a chat thread; the learner taps replies to move it along, ask "why?", or guess before the answer | Friendly intros, ideas that need back-and-forth | To build |
| **Step-by-step walkthrough** | A worked example revealed one step at a time, each step explained before moving on | Code, processes, frameworks (e.g. STAR answers) | To build |
| **Before / After** | A bad version and a good version side by side, with annotations on exactly what changed and why | Writing, feedback, code quality, CVs | To build |
| **Tap to explore** | A real artefact (email, code, CV, diagram) with tappable hotspots that reveal explanations | Breaking down real-world examples | To build |
| **Myth or Fact** | Quick-fire true/false round that challenges what the learner already believes, with the explanation after each answer | Lesson openers, misconceptions | To build |
| **Audio lesson** | Listen-along with transcript | Commute-friendly review lessons | Exists |
| **Try it live** | A code playground inside the lesson: edit, run, see the result | Coding courses | To build (code runner) |

### Variety rules

1. **No two lessons in a row** in a unit use the same main Learn format.
2. **Every unit uses at least 4** different Learn formats.
3. **Lessons usually combine formats.** At 10–15 minutes, Learn normally has a main format plus one or two others: a Story that opens on a Myth or Fact, a Reading lesson with a Before/After in the middle, a Chat with Tey that ends in a Try it live.
4. **No format dominates a level.** No single format is the main format in more than about a third of a level's lessons.
5. **Pick by the idea, not for variety's sake.** Variety rules break ties; they never force a format that teaches worse.
6. **Open strong.** The first 30 seconds of every lesson is a hook: a question, a surprising fact, a mistake, or a moment in a story. Never "In this lesson you will learn...".

---

## 5. Apply — exercises

### Exercise types

| Type | What the learner does | Status |
|---|---|---|
| Multiple choice | Pick the answer (incl. "predict the output", "pick the better version") | Exists |
| Fill in the blanks | Complete text or code from a word bank | Exists |
| Find the bug | Tap the broken line | Exists |
| Put in order | Arrange lines or steps | Exists |
| Match pairs | Connect related items | Exists |
| **Chat scenario** | A simulated conversation (boss, client, interviewer); the learner picks each reply and the other person reacts | To build |
| **Spot the problem** | Tap the weak sentence/phrase in a piece of writing | To build |
| **Tap to build** | Build a sentence or a line of code from tiles | To build |
| **Type the answer** | Short typed answer, forgiving matching (case, spacing, close spellings) | To build |
| **Sort into groups** | Drag items into categories (e.g. "clear vs vague") | To build |
| **Write and run** | Write real code; hidden tests mark it | To build (code runner) |

### Exercise rules

1. **15–20 exercises** per normal lesson; **25–30** in a Unit Challenge or Checkpoint. Exercises can also appear inside Learn (quick checks, story decisions) so the learner is never just reading for more than 2 minutes.
2. **At least 4 different exercise types** per lesson.
3. **No more than 2 of the same type in a row.**
4. **Match the way it was taught.** A Before/After lesson leads into Spot the problem; a Story leads into a Chat scenario; a Walkthrough leads into Put in order or Write and run.
5. **Easy → hard.** The first exercise should be won by almost everyone; the last is the hardest in the lesson.
6. **Every wrong answer teaches.** Each wrong option gets its own short explanation of *why* it's wrong, not just "Incorrect".
7. **Mistakes come back.** A missed exercise reappears later in the same lesson (existing quiz queue), and the Unit Challenge leans on the lesson's most-missed items.
8. **Shuffle** answer options and tiles every attempt.
9. **Review earlier units.** From Unit 2 onward, 2–3 exercises per lesson revisit an earlier unit. From Intermediate onward, some reviews reach back into the previous level.

---

## 6. Reflect and Deepen

**Reflect** (1–2 minutes, always present):
- One personal prompt that connects the lesson to the learner's own life: "Think of the last email you sent that got no reply. What would you change now?"
- Guided where helpful (sentence starters), open otherwise.
- Never graded.

**Deepen** (optional, never required to complete):
- 1–3 extras: a further reading, a real-world challenge, a bonus "go further" mini-lesson, a printable cheat sheet.
- Links only to reliable, non-paywalled sources.

---

## 7. Coding Originals

- Every coding lesson has at least one **Try it live** moment in Learn or one **Write and run** exercise in Apply, from the first lesson of a Beginner course.
- Code runs **in the learner's browser** (Python via Pyodide, JavaScript in a sandboxed worker, HTML/CSS preview, SQL via sql.js). Nothing runs on Teyro's servers.
- **Typing on a phone is hard.** Keep typed code short (under ~5 lines in Beginner); use Tap to build, Fill in the blanks, and Put in order for longer code.
- Hidden tests check output, not exact wording, so different correct solutions pass.
- Every Write and run exercise has a hint and a "show solution" after 2 failed attempts. Showing the solution costs the XP bonus, not hearts.

---

## 8. Voice — Tey teaches

**Every Original is taught by Tey.** Tey is the voice of the whole course: the explanations, the hooks, the feedback on answers, the Reflect prompts, the celebrations. Learners should feel they're learning *with Tey*, not reading a textbook.

Tey's character is already defined in code (`backend/src/tey/ai/tey-personality.ts`): a mischievous, owl-like companion, playful, observant, a little theatrical, and caring underneath. Lessons use that same Tey, tuned for teaching.

### Tey as a teacher

- **Speaks as "I", to "you".** "Let me show you the one trick that fixes most bad emails." Never "In this lesson, learners will...".
- **Clarity first, drama second.** Tey's theatrical side lives at the edges: the hook, reactions to answers, the end of the lesson. While explaining something, Tey is clear and simple.
- **Plain words, short sentences.** If a 15-year-old would stumble on a word, Tey explains it or swaps it.
- **Concrete over abstract.** A real email, a real interview question, a real bug, not "consider a scenario where...".
- **Has opinions.** "Honestly? Most cover letters are too long. Here's why." Tey picks a side and explains it.
- **Reacts like a friend.** Right answer: genuinely pleased, never confetti-speak. Wrong answer: "Ooh, close. Here's the catch:" and then the reason. Never "Wrong!".
- **Guilt-trips are for streaks only.** Tey's dramatic sulking belongs in nudges and streak moments, never inside a lesson. Inside a lesson, Tey never mocks a mistake, never calls anything "easy", and dials the drama down when a learner is struggling.
- **Same Tey everywhere.** The Tey in lessons is the same Tey in push nudges, celebrations, and WhatsApp. Consistent catchphrases are welcome; copying one joke across many lessons isn't.

### Other voice rules

- **Global audience.** Names, places, workplaces, and currencies from many countries, not only the US/UK. Don't assume a corporate office job.
- **Currency in the game is always "Coins".** Never "gems".
- **No raw emojis in lesson content.** Use the lesson engine's icons and callouts.
- **Story characters, one shared cast.** Story lessons are about people in real situations, and Tey narrates and comments on their choices ("Watch what happens when Ada hits send..."). **The same cast appears across every Original**, like Duolingo's recurring characters, so learners get attached to them, and so the same faces appear in the app and in Teyro's social videos.

### The cast

| Character | Status | Role in stories |
|---|---|---|
| **Tey** | Exists (in-app companion) | The teacher and narrator. Never a character the story happens *to*. |
| **Ada** | Exists (host in Teyro's social videos) | First member of the cast. Profile (age, country, job, personality) to be written in the cast sheet. |
| **Remi** | Exists (host in Teyro's motion explainers) | Second member of the cast. Profile to be written in the cast sheet. |
| 3–4 more | To create | Different countries, jobs, ages, and stages of life (student, freelancer, career-changer, team lead...) so every Original has someone who fits. |

Before the first Original is written, a short **cast sheet** (`docs/originals/CAST.md`) fixes each character's name, look, country, job, personality, and how they speak. Every story stays consistent with it; a character's life can move forward across courses (Ada gets promoted), but never contradicts what came before.

---

## 9. Facts and safety

- **Every factual claim is checked** against a reliable source before publishing. Statistics need a source in the lesson's author notes (the 85% dropout figure, not "90%").
- **Money courses teach general principles only.** No personalised investment or financial advice, no product recommendations.
- **Health/wellbeing topics** (stress, burnout) stay practical and non-clinical, and point to professional help where relevant.
- **Career advice is global.** Note where norms differ by country (CVs vs résumés, photo on CV, salary negotiation).

---

## 10. Quality checklist (before any lesson is published)

- [ ] Lesson outcome is one idea, written as an action
- [ ] Opens with a hook in the first 30 seconds
- [ ] Learn format chosen for the idea and obeys the variety rules for its unit
- [ ] 15–20 exercises (25–30 for Unit Challenge / Checkpoint), at least 4 types, no 3-in-a-row of one type, easy → hard
- [ ] Learner is never reading for more than 2 minutes without interacting
- [ ] Every wrong option has its own explanation
- [ ] From Unit 2 on: 2–3 review exercises from earlier units
- [ ] Reflect prompt is personal and ungraded
- [ ] Facts checked, sources in author notes
- [ ] 10–15 minutes when played through on a phone
- [ ] Played start to finish on a real phone in the preview route, no dead ends, no text overflow
- [ ] Passes the content validator (same rules as the server)
- [ ] Voice check: sounds like Tey, plain words, "I" to "you", no mocking mistakes, no emojis, "Coins"

---

## 11. Build order (what has to exist before writing courses at scale)

1. **This playbook**, signed off by the founder.
2. **Originals foundation:** `isOriginal` flag, Teyro as author, new categories + levels, **Tracks that link levels** (auto-enrol into the next level, continuous map, locked-until-earned), Checkpoint and Unit Challenge lesson kinds, Originals badge and pinned row, works on the home map view with many units, **subscription access with lessons 1–5 free and the paywall before lesson 6** (server-side). Plus the cast sheet.
3. **Course-as-code pipeline:** course files in the repo, a validator sharing the server's rules, a guarded upsert loader (never wipes), a local preview route to play lessons on a phone.
4. **Lesson engine expansion:** the new Learn formats (section 4) and new exercise types (section 5), each built in both the lesson player and the server's checks.
5. **Code runner:** CodeMirror editor, in-browser Python/JS/HTML/SQL, Try it live + Write and run.
6. **Pilot Original:** the full curriculum outline for one Beginner level (all units and lesson titles), then the first unit (20+ lessons, including its Checkpoints) written in full and tested on a real phone; update this playbook with what we learn.

Then: write the curriculum at scale, unit by unit.

### Status (2026-10-13, branch `feat/teyro-originals`)

| Piece | Status |
|---|---|
| 1. Playbook | Done (v1.0) |
| 2. Foundation | Built: Tracks, levels, checkpoints, paywall before lesson 6, Originals pricing, forgiving hearts, Explore row + badge, map trail, level-complete screen, unlock-screen wording, cast sheet. **Database migration not applied yet.** |
| 3. Course-as-code pipeline | Built: `backend/originals/` + `npm run originals` (checker, preview export, loader). See `backend/originals/README.md`. |
| 4. Lesson engine expansion | Built: reading, story, chat with Tey, walkthrough, before/after, tap to explore, myth or fact; chat reply, spot the problem, tap to build, type the answer, sort into groups. Checked on a phone-size screen via `/dev/originals`. |
| 5. Code runner | Not started (needed for Python for Beginners only). |
| 6. Pilot (AI at Work) | Ready to start: course details drafted in `backend/originals/tracks/ai-at-work.ts`; next step is the full Beginner outline, then Unit 1. |

---

## 12. Founder decisions

### Decided

- **Paid:** Originals are paid via the subscription, which unlocks all Originals. Lessons 1–5 free, paywall before lesson 6.
- **Cast:** one shared cast across all Originals, starting with Ada and Remi.
- **Launch:** Originals are ready at launch.
- **Placement test:** after launch.
- **Price:** $9.99/month, $59.99/year for all Originals.
- **Pilot:** *AI at Work — Beginner* (no code runner needed, and a strong seller, so the pilot is also a launch course).
- **Release pace:** a level launches once its first unit is complete; new units every 1–2 weeks.

- **Hearts:** more forgiving in Beginner levels (see section 13).
- **Launch line-up and categories:** see section 13.

---

## 13. Launch line-up

Six Originals at launch, each a Beginner level with at least its first unit (20+ lessons) complete. That is **120+ finished lessons before launch**.

| # | Original | Category | Notes |
|---|---|---|---|
| 1 | **AI at Work** | AI | **Pilot.** Written first; no code runner needed. |
| 2 | **AI for Students** | AI | University and school. Teaches responsible use: studying smarter with AI, never cheating, so schools and parents can recommend it. |
| 3 | **Python for Beginners** | Coding | Needs the code runner (build piece 5). |
| 4 | **Acing Job Interviews** | Career | Urgent-need buyers. |
| 5 | **Clear Writing at Work** | Communication | Written communication. |
| 6 | **Speak Like a CEO** | Communication | One course merging communication, speaking like a leader, and public speaking: everyday communication → meetings → presenting → public speaking. Speaking practice in Phase 1 is technique + record yourself + self-check against a checklist (no AI feedback until Phase 2). |

**Launch categories:** AI, Coding, Career, Communication. Thinking & Productivity and Life Skills come after launch. *Learning How to Learn* is not a paid Original (a well-known free course already exists under that name); its best ideas may become a short free mini-course in onboarding later.

**Writing order:** AI at Work (pilot) → AI for Students → Acing Job Interviews → Clear Writing at Work → Speak Like a CEO → Python for Beginners (last, because it waits on the code runner).

---

## 14. Hearts in Originals

- **Beginner levels are more forgiving.** Mistakes still cost hearts, but losing all hearts in a Beginner level never locks the learner out of their next lesson; they can keep going (hearts refill / practise-to-earn as usual), they just lose the heart-related bonuses.
- **In the free lessons (1–5) a learner is never blocked by hearts.** Nothing stops a learner in lessons 1–5; the first stop anyone meets is the paywall before lesson 6.
- **Intermediate and Advanced** use the same heart rules as the rest of Teyro.
