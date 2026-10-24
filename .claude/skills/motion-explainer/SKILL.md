---
name: motion-explainer
description: Produce ONE long-form (2:00–2:55) motion-graphics explainer Reel for Teyro in the "one world, one lesson" format (persistent world + live HUD + numbered chapters + male narrator + recurring host Remi), with a Teyro mid-bridge and outro, delivered as an MP4 + post caption in chat. Use when someone says /motion-explainer, "make a motion explainer", "make an explainer like the tokens/OSI/system design videos", or asks for motion explainer ideas. Not for the short illustrated-host videos (that's /make-videos).
---

# /motion-explainer: one approved idea → one finished 2–3 minute explainer

This format is cloned from four viral references (tokens, OSI, how LLMs are built, system design 101). They are complete mini-lessons in one continuous animated world. The goal is to give real value, then send viewers to Teyro to learn coding and AI.

**Read first, every session (source of truth):**
- `docs/MOTION_EXPLAINER_REFERENCE_ANALYSIS.md`, and its §7 QA gates.
- Reference frames: `docs/motion-explainer-reference/`.

**Don't touch** `/make-videos`, `pipeline/*.mjs` (outside `pipeline/motion/`), `src/explainer/`, `src/videos/` or `ideas/IDEAS.md`. This skill has its own:

| Part | Location |
|---|---|
| Remotion entry | `video-studio/src/motion/index.ts` |
| Kit | `src/motion/kit/` |
| Videos | `src/motion/videos/<slug>/` |
| Pipeline | `video-studio/pipeline/motion/` |
| Idea bank | `video-studio/motion-ideas/IDEAS.md` |
| Post template | `deliverables/_TEMPLATE/motion-post.md` |

**Hard rules (founder decisions):**
1. **Approved idea only, one video at a time.** Propose up to 3 ideas and get an explicit yes on one. Deliver it, then ask before starting the next. Never batch.
2. **Male narrator.** Use the ElevenLabs voice chosen in the audition (§A). Never Jessica (that's /make-videos).
3. **Host = Remi** (`src/motion/kit/Host.tsx`), an original character. Never use or imitate the reference cartoon host.
4. **Hook first** (founder, 2026-10-09): the very first spoken line and frame 0 are the hook, never a "<Topic>, explained." title. The flow is topic → founder picks → hook options in the founder's templates ("Don't…", "Stop… if you want…", "Nobody is talking about this…", "This is the exact difference between…", "I wish someone told me…", "I tested…", or a viral question) → founder picks → script.
5. **Teyro placement** (founder, 2026-10-10; this replaces the old 3–5 s / 4–6 s limits):
   - one mid-video bridge, ~6–10 s, at ~45–55%, right after a cliffhanger;
   - a real **Teyro section** near the end (~20–30 s) that says **why** to learn on Teyro: learning plays like a game. Cover the benefits, the features and the outcome, using live-site facts only: few-minute lessons in four steps, writing real code with instant feedback, XP, streaks and freezes, weekly leagues (Bronze → Diamond), three daily quests, chests, coins and the shop, the Monthly Challenge, friends and the course community, and "so you actually finish". Show it with app-style cards recreated from teyro.app's visuals;
   - **always say how to find Teyro**: "search Teyro in your browser, or go to teyro.app". Say it in the end ask and show it on the outro card;
   - the Teyro tile in the HUD the whole video.
6. **Claims:**
   - Teyro facts come only from live `teyro.app` + `teyro.app/features`.
   - **No "30 days" claim** (founder, 2026-10-09). Use what the site says: "a few minutes a day", coding + AI tracks, "the fun way to finish learning coding and AI".
   - Topic numbers come only from primary sources, checked the same day and listed in `script.json.sources`.
   - Never mention the launch date or the waitlist.
7. **ElevenLabs key:**
   - Ask for it at the start of every session.
   - **Never store it** (not in files, code, docs, memory or logs). Pass it only as `XI_KEY='<key>'` on each command.
   - The Music API needs a paid plan. If a call returns `paid_plan_required`, `quota_exceeded` or `detected_unusual_activity`, stop and tell the person. Never work around it.
8. **Pronunciation:** "Teyro" must come out as "Taro". Put it at the start or end of a line; mid-sentence it gets mispronounced. Check with `--stt`.

## A. One-time setup (skip what already exists)
- `video-studio/node_modules` exists (else `npm ci` in `video-studio/`). ffmpeg/ffprobe are on PATH.
- **Narrator audition** (once, until a voice id is recorded here):
  - `XI_KEY='<key>' node pipeline/motion/audition.mjs`
  - Send `deliverables/_audition/all.mp3` to the person and **ASK** them to pick a voice.
  - Write the chosen id below and use it in every `script.json`.
  - **Chosen narrator voice id:** **Liam, `TX3LPaxmHKxFdv7VOQHJ`** (ElevenLabs premade; founder pick 2026-10-09). Use it in every script.json.
- **Approve the host:**
  - `npx remotion still src/motion/index.ts M-HostSheet out/m-hostsheet.png --scale=0.5`
  - Show it and **ASK** for approval (or changes) the first time. Rename via `HOST_NAME` if they want.
- **SFX library:** `XI_KEY='<key>' node pipeline/motion/sfx.mjs` generates `public/motion/sfx/*.mp3`, once per machine.

## B. Get ONE idea approved → ASK
- Read `motion-ideas/IDEAS.md`. Offer an already-`approved` idea first; otherwise pick up to 3 `idea` rows with the highest scores.
- Every candidate must pass the 4-point topic test at the top of IDEAS.md. If fewer than ~5 unproduced ideas remain, research new ones first: web search plus Teyro's comments and DMs. Add scored, sourced rows.
- Show for each candidate:
  - the hook line;
  - the engine (follow-the-object / running meter / build-from-scratch / pipeline);
  - the look (night / neon / lab / blueprint);
  - the chapter list in one line;
  - the twist;
  - the sources.
- Only after an explicit yes, set the row to `approved <date>`. Mark rejected ideas `rejected <date> <reason>`.

## C. Facts
- Open each primary source (built-in browser, page text) and confirm every number. Put each in `sources` with the URL and today's date.
- Re-read the live teyro.app and teyro.app/features page text for the bridge and outro lines.

## D. Script: `src/motion/videos/<slug>/script.json` (copy `_template/script.json`)
Word budget: **450–600 words at 3.4–3.6 w/s**. Use the beats and timings in doc §5.3:
- **title** (2–3 words: "<Topic>, explained." / "<Topic> 101.");
- **cold open** (concrete person, action or number, plus stakes);
- **mental model / roadmap**;
- **6–9 chapters.** Each one: spoken header fragment → problem → fix → name it after explaining it → one real number;
- **bridge** after a cliffhanger, at ~50%;
- **twist** ("the trap" / "the weird part" / "the beginner mistake");
- **recap**, one-liners;
- **punchline**, key word last;
- **cta**: one organic ask ending in "Teyro".

Voice rules (§5.2):
- median sentence 6–8 words, ¼ of sentences ≤ 4 words;
- one everyday analogy per concept;
- rapid Q→A bursts;
- an honesty caveat near the end;
- zero hype words, no "like and subscribe".

Markup: `chapter` on every line, `*accent*` words, ` | ` caption breaks.

Bridge examples, from site facts only:
- "Quick thing: if you want to actually learn this, a few minutes a day, that's what Teyro is for. Okay, back to the photo."
- "Lessons like this are what Teyro does. A few minutes a day. Now, trap two."

CTA examples:
- "Want to understand AI like this? Learn it on Teyro."
- "If you want to build things like this, search Teyro."

Show the script and **ASK** for approval before voicing. A whole-script re-voice costs credits.

## E. Audio
```bash
cd video-studio
XI_KEY='<key>' node pipeline/motion/voice.mjs <slug> --stt      # VO + word timings + lip-sync; prints pace + length
XI_KEY='<key>' node pipeline/motion/music.mjs <slug>            # composes the bed, ducks it under the voice → bed.wav
```
- Pace must print ✓ (3.3–3.8 w/s) and length ✓ (2:00–2:58). If not, edit the script; don't just change the speed by more than ±0.05.
- STT must hear "Teyro" as "Taro/Tarot". Otherwise `--redo <lineId>`; if it fails twice, rephrase.

## F. Composition: `src/motion/videos/<slug>/<Name>.tsx` (copy `_template/Video.tsx`)
- Import `vo.json` and register it in `src/motion/videos/index.ts`. The id becomes `M<n>-<slug>`.
- See `src/motion/dev/KitDemo.tsx` for a working example of every kit part.
- **One look, one world, one camera.** The hero object lives in `<World>` for the whole video (inside a `<Panel>` for diagram looks). Chapters change it, never replace it. Never hard-cut: QA fails on cuts.
- **Live HUD for the whole video:**
  - `HudMeter` for a running bill;
  - `HudJourney` to follow an object;
  - `HudSeries` + chips to build from scratch;
  - `HudDashes` for a pipeline.
  - Plus `ChapterTag` and the Teyro tile.
- **Show the verb:** every event sits on its cue word, `cue(vo, 'word', { after })`, using `Card states`, `Badge`, `Shatter`, `Wire` flow, `Ticker`, `TypeLine`, `Strike`, `Checklist`, `Split`, `GrowBars`, `LimitBars`, `Fill`, `Annotation`.
- **Density:** something new every ≤ 0.7 s, then hold. Use ambient motion (wire packets, tickers) between events.
- **Real numbers on screen with a `Footnote`** for headline figures.
- **Remi:**
  - **On** for the hook, chapter openers, explain/math moments and the recap; **off** for full-stage visuals.
  - While Remi is on, content goes on the side stage (`Z.sideCx`, `Z.sideW`). Use poses on cue (`point` at the thing being named, `explain`, `wow` on the twist).
- **Captions:** `<Captions hideBetween={[[bridge.start, bridge.end]]} />`. The style comes from the look.
- **SFX via `SoundLayer`:**
  - `revealCues()` on the title, every chapter card and big statements;
  - `ticks()` on pop-ins;
  - `whoosh` on camera moves;
  - `error` on red states, `success`/`chime` on fixes and the bridge;
  - `shatter`/`count`/`type` where literal.
- **End:** punchline → `TeyroOutro` → `LoopBack` to the frame-0 composition (last frame = first frame).
- **Review:** `node pipeline/motion/review.mjs <CompId>`, then LOOK at `out/review-<CompId>.png`. Check:
  - overlaps with Remi or the HUD;
  - empty stage moments;
  - unreadable text;
  - anything in the IG UI zones (top 9%, bottom 20%, right column).

  Fix and re-check. Spot-check exact seconds with `review.mjs <CompId> 12.5,40,…`.

## G. Render, finish, QA
```bash
npx remotion render src/motion/index.ts <CompId> out/<CompId>.mp4 --codec h264 --crf 17     # run in the background (2–3 min video ≈ long render)
node pipeline/finish.mjs out/<CompId>.mp4 deliverables/teyro/<YYYY-MM-DD>-<slug> <file-slug> 0.6
node pipeline/motion/qa.mjs deliverables/teyro/<YYYY-MM-DD>-<slug>/<file-slug>.mp4
```
- **All QA gates must pass** (they are the reference measurements): length, ≥ 1.5 events/s, no still > 2.5 s, no hard cuts, −14 LUFS, LRA ≤ 3, no silence ≥ 0.5 s. Fix and re-render until they do.
- Check `cover.jpg`: the full title must be on screen.

## H. Post kit + deliver
- Copy `deliverables/_TEMPLATE/motion-post.md` to `post.md` in the deliverable folder and fill it in:
  - IG caption: 2-line hook + emoji, chapters as a cheat sheet, the punchline, a share line, the Teyro line, a question, **exactly 5 hashtags**;
  - TikTok caption: ≤ 150 characters;
  - pinned comment, alt text, reply bank, facts table, and the QA table.
- Send the MP4, `cover.jpg` and `post.md` with SendUserFile (`display: attach`). Also paste the IG caption in the chat, ready to copy. Never post anywhere.
- Summarise in a few lines: title · length · QA numbers · what to check by ear (you can't hear the audio: Teyro pronunciation, bed level).
- Set the idea to `produced <date>` in IDEAS.md.
- **Then stop and ASK** whether to do the next one; show up to 3 candidates. Offer to commit the new `src/motion/videos/<slug>/` + IDEAS.md on a feature branch and open a PR. Never push to `main`, and never commit without asking.
