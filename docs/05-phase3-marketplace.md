# Phase 3 — Marketplace & Monetization (Months 7-9)

> **Goal:** Launch the marketplace where students sell services — completing the Learn → Build → Earn loop.
> **Budget:** $67,000 | **Team:** 10 people | **Duration:** 12 weeks

---

## The Core Concept

```
Student learns on Upskiill
        ↓
Builds real skills
        ↓
Gets certified
        ↓
Lists services on Upskiill Marketplace
        ↓
Clients find and hire them
        ↓
Student earns money
```

---

## Features to Build

### 1. Service Listings
**Pages:** `/marketplace/create`
**What to build:**
- Student creates a service listing
- Title, description, delivery time
- Tiered pricing (Basic / Standard / Premium)
- Portfolio examples

**Effort:** 8 days

---

### 2. Marketplace Browse
**Pages:** `/marketplace`
**What to build:**
- Browse all student services
- Search by skill, price, rating
- Filter by category (Design, Dev, Marketing, etc.)
- Trending services section

**Effort:** 7 days

---

### 3. Seller Profile
**Pages:** `/sellers/[id]`
**What to build:**
- Seller's name, bio, skills, certificates
- Reviews and ratings from past clients
- Portfolio of completed work
- All available services

**Effort:** 6 days

---

### 4. Escrow Payment System
**What it does:**
- Client pays upfront (money held by Upskiill)
- Student delivers the work
- Client approves → money released to student
- If dispute: 14-day refund window

**How money flows:**
```
Client pays $100
        ↓
Upskiill holds $100 (escrow)
        ↓
Student delivers work
        ↓
Client approves
        ↓
Upskiill releases $80 to student (keeps 20% commission)
```

**Tech:** Stripe Connect
**Effort:** 10 days

---

### 5. Order & Project Management
**Pages:** `/orders`
**What to build:**
- Messaging between client and student
- File sharing
- Milestone tracking
- Order status (Pending → In Progress → Delivered → Complete)

**Effort:** 12 days

---

### 6. Seller Dashboard
**Pages:** `/seller`
**What to build:**
- Total earnings
- Active orders
- Reviews received
- Payout history
- Analytics (views, clicks, conversions)

**Effort:** 8 days

---

### 7. Blog / Content Platform
**Pages:** `/blog`, `/blog/[slug]`
**What to build:**
- Create and publish articles
- SEO optimization (meta tags, schema)
- Categories and tags
- Articles recommend relevant courses (conversion funnel)

**Target:** 50+ articles · 100k+ monthly organic visitors
**Effort:** 10 days

---

### 8. Mobile Money Payments (Africa)
**What to build:**
- MTN Mobile Money integration
- Airtel Money
- Orange Money

**Tech:** Paystack + Flutterwave
**Effort:** 6 days

---

## Commission Structure

| Transaction | Upskiill Fee |
|-------------|-------------|
| Course Sale | 30% of course price |
| Marketplace Service | 20% of service price |
| Featured Listing | Flat fee per month |

---

## Phase 3 Build Order

```
Week 1-2:   Service listing creation + Marketplace browse
Week 3-4:   Escrow payment system (critical path)
Week 5-6:   Order management + Messaging
Week 7-8:   Seller dashboard + Seller profiles
Week 9-10:  Mobile money (Paystack/Flutterwave)
Week 11-12: Blog/CMS + Testing + Launch
```

---

## Definition of Done for Phase 3

- [ ] Students can create and list services
- [ ] Clients can find and buy services
- [ ] Escrow holds and releases payments correctly
- [ ] Client and student can communicate per order
- [ ] Upskiill automatically takes commission
- [ ] Mobile money payments work (MTN, Airtel, Orange)
- [ ] Blog publishes SEO-optimized articles
- [ ] Payouts sent to sellers on schedule
