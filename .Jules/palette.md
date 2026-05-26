## 2024-05-25 - ARIA Labels on Modals
**Learning:** Icon-only close buttons in modals frequently lack accessible names. In this app, many standard icon buttons like `<X />` are used without `aria-label`s, preventing screen readers from accurately describing their purpose to users.
**Action:** Always add explicit `aria-label="Close"` or context-specific descriptions (`aria-label="Close modal"`) to `<button>` elements that only render an icon and contain no descriptive text.
