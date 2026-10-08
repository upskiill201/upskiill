# Video Idea Bank

Rules: `docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md` §11. Every produced 2026-10-08 must pass the novelty test (not basics, specific, provable on screen, useful today).
Score each 1–5: **N**ovelty · **U**sefulness · **V**isual potential · **P**roof available · **H**ook strength (max 25). Script ≥ 18 first.
Status: `idea → approved <date> → produced <date> → posted`, or `rejected <date> (reason)`. **Only founder-approved ideas get made, one video at a time** (see /make-videos).
**Format:** `List` = value-list skeleton (refs A/C) · `Ad` = product-ad skeleton (ref B). The CTA account follows the pillar (§11.1).

> **Scan log**
> - **2026-10-08, scan #1:** 30 produced 2026-10-08s. Sources: web research (AI lab release notes, GitHub trending, Stack Overflow 2026, Veracode 2026, PwC 2026, METR, learning-science studies, creator-economy reports) and the live Teyro pages.
>   - The SEO keyword exports in `Keywords/` were checked but are too broad to drive video topics (top hits were unrelated terms). Use them for blog SEO, not Reels.
>   - **Proof legend:** ✅ primary source found · ⚠️ secondary/aggregator source only; must be confirmed on the official page before scripting.
>   - **AI news items go stale fast.** Re-verify the week we script.

---

## ⭐ Recommended first batch (highest scores, mix of pillars)

| Order | # | Account | Working hook | Score |
|---|---|---|---|---|
| 1 | L1 | Teyro | "Rereading is the worst way to study. Here's what works instead." | 24 |
| 2 | L2 | Teyro | "It doesn't take 21 days to build a habit. Here's what the research found." | 24 |
| 3 | A1 | Teyro | "AI made expert coders 19% slower. They thought it made them faster." | 23 |
| 4 | T2 | Teyro Teach | "Your students quitting is costing you money every month." | 23 |
| 5 | A2 | Teyro | "AI code compiles almost every time. It passes security checks 56% of the time." | 23 |
| 6 | C1 | Teyro | "4 debugging moves seniors use that tutorials never show you." | 23 |
| 7 | T1 | Teyro Teach | "4 things every coding course needs so students actually finish." | 23 |

---

## Teyro: AI pillar

| # | Hook (working) | Fmt | The 4 items / angle | Sources | N | U | V | P | H | Total | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A1 | "AI made expert coders 19% slower. They thought it made them faster." | List | ① METR randomised trial: 16 experienced devs, 246 real tasks, **19% slower** with AI tools ② they still *believed* they were ~20% faster ③ why: reviewing "almost right" code (66% of devs' top AI frustration, SO 2026) ④ the fix: fundamentals so you can judge AI output fast → Teyro coding track | ✅ METR study (Jul 2025) via [DX summary](https://getdx.com/blog/metr-study-on-how-ai-affects-developer-productivity/); ⚠️ SO 2026 figures via [byteiota](https://byteiota.com/stack-overflow-dev-survey-2026-ai-at-84-trust-at-3/) (confirm on survey.stackoverflow.co) | 5 | 4 | 4 | 5 | 5 | **23** | produced 2026-10-08 (approved by founder 2026-10-08) |
| A2 | "AI code compiles almost every time. It passes security checks 56% of the time." | List | ① Veracode 2026: avg security pass rate **56%**, unchanged in a year ② syntax pass ~100%, so "it runs" ≠ "it's safe" ③ bigger models and coding-specific models weren't safer ④ 4 checks before you ship AI code (secrets, input validation, auth, dependencies; source OWASP) | ✅ [Veracode 2026 press release](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) | 5 | 5 | 4 | 4 | 5 | **23** | produced 2026-10-08 (approved by founder 2026-10-08) |
| A3 | "People with AI skills now earn 62% more. Here's what counts as an AI skill." | List | ① PwC 2026: wage premium **62%** (up from 57%) ② AI-skill jobs growing **69%** vs 9% for all jobs ③ the "two-track" market: AI as a force multiplier for experts vs AI making roles easier ④ which skills that means you should learn (using AI tools, agents, automations, Teyro AI track) | ✅ [PwC 2026 Global AI Jobs Barometer](https://pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html) | 4 | 4 | 4 | 5 | 5 | **22** | produced 2026-10-08 |
| A4 | "This free Google tool turns any PDF into a quiz." | List | NotebookLM study features: ① flashcards with "Got it / Missed it" + rerun missed ② quizzes with saved progress ③ Video Overviews (80 languages) ④ infographics in 10 styles. Tie-in: quizzes work because of retrieval practice (see L1) | ✅ [Google Workspace Updates, Mar 2026](https://workspaceupdates.googleblog.com/2026/03/new-ways-to-customize-and-interact-with-your-content-in-NotebookLM.html) | 4 | 5 | 5 | 4 | 4 | **22** | produced 2026-10-08 |
| A5 | "Stop writing better prompts. Start giving better context." | List | Context engineering: ① instructions (role + goal) ② examples ③ tools/files the AI can use ④ memory of what's done. Before/after outputs on screen | ⚠️ Anthropic engineering blog "Effective context engineering for AI agents" (Sep 2025), to re-confirm | 4 | 5 | 4 | 4 | 4 | **21** | idea |
| A6 | "MCP is the plug that lets AI use your apps. 4 you can try today." | List | ① what MCP is (one plug, many tools) ② Chrome DevTools MCP: now stable (Chrome 149) ③ a database MCP ④ a files/docs MCP. Visual: power-strip metaphor (same as ref C) | ✅ [Chrome 149 DevTools](https://developer.chrome.com/blog/new-in-devtools-149); ⚠️ ecosystem size claims (10,000+ servers) only from aggregators, don't use unless confirmed | 4 | 4 | 5 | 3 | 4 | **20** | idea |
| A7 | "Automations follow steps. Agents decide the steps. Here's which to learn first." | List | ① automation = fixed flow (n8n/Zapier) ② agent = goal + tools, decides how ③ when each wins (cost, reliability) ④ a first project for each | ⚠️ trend pieces only ([growwstacks](https://growwstacks.com/blog/is-n8n-dead-in-2026-automation-truth-after-claude-code-ai-agents)); explain from vendor docs | 3 | 4 | 5 | 3 | 4 | **19** | idea |
| A8 | "4 AI updates from September you probably missed." | List | Candidates: ChatGPT Images 2.5 "Sketch"; GPT-6 Astra; Gemini 3.8 Flash TTS; Claude Code "Mods". **Every item must be confirmed on the official release notes first** | ⚠️ [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes), [Google AI Sept 2026](https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-september-2026/), [Claude Code changelog](https://code.claude.com/docs/en/changelog) (summaries seen via search, not yet read) | 5 | 3 | 4 | 2 | 4 | **18** | idea, verify |

## Teyro: Coding pillar

| # | Hook (working) | Fmt | The 4 items / angle | Sources | N | U | V | P | H | Total | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| C1 | "4 debugging moves seniors use that tutorials never show you." | List | ① `git bisect`: binary-search the commit that broke it ② DevTools **logpoints** (log without editing code) ③ conditional breakpoints ④ explain it out loud (rubber-duck). Each shown as a UI recreation | ✅ git docs (git-scm.com/docs/git-bisect); Chrome DevTools docs (developer.chrome.com/docs/devtools) | 4 | 5 | 5 | 5 | 4 | **23** | produced 2026-10-08 (approved by founder 2026-10-08) |
| C2 | "Chrome has a whole toolbox hidden in the console." | List | ① `$0` (the element you just inspected) ② `copy()` (copy any value to the clipboard) ③ `console.table()` ④ Local Overrides (edit a live site's files and keep changes on reload). Bonus: the AI assistance panel | ✅ Chrome DevTools Console Utilities API docs; [DevTools 147](https://developer.chrome.com/blog/new-in-devtools-147) | 4 | 5 | 5 | 5 | 4 | **23** | idea |
| C3 | "Broke your code? Git can undo almost anything. 4 commands to know." | List | ① `git reflog`: find "lost" commits ② `git restore`: undo file changes ③ `git stash`: park work safely ④ `git worktree`: two branches at once | ✅ git-scm.com docs | 4 | 5 | 4 | 5 | 4 | **22** | idea |
| C4 | "Vibe coding without fundamentals is just gambling." | Ad | Pain: code that's "almost right" (SO 2026: 66%), debugging AI code takes longer (45%), security pass rate 56% (Veracode) → "now picture knowing exactly what the AI wrote" → reveal Teyro coding track (short lessons, real code, instant feedback) | ✅ Veracode 2026; ⚠️ SO 2026 (confirm); Teyro facts from teyro.app | 4 | 5 | 4 | 4 | 5 | **22** | idea |
| C5 | "Python can print your variable *and* its name. 4 features beginners never see." | List | ① `f"{x=}"` debug f-strings ② `enumerate(items, start=1)` ③ walrus `:=` ④ `pathlib` instead of string paths | ✅ docs.python.org | 4 | 4 | 4 | 5 | 4 | **21** | idea |

## Teyro: Learning pillar

| # | Hook (working) | Fmt | The 4 items / angle | Sources | N | U | V | P | H | Total | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| L1 | "Rereading is the worst way to study. Here's what works instead." | List | ① a 2006 study: after one week, testing yourself → **~61%** remembered vs rereading → **~40%** ② students *predicted* the opposite (it feels like learning) ③ practice tests beat other methods across 118 studies (g = 0.61) ④ feedback roughly doubles the effect (g 0.73 vs 0.39). Teyro proof: Apply step + instant feedback | ✅ Roediger & Karpicke 2006; Adesope et al. 2017; Rowland 2014. Summaries via [Purdue](https://www.purdue.edu/uns/x/2009b/091210KarpickeLearning.html), [Frontiers](https://www.frontiersin.org/articles/10.3389/fpsyg.2018.02412/pdf) | 4 | 5 | 5 | 5 | 5 | **24** | produced 2026-10-08 (approved by founder 2026-10-08) |
| L2 | "It doesn't take 21 days to build a habit. Here's what the research found." | List | ① "21 days" came from a surgeon's observation, not data ② UCL study (96 people): **18 to 254 days**, median 66 ③ **missing one day didn't derail it** ④ being inconsistent did. Teyro proof: streaks + freezes + repairs | ✅ [Lally et al. 2010, UCL news](https://www.ucl.ac.uk/news/2009/aug/how-long-does-it-take-form-habit); [The Behavioral Scientist](https://www.thebehavioralscientist.com/articles/how-long-to-form-a-habit) | 4 | 5 | 5 | 5 | 5 | **24** | produced 2026-10-08 (approved by founder 2026-10-08) |
| L3 | "Want to learn faster? Study like you'll have to teach it." | List | ① protégé effect (Chase et al. 2009): students tried harder for a "teachable agent" ② just *expecting* to teach improved learning (Nestojko et al. 2014) ③ explain it in your own words ④ teach a rubber duck. Teyro proof: the Reflect step | ✅ [Stanford teachable agents](https://purl.stanford.edu/zm369yx3532); Nestojko 2014 (Memory & Cognition) | 4 | 5 | 5 | 4 | 4 | **22** | idea |
| L4 | "Only about 1 in 20 people finish an online course. Here's why." | Ad | Pain: UPenn ~4%, MIT/Harvard edX ~5%, review median ~12.6% (and longer courses lose more people) → "now picture a course you finish on a bus ride" → reveal Teyro | ✅ [Higher Ed Dive (UPenn)](https://www.highereddive.com/news/mooc-completion-rate-just-4-study-says/202425/); [Jordan 2015, IRRODL](https://www.irrodl.org/index.php/irrodl/article/view/2112/0) | 3 | 4 | 4 | 4 | 5 | **20** | idea |
| L5 | "Cramming works on Friday and fails by Monday." | List | Spacing effect: ① cramming vs spaced review curve ② optimal gap grows with how long you need to remember ③ short daily sessions beat one long one ④ how to schedule reviews. Teyro proof: daily lessons + reminders | ⚠️ Cepeda et al. 2006 (Psychological Bulletin), to pull the paper | 3 | 5 | 4 | 4 | 4 | **20** | idea |
| L6 | "Practising one thing at a time feels better and teaches you less." | List | Interleaving: ① blocked vs mixed practice ② the study result ③ why mixing feels harder (desirable difficulty) ④ how to mix coding exercises | ⚠️ Rohrer & Taylor 2007, to pull the paper | 4 | 4 | 4 | 4 | 4 | **20** | idea |

## Teyro Teach: Teaching and earning pillar

| # | Hook (working) | Fmt | The 4 items / angle | Sources | N | U | V | P | H | Total | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| T1 | "4 things every coding course needs so students actually finish." | List | ① short lessons (completion falls as courses get longer) ② practice checked instantly (testing effect + feedback) ③ a reflect step (explain it back) ④ reminders that protect a streak (consistency, Lally). Proof: Teyro Studio's Learn→Apply→Reflect→Deepen | ✅ L1/L2/L4 sources + [teyro.app/teach](https://teyro.app/teach) | 4 | 5 | 5 | 5 | 4 | **23** | produced 2026-10-08 (approved by founder 2026-10-08) |
| T2 | "Your students quitting is costing you money every month." | Ad | Pain: most learners quit (4–12%), a quitter never pays again → "now picture learners who come back daily" → reveal Teyro Teach: subscriptions (70%/80% of every renewal), streaks/leagues on your course, see where they stop + nudge in one tap | ✅ L4 sources + [teyro.app/teach](https://teyro.app/teach), [/teach/how-it-works](https://teyro.app/teach/how-it-works) | 4 | 5 | 5 | 4 | 5 | **23** | produced 2026-10-08 (approved by founder 2026-10-08) |
| T3 | "Most courses sell once. Teyro courses get paid every month." | Ad | One-time sale vs subscription. On-screen maths from the live page: $60 course = $60/yr or $10/mo; you keep $7.00/month per learner; 200 staying subscribers ≈ **$1,400/month** (labelled an example, not a promise) | ✅ [/teach/how-it-works](https://teyro.app/teach/how-it-works) | 3 | 5 | 5 | 5 | 4 | **22** | idea |
| T4 | "You don't need a camera to teach online." | List | ① teach with text, code, audio or images (video optional) ② learners remember more from practice than from watching (L1) ③ 7 exercise types (find the bug, predict the output…) ④ Tey plans your first 8-lesson course | ✅ [/teach](https://teyro.app/teach) + L1 sources | 4 | 5 | 4 | 5 | 4 | **22** | idea |
| T5 | "Where exactly do your students quit? Here's how to find out." | List | ① drop-off by lesson (example: lesson 4 → 57%) ② the exercise missed most first time ③ who's gone quiet for a week ④ a nudge with their name. Proof: Studio analytics | ✅ [/teach](https://teyro.app/teach) (example data) | 4 | 5 | 5 | 4 | 4 | **22** | idea |
| T6 | "Yearly price first, monthly second. Here's why it works." | List | Pricing: yearly anchor, monthly at 1/6 (yearly saves 50%), 2 free lessons before paying, coupons for launch | ✅ [/teach/how-it-works](https://teyro.app/teach/how-it-works) | 3 | 4 | 4 | 4 | 4 | **19** | idea |
| T7 | "Most course creators earn less than you think." | List | Creator income reality (few earn $100k+, top earners take most of the revenue) → recurring revenue + retention as the way out | ⚠️ only aggregator stats ([Zenler](https://www.zenler.com/blog/state-of-online-courses-2026)); **needs a primary survey before use** | 4 | 4 | 4 | 2 | 5 | **19** | idea, verify |

## Teyro Teach: Expert growth pillar

| # | Hook (working) | Fmt | The 4 items / angle | Sources | N | U | V | P | H | Total | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| E1 | "AI jobs are growing 8x faster than all jobs. Who's teaching those skills?" | Ad | PwC: AI-skill jobs +69% vs +9% → people need teachers who use AI daily → "that could be you" → Teyro Teach AI track, Founding Creators keep 80% | ✅ [PwC 2026](https://pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html) + /teach | 4 | 4 | 4 | 5 | 5 | **22** | idea |
| E2 | "Teaching what you know makes you better at it." | List | Protégé effect for experts: ① expecting to teach sharpens your own understanding ② explaining exposes your gaps ③ learners' questions show blind spots ④ turn it into a course → Teyro Teach | ✅ L3 sources | 4 | 4 | 4 | 4 | 4 | **20** | idea |
| E3 | "Already on YouTube? Your videos could be a course people finish." | List | ① bring videos, notes or slides ② add exercises (that's what gets courses finished) ③ coupon link on launch day ④ a community you run | ✅ [/teach/how-it-works](https://teyro.app/teach/how-it-works) FAQ | 3 | 5 | 4 | 5 | 4 | **21** | idea |
| E4 | "4 mistakes first-time course creators make." | List | ① too long (completion drops with length) ② all video, no practice ③ no way to see who's stuck ④ selling once instead of recurring | ✅ L1/L4 sources + /teach | 4 | 5 | 4 | 4 | 4 | **21** | idea |
| E5 | "No audience? You can still sell a course." | List | ① Teyro brings learners via its app, streaks and leagues ② publish free first to build an audience ③ coupons ④ public creator page + follow | ✅ [/teach/how-it-works](https://teyro.app/teach/how-it-works) FAQ | 3 | 4 | 4 | 5 | 4 | **20** | idea |
| E6 | "The first creators on Teyro keep 80%, not 70%." | Ad | Founding Creators: early creators keep 80% of every payment + a Founding badge for good. **Don't mention the launch date in the video** (§7); the page explains the deadline | ✅ [/teach/how-it-works](https://teyro.app/teach/how-it-works) | 2 | 4 | 4 | 5 | 4 | **19** | idea |
