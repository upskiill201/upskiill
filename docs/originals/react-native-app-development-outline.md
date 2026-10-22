# React Native for Beginners — Course Outline (Film 1 of the "Order Up" trilogy)

> Teyro Original, Coding. **Status: DRAFT v2 (2026-10-22), awaiting founder approval.** Course setup: `backend/originals/tracks/react-native.ts`.
> Founder brief (2026-10-22): a long, very practical React Native course (mobile apps), with a storyline like a film. v2 changes: **global setting, prices in US dollars**, and **only Film 1 is built now**; Films 2 and 3 are announced as "in production".
> Rules: docs/ORIGINALS_PLAYBOOK.md (§7 coding Originals, §8a storylines). Cast: docs/originals/CAST.md.

## At a glance

| | |
|---|---|
| Track | **Mobile App Development with React Native** (`react-native-app-development`) |
| This course | **React Native for Beginners** (`react-native-for-beginners`), Film 1: ***Order Up*** |
| Shape | 5 chapters × 20 lessons = **100 lessons** (`format: 'focused'`), about 20–25 hours |
| Stack | React Native + **Expo** + TypeScript |
| Who it's for | Someone who knows basic JavaScript or TypeScript (variables, functions, arrays, objects), for example after Teyro's TypeScript course. Chapter 1 recaps what's needed. |
| End outcome | Build a multi-screen React Native app with styled screens, forms, lists, navigation and saved data, and run it on your own phone. |
| Free | Chapter 1, lessons 1–5 |
| Money | US dollars throughout |

**The trilogy.** The track is planned as three films. Only Film 1 is built now. The course page, the last chapter and the final lesson announce the sequels as "in production":

| Film | Course | Status |
|---|---|---|
| 1. *Order Up* | React Native for Beginners: screens, styling, state, lists, navigation, the app on your phone | **Building now** |
| 2. *Order Up: Rush Hour* | Full-Stack Mobile Apps: API, database, accounts, a kitchen app, deployment | In production (announced) |
| 3. *Order Up: Opening Day* | Launch Your Mobile App: payments, push notifications, offline, testing, the App Store and Play Store | In production (announced) |

## The story: Order Up

**Austin, Texas. 12:40 p.m., Friday.** The line at **Pho Real**, the Nguyen family's food truck, runs past the corner. Twenty-two minutes from order to bowl. Two office workers check their watches, give up and walk to the burger truck next door. Inside, Linh Nguyen is writing orders on paper tickets with one hand and ladling broth with the other. Her son Theo, three weeks out of a coding bootcamp, is at the window taking cash.

The ticket for table 7's large brisket pho, no onions, ends up in the broth. Theo watches another customer leave and says the line the film hangs on: ***"I literally just learned how to build apps. Why are we still doing this on paper?"***

Theo has one month before the **Eastside Food Truck Festival**: 30,000 people, 60 trucks, and the busiest weekend of Pho Real's year. He's going to build an order-ahead app.

| Character | Role |
|---|---|
| **Theo Nguyen** (lead, new) | 22, Austin. Just finished a coding bootcamp; knows JavaScript and a little TypeScript, has never shipped anything. Funny, fast, overconfident, writes code at the truck's window between orders. |
| **Linh Nguyen** (new) | 51, his mum, who has run Pho Real for 12 years. Sharp, practical, allergic to anything that slows the line down. The sceptic: "Paper tickets never crash." Her approval is the real finish line. |
| **Mai Nguyen** (new) | 16, Theo's sister. First tester, brutally honest about design ("this font is giving 2009"), and the voice of every impatient customer. |
| **Arjun** (shared cast) | Freelance developer in Bengaluru who built a loyalty app for a London retailer (*How to Handle Difficult Negotiations*). Theo met him in an online developers' forum. He reviews Theo's code on video calls: precise, picky, kind. |
| **Ray** (narrated) | The truck's cook. Speaks only in order numbers. |
| **The regulars** (narrated) | Dana the nurse on her 30-minute break, a construction crew of six, a student who always wants extra lime. They're the app's user stories. |

**Running device:** Theo's **build log**, one entry per chapter (lesson 9, Tap to explore). **Markers are app versions**, v0.1 → v0.5, and the learner builds the same version alongside Theo.

**Prices (USD):** Small pho $11.50, Large pho $13.50, Banh mi $9.00, Spring rolls (2) $5.50, Iced coffee $4.75; extra brisket +$3.00, extra noodles +$1.50, no-charge options (no onions, extra lime). Austin sales tax 8.25% appears once, in the cart chapter.

## Chapters

Every chapter is 20 lessons: teach (1–4), Checkpoint (5), teach (6–9, with 9 = build log), Checkpoint (10), teach (11–14), Checkpoint (15), build (16–19), version release = Unit Challenge (20).

| # | Chapter (map banner) | Marker | Story line | Skill |
|---|---|---|---|---|
| 1 | The line around the block | v0.1 | A 22-minute wait, customers walking away, and a ticket in the broth. Theo starts building. | What you need, Expo, your first screens: components, JSX, Text and View, props |
| 2 | Readable in the sun | v0.2 | Customers squint at the menu in the Texas sun, coffee in one hand. | Styling: StyleSheet, flexbox, colour, images, accessible sizes |
| 3 | Build your bowl | v0.3 | Large, no onions, extra brisket, two limes. The cart has to get it right every time. | State and input: useState, events, Pressable, TextInput, totals in dollars, validation |
| 4 | "Is my order ready?" | v0.4 | Forty people asking the same question through the window. | Lists and navigation: FlatList, keys, Expo Router, screens and params |
| 5 | Festival weekend | v0.5 | 30,000 people, one app, and a delivery giant's offer that could make it pointless. | Effects, loading and empty states, saving data on the phone, the app on a real phone |

**Film 1 ending (Chapter 5, lesson 20):** the app takes 212 orders over the festival weekend; the line wait drops from 22 minutes to 9; Linh says "fine, keep it". **Cliffhanger (the Film 2 teaser):** on Monday, QuickBite, a delivery giant, offers Linh a deal: list Pho Real on its app for a 30% commission, "and you won't need your son's app". Theo has one week to make his app do what QuickBite can't. *To be continued in Order Up: Rush Hour, in production.*

## Practice: very practical

1. **Phone preview (Try it live).** React Native code runs inside the lesson, in a phone frame: edit a component, tap Run, then use the screen (tap buttons, type, scroll). Checks test what's on the screen ("there's a button that says Add to order", "the total says $17.86").
2. **Write and run.** Short code exercises checked by what renders, with a hint and a solution after two tries (playbook §7).
3. **Build lessons.** Lessons 16–19 of each chapter build Pho Real's app feature by feature; lesson 20 releases the chapter's version.
4. **On your phone.** From Chapter 1, lesson 14, learners run the app on their own phone with **Expo Go** (free, Android and iPhone), as "real device" missions with a checklist.

**What's needed first (before Chapter 1 is written):** the **React Native runner**: the existing TypeScript runner plus react-native-web, rendered in a phone frame, with screen checks. Same order as the Python and TypeScript courses: build the tool, then the lessons.

## Chapter 1: lesson plan (starts with what you need)

| # | Lesson | Main format | Practice |
|---|---|---|---|
| 1 | The line around the block | Story (choice) | First Try it live: change one word on Pho Real's screen |
| 2 | What you need | Walkthrough | A phone with Expo Go, this lesson's phone preview, and (later) a computer. What's free, what isn't |
| 3 | What a phone app is made of | Myth or Fact | Native vs web vs React Native; one codebase, two stores |
| 4 | Your first screen | Try it live (main) | View and Text, a real screen in the phone frame |
| 5 | Checkpoint: Mai's challenge | Checkpoint | |
| 6 | The JavaScript you'll use | Chat with Tey | A fast recap: const, arrow functions, arrays, objects, template strings |
| 7 | JSX: HTML's cousin | Before/After | The same menu in HTML and in React Native |
| 8 | Components are building blocks | Walkthrough | Split the screen into Header, MenuItem, Footer |
| 9 | Build log v0.1 | Tap to explore | |
| 10 | Checkpoint: Arjun's first review | Checkpoint | |
| 11 | Props: one card, every dish | Try it live | One MenuItem, five dishes and prices |
| 12 | Text people can read | Reading | Font sizes, contrast, one-handed use |
| 13 | The red screen | Find the bug | Reading React Native errors calmly |
| 14 | From preview to your phone | Walkthrough | Expo Go, a QR code, the app on your own phone |
| 15 | Checkpoint: the lunch-rush test | Checkpoint | |
| 16 | Build: the home screen | Build | |
| 17 | Build: the menu | Build | |
| 18 | Code review with Arjun | Before/After | Names, small components, no copy-paste |
| 19 | Build: one button, one promise | Build | "Order ahead" shows "coming in v0.3" |
| 20 | v0.1: Linh sees it | Unit Challenge | Cliffhanger: "Can it take an actual order?" |

## Facts to check before writing (sources in author notes)

- React Native: announced by Facebook (now Meta) at React.js Conf, January 2015; open-sourced March 2015. Expo is the framework the React Native docs recommend for new apps.
- Apps built with React Native: only companies' own public statements, re-checked before use.
- Expo Go: free on Android and iPhone. Google Play developer account: one-time US$25; Apple Developer Program: US$99 a year (relevant to Film 3; re-check at writing time).
- Food truck facts stay fictional; Austin's combined sales tax rate (8.25%) checked before use.

## Cast sheet additions (when Chapter 1 is written)

Theo, Linh and Mai are added to docs/originals/CAST.md as course-only characters (new CastIds `theo`, `linh`, `mai` in the engine's speaker lists), with Arjun's relationship: he reviews Theo's code after they meet on a developers' forum.

## Decisions for the founder

1. **Who it's for:** basic JavaScript/TypeScript first, with a recap in Chapter 1 (recommended), or complete beginners (adds about one chapter of programming basics).
2. **Story:** Theo and Pho Real in Austin (recommended), or another setting you prefer.
