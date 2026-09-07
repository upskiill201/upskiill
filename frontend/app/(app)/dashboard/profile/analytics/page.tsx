'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useAnalyticsDashboard } from './hooks/useAnalyticsDashboard';
import { AnalyticsHero } from './components/AnalyticsHero';
import { LearningSnapshot } from './components/LearningSnapshot';
import { MomentumCard } from './components/MomentumCard';
import { NextBestMove } from './components/NextBestMove';
import { WeeklyGoal } from './components/WeeklyGoal';
import { SkillMap } from './components/SkillMap';
import { LearningDNA } from './components/LearningDNA';
import { ImprovementTrend } from './components/ImprovementTrend';
import { TeyInsights } from './components/TeyInsights';
import { AreasToImprove } from './components/AreasToImprove';
import { LearningBalance } from './components/LearningBalance';
import { PersonalRecords } from './components/PersonalRecords';
import { ActivityChart } from './components/ActivityChart';
import { ActivityHeatmap } from './components/ActivityHeatmap';
import { CardSkeleton } from './components/AnalyticsSkeleton';
import { AnalyticsSectionError } from './components/AnalyticsSectionError';

export default function AnalyticsPage() {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useAnalyticsDashboard();

  const handleBack = () => {
    playHaptic('light');
    router.push('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#1F2A44]">Your Learning Intelligence</h1>
          <p className="text-sm text-[#64748B]">What your learning behaviour means, and what to do next.</p>
        </div>
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#1F2A44] shrink-0"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

      {/* --- Dashboard-sourced sections (one shared fetch) ------------------ */}
      {isLoading && !data ? (
        <>
          <CardSkeleton height={90} />
          <CardSkeleton height={70} />
        </>
      ) : error ? (
        <AnalyticsSectionError label="your learning intelligence" onRetry={() => mutate()} />
      ) : data ? (
        <>
          <AnalyticsHero data={data} />
          <NextBestMove move={data.nextBestMove} />
        </>
      ) : null}

      {/* Independent — loads regardless of the dashboard call's state */}
      <LearningSnapshot />

      {data && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <MomentumCard momentum={data.momentum} />
            <WeeklyGoal goal={data.weeklyGoal} />
          </div>

          <ActivityChart />

          <SkillMap skills={data.skillMap} />

          <TeyInsights insights={data.insights} />
        </>
      )}

      <ActivityHeatmap />

      {data && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <LearningDNA dna={data.learningDna} />
            <ImprovementTrend improvement={data.improvement} />
          </div>

          <AreasToImprove areas={data.areasToImprove} />

          <LearningBalance balance={data.learningBalance} />

          <PersonalRecords records={data.records} />
        </>
      )}
    </div>
  );
}
