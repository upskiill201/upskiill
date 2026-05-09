import React from 'react';
import { Video, Edit3, MessageSquare, PlusSquare, CheckCircle2, Circle } from 'lucide-react';

export function LessonFlowPreview({ lesson }: { lesson: any }) {
  const flowSteps = [
    {
      id: 'learn',
      title: '1. Learn',
      subtitle: 'Current step',
      icon: Video,
      status: lesson?.learnVideoUrl || lesson?.learnText ? 'complete' : 'current',
    },
    {
      id: 'apply',
      title: '2. Apply',
      subtitle: 'Practice & engage',
      icon: Edit3,
      status: lesson?.applyTask ? 'complete' : 'pending',
    },
    {
      id: 'reflect',
      title: '3. Reflect',
      subtitle: 'Think & reinforce',
      icon: MessageSquare,
      status: lesson?.reflectPrompt ? 'complete' : 'pending',
    },
    {
      id: 'deepen',
      title: '4. Deepen',
      subtitle: 'Explore more',
      icon: PlusSquare,
      status: lesson?.deepenResources?.length > 0 ? 'complete' : 'pending',
    }
  ];

  return (
    <div className="flex flex-col gap-3 mt-4">
      {flowSteps.map((step, idx) => {
        const Icon = step.icon;
        const isCurrent = step.status === 'current';

        return (
          <div
            key={step.id}
            className={`p-4 rounded-lg border flex items-center gap-4 transition-all
              ${isCurrent ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-gray-200'}
            `}
          >
            <div className={`p-2 rounded-md ${isCurrent ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
              <Icon size={20} />
            </div>
            <div className="flex-1">
              <h4 className={`text-sm font-semibold ${isCurrent ? 'text-indigo-900' : 'text-gray-900'}`}>{step.title}</h4>
              <p className="text-xs text-gray-500">{step.subtitle}</p>
            </div>
            <div>
              {step.status === 'complete' && <CheckCircle2 size={18} className="text-green-500" />}
              {step.status === 'current' && <span className="text-xs font-medium text-indigo-600 bg-white px-2 py-1 rounded border border-indigo-200">Current step</span>}
              {step.status === 'pending' && <Circle size={18} className="text-gray-300" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
