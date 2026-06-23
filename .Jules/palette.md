## 2026-05-23 - [Accordion ARIA & Focus States]
**Learning:** When building an accordion with `overflow: hidden` on the wrapper to handle content animations, traditional `outline: 2px solid` for focus states gets clipped. Additionally, screen readers need explicit ARIA bindings (`aria-controls`, `id`, `role="region"`, `aria-labelledby`) between the trigger and content to understand the relationship, and decorative icons (like chevrons) inside triggers should be explicitly hidden from screen readers using `aria-hidden="true"`.
**Action:** Use `box-shadow: inset 0 0 0 2px <color>` for the `:focus-visible` state on the trigger button to prevent clipping. Always ensure proper ARIA linkage between interactive triggers and their expanding regions.

## 2024-05-31 - [aria-expanded on Navigation Toggles]
**Learning:** Mobile hamburger toggles that open/close navigation panels often have aria-label but miss aria-expanded. This attribute is critical as it tells screen readers the current open/closed state of the menu dynamically.
**Action:** When implementing responsive headers, always ensure the mobile menu toggle button binds its `aria-expanded` state to the same boolean used to render the nav panel.

## 2026-06-23 - [Visual Required Indicators on Inputs]
**Learning:** In custom React form components that wrap native HTML5 elements, passing down the `required` prop isn't enough for good UX, as it only triggers standard browser tooltips that can easily be missed or appear only on submit. It's crucial to also visually communicate the required state explicitly to users (e.g., using a red asterisk appended to the label with `aria-hidden="true"`) to prevent validation frustration.
**Action:** Always complement the native HTML5 `required` attribute with explicit visual indicators tied to the `required` prop logic, making sure to hide the decorative indicator from screen readers to prevent redundant announcements.
