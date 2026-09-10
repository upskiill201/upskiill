# Teyro Section Completion & Celebration Experience

## Overview

The section/module completion experience should turn the completion of the final lesson in a section into a meaningful progression moment.

The experience should not feel like a simple "Lesson Complete" popup. It should communicate three things clearly:

1. **The learner accomplished something** — they completed an entire section.
2. **The learner can see their progress** — both within the completed section and across the entire course.
3. **The learner has somewhere to go next** — the next section is unlocked and presented as the next step.

The experience should take inspiration from the progression and celebration patterns used by Duolingo, while remaining visually and behaviorally consistent with Teyro.

For now, the experience should use the existing **static Tey image**. The Rive animation/state machine should not be required for this implementation. The UI should be structured so that the static Tey image can later be replaced with Rive states without requiring a redesign of the experience.

---

# 1. Completion Trigger

The experience starts when the learner completes the **last lesson of a section/module**.

The system should determine whether the completed lesson is the final lesson in its section.

### If it is NOT the final lesson

Use the existing normal lesson-completion experience.

### If it IS the final lesson

After the normal lesson completion/reward moment, transition into the **Section Completion Celebration**.

The learner should not immediately be returned to the course page.

---

# 2. Section Completion Celebration

The first screen should clearly communicate that the learner has completed an important milestone.

### Main content

- Celebration/confetti effect
- Tey static image
- Section completion message
- Name of the completed section
- Strong visual emphasis on the achievement

Example structure:

```text
                🎉

          SECTION COMPLETE!

              [Tey]

       Understanding Your Market

          Great work!
```

The Tey image should be visually prominent.

The celebration can use UI animation even though Tey itself is static:

- Confetti
- Floating particles
- Subtle background effects
- Scale/bounce animation on the Tey image
- XP/reward micro-animations
- Progress bar animation

The experience should feel alive without depending on Rive.

---

# 3. Section Progress

After the initial celebration, show the learner exactly what they completed inside the section.

The section progress should reach **100%** and visibly animate to completion.

Example:

```text
SECTION PROGRESS

Understanding Your Market

████████████████████ 100%

6 / 6 Lessons
24 / 24 Activities
```

The exact metrics should use the data already available in Teyro.

At minimum, show:

- Section/module name
- Section completion percentage
- Completed lessons / total lessons

If activity-level progress is available, also show:

- Completed activities / total activities

The purpose is to make the learner understand that they completed the **entire section**, not merely one lesson.

---

# 4. Overall Course Progress

The celebration must also show the learner's overall progress through the course.

This should appear after or alongside the section progress.

Example:

```text
COURSE PROGRESS

Entrepreneurship 101

██████████░░░░░░░░░░ 50%

3 of 6 Sections Completed
18 of 36 Lessons Completed
```

The course progress should update based on the newly completed section.

For example, if the learner was previously at 40%, the progress bar should animate from:

```text
40%
████████░░░░░░░░░░░░
```

to:

```text
50%
██████████░░░░░░░░░░
```

This makes the learner visually see that completing the section moved them forward in the larger course journey.

The system should calculate the progress from actual course data rather than using hardcoded values.

---

# 5. Completion Results

After the section and course progress, show a concise summary of what the learner earned/accomplished.

Example:

```text
YOUR RESULTS

🏆 Section Completed
⭐ +180 XP
🔥 7 Day Streak
📚 6 Lessons Completed
```

The values must be dynamically generated from the learner's actual completion/reward data.

Important:

**The achievement itself is the reward.**

Do not grant additional coins or XP simply because the user claimed/unlocked an achievement.

XP, streaks, and other rewards earned from the lessons should remain separate from the achievement.

---

# 6. Next Section Unlock

If the completed section is NOT the final section in the course, the next section should be unlocked as part of the celebration.

The next section should initially appear locked.

Example:

```text
🔒

SECTION 2
Validate Your Idea

Locked
```

Then play a simple unlock transition:

```text
🔒 → ✨ → 🔓
```

The next section should then change to its unlocked state.

Display:

```text
✨ SECTION UNLOCKED

Validate Your Idea
```

This unlock should happen automatically after the learner completes the current section.

The unlock state must also persist in the actual course data/database so that leaving and returning to the course does not lock the section again.

---

# 7. Next Section Preview

After unlocking the next section, show a short preview of what the learner can do next.

Example:

```text
SECTION 2

Validate Your Idea

5 Lessons
~25 Minutes

Learn how to test whether
your idea solves a real problem.

[ Start Section ]

[ Back to Course ]
```

The available metadata should come from the actual section data.

The primary CTA should be:

**Start Section**

The secondary CTA should allow the learner to return to the course.

The goal is to create forward momentum rather than simply ending the celebration.

---

# 8. Complete User Flow

The complete flow should be:

```text
User completes final activity
            ↓
Determine whether lesson is
the final lesson in the section
            ↓
      YES — Section Complete
            ↓
Normal lesson reward
            ↓
Section Celebration
            ↓
Tey static image + celebration effects
            ↓
Section Progress → 100%
            ↓
Overall Course Progress updates
            ↓
Completion Results
            ↓
Is there another section?
       ↙              ↘
     YES               NO
      ↓                 ↓
Unlock next        Course Complete
section
      ↓                 ↓
Next Section       Course Completion
Preview             Celebration
      ↓
Start Section /
Back to Course
```

---

# 9. Final Section / Course Completion

If the completed section is the final section of the course, do not show a "Next Section Unlocked" experience.

Instead, transition into a larger **Course Completion Celebration**.

Example:

```text
                🎉🎉🎉

             COURSE COMPLETE!

                 [Tey]

       You completed the entire course!

       ████████████████ 100%

       6 / 6 Sections
       36 / 36 Lessons
```

Then show the final results:

```text
YOUR RESULTS

🏆 Course Completed
⭐ Total XP
🔥 Current Streak
📚 Lessons Completed
```

If the course supports certificates and the learner has earned one, show:

```text
Certificate Unlocked

[ View Certificate ]
```

Also provide:

```text
[ Continue Learning ]
```

The course completion experience should feel more significant than a normal section completion.

---

# 10. Tey Static Image Implementation

The current implementation should use the existing Tey static image.

Do not block this feature waiting for:

- Rive animation
- Rive state machine
- Tey animation states
- Animation event handling

The static Tey image should be placed in a reusable component so it can later be replaced by the Rive implementation.

For example, conceptually:

```text
<TeyCelebrationVisual />
```

For the current version, this component renders the static Tey image.

Later, the same component can render the appropriate Rive animation/state.

This prevents the celebration experience from being tightly coupled to the current Tey implementation.

---

# 11. Animation & Interaction Requirements

The experience should use lightweight UI animations to make completion feel rewarding.

Recommended animations:

### Celebration

- Confetti entrance
- Tey image scale/bounce
- Background particles
- Text entrance

### Section progress

Animate the progress bar from the previous percentage to 100%.

### Course progress

Animate the overall course progress from the previous percentage to the new percentage.

### Section unlock

Animate:

```text
Locked → Unlocking → Unlocked
```

The lock can shake/open/disappear and reveal the unlocked section.

### CTA

The primary CTA should have a subtle entrance after the unlock experience is complete.

Animations should be fast and polished rather than slow or excessive.

---

# 12. Navigation & Persistence

The celebration should not create duplicate completion/unlock states.

When the learner completes the final lesson:

1. Mark the lesson as completed.
2. Mark the section as completed.
3. Update the learner's course progress.
4. Unlock the next section if one exists.
5. Persist the updated state.
6. Show the celebration experience.

If the user refreshes, leaves, or returns to the course afterward:

- The completed section remains completed.
- The next section remains unlocked.
- Course progress remains updated.

The celebration itself is a presentation layer over the completion event; it should not be the source of truth for completion.

---

# 13. Important UX Principle

The experience should follow this emotional sequence:

```text
CELEBRATE
    ↓
UNDERSTAND WHAT WAS ACHIEVED
    ↓
SEE PROGRESS
    ↓
UNLOCK WHAT COMES NEXT
    ↓
CONTINUE
```

It should not feel like an analytics dashboard.

The celebration should come first. The progress information should reinforce the accomplishment.

The learner should leave the experience feeling:

> "I finished something."

Then:

> "I can see how far I've come."

Then:

> "There's something new waiting for me."

---

# 14. Responsive Design

The celebration must work well across:

- Desktop
- Tablet
- Mobile
- Small mobile screens

The experience should be designed mobile-first because Teyro's learning experience is mobile-first.

On smaller screens:

- Tey should remain clearly visible.
- Progress information should remain readable.
- The primary CTA should remain easily accessible.
- Avoid requiring excessive scrolling for the main celebration.
- Do not allow confetti/visual effects to interfere with text or buttons.

---

# 15. Accessibility & Controls

The celebration should not trap the learner.

Provide a clear primary CTA to continue.

Where appropriate, allow the learner to skip or quickly continue past the celebration.

Animations should respect reduced-motion preferences if supported by the application.

All important information must remain understandable without relying solely on animation.

---

# 16. Implementation Summary

The feature should ultimately provide two major celebration states:

### Section Completion

```text
Final Lesson
    ↓
Lesson Complete
    ↓
🎉 Section Complete
    ↓
Tey Static Image
    ↓
Section Progress = 100%
    ↓
Overall Course Progress Updated
    ↓
Results
    ↓
Next Section Unlocked
    ↓
Next Section Preview
    ↓
Start Next Section
```

### Course Completion

```text
Final Lesson
    ↓
Lesson Complete
    ↓
🎉 Course Complete
    ↓
Tey Static Image
    ↓
Course Progress = 100%
    ↓
Final Results
    ↓
Certificate (if applicable)
    ↓
Continue Learning / Exit
```

The implementation should be modular so the current static Tey image can later be replaced with Rive animations without changing the underlying completion flow.
