'use client';

/**
 * The red badge on a tab icon: a number for "N things waiting", or a plain
 * dot for "something changed". Pops in with a spring when it appears or the
 * number goes up, so a new one catches the eye without a sound.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export function NavBadge({ count, dot = false, label }: { count?: number; dot?: boolean; label: string }) {
  const reducedMotion = useReducedMotion();
  const show = dot || (count ?? 0) > 0;
  const text = (count ?? 0) > 9 ? '9+' : String(count ?? '');

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          key={dot ? 'dot' : text}
          role="status"
          aria-label={label}
          className={[
            'absolute z-[2] pointer-events-none flex items-center justify-center rounded-full text-white font-extrabold',
            'border-2 border-white',
            dot ? 'w-3.5 h-3.5 -top-0.5 -right-0.5' : 'min-w-[20px] h-5 px-1 -top-1.5 -right-2 text-[11px] leading-none',
          ].join(' ')}
          style={{ backgroundColor: 'var(--error-red)', fontFamily: 'var(--font-jakarta)' }}
          initial={reducedMotion ? { opacity: 0 } : { scale: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 700, damping: 14 }}
        >
          {!dot && text}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default NavBadge;
