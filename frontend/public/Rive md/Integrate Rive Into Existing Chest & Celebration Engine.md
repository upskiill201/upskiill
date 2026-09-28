# CRITICAL ARCHITECTURE REQUIREMENT — USE THE EXISTING CHEST / CELEBRATION ENGINE

There is an existing Teyro **Chest/Celebration Engine** that already controls the chest reward experience and UI.

The new Rive Treasure Chest MUST be integrated **inside the existing Chest/Celebration Engine**.

## DO NOT CREATE A SECOND CHEST EXPERIENCE

Do NOT build a separate:

- Treasure Chest page
- Treasure Chest modal system
- Treasure Chest celebration system
- Treasure Chest overlay
- separate reward celebration UI
- separate reward flow
- separate chest state architecture

unless something genuinely does not exist in the current engine.

The existing Chest/Celebration Engine is the primary orchestration layer.

The new Rive animation is a replacement/enhancement of the **chest's visual interactive animation**, not a replacement for the entire existing experience.

---

# 1. FIRST, FIND THE EXISTING ENGINE

Before implementing anything, search the entire repository for the existing chest and celebration engine.

Look for concepts/components such as:

- Chest
- Celebration
- Reward
- RewardReveal
- CelebrationEngine
- ChestEngine
- DailyChest
- reward overlay
- reward modal
- reward animation
- particles
- confetti
- reward counter
- XP celebration
- coin celebration
- sound effects
- reward sounds
- celebration sounds

Do not assume the names.

Read the relevant files and understand exactly how the current engine works.

Identify:

1. How the chest is opened.
2. How the current chest interaction progresses.
3. How the celebration overlay is shown.
4. How reward information is passed into the engine.
5. How reward amounts are displayed.
6. How coins/XP/etc. are displayed.
7. How particles/confetti are triggered.
8. How reward sounds are triggered.
9. How the engine knows the reward has been revealed.
10. How the engine knows the experience is complete.
11. How reset/replay currently works.
12. Which features already use the engine.

---

# 2. PRESERVE THE EXISTING EXPERIENCE

The user should still experience the same Teyro Chest/Celebration Engine flow.

Do not throw away existing:

- reward overlay
- celebration UI
- reward amount display
- XP/coin visual counters
- particles
- confetti
- glow effects
- streak celebration
- reward text
- buttons
- close/continue behavior
- existing timing/orchestration
- existing analytics
- existing sound settings

unless there is a clear technical reason to change them.

The goal is to make the Rive chest feel like it was **always part of the Teyro celebration engine**.

---

# 3. RIVE IS THE CHEST INTERACTION LAYER

Within the existing engine, replace the old chest animation/visual interaction with:

`treasure_chest.riv`

Conceptually:

```text
Existing Chest/Celebration Engine
             │
             ├── Reward data
             ├── Reward business logic
             ├── Celebration UI
             ├── Reward amount
             ├── Particles
             ├── Sounds
             ├── Analytics
             │
             └── Interactive Chest
                       │
                       └── Rive
                           TChest
```

Rive should handle:

- chest visual
- chest interaction
- chest progression
- opening animation
- reward visual reveal
- internal chest animation
- secondary motion
- reset/replay

The existing Teyro engine should continue handling the overall experience.

---

# 4. EXISTING ENGINE SHOULD ORCHESTRATE THE EXPERIENCE

The intended flow should become:

```text
Teyro feature triggers reward
        ↓
Existing Chest/Celebration Engine opens
        ↓
Engine receives reward data
        ↓
Engine prepares Rive
        ↓
Engine sets Rive rewardType
        ↓
User interacts with Rive chest
        ↓
TChest.click
        ↓
Rive handles chest progression
        ↓
Rive opens
        ↓
rewardReveal
        ↓
Existing Celebration Engine reacts
        ↓
Celebration UI appears/animates
        ↓
Reward amount is displayed
        ↓
Celebratory sound plays
        ↓
Particles/confetti/etc. play
        ↓
Existing completion flow
        ↓
Rive reset when needed
```

Do NOT create a parallel flow.

---

# 5. `rewardReveal` MUST CONNECT TO THE EXISTING CELEBRATION ENGINE

The Rive:

`rewardReveal`

event should become an event consumed by the existing Chest/Celebration Engine.

For example:

```text
Rive:
rewardReveal
      ↓
Existing Engine:
handleRewardReveal()
      ↓
├── reward UI
├── reward amount
├── celebration animation
├── particles
├── celebratory sound
├── analytics
└── completion state
```

Do not create another celebration handler if the existing engine already has one.

Adapt the existing handler so it can respond to the Rive event.

---

# 6. KEEP THE EXISTING UI

The Rive chest should visually sit within the existing chest/celebration UI.

Do NOT suddenly introduce a completely new design.

The experience should remain visually consistent with Teyro.

For example, if the existing engine has:

```text
┌─────────────────────────┐
│                         │
│       Celebration       │
│                         │
│      [ CHEST ]          │
│                         │
│                         │
│      +50 COINS          │
│                         │
│       Continue          │
│                         │
└─────────────────────────┘
```

the Rive chest replaces the `[ CHEST ]` interaction.

The rest of the experience remains part of the existing engine.

---

# 7. DO NOT DUPLICATE REWARD UI

Do not allow both Rive and React to independently display competing reward information.

Rive provides the visual reward animation.

The existing Teyro Celebration Engine remains responsible for the application-level reward presentation.

The reward amount should come from the existing engine.

Example:

```text
Backend:
50 coins

Existing Celebration Engine:
rewardAmount = 50

Rive:
rewardType = coinRewards

Rive:
rewardReveal

Existing Celebration Engine:
"+50 Coins"
```

---

# 8. SOUND MUST BE ORCHESTRATED THROUGH THE EXISTING ENGINE

Sound is extremely important.

Integrate the chest sounds into the **existing Teyro audio/celebration architecture**.

Do NOT create a completely separate audio system for the chest if Teyro already has one.

However, do improve/extend the existing sound system where necessary to support the chest experience.

The sounds should NOT feel like generic UI feedback.

We need a proper emotional reward sequence.

The audio experience should support:

### Interaction

A satisfying chest interaction sound.

Not a tiny generic button click.

### Anticipation

If appropriate for the existing Rive timing, create a sense of build-up and anticipation.

### Opening

A distinct, substantial chest-opening sound.

### Reward reveal

The most important sound.

When:

`rewardReveal`

fires, play a **real celebratory reward sound**.

This should feel emotionally rewarding.

### Celebration

Synchronize with the existing celebration engine's:

- particles
- confetti
- reward text
- glow
- counters
- celebration animation

The sound should reinforce the visual moment.

### Reward-specific sounds

Where appropriate:

```text
Coins → satisfying coin/reward flourish
XP → progression/energy flourish
Streak Freeze → special protective/power-up flourish
XP Boost → energetic boost flourish
Hearts → warm positive flourish
```

Use the actual supported Rive reward types discovered from the `.riv` file.

Do not over-layer sounds.

The experience should feel premium rather than noisy.

---

# 9. IMPORTANT: SOUND TIMING

Do not trigger the main celebration sound merely when the user clicks the chest.

The major celebratory sound should be synchronized with the actual reward reveal:

`rewardReveal`

This ensures:

**visual reveal + reward UI + particles + celebration sound**

feel like one single moment.

That synchronization is one of the most important parts of this integration.

---

# 10. EXISTING CELEBRATION ENGINE TIMELINE

Study the current engine's timing before changing it.

Then integrate Rive into that timeline.

Do not create a competing timeline.

If the current engine has phases such as:

```text
INTRO
INTERACTION
REVEAL
CELEBRATION
REWARD_DISPLAY
COMPLETE
```

map the Rive lifecycle into those existing phases.

For example:

```text
ENGINE: INTERACTION
       ↓
Rive TChest.click
       ↓
ENGINE: WAITING_FOR_REVEAL
       ↓
Rive rewardReveal
       ↓
ENGINE: REVEAL
       ↓
Existing celebration UI
       ↓
ENGINE: CELEBRATION
       ↓
ENGINE: COMPLETE
```

Adapt this to the actual engine implementation.

Do not invent a duplicate state machine if one already exists.

---

# 11. UNIVERSAL REUSE

Because the existing Chest/Celebration Engine is already the central experience, every chest-based feature should go through it.

Examples:

```text
Daily Chest
    ↓
Chest/Celebration Engine
    ↓
Rive Treasure Chest
```

```text
Quest Reward
    ↓
Chest/Celebration Engine
    ↓
Rive Treasure Chest
```

```text
Monthly Quest
    ↓
Chest/Celebration Engine
    ↓
Rive Treasure Chest
```

```text
Achievement
    ↓
Chest/Celebration Engine
    ↓
Rive Treasure Chest
```

Future features should be able to use the same engine.

---

# 12. DO NOT HARD-CODE DAILY CHEST LOGIC

The engine/component must NOT assume:

- Daily Chest
- daily reset
- one reward per day
- a particular reward amount
- a particular reward source

The parent feature provides the reward context.

The engine provides the shared chest experience.

---

# 13. TEST BENCH MUST USE THE REAL EXISTING ENGINE

This is important.

Do NOT create a test bench that bypasses the Chest/Celebration Engine.

The test bench should exercise the **same production engine/component** that real Teyro features use.

Create an internal development page such as:

`/dev/treasure-chest`

or the project's established development route.

The test page should launch the existing Chest/Celebration Engine with configurable test data.

For example:

```text
Reward Type:
[ Coins ▼ ]

Amount:
[ 50 ]

Source:
[ Test ▼ ]

Sound:
[ ON ]

[ START CHEST ]
```

Then the exact same production experience should run.

---

# 14. TEST BENCH DEBUG INFORMATION

Include a development-only debug panel showing:

```text
Engine State:
INTERACTION

Rive:
Loaded ✓

View Model:
TChest ✓

Reward Type:
coinRewards

Rive Event:
rewardReveal

Reward Amount:
50

Audio:
Enabled ✓

Celebration:
Waiting
```

As the interaction progresses, update the event timeline.

Example:

```text
10:32:01 Rive loaded
10:32:02 TChest found
10:32:02 rewardType = coinRewards
10:32:04 click triggered
10:32:05 rewardReveal received
10:32:05 celebration started
10:32:05 reward sound played
10:32:07 celebration completed
10:32:07 Rive reset
```

Make this development-only.

Do not expose debugging information in production.

---

# 15. TEST EVERY REWARD TYPE

The test bench should allow:

- Coins
- XP
- Streak Freeze
- XP Boost
- Hearts

Use only reward types actually supported by the `.riv` file.

Test different amounts.

Examples:

```text
1
10
50
100
250
1000
```

Verify the Rive visual category changes correctly while the amount remains application-controlled.

---

# 16. TEST ALL FAILURE SCENARIOS

Use the existing engine and test:

### Rive

- missing `.riv`
- failed load
- invalid View Model
- missing `TChest`
- missing `click`
- missing `reset`
- missing reward property
- invalid reward type
- missing `rewardReveal`

### Interaction

- rapid clicking
- double-clicking
- tapping repeatedly
- clicking after reveal
- reset during animation
- remount during animation
- unmount during animation
- navigation away
- browser tab switching

### Audio

- audio enabled
- audio muted
- volume at 0
- missing sound
- sound loading failure
- autoplay restriction
- repeated reward sounds
- overlapping sounds

### Rewards

- duplicate claim
- failed API
- network interruption
- stale reward
- reward already claimed
- reward amount unavailable

The user should never receive duplicate rewards because of animation replay.

---

# 17. IMPORTANT BUSINESS LOGIC RULE

Never use:

`rewardReveal`

as an excuse to blindly grant a reward.

The existing reward system remains authoritative.

Determine how the current engine claims rewards and integrate with that system.

The Rive animation is visual.

The backend/application reward system is authoritative.

---

# 18. EXISTING CELEBRATION ENGINE SHOULD REMAIN THE SINGLE SOURCE OF ORCHESTRATION

The final architecture should look like:

```text
                    Teyro Feature
                         │
                         │ reward data
                         ▼
              ┌──────────────────────┐
              │ Chest/Celebration     │
              │ Engine                │
              │                      │
              │ • state              │
              │ • reward             │
              │ • UI                 │
              │ • sounds             │
              │ • particles          │
              │ • analytics          │
              │ • completion         │
              └──────────┬───────────┘
                         │
                         │ Rive integration
                         ▼
              ┌──────────────────────┐
              │ treasure_chest.riv   │
              │                      │
              │ TChest               │
              │ • click              │
              │ • reset              │
              │ • rewardType         │
              │ • rewardReveal       │
              └──────────────────────┘
```

This is the architecture we want.

NOT:

```text
Daily Chest → Rive
Quest → another Rive implementation
Achievement → another Rive implementation
Celebration → separate system
Sound → separate system
```

---

# 19. FINAL UX REQUIREMENT

When a user opens any Teyro chest, it should feel like **one consistent Teyro experience** regardless of where the chest came from.

The source can change:

```text
Daily Chest
Quest
Achievement
Monthly Quest
Course
Event
```

but the core interaction should remain:

**Teyro Celebration Engine + Rive Chest + emotional sound + reward reveal + celebration.**

The user should not feel like they are entering a completely different feature every time.

---

# 20. IMPLEMENTATION PRIORITY

Work in this order:

1. Inspect existing Chest/Celebration Engine.
2. Inspect existing audio/celebration system.
3. Inspect existing reward architecture.
4. Inspect `treasure_chest.riv`.
5. Install/configure Rive.
6. Integrate Rive into the existing Chest/Celebration Engine.
7. Connect `rewardType`.
8. Connect `click`.
9. Connect `rewardReveal`.
10. Connect existing celebration UI.
11. Connect emotional reward sound sequence.
12. Connect existing particles/celebration effects.
13. Connect reset/replay.
14. Add duplicate protection.
15. Create test bench using the real engine.
16. Test every reward type.
17. Test every failure scenario.
18. Run lint/typecheck/tests/build.
19. Review the diff.
20. Push only to staging/development.

---

# FINAL RULE

**Do not replace Teyro's existing Chest/Celebration Engine with a new Rive-based system.**

Instead:

**Upgrade the existing Chest/Celebration Engine by integrating `treasure_chest.riv` as its interactive chest layer.**

The existing Teyro celebration experience remains the foundation.

Rive makes the chest interaction better.

The result should feel like one cohesive, polished, emotional Teyro reward experience.