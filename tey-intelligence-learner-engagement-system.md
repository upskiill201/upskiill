# Tey Intelligence & Learner Engagement System

## Product and Engineering Specification

### Status

**Planned architecture — implementation should be phased.**

The first version of Tey's follow-up and reminder system will use **push notifications as the primary channel**, similar to the way Duolingo uses reminders to bring learners back to learning.

**WhatsApp will be introduced after the push notification system is stable.**

The animated/Rive mascot states are **not part of the first implementation**. The backend should, however, be designed so that a future Tey state can be attached to the same event/context that drives a notification. This allows Rive states to be added later without rebuilding the intelligence and notification architecture.

---

# 1. Purpose

Tey should eventually feel like a learning companion that is aware of the learner's activity, progress, habits, streaks, and learning situation.

Tey should not simply send generic reminders such as:

> "Come back and learn today."

Instead, Teyro should understand what is happening with the learner and act when there is a meaningful reason to do so.

Examples:

- A learner has not completed today's lesson.
- A learner's streak is approaching its expiration.
- A learner normally studies at 8 PM but has not started learning.
- A learner abandoned a lesson.
- A learner returned after several days away.
- A learner completed a difficult milestone.
- A learner is progressing well.
- A learner appears to be struggling.
- A learner has completed today's goal and therefore no longer needs a reminder.

The system should turn these situations into appropriate actions.

The long-term objective is:

> **Teyro should know the learner's current learning state and use that state to determine when, why, where, and how Tey should interact with the learner.**

---

# 2. Core Product Principle

The system must **not** be designed as an AI that constantly watches every learner.

That approach would be expensive, inefficient, and difficult to scale.

Instead, Teyro should use an **event-driven architecture**.

The fundamental flow is:

```text
User Activity
      ↓
Activity Event
      ↓
Learner State Updated
      ↓
Rules / Decision Engine
      ↓
Does Tey need to act?
      ↓
If yes → create an engagement action
      ↓
Notification Scheduler
      ↓
Push Notification
      ↓
User returns to Teyro
```

The system should only perform work when something happens or when a scheduled action becomes due.

It should never repeatedly scan every user every minute just to determine whether something changed.

---

# 3. High-Level Architecture

```text
                         TEYRO
                           │
                    ┌──────┴──────┐
                    │             │
                 WEB APP      NATIVE APP
                    │             │
                    └──────┬──────┘
                           ↓
                    ACTIVITY EVENTS
                           ↓
                  EVENT PROCESSING
                           ↓
                 LEARNER STATE ENGINE
                           ↓
                 TEY DECISION ENGINE
                           ↓
                     TEY CONTEXT
                           │
                    ┌──────┴──────┐
                    │             │
              NOTIFICATION      AI LAYER
                 ENGINE             │
                    │               │
                   PUSH         Future/Selective
                    │               │
                    └──────┬────────┘
                           ↓
                         USER
                           │
                           ↓
                     USER ACTIVITY
                           │
                           └──────────→ EVENT LOOP
```

Later, WhatsApp will be added:

```text
                    TEY DECISION ENGINE
                           ↓
                     TEY CONTEXT
                           ↓
                  NOTIFICATION ENGINE
                     /           \
                    /             \
                 PUSH          WHATSAPP
```

And later still, Rive will consume the same Tey context:

```text
                     TEY CONTEXT
                          │
             ┌────────────┼────────────┐
             ↓            ↓            ↓
           PUSH        WHATSAPP       RIVE
                                      STATE
```

This means the future mascot state does not need to be tightly coupled to the notification system.

---

# 4. Important Implementation Phasing

The system should be built in phases.

## Phase 1 — Activity Tracking

Build the event system and learner state.

## Phase 2 — Follow-Up and Reminder Engine

Build rules that identify when a learner needs a reminder or follow-up.

## Phase 3 — Push Notifications

Use push as the first delivery channel.

This is the primary launch version of the engagement system.

## Phase 4 — Tey Context

Create a standardized context object describing why Tey is acting.

## Phase 5 — AI Layer

Use an LLM selectively to generate personalized messages and understand conversational requests.

## Phase 6 — WhatsApp

Add WhatsApp as a secondary and more conversational engagement channel.

## Phase 7 — Rive / Mascot States

Connect Tey's animated states to the same Tey context.

The Rive state system should come later because the animation/state-machine implementation is not yet ready.

---

# 5. Activity Tracking

The web app must send meaningful learner events to the backend.

The activity tracker should not record every tiny UI interaction.

Track events that have product meaning.

Examples:

```text
user_signed_up
user_logged_in
lesson_opened
lesson_started
lesson_completed
lesson_abandoned
quiz_started
quiz_completed
quiz_failed
course_opened
course_enrolled
course_completed
daily_goal_completed
daily_goal_missed
streak_extended
streak_lost
app_opened
subscription_started
subscription_cancelled
```

Additional events can be introduced as the product evolves.

Each event should contain enough information for the backend to understand what happened.

Example:

```json
{
  "event": "lesson_completed",
  "user_id": "123",
  "lesson_id": "456",
  "course_id": "789",
  "timestamp": "2026-08-26T20:42:00Z"
}
```

The exact event schema should be standardized and documented before implementation.

---

# 6. Learner State Engine

The activity events should update a persistent learner state.

Do not calculate everything from raw historical activity every time Tey needs information.

Maintain a current state that can be retrieved quickly.

Example:

```text
Learner State

user_id: 123

current_streak: 12
last_learning_activity: 2026-08-25 20:42
today_goal_completed: false

weekly_lessons_completed: 5
weekly_goal: 7

current_course_id: 789
current_lesson_id: 456
course_progress: 62%

engagement_state: ACTIVE
streak_state: AT_RISK
performance_state: GOOD
```

When a learner completes a lesson, the state should be updated.

For example:

```text
Before:

streak = 11
today_goal_completed = false

Event:

lesson_completed

After:

streak = 12
today_goal_completed = true
```

This makes the system fast and avoids repeatedly processing large amounts of historical data.

---

# 7. Learner States

The system should derive meaningful states from activity.

These are not necessarily AI-generated states. Most should be deterministic.

## Streak states

```text
STREAK_SAFE
STREAK_ACTIVE
STREAK_AT_RISK
STREAK_CRITICAL
STREAK_LOST
```

Example:

A learner completed today's goal:

```text
STREAK_SAFE
```

A learner has not completed today's goal and their usual learning time has passed:

```text
STREAK_AT_RISK
```

The day is almost over:

```text
STREAK_CRITICAL
```

The day expires without completing the goal:

```text
STREAK_LOST
```

---

## Engagement states

```text
ACTIVE
COOLING_DOWN
INACTIVE_1_DAY
INACTIVE_3_DAYS
INACTIVE_7_DAYS
RETURNING
```

---

## Learning performance states

These can be introduced gradually.

```text
PERFORMING_WELL
STABLE
STRUGGLING
DECLINING
IMPROVING
```

---

## Course states

```text
NEW
IN_PROGRESS
ABANDONED
NEAR_COMPLETION
COMPLETED
```

The exact state model should evolve based on real product behavior.

---

# 8. Tey Decision Engine

The Learner State Engine describes the learner.

The Tey Decision Engine determines whether Tey should do something.

For example:

```text
Learner:
streak = 12
today_goal_completed = false
current_time = 21:30
usual_learning_time = 20:00
last_notification = 16:00

State:
STREAK_AT_RISK
```

The decision engine may determine:

```text
trigger = STREAK_AT_RISK
action = SEND_PUSH_REMINDER
priority = HIGH
```

The decision engine must also consider:

- Notification preferences
- Quiet hours
- Previous reminders
- Notification cooldowns
- Whether the learner has already returned
- Whether the goal was completed
- Whether another notification is already scheduled
- Whether the learner has opted into push notifications
- Whether the reminder is still relevant

---

# 9. The System Must Be Event-Driven

Do not implement a process like:

```text
Every minute:

for every user:
    check activity
    check streak
    check progress
    check reminders
```

This does not scale.

Instead:

```text
User completes lesson
        ↓
Event created
        ↓
Learner state updated
        ↓
Relevant future action scheduled
```

For reminders, the system should schedule work for the relevant time rather than continuously checking everyone.

For example:

```text
Monday 8:15 PM
User completes lesson
        ↓
Streak = 12
        ↓
Calculate relevant reminder window
        ↓
Schedule future check
```

At the appropriate time:

```text
Scheduled job fires
        ↓
Check current learner state
        ↓
Is today's goal complete?
        ↓
YES → do nothing
NO  → continue
        ↓
Is notification allowed?
        ↓
YES → create notification
```

This prevents unnecessary processing.

---

# 10. Reminder Scheduling

A reminder must always be revalidated before sending.

Never assume a scheduled reminder is still relevant.

Example:

At 8 PM:

```text
Schedule:
"Remind user at 10 PM"
```

But the user completes a lesson at 9 PM.

At 10 PM, the scheduler checks:

```text
today_goal_completed = true
```

Therefore:

```text
Do not send notification.
```

This is important for both user experience and infrastructure cost.

---

# 11. Push Notifications — Phase 1

Push notifications are the first delivery mechanism.

The first version should behave similarly to the basic engagement model users understand from apps such as Duolingo.

Push should handle:

- Daily learning reminders
- Streak-at-risk reminders
- Streak-critical reminders
- Course follow-ups
- Abandoned lesson follow-ups
- Return reminders
- Milestone notifications
- Progress celebrations
- Other useful learning nudges

The system should not send notifications simply because it can.

Every notification must have a reason.

---

# 12. Notification Priority

Not every situation deserves the same urgency.

Example:

```text
LOW
General learning reminder

MEDIUM
User has missed a normal learning session

HIGH
Streak is at risk

CRITICAL
Streak is approaching expiration
```

This priority can later influence:

- Message tone
- Timing
- Channel
- Frequency
- Whether AI is used
- Future Rive state

---

# 13. Push Notification Deep Linking

Push notifications should take the learner to the appropriate destination.

Do not always open the Teyro home screen.

Example:

```text
Push:

"Your 12-day streak is waiting. 👀"
```

When the learner taps:

```text
Push
 ↓
Teyro
 ↓
Deep link
 ↓
Unfinished lesson
```

The deep-link payload should identify the intended destination.

Conceptually:

```json
{
  "type": "STREAK_AT_RISK",
  "target": "LESSON",
  "lesson_id": "382"
}
```

The frontend uses that information to navigate to the correct place.

If the target is no longer valid, Teyro should fall back gracefully to the most relevant screen.

---

# 14. Tey Context

Every Tey intervention should eventually have a standardized context.

Example:

```json
{
  "reason": "STREAK_AT_RISK",
  "urgency": "HIGH",
  "learner_state": "ACTIVE",
  "streak": 12,
  "goal": "INCOMPLETE",
  "recommended_action": "COMPLETE_LESSON",
  "target": {
    "type": "LESSON",
    "id": "382"
  },
  "tone": "PLAYFUL_PASSIVE_AGGRESSIVE"
}
```

This object becomes the common language between:

- Decision engine
- Notification engine
- AI layer
- Frontend
- Future Rive system
- Future WhatsApp system

This is one of the most important architectural decisions.

---

# 15. AI Layer

The AI should not be responsible for determining basic product facts.

Do not ask an LLM:

> "Has the user completed today's lesson?"

The backend already knows.

Do not ask:

> "How many days is their streak?"

The backend already knows.

The AI should receive trusted context and use it to perform language/reasoning tasks.

The division of responsibility is:

```text
Backend:
Source of truth

Rules:
Determine whether Tey should act

AI:
Determine how Tey communicates/responds

Notification system:
Deliver the message

Frontend:
Display the appropriate experience
```

---

# 16. AI Should Be Selective

Most simple reminders should not require an LLM.

Example:

```text
STREAK_AT_RISK
```

can use a predefined message template.

This has:

- Zero LLM cost
- Predictable behavior
- Fast response
- No hallucination risk

AI should be used when personalization or reasoning adds meaningful value.

Examples:

- Personalized reminder
- More nuanced learner situation
- WhatsApp conversation
- User asks Tey a question
- User asks Tey to perform an action
- User needs encouragement
- User asks for progress analysis
- User asks for a recommendation

---

# 17. Tey Personality Specification

Tey's personality should be defined separately from the model.

Core personality:

- Playful
- Observant
- Encouraging
- Mischievous
- Caring
- Slightly passive-aggressive

Tey should never:

- Insult learners
- Humiliate learners
- Threaten learners
- Shame learners
- Become aggressively manipulative
- Spam learners

The tone should adapt to the situation.

Examples:

### Success

Celebratory and proud.

### Struggle

Supportive and encouraging.

### Streak at risk

Urgent, playful, slightly teasing.

### Repeatedly ignored reminders

More passive-aggressive, but still respectful.

### Returning learner

Warm and welcoming.

---

# 18. AI Model Strategy

Teyro is pre-funded and pre-revenue.

Therefore, do not train a proprietary LLM.

Start with an existing model API and keep the model layer replaceable.

A model adapter should sit between Teyro and the provider:

```text
Tey AI Service
      ↓
Model Adapter
      ↓
Current Model
```

This allows Teyro to move between providers/models without rewriting the entire intelligence system.

During early development, free tiers can be used where available.

The free model should be treated as an early-stage cost-saving mechanism, not as a permanent assumption.

---

# 19. AI Tools

The AI should eventually have access to controlled Teyro tools.

Examples:

```text
get_user_progress()
get_streak()
get_current_course()
get_current_lesson()
get_learning_history()
get_weekly_summary()
find_short_lesson()
create_reminder()
cancel_reminder()
open_course()
```

The model does not directly access or modify the database.

Instead:

```text
AI
 ↓
Requests tool
 ↓
Teyro backend
 ↓
Validates request
 ↓
Executes action
 ↓
Returns result
 ↓
AI generates response
```

This keeps Tey's behavior safe and deterministic.

---

# 20. Example AI Conversation

Learner sends:

> "I'm too tired to study tonight."

Backend retrieves:

```text
Current streak: 12
Today's goal: incomplete
Current course: Digital Marketing
Weekly progress: 5/7
Recent performance: good
```

AI receives the trusted context.

It can determine:

```text
intent = NEEDS_ENCOURAGEMENT
action = OFFER_SHORTER_LESSON
tone = ENCOURAGING
```

Tey responds:

> "Fair 😭. But let's not throw away 12 days for one tired evening. Want a shorter lesson?"

The user can then choose an action.

If the user selects a shorter lesson, the backend finds an appropriate lesson.

The AI does not invent the lesson.

---

# 21. WhatsApp — Phase 2

WhatsApp is deliberately **not the first reminder channel**.

Push notifications come first.

Once push is stable, WhatsApp becomes an additional engagement and conversational channel.

WhatsApp should not duplicate every push notification.

It should be used for higher-value situations such as:

- Stronger re-engagement
- Important streak interventions
- Users who have opted into WhatsApp
- Weekly progress summaries
- User-requested conversations
- Conversational Tey
- Situations where WhatsApp has proven more effective for a specific learner

The exact channel policy should be tested using real user behavior.

---

# 22. WhatsApp Interactive Actions

Where supported, WhatsApp can provide buttons/actions such as:

```text
[Continue Learning]
[Remind Me Later]
[Talk to Tey]
```

The action should map to a real Teyro action.

For example:

```text
WhatsApp
 ↓
Continue Learning
 ↓
Teyro deep link
 ↓
Specific unfinished lesson
```

The system should track which button was clicked so that channel effectiveness can be measured.

---

# 23. When a User Messages Tey on WhatsApp

A WhatsApp message should enter the Tey conversation service.

```text
WhatsApp
 ↓
Webhook
 ↓
Tey Conversation Service
 ↓
Retrieve learner state
 ↓
Retrieve relevant context
 ↓
AI
 ↓
Response/action
 ↓
WhatsApp
```

Tey should know the learner's current context.

For example:

```text
Streak: 12
Today's goal: incomplete
Current course: Digital Marketing
Last lesson: completed yesterday
Recent performance: good
```

This allows Tey to behave like a real learning companion rather than a generic chatbot.

---

# 24. Scalability

The system must be designed to scale from:

```text
100 users
→ 1,000
→ 100,000
→ 1,000,000
→ 100,000,000+
```

The architecture should not depend on continuously checking every user.

Instead, use:

- Event-driven processing
- Scheduled jobs
- Queues
- Workers
- Cached/current learner state
- Batch processing
- Database indexing
- Selective AI calls
- Notification cooldowns
- Rate limits
- AI usage budgets

The key rule is:

> **Do not constantly watch every learner. Process events and scheduled actions only when something matters.**

---

# 25. Queue-Based Processing

As volume increases, work should be placed into queues.

Conceptually:

```text
Activity
   ↓
Event Queue
   ↓
Workers
   ↓
State Updates
```

And:

```text
Scheduled Reminder
   ↓
Notification Queue
   ↓
Notification Workers
   ↓
Push / WhatsApp
```

Queues prevent one large burst of activity from overwhelming the application.

They also allow work to be processed asynchronously.

---

# 26. AI Cost Control

AI should never be called unnecessarily.

Use this hierarchy:

```text
Does this situation have a standard response?
       ↓
YES → Template
       ↓
No AI required

NO
 ↓
Does personalization/reasoning add value?
 ↓
YES → AI
```

For example:

```text
Streak at risk
→ Standard template
→ No AI
```

But:

```text
User says:
"I'm tired and don't think I can continue."
→ AI
```

This dramatically reduces cost.

---

# 27. AI Usage Limits

The system should have safeguards such as:

```text
Maximum AI calls per user/day
Maximum proactive AI messages/day
Maximum WhatsApp AI interactions/day
Global AI budget
Provider rate limits
Fallback model
```

These prevent an unexpected loop or bug from creating an enormous AI bill.

---

# 28. Current State vs Historical Data

Do not load a learner's entire history whenever Tey needs to act.

Maintain a fast current state.

### Hot/current data

```text
current streak
last activity
today's progress
current course
current lesson
notification preferences
current engagement state
```

### Historical data

```text
old lessons
old quiz attempts
old notification events
old activity events
old course history
```

Historical data can be stored and aggregated separately.

Tey should normally use the current learner state first.

---

# 29. Notification Cooldowns

Tey must not become annoying.

The system should enforce rules such as:

```text
Maximum push notifications per day
Minimum time between notifications
Maximum WhatsApp messages per day
Quiet hours
User notification preferences
Event-specific cooldowns
```

Example:

```text
User received a streak reminder at 8 PM.

Do not send another generic reminder at 8:30 PM.

If the user completes the lesson:
cancel all pending streak reminders.
```

This protects both user experience and infrastructure costs.

---

# 30. Future Rive Mascot States

Rive is intentionally deferred.

The first notification system should work without animated Tey states.

However, the architecture should leave room for them.

Eventually, the Tey context can include:

```text
tey_state: STREAK_AT_RISK
```

The frontend can then tell Rive to display the appropriate state.

For example:

```text
Backend:
reason = STREAK_AT_RISK

Tey Context:
animation_state = STREAK_AT_RISK

Frontend:
Rive → STREAK_AT_RISK
```

The animation is a **presentation of the state**, not the system that determines the state.

This distinction must be preserved.

---

# 31. Future Rive State Examples

Potential states include:

```text
IDLE
HAPPY
CELEBRATING
ENCOURAGING
REMINDER
STREAK_AT_RISK
STREAK_CRITICAL
STREAK_SAVED
STREAK_LOST
WELCOME_BACK
STRUGGLING
PROUD
PASSIVE_AGGRESSIVE
MILESTONE
```

These should be designed around actual learner situations rather than simply creating random emotional animations.

The state machine implementation should happen after the core engagement system is stable.

---

# 32. Full Future System

The intended long-term architecture is:

```text
                         USER
                           │
                           ↓
                  TEYRO WEB / APP
                           │
                           ↓
                    ACTIVITY EVENT
                           │
                           ↓
                    EVENT PROCESSOR
                           │
                           ↓
                  LEARNER STATE ENGINE
                           │
                           ↓
                  TEY DECISION ENGINE
                           │
                           ↓
                     TEY CONTEXT
                           │
              ┌────────────┼────────────┐
              │            │            │
              ↓            ↓            ↓
           PUSH          WHATSAPP      RIVE
              │            │          STATE
              │            ↓
              │        Tey Conversation
              │            │
              │            ↓
              │           AI
              │            │
              └────────────┼────────────┘
                           ↓
                     USER RESPONSE
                           │
                           ↓
                    ACTIVITY EVENT
                           │
                           └──────────→ LOOP
```

---

# 33. The Tey Intelligence Loop

The final product experience should form a continuous loop:

```text
1. User learns
        ↓
2. Teyro records activity
        ↓
3. Learner state updates
        ↓
4. System identifies meaningful situation
        ↓
5. Decision engine determines whether Tey should act
        ↓
6. Tey Context is created
        ↓
7. Notification is scheduled/sent
        ↓
8. User returns or responds
        ↓
9. Response becomes another activity event
        ↓
10. Learner state updates again
```

This creates the foundation for a learning companion that becomes increasingly personalized over time.

---

# 34. What We Are NOT Building

To keep the implementation focused, the first version should NOT attempt to build all of these at once:

- A custom LLM
- A continuously running AI agent for every learner
- Real-time AI monitoring of every user
- Rive animation states
- Full WhatsApp conversational intelligence
- Complex machine-learning prediction
- Sophisticated reinforcement learning
- A huge notification optimization system

Those are future layers.

The first implementation should establish the foundation correctly.

---

# 35. Recommended Build Order

## Step 1 — Define the event schema

Document all meaningful learner events.

## Step 2 — Implement activity tracking

Make the web app reliably send events.

## Step 3 — Build learner state

Maintain current:

- Progress
- Streak
- Last activity
- Daily goal
- Course state
- Engagement state

## Step 4 — Build rules

Create deterministic triggers such as:

- Daily goal incomplete
- Streak at risk
- Streak critical
- Inactive
- Course abandoned
- User returning

## Step 5 — Build scheduler/queues

Allow actions to happen at the right time without scanning every user.

## Step 6 — Build push notification infrastructure

This is the first user-facing Tey follow-up/reminder channel.

## Step 7 — Add deep links

Every important notification should take the learner to the correct place in Teyro.

## Step 8 — Build Tey Context

Standardize the reason, urgency, target, action, and future state associated with every intervention.

## Step 9 — Add basic message templates

Start without AI wherever possible.

## Step 10 — Add the AI service

Use AI for personalization and conversations, not basic state calculation.

## Step 11 — Add controlled AI tools

Allow Tey to retrieve information and request actions through validated backend functions.

## Step 12 — Add WhatsApp

Introduce WhatsApp after push is reliable.

## Step 13 — Add WhatsApp conversations

Allow users to talk to Tey and receive context-aware responses.

## Step 14 — Add Rive states

Connect the already-defined Tey Context to the mascot's animation/state machine.

## Step 15 — Optimize

Measure:

- Notification open rate
- Lesson completion after notification
- Return rate
- Streak recovery
- Reminder fatigue
- Push vs WhatsApp effectiveness
- AI response quality
- AI cost
- User retention

Use those measurements to improve the system.

---

# 36. The Final Product Principle

The goal is not to build a notification system.

The goal is to build **Tey's awareness layer**.

Notifications are only one way Tey expresses that awareness.

Eventually:

```text
Tey knows:
"What is happening?"

Tey's rules know:
"Should I act?"

Tey's AI knows:
"How should I communicate?"

Push/WhatsApp know:
"How do I reach the learner?"

Deep links know:
"Where should I take them?"

Rive knows:
"How should Tey visually express this state?"
```

That separation is what keeps the system scalable, controllable, affordable, and extensible.

The first release should therefore focus on:

> **Activity → Learner State → Rules → Scheduler → Push → Deep Link**

Then progressively add:

> **Tey Context → AI → WhatsApp → Rive → Personalization**

This gives Teyro a strong foundation now while preserving the path toward a much more intelligent learning companion later.
