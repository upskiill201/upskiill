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
    learn: 'text-green-600',
    apply: 'text-blue-600',
    reflect: 'text-amber-500',
    deepen: 'text-blue-600',
  };

  const phaseBgColors = {
    learn: 'bg-green-600 shadow-[0_2px_0_0_#15803d]',
    apply: 'bg-[#0172FD] shadow-[0_2px_0_0_#0050B3]',
    reflect: 'bg-amber-500 shadow-[0_2px_0_0_#b45309]',
    deepen: 'bg-[#0172FD] shadow-[0_2px_0_0_#0050B3]',
  };

  return (
    <div className="bg-white rounded-[18px] border-2 border-[#E2E8F0] border-b-4 border-b-[#CBD5E1] overflow-hidden mb-3.5 transition-all hover:border-[#93C5FD]">
      <div className="flex">
        {/* Left Side indicators */}
        <div className="w-16 sm:w-20 flex flex-col items-center pt-5 pb-4 border-r border-[#F1F5F9] bg-[#F8FAFC]">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mb-2.5 ${isCompleted ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-gray-100 border border-dashed border-gray-300'}`}>
            {isCompleted && <Check size={12} strokeWidth={3} />}
          </div>
          <div className={`w-7 h-7 rounded-full text-white font-extrabold text-[12px] flex items-center justify-center mb-2.5 ${phaseBgColors[phase]}`}>
            {phaseNumber}
          </div>
          <div className={phaseColors[phase]}>
            {icon}
          </div>
        </div>

        {/* Right Side content */}
        <div className="flex-1 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
            <div>
              <h4 className="font-extrabold text-[#0F172A] text-[13.5px] font-[family-name:var(--font-jakarta)]">{title}</h4>
              <p className="text-[11.5px] text-[#64748B] mt-0.5">{description}</p>
            </div>
            <span className="text-[11px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-md self-start sm:self-auto mt-1 sm:mt-0 font-[family-name:var(--font-jakarta)]">
              Est. {estimatedMinutes} min
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-[#F8FAFC]">
            <div className="flex flex-wrap items-center gap-1.5 text-[11.5px] text-[#64748B] font-medium">
              {contentSummary.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-md text-[#334155]">{item}</span>
                  {idx < contentSummary.length - 1 && <span className="text-gray-300">•</span>}
                </React.Fragment>
              ))}
            </div>

            <button 
              onClick={onToggleExpand}
              className="flex items-center gap-1.5 px-3 py-1 text-[12px] font-bold text-[#0172FD] bg-white border border-[#CBD5E1] rounded-lg hover:bg-[#EFF6FF] hover:border-[#93C5FD] transition-colors font-[family-name:var(--font-jakarta)]"
            >
              <Eye size={13} />
              Preview
              <ChevronDown size={13} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
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
                <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                  <div className="flex justify-end mb-2">
                    <button onClick={onEdit} className="text-[11.5px] font-bold text-[#0172FD] hover:underline font-[family-name:var(--font-jakarta)]">
                      Edit Phase Content →
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

