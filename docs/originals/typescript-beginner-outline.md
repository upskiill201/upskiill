# TypeScript for Beginners — Course Outline

> Teyro Original, Coding. **Status: APPROVED (2026-10-18)** as proposed: Grace leads, Session Booker, "TypeScript for Beginners" / "Grace Ships It". Full-length course for complete beginners. The TypeScript runner is built; Chapter 1 (20 lessons) is written in backend/originals/tracks/typescript/beginner/u01.
> Rules: docs/ORIGINALS_PLAYBOOK.md (§7 coding Originals, §8a storylines). Cast: docs/originals/CAST.md.

## Why this course

TypeScript is JavaScript with types: you describe what your data looks like, and the editor catches mistakes **before** the code runs. It is now one of the most used languages on GitHub and the default for new web apps, so "learn TypeScript" is a real job skill.

Most TypeScript courses assume you already know JavaScript. This one doesn't. Learners start from zero and **learn programming through TypeScript**, with types from the very first lesson. The red squiggle stops being scary and becomes their safety net.

| | |
|---|---|
| **Course title** | **TypeScript for Beginners** (the exact words people search) |
| **Storyline** | **Grace Ships It** |
| Tagline | *From "what is code?" to an app your team actually uses, with a safety net catching your mistakes.* |
| Course-page hook | "Learn to code with TypeScript, the language behind modern web apps. Ten-minute lessons, a streak to keep, and real code you write, check and run in every lesson, right on your phone." |

## Where it starts: the origin of TypeScript

Lesson 1 starts at the beginning. Every fact below is checked; sources go in the lesson's author notes.

- **May 1995:** Brendan Eich prototypes JavaScript at Netscape in about ten days (code name "Mocha", then "LiveScript", then JavaScript in December 1995). It was built to make web pages interactive. *(Eich's own account; we say "a first prototype in ten days", not "the language was finished in ten days".)*
- **JavaScript grew up.** It went from small page scripts to huge apps (maps, email, banking), and big teams found its mistakes only showed up when the code ran.
- **October 2012:** Microsoft releases **TypeScript 0.8**, after about two years of internal work. It was led by **Anders Hejlsberg** (who also created C# and Turbo Pascal). It is free and open source (Apache 2.0).
- **2 April 2014:** TypeScript 1.0.
- **The big idea:** TypeScript is a *superset* of JavaScript. Every JavaScript program is already TypeScript. Types are checked, then **erased**: what actually runs is plain JavaScript.
- **Today:** Microsoft is rewriting the TypeScript compiler in Go to make it much faster (announced March 2025 as the future TypeScript 7). We mention it as "being rewritten", and re-check the release status before writing that lesson.

The course teaches **current TypeScript 5 with `strict` mode on**, the way teams use it.

## The story

**Grace** (shared cast) is 44, from Manchester, and was a ward nurse for 18 years. In The Art of Small Talk she started her first tech job as a junior UX researcher at **Kinwell**, the Manchester health-tech company that builds an app for booking hospital appointments. This course picks up a few months later: lives only move forward.

**The problem:** Grace runs Kinwell's research sessions, where patients try new features of the app. She books them with a shared spreadsheet that keeps breaking: double bookings, a patient's phone number typed in the "time" column, someone booked for "Tuesday 31 June", and a reminder that never went out. The developers' code never has that problem, because, Femi tells her, **TypeScript won't let you put a phone number where a time should go.**

So Grace decides to build a **Session Booker** in TypeScript, and to finally understand what the developers mean in stand-up.

- **Femi** *(course-only, from The Art of Small Talk)*, the Kinwell developer who talks to everyone, becomes her coding mentor. He loves TypeScript a little too much and has strong opinions about `any` ("it's not a type, it's a surrender").
- **Arjun** *(shared cast)*, who freelances for Kinwell, reviews her code on video calls. Precise and picky, and the one who teaches her to read error messages calmly.
- **Priya** *(course-only)*, her manager, is the first "customer": she wants the tool to work for the whole UX team.
- **Jayden** *(course-only)*, Grace's son (17), codes a bit himself and is smug about it until his mum's code is better typed than his.

**Grace's superpower:** nursing taught her to check everything twice, write things down precisely, and never guess with something that matters. That is exactly what types do. The course's quiet point: **careful people make great programmers.**

**Map markers are version numbers:** the Session Booker goes from **v0.0** (Chapter 1) to **v1.0** (the finale), so learners watch the program grow on the map.

The Intermediate level continues the story: Grace turns the Session Booker into a real web app with React and TypeScript.

## The course at a glance

| | |
|---|---|
| Who it's for | Complete beginners: never coded, or tried JavaScript once and got lost. Any phone or computer. |
| End outcome | Write small TypeScript programs that model real data with types, catch their own mistakes before running, and read and fix other people's simple TypeScript. |
| Chapters | 13 |
| Lessons | 260 (20 per chapter: 16 teaching + 3 Checkpoints + 1 Chapter Challenge) |
| Lesson length | 10–15 minutes, about 10 exercises |
| Free | Chapter 1, lessons 1–5 |
| Language | TypeScript 5, `strict` mode. Checked and run in the browser, nothing to install. Installing Node and running TypeScript on a computer is taught in Chapter 13. |
| Code typing | Phone-friendly: typed code stays under ~5 lines; longer code uses Tap to build, Fill in the blanks and Put in order (playbook §7). |

## Chapters

| # | Chapter (map banner) | Marker | The learner can... |
|---|---|---|---|
| 1 | Hello, TypeScript | v0.0 | Explain what JavaScript and TypeScript are and why types exist, and write, run and fix their first lines |
| 2 | Names and types | v0.1 | Store information in `const` and `let`, give it a type (`string`, `number`, `boolean`) and let TypeScript infer the rest |
| 3 | Times and numbers | v0.2 | Do real calculations: session lengths, minutes to hours, rounding, and the `NaN` trap |
| 4 | Working with text | v0.3 | Join, clean, search and format text with template strings and string methods |
| 5 | Booked or not? | v0.4 | Make decisions with `if`/`else`, `===`, `&&`/`||`, and limit values with literal unions (`"booked" \| "cancelled"`) |
| 6 | The participant list | v0.5 | Store and change many items with typed arrays (`string[]`) |
| 7 | Round and round | v0.6 | Repeat work with `for...of`, `for` and `while` loops |
| 8 | Write it once | v0.7 | Write functions with typed parameters and return types, defaults, optional parameters and arrow functions |
| 9 | The shape of a booking | v0.8 | Describe real data with objects, `type` aliases and `interface`s, including optional and readonly properties |
| 10 | Lists of bookings | v0.85 | Transform lists with `map`, `filter`, `find`, `some` and `sort`, with TypeScript checking every step |
| 11 | When something's missing | v0.9 | Handle `null` and `undefined` safely with narrowing, `?.` and `??`; know why `any` is dangerous and `unknown` is safe |
| 12 | One type, many shapes | v0.95 | Model real choices with unions, discriminated unions, `Record`, a first look at generics, and exhaustive `switch` with `never` |
| 13 | Session Booker 1.0 | v1.0 | Load data with `async`/`await`, check untrusted JSON, split code into modules, set up `tsconfig.json`, and run TypeScript on a computer with Node |

---

## Chapter 1 — Hello, TypeScript (written first; includes the free lessons)

**Story:** Monday at Kinwell. The research spreadsheet has double-booked a patient for 10:00, and someone typed a phone number in the time column. Grace sorts it out with nurse-level calm and then asks Femi why the app never makes mistakes like that. "Because TypeScript won't let it," he says. "Want me to show you?"

**Chapter climax (lesson 20):** Session Booker v0.0. Grace's first real program prints the day's session list, and she fixes her first type error without asking Femi.

The free stretch (lessons 1–5) takes the learner from "what is code?" to running real TypeScript and seeing their first type error caught.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | The spreadsheet that broke | What a program is; why Grace wants to learn; the course's promise | Story (choice) |
| 2 | Ten days in May | JavaScript's origin at Netscape (1995) and why it's in every browser | Reading |
| 3 | Why TypeScript exists | Big apps, bugs found too late; Microsoft, Hejlsberg, 2012; "JavaScript with a safety net" | Chat with Tey |
| 4 | Your first line: `console.log()` | `console.log("Hello, Kinwell!")`, try it live | Before / After |
| 5 | **Checkpoint 1: Femi's quiz** | Origins plus first code | Mixed review |
| 6 | Text needs quotes | Strings, `"` and `'`, what happens without them | Tap to explore |
| 7 | Your first type error | `console.log("Sessions: " + 3)` works; `let count: number = "three"` doesn't. Reading the red line | Step-by-step |
| 8 | Types are erased | TypeScript is checked, then becomes plain JavaScript; see the JavaScript it turns into | Walkthrough |
| 9 | Errors are normal | Arjun's rule: read the message, find the line, fix one thing | Story |
| 10 | **Checkpoint 2: the stand-up** | | Mixed review |
| 11 | TypeScript as a calculator | `+ - * /`, order of operations, numbers vs text | Before / After |
| 12 | Comments: notes for humans | `//` and `/* */`; why Femi's uncommented code confuses Priya | Chat with Tey |
| 13 | Where TypeScript runs | Browser, phone, server (Node); the checker vs the runner | Card deck |
| 14 | Read code before you write it | Predict the output, then run it | Tap to explore |
| 15 | **Checkpoint 3: Jayden's challenge** | | Mixed review |
| 16 | Think like a programmer | Break a problem into tiny steps; plain-English plans (pseudocode) | Chat with Tey |
| 17 | Learning to code with AI, honestly | Use AI to explain errors, not to write your answers | Story (choice) |
| 18 | Grace's plan for the Session Booker | Turn the spreadsheet's problems into a feature list | Step-by-step |
| 19 | The most common beginner mistakes | Missing quotes and brackets, `Console.log`, curly quotes from phones, `=` vs `===` (preview) | Myth or Fact |
| 20 | **Chapter Challenge: Session Booker v0.0** | Print the day's session list and fix the type error hidden in it | Mixed (climax) |

Every lesson has at least one **Try it live** or **Write and run** (playbook §7), starting in lesson 1.

---

## Chapters 2–13 (stories; lesson lists are written chapter by chapter, like Python)

**2 · Names and types (v0.1).** Grace names things: patient codes, session rooms, the researcher on duty. `const` vs `let`, the three everyday types, type annotations, and inference ("TypeScript already knows"). Femi's first "stop using `var`" rant. *Climax:* the booker stores today's settings in well-named, typed variables.

**3 · Times and numbers (v0.2).** Sessions are 45 minutes with 15 minutes to reset the room. How many fit in a day? Arithmetic, `Math.round`, `%`, and what happens when you add `"45"` and `15`. `NaN` gets its own lesson. *Climax:* the booker works out the day's slots.

**4 · Working with text (v0.3).** Names arrive messy ("  sARAH khan "). Template strings, `.trim()`, `.toUpperCase()`, `.includes()`, `.padStart()`, and a first look at `Date` formatting. *Climax:* a clean, readable reminder message for every participant.

**5 · Booked or not? (v0.4).** Decisions: `if`/`else`, comparison with `===`, `&&`, `||`, `!`. Then TypeScript's first superpower: `type Status = "booked" | "cancelled" | "no-show"`, so "boked" is impossible. *Climax:* the booker refuses a double booking. *Choice:* Priya asks Grace to "just let it through this once".

**6 · The participant list (v0.5).** Typed arrays: `string[]`, adding, removing, `length`, indexes, `includes`, and `readonly` lists. *Climax:* the week's participant list, safely changed.

**7 · Round and round (v0.6).** Loops: `for...of` first (it reads like English), then `for` and `while`, and the infinite-loop panic. *Climax:* the booker prints the whole week, day by day.

**8 · Write it once (v0.7).** Functions with typed parameters and return types, defaults, optional parameters, arrow functions, and why types make functions easy to reuse. Arjun's code review. *Climax:* `bookSession()` and `cancelSession()`.

**9 · The shape of a booking (v0.8).** Objects, `type` aliases and `interface`s: `{ code: string; time: string; room: number; phone?: string }`. Optional and `readonly` properties, nested data, arrays of objects. The phone-number-in-the-time-column bug can't happen any more. *Climax:* the spreadsheet's data, finally typed.

**10 · Lists of bookings (v0.85).** `map`, `filter`, `find`, `some`, `sort` and `reduce`, with TypeScript checking every step. *Climax:* "Show me tomorrow's afternoon sessions, sorted by time", in one line.

**11 · When something's missing (v0.9).** A participant without a phone number. `null` and `undefined`, strict null checks, narrowing with `if`, `?.` and `??`. Why `any` switches the safety net off and `unknown` keeps it on. *Climax:* the booker survives incomplete data without crashing. *Choice:* Jayden says "just use `any`".

**12 · One type, many shapes (v0.95).** Sessions can be in person, on video, or by phone, each with different details. Unions, discriminated unions, exhaustive `switch` with `never`, `Record`, `Partial`, and a gentle first look at generics. *Climax:* add "home visit" sessions, and TypeScript points to every place in the code that needs updating.

**13 · Session Booker 1.0 (v1.0).** Bookings come from Kinwell's system: `async`/`await`, `fetch` (a practice API), and checking untrusted JSON before trusting it. Modules with `import`/`export`, `tsconfig.json` and `strict`, installing Node and running TypeScript on a real computer. *Final Challenge:* the whole UX team uses Session Booker 1.0 for a real research week. *Project (outside the app):* build your own small typed tool on your computer.

---

## What has to be built first: a TypeScript runner

The code runner today runs **Python only** (Pyodide). A TypeScript course needs **TypeScript's real type checker** in the lesson, because catching type errors before running is the whole point. Same model as the Python runner (playbook §7, nothing runs on Teyro's servers):

1. **In-browser TypeScript worker:** the official TypeScript compiler, loaded once and cached, type-checks the learner's code with `strict` on, shows errors in plain words ("You gave a word where a number goes"), then runs the JavaScript it produces in a sandboxed worker with a time limit and `console.log` output.
2. **Checks for exercises:** output checks (like Python), plus TypeScript-only checks: "has no type errors", "has this specific type error" (for lessons where the learner *should* see the error), and "uses a type annotation".
3. **Try it live / Write and run / Playground** reuse the existing components, with a language switch.
4. **`npm run originals`** type-checks and runs every TypeScript solution with the same compiler version, and refuses to load a lesson whose own solution fails.

This is built and tested before Chapter 1 is written, the same order as Python.

## Decisions for the founder

1. **Lead:** Grace (proposed), mentored by Femi, with Arjun reviewing code. A career-changer at 44 learning to code is a strong, inclusive story. Alternative: **Kofi** (Study Smarter), as a younger student version.
2. **Project:** the **Session Booker** for Kinwell's research sessions (proposed). Alternative: a personal project, e.g. Jayden's football team schedule.
3. **Title:** "TypeScript for Beginners" + storyline "Grace Ships It".
4. **Order:** build the TypeScript runner first, then write Chapter 1 (20 lessons), then the course page and cover.
