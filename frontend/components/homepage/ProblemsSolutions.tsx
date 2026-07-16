'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Network, Bot, Zap, Trophy, Briefcase, Plus } from 'lucide-react';
import { MotionValue } from 'framer-motion';

const unifiedProblems = [
  {
    title: 'The Completion Crisis',
    problemText: "94% of people who start an online course never finish. Traditional systems are built to sell content, not to build habits.",
    solutionTitle: 'Habit-Building System',
    solutionText: 'Every lesson uses our Learn-Apply-Reflect-Deepen architecture, engineered to keep you active.',
    icon: <Network className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'The Attention War',
    problemText: 'Passive 40-hour lecture videos cannot compete with highly addictive apps like TikTok or Instagram.',
    solutionTitle: 'Gamified Progression',
    solutionText: 'We harness the same psychology—streaks, leaderboards, and XP rewards—for learning.',
    icon: <Trophy className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'Zero Accountability',
    problemText: 'When a student disappears on a legacy course platform, they are invisible to everyone, including the teacher.',
    solutionTitle: 'Tey AI Learning Enforcer',
    solutionText: 'A pushy, slightly passive-aggressive mascot that detects confusion and keeps you on path.',
    icon: <Bot className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'High-Data Constraints',
    problemText: 'Gigabytes of streaming video courses require fast, expensive connections, leaving billions of learners behind.',
    solutionTitle: 'WhatsApp + Lite Mode',
    solutionText: 'Lessons, practice, and smart reminders sent directly to WhatsApp. 60% bandwidth savings.',
    icon: <Zap className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'Dead-End Certificates',
    problemText: 'Static PDF certificates have zero real-world value. Graduates are left with no clear path to income.',
    solutionTitle: 'The Teyro Bridge',
    solutionText: 'A built-in freelance marketplace. Convert verified skills directly into real freelance work.',
    icon: <Briefcase className="w-6 h-6 text-blue-400" />
  }
];

function AnimatedCard({ item, index, progress, isMobile }: { item: { title: string, problemText: string, solutionTitle: string, solutionText: string, icon: React.ReactNode }; index: number; progress: MotionValue<number>; isMobile: boolean }) {
  // ---- DESKTOP (ORBITAL EXPLOSION) ----
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  const explosionDistX = screenWidth > 1400 ? 500 : 380;
  const explosionDistY = screenHeight > 900 ? 400 : 280;
  
  const angles = [-140, -70, 0, 70, 140];
  const angleDeg = angles[index];
  const angleRad = (angleDeg * Math.PI) / 180;

  const expandX = Math.sin(angleRad) * explosionDistX;
  const expandY = -Math.cos(angleRad) * explosionDistY * 0.7; 

  const settleX = Math.sin(angleRad) * 260;
  const settleY = -Math.cos(angleRad) * 220 * 0.7;

  const midRotate = angleDeg * 0.3; 

  const deskX = useTransform(progress, [0, 0.15, 0.4, 0.8, 1], [0, 0, expandX, expandX, settleX]);
  const deskY = useTransform(progress, [0, 0.15, 0.4, 0.8, 1], [0, 0, expandY, expandY, settleY]);
  const deskRotate = useTransform(progress, [0, 0.15, 0.4, 0.8, 1], [0, 0, midRotate, midRotate, 0]);
  const deskScale = useTransform(progress, [0, 0.05, 0.15, 0.4, 0.8, 1], [0, 0, 0.6, 1.15, 1.15, 1]);
  const deskOpacity = useTransform(progress, [0, 0.05, 0.15, 0.9, 1], [0, 0, 1, 1, 1]);

  // ---- MOBILE (SEQUENTIAL CAROUSEL) ----
  const startTrigger = index * 0.18; 
  const peakTrigger = startTrigger + 0.08;
  const endTrigger = startTrigger + 0.20;
  const fadeOutTrigger = endTrigger + 0.05;

  const slideY = useTransform(
    progress, 
    [0, startTrigger, peakTrigger, endTrigger, index === 4 ? 1 : fadeOutTrigger], 
    [100, 100, 20, 0, index === 4 ? 0 : -50]
  );
  const slideOpacity = useTransform(
    progress, 
    [0, startTrigger, peakTrigger, endTrigger, index === 4 ? 1 : fadeOutTrigger], 
    [0, 0, 1, 1, index === 4 ? 1 : 0]
  );
  const slideScale = useTransform(
    progress, 
    [0, startTrigger, peakTrigger, 1], 
    [0.8, 0.8, 1.05, 1]
  );

  const x = isMobile ? 0 : deskX;
  const y = isMobile ? slideY : deskY;
  const rotate = isMobile ? 0 : deskRotate;
  const scale = isMobile ? slideScale : deskScale;
  const opacity = isMobile ? slideOpacity : deskOpacity;

  return (
    <motion.div
      className="absolute w-[340px] md:w-[480px] bg-[#0E1B3D] border border-slate-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-[1.8rem] p-6 flex flex-col gap-4 pointer-events-auto"
      style={{ x, y, rotate, scale, opacity }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[10px] bg-slate-900/60 border border-slate-800 flex items-center justify-center shrink-0">
          {item.icon}
        </div>
        <h4 className="text-lg font-black text-white">{item.title}</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-rose-400 bg-rose-950/40 border border-rose-900/30 rounded-full px-2 py-0.5 self-start uppercase tracking-wider">✗ The Problem</span>
          <p className="text-xs font-semibold text-slate-400 leading-relaxed mt-1">{item.problemText}</p>
        </div>
        <div className="flex flex-col gap-1 border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-4">
          <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 rounded-full px-2 py-0.5 self-start uppercase tracking-wider">✓ Teyro Solution</span>
          <h5 className="text-xs font-black text-white mt-1">{item.solutionTitle}</h5>
          <p className="text-xs font-semibold text-slate-400 leading-relaxed">{item.solutionText}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProblemsSolutions({ onOpenModal }: { onOpenModal?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const mockupScale = useTransform(progress, [0, 0.15], [0.8, 1]);
  const mockupOpacity = useTransform(progress, [0, 0.1], [0, 1]);
  const headerOpacity = useTransform(progress, [0, 0.1, 0.7, 1], [1, 1, 1, 0.1]);
  const headerY = useTransform(progress, [0, 0.2, 1], [0, -30, -100]);

  return (
    <div className="relative w-full h-[500vh] lg:h-[600vh] bg-[#071233] z-20" ref={containerRef}>
      
      {/* ===== DESKTOP: Sticky Exploded View ===== */}
      <div className="hidden lg:block sticky top-0 left-0 w-full h-screen overflow-hidden py-16 px-6">
        
        {/* Header Content */}
        <motion.div 
          className="text-center mb-8 max-w-2xl mx-auto flex flex-col items-center"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <div className="text-xs font-black text-blue-400 uppercase tracking-wider mb-2">The Problem We Solve</div>
          <h2 
            className="text-3xl md:text-4xl font-[900] text-white leading-tight"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Why legacy course platforms fail.<br />
            Here&apos;s how Teyro fixes it.
          </h2>
          <p className="text-sm font-semibold text-slate-400 mt-2">
            Scroll to dismantle the legacy system and assemble the future.
          </p>
        </motion.div>

        {/* The Machine Stage */}
        <div className="relative w-full h-3/4 flex items-center justify-center pointer-events-none">
          
          {/* Central Mockup (Teyro Engine Core) */}
          <motion.div 
            className="w-52 h-52 bg-[#0E1B3D] border border-slate-800 shadow-[0_20px_50px_rgba(1,114,253,0.15)] rounded-full flex items-center justify-center p-2 relative z-0"
            style={{ scale: mockupScale, opacity: mockupOpacity }}
          >
            <div className="w-full h-full rounded-full border border-slate-800 bg-[#071233]/80 backdrop-blur-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Inner animated ripple */}
              <div className="absolute w-[80%] h-[80%] rounded-full bg-blue-500/10 animate-ping pointer-events-none" />
              <Zap className="w-10 h-10 text-blue-400 fill-blue-400 relative z-10 mb-1" />
              <h3 className="text-xs font-black text-white tracking-wider relative z-10 uppercase">Teyro Engine</h3>
              <p className="text-[10px] font-black text-blue-400 relative z-10">v2.0 Orchestrator</p>
            </div>
          </motion.div>

          {/* Exploding / Sequential Cards */}
          {unifiedProblems.map((item, i) => (
            <AnimatedCard key={i} item={item} index={i} progress={progress} isMobile={isMobile} />
          ))}
        </div>

      </div>

      {/* ===== MOBILE: Clean vertical card stack ===== */}
      <div className="lg:hidden w-full py-16 px-6 flex flex-col gap-10">
        <div className="text-center">
          <div className="text-xs font-black text-blue-400 uppercase tracking-wider mb-2">The Problem We Solve</div>
          <h2 
            className="text-3xl font-[900] text-white leading-tight"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Why legacy course platforms fail.<br />
            Here&apos;s how Teyro fixes it.
          </h2>
          <p className="text-sm font-semibold text-slate-400 mt-2">
            The 5 fatal flaws of online learning — and how Teyro fixes each one.
          </p>
        </div>

        <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
          {unifiedProblems.map((item, i) => (
            <div 
              key={i} 
              className="bg-[#0E1B3D] border border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-[1.8rem] p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-slate-900/60 border border-slate-800 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h4 className="text-lg font-black text-white">
                  <span className="text-blue-400 mr-1.5 font-black">0{i + 1}.</span>
                  {item.title}
                </h4>
              </div>
              
              <div className="flex flex-col gap-3 pt-3 border-t border-slate-800">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-rose-400 bg-rose-950/40 border border-rose-900/30 rounded-full px-2.5 py-0.5 self-start uppercase tracking-wider">✗ The Problem</span>
                  <p className="text-xs font-semibold text-slate-400 leading-relaxed mt-0.5">{item.problemText}</p>
                </div>
                
                <div className="flex flex-col gap-1 border-t border-slate-800 pt-3">
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 rounded-full px-2.5 py-0.5 self-start uppercase tracking-wider">✓ Teyro Fix</span>
                  <h5 className="text-xs font-black text-white mt-1">{item.solutionTitle}</h5>
                  <p className="text-xs font-semibold text-slate-400 leading-relaxed">{item.solutionText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}