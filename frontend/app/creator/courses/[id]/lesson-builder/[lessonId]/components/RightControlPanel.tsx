import React from 'react';
import { CheckCircle2, Circle, Star, Info } from 'lucide-react';

export function RightControlPanel({ lesson }: { lesson: any }) {
  // Calculate completion percentage loosely based on fields
  let completion = 0;
  const checks = {
    learn: !!(lesson?.title && (lesson?.learnVideoUrl || lesson?.learnText)),
    apply: !!lesson?.applyTask,
    reflect: !!lesson?.reflectPrompt,
    deepen: !!(lesson?.deepenResources?.length > 0)
  };

  const totalChecks = Object.values(checks).filter(Boolean).length;
  completion = Math.round((totalChecks / 4) * 100);
  if (completion === 0 && checks.learn) completion = 25; // fallback min if title typed

  return (
    <div className="flex flex-col gap-6">

      {/* PROGRESS CIRCLE */}
      <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg bg-white">
        <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-gray-100 mb-4">
           {/* Fake SVG Circle for progress */}
           <svg className="absolute inset-0 w-full h-full transform -rotate-90">
             <circle
               cx="44" cy="44" r="40"
               stroke="currentColor"
               strokeWidth="8"
               fill="transparent"
               className="text-indigo-600"
               strokeDasharray={`${(completion / 100) * 251} 251`}
             />
           </svg>
           <span className="text-xl font-bold text-gray-900">{completion}%</span>
        </div>
        <h4 className="text-sm font-bold text-gray-900 text-center">Keep going!</h4>
        <p className="text-xs text-gray-500 text-center mt-1">Complete all steps to publish this lesson.</p>
      </div>

      {/* CHECKLIST */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {checks.learn ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
          <span className="text-sm text-gray-700">Learn content</span>
        </div>
        <div className="flex items-center gap-3">
          {checks.apply ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
          <span className="text-sm text-gray-700">Apply activity</span>
        </div>
        <div className="flex items-center gap-3">
          {checks.reflect ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
          <span className="text-sm text-gray-700">Reflect prompt</span>
        </div>
        <div className="flex items-center gap-3">
          {checks.deepen ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
          <span className="text-sm text-gray-700">Deepen resources</span>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* SYSTEM INFO FOR XP */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">System Info</h4>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          XP is automatically calculated by the system based on lesson content and activity type.
        </p>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded p-2 text-indigo-700 text-xs font-medium">
          <Star size={14} className="fill-indigo-700" />
          XP will be shown to learners
          <Info size={14} className="ml-auto text-indigo-400" />
        </div>
      </div>

    </div>
  );
}
