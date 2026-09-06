# Teyro Onboarding — UI Implementation Rules

Scope: everything under `frontend/app/onboarding/`. Migrated from root CLAUDE.md §21 on 2026-08-24 so it loads only when working in the onboarding flow.

---

## Onboarding Flow & UI Implementation (Steps 1–15)

The onboarding flow consists of 15 sequential steps located under `frontend/app/onboarding/`. The designs must strictly adhere to the following principles:

### Core Layout Rules & Device Height Constraints
- **Strict 100vh Constraint on Mobile**: The entire onboarding page layout on mobile MUST be contained within exactly `100dvh`/`100vh` (dynamic/viewport height) to prevent scrolling. All elements must fit perfectly on the screen.
- **Centered Vertical Content**: Use flexible flex containers (`flex flex-col justify-center items-center`) so the core content (Mascots, Texts, Cards) centers naturally on the device viewport.
- **Mascot Image Sizing**: The mascot images on mobile should take up a significant portion of the top container (e.g., `80vw` to `90vw` or `80%` to `90%` of its container) and be aligned/centered vertically.
- **Button Margin Bottom**: The primary "Continue" button at the bottom of the page MUST have an explicit bottom margin (e.g., `mb-6` or `pb-8`) to prevent it from getting clipped by the bottom edge of mobile browser address bars/safe areas.

### Visual Styling & Silhouette Glows
- **White Hugging Silhouette Glow Effect**: To render legible dark text directly on blue/light-blue gradient backgrounds without using boxy rectangular cards, apply multi-layered white text shadows:
  - **Headline**: `textShadow: '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.1), 0 0 15px rgba(255,255,255,1), 0 0 35px rgba(255,255,255,0.95), 0 0 50px rgba(255,255,255,0.85)'`
  - **Subtitle**: `textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)'`
- **Soft Gradient Background Fade**: Match Onboarding Step 1's soft overlay at the bottom to transition from blue/transparent to solid white for button placement (`bg-gradient-to-b from-transparent via-white/90 to-white via-[25%]`).
- **Premium 3D Glassmorphism Cards**: For cards (like XP point badges or details), use semi-translucent backdrops and borders (`bg-white/60 backdrop-blur-md border border-white/80`) combined with thick 3D bottom borders (`border-b-[5px] border-slate-200/50`) and dark, layered drop shadows.
- **3D Text Outline Shadow**: Apply white text-shadow properties directly behind blue digits/labels (e.g. `+10 XP`) inside cards to give them 3D depth.

### Motion & Celebration Explosion Animations
- **Confetti Celebration Pop**: On pages that celebrate completion (e.g. Step 10), render a festive explosion of vector elements (e.g. 32 particles containing stars, circles, and ribbons) with dynamic spring animations.
- **Delayed Explosion Timing**: Set a `2.0 seconds` (2000ms) delay after the page loads before triggering the confetti explosion (`showConfetti` state), synchronized with a sensory haptic vibration chord (`navigator.vibrate([30, 80, 40])`).
- **Symmetrical Desktop Offsets**: Symmetrically multiply confetti particle offsets on desktop viewports (`x * 2.2`, `y * 1.8`) to fill the wide screens.
- **Playful Button Interactions**: Add playful micro-interactions to action buttons:
  - Continue button: text/icon scales, and the arrow slides rightward on hover (`group-hover:translate-x-1.5 transition-transform`).
  - Back button: arrow slides leftward on hover (`group-hover:-translate-x-1.5 transition-transform`).

### Skipping Steps Rules & Verification Actions
- **WhatsApp Verification Step**: The WhatsApp verification step is bypassed/skipped during onboarding.
- **Skip Step Actions**: Ensure pages have skip controls (uppercase links styled as `SKIP STEP` or skip buttons) that update the onboarding state cleanly.
- **Wins vs day streaks**: Emojis are completely banned. Streaks are tracked using onboarding wins or custom progress labels (e.g., `10 steps streak` instead of days).
