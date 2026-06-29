## 2026-05-23 - [Accordion ARIA & Focus States]
**Learning:** When building an accordion with `overflow: hidden` on the wrapper to handle content animations, traditional `outline: 2px solid` for focus states gets clipped. Additionally, screen readers need explicit ARIA bindings (`aria-controls`, `id`, `role="region"`, `aria-labelledby`) between the trigger and content to understand the relationship, and decorative icons (like chevrons) inside triggers should be explicitly hidden from screen readers using `aria-hidden="true"`.
**Action:** Use `box-shadow: inset 0 0 0 2px <color>` for the `:focus-visible` state on the trigger button to prevent clipping. Always ensure proper ARIA linkage between interactive triggers and their expanding regions.

## 2024-05-31 - [aria-expanded on Navigation Toggles]
**Learning:** Mobile hamburger toggles that open/close navigation panels often have aria-label but miss aria-expanded. This attribute is critical as it tells screen readers the current open/closed state of the menu dynamically.
**Action:** When implementing responsive headers, always ensure the mobile menu toggle button binds its `aria-expanded` state to the same boolean used to render the nav panel.

## 2026-06-29 - [Visual Required Indicators & Native Validation]
**Learning:** When custom React form components rely on native HTML validation (forwarding the `required` prop), the browser handles validation logic and tooltips. However, for visual accessibility, a visual indicator (like a red asterisk) must still be rendered next to the label. To prevent screen readers from redundantly announcing "star", this visual indicator must use `aria-hidden="true"`.
**Action:** Always intercept the `required` prop in custom form components (Input, Textarea, Select) to render an `aria-hidden="true"` visual asterisk, while still forwarding the prop to the underlying native element to retain native browser validation behavior.
