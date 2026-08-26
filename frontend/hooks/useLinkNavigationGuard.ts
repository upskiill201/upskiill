import { useEffect } from 'react';

/**
 * Block in-app (SPA) link navigation while the lesson builder has unsaved
 * work. Next.js App Router has no router-level navigation guard, but every
 * <Link> navigation still starts as a click on an anchor — so a capture-phase
 * click listener covers sidebar lesson switching, breadcrumbs and header
 * links without touching Next internals.
 *
 * Coverage, honestly stated:
 *  - anchor clicks (all Link-based exits from this page)  → guarded here
 *  - tab close / reload / external nav                    → beforeunload in useSyncQueue
 *  - programmatic router.push                             → call sites are
 *    failure-aware; they only navigate after a confirmed successful save
 *  - browser back/forward buttons                         → NOT guarded (the
 *    app-router history stack can't be aborted safely; tracked separately)
 */
export function useLinkNavigationGuard(active: boolean, message?: string) {
  useEffect(() => {
    if (!active) return;

    const MSG =
      message ??
      'You have unsaved changes that may be lost if you leave this page. Leave anyway?';

    const handleClick = (e: MouseEvent) => {
      // Find the anchor this click targets (bubbles from inner elements).
      const target = e.target instanceof Element ? e.target.closest('a') : null;
      if (!target) return;
      // Don't block downloads, new tabs, or non-navigation links.
      if (target.target && target.target !== '_self') return;
      if (target.hasAttribute('download')) return;
      const href = target.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // Only guard real navigations (same-origin paths), not javascript: etc.
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
      } catch {
        return;
      }

      if (!window.confirm(MSG)) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [active, message]);
}
