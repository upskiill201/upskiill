'use client';

import { motion, useSpring, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, X, Check, Minus } from 'lucide-react';

const comparison = [
  { feature: 'AI Tutor (24/7)', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Personalized Learning Path', Teyro: '✓', coursera: '~', udemy: '✗' },
  { feature: 'Offline + Low-Data Mode', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Earn While You Learn', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Skill Gap Analyzer', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Works Anywhere (WhatsApp + Lite)', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Gamified Progression & Streaks', Teyro: '✓', coursera: '~', udemy: '✗' },
];

function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');
  const numericValue = parseInt(value.replace('k', '')) * (value.includes('k') ? 1000 : 1);
  const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 18 });

  useEffect(() => {
    const unsub = spring.on('change', (latest) => {
      const num = Math.round(latest);
      if (value.includes('k')) {
        setDisplay(num >= 1000 ? Math.floor(num / 1000) + 'k' : String(num));
      } else {
        setDisplay(String(num));
      }
    });
    return unsub;
  }, [spring, value]);

  useEffect(() => {
    if (isInView) spring.set(numericValue);
  }, [isInView, numericValue, spring]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-[900] text-[#0172FD] tracking-tight block mb-2">
      {display}{suffix}
    </span>
  );
}

function RenderTableCellVal({ val }: { val: string }) {
  if (val === '✓') {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500">
        <Check className="w-5 h-5 stroke-[3]" />
      </span>
    );
  }
  if (val === '✗') {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 border border-rose-100 text-rose-500">
        <X className="w-5 h-5 stroke-[3]" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 border border-amber-100 text-amber-500">
      <Minus className="w-5 h-5 stroke-[3]" />
    </span>
  );
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/webhook/count');
        const data = await res.json();
        setWaitlistCount(data.count);
      } catch (error) {
        setWaitlistCount(0);
      }
    };
    fetchCount();
  }, []);

  const stats = [
    { value: '75', suffix: '%', label: 'Target Completion Rate', sub: 'vs 1%–13% industry range' },
    { value: '8', suffix: ' wks', label: 'Time to Mastery', sub: 'vs 6–12 months elsewhere' },
    { value: waitlistCount === null ? '0' : String(waitlistCount), suffix: '', label: 'On the Waitlist', sub: 'and growing every day' },
    { value: '60', suffix: '%', label: 'Bandwidth Savings', sub: 'with Lite Mode enabled' },
  ];

  // Scroll animations for cards stacking deck
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const card1Y = useTransform(smoothProgress, [0, 1], ['0vh', '0vh']);
  const card2Y = useTransform(smoothProgress, [0, 0.3, 0.6], ['40vh', '40vh', '0vh']);
  const card3Y = useTransform(smoothProgress, [0, 0.6, 0.9], ['80vh', '80vh', '0vh']);
  
  const card2Opacity = useTransform(smoothProgress, [0.3, 0.45], [0, 1]);
  const card3Opacity = useTransform(smoothProgress, [0.6, 0.75], [0, 1]);

  return (
    <section className="relative w-full h-[300vh] bg-slate-50/50" ref={containerRef}>
      {/* Sticky Stage locks to the viewport during the entire scroll duration */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden py-16 px-6">
        <div className="max-w-[1020px] w-full mx-auto flex flex-col h-full justify-between py-6">
          
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs font-black text-[#0172FD] uppercase tracking-wider mb-2">Real Results, Really Fast</div>
            <h2 
              className="text-3xl md:text-4xl font-[900] text-[#071233] leading-tight"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Built for Real Outcomes, Not Just Attendance
            </h2>
          </motion.div>

          {/* Absolute stacking deck area */}
          <div className="relative flex-1 w-full flex items-center justify-center min-h-[360px] md:min-h-[420px]">
            
            {/* CARD 1: Stats Grid */}
            <motion.div 
              className="absolute w-full bg-white border border-slate-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-[2rem] p-6 md:p-10"
              style={{ y: card1Y, zIndex: 10 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {stats.map(({ value, suffix, label, sub }, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50/60 rounded-[1.2rem] border border-slate-100"
                    role="region"
                    aria-label={`${label}: ${value}${suffix}`}
                  >
                    <AnimatedNumber value={value} suffix={suffix} />
                    <div className="text-sm font-black text-slate-800 mb-1">{label}</div>
                    <div className="text-xs font-semibold text-slate-400 leading-normal">{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 2: Industry Problem Context */}
            <motion.div 
              className="absolute w-full bg-[#EBF3FE] border border-blue-100 rounded-[2rem] p-6 md:p-10 shadow-[0_15px_40px_rgba(1,114,253,0.04)]"
              style={{ y: card2Y, opacity: card2Opacity, zIndex: 20 }}
            >
              <div className="flex flex-col justify-center h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="bg-white/60 p-5 rounded-[1.2rem] border border-white relative">
                    <p className="text-sm font-semibold italic text-slate-700 leading-relaxed">
                      &ldquo;The dirty little secret of edtech: the biggest names don’t actually care if you learn anything… video courses have a fatal flaw: they only work for the most motivated. 4-10% completion rates!&rdquo;
                    </p>
                    <span className="block text-xs font-extrabold text-slate-500 mt-3">— Gagan Biyani, Co-founder of Udemy</span>
                  </div>
                  <div className="bg-white/60 p-5 rounded-[1.2rem] border border-white relative">
                    <p className="text-sm font-semibold italic text-slate-700 leading-relaxed">
                      &ldquo;The pattern is clear — people sign up with hope, then ghost because the format doesn’t stick. We keep shipping more content into a world that has too much of it.&rdquo;
                    </p>
                    <span className="block text-xs font-extrabold text-slate-500 mt-3">— Joel Ndakwe, Founder of Teyro</span>
                  </div>
                </div>
                <div className="text-center text-sm font-black text-[#0172FD]">
                  Traditional platforms sell hope and videos. Teyro is engineered for habit-building.
                </div>
              </div>
            </motion.div>

            {/* CARD 3: Comparison table */}
            <motion.div 
              className="absolute w-full bg-white border border-slate-200/60 rounded-[2rem] p-5 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] overflow-hidden"
              style={{ y: card3Y, opacity: card3Opacity, zIndex: 30 }}
            >
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-black text-slate-400 tracking-wider">
                      <th className="pb-3 pr-4">Feature</th>
                      <th className="pb-3 px-4 text-[#0172FD] font-black bg-blue-50/50 rounded-t-xl text-center">✦ Teyro</th>
                      <th className="pb-3 px-4 text-center">Coursera</th>
                      <th className="pb-3 px-4 text-center">Udemy</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold text-slate-600">
                    {comparison.map(({ feature, Teyro, coursera, udemy }) => (
                      <tr key={feature} className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/30 transition-colors">
                        <td className="py-3.5 pr-4 text-xs md:text-sm font-bold text-slate-800">{feature}</td>
                        <td className="py-3.5 px-4 bg-blue-50/20 text-center">
                          <RenderTableCellVal val={Teyro} />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <RenderTableCellVal val={coursera} />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <RenderTableCellVal val={udemy} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}