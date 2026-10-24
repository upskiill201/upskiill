# What happens when you press Enter on ChatGPT: Motion Explainer post kit

**Account:** Teyro
**Sells:** the Teyro AI track (use AI tools, build AI agents, create automations), told by Remi in first person: "I learn all of it on Teyro" → few-minute lessons in 4 steps, practise straight away with instant feedback, XP, streak + freeze, weekly leagues Bronze → Diamond, daily quests + chests, friends + course community. Outcome: "Now I don't just use AI. I build with it."
**Video file:** `press-enter-chatgpt.mp4` (1080×1920, 30 fps, H.264 + AAC, 2:40). Download and upload it yourself; nothing is posted automatically.
**Cover:** `cover.jpg`. Frame 0 is the hook: "NOBODY IS TALKING ABOUT THIS · WHEN YOU PRESS ENTER" over a chat box holding "Why is the sky blue?".
**Hook:** "I don't understand why nobody is talking about this. When you press Enter on ChatGPT, it has no idea how its answer will end." (founder's line)
**Narrator:** Liam (ElevenLabs) · **Host:** Remi · **Music bed:** reused from M1-osi (neon). The Music API kept dropping the connection; to get a fresh bed later, run `music.mjs m9-chatgpt-enter --redo`.
**QA:** see the table at the bottom

---

## Instagram

**Caption** (paste as-is)
```
I don't understand why nobody is talking about this 🤯
When you press Enter on ChatGPT, it has no idea how its answer will end 👇

Here's what happens in those few seconds:
1 · Chopped: your message becomes tokens (~4 characters each)
2 · Numbers: every token becomes a number, then a list of numbers
3 · No memory: your whole chat gets sent back in, every time
4 · Attention: every token looks at every other token
5 · Layers: GPT-3 had 96 of them, and 175 billion numbers
6 · One token: it scores every possible next piece, picks one, runs again
7 · Streaming: you see each piece the moment it's made

The weird part: there's no answer in a database. It's predicting. That's why it can sound sure and still be wrong.

It's not looking up an answer. It's predicting the next token.

Send this to the friend who thinks ChatGPT "searches the internet" for every answer.
I learn AI like this on Teyro: a few minutes a day, with practice built into every lesson. Search Teyro in your browser, or go to teyro.app (link in bio).

Which step surprised you most? 👀👇

#ai #chatgpt #artificialintelligence #learnai #teyro
```

**Pinned comment**
```
Which step surprised you most: 3 (no memory), 6 (one token at a time) or the weird part? 👇
```

**Alt text**
```
Animated explainer in a neon world: the question "Why is the sky blue?" is typed into a chat box, chopped into tokens, turned into numbers, sent with the whole chat to the model, linked by attention arcs, passed through a stack of glowing layers, and answered one scored token at a time while the reply streams back. It ends with a tour of Teyro's AI track, lesson card, streak, league, quests and friends feed.
```

---

## TikTok
**Caption**
```
What really happens when you press Enter on ChatGPT 🤯 #ai #chatgpt #learnai #teyro
```
**Pinned comment**
```
Which step surprised you most? 👇
```

---

## Reply bank (first hour)
- **"What app is this?"** → It's Teyro: short coding and AI lessons, a few minutes a day, where you practise straight away. The AI track covers using AI tools, building AI agents and creating automations. It's free to start: search Teyro or go to teyro.app.
- **"ChatGPT does remember me"** → The ChatGPT app can save memories and keeps your chat history. But each request to the model itself is stateless: the app sends the context back in every time. OpenAI's API docs describe it that way.
- **"GPT-3 is old"** → Yes. We used it because its paper publishes the exact numbers (96 layers, 175B parameters, a 2,048-token window). Newer models don't publish theirs, but the loop is the same: tokens in, one token out at a time.
- **"It can search the web though"** → Some versions can call tools like web search, and the results get added as more tokens. The model still writes the answer one token at a time.
- **"Those token IDs aren't real"** → Right, they're labelled as examples. Real IDs depend on the tokenizer.

## Facts check
| Claim in video | Source (checked 2026-10-10) |
|---|---|
| A token ≈ 4 characters ≈ ¾ of a word (English, rough estimate) | OpenAI Help Center, "Understanding and counting tokens" |
| Each request to the model is stateless; the chat is sent back in each turn | OpenAI API docs, "Conversation state" |
| GPT-3: 2,048-token context window, 96 layers, 175 billion parameters | Brown et al. (2020), arXiv 2005.14165, abstract, Table 2.1, §2.1 |
| "Attention Is All You Need", 2017, 8 authors; the Transformer, based solely on attention; the T in GPT | Vaswani et al. (2017), arXiv 1706.03762 |
| Streaming sends output as it's generated (server-sent events) | OpenAI API docs, "Streaming API responses" |
| "plausible-sounding but incorrect or nonsensical answers" | OpenAI, "Introducing ChatGPT" (Nov 2022), Limitations |
| Reasoning models use hidden reasoning tokens you never see | OpenAI Help Center, "Understanding and counting tokens" |
| Token IDs, next-token scores (blue/clear/grey/green), meaning map | illustrative, labelled on screen |
| Teyro: AI track (use AI tools, build AI agents, create automations); few-minute lessons in 4 steps; practise straight away with instant feedback; streak + freeze; weekly leagues Bronze → Diamond; three daily quests, chests; follow friends; course community; free to start | teyro.app + teyro.app/features (2026-10-10) |
| Streak card, league tiers, quests, friends feed, "Built my first to-do app today!" | recreated from the live teyro.app demo visuals |

## QA (`pipeline/motion/qa.mjs`, 2026-10-10)
| Gate | Result |
|---|---|
| Length 2:00–2:58 | ✓ 2:40 |
| Visual events ≥ 1.5 / s | ✓ 1.96 / s (one every 0.51 s) |
| Longest still ≤ 2.5 s | ✓ 1.8 s |
| Near-still frames 55–80 % | ✓ 72 % |
| No hard cuts | ✓ none |
| Loudness −14 ±0.5 LUFS | ✓ −14.0 LUFS |
| LRA ≤ 3 LU | ✓ 1.4 LU |
| No silence ≥ 0.5 s | ✓ none |
| Teyro pronunciation (STT) | ✓ bridge "Taro", ty1 "Tarot", cta "Taro" (2 of 3 samples), cta2 "tarot.app" |
