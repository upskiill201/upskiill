'use client';

import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'framer-motion';
import { useId, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './Marketplace.module.css';

const features = [
  { title: 'Service Packages', desc: 'Basic, Standard, Premium pricing tiers for every skill' },
  { title: 'Verified Skill Badges', desc: 'AI + instructor validated credentials clients trust' },
  { title: 'Client Rating System', desc: 'Build your reputation with every completed project' },
  { title: 'Secure Escrow Payments', desc: 'Get paid safely — Teyro holds funds until delivery' },
  { title: 'Transparent Commission', desc: 'Only 15–20% platform fee, displayed upfront' },
  { title: 'Seller Levels', desc: 'Rookie → Rising Star → Expert — gamify your growth' },
];

export default function Marketplace({ onOpenModal }: { onOpenModal?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Each SVG root must declare its own gradient — IDs are scoped to the SVG document
  // Using useId() generates stable, unique IDs even with multiple instances on a page
  const desktopGradientId = useId();
  const mobileGradientId = useId();

  // Track the scroll specifically over the timeline wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"]
  });

  // Smooth the drawing animation of the glowing SVG thread
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 70, damping: 20, restDelta: 0.001
  });

  return (
    <section className={styles.section} ref={containerRef}>
      
      {/* Header Context */}
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.eyebrow}>Teyro Marketplace</div>
          <h2 className={styles.heading}>
            Beyond Courses. Services.<br />
            <em>Real Income.</em>
          </h2>
          <p className={styles.subheading}>
            Why wait years for a degree? After passing a Teyro skill module, you can immediately offer your newly verified skills to real clients around the world.
          </p>
        </motion.div>

        {/* The Scrolling SVG Journey Timeline */}
        <div className={styles.timelineWrapper}>
          
          {/* THE SVG LAYERS */}
          <div className={styles.svgLayer}>

            {/* Desktop S-Curve SVG — each SVG root owns its own gradient definition */}
            <svg 
               className={styles.desktopSvg}
               viewBox="0 0 100 1000" 
               preserveAspectRatio="none"
             >
               <defs>
                 <linearGradient id={desktopGradientId} x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#818cf8" />
                   <stop offset="50%" stopColor="#c084fc" />
                   <stop offset="100%" stopColor="#ec4899" />
                 </linearGradient>
               </defs>
               {/* Background Track (Faded) */}
               <path 
                 d="M 50 0 Q 30 83, 50 166 Q 70 249, 50 332 Q 30 415, 50 498 Q 70 581, 50 664 Q 30 747, 50 830 Q 70 915, 50 1000" 
                 fill="none" 
                 stroke="rgba(99, 82, 255, 0.1)" 
                 strokeWidth="4" 
                 vectorEffect="non-scaling-stroke"
               />
               {/* Animated Glowing Track mapped to scroll */}
               <motion.path 
                 d="M 50 0 Q 30 83, 50 166 Q 70 249, 50 332 Q 30 415, 50 498 Q 70 581, 50 664 Q 30 747, 50 830 Q 70 915, 50 1000" 
                 fill="none" 
                 stroke={`url(#${desktopGradientId})`} 
                 strokeWidth="4" 
                 vectorEffect="non-scaling-stroke"
                 style={{ pathLength }}
               />
             </svg>
             
             {/* Mobile SVG — positioned to the left edge so dots align with the line */}
             <svg 
               className={styles.mobileSvg}
               viewBox="0 0 10 1000" 
               preserveAspectRatio="none"
             >
               <defs>
                 <linearGradient id={mobileGradientId} x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#818cf8" />
                   <stop offset="50%" stopColor="#c084fc" />
                   <stop offset="100%" stopColor="#ec4899" />
                 </linearGradient>
               </defs>
               <path d="M 5 0 L 5 1000" fill="none" stroke="rgba(99, 82, 255, 0.1)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
               <motion.path d="M 5 0 L 5 1000" fill="none" stroke={`url(#${mobileGradientId})`} strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength }} />
             </svg>
          </div>

          {/* HTML Card Nodes mapped to the curve apexes */}
          <div className={styles.nodesContainer}>
            {features.map((feature, i) => {
              const isLeft = i % 2 !== 0; // Alternate staggering on Desktop
              
              return (
                <TimelineNode key={i} index={i} isLeft={isLeft} feature={feature} />
              )
            })}
          </div>

        </div>

        {/* Closing CTA */}
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button className={styles.ctaBtn} onClick={onOpenModal}>
            Start Earning on the Marketplace <ArrowRight size={18} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

// Sub-component for individual timeline nodes
function TimelineNode({ index, isLeft, feature }: { index: number, isLeft: boolean, feature: { title: string; desc: string } }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { margin: "-20% 0px -20% 0px", once: true });

  return (
    <div 
      className={`${styles.nodeWrapper} ${isLeft ? styles.alignLeft : styles.alignRight}`}
      ref={nodeRef}
    >
      {/* Visual Dot on the line passing through */}
      <motion.div 
        className={styles.nodeDot}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <div className={styles.innerDot} />
      </motion.div>

      {/* The Feature Card with enhanced 3D hover interactivity */}
      <motion.div 
        className={styles.nodeCard}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        whileHover={{ 
          scale: 1.03, 
          y: -8,
          boxShadow: "0 20px 40px rgba(99, 82, 255, 0.15)",
          borderColor: "#A78BFA"
        }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className={styles.cardContext}>
           Step 0{index + 1}
        </div>
        <h3 className={styles.cardTitle}>{feature.title}</h3>
        <p className={styles.cardDesc}>{feature.desc}</p>
        
        <div className={styles.cardCheck}>
           <CheckCircle2 size={16} /> Coming in Phase 3
        </div>
      </motion.div>
    </div>
  )
}
