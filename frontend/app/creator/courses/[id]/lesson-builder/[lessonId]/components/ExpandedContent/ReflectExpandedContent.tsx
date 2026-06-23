import React from 'react';

interface ReflectExpandedContentProps {
  activity: any;
}

export const ReflectExpandedContent: React.FC<ReflectExpandedContentProps> = ({ activity }) => {
  if (!activity || !activity.prompt) {
    return <div className="text-[13px] text-gray-500 italic mt-4 pt-4 border-t border-gray-100">No reflection prompt configured.</div>;
  }

  const isGuided = activity.type === 'guided';

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h5 className="font-semibold text-sm mb-3 text-gray-800">Reflection Details:</h5>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <ul className="space-y-3 text-[13px] text-gray-600 mb-4">
          <li className="flex justify-between border-b border-gray-200 pb-2">
            <strong className="text-gray-700">Type:</strong> 
            <span className="capitalize">{activity.type === 'open' ? 'Open Reflection' : 'Guided Reflection'}</span>
          </li>
          <li className="flex justify-between border-b border-gray-200 pb-2">
            <strong className="text-gray-700">Min Word Count:</strong> 
            <span>{activity.minWordCount || 20} words</span>
          </li>
          <li className="flex justify-between pb-1">
            <strong className="text-gray-700">Required:</strong> 
            <span>Yes</span>
          </li>
        </ul>

        <div className="bg-white p-4 rounded border border-gray-200 text-[13px] mt-2">
          <h6 className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-2">Prompt</h6>
          <p className="text-gray-800 font-medium italic mb-3">"{activity.prompt}"</p>
          
          {isGuided && activity.guidedConfig?.questions && (
            <div className="mt-3 border-t border-gray-100 pt-3">
              <h6 className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-2">Guided Sub-Questions</h6>
              <ul className="space-y-1 pl-4 list-disc text-gray-600">
                {activity.guidedConfig.questions.map((q: any, i: number) => (
                  <li key={i}>{q.text}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="w-full h-20 mt-3 bg-gray-50 border border-gray-200 rounded-md border-dashed flex items-center justify-center text-gray-400 text-[12px]">
            Learner response area
          </div>
        </div>
      </div>
    </div>
  );
};
