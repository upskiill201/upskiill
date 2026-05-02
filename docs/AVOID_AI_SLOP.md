# Teyro: Avoid AI Slop UI Patterns

> **Status:** Mandatory reference — consult this document BEFORE building any UI component or page.
> **Last updated:** 2026-05-02

---

## What is "AI Slop"?

"AI Slop" is the generic, repetitive, and uninspired aesthetic produced by LLMs and AI design tools when they rely on the statistical average of their training data. These designs often look polished at first glance but lack depth, structural integrity, and brand identity.

AI is trained on thousands of identical Tailwind CSS, Dribbble, and modern SaaS landing pages — so without specific constraints, it generates the **statistical mean** of all those designs. The result is visually safe, instantly recognizable, and completely forgettable.

---

## ❌ Banned UI Patterns

The following patterns are **prohibited** on Teyro unless there is a specific, documented design reason to use them:

### 1. The "Purple/Blue Glow" Gradient
- Overuse of indigo/purple gradients, especially in hero sections or buttons
- Glowing halos or bloom effects centered on a hero CTA
- **Fix:** Use Teyro's specific brand palette. Gradients must reference brand tokens, not generic indigo→purple defaults.

### 2. Glassmorphism Overload
- Excessive frosted glass panels, transparent cards floating in a void
- Soft, ethereal box-shadows with no structural grounding
- **Fix:** Glass effects must have purpose. Cards need context — they exist on a surface, not in a fog.

### 3. The "3-Card Grid" Layout
- Hero section → three-column card grid (icon + heading + text)
- This is the #1 AI slop layout. It signals zero creative effort.
- **Fix:** Use asymmetric layouts, staggered grids, or timeline structures (like our Marketplace section).

### 4. Sterile, Large Spacing
- Excessively generous padding used to hide a lack of real content
- 200px+ empty zones between sections that add no visual rhythm
- **Fix:** Spacing must be intentional. Follow the 8px base unit grid (8, 16, 24, 32, 48, 64px).

### 5. "Trusted By" Marquee
- Auto-scrolling, muted gray logos of fake or placeholder companies
- **Fix:** Only include real brand logos if they are actual Teyro partners. Otherwise, omit entirely.

### 6. Abstract 3D Humans / Generic Illustrations
- Pastel-colored, Lottie or 3D characters holding glowing orbs or laptops
- **Fix:** Use real product screenshots, purposeful custom illustrations, or nothing at all.

---

## ❌ Banned Default Component Styles

### Typography
- **Do not** default to `Inter` or `Geist` for body text and `Space Grotesk` for headings without a brand reason.
- **Fix:** Use the Teyro-established type scale. Any new font must be approved in the design system.

### Buttons & Inputs
- **Do not** apply `border-radius: 8px–12px` to every interactive element by default.
- **Fix:** Follow the established 10px (buttons/inputs) and 12px (cards) system documented in Principle #8.

### Navigation
- **Do not** build a generic icon + label sidebar that looks like a Shadcn or Vercel clone.
- **Fix:** Navigation must align with the HeaderWrapper and Footer components already in the codebase.

### Dashboard Layout
- **Do not** use the classic "dark sidebar left, white content area right" layout as a default.
- **Fix:** Consult existing dashboard pages before designing a new layout structure.

### Input Focus States
- **Do not** use glowing light-blue focus outlines (browser defaults or Tailwind ring utilities).
- **Fix:** Use the brand's established focus styles from the component library.

---

## ✅ How to Build UI That Avoids Slop

### Before You Build Anything
1. **Read this document.** (You're doing it now ✓)
2. **Check `components/ui/` and `components/features/`** for existing components (Principle #4).
3. **Reference the page structure** in `frontend/app/page.tsx` to understand the existing visual language.
4. **Study the existing sections** (HeroSection, Marketplace, RoleSolutions) to understand the design DNA before adding anything new.

### During Design
- **Provide specific constraints** — no vague "build a dashboard." Define the layout, spacing, and color tokens first.
- **Start with structure, then style, then polish.** Do not style before the structure is correct.
- **Use "anti-slop" prompts** — explicitly call out what NOT to do: "no gradient orbs, no 3-card grid, no floating glass panels."
- **Never use placeholder content** — if an image is needed, it must be a real asset or a generated one via `generate_image`. No Lorem Ipsum visuals.

### During Review
- **Gut-check the layout:** Does it look like 1,000 other SaaS landing pages? If yes, redesign.
- **Verify spacing is intentional:** Every padding and margin choice should have a reason.
- **Check empty/loading/error states exist** — AI slop always skips these. They are required.
- **Confirm icon libraries are correct** — only `lucide-react` and `react-icons/fa` (Principle #7).

---

## 🔍 Quick Slop Checklist

Run through this before submitting any UI PR:

| Check | Question | Pass? |
|---|---|---|
| Layout | Does it use a generic 3-card grid as the primary structure? | ❌ if yes |
| Color | Does it use an unmotivated indigo/purple gradient glow? | ❌ if yes |
| Glass | Is glassmorphism used decoratively with no structural purpose? | ❌ if yes |
| Spacing | Is there large empty space hiding a lack of content? | ❌ if yes |
| Typography | Are font choices generic defaults unrelated to the brand? | ❌ if yes |
| Logos | Are there placeholder/fake company logos in a marquee? | ❌ if yes |
| Illustrations | Are generic 3D characters or pastel blobs used? | ❌ if yes |
| States | Are loading, error, and empty states implemented? | ✅ required |
| Icons | Are all icons from `lucide-react` or `react-icons/fa`? | ✅ required |
| Components | Were existing `components/ui/` components checked first? | ✅ required |

---

## Reference

This document is based on the established definition of "AI Slop" in UI design: the generic, repetitive aesthetic produced when AI relies on the statistical average of its training data (Tailwind, Dribbble, and SaaS landing page corpora) without project-specific constraints.

**See also:**
- [`PRODUCTION_PRINCIPLES.md`](./PRODUCTION_PRINCIPLES.md) — Principle #17 mandates consulting this doc before any UI work.
- [`PROJECT_DOCS.md`](./PROJECT_DOCS.md) — Full project architecture and codebase overview.
