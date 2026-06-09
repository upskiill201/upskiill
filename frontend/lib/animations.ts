// Core Physics & Easing Constants
export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

export const snappySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
};

// Step Page Transitions
// We use these on the individual left/right panels in each step
export const leftPanelVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.25, ease: 'easeIn' as const, delay: 0.04 } }
};

export const rightPanelVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.06, ease: 'easeOut' as const } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25, ease: 'easeIn' as const } }
};

// The wrapper in the layout just propagates the variant strings
export const pageVariants = {
  initial: {},
  animate: {},
  exit: {}
};

// Staggered Containers (for Step 9 and Step 14)
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

// Selection Card Micro-interactions
export const cardHover = {
  y: -2,
  boxShadow: '0 8px 24px -4px rgba(37, 99, 235, 0.1)',
  transition: { duration: 0.15, ease: 'easeOut' as const },
};

export const cardTap = {
  scale: 0.97,
  transition: { duration: 0.08 },
};

// Bouncing Checkmark for Selection Cards
export const checkmarkBounce = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 } 
  },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.15 } }
};
