# 🧩 Upskiill — Component Build Plan
> **Purpose:** Step-by-step guide for building every missing UI component.
> **Rule:** Build Phase 1 (Shared UI) FIRST. Do NOT skip to homepage sections.
> **Last Updated:** 2026-03-31

---

## 📁 Full Folder Structure

```
frontend/components/
├── ui/                       ← Phase 1: Shared building blocks (used everywhere)
│   ├── Button.tsx / .module.css
│   ├── Input.tsx / .module.css
│   ├── Textarea.tsx / .module.css
│   ├── Badge.tsx / .module.css
│   ├── Avatar.tsx / .module.css
│   ├── StarRating.tsx / .module.css
│   ├── ProgressBar.tsx / .module.css
│   ├── Spinner.tsx / .module.css
│   ├── Modal.tsx / .module.css
│   ├── Tabs.tsx / .module.css
│   ├── Tooltip.tsx / .module.css
│   ├── Toast.tsx / .module.css
│   ├── Dropdown.tsx / .module.css
│   ├── Pagination.tsx / .module.css
│   ├── EmptyState.tsx / .module.css
│   └── SearchBar.tsx / .module.css
├── layout/                   ← Phase 2: Layout wrappers
│   ├── Footer.tsx / .module.css
│   └── Sidebar.tsx / .module.css
├── features/                 ← Phase 3: Feature-specific reusable components
│   ├── CourseCard.tsx / .module.css         ⭐ CORE CARD — used everywhere
│   ├── CourseCardHorizontal.tsx / .module.css
│   ├── InstructorCard.tsx / .module.css
│   ├── ReviewCard.tsx / .module.css
│   ├── CertificateCard.tsx / .module.css
│   ├── LessonItem.tsx / .module.css
│   ├── SectionAccordion.tsx / .module.css
│   └── CartItem.tsx / .module.css
└── homepage/                 ← Phase 4: Homepage sections ONLY
    ├── HeroSection.tsx / .module.css    ✅ Done
    ├── CategoryGrid.tsx / .module.css
    ├── TopCourses.tsx / .module.css
    ├── StatsBanner.tsx / .module.css
    ├── HowItWorks.tsx / .module.css
    ├── InstructorCTA.tsx / .module.css
    └── Testimonials.tsx / .module.css
```

---

## ✅ Already Built (Do Not Touch)

| Component | File | Notes |
|---|---|---|
| Header | `components/Header.tsx` | Sticky nav, search, auth links |
| HeroSection | `components/homepage/HeroSection.tsx` | 100vh hero + category slider + Why Learn section |

---

## 🟥 PHASE 1 — Shared UI Components
> **Build these first.** They are the foundation used on every single page.

---

### 1. `Button` — Buttons
**File:** `components/ui/Button.tsx`
**Used on:** Every page on the platform

#### Variants:
| Variant | Background | Text | Border |
|---|---|---|---|
| `primary` | `#3D5AFE` | `white` | none |
| `secondary` | `white` | `#3D5AFE` | `1px solid #3D5AFE` |
| `outline` | `transparent` | `#1F2A44` | `1px solid #E2E8F0` |
| `danger` | `#EF4444` | `white` | none |
| `ghost` | `transparent` | `#64748B` | none |

#### Props:
```ts
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;         // shows Spinner, disables click
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;             // renders as <Link> if provided
  children: React.ReactNode;
};
```

#### Sizes:
- `sm`: height `36px`, padding `0 16px`, font `13px`
- `md`: height `44px`, padding `0 20px`, font `14px` ← default
- `lg`: height `52px`, padding `0 28px`, font `16px`

#### Design Rules:
- Border radius: `10px`
- Primary hover: `#2D4AEE`, `translateY(-1px)`, `box-shadow: 0 4px 12px rgba(61,90,254,0.25)`
- Loading: render `Spinner` (white) inside, disable pointer events
- Transition: `all 0.25s ease`

---

### 2. `Input` — Text, Email, Password Fields
**File:** `components/ui/Input.tsx`
**Used on:** Login, Signup, Profile Edit, Course Creation, Checkout

#### Props:
```ts
type InputProps = {
  id: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'tel';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;            // red border + error text below
  hint?: string;             // grey hint text below
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
};
```

#### Design Rules:
- Height: `48px`, border-radius `10px`, border `1px solid #E2E8F0`
- Padding: `0 16px 0 44px` (with left icon), else `0 16px`
- Focus: `border-color #3D5AFE`, `box-shadow 0 0 0 3px rgba(61,90,254,0.1)`
- Error: `border-color #EF4444`, error text `12px #EF4444` below
- Label: `13px`, `600` weight, `#1F2A44`, above input

---

### 3. `Textarea` — Multi-line Input
**File:** `components/ui/Textarea.tsx`
**Used on:** Course descriptions, review writing, bio editing, contact form

#### Props:
```ts
type TextareaProps = {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;             // default 4
  maxLength?: number;        // shows character counter if set
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
};
```

#### Design Rules:
- Same border/focus/error style as `Input`
- Resizable vertically only (`resize: vertical`)
- Character counter: `12px`, `#94A3B8`, bottom-right, shown when `maxLength` is set

---

### 4. `Badge` — Pill Labels & Tags
**File:** `components/ui/Badge.tsx`
**Used on:** Course cards (Bestseller, New, Free), level tags, category labels, user roles

#### Variants:
| Variant | Background | Text | Use Case |
|---|---|---|---|
| `blue` | `#EEF2FF` | `#3D5AFE` | Default, category labels |
| `yellow` | `#FEF3C7` | `#92400E` | "BESTSELLER" |
| `green` | `#D1FAE5` | `#065F46` | "NEW", "FREE" |
| `red` | `#FEE2E2` | `#991B1B` | "HOT", "LIMITED" |
| `grey` | `#F1F5F9` | `#64748B` | Neutral / level labels |
| `purple` | `#F3E8FF` | `#6D28D9` | "PRO", "PREMIUM" |
| `dark` | `#1F2A44` | `white` | Dark theme |

#### Props:
```ts
type BadgeProps = {
  variant?: 'blue' | 'yellow' | 'green' | 'red' | 'grey' | 'purple' | 'dark';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
};
```

#### Design Rules:
- `sm`: padding `2px 8px`, font `11px 600`
- `md`: padding `4px 12px`, font `12px 700` ← default
- Border radius: `999px` (full pill)
- ALL CAPS text recommended

---

### 5. `Avatar` — User Profile Image
**File:** `components/ui/Avatar.tsx`
**Used on:** Header (logged-in user), CourseCard (instructor), Testimonials, Reviews, Dashboard

#### Props:
```ts
type AvatarProps = {
  src?: string;              // if missing, show initials fallback
  alt?: string;
  name?: string;             // "Amara Diallo" → "AD" initials
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  ring?: boolean;            // 2px #3D5AFE ring around the avatar
  online?: boolean;          // green dot indicator bottom-right
};
```

#### Sizes:
| Size | Diameter | Font |
|---|---|---|
| `xs` | `24px` | `10px` |
| `sm` | `32px` | `12px` |
| `md` | `40px` | `14px` ← default |
| `lg` | `56px` | `18px` |
| `xl` | `80px` | `24px` |

#### Fallback:
- No `src`: circle with `background: linear-gradient(135deg, #3D5AFE, #7B61FF)`, 2 initials in white
- No `name` either: show generic person icon (FA6 `fa-user`)

---

### 6. `StarRating` — Stars Display & Input
**File:** `components/ui/StarRating.tsx`
**Used on:** CourseCard, Course Detail page, Review forms, Testimonials

#### Props:
```ts
type StarRatingProps = {
  value: number;             // e.g. 4.7
  max?: number;              // default 5
  reviewCount?: number;      // shows "(2,456 reviews)"
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;     // enables clicking to set rating
  onChange?: (rating: number) => void;
};
```

#### Design Rules:
- Filled star: `#F59E0B` (amber/gold)
- Empty star: `#E2E8F0`
- Half-star for `.5` values
- Review count: `#64748B`, `13px`, after stars
- Interactive: stars highlight on hover as cursor moves

---

### 7. `ProgressBar` — Completion Tracking
**File:** `components/ui/ProgressBar.tsx`
**Used on:** Dashboard (per course card), Course Player sidebar

#### Props:
```ts
type ProgressBarProps = {
  value: number;             // 0–100
  label?: string;            // "12 of 36 lessons complete"
  showPercentage?: boolean;  // "34%" shown at end
  color?: 'blue' | 'green' | 'purple';
  size?: 'sm' | 'md';
};
```

#### Design Rules:
- Track: `#E2E8F0`, `border-radius: 999px`
- Blue fill: `linear-gradient(90deg, #3D5AFE, #7B61FF)`
- Green fill: `#22C55E`
- Size `sm`: height `4px`; `md`: height `8px` ← default
- Animate on mount: `transition: width 0.6s ease`

---

### 8. `Spinner` — Loading Indicator
**File:** `components/ui/Spinner.tsx`
**Used on:** Button loading state, page loading, any async fetch

#### Props:
```ts
type SpinnerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white' | 'grey';
  centered?: boolean;        // wraps in full-width centered div
};
```

#### Design Rules:
- CSS-only circular spinner (`border-top` technique)
- `xs`: 14px | `sm`: 20px | `md`: 28px ← default | `lg`: 40px
- Border width: `2px` for xs/sm, `3px` for md/lg
- `white` color: use inside blue/dark buttons
- Animation: `spin 0.75s linear infinite`

---

### 9. `Modal` — Popup Dialog
**File:** `components/ui/Modal.tsx`
**Used on:** Confirm dialogs, course quick-view, auth prompts, video preview

#### Props:
```ts
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  children: React.ReactNode;
  footer?: React.ReactNode;  // action buttons at bottom
};
```

#### Design Rules:
- Overlay: `rgba(0,0,0,0.5)`, `backdrop-filter: blur(4px)`
- Panel: white, `border-radius: 16px`, `padding: 32px`
- Sizes: `sm` 400px | `md` 560px ← default | `lg` 720px
- Close button `×`: top-right, always visible
- Entrance: `scale(0.95)→scale(1)` + `opacity 0→1`, `0.2s ease`
- Closes on overlay click or `Escape` key

---

### 10. `Tabs` — Tab Navigation
**File:** `components/ui/Tabs.tsx`
**Used on:** Course Detail page (Overview / Curriculum / Reviews), Top Courses filter, Dashboard

#### Props:
```ts
type Tab = { label: string; value: string; count?: number; };
type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
  variant?: 'underline' | 'pill';
};
```

#### Design Rules:
- `underline` variant: active tab has `2px #3D5AFE` bottom border, text `#3D5AFE`
- `pill` variant: active tab has `#EEF2FF` background, `#3D5AFE` text, `8px` radius
- Inactive: `#64748B` text, hover `#1F2A44`
- Count badge: small grey `Badge` next to label (e.g. "Reviews (128)")
- Smooth `0.2s` underline/background transition

---

### 11. `Dropdown` — Select & Menu
**File:** `components/ui/Dropdown.tsx`
**Used on:** Sort options (Courses page), Language selector (Footer), Filter dropdowns

#### Props:
```ts
type DropdownOption = { label: string; value: string; };
type DropdownProps = {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  width?: string;
};
```

#### Design Rules:
- Trigger button: same style as `outline` Button — border `#E2E8F0`, chevron icon right
- Dropdown panel: white, `border-radius: 12px`, `box-shadow: 0 8px 32px rgba(0,0,0,0.12)`
- Each option: hover `#F5F7FB` background, active `#EEF2FF` + `#3D5AFE` text
- Closes on outside click or `Escape`
- Entrance: `translateY(-8px)→0` + `opacity 0→1`, `0.15s ease`

---

### 12. `SearchBar` — Search Input
**File:** `components/ui/SearchBar.tsx`
**Used on:** Courses page (prominent), future: global search overlay

#### Props:
```ts
type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  size?: 'md' | 'lg';
  suggestions?: string[];    // dropdown of recent/popular searches
};
```

#### Design Rules:
- Large search input with a `fa-magnifying-glass` icon left and "Search" button right (fused)
- `lg` size: height `56px` (used on /courses page hero area)
- `md` size: height `44px`
- Suggestion dropdown below (same style as `Dropdown` panel)
- Button: `primary` variant, attached to right (`border-radius: 0 10px 10px 0`)
- Full border-radius on input left side: `10px 0 0 10px`

---

### 13. `Toast` — Notification Toasts
**File:** `components/ui/Toast.tsx`
**Used on:** After any action — add to cart, enroll, save profile, error messages

#### Props:
```ts
type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;         // ms, default 4000
  onClose?: () => void;
};
```

#### Design Rules:
- Fixed position: bottom-right, `24px` from edges
- White panel, `border-radius: 12px`, left `4px` colored accent border
- `success`: green border + `fa-circle-check` icon
- `error`: red border + `fa-circle-xmark` icon
- `info`: blue border + `fa-circle-info` icon
- `warning`: amber border + `fa-triangle-exclamation` icon
- Entrance: slides in from right, auto-dismisses after `duration`
- Multiple toasts stack vertically with `8px` gap

---

### 14. `Tooltip` — Hover Info
**File:** `components/ui/Tooltip.tsx`
**Used on:** Icon buttons, truncated text, price breakdowns, feature hints

#### Props:
```ts
type TooltipProps = {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
};
```

#### Design Rules:
- Dark `#1F2A44` background, white `12px` text, `6px` border-radius
- Arrow pointing to the trigger element
- Appears on hover after `200ms` delay (avoids flash on quick mouse-overs)
- Max width: `200px`, wraps text

---

### 15. `Pagination` — Page Navigation
**File:** `components/ui/Pagination.tsx`
**Used on:** `/courses` page, Blog listing, Search results, Admin tables

#### Props:
```ts
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageCount?: boolean;   // "Page 2 of 14"
};
```

#### Design Rules:
- Page number buttons: `36px` square, `border-radius: 8px`, border `#E2E8F0`
- Active page: `#3D5AFE` background, white text
- Prev/Next arrows: `fa-chevron-left` / `fa-chevron-right`
- Show max 7 pages at a time, use `...` ellipsis for large counts
- Hover: `#F5F7FB` background

---

### 16. `EmptyState` — No Content Placeholder
**File:** `components/ui/EmptyState.tsx`
**Used on:** Empty wishlist, no courses found, empty cart, no certificates

#### Props:
```ts
type EmptyStateProps = {
  icon?: React.ReactNode;    // large icon displayed center
  title: string;             // e.g. "No courses found"
  description?: string;      // e.g. "Try adjusting your search filters"
  action?: React.ReactNode;  // a Button to take action
};
```

#### Design Rules:
- Centered layout, icon at top (64px, `#94A3B8`)
- Title: `20px`, `700`, `#1F2A44`
- Description: `14px`, `#64748B`
- Action button below (usually `primary`)
- No border or background — floats naturally in the page

---

## 🟧 PHASE 2 — Layout Components
> Build after all Phase 1 components are done.

---

### 17. `Footer` — Site-Wide Footer
**File:** `components/layout/Footer.tsx`
**Used on:** All public pages, automatically added in `app/layout.tsx`

Full spec: `docs/design/UI_BRIEF_HOMEPAGE.md` — Section 9

**Summary:**
- Background: `#1F2A44` (Deep Navy)
- 4-column grid: Brand | Platform | Company | Legal
- Bottom bar: Stripe, PayPal, MTN, Orange Money icons; App Store/Play Store; Language selector
- Links: `rgba(255,255,255,0.6)`, hover `#3D5AFE`

---

### 18. `Sidebar` — Dashboard & Course Player
**File:** `components/layout/Sidebar.tsx`
**Used on:** `/dashboard`, `/learn/[courseId]`

**Dashboard mode:**
- Links: My Courses, Profile, Wishlist, Certificates, Settings, Logout
- Active link: `#EEF2FF` background + `3px #3D5AFE` left border
- Collapsible on mobile

**Course Player mode:**
- Section accordion list with lesson checkboxes, duration, and lock icons
- `ProgressBar` at top for overall course completion
- Current lesson: `#EEF2FF` highlighted row

---

## 🟨 PHASE 3 — Feature Components
> These are reusable cards and items specific to the course platform.

---

### ⭐ 19. `CourseCard` — THE Core Card (used everywhere)
**File:** `components/features/CourseCard.tsx`
**Used on:** Homepage `TopCourses`, `/courses`, `/dashboard`, Search results, Category pages, Wishlist

This is the **most important feature component**. It must be perfect.

#### Props:
```ts
type CourseCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  instructorName: string;
  instructorAvatar?: string;
  rating: number;            // e.g. 4.7
  reviewCount: number;       // e.g. 2456
  totalHours: number;        // e.g. 24
  totalLessons: number;      // e.g. 148
  price: number;             // e.g. 49.99
  originalPrice?: number;    // e.g. 89.99 → strikethrough
  isBestseller?: boolean;
  isNew?: boolean;
  isFree?: boolean;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  category?: string;
  isEnrolled?: boolean;      // shows "Continue Learning" instead of price
  progress?: number;         // 0–100 — shows ProgressBar if enrolled
};
```

#### Visual Layout:
```
┌──────────────────────────────────┐
│  THUMBNAIL (16:9)                │  ← rounded top, gradient overlay bottom
│  [BESTSELLER]  top-left badge    │
│  [▶ Preview] slides up on hover  │
├──────────────────────────────────┤
│ Course Title (max 2 lines)       │  ← 16px, 700, #1F2A44
│ By [Avatar xs] Instructor Name   │  ← 13px, #64748B
│ ⭐ 4.8   (2,456 reviews)         │  ← StarRating component
│ 24 hours · 148 lessons · Beginner│  ← 12px, #94A3B8
│ $49.99   ~~$89.99~~              │  ← blue price, grey strikethrough
│ [ProgressBar]  34% complete      │  ← only shown if isEnrolled=true
└──────────────────────────────────┘
```

#### Hover Effects:
- Card: `translateY(-4px)`, `box-shadow: 0 12px 36px rgba(61,90,254,0.15)`
- Thumbnail: darken overlay slightly
- "▶ Preview" button slides up from bottom of thumbnail

---

### 20. `CourseCardHorizontal` — Horizontal Variant
**File:** `components/features/CourseCardHorizontal.tsx`
**Used on:** Search results page, Dashboard "My Courses" list, Cart

#### Layout: Left image (fixed width `180px`) + right text content (flex)
Same data as `CourseCard` but in a wide horizontal row format.
- Image: `180px × 100px`, rounded `12px`
- Right side: title, instructor, rating, price — same specs
- No hover lift — subtle border highlight instead
- Compact: max height `120px`

---

### 21. `InstructorCard` — Instructor Profile Mini-Card
**File:** `components/features/InstructorCard.tsx`
**Used on:** Course Detail page (instructor section), Instructors directory (future)

#### Props:
```ts
type InstructorCardProps = {
  id: string;
  name: string;
  avatar?: string;
  title: string;             // e.g. "Senior Software Engineer at Google"
  bio: string;
  rating: number;
  totalStudents: number;
  totalCourses: number;
  totalReviews: number;
};
```

#### Layout:
- Large avatar (`lg` size) + name + title stacked
- Short bio (3 lines max, with "Show more" toggle)
- Stats row: ⭐ Rating · 👥 Students · 🎓 Courses

---

### 22. `ReviewCard` — Student Review
**File:** `components/features/ReviewCard.tsx`
**Used on:** Course Detail page (reviews tab), Testimonials (homepage uses its own)

#### Props:
```ts
type ReviewCardProps = {
  authorName: string;
  authorAvatar?: string;
  rating: number;
  date: string;              // e.g. "March 2026"
  content: string;           // review text
  helpful?: number;          // "X people found this helpful"
};
```

#### Layout:
- Avatar (`sm`) + name + date on one row
- `StarRating` below name
- Review text (expandable if >4 lines)
- "Helpful? 👍 Yes (12)" at bottom

---

### 23. `CertificateCard` — Earned Certificate
**File:** `components/features/CertificateCard.tsx`
**Used on:** `/certificates` page, Dashboard

#### Props:
```ts
type CertificateCardProps = {
  courseTitle: string;
  completedDate: string;
  certificateId: string;
  onDownload: () => void;
  onShare: () => void;
};
```

#### Design:
- Premium card feel — white with a subtle gold/blue border
- "🏆" icon or ribbon visual top-left
- Course title, completion date, unique certificate ID
- "Download PDF" (primary button) + "Share" (ghost button)

---

### 24. `LessonItem` — Individual Lesson Row
**File:** `components/features/LessonItem.tsx`
**Used on:** Course Detail page (curriculum), Course Player sidebar

#### Props:
```ts
type LessonItemProps = {
  title: string;
  duration: string;          // e.g. "12:34"
  isCompleted?: boolean;
  isLocked?: boolean;
  isFreePreview?: boolean;
  isActive?: boolean;        // currently watching
  onClick?: () => void;
};
```

#### Design:
- Row layout: `[checkbox or lock icon]` + `[title]` + `[duration]` flush right
- Completed: checkbox ticked in `#22C55E`
- Locked: `fa-lock` icon in `#94A3B8`, row slightly dimmed
- Free preview: `"FREE"` badge in green
- Active: `#EEF2FF` background + `3px #3D5AFE` left border

---

### 25. `SectionAccordion` — Curriculum Section
**File:** `components/features/SectionAccordion.tsx`
**Used on:** Course Detail page curriculum, Course Player sidebar

#### Props:
```ts
type SectionAccordionProps = {
  title: string;             // e.g. "Section 3: Advanced JavaScript"
  lessonCount: number;
  totalDuration: string;     // e.g. "1h 24m"
  completedCount?: number;
  children: React.ReactNode; // list of LessonItem components
  defaultOpen?: boolean;
};
```

#### Design:
- Header row: bold section title + `[X lessons · 1h 24m]` + chevron icon
- Expand/collapse with smooth max-height animation `0.3s ease`
- When open: children (`LessonItem` rows) show below

---

### 26. `CartItem` — Item in Cart
**File:** `components/features/CartItem.tsx`
**Used on:** `/cart` page

#### Props:
```ts
type CartItemProps = {
  courseId: string;
  title: string;
  thumbnail: string;
  instructorName: string;
  price: number;
  originalPrice?: number;
  onRemove: () => void;
  onMoveToWishlist: () => void;
};
```

#### Design:
- Horizontal layout: thumbnail left + course info middle + price right
- "Remove" link and "Save for later" link below course info
- Price: bold blue, strikethrough original price

---

## 🟦 PHASE 4 — Homepage Section Components
> Build LAST. All these depend on Phase 1–3 components.

| # | Component | Depends On | Full Spec |
|---|---|---|---|
| 27 | `CategoryGrid` | `Badge` | UI_BRIEF — Section 3 |
| 28 | `TopCourses` | `CourseCard`, `Badge`, `Button`, `Tabs` | UI_BRIEF — Section 4 |
| 29 | `StatsBanner` | — | UI_BRIEF — Section 5 |
| 30 | `HowItWorks` | — | UI_BRIEF — Section 6 |
| 31 | `InstructorCTA` | `Button` | UI_BRIEF — Section 7 |
| 32 | `Testimonials` | `Avatar`, `StarRating` | UI_BRIEF — Section 8 |

Full design specs: `docs/design/UI_BRIEF_HOMEPAGE.md`

---

## 📊 Master Build Progress Tracker

> **How to use:** Check the box next to a component when it is fully built and reviewed.
> You can click checkboxes directly in the **GitHub UI**. Check = Done. Unchecked = Still to build.

---

### ✅ Already Done
- [x] `Header` — `components/Header.tsx`
- [x] `HeroSection` — `components/homepage/HeroSection.tsx`

---

### 🟥 Phase 1 — Shared UI Components (16 total)
_Build these first. Used on every single page._

- [x] `Button` — `components/ui/Button.tsx`
- [x] `Input` — `components/ui/Input.tsx`
- [x] `Textarea` — `components/ui/Textarea.tsx`
- [x] `Badge` — `components/ui/Badge.tsx`
- [x] `Avatar` — `components/ui/Avatar.tsx`
- [x] `StarRating` — `components/ui/StarRating.tsx`
- [x] `ProgressBar` — `components/ui/ProgressBar.tsx`
- [x] `Spinner` — `components/ui/Spinner.tsx`
- [x] `Modal` — `components/ui/Modal.tsx`
- [x] `Tabs` — `components/ui/Tabs.tsx`
- [x] `Dropdown` — `components/ui/Dropdown.tsx`
- [x] `SearchBar` — `components/ui/SearchBar.tsx`
- [x] `Toast` — `components/ui/Toast.tsx`
- [x] `Tooltip` — `components/ui/Tooltip.tsx`
- [x] `Pagination` — `components/ui/Pagination.tsx`
- [x] `EmptyState` — `components/ui/EmptyState.tsx`

**Phase 1 Progress: 16 / 16 done** (🟢 Complete)

---

### 🟧 Phase 2 — Layout Components (2 total)
_Build after Phase 1 is complete._

- [x] `Footer` — `components/layout/Footer.tsx`
- [x] `Sidebar` — `components/layout/Sidebar.tsx`

**Phase 2 Progress: 2 / 2 done** (🟢 Complete)

---

### 🟨 Phase 3 — Feature Components (8 total)
_Core product cards and items. Reused across many pages._

- [x] `CourseCard` ⭐ — `components/features/CourseCard.tsx`
- [x] `CourseCardHorizontal` — `components/features/CourseCardHorizontal.tsx`
- [x] `InstructorCard` — `components/features/InstructorCard.tsx`
- [x] `ReviewCard` — `components/features/ReviewCard.tsx`
- [x] `CategoryCard` — `components/features/CategoryCard.tsx` (Advanced Premium)
- [ ] `CertificateCard` — `components/features/CertificateCard.tsx`
- [ ] `LessonItem` — `components/features/LessonItem.tsx`
- [ ] `SectionAccordion` — `components/features/SectionAccordion.tsx`
- [ ] `CartItem` — `components/features/CartItem.tsx`

**Phase 3 Progress: 5 / 9 done** (🟡 In Progress)

---

### 🟦 Phase 4 — Homepage Section Components (6 total)
_Build last. Require Phase 1–3 components to exist first._

- [ ] `CategoryGrid` — `components/homepage/CategoryGrid.tsx`
- [ ] `TopCourses` — `components/homepage/TopCourses.tsx`
- [ ] `StatsBanner` — `components/homepage/StatsBanner.tsx`
- [ ] `HowItWorks` — `components/homepage/HowItWorks.tsx`
- [ ] `InstructorCTA` — `components/homepage/InstructorCTA.tsx`
- [ ] `Testimonials` — `components/homepage/Testimonials.tsx`

**Phase 4 Progress: 0 / 6 done**

---

### 🏁 Overall Summary

| Phase | Done | Total | Progress |
|---|---|---|---|
| Already Built | 2 | 2 | ✅ 100% |
| Phase 1 — Shared UI | 16 | 16 | ✅ 100% |
| Phase 2 — Layout | 2 | 2 | ✅ 100% |
| Phase 3 — Features | 5 | 9 | 🟡 55% |
| Phase 4 — Homepage | 0 | 6 | 🔴 0% |
| **TOTAL** | **25** | **35** | **71%** |

---

## 🚦 Build Order — Summary

```
PHASE 1 — Shared UI (build FIRST, used on every page):
  Button → Input → Textarea → Badge → Avatar
  → StarRating → ProgressBar → Spinner → Modal
  → Tabs → Dropdown → SearchBar → Toast → Tooltip
  → Pagination → EmptyState

PHASE 2 — Layout (needs Phase 1):
  Footer → Sidebar

PHASE 3 — Features (needs Phase 1):
  CourseCard ⭐ → CourseCardHorizontal → InstructorCard
  → ReviewCard → CertificateCard → LessonItem
  → SectionAccordion → CartItem

PHASE 4 — Homepage Sections (needs everything above):
  CategoryGrid → TopCourses → StatsBanner
  → HowItWorks → InstructorCTA → Testimonials
```

---

*Single source of truth for all component development.*
*Check off boxes in the tracker above as each component is completed.*
*Full design specs for homepage sections: `docs/design/UI_BRIEF_HOMEPAGE.md`*
*Remember to update the Phase progress counts and the Overall Summary table as you go.*
