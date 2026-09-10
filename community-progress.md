# Course Communities & Global Feed — Progress Tracker

> Feature branch work on `feat/tey-foundation`.
> Last updated: 2026-09-05 — Skool rebuild landed (layout, leaderboards, welcome engine, notifications)

---

## 🆕 2026-09-05 — Skool-standard rebuild

Three commits on `feat/tey-foundation`:
`31c4b05` layout + leaderboards + perf · `028405a` welcome engine + notifications · `c8c3f5e` tests + SQL smoke.

**Layout.** The community is now two columns: post list plus a sticky right rail (About card — cover, description, members/posts/admins strip, facepile, your role — and a live 30-day leaderboard). Below 1024px the rail becomes a right-side drawer with scrim + Escape, same pattern as the dashboard sidebar. Tabs: Community / Classroom / Members / Leaderboards. `PostCard` was rebuilt as a real summary card (title, two clamped lines, square thumbnail, commenter facepile, "New comment 2h ago", tappable category filter in the meta line), and the feed now renders that same component instead of its own hand-rolled copy.

**Leaderboards (new).** Community points score participation, not learning: post +3, comment +1, like received on a post +2, on a comment +1; self-likes never pay. Windowed by the action's own timestamp, so an old post liked today scores this week. Nine-rung level ladder with real per-rung member percentages. `backend/src/community/community-levels.ts` holds the thresholds.

**Performance.** `GET /communities/course/:id/bootstrap` returns overview + first page of posts + rail board in ONE request, resolving the community once instead of three times (`listPosts` gained `skipAccessCheck`). `listPosts`' viewer-likes / viewer-votes / facepile queries went from three sequential awaits to one `Promise.all`. Notification destinations are resolved server-side at list time — the bell used to make two API calls between a tap and a page. Filter switches dim the list in place; `PostCard` is memoised.

**Joining moved to lesson 2.** `enrollment.created` no longer seats anyone — one lesson in, a learner has nothing to say. `CommunityService.seatAfterSecondLesson` is called synchronously from `completeLesson` so the response can carry a `communityUnlock` payload. Access is unchanged: `assertMember` still seats anyone holding an enrollment the moment they open the community themselves.

**Community Engine.** New `COMMUNITY_WELCOME` celebration scene — the only scene in the engine that is a flow rather than a single beat. Four beats: the room (real cover/faces/count) → "What brings you in?" (three choices, the room answers with a concrete next action) → a real post with a real pressable Like → three house rules + how points work. SAY HI opens the community with the composer expanded and calls `closeAll()` so queued section scenes can't replay over it.

**Notifications.** Panel rebuilt (actor avatar + colour-coded type chip, Today/This week/Earlier grouping, All/Unread tabs, skeletons, bottom sheet on phones) plus a new `/dashboard/notifications` inbox rendering the identical row component.

**Verification.** 40/40 backend Jest pass (13 new). `tsc --noEmit` and `next build` green. `backend/scripts/community-sql-smoke.ts` runs the real service methods against the live staging DB — all three leaderboard windows, the level distribution, the facepile, the empty-input guard and the widened feed query all parse and return real rows.

**Still unexercised:** none of this has been walked in a browser. The E2E checklist below still stands, plus: rail drawer on a real phone, the four welcome beats end to end, and a leaderboard with enough real activity to rank more than three people.

---

## 📌 Where We Are (the 30-second read)

Building Teyro's social layer: **Skool-style per-course communities** (auto-created per course, auto-joined on enrollment; posts/comments/polls/likes/moderation) plus a **personalized global feed** that ranks the best posts across a learner's communities and surfaces rule-based learning recommendations.

**Status in one line:** the entire code stack is built, tested, revamped and green — schema migrated on staging DB, backend services complete with 27/27 tests passing, frontend fully wired and rebuilt as "Facebook bones × Duolingo skin", notification bell reachable on every mobile surface. **Nothing has been exercised live in a browser yet**, so the only things between here and shipping are a hands-on E2E walk and pushing the branch.

**Key architectural discovery:** the Prisma schema already had dormant `Community`, `CommunityMembership`, `Post`, `Comment`, `Like`, and `Notification` models with zero service code — this was an activation/extension job, not greenfield.

### Confirmed product decisions
| Decision | Call |
|---|---|
| v1 post types | Rich text + images core; **Polls** + **File attachments** in; video posts deferred |
| Gamification | XP/coins with daily caps: first 2 posts/day (+15 XP/+5 coins), first 5 comments/day (+5 XP/+2 coins); likes never pay |
| Notifications | In-app bell: replies, mentions, likes, creator announcements |
| Moderation | Creator toolkit: pin, lock, delete any post/comment |

---

## ✅ What We've Accomplished

### 1. Data layer (deployed to staging DB)
- Schema extended (`backend/prisma/schema.prisma`): Post gained `lessonId`, `isLocked`, `status`, `viewCount`, `lastActivityAt`, `editedAt`, `images[]`, poll/attachment relations; Comment gained `parentId` threading, `likeCount`, soft-delete; new `PollOption` / `PollVote` (one-vote-per-user DB constraint) / `PostAttachment`; `Notification.actorId`.
- Hand-authored migration applied: `prisma/migrations/20260824200000_add_community_feed_tables/migration.sql` (additive only, rollback commented, idempotent backfill: one community per course, instructors→ADMIN, enrollments→MEMBER).
- ⚠️ Note: `prisma generate` EPERM'd on engine DLL swap while dev server held it — restart backend to pick types up cleanly.

### 2. Backend services (complete, `tsc --noEmit` clean)
Modules registered in `app.module.ts`:
- **`src/notification/`** — dedupe + `createMany` fanout, list, unread-count, mark-read; controller behind JWT auth.
- **`src/community/`** —
  - `community.service.ts`: access matrix (`assertMember`: platform admin → creator → membership → lazy-seat via enrollment/entitlement → 403), moderator checks, overview payload, members list (@mention autocomplete), auto-join on enrollment.
  - `post.service.ts`: list (new/top/unanswered, type/lesson filters), create (moderator-only ANNOUNCEMENT/CHALLENGE, lesson-link validation, nested poll options + attachments, capped XP inside tx), detail w/ viewer context + view counter, edit/delete (soft), pin/lock, like/unlike, single-vote polls with vote-switching.
  - `comment.service.ts`: one-level threading, counters + `lastActivityAt` bump, subtree soft-delete with counter correction, likes, capped XP, plus `getCommentLocation()` resolver for notification deep-links.
  - `feed.service.ts`: ranked global feed as computed `$queryRaw` (engagement + 72h recency decay + boosts: announcement 50, followed author 30, in-progress-course 40; own posts −80), page envelope, reason labels; rule-based `/feed/discover`.
- **Events & hooks**: `enrollment.created` → auto-seat listener; `community.post.created` / `comment.created` / `content.liked` → notification fanout (mentions validated against membership, announcement broadcast capped at 500); `createCourse` creates Community atomically.
- Controllers: bare prefixes (`communities`, `posts`, `comments`, `feed`, `notifications`) behind `AuthGuard('jwt')`; writes throttled.

### 3. Backend verification
- **27/27 community Jest specs pass** (access matrix, lazy seating, XP caps incl. third-post-pays-zero, poll vote move/re-click, double-like protection, pin permission, thread depth rules). Test run exposed & fixed a real bug: `likePost` returned `liked:true` even when the unique constraint rejected a duplicate.
- **Feed SQL verified executing on staging** (`scripts/feed-sql-smoke.js`: self-picks a real member, runs all 4 type-filter branches). Caveat: scoring-on-real-rows unexercised — **zero posts exist in the DB yet**; first E2E post covers it.

### 4. Frontend plumbing
- **15 API proxy routes** under `frontend/app/api/{community,posts,comments,feed,notifications}` via shared `lib/apiProxy.ts` (cookie-forwarding, status passthrough).
- **`app/api/upload/community/route.ts`**: presign route for post media (images ≤10MB, PDF/ZIP/TXT/CSV ≤25MB, session-verified, keys scoped to `community/<userId>/…`).
- **Typed client layer** `lib/communityApi.ts` + mention renderer `lib/communityRender.tsx`.
- **Comment location resolver chain** (backend → proxy → client) lets COMMENT-entity bell notifications deep-link to their parent post.

### 5–6. UI: built, then revamped ("Facebook bones × Duolingo skin")
All four surfaces + shared components reworked. `tsc --noEmit` clean; `next build` green.

**Facebook patterns (structure):**
- Composer-first feed: "What did you learn today?" trigger card routes to your most recent community with the composer expanded (`?compose=1`; new `defaultOpen` prop on PostComposer).
- Unified post card anatomy: header (avatar/name/meta) → body/media → engagement stats line → hairline action bar (**Like · Comment · Copy link** with clipboard toast). Pinned/Locked moved into header meta.
- Groups-style community header: taller cover, circular thumb overlapping (-38px), facepile + member count, green "Joined"/"You teach this" pill.
- Underline tabs (Feed/Members); right-rail titled widget cards.

**Duolingo skin (playful premium):**
- 3D bottom-shadow cards & buttons everywhere (`0 3–4px 0 <darker>` shadow; press = translate down onto the shadow; hover = float −2px). Skin primitives `.surface3d` / `.press3d` in `community.module.css`.
- Tey mascot empty states via new **`TeyMascot.tsx`** (asset ships with baked dark bg → rendered inside a dark sticker tile): feed, community, communities index, comments ("be the first!").
- Micro-motion: springy heart pop on like; animated poll result bars; press states under 150ms.
- Brand palette via CSS vars only; lucide icons only.

**Bugs fixed during the revamp:**
- `--gradient-brand` was referenced by 5 CSS files but **never defined** — added to `globals.css`.
- Pre-existing `dashboard/profile/page.tsx` build breakers (missing `useMemo` import; stale `AchievementCard` type ref) were blocking `next build` — resolved.
- **`[object Object]` in every community error state (fixed 2026-08-24):** the backend's global `HttpExceptionFilter` wraps errors as `{ success:false, error:{ code, message } }`, but `jsonFetch` threw `data?.message || data?.error` — i.e. the whole envelope object — so any failure (403 non-member, expired cookie, …) rendered literally as "[object Object]". New shared `lib/apiError.ts` → `extractErrorMessage()` unwraps both that envelope and raw NestJS/validation shapes; wired into `communityApi.jsonFetch` + `s3Uploader`. Any error still showing after this is the *real* message.
- **`Cannot GET /community/course/…` (fixed 2026-08-24):** the `/api/:path*` rewrite in `next.config.ts` sat in `afterFiles`, which Next evaluates BEFORE dynamic filesystem routes — so every dynamic `app/api/**/[param]` proxy was silently shadowed and requests hit the backend with `/api` stripped (`/community/…` vs controller `communities`). Static-path routes (`/api/feed`, `/api/upload/*`) sat before the rewrite, masking the bug. Fix: rewrite moved to `fallback` (runs after dynamic routes); all 32 route-file destinations audited against backend controllers first. Side discovery: dynamic route files like `/api/posts/[postId]` had been dead code — raw rewrites were doing the proxying whenever spellings coincided.
- **Mobile layout (fixed 2026-08-24):** the community page header had zero media queries — on phones the desktop flex row crushed the title to one word per line and the thumb overlapped the stats. Now stacks FB-app style (thumb → full-width title → hairline faces/joined row) at ≤768px, with a ≤360px facepile trim. Also: equal-thirds Like/Comment/Copy bar on PostCard, composer footer wrap, 16px inputs on mobile (kills iOS zoom-on-focus) in composer + comment reply inputs, tighter reply-thread indent, post-detail card padding.
- **`Cannot read properties of undefined (reading 'id')` on post create (fixed 2026-08-24):** `createPost`/`updatePost` in `post.service.ts` didn't `include` the `user` relation, but `serializePost` reads `p.user.id` unconditionally — the transaction **committed first**, then serialization crashed, so every "failed" post was actually saved (two duplicate "welcome" posts proved it). Fix: added the author include to both queries + defensive `p.user?` fallback in `serializePost`. Verified live E2E: create → 201 with author block → soft-delete → 200; 27/27 tests still green.
- **Double-posting on Post click (fixed 2026-08-24):** two clicks inside one render frame both saw stale `sending === false` and fired two POSTs (DB pairs 200–900ms apart proved it). Fix: `sendingRef` guard in `PostComposer.handleSubmit`. Cleaned the 4 accidental duplicate posts afterwards (soft-removed, kept first of each pair).
- **Feed redesign v1 → Skool × Duolingo (2026-08-24):** feed cards rebuilt — floating reason tab overlapping the card's top edge (tinted by new structured `reasonKind` from the backend, replacing the old line that announced the community twice + had `Â·` mojibake), community chip w/ thumbnail in the author meta, real functional Like buttons (new batched `likedByMe` in the feed API) with springy heart pop, Comment + Open actions. Right rail: thumbnails on communities/continue-learning, Answer pill CTAs on unanswered questions, icon tiles. Mobile: My Communities becomes a horizontal chip scroller above the feed, action bar full-width tap targets, filter chips stay one row. Staggered card entrance; fixed `♥`-glyph and encoding artifacts by rewriting both feed files clean.
- **Performance pass (2026-08-24):** measured ~700–900ms *per DB round trip* (dev backend → Supabase `aws-1-eu-west-1` from a consumer connection — and flaky: it dropped entirely mid-session). Latency was multiplied by query waterfalls: the feed rail did 3–5 **sequential** overview calls (≈4 queries each), community overview was 3 sequential rounds, feed was 2. Changes: new `GET /communities/my` (single raw-SQL round trip: memberships + course + live post counts) replaces the N+1 loop on both the feed rail and the communities index; feed `likedByMe` folded into the main feed SQL (1 round trip total); `getOverview` parallelized (community fetch, then membership + facepile + post count in one `Promise.all`, access rules preserved from `assertMember`); filter switches no longer blank the feed to skeletons (dim-in-place). Warm results before the DB dropped: feed ≈0.9s (1 round trip), my-communities ≈1.2s. **Expectation to communicate: production Render↔Supabase is same-region (ms RTT) — dev slowness is mostly geography + local network.**

### 7. Notification bell & entry points
- **`NotificationBell.tsx`**: 60s unread polling, dropdown panel (loading/error/empty states), mark-all-read + optimistic per-item read, click-through resolves POST → post detail and COMMENT → parent post (fallback `/dashboard/feed`); outside-click/Escape/nav close.
- **Mobile placement (fixed 2026-08-24): bell lives OUTSIDE the drawer menu** — desktop keeps the sidebar-header bell (`sidebarBellSlot`, hidden ≤768px); student home mounts its own bell next to the inline hamburger (`hudBell` slot); other pages use the sticky header bell. Every mobile surface reaches notifications without opening the menu.
- **Entry points wired**: sidebar "Feed" nav · "Discuss this lesson" pill on lesson start screens → `/dashboard/community/<courseId>?lesson=&lessonTitle=` · "Course community" button on My Learning focus cards · footer `/community` link repointed to `/dashboard/feed`.

---

## 🎯 Current State (honest snapshot)

| Layer | State |
|---|---|
| Database | ✅ Migrated + backfilled on staging |
| Backend code | ✅ Complete; `tsc --noEmit` clean |
| Backend tests | ✅ 27/27 Jest pass; feed SQL runs on staging |
| Frontend plumbing | ✅ Proxies, uploads, typed clients complete |
| Frontend UI | ✅ Fully revamped; `tsc` + `next build` green |
| Bell + entry points | ✅ Done — drawer-free on mobile |
| Mobile layout | ✅ Community surfaces responsive (≤768px / ≤360px passes) |
| Infra note | ⚠️ Render free plan suspended until next month reset — upgrade to paid at launch; local + staging-DB dev unaffected |
| End-to-end run | 🔴 Nothing exercised live yet — zero posts exist anywhere |
| Git | 🔴 Uncommitted working tree on `staging` |

## ▶️ Next Steps (in order)

### 1. Local E2E walk (hands-on, browser)
Start both apps locally and walk the checklist:
enroll→seat · composer flows (poll / upload / @mention) · second-account notifications + bell click-through · creator pin/lock/delete · XP caps via `gem_transactions` rows · feed rank sanity (first real posts exercise the scorer for the first time) · lesson deep-link banner · `?compose=1` trigger card · 403 guard for non-members · mobile: bell reachable without the drawer.

### 2. Commit + push `staging`
Push → Vercel/Render auto-deploy → confirm deploys green → spot-check on the staging URL (DB migration already applied there).

## Deliberately out of scope (v1)
Video posts · websockets (REST polling) · report queues/member removal · mission objectives for community actions · AI features (Phase Two guard) · ActivityFeed/FriendActivity revamp.
