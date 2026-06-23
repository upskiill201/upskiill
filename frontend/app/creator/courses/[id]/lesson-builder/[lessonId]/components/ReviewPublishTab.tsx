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
        className="w-full flex items-center justify-between p-5 mb-8 rounded-xl border shadow-md text-white"
        style={{ 
          backgroundColor: '#3D5AFE', 
          borderColor: '#2D4AEE',
          boxShadow: '0 4px 20px rgba(61, 90, 254, 0.15)'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 text-white">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold flex items-center gap-2 text-white">
              Final step! You're almost there <PartyPopper size={16} className="text-blue-200" />
            </h3>
            <p className="text-[14px] mt-0.5 text-blue-100">
              Review your lesson content and publish when you're ready.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-[13px] bg-white/10 text-white border border-white/20">
            <Check size={14} strokeWidth={3} className="text-green-300" />
            Quality Score: {qualityScore}/100
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[18px] font-bold text-gray-900">Lesson Preview</h2>
          <p className="text-[14px] text-gray-500">Review how your lesson will appear to learners.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={expandAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
          >
            <Maximize2 size={14} /> Expand All
          </button>
          <button 
            onClick={collapseAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
          >
            <Minimize2 size={14} /> Collapse All
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
