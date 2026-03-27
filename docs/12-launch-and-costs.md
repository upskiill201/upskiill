# Launch & Cost Guide — MVP to Phase 3

> Accurate cost planning for every stage of Upskiill's build and launch.
> **Current status:** Frontend on Vercel (free) · Backend on Render (free)

---

## ⚠️ What "Free" Actually Means Right Now

| Service | Plan | Limitation | When it breaks |
|---------|------|-----------|---------------|
| Vercel (Frontend) | Free | 100GB bandwidth/month | ~10,000+ monthly visitors |
| Render (Backend) | Free | **Sleeps after 15 min idle** ❌ | Right now — unacceptable for real users |
| GitHub | Free | Public repo | Never |
| Firebase Auth | Free | 10,000 MAU/month | 10,000+ users |
| SendGrid | Free | 100 emails/day | High email volume |
| Stripe | Free | 2.9% + $0.30 per transaction | Never (% based) |

> 🚨 **Critical:** The Render free backend **sleeps** — a real user's first request takes 30–60 seconds to load. You MUST upgrade before launch.

---

## 💡 Minimum Spend Philosophy

```
Free where possible → Upgrade only when needed → Scale as you earn
```

Rule: Only pay for services that directly affect user experience.

---

---

# PHASE 1 — MVP LAUNCH COSTS

## What You Need to Launch MVP

### 1. Domain Name
| Option | Cost | Recommendation |
|--------|------|---------------|
| `.com` (Namecheap) | **$9–12/year** | ✅ Best — get upskiill.com if available |
| `.app` (Google Domains) | $14/year | Good for tech startups |
| `.co` | $25/year | Popular but pricier |

**→ Budget: $12/year = $1/month**

---

### 2. Backend Hosting (Most Critical Upgrade)
The Render free tier sleeps. You MUST fix this before launching.

| Option | Cost/Month | What you get | Recommendation |
|--------|-----------|-------------|---------------|
| **Render Starter** | **$7/month** | Always-on, 512MB RAM | ✅ Best for MVP |
| Railway Hobby | $5 credit/mo | Can run out | ⚠️ Risky |
| Fly.io | Free + pay per use | More complex setup | For later |
| DigitalOcean Droplet | $6/month | Full control, manual setup | Only if you know DevOps |

**→ Budget: $7/month (Render Starter)**

---

### 3. Database (PostgreSQL)
Your backend needs a database to store users, courses, payments etc.

| Option | Cost/Month | Storage | Recommendation |
|--------|-----------|---------|---------------|
| **Supabase Free** | **$0/month** | 500MB, 50k MAU | ✅ Best starting point |
| Neon.tech Free | $0/month | 3GB, branching feature | ✅ Also great |
| Render PostgreSQL Starter | $7/month | 1GB | Only if Supabase isn't enough |
| PlanetScale Free | $0/month | 5GB | MySQL-based (different from Postgres) |

**→ Budget: $0/month (Supabase or Neon free tier — both excellent)**

---

### 4. Video Storage & Delivery (Biggest Cost)
Course videos are the largest expense. Students upload videos, others stream them.

**Realistic estimates for MVP (20 courses, ~50 videos, avg 300MB each):**

| Component | Usage | Cost |
|-----------|-------|------|
| AWS S3 Storage (15GB video) | 15GB × $0.023 | **$0.35/month** |
| CloudFront CDN delivery | 500GB served × $0.0085 | **$4.25/month** |
| Data transfer out | Included above | - |

| Option | Cost/Month | Recommendation |
|--------|-----------|---------------|
| **AWS S3 + CloudFront** | **$5–40/month** | ✅ Industry standard, scales well |
| Cloudflare R2 | $0 for first 10GB egress | ✅ Cheaper than S3, new but solid |
| Bunny.net CDN | $0.01/GB storage + $0.01/GB delivered | ✅ Very cheap, great alternative |
| Mux.com | $0.0055/min stored + $0.015/min watched | ❌ Too expensive at scale |

**Minimum budget option: Cloudflare R2 + Bunny.net = ~$2–15/month for MVP traffic**
**Standard option: AWS S3 + CloudFront = ~$5–40/month**

**→ Budget: $5–15/month (Cloudflare R2 to start, upgrade to S3 + CloudFront later)**

---

### 5. Email Service (Transactional)
For: welcome emails, purchase confirmations, password resets

| Option | Cost/Month | Free Tier | Recommendation |
|--------|-----------|----------|---------------|
| **SendGrid** | **$0** | 100 emails/day (3,000/mo) | ✅ Free for MVP |
| Resend.com | $0 | 100 emails/day | ✅ Modern, easy to use |
| Mailgun | $35/month | 100 emails/day | ❌ Too expensive for MVP |
| AWS SES | $0.10/1,000 emails | None | Best deal at high volume |

**→ Budget: $0/month (SendGrid or Resend free tier)**

---

### 6. Authentication
| Option | Cost | Free Tier | Recommendation |
|--------|------|----------|---------------|
| **Firebase Auth** | **$0** | 10,000 MAU free | ✅ Already planned, use it |
| Auth0 | $23/month | 7,500 MAU | ❌ Too expensive |
| Supabase Auth | $0 | Unlimited | ✅ Good if using Supabase DB |

**→ Budget: $0/month**

---

### 7. Payments (Stripe)
No monthly fee — Stripe charges per transaction only.

| Gateway | Fee Per Transaction | Monthly Fee | Recommendation |
|---------|-------------------|------------|---------------|
| **Stripe** | 2.9% + $0.30 | $0 | ✅ Use for global cards |
| **Paystack** | 1.5% + ₦100 (capped at ₦2,000) | $0 | ✅ Add for African markets |
| PayPal | 3.49% + fixed fee | $0 | ✅ Add for PayPal users |

**Real cost example:** Student pays $50 for a course:
```
Stripe fee:     $1.75 (2.9% + $0.30)
Platform keeps: $48.25
Instructor gets 70%: $33.77
Platform revenue:    $14.47
```

**→ Budget: $0/month fixed (pay as you earn)**

---

### 8. Monitoring & Uptime
| Option | Cost | Recommendation |
|--------|------|---------------|
| **UptimeRobot** | **$0** | Free 50 monitors, 5min checks | ✅ |
| Sentry (error tracking) | $0 | Free for small teams | ✅ |
| Vercel Analytics | $0 | Built into Vercel | ✅ |

**→ Budget: $0/month**

---

## ✅ Phase 1 MVP Launch — Total Monthly Cost

| Service | Free Option | Recommended Option | Cost/Month |
|---------|------------|-------------------|-----------|
| Domain | - | Namecheap .com | $1 |
| Frontend (Vercel) | ✅ Free | Free | $0 |
| Backend (Render) | ❌ (sleeps) | **Render Starter** | **$7** |
| Database | ✅ Supabase Free | Supabase Free | $0 |
| Video Storage | - | Cloudflare R2 | $2–15 |
| Email | ✅ SendGrid Free | SendGrid Free | $0 |
| Auth (Firebase) | ✅ Free | Free | $0 |
| Payments | ✅ No monthly | No monthly | $0 |
| Monitoring | ✅ Free | Free | $0 |
| **TOTAL** | | | **$10–23/month** |

> 💰 **MVP Launch Minimum: $10–23/month**
> 💰 **With video content at scale: $30–50/month**

---

### One-Time MVP Launch Costs

| Item | Cost | When |
|------|------|------|
| Domain (.com, 1 year) | $12 | Before launch |
| AWS account setup | $0 | Before launch |
| Stripe account | $0 | Before launch |
| Firebase project | $0 | Before launch |
| **Total one-time** | **$12** | |

---

---

# PHASE 2 — AI FEATURES COST (Months 4-6)

At this point you should have revenue from Phase 1 to fund Phase 2.

## New Services Needed for Phase 2

### 1. OpenAI API (AI Tutor)
This is the biggest new cost in Phase 2.

| Model | Cost Per 1M tokens | Realistic monthly cost |
|-------|-------------------|----------------------|
| GPT-4o | Input $2.50, Output $10 | **$50–200/month** at 1,000 students |
| GPT-4o-mini | Input $0.15, Output $0.60 | **$5–20/month** | 
| GPT-3.5 Turbo | Input $0.50, Output $1.50 | **$10–40/month** |

**Strategy:** Start with **GPT-4o-mini** (fast, cheap, quality is good). Move to GPT-4o for premium users only.

**→ Budget: $10–50/month (start with mini, upgrade as revenue grows)**

---

### 2. Vector Database (For AI Tutor Memory)
Needed for RAG — so AI can answer questions about course content.

| Option | Cost | Free Tier | Recommendation |
|--------|------|----------|---------------|
| **Pinecone** | **$0–70/month** | 1 index, 100k vectors | ✅ Start free |
| Supabase pgvector | **$0** | Built into Supabase | ✅ Best if using Supabase |
| Weaviate Cloud | $0 | Sandbox free | ✅ Alternative |

**→ Budget: $0/month (use Supabase pgvector — free)**

---

### 3. WhatsApp Reminders (Twilio)
| Option | Cost | Recommendation |
|--------|------|---------------|
| **Twilio WhatsApp** | $0.005/message + $15/month template fee | ✅ Most reliable |
| 360Dialog | $5/month | ✅ Cheaper alternative |

**→ Budget: $15–30/month**

---

### 4. Backend Upgrade
More AI requests = more server load. Upgrade Render.

| Plan | Cost | RAM | Recommendation |
|------|------|-----|---------------|
| Render Starter (current) | $7/month | 512MB | Getting tight |
| **Render Standard** | **$25/month** | 2GB | ✅ Upgrade at Phase 2 |

**→ Budget: $25/month (upgrade from $7)**

---

## ✅ Phase 2 Total Monthly Cost

| Service | Cost/Month |
|---------|-----------|
| Domain | $1 |
| Frontend (Vercel) | $0 |
| Backend (Render Standard) | $25 |
| Database (Supabase free) | $0 |
| Video (Cloudflare R2) | $15–40 |
| Email (SendGrid) | $0 |
| **OpenAI API** | **$10–50** |
| Vector DB (Supabase pgvector) | $0 |
| WhatsApp (Twilio) | $15–30 |
| Monitoring | $0 |
| **TOTAL** | **$66–146/month** |

> 💰 **Phase 2 Cost: $66–146/month**
> 🎯 **Revenue target to be self-funding: $500+/month from course sales**

---

---

# PHASE 3 — MARKETPLACE COSTS (Months 7-9)

At this stage the platform earns commission on services. Revenue should cover costs.

## New Services for Phase 3

### 1. Stripe Connect (Marketplace Payouts)
Needed to pay out sellers.

| Fee | Amount |
|-----|--------|
| Stripe Connect fee | 0.25% + $0.25 per payout |
| Platform takes | 20% commission |
| No monthly fee | $0 |

**→ Budget: $0 fixed (% based, covered by commission)**

---

### 2. Search Engine (Elasticsearch Alternative)
For marketplace search across listings.

| Option | Cost/Month | Recommendation |
|--------|-----------|---------------|
| **Typesense Cloud** | **$0–27/month** | ✅ Much cheaper than Elasticsearch |
| Algolia | $0–60/month | Free for small, good quality |
| Elasticsearch (Elastic Cloud) | $45–100/month | ❌ Expensive for this stage |
| Meilisearch Cloud | $0–30/month | ✅ Open source, great alternative |

**→ Budget: $0–27/month (Typesense or Meilisearch free tier to start)**

---

### 3. Real-time Messaging (Orders)
For buyer–seller messaging on orders.

| Option | Cost | Recommendation |
|--------|------|---------------|
| **Firebase Realtime DB** | **$0–25/month** | ✅ Free tier generous (1GB data) |
| Pusher | $0–49/month | ✅ Easy to use |
| Ably | $0–29/month | ✅ Good free tier |

**→ Budget: $0–25/month (Firebase free tier for MVP marketplace)**

---

### 4. Backend + Database Upgrade
More users, more sellers, more transactions = more load.

| Service | Current | Phase 3 Upgrade | Extra Cost |
|---------|---------|----------------|-----------|
| Backend | $25/month | **$50/month** (Render Pro) | +$25 |
| Database | Free tier | **Supabase Pro $25/month** (8GB) | +$25 |

**→ Budget: +$50/month additional**

---

## ✅ Phase 3 Total Monthly Cost

| Service | Cost/Month |
|---------|-----------|
| Domain | $1 |
| Frontend (Vercel Pro) | $20 |
| Backend (Render Pro) | $50 |
| Database (Supabase Pro) | $25 |
| Video CDN (S3 + CloudFront) | $40–80 |
| Email (SendGrid Essentials) | $20 |
| OpenAI API | $50–150 |
| Search (Typesense) | $0–27 |
| Messaging (Firebase) | $0–25 |
| WhatsApp (Twilio) | $30 |
| Monitoring (Sentry paid) | $26 |
| Stripe/Paystack | % based |
| **TOTAL** | **$262–454/month** |

> 💰 **Phase 3 Cost: ~$300–450/month**
> 🎯 **Revenue target: $3,000+/month (platform takes 20–30% GMV)**

---

---

# COST SUMMARY TABLE — All 3 Phases

| Phase | Timeline | Monthly Cost | One-Time | Revenue Target |
|-------|----------|-------------|----------|---------------|
| **Phase 1 MVP Launch** | Month 3 | **$10–50/month** | $12 | $500+/month |
| **Phase 2 AI Features** | Month 6 | **$66–146/month** | $0 | $2,000+/month |
| **Phase 3 Marketplace** | Month 9 | **$262–450/month** | $0 | $5,000+/month |

---

# LAUNCH CHECKLIST — When MVP is Ready

## Pre-Launch (1 week before)

### Services to Set Up
- [ ] Buy domain name ($12) — **upskiill.com**
- [ ] Upgrade Render to Starter plan ($7/month)
- [ ] Create Supabase project (free) — set up PostgreSQL
- [ ] Create Cloudflare R2 bucket (free) — video storage
- [ ] Set up SendGrid account (free) — verify domain for emails
- [ ] Create Firebase project — enable Google Auth
- [ ] Create Stripe account — get live API keys
- [ ] Create Paystack account — for African payments

### Environment Variables to Add in Vercel
```
NEXT_PUBLIC_API_URL=https://upskiill-backend.onrender.com
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
```

### Environment Variables to Add in Render
```
DATABASE_URL=postgresql://...
FIREBASE_ADMIN_KEY=...
STRIPE_SECRET_KEY=...
SENDGRID_API_KEY=...
JWT_SECRET=...
AWS_ACCESS_KEY=...
AWS_SECRET_KEY=...
```

### Testing Before Launch
- [ ] Create a test user account
- [ ] Buy a test course (use Stripe test mode)
- [ ] Watch a test video lesson
- [ ] Test on mobile
- [ ] Test password reset flow
- [ ] Check all pages load under 3 seconds

### Legal (Must have before launch)
- [ ] Terms of Service page live
- [ ] Privacy Policy page live
- [ ] Refund Policy page live
- [ ] Cookie consent banner

---

## Launch Day

1. ✅ Switch Stripe from **test mode → live mode**
2. ✅ Set up domain to point to Vercel (DNS settings)
3. ✅ Verify all emails send correctly
4. ✅ Announce on social media
5. ✅ Monitor Render dashboard for errors

---

## Minimum Money Needed Before Launch

| Item | Cost | Required? |
|------|------|----------|
| Domain (.com) | $12 | ✅ Yes |
| Render Starter (3 months) | $21 | ✅ Yes |
| Cloudflare R2 (first month) | $0–5 | ✅ Yes |
| Firebase (free) | $0 | ✅ Free |
| Stripe (free) | $0 | ✅ Free |
| SendGrid (free) | $0 | ✅ Free |
| **MINIMUM TO LAUNCH** | **$33–38** | |
| **Comfortable 3-month runway** | **$100–150** | Recommended |
