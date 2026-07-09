## 2026-05-23 - [Accordion ARIA & Focus States]
**Learning:** When building an accordion with `overflow: hidden` on the wrapper to handle content animations, traditional `outline: 2px solid` for focus states gets clipped. Additionally, screen readers need explicit ARIA bindings (`aria-controls`, `id`, `role="region"`, `aria-labelledby`) between the trigger and content to understand the relationship, and decorative icons (like chevrons) inside triggers should be explicitly hidden from screen readers using `aria-hidden="true"`.
**Action:** Use `box-shadow: inset 0 0 0 2px <color>` for the `:focus-visible` state on the trigger button to prevent clipping. Always ensure proper ARIA linkage between interactive triggers and their expanding regions.

## 2024-05-31 - [aria-expanded on Navigation Toggles]
**Learning:** Mobile hamburger toggles that open/close navigation panels often have aria-label but miss aria-expanded. This attribute is critical as it tells screen readers the current open/closed state of the menu dynamically.
**Action:** When implementing responsive headers, always ensure the mobile menu toggle button binds its `aria-expanded` state to the same boolean used to render the nav panel.

## 2024-07-09 - Ensure Form Validation is Screen Reader Friendly and WCAG 1.4.1 Compliant
**Learning:** By default, error text shown beneath form inputs is only visually apparent and not robust for screen readers. Furthermore, using color alone (e.g., red text) to indicate an error violates WCAG 1.4.1.
**Action:** When creating or modifying form components (`Input`, `Textarea`, etc.), always ensure error message spans use `role="alert"` so screen readers proactively announce the error when it appears. Additionally, add a visual indicator (like an `AlertCircle` icon) alongside the text so the error state does not rely solely on color.
