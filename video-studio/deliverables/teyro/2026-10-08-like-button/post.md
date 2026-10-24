# Don't trust that red heart: post kit

**Account:** Teyro
**Video file:** `like-button-optimistic-ui.mp4` (1080×1920, 30 fps, H.264 + AAC, ~48 s). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg` (the full warning hook + the phone with WARNING tape; pick it as the Reel/TikTok cover)
**Hook type:** Problem/Pain (warning) + Curiosity
**CTA type:** Link in bio
**Series:** "Behind the tap" #1. If it performs, C7 (passwords) and C8 (Sign in with Google) are ready in the idea bank.

**Built-in engagement (what each part is for):**
- **Comments:** the airplane-mode challenge with an on-screen A/B/C poll ("What did YOUR app do?"). Viewers have to try it before they can answer, and they'll name the app. Two easy reply types: a letter, and an app name.
- **Saves:** "the 3 speed limits" card (0.1 s / 1 s / 10 s) with the SAVE THIS tag. It's a reference every developer and designer wants to keep.
- **Shares:** the quotable line "Meta's own developer docs use the Like button as the example."
- **Rewatches:** the live millisecond clock and the request flying across the cable reward a second look.

---

## Instagram

**Caption**
```
Don't trust that red heart. It turns red before the server even knows you tapped it.

What happens in the first second after you tap Like:
1. 0 ms: the app paints the heart red. Nothing has been sent yet.
2. A tiny "like this post" message travels to the server while you keep scrolling.
3. If it fails (say you lose signal), the app quietly rolls it back, or tries again later.
4. Why? About 0.1 s feels instant. A trip to the server can take longer, so the app guesses you'll succeed.

It's called optimistic UI. Meta's own developer docs use the Like button as the example.

Save the 3 speed limits: 0.1 s feels instant · 1 s keeps your flow · 10 s and attention is gone.

Try it: airplane mode on, tap Like. Did the heart A) stay red, B) go grey again, or C) show an error? Comment the letter + the app 👇

Want to build apps that feel this fast? Link in bio.

#coding #webdevelopment #uxdesign #softwareengineering #teyro
```

**Pinned comment**
```
Airplane mode test: comment A (stayed red), B (went grey) or C (error) + which app. Let's see which apps "lie" the most 👀
```

**Alt text**
```
Animated explainer: Ada, a cartoon host, slows down a single tap on a Like button. A phone turns the heart red at 0 milliseconds, a "like this post" message travels to a server, and a failed request gets rolled back. It then shows the 0.1, 1 and 10 second response-time limits, a code example of optimistic UI, and an airplane-mode challenge.
```

---

## TikTok

**Caption** (131 characters)
```
Don't trust that red heart. Your app likes the post before the server knows. Airplane mode test: A, B or C? #coding #webdev #ux #teyro
```

**Pinned comment**
```
Airplane mode on, tap Like. A) stayed red B) went grey C) error. Which app did you test?
```

---

## Reply bank (first hour)
- **"A" / "B" / "C" + app name** → Thank them and explain what it means. A: the app queued your like to send later. B: it rolled back because the request failed. C: it chose to tell you. Ask which app next to keep the thread going.
- **"Is the app lying though?"** → It's a deliberate guess, not a lie: most taps succeed, so showing the result instantly feels better than a spinner. When the guess is wrong, a good app undoes it.
- **"Source?"** → Meta's Relay docs ("Optimistic updates", relay.dev), React's `useOptimistic` (react.dev), and Jakob Nielsen's "Response Times: The 3 Important Limits" (nngroup.com).
- **"Does every app do this?"** → Not every app and not for every action. It's used where failures are rare and easy to undo (likes, follows, reactions), not for things like payments.
- **"How do I build this?"** → In React it's literally one hook: `useOptimistic`. You learn the building blocks in Teyro's coding track (link in bio).
- **"What app is this?"** → Teyro: short daily coding and AI lessons where you write and fix real code with instant feedback. Link in bio.

## Facts check
| Claim in video | Source (checked 2026-10-08) |
|---|---|
| Apps show the like instantly, before the server responds; roll back if it fails | relay.dev/docs/guided-tour/updating-data/graphql-mutations/ ("Optimistic updates", Meta) |
| "Meta's own developer docs use the Like button as the example" | Same page: "if a user clicks the "Like" button…" (© Meta Platforms) |
| It's called optimistic UI; the code pattern | react.dev/reference/react/useOptimistic (`setOptimisticLike(true)`, auto rollback on failure) |
| 0.1 s feels instant · 1 s keeps flow · 10 s attention | Nielsen, "Response Times: The 3 Important Limits", nngroup.com |
| "or tries again later" | General pattern (offline queues); worded as "or", not a claim about a specific app |
| ms values on the clock (0 / 180 / 1,200 ms), "maya.codes", post 4812, like counts | Illustrative, labelled "SLOW MOTION · illustrative" on screen |
| Build apps / practise real code, link in bio | teyro.app |
