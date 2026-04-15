# TEYRO WAITLIST LANDING PAGE — Developer Handoff

> **Project:** Teyro Waitlist Landing Page  
> **Version:** 1.0  
> **Last Updated:** 2026-04-15  
> **Status:** Completed & Pushed to GitHub (`feat/teyro-landing-page-polish`)

---

## 1. Project Overview

### Purpose
High-converting landing page to build waitlist anticipation for Teyro v2 platform launch while capturing qualified users (students and instructors) for early access.

### Goals
- Build waitlist to 50,000+ users before launch
- Segment users by role (Student vs Instructor) from day one
- Create viral momentum through social proof and live numbers
- Educate the market on Teyro's unique approach to learning

### Design Inspiration
Scribe landing page (modern, gradient, product-focused, community-driven)

---

## 2. Technical Stack

### Frontend (No Docker)
| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 14 (App Router) | TypeScript |
| Styling | Tailwind CSS | With custom design tokens |
| UI Components | Shadcn UI | Customized for Teyro brand |
| Animations | Framer Motion | Scroll-triggered, micro-interactions |
| Forms | React Hook Form + Zod | Validation |
| Typeform | @typeform/embed | Modal integration |
| Hosting | Vercel | Separate project |

### Deployment
- **Repo:** Create new GitHub repo (e.g., `teyro/teyro-waitlist`)
- **Domain:** `Teyro.app` (points to this project until launch)
- **Vercel Project:** Separate from main app

### Analytics & Tracking
| Service | Purpose |
|---------|---------|
| Google Analytics 4 | Visitor flow, conversions |
| Hotjar | Heatmaps, session recording |
| Typeform | Form submissions |

---

## 3. Design System

### Color Palette
```css
/* Primary Gradient */
--gradient-primary: linear-gradient(135deg, #4F46E5 0%, #9333EA 100%);

/* Brand Colors */
--brand-blue: #4F46E5;
--brand-purple: #9333EA;
--brand-accent: #A855F7;

/* Backgrounds */
--bg-white: #ffffff;
--bg-light: #F9FAFB;
--bg-gradient: linear-gradient(135deg, #EEF2FF 0%, #F3E8FF 100%);

/* Text */
--text-primary: #1F2937;
--text-secondary: #4B5563;
--text-muted: #6B7280;

/* States */
--success-green: #10B981;
--error-red: #EF4444;
```

### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Hero Headline | Inter | 56px (desktop), 36px (mobile) | 800 |
| Section Headline | Inter | 40px (desktop), 28px (mobile) | 700 |
| Subheadline | Inter | 20px | 500 |
| Body | Inter | 16px | 400 |
| Button | Inter | 16px | 600 |

### Spacing System
- Base unit: 8px
- Sections: py-24 (desktop), py-16 (mobile)
- Cards: p-6, gap-6
- Container max-width: 1280px

### Border Radius
| Component | Radius |
|-----------|--------|
| Buttons | 12px |
| Cards | 16px |
| Inputs | 10px |
| Modals | 16px |

---

## 4. Page Sections (In Order)

### Section 1: Navigation Bar
**File:** `components/layout/Navbar.tsx`

**Layout:** Sticky top navigation (backdrop-blur)

**Components:**
- Logo: "Teyro" text (bold, gradient)
- Links: Features, Solutions, Marketplace, FAQ
- CTA Button: "Join Waitlist" (ghost → solid on scroll)

**Behavior:**
- Hide on scroll down, show on scroll up
- Background blur increases on scroll

---

### Section 2: Hero Section
**File:** `components/sections/HeroSection.tsx`

**Headline (H1):**
> "See the learning you have. Build the future you want."

**Subheadline:**
> "Introducing Teyro: AI-powered learning that actually guides you. From confused to confident in weeks, not years."

**Visual:**
- Animated gradient background (blue → purple, subtle movement)
- Floating learning icons (animated, staggered)
- Hero mockup showing: student on device, progress indicator, AI tutor interface

**Primary CTA Button:**
- Text: "Join 23,543 others on the waitlist" (live count)
- Style: Large (h-14), gradient background, hover scale
- Action: Opens Typeform modal

**Secondary CTA:**
- "See what you're waiting for" (scroll indicator arrow, bounce animation)

---

### Section 3: The 5 Problems + Solutions
**File:** `components/sections/ProblemsSolutions.tsx`

**Intro Text:**
> "Why people quit online courses. Why learning platforms fail. Here's what's broken."

#### Problem Cards (5 total):

| # | Problem | Solution |
|---|---------|----------|
| 1 | **Analysis Paralysis** | Skill Gap Analyzer - AI creates personalized learning path |
| 2 | **Learning in the Dark** | AI Tutor (24/7) - Always available when stuck |
| 3 | **Offline = Out of Luck** | Lite Mode - Works on 2G, offline downloads, audio-first |
| 4 | **The Motivation Cliff** | XP Points & Badges - Gamified progression system |
| 5 | **Learning Doesn't Lead to Earning** | Teyro Marketplace - Sell skills immediately |

**Card Design:**
- Problem card (left): Red-tinted, icon + text
- Solution card (right): Green-tinted, icon + text + screenshot mockup
- Scroll-triggered reveal (staggered)

---

### Section 4: Why Teyro is Different
**File:** `components/sections/WhyTeyro.tsx`

**Headline:**
> "This isn't another course platform. Here's what sets Teyro apart."

#### Feature Cards (6 total):

1. **AI Learning Companion** - "Your Personal AI Tutor (Always There When You Need It)"
2. **Personalized Learning Paths** - "Netflix-Level Personalization (But for Skills)"
3. **Designed for Africa** - "Built for Real Conditions. Low Data. Limited Time."
4. **Community** - "Learn Together, Grow Together"
5. **Confusion Detector** - "We Notice When You're Stuck (Before You Quit)"
6. **Skill Verification** - "Certificates That Actually Get You Hired"

**Card Design:**
- Icon (48px, gradient background)
- Headline + description
- Hover: subtle lift + shadow

---

### Section 5: Solutions by Role
**File:** `components/sections/RoleSolutions.tsx`

**Two Columns:**

#### For Students:
- Problem: "I want to learn real skills without wasting time or money"
- Solutions checklist (9 items with checkmarks)
- Student dashboard mockup
- CTA: "I'm a Student - Let Me In"

#### For Instructors:
- Problem: "I want to reach more students and actually make good money"
- Solutions checklist (9 items with checkmarks)
- Instructor dashboard mockup + revenue breakdown
- CTA: "I'm an Instructor - Let Me In"

---

### Section 6: Marketplace
**File:** `components/sections/Marketplace.tsx`

**Headline:**
> "Beyond Courses. Services. Real Income. From Day One."

**Visual Flow:**
1. Learn a Skill
2. Your Projects Become Sellable
3. Students Buy Your Services
4. You Earn

**Features:**
- Service packages (Basic, Standard, Premium)
- Verified skill badges
- Seller levels (Rookie → Rising Star → Expert)

**Social Proof:**
> "Zainab learned UI Design → Sold 47 design projects → Earned $3,200 in 3 months"

**CTA:** "See Marketplace"

---

### Section 7: Social Proof Stats
**File:** `components/sections/Stats.tsx`

**Headline:**
> "People Are Already Building Better Futures on Teyro"

**Stat Cards (4):**

| Stat | Value | Industry Average |
|------|-------|-----------------|
| Completion Rate | 93% | 5-10% |
| Time to Proficiency | 6-8 weeks | 6-12 months |
| Marketplace Success | 23,543 earning ($400/mo avg) | N/A |
| Data Efficiency | 85% less data | N/A |

**Design:** Gradient stat cards with icons, animated counter on scroll

---

### Section 8: Learning Styles
**File:** `components/sections/LearningStyles.tsx`

**Headline:**
> "Visual? Hands-on? Reading? Teyro Adapts to YOU."

**Four Cards:**
1. Visual Learners - Diagrams, infographics, videos
2. Practical Learners - Real projects, hands-on exercises
3. Reading/Writing - Text guides, code examples
4. Audio Learners - Podcasts, voice explanations, WhatsApp audio

---

### Section 9: Teyro in Numbers
**File:** `components/sections/Numbers.tsx`

**Animated Counters:**
- 1,000+ courses coming
- 10,000+ instructors onboarding
- 23,543+ waitlist members (LIVE)
- 50+ African countries
- $millions projected marketplace volume

**Design:** Large numbers with gradient colors, counting animation on scroll

---

### Section 10: Timeline
**File:** `components/sections/Timeline.tsx`

**Headline:**
> "Your Preview of What's Launching Soon"

**Timeline Cards:**

| Phase | Timeline | Features |
|-------|----------|----------|
| **Phase 1** | MVP (Month 3) | Core platform, AI Tutor, Personalized paths, 20+ courses |
| **Phase 2** | AI & Engagement (Month 6) | Skill Gap Analyzer, Gamification, Community, Low-data mode |
| **Phase 3** | Marketplace (Month 9) | Student services marketplace, Payments, Earning dashboard |
| **Phase 4** | Scale (Month 12) | Mobile apps, Multi-language, Expanded library |

**Design:** Horizontal timeline on desktop, vertical on mobile

---

### Section 11: FAQ
**File:** `components/sections/FAQ.tsx`

**Questions (10):**

1. "When does Teyro launch?"
2. "Is it really free to join the waitlist?"
3. "Do I need to be technical to use Teyro?"
4. "What if I'm an instructor? Can I sell courses?"
5. "How much will courses cost?"
6. "Will Teyro work on my data plan?"
7. "Can I really earn money on the marketplace?"
8. "Is Teyro only for Africa?"
9. "How is Teyro different from Coursera/Udemy?"
10. "What role should I select: Student or Instructor?"

**Design:** Accordion style, one open at a time, smooth expand animation

---

### Section 12: Final CTA
**File:** `components/sections/FinalCTA.tsx`

**Headline:**
> "Join Thousands Waiting for Teyro"

**Main CTA:**
> "Join 23,543 others - Get early access" (live counter)

**Secondary:**
> "Limited spots for early founders. Free to join."

**Social Links:**
- Twitter, LinkedIn, Instagram, Discord

---

### Section 13: Footer
**File:** `components/layout/Footer.tsx`

**Columns:**

1. **Product:** Features, Marketplace, Pricing, Security
2. **Company:** About, Blog, Careers, Contact
3. **Legal:** Terms, Privacy, Refund Policy
4. **Social:** Twitter, LinkedIn, Instagram, Discord
5. **Newsletter:** Email input for updates

**Copyright:**
> "Made with ❤️ in Cameroon © 2026 Teyro. All rights reserved."

---

## 5. Typeform Integration

### Setup
Create two Typeform forms:

#### Student Form (Form A)
**Fields:**
- Full Name (text, required)
- Email (email, required)
- What skill do you want to learn? (short text)
- Experience Level (multiple choice: Beginner/Intermediate/Advanced)
- Country (dropdown)
- How did you hear about us? (multiple choice, optional)
- Subscribe to updates (boolean)

#### Instructor Form (Form B)
**Fields:**
- Full Name (text, required)
- Email (email, required)
- What expertise will you teach? (short text)
- Have you taught before? (yes/no)
- How many courses will you create? (estimate)
- Country (dropdown)
- Why do you want to teach on Teyro? (long text)
- Portfolio/LinkedIn link (url, optional)
- Subscribe to updates (boolean)

### Integration
- Use `@typeform/embed-react` library
- Modal trigger on CTA click
- Role selection modal before Typeform

### User Flow
```
Hero CTA Click
    ↓
Modal: "Are you a Student or Instructor?"
    ↓
    ├─ STUDENT → Typeform A → Thank you page
    └─ INSTRUCTOR → Typeform B → Thank you page
```

### Post-Submission
- Typeform sends email confirmation
- Webhook to update waitlist database
- Add to email nurture sequence

---

## 6. Live Waitlist Counter

### Implementation
```typescript
// API endpoint returns current count
// GET /api/waitlist/count

// Frontend fetches and displays:
// "Join 23,543 others on the waitlist"
```

### Options
1. **Simple (Recommended):** Static counter + manual updates
2. **Database:** Store signups in Airtable/Supabase
3. **Typeform:** Fetch submission count via Typeform API

---

## 7. Component File Structure

```
waitlist/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css          # Tailwind + custom CSS
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProblemsSolutions.tsx
│   │   ├── WhyTeyro.tsx
│   │   ├── RoleSolutions.tsx
│   │   ├── Marketplace.tsx
│   │   ├── Stats.tsx
│   │   ├── LearningStyles.tsx
│   │   ├── Numbers.tsx
│   │   ├── Timeline.tsx
│   │   ├── FAQ.tsx
│   │   ├── FinalCTA.tsx
│   │   └── RoleModal.tsx     # Student/Instructor selection
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Accordion.tsx
│       └── Badge.tsx
├── lib/
│   ├── typeform.ts           # Typeform config
│   └── utils.ts
├── public/
│   └── images/              # Placeholders for mockups
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 8. Animation Specifications

### Scroll-Triggered Reveals
- Use Framer Motion `useInView` hook
- Stagger children by 0.1s
- Initial: opacity 0, y 20
- Final: opacity 1, y 0
- Duration: 0.5s
- Easing: ease-out

### Micro-interactions
- Buttons: scale(1.02) on hover, scale(0.98) on click
- Cards: translateY(-4px), shadow increase on hover
- Links: underline slide-in effect

### Hero Animations
- Gradient background: slow color shift (20s loop)
- Floating icons: translateY (3s loop, alternate)
- Scroll indicator: bounce animation (1s loop)

### Counter Animations
- Use `framer-motion` built-in counting
- Trigger on scroll into view
- Duration: 2s for full count

---

## 9. Responsive Breakpoints

```typescript
// Tailwind breakpoints:
sm: '640px'   // Mobile landscape
md: '768px'  // Tablet
lg: '1024px' // Desktop
xl: '1280px' // Large desktop
```

### Mobile-First Approach
1. Design for mobile first
2. Add tablet styles at md
3. Add desktop styles at lg

### Key Mobile Considerations
- Hamburger menu for navigation
- Single column layouts
- Touch-friendly tap targets (min 44px)
- Font sizes readable without zooming

---

## 10. Performance Requirements

| Metric | Target |
|-------|--------|
| Lighthouse Score | >90 |
| Page Load | <2.5s |
| First Contentful Paint | <1.5s |
| Time to Interactive | <3s |
| Cumulative Layout Shift | <0.1 |

### Optimization Techniques
- Next.js Image component
- Dynamic imports for below-fold sections
- Font subsetting (Inter only)
- CSS minification
- Lazy load animations

---

## 11. SEO Requirements

### Meta Tags
```html
<title>Teyro - AI-Powered Learning That Actually Works</title>
<meta name="description" content="Join the waitlist for Teyro. AI-powered learning that guides you from confused to confident. Build skills, earn money.">
<meta name="keywords" content="AI learning, online courses, Africa, skills, marketplace, education">
```

### Open Graph
```html
<meta property="og:title" content="Teyro - AI-Powered Learning">
<meta property="og:description" content="From confused to confident in weeks. Join 23,543+ waiting.">
<meta property="og:image" content="/og-image.png">
<meta property="og:url" content="https://teyro.app">
```

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Teyro",
  "url": "https://teyro.app",
  "potentialAction": {
    "@type": "JoinAction",
    "target": "https://teyro.app"
  }
}
```

---

## 12. Analytics Events

### Track These Events
| Event | Description |
|-------|-------------|
| `page_view` | Page loads |
| `cta_clicked` | Primary CTA clicked |
| `role_selected` | Student/Instructor chosen |
| `form_started` | Typeform opened |
| `form_completed` | Typeform submitted |
| `scroll_depth` | 25%, 50%, 75%, 100% |
| `faq_expanded` | FAQ question opened |
| `social_click` | Social link clicked |

---

## 13. Acceptance Criteria

### Visual Checkpoints
- [ ] Navigation sticks to top with blur effect
- [ ] Hero section has animated gradient background
- [ ] Live counter shows accurate number
- [ ] All 5 problem/solution cards render correctly
- [ ] All 6 feature cards display with icons
- [ ] Role selection modal works correctly
- [ ] Typeform modal opens for each role
- [ ] FAQ accordion expands/collapses smoothly
- [ ] Stats animate on scroll
- [ ] Timeline displays all 4 phases
- [ ] Footer has all columns and links

### Functionality
- [ ] All CTAs trigger Typeform modal
- [ ] Mobile navigation works
- [ ] Page loads under 3 seconds
- [ ] No console errors
- [ ] Responsive on all breakpoints
- [ ] Forms submit correctly when integrated

---

## 14. Copy Reference

### Hero
**Headline:** "See the learning you have. Build the future you want."
**Subheadline:** "Introducing Teyro: AI-powered learning that actually guides you. From confused to confident in weeks, not years."
**CTA:** "Join 23,543 others on the waitlist"

### Problems Intro
"Why people quit online courses. Why learning platforms fail. Here's what's broken."

### Why Different
"This isn't another course platform. Here's what sets Teyro apart."

### Stats
"People Are Already Building Better Futures on Teyro"

### FAQ Question 1
"When does Teyro launch?"

### FAQ Answer 1
"Phase 1 MVP will launch in August, and we will launch Beta in July. Waitlist members get early access to the beta platform, insider insights, and testing opportunities while we develop."

### Final CTA
"Join 23,543 others - Get early access"

---

## 15. Assets Needed

### Icons
- Robot/AI for AI Tutor
- Path/personALIZATION
- Globe/Africa
- Community/people
- Lightbulb for Confusion Detector
- Badge/certificate
- 5 problem icons
- 5 solution icons

### Mockups (Placeholder or Create)
- Student dashboard
- Instructor dashboard
- AI tutor chat interface
- Skill gap analyzer output + timeline
- Marketplace homepage
- Seller profile
- XP/badges/dashboard
- Offline audio player

### Social Proof Images
- User avatars (diverse)
- Sample earnings dashboard

---

## 16. Getting Started

### 1. Initialize Project
```bash
npx create-next-app@latest teyro-waitlist --typescript --tailwind --eslint
cd teyro-waitlist
npm install framer-motion @typeform/embed-react react-hook-form zod @hookform/resolvers lucide-react
```

### 2. Configure Tailwind
Add custom design tokens to `tailwind.config.ts`

### 3. Create Components
Build sections in order (1-13)

### 4. Set Up Typeform
Create forms, get IDs, configure embed

### 5. Deploy
```bash
# Push to GitHub
# Connect to Vercel
# Set custom domain
```

---

## 17. Post-Launch Tasks

### First Week
- [ ] Monitor conversion rate (target: 15-25%)
- [ ] Check for mobile issues
- [ ] Verify Typeform submissions
- [ ] Respond to early signups

### Growth
- [ ] A/B test headlines
- [ ] Add more social proof
- [ ] Start content marketing
- [ ] Paid ads (Google, Facebook)

---

## 18. Contacts & Access

| Resource | Link |
|-----------|------|
| **GitHub Repo** | Create new: `teyro/teyro-waitlist` |
| **Vercel Project** | Create new for waitlist |
| **Domain** | `Teyro.app` → point to Vercel |
| **Typeform** | Create 2 forms via typeform.com |
| **Analytics** | GA4 Property (create new) |

---

## Notes

### Critical Success Factors
1. Crystal Clear Value Prop - Users must understand why Teyro is different in <10 seconds
2. Frictionless Signup - 1-click role selection, simple Typeform
3. Social Proof - Live counter creates FOMO
4. Design - Scribe-like modern aesthetic
5. Mobile Optimization - 80%+ African users are mobile
6. Fast Loading - No patience for slow pages
7. Clear CTA - One primary action, clear next steps

### Tone & Messaging
- Not: "We have courses like everyone else"
- Yes: "We've solved the 5 biggest online learning problems"
- Not: "Join our community"
- Yes: "Start earning money within weeks of learning"

---

**Document Status:** ✅ Ready for Development

**Next Steps:**
1. Initialize Next.js project
2. Configure Tailwind with design tokens
3. Build all 13 sections
4. Set up Typeform integration
5. Deploy to Vercel
6. Configure domain

---

*Created: 2026-04-12*  
*For: Teyro Waitlist Launch*