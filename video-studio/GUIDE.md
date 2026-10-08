# Making Teyro videos: team guide

How to make Instagram Reels and TikToks for the **Teyro** and **Teyro Teach** accounts with the `/make-videos` command.
No video-editing or coding skills needed: Claude does the work, you approve and post.

---

## 1. One-time setup (about 15 minutes)

You only do this once per computer.

### 1.1 Install the tools
| Tool | Why | How to check it's installed |
|---|---|---|
| **Git** | to get the project | `git --version` |
| **Node.js 20 or newer** ([nodejs.org](https://nodejs.org), pick "LTS") | runs the video studio | `node --version` → v20 or higher |
| **ffmpeg** (includes ffprobe) | audio/video processing | `ffmpeg -version` and `ffprobe -version` |
| **Claude Code** (desktop app or CLI) | runs `/make-videos` | open it and sign in |

**Installing ffmpeg:**
- **Windows:** `winget install Gyan.FFmpeg`, then close and reopen your terminal.
- **Mac:** `brew install ffmpeg`.
- Either way, check it worked with `ffmpeg -version`.

### 1.2 Get the project
```bash
git clone https://github.com/upskiill201/upskiill.git
cd upskiill
```
(Already have it? Just run `git pull` inside the `upskiill` folder.)

### 1.3 Install the video studio
```bash
cd video-studio
npm ci
```
This takes a few minutes the first time. It also downloads a small browser that Remotion uses to draw the videos.

### 1.4 Get your own ElevenLabs key (the voice)
1. Create a free account at [elevenlabs.io](https://elevenlabs.io).
2. Go to **Profile → API Keys → Create key**. Copy it somewhere safe (a password manager).
3. The free tier gives about **10,000 characters a month**, which is roughly **7–9 videos**. When it runs out, use a new key.

**Never put the key in a file, chat channel or the repo.** You paste it into Claude Code only when it asks, and it's used for that session and then forgotten.

---

## 2. Making a video (every time)

1. **Update the project.** In the `upskiill` folder:
   ```bash
   git pull
   ```
   The idea bank is shared, so this stops two people making the same video.
2. **Open Claude Code in the `upskiill` folder** and type:
   ```
   /make-videos
   ```
3. **Approve an idea.** Claude shows up to 3 ideas. For each: the account, the hook, the 4 points, sources and a score. Reply with the one you want, e.g. *"approve L3"*, or ask for changes or reject one. **Nothing is made until you approve.**
4. **Paste your ElevenLabs key** when Claude asks.
5. **Wait about 20–30 minutes.** Claude writes the script, makes the voice, builds the animation, checks it and renders it.
   - **Keep your computer awake.** If it sleeps, the render pauses.
6. **Download your video.** It arrives in the chat as three files:
   - `<name>.mp4`: the video (1080×1920, ready for Reels/TikTok)
   - `cover.jpg`: the cover image
   - `post.md`: everything to copy and paste when posting

   The same files are saved in `video-studio/deliverables/<account>/<date>-<name>/`.
7. Claude then asks if you want **another one**. It makes **one video at a time**: each needs its own approval.

**Other commands**
- `/make-videos L3`: show that specific idea for approval.
- `/make-videos ideas`: just research and add new video ideas to the bank.

The ideas live in `video-studio/ideas/IDEAS.md`. IDs: **A** = AI, **C** = Coding, **L** = Learning (Teyro account); **T** = Teaching and earning, **E** = Expert growth (Teyro Teach account).

---

## 3. Posting the video

Nothing is posted automatically. You upload it yourself.

### Instagram (Reels)
1. New post → **Reel** → pick the `.mp4`.
2. **Cover:** choose "Add from camera roll" and pick `cover.jpg`.
3. **Caption:** copy the *Instagram caption* block from `post.md` exactly. It already has exactly **5 hashtags** (Instagram's maximum).
4. **Advanced settings → Accessibility → Alt text:** paste the alt text from `post.md`.
5. Post. Then immediately comment the **pinned comment** from `post.md` and pin it.

### TikTok
1. Upload the `.mp4`; set the cover from the video frames (use the hook frame).
2. **Description:** paste the *TikTok caption* from `post.md`.
3. Post, then comment and pin the **pinned comment**.

### First hour after posting
- Reply to comments using the **reply bank** in `post.md`.
- The videos point people to the **link in bio** or **teyro.app**, so make sure your account's bio link goes to `https://teyro.app` (Teyro) or `https://teyro.app/teach` (Teyro Teach).

---

## 4. Sharing back with the team

After you make a video, Claude offers to save its source and the updated idea bank to a **branch + pull request**. Say yes: it marks the idea as *produced* for everyone, so nobody repeats it.
Never push to `main` directly. PRs only.

---

## 5. Troubleshooting

| Problem | Fix |
|---|---|
| `/make-videos` doesn't appear | Make sure Claude Code is opened in the `upskiill` folder and you've run `git pull`. Start a new session after pulling. |
| "No ElevenLabs key" / voice step fails with 401 | The key is wrong or expired. Create a new key and paste it again. |
| Voice step fails with "quota" / 402 | Your free characters ran out. Make a new key (or wait for the monthly reset). |
| `ffmpeg` / `ffprobe` not found | Install ffmpeg (section 1.1), then **close and reopen** Claude Code. |
| `remotion` not found | Run `npm ci` inside `video-studio/`. |
| Render seems stuck or times look strange | Your computer probably slept. Keep it awake and ask Claude to re-run the render. |
| "Teyro" sounds wrong in the voice | Tell Claude. It re-takes that line (it should sound like "Taro"). |
| You want to change something in the video | Just say what to change: text, timing, a visual, the hook. Claude edits and re-renders. |

---

## 6. The rules (short version)
- **Only approved ideas, one video at a time.**
- **Every video opens with a hook** in the first 3 seconds.
- **Facts come only from the live Teyro pages** (Teyro: teyro.app + /features; Teyro Teach: /teach + /teach/how-it-works), and every other number has a real source.
- **Sell outcomes, not features.** One spoken call to action per video. Never mention launch dates.
- **The ElevenLabs key is never saved anywhere.**

The full playbook (why the videos look and sound the way they do) is in [`docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md`](../docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md). The exact steps Claude follows are in [`.claude/skills/make-videos/SKILL.md`](../.claude/skills/make-videos/SKILL.md).
