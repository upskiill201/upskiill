# Complete Page List — All MVP Pages

> Every page the Upskiill MVP needs. Numbered for easy tracking.
> Status: ⬜ Not started | 🔨 In progress | ✅ Done

---

## PUBLIC PAGES (Visible to everyone — no login required)

| # | Page Name | URL | File Path | Status |
|---|-----------|-----|-----------|--------|
| 1 | Homepage | `/` | `app/page.tsx` | ⬜ |
| 2 | Course Browse | `/courses` | `app/courses/page.tsx` | ⬜ |
| 3 | Course Details | `/courses/[id]` | `app/courses/[id]/page.tsx` | ⬜ |
| 4 | Category Page | `/categories/[slug]` | `app/categories/[slug]/page.tsx` | ⬜ |
| 5 | Instructor Public Profile | `/instructors/[id]` | `app/instructors/[id]/page.tsx` | ⬜ |
| 6 | Blog Homepage | `/blog` | `app/blog/page.tsx` | ⬜ |
| 7 | Blog Article | `/blog/[slug]` | `app/blog/[slug]/page.tsx` | ⬜ |
| 8 | Search Results | `/search` | `app/search/page.tsx` | ⬜ |

---

## AUTH PAGES

| # | Page Name | URL | File Path | Status |
|---|-----------|-----|-----------|--------|
| 9 | Login | `/login` | `app/login/page.tsx` | ✅ |
| 10 | Sign Up | `/signup` | `app/signup/page.tsx` | ⬜ |
| 11 | Forgot Password | `/forgot-password` | `app/forgot-password/page.tsx` | ⬜ |
| 12 | Email Verification | `/verify-email` | `app/verify-email/page.tsx` | ⬜ |

---

## STUDENT PAGES (Logged in students)

| # | Page Name | URL | File Path | Status |
|---|-----------|-----|-----------|--------|
| 13 | Student Dashboard | `/dashboard` | `app/dashboard/page.tsx` | ⬜ |
| 14 | My Courses | `/dashboard/my-courses` | `app/dashboard/my-courses/page.tsx` | ⬜ |
| 15 | Course Player | `/learn/[courseId]` | `app/learn/[courseId]/page.tsx` | ⬜ |
| 16 | My Profile | `/profile` | `app/profile/page.tsx` | ⬜ |
| 17 | Edit Profile | `/profile/edit` | `app/profile/edit/page.tsx` | ⬜ |
| 18 | My Wishlist | `/wishlist` | `app/wishlist/page.tsx` | ⬜ |
| 19 | My Certificates | `/certificates` | `app/certificates/page.tsx` | ⬜ |
| 20 | Notifications | `/notifications` | `app/notifications/page.tsx` | ⬜ |
| 21 | Payment History | `/payment-history` | `app/payment-history/page.tsx` | ⬜ |

---

## CHECKOUT PAGES

| # | Page Name | URL | File Path | Status |
|---|-----------|-----|-----------|--------|
| 22 | Cart | `/cart` | `app/cart/page.tsx` | ⬜ |
| 23 | Checkout | `/checkout` | `app/checkout/page.tsx` | ⬜ |
| 24 | Order Success | `/checkout/success` | `app/checkout/success/page.tsx` | ⬜ |

---

## INSTRUCTOR PAGES

| # | Page Name | URL | File Path | Status |
|---|-----------|-----|-----------|--------|
| 25 | Instructor Dashboard | `/instructor` | `app/instructor/page.tsx` | ⬜ |
| 26 | My Courses (Instructor) | `/instructor/courses` | `app/instructor/courses/page.tsx` | ⬜ |
| 27 | Create Course — Step 1 | `/instructor/create` | `app/instructor/create/page.tsx` | ⬜ |
| 28 | Edit Course | `/instructor/courses/[id]/edit` | `app/instructor/courses/[id]/edit/page.tsx` | ⬜ |
| 29 | Course Curriculum Builder | `/instructor/courses/[id]/curriculum` | `app/instructor/courses/[id]/curriculum/page.tsx` | ⬜ |
| 30 | Instructor Earnings | `/instructor/earnings` | `app/instructor/earnings/page.tsx` | ⬜ |
| 31 | Instructor Analytics | `/instructor/analytics` | `app/instructor/analytics/page.tsx` | ⬜ |

---

## ADMIN PAGES

| # | Page Name | URL | File Path | Status |
|---|-----------|-----|-----------|--------|
| 32 | Admin Dashboard | `/admin` | `app/admin/page.tsx` | ⬜ |
| 33 | User Management | `/admin/users` | `app/admin/users/page.tsx` | ⬜ |
| 34 | Course Moderation | `/admin/courses` | `app/admin/courses/page.tsx` | ⬜ |
| 35 | Finance / Transactions | `/admin/finance` | `app/admin/finance/page.tsx` | ⬜ |
| 36 | Category Management | `/admin/categories` | `app/admin/categories/page.tsx` | ⬜ |
| 37 | Review Moderation | `/admin/reviews` | `app/admin/reviews/page.tsx` | ⬜ |
| 38 | Blog Management | `/admin/blog` | `app/admin/blog/page.tsx` | ⬜ |

---

## BLOG / EDITORIAL PAGES

| # | Page Name | URL | File Path | Status |
|---|-----------|-----|-----------|--------|
| 39 | Create Article | `/editorial/create` | `app/editorial/create/page.tsx` | ⬜ |
| 40 | Edit Article | `/editorial/[id]/edit` | `app/editorial/[id]/edit/page.tsx` | ⬜ |
| 41 | Article Review Queue | `/editorial/review` | `app/editorial/review/page.tsx` | ⬜ |

---

## SUPPORT & LEGAL (Static pages)

| # | Page Name | URL | File Path | Status |
|---|-----------|-----|-----------|--------|
| 42 | Contact Us | `/contact` | `app/contact/page.tsx` | ⬜ |
| 43 | FAQ | `/faq` | `app/faq/page.tsx` | ⬜ |
| 44 | Help Center | `/help` | `app/help/page.tsx` | ⬜ |
| 45 | Terms of Service | `/terms` | `app/terms/page.tsx` | ⬜ |
| 46 | Privacy Policy | `/privacy` | `app/privacy/page.tsx` | ⬜ |
| 47 | Refund Policy | `/refund-policy` | `app/refund-policy/page.tsx` | ⬜ |
| 48 | Instructor Terms | `/instructor-terms` | `app/instructor-terms/page.tsx` | ⬜ |
| 49 | Certificate Verification | `/verify/[certId]` | `app/verify/[certId]/page.tsx` | ⬜ |

---

## Total: 49 Pages

---

## MVP Phase Priority

### Phase 1A — Core (Build first, weeks 1-4)
Pages: 1, 9, 10, 11, 13, 2, 3

### Phase 1B — Learning (weeks 5-8)
Pages: 15, 14, 22, 23, 24, 25, 26, 27

### Phase 1C — Completion (weeks 9-12)
Pages: 4, 5, 16, 17, 18, 19, 32, 33, 34, 42-48
