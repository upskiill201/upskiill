# 📱 Tey WhatsApp AI Assistant — Capabilities & Architecture Guide

This document outlines the full capabilities, media support, context awareness, notification responsibilities, and technical architecture of **Tey (the Teyro Mascot)** on WhatsApp using the self-hosted **Baileys WhatsApp Engine**.

---

## 1. Media & Rich Content Capabilities

Because we use the self-hosted **Baileys WhatsApp Web protocol**, Tey has **zero paywall restrictions, zero template pre-approval delays, and full media payload support**. 

| Content Type | Supported? | Code Implementation | User Experience |
| :--- | :---: | :--- | :--- |
| **Formatted Text & Emojis** | ✅ **Yes** | Standard markdown (`*bold*`, `_italic_`, `~strike~`, `\`code\``) | Bold text, emojis, formatted lists, links |
| **High-Res Images** | ✅ **Yes** | `sock.sendMessage(jid, { image: { url: '...' }, caption: '...' })` | Tey mascot illustrations, celebratory banners, XP milestone charts |
| **Video Clips & Animations** | ✅ **Yes** | `sock.sendMessage(jid, { video: { url: '...' }, caption: '...' })` | Short video lessons, mascot motion clips, module previews |
| **WhatsApp Stickers** | ✅ **Yes** | `sock.sendMessage(jid, { sticker: { url: '...' } })` | Tey reaction stickers (happy, shocked, fire, high-five) |
| **GIF Animations** | ✅ **Yes** | `sock.sendMessage(jid, { video: { url: '...' }, gifPlayback: true })` | Looping inline GIF animations |
| **Voice Notes (PTT)** | ✅ **Yes** | `sock.sendMessage(jid, { audio: { url: '...' }, ptt: true })` | Tey audio voice notes sent as native WhatsApp voice messages |
| **PDF Certificates & Docs** | ✅ **Yes** | `sock.sendMessage(jid, { document: { url: '...' }, fileName: '...' })` | Course completion certificates, downloadable lesson cheatsheets |
| **Interactive Buttons / Menus** | ✅ **Yes** | `sock.sendMessage(jid, { text: '...', buttons: [...] })` | Interactive "Start Lesson", "Remind Me in 1h", "Check Streak" buttons |

---

## 2. Tey's Context-Aware Responsibilities

Tey is not a dumb broadcast bot. Tey is connected directly to the **NestJS Backend & PostgreSQL Database**, giving Tey complete real-time awareness of every student's learning state.

### 🧠 What Tey Knows About Each User:
1. **Streak Count** (`StudentProfile.streakDays`): Knows if the user is on Day 1 or Day 100.
2. **XP Balance & Level** (`StudentProfile.xp`): Tracks XP milestones and starter grants.
3. **Lives Remaining** (`StudentProfile.lives`): Knows if the user ran out of lives during a hard practice quiz.
4. **Last Active Timestamp** (`StudentProfile.lastActiveAt`): Knows exactly when the user last completed a lesson.
5. **Enrolled Courses & Progress** (`Enrollment`, `Lesson`): Knows which course, section, and lesson the user is currently on.
6. **Timezone Offset** (`timezoneOffsetMinutes`): Knows local time so Tey never texts during quiet night hours.

---

## 3. Tey's Automated WhatsApp Workflows

### 🔔 Workflow A: Daily Streak Protection (Midnight Alert)
* **Trigger**: User has an active streak (>0 days), but hasn't completed a lesson today by 7:00 PM local time.
* **Tey Message**:
  > 💙 **Hey Joel!** Tey here...
  > 
  > ⚠️ You're on a **4-Day Streak** 🔥, but you haven't learned today! 
  > You have 5 hours left before midnight or your streak resets.
  > 
  > Tap below to complete today's 3-minute lesson:
  > 
  > [🚀 CONTINUE LESSON] [🧊 USE STREAK FREEZE]

### 🏆 Workflow B: XP & Level Milestone Celebrations
* **Trigger**: User passes 100 XP, 500 XP, or 1,000 XP.
* **Tey Payload**: Sends a Tey mascot high-five image + celebratory message + XP balance update.
* **Tey Message**:
  > 💎 **BOOM! 500 XP UNLOCKED!** 
  > 
  > You're moving fast! You've earned 500 XP on Teyro. Keep pushing! 🚀

### 💔 Workflow C: Lives Refilled Alert
* **Trigger**: User's lives reach max (5/5) after waiting for life refills.
* **Tey Message**:
  > ❤️ **Your Lives Are Full! (5/5)**
  > 
  > All hearts are refilled and ready for action. Time to conquer that quiz! 💪

### 📚 Workflow D: In-WhatsApp Micro-Quizzes & Practice
* **Trigger**: User responds to a Tey message or taps "Practice Now".
* **Tey Message**:
  > 🧠 **Quick Tey Quiz Time!**
  > 
  > *Question*: What is the primary purpose of `process.env.NEXT_PUBLIC_API_URL`?
  > 
  > A) Hardcode production URLs  
  > B) Dynamically read backend API URL  
  > C) Connect to database directly  
  > 
  > Reply with **A**, **B**, or **C**!

---

## 4. Technical Architecture & Integration Flow

```
┌────────────────────────────────────────────────────────┐
│               PostgreSQL Database (Supabase)           │
│  - User, StudentProfile, Enrollment, WhatsappAuthStore │
└──────────────────────────┬─────────────────────────────┘
                           │ (Prisma ORM)
                           ▼
┌────────────────────────────────────────────────────────┐
│             NestJS Backend (WhatsappModule)            │
│  - GamificationService (Streak / XP / Lives engine)    │
│  - WhatsappService (@whiskeysockets/baileys socket)    │
│  - Cron / Schedule Jobs (Daily reminder engine)        │
└──────────────────────────┬─────────────────────────────┘
                           │ (WhatsApp Web Protocol)
                           ▼
┌────────────────────────────────────────────────────────┐
│                  WhatsApp Network                      │
│  - Direct delivery to user's WhatsApp app               │
└────────────────────────────────────────────────────────┘
```

---

## 5. Potential Limitations & Smart Safeguards

| Concern | Limitation? | Solution / Safeguard |
| :--- | :--- | :--- |
| **API Costs** | ❌ **No Limitation ($0.00)** | Baileys uses WhatsApp Web protocol — zero message costs. |
| **Daily Message Cap** | ❌ **No Limitation (Unlimited)** | Unlike Twilio's 5-message trial cap, self-hosted Baileys has no cap. |
| **WhatsApp Spam Flagging** | ⚠️ **Risk if abused** | **Smart Rate Limiting**: Max 1 reminder per day per user. Never send more than 1 message per minute per user. |
| **Nighttime Disturbance** | ⚠️ **User annoyance risk** | **Quiet Hours Enforcement**: Respects `timezoneOffsetMinutes` — no messages between 10 PM and 8 AM. |
| **Server Restart / Deploy** | ❌ **No Loss** | Session keys stored in PostgreSQL `whatsapp_auth_store` — Tey stays connected across all Render deploys. |

---

## Summary
With our **Baileys + NestJS + Prisma** setup, Tey has **complete freedom** to act as a fun, dynamic, context-aware AI learning companion on WhatsApp with full support for images, stickers, voice notes, and instant progress alerts! 🚀
