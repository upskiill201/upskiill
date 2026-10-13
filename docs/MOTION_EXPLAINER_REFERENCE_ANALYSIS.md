# Teyro Motion Explainer: reference analysis (the "one world, one lesson" format)

> **What this is:** a frame-by-frame breakdown of four viral motion-graphics explainer Reels. Each has hundreds of thousands to millions of views, saves and comments. This doc is the source of truth for the future motion-explainer skill.
>
> **Not this format:** the older "Illustrated Host Explainer" format (`/make-videos`, `docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md`) is a separate, short (30–60 s) format. Nothing here changes it.
>
> **Analysed:** 2026-10-09.
>
> **How it was measured:**
> - Visuals: 1 fps and 4 fps contact sheets, 10 fps motion strips, and a per-frame scene-change score for every frame (5,000+ per video).
> - Audio: EBU R128 loudness, silence and pause detection, spectrograms, sub-bass tempo autocorrelation and pitch (F0) tracking.
> - Speech: a local Whisper transcription with word timestamps.
>
> **Reference assets:** `docs/motion-explainer-reference/`. `frames/` holds 28 full-resolution key frames. `contact-sheets/` holds every 2 s of every video, the first 6 s at 4 fps, the last 7 s, motion strips at 10 fps and spectrograms. The source clips are in the founder's `Downloads/Video` folder; two of the five uploads are byte-identical, so there are 4 references.
>
> **Limitation:** audio was measured, not heard. Voice notes are measurements plus transcripts.

---

## 1. The four references

| | R1 · "Tokens, explained" | R2 · "OSI model explained" | R3 · "How LLMs are built" | R4 · "System design 101" |
|---|---|---|---|---|
| IG caption hook | "Every time you talk to an AI, a meter is running 🚕 And it's not counting your words…" | "Your photo takes one second to reach Tokyo. This is everything that happens in that second 👇" | "Nobody ever wrote the code that lets ChatGPT write Python. Not one line of it. 🤯" | "Load balancer. Cache. Queue. CDN. Replica. Shard. 🧠 If those sound like a pile of random buzzwords…" |
| Length | **2:54** | **2:15** | **2:57** | **2:36** |
| Art direction | Dark isometric night world: roads, toll booths, delivery trucks, office towers per AI model | Neon synthwave: 7 glowing stacked planes on a perspective grid; a world map | Light "lab paper" with a faint grid; an isometric stacked-layer tower = the model | Light blueprint dashboard; an architecture diagram that grows |
| Hero object (persists all video) | The road and its traffic of token cubes | Lena's cat photo, travelling down and up the stack | The layer tower | The diagram, one server → 50M users |
| Live HUD (always on) | **Taxi meter:** INPUT / OUTPUT / CACHED lamps, TOKENS counter, BILL $, current tariff | **Journey bar:** LENA ──●── TOKYO plus current layer name | Section label (top-left) plus dash progress bar (top-right) | Series badge, chapter name, **users counter** and a row of 9 component chips that light up as learned |
| Chapters | 01 What's a token · 02 Two prices · 03 Trap one · 04 Trap two · 05 Caching · 06 The math · 07 Batch · 08 Big and small · 09 Recap | Layer 7 → 1 (giant numerals), Crossing the planet, Encapsulation, Tokyo in reverse, Check layer 1–4, OSI vs TCP/IP, 7 layers · 1 second | The question · Data · Tokens · Transformer · Pre-training · Post-training · Serving · The journey · The weird part | 00 The words · 00 Mental model · 01 One server · 02 Scale out · 03 The database · 04 Files · 05 Slow work · 06 Failure · 07 Observability · 08 The mistake · 09 The method |
| Narrative engine | A **running bill**: every concept changes the meter | **Follow the object** on a journey there and back | **Pipeline**: step 1 → 6, roadmap shown first | **Build from scratch** while scale explodes; every component is forced by a break |
| Twist / payoff chapter | "Trap one / Trap two", then "the hero of this story: caching", "90% OFF" | "If it never arrives, check layer 1, 2, 3…" (a debugging skill you can use) | "Here's the weird part: nobody coded Python into it" | "The beginner mistake": more components ≠ better, then the 4-step method |
| Final line (punchline) | "You're not paying for ~~answers~~, you're paying for **tokens**." | "Seven layers. Seven jobs. All in one second. So Lena's brother can see her cat." | "Predict what comes next, and get slightly less wrong every time." | "Don't memorize the names. Ask what problem forced us to add this. That's system design 101." |
| CTA | **None** | **None** | **None** | **None** |

All four are by the same creator. They share one recurring host character, one caption family, one sound and one structure, so the format itself is a recognisable series.

---

## 2. The formula (what all four do; this is what makes them work)

### 2.1 Length and promise
- **2:15–2:57, always under Instagram's 3:00 Reel cap.** This is not a 30-second tip. It is a *complete* mini-lesson on a topic people find intimidating, and the completeness is the value.
- The promise is always "**the whole thing, finally clear, in one video**". That drives **saves** (reference value) and **shares** ("send this to the friend who keeps saying load balancer").
- Watch time per view is the strongest ranking signal. Three minutes with high retention earns several times the total watch time of a 30-second clip.

### 2.2 Hook: first 2 seconds
**Frame 0 is the title card and the cover at once.**
- What's on it: `<TOPIC>` plus `explained` / `101` / `How X are built`, over a miniature of the *whole* visual world (the full road map, both OSI stacks, the full tower, the finished diagram). The viewer sees the destination before the trip.
- Timing:
  - It is spoken in the first **~1.2 s**: "Tokens explained." / "OSI model explained." / "System design 101." / "How LLMs are built."
  - At **~1.3–2 s**, the cold open starts: a concrete, everyday scenario or a provocative question.
- The four cold opens:
  - R1: "…and why your AI bill looks the way it does. Every time you talk to an AI, a meter is running."
  - R2: "This is Lena. She's about to send a photo of her cat to her brother in Tokyo. She taps send."
  - R3: "How do you actually build one? Like ChatGPT or Claude? From the outside, it looks like magic."
  - R4: "People hear words like load balancer, cache, queue, database replica, CDN, sharding… a giant collection of terms. But it's really just this."
- **Visual change within 0.25 s:** a gate lifts, a stack glows, a tower fills, a diagram draws itself. In the first 6 s, something new appears every 0.25–0.5 s (see `contact-sheets/*_hook.jpg`).
- **The IG caption repeats the hook** in two short lines plus one emoji (🚕 👇 🤯 🧠), then continues the story in text.

### 2.3 Hook archetypes (all four are "demystify something you already use")
1. **Hidden cost / hidden mechanism in a daily action:** "Every time you talk to an AI, a meter is running." (R1)
2. **Slow-motion of one second:** "Your photo takes one second to reach Tokyo. This is everything that happens in that second." (R2)
3. **Impossible-sounding truth:** "Nobody ever wrote the code that lets ChatGPT write Python." (R3)
4. **Jargon wall → one simple idea:** "Load balancer. Cache. Queue… If those sound like random buzzwords, it's really just three things." (R4)

The topic is always something the viewer **uses** (AI chat, sending a photo, ChatGPT, apps) explained at the level of **how it really works**, with real numbers. It's never "5 tips". The audience is far bigger than developers.

### 2.4 Structure: one world, numbered chapters, problem → fix
```
0:00  Title + cover (1.2 s)           "X explained."
0:01  Cold open scenario / question   concrete person, object or number
0:08  Mental model / roadmap          "It's really just three things" / the 6-step pipeline / the 7 layers
0:12  Chapter 01 … Chapter 0N         6–9 chapters, ~12–20 s each
      └ each chapter: a problem appears → the visual breaks → the concept fixes it → the HUD updates
~70%  Twist chapter                    "Trap", "The weird part", "The beginner mistake", "If it never arrives…"
~85%  Recap: zoom out to the whole map, numbered pins / the checklist re-lights 1→N (10–15 s)
~97%  Punchline: one reframing sentence, a big type card
end   Visual loops back to frame 0 (seamless replay), cut ~0.5 s after the last word
```
- **No hard cuts.** At a 0.25 threshold the scene-change detector found **0 cuts in all four videos**. Every transition is a camera move, zoom-out or morph *inside the same world*.
- **Every new concept is caused by a failure:**
  - "One server can't handle everything" → load balancer.
  - "Every server hits one database" → cache.
  - "The photo is too big to travel in one piece" → TCP segments.
  - "But there's a problem. It's basically autocomplete" → post-training.
- That causal chain is the retention engine: every answer opens the next question.
- **Chapter openers are often questions:**
  - "So what's a token?"
  - "That hidden thinking?"
  - "Now why do models cost so differently?"
  - "What does 'it' point to?"
  - "Next problem: what happens when…"

### 2.5 The live HUD (the series' signature device)
Something at the top of the frame **counts, moves or fills during the whole video**:
- **R1:** a meter (tokens and $) that changes on every example.
- **R2:** a progress dot travelling from LENA to TOKYO.
- **R3:** progress dashes.
- **R4:** a users counter jumping 1 → 1,000 → 250K → 1M → 20M → 50M, plus component chips lighting up.

It tells the viewer where they are and how much is left. It creates sunk cost ("I'm at chapter 6 of 9") and gives ambient motion between events.

### 2.6 Motion density (measured)
| | Visual events / s | One new event every | Longest fully-still stretch | Share of near-still frames |
|---|---|---|---|---|
| R1 | 1.50 | 0.67 s | 2.3 s | 67% |
| R2 | 1.70 | 0.59 s | 2.4 s | 71% |
| R3 | 1.77 | 0.56 s | 1.4 s | 70% |
| R4 | **2.62** | **0.38 s** | **1.2 s** | 72% |

**The paradox that matters: ~70% of frames are almost still, yet something new happens every 0.4–0.7 s.**
- Motion comes in **short, snappy bursts** (6–10 frames, strong ease-out, a little overshoot on pop-ins), each followed by a hold so the eye can read.
- It's never constant drifting. The bursts sit on the spoken word.
- Between bursts, **ambient motion** keeps the frame alive:
  - packets flowing along wires;
  - counters ticking;
  - trucks driving;
  - glows pulsing;
  - the host blinking.

### 2.7 "Show the verb" (word-locked visuals)
The object does exactly what the word says, **on that word** (10 fps strips in `contact-sheets/motion10fps_*`):
- R2: "So it gets **cut**" → the photo cube shatters into packets.
- R4: "One server can't **handle** everything" → the box turns red, a `CPU 100%` badge pops, then a `TIMEOUT` chip.
- R4: "Then traffic **grows**" → the users counter jumps and more dots flow.
- R3: "LLMs don't read text the way humans do" → the headline types word by word as spoken, then the sentence splits into token chips one by one.
- R3: "**strip** broken data" → a strikethrough line plus a red `BROKEN` tag.
- R2: "**encrypted** so nobody can read it" → the cat photo scrambles into noise.
- R1: "If the model **thought**…" → 9,600 hidden token cubes fill a box behind a 6-token answer.

### 2.8 Concreteness = credibility (and comments)
Every abstract idea gets a **real number, a real name or a real example**, often with a tiny monospace source footnote:
- "FineWeb (2024): 15 trillion tokens of web text"
- "GPT-2 small: its real 12 layers"
- "Llama 3.1 405B: 405,000,000,000 weights"
- "810 GB vs 80 GB: 10× too big for one GPU"
- "one piece can carry 1,460 bytes"
- "$2 in · $10 out per 1M tokens"
- "the photo: 312,680 bytes"
- "180 ms to the origin in Virginia vs 12 ms to the edge in Tokyo"

Real UI artefacts are drawn as small cards: an HTTP request, a `dig` result, an IP header, a MAC header, binary, a log stream, a trace waterfall. Experts comment ("actually accurate", "you forgot X"), and those comments push distribution.

### 2.9 Data as story
- Counters that run.
- Bars that fill against a limit (one GPU vs the model).
- Charts that grow with the narration (the input-tokens staircase over 50 messages).
- **Side-by-side "without vs with" cards:** TCP vs UDP, without cache vs with cache, $11.00 vs $2.12.
- **Strikethrough reframes:** ~~answers~~ → tokens, ~~nothing ever fails~~ → failure stays contained.
- **Checklists that light up:** useful ✓ accurate ✓ safe.

### 2.10 Recap and ending
- **Recap = zoom out to the whole world** with numbered pins appearing one per spoken point (R1). Or the opening roadmap re-lights step by step (R3). Or the chips map to "what problem forced it" (R4).
- **Punchline = one sentence that reframes the whole topic**, set big. Viewers screenshot and quote it.
- **Loop:** the last frame returns to the opening composition (R2 returns to Lena's phone with a ❤️ on the cat photo; R3 to the tower with "Tokyo"; R4 to the title card). Replays are counted as watch time.
- **No CTA and no "follow for more" in any of them.** The value *is* the CTA: people follow to get the next one. For Teyro this is the main design constraint (see §6).

---

## 3. Visual system details

### 3.1 Frame and safe zones (720×1280 references; we render 1080×1920 at 30 fps)
| Zone | % of height | Contents |
|---|---|---|
| Top margin | 0–9% | Empty (Instagram's top UI) |
| HUD | 9–19% | Meter / journey bar / series badge + chapter + counter + chip row |
| Stage | 19–72% | Hero object, cards, diagrams; the host on the left third when present |
| Captions | 74–80% | One caption line, centred |
| Bottom | 80–100% | Empty (IG caption, buttons) |

Side gutters are ~4% each. Nothing important goes into the right 15% between 45% and 85% height (IG's like/comment/share column).

### 3.2 Captions (one line, 2–5 words, always progressive)
- Centred at **y ≈ 77%**.
- Bold sans (600–700), ~44 px on 720 w (≈ **66 px at 1080 w**).
- A chunk is 2–5 words that changes at phrase boundaries, never mid-phrase.
- Four styles from the same creator:
  - R1: a dark rounded pill; spoken words white, upcoming words grey.
  - R2: no pill; spoken words white, upcoming words grey.
  - R3: a dark navy pill, all white, keyword bolder.
  - R4: a white pill with a **yellow highlighter on the current word**.
- **Rule:** the viewer always sees which word is being said right now.

### 3.3 A second text layer (the "claim" layer)
Each video has text that states the point while the caption carries the speech:
- **R3:** a full headline sentence top-left, typed as it's spoken ("We read words. LLMs don't.").
- **R4:** a sticky note on the left labelled `RULE` / `PROBLEM` / `FIX` / `GOAL` / `COST` ("Every server hits one database").
- **R1:** a chapter tag under the HUD plus **handwritten annotations with arrows** ("a small chunk of text", "the most one trip can carry", "the smartest isn't always the answer").
- **R2:** a giant chapter numeral with the layer name ("7 · APPLICATION").

### 3.4 Type
- **Display:** a grotesk (Space Grotesk-style), tight tracking, for titles and big statements ("EXPECT PARTS TO BREAK.", "PREDICT WHAT COMES NEXT", "90% OFF").
- **Data and labels:** a monospace (JetBrains Mono / IBM Plex Mono-style), uppercase, tracked, small. Used for HUD, tags, footnotes and code cards.
- **Captions:** an Inter-style bold sans.
- **Annotations:** a handwritten script with a curved arrow.

### 3.5 Colour
- One base world colour per video plus **2–3 semantic accents that keep their meaning all video**:
  - R1: input = blue, output = red-orange, cache = green.
  - R2: layer ramp orange → pink → magenta → purple → blue → teal.
  - R3: one blue (data) plus red for error/loss and green for "correct".
  - R4: purple = component, red = problem/bottleneck, green = healthy, yellow = caption highlight.
- Problems are **always red**, fixes are **always the accent**, and success is **green**.

### 3.6 Host character
- **The same cartoon scientist in all four videos** (a recognisable TV-cartoon IP; **we cannot use him**).
- Placement:
  - left third, feet at ~72% height, ~50–55% of frame height;
  - idle stance holding a laptop;
  - blinks and lip-sync mouth shapes.
- **Not on screen all the time:**
  - **On:** the hook, chapter openers, "explain this" and math moments, the recap.
  - **Off:** big visuals (the world map, the full-stage tower).
- **He never acts much.** The visuals carry the lesson; the host is a brand anchor and a "face" for the voice.
- The narrator is **male** (confirmed by ear by the founder, 2026-10-09). The pitch tracker's 200–254 Hz reading was an octave error over the music bed (see §4).

### 3.7 Camera
- **One continuous world with a camera that glides:**
  - pan along the road;
  - push into a layer;
  - pull back to the full map at chapter boundaries and the recap.
- Moves are slow (0.6–1.2 s) with ease-in-out; zooms to the overview happen on "Let's…" / "Now…" lines.

---

## 4. Audio (measured)

| Property | Measurement | Our spec |
|---|---|---|
| Loudness | **−14.1 LUFS integrated on all four**, LRA 1.2–1.5 LU (heavily compressed, very even) | loudnorm −14 LUFS, LRA ≤ 2, true peak ≤ −1 dBTP |
| Pauses | Voice is wall-to-wall. Gaps at −24 dB average **0.26–0.28 s**, longest 0.3–0.46 s. **No silence below −40 dB anywhere** (the bed never stops) | Sentence gaps 0.15–0.3 s; never a dead gap |
| Music bed | A continuous soft ambient pad with sub-bass in every voice gap. R3 has a light ~100 BPM pulse; R1, R2 and R4 are nearly beatless | A quiet ambient/lo-fi bed ducked under the voice (bed ≈ −24 dB below voice) |
| Impacts | Sub-boom hits (strong energy < 60 Hz) on the title card, chapter reveals and big statements (e.g. R4 at 1.0 s "101", 7.7 s and 15.2 s) | Boom on the title, every chapter card, big-type statements and the punchline |
| Risers | Rising tonal sweeps (~0.8 → 1.4 kHz over 0.6–0.9 s) right before reveals | Riser into each chapter card and the recap zoom-out |
| UI SFX | Thin broadband ticks/clicks on pop-ins (visible as vertical lines in the spectrogram); soft whooshes on camera moves | Tick on every pop-in, soft whoosh on camera moves, counter ticks, an error buzz on red states, a chime on success |
| Narrator | One **male** narrator (founder, by ear, 2026-10-09). The automatic F0 track read 200–254 Hz, which is an octave error caused by the music bed, so ignore that number. Intonation is lively, not monotone | **Male** ElevenLabs voice: calm, precise, friendly, a smile on payoffs. Picked by a one-time audition (same 3 lines, 3–4 male voices); the founder chooses. Never Jessica (that's the `/make-videos` voice) |

---

## 5. Speech pattern (from word-timestamped transcripts)

### 5.1 Numbers
| | Words | Pace (clean 15 s windows) | Median sentence | p90 sentence | Sentences ≤ 4 words | Questions | Person |
|---|---|---|---|---|---|---|---|
| R1 Tokens | ~560* | 3.3–3.8 w/s | 8 words | 17 | ~28% | "So what's a token?" + rhetorical | **you** (your bill) |
| R2 OSI | 480 | **3.57 w/s** (every window 3.1–3.9) | 6 | 20 | **41%** | 4, all in one rapid diagnostic burst | **third person story** (Lena) |
| R3 LLMs | ~560* | 3.1–3.6 w/s | 7 | 14 | 33% | opening questions | **you/we** (we build it) |
| R4 System design | ~520* | 3.3–3.6 w/s | 7 | 14 | 21% | 4 | **you** (you scale) |

\*Whisper dropped some passages where the music was loud; totals are estimated from pace × length.

**Spec:**
- **3.4–3.6 words/s (≈ 205–215 wpm), steady the whole way.** There is no slow intro and no slow outro.
- **450–600 words for 2:15–2:55.**
- Sentences: median 6–8 words, and 25–40% of sentences are 4 words or fewer.

### 5.2 How the narrator talks (copy the moves, never the wording)
1. **Spoken chapter headers as fragments:** "Layer six, presentation." · "Step one. Data." · "Second trap." · "Next problem." · "Now files." One beat, then straight into the content.
2. **Concept first, name second:**
   - Explain what happens, then name it: "…so it gets cut into small pieces and each one gets a number. *This is TCP.*" · "…users in one range go to one database. *That's sharding.*" · "Engineers call this *encapsulation*."
   - The jargon arrives *after* the viewer already gets it, so it feels earned.
3. **Everyday analogies, one per concept:**
   - a meter running;
   - writing the address on a package;
   - a phone call that stays open;
   - the post office down the street;
   - a package inside a package inside a package;
   - "a very powerful autocomplete".
4. **Problem → fix connectors:** "Then traffic grows." · "But now…" · "So you…" · "But there's a problem." · "Which brings us to…". "So" is the most common sentence opener.
5. **Rhythm devices:**
   - Triads: "compressed so it's smaller, encrypted so nobody can read it".
   - Repetition: "grows and grows and grows" · "Then we do it again. And again."
   - Parallel lines: "A cache can go stale. A queue can deliver twice. Replicas can lag."
   - **Rapid Q→A bursts:** "No signal at all? Layer one. Can't reach the router? Layer two. Lost on the way? Layer three."
6. **Signposts that promise a payoff:**
   - "Let's follow the photo."
   - "Let's walk through it."
   - "Let's build the mental model from scratch."
   - "Now here's the first trap."
   - "the hero of this story"
   - "And here's the weird part."
   - "Notice what happened."
7. **An honesty caveat near the end builds trust:**
   - "To be honest, the real internet doesn't follow all seven layers perfectly…"
   - "The goal isn't that nothing ever fails."
8. **Numbers spoken plainly and rounded for the ear:** "Two dollars in, ten out." · "A thousand tokens is about 750 words." · "five times more expensive". The exact figure lives on screen.
9. **Recap = rapid one-liners**, one per chapter, ~2 s each.
10. **The final line mirrors the opening or reframes it.** It is short, with the key word last: "…you're paying for *tokens*." · "…so Lena's brother can see her *cat*."
11. **Tone:**
    - calm, precise, friendly, zero hype words (no "insane", "guys" or "game-changer");
    - no "like and subscribe";
    - no filler ("so basically", "um").
    - Contractions everywhere.
    - The voice smiles on payoffs and drops on the last word of each list.

### 5.3 Script skeleton (word budget for a ~2:40 video at 3.5 w/s ≈ 560 words)
| Beat | Time | Words | Content |
|---|---|---|---|
| Title | 0:00–0:01.3 | 2–3 | "<Topic> explained." |
| Cold open | 0:01–0:08 | 20–25 | A concrete person/action/number, plus the stakes ("…and why your bill looks the way it does") |
| Mental model / roadmap | 0:08–0:15 | 20–25 | "It's really just…" / "Let's follow…" / the N steps |
| Chapters 1–3 | 0:15–1:05 | ~175 | Each: header fragment → problem → fix → name it → one real number |
| **Teyro mid bridge** | ~1:10 | 12–16 | One line after a cliffhanger (see §6) |
| Chapters 4–6 | 1:15–2:05 | ~175 | Same chapter pattern |
| Twist | 2:05–2:20 | 45–50 | "Here's the weird part / the trap / the mistake" |
| Recap | 2:20–2:32 | 35–40 | One-liners per chapter over the zoom-out map |
| Punchline | 2:32–2:37 | 12–16 | The reframing sentence, key word last |
| **Teyro end** | 2:37–2:43 | 15–20 | One organic ask; then the visual loops |

---

## 6. Why they get millions of views, and what that means for Teyro

| Mechanism | How the references trigger it | What we must copy |
|---|---|---|
| **Curiosity about something you already use** | AI bills, sending a photo, ChatGPT, every app | Topics from the viewer's daily tech life, explained at "how it really works" depth |
| **Completeness → saves** | "The whole thing in one video", recap map | 2:15–2:55, a numbered roadmap, a recap that looks like a cheat sheet (pause-worthy frame) |
| **Retention through causality** | Every concept is forced by a failure | A problem → fix chain; a question opens every chapter |
| **Retention through motion** | A new event every 0.4–0.7 s, ambient motion, a live HUD | Motion-density QA gate (§7) |
| **Credibility → comments** | Real numbers, real names, source footnotes | Sourced facts only, footnoted on screen |
| **Replays** | Ending loops to frame 0 | Last frame = first frame composition |
| **Shares** | A quotable punchline; "send to the friend who…" | A punchline card, plus a share line in the caption |
| **Series recognition → follows** | Same host, look, caption style and sound across videos | A Teyro series identity (host, HUD, sounds) kept fixed across every video |

**The Teyro tension:** the references have **zero CTA** and loop seamlessly. The founder wants Teyro mentioned **mid-video and at the end**. Rules so that this doesn't break retention:
1. **Mid-video bridge (one, 3–5 s, at ~45–55%):**
   - Placement: right after a chapter ends on an open question (a cliffhanger), so the viewer stays to hear the answer.
   - Style: same world and HUD. It is spoken as a quick aside, not an ad.
   - Example: "Quick thing: this is exactly the kind of lesson you get on Teyro, a few minutes a day. Okay, back to the photo."
   - The HUD shows a small Teyro tile pulse.
2. **End (one ask, 4–6 s, after the punchline, before the loop):**
   - It grows out of the topic and points to the bio or "search Teyro".
   - The final frame still loops to frame 0.
3. **Always-on brand:**
   - A small Teyro tile in the HUD for the whole video, so a recognisable series watermark replaces the creator's character.
   - The cover/title card carries the series name.
4. **Claim check:** "in 30 days you'll know things like this" is **not on teyro.app today** (only "a few minutes a day" and the learning tracks are). Either phrase it as an invitation rather than a promise, e.g. "Give it 30 days, a few minutes a day", or put the claim on the site first.

---

## 7. QA gates for every Teyro motion explainer (derived from the measurements)

- [ ] Length 2:00–2:55 (hard cap 2:58 for Instagram).
- [ ] Frame 0 = title + miniature of the whole world; title spoken by 1.3 s; cold open by 2 s.
- [ ] Hook is one of the four archetypes (§2.3) and passes "is this something the viewer already uses?"
- [ ] 6–9 numbered chapters, each opened by a problem or question; a twist chapter at ~70%; a recap at ~85%; a punchline card; the last frame loops to frame 0.
- [ ] Persistent HUD with a live counter or progress for the whole video.
- [ ] Motion density: ≥ 1.5 visual events/s on average, and no fully-still stretch > 2.5 s (measured with ffmpeg scene scores, same method as §2.6).
- [ ] Zero hard cuts (scene score > 0.25 never occurs, except the optional final loop).
- [ ] Every number on screen has a source in `sources`; footnotes on screen for headline numbers.
- [ ] Captions: one line, 2–5 words, current-word highlight, y ≈ 77%, nothing in IG's UI zones.
- [ ] Audio: −14 LUFS ±0.5, LRA ≤ 2, no gap > 0.5 s, a bed under everything, a boom on every chapter card.
- [ ] Teyro: exactly one mid bridge (≤ 5 s) and one end ask (≤ 6 s); facts only from the live teyro.app pages; "Teyro" at the start or end of a line.
