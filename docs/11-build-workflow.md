# Build Workflow — From Idea to Live Page

> This is the exact process the team follows every time a new page or feature needs to be built.
> Follow these steps in order, every single time.

---

## THE COMPLETE PROCESS (8 Steps)

---

### STEP 1 — Decide what to build next

Check `docs/10-all-pages.md` and `docs/09-mvp-complete-spec.md`.
Pick the next page or feature that is ⬜ (not started).

**Example:** You decide to build the **Sign Up page** (Page #10)

---

### STEP 2 — Get the UI Design from AI

Before writing code, you need to know what the page looks like.

**Do this:**
1. Open a chat with the AI (me)
2. Say: _"Design the Sign Up page for Upskiill using the brand colors from docs/08-color-system.md"_
3. The AI will either:
   - 🖼️ Generate an image mockup
   - 📋 Describe the layout in detail
   - 💻 Write the full JSX/HTML structure

**The AI will tell you:**
- What sections the page has (e.g. hero, form, buttons)
- What components to use
- The exact colors and spacing
- The complete React/Next.js code

---

### STEP 3 — Create your Git branch

Never build on `main`. Always create a branch first.

```bash
# Make sure you have latest main
git checkout main
git pull origin main

# Create a new branch (use the page name)
git checkout -b feature/signup-page
```

---

### STEP 4 — Create the page file

Based on `docs/10-all-pages.md`, create the right file.

**Example for Sign Up (Page #10):**
```
File to create: frontend/app/signup/page.tsx
```

Paste the starter or AI-generated code in the file.

---

### STEP 5 — Build the page

Use the AI-provided code as a starting point. Style it using the color variables from `docs/08-color-system.md`.

**Structure of a typical page:**
```tsx
// frontend/app/signup/page.tsx

export default function SignupPage() {
  return (
    <main style={{ backgroundColor: 'var(--deep-navy)' }}>

      {/* Section 1: Header */}
      <section>...</section>

      {/* Section 2: Main content */}
      <section>...</section>

    </main>
  );
}
```

**Create reusable components** in `frontend/components/` as you identify repeated patterns (buttons, cards, inputs, etc.)

---

### STEP 6 — Test locally

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000/signup` to see your page.

**Checklist before pushing:**
- [ ] Page loads without errors
- [ ] Uses correct brand colors
- [ ] Works on mobile (resize browser to 375px width)
- [ ] All links work
- [ ] Forms have proper labels

---

### STEP 7 — Push and open a Pull Request

```bash
git add .
git commit -m "add signup page"
git push origin feature/signup-page
```

Then on GitHub:
1. Click **"Compare & pull request"**
2. Write what you built in the description
3. Click **"Create pull request"**
4. Wait for **CodeRabbit** to auto-review 🤖
5. Fix any issues CodeRabbit flags
6. Get approval from Tech Lead
7. Merge ✅

---

### STEP 8 — Update the page status

Go to `docs/10-all-pages.md` and change the page status from ⬜ to ✅.

---

## ASKING THE AI TO BUILD A PAGE

When you want AI to build a page for you, use this format:

```
"Build the [PAGE NAME] page for Upskiill.

Use:
- Colors from docs/08-color-system.md
- File path: app/[path]/page.tsx
- Features needed: [list the features from docs/09-mvp-complete-spec.md]

Make it look premium and modern."
```

**Example:**
```
"Build the Student Dashboard page for Upskiill.

Use:
- Colors from docs/08-color-system.md
- File path: app/dashboard/page.tsx
- Features needed: My courses list, progress bars, resume learning button, certificates

Make it look premium and modern with the dark navy theme."
```

---

## MVP BUILD PHASES (Detailed)

### 🏗️ PHASE 1A: Foundation (Weeks 1-2)
**Goal:** Users can sign up, log in, and see the homepage

| Order | Page | Features |
|-------|------|---------|
| 1st | Homepage (`/`) | Hero, categories, featured courses, footer |
| 2nd | Sign Up (`/signup`) | Email/password, Google login |
| 3rd | Login (`/login`) | Email/password, Google login |
| 4th | Forgot Password (`/forgot-password`) | Send reset email |

**Backend to build alongside:**
- User model in PostgreSQL
- Firebase Auth integration
- JWT middleware

---

### 🏗️ PHASE 1B: Course Discovery (Weeks 3-4)
**Goal:** Visitors can browse and find courses

| Order | Page | Features |
|-------|------|---------|
| 5th | Course Browse (`/courses`) | Course grid, search, filters |
| 6th | Course Details (`/courses/[id]`) | All course info, buy button |
| 7th | Category Page (`/categories/[slug]`) | Filtered course list |

**Backend to build alongside:**
- Courses model
- Categories model
- Course search API

---

### 🏗️ PHASE 1C: Purchasing (Weeks 5-6)
**Goal:** Students can buy courses

| Order | Page | Features |
|-------|------|---------|
| 8th | Cart (`/cart`) | Add/remove, coupon code |
| 9th | Checkout (`/checkout`) | Stripe payment form |
| 10th | Order Success (`/checkout/success`) | Confirmation + auto-enroll |

**Backend to build alongside:**
- Payments model
- Stripe integration
- Enrollment logic

---

### 🏗️ PHASE 1D: Learning (Weeks 7-8)
**Goal:** Students can watch and track their courses

| Order | Page | Features |
|-------|------|---------|
| 11th | Student Dashboard (`/dashboard`) | My courses, progress |
| 12th | Course Player (`/learn/[courseId]`) | Video, sidebar, notes |
| 13th | My Certificates (`/certificates`) | View + download |

**Backend to build alongside:**
- Enrollments model
- Progress tracking
- Certificate generation (PDF)

---

### 🏗️ PHASE 1E: Instructor Tools (Weeks 9-10)
**Goal:** Instructors can create and publish courses

| Order | Page | Features |
|-------|------|---------|
| 14th | Instructor Dashboard (`/instructor`) | Revenue, students, analytics |
| 15th | Create Course (`/instructor/create`) | 5-step wizard |
| 16th | Curriculum Builder | Add sections + upload videos |

**Backend to build alongside:**
- Video upload to AWS S3
- Course review/approval workflow

---

### 🏗️ PHASE 1F: Admin & Polish (Weeks 11-12)
**Goal:** Admin control + legal pages + launch ready

| Order | Page | Features |
|-------|------|---------|
| 17th | Admin Dashboard (`/admin`) | Analytics overview |
| 18th | Course Moderation (`/admin/courses`) | Approve/reject courses |
| 19th | User Management (`/admin/users`) | View, suspend users |
| 20th | Legal Pages | Terms, Privacy, Refund policy |
| 21st | Contact / FAQ / Help | Support pages |

---

## DATABASE BUILD ORDER

Build these database tables in this order:

```
1. users           ← Auth foundation
2. categories      ← Needed for courses
3. courses         ← Core content
4. lessons         ← Course content
5. enrollments     ← After payments
6. payments        ← After cart/checkout
7. reviews         ← After enrollment
8. certificates    ← After course completion
9. notifications   ← After user flow complete
10. coupons        ← For discounts
```

---

## COMPONENT BUILD ORDER

Build these shared components early — you'll use them everywhere:

```
Priority 1 (Build first):
- Button (primary, secondary, outline)
- Input (text, email, password)
- Card (course card, info card)
- Header + Navigation
- Footer

Priority 2 (Build as needed):
- StarRating
- ProgressBar
- Avatar
- Badge (level: Beginner, etc.)
- Modal / Dialog
- Toast notifications

Priority 3 (Feature-specific):
- VideoPlayer
- CourseCard
- LessonList (sidebar)
- PaymentForm
- ReviewCard
```

---

## ASKING AI FOR A COMPONENT

```
"Create a [COMPONENT NAME] component for Upskiill.

Use brand colors from docs/08-color-system.md.
Props needed: [list the data it needs]
It should show: [describe what it displays]"
```

**Example:**
```
"Create a CourseCard component for Upskiill.

Use brand colors from docs/08-color-system.md.
Props needed: title, thumbnail, instructor name, rating, price, studentCount
It should show a card with the thumbnail at top, course title, instructor, star rating, and price."
```
