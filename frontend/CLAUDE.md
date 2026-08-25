# Teyro Frontend — Design System & Motion Standards

Loads automatically whenever Claude works under `frontend/`. Migrated from root CLAUDE.md §5–§6 on 2026-08-24 so backend sessions stop paying for UI specs.

---

## Design System

### Core Brand Feel
Every page, every component, every interaction on Teyro must feel: **smooth, delightful, playful, and premium.** The product must feel alive and responsive to every user gesture. This is not optional polish — it is the product identity.

### Brand Colors

All color values and CSS variables live in `docs/08-color-system.md` — the single source of truth. Never hardcode hex in components; use the CSS variables defined there (`--brand-blue`, `--text-primary`, `--bg-section`, `--gradient-brand`, etc.).

### Component Builder Standard (Course Builder Aesthetic)
For complex builder interfaces, use the `/creator/courses` Promo Banner as the visual source of truth:
- **Background:** `linear-gradient(135deg, #EEF2FF 0%, #F5F7FB 100%)`
- **Borders:** `1px solid #E2E8F0`
- **Radii:** `16px` for cards, `10px` for buttons and inputs
- **Shadows:** `box-shadow: 0 4px 20px rgba(61, 90, 254, 0.02), 0 1px 4px rgba(61, 90, 254, 0.01)`

### Typography
- **Headings:** established Teyro type scale — do not default to Inter + Space Grotesk without a brand reason
- **Body:** follow the established scale
- **Spacing:** 8px base unit — all spacing values must be multiples of 8 (8, 16, 24, 32, 48, 64px)

### Border Radius System
- Buttons and inputs: `10px`
- Cards: `12px`
- Large builder panels: `16px`
- Pills and badges: `999px`

### Icon Libraries
Only two icon libraries are permitted across the entire codebase:
- `lucide-react` — for all UI and form icons
- `react-icons/fa` — for feature, brand, and social icons

No other icon library. No emoji as icons. No inline SVG icons unless they are GSAP-animated brand moments.

### Logo
```
frontend/public/Teyro Logo.png
```
This is the only approved logo asset path. Never reference it any other way.

### Gamification Currency ⛔ Hard Stop
We DO NOT use "gems". We use **"coins"** instead. The platform currency is strictly coins. Any gamification rewards, UI elements, or backend logic should use coins. Any legacy reference to gems must be treated as coins.

---

## Motion and Animation Standards

### When to Use Each Tool
| Tool | Use For |
|---|---|
| **GSAP** | Modal open/close, page transitions, choreographed multi-element sequences, scroll-triggered animations, file upload completion bursts |
| **Rive** | Looping animated icons (upload spinner, success states, AI processing indicators) |
| **Framer Motion** | Component-level micro-animations: hover lift, press scale, list item enter/exit |
| **CSS transitions** | Simple hover states, color transitions, border changes — anything under 200ms with a single property |

### Animation Principles
- Modal open: scale from 0.95 → 1.0, fade in, duration 200ms, ease-out
- Modal close: reverse, duration 150ms, ease-in
- Button press: scale to 0.98, duration 100ms
- Card hover: translateY(-2px), shadow deepens, duration 150ms
- Upload complete: progress bar fills to 100%, transitions to green checkmark with a 3-particle GSAP burst
- AI text streaming: text appears character by character, textarea border pulses in brand indigo
- New resource added to list: GSAP slide-in from above, fade in, duration 250ms
- All animations must respect `prefers-reduced-motion` — wrap GSAP animations in a check

```typescript
// Always wrap GSAP in reduced motion check
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.to(element, { scale: 1, opacity: 1, duration: 0.2 });
} else {
  gsap.set(element, { scale: 1, opacity: 1 });
}
```
