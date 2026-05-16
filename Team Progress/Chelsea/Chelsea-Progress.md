# Chelsea's Task Progress

## Purpose
This file is the central location for task assignment and status tracking for Chelsea. The Lead Developer will assign tasks here, and Chelsea should update the status as they progress.

## How to use
- `[ ]` - Not Started
- `[/]` - In Progress
- `[x]` - Completed

## Active Tasks
- [ ] **Implementation of Teyro Creator Onboarding Flow (Full Stack)**
    - **Mission**: Transform the creator onboarding experience into a high-conversion, "Creator OS" entry point. This isn't just a form; it's a premium, psychological journey that establishes Teyro as the next-generation infrastructure for AI-powered learning.
    - **Core Tech Stack**: 
        - **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion (for game-like transitions).
        - **Backend**: NestJS (Render production backend).
        - **Database**: Prisma + Supabase (Linking onboarding data to `CreatorProfile`).
    - **Visual Assets**: `frontend/public/teyro creator onbarding flow`. Match filenames (ST1, ST2...) to the steps below.
    - **Production Standards**:
        - **Pixel Perfection**: 100% fidelity to Hifi UI. 10px rounded corners, 48px input height.
        - **Interactivity**: Use `lucide-react` for UI and `react-icons/fa` for brands. No emojis.
        - **Responsiveness**: Fluid layout across Desktop, Tablet, and Mobile.
        - **Anti-Slop**: Consult `docs/AVOID_AI_SLOP.md`. No generic gradients or sterile spacing.
    
    - **Strategic Workflow**:
        1. **Public Hook**: Build **Step 1** (Welcome) on a public route. It should lead to the Signup/Auth page.
        2. **Standalone Test Flow**: Build **Steps 2–15** as a standalone route (e.g., `/creator-onboarding/flow`) with a mocked user session. This allows you to iterate on the 14 steps without re-creating accounts.
        3. **Final Integration**: Once perfected, lock the flow behind auth and ensure data persists to the real Creator profile.

    - **Granular Flow Breakdown**:
        - **Phase 1: Emotional Hook (Excitement & Positioning)**
            - **STEP 1 — Welcome**: "Teach online differently." Goal: Emotional buy-in. Visual: `Creator welcome screen dashboard image.png`.
            - **STEP 2 — Creator Identity**: "What best describes you?" (Course creator, YouTube educator, etc.). Goal: Identity reinforcement.
            - **STEP 3 — Teaching Category**: "What do you teach?" Goal: Platform personalization using interactive cards.
        - **Phase 2: Creator Understanding (Learning About the Creator)**
            - **STEP 4 — Audience Size**: "How big is your audience today?" Goal: Personalized journey based on scale. Visual: `CF_ST4_graph.png`.
            - **STEP 5 — Current Platform**: "Where do you currently teach?" (Udemy, YouTube, WhatsApp, etc.). Goal: Migration understanding.
            - **STEP 6 — Existing Content**: "Do you already have teaching content?" Goal: Assess readiness level.
        - **Phase 3: Pain & Desire (The Psychological Core)**
            - **STEP 7 — Biggest Challenge**: "What’s your biggest challenge right now?" Goal: Emotional resonance (e.g., "Learners don't finish").
            - **STEP 8 — Revenue Goal**: "How much would you LIKE to make monthly?" Goal: Connect success with Teyro. Visual: `CF_ST8_side_img.png`.
            - **STEP 9 — Creator Dream Screen**: "Your expertise deserves more than unfinished courses." Goal: Future pacing. Show Teyro's impact on completion and loyalty.
        - **Phase 4: Teyro Education (The "Why Teyro" Moment)**
            - **STEP 10 — How Teyro Works**: Interactive feature showcase (AI-guided learners, smart accountability). Visual: `CF_ST10_cardX.png`.
            - **STEP 11 — AI Creator Assistant**: "Meet your AI creator copilot." Show course structuring, quiz generation, etc. Goal: Futuristic feel.
        - **Phase 5: Creator Intent (Setting Up First Success)**
            - **STEP 12 — Intent**: "What do you want to do first?" Goal: Personalized dashboard setup (e.g., Upload course vs. Create new).
            - **STEP 13 — Community Setup**: "Do you want a learner community?" Goal: Encourage adoption of community tools.
            - **STEP 14 — Creator Readiness Score**: "Your Creator Studio is 78% Ready 🚀." Goal: Momentum building. Show checked items (Niche, Revenue, Strategy).
        - **Phase 6: Dashboard Arrival (The Reward Moment)**
            - **STEP 15 — Enter Creator Studio**: "Your Creator Studio is Ready."
            - **Inside the Dashboard**: The dashboard should LAND on a **Personalized Onboarding Checklist** (Complete profile, Upload lesson, Create path, Invite learners).
    
    - **Backend & Database Specs**:
        - Create a `OnboardingResponse` table or update `CreatorProfile` to store these 15 data points.
        - All fetch calls must use `https://upskiill-backend.onrender.com`.
    - **Verification**: Playwright video recording showing the full flow transitions and mobile responsiveness.


## Backlog
- [ ] Reviewing Teyro UI components

## Completed
- [x] Onboarding to the Teyro codebase

- [x] **Pedagogical Copywriting: "Why this matters" Tooltips** (Deadline: May 8th)
  - **Location**: `frontend/app/creator/builder/[id]/page.tsx`
  - **Requirement**: Draft and implement the copy for the "Why this matters" buttons in Step 1.
  - **Details**: Provide pedagogical guidance for the following sections:
    - *Basic Information*: Focus on clarity and SEO.
    - *Course Description*: Focus on the "hook" and unique value proposition.
    - *Learning Outcomes*: Explain why outcomes are the "transformation" anchor.
    - *Skills Gain*: Explain how this powers the Teyro discovery engine.
    - *Prerequisites*: Explain how filtering the right audience improves completion.
  - **Implementation**: The buttons should trigger a clean tooltip or small popover explaining the "The Why" behind each section to the creator.
- [x] Initializing your development environment

## Task Details
### [ "Why this matters" Tooltips**]
- **Date**: 2026-05-10
- **Description**: I was assigned to Draft and implement the copy for the "Why this matters" buttons in Step 1.. handling all the details
  Basic Information, Course Description, Learning Outcomes, Skills Gain and the prerequest and to also ensure that the buttons should trigger a clean tooltip or small popover explaining the "The Why" behind each section to the creator
- **Files Modified**: I modified just the file page.tsx under builder folder.
- **Verification**: After pulling the code, i now prompted to commit to the task i was assigned to while checking the outcome and do modifications.
