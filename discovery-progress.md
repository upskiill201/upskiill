# 🔍 Discovery & Enrollment Progress Tracker

> Session log for the **enrollment flow overhaul** and the **course discovery / creator profile hardening** work streams.
> Companion to `PROGRESS.md`. Last updated: **2026-08-25**. Branch: `staging` (all work uncommitted).

---

## 🟦 Stream 1: Course Enrollment Overhaul — ✅ Code Complete, Pending E2E Smoke (2026-08-25)

> **Goal:** Turn the misleading 3-screen celebration into an honest 4-screen Duolingo-style wizard, make the welcome reward REAL (server-side), and stop swallowing enroll errors.

### ✅ What We Accomplished

**Frontend**
- **New `frontend/components/course/EnrollmentWizard.tsx` + CSS module** — the ~250-line inline takeover was extracted out of the 1,000-line course detail page into a reusable, presentational component.
- **Honest 4-screen flow:** ① "Your Quest Awaits" hook (mascot, course card, real stat chips — no more claiming "YOU'RE IN!" before anything happens) → ② journey path preview with paid-course *"First 2 lessons free · unlock the rest anytime"* chip → ③ **commit screen where enrollment actually fires** (loading → confetti → auto-advance) → ④ "You're All Set" with animated count-up of server-granted rewards + Lesson 1 start card → hands off to `/learn/[id]`.
- **Real error handling:** failed enrolls now show an inline error card + RETRY on screen 3. The old code caught errors and navigated to `/learn` anyway (fake success).
- **Auth gate moved to click time:** logged-out users go to `/login?redirect=/courses/<slug>` *before* the celebration starts, instead of discovering a 401 at the final step.
- Removed the fake client-side `awardTestReward` call; StatsBar syncs from the enroll response (`refresh()`).
- Onboarding-style direction-aware slide transitions, `/4` progress bar, Escape-to-close, reduced-motion guard on confetti.

**Backend (`POST /api/v1/courses/:id/enroll`)**
- **Real welcome bonus:** a learner's **first-ever enrollment** grants **+25 XP / +10 Coins** inside the same transaction as the enrollment row, emits `xp.awarded` (source `ENROLL`) so weekly leagues credit it. Guard = count-before-create, so unenroll→re-enroll can't farm it. Missing StudentProfile → bonus skipped gracefully, enrollment still succeeds.
- **Enriched response:** `{ enrolled, alreadyEnrolled, courseId, enrollmentId, welcomeReward, balances, firstLesson, stats }` — screens 3–4 render server truth, nothing invented.
- Race-safe idempotency (P2002 catch → treated as already-enrolled); repeat enrolls short-circuit with `alreadyEnrolled: true`.
- Endpoint rate-limited (10/min, matches `/view` pattern).
- No Prisma schema change / no migration required.

**Tests**
- 4 new enroll tests (bonus granted once, no double-grant on re-enroll, missing-profile skip, draft 404).
- Also **fixed 3 pre-existing broken `createCourse` tests** — an earlier `$transaction` refactor had orphaned their mocks.

### Files Touched
- `backend/src/course/course.service.ts`, `backend/src/course/course.controller.ts`, `backend/src/course/course.service.spec.ts`
- `frontend/components/course/EnrollmentWizard.tsx` + `.module.css` (new)
- `frontend/app/courses/[id]/page.tsx`, `frontend/app/courses/[id]/CourseDetail.module.css`

---

## 🟦 Stream 2: Course Discovery + Creator Profile Hardening — ✅ Code Complete, Pending Visual QA (2026-08-25)

> **Goal:** Audit `/dashboard/explore` + `/creator-profile/[username]` (both sides), fix what the audit found, and make both surfaces robust. Guiding principle established: **never show invented numbers — real value or hide it.**

### 🔍 What the Audit Found
| Severity | Issue |
|---|---|
| CRITICAL | Public creator endpoint served **draft/unpublished courses** (no `published` filter) |
| HIGH | **Fabricated ratings everywhere** — nothing ever writes `Course.rating`; surfaces defaulted to invented 4.8–5.0★ even with zero reviews ("Top Rated" badge fired off its own fabrication) |
| HIGH | Fake credentials: invented years-of-experience (5 or 2), boilerplate bios/skills, hardcoded achievement badges, dicebear avatars |
| HIGH | Creator profile linked to **`/explore` — a route that doesn't exist** (404) |
| HIGH | Explore cards enrolled directly via `POST /enroll` with **`alert()` errors**, bypassing the new wizard entirely |
| MED | Hardcoded category/level chips that matched nothing ("IT & Software"); Unsplash stock photos standing in for real courses; follow button optimistic updates never rolled back on failure and failed silently when logged out; non-transactional follow toggle (FK violation → 500); loose slug matching (`/creator-profile/ma` → "Maria") |

### ✅ What We Fixed

**Backend**
- **Catalog (`GET /courses`):** now computes real stats per course — `modulesCount`, `lessonsCount`, `durationMinutes`, `studentsCount` (real enrollment count), `ratingAvg`/`reviewsCount` from actual Review rows (`null` avg when none). Dropped unbounded `curriculum` JSON from payload; instructor carries `username`; optional `?take=` capped at 100.
- **Creator profile:** drafts excluded (leak closed); ratings/years/skills/headline/bio/avatar are real-or-null; achievements derived only from earned milestones (Founding Creator, Prolific Creator ≥3 courses, learner milestones, Top Rated only at real ≥4.5); exact-match slug fallback only; `toggleFollow` verifies target exists (404, not 500) and wraps toggle+recount in a transaction.

**Frontend — Explore**
- Real stats everywhere; items without data are omitted instead of faked. Filter chips derived from the live catalog. Branded gradient fallbacks replace stock imagery; instructor avatars use the shared `Avatar` initials component. `alert()` → proper `Toast`; retry refetches instead of `window.location.reload()`; success banner moved to CSS module (emoji removed); a11y labels added; supports `?q=` deep-links.
- **Card CTA decision:** free + not enrolled → instant enroll (toast feedback) · paid + not enrolled → **"Preview" navigates to `/courses/[id]`** where the wizard/paywall live · enrolled → Continue.

**Frontend — Creator Profile**
- Broken links fixed → `/dashboard/explore?q=<name>`; follow handler rolls back exactly on failure and redirects logged-out users to login; real thumbnails on featured/course tiles (CloudFront already whitelisted); every empty/fabricated section hides itself; dicebear + `Gem` icon removed.

**Tests**
- 8 new profile tests (draft-leak query shape, zero-review nulls, honest-badge logic incl. NOT awarding unearned badges, follow 404/follow/unfollow paths). Cleaned one pre-existing type error in the spec while there.

### Files Touched
- `backend/src/course/course.service.ts` (findAll), `backend/src/course/course.controller.ts`
- `backend/src/profile/profile.service.ts`, `backend/src/profile/profile.service.spec.ts`
- `frontend/app/dashboard/explore/page.tsx`, `Explore.module.css`
- `frontend/app/creator-profile/[username]/page.tsx`, `CreatorProfile.module.css`

---

## 🟦 Stream 3: Discovery UI Polish + Detail-Page Honesty Pass — ✅ Code Complete, Pending Visual QA (2026-08-25)

> **Goal:** Duolingo-style explore cards with honest CTAs ("Start Learning Free" for paid, "Enroll for Free" for free), and a full honesty pass on `/courses/[slug]` — every fabricated number/copy removed in favor of server-computed truth.

### ✅ What We Did

**Backend (`GET /api/v1/courses/:idOrSlug` — `findOne`)**
- Response now carries `stats` computed from REAL rows: `lessonsCount`, `durationMinutes`, `totalXp` (creator-configured lesson rewards), `ratingAvg`/`reviewsCount` from actual Review rows, plus `studentsCount` from the enrollment count at the top level.
- New `instructor.stats` aggregate over the creator's **published** courses only: `coursesCount`, `studentsCount`, `reviewsCount`, `ratingAvg` (`null` when unreviewed). Raw `reviews` array is stripped from the response.
- Draft-leak hardening: for non-privileged viewers, lessons are trimmed to a light public shape (`id/title/durationMinutes/lessonType/xpReward/isFreePreview/orderIndex…`). `contentBlocks`, `stepCompletion`, and `resources` no longer ride along on the public page — locked video payloads previously leaked to anyone who opened dev tools. Actual content still flows through the paywalled per-lesson endpoint (`getStudentLesson`).
- Privileged viewers (owner/admin) keep the full shape; no schema change, no migration.

**Frontend — course detail page (`/courses/[slug]`)**
- Removed EVERY fabricated fallback: fake 1420 learners, invented 4.9★ / 240 reviews, phantom "12 lessons" / "3h 15m", hardcoded category "Design & Tech" & level "Beginner Friendly", boilerplate outcomes list (incl. the nonexistent-certificate claim), "Verified Expert Instructor" headline, template bio, dicebear-era avatar fallbacks, always-on verified shield, fake "+25 XP" per lesson, fake "5 min" durations, fake "Daily Streak" pill, emoji sub-lines.
- Real-or-hide rendering throughout: stats strip items render only when the server returned data; XP pill says "Earn up to +N XP" using creator-configured rewards (+50/unit chest bonus) and hides when none configured; rating shows only with ≥1 real review; learner count hides at 0; description treats the 'New Course Draft' seed as empty; outcomes block reads `outcomes → realOutputs → skills` JSON arrays and the whole block disappears when the creator wrote none.
- Sidebar: fake "Verified Teyro Credential" row removed (no certificate system exists); replaced with an honest self-paced row; creator stats grid now auto-fits 1–3 columns and renders only real numbers; "View Creator Profile" link only when username exists.
- CTA split: paid = "START LEARNING FOR FREE" (+ "First 2 lessons free · unlock the rest anytime"), free = "ENROLL FOR FREE"; enrolled keeps "CONTINUE LEARNING". Hero pills show real price ("$X · First 2 Lessons Free") or "Free Course".
- Properly typed the page (`CourseDetail`/`CourseInstructor` interfaces) — killed the two long-standing `any` eslint errors while there.

**Frontend — explore cards**
- Paid cards: "Preview" → **"Start Learning Free"** with Zap icon, routing to the course detail wizard. Free cards: "Enroll Now" → **"Enroll for Free"**. Both use chunky Duolingo buttons (solid darker base, press-down active state); Continue got matching treatment.
- Thumbnails now carry a price tag badge top-right — green "FREE" or "$X" (hidden once enrolled). Strikethrough `originalPrice` renders when discounted. Success banner arrow uses lucide `ArrowRight`.

**Follow-up fixes (same session, user-reported)**
- Guests could deep-link into `/learn/[id]/section/[n]` by clicking a lesson row or its Start button on the course detail page — bypassing enrollment entirely. Fixed: pre-enrollment the curriculum is a **read-only preview** (no Start buttons, rows not clickable, `handleLessonStart` gated on `isEnrolled`). Paid courses show an honest lock on every lesson except the first two, which carry a real "Free preview" tag matching the server's actual paywall rule (global index < 2). Enrolled users keep clickable rows.
- Explore cards only navigated via title/thumbnail links. Fixed: the **entire card** is now one clickable surface (`role="link"`, keyboard Enter/Space support, focus ring, pointer cursor) → course detail page, CTA button included. Only exception: enrolled users' Continue button jumps straight to `/learn`; the creator-name link goes sideways to the profile (`stopPropagation`). This retired the silent inline-enroll path (handler, success banner, toast all removed) — enrollment now always happens through the wizard, so nobody skips the auth gate or welcome-reward celebration anymore.

### Files Touched
- `backend/src/course/course.service.ts` (`findOne`, new `getInstructorPublicStats`)
- `frontend/app/courses/[id]/page.tsx`, `frontend/app/courses/[id]/CourseDetail.module.css`
- `frontend/app/dashboard/explore/page.tsx`, `frontend/app/dashboard/explore/Explore.module.css`

---

## 📍 Current State (2026-08-25)

- **Everything sits uncommitted on the `staging` branch**, mixed with pre-existing WIP from earlier sessions (monetization stack, dashboard v2, etc.). Nothing from any of the three streams is committed yet.
- **Verified:** backend `tsc --noEmit` clean for touched code (4 pre-existing errors remain in unrelated `auth`/`students` spec files) · **24/24 unit tests pass** (course.service 8 + profile.service 16) · frontend `tsc --noEmit` clean · eslint clean on both pages touched this stream (the two old `any`s in the detail page are fixed).
- **No schema changes or migrations** were needed in either stream.
- Known accepted trade-off (documented in code): two concurrent *first* enrolls to different courses could both win the bonus race — 25 XP, deemed acceptable at solo-op scale.
- Staging backend on Render remains suspended (free plan) — E2E verification must run against local dev until upgrade.

## 🔜 Next Steps

### Immediate (this week)
- [ ] **Manual E2E smoke — enrollment:** logged-out click → login redirect; full 4-screen walk on a free course; confirm DB `StudentProfile.xp/coins` increment exactly once and survive reload (StatsBar keeps bonus); league week credited with source `ENROLL`; second-course enroll shows no reward chips; kill backend mid-wizard → error card + Retry recovers.
- [ ] **Manual QA — discovery/profile:** explore renders real stats + derived chips; paid card shows "Start Learning Free" → course page wizard; free card shows "Enroll for Free"; zero-review creator shows no star rows or fabricated badges; drafts absent from public profile response (network tab); follow persists after reload; bad username → not-found UI; "View all" lands on filtered explore.
- [ ] **Manual QA — course detail (Stream 3):** open `/courses/<slug>` and confirm NO invented numbers anywhere (rating/learners/XP pills hidden when data absent); network tab shows lessons WITHOUT `contentBlocks`/`resources` for guests; paid page shows "START LEARNING FOR FREE" + price pill, free shows "ENROLL FOR FREE"; outcomes block hidden on courses where the creator never wrote outcomes/skills; creator card hides headline/bio/stats when empty.
- [ ] **Commit per branching rule:** three feature branches off `staging` (one per stream) → PRs → merge to `staging` → staging deploy check → later PR to `main` + manual production deploy action. Never direct to `main`.
- [ ] Update root `PROGRESS.md` pointer once these land.

### Backlog (surfaced by the audit, deliberately deferred)
- [ ] Real pagination/infinite scroll for the catalog once it grows past ~100 courses (endpoint already capped).
- [ ] Dead denormalized `Course.rating` / `Course.reviewsCount` columns — decide: maintain on review write, or drop in a future additive migration.
- [ ] `getMyEnrollments` still returns full Course rows (incl. heavy fields) — trim select.
- [ ] SEO meta / `generateMetadata` for the public creator profile page AND the public course detail page.
- [ ] Optional: dedicated `?creator=` filter on explore (currently approximated by `?q=<name>` search).
- [ ] Certificate system doesn't exist yet — when it does, re-add a certificate row to the course detail sidebar (removed this stream because the old row claimed a credential we can't grant).
