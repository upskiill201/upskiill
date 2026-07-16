'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FaRobot, FaRoute, FaGlobe, FaUsers, FaLightbulb, FaAward } from 'react-icons/fa';

const features = [
  {
    icon: FaRobot,
    title: 'Your Personal AI Tutor',
    desc: 'Always there when you need it. Never get stuck again.',
    points: [
      'Explains in YOUR learning style',
      'Knows where you are struggling',
      'Voice mode: talk to AI like a mentor',
      'Works offline with cached knowledge',
    ],
    cta: 'See AI in action',
  },
  {
    icon: FaRoute,
    title: 'Netflix-Level Personalization',
    desc: 'Forget choosing from 10,000 courses. We build your path.',
    points: [
      'Algorithm builds YOUR learning path',
      'Adjusts by your speed & performance',
      'Daily plan: "2 videos + 1 quiz + practice"',
      'Never confused about what to learn next',
    ],
    cta: 'See your path',
  },
  {
    icon: FaGlobe,
    title: 'Works Anywhere in the World',
    desc: 'Slow internet? Limited time? Expensive data? Teyro works regardless.',
    points: [
      'High-quality, low-data streaming + WhatsApp integration',
      'Audio-only & full offline download mode',
      'Mobile money + card + wallet payments',
      'English, French, Spanish & more (expanding)',
    ],
    cta: 'Learn how',
  },
  {
    icon: FaUsers,
    title: 'Learn Together, Grow Together',
    desc: "Community is not a feature — it's the foundation.",
    points: [
      'Peer learning groups & accountability circles',
      'Course communities — ask, share, celebrate',
      'Public profiles to build your identity',
      'Support from instructors AND fellow students',
    ],
    cta: 'Join the community',
  },
  {
    icon: FaLightbulb,
    title: "We Notice When You're Stuck",
    desc: 'Before you quit, Teyro steps in — just like a real teacher would.',
    points: [
      'Tracks repeated rewatches & quiz fails',
      'AI pops up: "This seems tricky, want help?"',
      'Suggests simpler explanations automatically',
      'Saves you right before the drop-off point',
    ],
    cta: 'See how it works',
  },
  {
    icon: FaAward,
    title: 'Certificates That Get You Hired',
    desc: 'Not just a PDF. Verifiable credentials with proof of real work.',
    points: [
      'Shows completion + skills + project portfolio',
      'Client reviews from the marketplace',
      'Verifiable online credential link',
      'Blockchain-ready (NFT credentials — future)',
    ],
    cta: 'See sample cert',
  },
];

export default function WhyTeyro({ onOpenModal }: { onOpenModal?: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const endCard = trackRef.current.lastElementChild as HTMLElement;
        const endCardWidth = endCard ? endCard.clientWidth : 320;
        const maxScroll = trackRef.current.scrollWidth - (window.innerWidth / 2) - (endCardWidth / 2);
        setScrollRange(-maxScroll);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const shouldReduceMotion = useReducedMotion();

  const x = useTransform(progress, [0, 1], shouldReduceMotion ? [0, 0] : [0, scrollRange]);
  const headerOpacity = useTransform(progress, [0, 0.15, 0.3], shouldReduceMotion ? [1, 1, 1] : [1, 1, 0]);
  const headerY = useTransform(progress, [0, 0.2], shouldReduceMotion ? [0, 0] : [0, -30]);

  return (
    <section id="features" className="relative w-full h-[400vh] bg-slate-50/50" ref={containerRef}>
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center overflow-hidden py-16">
        <div className="max-w-[1280px] w-full mx-auto px-6 flex flex-col h-3/4 justify-between">
          
          <motion.div
            className="text-left mb-6 max-w-2xl"
            style={{ opacity: headerOpacity, y: headerY }}
          >
            <div className="text-xs font-black text-[#0172FD] uppercase tracking-wider mb-2">Why Teyro is Different</div>
            <h2 
              className="text-3xl md:text-4xl font-[900] text-[#071233] leading-tight"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Teyro is <em className="text-[#0172FD] not-italic">Edtech 2.0</em>.<br />
              Real outcomes, not just video scrolls.
            </h2>
            <p className="text-sm font-semibold text-slate-400 mt-2">
              Six structural advantages that legacy platforms ignore. We don&apos;t just sell video access; we build a system for <strong>actual achievement</strong>.
            </p>
          </motion.div>

          <motion.div 
            ref={trackRef}
            className="flex gap-6 items-stretch w-max pointer-events-none" 
            style={{ x }}
          >
            {features.map(({ icon: Icon, title, desc, points, cta }, i) => (
              <div 
                key={title} 
                className="w-[320px] md:w-[360px] bg-white border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.015)] rounded-[2rem] p-6 flex flex-col justify-between shrink-0 pointer-events-auto"
              >
                <div>
                  <div className="w-12 h-12 rounded-[12px] bg-blue-50 text-[#0172FD] flex items-center justify-center mb-5 border border-blue-100/50">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-black text-[#071233] mb-2">{title}</h3>
                  <p className="text-xs font-semibold text-slate-400 leading-relaxed mb-4">{desc}</p>
                  
                  <ul className="flex flex-col gap-2.5 my-4">
                    {points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs font-bold text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className="mt-4 text-xs font-black text-[#0172FD] hover:text-[#0060D9] transition-colors flex items-center gap-1.5 self-start cursor-pointer group" 
                  onClick={onOpenModal}
                >
                  <span>{cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
            
            <div className="w-[320px] md:w-[360px] bg-[#EBF3FE] border border-blue-100 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center shrink-0 pointer-events-auto shadow-[0_10px_35px_rgba(1,114,253,0.04)]">
              <h3 className="text-xl font-black text-[#071233] mb-2">That&apos;s Real Magic.</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-6">Ready to experience the difference?</p>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.1rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all cursor-pointer shadow-sm" 
                onClick={onOpenModal}
              >
                JOIN THE WAITLIST
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}