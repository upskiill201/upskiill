# Mobile App Development with React Native — Course Outline

> Teyro Original, Coding. **Status: DRAFT (2026-10-22), awaiting founder approval.** Nothing beyond this outline and the course setup (`backend/originals/tracks/react-native.ts`) is written until it's approved.
> Founder brief (2026-10-22): a full-stack mobile app course in React Native; long, very practical (learners build real apps, not theory), with a storyline that plays like a film.
> Rules: docs/ORIGINALS_PLAYBOOK.md (§7 coding Originals, §8a storylines). Cast: docs/originals/CAST.md.

## The track at a glance

| | |
|---|---|
| Track title | **Mobile App Development with React Native** |
| Storyline | **WashDay: The App**, a trilogy, one film per course |
| Shape | 3 courses × 5 chapters × 20 lessons = **300 lessons** (`format: 'focused'`, like TypeScript and HTML & CSS) |
| Learning time | about 60–75 hours across the three courses |
| Stack | React Native + **Expo** + TypeScript (app) · **Hono** API + **Postgres** (backend) · Expo push, mobile money payments, EAS builds (launch) |
| Who it's for | Someone who knows basic JavaScript or TypeScript (variables, functions, arrays, objects), for example after Teyro's TypeScript course. Chapter 1 recaps exactly what the course needs. |
| End outcome | Design, build and publish a full-stack mobile app (Android and iPhone) with accounts, a real backend and database, payments and push notifications. |
| Free | Course 1, Chapter 1, lessons 1–5 (each course has its own free stretch) |
| Final project | The learner's own app, from idea to a shareable build on their phone |

| Course (level) | Slug | Film | Chapters | Markers |
|---|---|---|---|---|
| 1. **React Native for Beginners** | `react-native-for-beginners` | *WashDay: The App* | 1–5 | v0.1 → v0.5 |
| 2. **Full-Stack Mobile Apps** | `full-stack-mobile-apps` | *WashDay Goes Live* | 6–10 | v0.6 → v0.8 |
| 3. **Launch Your Mobile App** | `launch-your-mobile-app` | *WashDay Ships* | 11–15 | v0.85 → v1.0 |

Courses 1 and 2 cover a mobile front end and a full-stack app. Course 3 is everything between "works on my phone" and "people are paying for it in the Play Store".

## Why React Native (decided 2026-10-22)

- One codebase builds real **Android and iPhone** apps (published to both stores).
- It is **TypeScript**, so it continues Teyro's HTML & CSS → TypeScript path, and the skills transfer to web React jobs.
- Screens can run **inside the lesson**, in the browser (see "Practice tools"). Flutter's Dart needs a server to compile, which breaks the Originals rule that code runs in the learner's browser.
- Full stack in one language: the app, the API and the database queries are all TypeScript.

## The story: WashDay: The App

**Clinton** (shared cast, 18, first-year Computer Science at the University of Buea) already runs **WashDay**, a laundry pickup service, from the Business courses (*How to Validate a Business Idea*, *How to Price a Product or Service*): 1,500 FCFA a bag, Mama Rose and her sister Auntie Bih wash, Clinton collects by moto-taxi. Every order arrives on WhatsApp. Lives only move forward, so this trilogy starts where the Business set ends.

**Cold open (Course 1, lesson 1):** Saturday, heavy rain, 41 WhatsApp orders. A professor's interview suit goes to the wrong hostel. A student's exam notes go through the wash in a jeans pocket. Clinton, soaked, scrolling back through 300 messages to find who ordered what, says the line the trilogy hangs on: *"I study Computer Science. Why am I running this on WhatsApp?"*

| Character | Role |
|---|---|
| **Clinton** (lead) | Builds the app. Loud, funny, brilliant at organising people, tempted by shortcuts, but he keeps his drafts, and that saves him (per CAST). |
| **David** | Medicine student, Clinton's numbers friend and sceptic: "How many orders? Show me." Becomes the app's first data person (the admin dashboard is his). |
| **Miracle** | Software engineer at Afiya in Lagos. Mentors by video call and code review: "Show me the error first." Her rule list becomes the course's code-review checklist. |
| **Kofi** | Clinton's friend from Miracle's study group, now at KNUST, who built his own website in *Kofi Goes Live*. Design help, and comic rivalry ("my website loads faster than your app"). |
| **Mama Rose, Auntie Bih** | The washers (narrated). Cheap Android phones, little data, big thumbs, unreliable network: the real users who keep the app honest. They need their own washer screens. |
| **SpinCycle** (the rival) | A slick laundry app launched on campus by a well-funded student, Brandon (narrated). The antagonist of the trilogy: faster at first, careless underneath. |

**Running device:** Clinton's **build log**, one entry per chapter (lesson 9, Tap to explore): what shipped, what broke, what he learned. **Markers are app versions** (v0.1 → v1.0), and the learner builds the same version in every chapter.

### Film 1: WashDay: The App (Course 1, v0.1 → v0.5)
Clinton builds the first app, screen by screen: a home screen, a price list Mama Rose can actually read, an order form, a list of orders, and order details. **Climax:** he demos v0.5 on Expo Go to 20 students at the hostel. They love it. **Cliffhanger:** the next morning, SpinCycle launches on campus with posters, free first wash, and an app in the Play Store.

### Film 2: WashDay Goes Live (Course 2, v0.6 → v0.8)
**Opening disaster:** Clinton's phone resets and every order stored on it vanishes, the night before the busiest Saturday of the year. Orders have to live on a server. He builds the API, the database and accounts, and then a second app for Mama Rose and Auntie Bih. **Midpoint twist:** a student discovers she can see everyone's orders and phone numbers by changing one number in a link. Clinton has to fix it and tell his customers honestly. **Climax:** two apps, one system, live for 200 students. **Cliffhanger:** the university's startup competition invites WashDay to Demo Day, in four weeks, and SpinCycle is in it too.

### Film 3: WashDay Ships (Course 3, v0.85 → v1.0)
Mobile money payments (and a fake-payment fraud attempt), push notifications ("Your bag is on its way"), working offline in the rainy-season network, photos of every bag at pickup, tests and crash reports, then the store. **The darkest moment:** the Play Store rejects the app three days before Demo Day. **Climax:** Demo Day, live on stage, with the network down and the offline mode working. SpinCycle's app crashes in their demo. **Ending:** WashDay v1.0 is in the Play Store, 1,000 downloads by the end of the rainy season, and Mama Rose's phone buzzes with her first push notification. Final project: the learner's own app.

## Practice tools: very practical

Every lesson has the learner write or change real code. Four kinds of practice:

1. **Phone preview (Try it live).** React Native code runs in the lesson inside a phone frame: edit a component, tap Run, and use the screen (tap buttons, type in inputs, scroll lists). Checks test what's on the screen ("there's a button that says Book pickup", "the list shows 3 orders").
2. **API and database sandbox (Course 2 onwards).** A real Hono API and a real Postgres database run in the learner's browser, so they can write routes and SQL and see the results without any setup. The app in the phone frame can call that API.
3. **Build steps.** Project lessons build WashDay feature by feature, in the same files, version by version. Each chapter's lessons 16–19 are build lessons; lesson 20 is the chapter's version release.
4. **On your phone.** Things a browser can't show (camera, push notifications, the real device) are done on the learner's own phone with **Expo Go**, as "real device" missions at the end of chapters, with a checklist to confirm.

**Built before Chapter 1 is written (same order as Python and TypeScript):** the **React Native runner**: the TypeScript runner plus react-native-web, rendered in a phone frame, with screen checks. The API and database sandbox (Hono in a worker plus PGlite, which is Postgres compiled to WebAssembly) is built before Course 2.

## Chapters

Every chapter is 20 lessons: teach (1–4), Checkpoint (5), teach (6–9, with 9 = build log), Checkpoint (10), teach (11–14), Checkpoint (15), build (16–19), version release = Unit Challenge (20).

### Course 1: React Native for Beginners (*WashDay: The App*)

| # | Chapter (map banner) | Marker | Story line | Skill |
|---|---|---|---|---|
| 1 | The suit in the wrong hostel | v0.1 | 41 WhatsApp orders, one soaked Clinton, and a professor's suit in the wrong hostel. | Your first screens: Expo, components, JSX, Text and View, props |
| 2 | Big enough for Mama Rose | v0.2 | Mama Rose can't read the price list. Her phone is old and her thumbs are big. | Styling: StyleSheet, flexbox, colours, images, safe areas, accessible sizes |
| 3 | Forty orders, one form | v0.3 | A rainy Saturday, forty orders, and a form that has to make them impossible to get wrong. | State and input: useState, events, Pressable, TextInput, validation |
| 4 | "Where's my bag?" | v0.4 | Twenty messages a day asking the same question. The answer is a list. | Lists and navigation: FlatList, keys, Expo Router, screens and params |
| 5 | Demo night | v0.5 | Twenty students, one phone, one chance. Then SpinCycle launches. | Effects, loading and empty states, local storage, Expo Go on a real phone |

### Course 2: Full-Stack Mobile Apps (*WashDay Goes Live*)

| # | Chapter | Marker | Story line | Skill |
|---|---|---|---|---|
| 6 | The night the orders vanished | v0.6 | Clinton's phone resets. Every order is gone, the night before the busiest Saturday. | Why a backend: HTTP, fetch, JSON, REST, async/await in the app |
| 7 | Build the counter | v0.65 | WashDay needs a server that never forgets. Clinton builds its front desk. | Building an API with Hono: routes, validation, status codes, errors |
| 8 | Every bag, written down | v0.7 | Orders, customers, bags, payments. Mama Rose's notebook becomes a database. | Postgres and SQL: tables, select, insert, update, joins, migrations |
| 9 | Who can see what? | v0.75 | A student sees everyone's orders by changing one number in a link. | Accounts and security: sign-up, hashing, tokens, secure storage, protected routes |
| 10 | Two apps, one system | v0.8 | Mama Rose gets her own app. David gets his dashboard. 200 students go live. | Roles, a second app, status updates, deploying the backend |

### Course 3: Launch Your Mobile App (*WashDay Ships*)

| # | Chapter | Marker | Story line | Skill |
|---|---|---|---|---|
| 11 | Pay with mobile money | v0.85 | Cash is chaos. Then someone sends a screenshot of a payment that never happened. | Payments: a mobile money flow in sandbox, webhooks, idempotency, receipts |
| 12 | Ping! | v0.9 | "Your bag is on its way." The message students have wanted for months. | Push notifications, permissions done politely, deep links |
| 13 | No network, no problem | v0.93 | Rainy season. The network drops every ten minutes, and the orders don't stop. | Offline-first: caching, queues, retries, performance on cheap phones, camera photos |
| 14 | Don't break it | v0.96 | A small update crashes the app for every Android 10 phone on campus. | Testing, crash reports, analytics, accessibility |
| 15 | Store day | v1.0 | Rejected by the Play Store, three days before Demo Day. | Icons, EAS builds, store listings, review, release, over-the-air updates, your own app |

## Course 1, Chapter 1: lesson plan (written first, includes the free lessons)

| # | Lesson | Main format | Practice |
|---|---|---|---|
| 1 | The suit in the wrong hostel | Story (choice) | First Try it live: change one word on WashDay's screen |
| 2 | What a phone app is made of | Myth or Fact | Native vs web vs React Native; one codebase, two stores |
| 3 | Your first screen | Try it live (main) | View, Text, a real screen in the phone frame |
| 4 | JSX: HTML's cousin | Before/After | HTML from Kofi's site vs the same thing in React Native |
| 5 | Checkpoint: Kofi's challenge | Checkpoint | |
| 6 | Components are building blocks | Walkthrough | Split the screen into Header, PriceRow, Footer |
| 7 | Props: same card, different bag | Try it live | One PriceRow, three prices |
| 8 | Text that fits a cheap phone | Reading | Font sizes, contrast, Mama Rose's phone |
| 9 | Build log v0.1 | Tap to explore | |
| 10 | Checkpoint: Miracle's first review | Checkpoint | |
| 11 | Pictures and icons | Try it live | Image, an icon set, the WashDay logo |
| 12 | Buttons that do something | Chat with Tey | Pressable, onPress, an alert |
| 13 | The red screen | Find the bug | Reading React Native error messages calmly |
| 14 | From laptop to phone | Walkthrough | Expo Go, a QR code, the app on your own phone |
| 15 | Checkpoint: the hostel test | Checkpoint | |
| 16 | Build: the home screen | Build | |
| 17 | Build: the price list | Build | |
| 18 | Code review with Miracle | Before/After | Names, small components, no copy-paste |
| 19 | Build: one button, one promise | Build | "Book pickup" opens WhatsApp for now |
| 20 | v0.1: Mama Rose sees it | Unit Challenge | Cliffhanger: "Can it take orders?" |

## Facts to check before writing (sources go in author notes)

- React Native: announced by Facebook (Meta) in 2015 (React.js Conf, January; open-sourced March 2015). Expo is the officially recommended way to start a new React Native app (React Native docs).
- Apps built with React Native, only as stated publicly by the companies (re-check each before use).
- Play Store developer account: one-time US$25 fee; Apple Developer Program: US$99 a year (re-check at writing time).
- Mobile money in Cameroon: MTN Mobile Money and Orange Money are the main services; lessons use a sandbox and never real money.
- Hono runs on many JavaScript runtimes (Node, Bun, Cloudflare Workers, browsers); PGlite is Postgres compiled to WebAssembly.

## Decisions for the founder

1. **Backend framework: Hono (recommended) or Express?** Hono runs in the learner's browser, so every backend lesson is runnable; Express is more common in job ads but can't run in the lesson. Course 2 would include one lesson showing the same API in Express, because the ideas are identical.
2. **Who it's for:** basic JavaScript/TypeScript first (recommended, with a recap in Chapter 1), or complete beginners (adds about one chapter of programming basics to Course 1).
3. **Payments:** teach a generic mobile money flow against a Teyro sandbox (recommended), naming MTN MoMo and Orange Money as the real services, with no provider's live keys anywhere.
