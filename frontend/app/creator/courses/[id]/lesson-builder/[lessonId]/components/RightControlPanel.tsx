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

      {/* PROGRESS CIRCLE & INFO */}
      <div className="flex gap-4 items-center">
        <div className="relative w-[60px] h-[60px] flex items-center justify-center rounded-full border-4 border-gray-100 flex-shrink-0">
           {/* Fake SVG Circle for progress */}
           <svg className="absolute inset-0 w-full h-full transform -rotate-90">
             <circle
               cx="26" cy="26" r="26"
               stroke="currentColor"
               strokeWidth="4"
               fill="transparent"
               className="text-indigo-600"
               strokeDasharray={`${(completion / 100) * 163} 163`}
             />
           </svg>
           <span className="text-sm font-bold text-gray-900">{completion}%</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">Keep going!</h4>
          <p className="text-xs text-gray-500 mt-0.5">Complete all steps to publish this lesson.</p>
        </div>
      </div>

      {/* CHECKLIST */}
      <div className="space-y-3 mt-2">
        <div className="flex items-center gap-3">
          {checks.learn ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
          <span className="text-sm text-gray-700 font-medium">Learn content</span>
        </div>
        <div className="flex items-center gap-3">
          {checks.apply ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
          <span className="text-sm text-gray-700 font-medium">Apply activity</span>
        </div>
        <div className="flex items-center gap-3">
          {checks.reflect ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
          <span className="text-sm text-gray-700 font-medium">Reflect prompt</span>
        </div>
        <div className="flex items-center gap-3">
          {checks.deepen ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-gray-300" />}
          <span className="text-sm text-gray-700 font-medium">Deepen resources</span>
        </div>
      </div>
    </div>
  );
}

export function SystemInfoPanel() {
  return (
    <div className="sidebarCard mt-6 p-6 border border-gray-200 rounded-xl bg-white flex flex-col gap-3">
      <h3 className="font-bold text-gray-900">System Info</h3>
      <p className="text-xs text-gray-500 leading-relaxed">
        XP is automatically calculated by the system based on lesson content and activity type.
      </p>
      <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded px-3 py-2 text-indigo-700 text-xs font-medium mt-1">
        <Star size={14} className="fill-indigo-700" />
        XP will be shown to learners
        <Info size={14} className="ml-auto text-indigo-400" />
      </div>
    </div>
  );
}
