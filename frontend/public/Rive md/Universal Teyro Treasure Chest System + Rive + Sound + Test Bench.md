# Teyro Universal Interactive Treasure Chest System

You are working on the existing Teyro application.

Tech stack:
- Next.js
- React
- TypeScript
- Existing Teyro reward/gamification systems
- Existing sound/celebration systems where applicable

I have provided:

`treasure_chest.riv`

This Rive file was created specifically as a reusable Treasure Chest interaction.

The Treasure Chest MUST NOT be implemented as a Daily Chest-only feature.

## CORE REQUIREMENT

Build a reusable, production-ready **Universal Treasure Chest system** that can be used anywhere in Teyro where a chest represents an interactive reward.

Examples may include:

- Daily Chest
- Quest rewards
- Monthly Quest rewards
- Course/lesson rewards
- Milestone rewards
- Special event rewards
- Community rewards
- Achievement rewards
- Promotional rewards
- Future gamification features
- Any future feature where Teyro wants to present a reward through a chest

There must be ONE shared Treasure Chest implementation.

Do NOT create separate chest implementations for different features.

The visual/interactive experience should always come from:

`treasure_chest.riv`

The business logic should remain in the application/backend.

---

# 1. FIRST: INSPECT THE EXISTING APPLICATION

Before modifying anything, inspect the project thoroughly.

Find:

- package.json
- Next.js configuration
- React architecture
- existing component conventions
- existing animation systems
- existing Rive usage, if any
- existing audio/sound system
- existing celebration effects
- reward/gamification architecture
- coins system
- XP system
- streak freeze system
- XP boost system
- hearts system
- Daily Chest implementation
- Lucky Wheel implementation
- Monthly Quest implementation
- achievement/milestone reward systems
- any existing chest/reward components
- all places where a chest is currently rendered or planned

Search the entire repository for:

- `chest`
- `Chest`
- `daily chest`
- `reward`
- `coinRewards`
- `xpRewards`
- `streakFreeze`
- `xpBoost`
- `hearts`
- existing animation/sound code

Do not assume there is only one chest implementation.

The goal is to discover every existing place that should eventually use the universal Treasure Chest.

Do not unnecessarily rewrite unrelated systems.

---

# 2. INSPECT THE ACTUAL RIVE FILE

Before implementing the integration, inspect:

`treasure_chest.riv`

Do NOT guess the Rive API.

Verify the actual contents of the file and identify:

### Main View Model

Expected:

`TChest`

### Expected controls

- `click` — Trigger
- `reset` — Trigger
- `rewards` — nested `VMrewards`

### Expected reward property

`TChest → rewards → rewardType`

Expected reward types:

- `coinRewards`
- `xpRewards`
- `streakFreezeRewards`
- `xpBoostRewards`
- `hartRewards`

Also verify:

- exact spelling
- exact capitalization
- exact View Model names
- exact property types
- exact trigger names
- available events
- `isReveal`
- `rewardReveal`
- any state machines
- any inputs
- any embedded audio
- any other useful events/properties

If the actual `.riv` file differs from the developer notes, use the actual Rive structure as the technical source of truth and document the difference.

Do not invent properties.

---

# 3. RIVE DEVELOPER NOTES

The animation creator provided these notes:

> Treasure Chest — Rive Integration
>
> The Treasure Chest is built as a reusable Rive system. Chest progression, opening, reward reveal timing, reward animation, secondary motion, and reset/replay behavior are handled internally in Rive.
>
> Main View Model: TChest
>
> - click: Trigger — advances the chest interaction.
> - reset: Trigger — resets the experience so it can be played again without reloading the .riv file.
> - rewards: VMrewards — nested reward configuration.
>
> Reward selection:
>
> TChest → rewards → rewardType
>
> RewardType:
>
> - coinRewards
> - xpRewards
> - streakFreezeRewards
> - xpBoostRewards
> - hartRewards
>
> Coins and XP are currently intended for use. Streak Freeze is prepared if needed.
>
> The application only needs to set rewardType.
>
> Reward selection, animation and reveal behavior are handled internally by Rive.
>
> Reward amounts and business logic remain on the application/backend side.
>
> `isReveal` is controlled internally by Rive and should not normally be controlled by the application.
>
> The Rive event `rewardReveal` fires at the exact reward reveal point.
>
> Integration flow:
>
> `set rewardType → trigger chest interactions with click → rewardReveal → reset when needed`
>
> The Rive instance can remain loaded between rewards.

Preserve this architecture.

---

# 4. INSTALL RIVE

Install the appropriate official Rive React package.

Prefer:

`@rive-app/react-canvas`

unless inspection of the project shows that another official Rive runtime is more appropriate.

Before installing, check whether Rive is already installed.

Do not create duplicate Rive dependencies.

---

# 5. ADD THE RIVE ASSET

Place:

`treasure_chest.riv`

in:

`/public/rive/treasure_chest.riv`

unless the project has a better established asset structure.

Verify the file is actually accessible from the browser.

Do not convert the file.

Do not modify the `.riv` file.

---

# 6. BUILD ONE UNIVERSAL TREASURE CHEST COMPONENT

Create a reusable component, for example:

`components/gamification/TreasureChest.tsx`

Use the project's existing component structure if a different location is more appropriate.

The component should encapsulate all Rive-specific implementation.

Other Teyro features should NOT need to know:

- how Rive works
- how the View Model is accessed
- how the click trigger is fired
- how reset works
- how Rive events are subscribed to
- how Rive listeners are cleaned up

The application should be able to use the component through a clean interface.

For example:

```tsx
<TreasureChest
  rewardType="coins"
  rewardAmount={50}
  onRewardReveal={...}
  onComplete={...}
/>
```

Adapt the API to the existing Teyro architecture.

The final API should be clean enough that a future developer can use a chest without understanding Rive.

---

# 7. SEPARATE VISUAL EXPERIENCE FROM BUSINESS LOGIC

This separation is mandatory.

## Rive owns:

- chest animation
- chest progression
- opening
- reward animation
- reveal timing
- secondary motion
- internal animation state
- reset/replay animation
- visual reward category

## Teyro owns:

- reward eligibility
- reward amount
- reward source
- reward ID
- user eligibility
- claiming
- database updates
- API calls
- preventing duplicate rewards
- reward history
- analytics
- inventory/account updates

Never put business logic into the Rive animation.

Never make Rive responsible for adding coins or XP to the user's account.

---

# 8. REWARD TYPE MAPPING

Create a safe application-level mapping between Teyro reward types and Rive reward types.

For example:

```text
Teyro:
coins
xp
streakFreeze
xpBoost
hearts

Rive:
coinRewards
xpRewards
streakFreezeRewards
xpBoostRewards
hartRewards
```

BUT verify the exact names inside the `.riv` file first.

If `hartRewards` is intentionally spelled that way in Rive, preserve it.

Do not silently rename it to `heartRewards`.

Use TypeScript types/unions rather than arbitrary strings wherever practical.

---

# 9. REWARD AMOUNTS

The Rive component may receive:

```text
rewardType
rewardAmount
```

but only `rewardType` should control the Rive reward visual.

`rewardAmount` belongs to Teyro.

Examples:

```text
50 Coins
100 Coins
250 XP
1 Streak Freeze
2 Hearts
```

Rive should not decide these amounts.

The amount should come from the existing reward/business logic.

---

# 10. CHEST INTERACTION

The interaction should follow:

```text
Application determines reward
        ↓
Set Rive rewardType
        ↓
User interacts with chest
        ↓
TChest.click
        ↓
Rive handles progression
        ↓
Rive opens chest
        ↓
rewardReveal
        ↓
Teyro celebration/reward synchronization
        ↓
completion
        ↓
reset when another interaction is required
```

Do not recreate the animation in React.

Do not manually animate the chest with CSS.

Do not manually control `isReveal` unless inspection proves it is required.

---

# 11. USER INTERACTION SAFETY

Handle every realistic interaction problem.

The user may:

- click rapidly
- double-click
- spam-click
- tap repeatedly on mobile
- click while the animation is progressing
- click after the reward has already been revealed
- navigate away during the animation
- navigate back
- close/reopen a modal
- cause a React re-render
- switch tabs
- lose network connectivity
- have a slow device
- have the Rive file fail to load
- trigger the same component multiple times
- receive a stale reward
- attempt to replay an already claimed reward

Prevent invalid states.

The chest should have a clear internal application lifecycle such as:

```text
IDLE
↓
PREPARING
↓
OPENING
↓
REVEALED
↓
COMPLETED
↓
RESETTING
↓
IDLE
```

Adapt this to the actual Rive lifecycle.

Do not allow user input to create conflicting states.

---

# 12. DUPLICATE REWARD PROTECTION

This is critical.

The following must NEVER cause duplicate rewards:

- rapid clicking
- multiple event listeners
- React Strict Mode behavior
- component remounting
- navigation
- replaying the animation
- repeated `rewardReveal`
- network retries
- API retries
- browser refresh
- opening the same reward from multiple UI locations

Use the existing backend/idempotency system where available.

Do not rely solely on frontend state to protect valuable rewards.

A visual animation replay must never automatically mean another reward is granted.

---

# 13. REWARD REVEAL EVENT

Listen for:

`rewardReveal`

Use this event as the synchronization point for:

- reward reveal UI
- celebratory sound
- celebration animation
- reward amount display
- analytics
- visual counter animation

The event should not itself blindly grant the reward if the existing reward system handles claiming separately.

Determine the correct architecture by inspecting the existing reward system.

---

# 14. SOUND DESIGN — VERY IMPORTANT

Sound is a major part of this experience.

Do NOT treat the chest sounds as generic short UI click sounds.

The Treasure Chest should feel:

- exciting
- rewarding
- emotional
- premium
- memorable
- satisfying
- celebratory

The sound experience should make the user feel like they accomplished something.

We need **celebratory sound design**, not just button feedback.

## First inspect the existing Teyro audio system

Find:

- existing sound manager
- audio utilities
- celebration sounds
- XP sounds
- coin sounds
- reward sounds
- volume settings
- mute settings
- mobile audio handling
- audio asset conventions

Reuse the existing audio architecture where appropriate.

Do not create a second competing audio system.

---

# 15. CHEST SOUND SEQUENCE

The chest should have appropriate sound support for each important moment.

Think in terms of a complete audio journey:

### 1. Chest interaction

When the user activates the chest:

A satisfying interaction sound.

It should feel responsive but NOT like a tiny generic button click.

### 2. Chest anticipation / progression

As the chest progresses toward opening:

Use appropriate tension/build-up audio if the timing of the Rive animation supports it.

The sound should build anticipation.

### 3. Chest opening

When the chest opens:

Use a distinct opening sound.

This should feel substantial and rewarding.

### 4. Reward reveal

At `rewardReveal`:

This is the most important sound.

Use a proper celebratory reveal sound rather than a short notification beep.

It should have emotional impact.

### 5. Reward-specific layer

Where appropriate, add a subtle reward-specific sonic layer:

- Coins → satisfying wealth/reward sound
- XP → progression/energy sound
- Streak Freeze → special protective/power-up sound
- XP Boost → energetic boost sound
- Hearts → warm positive reward sound

Do not make every sound identical.

### 6. Completion

If the interaction has a final completion moment, provide an appropriate satisfying ending.

Avoid excessive sound layering.

---

# 16. SOUND QUALITY REQUIREMENTS

Do NOT use:

- generic browser beeps
- harsh notification sounds
- tiny one-shot clicks as the main reward sound
- annoying repetitive sounds
- childish sounds
- overly cartoonish sounds
- loud audio that clips
- sounds that become irritating after repeated use

The sound should fit Teyro's identity.

It should feel playful but polished.

It should work with repeated gamification use.

The reward reveal should feel like:

**"Yes. I actually earned something."**

not:

**"A button made a noise."**

---

# 17. AUDIO ASSET STRATEGY

Inspect whether suitable audio assets already exist.

If suitable assets exist:

Reuse them.

If the repository does NOT contain suitable chest-specific celebratory sounds, do not simply create fake filenames and pretend the assets exist.

Instead:

1. Determine whether the existing project has an approved sound-generation/asset workflow.
2. If an existing sound-generation capability is available in the development environment, create/source appropriate assets through that workflow.
3. Otherwise create the complete audio integration architecture and clearly identify the exact audio assets that still need to be supplied.
4. Use temporary clearly identified placeholders only if necessary for development.
5. Do not ship placeholder sounds as final production audio.

If suitable royalty-free audio assets are already approved for the project, use them according to their licensing requirements.

---

# 18. AUDIO FAILURE HANDLING

The chest must still work if audio fails.

Handle:

- browser autoplay restrictions
- muted device
- audio loading failure
- missing audio asset
- unsupported audio format
- interrupted playback
- user navigating away
- multiple sounds triggering simultaneously

A sound failure must NEVER break the reward interaction.

Do not block the chest animation waiting for audio.

---

# 19. AUDIO SETTINGS

Respect Teyro's existing:

- master volume
- sound effects volume
- mute settings
- accessibility settings

If the application already has these settings, integrate with them.

Do not create duplicate sound settings.

On mobile, account for browser audio policies.

Audio should only begin when browser policies permit it.

---

# 20. RIVE INSTANCE LIFECYCLE

The `.riv` instance should remain loaded where practical.

Do NOT:

```text
destroy
reload .riv
destroy
reload .riv
```

for every reward.

Use the Rive:

`reset`

trigger to replay the experience.

Clean up all listeners when the component unmounts.

Make sure repeated mounting/unmounting does not create:

- duplicate `rewardReveal` listeners
- memory leaks
- duplicate sounds
- duplicate callbacks

---

# 21. UNIVERSAL API

Design the Treasure Chest component so that future Teyro features can use it easily.

A future developer should be able to do something conceptually like:

```tsx
<TreasureChest
  rewardType="coins"
  rewardAmount={100}
  source="daily_chest"
  onRewardReveal={handleReveal}
  onComplete={handleComplete}
/>
```

Or:

```tsx
<TreasureChest
  rewardType="xp"
  rewardAmount={250}
  source="monthly_quest"
/>
```

Or:

```tsx
<TreasureChest
  rewardType="streakFreeze"
  rewardAmount={1}
  source="achievement"
/>
```

Do not hard-code Daily Chest behavior into the component.

`source` should be optional if useful for analytics/debugging, but do not add unnecessary API complexity.

---

# 22. VISUAL PRESENTATION

The TreasureChest component should be presentation-flexible.

It should work inside:

- Daily Chest card
- modal
- reward screen
- quest completion screen
- achievement screen
- course completion screen
- full-screen celebration

Do not hard-code one width/height or one parent layout.

Allow the parent to control sizing while the Rive animation maintains the appropriate aspect ratio.

Ensure:

- mobile responsiveness
- desktop responsiveness
- small-screen support
- touch interaction
- no accidental overflow
- no blurry rendering caused by unnecessary scaling

---

# 23. ACCESSIBILITY

Make the interaction accessible where practical.

Consider:

- keyboard interaction
- focus behavior
- reduced-motion preferences
- screen reader labeling
- non-audio feedback
- visual reward confirmation

If reduced motion is enabled, determine what can safely be reduced without breaking the Rive experience.

Never make sound the only way the user knows they received a reward.

---

# 24. CREATE A TREASURE CHEST TEST BENCH

Create a dedicated internal development/test page for the Treasure Chest.

For example:

`/dev/treasure-chest`

or whatever development/testing route convention already exists in Teyro.

This is NOT a production-facing feature.

The test bench should allow me to test the entire interaction without having to trigger a real Daily Chest or real reward.

## Test controls

Include controls for:

### Reward type

- Coins
- XP
- Streak Freeze
- XP Boost
- Hearts

### Reward amount

Allow me to enter a test amount.

Examples:

```text
10
50
100
250
1000
```

### Source

Allow testing different sources:

- Daily Chest
- Quest
- Monthly Quest
- Achievement
- Course
- Test

### Actions

Buttons:

- Load Chest
- Set Reward
- Start
- Click
- Reset
- Replay
- Unmount
- Remount

### Event log

Display a developer event timeline:

```text
Rive loaded
View Model found
Reward type set: coinRewards
Click triggered
Reward reveal event received
Reward: 50 coins
Completion received
Reset triggered
```

This is extremely useful for debugging.

---

# 25. TEST BENCH SOUND CONTROLS

The test bench should also have:

- Sound ON/OFF
- Master volume
- Test interaction sound
- Test opening sound
- Test reward reveal sound
- Test completion sound

If the final audio assets are not yet available, clearly show which sounds are placeholders/missing.

---

# 26. TEST BENCH ERROR SIMULATION

The test bench should allow developers to test failure scenarios where practical.

Test:

- Rive load failure
- missing asset
- invalid reward type
- rapid clicking
- repeated reset
- reveal event fired multiple times
- component unmount during animation
- remount during animation
- sound failure
- network failure during reward claim
- duplicate claim attempt

The test bench should make it easy to verify that the UI fails gracefully.

---

# 27. TEST BENCH MUST NOT MODIFY REAL USER DATA

The test bench must never:

- grant real coins
- grant real XP
- modify a real user's streak
- consume a real streak freeze
- modify production reward history
- trigger real reward APIs

It must use mocked/test data.

If the current development environment has a safe mock API architecture, use it.

Otherwise keep the test bench purely visual and event-driven.

---

# 28. FIND ALL EXISTING CHEST USAGES

After creating the universal component, search the application for existing chest implementations.

Where appropriate, migrate them to the new:

`TreasureChest`

component.

Do not blindly replace unrelated UI that happens to contain the word "chest".

Only migrate actual reward/chest experiences.

The objective is:

```text
One Rive file
        ↓
One universal TreasureChest component
        ↓
Many Teyro features
```

For example:

```text
Daily Chest ────────┐
Quest Reward ───────┤
Monthly Quest ──────┤
Achievement ────────┤
Course Reward ──────┤
Special Event ──────┤
                    ↓
            TreasureChest
                    ↓
          treasure_chest.riv
```

---

# 29. DO NOT DUPLICATE RIVE CODE

Do NOT create:

```text
DailyChestRive.tsx
QuestChestRive.tsx
AchievementChestRive.tsx
```

unless there is an extraordinary technical reason.

Create:

```text
TreasureChest.tsx
```

and make the parent features configure it.

---

# 30. STATE AND CALLBACK CONTRACT

Define a clean contract between the component and the application.

Consider callbacks such as:

```text
onStart
onRewardReveal
onComplete
onError
```

Only include callbacks that are actually useful.

The callbacks should provide enough context for the parent to respond appropriately.

For example:

```text
rewardType
rewardAmount
source
```

where appropriate.

Do not expose raw Rive internals to every caller.

---

# 31. ERROR BOUNDARIES

The Treasure Chest should fail gracefully.

Potential failures include:

- `.riv` missing
- `.riv` corrupted
- Rive runtime failure
- View Model unavailable
- reward property unavailable
- trigger unavailable
- event unavailable
- audio unavailable
- browser restrictions
- invalid configuration
- parent component unmount
- unexpected Rive state

Log useful development errors.

Do not expose technical errors to users.

Provide an appropriate fallback experience.

---

# 32. OBSERVABILITY

Use the existing Teyro analytics architecture if available.

Track useful events such as:

```text
treasure_chest_loaded
treasure_chest_started
treasure_chest_reward_revealed
treasure_chest_completed
treasure_chest_reset
treasure_chest_error
```

Do not add analytics if the project already has an equivalent event system that should be reused.

Do not send excessive events on every animation frame.

---

# 33. PERFORMANCE

This interaction will appear throughout Teyro, so performance matters.

Ensure:

- `.riv` isn't unnecessarily downloaded multiple times
- Rive isn't initialized repeatedly
- listeners are cleaned up
- sounds don't overlap uncontrollably
- assets are loaded efficiently
- React renders are minimized
- mobile performance remains smooth

Do not introduce a global singleton unless the existing architecture genuinely benefits from it.

Avoid premature complexity.

---

# 34. SECURITY / TRUST MODEL

Treat the frontend as untrusted.

Never trust:

```text
rewardAmount
rewardType
source
```

from the client for actual reward granting.

Actual rewards must continue to be validated by the backend/existing reward system.

The Rive animation is purely presentation and interaction.

---

# 35. TEST EVERYTHING

Before considering this complete, test:

## Rive

- Rive loads
- View Model loads
- reward type changes correctly
- click works
- reset works
- rewardReveal fires
- replay works
- multiple mounts work
- unmount works

## Rewards

- Coins
- XP
- Streak Freeze
- XP Boost
- Hearts

Use the exact supported types found in the `.riv` file.

## Interaction

- single click
- double click
- rapid click
- mobile touch
- keyboard
- reset during animation
- unmount during animation
- remount

## Audio

- interaction sound
- anticipation/progression sound if implemented
- opening sound
- reward reveal celebration
- reward-specific sound
- completion sound
- muted state
- volume changes
- autoplay restrictions
- missing audio
- failed audio

## Application

- Daily Chest
- any existing chest-based rewards
- modal usage
- full-screen usage
- mobile
- desktop

## Errors

- missing `.riv`
- invalid Rive View Model
- missing reward type
- Rive runtime error
- sound error
- API/network failure
- duplicate reward attempt

---

# 36. BUILD / TYPECHECK / LINT

Use the existing scripts from `package.json`.

Run:

- TypeScript checks
- lint
- tests
- production build

Fix errors caused by this implementation.

Do not hide errors with `any`, `@ts-ignore`, or similar shortcuts.

---

# 37. REVIEW THE FINAL DIFF

Before finishing:

- review every changed file
- remove debugging code that should not ship
- remove temporary console logs unless useful under the project's logging convention
- ensure test-only code is appropriately isolated
- ensure no unrelated files were modified
- ensure no production reward logic was accidentally changed
- ensure no real reward API is called from the test bench

---

# 38. GIT / STAGING

Before changes:

```bash
git status
```

Do not overwrite unrelated user changes.

Work on the existing staging/development branch.

After implementation:

- run all checks
- review diff
- commit if that is consistent with the existing workflow
- push to staging/development if that is the established workflow

Do NOT push directly to production/main unless explicitly instructed.

---

# FINAL REPORT

When complete, give me a concise but complete report containing:

### Rive
- package installed
- `.riv` location
- exact View Model discovered
- exact triggers discovered
- exact reward types discovered
- exact events discovered

### Component
- universal component location
- public API
- lifecycle/state handling
- reset/replay implementation
- event handling

### Rewards
- reward mapping
- how reward amounts are handled
- duplicate reward protection
- backend/business logic separation

### Audio
- existing audio system used
- sounds implemented
- which sound plays at each interaction stage
- which sounds are celebratory vs interaction sounds
- any assets still required

### Existing features
List every existing chest implementation you found and whether it was migrated.

### Test bench
- route
- controls
- reward types tested
- sound controls
- error scenarios tested

### Validation
- lint result
- TypeScript result
- tests result
- build result

### Problems
Clearly report anything that could not be completed.

Do NOT claim something works unless you actually tested it.

---

# MOST IMPORTANT PRINCIPLES

1. **One universal Treasure Chest system.**
2. **Every Teyro chest experience should use the same Rive experience.**
3. **Do not rebuild Rive animation in React.**
4. **Do not guess the Rive API — inspect the actual `.riv`.**
5. **Rive handles visual interaction; Teyro handles business logic.**
6. **Reward amounts stay outside Rive.**
7. **`rewardReveal` is the key synchronization point.**
8. **Use `reset` instead of unnecessarily reloading the `.riv`.**
9. **Prevent duplicate rewards under every realistic interaction scenario.**
10. **Sound is a major part of the experience, not an afterthought.**
11. **Use substantial, emotional celebratory sounds for reward moments, not tiny generic UI beeps.**
12. **Audio failure must never break the reward experience.**
13. **Create a dedicated Treasure Chest test bench so every interaction can be tested independently.**
14. **Do not grant real rewards from the test bench.**
15. **Do not modify unrelated parts of Teyro.**

Build this as a production-quality foundation that future Teyro features can reuse without having to understand Rive internals.