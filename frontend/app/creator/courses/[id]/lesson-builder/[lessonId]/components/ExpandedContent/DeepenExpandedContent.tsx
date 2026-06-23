import React from 'react';
import { FileText, ExternalLink, Play, Image as ImageIcon } from 'lucide-react';

interface DeepenExpandedContentProps {
  resources: any[];
}

export const DeepenExpandedContent: React.FC<DeepenExpandedContentProps> = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return <div className="text-[13px] text-gray-500 italic mt-4 pt-4 border-t border-gray-100">No resources provided.</div>;
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'video': return <Play size={14} className="text-red-500" />;
      case 'image': return <ImageIcon size={14} className="text-blue-500" />;
      case 'link': return <ExternalLink size={14} className="text-green-500" />;
      default: return <FileText size={14} className="text-gray-500" />;
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h5 className="font-semibold text-sm mb-3 text-gray-800">Resources:</h5>
      <ul className="space-y-2">
        {resources.map((r, idx) => (
          <li key={idx} className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-[13px]">
            <span className="font-mono text-xs text-gray-400 w-4">{idx + 1}.</span>
            <div className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
              {getIconForType(r.type)}
            </div>
            <div className="flex-1 truncate">
              <div className="font-medium text-gray-800 truncate">{r.title || r.originalName || 'Resource'}</div>
              <div className="text-[11px] text-gray-500 uppercase flex items-center gap-1.5 mt-0.5">
                <span className="font-medium">{r.type}</span>
                {r.estimatedReadMin && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span>{r.estimatedReadMin} min</span>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
