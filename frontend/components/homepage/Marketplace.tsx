'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useId, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

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
  
  // Unique IDs for SVG gradients
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
    <section id="marketplace" className="relative w-full py-24 bg-white z-20" ref={containerRef}>
      
      {/* Header Context */}
      <div className="max-w-[1280px] w-full mx-auto px-6">
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-black text-[#0172FD] uppercase tracking-wider mb-2">Teyro Marketplace</div>
          <h2 
            className="text-3xl md:text-4xl font-[900] text-[#071233] leading-tight"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Beyond Courses. Services.<br />
            <span className="text-[#0172FD]" style={{ textShadow: '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.1)' }}>
              Real Income.
            </span>
          </h2>
          <p className="text-sm font-semibold text-slate-400 mt-3 leading-relaxed">
            Why wait years for a degree? After passing a Teyro skill module, you can immediately offer your newly verified skills to real clients around the world.
          </p>
        </motion.div>

        {/* The Scrolling SVG Journey Timeline */}
        <div className="relative w-full max-w-[800px] mx-auto min-h-[1200px] mt-10">
          
          {/* THE SVG LAYERS */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Desktop S-Curve SVG */}
            <svg 
              className="hidden md:block w-full h-full"
              viewBox="0 0 100 1000" 
              preserveAspectRatio="none"
            >
              {/* Background Track (Faded) */}
              <path 
                d="M 50 0 Q 30 83, 50 166 Q 70 249, 50 332 Q 30 415, 50 498 Q 70 581, 50 664 Q 30 747, 50 830 Q 70 915, 50 1000" 
                fill="none" 
                stroke="#E2E8F0" 
                strokeWidth="4" 
                vectorEffect="non-scaling-stroke"
              />
              {/* Animated Glowing Track mapped to scroll */}
              <motion.path 
                d="M 50 0 Q 30 83, 50 166 Q 70 249, 50 332 Q 30 415, 50 498 Q 70 581, 50 664 Q 30 747, 50 830 Q 70 915, 50 1000" 
                fill="none" 
                stroke="#0172FD" 
                strokeWidth="4" 
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
              />
            </svg>
             
            {/* Mobile SVG — positioned to the left edge */}
            <svg 
              className="md:hidden w-10 h-full absolute left-4"
              viewBox="0 0 10 1000" 
              preserveAspectRatio="none"
            >
              <path d="M 5 0 L 5 1000" fill="none" stroke="#E2E8F0" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              <motion.path d="M 5 0 L 5 1000" fill="none" stroke="#0172FD" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength }} />
            </svg>
          </div>

          {/* HTML Card Nodes mapped to the curve apexes */}
          <div className="relative z-10 flex flex-col gap-12 md:gap-0 h-full justify-between py-6">
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
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-5 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(1,114,253,0.25)] cursor-pointer"
            onClick={onOpenModal}
          >
            <span>Start Earning on the Marketplace</span>
            <ArrowRight size={18} className="stroke-[3]" />
          </motion.button>
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
      className={`relative flex items-center w-full md:w-1/2 md:even:self-start md:odd:self-end pl-12 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right md:flex-row-reverse' : 'md:pl-16 md:text-left md:flex-row'}`}
      ref={nodeRef}
    >
      {/* Visual Dot on the line passing through */}
      <motion.div 
        className="absolute left-[13px] md:left-auto md:right-auto md:absolute md:w-6 md:h-6 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center z-20"
        style={{
          left: typeof window !== 'undefined' && window.innerWidth >= 768 ? (isLeft ? 'calc(100% - 12px)' : 'calc(-12px)') : '13px'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#0172FD] animate-pulse" />
      </motion.div>

      {/* The Feature Card with enhanced 3D hover interactivity */}
      <motion.div 
        className="w-full bg-slate-50/60 border border-slate-200/80 rounded-[1.8rem] p-6 shadow-sm text-left flex flex-col"
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        whileHover={{ 
          scale: 1.02, 
          y: -4,
          borderColor: "#0172FD",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 15px 30px rgba(1, 114, 253, 0.04)"
        }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="text-[10px] font-black text-[#0172FD] uppercase tracking-wider mb-1">
           Step 0{index + 1}
        </div>
        <h3 className="text-base font-black text-[#071233] mb-1">{feature.title}</h3>
        <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-3">{feature.desc}</p>
        
        <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#0172FD] bg-blue-50/50 border border-blue-100/30 rounded-full px-2.5 py-1 self-start">
           <CheckCircle2 size={12} className="stroke-[2.5]" /> <span>Coming in Phase 3</span>
        </div>
      </motion.div>
    </div>
  )
}

