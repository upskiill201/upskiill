# MVP Complete Feature Specification — All 14 Pillars

> This document defines every feature the Upskiill MVP must have.
> Developers: before building anything, check this doc to understand the full scope.

---

## User Roles

| Role | What they can do |
|------|-----------------|
| **Visitor** | Browse public pages, view courses (not logged in) |
| **Student** | Buy & take courses, earn certificates |
| **Instructor** | Create & sell courses, manage students |
| **Publisher** | Write articles *(future — Phase 2+)* |
| **Admin** | Control entire platform |
| **Editor** | Manage blog content |

---

## PILLAR 1 — User & Auth System

### Account Actions
- [ ] Sign up (email + password)
- [ ] Login / Logout
- [ ] Social login (Google, Facebook via Firebase)
- [ ] Email verification on signup
- [ ] Password reset (forgot password)
- [ ] Delete account

### User Profile Page
- [ ] Profile photo upload
- [ ] Bio text
- [ ] Social links (LinkedIn, Twitter, GitHub)
- [ ] My enrolled courses list
- [ ] My wishlist
- [ ] My certificates
- [ ] My published articles *(future)*

---

## PILLAR 2 — Course Marketplace

### Homepage Sections
- [ ] Hero section (headline + CTA)
- [ ] Featured courses section
- [ ] Course categories grid
- [ ] Popular courses section
- [ ] New & trending courses
- [ ] Student testimonials
- [ ] Instructor highlights
- [ ] Footer (links, legal, social)

### Course Discovery
- [ ] Browse by category page
- [ ] Search bar (keyword search)
- [ ] Filter by: Price, Level, Rating, Duration, Language
- [ ] Sort by: Most popular, Newest, Price (low/high)

### Course Card (shows in all lists)
- [ ] Thumbnail image
- [ ] Course title
- [ ] Instructor name + avatar
- [ ] Star rating + count
- [ ] Number of enrolled students
- [ ] Price (and strike-through if discounted)

---

## PILLAR 3 — Course Sales Page

### Course Info Section
- [ ] Title & subtitle
- [ ] Full description
- [ ] What you'll learn (bullet points)
- [ ] Requirements / prerequisites
- [ ] Target audience
- [ ] Total duration
- [ ] Language
- [ ] Last updated date

### Social Proof
- [ ] Average star rating
- [ ] Total reviews count
- [ ] Total enrollments
- [ ] Individual written reviews

### Curriculum Preview
- [ ] Sections with lesson list
- [ ] Lock icon for paid content
- [ ] Free preview badge on select lessons
- [ ] Lesson durations

### Instructor Profile (on course page)
- [ ] Name + photo
- [ ] Short bio
- [ ] Total courses count
- [ ] Total students count

### Purchase Box (sticky sidebar)
- [ ] Course price
- [ ] Discount price (if coupon applied)
- [ ] Add to Cart button
- [ ] Buy Now button
- [ ] 30-day refund guarantee

---

## PILLAR 4 — Student Learning System

### Student Dashboard
- [ ] My courses (in progress + completed)
- [ ] Progress bars per course
- [ ] Resume learning button (last watched lesson)
- [ ] Recommended courses
- [ ] Recently viewed courses
- [ ] Certificates earned

### Course Player
- [ ] Video stream (HLS format)
- [ ] Playback speed (0.5x → 2x)
- [ ] Video quality selector
- [ ] Fullscreen mode
- [ ] Lecture sidebar (list of all lessons)
- [ ] Mark lesson as complete button
- [ ] Notes section (take notes per lesson)
- [ ] Download resources (PDFs, files)
- [ ] Next / Previous lesson navigation
- [ ] Auto-play next lesson

### Progress Tracking
- [ ] % of lessons completed
- [ ] % of course completed
- [ ] Resume from last position

### Certificates
- [ ] Auto-generated when course 100% complete
- [ ] Downloadable PDF
- [ ] Unique certificate ID (verifiable)
- [ ] Shareable link

---

## PILLAR 5 — Instructor System

### Instructor Dashboard
- [ ] Total revenue (this month + all time)
- [ ] Total students count
- [ ] Course analytics (views, sales, ratings)
- [ ] Recent reviews
- [ ] Earnings chart (by month)

### Course Creation Wizard (5 steps)
- [ ] **Step 1:** Course basics (title, description, category, level)
- [ ] **Step 2:** Curriculum builder (add sections + upload video lessons)
- [ ] **Step 3:** Pricing (set price, add promo price)
- [ ] **Step 4:** Submit for admin review
- [ ] **Step 5:** Published (after admin approves)

---

## PILLAR 6 — Payments & Monetization

### Shopping System
- [ ] Cart (add/remove courses)
- [ ] Coupon code system
- [ ] Checkout flow
- [ ] Order summary

### Payment Gateways
- [ ] Stripe (card payments, global)
- [ ] PayPal
- [ ] MTN Mobile Money
- [ ] Orange Money

### Post-Payment
- [ ] Auto-enroll in course after payment
- [ ] Invoice/receipt generated
- [ ] Payment history page
- [ ] Refund request system

### Instructor Earnings
- [ ] Revenue split (Platform: 30%, Instructor: 70%)
- [ ] Earnings dashboard
- [ ] Withdrawal / payout request system

---

## PILLAR 7 — Reviews & Wishlist

### Reviews
- [ ] Students rate course (1-5 stars)
- [ ] Students write written review
- [ ] Reviews show on course sales page
- [ ] Admins can delete/moderate reviews

### Wishlist
- [ ] Add course to wishlist (heart icon)
- [ ] View all wishlisted courses
- [ ] Remove from wishlist

---

## PILLAR 8 — Notifications

### What triggers notifications
- [ ] Purchase confirmation
- [ ] New course available from enrolled instructor
- [ ] Course update / new lesson added
- [ ] Platform announcements

### Channels
- [ ] Email notifications (SendGrid)
- [ ] In-app notification bell (top navbar)

---

## PILLAR 9 — Admin Backoffice

### Analytics Dashboard
- [ ] Total users (growth chart)
- [ ] Total courses
- [ ] Total revenue
- [ ] Sales chart (by day/month)

### User Management
- [ ] View all users
- [ ] Search users
- [ ] Suspend / ban users
- [ ] Change user role

### Course Moderation
- [ ] View courses pending approval
- [ ] Approve course → goes live
- [ ] Reject course (with reason)
- [ ] Remove published course

### Finance
- [ ] All transactions list
- [ ] Process refunds
- [ ] Instructor payout management

### Categories
- [ ] Create new categories
- [ ] Edit / delete categories
- [ ] Assign icon/color to category

---

## PILLAR 10 — Support & Legal

### Support
- [ ] Contact form page
- [ ] FAQ page
- [ ] Help center (basic articles)
- [ ] Support ticket submission

### Legal Pages (static content)
- [ ] Terms of Service (`/terms`)
- [ ] Privacy Policy (`/privacy`)
- [ ] Refund Policy (`/refund-policy`)
- [ ] Instructor Terms (`/instructor-terms`)

---

## PILLAR 11 — Blog & Content Platform

### Article Features
- [ ] Rich text editor (headings, bold, lists, images, code, video embed)
- [ ] Table of contents (auto-generated)
- [ ] Related articles section
- [ ] Comment section
- [ ] Social sharing buttons (Twitter, LinkedIn, WhatsApp)

### SEO System (per article)
- [ ] Custom SEO title field
- [ ] Meta description field
- [ ] Focus keyword
- [ ] Custom URL slug editor
- [ ] OpenGraph preview (how it looks on Facebook/LinkedIn)
- [ ] Twitter card preview
- [ ] Auto-update XML sitemap
- [ ] Structured data (Article schema)
- [ ] Breadcrumbs

---

## PILLAR 12 — Internal Editorial Workflow

### Roles
- Editor in Chief, Editor, Writer, SEO Manager

### Article Status Flow
```
Draft → Pending Review → Approved → Scheduled → Published
```
- [ ] Writers create drafts
- [ ] Editors review and approve
- [ ] Admin can schedule publication date
- [ ] Articles embed recommended courses at bottom

---

## PILLAR 13 — Publisher Program *(Future)*
External publishers can join to write articles and earn from ad revenue.
*Full spec to be defined in Phase 3 documentation.*

---

## PILLAR 14 — AdSense Revenue Sharing *(Future)*
Platform shares a % of ad revenue with publishers per article.
*Full spec to be defined in Phase 3 documentation.*
