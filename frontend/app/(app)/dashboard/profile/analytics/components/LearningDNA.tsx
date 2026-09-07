import { Dna } from 'lucide-react';
import { getLearningDnaCopy } from '@/lib/tey/analyticsVoice';
import type { DashboardResponse } from '../types';

const TIME_BLOCK_LABEL: Record<string, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  night: 'Late night',
};

export function LearningDNA({ dna }: { dna: DashboardResponse['learningDna'] }) {
  const copy = getLearningDnaCopy(dna.archetype);
  const insufficient = dna.archetype === 'insufficient_data';

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <Dna size={18} color="#9333EA" />
        <h2 className="text-sm font-extrabold text-[#1F2A44]">Your Learning DNA</h2>
      </div>

      <p className="text-base font-extrabold text-[#1F2A44]">{copy.label}</p>
      <p className="text-sm text-[#64748B] mb-4">{copy.blurb}</p>

      {!insufficient && (
        <div className="grid grid-cols-3 gap-2 text-center">
          {dna.mostActiveDay && (
            <div className="rounded-lg bg-[#F5F7FB] py-2">
              <p className="text-xs font-bold text-[#1F2A44]">{dna.mostActiveDay.slice(0, 3)}</p>
              <p className="text-[10px] text-[#94A3B8]">Best day</p>
            </div>
          )}
          {dna.mostActiveTimeBlock && (
            <div className="rounded-lg bg-[#F5F7FB] py-2">
              <p className="text-xs font-bold text-[#1F2A44]">{TIME_BLOCK_LABEL[dna.mostActiveTimeBlock]}</p>
              <p className="text-[10px] text-[#94A3B8]">Peak time</p>
            </div>
          )}
          {dna.avgSessionMinutes !== null && (
            <div className="rounded-lg bg-[#F5F7FB] py-2">
              <p className="text-xs font-bold text-[#1F2A44]">~{dna.avgSessionMinutes}m</p>
              <p className="text-[10px] text-[#94A3B8]">Per lesson</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
