# Upskiill Brand Color System

> Official color reference for all developers. Use ONLY these colors when building UI.

---

## Color Philosophy

| Role | Color | HEX |
|------|-------|-----|
| App Background | White | `#FFFFFF` |
| Page Sections | Light Grey | `#F5F7FB` |
| Cards | White | `#FFFFFF` |
| Navbar | White or Deep Navy | `#FFFFFF` / `#1F2A44` |
| Brand / CTAs / Buttons | Brand Blue | `#3D5AFE` |
| Primary Text | Deep Navy | `#1F2A44` |
| Secondary Text | Slate | `#64748B` |
| Borders | Light Grey | `#E2E8F0` |

---

## CSS Variables — Copy into `globals.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  /* Backgrounds */
  --bg-page:        #FFFFFF;   /* Main app background */
  --bg-section:     #F5F7FB;   /* Alternating sections */
  --bg-card:        #FFFFFF;   /* Cards and panels */
  --bg-nav:         #FFFFFF;   /* Navbar background */

  /* Brand (Blue — core identity) */
  --brand-blue:     #3D5AFE;   /* Buttons, links, logo */
  --brand-blue-hover: #2D4AEE; /* Hover state */
  --soft-blue:      #6C8CFF;   /* Secondary highlights */
  --light-blue-bg:  #EEF2FF;   /* Blue tinted backgrounds */

  /* Text */
  --text-primary:   #1F2A44;   /* Headings, main body */
  --text-secondary: #64748B;   /* Subtext, captions */
  --text-muted:     #94A3B8;   /* Placeholders, labels */
  --text-on-blue:   #FFFFFF;   /* Text on blue buttons */

  /* Borders & Dividers */
  --border:         #E2E8F0;
  --border-strong:  #CBD5E1;

  /* Accent */
  --gradient-purple: #7B61FF;
  --success-green:  #22C55E;
  --error-red:      #EF4444;
  --warning:        #F59E0B;

  /* Gradients */
  --gradient-brand: linear-gradient(135deg, #3D5AFE 0%, #7B61FF 100%);
  --gradient-hero:  linear-gradient(135deg, #1F2A44 0%, #3D5AFE 100%);
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
}
```

---

## Color Usage Guide

### Backgrounds
```
App background      → #FFFFFF  (white — clean, professional)
Section bg (alt)    → #F5F7FB  (light grey — slight contrast)
Card / panel bg     → #FFFFFF  (white with border)
Blue tint section   → #EEF2FF  (use for hero or feature sections)
Dark hero section   → #1F2A44  (deep navy — use sparingly for impact)
```

### Text
```
Page titles & headings  → #1F2A44  (deep navy = strong contrast on white)
Body text               → #1F2A44
Subtext / captions      → #64748B
Placeholder text        → #94A3B8
Text on blue bg         → #FFFFFF
```

### Buttons
```
Primary CTA    → #3D5AFE background + #FFFFFF text
Hover          → #2D4AEE (slightly darker)
Secondary      → White background + #3D5AFE border + #3D5AFE text
Danger         → #EF4444
Success        → #22C55E
```

### Navigation (Navbar)
```
Background  → #FFFFFF with bottom border #E2E8F0
Logo text   → #3D5AFE (brand blue)
Nav links   → #1F2A44
Active link → #3D5AFE
CTA button  → #3D5AFE background
```

---

## Color Palette Summary

| Name | HEX | Use |
|------|-----|-----|
| White | `#FFFFFF` | App background, cards |
| Light Grey | `#F5F7FB` | Section backgrounds |
| Light Blue Tint | `#EEF2FF` | Feature sections |
| Deep Navy | `#1F2A44` | Text, dark hero sections |
| Brand Blue | `#3D5AFE` | ⭐ Buttons, logo, links |
| Brand Blue Hover | `#2D4AEE` | Hover states |
| Soft Blue | `#6C8CFF` | Highlights |
| Gradient Purple | `#7B61FF` | Gradients with brand blue |
| Slate | `#64748B` | Secondary text |
| Muted | `#94A3B8` | Placeholders |
| Border | `#E2E8F0` | Card borders, dividers |
| Success Green | `#22C55E` | Success only |
| Error Red | `#EF4444` | Errors only |

---

## Brand Rules

| Rule | ✅ Correct | ❌ Wrong |
|------|-----------|---------|
| App background | White `#FFFFFF` | Dark navy |
| CTA buttons | Brand Blue `#3D5AFE` | Any other color |
| Headings on white | Deep Navy `#1F2A44` | Pure black `#000000` |
| Success signals | Green `#22C55E` only | Blue, yellow |
| Text on blue | White `#FFFFFF` only | Dark text |

---

## Example Components

```css
/* Primary Button */
.btn-primary {
  background-color: var(--brand-blue);
  color: var(--text-on-blue);
  border-radius: 8px;
  padding: 12px 24px;
}
.btn-primary:hover {
  background-color: var(--brand-blue-hover);
}

/* Card */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}

/* Hero Section (dark for impact) */
.hero {
  background: var(--gradient-hero);
  color: white;
}

/* Feature Section (blue tint, light) */
.feature-section {
  background: var(--light-blue-bg);
}
```
