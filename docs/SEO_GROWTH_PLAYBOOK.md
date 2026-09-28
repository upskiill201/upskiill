# Teyro SEO Growth Playbook

How Teyro turns search into signups. It sits beside the blog guide ([SEO_BLOG_POST_GUIDE.md](SEO_BLOG_POST_GUIDE.md)), which covers long-form posts.

**The idea:** people who search for the exact problem Teyro solves are the highest-intent visitors we will ever get, and they cost nothing. Find their words, answer them first, then show the feature that solves it.

---

## 1. Keywords come from complaints, not keyword tools

```bash
cd frontend
node scripts/seo/mine-complaints.mjs            # all competitors
node scripts/seo/mine-complaints.mjs mimo       # one competitor
```

- The script pulls public 1–2★ App Store reviews for each competitor and groups them into themes: paywalls, hearts and limits, ads, bugs and lost progress, too basic, streak loss, content errors, support and bad redesigns.
- It writes `scripts/seo/out/complaints.md`, which is git-ignored. That file is the research: the review excerpts and repeated phrases are the exact words people search with, so use them in titles and H2s.
- It also writes `content/seo/complaints.json`, which holds aggregates only. The comparison pages show it as "What unhappy X users say", but only when a competitor has at least 10 low-star reviews, and always with the sample size shown.
- Re-run it every quarter.

The first run (2026-09-28) found that **paywalls and subscription price** are the top complaint for almost every competitor, **support never replying** is the big one for Coursera (17 of 42), and **bugs and lost progress** dominate for Udemy and LinkedIn Learning. Every one of those is a page.

## 2. Four page types, nothing else

| Type | Where | Source | Example |
| --- | --- | --- | --- |
| **Problem pages** | `/blog/*` | MDX, one per recurring complaint | "How to learn to code without running out of hearts" |
| **Alternative + vs pages** | `/alternatives/<id>-alternatives`, `/alternatives/teyro-vs-<id>` | `frontend/lib/seo/competitors.ts` | Teyro vs Mimo, Best Sololearn alternatives |
| **Roundups** | `/blog/*` | MDX | "7 best coding apps for beginners", with Teyro ranked honestly |
| **Use-case pages** | `/for/<skill>-app-for-<person>` | `frontend/lib/seo/personas.ts` | Coding app for busy parents |

Feature pages (`/features/*`) are the landing spots all four link into.

## 3. Generate the pages that repeat — carefully

A competitor or a persona is **one registry entry** that becomes one or two full pages. The sitemap, internal links, JSON-LD and `/alternatives` or `/for` hub cards all update automatically.

**Adding a competitor** (`lib/seo/competitors.ts`):
1. Use stable facts only. Describe the price model ("subscription"), never a number.
2. Fill in `stayIf`. Every comparison says when to stay with the competitor, and that honesty is what makes readers trust the rest of the page.
3. Rank Teyro where it belongs in `alternatives`. On lists where the reader wants something Teyro doesn't do, say so, as the Duolingo page does for language apps.
4. Add its App Store id to `APPS` in `scripts/seo/mine-complaints.mjs` and re-run the script.
5. Add it to a group in `app/alternatives/page.tsx`.

**Adding a persona** (`lib/seo/personas.ts`): only add one if you can write a genuinely different `constraints` list and `week` plan. A swapped noun is a doorway page, and Google drops the whole set.

**All Teyro claims come from `lib/seo/facts.ts`.** If the product changes, change that file first.

## 4. Answer in the first 100 words

Every page opens with an **answer card**:
- The direct answer: 40–80 words, enforced at 100 or fewer by the schema.
- A one-line "why Teyro" that fits this exact problem.
- The **Get Teyro free** button, which goes to `/start`, the install gateway.
- Beside it, the product mock of the feature the page is about. These are the homepage visuals in `components/homepage/v3/Visuals.tsx`, never a generic screenshot.

This block is also what AI engines quote, so `public/llms.txt` carries a short fact list to keep their answers about Teyro accurate.

## 5. Convert

- The button sits right after the answer and again at the end.
- Learner pages go to `/start`; creator pages go to `/teach`.
- The fine print states the three objections we can answer honestly: free to start, no ads, and runs on iPhone, Android and web.
- Every page ends by linking three related pages (`lib/seo/related.ts`), so a reader who isn't ready yet keeps reading instead of leaving.

## 6. Mine Search Console every week

```bash
GSC_CREDENTIALS=~/keys/teyro-gsc.json node scripts/seo/gsc-opportunities.mjs
```

Setup takes about five minutes and is described at the top of the script: create a service account, enable the Search Console API, and add the account as a user on the `teyro.app` property. Keep the key outside the repo.

The script writes `scripts/seo/out/gsc-<date>.md` with four lists:
1. **Impressions but zero clicks:** rewrite the title and description to echo the query people actually typed.
2. **Striking distance (positions 8–20):** improve the page. Tighten the answer, add the missing subtopic, add internal links.
3. **Decliners:** pages that lost clicks compared with the previous 28 days.
4. **Cannibalisation:** one query split across several of our pages. Merge them or redirect to one winner.

**Rule: rewrite the losers before publishing anything new.**

---

## Known clean-up

- `/blog/teyro-vs-linkedin-learning` and `/blog/linkedin-learning-alternatives-for-individuals` target the same queries as the new `/alternatives/teyro-vs-linkedin-learning` and `/alternatives/linkedin-learning-alternatives` pages. Watch list 4 of the Search Console report, then merge or redirect to one winner.
- The blog holds many off-topic posts (for example architecture courses in Delhi, chemical engineering degrees). They attract visitors who will never become Teyro learners, and they can drag down how Google rates the whole site. Audit them with Search Console data, then noindex or remove the ones with no Teyro-relevant traffic.

---

## 7a. The creator marketing pages: `/teach` and `/teach/how-it-works`

- **`/teach`** sells the idea: why teach on Teyro, recurring income, the earnings calculator.
- **`/teach/how-it-works`** walks through all nine steps of a creator's journey, each shown with a Teyro Studio visual: plan with Tey, create, build lessons, price, review, launch, keep learners going, run the community, get paid. It also covers Founding Creators, what success looks like, and a **fact sheet** (`FACTS` in `components/teach/HowSections.tsx`).
- **Launch videos and ads:** point whoever makes creator videos, human or AI, at these two pages. The fact sheet is their source of truth, so keep it exact whenever pricing, payouts or dates change.
- **Pricing (since 2026-09-28):** paid courses are subscriptions. The price the creator sets **is the yearly plan**, and monthly is one sixth of it, so paying yearly saves learners 50%. For example, a $60 course is $60 a year or $10 a month. The formula lives in `lib/pricing-engine.ts` and `backend/src/course/pricing-engine.ts`, which must stay identical. The creator keeps 70% of every payment. There are no lifetime or one-off sales, so never describe earnings as "per sale". Marketing examples use a $60 course (the creator keeps $7 a month per learner).

## 7. Creator recruitment pages: `/teach/<coding|ai>/<place>`

These pages recruit coding and AI creators before Creator Studio opens in October 2026. They are generated from `frontend/content/seo/teach-data.json`, which `scripts/seo/build-teach-data.mjs` builds.

- **US states and metros:** official Bureau of Labor Statistics pay and headcount for software developers (coding pages) and data scientists (AI pages). If BLS publishes no figure for a place, that page does not exist. That rule is what keeps roughly 1,000 location pages from counting as doorway pages.
- **Countries:** World Bank population, internet use and GDP per person, an exchange-rate snapshot for the local-currency earnings example, and the local mobile-money wallets. Countries are listed in `scripts/seo/data/teach-countries.json`; to add one, add a line and re-run the script.
- **BLS allowance:** the API allows about 25 requests a day without a key. Each run is resumable, so either run it daily until it prints "complete", or get a free key at https://data.bls.gov/registrationEngine/ and run `BLS_API_KEY=... node scripts/seo/build-teach-data.mjs` once. Commit the updated `teach-data.json` after each run.
- **Claims:** revenue share (70%), clearing time (14 days) and minimum payout ($50) live at the top of `lib/seo/teach.ts`. Earnings are always shown as a worked example, never as a promise. Every page states that this is course income, not a salaried or hourly job.
- **Titles:** they match what people search, written as a question: "Online Coding Teacher Jobs in Texas? Teach on Teyro" and "AI Tutor Jobs in Kenya? Teach AI Online on Teyro".
- **Watch in Search Console:** track indexing of the `/teach/` pages. If Google reports many of them as "Crawled – currently not indexed", improve the pages before adding more places.
