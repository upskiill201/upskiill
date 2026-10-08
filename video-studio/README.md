# Teyro Video Studio

> **To make a video, type `/make-videos` in Claude Code** (see `.claude/skills/make-videos/SKILL.md`). You approve one idea, paste an ElevenLabs key (asked each session, never stored), and get one finished video. One at a time, never batches.

Remotion project for Teyro's short-form videos (Instagram Reels / TikTok) and the October 2026 launch reels.
**Format, rules and checklist:** [`docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md`](../docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md).

```
video-studio/
├─ src/
│  ├─ host/Ada.tsx        ← Ada v2: the host for every social video (use this one)
│  ├─ host/AdaSheet.tsx   ← AdaPoseSheet / AdaPlacement / AdaDemo check compositions + placeAda()
│  ├─ components/Ada.tsx  ← Ada v1 (launch reels only; kept so the old reels still render)
│  ├─ Reel*.tsx, ai/, code/, ig/, wef/, scenes/  ← the 5 launch reels (Oct 2026)
│  └─ Root.tsx            ← every composition is registered here
├─ public/                ← fonts, game art, sfx (pop, whoosh, coin, tick…)
├─ pipeline/legacy/       ← launch-reel audio scripts: tts / stt / sfx (ElevenLabs), prep (lip-sync), mix, music
├─ ideas/IDEAS.md         ← idea bank: scored, sourced video ideas (docs §11)
├─ deliverables/
│  ├─ _TEMPLATE/post.md   ← copy for every new video
│  ├─ teyro/<date>-<slug>/        ← learner account: <slug>.mp4, cover.jpg, post.md
│  ├─ teyro-teach/<date>-<slug>/  ← creator account
│  └─ launch-reels/       ← the 5 finished launch reels (local only, git-ignored)
└─ stills.mjs             ← contact sheet of a composition at given seconds
```

## First-time setup (each team member)
1. Node 20+, and `ffmpeg` + `ffprobe` on your PATH.
2. `cd video-studio && npm ci`
3. Your own ElevenLabs key (free tier works, ~7–9 videos per key). Paste it when `/make-videos` asks; it is never saved.
4. `git pull` before each session, since the idea bank is shared.

Voice stems (`public/videos/`) and the TTS cache (`work/`) are generated locally and not in git. To re-render one of the existing videos, run `pipeline/voice.mjs <slug>` first (it re-generates the voice and costs credits).

## Making a video (the explainer format)
```bash
# 1. script: src/videos/<slug>/script.json  (*accent* words, " | " caption breaks)
XI_KEY=<key> node pipeline/voice.mjs <slug> --stt     # VO + timings + lip-sync; prints pace; --redo <id> re-takes a line
# 2. composition: src/videos/<slug>/<Name>.tsx using src/explainer/*, register it in Root.tsx
node pipeline/review.mjs <CompId>                       # 16-frame review sheet → out/review-<CompId>.png
npx remotion render src/index.ts <CompId> out/<CompId>.mp4 --codec h264 --crf 17
node pipeline/finish.mjs out/<CompId>.mp4 deliverables/<account>/<date>-<slug> <file-slug> <coverSecond>
```
Word cues use `at(vo, word, n)`: watch for words that are also spoken earlier ("So", "Teyro" inside "teyro dot app") and pass the right occurrence.

## Commands
```bash
npm ci                                   # once
npm run studio                           # live preview in the browser
npx remotion still src/index.ts AdaPoseSheet out/ada-poses.png
npx remotion render src/index.ts <CompositionId> deliverables/teyro/<date>-<slug>/<slug>.mp4 --codec h264 --crf 18
```

## Rendering speed
`remotion.config.ts` turns on GPU rendering (`angle`). That's about 5x faster than software rendering for Ada's sticker outline: 60 frames take ~38 s on this machine, so a 50 s video takes roughly 10–15 min.
- Ada's outline uses CSS drop-shadows (`sticker`, on by default).
- For grain, put `<Grain />` (`src/host/Grain.tsx`) last in the composition. Avoid Ada's per-character `grain` prop: it's an SVG filter and slow.

## ElevenLabs
**The key is never stored.** The founder gives a key at the start of each video session (free keys are swapped when their credits run out). Pass it only on the command that needs it: `XI_KEY=<key> node pipeline/voice.mjs <slug>`. Never write it to a file, code, docs, memory or logs. (`.xi` stays in .gitignore as a safety net for the legacy scripts.)

## Delivery
Videos are never auto-posted. Every finished video is a folder in `deliverables/` with the MP4, a cover frame and a copy-paste `post.md` (captions, hashtags, pinned comment, alt text). The founder downloads and uploads manually.
