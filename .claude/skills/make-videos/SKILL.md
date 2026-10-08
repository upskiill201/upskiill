---
name: make-videos
description: Produce ONE Teyro / Teyro Teach Instagram Reel + TikTok explainer video end to end, only after the person running it approves the idea (propose ideas → they approve one → script → ElevenLabs voice → Remotion render → post kit → deliver for download). Use when someone on the team says /make-videos, "make a video", "next video", or asks for new video ideas.
---

# /make-videos: one approved idea → one finished video

Anyone on the Teyro team (founder or a team member managing a Teyro / Teyro Teach account) starts a video session with this command. "You" below = the person running it.

**First time on this machine?** Point them to `video-studio/GUIDE.md`. You need Node 20+, `ffmpeg` + `ffprobe` on PATH, and `npm ci` inside `video-studio/` (Remotion downloads its own headless Chrome). Run `git pull` before every session, because the idea bank (`video-studio/ideas/IDEAS.md`) is shared by the whole team.

**Two hard rules (founder's decision, 2026-10-08; they apply to everyone):**
1. **No video without an approved idea.** Only an idea the person running the session has explicitly approved (status `approved` in `IDEAS.md`) may be scripted. Approval is per idea, given in chat.
2. **One video at a time. Never batch.** Make one video, deliver it, then stop and ask whether to do the next. Never script, voice or render a second idea in the same run.

Do the whole job for that one video; only stop for the steps marked **ASK**.

**Arguments** (all optional):
- *(none)* → propose the top 3 unproduced ideas and ask the person running it to approve ONE.
- an idea ID, e.g. `A3` → present that idea for approval (or go straight on if it's already `approved`).
- `ideas` → only run an idea scan and refill the bank. No video.

## 0. Load the rules (always, before anything else)
Read these fully; they are the source of truth and override anything you remember:
1. `docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md`: §0 rules, §2 script formula, §3 voice, §4 Ada, §5 visuals, §6 hooks (mandatory), §7 CTA, §8 outcomes, §9 fact banks, §10 pipeline + checklist, §11 topics.
2. `video-studio/README.md`: commands and folder layout.
3. `video-studio/ideas/IDEAS.md`: the idea bank and statuses.
4. One finished example as the pattern: `video-studio/src/videos/l1-rereading/` (script.json + L1.tsx). For a product ad, use `video-studio/src/videos/t2-quitting-cost/`.

Then check setup:
- `video-studio/node_modules/.bin/remotion` exists (else run `npm ci` in `video-studio/`).
- `git status`: parallel sessions sometimes switch branches. Make sure `video-studio/` and the docs are on disk before trusting them.

## 1. Get ONE idea approved → **ASK**
- If an `approved` idea is already waiting in `IDEAS.md` (and no ID argument was given), offer it first: "X is approved and next. Make it?"
- Otherwise pick candidates from `IDEAS.md`: status `idea`, highest score first, novelty test passed (§11.2), pillar mix in mind.
  - If fewer than ~10 unproduced ideas remain (or the argument is `ideas`), run an idea scan first (§11.3): web research plus our comments/DMs. Add scored, sourced rows and log the scan in IDEAS.md and doc §11.4.
- AI-news ideas: re-check they're still current this week.
- For each candidate (max 3), show the person running it:
  - the account (Teyro / Teyro Teach) and format (list / ad);
  - the working hook;
  - the 4 items in one line each;
  - the key sources;
  - the score.

  Ask them to **approve one** (or ask for changes / reject).
- Only after an explicit "yes / approved" for a specific idea: set its status to `approved <date>` in `IDEAS.md` (note any tweaks the person running it asked for in that row), then continue with that idea only.
- If the person running it rejects an idea, mark it `rejected <date>` with their reason, so it isn't proposed again.

## 2. Verify facts before writing
- Teyro claims: re-read the live `teyro.app` and `teyro.app/features`. Teyro Teach claims: `teyro.app/teach` and `/teach/how-it-works`. Use the built-in browser's page text; expand FAQs.
- Topic claims: confirm each number on its primary source. Anything only on an aggregator stays out of the video.
- Never put an invented number or ranking on screen.

## 3. **ASK** for the ElevenLabs key (once per session)
- "Please paste the ElevenLabs key for this session." **Never store it**: not in a file, code, docs, memory or logs. Pass it only as `XI_KEY='<key>'` on each voice/credit command.
- Check credits:
  ```bash
  XI_KEY='<key>' node -e "fetch('https://api.elevenlabs.io/v1/user/subscription',{headers:{'xi-api-key':process.env.XI_KEY}}).then(r=>r.json()).then(s=>console.log(s.character_count,'/',s.character_limit))"
  ```
  A video uses ~700–1,000 characters plus re-takes. If credits run out mid-video, **ASK** for a new key.

## 4. Make the ONE approved video
Folder `video-studio/src/videos/<slug>/`:
1. **script.json:** copy the shape of the example.
   - Voice: Jessica `cgSgspJ2msm6clMCkdW9`, model `eleven_multilingual_v2` (never eleven_v3: it ignores speed and adds long pauses), fps 30.
   - Hook first. `*accent*` words, ` | ` caption breaks. 4 items. One organic CTA (§7).
   - "Teyro" only at the start or end of a line. "Teyro Studio" mid-line fails; write "our Studio".
   - Put a `sources` array in the file.
2. **Voice:**
   ```bash
   cd video-studio
   XI_KEY='<key>' node pipeline/voice.mjs <slug> --stt
   ```
   - Pace must print ✓ (3.3–4.1 w/s); otherwise edit the script.
   - STT must hear "Teyro" as "Taro/Tarot". Otherwise `--redo <lineId>`, and if it fails twice, rephrase the line.
3. **Composition** `<Name>.tsx`, built from `src/explainer/` (Stage, Headline, TopBar, PlugStrip, Kit, Blocks, Cta). Register it in `src/Root.tsx`.
   - Every cue = `at(word, n)`. Count earlier occurrences: "So", "one", "your", and "Teyro" inside "teyro dot app".
   - Cards: `inAt = item − 0.35`, `outAt = next item + 0.05`, so they crossfade with no dangling cables.
   - Every card shows content within ~0.5 s of entering.
   - One literal visual per phrase. Recap card + `SaveTag` (save frame). CTA via `<Cta>`.
4. **Review:** `node pipeline/review.mjs <CompId>`, then LOOK at `out/review-<CompId>.png`. Check for overlaps with Ada, empty cards, wrong cues and unreadable text. Fix, then re-check.
5. **Render + finish:**
   ```bash
   npx remotion render src/index.ts <CompId> out/<CompId>.mp4 --codec h264 --crf 17
   node pipeline/finish.mjs out/<CompId>.mp4 deliverables/<teyro|teyro-teach>/<YYYY-MM-DD>-<slug> <file-slug> <coverSecond>
   ```
   - QA must show −14 LUFS and no mid-video silences.
   - Cover second = a frame where the FULL hook line is on screen. Check `cover.jpg`.
   - Run the render in the background; the machine may sleep, so re-check timings that look wrong.
6. **post.md:** from `deliverables/_TEMPLATE/post.md` (see any 2026-10-08 kit for tone).
   - IG caption: exactly 5 hashtags. Don't write "#1" in captions; Instagram may count it.
   - TikTok caption ≤ 150 characters with 3–5 hashtags.
   - Pinned comment, alt text, reply bank, facts table.
7. Update `IDEAS.md`: status → `produced <date>`.

## 5. Deliver
- Send the MP4 + cover + post.md with SendUserFile (`display: attach`). Never post to Instagram/TikTok.
- Summarise in a few lines: account · title · length · QA numbers, plus anything the person running it should check by ear (you can't hear audio).
- **Then stop and ASK:** "Want the next one? Here are the top candidates…" (show up to 3, as in step 1). Start the next video only after a new explicit approval. Never chain videos automatically.
- **Share the idea-bank update with the team:** offer to commit `video-studio/ideas/IDEAS.md` (+ the new `src/videos/<slug>/` source) on a feature branch and open a PR. Never push to `main` directly. This stops two people making the same idea. Don't commit without asking.
- Rendered MP4s/covers are git-ignored; they stay on the machine that made them.
