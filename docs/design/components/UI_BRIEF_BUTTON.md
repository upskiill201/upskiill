# 🎨 UI Design Brief — `Button` Component
> **Component:** Button
> **Priority:** 🔴 P1 — Must build first (used on every page)
> **Designer:** Please design ALL states and variants shown below in Figma
> **Handoff to:** Developer after design is approved

---

## 🧭 Context & Purpose

The Button is the **most used component** on the entire Upskiill platform.
It appears on every single page — from the homepage hero CTA, to forms, to the course player.

Getting this right is non-negotiable. It must:
- Feel **premium and modern** — not flat or generic
- Be **consistent** across all variants
- Have **clear visual feedback** for every interaction state
- Work on **both light and dark backgrounds**

---

## 🎨 Brand Tokens (Use only these)

| Token | Value |
|---|---|
| Primary Blue | `#3D5AFE` |
| Primary Hover | `#2D4AEE` |
| Text on Blue | `#FFFFFF` |
| Deep Navy (text) | `#1F2A44` |
| Slate (secondary text) | `#64748B` |
| Border Grey | `#E2E8F0` |
| Page Background | `#FFFFFF` |
| Error Red | `#EF4444` |
| Font | **Inter** (Google Fonts) |

---

## 📐 VARIANTS — Design Every Single One

There are **5 variants** × **3 sizes** × **5 states** = a full button design system.

---

### VARIANT 1: `Primary` — The Main CTA

> Use: "Start Learning", "Buy Now", "Sign Up", "Get Started", "Enroll Now"

| Property | Value |
|---|---|
| Background | `#3D5AFE` |
| Text Color | `#FFFFFF` |
| Border | None |
| Font | Inter, `600` weight |
| Border Radius | `10px` |
| Shadow (resting) | `0 2px 8px rgba(61, 90, 254, 0.25)` |

**States to design:**

| State | What changes |
|---|---|
| **Default** | Background `#3D5AFE`, shadow `0 2px 8px rgba(61,90,254,0.25)` |
| **Hover** | Background `#2D4AEE`, shadow `0 6px 16px rgba(61,90,254,0.35)`, moves up `1px` |
| **Active / Pressed** | Background `#253ECC`, shadow reduced, moves down `1px` |
| **Disabled** | Background `#AABDFF` (faded blue), text `rgba(255,255,255,0.7)`, cursor `not-allowed` |
| **Loading** | Same as default, but text replaced by a white spinner + "Loading..." text |

---

### VARIANT 2: `Secondary` — Outlined Blue

> Use: "View All Courses", "Learn More", "See Details", alongside a primary button

| Property | Value |
|---|---|
| Background | `#FFFFFF` |
| Text Color | `#3D5AFE` |
| Border | `1.5px solid #3D5AFE` |
| Font | Inter, `600` weight |
| Border Radius | `10px` |
| Shadow | None by default |

**States to design:**

| State | What changes |
|---|---|
| **Default** | White bg, blue border and text |
| **Hover** | Background becomes `#EEF2FF` (light blue tint), border stays |
| **Active / Pressed** | Background `#DBEAFE`, border `#2D4AEE` |
| **Disabled** | Border `#CBD5E1`, text `#94A3B8`, background white |
| **Loading** | Same as default, blue spinner inside |

---

### VARIANT 3: `Outline` — Neutral / Ghost Bordered

> Use: Cancel actions, secondary options, filter chips, neutral CTAs

| Property | Value |
|---|---|
| Background | `transparent` |
| Text Color | `#1F2A44` |
| Border | `1.5px solid #E2E8F0` |
| Font | Inter, `500` weight |
| Border Radius | `10px` |

**States to design:**

| State | What changes |
|---|---|
| **Default** | Transparent bg, grey border, dark text |
| **Hover** | Background `#F5F7FB`, border `#CBD5E1` |
| **Active / Pressed** | Background `#E2E8F0` |
| **Disabled** | All elements at 50% opacity |
| **Loading** | Grey spinner inside |

---

### VARIANT 4: `Danger` — Destructive Action

> Use: "Delete Account", "Remove Course", "Cancel Subscription"

| Property | Value |
|---|---|
| Background | `#EF4444` |
| Text Color | `#FFFFFF` |
| Border | None |
| Border Radius | `10px` |
| Shadow | `0 2px 8px rgba(239, 68, 68, 0.25)` |

**States to design:**

| State | What changes |
|---|---|
| **Default** | Red background |
| **Hover** | `#DC2626` (darker red), shadow `0 6px 16px rgba(239,68,68,0.35)` |
| **Active / Pressed** | `#B91C1C` |
| **Disabled** | `#FCA5A5` (faded red), 50% opacity text |
| **Loading** | White spinner inside |

---

### VARIANT 5: `Ghost` — No Background, No Border

> Use: Toolbar actions, "Dismiss", "Skip", text-only actions, inside dark backgrounds

| Property | Value |
|---|---|
| Background | `transparent` |
| Text Color | `#64748B` |
| Border | None |
| Font | Inter, `500` weight |
| Border Radius | `10px` |

**States to design:**

| State | What changes |
|---|---|
| **Default** | No background, slate text |
| **Hover** | Background `#F5F7FB`, text `#1F2A44` |
| **Active / Pressed** | Background `#E2E8F0` |
| **Disabled** | Text `#94A3B8`, no hover effect |
| **Loading** | Grey spinner |

---

## 📏 SIZES — Design All Three

Every variant must be designed in all 3 sizes.

| Size | Height | Padding (L/R) | Font Size | Font Weight | Icon Size |
|---|---|---|---|---|---|
| `sm` (Small) | `36px` | `16px` | `13px` | `600` | `14px` |
| `md` (Medium) | `44px` | `20px` | `14px` | `600` | `16px` ← DEFAULT |
| `lg` (Large) | `52px` | `28px` | `16px` | `700` | `18px` |

**Rule:** Border radius stays at `10px` regardless of size.

---

## 🖼️ SPECIAL CONFIGURATIONS — Design Each One

### A. Icon Left
Icon sits to the **left of the text** with `8px` gap.

```
[ 🔍  Search Courses ]
```
- Icon and text are vertically centered
- Icon inherits the button's text color

### B. Icon Right
Icon sits to the **right of the text** with `8px` gap.

```
[ Browse Courses  → ]
```
- Often used for CTAs (arrow icon pointing right)

### C. Icon Only (Square Button)
No text — just an icon. Used in toolbars, search, etc.

```
[ 🔍 ]
```
- Width equals height (square)
- `sm`: 36×36 | `md`: 44×44 | `lg`: 52×52

### D. Full Width
Button stretches to 100% width of its container.
```
[ ─────── Create Account ─────── ]
```
- Used on mobile forms and stacked layouts

### E. Loading State
Text is hidden, replaced by a **spinner + "Loading..." label** inside button.

```
[ ◌  Loading... ]   ← spinner animates on the left
```
- Button is disabled while loading
- Maintains the same height/width as default (no layout shift)
- For `primary`: white spinner
- For `secondary` / `outline`: blue spinner

---

## 🌑 DARK BACKGROUND VERSION

Some buttons appear on the **dark hero section** (`#1F2A44` or gradient backgrounds).
Design these additional variants for dark contexts:

| Variant | Background | Text | Border |
|---|---|---|---|
| `primary` on dark | Same `#3D5AFE` | White | — |
| `secondary` on dark | `rgba(255,255,255,0.1)` | White | `1.5px solid rgba(255,255,255,0.3)` |
| `ghost` on dark | `transparent` | `rgba(255,255,255,0.7)` | — |

Hover for dark secondary: Background `rgba(255,255,255,0.2)`, border `rgba(255,255,255,0.6)`

---

## 🎯 FOCUS STATE (Accessibility)

Every single button variant **must have a focus ring** for keyboard users.

- Focus ring: `2px solid #3D5AFE`
- Offset: `2px` from the button edge
- Only visible on keyboard focus (`:focus-visible`), not on mouse click

---

## ✏️ REAL EXAMPLES — Use These in the Design

Show the buttons in context on a real background so we can see them in action.

| Example | Variant | Size | Context |
|---|---|---|---|
| "Start Learning Today →" | `primary` | `lg` | Hero section, white text |
| "Browse All Courses" | `secondary` | `md` | Section CTA |
| "Cancel" | `outline` | `md` | Next to a primary button |
| "Delete Account" | `danger` | `md` | Settings / danger zone |
| "Skip for now" | `ghost` | `sm` | Onboarding flow |
| "🔍" | `outline` icon-only | `md` | Search bar |
| "Enroll Now" | `primary` full-width | `lg` | Mobile form |
| "Create Account" | `primary` loading | `lg` | During API call |

---

## ✅ Figma Checklist — Deliverables

Before handing off, confirm ALL of the following are designed:

- [ ] All **5 variants** in all **3 sizes** (15 base buttons)
- [ ] All **5 states** for each variant (Default / Hover / Pressed / Disabled / Loading)
- [ ] Icon-Left, Icon-Right, Icon-Only, and Full-Width configurations
- [ ] Dark background versions (primary, secondary, ghost)
- [ ] Focus ring state shown on at least one variant
- [ ] Real-context usage examples (table above)
- [ ] Each state is a separate frame — not just annotated on one frame
- [ ] Auto-layout used so buttons resize correctly with text length
- [ ] Components are named exactly: `Button/Primary/Default`, `Button/Primary/Hover`, etc.

---

## 🔗 Reference Benchmarks

Study these for inspiration before designing:

| Source | What to study |
|---|---|
| **Linear.app** | Crisp, clean button system with excellent hover states |
| **Vercel.com** | Minimal but premium, great disabled states |
| **Stripe.com** | Perfect size hierarchy, great focus states |
| **Existing signup page** (`/signup` on the live app) | Our own `.submitBtn` — build on that aesthetic |

---

*After the designer completes this, the developer will implement it as `components/ui/Button.tsx` + `Button.module.css` following the specs in `COMPONENT_BUILD_PLAN.md`.*
