# Pages & Components Guide

## How Pages Work in Next.js (App Router)

Every folder inside `frontend/app/` becomes a URL.
Every `page.tsx` inside that folder is the actual page.

```
app/page.tsx              →  upskiill.vercel.app/
app/login/page.tsx        →  upskiill.vercel.app/login
app/courses/page.tsx      →  upskiill.vercel.app/courses
app/dashboard/page.tsx    →  upskiill.vercel.app/dashboard
```

---

## How to Create a New Page

### Step 1 — Create the folder and file
```
frontend/app/your-page-name/page.tsx
```

### Step 2 — Add the starter code
```tsx
export default function YourPageName() {
  return (
    <div>
      <h1>Your Page Title</h1>
    </div>
  );
}
```

### Step 3 — Visit it locally
```
http://localhost:3000/your-page-name
```

---

## All Pages to Build (By Phase)

### Phase 1 — MVP Pages

| Page | File Path | URL | Priority |
|------|-----------|-----|----------|
| Homepage | `app/page.tsx` | `/` | 🔴 High |
| Login | `app/login/page.tsx` | `/login` | 🔴 High |
| Sign Up | `app/signup/page.tsx` | `/signup` | 🔴 High |
| Course Browse | `app/courses/page.tsx` | `/courses` | 🔴 High |
| Course Detail | `app/courses/[id]/page.tsx` | `/courses/:id` | 🔴 High |
| Course Player | `app/learn/[courseId]/page.tsx` | `/learn/:id` | 🔴 High |
| Student Dashboard | `app/dashboard/page.tsx` | `/dashboard` | 🔴 High |
| Instructor Dashboard | `app/instructor/page.tsx` | `/instructor` | 🟡 Medium |
| Course Creation | `app/instructor/create/page.tsx` | `/instructor/create` | 🟡 Medium |
| User Profile | `app/profile/page.tsx` | `/profile` | 🟡 Medium |
| Checkout | `app/checkout/page.tsx` | `/checkout` | 🔴 High |
| Admin Panel | `app/admin/page.tsx` | `/admin` | 🟢 Low |

### Phase 2 — AI Pages

| Page | File Path | URL |
|------|-----------|-----|
| AI Tutor Chat | `app/ai-tutor/page.tsx` | `/ai-tutor` |
| Skill Gap Analyzer | `app/skill-gap/page.tsx` | `/skill-gap` |
| Learning Path | `app/learning-path/page.tsx` | `/learning-path` |
| Community | `app/community/page.tsx` | `/community` |

### Phase 3 — Marketplace Pages

| Page | File Path | URL |
|------|-----------|-----|
| Marketplace Browse | `app/marketplace/page.tsx` | `/marketplace` |
| Service Detail | `app/marketplace/[id]/page.tsx` | `/marketplace/:id` |
| Seller Profile | `app/sellers/[id]/page.tsx` | `/sellers/:id` |
| Seller Dashboard | `app/seller/page.tsx` | `/seller` |
| My Orders | `app/orders/page.tsx` | `/orders` |
| Blog | `app/blog/page.tsx` | `/blog` |
| Blog Post | `app/blog/[slug]/page.tsx` | `/blog/:slug` |

---

## How to Create Components

Components are **reusable pieces of UI** — things like buttons, cards, headers.

### Where to put components
```
frontend/components/
├── ui/              ← Basic building blocks (buttons, inputs, modals)
├── layout/          ← Header, Footer, Sidebar, Navigation
└── features/        ← Feature-specific (CourseCard, VideoPlayer, etc.)
```

### Example — Creating a CourseCard component

**File:** `frontend/components/features/CourseCard.tsx`

```tsx
type Course = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  instructor: string;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="course-card">
      <img src={course.thumbnail} alt={course.title} />
      <h3>{course.title}</h3>
      <p>By {course.instructor}</p>
      <span>${course.price}</span>
    </div>
  );
}
```

**Using it in a page:**
```tsx
import CourseCard from '@/components/features/CourseCard';

export default function CoursesPage() {
  return (
    <div>
      <CourseCard course={myCourse} />
    </div>
  );
}
```

---

## Dynamic Pages (with IDs)

For pages like `/courses/123`, use square brackets `[id]`:

**File:** `frontend/app/courses/[id]/page.tsx`

```tsx
export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Course ID: {params.id}</h1>
    </div>
  );
}
```

---

## Layout (Shared Header & Footer)

Edit `frontend/app/layout.tsx` to add elements that appear on **every page**:

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />          {/* Shows on every page */}
        <main>{children}</main>
        <Footer />          {/* Shows on every page */}
      </body>
    </html>
  );
}
```
