# 🎨 Upskiill Homepage — UI Design Brief
> **For:** UI Design Team
> **Status:** Active Design Sprint
> **Last Updated:** 2026-03-31
> **Benchmark Reference:** `/signup` & `/login` pages (already built — match this quality level or exceed it)

---

## 🧭 BEFORE YOU START — READ THIS

This is not a basic website. Upskiill is a **premium learning platform** competing directly with Udemy, Coursera, and Domestika — but built for the African and global market with a modern, upgraded feel.

**The homepage is the #1 most important page in the entire product.** It is the first thing every visitor, investor, and student sees. It must feel:

- 🚀 **World-class** — like something built by a top Silicon Valley design team
- 💎 **Premium** — not generic; every detail should feel intentional
- 🌍 **Ambitious** — this platform is going to 100,000+ users
- ✨ **Alive** — every section should have micro-animations and a sense of movement

**CAUTION: If your design looks like a free Webflow template, you have failed.** The homepage must wow any visitor in under 3 seconds.

---

## 🎨 BRAND IDENTITY — The Design Language

### 1. Color System (STRICT — Do Not Deviate)

| Token | HEX | Usage |
|---|---|---|
| `--brand-blue` | `#3D5AFE` | ⭐ Primary CTA buttons, links, logo, highlights |
| `--brand-blue-hover` | `#2D4AEE` | Button hover state |
| `--soft-blue` | `#6C8CFF` | Secondary accent, decorative elements |
| `--gradient-purple` | `#7B61FF` | Gradient partner to brand blue |
| `--gradient-hero` | `#1F2A44 → #3D5AFE` | Dark hero backgrounds |
| `--gradient-brand` | `#3D5AFE → #7B61FF` | Accent gradients, highlighted text |
| `--bg-page` | `#FFFFFF` | Main background |
| `--bg-section` | `#F5F7FB` | Alternating section backgrounds |
| `--light-blue-bg` | `#EEF2FF` | Blue-tinted section backgrounds |
| `--text-primary` | `#1F2A44` | All headings and body text |
| `--text-secondary` | `#64748B` | Subtext, captions |
| `--text-muted` | `#94A3B8` | Labels, placeholder text |
| `--border` | `#E2E8F0` | Card borders, dividers |
| `--success-green` | `#22C55E` | Badges, success, "Live" indicators |

### 2. Typography — Inter Font

All text uses **Inter** (Google Fonts). Here is the type scale:

| Element | Size | Weight | Color |
|---|---|---|---|
| Section Hero Headline | `56–68px` | `800` | `#1F2A44` |
| Section Sub Headline | `40–48px` | `700` | `#1F2A44` |
| Card Titles | `18–22px` | `700` | `#1F2A44` |
| Body/Description | `16px` | `400–500` | `#64748B` |
| Kicker / Label | `12–13px` | `700` | `#3D5AFE` / uppercase |
| Stat Numbers (big impact) | `48–72px` | `800` | Gradient or `#1F2A44` |

### 3. Spacing & Borders

- **Border radius:** Cards → `16px`, Buttons → `10px`, Chips/Tags → `999px` (pill)
- **Shadows:** Cards → `0 4px 24px rgba(0,0,0,0.06)`, Hover → `0 12px 40px rgba(61, 90, 254, 0.15)`
- **Section padding:** `80–120px` top and bottom
- **Container max-width:** `1280px`, centered with auto horizontal margins

### 4. Animation Guidelines

- **Hover effects:** All cards must lift slightly (`translateY(-4px)`) with a blue glow shadow on hover
- **Entrance animations:** Elements fade in + slide up (`opacity 0→1`, `translateY(20px→0)`) on scroll
- **Floating elements:** Slow CSS `keyframe` animations reused from the signup page
- **Transitions:** All transitions → `0.3s ease` minimum

---

## 🏠 THE SECTIONS — Build in this order

The homepage has **9 sections**. Sections 1 and 2 are already built. Begin from Section 3.

---

### ✅ SECTION 1: HERO FOLD — Already Built
*Skip. Do not modify. Reference only.*

Full 100vh hero banner. Dark gradient background. Instructor photo with 3D breakout effect. Floating glassmorphism badges. Category slider carousel.

---

### ✅ SECTION 2: WHY LEARN WITH UPSKIILL — Already Built
*Skip. Do not modify. Reference only.*

12 premium feature cards with `#EEF2FF` circular icon backgrounds, `#3D5AFE` FA6 icons, hover animations.

---

### 🔴 SECTION 3: TOP CATEGORIES GRID
**Background:** `#F5F7FB`

**Layout:**
- Section Kicker (uppercase, brand blue): `"EXPLORE BY SUBJECT"`
- Section Headline: `"Learn Anything, Master Everything"`
- Section Subtext: `"From coding to creative skills — find the perfect course for your goals."`
- Grid of 12 category cards: 4 columns desktop / 2 tablet / 1 mobile
- "Browse All Categories" CTA button below (outlined, brand blue)

**Card Spec:** Rounded rect (16px), colorful icon (64–80px on tinted circle), bold category name, course count subtitle. Hover: card lifts, blue shadow, icon scales.

**12 Categories with accent colors:**

| # | Category | Accent |
|---|---|---|
| 1 | Web Development | `#EEF2FF` (blue tint) |
| 2 | Mobile Development | `#EDE9FE` (indigo tint) |
| 3 | UI/UX Design | `#F3E8FF` (purple tint) |
| 4 | Data Science & AI | `#E0F2FE` (cyan tint) |
| 5 | Video & Film | `#FEE2E2` (red tint) |
| 6 | Photography | `#FEF3C7` (amber tint) |
| 7 | Music & Audio | `#FCE7F3` (pink tint) |
| 8 | Business | `#D1FAE5` (emerald tint) |
| 9 | Digital Marketing | `#FFEDD5` (orange tint) |
| 10 | Writing & Content | `#FEF9C3` (yellow tint) |
| 11 | Cybersecurity | `#E2E8F0` (slate tint) |
| 12 | Languages | `#CCFBF1` (teal tint) |

**TIP:** Each card's icon background matches its accent color. Beautiful color variety across the grid.

---

### 🔴 SECTION 4: TOP COURSES CAROUSEL
**Background:** `#FFFFFF`

**Layout:**
- Section Kicker: `"🔥 MOST POPULAR"`
- Section Headline: `"Top-Rated Courses Chosen by Students"`
- Horizontal scrollable row of Course Cards (4 visible desktop, 2 tablet)
- Navigation arrows (left/right)
- Tab filter bar: `All | Development | Design | Business | Marketing`
- "View All Courses" CTA at end

**Course Card Component Spec:**
```
┌─────────────────────────────────┐
│   THUMBNAIL (16:9 ratio)        │ ← gradient overlay at bottom
│   [ BESTSELLER ]               │ ← yellow pill badge top-left
├─────────────────────────────────┤
│ Course Title (2 lines max)      │ ← 16px, 700, #1F2A44
│ By [Avatar] Instructor Name     │ ← 13px, #64748B
│ ⭐ 4.8  (2,456 ratings)         │ ← gold stars
│ 24 hours · 148 lessons          │ ← 12px, #94A3B8
│ $49.99  ~~$89.99~~              │ ← bold blue price, grey strikethrough
└─────────────────────────────────┘
```

**Card hover:** Lifts `translateY(-4px)`, blue shadow appears, `"Preview Course →"` button slides up from thumbnail bottom.

---

### 🔴 SECTION 5: SOCIAL PROOF — STATS BANNER
**Background:** `linear-gradient(135deg, #1F2A44 0%, #3D5AFE 100%)`

**Layout:** Full-width dark banner with 4 stat counters in a row:

| Icon | Number | Label |
|---|---|---|
| 👥 | `50,000+` | Active Learners Worldwide |
| 🎓 | `1,200+` | Expert-Led Courses |
| 🏆 | `320+` | World-Class Instructors |
| 📜 | `8,000+` | Certificates Awarded |

- Numbers: `64–72px`, `800` weight, white
- Icons: glassmorphism circles (same style as signup page)
- **Counter animation:** Numbers count up from 0 on scroll
- Thin vertical dividers (`rgba(255,255,255,0.1)`) between stats on desktop
- Subtle radial glow behind each number

---

### 🔴 SECTION 6: HOW IT WORKS
**Background:** `#F5F7FB`

**Layout:**
- Section Kicker: `"SIMPLE & FAST"`
- Section Headline: `"Start Learning in Three Easy Steps"`
- 3-step horizontal layout desktop / vertical stack mobile

**The 3 Steps:**

| Step | Icon | Title | Description |
|---|---|---|---|
| `01` | `fa-magnifying-glass` | Find Your Course | Browse 1,200+ premium courses across 12 categories |
| `02` | `fa-play-circle` | Learn at Your Pace | Watch HD video lessons, download resources, take notes anytime |
| `03` | `fa-certificate` | Earn Your Certificate | Complete your course and instantly download your verified certificate |

**Design Details:**
- Step numbers as watermarks behind icons: `200px`, `rgba(61,90,254,0.04)`
- Dashed animated connector arrow between steps on desktop
- Staggered entrance: step 1 (0ms) → step 2 (150ms) → step 3 (300ms)
- `#EEF2FF` icon circles with `#3D5AFE` icons (consistent with all feature sections)

---

### 🔴 SECTION 7: BECOME AN INSTRUCTOR — CTA
**Background:** `#EEF2FF`

**Layout:** Two-column split

**Left Column:**
- Kicker: `"FOR EXPERTS & EDUCATORS"`
- Headline (48px, 800): `"Share Your Knowledge, Earn While You Teach"`
- Description: `"Join 320+ expert instructors on Upskiill. Create your course, build your audience, and earn 70% revenue share on every sale."`
- Primary CTA: `"Start Teaching Today →"` (brand blue button)
- Secondary CTA: `"Learn More"` (text link, underlined)
- 3 trust stats: `70% Revenue share` · `50K+ Students to reach` · `$0 Cost to start`

**Right Column:**
- Aspirational image of an instructor in a studio/home office
- 2 animated floating glass cards:
  - `💰 $3,200 earned this month`
  - `👥 1,240 students enrolled`
- Both glass cards use the same floating keyframe animation as signup page

**IMPORTANT:** This section must feel like a financial opportunity, not a form. The earnings stats are key to making it motivating.

---

### 🔴 SECTION 8: TESTIMONIALS
**Background:** `#FFFFFF`

**Layout:**
- Section Kicker: `"STUDENT SUCCESS STORIES"`
- Section Headline: `"Real Learning, Real Results"`
- Auto-scrolling carousel: 3 cards visible desktop, 1 mobile
- Navigation dots below (auto-play 5s, pause on hover)

**Card Spec:**
```
┌──────────────────────────────────────┐
│ ❝ (large quote, #3D5AFE, 48px)      │
│                                      │
│ "Quote text here, max 2-3 lines..."  │
│                                      │
│ ──────────────────────────────       │
│ [Avatar 48px]  Name                  │
│                Title                 │
│                ⭐⭐⭐⭐⭐            │
└──────────────────────────────────────┘
```

**6 Testimonials:**

| Name | Title | Quote |
|---|---|---|
| Amara Diallo | Frontend Developer | "I landed my first dev job 3 months after taking the Full Stack course. The quality is unmatched." |
| Kwame Asante | UX Designer | "The design courses are incredibly practical. Got 5 interview calls after redesigning my portfolio." |
| Fatima Al-Rashid | Data Analyst | "The AI & Data Science learning path completely changed the trajectory of my career." |
| Emeka Okafor | Entrepreneur | "Invested $49 and learned skills worth $49,000. Best decision I made for my business." |
| Léa Dupont | Marketing Manager | "The Digital Marketing course paid for itself within a week of applying what I learned." |
| Yusuf Abubakar | Cybersecurity Analyst | "Best investment for my professional growth. Highly structured, expert-level content." |

**Style:** White card, `1px #E2E8F0` border, 16px radius, soft shadow. Avatar with `2px #3D5AFE` ring.

---

### 🔴 SECTION 9: HOMEPAGE FOOTER
**Background:** `#1F2A44` (Deep Navy)

**Layout:** 4-column grid + bottom bar

| Column | Content |
|---|---|
| **Brand** | Logo (white), tagline, social icons, copyright |
| **Platform** | Browse Courses, Categories, Become Instructor, Pricing, Blog |
| **Company** | About, Careers, Press, Contact, Help Center |
| **Legal** | Terms, Privacy, Refund, Instructor Terms, Cookies |

**Bottom Bar:** Payment icons (Stripe, PayPal, MTN Mobile Money, Orange Money), App Store/Play Store badges, language selector

**Typography:** Column headings: white `700` uppercase. Links: `rgba(255,255,255,0.6)`, hover → `#3D5AFE`. Separators: `1px solid rgba(255,255,255,0.08)`.

---

## 📐 RESPONSIVE BREAKPOINTS

| Breakpoint | Viewport | Key Changes |
|---|---|---|
| Desktop XL | `1280px+` | Full 4-column grids |
| Desktop | `1024–1280px` | Same, slightly tighter spacing |
| Tablet | `768–1024px` | 2-column grids, instructor CTA stacks |
| Mobile Large | `480–768px` | Single column, reduced fonts |
| Mobile Small | `< 480px` | Compact, `24px` side padding |

---

## 💡 PREMIUM DESIGN PRINCIPLES — Non-Negotiable

1. **No flat design.** Every card must have depth — shadows, gradients, layered elements.
2. **Gradient text encouraged** for key headings. Use `background-clip: text` with `--gradient-brand`.
3. **White space is luxury.** Strategic emptiness = premium feel.
4. **Stagger animations.** Cards animate in sequence (0ms, 100ms, 200ms, 300ms delays).
5. **Hover states matter.** Every interactive element has a distinct, polished hover with transition.
6. **Icons are intentional.** FA6 Solid icons in `#3D5AFE` with `#EEF2FF` circular backgrounds, 64px.
7. **Consistent hierarchy.** Kicker → Headline → Subtext → Content → CTA in every section.
8. **The signup page is the benchmark.** Study its glassmorphism cards, floating animations, button styles. Match or exceed it.

---

## 🔗 BENCHMARK REFERENCES

| Platform | What to Study |
|---|---|
| **udemy.com** | Category grid, course card structure, filter tabs |
| **domestika.org** | Premium hero aesthetics, dark storytelling |
| **coursera.org** | Stats banner, trust signals, testimonial layout |
| **framer.com** | Motion design quality, entrance animations |
| **linear.app** | Clean typographic hierarchy, section spacing |

---

## 📁 FILE STRUCTURE

```
frontend/components/homepage/
├── HeroSection.tsx/.module.css   ✅ Done
├── CategoryGrid.tsx/.module.css  🔴 Section 3
├── TopCourses.tsx/.module.css    🔴 Section 4
├── StatsBanner.tsx/.module.css   🔴 Section 5
├── HowItWorks.tsx/.module.css    🔴 Section 6
├── InstructorCTA.tsx/.module.css 🔴 Section 7
├── Testimonials.tsx/.module.css  🔴 Section 8
└── Footer.tsx/Footer.module.css  🔴 Section 9
```

`frontend/app/page.tsx` imports and stacks all components vertically.

---

## ✅ PRE-SUBMISSION CHECKLIST

- [ ] Matches brand color system exactly
- [ ] Inter font throughout
- [ ] Hover effects on all interactive elements
- [ ] Entrance animations on scroll (Intersection Observer)
- [ ] Fully responsive at all 5 breakpoints
- [ ] Kicker → Headline → Subtext → Content → CTA hierarchy
- [ ] No placeholder images — real assets used
- [ ] Shadows and border-radius match the design system
- [ ] Staggered animation delays on grid items
- [ ] Footer links have correct hover states

---

*Brief by: Antigravity AI | Based on: HANDOFF.md, PROGRESS.md, docs/08-color-system.md, docs/09-mvp-complete-spec.md, docs/03-phase1-mvp.md, and the /signup page implementation.*
