/**
 * The HOT sticker for courses in lib/courses/hot.ts: Teyro's flame, lit from
 * inside, on a warm pill that sits beside the course name. The flame flickers
 * and a spark rises unless reduced motion is on.
 */

import css from './HotBadge.module.css';

const OUTER = 'M13 2.6c.4 3.4-1.8 5-3.4 6.8C8 11.2 6 13 6 15.6a6 6 0 0 0 12 0c0-2.6-1.2-4.6-2.6-6-.2 1.8-1 2.8-2 3.2.8-3.8-.2-7.2-.4-10.2Z';
const INNER = 'M12.4 11.4c.2 1.8-1 2.6-1.8 3.6-.5.6-.9 1.2-.9 2a2.3 2.3 0 0 0 4.6 0c0-1.2-.6-2-1.2-2.6-.1.8-.4 1.2-.8 1.4.3-1.6 0-3-.1-4.4Z';

export function HotBadge(props: { size?: 'sm' | 'md'; className?: string }) {
  const cls = [css.badge, props.size === 'md' ? css.md : '', props.className ?? ''].filter(Boolean).join(' ');
  return (
    <span className={cls} aria-label="Hot course" role="img">
      <svg className={css.flame} viewBox="0 0 24 24" aria-hidden="true">
        <path className={css.outer} d={OUTER} />
        <path className={css.inner} d={INNER} />
      </svg>
      <span className={css.spark} aria-hidden="true" />
      <span className={css.text}>Hot</span>
    </span>
  );
}

/** The same flame on its own, in hot orange, for headings like "Hot right now". */
export function HotFlame(props: { size?: number }) {
  const size = props.size ?? 28;
  return (
    <svg className={`${css.flame} ${css.bare}`} style={{ width: size, height: size }} viewBox="0 0 24 24" aria-hidden="true">
      <path className={css.outer} d={OUTER} />
      <path className={css.inner} d={INNER} />
    </svg>
  );
}
