# Data Science for Beginners — Outline

> Coding category (built 2026-10-16). Short Original: 5 chapters × 10 lessons.
> **Storyline: "Zanele's First Dataset".** Lead: Zanele. Countdown: 5 weeks to Mr Kamau.
> Every lesson runs real Python with pandas in the learner's browser
> (frontend/public/python: runner.worker.js loads pandas on demand;
> teyro_datasets.py builds the practice files).

## The story

Zanele Dlamini (Corporate Jargon) is now a junior analyst at Synergix in Nairobi. At the end of How to Lead Without Being the Boss, Mr Kamau asked Remi to lead the delivery-times project. Remi's first message to Zanele: "Kamau says 1 in 3 deliveries is late. He wants to know why, in five weeks. You're the spreadsheet genius. Help?"

Zanele has never written a line of code. Felix sends her March's delivery export, and Remi suggests she learns Python and pandas to do it properly: the same steps, every week, with the working shown.

- **Zanele**: lead. Spreadsheet genius, new to code. Still uses jargon confidently and wrongly ("let's synergise the columns").
- **Remi**: leads the delivery-times project; asks the questions Kamau will ask.
- **Felix** (IT): exports the data, and broke it a bit on the way.
- **Emeka** (Logistics, by video from Lagos): runs the depots; sure the problem is one driver.
- **Mrs Achieng**: knows the unwritten rule that explains everything (the last Friday truck leaves at 2 p.m.).
- **Mr Kamau** (CEO): the final presentation. Wants one honest answer.
- **Tey**: teaches the Python in chat cards.

Zanele's arc: from "the data will tell me" to "I ask a clear question, clean honestly, compare like with like and say what I don't know."

## The data (built in, deterministic)

`deliveries_clean.csv`: 400 deliveries, March 2026, three depots (Nairobi 198, Mombasa 131, Kisumu 71), six drivers.
`deliveries.csv`: the same data as Felix exported it: 408 rows (8 duplicates), 6 blanks in actual_days and late, 5 distances typed as "161 km", 29 spellings of 10 cities, and one 99-day typo (D1289, really 1). Clean it and 393 rows remain.

Numbers the lessons use (re-checked by `npm run originals`, which runs every solution):

| Fact | Value |
|---|---|
| Late | 135 of 400 (0.3375, "1 in 3") |
| Late by day | Sat 87%, Fri 47%, Tue 27%, Mon 19%, Wed 16%, Thu 14% |
| Weekend hold (Fri from 2 p.m. or Sat) | 85 orders, 75 late (88%); the other 315: 60 late (19%) |
| Friday before / after 2 p.m. | 24% / 91% |
| Share of all late that are weekend holds | 75 of 135 (56%) |
| Late by driver | Baraka 60%, Auma 38%, Wanjiru 36%, Kiprop 23%, Mwangi 22%, Juma 20% |
| Baraka's mean distance | 381 km (others 102–139 km); all 73 of his trips are long routes |
| Long routes (> 250 km), late | Baraka 60% (73 trips); everyone else 49% (35 trips) |
| Correlation, distance and actual days | 0.71 |
| Late rate by week | 33%, 35%, 33%, 34% (flat) |
| What if weekend holds were like other days | about 19% late (from 34%) |
| Messy file mean / median actual_days | 2.70 / 2 (the 99 pulls the mean; clean mean 2.465) |

## Research base

| Idea | Source |
|---|---|
| "An approximate answer to the right question" | John Tukey, The Future of Data Analysis (1962) |
| Exploratory data analysis; box-plot fences for outliers | John Tukey, Exploratory Data Analysis (1977) |
| Tidy data: one row per thing, one column per variable | Hadley Wickham, "Tidy Data", Journal of Statistical Software (2014) |
| Time spent preparing data | Anaconda, State of Data Science 2020 (about 45% on loading and cleaning). Hedged: surveys vary |
| Same summary statistics, very different data | Anscombe, "Graphs in Statistical Analysis" (1973) |
| Mean vs median under skew | Standard statistics; e.g. household income reporting (median preferred) |
| Small samples swing to extremes | Tversky & Kahneman, "Belief in the law of small numbers" (1971); Wainer, "The Most Dangerous Equation" (2007) |
| Simpson's paradox | Bickel, Hammel & O'Connell, Science (1975), UC Berkeley 1973 admissions |
| Spurious correlations | Tyler Vigen, Spurious Correlations (2015) |
| Correlation is not causation; confounders | Standard; e.g. ice-cream sales and drownings, both driven by hot weather |
| Truncated axes mislead | Darrell Huff, How to Lie with Statistics (1954); Cleveland & McGill (1984) on perception |
| Persuading with a chart | Florence Nightingale's 1858 "rose" diagrams of army deaths |
| pandas | pandas documentation (read_csv, value_counts, groupby, drop_duplicates, dropna, str methods, astype, sort_values, corr) |

## Chapters

**Ch1 · 5 weeks to Kamau · "What's the question?"**: print, numbers and variables, text and lists, import pandas and read a CSV, rows and columns, counting with value_counts, a good question, data types. Challenge: write the question on the wall.

**Ch2 · 4 weeks to Kamau · "Messy data"**: Felix's real export (408 rows), info and isna, duplicates, blanks, city spellings, "161 km", the 99-day delivery, never edit the raw file. Challenge: 393 clean rows.

**Ch3 · 3 weeks to Kamau · "What's normal?"**: mean vs median, spread and describe, outliers, a late rate from True/False, groupby, counts vs rates, small groups. Challenge: Saturday.

**Ch4 · 2 weeks to Kamau · "Patterns"**: sorting, filtering, two conditions (the 2 p.m. Friday truck), like with like (Baraka), correlation, honest charts (Learn cards; the runner draws text bars), misleading charts, Simpson's paradox. Challenge: the weekend hold.

**Ch5 · Kamau week · "The answer"**: correlation isn't causation (Emeka's trucks), spurious patterns, testing the explanation, is it getting worse, what if we fixed it, one headline, saying what you don't know, rehearsal. Final: presenting to Mr Kamau, who approves a Saturday dispatch pilot. Baraka keeps his job.

## Style for this course

- Markers count down to the presentation: "5 weeks to Kamau" → "Kamau week".
- Every lesson: a story beat, a Try it live card on the real data, and at least one Write and run exercise with checks on exact numbers.
- Charts are taught on Learn cards; the runner shows text, so learners draw text bar charts with `"#" * n`.
