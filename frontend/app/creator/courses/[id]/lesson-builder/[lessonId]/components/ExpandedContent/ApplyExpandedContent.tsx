import React from 'react';

interface ApplyExpandedContentProps {
  activity: any;
}

export const ApplyExpandedContent: React.FC<ApplyExpandedContentProps> = ({ activity }) => {
  if (!activity || !activity.questions || activity.questions.length === 0) {
    return <div className="text-[13px] text-gray-500 italic mt-4 pt-4 border-t border-gray-100">No practice activity configured.</div>;
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h5 className="font-semibold text-sm mb-3 text-gray-800">Activity Details:</h5>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <ul className="space-y-2 text-[13px] text-gray-600 mb-4">
          <li className="flex justify-between border-b border-gray-200 pb-2">
            <strong className="text-gray-700">Type:</strong> 
            <span>Multiple Choice Question (MCQ)</span>
          </li>
          <li className="flex justify-between border-b border-gray-200 pb-2">
            <strong className="text-gray-700">Questions:</strong> 
            <span>{activity.questions.length}</span>
          </li>
          <li className="flex justify-between border-b border-gray-200 pb-2">
            <strong className="text-gray-700">Passing Score:</strong> 
            <span>{activity.passingScore || 80}%</span>
          </li>
          <li className="flex justify-between pb-1">
            <strong className="text-gray-700">Allow Retries:</strong> 
            <span>Yes</span>
          </li>
        </ul>
        
        <h6 className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-2">Preview (First 2 Questions)</h6>
        <div className="space-y-2">
          {activity.questions.slice(0, 2).map((q: any, idx: number) => (
            <div key={idx} className="bg-white p-3 rounded border border-gray-200 text-[13px]">
              <div className="font-medium text-gray-800 mb-1">Q{idx + 1}: {q.questionText}</div>
              <div className="text-gray-500 pl-4 border-l-2 border-gray-100 text-[12px]">
                {q.options?.length || 4} Options available
              </div>
            </div>
          ))}
          {activity.questions.length > 2 && (
            <div className="text-[12px] text-gray-500 text-center py-1 font-medium bg-gray-100 rounded border border-gray-200">
              + {activity.questions.length - 2} more questions
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
