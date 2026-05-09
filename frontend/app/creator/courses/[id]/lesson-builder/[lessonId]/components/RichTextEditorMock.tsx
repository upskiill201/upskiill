import React from 'react';
import { Bold, Italic, Underline, List, ListOrdered, ChevronDown } from 'lucide-react';

interface RichTextEditorMockProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function RichTextEditorMock({ value, onChange, placeholder }: RichTextEditorMockProps) {
  return (
    <div className="w-full border border-gray-300 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-indigo-500">
      <div className="flex items-center gap-1 border-b border-gray-200 p-2 bg-gray-50">
        <button className="flex items-center gap-1 text-sm text-gray-700 hover:bg-gray-200 px-2 py-1 rounded">
          Normal <ChevronDown size={14} />
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Bold size={14} /></button>
        <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Italic size={14} /></button>
        <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><Underline size={14} /></button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><List size={14} /></button>
        <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded"><ListOrdered size={14} /></button>
      </div>
      <textarea
        className="w-full p-3 text-sm focus:outline-none min-h-[100px] resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className="px-3 py-1.5 text-right text-xs text-gray-400 bg-white">
        {value.length}/300
      </div>
    </div>
  );
}
