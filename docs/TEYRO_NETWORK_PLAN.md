# The Teyro Network — complete build plan

> 2026-10-27. Facebook's mechanics (identity → graph → feed → interaction →
> notifications), optimised for one outcome: **a person causes another person
> to learn**. North star: *lessons started because of another person, per DAU*.

## 0. The one rule

Every social act must also be a learning act. If an interaction doesn't teach,
practise or start a lesson for somebody, it is cut or redesigned.

Guardrails that never move:

- Never rank, rate or compare people (no Facemash). No public follower counts.
- The learning path stays the home tab; the network wraps learning, never replaces it.
- The feed ends (~15 cards → "You're caught up" → next lesson).
- Cheers never pay Coins; reputation comes from help that worked.
- Nudges are templated (no free text), rate-limited, buddies only. DMs are buddies-only and ship only with block/report/moderation.
- Every push goes through `TeyNotifyService` (dedupe → bell → policy gate → ledger → push).

---

## 1. Audit — what already exists (2026-10-27)

| Piece | Where | State |
|---|---|---|
| Follows | `UserFollow`, `backend/src/social/*` | Working. Follow/unfollow, counts, followers/following, FOLLOW bell row (1/day/pair) |
| Classmates | `SocialService.getClassmates` | Working but **unranked, `take: 20`, and returns one row per shared enrolment — a classmate in two shared courses appears twice** |
| Learner profile | `GET /social/users/:id` → `/dashboard/u/[userId]` | Working: stats, shared courses, follow state. No activity timeline |
| Followers/following lists | `SocialService.getFollowers/getFollowing` | Unbounded `findMany` (no pagination) |
| Community posts, comments, likes | `backend/src/community/*`, `Like` | Working; `Like.entityType` is a free string |
| Ranked community feed | `community/feed.service.ts` | Working — engagement + recency + affinity, community posts only |
| `ActivityFeed`, `FriendActivity` tables | schema + migration `20260727_add_social_and_community_tables` | **Dead: nothing writes or reads them** |
| Notification hub | `tey/notify/*` (catalogue, caps, quiet hours, push, ledger) | Working, reusable as-is |
| Domain events | `lesson.completed`, `learning.activity.recorded`, `enrollment.created`, `achievement.unlocked`, `streak.freeze.used` | Available to listen to |
| Daily activity | `UserDailyActivity (userId, date)` | Enough to compute a shared buddy streak with no new state |
| Leagues, share cards, community gate | `league/`, `share-card/`, `community` | Live; network reuses, doesn't duplicate |

Decision: **reuse** `ActivityFeed` (activity cards) and `Like` (`entityType: 'ACTIVITY'` = a Cheer). Fan-out on read, so `FriendActivity` stays unused (fan-out-on-write is unnecessary below ~100k users).

---

## 2. The graph — six layers

| Layer | Size | Stored as | Phase |
|---|---|---|---|
| **Study Buddies** | max 5 | `StudyBuddy` (new; request → accept) | 1 |
| **Cohort** | ~30–50 | Computed: same course, enrolled within ±7 days | 1 (suggestions), 2 (cohort view) |
| **Follows** | unbounded, one-way | `UserFollow` (existing) | exists |
| **Squad** | 3–6 | `Squad`, `SquadMember` (new) | 4 |
| **Course community** | everyone | existing communities | exists |
| **Mentor links** | directional | Computed: passed lesson X ⇒ can be asked about lesson X | 3 |

Affinity weights (ranking + notifications): buddy 1.0 · squad 0.8 · cohort 0.6 · follow 0.5 · classmate 0.35 · community 0.2.

---

## 3. Feed content

| Card | Source | Phase |
|---|---|---|
| Started a course | `enrollment.created` | 1 |
| Finished a lesson (first completion) | `lesson.completed` | 1 |
| Streak milestone (3, 7, 14, 30, 50, 100, 200, 365) | `lesson.completed` streak count | 1 |
| Achievement unlocked | `achievement.unlocked` | 1 |
| Finished a course / certificate | certificate issuance | 2 |
| Proof of work (runner output, live page) | runner "share" action | 2 |
| Question pinned to a lesson step | network post | 3 |
| Review card (your own due question) | review queue | 3 |
| Duel ("Ada scored 9/10, beat her") | quiz result | 4 |

Every card has one primary action: **Cheer**, **Learn this too / Continue**, **Help**, **Accept duel**.

---

## 4. Ranking

```
value = 10·P(lesson start ≤30 min) + 6·P(help) + 4·P(reply) + 2·P(play) + 1·P(cheer) − 8·P(hide)
score = value × affinity × freshness × nearPeer
```

- **Phase 1 (heuristic):** `score = affinity × typeWeight × freshness × learnIntent`;
  `freshness = 0.5^(ageHours/24)`; `learnIntent` = 1.6 if the card's course is one the viewer is enrolled in, 1.25 if not but it's a course start; type weights: course start 1.2 · milestone 1.3 · achievement 1.0 · lesson 0.8. Re-rank: no author more than twice in a row; 15-card cap → caught-up card.
- **Phase 2:** log `network_events` (impression, cheer, open, lesson_start_from_card) with card id + position.
- **Phase 5:** weekly script fits logistic regression per outcome from those logs; weights stored in a config row; nearPeer factor from relative progress in a shared course.

Candidate window: 7 days. Candidate sources: buddies, follows, classmates (shared enrolment). Fan-out on read; Redis cache later if the query gets slow.

---

## 5. Notifications

All through `TeyNotifyService`, new audience `network` (own daily push cap: 4), new pref `networkActivity`.

| Kind | Tier | Trigger | Throttle | Phase |
|---|---|---|---|---|
| `BUDDY_REQUEST` | 1 | someone asks you | none | 1 |
| `BUDDY_ACCEPTED` | 2 | your request accepted | none | 1 |
| `BUDDY_LEARNED` | 1 | buddy's first lesson today, you haven't learned today → "your buddy streak needs you" | 1/pair/day | 1 |
| `BUDDY_NUDGE` | 1 | buddy taps Nudge (templated, 1/buddy/day) | none | 1 |
| `NUDGE_WORKED` | 2 | nudged buddy learns within 24h → tell the nudger (bell only) | 1/pair/day | 1 |
| `NETWORK_CHEER` | 2 | cheers on your card; bell row collapses daily ("Ada and 2 others") | push 1/3h | 1 |
| `BUDDY_STREAK_ENDING` | 1 | 20:00 local, shared streak ≥2, one of you hasn't learned | daily | 2 (Tey scheduler rule) |
| `INSPIRED` | 2 | someone enrolled from your card → "Ada started Python because of you" | none | 2 |
| `HELP_REQUEST` / `HELP_ANSWERED` / `HELP_WORKED` | 1/2 | lesson-step questions routed to people who passed it | per-thread | 3 |
| `SQUAD_*` | 1 | squad 1 lesson short; chest won | daily | 4 |
| `DUEL_RECEIVED` / `DUEL_RESULT` | 1/2 | duel sent / finished | per-duel | 4 |
| `BUDDY_LIVE` | 3 | buddy is learning now → co-learn | 1/day | 4 |
| Weekly network digest | 4 | email / WhatsApp opt-in | weekly | 2 |

Rules: every push opens the exact thing (lesson, card, buddy); quiet hours + per-type throttle + audience cap are inherited from the hub; auto-backoff (5 ignored pushes of a kind → bell only) lands in phase 5. Push permission ask: on accepting a buddy ("Get told when Ada needs you") — phase 2, via `lib/push/askPolicy.ts`.

---

## 6. Growth loops

- **Aha metric hypothesis:** 1 buddy within 7 days of signup (measure D30 retention of buddied vs not).
- **Invite link:** `/dashboard/network?invite=<userId>&course=<courseId>` → inviter card, "Become buddies", start that course. Phase 1.
- **Buddy matching** ("Find me a buddy": course, level, timezone, learning hour). Phase 2.
- **Started-because-of-you attribution** on cards and invites. Phase 2.
- **Cohort auto-placement** surfaced on enrol. Phase 2.

---

## 7. Phases

### Phase 1 — Graph + learning feed + buddy loop (this pass)
Backend `backend/src/network/`:
- Migration (additive): `study_buddies`; `tey_notification_prefs.networkActivity`.
- `NetworkActivityListener`: writes `ActivityFeed` cards from the four events (deduped).
- `BuddyService`: request / accept / decline / remove (cap 5), list with shared streak (computed from `user_daily_activity`), nudge (1/day), suggestions (classmates ranked: cohort > shared courses > recent activity; de-duplicated — fixes the classmates double-count).
- `NetworkFeedService`: candidates → score → diversity → 15 cap.
- Cheer toggle on a card (`Like` entityType `ACTIVITY`).
- Notifications: `BUDDY_REQUEST`, `BUDDY_ACCEPTED`, `BUDDY_LEARNED`, `BUDDY_NUDGE`, `NUDGE_WORKED`, `NETWORK_CHEER`.
- Routes (unversioned, matching the live layout): `GET /network/feed`, `POST /network/activities/:id/cheer`, `GET /network/buddies`, `GET /network/suggestions`, `POST /network/buddies/:userId` (request/accept), `DELETE /network/buddies/:userId`, `POST /network/buddies/:userId/nudge`, `GET /network/users/:id/timeline`.

Frontend:
- Community tab gets **Friends | Communities** switch; Friends = network feed with Cheer + Learn-this-too + caught-up card.
- `/dashboard/network`: buddies (shared streak, Nudge), requests, suggestions with reasons, invite link.
- Learner profile: buddy button, shared streak, recent learning timeline.
- Settings toggle "Friends and buddies".

### Phase 2 — Loops and measurement (built 2026-10-27)
- `network_events` (migration `20261027180000_add_network_events`): the browser reports IMPRESSION / CTA / PROFILE_OPEN as card ids only; author and course are read server-side. CHEER, LESSON_FROM_CARD (lesson ≤2h after a tap) and ENROLLED_FROM_CARD (enrol ≤48h after a tap) are written by the server from domain events.
- `INSPIRED` → "Ada started Python because of you"; the new course card says who inspired it.
- `BUDDY_STREAK_ENDING`: `BuddyStreakJob`, hourly cron, 20:00 learner-local, shared streak ≥2, only to the one who hasn't learned. Reads buddy pairs, never scans learners. Env `NETWORK_CRON_ENABLED` (defaults on in production). Free-plan caveat: no cron while Render sleeps.
- `COURSE_FINISHED` cards (when a lesson takes the enrolment to 100%), weighted highest in the feed.
- Buddy matching (`POST /network/match`): scores classmates on cohort, time zone, pace, recent activity, learning hour and free buddy slots, then sends the best one a request and says why.
- Cohort view (`GET /network/cohort`): your focus course's ±7-day starters by progress, "Just ahead of you" marked.
- Weekly digest: a "your circle" section in the existing Monday `learning.weekly-summary` email (one digest, not two).
- Push ask after accepting a buddy, with a buddy-specific preview, under the same once-a-day ask policy.
- Speed: hot reads are single raw-SQL batches (one DB round trip each).
- Moved to phase 3: proof-of-work cards (runner output / live pages) and a WhatsApp digest.

### Phase 3 — Help & teaching (built 2026-10-27)
- Help routing (`HelpService`, table `help_routes`, migration `20261027220000_add_help_routes`): a community QUESTION linked to a lesson goes to up to 3 people who passed that lesson (buddies first, then fresh from it, then recently active), nobody asked more than twice a day → `HELP_REQUEST`. Questions are asked from the code exercise ("Ask someone who passed this", after a failed run) or the community composer's lesson link.
- Answers are recorded for anyone who replies (asked or not). When the asker then finishes that lesson, every answerer gets `HELP_WORKED` ("Your answer helped Ada finish …"). Credit comes from the outcome, never likes, and never Coins.
- Helper badge (Helping Hand 1 · Guide 5 · Mentor 15 · Teacher 40 learners helped) in the existing badge registry; art `public/art/badges/helper.svg`. Profiles show "Helped N learners through a lesson".
- Review cards: up to 2 of your own past multiple-choice questions per feed load, from lessons finished 1–30 days ago (closest to 1/3/7/14/30 days first), answered inline with the reason the wrong option was wrong. Reads both question formats (v2 `exercises` mcq, older `mcqActivity`). No XP.
- Proof of work: "Share with my buddies" after code passes every check on your own (not after Show solution) → `WORK_SHARED` card showing the code as text (never run). One card per lesson, 5 shares a day, own courses only.
- Still to do: a WhatsApp digest (WhatsApp sending is switched off; needs a provider first).

### Phase 4 — Squads, duels, co-learning (built 2026-10-28)
Migration `20261028080000_add_squads_duels_presence` (squads, squad_members, squad_weeks, duels, learning_presence).
- Squads (`SquadService`): 3–6 people, one squad each, a weekly lesson goal (5–200, UTC Monday–Sunday) met together. Progress is summed live from `user_daily_activity`; `squad_weeks` only records once-a-week facts. Two lessons short → `SQUAD_ALMOST` to members who haven't learned today; goal met → `SQUAD_GOAL_MET` + a squad chest per member (`ChestService.grantSquadChest`, chestDay `squad-<week>`, opened from Quests like streak chests), exactly once. Join by link (`?squad=<code>`), invite buddies, leave (ownership passes on; last one out closes it).
- Duels (`DuelService`): between buddies, on a lesson both have finished (so no one sees lesson content they haven't unlocked), 2–5 of its questions. Answers are scored on the server, and right answers are only revealed to a player after they've answered. Challenger plays first → `DUEL_RECEIVED`; opponent plays → `DUEL_RESULT`. 48h to finish, 5 open duels each, can't be replayed. No XP, no Coins.
- Co-learning (`PresenceService`): the lesson player sends a heartbeat about once a minute while visible. Buddies show "Learning now · <lesson>"; inside a lesson a "Ben is learning too" pill appears; a new sitting (10+ min gap) sends buddies `BUDDY_LIVE` ("Ada is learning right now"), push only, at most one a day per person. Lesson titles come from the database, never the client.
- Not built: a real-time shared lesson (both see each other's answers live). Presence covers "learning together"; the live sync needs websockets and is a later call.

### Phase 5 — The learned algorithm (built 2026-10-28)
Migration `20261028120000_add_network_ranking_models`.
- Learned ranking (`ranking-model.ts`, pure; `RankingModelService`): one logistic regression per observable outcome (lesson from a card ×10, tap ×3, cheer ×1), trained on impressions from the last 60 days with a deterministic 80/20 split. Features: buddy/follow, card type, enrolled in the card's course, card age, near-peer (a little ahead / far ahead), and feed position (training only; ranking scores every card as slot 0 to remove position bias). Runs Mondays 03:00 UTC (`NETWORK_CRON_ENABLED`) and on demand from HQ.
- It only switches on with ≥300 impressions and when an outcome beats guessing-the-average on held-out data by ≥1%; every run is recorded with the reason. With none active, the hand-set formula ranks, now including the near-peer factor (×1.3 a little ahead, ×0.85 far ahead).
- Back-off (`BACKOFF` in notify.catalogue): after 5 unopened pushes of one network kind in a row, that kind goes bell-only for 7 days, then one push tries again; opening any of the last 5 clears it. Network notifications only for now.
- Teyro HQ → Network (`/admin/network`, `GET /network/admin/overview`, `POST /network/admin/retrain`, class-level ADMIN): the north star, card tap rate, enrolments from cards, first-week-buddy rate, active-this-week with vs without a buddy, squads/duels/help, network pushes sent/opened/held back and why, opt-outs, and every training run.
- As of 2026-10-28 staging has 28 impressions, so the formula is in charge; the model takes over on its own once real traffic builds up.

---

## 8. Metrics

North star: lessons started from network surfaces / DAU. Supporting: D7/D30 retention buddied vs not; % of new users with a buddy in 7 days; buddy streaks alive; cheers per card; push→lesson within 1h per send; opt-out rate (counter-metric).
