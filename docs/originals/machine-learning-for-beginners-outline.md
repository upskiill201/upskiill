# Machine Learning for Beginners — Course Outline

> Coding category. **Status: APPROVED (2026-10-18).** Runner (scikit-learn), dataset, placement, cover and Chapters 1–3 are built on `feat/ml-original`.
> Rules: docs/ORIGINALS_PLAYBOOK.md (§7 coding Originals, §8a storylines). Cast: docs/originals/CAST.md.
> Sits after Python for Beginners and Data Science for Beginners, but doesn't require them: Chapter 2 teaches the Python and pandas this course needs.

## Why this course

People who finish Python and Data Science ask the obvious next question: "Can I make the computer predict things?" Most ML courses answer with maths first, a laptop install, and a dataset about flowers. Learners quit before they train anything.

This course does the opposite:
- **a model in the first chapter**, made by hand, with no code at all;
- **real scikit-learn**, running in the browser on a phone, from Chapter 5;
- **one story and one dataset** all the way through, so every new idea improves the same model;
- **honesty as a skill**: baselines, leakage, overfitting and fairness are taught as the moments where beginners fool themselves.

| | |
|---|---|
| **Course title** | **Machine Learning for Beginners** (the words people search) |
| **Storyline** | **Halima's Empty Chairs** |
| Tagline | *From "what is machine learning?" to a model people trust.* |
| Course-page hook | "Learn machine learning by building one real model, step by step: 10-minute lessons, real Python in your browser, no maths degree and nothing to install." |

## The story

**Halima** (from the How to Motivate a Team cast) is the newest on Afiya's Clinic Success team in Lagos. She's a former nurse from Kano: quiet, brilliant with clinics, unsure she belongs in tech.

**The problem:** across Afiya's clinics, about **1 in 5 booked appointments end with an empty chair.** Every empty chair is a nurse waiting and a patient who didn't get care. Folake (the COO) announces "We'll use AI to fix no-shows" and gives the team until the board meeting. Halima has spent years on the clinic floor and knows *why* patients miss: the bus fare, the rain, the three-week wait, the reminder that never came. She doesn't know any machine learning.

**What she builds:** a **no-show predictor**. It flags which appointments are likely to be missed, so clinics can send an extra reminder or offer a nearer slot to those patients first.

**Map markers are model versions.** Each chapter's banner shows the predictor's version, from **v0.1** (a rule on paper) up to **v1.0** (a model the clinics actually use). Each version also shows its honest test score, so learners watch it improve, and occasionally get worse.

| Character | Role in this course |
|---|---|
| **Halima** | Lead. Turns nurse instinct into features and questions the numbers. Arc: from "I'm not a tech person" to "I built the thing, and I can tell you exactly where it's wrong." |
| **Miracle** | Her manager and mentor. Software Engineering graduate. Direct ("show me the test score, not the training score"). |
| **Chidi** | Top performer and resident sceptic. Bored, sharp; he finds the leak in Chapter 4 and the shortcut in Chapter 9. |
| **Emmanuel** | Funny, does the minimum, and is quietly brilliant at spotting bugs. Owns the clinic booking export. |
| **Bisi** | Talks to the clinics every day. She's the voice of "but what will the clinic actually do with this?" |
| **Folake** (COO) | Wants one number for the board. Has to learn why "99% accurate" can mean useless. |
| **Tey** | Teaches the ideas and the code in chat cards. |

Story speakers stay within the CastId list (halima, miracle, chidi, emmanuel, bisi, folake, tey, narrator). No new characters are needed.

## The data (built in, deterministic)

A new practice file is generated in the browser by `frontend/public/python/teyro_datasets.py`, with a fixed seed, the same way the delivery data is. Every lesson says plainly that it's **made-up practice data**: no real patients.

`appointments.csv` has about 2,400 appointments at 8 Afiya clinics over 12 weeks. Its columns:
- `wait_days`, how long since booking;
- `sms_reminder`;
- `distance_km`;
- `previous_no_shows`;
- `weekday`, `hour` and `rain`;
- `age_group` and `clinic`;
- `visit_type`;
- `no_show`, the label.

Patterns are planted on purpose, so each chapter has something real to find:

| Planted pattern | Taught in |
|---|---|
| Long waits, no reminder, long distance and past no-shows raise the no-show rate | Ch 3–6 |
| Rain on the day adds a smaller effect | Ch 8 |
| **A leaky column**, `confirmed_on_day` (filled in *after* the appointment), predicts no-shows almost perfectly | Ch 4 (the leakage trap) |
| About 80% of rows are "showed up", so "always guess they show" scores about 80% accuracy | Ch 7 (the accuracy trap) |
| One small rural clinic has far fewer rows and a different pattern | Ch 12 (fairness) |
| A messy export with blanks, mixed spellings, duplicates and a typo | Ch 2 and Ch 8 |

A second file, `clinic_visits.csv`, has 300 Afiya clinics with no labels and is used for clustering in Chapter 11. A third, `appointments_raw.csv`, is the messy export.

**Built 2026-10-18** (seed 1959). Numbers measured in Pyodide; lessons that use them are re-checked by `npm run originals`:

| Fact | Value |
|---|---|
| Rows | 2,400 appointments, 8 clinics, 12 weeks |
| No-shows | 439 of 2,400 (18.3%, "about 1 in 5") |
| "Everyone shows" accuracy | 81.7% |
| By SMS reminder | none 26.2%, reminder 12.4% |
| By rain | dry 17.2%, rain 21.5% |
| By previous no-shows | 0: 12.1%, 1: 21.6%, 2: 25.8%, 3: 47.4%, 4: 53.9% |
| By wait | 0–7 days 15.7%, 8–14: 18.6%, 15–21: 23.9%, 22+: 34.3% |
| Gumel (rural) | 134 rows, 37.3% no-shows; rain there: 60.0% vs 32.1% dry |
| Leak: `confirmed_on_day` | matches the label 97.4% of the time |
| Logistic regression, 5 honest features (75/25 split, random_state=42) | 82.3% accuracy vs 82.2% baseline, recall 13%. That's the accuracy trap for Chapter 7. At a 0.3 threshold: recall 48%, precision 43% |
| Same model with the leak | 97.3% accuracy (Chidi's "99%" in Chapter 4) |
| `appointments_raw.csv` | 2,412 rows (12 duplicates), 10 blank distances, 6 "12 km"-style texts, one 400-day typo, mixed-case clinic names |

**Download size (measured):** the first scikit-learn lesson downloads scikit-learn 21 MB, scipy 45 MB and openblas 6 MB, about 72 MB, on top of pandas and numpy (about 35 MB). That's too much for many phone data plans. **Decide before Chapter 5:** keep real scikit-learn behind a "download the ML tools (about 70 MB, Wi-Fi recommended)" screen, or teach Chapters 5–11 with a small built-in `teyro_ml` module with the same fit/predict API (no extra download), and use real scikit-learn only in an optional "on your computer" lesson.

## Where it starts: what machine learning actually is

Lesson 1 starts at the beginning, with every fact checked:
- **Arthur Samuel** at IBM built a checkers program that improved by playing itself. His 1959 paper is usually credited with popularising the term "machine learning". *Note: the famous quote "the ability to learn without being explicitly programmed" is a later paraphrase, not a line from his paper. Lessons say "is often summed up as", never put it in quotes as his words.*
- **The one-sentence idea:** normal programs follow rules a person wrote. ML programs **find the rules from examples**.
- Learners already met this in the Python course (Ada's if/elif fee rules). That code was rules *written*; this course is rules *learned*.
- **Where it's used:** spam filters, card-fraud alerts, maps' arrival times, keyboard suggestions. These are well-known uses, and no statistics are claimed for them.
- **ML vs AI vs chatbots:** AI is the big umbrella and ML is one way to build it. The chat AIs people use are very large ML models trained on text. This course builds a small model you can fully understand.

## The course at a glance

| | |
|---|---|
| Who it's for | Beginners who can read a little Python, or are willing to learn it in Chapter 2. No maths beyond percentages. |
| End outcome | Frame a prediction problem, prepare data, train and fairly test a model with scikit-learn, explain its mistakes, and check it for fairness. |
| Chapters | 13 |
| Lessons | 260 (20 per chapter: 16 teaching + 3 Checkpoints + 1 Chapter Challenge) |
| Lesson length | 10–15 minutes, about 10 exercises |
| Free | Chapter 1, lessons 1–5 |
| Runs where | In the browser. Chapters 1–4 use plain Python and pandas; scikit-learn loads from Chapter 5. |
| Maths | Taught only when needed, with pictures and small numbers. No calculus, no matrices. |
| Code typing | Phone-friendly: under ~5 typed lines; longer code uses Tap to build, Fill in the blanks and Put in order. |

## Easy to start, easy to continue, easy to skip ahead

- **Start:** Chapter 1 is mostly ideas, with one or two lines of Python per lesson (print, a variable, an if). You sort examples, guess rules, and build a "model" out of a few if-statements in the first week.
- **Continue:** every chapter ends with a better version of the same predictor. The map shows the version and its score, so there's always a reason to open the next lesson.
- **Jump ahead (already built):** any locked chapter has "Jump here". Pass that chapter's test, built from its Checkpoints and Challenge, at 80% and it unlocks. You get no XP or Coins for skipping, as for every Original.
- **Find my level (needs one small change):** today only Python has the placement test. Adding this course to `PLACEMENT_TRACKS` (backend `originals.policy.ts`, mirrored in frontend `lib/path/testOut.ts`) gives it a "Find my level" card. Someone who already knows pandas lands on Chapter 3; someone who has trained models before can test into Chapter 7 or later.
- Chapter 2 exists mainly so people can **test out of it**: people who did Python and Data Science skip it in one sitting.

## Chapters

| # | Chapter | Marker | Learners can... |
|---|---|---|---|
| 1 | What is machine learning? | v0.1 | Explain rules vs learning, and make a rule-based guess from examples |
| 2 | The Python you need | v0.2 | Load, clean and explore a dataset with pandas (refresher, test-out friendly) |
| 3 | Learning from neighbours | v0.3 | Build a nearest-neighbour predictor from scratch |
| 4 | Fair tests | v0.4 | Split data into train and test, and catch leakage |
| 5 | Predicting numbers | v0.5 | Fit a line, by hand and with scikit-learn (linear regression) |
| 6 | Predicting yes or no | v0.6 | Train classifiers: logistic regression and decision trees |
| 7 | Is it actually good? | v0.7 | Use baselines, a confusion matrix, precision and recall |
| 8 | Better ingredients | v0.8 | Engineer features: categories, scaling, missing values, pipelines |
| 9 | Too good to be true | v0.9 | Spot overfitting; use cross-validation and tuning |
| 10 | Many trees | v0.95 | Use random forests and feature importance |
| 11 | Finding groups | v0.97 | Cluster unlabelled data with k-means |
| 12 | Fair and safe | v0.99 | Check fairness across groups, protect privacy, explain predictions |
| 13 | Halima's model 1.0 | v1.0 | Build, test, document (model card) and present a complete model |

Checkpoints are lessons 5, 10 and 15; the Chapter Challenge is lesson 20. Each chapter uses all 8 Learn formats, and every chapter has at least one Story lesson with a choice.

### Chapter 1 — What is machine learning? (v0.1)
*Story: Folake says "AI will fix no-shows." Halima has no idea what that means. Climax: her first "model" is three rules on a sticky note, and it beats guessing.*

| # | Lesson | What it teaches | Format |
|---|---|---|---|
| 1 | Rules, or learning? | Normal programs follow written rules; ML finds rules from examples | Story |
| 2 | Where you already use ML | Spam, fraud alerts, maps, keyboards: myth or fact | Myth or Fact |
| 3 | Examples, features, labels | The words for rows, columns and the answer | Tap to explore |
| 4 | Guess the rule | Sort 12 example patients and find the pattern yourself | Step-by-step |
| 5 | **Checkpoint 1** | | Mixed review |
| 6 | Arthur Samuel's checkers | 1959, a program that improved by playing; the term spreads | Reading |
| 7 | Training and predicting | The two phases of every model | Before / After |
| 8 | A model is a guess-maker | Inputs in, a prediction out, never certain | Chat with Tey |
| 9 | Your first model: if-statements | Three rules in Python predict no-shows (callback to Python Ch5) | Card deck |
| 10 | **Checkpoint 2** | | Mixed review |
| 11 | Measuring a guess | Accuracy: right ÷ total | Step-by-step |
| 12 | ML, AI and chatbots | The umbrella, and where chat AI fits | Before / After |
| 13 | What ML can't do | No data, no pattern, changing world; myth or fact | Myth or Fact |
| 14 | Kinds of problems | Predict a number, predict a category, find groups | Tap to explore |
| 15 | **Checkpoint 3** | | Mixed review |
| 16 | Asking a good question | "Who will miss?" vs "Why do people miss?" | Story |
| 17 | What would the clinic do? | A prediction is only useful if someone acts on it (Bisi) | Chat with Tey |
| 18 | Common beginner myths | "More data fixes everything", "the model understands" | Reading |
| 19 | The plan | The roadmap from v0.1 to v1.0 | Card deck |
| 20 | **Chapter Challenge** | Predictor v0.1: rules, tested on new examples | Mixed |

### Chapter 2 — The Python you need (v0.2)
*Story: Emmanuel sends the booking export, and it's a mess. Climax: one clean table Halima trusts.*

1. Why Python for ML · 2. Variables, lists and if, in 5 minutes · 3. Loading a CSV with pandas · 4. Looking at the data: head, shape, info · **5 Checkpoint** · 6. Picking columns and rows · 7. Filtering · 8. Counting with value_counts · 9. Group averages with groupby · **10 Checkpoint** · 11. Missing values · 12. Duplicates and spellings · 13. Making a new column · 14. Rates, not counts · **15 Checkpoint** · 16. Reading the data like a nurse · 17. Common pandas bugs · 18. Asking the data a question · 19. The clean table · **20 Chapter Challenge**

### Chapter 3 — Learning from neighbours (v0.3)
*Story: Halima's instinct: "a patient like this one usually misses." Climax: a nearest-neighbour predictor, written from scratch, that turns that instinct into code.*

1. "Patients like this one" · 2. Distance between two patients · 3. Finding the nearest one · 4. Predicting from the neighbour · **5 Checkpoint** · 6. One neighbour is fragile · 7. k neighbours and a vote · 8. Choosing k · 9. When units fight (km vs days) · **10 Checkpoint** · 11. Scaling, the simple way · 12. Testing on patients it hasn't seen · 13. Accuracy of the predictor · 14. Slow with lots of data · **15 Checkpoint** · 16. Why it works (and when it doesn't) · 17. Common bugs · 18. Reading someone's kNN code · 19. Predictor v0.3 · **20 Chapter Challenge**

### Chapter 4 — Fair tests (v0.4)
*Story: Chidi's model scores 99%. Miracle doesn't celebrate. Climax: Halima finds the leak, and the honest score is far lower, and real.*

1. Memorising vs learning · 2. Train and test sets · 3. Splitting at random · 4. Never peek at the test set · **5 Checkpoint** · 6. Chidi's 99% · 7. Data leakage · 8. Columns from the future · 9. Splitting by time · **10 Checkpoint** · 11. Same patient twice · 12. A validation set · 13. Random seeds and repeatable results · 14. Reporting a score honestly · **15 Checkpoint** · 16. The leak hunt · 17. Common testing mistakes · 18. Explaining it to Folake · 19. Predictor v0.4 · **20 Chapter Challenge**

### Chapter 5 — Predicting numbers (v0.5)
*Story: before no-shows, Folake asks an easier question: "How many patients will each clinic get next week?" Climax: a line that predicts it, then scikit-learn does the same in two lines.*

1. Predicting a number · 2. A line through the points · 3. Slope and starting point · 4. How wrong is a line? (error) · **5 Checkpoint** · 6. Mean absolute error · 7. Finding the best line · 8. Meet scikit-learn · 9. fit and predict · **10 Checkpoint** · 11. More than one feature · 12. Reading the coefficients · 13. A baseline: just guess the average · 14. When a line is the wrong shape · **15 Checkpoint** · 16. Predictions vs certainty · 17. Common regression bugs · 18. Reading a regression result · 19. The weekly forecast · **20 Chapter Challenge**

### Chapter 6 — Predicting yes or no (v0.6)
*Story: back to the real question: will this patient miss? Climax: the first real scikit-learn no-show classifier.*

1. Classification · 2. Probabilities, not just yes/no · 3. Logistic regression · 4. Training a classifier · **5 Checkpoint** · 6. The threshold: when do we say "will miss"? · 7. Decision trees · 8. Reading a tree · 9. How deep should a tree go? · **10 Checkpoint** · 11. predict_proba · 12. Comparing two models fairly · 13. Which is easier to explain? · 14. More than two classes · **15 Checkpoint** · 16. Bisi's question: who do we call first? · 17. Common classifier bugs · 18. Reading a classifier's output · 19. Predictor v0.6 · **20 Chapter Challenge**

### Chapter 7 — Is it actually good? (v0.7)
*Story: Folake: "It's 80% accurate, ship it!" But "everyone shows up" is 80% accurate too. Climax: Halima presents the numbers that actually matter.*

1. The accuracy trap · 2. Baselines first · 3. Four kinds of right and wrong · 4. The confusion matrix · **5 Checkpoint** · 6. Precision · 7. Recall · 8. The trade-off · 9. Moving the threshold · **10 Checkpoint** · 11. Which mistake costs more? · 12. One number? F1, honestly · 13. Scores per clinic · 14. Choosing the metric before the model · **15 Checkpoint** · 16. A slide for the board · 17. Common metric mistakes · 18. Reading someone else's results · 19. Predictor v0.7 · **20 Chapter Challenge**

### Chapter 8 — Better ingredients (v0.8)
*Story: Halima's nurse knowledge becomes features: rain, bus distance, "booked on a Monday". Climax: the score jumps, without changing the model.*

1. Features matter more than models · 2. Turning categories into numbers · 3. One-hot encoding · 4. Scaling numbers · **5 Checkpoint** · 6. Filling missing values · 7. New features from old ones · 8. Dates and times as features · 9. The rain feature · **10 Checkpoint** · 11. Pipelines: steps in order · 12. Fitting steps on training data only · 13. Too many features · 14. Features you shouldn't use · **15 Checkpoint** · 16. Halima's floor knowledge · 17. Common feature bugs · 18. Reading a pipeline · 19. Predictor v0.8 · **20 Chapter Challenge**

### Chapter 9 — Too good to be true (v0.9)
*Story: Chidi grows a deeper and deeper tree until it's perfect on training data, and worse on new clinics. Climax: a tuned, cross-validated model Miracle signs off.*

1. Overfitting · 2. Underfitting · 3. Training score vs test score · 4. The sweet spot · **5 Checkpoint** · 6. Cross-validation · 7. cross_val_score · 8. Tuning one setting · 9. Grid search · **10 Checkpoint** · 11. More data vs a better model · 12. Simpler is often better · 13. Tuning without cheating · 14. Learning curves, in words · **15 Checkpoint** · 16. Chidi's shortcut · 17. Common tuning mistakes · 18. Reading a tuning result · 19. Predictor v0.9 · **20 Chapter Challenge**

### Chapter 10 — Many trees (v0.95)
*Story: one tree is shaky; a forest votes. Climax: the best model so far, and a chart of what drives no-shows.*

1. Why one tree wobbles · 2. Many trees, one vote · 3. Random forests in scikit-learn · 4. How many trees? · **5 Checkpoint** · 6. Feature importance · 7. Importance isn't cause · 8. Boosting, in words · 9. Comparing forest and tree · **10 Checkpoint** · 11. Speed and size · 12. Tuning a forest · 13. When a simple model wins · 14. Choosing for the clinic, not the leaderboard · **15 Checkpoint** · 16. What drives no-shows? · 17. Common forest mistakes · 18. Explaining a forest to Folake · 19. Predictor v0.95 · **20 Chapter Challenge**

### Chapter 11 — Finding groups (v0.97)
*Story: Bisi asks a different question: "Are there kinds of clinics?" No labels this time. Climax: four clinic groups, each with its own reminder plan.*

1. Learning without labels · 2. What a cluster is · 3. k-means, step by step · 4. k-means in scikit-learn · **5 Checkpoint** · 6. Choosing the number of groups · 7. Scaling matters again · 8. Describing each group · 9. Naming groups honestly · **10 Checkpoint** · 11. When clusters are meaningless · 12. Clusters as features · 13. Outliers · 14. Groups and stereotypes · **15 Checkpoint** · 16. A plan per group · 17. Common clustering mistakes · 18. Reading a cluster summary · 19. The clinic groups · **20 Chapter Challenge**

### Chapter 12 — Fair and safe (v0.99)
*Story: the model works worse at the small rural clinic, and it flags older patients more. Climax: Halima changes the plan so the model helps people, rather than labelling them.*

1. Who could this harm? · 2. Scores for each group · 3. Less data, worse model · 4. Bias in the data, bias in the model · **5 Checkpoint** · 6. Fair action: extra help, never less care · 7. Features that stand in for people · 8. Privacy: what we never collect · 9. Health data and consent · **10 Checkpoint** · 11. Explaining one prediction · 12. When not to use a model · 13. Humans in the loop · 14. The world changes: model drift · **15 Checkpoint** · 16. Halima's choice · 17. Common ethics mistakes · 18. Reading a fairness report · 19. Predictor v0.99 · **20 Chapter Challenge**

### Chapter 13 — Halima's model 1.0 (v1.0)
*Story: the board meeting. Climax: Halima presents a model the clinics trust, and says exactly where it's wrong.*

1. From notebook to tool · 2. Saving a model · 3. Predicting for tomorrow's list · 4. Checking inputs before predicting · **5 Checkpoint** · 6. Monitoring after launch · 7. A model card · 8. Writing limits honestly · 9. Measuring real impact · **10 Checkpoint** · 11. A/B testing in words · 12. Telling the story with numbers · 13. Answering hard questions · 14. Where to go next · **15 Checkpoint** · 16. The board meeting · 17. Reviewing the whole project · 18. Teaching it back · 19. The final build · **20 Chapter Challenge: Predictor v1.0**

## What has to be built before writing

1. **Runner: scikit-learn on demand.** Add `sklearn` detection to `frontend/lib/code/pythonRunner.ts` and `backend/src/originals/originals-code-verify.ts`. The import name `sklearn` maps to the package `scikit-learn`, and Pyodide resolves scipy/joblib/threadpoolctl itself. Pyodide 0.26.4 already ships scikit-learn 1.4.2. That's a much bigger first download than pandas, so it loads only from Chapter 5, with a "getting the ML tools ready" screen that is cached after the first time. Measure the real size on a phone before Chapter 5 ships.
2. **Dataset generator:** add `appointments.csv` and `clinic_visits.csv` to `teyro_datasets.py` with a fixed seed, and record the numbers table above.
3. **Placement:** add the course slug to `PLACEMENT_TRACKS` on both sides.
4. **Checker:** sklearn's random results must be fixed with `random_state=42` in every solution, or exact-number checks will flake.

## Decisions for the founder

1. **Story:** Halima at Afiya (no-shows, health) as above. Alternative: a sequel for Zanele, "which deliveries will be late?", reusing the delivery data.
2. **Length:** full (13 × 20 = 260 lessons, like Python) as above. Alternative: short (5 × 10) as a first release.
3. **Placement test:** turn on "Find my level" for this course.
4. **Build order:** runner and dataset first, then Chapter 1 (no code), then Chapters 2–3.
