'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, GraduationCap, Mic, CheckCircle2 } from 'lucide-react';

const studentSolutions = [
  'AI Tutor available 24/7 — never get stuck',
  'Clear personalized path (no overwhelm)',
  'Low-data friendly — works on WhatsApp & offline',
  'Real portfolio built while you learn',
  'Earn money immediately after your first course',
  'Skill Gap Analyzer shows exactly what to learn',
  'Gamification & streaks keep you motivated daily',
  'Community of peers at your exact level',
  'Monthly earnings potential on the marketplace',
];

const instructorSolutions = [
  'Reach a global audience (100+ countries)',
  'Built-in community management tools',
  'See exactly where students are struggling',
  'Easy 4-step course creation wizard',
  'Marketing support & organic traffic from blog',
  'Student engagement metrics that actually matter',
  'Direct access to marketplace clients',
];

const revenueStreams = [
  'Direct course sales',
  'Student service marketplace commissions',
  'Content partnerships (coming soon)',
];

export default function RoleSolutions({ onOpenModal }: { onOpenModal?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track vertical scroll over this specific 500vh section wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the progress for cinematic motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // LEFT SIDE: TEXT OPACITIES & Y-SHIFTS
  const studentOpacity = useTransform(smoothProgress, [0, 0.1, 0.4, 0.49], [0, 1, 1, 0]);
  const studentY = useTransform(smoothProgress, [0, 0.1, 0.4, 0.49], [40, 0, 0, -40]);

  const instructorOpacity = useTransform(smoothProgress, [0.51, 0.6, 0.9, 1], [0, 1, 1, 0]);
  const instructorY = useTransform(smoothProgress, [0.51, 0.6, 0.9, 1], [40, 0, 0, -40]);

  // RIGHT SIDE: CARD Y-SHIFTS & OPACITIES
  const cardStudentY = useTransform(smoothProgress, [0, 0.15, 0.4, 0.49], ["80vh", "0vh", "0vh", "-80vh"]);
  const cardStudentOpacity = useTransform(smoothProgress, [0, 0.1, 0.45, 0.49], [0, 1, 1, 0]);

  const cardInstructorY = useTransform(smoothProgress, [0.51, 0.6, 0.85, 1], ["80vh", "0vh", "0vh", "-80vh"]);
  const cardInstructorOpacity = useTransform(smoothProgress, [0.51, 0.58, 0.9, 1], [0, 1, 1, 0]);

  // Derive visibility state
  const [studentVisible, setStudentVisible] = useState(true);
  const [instructorVisible, setInstructorVisible] = useState(false);
  useMotionValueEvent(cardStudentOpacity, 'change', (v) => setStudentVisible(v > 0.1));
  useMotionValueEvent(cardInstructorOpacity, 'change', (v) => setInstructorVisible(v > 0.1));

  return (
    <section id="solutions" className="relative w-full h-[500vh] bg-slate-50/30" ref={containerRef}>
      
      {/* Universal top header */}
      <div className="absolute top-12 left-0 w-full text-center z-20">
        <span className="text-xs font-black text-[#0172FD] bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 uppercase tracking-wider shadow-sm">Solutions for Every Role</span>
      </div>

      {/* The 100vh Sticky Stage that locks into the viewport */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center overflow-hidden py-16 px-6">
        <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center h-3/4">
          
          {/* ===== LEFT: Pinned Desktop Orchestrator ===== */}
          <div className="hidden lg:block relative h-full flex flex-col justify-center items-start">
            
            <div className="relative w-full h-full flex items-center">
              {/* Student Dynamic Text State */}
              <motion.div 
                className="absolute w-full text-left"
                style={{ opacity: studentOpacity, y: studentY }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#0172FD] border border-blue-100 rounded-full text-xs font-bold mb-4 shadow-sm">
                  <GraduationCap size={16} /> <span>For Students</span>
                </div>
                <h2 
                  className="text-4xl font-[900] text-[#071233] leading-none mb-4"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  Learn smart.<br />
                  Earn fast.<br />
                  Build your future.
                </h2>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed max-w-md">
                  We built a learning system that respects your time and actively pulls you towards the finish line. Don&apos;t just watch lectures—verify your skills.
                </p>
              </motion.div>

              {/* Instructor Dynamic Text State */}
              <motion.div 
                className="absolute w-full text-left"
                style={{ opacity: instructorOpacity, y: instructorY }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full text-xs font-bold mb-4 shadow-sm">
                  <Mic size={16} /> <span>For Instructors</span>
                </div>
                <h2 
                  className="text-4xl font-[900] text-[#071233] leading-none mb-4"
                  style={{ fontFamily: 'var(--font-jakarta)' }}
                >
                  Teach more.<br />
                  Earn more.<br />
                  Build your brand.
                </h2>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed max-w-md">
                  Leave behind the platforms that treat you like a commodity and cap your reach. Partner with a network that actually invests in your success.
                </p>
              </motion.div>
            </div>

          </div>

          {/* ===== RIGHT: Orchestrated Cards ===== */}
          <div className="relative h-full flex items-center justify-center pointer-events-none lg:w-full">
            
            <div className="relative w-full max-w-[480px] h-[450px] md:h-[480px] flex items-center justify-center">

              {/* Student Card */}
              <motion.div 
                className="absolute w-full bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)] rounded-[2.2rem] p-6 flex flex-col justify-between h-full pointer-events-auto"
                style={{ 
                  y: cardStudentY, 
                  opacity: cardStudentOpacity,
                  pointerEvents: studentVisible ? 'auto' : 'none'
                }}
                aria-hidden={!studentVisible}
              >
                <div>
                  <p className="text-sm font-semibold italic text-slate-700 leading-relaxed mb-4 border-b border-slate-100 pb-3">
                    &ldquo;I want to learn real skills without wasting time or money.&rdquo;
                  </p>
                  <ul className="flex flex-col gap-2 overflow-y-auto max-h-[220px] pr-2">
                    {studentSolutions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-bold text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-4 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  onClick={onOpenModal}
                >
                  <span>I&apos;m a Student Let Me In</span>
                  <ArrowRight size={16} className="stroke-[3]" />
                </motion.button>
              </motion.div>

              {/* Instructor Card */}
              <motion.div 
                className="absolute w-full bg-[#EEF2FF] border border-blue-100 shadow-[0_20px_50px_rgba(1,114,253,0.04)] rounded-[2.2rem] p-6 flex flex-col justify-between h-full pointer-events-auto"
                style={{ 
                  y: cardInstructorY, 
                  opacity: cardInstructorOpacity,
                  pointerEvents: instructorVisible ? 'auto' : 'none'
                }}
                aria-hidden={!instructorVisible}
              >
                <div>
                  <p className="text-sm font-semibold italic text-slate-700 leading-relaxed mb-4 border-b border-white/50 pb-3">
                    &ldquo;I want to reach more students and actually make good money.&rdquo;
                  </p>
                  <ul className="flex flex-col gap-2 overflow-y-auto max-h-[160px] pr-2 mb-3">
                    {instructorSolutions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-bold text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#0172FD] shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white/60 p-3.5 rounded-[1.2rem] border border-white mt-1">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Multiple Revenue Streams</div>
                    <div className="flex flex-wrap gap-2">
                      {revenueStreams.map((r, i) => (
                        <div key={i} className="text-[9px] font-extrabold text-[#0172FD] bg-blue-50/50 px-2 py-1 rounded-full border border-blue-100/30">
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                  onClick={onOpenModal}
                >
                  <span>I&apos;m an Instructor Let Me In</span>
                  <ArrowRight size={16} className="stroke-[3]" />
                </motion.button>
              </motion.div>

            </div>

          </div>

        </div>
      </div>

      {/* ===== MOBILE FLOW ===== */}
      <div className="lg:hidden w-full py-16 px-6 flex flex-col gap-10">
        
        <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0172FD] border border-blue-100 rounded-full text-xs font-bold mb-3 shadow-sm">
              <GraduationCap size={16} /> <span>For Students</span>
            </div>
            <h2 
              className="text-3xl font-[900] text-[#071233] leading-none mb-2"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Learn smart. Make money.
            </h2>
            <p className="text-sm font-semibold text-slate-500">We actively pull you towards the finish line.</p>
        </div>

        <div className="bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-[2.2rem] p-6 flex flex-col justify-between max-w-md mx-auto w-full">
          <p className="text-sm font-semibold italic text-slate-700 leading-relaxed mb-4 border-b border-slate-100 pb-3">
            &ldquo;I want to learn real skills without wasting time or money.&rdquo;
          </p>
          <ul className="flex flex-col gap-2.5 mb-6">
            {studentSolutions.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs font-bold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-4 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-sm tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            onClick={onOpenModal}
          >
            <span>I&apos;m a Student Let Me In</span>
            <ArrowRight size={16} className="stroke-[3]" />
          </motion.button>
        </div>

        <div className="h-6" />

        <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full text-xs font-bold mb-3 shadow-sm">
              <Mic size={16} /> <span>For Instructors</span>
            </div>
            <h2 
              className="text-3xl font-[900] text-[#071233] leading-none mb-2"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Teach more. Earn more.
            </h2>
            <p className="text-sm font-semibold text-slate-500">Partner with a network that invests in your success.</p>
        </div>

        <div className="bg-[#EEF2FF] border border-blue-100 shadow-[0_10px_30px_rgba(1,114,253,0.02)] rounded-[2.2rem] p-6 flex flex-col justify-between max-w-md mx-auto w-full">
          <p className="text-sm font-semibold italic text-slate-700 leading-relaxed mb-4 border-b border-white/50 pb-3">
            &ldquo;I want to reach more students and actually make good money.&rdquo;
          </p>
          <ul className="flex flex-col gap-2.5 mb-4">
            {instructorSolutions.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs font-bold text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-[#0172FD] shrink-0 mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <div className="bg-white/60 p-4 rounded-[1.2rem] border border-white mt-1 mb-6">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Multiple Revenue Streams</div>
            <div className="flex flex-wrap gap-2">
              {revenueStreams.map((r, i) => (
                <div key={i} className="text-[9px] font-extrabold text-[#0172FD] bg-blue-50/50 px-2.5 py-1.5 rounded-full border border-blue-100/30">
                  {r}
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-[1.2rem] font-[800] text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
            onClick={onOpenModal}
          >
            <span>I&apos;m an Instructor Let Me In</span>
            <ArrowRight size={16} className="stroke-[3]" />
          </motion.button>
        </div>

      </div>

    </section>
  );
}