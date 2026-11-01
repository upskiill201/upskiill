# How your phone knows it's your face, not your twin's: Motion Explainer post kit

**Account:** Teyro
**Video file:** `face-id-twins.mp4` (1080×1920, 30 fps, H.264 + AAC, 2:16). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg`. Frame 0 = the hook: "YOUR FACE OR YOUR TWIN'S? · HOW FACE ID REALLY KNOWS" with two glowing dot-faces and a "?".
**Hook:** "How does your phone know it's your face, and not your twin's?" (viral question, founder pick)
**Narrator:** Liam (ElevenLabs) · **Host:** Remi
**How to find Teyro:** said in the outro ("Search for it in your browser, or go straight to Teyro dot app") + on the outro card ("Search Teyro · teyro.app")
**QA:** see the table at the bottom

---

## Instagram

**Caption** (paste as-is)
```
How does your phone know it's your face, and not your twin's? 👯
Apple's own answer might surprise you 👇

1 · The dots: thousands of invisible infrared dots hit your face (works in total darkness)
2 · The depth map: where the dots land = a 3D shape, so a flat photo can't fool it
3 · The math: your face becomes numbers, locked in the Secure Enclave, never leaves the phone
4 · The match: close enough = unlocked; 5 misses = passcode
5 · The tricks: masks get caught, eyes must be open, it learns your new beard
6 · The twin: under 1 in 1,000,000 for a stranger… but Apple says higher for twins, siblings and kids under 13

Your phone doesn't see your face. It measures it.

Tag your twin (or the sibling who looks like you) 👀
Learn how AI like this works, like playing a game: search Teyro or go to teyro.app

Has anyone ever unlocked your phone with their face? 👇

#faceid #iphone #artificialintelligence #techexplained #teyro
```

**Pinned comment**
```
Twins, we need answers: can your twin unlock your phone? 👯 Drop a yes / no 👇
```

**Alt text**
```
Animated neon explainer: a face is covered in glowing infrared dots that turn into a 3D depth map, then a list of numbers stored in the Secure Enclave, then matched for an unlock; a photo and a mask are rejected, and two identical faces with a question mark show why twins are Face ID's weak spot.
```

---

## TikTok
**Caption**
```
Can your twin unlock your iPhone? How Face ID really works #faceid #iphone #techexplained #teyro
```
**Pinned comment**
```
Twins: can yours unlock your phone? Yes or no 👇
```

---

## Reply bank (first hour)
- **"What app is this?"** → It's Teyro: short coding and AI lessons that play like a game: XP, streaks, leagues, quests. Free to start: search Teyro or go to teyro.app.
- **"My twin CAN unlock my phone!"** → That's exactly what Apple warns about: the odds are higher for twins and lookalike siblings. Apple recommends using a passcode if that worries you.
- **"Is it 30,000 dots?"** → Apple's current support page just says "thousands of invisible dots", so that's what we said.
- **"Does Apple store my face?"** → Not as a photo. Apple says Face ID data is a mathematical representation, encrypted in the Secure Enclave, never leaves your device and isn't backed up to iCloud.
- **"What about Android?"** → Many Android phones use 2D camera face unlock, which is different; this video covers Apple's TrueDepth Face ID.

## Facts check
| Claim in video | Source (checked 2026-10-10) |
|---|---|
| Thousands of invisible (infrared) dots → depth map + IR image; works in total darkness | Apple Support, "About Face ID advanced technology" (updated 2026-09-18) |
| Face data = mathematical representation via the neural engine in the Secure Enclave; never leaves the device, not backed up to iCloud | Apple Support (same page) |
| Neural networks for matching + anti-spoofing; resists photos and masks | Apple Platform Security, "Facial matching security" + "Face ID and Touch ID security" |
| Attention-aware; adapts to makeup / facial hair | Apple Support |
| Passcode after 5 failed attempts, after a restart, or after 48 h | Apple Platform Security, "Face ID, Touch ID, passcodes and passwords" |
| Random person: less than 1 in 1,000,000 (one enrolled appearance); higher for twins, siblings, under-13s; Apple recommends a passcode if concerned | Apple Support |
| Face-as-numbers vector values | illustrative, labelled on screen |
| Teyro: AI track; few-minute lessons; XP; streak; weekly leagues Bronze → Diamond; 3 daily quests + chests; coins earned not bought + shop; Monthly Challenge; friends; free to start; teyro.app | teyro.app + teyro.app/features (2026-10-10) |

## QA (`pipeline/motion/qa.mjs`, 2026-10-10)
| Gate | Result |
|---|---|
| Length 2:00–2:58 | ✓ 2:16 |
| Visual events ≥ 1.5 / s | ✓ 1.66 / s (one every 0.60 s) |
| Longest still ≤ 2.5 s | ✓ 1.5 s |
| Near-still frames 55–80 % | ✓ 79 % |
| No hard cuts | ✓ none |
| Loudness −14 ±0.5 LUFS | ✓ −14.0 LUFS |
| LRA ≤ 3 LU | ✓ 1.4 LU |
| No silence ≥ 0.5 s | ✓ none |
