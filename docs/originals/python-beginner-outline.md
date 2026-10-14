# Python for Beginners — Course Outline

> Third Teyro Original. **Status: APPROVED (2026-10-14).** The code runner is built; Chapter 1 is written next.
> Rules: docs/ORIGINALS_PLAYBOOK.md (§7 coding Originals, §8a storylines). Cast: docs/originals/CAST.md.

## Why this course, why now

People are finding Teyro by searching **"Duolingo for Python"**. They want what that phrase promises:
- bite-size lessons;
- a streak;
- a map that moves;
- and actually **typing Python** on their phone from day one.

This course is built to be exactly that, and to be better at one thing Duolingo-style apps skip: **writing real programs**, not just tapping tiles.

| | |
|---|---|
| **Course title** | **Python for Beginners** (the exact words people search) |
| **Storyline** | **Ada's First Program** |
| Tagline | *From "what is Python?" to a program your friends actually use.* |
| Course-page hook | "Learn Python the fun way: 10-minute lessons, a streak to keep, and real code you write and run in every lesson, right on your phone." |
| Search note | We don't use the word "Duolingo" in course copy (it's their trademark). The search demand is better captured by an SEO page in the existing competitor system (`frontend/lib/seo/competitors.ts` already has a Duolingo entry). That's a follow-up, not part of this course. |

## Where it starts: the origin of Python

As requested, lesson 1 starts at the very beginning. Every fact is checked:
- **December 1989:** Guido van Rossum, a Dutch programmer at CWI (the national maths and computer science research institute in Amsterdam), starts writing a new language as a hobby project over the Christmas holidays. He builds on what he learned from an earlier teaching language, ABC.
- **The name:** it comes from the British comedy show *Monty Python's Flying Circus*, not the snake.
- **February 1991:** the first public release (version 0.9.0).
- **Later milestones:** Python 1.0 (1994), Python 2.0 (2000) and Python 3.0 (December 2008). Python 2 reached its end of life on 1 January 2020.
- **The Python Software Foundation** (founded 2001) looks after the language. It is free and open source.
- **The Zen of Python** (Tim Peters, PEP 20) is the language's philosophy. Typing `import this` prints it, including "Readability counts."
- **Guido** led Python as its "Benevolent Dictator For Life" until 2018. Since then, an elected Steering Council has led it.

The course teaches **Python 3** throughout.

## The story

**Ada** (24, Lagos, junior product designer at a fintech startup) is the course lead. The cast sheet already says she's "teaching herself Python on the side". In AI at Work she learns to use AI at her job; this is the other half of her year.

**The project:** Ada runs the office **ajo**, the rotating savings group common in Nigeria. Ten colleagues each pay in every month, and one person collects the whole pot each month. She tracks it in a battered notebook. Someone always disputes who has paid. She decides to build an **Ajo Tracker** in Python.

Every chapter adds a real feature, so the code learners write *is* the story:

- the welcome screen;
- members' names;
- the money maths;
- "who's next?";
- the payment log;
- saving to a file;
- and finally, a program the whole office uses.

**Arjun** (Bengaluru, freelance developer) is her mentor. He does contract work for Ada's startup, and that becomes their fixed relationship. He's patient and precise, and he has opinions about variable names. He's competent but not perfect: he writes code nobody else can read, and Ada teaches him why readable code matters. The office ajo members appear as names in Ada's code. No other new characters are needed.

**Map markers are version numbers.** Each chapter's banner shows the Ajo Tracker's version: **v0.1** after Chapter 1, up to **v1.0** at the end. Learners watch their program grow on the map.

The Intermediate level continues the story: Ada turns the tracker into a small web app.

## The course at a glance

| | |
|---|---|
| Who it's for | Complete beginners: never coded, or tried once and gave up. Any phone or computer. |
| End outcome | Write small Python programs that solve real problems, and read and fix other people's simple code. |
| Chapters | 13 |
| Lessons | 260 (20 per chapter: 16 teaching + 3 Checkpoints + 1 Chapter Challenge) |
| Lesson length | 10–15 minutes, about 10 exercises |
| Free | Chapter 1, lessons 1–5 |
| Language | Python 3. Runs in the browser, nothing to install. Installing Python on a computer is taught in Chapter 12. |
| Code typing | Phone-friendly. Typed code stays under ~5 lines; longer code uses Tap to build, Fill in the blanks and Put in order (playbook §7). |

## Chapters

| # | Chapter (map banner) | Marker | The learner can... |
|---|---|---|---|
| 1 | Hello, Python | v0.0 | Explain where Python came from, and write and run their first lines |
| 2 | Names for things | v0.1 | Store and reuse information with variables and f-strings |
| 3 | Money maths | v0.2 | Do real calculations, including money that adds up exactly |
| 4 | Working with words | v0.3 | Clean up, slice and format text, and ask the user for input |
| 5 | Who's paid? | v0.4 | Make decisions with if, elif and else |
| 6 | The member list | v0.5 | Store and change many items with lists |
| 7 | Round and round | v0.6 | Repeat work with for and while loops |
| 8 | Write it once | v0.7 | Package code into functions they can reuse |
| 9 | Name to amount | v0.8 | Look things up with dictionaries |
| 10 | When it breaks | v0.9 | Read error messages, debug, and handle errors with try/except |
| 11 | Don't lose the data | v0.95 | Save and load data with files |
| 12 | Python's toolbox | v0.99 | Use modules (random, datetime, math) and install Python on a computer |
| 13 | Ajo Tracker 1.0 | v1.0 | Build, test and share a complete program |

---

## Chapter 1 — Hello, Python (written first; includes the free lessons)

**Story:** Ada's notebook dispute. Tunde swears he paid in March, and the notebook says he didn't. Ada decides there must be a better way. Arjun says, "Learn Python. Start where Python started."

**Chapter climax (lesson 20):** Ajo Tracker v0.1. The first program prints a proper welcome screen for the office ajo.

The free stretch (lessons 1–5) gets the learner from "what is Python?" to running real code.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | Where Python came from | Guido's Christmas project (1989), the Monty Python name, why Python spread | Story |
| 2 | What Python is used for | Myth or fact: "only for experts", "named after a snake", "used in AI, data, apps and automation" | Myth or Fact |
| 3 | What is a program? | Instructions run exactly, top to bottom; what an interpreter does | Step-by-step |
| 4 | Your first line: `print()` | `print("Hello, Ajo!")`, try it live | Before / After |
| 5 | **Checkpoint 1** | Origins plus first code | Mixed review |
| 6 | Text needs quotes | Strings, single and double quotes, what happens without them | Tap to explore |
| 7 | Printing several things | Several lines, commas, numbers vs text | Step-by-step |
| 8 | Comments: notes for humans | `#`, why Arjun's uncommented code confuses everyone | Chat with Tey |
| 9 | Errors are normal | Ada's first SyntaxError: a missing quote, read calmly | Story |
| 10 | **Checkpoint 2** | | Mixed review |
| 11 | Python as a calculator | `+ - * /`, order of operations | Before / After |
| 12 | The Zen of Python | `import this`, "Readability counts", why Python looks the way it does | Reading |
| 13 | Where Python runs | The interpreter, `.py` files, running in the browser vs on a computer | Card deck |
| 14 | Read code before you write it | Predict the output, then run it | Tap to explore |
| 15 | **Checkpoint 3** | | Mixed review |
| 16 | Think like a programmer | Break a problem into tiny steps; pseudocode | Chat with Tey |
| 17 | Learning to code with AI, honestly | Use AI to explain errors, not to write your answers (links to Study Smarter) | Story |
| 18 | Ada's plan for the Ajo Tracker | Turning the notebook into a list of features | Step-by-step |
| 19 | The most common beginner mistakes | Missing quotes and brackets, capital `Print`, curly quotes from phones | Myth or Fact |
| 20 | **Chapter Challenge: Ajo v0.1** | Print the welcome screen | Whole chapter, harder |

Every lesson has at least one **Try it live** or **Write and run** moment (playbook §7).

---

## Chapters 2–13 (lesson titles; Checkpoints at 5, 10, 15 and the Chapter Challenge at 20)

### Chapter 2 — Names for things (v0.1)
*Story: Ada stops retyping "Ajo Office Savings" everywhere. Climax: the welcome screen built from variables.*

1. Variables are labelled boxes · 2. Naming rules (and Arjun's bad names) · 3. Changing a variable · 4. Text and numbers are different types · **5 Checkpoint** · 6. `type()`: what is this? · 7. Joining text · 8. f-strings · 9. Numbers inside f-strings · **10 Checkpoint** · 11. `int()` and `str()`: converting · 12. Constants and capital names · 13. Swapping values · 14. Reading variables in someone else's code · **15 Checkpoint** · 16. Good names make code readable · 17. Common variable mistakes · 18. Debugging a NameError · 19. Ada's member card · **20 Chapter Challenge**

### Chapter 3 — Money maths (v0.2)
*Story: the monthly pot. 10 members × ₦20,000. Climax: a payout calculator that matches the notebook to the last kobo.*

1. Whole numbers and decimals · 2. `+ - * /` with variables · 3. Order of operations · 4. Floor division `//` and remainder `%` · **5 Checkpoint** · 6. Powers `**` · 7. `round()` · 8. Why 0.1 + 0.2 isn't 0.3 · 9. Money in kobo: whole numbers for exact money · **10 Checkpoint** · 11. `+=` and friends · 12. Percentages and fees · 13. Formatting money with commas · 14. Averages · **15 Checkpoint** · 16. The payout calculator · 17. Common maths bugs · 18. Checking your answers · 19. Reading maths in code · **20 Chapter Challenge**

### Chapter 4 — Working with words (v0.3)
*Story: members' names typed ten different ways ("TUNDE ", "tunde", "Tunde"). Climax: clean names, every time.*

1. Strings are sequences · 2. `len()` · 3. Indexing: the first letter · 4. Slicing · **5 Checkpoint** · 6. `.upper()`, `.lower()`, `.title()` · 7. `.strip()` · 8. `.replace()` · 9. `in` for text · **10 Checkpoint** · 11. `input()`: asking the user · 12. Input is always text · 13. Converting input to numbers · 14. Escape characters and new lines · **15 Checkpoint** · 16. Formatting a receipt · 17. Splitting and joining · 18. Common string bugs · 19. Clean every name · **20 Chapter Challenge**

### Chapter 5 — Who's paid? (v0.4)
*Story: the payment check. Climax: the program answers "has Tunde paid?" so the notebook argument ends.*

1. True and False · 2. Comparing values · 3. `if` · 4. Indentation matters · **5 Checkpoint** · 6. `else` · 7. `elif` · 8. `and`, `or`, `not` · 9. Comparing text · **10 Checkpoint** · 11. Nested decisions · 12. Late fees with conditions · 13. Checking input is valid · 14. Truthy and falsy · **15 Checkpoint** · 16. Reading decision code · 17. Common if mistakes · 18. Testing every branch · 19. The payment checker · **20 Chapter Challenge**

### Chapter 6 — The member list (v0.5)
*Story: ten members, one list. Climax: add, remove and reorder members as the ajo changes.*

1. Lists hold many things · 2. Indexes start at 0 · 3. `len()` of a list · 4. Changing an item · **5 Checkpoint** · 6. `.append()` and `.insert()` · 7. `.remove()` and `.pop()` · 8. `in` for lists · 9. Sorting · **10 Checkpoint** · 11. Slicing lists · 12. Lists of numbers: `sum`, `min`, `max` · 13. Lists inside lists · 14. Copying vs sharing a list · **15 Checkpoint** · 16. Whose turn is it? · 17. Common list bugs · 18. IndexError, explained · 19. The member manager · **20 Chapter Challenge**

### Chapter 7 — Round and round (v0.6)
*Story: printing every member's status by hand is getting old. Climax: one loop prints the whole month.*

1. Why loops · 2. `for` over a list · 3. `range()` · 4. Adding up in a loop · **5 Checkpoint** · 6. Loops with if · 7. `while` loops · 8. Avoiding infinite loops · 9. `break` and `continue` · **10 Checkpoint** · 11. Counting things · 12. `enumerate()` · 13. Loops over text · 14. Nested loops · **15 Checkpoint** · 16. A menu that repeats · 17. Common loop bugs · 18. Tracing a loop by hand · 19. The monthly report · **20 Chapter Challenge**

### Chapter 8 — Write it once (v0.7)
*Story: the same ten lines are copied in four places, and Arjun winces. Climax: the tracker split into neat functions.*

1. What a function is · 2. `def` and calling · 3. Parameters · 4. `return` · **5 Checkpoint** · 6. Return vs print · 7. Default values · 8. Several parameters · 9. Variables inside functions · **10 Checkpoint** · 11. Functions calling functions · 12. Naming functions well · 13. Docstrings · 14. Breaking a program into functions · **15 Checkpoint** · 16. Testing a function · 17. Common function bugs · 18. Reading someone else's function · 19. Refactoring the tracker · **20 Chapter Challenge**

### Chapter 9 — Name to amount (v0.8)
*Story: who paid how much? Lists aren't enough. Climax: a dictionary of every member's payments.*

1. Dictionaries: keys and values · 2. Looking things up · 3. Adding and changing · 4. KeyError and `.get()` · **5 Checkpoint** · 6. Looping over a dictionary · 7. `.items()` · 8. Counting with a dictionary · 9. Dictionaries of lists · **10 Checkpoint** · 11. Lists of dictionaries · 12. Checking a key exists · 13. Sorting by value · 14. Choosing list or dictionary · **15 Checkpoint** · 16. The payment ledger · 17. Common dictionary bugs · 18. Reading data-shaped code · 19. Who owes what · **20 Chapter Challenge**

### Chapter 10 — When it breaks (v0.9)
*Story: a colleague types "twenty thousand" and the tracker crashes in front of the whole office. Climax: a tracker that can't be crashed.*

1. Reading a traceback · 2. SyntaxError vs runtime errors · 3. The five errors you'll see most · 4. Print-debugging · **5 Checkpoint** · 6. `try` and `except` · 7. Catching the right error · 8. `else` and `finally` · 9. Validating input in a loop · **10 Checkpoint** · 11. Raising your own errors · 12. Debugging with AI, honestly · 13. Rubber-duck debugging · 14. Bugs that don't crash · **15 Checkpoint** · 16. Testing edge cases · 17. `assert` · 18. A debugging checklist · 19. Crash-proofing the tracker · **20 Chapter Challenge**

### Chapter 11 — Don't lose the data (v0.95)
*Story: the browser tab closed and the whole month was gone. Climax: the tracker remembers everything.*

1. Why files · 2. Writing to a file · 3. Reading a file · 4. `with open(...)` · **5 Checkpoint** · 6. Reading line by line · 7. Appending · 8. CSV: data like a spreadsheet · 9. The `csv` module · **10 Checkpoint** · 11. Saving a dictionary · 12. JSON · 13. When the file doesn't exist · 14. Keeping a backup · **15 Checkpoint** · 16. Loading on start, saving on exit · 17. Common file bugs · 18. Private data in files · 19. The tracker remembers · **20 Chapter Challenge**

### Chapter 12 — Python's toolbox (v0.99)
*Story: Arjun shows Ada how much Python already gives you for free. Climax: dates, reminders and a fair random draw for the payout order.*

1. Modules and `import` · 2. `random` · 3. A fair draw for payout order · 4. `datetime` · **5 Checkpoint** · 6. Due dates and days late · 7. `math` · 8. Reading the documentation · 9. Installing Python on a computer · **10 Checkpoint** · 11. Running `.py` files · 12. `pip` and packages, explained · 13. Your own module · 14. Where to find help · **15 Checkpoint** · 16. Code style: PEP 8 basics · 17. Common import bugs · 18. Choosing the right tool · 19. The tracker gets reminders · **20 Chapter Challenge**

### Chapter 13 — Ajo Tracker 1.0 (final)
*Story: launch day in the office. Climax: everyone uses it, nobody argues, and Tunde has paid (this time).*

1. Planning the final version · 2. The menu · 3. Adding members · 4. Recording payments · **5 Checkpoint** · 6. Who collects this month? · 7. The monthly report · 8. Saving and loading · 9. Testing everything · **10 Checkpoint** · 11. Handling every bad input · 12. Making it readable · 13. Getting feedback from users · 14. Fixing the first bug report · **15 Checkpoint** · 16. Sharing your code · 17. Looking back at v0.0 · 18. What's next: Intermediate (the web app) · 19. Final project briefing · **20 Final Challenge + Project**

**Final Project:** build a small program for a real problem in your own life, such as a savings tracker, a quiz, a timetable or a shopping list. Use at least variables, decisions, a loop, a function and a list or dictionary. Share it, and write a short reflection on what you'd add next.

---

## What has to be built first: the code runner (playbook piece 5)

Python for Beginners can't ship without it. "Duolingo for Python" learners expect to type and run code, and §7 requires a live code moment in every lesson.

| Piece | What it is |
|---|---|
| **Try it live** (Learn) | A small code card with a Run button. Learners change the code and run it again. |
| **Write and run** (Apply) | Write code, then hidden tests check the output (not exact wording). You get a hint, and the solution is shown after 2 tries; showing it costs the XP bonus, not hearts. |
| **Engine** | Pyodide (Python compiled to WebAssembly) in a Web Worker, loaded only when a coding lesson opens. Nothing runs on Teyro's servers. It has a time limit to stop infinite loops, and `input()` is supported through a prompt. |
| **Phone typing** | A row of quick-insert keys (`( ) : " ' =` and Tab) above the keyboard, so phones don't swap in curly quotes. |
| **Size** | Pyodide is several MB on first load. Show a "warming up Python" loader once, and cache it after that. |

Exercises that already work without the runner: predict the output, fill in the blanks, tap to build, put in order and spot the bug. Each of these can carry code.

## Facts to handle carefully (playbook §9)

- **History:** the dates above only, each with a source in the lesson notes. No popularity rankings with specific positions or numbers. Say "one of the most popular programming languages", which is safe and widely reported.
- **Money:** naira (₦) and kobo are real (100 kobo = ₦1). Ajo amounts are fictional examples.
- **Floats:** explain 0.1 + 0.2 honestly (binary fractions), without hand-waving.

## Keeping people learning (founder, 2026-10-14: "the course needs to be really engaging")

People who search "Duolingo for Python" have usually quit something already. The course is designed so the next lesson always feels worth opening:

1. **Real code in the first two minutes of every lesson.** Every lesson opens with a hook and then a Try it live card. Nobody reads for long before running something.
2. **Wins every couple of minutes.** About 10 exercises, mixed, with at least one Write and run per lesson. Runs are free, so a wrong program never costs a heart; the checklist turns green item by item, so even a partial solution feels like progress.
3. **The program grows with the learner.** Each chapter adds a real feature to the Ajo Tracker, and the map banner shows its version (v0.1 to v1.0). Chapter Challenges end with the new version running.
4. **Make it yours.** Try it live cards end with a "your turn" challenge (change the name, the amount, the rule). Chapter projects use the learner's own data.
5. **Errors are part of the game, not a punishment.** Tey explains every error in plain words, and lessons deliberately show common errors before learners meet them alone.
6. **Story cliffhangers.** Each chapter's story ends on the next problem ("the tab closed and the month was gone"), so the next chapter has a reason to exist.
7. **Practice outside lessons.** The Code playground (`/dashboard/code`) has free coding and short challenges. New challenges are added as chapters are released, so learners have something to do on days they've already done their lesson.
8. **Honest difficulty.** Short typed code on phones (under ~5 lines), tap-to-build for longer code, hints always available, the solution after two failed runs.

## Founder decisions (2026-10-14)

1. **Approved:** "Python for Beginners", storyline "Ada's First Program" (the Ajo Tracker, Arjun mentoring, version-number markers).
2. **Approved:** the 13 chapters and Chapter 1's lesson list, starting from Python's origin.
3. **Approved and built:** the code runner first. There's also a standalone Code playground, so learners can write code outside lessons.
4. **Approved:** a separate SEO page for the "Duolingo for Python" search, after the course is live.
5. **Engagement** is a hard requirement: see "Keeping people learning" above.
