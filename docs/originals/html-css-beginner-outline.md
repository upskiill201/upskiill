# HTML & CSS for Beginners — Course Outline

> Teyro Original, Coding. **Status: APPROVED (2026-10-19)** as proposed: Kofi leads, two pages (Kofi's site + the learner's own), Ama as user tester, "HTML & CSS for Beginners" / "Kofi Goes Live". Full-length course for complete beginners.
> Rules: docs/ORIGINALS_PLAYBOOK.md (§7 coding Originals, §8a storylines). Cast: docs/originals/CAST.md.

## Update (2026-10-20): three courses, 5 chapters each

Founder, 2026-10-20: courses should have 5 chapters, like Get Hired, Get Ahead. The track becomes **three courses (levels), 5 chapters × 20 lessons each** (track `format: 'focused'`, track title "HTML & CSS", track slug unchanged so Find my level keeps working). The 13 planned chapters become 15: publishing moves up to the end of Course 1 (so every learner finishes Course 1 with a live site), and the old Chapter 13 splits into accessibility, search and the launch. This supersedes the 13-chapter table below where they differ. Chapters 1–3 (written) are unchanged.

| Level | Course (slug) | Storyline | Chapters | Markers |
|---|---|---|---|---|
| 1 | **HTML & CSS for Beginners** (`html-css-for-beginners`) | Kofi Goes Live | Hello, web · Words on the page · Links, pictures and sound · Hello, CSS · Colour, type and go live | 12 → 8 weeks to uni |
| 2 | **Responsive Web Design with CSS** (`responsive-web-design-css`) | Kofi's Site Grows Up | Boxes everywhere · Classes and the cascade · Lining things up (Flexbox) · The beat grid (Grid) · Phones first | 7 → 3 weeks to uni |
| 3 | **Build and Launch a Website** (`build-and-launch-a-website`) | Kofi Goes Pro | Book me (forms) · Make it move · Everyone can use it (accessibility) · Found on search (metadata, sharing previews, fast images) · Launch night | 2 weeks to uni → Launch night |

**Course 1, Chapter 5 — Colour, type and go live (8 weeks to uni):** choosing colours and fonts (the old Chapter 5) in lessons 1–15, then publishing v1 for free in lessons 16–20 (the publishing part of the old Chapter 13). Climax: Kofi sends the organiser of Sound Up Saturdays a real link. The learner publishes their own page.

**Course 3, Chapter 5 — Launch night:** Mensah Beats v2.0, a full relaunch with layout, forms, motion, accessibility and search basics in place, plus the learner's finished personal site and a short "how I built it" write-up.

Each course has its own free stretch (Chapter 1, lessons 1–5), course details and cover. Course details for Courses 2 and 3 are added to `html-css.ts` when their Chapter 1 is written (same as Get Hired, Get Ahead). Covers: `backend/originals/covers/responsive-web-design-css.html` and `build-and-launch-a-website.html`.

## Why this course

HTML and CSS are how every web page is built: HTML says what's on the page, CSS says how it looks. They're the most common first step into coding (about 6 in 10 developers use them, Stack Overflow Developer Survey 2025), and the most rewarding one: **from the first lesson, you see something real that you made.**

That's the course's engine. **Every lesson changes a real web page you can see**, on the same screen, the moment you type. No waiting for "the fun part".

| | |
|---|---|
| **Course title** | **HTML & CSS for Beginners** (the exact words people search) |
| **Storyline** | **Kofi Goes Live** |
| Tagline | *From a blank page to your own website on the internet, one lesson at a time.* |
| Course-page hook | "Build your first website, right on your phone. Ten-minute lessons, a streak to keep, and a live page that changes the moment you type. By the end, it's on the internet with your name on it." |

## Where it starts: the origin of the web

Lesson 1 starts at the beginning. Every fact is checked; sources go in each lesson's author notes.

- **1989:** Tim Berners-Lee, a British scientist at **CERN** (the physics lab near Geneva), proposes a way for researchers to share documents linked to each other. It becomes the **World Wide Web**, with **HTML** as the language its pages are written in.
- **6 August 1991:** the first website goes public, at **info.cern.ch**, running on Berners-Lee's NeXT computer. It explained what the web was. (It's been restored and is still online.)
- **10 October 1994:** **Håkon Wium Lie**, also working at CERN with Berners-Lee, proposes **Cascading Style Sheets (CSS)**, a separate language for how pages look. Bert Bos joins him to write it.
- **17 December 1996:** CSS level 1 becomes an official W3C standard.
- **Today:** HTML and CSS are "living standards" that keep growing, and every browser on every phone reads them.

## The story

**Kofi** (shared cast, Accra, Ghana) is the lead of Study Smarter with AI, which ended on results day with a university offer. This course is **the summer after**: twelve weeks before he starts university. Lives only move forward.

Kofi makes beats on his phone under the name **Mensah Beats**. His friends love them, but they're scattered across WhatsApp voice notes. A small Accra event, **Sound Up Saturdays**, has asked him to play a set, and the organiser says: *"Send me your website."* He doesn't have one.

So Kofi decides to **build his own website**: his story, his beats you can actually play, his gig dates, and a way to book him. And it has to look amazing on a phone, because that's where all his fans are.

- **Miracle** *(shared cast)*, his mentor from Study Smarter, now works at Afiya, a health-tech startup in Lagos. She checks in on video calls: patient, direct, and allergic to "it works on my phone" as an excuse.
- **Clinton** and **David** *(shared cast)*, his friends from Miracle's study group in Buea, are his first fans and his harshest critics.
- **Efua** *(course-only, from Study Smarter)*, his classmate, has impeccable taste and no patience for ugly websites. Her honest reviews are the course's running joke.
- **Ama** *(new, course-only)*, Kofi's 10-year-old sister, is his "user tester": if Ama can't find the play button, nobody can.

**Map markers count down to university:** "12 weeks to uni" in Chapter 1, down to **Launch night**, when his site goes live on the internet before he leaves.

The Intermediate level continues at university: Kofi makes his site interactive with JavaScript.

## What makes it engaging (designed in, not added later)

1. **A live page in every lesson.** Type on the left, watch the page change on the right (stacked on phones). The first code in lesson 1 puts Kofi's name on a real page.
2. **The site visibly grows.** Each chapter ends with a "Site so far" moment: the page at the start of the chapter next to the page now. Learners see their progress, not just read about it.
3. **You build your own page too.** Alongside Kofi's site, every chapter's challenge adds to **the learner's own page**: their name, their colours, the things they love. By the last chapter they have a personal website, which they publish and share (share card and link).
4. **Things that play, move and click.** Real sounds (short beat loops Teyro makes itself) with the HTML audio element, buttons that react, cards that flip, a gig countdown that animates. Pages that feel alive.
5. **Design challenges, not just code.** "Make it look like this": the learner gets a picture of a target design and matches it, and the checker tells them how close they are. "Fix the broken page" detective rounds. Efua's brutal reviews to fix.
6. **Phones first.** Kofi's fans are on phones, so the course teaches mobile design from the start, and the learner checks every page at phone size and desktop size with one tap.

## The course at a glance

| | |
|---|---|
| Who it's for | Complete beginners: never coded, or tried once and got lost. Any phone or computer. |
| End outcome | Build and publish a good-looking, mobile-friendly personal website with HTML and CSS, and read and fix other people's simple pages. |
| Chapters | 13 |
| Lessons | 260 (20 per chapter: 16 teaching + 3 Checkpoints + 1 Chapter Challenge) |
| Lesson length | 10–15 minutes, about 10 exercises |
| Free | Chapter 1, lessons 1–5 |
| Language | Modern HTML and CSS. Previewed live in the browser, nothing to install. Publishing a site for free is taught in Chapter 13. |
| Code typing | Phone-friendly: typed code stays short; longer code uses Tap to build, Fill in the blanks and Put in order (playbook §7). |

## Chapters

| # | Chapter (map banner) | Marker | The learner can... |
|---|---|---|---|
| 1 | Hello, web | 12 weeks to uni | Explain how a web page works and where HTML came from, and make their first page |
| 2 | Words on the page | 11 weeks | Structure text with headings, paragraphs, lists and emphasis |
| 3 | Links, pictures and sound | 10 weeks | Add links, images (with alt text) and playable audio |
| 4 | Hello, CSS | 9 weeks | Explain where CSS came from and style a page with selectors, colours and fonts |
| 5 | Colour and type | 8 weeks | Choose colours and fonts that look good and are easy to read |
| 6 | Boxes everywhere | 7 weeks | Control space with the box model: margin, padding, border, width |
| 7 | Classes and the cascade | 6 weeks | Reuse styles with classes, and understand which style wins |
| 8 | Lining things up | 5 weeks | Lay out a page with Flexbox |
| 9 | The beat grid | 4 weeks | Build card layouts with CSS Grid |
| 10 | Phones first | 3 weeks | Make pages that work on every screen with responsive design |
| 11 | Book me | 2 weeks | Build forms people can actually fill in |
| 12 | Make it move | 1 week | Add hover effects, transitions and animations, kindly (reduced motion, contrast) |
| 13 | Launch night | Launch night | Structure, accessibility and search basics, then publish a site on the internet for free |

---

## Chapter 1 — Hello, web (written first; includes the free lessons)

**Story:** the message from Sound Up Saturdays: "Send me your website." Kofi's beats are scattered across voice notes, and he has no website. Miracle, on a video call from Lagos: "You don't need an app or a designer. You need one file. I'll show you."

**Chapter climax (lesson 20):** Mensah Beats v0.1, his first real page (a heading, a few lines about him, his next gig), shown to Efua, who says something almost nice.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | "Send me your website" | What a website is; Kofi's problem; the first page, live in lesson 1 | Story (choice) |
| 2 | The web was born at CERN | Berners-Lee, 1989, the first website (1991), why it was free for everyone | Reading |
| 3 | What happens when you open a page | Browser, address, the file it gets back, HTML turned into what you see | Step-by-step |
| 4 | Your first tag | `<h1>Mensah Beats</h1>`: opening tag, content, closing tag | Before / After |
| 5 | **Checkpoint 1: the voice note** | | Mixed review |
| 6 | Paragraphs | `<p>`, why pressing Enter in HTML doesn't make a new line | Tap to explore |
| 7 | Headings, big to small | `<h1>` to `<h6>`, one `<h1>` per page, headings as an outline | Chat with Tey |
| 8 | Tags inside tags | Nesting, and closing them in the right order | Step-by-step |
| 9 | The broken page | Missing closing tags, typos in tag names, what browsers do with mistakes | Story |
| 10 | **Checkpoint 2: Clinton's review** | | Mixed review |
| 11 | The shape of every page | `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<title>` (the name on the tab) | Tap to explore |
| 12 | Comments | `<!-- notes -->` for yourself and for Miracle | Card deck |
| 13 | Elements and attributes | `lang="en"`, attributes as extra information on a tag | Before / After |
| 14 | View source | Every page's HTML is readable; reading other people's pages to learn | Chat with Tey |
| 15 | **Checkpoint 3: Ama tests it** | | Mixed review |
| 16 | Plan your page | Sketch first, then the HTML outline; plan in comments | Step-by-step |
| 17 | Learning to code with AI, honestly | Ask AI to explain, not to build your site for you | Story (choice) |
| 18 | Your own page begins | The learner starts their personal page: their name and one line about them | Before / After |
| 19 | The most common beginner mistakes | Forgotten closing tags, wrong nesting, curly quotes, file names with spaces | Myth or Fact |
| 20 | **Chapter Challenge: Mensah Beats v0.1** | Build Kofi's first real page from a plan | Mixed (climax) |

Every lesson has at least one **live page** to edit (Try it live) or a **Build it** exercise (Write and run for pages) (playbook §7).

---

## Chapter 2 — Words on the page (written 2026-10-20)

**Story:** Efua reads Mensah Beats v0.1 and says one sentence: "It's a wall of text." Nobody reads to the end. Kofi learns that people scan web pages, and that lists, emphasis and structure are how you get read.

**Chapter climax (lesson 20):** Mensah Beats v0.2: his story, a numbered track list, a gig list, real quotes from fans and a "more about me" that opens on tap. Ama reads it to the end, out loud, without being asked.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | "It's a wall of text" | People scan pages; short paragraphs and headings get read | Story (choice) |
| 2 | Strong and em | Importance (`strong`) vs stress (`em`) | Before / After |
| 3 | Bullet lists | `ul` and `li` | Step-by-step |
| 4 | Numbered lists | `ol`, when order matters, `start` | Tap to explore |
| 5 | **Checkpoint 1: Clinton's track list** | | Mixed review |
| 6 | Line breaks | `br` for lines that belong together (addresses, lyrics); empty elements | Chat with Tey |
| 7 | Writing for the web | Front-loading, short sentences, how people read online (Nielsen) | Reading |
| 8 | Special characters | `&amp;`, `&lt;`, `&copy;`: showing symbols the browser would read as code | Card deck |
| 9 | Lists inside lists | Nesting a list inside an `li` | Before / After |
| 10 | **Checkpoint 2: Miracle's call** | | Mixed review |
| 11 | Real quotes only | `blockquote` and `cite`; Kofi is tempted to invent a famous DJ's quote | Story (choice) |
| 12 | Breaks between topics | `hr` as a change of topic, not decoration | Tap to explore |
| 13 | Small print and highlights | `small` and `mark` | Chat with Tey |
| 14 | Gig details | Description lists: `dl`, `dt`, `dd` | Step-by-step |
| 15 | **Checkpoint 3: Ama reads it aloud** | | Mixed review |
| 16 | Bold isn't a heading | Meaning vs looks: `b`/`i` vs `strong`/`em`, headings aren't for size | Myth or Fact |
| 17 | Less is more | Editing down; `details` and `summary` for "read more" | Story (choice) |
| 18 | Your page gets words | The learner's page: a list of things they love, with emphasis | Step-by-step |
| 19 | Read a finished page | Reading a full text page and naming every element | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v0.2** | Story, track list, gigs, quotes, read more | Mixed (climax) |

---

## Chapter 3 — Links, pictures and sound (written 2026-10-20)

**Story:** the organiser opens Mensah Beats on her phone and asks two questions: "Where's your Instagram?" and "Can I hear anything?" The page has words, but nothing to click, see or play. Kofi adds links, his album art (with alt text Ama approves) and, finally, beats you can press play on.

**Chapter climax (lesson 20):** Mensah Beats v0.3. The organiser presses play on Jollof Bounce, and replies with one word: "Booked."

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | "Where do I click?" | Links: `a` and `href`; Kofi's Instagram | Story (choice) |
| 2 | Links people can read | Link text that says where it goes, never "click here" | Before / After |
| 3 | Other pages, other sites | Full web addresses vs links to your own pages (`gigs.html`) | Step-by-step |
| 4 | Email, call, new tab | `mailto:`, `tel:`, and `target="_blank"` used sparingly | Tap to explore |
| 5 | **Checkpoint 1: Clinton's link test** | | Mixed review |
| 6 | Pictures | `img`, `src` and `alt`; another empty element | Chat with Tey |
| 7 | What would Ama hear? | Good alt text; `alt=""` for decoration (WebAIM) | Reading |
| 8 | Why is the picture broken? | File paths and folders: `images/cover-1.png`, spelling, capitals | Card deck |
| 9 | Pictures that don't jump | `width` and `height` so the page doesn't shift as it loads | Before / After |
| 10 | **Checkpoint 2: Ama's picture test** | | Mixed review |
| 11 | Whose photo is it? | Copyright: using your own or free-to-use pictures, and crediting | Story (choice) |
| 12 | Press play | `audio`, `controls`, `src`: the first playable beat | Tap to explore |
| 13 | Sound, kindly | No autoplay, `loop`, fallback text | Chat with Tey |
| 14 | Covers with captions | `figure` and `figcaption`; a cover that links | Step-by-step |
| 15 | **Checkpoint 3: the organiser presses play** | | Mixed review |
| 16 | Links and media myths | Common wrong beliefs about links, pictures and sound | Myth or Fact |
| 17 | Jump to the gigs | `id` and `#` links inside a long page | Story (choice) |
| 18 | Your page gets links | The learner's page: links to things they love, jump links, a picture | Step-by-step |
| 19 | Read a finished page | A full page with links, pictures and sound, element by element | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v0.3** | Links, album art, playable beats, jump links | Mixed (climax) |

Assets (Teyro-made): `beat-1..3.mp3` and `cover-1..3.png` at the asset root, the same files in `images/` and `music/` for the file-path lessons, and `images/kofi.png` (an illustration, not a photo of a real person).

---

## Chapter 4 — Hello, CSS (written 2026-10-20)

**Story:** nine weeks to uni. Efua: "It works. It also looks like 1996." Kofi meets CSS: rules, where styles live, the CERN origin (Lie, 1994; CSS1, 1996), colours, selectors, text, the cascade, fonts with fallbacks, and debugging a missing brace. **Choice (l01):** learn CSS, h1 everywhere, or a screenshot. **Choice (l11):** every colour at once (outline choice). **Choice (l17):** half the styles vanished. **Climax (l20):** Mensah Beats v0.4; Efua: "I'd share this."

All lessons use the style tag in the live pad (one document); style.css arrives with publishing in Chapter 5. Style checks target the element the style is set on (jsdom).

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | "It looks like 1996" | Explain what CSS does that HTML doesn't | Story (choice) |
| 2 | Two jobs, two languages | Explain why looks belong in CSS, not HTML | Before / After |
| 3 | How a rule works | Write a CSS rule from its five parts | Step-by-step |
| 4 | Style the whole page | Style the whole page with body | Tap to explore |
| 5 | **Checkpoint: Efua's second look** | | Mixed review |
| 6 | Where CSS lives | Name the three places CSS can live | Chat with Tey |
| 7 | CSS was born at CERN too | Explain where CSS came from and why | Reading |
| 8 | Colour words | Use named colours in CSS | Card deck |
| 9 | Picking what to style | Group selectors with a comma | Before / After |
| 10 | **Checkpoint: Clinton's colour test** | | Mixed review |
| 11 | Every colour at once | Recognise when colour is helping and when it's hurting | Story (choice) |
| 12 | Shaping the words | Change text size, weight and alignment | Tap to explore |
| 13 | Which rule wins? | Predict which of two rules wins | Chat with Tey |
| 14 | Choosing a font | Set a font with font-family | Step-by-step |
| 15 | **Checkpoint: Ama's reading test** | | Mixed review |
| 16 | CSS myths | Spot common beginner myths about CSS | Myth or Fact |
| 17 | Half the styles vanished | Find a missing brace that breaks later rules | Story (choice) |
| 18 | Your page gets style | Style your own page with a body rule, headings and links | Step-by-step |
| 19 | Read a finished stylesheet | Read a whole stylesheet and say what each rule does | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v0.4** | | Mixed (climax) |

---

## Chapter 5 — Colour, type and go live (written 2026-10-20)

**Story:** eight weeks to uni. The Sound Up Saturdays poster prints Friday with every act's web address, and Kofi's page is still a file on his phone. Exact hex colours from his own covers, a palette with jobs, contrast (WCAG 1.4.3: 4.5:1, 3:1 large; ratios computed for his palette), rem sizes and a four-step type scale, one plain font plus one special font, then publishing: one folder, index.html, style.css via link, a privacy pass (booking email via mailto, no phone number or street), a free static host ("check current terms"), and the phone test. **Choice (l01):** colours from his art, cool names, or a famous DJ's. **Choice (l11):** fancy font only for the name. **Choice (l17):** what the contact section says. **Climax (l20):** Mensah Beats v1.0 is live; his link is on the poster. Course 1 complete.

Publishing itself happens outside the app (Deepen in l18 and l20); in-app exercises check the files and head that go live.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | The poster goes to print Friday | Explain why a page needs to be published to be shared | Story (choice) |
| 2 | Names vs codes | Write colours as hex codes | Before / After |
| 3 | A palette with jobs | Build a four-colour palette from your own art | Step-by-step |
| 4 | Inside a colour code | Read a hex code as red, green and blue | Tap to explore |
| 5 | **Checkpoint: side by side** | | Mixed review |
| 6 | Can everyone read it? | Explain what colour contrast is | Chat with Tey |
| 7 | Designing for every pair of eyes | Explain what WCAG is | Reading |
| 8 | Sizes that respect readers | Explain the difference between px and rem | Card deck |
| 9 | Seven sizes vs four | Spot a messy set of text sizes | Before / After |
| 10 | **Checkpoint: Grandma approves** | | Mixed review |
| 11 | The curly font problem | Set a font with font-family | Story (choice) |
| 12 | The whole look in one place | Read a complete style block | Tap to explore |
| 13 | What does "going live" mean? | Explain what a web host does | Chat with Tey |
| 14 | Pack the folder | Put a site's files in one folder | Step-by-step |
| 15 | **Checkpoint: the folder is packed** | | Mixed review |
| 16 | Publishing: myth or fact? | Separate publishing myths from facts | Myth or Fact |
| 17 | Before the whole world sees it | Spot personal details that shouldn't be published | Story (choice) |
| 18 | Upload, open, share | Publish a folder on a free static host | Step-by-step |
| 19 | The page that went live | Read a complete, published page | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.0** | | Mixed (climax) |

## Course 2, Chapter 1 — Boxes everywhere (written 2026-10-20)

**Course:** Responsive Web Design with CSS ("Kofi's Site Grows Up"), level 2, slug `responsive-web-design-css`; lessons live in `backend/originals/tracks/html-css/responsive/`. Course details and cover wired in `html-css.ts` (upcomingUnits 4).

**Story:** seven weeks to uni. The poster worked and the organiser wants Kofi monthly; Efua sketches a card per beat, and Miracle teaches the box model on video calls. Padding, the four layers, shorthand (clockwise), default margins and stacking, width vs max-width, the 1990s box model fight and box-sizing, `* { box-sizing: border-box; }`, calm borders and border-radius, block/inline/inline-block, finding gaps with outline and Inspect, myths, tap targets (about 44px; WCAG 2.5.8 24px minimum), and a centred column (`max-width` + `margin: 0 auto`). **Choice (l01):** learn boxes, type spaces, or tiny text. **Choice (l11):** the neon border phase. **Choice (l17):** Ama's thumb keeps missing. **Climax (l20):** Mensah Beats v1.1, beat cards with room to breathe.

Cards are `article` elements with element and descendant selectors only: classes arrive in Chapter 2. Images use the course's own cover-1/2/3.png.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | Everything is a box | Explain that every element on a page is a box | Story (choice) |
| 2 | Room inside the box | Add padding to a box | Before / After |
| 3 | Four layers of every box | Name the four layers of the box model | Step-by-step |
| 4 | One number, two or four | Read padding and margin with one, two or four values | Tap to explore |
| 5 | **Checkpoint: the first real card** | | Mixed review |
| 6 | Space you didn't ask for | Explain that browsers add default margins | Chat with Tey |
| 7 | When browsers disagreed about boxes | Set a box's width | Reading |
| 8 | Too wide for Ama's phone | Explain why fixed widths break on small screens | Card deck |
| 9 | The card that won't fit | Spot a box made wider by its padding and border | Before / After |
| 10 | **Checkpoint: Ama stops scrolling** | | Mixed review |
| 11 | The neon border phase | Set border width, style and colour | Story (choice) |
| 12 | Anatomy of a beat card | Read a complete card stylesheet | Tap to explore |
| 13 | Why won't my link get bigger? | Tell block and inline boxes apart | Chat with Tey |
| 14 | Find the invisible box | Show every box's edge with a temporary outline | Step-by-step |
| 15 | **Checkpoint: Efua's one word** | | Mixed review |
| 16 | Boxes: myth or fact? | Separate box model myths from facts | Myth or Fact |
| 17 | Ama's thumb keeps missing | Explain why small, crowded links are hard to tap | Story (choice) |
| 18 | A column down the middle | Wrap a page's content in main | Step-by-step |
| 19 | The whole layout, box by box | Read a complete box-model stylesheet | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.1** | | Mixed (climax) |

## Chapters 4–13 (stories; lesson lists are written chapter by chapter)

**2 · Words on the page (11 weeks).** Kofi writes his story, track list and gig list. Headings, paragraphs, `<strong>` and `<em>`, ordered and unordered lists, line breaks. *Climax:* a page people actually read to the end. *Efua:* "It's a wall of text."

**3 · Links, pictures and sound (10 weeks).** Links to his socials, a photo with alt text ("what would Ama hear if she couldn't see it?"), and his first playable beat with `<audio>`. File paths, and why the picture is broken. *Climax:* visitors can press play.

**4 · Hello, CSS (9 weeks).** Where CSS came from (Lie, 1994), the `<style>` tag, selectors, properties, colour, font. *Climax:* the page stops looking like 1996. *Choice:* Kofi wants every colour at once.

**5 · Colour and type (8 weeks).** Colour codes, picking a palette from his album art, readable contrast, font pairs, sizes in `rem`. *Climax:* a page that looks like a brand.

**6 · Boxes everywhere (7 weeks).** Everything is a box: margin, padding, border, width, `box-sizing`. *Climax:* the "beat cards" finally have room to breathe.

**7 · Classes and the cascade (6 weeks).** `class` and `id`, reusing styles, which rule wins and why (the cascade and specificity). *Climax:* restyle every card by changing one line.

**8 · Lining things up (5 weeks).** Flexbox: rows, columns, centring (finally), gaps, the navigation bar. *Climax:* a header that looks professional.

**9 · The beat grid (4 weeks).** CSS Grid for the track gallery and gig calendar. *Climax:* a gallery of beats that rearranges itself neatly.

**10 · Phones first (3 weeks).** The viewport, flexible widths, media queries, images that shrink. Ama tests on her old phone. *Climax:* the site works on every screen in the house.

**11 · Book me (2 weeks).** Forms: inputs, labels, buttons, choices, required fields, and why labels matter for everyone. *Climax:* a booking form the Sound Up Saturdays organiser fills in. (The form doesn't send anything in this level; sending it needs a server, which comes later.)

**12 · Make it move (1 week).** Hover, transitions, keyframe animations, the gig countdown, and respecting people who turn motion off. *Climax:* a site that feels alive, without making anyone dizzy.

**13 · Launch night (Launch night).** Semantic structure (`<header>`, `<main>`, `<footer>`), accessibility checks, a good title and description for search, then **publishing the site on the internet for free**. *Final Challenge:* Mensah Beats goes live before Sound Up Saturdays. *Project (outside the app):* publish your own page and share the link.

---

## What has to be built first: a live page runner

The code runner runs Python and TypeScript. HTML and CSS need something different: **a live preview**, not program output. Same rules (playbook §7: nothing runs on Teyro's servers):

1. **Live preview.** A sandboxed frame that shows the learner's page as they type, with **scripts switched off**, so a page can never do anything harmful. Phone and desktop size switch.
2. **Checks that look at the page, not the wording of the code**, so different correct answers pass: "there's an `h1` saying Mensah Beats", "every image has alt text", "the heading is coloured", "the cards sit side by side", "the page has exactly one `h1`".
3. **Try it live / Build it / Playground** reuse the existing components with an HTML/CSS mode.
4. **`npm run originals`** renders every solution the same way and refuses to load a lesson whose own solution fails its checks.
5. **Sounds and pictures** for Kofi's site: short beat loops and images Teyro makes itself (no copyrighted music), served with the course.

Built and tested before Chapter 1 is written, the same order as Python and TypeScript.

## Decisions for the founder

1. **Lead:** Kofi (proposed): the summer before university, building a website for his beats. It's visual, young, global, and a natural next step after Study Smarter. Alternative: **Lucía** building a landing page for her marketing team (more professional, less playful).
2. **Two pages:** Kofi's site plus **the learner's own page**, published and shared at the end (proposed). Alternative: Kofi's site only.
3. **New character:** Ama, Kofi's 10-year-old sister, as the "user tester".
4. **Title:** "HTML & CSS for Beginners" + storyline "Kofi Goes Live".
5. **Order:** build the live page runner first, then write Chapter 1 (20 lessons), then the course page and cover. Nothing is pushed to staging until you say so.
