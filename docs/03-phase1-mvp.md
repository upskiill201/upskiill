# Phase 1 — MVP Foundation (Months 1-3)

> **Goal:** Get 1,000+ users on the platform, launch 20+ courses, achieve $5,000+ in sales.
> **Budget:** $43,000 | **Team:** 6 people | **Duration:** 12 weeks

---

## Features to Build

### 1. User Authentication
**Pages:** `/login`, `/signup`
**What to build:**
- Email/password sign up and login
- Google social login (via Firebase)
- Email verification
- Password reset flow

**Tech:** Firebase Auth + NestJS JWT
**Effort:** 3 days

---

### 2. User Profiles
**Pages:** `/profile`
**What to build:**
- Profile photo upload
- Bio and skills
- Enrolled courses list
- Certificates earned

**Effort:** 4 days

---

### 3. Course Marketplace (Browse)
**Pages:** `/courses`
**What to build:**
- Grid of course cards
- Search bar
- Filter by: price, rating, level (beginner/intermediate/advanced)
- Sort by: popular, newest, price

**Effort:** 8 days

---

### 4. Course Detail Page
**Pages:** `/courses/[id]`
**What to build:**
- Course title, description, thumbnail
- Curriculum preview (list of lessons)
- Instructor info
- Price + Buy button
- Student reviews & ratings

**Effort:** 6 days

---

### 5. Video Streaming (Course Player)
**Pages:** `/learn/[courseId]`
**What to build:**
- Video player with quality selector
- Sidebar with lesson list
- Progress tracking (which lessons completed)
- Notes section

**Tech:** AWS S3 + HLS.js player
**Effort:** 8 days

---

### 6. Student Dashboard
**Pages:** `/dashboard`
**What to build:**
- My enrolled courses
- Progress bars per course
- Resume learning button
- Certificates earned

**Effort:** 5 days

---

### 7. Payment / Checkout
**Pages:** `/checkout`
**What to build:**
- Cart summary
- Stripe payment form
- Order confirmation
- Invoice generation

**Tech:** Stripe
**Effort:** 6 days

---

### 8. Instructor Dashboard
**Pages:** `/instructor`, `/instructor/create`
**What to build:**
- Create new course (title, description, price)
- Upload video lessons
- View enrolled students
- Earnings overview

**Effort:** 8 days

---

### 9. Landing / Homepage
**Pages:** `/` (update existing)
**What to build:**
- Hero section (headline, CTA button)
- Featured courses
- How it works section
- Testimonials
- Footer

**Effort:** 5 days

---

### 10. Email Notifications
**What to build:**
- Welcome email on signup
- Purchase confirmation email
- Course completion email

**Tech:** SendGrid
**Effort:** 3 days

---

## Phase 1 Build Order (Recommended)

```
Week 1-2:   Authentication (login, signup) + User Profiles
Week 3-4:   Homepage + Course Browse + Course Detail page
Week 5-6:   Payment/Checkout + Video Player
Week 7-8:   Student Dashboard + Instructor Dashboard
Week 9-10:  Admin Panel (basic) + Email Notifications
Week 11-12: Testing, bug fixes, launch prep
```

---

## Phase 1 Component Checklist

### UI Components
- [ ] `Button` — primary, secondary, outline variants
- [ ] `Input` — text, email, password with labels
- [ ] `Card` — reusable card container
- [ ] `Modal` — popup dialogs
- [ ] `Spinner` — loading state
- [ ] `Badge` — labels (Beginner, Intermediate, etc.)
- [ ] `Avatar` — user profile image

### Layout Components
- [ ] `Header` — navigation, logo, user menu
- [ ] `Footer` — links, copyright
- [ ] `Sidebar` — for dashboard and course player

### Feature Components
- [ ] `CourseCard` — thumbnail, title, price, rating
- [ ] `VideoPlayer` — HLS video with controls
- [ ] `ProgressBar` — course completion progress
- [ ] `StarRating` — display/input ratings
- [ ] `LessonList` — sidebar list of lessons
- [ ] `PaymentForm` — Stripe card input

---

## Definition of Done for Phase 1

- [ ] User can sign up, log in, reset password
- [ ] User can browse and search courses
- [ ] User can buy a course with Stripe
- [ ] User can watch video lessons
- [ ] User can track their progress
- [ ] Instructor can create and upload a course
- [ ] Emails send on key events
- [ ] Works on mobile (responsive)
- [ ] Deployed and live on Vercel + Render
