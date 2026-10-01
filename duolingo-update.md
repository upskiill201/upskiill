# Duolingo-standard update: status report

_Last updated: 2026-09-27_

We've been bringing Teyro's learning and reward experience up to Duolingo's standard, one phase at a time. This covers the UI, the UX, how the engines work, and the sound. This file records what's done, what state the code is in, and what comes next.

---

## Where we are

Both programmes are **built and checked locally**, but **not committed**:

1. **The lesson experience** is complete.
2. **The gamification rebuild** (celebrations, quests, league, chests and awareness) is complete: all six phases.

Everything is sitting as uncommitted changes on the `staging` checkout. Nothing has been pushed or deployed. Sounds and haptics have not yet been tried on a real phone.

---

## Programme 3: Duolingo standard everywhere (started 2026-09-24)

The request: bring the whole student app up to Duolingo's standard, meaning the look, the flow, the feedback and a sound on every action. That covers streaks, XP and levels, the shop, course enrolment and unlocking, the paywall, the profile, settings, the stats bar, the menu, the phone's bottom nav, and the course community (which should work like a Skool group).

It's too big for one pass, so it runs in phases, like the first two programmes. Each phase ends typechecked, tested and checked in the browser.

| Phase | Scope | State |
|---|---|---|
| **0: Paywall plans** | Monthly and Yearly only. Weekly is gone from the unlock screen, the pricing ladder, coupons and creator previews. Monthly prices don't change. Existing weekly subscribers still renew. | **Done** |
| **1: App shell** | Duolingo left menu (uppercase items, an outlined active tile, a "More" menu with Settings, Switch to Creator and Log out), an icon-only rail on narrow laptops, and a phone bottom nav with Home · Leaderboards · Quests · Shop · Profile. The stats bar is on every main tab (phone and desktop). Each tab plays its own note on tap, with a haptic. The old sidebar stat cards and the link to the audio *config* page are gone. | **Done** |
| **2: Settings** | `/dashboard/settings`: Preferences (sound effects, music, vibration), Daily goal, Profile (name, username with a live availability check, email, password), Notifications (Tey reminders, per category, reminder time), Subscriptions (cancel with confirmation, retired weekly plans labelled), Log out and Delete account. Switches save instantly with a sound and a "Saved" tick. The profile gear opens it. | **Done** |
| **3: Streak** | Engine fixes (below), a `/dashboard/streak` screen (flame hero, repair offer, streak goal toward the next streak chest, a month calendar with joined runs and freeze and repair days, freezes, longest streak, Streak Society), a new top-bar streak card, "Repair for 150 coins" / "No thanks" on the Streak-lost scene, and a once-a-day evening nudge. The unused streak modal was deleted. | **Done** |
| **4: XP and levels** | One level helper (`lib/level.ts`, matching the server: 100 XP a level). The home level banner no longer makes up numbers (it assumed 1,000 XP a level and showed "Level 8, 880 XP" before loading), and it links to a new `/dashboard/level` page: level badge and bar, XP this week against the daily goal, the road of upcoming levels and the shop rewards they unlock, and how XP is earned. The XP and level popovers link there too. | **Done** |
| **5: Shop** | The shop is now Duolingo's list. Sections: Picked for you, Hearts (with your hearts shown), Power-ups, Limited time (the weekly deal and today's picks), Chests (odds behind "What's inside"), Style (cosmetics tabs, as a grid), Collections. A "Your stuff" stats card (coins, hearts, freezes, items owned, active boosts), goals and the locker sit in a right rail on desktop and slot into the list on phones. Rows have chunky price buttons. A locked or unaffordable button still answers a tap, with a soft "not yet" and the reason. The duplicate coin pill and the unrelated learning-stats rail are gone. **Streak Repair is now one thing**: the shop item and the streak screen share one restore and one ledger at the shop's price (450 coins), and the item shows "nothing to repair" when your streak is intact. | **Done** |
| **6: Profile** | Duolingo's order: identity header, then a chunky Statistics grid (streak, longest streak, total XP, lessons, days studied, and your current league), then achievements. The LinkedIn promo moved below them. The "Welcome back" dashboard greeting was removed from the profile. "Personal best" only shows when it's true. The page no longer shows a second stats bar on phones. The gear opens Settings. | **Done** |
| **7: Enrol, join, unlock** | Joining the community was already automatic (you're seated after lesson two, with a welcome scene). The enrolment wizard and the unlock and paywall scenes moved off the old generic beep onto studio cues: a note for every step, plan pick, rail switch and pay press; a new "enrolled" sound (doors open, marimba welcome); and a new "course unlocked" fanfare. The course page no longer shows a second stats bar on phones. | **Done** |
| **7b: Daily rewards** | A new scene shows the whole week: seven tiles climbing to the day-7 chest, days collected ticked, today glowing and bobbing. Tap CLAIM (OPEN CHEST on day 7): the server pays first, then the amounts count up, coins clink in, and the chest knocks and bursts on day 7, with confetti. It ends with "Come back tomorrow for …". **Server:** one rising 7-day ladder (10, 15, 20, 25, 30, 40, then 75 coins with 50 XP), sent to the app so the screen shows exactly what's paid. The claim is atomic, so two tabs can't both collect. The desktop rail's Daily Reward button uses the same scene. | **Done** |
| **7c: Art, shop, XP, profile, referrals** | **Art:** a Duolingo-style illustration set (flat shapes, a chunky darker lip, a white shine), generated by `frontend/scripts/gen-art.mjs` into `public/art/`. It covers 12 shop items (hearts, freeze, potions, repair, shield, vault, bronze/silver/gold chests), 7 achievement badges with a "LEVEL n" ribbon, and UI art (XP bolt, level hexagon, bag, gift). These are image files, not inline icons. **Bug:** the top-bar popovers were clipped by the home page's scrolling right rail (the streak card was cut in half). They now render in a portal. **Shop:** the illustrations are on every row and in "Your stuff", and the duplicate "Picked for you" list became a highlighted reason on the item's own row. Chests open Duolingo-style: tap three times, harder knocks each time, then a burst. **XP and level:** new Duolingo cards with the bolt and hexagon art, and the level page uses the hexagon. **Profile:** rebuilt from scratch as components (`components/profile/`): banner with equipped backdrop, avatar in the equipped frame with photo upload, edit sheet (name, live username check, bio, location), working follow/unfollow everywhere, a statistics grid with art, and achievements as badge families with a per-level detail view. **Referrals (new):** a stable code per learner and a `/signup?ref=` link. The invite is captured on any page and claimed after sign-up (new learners only, never your own). When the friend finishes their first lesson, both get 100 coins + 100 XP, paid once, capped at 50 friends, and the inviter gets a notification. The profile shows your link, WhatsApp and share buttons, and who has joined. Sign-up shows "A friend invited you". Needs the `20260925090000_add_referrals` migration (two new tables). | **Done** |
| **8: Community, friends, notifications** | **Speed:**
• Community, feed, post, comment and notification calls no longer pass through Next.js route handlers (a second hop plus a serverless cold start on Vercel). One edge rewrite replaced 17 pass-through handlers.
• Every community page reads through the SWR cache, so returning is instant.
• On the backend, community access checks (run before every like, comment or vote) are cached for 30 seconds, and creators no longer trigger 3 writes on every request.
• Likes, comment likes and moderation are optimistic.

**Skool UI:**
• A group header with cover, name, privacy, member and post counts, a facepile, and an **Invite** button that uses your referral link.
• Chunky tabs with icons.
• Category chips and colour-coded category pills.
• Post cards with Skool's **level number on each avatar** (from community points, sent with the posts).
• A rebuilt post page.
• A Members tab with levels and Follow buttons.
• A slimmer About and leaderboard rail.
• A My Communities grid.

**Friends:** the Community home has a Friends card (people you follow, their streaks, and classmates to follow), and following someone now notifies them.

**Notifications:** the bell and inbox share one cache and open instantly. A new notification shakes the bell with a chime. The inbox is grouped Today / This week / Earlier. System rows (like "Kemi joined with your invite") now read correctly.

**Sounds:** new like, post, comment and vote cues, plus a sound on every tab, chip, open and close.

**Fixed:**
• The Members list was readable by any signed-in user; it now requires membership.
• Menu red-dot badges caused a hydration error on every page.
• The fake "Friends activity" card (made-up people, Unsplash photos) was deleted. | **Done** |
| **8b: Profiles, feed, My Learning, leaderboards, community gate** | **Classmate profiles (new):** tap any avatar or name (posts, comments, members, leaderboards, friends lists, the feed) to open `/dashboard/u/:id`. It shows their streak, XP, league, level, achievements, the courses you share (with their progress), a "Follows you" tag, and a big FOLLOW / FOLLOW BACK button that flips instantly. It's backed by a new signed-in-only `GET /social/users/:id` (no email, lookup by id only), and a follow notification now opens the follower's profile.

**Comments are instant:** your comment appears the moment you send it (faded, "Sending…") and the server copy swaps in. On the backend, the comment and its counter are written in one round trip, and the XP reward settles afterwards. Post and comment likes are also one round trip.

**Art:** Duolingo-style like (red heart, grey when not liked), comment bubble, and gold/silver/bronze medals. Each post type (question, tip, win, resource, discussion, poll, announcement, challenge) gets its own illustrated badge, used on post cards, filter chips, the post page and the welcome scene.

**Feed and posts:**
• Images are now full-width (two side by side with "+N" when there are more).
• The post type is a chunky badge in the card's header.
• A liked post turns red.

**Community page:**
• An illustrated cover (post-type tiles floating on Teyro blue) when the course has no image.
• A bigger group mark, the description, and "Run by" the creator.
• A facepile with "learning together".
• A **Your level** chip that opens the leaderboards.
• Classroom now opens that course's lesson path on home (it used to open the old course overview).

**Leaderboards:**
• **Community:** your level card (ring, bar, points to the next level), one This week / This month / All time switch, a podium for the top three on medals, and highlighted "You" rows. Levels and how-to-earn-points use the art.
• **League:** medals for the top three, green and red rank numbers for the promotion and demotion zones, a highlighted "you" row, and past leagues in colour on the ladder. The zone line now reads the server's real promotion cut-off. It's tokens only now (the hardcoded hex colours are gone).

**My Learning:** rebuilt as Duolingo's course switcher. Your current course sits on top (the next lesson, a progress bar, CONTINUE, then Course map and Community); your other courses are below with SWITCH, which changes what home's path shows. It has loading, error and empty states.

**Community gate fixed:** the rule is "join after two lessons", but opening a community used to seat any enrolled learner straight away, skipping the rule and the welcome. Now nobody is seated before two finished lessons. Until then the page shows a Duolingo locked screen: lesson nodes (done, current, then the community), what's waiting inside, and CONTINUE LEARNING straight into the next lesson.

**Welcome scene:** now five steps. The new fourth step, **"Learning is better with friends"**, explains streaks, leaderboard races and cheering, with real FOLLOW buttons for classmates. It also uses the new art throughout. You can preview it at `/dev/tey-scenes` → Community. | **Done** |
| **8c: Explore, and My Learning's rail** | **Explore rebuilt:**
• A chunky search with a clear button.
• Category chips with an icon each, most-populated first.
• A level switch (Any level, Beginner, Intermediate, Advanced).
• With no filter, a featured course: the most-learned one you haven't added.
• Cards with a tinted cover and art when there's no image, a FREE / PREMIUM / ADDED tag, creator, and real stats (lessons, time, learners, rating). On phones they become Duolingo rows.
• Courses you have show your progress and CONTINUE straight into the next lesson.
• Loading, error, empty-catalog and no-results states.
• A sound and a haptic on every chip, card and button.
• Data now comes through the shared SWR cache (enrolments share a key with home and My Learning). The hardcoded star colour is gone.

**Right rail:** a new shared `LearnerRail` (level, daily quests, chest), like home's. My Learning and Explore use it; the legacy `RightSidebar` is gone from both (the learn pages still use it). | **Done** |
| **9: Course page, enrolment, auth, start, app opening, new logo** | **Course page** (`/courses/[id]`) rebuilt:
• A hero with the cover, title, creator and real stats as chunky chips.
• Tey's line (what's free, or what's next).
• "What you'll learn".
• A course path with coloured unit banners, lesson nodes, FREE and XP tags, locked lessons, and a chest per unit.
• A sticky start card with what's included, plus the creator card. On phones the CTA is pinned above the bottom nav.
• CONTINUE goes straight to your next lesson.
• Loading, not-found and error states.
• Bug fix: guests were sent to `/login?redirect=`, which login ignores; it now uses `?next=`.

**Enrolment scene** rebuilt, in three beats with a progress bar and the lesson player's action bar:
1. Tey waves; the course tile and stat tiles pop in, each with a tick.
2. Unit 1 as a mini path. START COURSE enrols you; if that fails, a red sheet with TRY AGAIN.
3. "You're in!": confetti, the enrolled fanfare, a big haptic, and the welcome reward counting up. **START LESSON 1 goes straight into the first lesson**, and the course becomes home's course.

A shared `CourseCover` gives a course the same tint and art everywhere.

**Welcome / log in** (`/login`, `/onboarding/0`): one responsive screen instead of separate phone and desktop copies.
• Welcome view: Tey on his platform, GET STARTED and I ALREADY HAVE AN ACCOUNT.
• Log in: Duolingo's grouped fields, FORGOT? inside the password field, and Google.
• Password reset, then a "check your inbox" screen.
• Sounds and haptics for success and errors; the error line shakes.

**Sign up** (`/signup`): "Create your profile" in the same style. The fake password-strength meter (always 25%) became an honest "at least 8 characters" check. Onboarding step 13's controls now use the same pieces. The marketing footer no longer shows on `/login` or `/signup`.

**Start page** (`/start`):
• An animated Home Screen where the Teyro icon drops in, a headline and benefit chips.
• The iOS guide: a green progress bar, a back arrow, a "tap trail" of every control (ticks as you go), and Tey saying each hint.
• The browser-menu guide: numbered steps.
• The installed screen shows the icon landed on the Home Screen.
• All tokens, no emojis.

**App opening:** Android's splash comes from the manifest (deep brand blue plus the icon). iOS gets launch screens for 18 iPhone and iPad sizes (`public/splash`). `/launch` became a matching in-app splash: Tey's tile pops, and it hands off after about 0.85s, prefetching the next page meanwhile. In a normal browser tab it redirects straight away.

**Logo and icons:** the new Tey icon (`public/Tey Logo and icons`) is the favicon, the apple-touch icon, the PWA icons and a full-bleed maskable icon, all built by `scripts/gen-app-icons.mjs`. It's also the logo in the student rail, used alone and never paired with the "TEYRO" wordmark. Theme colour is brand blue. | **Done** |
| **10: Reminder notifications** | **When Teyro asks** (`lib/push/askPolicy.ts`, tested): three times at most, and never again once reminders are on or blocked.
1. The last onboarding step.
2. Twice more in the app, each **right after a finished lesson**. The first waits at least a day after the onboarding ask; the second waits 3 days after the first.

**Install first:** in any browser tab that can install Teyro, the ask is "put me on your Home Screen" before reminders.
• Android and desktop Chrome: one-tap install, then straight on to the reminders ask.
• iPhone and browser menus: the start page's guides, inline.

An install ask followed by opening the installed app gets the reminders ask at the next lesson, with no wait.

**In the app:** a new REMINDERS celebration scene, queued by `ReminderAskWatcher`:
• "Can I remind you?", with Tey holding a bell and a drawn lock-screen notification ("Keep your 4-day streak alive!").
• TURN ON REMINDERS fires the browser prompt inside the tap. NOT NOW leaves quietly.
• Result screens: on (a cheer), blocked (points to Settings), or failed (one retry).

**Onboarding step 14:** install-first for every installable tab. It no longer bounces iPhone users out to /start; the guide is inline. It shows the notification preview, and a short placeholder while it checks the device (no flash of the wrong screen).

**Fixes:**
• Chrome's install prompt is now shared across the app; before, a prompt mounted later could never use it.
• `useTeyPush` hung forever with no service worker; it now times out.
• A finished lesson now updates `lastLessonCompletedAt` in memory.
• The old iPhone-only home card (`PwaPushNudgeCard`) was removed.

**Try it:** `/dev/tey-scenes` → Reminders (turn on / install first). | **Done** |
| **11: Homepage, header, footer** | **Homepage rebuilt** (`components/homepage/v3`): Coddy's layout in Duolingo's style, positioned on *finishing* coding and AI skills. The sections are:
1. **Hero:** "The fun way to finish learning to code", GET STARTED and I ALREADY HAVE AN ACCOUNT, and the app's home path in a phone. Floating cards show a 128-day streak, #1 in the Diamond League and "+20 XP"; Tey cheers.
2. Launch badges.
3. **Pick your track:** the Coding and AI cards with their real topics.
4. **Why Teyro works:** three pillars.
5. **Seven feature rows**, each a drawn app screen showing success:
   • a code question answered right;
   • the four-step method;
   • a 128-day streak calendar, with a freeze that saved day 11;
   • #1 in Diamond;
   • friends' streaks and a cheered win;
   • all daily quests done, with a chest, coins and Level 14;
   • Teyro on the Home Screen with a reminder notification.
6. **Who it's for:** students, career switchers and course restarters.
7. **Creators band.**
8. **Updated FAQ.**
9. **Final CTA.**

Every claim was checked against the code: Streak Society is 7 days, the top 10 of Diamond reach the Tournament, and paid courses have 2 free lessons. There are no invented user counts, ratings or quotes.

**Header:** the Tey mark alone, six links with scroll-spy, LOG IN and GET STARTED, sticky, and a phone menu. The blog, terms and privacy pages lost their old fixed-header padding.

**Footer:** Teyro blue, the Tey mark with a white ring, the promise, GET THE APP, four link columns, socials and support email.

**Site metadata and share image:** the new positioning, replacing "learn anything". | **Done** |

---

### Programme 3 decisions and fixes worth knowing

- **Weekly plan retired.** A stale client sending `WEEKLY` gets a 400 rather than being silently charged the monthly price. Old weekly subscriptions still renew, and coupons can no longer target weekly.
- **Streak engine fixes.**
  - Streaks now reconcile in one place (`StreakService.reconcile`, with a compare-and-set).
  - Repair was exploitable: anyone could pay to jump to their *longest* streak. It now only restores a streak that actually broke, within 48 hours, once.
  - Freezes were being spent a second time, unlogged, by the daily-reward check.
  - The calendar marked the day a freeze was *spent*, not the days it covered.
  - Breaks and repairs are recorded in `reward_transactions`, so no migration was needed.
- **Economy changes to review:** the streak repair price moved from 150 to 450 coins (the shop's price), and the daily-reward week pays 215 coins instead of 150.
- **Screens checked** at phone and desktop sizes with mocked data. The logged-in flows still need a real run-through.

---

## Programme 4: the creator side (started 2026-09-26)

The creator studio gets the same treatment as the learner app. The `/teach` marketing page waits until the studio itself is done.

| Phase | Scope | State |
|---|---|---|
| **1: Creator login, sign-up, onboarding and profile** | **Launch tracks:** one shared list, `lib/creator/categories.ts`, with Coding and AI only. Topics are the learner interests, so what creators teach matches what learners pick. The create-course wizard, the builder's setup form and settings all use it. New courses are saved as "Coding" or "AI", and learner course lookups now include those names.<br><br>**Login** (`/creator/login`): the learner welcome screen with creator copy and art (Tey with a tablet, "Teach Coding and AI, the fun way"). Logging in, Google and forgot-password all go through as INSTRUCTOR.<br><br>**Sign-up:** a shared `SignupFlow` (used by `/signup`, `/creator/signup` and onboarding) with the 6-digit email code inline, so nobody lands on a log-in wall after signing up. An existing account is asked for its password and gets its creator profile added. The old creator auth pages (forgot, reset, verify-pending, verify-failed, check-email) are rebuilt on the same pieces, with sounds and haptics.<br><br>**Onboarding:** 16 steps became 14, built on the learner flow's pieces (Tey talking and reacting, option cards, the action bar):<br>1. welcome<br>2. name<br>3. creator type<br>4. Coding or AI<br>5. topics<br>6. teaching experience<br>7. audience<br>8. what you already have<br>9. main goal<br>10. weekly time<br>11. **your creator plan** (track and topics, the four-step lesson, a first-course pace from your hours, and a goal fact such as "you keep 70%" or "first 2 lessons free")<br>12. account (or "Open my studio" when already signed in)<br>13. **creator profile** (username checked live, headline ideas, photo, live preview)<br>14. **studio ready** (confetti and fanfare, then CREATE MY FIRST COURSE with the track pre-filled)<br><br>Every answer is now saved. It used to drop the creator type and existing content, and read step 13 from a field that was never written.<br><br>**Become a creator:** the learner More menu has it, and `POST /auth/become-creator` adds the creator profile to the same account with no second password.<br><br>**Profile:** a rebuilt public page (`/creator-profile/:username`) with the learner profile's look: banner, Founding creator and track badges, instant FOLLOW, statistics tiles, courses and About with links. It also has loading, not-found and error states. The studio has a new **Profile** page: camera upload, an EDIT PROFILE sheet (name, username, headline, about, track and topics, links) and a profile-strength checklist.<br><br>**Sounds:** new studio cues for onboarding opening, the plan, profile saved and studio ready (on `/dev/lesson-sounds`).<br><br>**Fixed along the way:**<br>• Logged-out visitors to `/creator-profile/*` were being sent to the creator login (a prefix match in `proxy.ts`).<br>• A signed-in viewer never saw FOLLOWING, because the public profile route had no optional auth.<br>• The provider check now also covers `useAudioContext`.<br><br>**Creator settings** (`/creator/settings`): rebuilt as the learner's Duolingo settings, using the same pieces, which are now shared in `components/settings`.<br>• Preferences: sound effects and vibration.<br>• Profile: links to the studio Profile page and to your public page.<br>• Privacy: who can see your profile (Everyone, Teyro members, Only me), show location, show links. Each saves instantly with a tick.<br>• Payouts: a link to Earnings.<br>• Account: email, change password, switch to learning, log out.<br><br>Profile visibility is now actually enforced by the backend; a hidden page returns 404. The old 7-tab page is gone. Skills, teaching levels, experience, education and certifications stay in the database, but weren't shown anywhere learners look. Location moved into the profile edit sheet.<br><br>**Migrations:** `20260925090000_add_referrals` and `20260926090000_add_profile_creator_onboarding` were applied to the staging database on 2026-09-26. | **Done** |
| **2: Course building for Coding and AI** | **Lesson content v2** (`lib/lesson/blocks.ts`, enforced again in `backend/src/lesson/lesson-blocks.util.ts`):<br>• Learn is a deck of bite-size cards: explanation, code sample (highlighted, copyable), video, image, audio, tip, and a quick check that costs no hearts.<br>• Apply exercises are checked instantly on the device: multiple choice, predict the output, pick the better prompt, fill in the code or blank, find the bug, put lines in order, and match pairs.<br>• **Videos over 15 minutes are refused**, before upload and on save, with a message to split them up.<br>• **Deepen is optional.**<br>• Old lessons still play and open in the builder, converted to v2.<br><br>**Learner player:** Duolingo screens for every card and exercise, with sounds, haptics and "fix your mistakes". Try them on `/dev/lesson-blocks?track=coding` or `?track=ai`.<br><br>**Lesson builder** (rebuilt, full-screen):<br>• A step rail showing each step's state.<br>• Cards and exercises you can drag to reorder, with exercise menus written per track (Coding: predict the output, find the bug…; AI: pick the better prompt, order the workflow…).<br>• A live phone preview where exercises are playable.<br>• Autosave with conflict handling and in-browser recovery.<br>• "Play lesson" (`/preview/lesson/:id`) and a publish checklist.<br><br>**Course wizard:** personalised from onboarding (track and topics pre-picked), with level, title ideas, and an optional starter outline.<br><br>**Course workspace** (`/creator/courses/:id`) replaces the old builder, manage and detail pages:<br>• Curriculum: modules and lessons, FREE tags on the first two, play and reorder.<br>• Details: track and topic, level, outcomes, cover, and price with a Monthly/Yearly preview.<br>• Review & publish: stage track, a checklist that mirrors the server, reviewer notes, submit, publish and unpublish.<br><br>**Courses list** rebuilt with status, readiness bars and filters.<br><br>**Server changes:**<br>• Submitting for review now also needs a Coding or AI track and a real description.<br>• Image uploads are allowed (10MB) for Learn cards. | **Done** |
| **3: Analytics, learners, community, earnings, coupons** | The goal: a creator can see what's happening with their learners and their course, and step in, all from the studio. Every page shares one set of studio pieces (`components/studio`): chunky stat tiles, Tey's speech bubble, a course switcher (remembered per device, `?course=` wins), bottom sheets, single-hue charts with hover tooltips and a hidden table for screen readers, and loading, error and empty states throughout.<br><br>**New tracking (the lesson player):** the server used to see only finished lessons. Now the player also reports:<br>• opening a lesson;<br>• leaving part-way, and where (Learn card *n*, exercise, Reflect or Deepen), whether by the quit sheet, out of hearts, closing the tab or the back button;<br>• which Apply exercises were missed on the first try (first completion only).<br>This also switches on the Students "stuck on a lesson" rule, which could never fire before.<br><br>**Analytics** (`/creator/analytics`), one course at a time, with 7, 30 or 90 days:<br>• **Tey's read**: up to five things that need you, each with its action. The biggest drop-off lesson (see why), quiet learners (nudge them all), unanswered questions (answer), a hard lesson, nearly-finished learners (cheer), learners stuck at the paywall (make a coupon), a lesson that runs long, and wins.<br>• Stat tiles: learners, active, lessons finished and finished course, with change against the last period.<br>• **The course path as learners see it**: unit banners and lesson nodes, each showing finished out of opened, "stopped here", who is on it now (faces), first-try accuracy, time against plan, and a flag for the drop-off, tough or long lesson. A paywall marker sits on the first locked lesson.<br>• Activity (lessons finished or new learners), when learners study (weekday and part of day, in each learner's own time zone, with a "post announcements just before" tip), reviews, and a rail with community, paying learners and the course link.<br><br>**Lesson close-up** (`/creator/analytics/:course/lessons/:lesson`):<br>• opened, finished, time and first-try accuracy;<br>• **where they stop**;<br>• **every exercise's first-try miss rate**, with FIX jumping straight to that exercise in the builder (`?phase=apply&block=`);<br>• who is stuck on it now (nudge one, or all);<br>• the community questions linked to it.<br><br>**Nudge and cheer (new):** a creator can send a short note to one learner or a whole group. `{first}` becomes each learner's first name, and there are three starting ideas for each. It arrives in the learner's inbox (new CREATOR_NUDGE and CREATOR_CHEER rows) and on their phone if their reminder settings allow (push switch, category, quiet hours). Tapping it opens their next lesson. Limits: one nudge per learner per course every 3 days, one cheer a day, 50 learners per send, and only your own enrolled learners. The studio shows "Nudged 2d ago".<br><br>**Learners** (`/creator/students`): "Needs you" (quiet learners to nudge, nearly-finished to cheer) sits on top of the roster, which has segment chips with counts, search, sort, and Duolingo rows (streak, lessons, last active, progress bar, NUDGE or CHEER). **Learner page:** profile-style header with NUDGE and CHEER, streak, lessons, time, consistency and pace, each of your courses (where they are, what's next), when they learn, where they struggle, their journey, and "Between you" (your notes and their reviews).<br><br>**Community** (`/creator/community`, new): the creator runs each course community as its admin.<br>• POST: announcements, challenges or discussions, straight to members (who are notified).<br>• Tabs: **To answer** (questions without your reply), Recent, Pinned and Announcements. Each has pin, lock and remove, and opens the thread to reply from the studio.<br>• Members: level, streak and joined date, with **mute** for a day, a week or 30 days. A muted member can read and react but not post or comment, and the server enforces it.<br>• About: the description.<br>• Learners now see a **CREATOR** badge on the creator's posts and comments.<br><br>**Earnings** (`/creator/earnings`), a wallet:<br>• Ready to cash out, big, with your share ("You keep 70%", plus a Founding creator tag when it applies).<br>• Clearing, on its way, earned all time and paid out.<br>• **CASH OUT** sheet (Everything or Half, the minimum shown, a cheering finish with a coin sound).<br>• Earnings trend (weeks, months or years), by course, and activity grouped by day with coupon and fee lines and Show more.<br>• Payouts with a 4-step progress bar and cancel, the payout account (masked) with an edit sheet, and CSV reports.<br><br>**Coupons:**<br>• Coupons are drawn as **tickets** (discount stub, code with copy, where it applies, when it ends, uses against the limit).<br>• Making one is four steps with a live ticket and before/after plan prices (the discount is on the first payment). It ends on a **share it** screen: copy the code or a link.<br>• **Coupon links (new):** `/courses/:id?code=LAUNCH20` saves the code for 14 days, Tey mentions it on the course page, and the paywall fills it in and checks it.<br>• Coupon page: uses, what learners paid, discount given and what you earned; share links; every use; pause or resume; change the end date and limit; end or delete.<br><br>**Studio menu:** Analytics, Learners (was Students), Community (new), Earnings and Coupons. The three "Soon" items (Reviews, Resources, Announcements) are gone; reviews live in Analytics and announcements in Community. **Red dots** on Learners and Community count quiet learners nobody has nudged and questions waiting for you.<br><br>**Sounds:** studio cues for a nudge (a knock and a bell), a cheer (claps and a run), a coupon made (a ticket tearing) and cash out (coins and a ka-ching), on `/dev/lesson-sounds`.<br><br>**Fixed along the way:**<br>• **Every studio page rendered without its sidebar**: the full-screen rule matched `/create` inside `/creator/…`. It now matches only the create wizard.<br>• Creator **announcements and challenges could never be posted**: the post form's validation only allowed learner post types, so they were rejected before the creator check.<br>• The old analytics' **completions trend was always empty**: it filtered completion events on the wrong field.<br>• Per-course "last active" was platform-wide, so a learner busy in someone else's course looked active in yours. The new pages use activity in *this* course.<br><br>**Migration:** `20260927090000_add_creator_insights` (three columns on `user_lesson_progress`, `mutedUntil` on `community_memberships`, and a new `creator_nudges` table), applied to the staging database on 2026-09-27. | **Done** |

---

## What we accomplished

### Programme 1: The lesson experience

| Phase | What changed |
|---|---|
| **A: Player** | The lesson player was rebuilt Duolingo-style. |
| **C: Steps** | The Learn → Apply → Reflect → Deepen steps got Duolingo-style flow and feedback. |
| **D: Finish** | The finish screens now run lesson complete → streak → quests → league → unit, with a bigger Tey on lesson complete. |
| **E: Moments** | Milestone moments: personal bests and named streak milestones. |
| **B: Sounds** | A studio sound engine (`lib/audio/studio.ts` + `lib/audio/lessonSounds.ts`) covers everything from tapping a lesson on the path to the finish fanfare. It's all in one musical key and built from bells, marimba, pops and brass, with no audio files. |

### Programme 2: The gamification rebuild

These decisions were locked at the start:
- **League:** real learners only. Everyone active shares one weekly league until there are enough learners, then it splits into leagues of about 30.
- **Lucky wheel:** folded into chests.
- **Quests:** we switched to Duolingo's model, with Daily Quests plus a Monthly Challenge.
- **Pop-ups:** fewer of them.
- **Attention screens:** memorable, with Duolingo-style sound.

**Phase 1: Awareness (replacing the "Herald" banners)**
- A **notice** now slides in from the top: a white card with a draining timer that you can swipe away. It's `lib/awareness/notices.ts` + `NoticeHost`.
- **Red dots** on the Quests, Leaderboards and Profile tabs show when something is waiting.
- Full-screen moments are kept for big events only, and only on calm pages.
- **Removed:** the Herald banners, the missions pop-up, the daily-mission celebration pop-up, and the welcome banner. The welcome banner is now a notice, shown only when the streak is at risk or was just lost.
- The top bar's stats **bounce with a "+N"** when a value goes up, and hearts shake when you lose one.

**Phase 2: League**
- **Shared league:** it's used while there were fewer than 60 active learners the previous week. No database migration was needed.
- **After each lesson:** a mini leaderboard **animates your climb** and names who you passed.
- **Leaderboards page:**
  - refreshes every 30 seconds;
  - rows animate when positions change;
  - shows up/down arrows for movement since your last visit;
  - has a "your race" card.
- **Movement notices:** rank changes arrive as notices. Only reaching #1 or entering the promotion zone gets a full screen.
- **League result screens:** new ones for "stayed" and "tournament exit".
- **Studio sounds:** join, climb, top, promoted, stayed and demoted.

**Phase 3: Daily Quests**
- **Quests:** three a day, one easy, one medium and one hard, picked from a pool of 15 templates. New quest types:
  - correct answers;
  - an accurate lesson;
  - a perfect lesson;
  - minutes learned.
- **Look:** Duolingo-style rows with a chunky progress bar and a **chest at the end of each row**.
- **Where they show:** on home and at the top of the Quests page, with their own after-lesson screen.
- **Faked data removed:** the old missions card showed fake missions when loading failed; the new card doesn't.

**Phase 4: Monthly Challenge**
- **Month badges:** each month has its own badge with a name, glyph and colour.
- **Challenge card:** shows milestone chests and a goal-day calendar.
- **Badge shelf:** past months' badges.
- **Month complete:** a full-screen "badge earned" moment.
- **After a lesson:** progress on the monthly challenge appears on the quests screen.

**Phase 5: Chests (the lucky wheel is gone)**
- **Every chest opens with the Rive chest:** daily, streak, quest and monthly milestone chests. They all go through `hooks/useRewardChest`, and the reward is decided on the server first.
- **Streak chests** replace the wheel, earned at 3, 7, 14, 21 and 30 days, then every 30 days. They're stored as normal chest rows, so no migration was needed, and there's a new `GET /chest/pending` endpoint.
- **Daily Chest card:**
  - three states: locked, ready (with the idling Rive chest), and opened (shows the reward and a countdown);
  - streak chests are listed underneath;
  - it sits on the home page on desktop and on the Quests page; the Quests page is its only place on phones and tablets.
- **Other chest touches:**
  - the after-lesson streak screen shows **"streak chest earned"** with an open button;
  - the Quests tab's red dot also counts unopened chests.
- **Chest-opening screen rebuilt:**
  - a bright stage;
  - new studio sounds: landing, knocks that climb with each tap, the lid bursting, a sound for each reward type, coin clinks, and a "cha-ching";
  - a haptic rhythm for each step;
  - a big reward pill that counts up.
- **Removed:** the lucky-wheel card and pop-up, and the old "Mystery Chest" card, which had a made-up "10/10" bar. The homepage's "Lucky Wheel" tab was removed too.

**Phase 6: Celebration screens**
- **Bright stage:** every screen now has the Duolingo look: a white background, a warm glow, dark headlines, chunky 3D buttons, white speech bubbles, and orange streak days.
  - It covers level up, streak (extended, saved, lost), welcome back, achievements, reward claims, section complete, section unlocked, course progress, course complete, and the community welcome.
  - It also covers the shop scenes: purchase, item unlocked, chest reveal and collection complete.
  - All colours come from brand tokens (`--sc-*`), with no hardcoded hex.
- **Studio sounds for every screen**, for example:
  - level up: a two-octave bell run into a double chord;
  - achievement: a shimmer into a medal "ting";
  - welcome back: a warm hello instead of a sad tune;
  - streak freeze: icy bells;
  - lost streak: a soft fall, then a small lift;
  - section unlocked: the lock rattles, then gives;
  - shop purchase: a "ka-ching";
  - coins flying into the top bar: rising clinks.
- **Haptics:**
  - `celebrationHaptic('big' | 'win' | 'soft')` replaces a flat one-second buzz.
  - Screens no longer play a button click on top of their own sound.
- **Tey's lines** on these screens no longer use emojis.
- **Fixed:**
  - the level badge was stuck on the old level;
  - Tey cheered on "Streak lost";
  - course progress showed "50 %" with a gap;
  - the confetti's second burst sometimes didn't fire.
- **Removed:** two unused streak pop-ups.

---

## Current state

| Item | State |
|---|---|
| Code | Programmes 1–2 complete, Programme 3 through phase 11, Programme 4 phases 1–3; all **uncommitted** on `staging` |
| Typecheck | Clean |
| Lint | Clean on changed code; older issues in untouched lines remain |
| Frontend tests | 458 of 459 pass. The one failure (`lib/pwa/__tests__/platform.test.ts`) was already failing and is unrelated. |
| Backend tests | 84 suites, 1,124 tests, all pass (new: nudges, course pulse, community mute, lesson pings) |
| Browser checks | Every screen checked at phone and desktop sizes with fake data |
| Real device | **Not yet:** sounds and haptics haven't been heard or felt on a phone |
| Database | `20260925090000_add_referrals` and `20260926090000_add_profile_creator_onboarding` are applied on staging (2026-09-26), and `20260927090000_add_creator_insights` (2026-09-27). Production gets them through the deploy action. The staging DB also has `20260719120000_add_what_you_will_learn`, which isn't in the local migrations folder; it came from another branch and needs reconciling. |
| Deployed | **No** |

**Where to check it yourself:**
- `/dev/tey-scenes` triggers every celebration screen, including level up, welcome back, reward claim and the shop scenes.
- The dashboard and the Quests page show the chest card, daily quests and the monthly challenge.

**Known limits:**
- The streak-chest button on the after-lesson streak screen hasn't been checked during a real lesson on a streak-chest day. Its logic has its own tests.
- The shop's chest reveal still uses its own drawn chest, with the Rive chest's sounds. It opens by itself rather than by tapping.
- Some older Tey lines outside the celebration screens still have emojis: analytics, shop tips and WhatsApp copy.
- The old lucky-wheel tables are still in the database, unused.
- **iOS install screenshots show the old cube icon:** `public/install-guide/ios/*` are real photos, and the Add to Home Screen sheet in them shows the old icon. They need re-shooting on a phone.
- **Old cube wordmark still on the marketing site and creator side:** `teyro-logo-blue.png` is still used by the marketing header and footer, the creator app, and the blog's JSON-LD. The student app no longer uses it.
- **Reminders need VAPID keys on the backend.** Without them, turning reminders on ends on the "Almost there" screen. The ask budget is per device (localStorage), since notification permission is per device.
- **Splash and icons not yet seen on a real device.** Android needs a fresh install to pick up the new manifest.
- **Creator analytics start empty for opens and quits.** Lesson opens, quit points and first-try misses are only recorded from this release on, so older lessons show finish counts but no "where they stop" or exercise miss rates until learners play them again.
- **Learner segments are platform-wide.** The Learners roster's segment, streak and progress come from the older Students service, which looks across all of a creator's courses; the course pulse (Analytics, "Needs you") is per course.
- **Unused analytics endpoints.** The old hub's instructor-wide endpoints (learners, engagement, courses, revenue, feedback, insights) and the Students overview/insights endpoints no longer have a page. They're harmless; remove them in a cleanup pass.
- **Creator nudges need VAPID keys to reach phones**, like Tey's reminders. Without them they still land in the inbox.
- **Hydration warning (app-wide, existing):** on a hard load with a warm SWR cache, `PersistedCacheSeeder` fills the cache after the root has hydrated but before the page segment has. SWR pages then render data where the server rendered a skeleton, and React falls back to client-rendering that page. Users see nothing wrong, but it logs a warning in dev (seen on My Learning and Explore). The fix belongs in `components/providers/SWRProvider.tsx`.

---

## Next steps

1. **Test on a phone.** Spend about 15 minutes with `/dev/tey-scenes`, one real lesson, and a chest open. Listen to the sounds and feel the haptics, then tune anything that feels off.
2. **Commit and open a PR.** Move the work to a feature branch, split it into commits by phase, and open a PR into `staging`. The rule is no direct pushes to `main`.
3. **Test on staging.** After the staging deploy, run through the real flows: a lesson, quests, a chest, the league.
4. **Next phase: the streak engine, Duolingo-style.** It covers:
   - an evening streak-at-risk nudge;
   - a streak screen with a month calendar that shows freeze use;
   - repair flows;
   - streak goals tied to the streak chests.
5. **Then: unit and path screens.** Unit intro and unit-complete moments, review nodes, and clearer checkpoints on the home path.
6. **Small follow-ups:**
   - make the shop's chest reveal tap-to-open with the Rive chest;
   - remove the remaining emojis from Tey's lines;
   - remove the unused lucky-wheel tables with an additive migration.
