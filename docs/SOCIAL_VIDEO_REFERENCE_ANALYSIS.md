# Teyro Social Video Playbook: the "Illustrated Host Explainer" format

> **▶ Team setup + how-to guide: [`video-studio/GUIDE.md`](../video-studio/GUIDE.md)**
>
> **▶ START HERE:** open Claude Code in the `upskiill` folder and type **`/make-videos`**.
> 1. Claude proposes up to 3 ideas; you **approve one**.
> 2. Paste an ElevenLabs key.
> 3. You get that one finished video, and Claude asks before starting the next.
>
> **Rules:** no video without an approved idea, and one video at a time (never batches).
> Variants: `/make-videos A3` (present a specific idea for approval) · `/make-videos ideas` (just find new ideas).
> Finished videos arrive in chat as downloads and in `video-studio/deliverables/`. The steps Claude follows: `.claude/skills/make-videos/SKILL.md`.

> **Purpose:** clone, as exactly as possible, the format of three reference Reels/TikToks (each with hundreds of thousands of views, comments, likes and saves) for the **Teyro** (learners) and **Teyro Teach** (creators) accounts on Instagram and TikTok.
> **Analysed:** 2026-10-06. Frame-by-frame (2 fps full frames, 8 fps caption crops), cut detection, silence detection, EBU R128 loudness, spectrograms, pixel colour sampling and position measurement on a grid.
> **Reference assets:** `docs/social-video-reference/` (`frames/` = 20 key full-res frames, `contact-sheets/` = every half-second of every video plus A's captions every 1/8 s). The source videos are in the founder's `Downloads/Video` folder.
> **Limitation:** audio was measured, not listened to. Voice notes are measurements.

---

## 0. Non-negotiable rules (read before every video)

0. **Approved idea, one video at a time.** A video is only made from an idea the founder explicitly approved (status `approved` in the idea bank), and videos are made one at a time: deliver one, then ask before the next. No batch production.
1. **Every video opens with a hook from §6.** No hook, no video. The hook is spoken, shown as on-screen text and shown visually, all in the first 3 seconds and all making the same promise.
2. **Copy the reference format exactly.** Same structure, timing, pace, caption system, host placement, motion density and length (§2–§5). Change only the topic, the host (Ada) and the brand content. These videos are proven; don't "improve" the format without data.
3. **The host is Ada** (§4), code at `video-studio/src/host/Ada.tsx`. She talks like the reference host talks: same style, rhythm and phrasing patterns, not the same voice.
4. **Topics must teach something most viewers don't know: never basics** (§11). Every idea passes the novelty test and is logged in the idea bank (`video-studio/ideas/IDEAS.md`).
5. **Teyro/Teyro Teach facts come only from the live pages** (topic facts about coding/AI/learning need a primary source; see §11.4):
   - **Teyro videos:** `teyro.app` (homepage) and `teyro.app/features` (plus its `/features/*` detail pages).
   - **Teyro Teach videos:** `teyro.app/teach` and `teyro.app/teach/how-it-works`.
   - Re-read the live page before writing each script. The fact banks in §9 are a snapshot from 2026-10-06. Never invent numbers, features or claims.
6. **Sell outcomes, prove with features.** Never "Teyro has streaks." Instead: "You'll actually come back tomorrow, because your streak is on the line." Every feature on screen is evidence for a result in the viewer's life (§8).
7. **CTA is organic and fits the video** (§7): link in bio, or "go to teyro.app / search Teyro". **One spoken ask per video.** Never mention that the learner app isn't out yet; the website handles that.
8. **Every video has an engagement layer** (§5.6) built in for saves, shares and comments, because those (plus watch time) are what push a video further.
9. **Pronunciation:** "Teyro" must be heard as "Taro". Put "Teyro" at the **start or end** of a line (mid-sentence it gets mispronounced). Re-roll the take until it's right.
10. **ElevenLabs key: ask every session, never store.** Before generating any voice-over, ask the founder for the key to use in that session. Use it only on the command line for that run (`XI_KEY=<key>`). Never save it to a file, code, the docs, memory or logs. Free keys run out (~10,000 characters ≈ 7–9 videos), so a new key per session is normal.

---

## 1. The three references

| ID | Topic | Length | Words | Pace | Type |
|---|---|---|---|---|---|
| **A** | "Don't start vibe coding… these 4 plugins" (Superpowers, Karpathy skills, i-have-adhd, Claude Octopus) | 51.3 s | ~190 | 3.7 w/s (~225 wpm) | Value list, **Arcade Set** look |
| **B** | "Solo founders don't have a time problem, they have a headcount problem" (Dock) | 38.1 s | ~155 | 4.1 w/s (~245 wpm) | **Product ad** dressed as advice, **Editorial → Dark** look |
| **C** | "Claude Code at 0/4 power until you plug these in" (Supabase, Vercel, oh-my-claudecode, Chrome DevTools MCP) | 46.0 s | ~150 | 3.3 w/s (~195 wpm) | Value list, **Editorial Paper** look |

Shared tech specs: 720×1280 (9:16), 30 fps, H.264, AAC 44.1 kHz stereo. **We render 1080×1920 at 30 fps.**

### Verbatim scripts (rebuilt from on-screen captions)

**A, 51 s**
> Don't start vibe coding with Claude Code unless you've installed these four plugins. The first is Superpowers, which has almost 300,000 stars, and stops Claude from jumping straight into code. It asks what you're actually building, turns it into a spec you sign off on, and hands the work to subagents that write the tests first, so it can run for hours without drifting off plan. The second is the Karpathy skills, which is one CLAUDE.md file built from Andrej Karpathy's complaint that models write a thousand lines when a hundred would do. Four rules: think before coding, keep it simple, touch only what you were asked to, and prove it works. The third is I have ADHD, which stops Claude burying the answer. No "great question", no "hope this helps". The next action first, steps numbered, and lists capped at five. And finally there's Claude Octopus, which hands the same task to up to 12 other models like Codex, Copilot and Grok, and flags every place they disagree before you ship. So if you want to try them all for yourselves, just comment SENIOR and I'll send you the links directly.

**B, 38 s**
> If you're a solo founder, working harder is the worst thing you can do. You're the founder, the salesperson, the marketer, the support desk, and the one who writes the newsletter. Now picture a team doing all of it at once. Your CEO agent looks at this week's goals and hands out the work. A launch graphic goes to the designer. A new reel script goes to the scriptwriter. Your SEO agent finds what people are searching for in your niche and writes two blog posts. Your inbox agent sorts everything that matters and sends you a report every five hours. While you're working on one thing, six other things are moving, and they only stop to ask when there's a decision to make. The tool I'm talking about is called Dock. You hire AI agents for real jobs, each with a name, a memory, and a calendar, and they hand work to each other like an actual team. There's a free plan to start. Comment DOCK, and I'll send you the link.

**C, 46 s**
> Don't start vibe coding with Claude until you've installed these four plugins. The first is the official Supabase, which connects Claude straight to your database, so it can run SQL, write migrations, generate your types and check your security advisors without you ever opening the dashboard. The second is Vercel's. Just say "deploy my app" and Claude ships it to a live preview or production URL without leaving your terminal. The third is oh-my-claudecode, which turns Claude into a crew of 19 specialized agents. So you type "team" and they plan, build, verify and fix your code together. And the last one is Chrome DevTools MCP, built by Google's Chrome team. It gives Claude eyes on a real browser, so it reads console errors, inspects network requests, takes screenshots and runs performance traces instead of coding blindfolded. If you want to try all, comment CODING and I'll send you the links directly.

---

## 2. Script formula

### 2.1 "Value list" skeleton (A and C): use for most videos

| Beat | A timing | C timing | What it does |
|---|---|---|---|
| **Hook** | 0–3.5 s | 0–3.4 s | Warning + number + implied loss (§6) |
| **Item 1** | 3.5–16.5 s | 3.5–14 s | Strongest/most famous item, with a proof number |
| **Item 2** | 16.5–29 s | 14–21 s | |
| **Item 3** | 29–38 s | 21–30 s | The quirkiest item (curiosity spike) |
| **Item 4** | 38–46.3 s | 30–42 s | "And finally… / And the last one is…" |
| **CTA** | 46.3–51.3 s | 42–46 s | One ask, ends on the last word, no outro |

No intro, no "hey guys", no name, no logo sting. Starts mid-thought.

### 2.2 "Product ad" skeleton (B): use for Teyro / Teyro Teach product videos

| Beat | Time | Pattern |
|---|---|---|
| Contrarian hook | 0–3 s | "If you're a [who], [common belief] is the worst thing you can do." |
| Pain stack | 3–7 s | List 4–5 roles/frustrations the viewer recognises |
| Pivot | 7–8.5 s | "Now picture…" (the visual world flips here) |
| Show the outcome, product unnamed | 9–27 s | 5 concrete "your [X] does [Y]" lines, outcomes only |
| Reveal | ~63 % in | "The [app] I'm talking about is called Teyro." (brand at line end) |
| Proof features as benefits | next ~6 s | 3 features, each tied to a result |
| CTA | last 3–4 s | Organic CTA (§7) |

### 2.3 Line rules (both skeletons)
1. **Ordinal signposts:** "The first is… The second is… The third is… And finally…".
2. **Each item:** *Name* → *proof* (number, "official", named expert) → *"which/so it…" + 3–4 verb list* → *"without… / instead of…" payoff*.
3. **Verb lists of exactly 3–4** ("plan, build, verify and fix"). Each verb gets its own visual beat.
4. **One quotable detail per item** ("a thousand lines when a hundred would do"). This is what people screenshot and share.
5. **Second person, plain words.** Every sentence makes sense alone. No unexplained jargon.
6. **Sentences ≤ 8 s.** Join with "and / so / which", never with pauses.
7. **Speaking speed must stay inside the references' range: 3.3–4.1 words/s (≈195–245 wpm).**
   - **Value lists (A/C):** 3.3–3.7 w/s → 150–190 words for 45–51 s.
   - **Product ads (B):** 3.7–4.1 w/s → 140–160 words for 36–40 s.
   - Never below 3.3 (feels slow next to the references) or above 4.1. Measure it after TTS: words ÷ VO seconds. If it's off, re-generate or edit the script rather than time-stretching the audio.

---

## 3. Voice-over spec (measured from the references)

| Property | Reference | Our spec |
|---|---|---|
| Speaker | One narrator, the host's voice | Ada = ElevenLabs **Jessica** (`cgSgspJ2msm6clMCkdW9`) on **eleven_multilingual_v2, speed 1.15**. Tested 2026-10-08: eleven_v3 ignores speed and adds 0.3–0.9 s dramatic pauses (2.3 w/s, far too slow). |
| Pace | 3.3–4.1 words/s | 3.3–4.1 w/s (value lists 3.3–3.7, ads 3.7–4.1), see §2.3 |
| Pauses | None ≥ 0.25 s; breaths edited out | Generate per sentence, join with 80–120 ms gaps |
| Loudness | −14 LUFS integrated, loudness range 0.9–1.3 LU | Compress + limit, loudnorm to −14 LUFS, LRA ≤ 2 |
| Music | **None.** The spectrum drops to silence between words | No music bed (optional: very quiet, ducked) |
| SFX | A: light UI pops/clicks/whooshes (4–6 kHz transients) on caption and object entrances. B/C: nearly dry | Arcade: soft pops, clicks, whooshes, counter ticks. Editorial: almost none |
| Ending | Last word, then ~0.5 s tail, then cut | Same, and the last frame should loop cleanly into frame 1 |

### 3.1 How the host *talks* (Ada must copy this style)
- **A knowledgeable friend leaning in**: confident, quick, zero hype words ("insane", "game-changer" never appear). Calm certainty, not shouting.
- **Imperatives and direct address:** "Don't start…", "Just say…", "Now picture…".
- **Lists in breath groups:** "think before coding, keep it simple, touch only what you were asked to, and prove it works", with a slight lift on each item and a drop on the last.
- **Concrete over abstract:** numbers, names, exact phrases in quotes ("No 'great question', no 'hope this helps'").
- **Mini-payoffs with a smile in the voice:** "instead of coding blindfolded", "like an actual team".
- **Casual connectors:** "So…", "And finally there's…", "The tool I'm talking about is…".
- **CTA in a lower-key, generous tone:** "just comment… and I'll send you the links directly". It's a favour, not a pitch.

---

## 4. The host: Ada (placement copied from the reference host)

### 4.1 Reference host (for matching only)
- 2D cartoon man in a Memoji style: black beanie with a red tag, round glasses, beard, olive overshirt over a white tee.
- Flat shading, soft gradients, **thin white sticker outline + soft drop shadow**, light **halftone/grain** texture.
- Chest-up only. **Pose-swap animation** (about 15 static poses swapped on stressed words every 1–2 s, each with a small spring scale-pop). The mouth flaps open/closed. Occasional blinks.
- **Interacts with the graphics:** points at the item being named, plugs cables in, signs a clipboard, holds a placard, gets pulled by a mascot (octopus), wears a blindfold on "blindfolded", sleeps on "drifting", gets buried on "burying".
- Pose vocabulary in order of frequency: point up (new item), point sideways at the UI, open palms/explain, thumbs up, wave, raised fist, counting on fingers, hand on chin, shrug, sweat/facepalm (pain), wink (CTA).

### 4.2 Ada
- Original Teyro host (NOT Tey; Tey is the logo): curly puff hair, yellow sunshine headband, violet hoodie with a yellow `</>` badge, gold hoop earrings.
- **Where she lives:** `video-studio/` at the repo root (the Remotion project moved there from a temp folder on 2026-10-06; see `video-studio/README.md`).
  - **Ada v2** (`video-studio/src/host/Ada.tsx`) is the one for social videos.
  - Ada v1 (`src/components/Ada.tsx`) only renders the old launch reels.
- **Ada v2 already matches the reference look:**
  - White sticker outline + soft drop shadow (`sticker` prop, on by default). Print grain comes from the scene-wide `<Grain />` overlay (`src/host/Grain.tsx`), placed last in every composition.
  - Finger hands: point, thumbs up, open palm, counting 1–4.
  - Blink cycle, scale-pop on every pose change, mouth driven by the audio (better than the reference's flap).
  - Standalone: lip-sync is passed in as a prop; works at 30 fps / 1080×1920.
- **26 poses:**
  - Talking/presenting: `idle, talk, talk2, open, present`
  - Pointing: `pointR, pointUpR, pointL, pointUpL`
  - Waves and wins: `wave, cheer, fist, thumbsUp`
  - Counting: `count1–count4`
  - Reactions: `shrug, think, chill, surprise, worried` (with sweat drop)
  - Props and eyes: `wink, sleep` (Zzz), `blindfold`
- **Check her visually:** compositions `AdaPoseSheet` (every pose), `AdaPlacement` (§4.3 positions) and `AdaDemo` (10 s animation). `placeAda(frameW, frameH, headX, headY, headWidthPct)` converts a §4.3 row into her scale and position.
- Default facing for our layouts: graphics sit top-left, Ada bottom-right, so she mostly uses `pointUpL`, `pointL` and `present`.
- Teach-page note: the live `/teach` pages use "Ada Okafor" / "Ada asked" as sample creator and learner names. In Teyro Teach videos, don't show those sample cards next to host Ada (it reads as the same person).

### 4.3 Exact host placement (measured on a grid; % of frame width × height)

| Look / moment | Head centre (x, y) | Head width | Body | Cropping |
|---|---|---|---|---|
| **Editorial: hook (first ~3 s)** | (69 %, 78 %) | ~30 % of width | Chest-up, fills bottom-right quadrant from x≈42 % | Bottom edge cuts mid-chest |
| **Editorial: items** | (85 %, 91 %) | ~18 % | Only head + shoulders visible, tucked bottom-right under the hero object | Bottom and right edges crop him |
| **Editorial: moments he "acts"** (blindfold, pointing at card) | (77 %, 81 %) | ~25 % | Rises/scales up for the gag, then settles back | |
| **Dark (B), whole video** | (72 %, 84 %) | ~25 % | Chest-up, bottom-right; "Your team" widget sits bottom-left beside him | Bottom edge cuts at chest |
| **Arcade: hook** | (25 %, 52 %) | ~28 % | Stands behind a desk/counter, left of centre | Desk top edge at y≈63 % hides his body |
| **Arcade: items** | (50–75 %, 50–55 %) | ~28 % | Behind the counter, beside/below the main graphic. Moves left/centre/right per scene to balance the graphic | Desk top at y≈66–68 % |

Rules: he **never covers the headline or the main graphic**. He's always on the side opposite the graphic's centre of mass. He's never full-body and never centred in the Editorial look.

---

## 5. Visual systems (copy exactly)

### 5.1 Layout grid (measured, % of frame)

| Element | Editorial Paper (C) / Dark (B) | Arcade Set (A) |
|---|---|---|
| Top labels | y ≈ 7 %. Left: `// 01 — topic` (mono, small, grey). Right: live counter `PLUGINS 1/4` (mono, small; the number turns red when it ticks) | y ≈ 6 %. Left: black stencil tag (white uppercase condensed). Right: mini power strip with 4 coloured sockets + `PLUGINS n/4` |
| Headline / caption | Top-left. Left margin ≈ 12 %, first line at y ≈ 14 %, max 3 lines (to y ≈ 28 %). Line height ≈ 4.5 % of height | **Bottom-third keycap captions**, centred at y ≈ 78 %, 1–3 words. Pill height ≈ 6 % of height |
| Hero graphic | Centre band, y ≈ 30–75 % | Top 8–62 % (above the desk) |
| Host | Bottom-right (see §4.3) | Behind the desk, desk top y ≈ 63–68 % |

### 5.2 Editorial Paper (C, and B's first 7 s)
- **Background:** warm paper `#F0EEEA` (sampled) with faint grain. Flat.
- **Headline:** builds **word by word in sync with the VO**. The newest word fades in slightly ghosted, then goes solid when spoken. The sentence clears when it ends.
  - Main font: geometric grotesk sans in near-black (Space Grotesk / Familjen Grotesk / Satoshi family).
  - Key words switch to **red italic serif** (Instrument Serif Italic family), red ≈ `#E0352B` (eyedrop from `frames/C_*.jpg` to confirm).
  - Highlighted: product names, outcomes, numbers, and the payoff word ("database", "live", "terminal", "eyes", "blindfolded", "links").
- **One hero metaphor object for the whole video that evolves.** C: power strip `CLAUDE CODE 0/4`; each item drops in on a cable and plugs in. Above it, a card (README / plugin-page mock) with a **rolling counter** (installs/stars). The card then morphs into a mini diagram of the outcome: tools lighting ✓ one by one, a build→deploy→live pipeline, a fan of 19 agents, browser DevTools.
- **Zero hard cuts.** One continuous canvas; items transition by sliding or zooming out the old card as the next cable drops in.

### 5.3 Dark Tech (B after the pivot)
- The **only hard cut** is cream → navy `#171928` (sampled), with soft **pink/orange `#FE491A`** and **blue** corner glows. This marks problem → solution.
- Headline is white; key words in **sky blue `#4EA5FF`** (sampled).
- Glassy dark UI cards (goal doc with typing cursor, org chart, agent cards, inbox columns, calendar).
- **Persistent progress widget bottom-left** ("Your team", 0 → 6 avatars).
- Product reveal: glowing orb + radial light burst, then the wordmark.

### 5.4 Arcade Set (A)
- **One colour set per item**, matching that item's plug colour. Sampled/estimated: blue desk `#4463A5` with pale-blue wall `#ADC1DD`; green/mint desk `#6AB09E` with mint wall `#BAD9C6`; mustard desk `#B2762C` with butter wall `#F3D185`; purple `#8973D3`; orange-red hook/CTA desk `#D25B20`; brown hook desk `#795A3F` with cream wall `#EFE0CD`. Pegboard, stripe and brick wallpapers, with a halftone print/risograph texture and dark vignette at the bottom.
- **Top-left stencil tag changes every 3–4 s** (a sub-headline per idea), typed letter by letter: `SPEC BEFORE CODE`, `1,000 → 100 LINES`, `NO PREAMBLE`, `75% CONSENSUS GATE`, `4 OF 4 INSTALLED`.
- **Keycap captions:** heavy rounded sans, black text on 3D pills. Pills alternate **yellow `#FDD946`** / white / **black with yellow text**, each with a darker bottom edge for depth. Words pop in with overshoot; the previous group ghosts out. Names and numbers go on the black pill.
- **A literal visual gag for every phrase:** "jumping into code" → pool with a NO DIVING sign; "sign off" → APPROVED stamp; "tests first" → traffic light red→green with the background tint following; "run for hours" → day→night with the host asleep; "1,000 lines" → odometer; "burying the answer" → paper pile + shovel; "no preamble" → shredder; "12 models" → octopus dealing cards to a provider grid.
- **About 17 hard cuts in 51 s** (one per sub-idea, every 2–4 s).

### 5.5 Motion rules (all looks)
- **Something new on screen every 0.5–1 s.** Nothing static for more than ~1.5 s, except a legible "receipt" (a real number or screen) held so people can read it.
- Numbers always **roll/count up** (odometer or slot digits).
- UI text **types out with a cursor**. UI is stylised vector recreations, never raw screen recordings. For Teyro, recreate the real app screens: streak calendar, league board, lesson Apply step, quests, chest, Studio analytics, payouts.
- Spring/overshoot entrances, sparkles on completion, ✓ ticks, red ✗ stamps for the "wrong way".
- **A story progress meter is always visible** (power strip n/4, team widget, counter). Teyro versions: e.g. a streak flame filling 0/4, a coin counter, a league climb Bronze→Diamond, `SKILLS 1/4`.

### 5.6 Engagement layer (saves, shares, comments)
The ranking signals Instagram has named as most important are **watch time, sends per reach and likes per reach**; comments and saves add to that. The references drove comments with a keyword CTA. Our CTA points to Teyro instead, so engagement has to be built into the video and post:

| Signal | How we build it in |
|---|---|
| **Watch time / rewatches** | Hook + visible progress meter (0/4 → 4/4); information density (~3.3 w/s + a visual every second) so people rewatch to catch everything; **seamless loop** (the last frame flows into frame 1) |
| **Saves** | Every value video is a **reference list** people want later (tools, steps, prompts, rules). Show a small **"SAVE THIS" tag with a bookmark icon** (text/icon, not spoken) beside the progress meter when the list starts. Visual only, not a second spoken ask. The final 4/4 frame shows all 4 items as one recap card: the "screenshot/save frame". |
| **Shares / sends** | The hook names a specific person ("If you're a student…", "If you've quit a course before…") so viewers think of a friend. Include one quotable line per video. Post caption line 1: "Send this to the friend who [specific situation]." |
| **Comments** | Post caption ends with **one easy question** ("Which one are you starting with: 1, 2, 3 or 4?"). Pin our own first comment with that question. Contrarian and question hooks naturally invite replies. Reply to every early comment. |
| **Likes** | Earned by the value; never ask in the video |

Never stack spoken asks: the voice-over makes **one** ask (the CTA). Save/share/comment prompts live in on-screen tags and the post caption.

---

## 6. Hooks (mandatory, every video)

> Taxonomy and principles adapted from CreatorFlow's "50 Instagram Hook Templates That Stop the Scroll" (updated Aug 2026). The templates below are rewritten for Teyro's audiences.

### 6.1 Hook rules
1. **Three layers, one promise:** on-screen text (5–8 words, first frame, high contrast), the visual (the first frame already shows the subject, never a title card), and spoken (≤ 10 words, done inside 3 s). If they contradict, people scroll.
2. **Write the hook last.** Find the single most convincing second of the video and open with it (**payoff-first beats pain-first**).
3. **The first shot must be able to show what the hook promises.** If the camera can't prove it, cut the claim.
4. **Write 5 versions**, pick the most specific.
5. **Every hook must be delivered by the body.** A contrarian hook needs evidence inside the video; a curiosity gap must close before ~8 s or retention falls off a cliff.
6. **Combine at most two types** (usually number + one other).
7. **Measure:** Reels Insights shows **skip rate** (viewers who leave in the first 3 s) and the **retention curve**. Use our own median across 10 Reels as the benchmark (no official "good" number exists). High skip rate → fix the hook. Cliff at 5–8 s → fix the payoff.

### 6.2 The six hook types: Teyro templates

**1. Problem/Pain** (when they already know the problem)
- "If you keep starting coding courses and never finishing, read this."
- "Stop learning to code like this. Do this instead."
- "The reason you quit every online course isn't you."
- "You're not lazy. Your course is just built to be quit."
- Teach: "If your course sells once and then goes quiet, this is why."

**2. Curiosity / pattern interrupt** (highest ceiling, must pay off fast)
- "Nobody tells you why 9 in 10 people quit online courses." *(only with a sourced stat)*
- "This is how a 5-minute habit beats a 5-hour weekend."
- "What nobody tells you about learning AI in 2026."
- Teach: "Most course creators get paid once. Here's how to get paid every month."

**3. Contrarian** (only with proof inside the video)
- "Watching tutorials is why you can't code yet."
- "You don't have a motivation problem. You have a habit problem."
- "Long courses are the worst way to learn a skill."
- Teach: "Posting free tips is the worst way to make money from what you know."

**4. Transformation** (the "after" must be visible on screen)
- "From quitting every course to a 128-day streak." *(UI recreation of a streak, framed as an example)*
- "Before: tutorials you forget. After: code you can actually write."
- Teach: "From knowing it to getting paid for it every month."

**5. Question** (one they can't answer instantly)
- "Do you know why you forget a tutorial the next day?"
- "Which of these 4 mistakes is keeping you from finishing?"
- Teach: "Do you know which lesson your students quit at?"

**6. List / Number** (safest; our default skeleton)
- "Don't start learning to code until you know these 4 things."
- "4 AI skills that keep you employable in 2026."
- "The only 4 habits you need to finally finish a course."
- Teach: "4 things every coding course needs so students actually finish."

### 6.3 Where new hooks come from
Our own comments and DMs (repeated questions are proven demand), posts with high saves, Instagram/Google search autocomplete for our topics, and the Keywords research folder. Use competitors only to spot formats, never to copy lines.

---

## 7. CTA system (organic, one per video)

The CTA is the last 3–5 s. It **grows out of that video's topic**, sounds like advice, and tells them to use Teyro. Two destinations, one per video:

**Type 1: Link in bio** (default for learner value videos)
- "And if you want to actually learn this, a few minutes a day, the app I use is in my bio. It's called Teyro."
- "If you keep starting and never finishing, the fix is in my bio. It's called Teyro."
- Teach: "If you know this stuff, you could be teaching it. The link to start is in my bio."

**Type 2: Website / search** (product-ad videos and anywhere the bio link is weak, e.g. TikTok without a bio link)
- "Practise this every day and keep your streak alive. Just search Teyro."
- "Want lessons that actually stick? Go to teyro dot app."
- Teach: "Build it once and get paid every month. Go to teyro dot app slash teach."

Rules:
- Exactly **one spoken ask**. Never "like, follow, comment and click the link".
- **Brand name at the end of the line**, for pronunciation and recall.
- Never mention launch dates or the waitlist in the video. The website handles that.
- Show it on screen too: Editorial = headline + a phone/browser card showing teyro.app or the bio. Arcade = keycap captions + a phone mock opening the profile/bio link.

---

## 8. Outcomes over features (how Teyro is sold)

| Feature (proof on screen) | Outcome (what we say) |
|---|---|
| Short four-step lessons (Learn, Apply, Reflect, Deepen) | "Learn something real on a bus ride, and still remember it tomorrow" |
| Immediate practice, instant feedback | "You come away able to do it, not just knowing about it" |
| Guided path from Tey in under 2 minutes | "No more 'what do I learn next?' Your next lesson is always waiting" |
| Streaks, freezes, repairs | "You'll actually come back tomorrow, and one bad day won't undo months" |
| Weekly leagues, friends, course community | "People notice when you show up, and you'll miss it when you skip" |
| Quests, chests, coins | "Proof you're getting somewhere, every single day" |
| Installs to Home Screen, reminders | "It's one tap away and nudges you before your streak runs out" |
| Teach: subscriptions, 70 % / 80 % | "Build it once, get paid every month they keep learning" |
| Teach: analytics + nudges | "Know exactly who's stuck, and bring them back in one tap" |
| Teach: streaks/leagues on your course | "More of your students actually finish, and finishers buy your next course" |

---

## 9. Fact banks (snapshot 2026-10-06; re-check the live pages before every script)

### 9.1 Teyro: from `teyro.app` + `teyro.app/features`
- **Positioning:** "The fun way to finish learning coding and AI." Short daily lessons with streaks, leagues and friends that keep you coming back until you actually finish.
- **For:** students, career switchers, course restarters ("Bought courses you never finished?").
- **Tracks:**
  - Coding: web development, mobile apps, programming fundamentals, software development; "From your first line to real apps".
  - AI: use AI tools, build AI agents, create automations; "Put AI to work, then build with it".
- **Setup:** tell Tey your goal and level; your path is ready in under two minutes. No experience needed.
- **Lessons:**
  - Bite-sized ("on a bus ride"). Four steps: Learn, Apply, Reflect, Deepen.
  - Writing and fixing real code within minutes, with instant feedback.
  - Hearts keep you careful; right answers earn XP.
- **Habit:**
  - Streaks with freezes and a 48-hour repair; Streak Society at 7 days.
  - Weekly leagues with real learners (no bots), Bronze → Diamond + tournament.
  - Three daily quests, a daily chest, streak chests, coins (earned, not bought) and a shop.
  - Monthly Challenge with a badge.
- **Social:** follow friends and race streaks; join your course community after two lessons.
- **Phone:** installs to the Home Screen on iPhone/Android in one tap with no app store; opens instantly, works offline, and reminds you before your streak ends.
- **Price:** free to start; many courses free end to end; paid courses let you try the first two lessons free.
- **Time:** as little as a few minutes a day; you pick a daily goal.
- **Mission line:** "Nobody should be left behind when the way we work changes."
- **Not for videos:** launch date / waitlist (founder rule, §7).

### 9.2 Teyro Teach: from `teyro.app/teach` + `teyro.app/teach/how-it-works`
- **Positioning:** "Teach coding or AI. Earn every month they keep learning." / "Most courses sell once. Teyro courses keep earning."
- **Money:**
  - Creators keep **70 % of every payment, including renewals**; **Founding Creators keep 80 %**.
  - Pricing: the creator sets a yearly price; the monthly plan is 1/6 of it (a $60 course = $60/yr or $10/mo). Learners get the first 2 lessons free, then subscribe. Free courses are allowed too.
  - Payouts: in USD; payments clear after 14 days; withdraw from $50 to a bank or mobile money in any country.
  - Earnings example (labelled an example, not a promise): one $60 course with 200 monthly subscribers ≈ $1,400/month.
- **Build:**
  - Tey plans your first course (about 8 lessons, roughly 2–8 weeks depending on your hours).
  - The wizard gives a starter outline; four-step lessons; seven card types and exercise types ("find the bug", "pick the better prompt"); live phone preview.
  - **No camera needed**; free to publish.
- **Quality:** every course is reviewed before going live.
- **Retention for you:**
  - Streaks, leagues, quests and Tey reminders on your course.
  - Analytics show where learners stop and which exercises they miss.
  - Nudge or cheer up to 50 learners at once with their first name.
  - Your own course community where you're admin.
- **Launch tools:** public creator page, coupons (percent or fixed, with end date and use limit), coupon links; "No audience yet? Teyro brings learners to your course too."
- **Who:** developers, AI builders, teachers and lecturers, YouTubers and creators, mentors and coaches.
- **Founding Creators:** join before the learner app launches → 80 %, a Founding badge for good, and founding benefits.
- **Apply:** `teyro.app/creator/onboarding` (videos can say "teyro dot app slash teach").

---

## 10. Production pipeline, delivery and pre-publish checklist

**Pipeline** (all in `video-studio/`; the template lives in `src/explainer/`: Stage, Headline, TopBar, PlugStrip, Kit, Blocks, Cta):
1. Topic and facts (§9, live page).
2. Hook (5 versions, §6).
3. Script on the §2 skeleton, inside the §2.3 speed range.
4. (The idea was already approved by the founder before step 1. Videos are made one at a time.)
5. Storyboard: one visual gag per phrase; pick the look; set the progress meter.
6. ElevenLabs VO per sentence (`pipeline/voice.mjs`), then word timestamps and lip-sync. **Ask the founder for the ElevenLabs key at the start of every video session.** Never store it anywhere: pass it only on the command (`XI_KEY=<key> node …`). Free keys run out (~10,000 characters ≈ 7–9 videos), so expect a new key per session.
7. Remotion composition, data-driven, with Ada v2.
8. Mix to −14 LUFS.
9. Review sheet (`node pipeline/review.mjs <CompId>`), then render 1080×1920 at 30 fps, H.264 + AAC, then `node pipeline/finish.mjs <render.mp4> <deliverable-dir> <slug> <coverSecond>` (−14 LUFS two-pass, cover, QA numbers). Pick a cover second where the full hook line is on screen.
10. Write the post kit.

**Delivery: never auto-posted.** Each finished video is a folder the founder downloads and uploads manually:
```
video-studio/deliverables/<teyro | teyro-teach>/<YYYY-MM-DD>-<slug>/
  <slug>.mp4   ← upload this
  cover.jpg    ← choose as the cover
  post.md      ← copy-paste kit (from deliverables/_TEMPLATE/post.md)
```
The video and post kit are also sent in chat as downloadable files when they're ready.

**Post kit (`post.md`), required for every video:**
- **Instagram caption:**
  - Hook line first (≤ 125 characters show before "more").
  - A numbered recap, a share line, the CTA and a closing question.
  - **Exactly 5 hashtags** (Instagram's hard cap since December 2025): 2 broad topic, 2 niche, 1 brand.
- **TikTok caption:** ≤ 150 characters with a searchable phrase (the first ~90 show) and 3–5 hashtags.
- **Pinned comment**, **alt text**, a **reply bank** for the first hour, and a **facts-check table** linking every claim to its live page.

**Checklist (all must be ✓):**
- [ ] Hook in the first 3 s on all three layers, same promise, ≤ 10 spoken words
- [ ] Follows the A/C or B skeleton and timings; 36–51 s; pace measured inside 3.3–4.1 w/s
- [ ] Post kit complete: IG caption + exactly 5 hashtags, TikTok caption, pinned comment, alt text, reply bank, facts table
- [ ] Delivered as a download (MP4 + cover + post.md), not posted
- [ ] Topic passes the §11.2 novelty test (not basics) and is logged in the idea bank
- [ ] Every Teyro fact traceable to the live pages (§0.5); every topic fact has a primary source (§11.4)
- [ ] Outcomes said, features shown (§8)
- [ ] Ada placed per §4.3; never covers the headline or graphic
- [ ] New visual every ≤ 1 s; progress meter visible throughout; counters roll
- [ ] Captions word-synced (Editorial headline build or Arcade keycaps)
- [ ] Engagement layer: save tag + recap frame, share line, caption question, pinned comment
- [ ] One spoken CTA, organic, brand at line end, no launch-date mention
- [ ] "Teyro" heard as "Taro"; no gaps ≥ 250 ms; −14 LUFS; clean loop
- [ ] No "gems" (it's **coins**), no emoji-as-icons in the UI recreations, Tey shown only as the logo

---

## 11. Topics and new ideas

### 11.1 Content pillars
Two accounts, five pillars. **Coding and AI are huge fields** (that's what learners can learn on Teyro), so there's an almost endless supply of specific things to teach. Pick narrow, concrete slices, never "intro to coding".

| Account | Pillar | What it covers | Example angles (not basics) |
|---|---|---|---|
| **Teyro** | **AI** | New AI tools, skills and workflows people can learn and use now | Lesser-known features of the big AI apps; agents and automations; MCP and tool use; prompting techniques with a measurable difference; AI for a specific job |
| **Teyro** | **Coding** | The craft beyond tutorials: tools, techniques, workflows, career reality | Debugging moves pros use; underused language/browser/devtools features; what reviewers actually look for; vibe-coding pitfalls; small projects that teach a lot |
| **Teyro** | **Learning** | How learning really works, why people quit, and how to fix it | Forgetting curve, retrieval practice, spacing, "tutorial hell", the illusion of competence, habit design. All research-backed. |
| **Teyro Teach** | **Teaching and earning** | Turning knowledge into income | Recurring vs one-time revenue, why course completion drives income, pricing psychology, launch mechanics, what makes learners finish |
| **Teyro Teach** | **Expert growth** | For developers, AI builders, teachers and YouTubers who could teach | Packaging what you know, teaching without a camera, an audience vs no audience, mistakes first-time course creators make |

The CTA routes by pillar: AI / Coding / Learning → **Teyro** (link in bio / teyro.app). Teaching / Expert growth → **Teyro Teach** (link in bio / teyro.app/teach). Suggested mix per 10 videos: Teyro 4 AI · 3 Coding · 3 Learning; Teyro Teach 6 Teaching and earning · 4 Expert growth.

### 11.2 The novelty test (every idea must pass all four)
1. **"I didn't know that."** Would most people interested in this topic, including people already learning it, learn at least one new thing? Explaining what a variable is, "what is ChatGPT", or "practice every day" fails.
2. **Specific.** It names a real thing: a tool, feature, technique, number, study or mechanism. "4 AI tools" isn't specific; "the 4 Claude Code plugins that…" is.
3. **Provable on screen.** Every item can be shown (UI recreation, diagram, counter, before/after), so it fits the format.
4. **Useful today.** The viewer can try it this week. For AI items, check it's still current the week we script it (AI news goes stale in weeks).

Ideas that are true and useful but well known can still work **only** with a non-obvious angle: "You've heard of spaced repetition. Here's the one setting most people get wrong."

### 11.3 Finding new ideas (repeatable)
Run an **idea scan** whenever the bank drops below ~15 approved ideas (ask: "find new video ideas"). Sources, in order of value:
1. **Our own audience:** repeated questions in comments and DMs, posts with high saves.
2. **Search demand:** Instagram/TikTok/Google autocomplete and "People also ask"; the keyword research in `Keywords/` (Udemy keyword exports, PAA export).
3. **AI and coding news at the source:**
   - official changelogs and blogs of the major AI labs and dev tools;
   - GitHub trending; Hacker News front page; Product Hunt;
   - subreddits such as r/learnprogramming, r/ChatGPT, r/LocalLLaMA, r/webdev.
4. **Learning science:** peer-reviewed research and well-known summaries (retrieval practice, spacing, cognitive load), always traced back to the study.
5. **Creator economy:** platform reports and creator surveys for the Teyro Teach pillars.
6. **Competitor formats**, only to spot formats, never to copy lines (§6.3).

### 11.4 The idea bank: `video-studio/ideas/IDEAS.md`
Every idea is logged with: pillar, account, working hook, the 4 items (for list videos), sources, and a **score of 1–5** on **Novelty · Usefulness · Visual potential · Proof available · Hook strength** (max 25). Script ideas scoring **≥ 18** first. Status: `idea → approved (by the founder, in chat) → produced → posted` (or `rejected` with a reason). Only `approved` ideas may be produced, one video at a time, with the post date and (once in) skip rate and saves.
**Scan history:**
- **2026-10-08, scan #1:** 32 ideas across all 5 pillars, plus a recommended first batch of 7.
- The SEO keyword exports in `Keywords/` were checked and are too broad for Reels topics; use them for blog SEO.
- Ideas sourced only from secondary/aggregator pages are marked ⚠️ in the bank and must be confirmed on the official page before scripting.

**Topic facts** (about a tool, a study or a number) need a **primary source**: official docs or changelog, the GitHub repo, or the paper. Record it in the bank and in the video's post.md facts table. Star counts and install numbers are re-checked on the day we render.
