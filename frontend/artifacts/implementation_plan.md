# Premium Creator Onboarding Animations

This plan outlines how we will transform the Creator Onboarding flow from a standard form into a delightful, interactive, and premium experience using high-quality micro-interactions, spring physics, and choreographed transitions.

> [!WARNING]
> **GSAP Club Plugins vs Framer Motion**
> Your instructions mentioned using GSAP Club plugins (`CustomEase`, `DrawSVG`, `CustomBounce`). These are **premium paid plugins** that require an active GSAP Club membership license key to install via a private NPM registry.
> 
> **Recommendation:** We already have **Framer Motion** installed (`^12.38.0`) in this React codebase. Framer Motion natively supports all the physics required (springs, bounce, drag), layout animations, SVG path drawing (equivalent to `DrawSVG`), and staggered entrance animations. I strongly recommend we use Framer Motion for the entire architecture to avoid licensing issues and keep the bundle clean.

## Open Questions

1. **Animation Library**: Do you approve using **Framer Motion** for all of these animations instead of the paid GSAP plugins? (Framer Motion is already perfectly suited for React and can execute every effect you requested, including the SVG path drawing and spring physics).
2. **Confetti Package**: I will install `canvas-confetti` for Step 16 as requested. Do you also want `react-circular-progressbar` for Step 14, or should I build a custom SVG circle animated directly with Framer Motion (which avoids adding another dependency)?

---

## Proposed Changes

We will centralize the animation variants and physics configs so they remain consistent across the flow.

### 1. Global Animation Configuration

#### [NEW] `frontend/lib/animations.ts`
Create a central file exporting reusable Framer Motion variants and spring physics constants:
- `springTransition`: Stiffness ~300, damping ~20.
- `pageVariants`: Handles the 280ms exit/enter sliding animations.
- `staggerContainer` & `staggerItem`: For staggered reveals (e.g., Step 9 and Step 14).
- `cardHover` & `cardTap`: Micro-interactions for selection cards.

### 2. Step Transitions & State

#### [MODIFY] `frontend/app/creator/onboarding/layout.tsx`
- Wrap the `<main>` children in an `<AnimatePresence mode="wait">` to coordinate the exit of the old step before the new step enters.
- Wrap each page's content in a `<motion.div>` using the central `pageVariants`.

### 3. Progress Bar Modernization

#### [MODIFY] `frontend/components/features/CreatorOnboarding/OnboardingProgressBar.tsx`
- **Connector Lines**: Convert the static background lines into SVG paths and use Framer Motion's `pathLength` to draw the line from left to right when a step completes.
- **Active Step Pulse**: Add a `repeat: Infinity` breathing scale animation to the current active step dot.
- **Checkmark Animation**: Animate the checkmark drawing itself in using SVG `pathLength` and `opacity`.

### 4. Selection Cards

#### [MODIFY] Selection Card Components (Steps 2, 3, 5, etc.)
- Wrap cards in `<motion.button>` or `<motion.div>`.
- Add `whileHover={{ y: -2, boxShadow: '...' }}` and `whileTap={{ scale: 0.97 }}`.
- Animate the active border and a bouncing checkmark that scales in from `0` to `1` using a spring bounce.

### 5. Continue Button Micro-interactions

#### [MODIFY] `frontend/components/ui/Button.tsx` (or specific step buttons)
- Add a shimmering sweep pseudo-element effect when transitioning from disabled to active.
- Introduce a micro-scale on click.

### 6. Choreographed Moments

#### [MODIFY] `frontend/app/creator/onboarding/9/page.tsx` (Value Reveal)
- Implement a staggered entrance timeline. 
- Headline appears first -> 5 feature points stagger in -> Dashboard mockup fades and scales up -> Bottom banner slides up.

#### [MODIFY] `frontend/app/creator/onboarding/14/page.tsx` (Progress Summary)
- Implement the 0% to 78% circular progress animation (taking 800ms).
- Stagger the entrance of the four completed checklist items ("Defined", "Set", etc.) so the checkmarks draw themselves in sequentially.

#### [MODIFY] `frontend/app/creator/onboarding/16/page.tsx` (Finish Line)
- Install `canvas-confetti`.
- Trigger a 2-second confetti burst from the bottom corners on mount.
- Animate the "Your Creator Studio is Ready" headline with a scale-up bounce.
- Add a continuous pulse/glow effect to the "Enter Creator Studio" button.

## Verification Plan

### Manual Verification
1. Click through the entire flow locally.
2. Verify that the Progress Bar lines draw smoothly and the active dot breathes.
3. Ensure page transitions feel snappy (280ms) and don't overlap awkwardly.
4. Verify the Step 9 stagger, Step 14 circular progress, and Step 16 confetti trigger perfectly on mount.
