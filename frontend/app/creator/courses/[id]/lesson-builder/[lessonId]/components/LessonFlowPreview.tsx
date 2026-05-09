import React from 'react';
import { Video, MousePointer2, MessageSquare, Cloud } from 'lucide-react';

export function LessonFlowPreview({ lesson }: { lesson: any }) {
  const flowSteps = [
    {
      id: 'learn',
      title: '1. Learn',
      subtitle: 'Current step',
      icon: Video,
      isCurrent: true,
      hasContent: !!(lesson?.learnVideoUrl || lesson?.learnText),
    },
    {
      id: 'apply',
      title: '2. Apply',
      subtitle: 'Practice & engage',
      icon: MousePointer2,
      isCurrent: false,
      hasContent: !!lesson?.applyTask,
    },
    {
      id: 'reflect',
      title: '3. Reflect',
      subtitle: 'Think & reinforce',
      icon: MessageSquare,
      isCurrent: false,
      hasContent: !!lesson?.reflectPrompt,
    },
    {
      id: 'deepen',
      title: '4. Deepen',
      subtitle: 'Explore more',
      icon: Cloud,
      isCurrent: false,
      hasContent: !!(lesson?.deepenResources?.length > 0),
    }
  ];

  return (
    <div className="flex flex-col gap-3">
      {flowSteps.map((step) => {
        const Icon = step.icon;

        return (
          <div
            key={step.id}
            className={`p-3 rounded-lg border flex items-center gap-4 transition-all
              ${step.isCurrent ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-100'}
            `}
          >
            <div className={`w-8 h-8 rounded-md flex items-center justify-center ${step.isCurrent ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
              <Icon size={16} />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h4 className={`text-sm font-bold ${step.isCurrent ? 'text-indigo-900' : 'text-gray-900'}`}>{step.title}</h4>
                <p className="text-xs text-gray-500">{step.subtitle}</p>
              </div>
              {step.isCurrent && <span className="text-[10px] font-medium text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-200">Current step</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
