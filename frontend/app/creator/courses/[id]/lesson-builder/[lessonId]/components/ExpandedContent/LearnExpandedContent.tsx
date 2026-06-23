import React from 'react';
import { Play, AlignLeft, Headphones } from 'lucide-react';

interface LearnExpandedContentProps {
  lessonData: any;
}

export const LearnExpandedContent: React.FC<LearnExpandedContentProps> = ({ lessonData }) => {
  const blocks = [];
  
  if (lessonData?.learnVideoUrl) {
    blocks.push({ type: 'Video', title: 'Main Lesson Video', icon: <Play size={14} className="text-blue-500" /> });
  }
  if (lessonData?.learnText) {
    blocks.push({ type: 'Text Block', title: 'Lesson Text', icon: <AlignLeft size={14} className="text-gray-500" /> });
  }
  if (lessonData?.learnAudioUrl) {
    blocks.push({ type: 'Audio', title: 'Lesson Audio', icon: <Headphones size={14} className="text-purple-500" /> });
  }

  if (blocks.length === 0) {
    return <div className="text-[13px] text-gray-500 italic">No content added yet.</div>;
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h5 className="font-semibold text-sm mb-3 text-gray-800">Content Blocks:</h5>
      <ul className="space-y-3">
        {blocks.map((block, idx) => (
          <li key={idx} className="text-[13px] text-gray-600 flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="font-mono text-xs text-gray-400 w-4">{idx + 1}.</span>
            <div className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
              {block.icon}
            </div>
            <div className="flex-1">
              <span className="font-medium text-gray-900 block">{block.title}</span>
              <span className="text-gray-500 text-[12px]">{block.type}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
