import React from 'react';
import { ChevronDown, Check, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhaseCardProps {
  phase: 'learn' | 'apply' | 'reflect' | 'deepen';
  phaseNumber: number;
  title: string;
  description: string;
  contentSummary: string[];
  estimatedMinutes: number;
  isCompleted: boolean;
  isExpanded: boolean;
  onEdit: () => void;
  onToggleExpand: () => void;
  icon: React.ReactNode;
  expandedContent?: React.ReactNode;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  phaseNumber,
  title,
  description,
  contentSummary,
  estimatedMinutes,
  isCompleted,
  isExpanded,
  onEdit,
  onToggleExpand,
  icon,
  expandedContent,
}) => {
  const phaseColors = {
    learn: 'border-green-500 text-green-600', // Image shows green check
    apply: 'border-blue-600 text-blue-600',
    reflect: 'border-amber-500 text-amber-500',
    deepen: 'border-blue-500 text-blue-500', // Deepen is blue in image
  };

  const phaseBgColors = {
    learn: 'bg-green-600',
    apply: 'bg-blue-600',
    reflect: 'bg-amber-500',
    deepen: 'bg-blue-600',
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 transition-all hover:border-gray-300 hover:shadow-sm`}>
      <div className="flex">
        {/* Left Side indicators */}
        <div className="w-20 flex flex-col items-center pt-6 border-r border-gray-50 bg-gray-50/30">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mb-3 ${isCompleted ? 'bg-green-50 text-green-600' : 'bg-gray-100 border border-dashed border-gray-300'}`}>
            {isCompleted && <Check size={12} strokeWidth={3} />}
          </div>
          <div className={`w-7 h-7 rounded-full text-white font-bold text-[13px] flex items-center justify-center mb-3 shadow-sm ${phaseBgColors[phase]}`}>
            {phaseNumber}
          </div>
          <div className={`${phaseColors[phase].split(' ')[1]}`}>
            {icon}
          </div>
        </div>

        {/* Right Side content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 text-[15px]">{title}</h4>
              <p className="text-[13px] text-gray-500 mt-0.5">{description}</p>
            </div>
            <span className="text-[12px] font-medium text-gray-500">Est. time: {estimatedMinutes} min</span>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              {contentSummary.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span>{item}</span>
                  {idx < contentSummary.length - 1 && <span className="text-gray-300">•</span>}
                </React.Fragment>
              ))}
            </div>

            <button 
              onClick={onToggleExpand}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye size={14} />
              Preview
              <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && expandedContent && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-end mb-2">
                    <button onClick={onEdit} className="text-[12px] font-medium text-blue-600 hover:underline">
                      Edit Phase Content
                    </button>
                  </div>
                  {expandedContent}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
