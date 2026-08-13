# Mobile Responsive Fixes for 100dvh Layouts on iOS

This document outlines the standard fixes implemented across the onboarding pages to ensure perfect, no-scroll, responsive fitting on mobile devices (especially iOS Safari and Chrome).

## 1. Native `100dvh` Without Conflicting Heights
Never combine `min-h-screen` or `min-h-[100svh]` with `h-[100dvh]`. On iOS, `100vh` translates to the *layout viewport* (the tallest possible state ignoring the URL bar). If you nest a `100dvh` container inside a `100vh` wrapper and vertically center it, it will create invisible gaps at the top and push bottom elements underneath the Safari navigation bar.
- **Rule:** The outer mobile layout wrapper must simply be `h-[100dvh]` to snap accurately to the space above the browser UI. 
- **Anti-pattern:** `min-h-[100svh] min-h-[100dvh] min-h-screen`
- **Correct Pattern:** `h-[100dvh] md:min-h-screen`

## 2. Eliminate Stacked Top Paddings
Check for nested containers stacking `pt-*` classes. A `pt-2` on three nested wrappers adds up to a massive 24px gap, pushing the UI down unnecessarily.
- **Rule:** Keep `pt-0 pb-0` on outer structural wrappers and apply padding *only* to the innermost semantic element (e.g. the progress bar container).

## 3. Compress Vertical Required Space
If a container is strictly `h-[100dvh]` with `overflow-hidden`, and the text/buttons inside it demand too much vertical space via large margins (`mb-4`, `mb-6`), the container will clip its overflow at the bottom, hiding the buttons!
- **Rule:** Use compact typography margins (`mb-1` or `mb-2`) and use `clamp()` for font sizes so text scales down gracefully on small iPhones.

## 4. `layoutId` Invisible Image Bug on iOS
Framer Motion's `layoutId` prop is notoriously buggy on iOS Safari when used on elements (like images) that mount during layout calculations or SSR hydration mismatches. It often gets stuck with `visibility: hidden` or `opacity: 0`.
- **Rule:** Do not use `layoutId` on crucial, above-the-fold mobile images if they are randomly disappearing. Replace it with standard `animate={{ opacity: 1, scale: 1 }}` entrance physics.

## 5. Next.js Image Paths and Vercel Strictness
While local development servers might properly resolve image paths containing `%20` (URL-encoded spaces), Vercel's production image optimization edge servers often look for literal `%20` characters in folder names and will silently 404 the image.
- **Rule:** Do not use `%20` in `next/image` source strings. Write the path exactly as it is formatted in the file system with normal spaces (e.g., `src="/User onboarding Assets/icon.png"`). Next.js will automatically encode it properly during the production build.
