# Shop Economy — Progress Tracker

> Feature branch work on `feat/tey-foundation`.
> Last updated: 2026-09-05 — economy rebuilt, verified end-to-end against staging DB, all three deferred pieces (power-ups, cosmetics, batched loadouts) landed.

---

## 📌 Where We Are (the 30-second read)

Rebuilt Teyro's coin shop from a 2-item hardcoded catalogue into a real economy: 38 items across power-ups, mystery chests, and four cosmetic categories, gated behind learning milestones (not just coins), with daily/weekly rotation, seasonal events, collections, and a Shop Engine that announces unlocks and celebrates purchases the same way the Celebration Engine celebrates lessons.

**Status in one line:** backend logic, schema, and frontend are all built and wired; **75 assertions pass against the real staging database** (not mocks) via a throwaway-user smoke script; `tsc --noEmit` and `next build` are clean on both sides. **Nothing has been clicked through in a browser yet** — verification so far is service-layer, not UI.

**The audit that started this:** the old shop was 2 hardcoded items (`REFILL_HEARTS`, `STREAK_FREEZE`), a dead `gems` column still aliased in API responses, streak freezes tracked in two untied places (`StudentProfile.streakFreezeBank` vs `UserInventory`), and a purchase endpoint with no transaction wrapping or idempotency — a retried request could double-charge. See `MEMORY.md` → `teyro-shop-economy-audit.md` for the full original findings.

### Confirmed product decisions
| Decision | Call |
|---|---|
| Item catalogue | Lives in **code** (`shop.registry.ts`), not a DB table — every item's effect is code anyway; a mirrored table would drift and need admin CRUD |
| Unlock model | **Two gates**: learning opens the gate, coins pay the toll — coins alone must never buy the best cosmetics |
| Rarity ladder | COMMON / RARE / EPIC / LEGENDARY, each its own price band (asserted in tests) |
| Rotation | **Derived**, not stored — seeded PRNG keyed on the calendar day; no rotation table, no cron |
| Streak freeze source of truth | Stays on `StudentProfile.streakFreezeBank` (streak reconciliation reads it directly); shop purchases now also mirror into `UserInventory` like chest/quest grants already did |
| Mystery chests | Never empty-handed (coin floor on every tier); no duplicate cosmetics (converts to coins instead) |

---

## ✅ What We've Accomplished

### 1. Backend economy (commit `817a327`)
- **`shop.registry.ts`** — 38 items: power-ups (Refill Hearts, Streak Freeze, Lesson Retry, XP Boost, 2× XP Boost, Coin Boost, Streak Repair, Perfect Lesson Protection, Freeze Vault), 3 Mystery Chest tiers, profile frames, backgrounds, celebration effects, XP effects. Each carries a rarity, unlock rule, price, and effect definition.
- **`shop.unlocks.ts`** — unlock rules (`LEVEL`, `STREAK`, `LESSONS`, `COURSES`, `XP`, `LEAGUE`, `COLLECTION`, `PURCHASES`) return **progress**, not a boolean — a locked card reads "12 / 25 lessons," not just "locked." Streak unlocks check longest-streak too, so breaking a streak doesn't confiscate what was already earned.
- **`shop.rotation.ts`** — seeded-PRNG daily rotation and weekly special (drawn from RARE+ only), 5 seasonal events (Halloween, Back to School, Creator Week, Winter, Anniversary) with date-window activation and automatic discounting (prestige items never discount).
- **`shop.chests.ts`** — loot tables per tier with a coin floor and duplicate-to-coins substitution.
- **`shop.service.ts`** — full catalogue assembly (recommendations, goals, featured items), transactional purchase flow (guarded conditional debit closes the old check-then-act race), idempotency keys (unique-index retry guard), chest open, cosmetic equip/unequip (one per slot), collection claiming, daily visit reward.
- **Schema**: 3 new tables (`user_shop_items`, `user_shop_unlocks`, `user_shop_state`) + `shop_transactions.{rarity,category,idempotencyKey}` — additive only, migrated onto staging.
- **25 unit specs** (`shop.registry.spec.ts`) assert price-band integrity, collection completability, rotation determinism, and chest drop rules — one caught a real mispricing (Perfect Shield tagged EPIC but priced in the RARE band) before it shipped.

### 2. Shop Engine + rebuilt UI (commit `f51ad7f`)
- **`ShopEngineContext.tsx`** — a second full-page scene queue beside the Celebration Engine, same grammar (queue → active → advance). Defers while a celebration is playing; celebrations always win.
- **4 scenes**: `ItemUnlockedScene` (leads with the price, not just congratulations), `PurchaseSuccessScene` (balance counts *down* on screen — the spend is shown, not hidden), `ChestRevealScene`, `CollectionCompleteScene`.
- **Shop page rebuilt**: loading skeletons, error+retry state, goals section ("save 200 more coins for X"), weekly special hero, daily rotation with countdown, recommendations, mystery chests with published odds, collections with progress bars, full category browser.
- **`ShopItemArt.tsx`** — one renderer for every item's visual (frames as rings, backdrops as gradients, effects as animated orbs) driven by an opaque `art` token, so new art never needs new components.
- Fixed a live bug found during the original audit: `state.coins` wasn't refreshed after purchase (only the legacy `gems` alias was) — coin balance could go stale until a full page refresh.

### 3. Unlock-backfill fix (commit `86e1022`)
Verified against the real staging DB and found a real bug: `syncUnlocks` treated every already-satisfied requirement as newly unlocked. An existing learner with a 30-day streak would have opened the app to a stack of full-page takeovers celebrating things earned months ago. Fixed with a one-time silent backfill (`user_shop_state.unlocksBackfilledAt`) — only thresholds crossed *after* that stamp ever announce. Also capped a single moment at 3 takeovers (finishing one lesson can cross a lessons/XP/level threshold simultaneously).

### 4. Power-ups, cosmetics, and hardening (commit `02ef586`)
Three pieces I'd originally left as stubs, finished after being asked directly:
- **Power-ups now do something.** Perfect Lesson Protection spends itself from the life-loss path automatically (no menu to remember mid-question); Lesson Retry appears in the out-of-hearts overlay *only* when the learner actually holds one.
- **Cosmetics are visible.** Backdrops paint behind the profile card (with a readability scrim — half the catalogue is dark), celebration effects play over every scene (mounted once in `SceneShell`, covers all 13 scene types), XP effects recolour the reward flight, frames render on community posts and leaderboard rows via a new `GET /shop/loadouts` batch endpoint (so a feed of 20 avatars is 1 request, not 20).
- **Two real bugs the verification run caught:** Prisma's 5s transaction default was too short for shop writes over the Supabase pooler (`registerVisit` blew it outright) — all six shop transactions now carry a 20s budget. Separately, the smoke script itself was exhausting the connection pool by opening a second pool alongside the app's — fixed to use a single connection.

### 5. End-to-end verification (not a UI walk — a real database run)
`backend/scripts/shop-smoke.ts` creates a throwaway user, runs every path, deletes the user in a `finally` block. **75/75 assertions pass** on staging, including:
- Purchases debit the *live event-discounted* price (Back to School, 10% off, was actually active during the run)
- A replayed idempotency key returns the original purchase, never double-charges
- Every guard (locked item, grant-only item, full hearts, insufficient funds) rejects correctly with balance untouched
- Chests never pay nothing and the coin math reconciles exactly
- Cosmetics equip/swap correctly (one per slot enforced)
- Collections complete, pay out, and grant the otherwise-unbuyable exclusive item
- Shield absorbs exactly one miss then is spent; Lesson Retry restores hearts and refuses when empty
- Batched loadout reads resolve art tokens correctly for real and unknown user ids

### 6. Dev environment fix (unrelated to the economy itself)
A stale Turbopack build cache (from a prior crash) was breaking `next/font/google` resolution with `Module not found: @vercel/turbopack-next/internal/font/google/font`. Diagnosed as cache corruption (not network — Google Fonts connectivity tested clean), fixed by killing the stuck dev process and clearing `.next` + `node_modules/.cache`. Also explained the port confusion: frontend (3000) and backend (3001) were never meant to share a port — a stray leftover process was squatting on 3000, bumping the frontend to 3001 where it coincidentally collided with the backend's dedicated port.

---

### 7. Coins-popover fix (stats bar → real shop data)
The stats-bar coin pill's hover/click popover (`CoinsPopover.tsx`) was still the pre-rebuild stub: two hardcoded items ("Streak Freeze", "2x XP Boost") both permanently labelled `UNLOCKED`, regardless of what the learner actually owns or has unlocked. Rebuilt against the real economy:
- Fetches the same `fetchCatalog()` the shop page uses; shows `recommendations` (falling back to `featured`/`alwaysStocked`) so the two items shown are genuinely personalized, not static.
- Each card now reflects real state: a locked item shows its actual progress (`current/target` + the unlock label), an owned cosmetic shows `OWNED`, everything else shows its real live price.
- Clicking a buyable item purchases (or opens a chest) right from the popover via the same idempotency-keyed `purchaseItem`/`openChest` calls the shop page uses, then hands off to the global `ShopEngineProvider` (mounted at `app/layout.tsx`, so it's reachable from anywhere) for the same `PURCHASE_SUCCESS`/`CHEST_REVEAL` scene — no page navigation required for a cheap buy.
- Clicking a locked/owned/blocked item instead deep-links to `/dashboard/shop`, same as before.
- Added loading skeletons and an inline error row (component states rule from `frontend/CLAUDE.md`) — previously there was no way to represent "still loading" or "failed to load" at all.
- **Found and fixed a real bug in passing:** the "VISIT SHOP" button referenced `styles.actionBtn3D`, but the CSS module only defined `.goToShopBtn3D` — the button was rendering with zero styling (no color, no 3D press effect). Renamed the CSS class to match.
- `tsc --noEmit` clean. Not yet clicked through in a browser with a real session (dev servers on :3000/:3001 both respond; verification here is code-level only, same caveat as the rest of the shop work).

### 8. "Show more" + rotation + speed pass on the popover
Follow-up ask: two items felt thin, and the "VISIT SHOP" fix from #7 wasn't visibly showing up in the browser no matter how many times it was re-checked.
- **Show more / rotate:** the popover now builds a dedup'd pool from recommendations, the weekly special, featured, daily rotation, and always-stocked items (`buildPreviewPool` in `CoinsPopover.tsx`), shows 3 at a time, and auto-advances through the rest every 5s with a crossfade — paused on hover, with dot indicators for manual paging.
- **Fast:** added `lib/shop/previewCache.ts` — a shared in-memory cache (30s TTL) with in-flight de-duping. `StatsBar` now calls `prefetchCatalog()` on mount, so the catalog is usually already warm before the learner ever hovers the coin pill.
- **Second real bug found:** `.footerRow` — the div wrapping the VISIT SHOP button — had **no CSS defined for it at all**, in the original stub *and* in the #7 rebuild (missed on the first pass). That's why the button still looked broken after the `actionBtn3D` rename: no padding/background/border-top on its container. Fixed by adding `.footerRow` styling.
- **Root cause of "my fix isn't showing up":** the frontend on `:3000` was running via `npm start` (`next start`) — a frozen production build from before any of this session's edits — not `next dev`. No amount of source-level fixing would ever have appeared in the browser. Killed it and relaunched with `npm run dev` (Turbopack); confirmed `200` on `/`. Saved as a standing memory (`teyro-frontend-was-prod-build`) since it cost several blind iterations before the log file gave it away.
- `tsc --noEmit` and `eslint` clean (0 errors) on all touched files after this pass, including fixing two `react-hooks/set-state-in-effect` violations introduced by the first rotation draft (moved a state clamp out of an effect into render-time derivation instead).

## 🎯 Current State (honest snapshot)

| Layer | State |
|---|---|
| Database | ✅ Both migrations applied to staging (`20260905120000_add_shop_economy`, `20260905140000_add_shop_unlock_backfill`) |
| Backend code | ✅ Complete; `tsc --noEmit` clean |
| Backend tests | ✅ 25/25 Jest unit specs pass; **75/75 live assertions pass against staging DB** |
| Frontend code | ✅ Complete; `tsc --noEmit` clean; `next build` green |
| Power-ups (Retry, Shield) | ✅ Consume in-lesson, not just purchasable stubs |
| Cosmetics (frames, backdrops, FX) | ✅ All four categories render somewhere real |
| Shop Engine | ✅ Built, wired at app root — **never watched play in a browser** |
| Dev environment | ✅ Frontend running clean on :3000 after cache fix |
| Backend dev server | 🔴 Was crashing on Supabase connection timeout (P1001) as of last check — separate open thread, not yet resolved |
| End-to-end browser walk | 🔴 Nothing clicked through yet — verification is service-layer only |
| Git | 🔴 4 commits local on `feat/tey-foundation`, no upstream configured, nothing pushed, no PR |

---

## ▶️ Next Steps (in order)

### 1. Get the backend dev server running locally
Last known state: `PrismaClientInitializationError` — can't reach the Supabase pooler (`P1001`). Worth checking whether this is transient (the smoke-test runs earlier saw the same error intermittently and succeeded on retry) or something more persistent (VPN/firewall, IP allowlist, or the pooler genuinely rate-limiting this connection). Once backend is up, add an unhandled-rejection guard in `main.ts` so a DB hiccup on boot doesn't crash the whole process — right now it takes down Node entirely instead of failing to start cleanly.

### 2. Walk the Shop Engine in an actual browser
With both servers up: open the shop, buy something cheap (Refill Hearts), confirm the `PurchaseSuccessScene` plays and the balance visibly counts down; buy a cosmetic and use the in-scene "Equip Now"; open a Mystery Chest and watch the reveal; get a learning requirement close enough to trigger `ItemUnlockedScene` live (e.g. bump XP/streak in the DB directly to cross a threshold, then reload); confirm a frame shows up on the profile avatar, in a community post, and on the leaderboard.

### 3. Commit the doc, then push + open a PR
Nothing on this branch is pushed. Push `feat/tey-foundation`, open a PR against `main` (or `staging` per the deploy pipeline in CLAUDE.md §3), and get it onto the staging URL where a second pair of eyes can click through it.

### 4. Decide on the remaining rough edges
- The daily-rotation and weekly-special item pools are small (4 rotating slots) — worth watching whether the catalogue needs more `rotatable: true` items as it grows so the shelf doesn't feel repetitive.
- No admin/ops visibility into the economy yet (e.g. how many of each item have sold, whether any rarity band is over/under-priced in practice) — fine for launch, but will matter once there's real usage to tune against.
- `backend/scripts/shop-smoke.ts` is a genuinely useful regression tool — worth deciding if it should become a real Jest integration suite (currently a standalone script) or stay as-is for manual runs after touching shop logic.

## Deliberately out of scope (this pass)
Admin catalogue management UI · payment/real-money purchases (coins-only economy, per CLAUDE.md) · A/B testing item prices · analytics dashboard on shop performance · gifting items between learners.
