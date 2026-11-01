# JavaScript: From Beginner to Interactive Apps — outline

> Teyro Original, category **Coding**. Track slug `javascript-for-beginners`, `runner: 'javascript'`, `format: 'short'`.
> Founder's brief (2026-10-24): "Go beyond static websites and teach learners how to make web pages behave like real applications."
> Status: written in full, 2026-10-24. Branch `feat/javascript-original`.

## Shape: 3 courses × 5 chapters × 10 lessons (150 lessons)

| Level | Course | Story | Chapters |
|---|---|---|---|
| 1 | **JavaScript for Beginners** | *First Chair* (December) | the console: values, decisions, functions, arrays and loops, objects |
| 2 | **Interactive Web Pages with JavaScript** | *The Live Board* (January) | the DOM, events, building pages from data, forms and validation, a full widget |
| 3 | **Build Interactive Apps with JavaScript** | *Championship Weekend* (February to March) | app state (a tracker), localStorage, async and fetch, real public APIs, the finished app |

**Why this size.** It follows HTML & CSS (one track, three linked levels of five chapters, one continuous story), so a learner can go from "never written code" to "shipped an app that saves data and talks to an API" without leaving the track. Each chapter uses the short format (founder, 2026-10-15): 10 lessons, a Checkpoint at lesson 5 and the Unit Challenge at lesson 10. That keeps lessons short and easy to read while still giving 120 teaching lessons, roughly the same ground as a full beginner bootcamp module, and each course ends on something the learner built. Twenty-lesson chapters would double the length without adding a skill the brief asks for.

**Why this order.** Level 1 is pure JavaScript in the console, because a page adds a second thing to get wrong; by the end, learners can model a real problem (a ticket window) with data and functions. Level 2 puts that onto a page: find things, change them, react to taps, build lists from data, read forms. Level 3 turns pages into apps: one source of truth for the data, saving it, waiting for servers, using real APIs, and shipping.

## The runner (frontend/public/javascript, lib/code/jsRunner.ts, components/code/JsPad.tsx)

- Every run is a fresh, sandboxed page (`allow-scripts allow-forms`, never `allow-same-origin`): it can't touch Teyro's cookies, storage or pages.
- **Console mode** (no `page`): `console.log` output, browser-like value formatting, plain-words errors with the line marked.
- **Page mode** (`page` = the practice page's HTML): a live preview the learner can tap and type in, with its console streaming underneath. Grading runs again in a hidden page with the hidden checks, so clicking around never changes the result.
- **localStorage** is a stand-in the pad carries between runs (sandboxed pages have none), shown in a *Saved data* panel, so "Run again and it's still there" works. `storage` seeds it.
- **fetch**: `https://api.silverpine.test` is a practice API built into the runner (`practice-api.js`; `.test` is reserved for testing and never reaches a real server): lifts, trails, snow, riders, results, live results, a POST for check-ins, a broken route and a slow route. Any other address goes to the real internet (used once, for the real Open-Meteo API). Values are frozen: lessons depend on them.
- **Safety nets**: a loop that runs for 2.5 seconds without a break is stopped; a form that would reload the page is stopped with a console note; links never leave the page; `alert`/`prompt`/`confirm` print to the console (`stdin` answers `prompt`).
- **Checks**: `expr` is JavaScript run in the page after the code settles, using helpers on `window.__t` (`click`, `type`, `check`, `key`, `submit`, `text`, `count`, `has`, `logs`, `store`, `reloads`, `settle`). `npm run originals` runs every solution in the same runtime inside jsdom (`originals-js-verify.ts`), so a solution that can't pass its own checks never loads. Solutions avoid what jsdom lacks (layout, `innerText`).

## Story: Silver Pine

**Silver Pine Ski Hill**, Alder Gap, Colorado, USA (a fictional small town in the real Rockies). A family hill opened in 1961: one double chair called *Old Blue*, the Ridge T-Bar, the Bunny Carpet and 14 trails. Money is in US dollars. Lift tickets: $59 adults, $39 kids 6 to 12, free under 6, $29 seniors 70+, and $20 for everyone on Locals Tuesday.

The website is a static page Nora built last summer from a free HTML course. On opening day the phone rings forty times an hour: "Is Old Blue open?", "How much for a family of four?", "Is the bunny slope groomed?" Mags hands Nora a sticky note: *Make the website answer the phone.*

### Cast (castIds `nora`, `mags`, `rafa`, `wes`; see CAST.md, "Silver Pine")

- **Nora Lindqvist** (23, lead). Lift operator and ticket-window cashier at Silver Pine for three winters; grew up in Alder Gap. Knows HTML and CSS, has never written JavaScript. Practical, dry, makes lists for everything, terrible at waiting; talks to the chairlift ("Come on, Old Blue"). Wants to be a developer and is scared it's "too late to start".
- **Mags Ellery** (71). Owner; her parents built Silver Pine. Runs the hill from a clipboard and a landline, gives free hot chocolate to anyone who falls off the T-Bar, invented Locals Tuesday. Stubborn about change, soft about people. Says yes first and asks how later.
- **Rafa Ortiz** (34). Head of ski patrol. Spent six years testing software in Denver, quit to live in the mountains and swore never to write code again. Calm, exact, darkly funny, tests everything twice. Becomes Nora's reluctant mentor in the patrol hut. "What does it do when someone types nothing?"
- **Wes Ellery** (15). Mags's grandson, snowboarder, user tester. Breaks everything on his cracked phone, taps every button twice, reads nothing. Rides bib 13 in the U16 division at the championship.

### The arc

- **Level 1, First Chair (December).** Opening day, Friday 4 December. Nora answers the phone with JavaScript in the console: the price list, the Locals Tuesday rules, one `ticketPrice()` the whole ticket window uses, the 14-trail report, and the Christmas-week status report. Final beat: the Colorado Junior Freeride Series calls. Their March venue has no snow. Would Silver Pine host the championship on Saturday 13 March? Mags says yes before anyone can stop her.
- **Level 2, The Live Board (January).** The website comes alive: a live trail board in the lodge, a lift-line counter for the liftie's tablet, a rental shop list, the ski school sign-up form Wes can't break, and the MLK Day weekend board (Monday 18 January) when 3,000 people check the site before breakfast.
- **Level 3, Championship Weekend (February to March).** Forty volunteers, one clipboard: Nora builds the championship app. A volunteer checklist, saved on the device because Wi-Fi dies at the summit; live lift status and results from the event's API; the real snow forecast from Open-Meteo; and on Saturday 13 March the live results board, with Wes on it.

## Level 1: JavaScript for Beginners ("First Chair")

**Starting point:** never written code; maybe seen some HTML. **End outcome:** write small JavaScript programs that store data, make decisions, repeat work and organise information in objects, and read their errors.

### Chapter 1 · The Phone Won't Stop (marker "Opening day, Dec 4")
Goal: print text and numbers, do maths, and store values in variables.
1. Hello, console — `console.log`, strings (Story)
2. Numbers that do maths — `+ - * /`, order, `%` (Walkthrough)
3. Boxes with names — `let` and `const` (Chat with Tey)
4. Text that fills itself in — template literals, `.length`, `toUpperCase()` (Before/After)
5. **Checkpoint:** the price board
6. Changing values — reassigning, `+=`, `++`, `const` errors (Myth or Fact)
7. Numbers vs text — `"5" + 5`, `Number()`, `typeof` (Tap to explore)
8. Reading error messages — ReferenceError, SyntaxError, TypeError (Reading)
9. Names and notes — camelCase, comments, readable code (Before/After)
10. **Unit Challenge:** the family-of-four total

### Chapter 2 · Locals Tuesday (marker "Dec 8 · Locals Tuesday")
Goal: make programs decide with comparisons, `if`/`else` and logic.
1. True or false — comparisons, `===`, booleans (Myth or Fact)
2. if — run code only when something is true (Walkthrough)
3. else and else if — the age bands (Story)
4. && and || — Locals Tuesday AND under 6 (Chat with Tey)
5. **Checkpoint:** the ticket window rush
6. ! and true/false names — `isOpen`, `!isOpen` (Tap to explore)
7. === not == — why loose equals lies (Before/After)
8. The short if — the ternary `? :` (Walkthrough)
9. Empty means false — truthy and falsy (Reading)
10. **Unit Challenge:** the ticket window rules

### Chapter 3 · One Rule, Every Window (marker "Dec 14")
Goal: package rules into functions with parameters and return values.
1. Your first function (Story)
2. Parameters — give a function what it needs (Walkthrough)
3. return vs console.log (Before/After)
4. More than one parameter, and defaults (Chat with Tey)
5. **Checkpoint:** two windows, one rule
6. Arrow functions (Tap to explore)
7. Inside and outside — scope (Myth or Fact)
8. Small functions, working together (Walkthrough)
9. When a function says undefined (Reading)
10. **Unit Challenge:** `ticketPrice()` for every window

### Chapter 4 · Fourteen Trails (marker "Dec 21 · Solstice")
Goal: store lists in arrays and work through them with loops.
1. Lists — arrays (Story)
2. Positions start at 0 — index and length (Myth or Fact)
3. Add, remove, find — `push`, `pop`, `includes`, `indexOf` (Walkthrough)
4. for...of — one trail at a time (Chat with Tey)
5. **Checkpoint:** the morning sweep
6. Totals and counts in a loop (Walkthrough)
7. Counting with i — the classic `for` and `while` (Before/After)
8. Loops that decide — `if` inside a loop, the longest wait (Tap to explore)
9. join, slice and sort (Reading)
10. **Unit Challenge:** the trail report

### Chapter 5 · Christmas Week Rush (marker "Dec 26 · Peak week")
Goal: describe things with objects and process lists of them with array methods.
1. Objects — one trail, many facts (Story)
2. Dot and brackets — read and change properties (Walkthrough)
3. Lists of objects (Chat with Tey)
4. Looping through objects (Tap to explore)
5. **Checkpoint:** the patrol radio
6. filter — keep only what you need (Before/After)
7. map — turn every item into something new (Walkthrough)
8. find, some and every (Myth or Fact)
9. Functions that take and return objects (Reading)
10. **Unit Challenge:** New Year's Eve status report (the championship call)

## Level 2: Interactive Web Pages with JavaScript ("The Live Board")

**Starting point:** JavaScript basics (variables, `if`, functions, arrays, objects), as in Level 1, and a little HTML. **End outcome:** make web pages respond to people: change content and styles, react to taps and typing, build pages from data, and check forms.

### Chapter 1 · The Board in the Lodge (marker "Jan 4")
Goal: find elements on a page and change their text, classes and attributes.
1. JavaScript meets the page — `document`, `querySelector`, `textContent` (Story)
2. Finding things — ids, classes and tags (Walkthrough)
3. Changing words and numbers on the page (Before/After)
4. Classes — open green, closed grey (`classList`) (Chat with Tey)
5. **Checkpoint:** first light
6. Attributes and styles — `src`, `alt`, `disabled`, `style` (Tap to explore)
7. Every match — `querySelectorAll` (Walkthrough)
8. Data onto the page — update rows from an array (Myth or Fact)
9. When the page says null (Reading)
10. **Unit Challenge:** the lodge board shows today

### Chapter 2 · Tap to Count (marker "Jan 8")
Goal: make pages react with event listeners.
1. Click — `addEventListener` (Story)
2. Remember and show — a counter (Walkthrough)
3. Plus, minus, reset (Chat with Tey)
4. Which button? — `event.target` and `data-` attributes (Tap to explore)
5. **Checkpoint:** the Saturday line
6. Typing — the input event (Before/After)
7. Show and hide — toggles (Walkthrough)
8. Keys and choices — keydown, change, checkboxes (Myth or Fact)
9. Why nothing happens — event bugs (Reading)
10. **Unit Challenge:** the lift-line counter

### Chapter 3 · Building the Page (marker "Jan 11")
Goal: build and rebuild page content from data.
1. Make an element — `createElement`, `append` (Walkthrough)
2. A list from an array (Story)
3. HTML from a template — `innerHTML`, and when not to (Before/After)
4. Remove and clear (Chat with Tey)
5. **Checkpoint:** the rental wall
6. One function draws it all — `render()` (Walkthrough)
7. One listener for the whole list — delegation (Tap to explore)
8. Sort and filter, then draw (Myth or Fact)
9. Why everything appears twice (Reading)
10. **Unit Challenge:** the rental shop list

### Chapter 4 · Ski School Sign-Up (marker "Jan 14 · MLK week")
Goal: read form input, stop reloads, and validate with clear messages.
1. What did they type? — `.value` (Story)
2. Submit without the reload — `preventDefault` (Walkthrough)
3. Numbers from boxes — `Number()` and `NaN` (Myth or Fact)
4. Your own rules — validation in JavaScript (Chat with Tey)
5. **Checkpoint:** Wes tries to break it
6. Errors people can fix (Before/After)
7. Let the browser help — `required`, `min`, `type="email"`, `checkValidity()` (Tap to explore)
8. Menus, radios and checkboxes (Walkthrough)
9. After it's sent — success and reset (Reading)
10. **Unit Challenge:** the ski school form

### Chapter 5 · MLK Weekend (marker "Jan 18 · MLK Day")
Goal: combine everything into an interactive widget people rely on.
1. Search as you type (Story)
2. Filter buttons — green, blue, black (Walkthrough)
3. A live price calculator (Before/After)
4. Timers — `setTimeout` and `setInterval` (Chat with Tey)
5. **Checkpoint:** the radio call
6. Tabs (Tap to explore)
7. Tidy code — state, render, listeners (Walkthrough)
8. Buttons everyone can use (Myth or Fact)
9. Tracing a bug with console.log (Reading)
10. **Unit Challenge:** the MLK board

## Level 3: Build Interactive Apps with JavaScript ("Championship Weekend")

**Starting point:** can make interactive pages with the DOM, events and forms, as in Level 2. **End outcome:** build and ship a small web app that keeps its data in one place, saves it on the device, loads live data from an API, and handles loading, empty and error states.

### Chapter 1 · Forty Riders, One Clipboard (marker "6 weeks to go")
Goal: build an app where the data comes first and the page follows it.
1. Data first, page second (Story)
2. Add items — ids and a form (Walkthrough)
3. Tick it off — toggle by id (Chat with Tey)
4. Delete — filter by id (Before/After)
5. **Checkpoint:** the volunteer briefing
6. Counts that stay true (Tap to explore)
7. All, to do, done — views (Walkthrough)
8. Most urgent first — sorting by priority (Myth or Fact)
9. The bug that changed two lists — copies (Reading)
10. **Unit Challenge:** the volunteer checklist app

### Chapter 2 · No Signal at the Summit (marker "5 weeks to go")
Goal: save an app's data in the browser and load it back safely.
1. localStorage — text that stays (Story)
2. Lists and objects as text — `JSON.stringify` and `JSON.parse` (Walkthrough)
3. Save after every change (Before/After)
4. Load on start, with a default (Chat with Tey)
5. **Checkpoint:** the dead battery
6. Remember my settings (Tap to explore)
7. When saved data is broken — `try`/`catch` (Walkthrough)
8. Clear, reset and version (Myth or Fact)
9. What never goes in localStorage (Reading)
10. **Unit Challenge:** the patrol hut checklist survives

### Chapter 3 · Waiting for Results (marker "4 weeks to go")
Goal: work with code that waits, and load data with fetch.
1. Code that waits — `setTimeout` and order (Myth or Fact)
2. Promises — `then` (Walkthrough)
3. async and await (Chat with Tey)
4. Your first fetch (Story)
5. **Checkpoint:** the timing tent
6. Loading, then the list (Walkthrough)
7. When the server says no — `res.ok`, `try`/`catch` (Before/After)
8. Sending data — POST (Tap to explore)
9. Several at once — `Promise.all` (Reading)
10. **Unit Challenge:** the live lift widget

### Chapter 4 · The Real Weather (marker "3 weeks to go")
Goal: read API docs, build request URLs and use a real public API.
1. What an API really is (Chat with Tey)
2. Questions in the address — query parameters (Walkthrough)
3. Digging into nested JSON (Tap to explore)
4. A real API — Open-Meteo, live (Story)
5. **Checkpoint:** the snow call
6. Refresh on a timer (Walkthrough)
7. Keys, limits and CORS (Reading)
8. Search an API as you type — debounce (Before/After)
9. Missing fields — `?.` and `??` (Myth or Fact)
10. **Unit Challenge:** the snow report widget

### Chapter 5 · Championship Day (marker "March 13")
Goal: plan, build, debug and ship a complete interactive app.
1. Plan the app (Chat with Tey)
2. The results board — fetch and sort (Walkthrough)
3. Divisions and search (Before/After)
4. Favourite riders, saved (Story)
5. **Checkpoint:** the dress rehearsal
6. Live updates that keep your place (Walkthrough)
7. Loading, empty and error states (Tap to explore)
8. DevTools — the browser's own debugger (Reading)
9. Ship it — files, `defer` and free hosting (Myth or Fact)
10. **Final Challenge:** Championship Day

## Facts and sources (checked 2026-10-24)

- JavaScript language behaviour: MDN Web Docs (developer.mozilla.org) and the ECMAScript spec, e.g. `"5" + 5 === "55"`, `0.1 + 0.2 !== 0.3`, `typeof null === "object"`, arrays start at 0.
- localStorage stores strings only, per origin, and is readable by any script on the page (MDN, Window.localStorage); typical limit about 5 MB per origin (MDN, "Storage quotas and eviction criteria").
- Open-Meteo: free, no API key, for non-commercial use, at `https://api.open-meteo.com/v1/forecast` with `latitude`, `longitude`, `current`, `daily`, `temperature_unit`, `wind_speed_unit`, `precipitation_unit` and `timezone` parameters (open-meteo.com/en/docs).
- Dates in the story are real 2026–27 calendar days: Fri 4 Dec 2026, Tue 8 Dec 2026, Fri 25 Dec 2026, Mon 18 Jan 2027 (MLK Day), Sat 13 Mar 2027.
- Free hosting options named in Level 3 (GitHub Pages, Netlify, Vercel) had free tiers for static sites at the time of writing (October 2026).
