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

## Course 2, Chapter 2 — Classes and the cascade (written 2026-10-20)

**Story:** six weeks to uni. Three beats go on the poster and only their cards should turn pink; `article` changes all six. Classes and the `.` selector, one class instead of pasted `style=""`, naming rules, two classes on one element (`.a.b`), class vs id (`#`), the full cascade (importance, origin, specificity, order; inheritance outside the contest), counting specificity as ids-classes-elements, the specificity war and `!important`, honest role-based names, a `.card` base with `.gig-card`/`.featured` extras and a `span.tag`, what inherits (`color: inherit`), safe refactoring, myths (classes are case-sensitive in standards mode). **Choice (l01):** a class, pasted styles, or swapping elements. **Choice (l11):** names that lie. **Choice (l17):** a pasted snippet full of `!important`. **Climax (l20):** Mensah Beats v1.2; the organiser asks for gold and every card changes with one line.

Small text never goes on pink (night on pink ≈ 4.47:1): tags are night on gold `#FFC83D` (about 10:1). Lessons that depend on case-sensitivity start with `<!DOCTYPE html>`, because learner code renders without one (quirks mode matches class names case-insensitively).

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | Only three of them | Add a class to an element | Story (choice) |
| 2 | Copy-paste vs one class | Spot styles repeated in style attributes | Before / After |
| 3 | Your first real class | Write a class name that follows the rules | Step-by-step |
| 4 | Two labels on one card | Give an element more than one class | Tap to explore |
| 5 | **Checkpoint: the poster three** | | Mixed review |
| 6 | Class or id? | Explain how an id differs from a class | Chat with Tey |
| 7 | How the browser picks a winner | Describe the questions the cascade asks, in order | Reading |
| 8 | Counting specificity | Count a selector's ids, classes and elements | Card deck |
| 9 | The specificity war | Recognise a stylesheet stuck in a specificity war | Before / After |
| 10 | **Checkpoint: no more guessing** | | Mixed review |
| 11 | When the names lie | Name classes for their role, not their looks | Story (choice) |
| 12 | One base, many cards | Put shared styles in a base class | Tap to explore |
| 13 | What gets passed down | Name properties that inherit and ones that don't | Chat with Tey |
| 14 | Switch the site to classes | Move styles from element selectors to classes, one at a time | Step-by-step |
| 15 | **Checkpoint: beats and gigs** | | Mixed review |
| 16 | Classes: myth or fact? | Separate class and cascade myths from facts | Myth or Fact |
| 17 | The snippet that took over | Recognise CSS that overrides everything with !important and broad selectors | Story (choice) |
| 18 | Your page gets classes | Plan base and extra classes for your own page | Step-by-step |
| 19 | A stylesheet you can change | Read a class-based stylesheet | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.2** | | Mixed (climax) |

## Course 2, Chapter 3 — Lining things up (written 2026-10-20)

**Story:** five weeks to uni. Laptop visitors see a tall stack at the top of the page; Efua wants name left, links right. Flexbox from scratch: `display: flex` on the parent, nav links as a `ul` with `gap` and no bullets, direct children only (nesting containers), `justify-content`, `align-items` and centring both ways, the history (layout tables, floats, Flexbox drafted 2009 and broadly supported by the mid-2010s, Grid in browsers 2017), `flex-direction: column` and the axes swapping, `flex-wrap`, `flex-grow`, the `flex: 1 1 220px` self-arranging card row, `margin-left: auto`, `align-self`, and why `order` is risky for keyboard and screen reader users. **Choice (l01):** Flexbox, a layout table, or `&nbsp;`. **Choice (l11):** three uneven boxes. **Choice (l17):** the header that ran off Ama's phone. **Climax (l20):** Mensah Beats v1.3, read out on Accra radio, with a professional header on every screen.

`div` is still untaught, so wrappers are `section`, `p` or `header`. `text-decoration` isn't taught either, so the logo keeps its underline.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | A header like a real site | Explain why boxes stack by default | Story (choice) |
| 2 | A list that lies down | Turn a list of links into a row with display: flex | Before / After |
| 3 | Parents and children | Find the direct children of a flex container | Step-by-step |
| 4 | Spreading along the row | Use justify-content to place items along a row | Tap to explore |
| 5 | **Checkpoint: one neat row** | | Mixed review |
| 6 | Centring, finally | Line items up across the row with align-items | Chat with Tey |
| 7 | Before Flexbox | Describe how layouts were built before Flexbox | Reading |
| 8 | Rows and columns | Stack items with flex-direction: column | Card deck |
| 9 | Squashed vs wrapped | Explain why flex items squash by default | Before / After |
| 10 | **Checkpoint: no more spaghetti** | | Mixed review |
| 11 | Three uneven boxes | Explain how flex items size themselves by default | Story (choice) |
| 12 | Cards that pick their own row | Set an item's starting size with flex-basis | Tap to explore |
| 13 | Moving just one item | Push one item away with margin-left: auto | Chat with Tey |
| 14 | Build the nav bar | Build a header with a name and a navigation list | Step-by-step |
| 15 | **Checkpoint: the bar is up** | | Mixed review |
| 16 | Flexbox: myth or fact? | Separate Flexbox myths from facts | Myth or Fact |
| 17 | The header that ran off the screen | Spot a flex row that's too wide for a phone | Story (choice) |
| 18 | Your page lines up | Build a header bar for your own page | Step-by-step |
| 19 | The whole layout in Flexbox | Read a complete Flexbox layout | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.3** | | Mixed (climax) |

## Course 2, Chapter 4 — The beat grid (written 2026-10-20)

**Story:** four weeks to uni. Twelve covers; a wrapping flex row stretches its last row, and Efua wants a record shop wall. CSS Grid: `display: grid`, `grid-template-columns`, `fr` and `repeat()`, gaps, automatic rows with `grid-auto-rows` and `minmax()`, the history (Microsoft's 2011 proposal, IE10 in 2012, every major browser in 2017), `span` for a feature cover, `repeat(auto-fill, minmax(150px, 1fr))`, auto-fill vs auto-fit, a real `table` for the gig list (`tr`, `th`, `td`, `caption`), `grid-template-areas`, and line numbers vs reading order. **Choice (l01):** Grid, fixed-width flex, or a table. **Choice (l11):** the gig list is data. **Choice (l17):** newest beat last in the HTML. **Climax (l20):** Mensah Beats v1.4 on a record shop screen in Osu.

Checks on grid templates (`grid-template-columns`, `-areas`, `-rows`, `grid-column`, `grid-row`) only confirm the property is set, because engines keep the typed text (`1fr 1fr` vs `repeat(2, 1fr)`, `1/3` vs `1 / 3`). The v1.4 page grid squeezes on phones by design, setting up Chapter 5.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | Twelve covers in neat rows | Explain when Grid fits better than Flexbox | Story (choice) |
| 2 | Wrapped row vs real grid | Spot the "stretched last row" problem with wrapping Flexbox | Before / After |
| 3 | The fr unit | Size columns with fr | Step-by-step |
| 4 | Inside a grid rule | Read a grid rule | Tap to explore |
| 5 | **Checkpoint: the wall is up** | | Mixed review |
| 6 | What about rows? | Explain how Grid makes rows automatically | Chat with Tey |
| 7 | The year the grid arrived | Explain where the idea of a layout grid comes from | Reading |
| 8 | One big cover | Make an item span columns with grid-column: span | Card deck |
| 9 | Four columns on a tiny phone | Spot a grid with too many columns for a phone | Before / After |
| 10 | **Checkpoint: Grandma's gallery** | | Mixed review |
| 11 | The gig list is data | Tell layout from data | Story (choice) |
| 12 | auto-fill or auto-fit? | Read repeat(auto-fill, minmax()) piece by piece | Tap to explore |
| 13 | Draw the page with words | Name areas with grid-area | Chat with Tey |
| 14 | Build the beat gallery | Build a gallery of figures with captions | Step-by-step |
| 15 | **Checkpoint: wall, table, map** | | Mixed review |
| 16 | Grid: myth or fact? | Separate Grid myths from facts | Myth or Fact |
| 17 | Top left, but last in the code | Place an item with grid line numbers | Story (choice) |
| 18 | Your page gets a grid | Sketch your page as a grid | Step-by-step |
| 19 | Grid, Flexbox and a table | Read a layout that uses Grid, Flexbox and a table together | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.4** | | Mixed (climax) |

## Course 2, Chapter 5 — Phones first (written 2026-10-20; Course 2 complete)

**Story:** three weeks to uni. The host's stats show most visitors are on phones, where v1.4 is two squeezed columns. `@media (min-width: ...)` on a stacked base, desktop-first vs mobile-first, the viewport meta tag (never block zoom), stacking breakpoints small to large, breakpoints chosen by the content, the history (m-dot sites, the 2007 iPhone, Ethan Marcotte's "Responsive Web Design" in May 2010, mobile overtaking desktop in StatCounter's late-2016 figures), `img { max-width: 100%; height: auto; }` with real width/height attributes, `object-fit`, phones-first headings in rem, never hiding content with `display: none` (use jump links instead), a layered stylesheet, the ten-minute test (320px, 200% zoom, big text, real phones), and a gig table that scrolls in an `overflow-x: auto` wrapper. **Choice (l01):** media queries, a separate phone site, or pinch-to-zoom. **Choice (l11):** hide it on phones? **Choice (l17):** the table that wouldn't fit. **Climax (l20):** Mensah Beats v1.5 on every screen in the house at Sunday lunch. Course 2 complete.

The loader (jsdom) ignores `@media` rules, so media-query exercises use `codeIncludes` (`min-width`, the breakpoint, the value), and page checks only test properties no media query in that exercise changes, so browser and loader grading agree.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | Most of them are on phones | Explain why sites are designed for phones first | Story (choice) |
| 2 | Undoing vs adding | Tell desktop-first from mobile-first CSS | Before / After |
| 3 | The line every phone needs | Explain what the viewport meta tag does | Step-by-step |
| 4 | Inside a media query | Read every part of a media query | Tap to explore |
| 5 | **Checkpoint: the stack** | | Mixed review |
| 6 | Where should it break? | Choose breakpoints where the content starts to look wrong | Chat with Tey |
| 7 | How the web learned to bend | Describe how sites handled phones before responsive design | Reading |
| 8 | Pictures that fit and don't squash | Keep images in proportion with height: auto | Card deck |
| 9 | The name that didn't fit | Spot text that's too big for a phone | Before / After |
| 10 | **Checkpoint: nothing squashed** | | Mixed review |
| 11 | Hide it on phones? | Explain what display: none does | Story (choice) |
| 12 | One stylesheet, three screens | Read a phones-first stylesheet with two breakpoints | Tap to explore |
| 13 | How do I know it works? | Test a page in the browser's device mode | Chat with Tey |
| 14 | Turn v1.4 phones-first | Move a laptop layout into a min-width query | Step-by-step |
| 15 | **Checkpoint: the ten-minute test** | | Mixed review |
| 16 | Responsive: myth or fact? | Separate responsive design myths from facts | Myth or Fact |
| 17 | The table that wouldn't fit | Spot a table that's wider than a phone | Story (choice) |
| 18 | Your page, phones first | Make your own page phones-first | Step-by-step |
| 19 | Everything from this course | Read a complete phones-first stylesheet | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.5** | | Mixed (climax) |

## Course 3, Chapter 1 — Book me (written 2026-10-21)

**Course:** Build and Launch a Website ("Kofi Goes Pro"), level 3, slug `build-and-launch-a-website`; lessons in `backend/originals/tracks/html-css/launch/`. Course details and cover wired in `html-css.ts` (upcomingUnits 4).

**Story:** two weeks to uni. Booking emails like "u free sat?" arrive with no details. A booking form: `form`, `label for` + `input id`, `name`, placeholders only as examples, input types (email, tel, date, number), `required` with "(required)" in words, form history (HTML 2.0 in 1995, HTML5 in 2014), `textarea` and `select`, `font: inherit` styling, radios in `fieldset`/`legend`, checkboxes, `button type="submit"` with `action`/`method` (and why something must receive the answers: a server or a form service, e.g. Netlify Forms, "check current terms"), honest privacy (a plain privacy line, unticked opt-ins, collect only what's needed), and `autocomplete`. **Choice (l01):** a form, "include all details", or one big box. **Choice (l11):** speakers, or not? (radios). **Choice (l17):** what happens to my details. **Climax (l20):** Mensah Beats v1.6; the organiser books the end-of-year show through the form.

The live preview's sandbox blocks form submission, so lessons never send. Font shorthand isn't page-checked (engines don't report it).

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | Book me, properly | Explain what a form is for | Story (choice) |
| 2 | The vanishing label | Explain why placeholder text can't replace a label | Before / After |
| 3 | One field at a time | Build a form field with label, input, id and name | Step-by-step |
| 4 | The right box for each answer | Choose the right input type for each question | Tap to explore |
| 5 | **Checkpoint: Grandma fills it in** | | Mixed review |
| 6 | Don't let it send half empty | Make a field required with the required attribute | Chat with Tey |
| 7 | When the web learned to listen | Explain why forms made the web two-way | Reading |
| 8 | Long answers and short lists | Use textarea for longer answers | Card deck |
| 9 | A form that looks like Mensah Beats | Make form fields use the page's font | Before / After |
| 10 | **Checkpoint: no more half-empty bookings** | | Mixed review |
| 11 | Speakers, or not? | Use radio buttons for one choice out of a few | Story (choice) |
| 12 | Pick one, or pick any? | Use checkboxes when several answers can be true | Tap to explore |
| 13 | Where do the answers go? | Add a send button with button type="submit" | Chat with Tey |
| 14 | Build the booking form | Plan a form's questions in a sensible order | Step-by-step |
| 15 | **Checkpoint: under a minute** | | Mixed review |
| 16 | Forms: myth or fact? | Separate form myths from facts | Myth or Fact |
| 17 | What happens to my details? | Explain what happens to the details people type into a form | Story (choice) |
| 18 | Your own contact form | Build a contact form for your own site | Step-by-step |
| 19 | The finished booking form | Read a complete, well-built form | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.6** | | Mixed (climax) |

## Course 3, Chapter 2 — Make it move (written 2026-10-21)

**Story:** one week to uni. Efua: the site is "still, like a poster on a wall"; Kofi wants spinning covers; Miracle wants motion with a purpose. `:hover`, `transition` (property, duration, easing; on the normal state), `transform` (translate, scale, rotate), hover isn't available on phones or keyboards so `:focus-visible` and `:active` too, history (blink and marquee, GIFs and Flash ending in 2020, WebKit's 2007 CSS transitions/animations proposal), `@keyframes` and `animation` with a count, animating transform/opacity rather than layout properties, never flashing (WCAG three-flashes rule), staggered entrances with `animation-delay` and `both`, `prefers-reduced-motion`, the five-second pause rule with `animation-play-state`, and a reduced-motion safety net. **Choice (l01):** purposeful motion, everything spinning, or none. **Choice (l11):** "3 DAYS LEFT!!!" flashing. **Choice (l17):** the slideshow that never stops. **Climax (l20):** Mensah Beats v1.7, alive for fans and calm for Grandma.

Motion is checked mostly with `codeIncludes`: the loader can't apply `:hover`/`:focus` states or `@media`, and shorthands like `transition`/`animation` are kept as typed. Page checks only confirm `transition`/`animation` are set, or test properties that don't animate.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | Make it feel alive | Explain what motion on a website is for | Story (choice) |
| 2 | Snap vs glide | Add a transition so a change happens smoothly | Before / After |
| 3 | The three parts of a transition | Write a transition with property, duration and easing | Step-by-step |
| 4 | Lift, grow, tilt | Move, scale and rotate an element with transform | Tap to explore |
| 5 | **Checkpoint: the record shelf** | | Mixed review |
| 6 | No mouse, no hover | Explain why hover alone isn't enough | Chat with Tey |
| 7 | Blinking text and Flash | Describe how early websites added motion | Reading |
| 8 | Motion that plays by itself | Describe the steps of an animation with @keyframes | Card deck |
| 9 | Smooth vs juddery | Explain why animating layout properties can judder | Before / After |
| 10 | **Checkpoint: smooth on every phone** | | Mixed review |
| 11 | "3 DAYS LEFT!!!" | Explain why fast flashing is dangerous | Story (choice) |
| 12 | One after another | Write keyframes with several steps | Tap to explore |
| 13 | When motion makes people ill | Explain why some people turn motion off | Chat with Tey |
| 14 | Motion, done properly | Give cards a hover and focus lift with a transition | Step-by-step |
| 15 | **Checkpoint: Grandma isn't dizzy** | | Mixed review |
| 16 | Motion: myth or fact? | Separate motion myths from facts | Myth or Fact |
| 17 | The slideshow that never stops | Explain the five-second rule for moving content | Story (choice) |
| 18 | Your page comes alive | Add hover, focus and press feedback to your own page | Step-by-step |
| 19 | Every moving part, explained | Read a complete motion stylesheet | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.7** | | Mixed (climax) |

## Course 3, Chapter 3 — Everyone can use it (written 2026-10-21)

**Story:** five days to uni. Kwesi, a blind fan who uses a screen reader (narrator only), says the site reads as "link, link, image". Accessibility for everyone (WHO: about 1 in 6 people have a significant disability), `main` and landmarks (`div` named for the first time, as the generic last resort), a heading outline, what screen readers announce, keyboard use (real links and buttons, HTML order, no positive tabindex), the history (WAI 1997, WCAG 1.0 1999 to 2.2 2023, levels A/AA/AAA, laws such as the European Accessibility Act from June 2025, "check locally"), accessible names and `aria-label` (first rule of ARIA), `min-height` so zoomed text isn't cut off, skip links (position: absolute until `:focus`), `lang` (including `lang="tw"` for Akwaaba) and specific titles, trying a screen reader (VoiceOver, TalkBack, Narrator, NVDA), the fifteen-minute check (automated tool, keyboard, 200% zoom, screen reader minute), myths, and why overlay widgets aren't a fix. **Choice (l01):** fix the real site, an "accessible version", or nothing. **Choice (l11):** nine Tabs (skip link). **Choice (l17):** the one-line overlay. **Climax (l20):** Mensah Beats v1.8; Kwesi books his ticket on his own.

The skip-link order check uses `a.skip-link ~ header` rather than `:first-child`, because the live runner may inject a `<base>` element.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | "It reads as link, link, image" | Explain who web accessibility is for | Story (choice) |
| 2 | Boxes vs landmarks | Explain what div is, and why it means nothing | Before / After |
| 3 | A page you can skim by ear | Give a page one h1 | Step-by-step |
| 4 | What Kwesi hears | Predict roughly what a screen reader announces | Tap to explore |
| 5 | **Checkpoint: Kwesi finds the gigs** | | Mixed review |
| 6 | Only a keyboard | Explain how keyboard users move through a page | Chat with Tey |
| 7 | The web was meant for everyone | Explain why access for everyone was part of the web's idea | Reading |
| 8 | Everything needs a name | Explain that every link, button and image needs an accessible name | Card deck |
| 9 | When the words don't fit the box | Explain why fixed heights break when text grows | Before / After |
| 10 | **Checkpoint: David, Kwesi, Grandma** | | Mixed review |
| 11 | Tab, tab, tab, tab, tab | Explain what a skip link is for | Story (choice) |
| 12 | Akwaaba, in the right voice | Set the page language with lang | Tap to explore |
| 13 | Try a screen reader yourself | Describe how people move through a page with a screen reader | Chat with Tey |
| 14 | The fifteen-minute check | Run an automated accessibility check | Step-by-step |
| 15 | **Checkpoint: one Tab and in** | | Mixed review |
| 16 | Accessibility: myth or fact? | Separate accessibility myths from facts | Myth or Fact |
| 17 | The one-line fix that isn't | Recognise claims that a widget can make a site accessible | Story (choice) |
| 18 | Your site, for everyone | Add landmarks, a heading outline and a skip link to your site | Step-by-step |
| 19 | A page everyone can use | Read an accessible page and name who each piece helps | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.8** | | Mixed (climax) |

## Course 3, Chapter 4 — Found on search (written 2026-10-21)

**Story:** two days to uni. A wedding planner searched "beat producer Accra" and didn't find Kofi; his tab says "index". Specific titles, meta descriptions, how search works (crawl, index, rank, show; normal results can't be bought), a matching head (lang, viewport and mobile-first indexing, title, description, h1), people-first wording (no keyword stuffing), history (AltaVista, Google 1998 and links as votes, meta keywords ignored since 2009), descriptive file names and link text, earned (not bought) links, Open Graph previews (og:title/description/image/url, full https:// image addresses), a 1200x630 share image with og:image:alt (never someone else's photo), favicons, speed (resize to about 2x the shown size, compress, WebP, `loading="lazy"` below the fold, keep width/height), myths (no ranking guarantees), honest growth (real quotes with permission, no fake reviews, a search console), and a sitemap.xml. **Choice (l01):** clear titles, keyword stuffing, or ads only. **Choice (l11):** which share image. **Choice (l17):** "500 five-star reviews, GHS 150". **Climax (l20):** Mensah Beats v1.9; the wedding planner finds and books him.

Placeholder addresses use mensahbeats.example.app. The compare card now wraps long URLs at phone width (RichLearnCard, `min-w-0` plus `overflow-wrap: anywhere`).

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | Nobody can find it | Explain what search engines need from a page | Story (choice) |
| 2 | The search result you'd click | Write a meta description that sums up a page | Before / After |
| 3 | How search actually works | Describe the four stages: crawl, index, rank, show | Step-by-step |
| 4 | Everything search engines read first | Read a search-ready head | Tap to explore |
| 5 | **Checkpoint: every tab has a name** | | Mixed review |
| 6 | Write for people, not robots | Use the plain words people actually search for | Chat with Tey |
| 7 | The keyword tag nobody reads | Describe how early search engines ranked pages | Reading |
| 8 | Addresses that make sense | Name pages and images descriptively | Card deck |
| 9 | When someone shares your link | Explain what a link preview is | Before / After |
| 10 | **Checkpoint: the preview card** | | Mixed review |
| 11 | Which picture shows up? | Choose a share image that works in previews | Story (choice) |
| 12 | The little icon in the tab | Add a favicon with link rel="icon" | Tap to explore |
| 13 | Why is it so slow? | Explain why page speed matters to visitors and search | Chat with Tey |
| 14 | Make the gallery fast | Resize and compress images before uploading | Step-by-step |
| 15 | **Checkpoint: sharp, small, fast** | | Mixed review |
| 16 | Search: myth or fact? | Separate search myths from facts | Myth or Fact |
| 17 | "500 five-star reviews, GHS 150" | Explain why fake reviews and bought links are harmful | Story (choice) |
| 18 | Get your own site found | Give every page a title, description and preview tags | Step-by-step |
| 19 | A head ready to be found | Read a complete, search-ready head | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v1.9** | | Mixed (climax) |

## Course 3, Chapter 5 — Launch night (written 2026-10-21; Course 3 and the whole track complete)

**Story:** the end-of-year show, and tomorrow Kofi leaves for university. He relaunches the site as Mensah Beats v2.0 at midnight. A launch checklist (ready, not perfect), the version history from v0.1, a pre-launch check (W3C HTML validator, every link, the form, phone and laptop, keyboard and zoom, Lighthouse and the preview card), the finished home page, domains (rented yearly from a registrar, check renewal prices locally, DNS records point it at the host, the free address is fine), history (the first website at CERN in 1991, restored in 2013; Eric S. Raymond's "release early, release often", 1997; what shipping means), a friendly 404.html, a tidy folder with a dated backup, the honest launch post (no hype), stylesheet layers, keeping it alive with a changelog, the upload and smoke test (reload fully or use a private window), launch myths, a calm live fix (a capital letter in Thanks.html breaks the form on the server), and a "how I built it" page. **Choice (l01):** checklist, upload at 11:59, or wait for perfect. **Choice (l11):** honest post, hype, or "link in bio somewhere". **Choice (l17):** rename and test, panic re-upload, or take the site down. **Climax (l20):** Mensah Beats v2.0; Kofi on the bus to uni with three new bookings, and the whole HTML & CSS track complete.

| # | Lesson | What it teaches | Main Learn format |
|---|---|---|---|
| 1 | Launch night | Explain why a launch needs a checklist | Story (choice) |
| 2 | From one line to v2.0 | Describe how a site grows from a first page to a full site | Before / After |
| 3 | The pre-launch check | Run a pre-launch check in a sensible order | Step-by-step |
| 4 | The v2.0 home page | Read a complete, finished home page | Tap to explore |
| 5 | **Checkpoint: the list is clean** | | Mixed review |
| 6 | Your own web address | Explain what a domain name is | Chat with Tey |
| 7 | The first website was one page | Describe the first website and how simple it was | Reading |
| 8 | A friendly "page not found" | Write a helpful 404 page | Card deck |
| 9 | A folder you can find things in | Organise a site folder and keep a backup | Before / After |
| 10 | **Checkpoint: packed and backed up** | | Mixed review |
| 11 | The launch post | Write an honest, specific launch message | Story (choice) |
| 12 | The v2.0 stylesheet | Read a complete stylesheet in sensible layers | Tap to explore |
| 13 | Keeping it alive | Plan small updates with a changelog | Chat with Tey |
| 14 | The upload | Upload a new version safely and smoke test it | Step-by-step |
| 15 | **Checkpoint: it's up** | | Mixed review |
| 16 | Launch myths | Spot common myths about launching a site | Myth or Fact |
| 17 | A bug at 12:05 | Stay calm and fix a live bug with the smallest safe change | Story (choice) |
| 18 | How I built it | Write a short "how I built it" page | Step-by-step |
| 19 | The whole changelog | Read the full story of a site as a changelog | Tap to explore |
| 20 | **Chapter Challenge: Mensah Beats v2.0** | | Mixed (climax) |

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
