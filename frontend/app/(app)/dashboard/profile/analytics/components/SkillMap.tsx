'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import ProgressBar3D from '@/components/ui/ProgressBar3D';
import { pickSkillMapEmptyLine } from '@/lib/tey/analyticsVoice';
import type { DashboardResponse } from '../types';
import { courseHomeHref } from '@/lib/homeCourse';

const STATUS_DOT: Record<string, string> = {
  growing: 'bg-[#22C55E]',
  slowing: 'bg-[#F59E0B]',
  inactive: 'bg-[#94A3B8]',
  completed: 'bg-[#3D5AFE]',
};

const STATUS_LABEL: Record<string, string> = {
  growing: 'Growing',
  slowing: 'Slowing down',
  inactive: 'Inactive',
  completed: 'Completed',
};

export function SkillMap({ skills }: { skills: DashboardResponse['skillMap'] }) {
  const router = useRouter();

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <h2 className="text-sm font-extrabold text-[#1F2A44] mb-4">Skill Map</h2>

      {skills.length === 0 ? (
        <p className="text-sm text-[#64748B] py-6 text-center">{pickSkillMapEmptyLine()}</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {skills.map((skill) => (
            <button
              key={skill.courseId}
              type="button"
              onClick={() => router.push(courseHomeHref(skill.courseId))}
              className="text-left rounded-lg border border-[#E2E8F0] p-3 hover:border-[#3D5AFE] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                {skill.thumbnailUrl ? (
                  <Image src={skill.thumbnailUrl} alt="" width={28} height={28} className="rounded object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded bg-[#EEF2FF]" />
                )}
                <span className="text-sm font-bold text-[#1F2A44] truncate flex-1">{skill.title}</span>
                {skill.status === 'completed' && <CheckCircle2 size={16} color="#3D5AFE" />}
              </div>
              <ProgressBar3D percentage={skill.progressPercentage} size="sm" color={skill.status === 'completed' ? 'purple' : 'blue'} />
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[skill.status]}`} />
                <span className="text-[11px] font-semibold text-[#64748B]">{STATUS_LABEL[skill.status]}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
