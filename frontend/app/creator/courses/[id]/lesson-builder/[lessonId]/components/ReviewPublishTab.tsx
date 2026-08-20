import React, { useEffect, useRef, useState } from 'react';
import styles from './ReviewPublish.module.css';
import { 
  Check, Play, FileText, MonitorPlay, Headphones, ChevronDown, 
  ChevronUp, Edit2, Info, ArrowRight, Sparkles, Maximize2, Minimize2,
  PartyPopper
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { PhaseCard } from './PhaseCard';
import { LearnExpandedContent } from './ExpandedContent/LearnExpandedContent';
import { ApplyExpandedContent } from './ExpandedContent/ApplyExpandedContent';
import { ReflectExpandedContent } from './ExpandedContent/ReflectExpandedContent';
import { DeepenExpandedContent } from './ExpandedContent/DeepenExpandedContent';

interface ReviewPublishTabProps {
  lessonData: any;
  mcqActivity: any;
  reflectActivity: any;
  deepenConfig: any;
  resources: any[];
  onEditPhase: (phase: string) => void;
  qualityScore: number;
}

export function ReviewPublishTab({
  lessonData,
  mcqActivity,
  reflectActivity,
  deepenConfig,
  resources,
  onEditPhase,
  qualityScore
}: ReviewPublishTabProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});

  const togglePhase = (phase: string) => {
    setExpandedPhases(prev => ({ ...prev, [phase]: !prev[phase] }));
  };

  const expandAll = () => {
    setExpandedPhases({ learn: true, apply: true, reflect: true, deepen: true });
  };

  const collapseAll = () => {
    setExpandedPhases({});
  };

  // Quality score visual mapping
  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getQualityIconColor = (score: number) => {
    if (score >= 90) return '#16a34a'; // green-600
    if (score >= 70) return '#d97706'; // amber-600
    return '#dc2626'; // red-600
  };

  useEffect(() => {
    // GSAP animations for the tab contents
    const ctx = gsap.context(() => {
      // Banner drops down
      if (bannerRef.current) {
        gsap.from(bannerRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // Cards slide in with stagger
      if (cardsRef.current.length > 0) {
        gsap.from(cardsRef.current, {
          x: -30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const hasLearnContent = !!(lessonData?.learnVideoUrl || lessonData?.learnText || lessonData?.learnAudioUrl);
  const hasApplyContent = mcqActivity?.questions?.length > 0;
  const hasReflectContent = !!reflectActivity?.prompt;
  const hasDeepenContent = resources?.length > 0;

  return (
    <div className={styles.container} ref={containerRef}>
      
      {/* Celebration Banner */}
      <div 
        ref={bannerRef}
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 mb-5 rounded-[18px] border-2 border-[#0172FD] border-b-4 border-b-[#0050B3] text-white bg-[#0172FD] shadow-[0_4px_16px_rgba(1,114,253,0.15)] gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/20 text-white shrink-0">
            <Sparkles size={18} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-[14.5px] font-extrabold flex items-center gap-2 text-white font-[family-name:var(--font-jakarta)]">
              Final step! You're almost ready <PartyPopper size={16} className="text-blue-100" />
            </h3>
            <p className="text-[12px] mt-0.5 text-blue-100">
              Review your lesson curriculum and publish when you're ready.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-[12px] bg-white/15 text-white border border-white/25 font-[family-name:var(--font-jakarta)]">
            <Check size={13} strokeWidth={3} className="text-green-300" />
            Quality Score: {qualityScore}/100
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
        <div>
          <h2 className="text-[14.5px] font-extrabold text-[#0F172A] font-[family-name:var(--font-jakarta)]">Lesson Preview</h2>
          <p className="text-[11.5px] text-[#64748B]">Review how your lesson will appear to learners.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={expandAll}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11.5px] font-bold text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg transition-colors border border-[#CBD5E1] font-[family-name:var(--font-jakarta)]"
          >
            <Maximize2 size={12} /> Expand All
          </button>
          <button 
            onClick={collapseAll}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11.5px] font-bold text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg transition-colors border border-[#CBD5E1] font-[family-name:var(--font-jakarta)]"
          >
            <Minimize2 size={12} /> Collapse All
          </button>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className={styles.cardsContainer} ref={(el) => {
        if (el && !cardsRef.current.includes(el)) {
          cardsRef.current.push(el);
        }
      }}>
        
        {/* Phase 1: Learn */}
        <PhaseCard
          phase="learn"
          phaseNumber={1}
          title="LEARN – Teach the Concept"
          description="Introduce the core idea with engaging content."
          contentSummary={[
            lessonData?.learnVideoUrl ? '1 Video' : null,
            lessonData?.learnText ? '1 Text Block' : null,
            lessonData?.learnAudioUrl ? '1 Audio' : null
          ].filter(Boolean) as string[]}
          estimatedMinutes={lessonData?.durationMinutes || 0}
          isCompleted={hasLearnContent}
          isExpanded={!!expandedPhases['learn']}
          onEdit={() => onEditPhase('learn')}
          onToggleExpand={() => togglePhase('learn')}
          icon={<BookOpen size={20} />}
          expandedContent={<LearnExpandedContent lessonData={lessonData} />}
        />

        {/* Phase 2: Apply */}
        <PhaseCard
          phase="apply"
          phaseNumber={2}
          title="APPLY – Engage with Practice"
          description="Learners practice what they learned."
          contentSummary={hasApplyContent ? [`${mcqActivity?.questions?.length} Multiple Choice Question(s)`] : ['No activities added yet']}
          estimatedMinutes={5}
          isCompleted={hasApplyContent}
          isExpanded={!!expandedPhases['apply']}
          onEdit={() => onEditPhase('apply')}
          onToggleExpand={() => togglePhase('apply')}
          icon={<Edit2 size={20} />}
          expandedContent={<ApplyExpandedContent activity={mcqActivity} />}
        />

        {/* Phase 3: Reflect */}
        <PhaseCard
          phase="reflect"
          phaseNumber={3}
          title="REFLECT – Reinforce Learning"
          description="Learners reflect and articulate their understanding."
          contentSummary={hasReflectContent ? [`1 Reflection Prompt (${reflectActivity?.type === 'open' ? 'Open-ended' : 'Guided'})`] : ['No prompt added yet']}
          estimatedMinutes={3}
          isCompleted={hasReflectContent}
          isExpanded={!!expandedPhases['reflect']}
          onEdit={() => onEditPhase('reflect')}
          onToggleExpand={() => togglePhase('reflect')}
          icon={<FileText size={20} />}
          expandedContent={<ReflectExpandedContent activity={reflectActivity} />}
        />

        {/* Phase 4: Deepen */}
        <PhaseCard
          phase="deepen"
          phaseNumber={4}
          title="DEEPEN – Provide More Resources"
          description="Extra materials to explore and master the topic."
          contentSummary={hasDeepenContent ? [`${resources?.length} Resource(s)`] : ['Optional - no resources added']}
          estimatedMinutes={resources?.reduce((acc: number, r: any) => acc + (r.estimatedReadMin || 0), 0)}
          isCompleted={hasDeepenContent}
          isExpanded={!!expandedPhases['deepen']}
          onEdit={() => onEditPhase('deepen')}
          onToggleExpand={() => togglePhase('deepen')}
          icon={<BookOpen size={20} />}
          expandedContent={<DeepenExpandedContent resources={resources} />}
        />

      </div>

    </div>
  );
}

// Subcomponent missing from Lucide standard export in some versions
function BookOpen(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
}
