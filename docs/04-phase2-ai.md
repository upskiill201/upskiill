# Phase 2 — AI & Engagement (Months 4-6)

> **Goal:** Add AI features that make Upskiill unique and dramatically improve learning outcomes.
> **Budget:** $58,000 | **Team:** 8 people | **Duration:** 12 weeks

---

## Features to Build

### 1. AI Tutor (24/7 Chat)
**Pages:** `/ai-tutor`
**What it does:**
- Student asks questions about course content
- AI answers in real-time (like a personal tutor)
- Remembers context of the conversation
- Can explain, clarify, give examples

**How it works:**
```
Student types question
        ↓
Backend sends question + course context to OpenAI GPT-4
        ↓
GPT-4 responds with relevant answer
        ↓
Streamed back to student in real-time
```

**Tech:** OpenAI GPT-4 API + RAG (Retrieval Augmented Generation)
**Cost:** ~$0.02–0.05 per question
**Effort:** 10 days

---

### 2. Personalized Learning Paths
**Pages:** `/learning-path`
**What it does:**
- Student sets their goal (e.g. "become a web developer")
- AI generates a custom course sequence
- Adjusts based on quiz scores and progress
- Shows estimated time to completion

**Effort:** 12 days

---

### 3. Skill Gap Analyzer
**Pages:** `/skill-gap`
**What it does:**
- Student uploads their CV
- Selects a target job (e.g. "Full Stack Developer")
- AI compares their skills to what the job requires
- Shows a skill map + recommended courses to fill the gaps

**Tech:** OpenAI API + job market data API
**Effort:** 10 days

---

### 4. Gamification System
**What it does:**
- XP points for completing lessons
- Badges for achievements (e.g. "First Course Complete")
- Leaderboard among enrolled students
- Streaks (consecutive days of learning)

**Effort:** 12 days

---

### 5. Community Features
**Pages:** `/community`
**What it does:**
- Discussion forum per course
- Ask questions, answer others
- Upvote helpful answers
- Follow instructors

**Effort:** 10 days

---

### 6. Smart Learning Reminders
**What it does:**
- Sends reminders when student hasn't studied in X days
- Spaced repetition — reminds students to review old material
- Via email + WhatsApp

**Tech:** Twilio (WhatsApp) + SendGrid
**Effort:** 7 days

---

### 7. Offline Learning
**What it does:**
- Student can download lessons to watch offline
- Works in the browser using Service Workers
- Auto-syncs progress when back online

**Effort:** 9 days

---

## Phase 2 Build Order

```
Week 1-2:   AI Tutor Chat (core feature)
Week 3-4:   Skill Gap Analyzer
Week 5-6:   Personalized Learning Paths
Week 7-8:   Gamification (XP, badges, streaks)
Week 9-10:  Community Forums
Week 11-12: Smart Reminders + Offline Mode
```

---

## New Infrastructure for Phase 2

| Service | Purpose | Cost/Month |
|---------|---------|-----------|
| OpenAI GPT-4 API | AI Tutor | $100-500 |
| Pinecone | Vector database for RAG | $20-100 |
| Twilio | WhatsApp reminders | $100-200 |
| Firebase Realtime DB | Community chat | $25 |

---

## Definition of Done for Phase 2

- [ ] AI Tutor answers student questions correctly
- [ ] Skill Gap Analyzer generates personalized recommendations
- [ ] Students have XP points and badges visible on profile
- [ ] Community discussions work per course
- [ ] WhatsApp reminders send automatically
- [ ] Students can learn offline
