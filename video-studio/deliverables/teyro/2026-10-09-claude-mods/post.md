# Claude Code can now rewrite itself (mods): post kit

**Account:** Teyro
**Video file:** `claude-code-mods.mp4` (1080×1920, 30 fps, H.264 + AAC, 46.8 s). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg` (pick this frame as the Reel cover / TikTok cover)
**Hook type:** Curiosity + Transformation ("…someone's already running Doom inside it")
**CTA type:** Search Teyro ("Want to learn Claude Code, one lesson a day? Head to Teyro.")
**⚠️ News timing:** the video says "last week" (mods shipped ~Oct 1, 2026). Post it by mid-October.

---

## Instagram

**Caption**
```
You can now use Claude Code to rewrite Claude Code itself, and someone's already running Doom inside it.

How mods work:
1. Everything Claude Code does fires an event (your prompt, a tool call, even drawing the spinner)
2. A mod is a bit of TypeScript on those events: watch it, change it, or answer it
3. Anthropic's own: Blast Radius holds a risky rm -rf, Token Weather forecasts your context
4. Ask Claude to write one and it loads when the turn ends

⚠️ Mods aren't sandboxed. Only install them from people you trust.

Send this to the friend who lives in their terminal.
Want to learn Claude Code, one lesson a day? Head to Teyro (teyro.app).

What mod would you build first?

#claudecode #aitools #coding #developers #teyro
```

**Pinned comment**
```
What's the first mod you'd build? 👇 (Mine: a spinner that shows how much the session has cost so far)
```

**Alt text**
```
Animated host Ada explains Claude Code mods: TypeScript handlers on Claude Code's events that can watch, change or answer them, with examples like Anthropic's Blast Radius and Token Weather mods, a git-branch mod Claude writes itself, and a warning that mods aren't sandboxed.
```

---

## TikTok

**Caption** (≤ 150 characters)
```
Claude Code can now rewrite itself, and someone put Doom in it. How mods work #claudecode #ai #coding #developers #teyro
```

**Pinned comment**
```
What's the first mod you'd build?
```

---

## Reply bank (for the first hour of comments)
- **"How do I get mods?"** → They're on by default from Claude Code v2.1.287. Run `claude --version`, update if older, then try Anthropic's sample mods (claude-code-playground repo) or just ask Claude to "make a mod that…".
- **"Where's the Doom one?"** → It's "intermission" by Jarrod Watts: a multiplayer Doom match while Claude works.
- **"Are mods safe?"** → They run with your permissions and aren't sandboxed, so they can read your files and keys. Install only from authors you trust, and run `claude plugin validate` to see what a mod does before installing it.
- **"Mods vs hooks?"** → Settings hooks run a script from outside. Mods run inside Claude Code, so they can also draw UI (panes, the spinner, a band above the prompt).
- **"Where can I learn Claude Code?"** → Teyro's AI category has Claude Code courses: short daily lessons. teyro.app

## Facts check
| Claim in video | Source (checked 2026-10-09) |
|---|---|
| Mods shipped last week; on by default | [Mods overview docs](https://code.claude.com/docs/en/plugins/mods/overview): v2.1.287+; launch ~Oct 1, 2026 ([The New Stack](https://thenewstack.io/anthropic-claude-code-mods-plugins/)) |
| Change almost everything, from the spinner to your prompts | Docs: redraw the spinner/tool rows, rewrite a prompt or tool call, panes, commands |
| Runs on events: prompt, tool call, drawing the spinner | Docs: "a tool call, a submitted prompt, or a part of the interface being drawn" |
| Watch / change / answer, so the original never runs | Docs: "Observe · Rewrite · Answer: handle the event itself, so the usual behavior doesn't run" |
| JS/TypeScript | Docs: "JavaScript or TypeScript event handlers" |
| Blast Radius catches a risky delete, shows what it would wipe | Docs sample mod `blast-radius` (holds `rm -rf` / force push). "9 files" on screen is an **illustrative example** |
| Token Weather draws a forecast of your context | Docs sample mod `token-weather` ("draws a forecast of your context window above the prompt") |
| Ask Claude for a git-branch mod; loads when the turn ends | [Create a mod docs](https://code.claude.com/docs/en/plugins/mods/create): example prompt is the git branch; with hot reloading on, mods "load when the turn ends" |
| Not sandboxed; could read your API keys | Docs: "Mods aren't sandboxed"; can read "environment variables and settings files, including an API key" |
| Claude Code's diff view is a mod | Docs: built-in `cc-plugin-diff` takes over `/diff` |
| Someone's running Doom inside it | Jarrod Watts' "intermission" mod (secondary listings: skillsllm.com, inside.com.tw) |
| Teyro has Claude Code courses (CTA) | **Founder confirmation in chat, 2026-10-09.** Not yet on the live teyro.app pages; worth adding to /learn/ai |
| **Cut from the original script** | 5,000-line "Context Mod" (not a real Anthropic mod); "system prompt"; "Anthropic is rebuilding Claude Code out of mods / the core keeps shrinking" (not in the docs) |
