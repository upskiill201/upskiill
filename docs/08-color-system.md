# Upskiill Brand Color System

> Official color reference for all developers. Use ONLY these colors when building UI.

---

## Quick Reference Card

```css
/* PRIMARY */
--deep-navy:      #1F2A44;   /* App background, navbars */
--midnight-blue:  #243554;   /* Sections, UI layers, cards */
--brand-blue:     #3D5AFE;   /* Logo, CTA buttons, links */

/* SECONDARY */
--soft-blue:      #6C8CFF;   /* Hover states */
--muted-slate:    #2E3F66;   /* Cards, panels */
--light-bg:       #F5F7FB;   /* Forms, light UI mode */

/* ACCENT */
--gradient-purple: #7B61FF;  /* Gradients, CTA outlines */
--purple-glow:    #A78BFA;   /* UI emphasis, highlights */
--success-green:  #22C55E;   /* Success, notifications */

/* TEXT */
--text-primary:   #FFFFFF;   /* Text on dark backgrounds */
--text-secondary: #A0AEC0;   /* Subtext, captions, labels */
--border:         #3A4A6B;   /* Dividers, structure */
```

---

## Color Palette Visual

| Swatch | Name | HEX | Use |
|--------|------|-----|-----|
| 🟦 | Deep Navy | `#1F2A44` | App background, navbars |
| 🟦 | Midnight Blue | `#243554` | Sections, UI layers |
| 🔵 | Brand Blue | `#3D5AFE` | Buttons, logo, CTAs |
| 💙 | Soft Blue | `#6C8CFF` | Hover states |
| 🔷 | Muted Slate | `#2E3F66` | Cards, panels |
| ⬜ | Light Background | `#F5F7FB` | Light mode forms |
| 🟣 | Gradient Purple | `#7B61FF` | Gradients, CTA outlines |
| 💜 | Purple Glow | `#A78BFA` | Emphasis, highlights |
| 🟢 | Success Green | `#22C55E` | Success signals only |

---

## Gradient System

```css
/* Use for hero sections, banners, CTA buttons */
.gradient-primary {
  background: linear-gradient(135deg, #3D5AFE 0%, #7B61FF 100%);
}

/* Use for background depth, sections */
.gradient-secondary {
  background: linear-gradient(135deg, #243554 0%, #1F2A44 100%);
}
```

---

## When to Use Each Color

### Backgrounds
```
Page background          → #1F2A44 (Deep Navy)
Card / Panel background  → #243554 (Midnight Blue)
Inner card / forms       → #2E3F66 (Muted Slate)
Light mode pages         → #F5F7FB (Light Background)
```

### Text
```
Headings & body text     → #FFFFFF (on dark bg)
Subtext / labels         → #A0AEC0
Links                    → #3D5AFE (Brand Blue)
```

### Interactive Elements
```
Primary CTA button       → #3D5AFE background + gradient
Hover state              → #6C8CFF
Secondary button         → outlined #3D5AFE
Disabled                 → #3A4A6B
```

### Status Colors
```
Success / Enrolled        → #22C55E
Error / Warning           → #EF4444 (standard red)
Info                      → #6C8CFF (Soft Blue)
```

---

## How to Set Up Colors in Your Project

### Add to `frontend/app/globals.css`:

```css
:root {
  /* Primary */
  --deep-navy: #1F2A44;
  --midnight-blue: #243554;
  --brand-blue: #3D5AFE;

  /* Secondary */
  --soft-blue: #6C8CFF;
  --muted-slate: #2E3F66;
  --light-bg: #F5F7FB;

  /* Accent */
  --gradient-purple: #7B61FF;
  --purple-glow: #A78BFA;
  --success-green: #22C55E;

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #A0AEC0;
  --border: #3A4A6B;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #3D5AFE 0%, #7B61FF 100%);
  --gradient-bg: linear-gradient(135deg, #243554 0%, #1F2A44 100%);
}

body {
  background-color: var(--deep-navy);
  color: var(--text-primary);
}
```

### Using in components:
```css
.btn-primary {
  background: var(--gradient-primary);
  color: white;
}

.card {
  background: var(--midnight-blue);
  border: 1px solid var(--border);
}
```

---

## Brand Rules (Important!)

| Rule | Correct | Wrong |
|------|---------|-------|
| CTA buttons | Brand Blue `#3D5AFE` or gradient | Any other color |
| Success states | Success Green `#22C55E` ONLY | Blue, yellow |
| Background | Deep Navy `#1F2A44` | White, grey |
| Links | Brand Blue `#3D5AFE` | Green, red |
| Hover | Soft Blue `#6C8CFF` | Darken the base color |

---

## Typography (To Add)

```css
/* Import in globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

/* Scale */
h1: 48px / 700 weight
h2: 36px / 700 weight
h3: 24px / 600 weight
h4: 20px / 600 weight
body: 16px / 400 weight
small: 14px / 400 weight
```
