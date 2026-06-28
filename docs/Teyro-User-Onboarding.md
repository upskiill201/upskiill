Teyro User Onboarding Implementation Guide

Product: Teyro (EdTech 2.0)
Core Philosophy: Frictionless, Gamified, High-Velocity Time-to-Value (TTV)
**UX Standard:** Playful, Smooth, Delightful (See `TEYRO-UX-DESIGN-SYSTEM.md`)
Mascot: Tey (Requires continuous life/animation)

1. The Core Logic & Psychology

The fundamental goal of onboarding is not to teach the user how the app works, but to get them to experience the core value of the product as fast as possible.

Progressive Profiling (The "First Date" Rule): Instead of hitting the user with a massive form right at the start, ask for information gradually. Only ask for the data absolutely needed at that exact moment to move to the next step.

The IKEA Effect: Introduce "good friction." By asking a user questions to customize their experience, they invest effort into building their profile, making them less likely to abandon it.

Deferred Account Creation (The Duolingo Model): Do not ask users to create an account upfront. Assess their level, define their goals, and drop them directly into a micro-lesson. Let them experience the value of the app before asking for an email or phone number.

Commitment Upfront: Asking users to pick a daily goal (e.g., 5, 10, or 15 minutes) establishes a psychological contract and sets the foundation for the streak mechanic.

Industry Standards:

Use visual progress indicators (e.g., "Step 1 of 15").

Stick to "One Concept Per Screen" to minimize cognitive load.

Ensure skippability for non-essential steps.

Never ask for contextual permissions (like push notifications) before demonstrating their value.

2. Architecture & State Management

The flow is built on a structured, multi-page routing system to guarantee a crash-proof, native-feeling experience.

URL Structure: Use discrete Next.js routes (e.g., /onboarding/1 to /onboarding/15). This allows native browser navigation (the "Back" button works without breaking the app).

State Persistence: Use localStorage under the key teyro_onboarding as the single source of truth (not volatile React state). Use a saveOnboardingStep function to incrementally merge data into a JSON object: { step1: {...}, step2: {...} }.

Route Safeguard (useOnboardingGuard): Execute a custom hook at the top of every step component. It checks the lastCompletedStep. If a user attempts to manually manipulate the URL to skip ahead, the guard intercepts the render and forcefully redirects them to their last valid step.

Session TTL (Time-To-Live): Implement a 7-day expiration timer (MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000). If a user abandons the process and returns a month later, automatically wipe the stale localStorage data to prevent resuming with outdated goals or an expired backend Draft ID.

3. Security, Compliance & Safeguards

Because Steps 1 through 11 happen before account creation, unauthenticated users are interacting with live AI endpoints. Strict safeguards are required.

Unauthenticated AI Abuse Prevention: Malicious bots could drain OpenAI/Gemini API credits. Generate a secure sessionId on Step 1 (stored in cookies/localStorage). The backend must rate-limit AI generation requests based on this session ID and IP address (e.g., max 3 generations per IP per hour).

Client-Side Data Tampering: localStorage is easily editable in DevTools. Do not blindly trust the JSON payload when submitted. Use a strict validation schema (e.g., Zod in TypeScript) on the backend to sanitize and verify all inputs before creating the user profile.

COPPA Compliance (Age Gate): To comply with privacy laws regarding minors on EdTech platforms, subtly integrate a frictionless "Year of Birth" or "Age" selector early in the flow (e.g., merged into Step 4).

4. UI/UX "Juice" (The Sensory Experience)

To match the premium, playful standard of top-tier apps like Duolingo, the interface must respond physically and audibly to the user. Static code won't cut it.

Animation Stack: Export "Tey" using animated WebP or animated GIFs. We will use a Character View component to switch Tey's state based on the user's current context. To ensure zero-latency when switching states, all animated WebP/GIF assets must be aggressively preloaded in the background so that they start immediately from the first frame without showing empty frames. Tey must feel alive with continuous idle animations and reactive states.

Audio Management: Use howler.js to manage an "audio sprite" (one file containing all sounds) to guarantee zero-latency playback. Preload all audio assets the moment Step 1 mounts. (Note: The user will create and provide this audio sprite file).

Soft Plop: Organic bubble sound for selection options.

Spring Swish: Fast, airy sound for page transitions.

Ascending Chime: Satisfying snap/chime for success states and XP counters.

Haptic Feedback: Utilize the navigator.vibrate() API for tactile responses.

10ms for standard button clicks and selections.

20ms for successful matches or streak ignitions.

[30, 50, 30] double-pulse for major milestones (First Badge).

Micro-interactions: Use framer-motion for spring physics. Buttons and selection cards should physically depress (scale to 0.95) upon tapping and spring back up.

5. Screen-by-Screen Execution Playbook

Steps 1-5: Progressive Profiling

Goal: Capture current skill level, primary goals, and daily commitment.

Execution: Keep cognitive load minimal. Use spring physics on all card selections. Tey should react to user inputs (e.g., tracking the slider on Step 4). Add the COPPA Age Gate here smoothly.

Step 6: The WhatsApp Pivot

Goal: Secure high-conversion notification real estate and verify the user simultaneously.

Execution: Instead of web push notifications, ask for a WhatsApp number.

Value Exchange: "Take your AI Tutor with you. Get your 5-minute daily micro-lessons and streak reminders directly on WhatsApp."

OTP Verification: Send a 6-digit OTP via WhatsApp immediately. Entering this verifies the user is human, secures the AI flow from bots, and proves the WhatsApp pipeline works.

Compliance: Include a clear Meta opt-in copy ("I agree to receive daily learning reminders...") and store whatsappOptIn: true.

Formatting: Use react-international-phone to force E.164 formatting.

Step 7: Path Generation (The Labor Illusion)

Goal: Increase the perceived value of the AI customization.

Execution: Even if path generation takes 100ms, artificially hold the user on this screen for 2.5 to 3.5 seconds. Let them watch Tey "think" so they feel a personalized curriculum is genuinely being built.

Steps 8-10: Interactive Demo

Goal: Deliver the "Aha!" moment before asking for an email. Learn by doing.

Execution: Use @dnd-kit/core for flawless mobile touch collision and drag-and-drop mechanics (Step 9). Upon completion (Step 10), trigger react-confetti and rapidly count the "+10 XP" text up from 0 to 10, accompanied by ascending audio and haptics.

Step 11: Streak Ignition & Push Notifications

Goal: Establish the daily habit mechanic and secure native permissions.

Execution: Tey's flame must be a continuous, organic flickering loop. Trigger a "whoosh" ignition sound and a medium haptic pulse (navigator.vibrate(20)). This is the ideal time to ask for native push notifications ("Turn on notifications to protect your daily streak") because the user has already experienced value.

Step 12: Frictionless Auth (Save Progress)

Goal: Convert the invested user with zero drop-off, leveraging the sunk-cost fallacy.

Execution: Because the user verified their phone number via WhatsApp on Step 6, you can bypass email OTP verification here. If they click "Continue with Email", they enter an email and password, and the account is instantly bound to their verified phone number. For OAuth (Google/Apple), ensure an immediate loading spinner within the clicked button during the token exchange.

Step 13: First Badge (Dopamine Spike)

Goal: Spike dopamine through gamified rewards, feeling like opening a rare item.

Execution: The "Novice" badge must snap into place starting from scale: 0.5 using heavy spring physics (e.g., type: "spring", stiffness: 300, damping: 15). Execute the "Ta-Da" stack: Achievement sound + Double-pulse haptic ([30, 50, 30]) + Burst confetti from the center of the badge.

Step 14: Social Proof (Leaderboard)

Goal: Establish community and competitive momentum.

Execution: Stagger the entrance of the leaderboard rows sliding up from the bottom (staggerChildren: 0.1s). Play a subtle, high-pitched "tick" audio file as each row locks into place.

Step 15: The Final Handoff (Dashboard Ready)

Goal: Transition to the core product without jarring loading screens.

Execution: While the user is enjoying Steps 14 and 15, silently prefetch the populated /dashboard data in the background (via React Query, SWR, or Next.js server actions). When "Go to Dashboard" is clicked, trigger an instant, smooth fade-in transition. Finally, execute a cleanup function to wipe the teyro_onboarding object from localStorage to prevent accidental resumption.