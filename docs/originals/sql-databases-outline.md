# SQL and Databases for Beginners — outline

> Teyro Original, Coding category. **Short format** (like Data Science for Beginners): one level, 5 chapters × 10 lessons, a Checkpoint at lesson 5 and a Unit Challenge at lesson 10 of every chapter. Written 2026-10-23.
> Track file: `backend/originals/tracks/sql-databases.ts`. Runner: real SQLite in the browser (sql.js 1.14.1, `runner: 'sql'`).

## The film: *Save the Starlight*

**Logline.** Chicago, October 2026. The Starlight Picture House turns 100 on Friday 20 November. On a sold-out Casablanca night, seat G7 is sold twice, two regulars fight over it in front of a property developer's agent, and the bank that could fix the roof asks for one thing: records it can trust. The cinema's projectionist has seven weeks to turn a shoebox of index cards into a real booking database, and an app that runs on it.

**Why it works as a movie.** A ticking clock (the 100th birthday), a villain with a cheque ($2.4 million to knock it down), a mentor on the other side of the world, a sceptic who becomes the biggest fan, and a payoff the learner builds with their own queries: the first sold-out night in years, with no seat sold twice.

**Setting.** Chicago, USA: a 1926 single-screen cinema with 120 seats on a busy street on the North Side. Money is US dollars. All facts about the films (titles, years) are real; runtimes are the Starlight's own prints.

## Cast

| Who | Role |
|---|---|
| **Juno Park** (lead, new) | 27, the Starlight's projectionist for four years. Korean-American, grew up in Albany Park, Chicago. Film-obsessed, night owl, quotes movies when nervous, labels everything. Has edited a web page once; has never written SQL. |
| **Walt Abernathy** (new) | 74, owner. His grandfather opened the Starlight in November 1926. Keeps every booking on an index card in a shoebox. Stubborn, generous (hands out free "comp" tickets to friends), remembers every regular's name and none of their seat numbers. |
| **Leo Marchetti** (new) | 19, usher and film student. Paints the posters, runs the popcorn, bets on everything. Sceptical of "Juno's spreadsheet thing", then the database's loudest fan. Makes the course's big mistake (an UPDATE without WHERE) and owns it. |
| **Dana Whitlock** (new) | Development agent for Crane Holdings, which wants the site for condos. Polite, sharp, always has the numbers. Offers Walt $2.4 million. Not a cartoon: she's right that the Starlight can't prove it's a business, until it can. |
| **Arjun** (shared cast) | Freelance developer in Bengaluru. He and Juno met years ago on a classic-film restoration forum; his favourite single-screen cinema in Bengaluru closed in 2019. Mentors Juno on video calls: 10:30 p.m. in Chicago is 9 a.m. for him. Precise, opinionated about naming. |
| Ms Delgado (narrated) | Loan officer at Lakeview Community Bank. Will lend $40,000 for the roof if the Starlight can show clean records of what it sells. |
| Rosa Marin, Jack Murphy (narrated) | The two regulars who both hold a card for seat G7 on Fri 2 Oct. Members 1 and 13 in the database. |

## The practice databases (frontend/public/sql/db — never change once referenced)

- **`shoebox`**: one table, `cards` (10 rows): Walt's index cards typed in exactly as written. Two cards for seat G7 on Fri 2 Oct, a misspelled film ("Cassablanca"), a missing seat, and `paid` written five different ways.
- **`starlight`**: the real database Juno builds, with six weekends of bookings (Fri 4 Sep to Sun 11 Oct 2026) plus the three 100th-birthday screenings, not on sale yet.
  - `films` (15): id, title, year, genre, minutes
  - `screenings` (27): id, film_id, starts_at (`'2026-10-02 19:30'`), price (evening $14, matinee $9, birthday $25), seats (120)
  - `members` (40): id, name, email (6 missing), city, joined
  - `tickets` (313): id, screening_id, member_id (47 walk-ins with none), seat, price_paid (19 comps at $0), bought_on
  - Key facts: takings $3,536; screening 17 (Casablanca, Fri 2 Oct) has seat G7 sold twice (tickets 225 Rosa, 226 Jack); The General (film 15) only appears on the birthday weekend.
- Chapter 1 also runs on a **new, empty database**, where learners create the tables themselves.

## Chapters

Map marker = the countdown to the 100th birthday.

### Chapter 1 — The Shoebox *(7 weeks to the 100th)*
*Seat G7 is sold twice. Walt's records are a shoebox. The bank wants proof.*
Goal: Read a table with SELECT, design tables, and create and fill them with CREATE TABLE and INSERT.

1. **Seat G7, sold twice** — what a database is; your first `SELECT * FROM cards` (shoebox). Story opener.
2. **Rows and columns** — choosing columns: `SELECT name, seat FROM cards`.
3. **Why the shoebox lies** — before/after: free-for-all cards vs a table with types (TEXT, INTEGER, REAL).
4. **CREATE TABLE films** — making a table with columns and types (empty db).
5. **Checkpoint: Arjun's first call** — lessons 1–4.
6. **INSERT INTO** — adding rows, one and several at once.
7. **One table or two?** — design: films vs screenings, never repeat a film's details.
8. **Every row needs an id** — INTEGER PRIMARY KEY.
9. **Empty is not zero** — NULL, leaving a column out, NOT NULL first look.
10. **Unit Challenge: Starlight v1** — create films + screenings and fill them for the 100th weekend.

### Chapter 2 — Find Me a Seat *(6 weeks to the 100th)*
*The shoebox is typed in. Walt asks a question every five minutes. Leo bets the database can't keep up.*
Goal: Ask the Starlight database questions with WHERE, AND/OR, ORDER BY, LIMIT, LIKE, IN, BETWEEN and IS NULL.

1. **WHERE: only the rows you want** — exact matches, text in single quotes.
2. **Bigger, smaller, not equal** — `>`, `<`, `>=`, `<>` on numbers and dates.
3. **AND, OR and brackets** — combining conditions.
4. **ORDER BY and LIMIT** — sorting and the top 3.
5. **Checkpoint: Walt's Tuesday list** — lessons 1–4 + Chapter 1.
6. **LIKE and wildcards** — `%` and `_` (finding "Cassablanca").
7. **IN and BETWEEN** — lists and ranges.
8. **Who has no email?** — IS NULL, IS NOT NULL (and why `= NULL` never works).
9. **DISTINCT, AS and maths** — unique values, renaming columns, price with tax.
10. **Unit Challenge: Walt vs the database** — the race.

### Chapter 3 — Who Came to What? *(5 weeks to the 100th)*
*Ms Delgado asks who the Starlight's regulars are. The answer is spread across three tables.*
Goal: Combine tables with JOIN and LEFT JOIN to answer questions that cross them.

1. **The number that points** — foreign keys: why tickets store screening_id.
2. **JOIN … ON** — tickets with their screenings.
3. **Short names** — table aliases, picking columns from each table.
4. **Three tables, one answer** — tickets → screenings → films.
5. **Checkpoint: the regulars** — lessons 1–4 + earlier.
6. **LEFT JOIN** — keep every row from the left, even without a match.
7. **Finding who's missing** — LEFT JOIN + IS NULL (members who never came).
8. **JOIN, then filter and sort** — WHERE and ORDER BY on joined rows.
9. **When a join goes wrong** — the missing ON, the row explosion, ambiguous columns.
10. **Unit Challenge: the invitation list** — who gets a 100th-birthday invitation.

### Chapter 4 — Prove It to the Bank *(4 weeks to the 100th)*
*Dana says the Starlight is a hobby. Ms Delgado wants totals. Walt wants to know what his comps cost.*
Goal: Summarise data with COUNT, SUM, AVG, MIN, MAX, GROUP BY and HAVING.

1. **COUNT** — how many tickets, how many rows match.
2. **SUM and AVG** — takings, average price, ROUND.
3. **MIN and MAX** — the earliest booking, the busiest night.
4. **GROUP BY** — one row per screening, per city, per price.
5. **Checkpoint: Walt's comps** — lessons 1–4 + earlier.
6. **GROUP BY with JOIN** — takings per film.
7. **HAVING** — filtering groups; finding seat G7 sold twice in the data.
8. **COUNT(*) vs COUNT(column)** — counting NULLs, COUNT(DISTINCT).
9. **CASE WHEN** — matinee vs evening, in one query.
10. **Unit Challenge: the bank report** — the numbers for Ms Delgado.

### Chapter 5 — Opening Night *(The 100th birthday)*
*Tickets go on sale. The database must take bookings, refuse mistakes and stay fast, live, in front of a full lobby.*
Goal: Change data safely and protect it with constraints, keys, transactions and indexes, then use it from an app.

1. **UPDATE … WHERE** — changing rows (Leo sets every price to $25).
2. **DELETE, carefully** — preview with SELECT first.
3. **UNIQUE: G7 never again** — constraints: UNIQUE, NOT NULL, CHECK.
4. **Foreign keys that say no** — REFERENCES refuses a ticket for a screening that doesn't exist.
5. **Checkpoint: on sale** — lessons 1–4 + earlier.
6. **All or nothing** — transactions: BEGIN, COMMIT, ROLLBACK (two seats, one family).
7. **Fast at 9 a.m.** — CREATE INDEX and EXPLAIN QUERY PLAN.
8. **A view for the box office** — CREATE VIEW for "tonight's seats".
9. **The app talks SQL** — how the booking app sends queries with `?` parameters (and why never paste user text into SQL).
10. **Unit Challenge: the 100th birthday** — the whole booking flow, live.

## Rules followed

- Short, plain cards; every lesson has real SQL to run (Try it live) and to write (Write and run); typed SQL stays short on a phone, with Tap to build, Fill in the blanks and Put in order for longer statements.
- Learn → Apply → Reflect → Deepen; correct answers in varied positions (the player doesn't shuffle options).
- Review exercises from earlier chapters from Chapter 2 on.
- "Coins", never "gems". No emoji. No African setting; money in USD.
