# Teyro User Experience Design System

**Version:** 1.0  
**Status:** Living Document  
**Last Updated:** June 2026  
**Created by:** Joel Ndakwe, Founder & CEO

---

## Executive Summary

Teyro is not just a learning platform. **Teyro is a feeling.**

We exist to solve the 94% online course dropout crisis. The problem is not pedagogy — there are dozens of educational frameworks. The problem is **experience**.

Students abandon courses because learning feels like:
- 😑 A chore (boring, uninspiring)
- 😰 Overwhelming (too much at once, no support)
- 😔 Isolating (you're alone with your struggle)
- 🚫 Shameful (wrong answers = you're dumb)
- ⏰ Time-wasting (progress is invisible)

**Teyro's mission:** Make learning feel like:
- 🎉 An achievement (every step celebrated)
- 🎮 A game (playful, engaging, rewarding)
- 🤝 A journey (guided, supported, connected)
- 💪 Empowering (wrong answers are learning moments)
- 📈 Visible progress (you can see yourself growing)

**How?** Through obsessive attention to the **feeling** of every interaction.

This document defines that feeling. It's our north star for every design decision, every animation, every word we write.

---

## Part 1: The Teyro Philosophy

### 1.1 Core Belief

Learning is not a transaction. It's a transformation.

A transaction: "I pay → I get content → Done."  
A transformation: "I change → I grow → I want to keep going."

Teyro enables transformation through experience design.

### 1.2 The Five Pillars

Every interaction, every screen, every animation in Teyro must embody five qualities:

#### **🎯 Pillar 1: SMOOTH**

*Definition:* Every transition feels intentional, natural, and effortless.

**What it means:**
- No jarring changes (things fade, slide, or transform—not pop)
- Loading is never empty (spinners are animated, micro-interactions feel alive)
- Navigation feels like turning pages, not jumping between worlds
- Scrolling has momentum (not stiff, not broken)
- Timing is human (not too fast, not too slow)

**How we implement it:**
- Use GSAP for anything motion-critical
- Easing: prefer ease-out (things slowing down as they land)
- Duration: 200-300ms for most transitions
- Never instant state changes (0ms is forbidden)
- Skeleton screens for data loading (not blank white)

**Example:**
```
BAD: User clicks "Save" → button instantly says "Saved" ✗
GOOD: User clicks "Save" → button shows loading spinner (200ms) → 
      checkmark appears (150ms) → button returns to normal (200ms) ✓
      Total: feels intentional, not instant
```

**Why it matters for retention:**
- Smooth = less cognitive load
- Less load = easier to focus
- Focus = learning sticks
- Learning sticks = come back

---

#### **🎨 Pillar 2: PLAYFUL**

*Definition:* Learning is joyful, never serious. Every interaction brings a smile.

**What it means:**
- Personality in every corner (not sterile, not corporate)
- Errors are gentle and encouraging ("Oops! Try again" not "ERROR 422")
- Empty states have character (not blank boxes)
- Micro-animations add delight (checkmarks bounce, success sparkles)
- Tone is warm and conversational (not formal or distant)
- Celebrate small wins (progress is visible and celebrated)

**How we implement it:**
- Use emoji strategically (🎉 on finish, 💪 on struggle, ✨ on insight)
- Give animations personality (not just movement—emotion)
- Write copy that feels like a friend, not a robot
- Use color with intention (not randomly)
- Add unexpected delights (easter eggs, surprise moments)

**Example: Answer a question correctly**
```
BAD: "Correct" appears in green text ✗
GOOD: 
  1. Option card glows with brand blue (GSAP scale 1.05x) [100ms]
  2. Checkmark animates in with bounce (GSAP) [150ms]
  3. Text appears: "🎉 Nice work! You've got this!" [200ms]
  4. Brief celebration sound plays (optional, accessible) [100ms]
  5. 2 particles burst upward (GSAP) [150ms]
  Total feeling: you crushed it, and Teyro noticed ✓
```

**Why it matters for retention:**
- Playful = emotional connection
- Connection = loyalty
- Loyalty = come back again
- Again + again = habit formed

---

#### **✨ Pillar 3: DELIGHTFUL**

*Definition:* Users experience earned surprises that deepen their sense of progress and belonging.

**What it means:**
- Moments of surprise that feel earned (not random)
- Each surprise reinforces a positive belief about themselves
- Delight is layered (small delights, then bigger ones)
- Recognition of effort (XP counts, streak tracking, milestones)
- Personal touches (using their name, remembering preferences)
- Micro-narratives (your learning story, not just data points)

**How we implement it:**
- Track milestones and celebrate them visibly
- Use progressive disclosure (reveal rewards as they progress)
- Personalize everything (use their name, remember their journey)
- Create moments of "wow, this platform really gets me"
- Build anticipation (tease next lesson, show what's unlocking)

**Example: Completing a lesson**
```
IMMEDIATE (5 seconds):
  - Score animates up: 0 → 92% (number ticks upward) [500ms]
  - Confetti particles burst (GSAP) [400ms]
  - Modal says: "🎉 Brilliant work! You've completed [Lesson Name]"

SHORT TERM (10 seconds):
  - XP count animates: +120 XP (glows, then settles) [1s]
  - Badge unlock notification: "🏅 You've earned: 'Quick Learner'"
  - Progress bar fills toward next milestone

MEDIUM TERM (on revisit):
  - Lesson shows as completed (green checkmark)
  - Next lesson available (unlocked, inviting)
  - Streak counter shows days learning: "🔥 3-day streak"

LONG TERM (analytics dashboard):
  - Learning graph shows their trajectory (smooth line upward)
  - Time invested visible ("You've invested 12 hours this month")
  - Skills unlocked list shows mastery growth
```

**Why it matters for retention:**
- Delight = emotional reward (dopamine hit)
- Dopamine = want to repeat
- Repeat = habit
- Habit = lifetime value

---

#### **💎 Pillar 4: PREMIUM**

*Definition:* Everything feels refined, intentional, and worth the user's time and attention.

**What it means:**
- Generous spacing (whitespace is a design element, not wasted space)
- Soft, considered colors (not garish or aggressive)
- Typography hierarchy (clear, readable, beautiful)
- Thoughtful shadows (depth without darkness)
- Consistent visual language (patterns, not random design)
- Polish in details (buttons feel weighty, interactions feel complete)
- Quality imagery and icons (custom, not generic stock)

**How we implement it:**
- Use design system (components that match, not reinvent)
- 8px/16px grid system (for spacing consistency)
- Color palette: curated (max 8 colors + neutral greys)
- Typography: 2 fonts max (headline + body)
- Shadows: soft, subtle (not harsh)
- Interactions: things have weight (buttons don't feel cheap)

**Example: A simple button**
```
BAD PREMIUM:
  - Flat button, no feedback
  - Click → nothing happens until page loads
  - Feels cheap, not worth clicking

GOOD PREMIUM:
  - Button has subtle shadow (depth perception)
  - Hover → shadow deepens + very slight lift (scale 1.02) [150ms]
  - Click → button scales to 0.98x (compression feeling) [100ms]
  - Loading → spinner appears (animated, not still) [200ms]
  - Success → checkmark appears + gentle glow [300ms]
  - Return → button returns to default state [200ms]
  
  Total feeling: this button matters, this action is significant,
  I'm in a well-designed system ✓
```

**Why it matters for retention:**
- Premium = value perception
- Value = worth my time
- Worth my time = I'll invest energy
- Energy invested = I'll see results
- Results = come back

---

#### **🎮 Pillar 5: INTERACTIVE**

*Definition:* Every action gets immediate, meaningful feedback. Users feel agency and control.

**What it means:**
- Zero dead zones (nothing ignored, everything responds)
- Feedback is immediate (not delayed)
- Feedback is meaningful (not just decorative)
- Users see consequences of their actions instantly
- Anticipatory feedback (shows what will happen on hover)
- Rich interactions (dragging, scrolling, gestures work beautifully)

**How we implement it:**
- Hover states on everything clickable
- Loading states for anything async
- Disabled states that feel disabled (greyed out, cursor change)
- Focus states for keyboard users (visible, not invisible)
- Touch feedback on mobile (haptic, if available)
- Drag interactions smooth (not snappy)
- Scroll momentum (not stiff)

**Example: Drag-to-reorder questions in lesson builder**
```
BEFORE DRAG:
  - Card has grab cursor on hover (signaling intent)
  - Card lifts slightly on hover (signaling it's interactive)
  - ⋮⋮ grab handle visible (visual affordance)

DURING DRAG:
  - Card stays where mouse is (not stiff)
  - Cards below animate out of the way (GSAP smooth) [150ms]
  - Drop zone highlights (showing where it will land)
  - Card follows mouse with subtle shadow (shows lift)
  - Opacity slightly reduced on dragged card (shows it's floating)

ON DROP:
  - Cards return to normal (GSAP) [200ms]
  - Dropped card animates to its new position [300ms]
  - Other cards animate back into place (stagger) [100ms]
  - Brief "ding" sound (satisfying, optional)
  
  Total feeling: I'm in control, the system responds to me,
  this feels natural and powerful ✓
```

**Why it matters for retention:**
- Interactive = agency
- Agency = empowerment
- Empowerment = confidence
- Confidence = "I can do this"
- "I can do this" = keep trying

---

### 1.3 The Sacred Principle

**Every action creates motion. Motion creates emotion.**

This is not decoration. This is the core of Teyro's experience design.

Motion serves three purposes:
1. **Clarity** — Shows what changed, where focus should be
2. **Feedback** — Confirms the action was received
3. **Emotion** — Creates the feeling we want (celebration, safety, control)

Without motion, interactions feel dead. With motion, they feel alive.

Example:
```
Dead interaction:
  User clicks "Next" → page changes → confusion (where am I?)

Alive interaction:
  User clicks "Next" → page fades out [150ms] → 
  new page fades in [200ms] → scroll to top smoothly [300ms]
  → User is oriented (I moved forward, this is new content)
```

---

## Part 2: User Journeys

### 2.1 The Creator Journey

#### **Phase: Onboarding (First Time Creating)**

**Emotional Goal:** "This is easier than I thought"

**Before (what they fear):**
- "I'm not a instructional designer"
- "This will take forever"
- "The technology will be too complex"

**During (what we do):**
1. **Welcome** — Warm greeting, show the path (Learn → Apply → Reflect → Deepen)
   - Motion: hero image slides in, text fades in [GSAP, 400ms]
   - Tone: "Hey, let's build something amazing"
   - Interaction: everything is clickable, nothing is hidden

2. **First Step Guided** — Build Learn phase with an example
   - Motion: step-by-step walkthroughs appear with smooth transitions
   - Feedback: auto-save shows "Saving..." then toast "Saved!"
   - Encouragement: "You're doing great" message after first video upload
   - Interaction: cursor changes over helpful elements (affordance)

3. **Preview Preview** — Show what students will see
   - Motion: preview panel slides in from right [GSAP, 250ms]
   - Emotion: "Look, you created this! And it's beautiful"
   - Interaction: click through student view, see it come alive

4. **Apply Step Simplified** — Create first practice question
   - Motion: add question button has subtle pulse (draws attention)
   - Tone: "Now let them practice what they learned"
   - Interaction: drag-to-reorder feels buttery smooth
   - Success: "One question created. Want to add more?"

5. **Publish Preview** — See the complete lesson
   - Motion: all 4 phases animate in with checkmarks [stagger, 100ms]
   - Emotion: "You created a complete lesson!"
   - Interaction: can preview entire student journey
   - CTA: "Publish & Share" button (primary, inviting)

**After (what they feel):**
- ✅ "I can do this"
- ✅ "The system supports me"
- ✅ "My first lesson is beautiful"
- ✅ "I want to create another one"

**Retention Lever:** Send email day after first publish: "Your lesson is getting students! See who's learning."

---

#### **Phase: Creating (Regular User)**

**Emotional Goal:** "This is my superpower"

**Experience:**
1. **Dashboard arrival** — See previous lessons, stats
   - Motion: lessons appear as cards with stagger [200ms]
   - Tone: "Look at what you've built. Want to do more?"
   - Stats shown: students completed, XP given, engagement
   - Interaction: hover on lesson shows preview + edit options

2. **Creating lesson #2** — Everything is faster
   - Motion: lesson builder loads instantly (cached)
   - Feedback: auto-save is silent now (they're experts)
   - Tone: less guidance, more respect for their skill
   - Interaction: keyboard shortcuts available (power user features)

3. **Seeing results** — Analytics update in real-time
   - Motion: engagement graph updates smoothly [GSAP, 1s]
   - Emotion: "My lesson helped [X] students"
   - Interaction: click on any metric for deeper dive
   - Tone: celebrating their impact, not just their actions

**Retention Lever:** Weekly email: "Your lessons have helped [X] students this week. You're amazing."

---

### 2.2 The Student Journey

#### **Phase: Discovery (First Time Here)**

**Emotional Goal:** "I think I can actually learn this"

**Before (what they fear):**
- "I've failed before, why will this be different?"
- "Online learning is boring and lonely"
- "I don't have time for this"

**During (what we do):**
1. **First Visit** — Course page loads
   - Motion: course hero image zooms in subtly [GSAP, 500ms]
   - Tone: "This course is perfect for you"
   - Content shown: clear description, lesson breakdown, time estimate (realistic)
   - Interaction: can see entire curriculum at a glance

2. **Enrolling** — They click "Start Learning"
   - Motion: button animates confidence (scale 1.05 → 1.0) [150ms]
   - Feedback: "Enrolled!" toast appears [GSAP, 300ms]
   - Next: First lesson auto-loads (no friction)
   - Interaction: immediately see Learn content

3. **First Lesson Loads** — They're in
   - Motion: content fades in section by section [stagger, 150ms]
   - Tone: "You've got this. Let's learn."
   - Visual: progress bar shows their position (25% Learn complete)
   - Interaction: click play on video, touch to highlight text

**After (what they feel):**
- ✅ "This is approachable"
- ✅ "I understand what I'm learning"
- ✅ "I can see my progress"

**Retention Lever:** Push notification after first Learn: "You're 25% through lesson 1. Keep going! 💪"

---

#### **Phase: Learning (First Learn + Apply)**

**Emotional Goal:** "I can do this, and I'm getting it"

**Experience:**
1. **Learn Phase Progressing**
   - Motion: video plays smoothly, timestamps clickable
   - Feedback: watching video increments progress bar [smooth, 100ms]
   - Tone: encouraging, supportive, paced
   - Interaction: can skip to timestamp, can rewatch, can take notes

2. **Apply Phase Arrive**
   - Motion: transition to practice feels significant (blue background, new energy)
   - Tone: "Now you try"
   - Emotion: shift from consumption to action
   - Interaction: first question loads with gentle animation

3. **First Practice Attempt (Wrong)**
   - Motion: shake animation on wrong answer [GSAP, 2 directions, 200ms]
   - Feedback: "Not quite. Let's try again." (gentle, not punishing)
   - Tone: not shame, not disappointment—just "try again"
   - Emotion: This is safe. I can fail here and it's okay.
   - Interaction: options reset, try again immediately

4. **Second Practice Attempt (Correct)**
   - Motion: checkmark bounces in [GSAP, 200ms]
   - Particles burst [GSAP, 4 particles, 150ms]
   - Tone: "🎉 Yes! You've got it!"
   - Emotion: VICTORY. I did it. I understand.
   - XP animates: "+15 XP" glows and floats up [GSAP, 500ms]
   - Interaction: next question auto-loads or they can review

5. **Reflect Phase Arrive**
   - Motion: phase changes feel like ascending [background gradient shift, GSAP, 300ms]
   - Tone: "Now, what did you learn?"
   - Emotion: pause, introspection, deepening
   - Interaction: reflection text area expands as they type (responsive feedback)

6. **Reflect Submission**
   - Motion: text count animates up as they type
   - Feedback: word count colors: grey → amber → green (psychological safety)
   - Tone: "Your reflection is powerful"
   - Interaction: submit button becomes enabled when criteria met (agency)

7. **Deepen Phase Arrive**
   - Motion: resource cards appear in beautiful sequence [stagger, 100ms]
   - Tone: "Here's where to go deeper"
   - Emotion: you're not alone in this journey, guides available
   - Interaction: can preview each resource, click to explore

**Retention Lever:** Streak notification: "🔥 3-day learning streak! Keep it up."

---

#### **Phase: Completion (End of Lesson)**

**Emotional Goal:** "I did it. I'm better than I was."

**Experience:**
1. **Deepen Complete**
   - Motion: final resource visited
   - Feedback: "You've explored X resources"
   - Interaction: optional "More Resources" section (doesn't block progress)

2. **Lesson Summary Shows**
   - Motion: score animates up [0 → final score, GSAP, 1s]
   - Confetti particles burst [GSAP, joyful motion]
   - Tone: celebrating all of it (Learn + Apply + Reflect + Deepen)
   - Emotion: COMPLETION. YOU'RE DONE. YOU DID THIS.
   - Stats shown: time invested, XP earned, streak
   - Badge unlock (if applicable): visual animation, celebratory

3. **What's Next**
   - Motion: next lesson card appears with soft glow [GSAP, 300ms]
   - Tone: "Ready for the next challenge?"
   - Emotion: momentum (don't let them stop)
   - Interaction: click → immediately into next lesson

**Retention Lever:** Email sent: "You completed [Lesson]! You've earned 120 XP and unlocked [Badge]. Nice work, [Name]!"

---

#### **Phase: Habituation (Coming Back)**

**Emotional Goal:** "Learning is part of who I am"

**Experience:**
1. **Dashboard Return**
   - Motion: dashboard remembers scroll position (continuity)
   - Tone: "Welcome back! You're crushing it."
   - Stats shown: streak, XP this week, progress toward badge
   - Emotion: "I belong here, my progress is visible"

2. **Streak Counter**
   - Motion: 🔥 icon pulses on streak milestone [GSAP, 300ms]
   - Tone: "Your streak: 7 days 🔥"
   - Emotion: don't break the chain, momentum building
   - Interaction: one-click to continue learning

3. **Notifications (Timely)**
   - Push when: streak is about to break, new lesson in their path, friend completed a lesson
   - Tone: friendly reminders, not aggressive spam
   - Emotion: you're part of a community, people care
   - Interaction: click → in app, continue learning

**Retention Lever:** Weekly digest email showing their stats, accomplishments, and what's next.

---

## Part 3: Interaction Patterns & Guidelines

### 3.1 Button Interactions

**Every button must:**
1. Have a hover state (shadow deepens, scale 1.02x)
2. Have a click state (scale 0.98x, gives "pressed" feeling)
3. Show loading if async (spinner, text change, or both)
4. Have a success state (if applicable)
5. Have a disabled state (grey, cursor: not-allowed, feels inactive)

**Implementation:**
```typescript
// Button interaction pattern
const [loading, setLoading] = useState(false);

const handleClick = async () => {
  setLoading(true);
  try {
    await submitForm();
    // Success state: show checkmark (optional)
  } catch {
    // Error state: show retry (optional)
  } finally {
    setLoading(false);
  }
};

return (
  <button
    onClick={handleClick}
    disabled={loading}
    className={`
      px-6 py-3
      rounded-lg
      transition-all duration-200
      
      // Default state
      bg-blue-600 text-white
      
      // Hover
      hover:shadow-lg hover:scale-105
      
      // Active
      active:scale-95
      
      // Disabled
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:shadow-none disabled:hover:scale-100
    `}
  >
    {loading ? (
      <LoadingSpinner />
    ) : (
      'Save & Continue'
    )}
  </button>
);
```

---

### 3.2 Form Interactions

**Every form field must:**
1. Show what's required (*, not just label)
2. Provide real-time feedback (character counter, validation message)
3. Animate on focus (highlight, expand, or glow)
4. Show validation state (red on error, green on success, amber on warning)
5. Never lose user input (autosave or localStorage)

**Implementation:**
```typescript
// Form field interaction pattern
const [value, setValue] = useState('');
const [error, setError] = useState('');
const [touched, setTouched] = useState(false);

const validate = (val: string) => {
  if (!val) return 'This field is required';
  if (val.length > 200) return 'Max 200 characters';
  return '';
};

const handleBlur = () => {
  setTouched(true);
  setError(validate(value));
};

const handleChange = (e: string) => {
  setValue(e);
  // Real-time validation
  if (touched) setError(validate(e));
  // Auto-save
  autosaveToLocalStorage(e);
};

return (
  <div className="space-y-2">
    <label>
      Lesson Title *
      <input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        className={`
          w-full px-4 py-3
          border-2 rounded-lg
          transition-all duration-200
          
          // Default
          border-grey-300
          
          // Focus
          focus:border-blue-600 focus:shadow-lg
          
          // Error
          ${error && touched ? 'border-red-500 bg-red-50' : ''}
          
          // Success
          ${!error && touched && value ? 'border-green-500' : ''}
        `}
      />
    </label>
    
    {/* Character counter */}
    <div className="flex justify-between text-sm">
      <span className={touched && error ? 'text-red-500' : 'text-grey'}>
        {error || ''}
      </span>
      <span className={value.length >= 180 ? 'text-amber-500' : 'text-grey'}>
        {value.length}/200
      </span>
    </div>
  </div>
);
```

---

### 3.3 Modal Interactions

**Every modal must:**
1. Animate in from direction (not pop)
2. Have a clear close button (X, cancel, or esc key)
3. Handle scrolling within (if content is long)
4. Block interaction outside (backdrop)
5. Animate out smoothly (same duration as in)

**Pattern:**
```typescript
// Modal interaction
const [open, setOpen] = useState(false);

return (
  <>
    <button onClick={() => setOpen(true)}>Open Modal</button>
    
    {open && (
      <ModalBackdrop
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/50 animate-fadeIn"
      >
        <ModalContent
          className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white
          animate-slideInRight"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal content */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4"
          >
            ✕
          </button>
          
          {/* Content here */}
        </ModalContent>
      </ModalBackdrop>
    )}
  </>
);
```

---

### 3.4 List Interactions (Drag, Add, Delete)

**Every list item must:**
1. Show hover state (shadow, lift, highlight)
2. Support drag with smooth animation
3. Show delete affordance (icon, not hidden)
4. Support add with entrance animation
5. Animate removal (fade + slide out)

**Pattern:**
```typescript
// List item with drag/delete/add
const [items, setItems] = useState([]);

const handleDragEnd = (result) => {
  // Reorder items with GSAP animation
  animateItemPositions();
};

const handleAdd = () => {
  const newItem = { id: Date.now(), text: '' };
  setItems([...items, newItem]);
  // Fade in new item
  triggerFadeInAnimation(newItem.id);
};

const handleDelete = (id) => {
  // Fade out, then remove
  triggerFadeOutAnimation(id);
  setTimeout(() => {
    setItems(items.filter(item => item.id !== id));
  }, 200);
};

return (
  <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId="items">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`
                    group p-4 rounded-lg border-2 border-grey-300
                    transition-all duration-200
                    hover:shadow-lg hover:-translate-y-1
                    ${snapshot.isDragging ? 'shadow-2xl' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Drag handle */}
                    <div className="text-grey group-hover:text-blue-600">
                      ⋮⋮
                    </div>
                    
                    {/* Content */}
                    <input value={item.text} />
                    
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="ml-auto text-grey hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
```

---

### 3.5 Loading States

**Every async action must show a loading state:**

1. **Skeleton screens** (not blank white)
   - Show shape of content without content
   - Animate pulse [GSAP, 1.5s loop]
   - Matches final content layout

2. **Loading spinners** (never boring)
   - Custom animated SVG or Rive animation
   - Show progress if possible (0% → 100%)
   - Never blank or still

3. **Loading messages** (reassuring)
   - "Saving your work..."
   - "Loading your lesson..."
   - "Creating preview..."

**Pattern:**
```typescript
// Loading state pattern
if (loading) {
  return (
    <div className="space-y-4">
      {/* Skeleton screen - matches final layout */}
      <Skeleton height={100} />
      <Skeleton height={200} />
      <Skeleton height={100} />
      {/* Or custom loader */}
      <LoadingAnimation text="Creating your lesson..." />
    </div>
  );
}

return <Content />;
```

---

### 3.6 Error States

**Every error must be:**
1. Clear (what went wrong, not technical jargon)
2. Actionable (how to fix it)
3. Friendly (not scolding)
4. Recoverable (not lost data)

**Pattern:**
```typescript
// Error state pattern
if (error) {
  return (
    <div className="p-6 rounded-lg bg-red-50 border-2 border-red-200">
      <div className="flex gap-4">
        <AlertIcon className="text-red-500 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-red-900">
            We couldn't save your changes
          </h4>
          <p className="text-red-700 text-sm mt-1">
            Check your connection and try again.
          </p>
          <button 
            onClick={retry}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

return <Content />;
```

---

### 3.7 Success States

**Every successful action must be celebrated:**
1. Visual feedback (checkmark, color change)
2. Emotional tone (excitement, not just "OK")
3. Duration (stays for 2-3 seconds, then fades)
4. Momentum (what's next?)

**Pattern:**
```typescript
// Success toast pattern
<Toast
  type="success"
  icon="✅"
  title="Lesson published!"
  subtitle="Your students can now see it"
  action={{ label: 'View', onClick: navigateToLesson }}
  duration={3000}
  className="animate-slideUp"
/>
```

---

## Part 4: Motion Design System

### 4.1 Duration Guidelines

| Action | Duration | Easing |
|---|---|---|
| Hover feedback | 150ms | ease-out |
| Focus change | 200ms | ease-out |
| Page transition | 300ms | ease-out |
| Modal entrance | 300ms | ease-out |
| List stagger | 100ms between items | ease-out |
| Celebration | 400-500ms | ease-out |
| Entrance (content) | 250ms | ease-out |
| Exit (content) | 200ms | ease-in |

### 4.2 Easing Preferences

**DO USE:**
- `ease-out` — natural deceleration (most common)
- `cubic-bezier(0.34, 1.56, 0.64, 1)` — subtle bounce
- `ease-in-out` — for full-screen transitions
- `linear` — ONLY for infinite loops (loading spinner)

**NEVER USE:**
- `ease-in` — feels backwards
- `steps()` — feels robotic
- Instant (0ms) — feels broken
- Very slow (1s+) — feels sluggish

### 4.3 Motion Patterns

**Entrance (Fade In):**
```css
animation: fadeIn 250ms ease-out forwards;

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Entrance (Slide Up):**
```css
animation: slideUp 300ms ease-out forwards;

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Entrance (Scale):**
```css
animation: scaleIn 250ms ease-out forwards;

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Success Celebration:**
```typescript
// GSAP
gsap.timeline()
  .to(element, { scale: 1.1, duration: 200 }, 0)
  .to(element, { scale: 1, duration: 150 }, 200)
  .to(particleContainer, { opacity: 1, y: -50, duration: 400 }, 0);
```

---

## Part 5: Tone & Voice

### 5.1 Brand Voice Principles

**Warm, not corporate**
- "You're killing it!" not "Objective completed"
- "Let's learn" not "Course access granted"
- "Try again" not "Attempt failed"

**Encouraging, not patronizing**
- "Great thinking" not "You got lucky"
- "Let's explore that" not "That's wrong"
- "Building your skills" not "Leveling up" (gaming feels fake)

**Personal, not generic**
- "Your reflection shows real insight" not "Reflection submitted"
- "You've invested 5 hours this week" not "5h total time"
- Use their name sparingly (not creepy)

**Clear, not jargony**
- "Save your changes" not "Persist state"
- "Share with students" not "Deploy lesson"
- "Mark complete" not "Finalize submission"

### 5.2 Voice in Different Contexts

**On Success:**
```
✅ "Nailed it!"
✅ "You've got this skill now"
✅ "That took deep thinking—nice work"
```

**On Error:**
```
❌ "Let's try that again"
❌ "Hmm, that's not quite right—want a hint?"
❌ "Not this time, but you're on the right track"
```

**On Long Tasks:**
```
⏳ "Saving your work..."
⏳ "Creating your preview..."
⏳ "Just a moment..."
```

**On Milestones:**
```
🎉 "You've completed 5 lessons!"
🎉 "Your streak: 7 days 🔥"
🎉 "You've unlocked the Advanced Badge"
```

---

## Part 6: Retention Architecture

### 6.1 The Habit Loop

**Trigger** → Action → Reward → Repeat

**How Teyro implements it:**

1. **Trigger** (Why they open the app)
   - Streak notification: "Your 7-day streak is about to break"
   - Progress notification: "You're 1 lesson away from completing module 3"
   - Peer notification: "Your friend [Name] just completed a lesson"
   - Scheduled: "Time for your daily lesson?"

2. **Action** (What they do inside)
   - Click notification → Opens app
   - App loads their last lesson position (no friction)
   - They click "Continue Learning"

3. **Reward** (What they get)
   - Progress bar fills (visual reward)
   - XP animates up (point reward)
   - Streak counter increases (streak reward)
   - Badge unlocks (status reward)

4. **Repeat** (Why they come back)
   - Notification tomorrow (trigger again)
   - Habit becomes automatic (don't break the chain)

### 6.2 Gamification (Without Feeling Gamified)

**DO:**
- Streaks (real metric: how many days in a row)
- XP (real metric: effort invested)
- Badges (meaningful milestones, not participation trophies)
- Leaderboards (optional, opt-in, focused on learning not competition)

**DON'T:**
- "Level up" — feels fake, minimizes real learning
- Infinite points — dilutes meaning
- Random rewards — unpredictable
- Comparison-heavy — creates anxiety

### 6.3 Notification Strategy

**Frequency:** Max 2-3 per week (not spammy)

**Timing:** 9 AM or 7 PM (when they're likely to engage)

**Content:** Personalized to their journey
- New learner: "You've learned 3 new concepts this week!"
- Streaker: "🔥 Your 5-day streak is about to break"
- Completionist: "1 lesson left to finish this course"
- Creator: "Your lessons helped 12 students this week"

**Tone:** Personal, not generic
- "Hey [Name], you're crushing it" ✓
- "Complete your daily goal" ✗

---

## Part 7: Accessibility & Inclusivity

### 7.1 Motion & Animation

**All motion must respect prefers-reduced-motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Users who disable animations should still see immediate, functional feedback.

### 7.2 Color & Contrast

**Don't rely on color alone to convey meaning:**
```
BAD: Wrong answer = red box ✗
GOOD: Wrong answer = red box + ✕ icon + "Not quite" text ✓
```

**Color contrast:** AA standard minimum (4.5:1 for text)

### 7.3 Keyboard Navigation

**All interactions must be keyboard-accessible:**
- Tab order is logical
- Focus states are visible (not invisible)
- Enter/Space activate buttons
- Escape closes modals
- Arrow keys navigate lists

### 7.4 Screen Readers

**All interactive elements must be labeled:**
```html
<button aria-label="Delete this question">✕</button>
<input aria-describedby="password-hint" type="password" />
<div id="password-hint">Must be 8+ characters</div>
```

---

## Part 8: Anti-Patterns (What NOT To Do)

### 8.1 Never Do This

❌ **Auto-play videos** — respect user choice  
❌ **Modal spam** — max 1 modal at a time  
❌ **Hidden cancel buttons** — always provide exit  
❌ **Instant state changes** — always animate transitions  
❌ **Disabled without reason** — explain why field is locked  
❌ **Generic copy** — personalize everything  
❌ **Overuse of modals** — use sheets or inline instead  
❌ **Slow transitions** — keep under 300ms usually  
❌ **No loading state** — always show what's happening  
❌ **Delete without confirmation** — always ask first  

---

## Part 9: Design System Implementation

### 9.1 Component Checklist

Every component must have:
- [ ] Default state
- [ ] Hover state
- [ ] Focus state (keyboard users)
- [ ] Disabled state
- [ ] Loading state (if async)
- [ ] Error state
- [ ] Success state (if applicable)
- [ ] Mobile responsive
- [ ] Accessibility (labels, contrast, keyboard nav)

### 9.2 File Structure

```
frontend/
├── components/
│   ├── Button.tsx          (all button states)
│   ├── Input.tsx           (all input states)
│   ├── Modal.tsx           (entrance/exit animation)
│   ├── Toast.tsx           (success/error notifications)
│   ├── LoadingSpinner.tsx  (animated, never static)
│   └── [others]/
├── styles/
│   ├── animations.css      (all motion patterns)
│   ├── variables.css       (colors, typography, spacing)
│   └── globals.css         (system defaults)
└── utils/
    └── motion.ts           (GSAP helpers)
```

---

## Part 10: Success Metrics

### 10.1 UX Health Indicators

**Track these to know if UX is working:**

1. **Engagement**
   - Session duration (how long are they in?)
   - Lessons completed per week (momentum)
   - Return rate (7-day, 30-day, 90-day)

2. **Emotion**
   - NPS score (would they recommend?)
   - Sentiment in surveys (words like "loved", "easy", "fun")
   - Feature usage (are they using delightful features?)

3. **Retention**
   - Churn rate (how many leave?)
   - Habit formation (% with 7+ day streaks)
   - Lifetime value (total lessons * rate)

4. **Quality**
   - Error rate (how often does something break?)
   - Support tickets (are users confused?)
   - Load time (is it snappy?)

### 10.2 Target Metrics

- **Session duration:** 15-25 min (long enough to matter, short enough to feel achievable)
- **Return rate (7-day):** 40%+ (40% of users come back within 7 days)
- **Return rate (30-day):** 60%+ (60% within a month)
- **Churn rate:** <5% per month (low dropout)
- **NPS:** 50+ (great UX is worth talking about)

---

## Part 11: Implementation Roadmap

### Phase 1 (Now)
- ✅ Learn step (smooth transitions, progress visible)
- ✅ Apply step (playful feedback on answers)
- ✅ Reflect step (gentle encouragement)
- ✅ Deepen step (curated feeling, not transactional)

### Phase 2 (Next)
- 🔲 AI-assisted content (delightful suggestions)
- 🔲 Peer interaction (social, but safe)
- 🔲 Analytics dashboard (seeing their growth)
- 🔲 Habit recommendations (timing lessons for them)

### Phase 3 (Future)
- 🔲 Mobile app (true native feel)
- 🔲 Offline learning (sync when online)
- 🔲 Multiplayer projects (collaborative learning)
- 🔲 Certification (proving mastery)

---

## Part 12: Design Decision Framework

**When you're unsure about a UX decision, ask:**

1. **Is it smooth?** (Does it feel intentional, not jarring?)
2. **Is it playful?** (Does it bring a smile?)
3. **Is it delightful?** (Will users want to share this?)
4. **Is it premium?** (Does it feel worth their time?)
5. **Is it interactive?** (Does the user feel in control?)

**If all 5 are YES → Ship it.**  
**If any is NO → Redesign it.**

---

## Part 13: Team Guidelines

### For Product Managers
- Every feature must serve one of the five pillars
- Default to motion (not just static design)
- Prioritize delight over features (less is more)

### For Designers
- Create in high-fidelity (not wireframes)
- Prototype motion (not just static designs)
- Test on real devices (not just desktop)
- Validate emotions (not just functionality)

### For Developers
- Match design specs exactly (timing, easing, duration)
- Respect prefers-reduced-motion (always)
- Test accessibility (keyboard, screen reader, contrast)
- Measure performance (don't sacrifice speed for motion)

### For Everyone
- User feedback is gospel (listen, don't defend)
- Iterate quickly (small changes, fast feedback)
- Celebrate wins (share what's working)
- Kill darlings (delete things that don't serve the mission)

---

## Conclusion: The Teyro Experience

When a student opens Teyro for the first time, they expect another boring online course platform.

Instead, they experience:
- **Smooth** transitions that feel intentional
- **Playful** micro-interactions that make them smile
- **Delightful** moments that celebrate their growth
- **Premium** design that respects their time
- **Interactive** feedback that empowers them

After one lesson, they think: "This is different. This is worth my time."

After one week, they have a streak. They don't want to break it.

After one month, they're telling friends: "You have to try Teyro. It's actually good."

**That's the goal. That's the experience we're designing for.**

Every animation, every word, every interaction is in service of that feeling.

This is Teyro. 🚀

---

**Document Version:** 1.0  
**Last Updated:** June 21, 2026  
**Owner:** Joel Ndakwe, Founder  
**Reviewers:** Design Team, Engineering Team, Product Team  
**Next Review:** September 2026
