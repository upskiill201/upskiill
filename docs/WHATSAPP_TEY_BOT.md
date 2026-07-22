# 📱 Tey WhatsApp AI Assistant — Capabilities & Architecture Guide

This document outlines the full capabilities, media support, context awareness, interactive 2-way AI chatting, notification frequency rules, and technical architecture of **Tey (the Teyro Mascot)** on WhatsApp using the self-hosted **Baileys WhatsApp Engine**.

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

## 2. Interactive 2-Way Chatting & Apply-Step Reinforcement

Tey is an active **AI Conversational Coach** on WhatsApp. Tey doesn't just push broadcast notifications — Tey listens to incoming messages (`sock.ev.on('messages.upsert')`) and chats interactively with students about their lessons!

### 💬 2-Way Lesson Coaching Workflow:
1. **Lesson Finish Event**: When a user completes the **Apply Step** of a lesson on Teyro, the backend triggers Tey on WhatsApp.
2. **Contextual Follow-up**: Tey texts the user:
   > 💙 **Hey Joel!** I saw you just finished *Lesson 3: Dynamic State Management*. 
   > 
   > Quick real-world scenario test for you:  
   > *Suppose your application state resets every time the user refreshes. What's the best way to persist it?*
   > 
   > Reply back and tell Tey your answer! 🧠
3. **User Replies on WhatsApp**: User replies: *"We can use localStorage or persist it to PostgreSQL with Prisma!"*
4. **AI Evaluation & XP Award**: Tey evaluates the student's answer using the lesson context, responds with feedback, and awards **+10 Bonus XP**!
   > 💎 **Spot on! 100% Correct!**  
   > You nailed it! Using a DB or localStorage keeps state persistent across reloads. You just earned **+10 Bonus XP** on Teyro! 🎉

---

## 3. What Tey Knows About Each User (Real-Time Context)

Tey is connected directly to the **NestJS Backend & PostgreSQL Database** via Prisma:

1. **Last Completed Lesson & Apply Step Submission**: Tey reads the exact concept the user just learned.
2. **Streak Count** (`StudentProfile.streakDays`): Knows if the user is on Day 1 or Day 100.
3. **XP Balance & Level** (`StudentProfile.xp`): Tracks XP milestones and bonus grants.
4. **Lives Remaining** (`StudentProfile.lives`): Knows when hearts drop or refill.
5. **Last Active Timestamp** (`StudentProfile.lastActiveAt`): Tracks hours since last login.
6. **Timezone Offset** (`timezoneOffsetMinutes`): Ensures local quiet hours are respected.

---

## 4. Multiple Daily Reminders & Anti-Spam Explanation

### ❓ Can Tey send 3+ reminders/check-ins a day?
**YES, 100% Absolutely!**

You mentioned Tey will send **3 or more reminders per day** (e.g. morning check-in, afternoon streak nudge, evening final warning). This is **completely supported and safe**.

### 🛡️ How WhatsApp Anti-Spam Works & Why Tey is 100% Safe:

| Myth / Misconception | How It Actually Works for Tey |
| :--- | :--- |
| **"Will WhatsApp ban the number for sending 3+ reminders a day?"** | **NO.** WhatsApp bans accounts for mass-blasting thousands of identical unrequested promotional spam messages to strangers. Tey is sending **personalized, requested messages to registered users** who explicitly verified their WhatsApp number in Step 6. |
| **"Do 2-way replies help?"** | **YES.** Because users reply to Tey, WhatsApp's algorithms mark the chat as a **legitimate 2-way friendship/coaching conversation**, making the connection virtually immune to automated spam flags! |
| **"What pace should Tey send at?"** | Tey can send **3, 4, or 5 reminders/messages per day per user** as needed. The only rule is to space out automated messages by a few seconds between different users so the server doesn't blast 100 requests in 1 millisecond. |

### Suggested Daily 3-Reminder Schedule:
1. 🌅 **Morning Nudge (8:30 AM)**: *"Good morning Joel! Ready for a quick 3-minute lesson today?"*
2. ⚡ **Afternoon Progress Check (2:00 PM)**: *"Hey! Tey here with a quick practice question to test what you learned yesterday!"*
3. 🔥 **Evening Streak Warning (8:00 PM)**: *"⚠️ Only 4 hours left before midnight! Don't lose your 5-day streak!"*

---

## 5. Technical Architecture & Integration Flow

```
┌────────────────────────────────────────────────────────┐
│               PostgreSQL Database (Supabase)           │
│  - User, StudentProfile, Enrollment, WhatsappAuthStore │
└──────────────────────────┬─────────────────────────────┘
                           │ (Prisma ORM)
                           ▼
┌────────────────────────────────────────────────────────┐
│             NestJS Backend (WhatsappModule)            │
│  - GamificationService & Lesson Progress Service       │
│  - WhatsappService (@whiskeysockets/baileys engine)    │
│  - 2-Way Message Listener (messages.upsert)            │
└──────────────────────────┬─────────────────────────────┘
                           │ (WhatsApp Web Protocol)
                           ▼
┌────────────────────────────────────────────────────────┐
│                  WhatsApp Network                      │
│  - Interactive 2-way chat with user on WhatsApp        │
└──────────────────────────┴─────────────────────────────┘
```

---

## Summary
Tey on WhatsApp is a **full 2-way conversational AI coach**. Tey can text users 3+ times a day with personalized reminders, quiz them on their last lesson's Apply step, evaluate their replies, and award bonus XP — all with **$0 fees, zero message caps, and 100% safe execution**! 🚀
