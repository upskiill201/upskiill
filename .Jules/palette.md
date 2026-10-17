## 2026-05-23 - [Accordion ARIA & Focus States]
**Learning:** When building an accordion with `overflow: hidden` on the wrapper to handle content animations, traditional `outline: 2px solid` for focus states gets clipped. Additionally, screen readers need explicit ARIA bindings (`aria-controls`, `id`, `role="region"`, `aria-labelledby`) between the trigger and content to understand the relationship, and decorative icons (like chevrons) inside triggers should be explicitly hidden from screen readers using `aria-hidden="true"`.
**Action:** Use `box-shadow: inset 0 0 0 2px <color>` for the `:focus-visible` state on the trigger button to prevent clipping. Always ensure proper ARIA linkage between interactive triggers and their expanding regions.

## 2024-05-31 - [aria-expanded on Navigation Toggles]
**Learning:** Mobile hamburger toggles that open/close navigation panels often have aria-label but miss aria-expanded. This attribute is critical as it tells screen readers the current open/closed state of the menu dynamically.
**Action:** When implementing responsive headers, always ensure the mobile menu toggle button binds its `aria-expanded` state to the same boolean used to render the nav panel.

## 2026-06-12 - [Inline Form Error Feedback & Accessibility]
**Learning:** Relying purely on color (like red text) for inline form validation errors violates WCAG 1.4.1 (Use of Color). Colorblind users may miss the error state. Also, errors that appear dynamically without shifting focus might not be announced by screen readers without a proper live region.
**Action:** When displaying inline form errors, always include an accompanying icon (e.g., `AlertCircle`) alongside the error text. Furthermore, wrap the error container with `role="alert"` (or `aria-live="polite"`) to ensure screen readers announce it immediately.
