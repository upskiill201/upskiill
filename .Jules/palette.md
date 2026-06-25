## 2026-05-23 - [Accordion ARIA & Focus States]
**Learning:** When building an accordion with `overflow: hidden` on the wrapper to handle content animations, traditional `outline: 2px solid` for focus states gets clipped. Additionally, screen readers need explicit ARIA bindings (`aria-controls`, `id`, `role="region"`, `aria-labelledby`) between the trigger and content to understand the relationship, and decorative icons (like chevrons) inside triggers should be explicitly hidden from screen readers using `aria-hidden="true"`.
**Action:** Use `box-shadow: inset 0 0 0 2px <color>` for the `:focus-visible` state on the trigger button to prevent clipping. Always ensure proper ARIA linkage between interactive triggers and their expanding regions.

## 2024-05-31 - [aria-expanded on Navigation Toggles]
**Learning:** Mobile hamburger toggles that open/close navigation panels often have aria-label but miss aria-expanded. This attribute is critical as it tells screen readers the current open/closed state of the menu dynamically.
**Action:** When implementing responsive headers, always ensure the mobile menu toggle button binds its `aria-expanded` state to the same boolean used to render the nav panel.

## 2024-06-25 - [Form Validation Error State Accessibility]
**Learning:** WCAG 1.4.1 (Use of Color) dictates that error states must not rely solely on color. Simply turning a border and text red is insufficient for users with color vision deficiencies. Additionally, dynamic error messages need to be explicitly announced by screen readers when they appear.
**Action:** Always include a visual indicator (like an icon) alongside validation error text. Ensure the container wrapping the dynamic error message uses `role="alert"` so screen readers immediately announce it.
