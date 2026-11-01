# AI agents, explained: Motion Explainer post kit

**Account:** Teyro
**Video file:** `ai-agents-explained.mp4` (1080×1920, 30 fps, H.264 + AAC, 2:50). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg`. This is the title card ("AI AGENTS · EXPLAINED") over the miniature agent blueprint. Pick it as the Reel cover.
**Hook archetype:** jargon wall → one idea
**Narrator:** Liam (ElevenLabs) · **Host:** Remi
**QA:** see the table at the bottom

---

## Instagram

**Caption** (paste as-is)
```
Agent. Tools. Memory. MCP. 🧠
It sounds like a lot. It's really just one loop 👇

1 · The brain: a model alone is text in, text out
2 · Tools: it writes a request, your code runs it
3 · The loop: think, act, observe, repeat
4 · Memory: the context window fills up, so it keeps notes
5 · MCP: one plug so any app can use any tool
6 · Guardrails: risky actions wait for a human yes
7 · The trap: no stop condition = a loop that keeps spending

No magic. Just a model, some tools, and a loop.

Send this to the friend who keeps saying "agentic" in meetings.
Learn coding and AI a few minutes a day on Teyro (link in bio).

What's the first task you'd hand to an agent? 👇

#aiagents #artificialintelligence #mcp #learntocode #teyro
```

**Pinned comment**
```
Save this before your next "we should build an agent" meeting. Quick one: what should an agent ALWAYS ask you before doing? 👇
```

**Alt text**
```
Animated blueprint explainer: an AI agent is built step by step around Kemi's request to book a flight — a model, tools, a think-act-observe loop, a context window with notes, an MCP plug, a human approval guardrail and a stop sign.
```

---

## TikTok
**Caption**
```
AI agents explained: it's really just a loop (tools, memory, MCP, guardrails) #aiagents #mcp #learntocode #teyro
```
**Pinned comment**
```
What should an agent always ask you before doing? 👇
```

---

## Reply bank (first hour)
- **"What app is this?"** → It's Teyro: short coding and AI lessons, a few minutes a day. Building AI agents is part of the AI track. The link is in our bio.
- **"Agents are more than a loop!"** → Fair, real ones add planning, retries, sub-agents and evals. But at the core Anthropic describes them as a model using tools based on feedback in a loop. That's the part to get first.
- **"Where's the 36% from?"** → It's simple maths, shown as an example: 0.95 × 0.95 × … twenty times ≈ 0.36. Real step accuracy varies, but small errors do compound.
- **"MCP isn't only Anthropic's anymore"** → Right, Anthropic released it as an open standard in Nov 2024 and it's an open protocol other apps use too.
- **"Does it work for beginners?"** → Yes. Teyro starts from zero and builds up in short daily lessons.

## Facts check
| Claim in video | Source (checked 2026-10-09) |
|---|---|
| Agents are "LLMs using tools based on environmental feedback in a loop" | Anthropic, "Building effective agents" (Dec 19, 2024) |
| Anthropic spent more time on its tools than on the prompt (SWE-bench agent) | same post, Appendix 2 (bars labelled "not to scale") |
| Stop conditions like a maximum number of iterations; check ground truth each step; errors compound | same post, "Agents" |
| Most applications don't need an agent; one optimised call is often enough | same post, "When (and when not) to use agents" |
| MCP released by Anthropic as an open standard, Nov 2024 | anthropic.com/news/model-context-protocol (Nov 25, 2024) |
| MCP servers offer tools, resources and prompts | MCP specification 2026-07-28, Overview |
| "Hosts must obtain explicit user consent before invoking any tool" | MCP specification 2026-07-28, Security and Trust & Safety |
| 95% per step over 20 steps ≈ 36% ("about a third") | computed (0.95^20 = 0.358), labelled "illustrative" |
| 12 custom connections vs 7 with MCP | computed example: 3 apps × 4 tools vs 3 + 4, labelled on screen |
| Kemi, flight results, "3 flights found", notes | example story, labelled "example" where data appears |
| Teyro: AI track includes "Build AI agents"; "a few minutes a day"; "the fun way to finish learning coding and AI" | teyro.app + teyro.app/features (2026-10-09) |

## QA (`pipeline/motion/qa.mjs`, 2026-10-09)
| Gate | Result |
|---|---|
| Length 2:00–2:58 | ✓ 2:51 |
| Visual events ≥ 1.5 / s | ✓ 3.19 / s (one every 0.31 s) |
| Longest still ≤ 2.5 s | ✓ 1.8 s |
| Near-still frames 55–80 % | ✓ 76 % |
| No hard cuts | ✓ none |
| Loudness −14 ±0.5 LUFS | ✓ −14.0 LUFS |
| LRA ≤ 3 LU | ✓ 1.4 LU |
| No silence ≥ 0.5 s | ✓ none |
