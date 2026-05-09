import React, { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';

interface AIAssistantProps {
  onApplyAI: (result: string) => void;
}

export function AIAssistant({ onApplyAI }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const predefinedPrompts = [
    'Simplify this explanation',
    'Make it more engaging',
    'Add real-world example',
    'Fix grammar'
  ];

  const handleGenerate = (customPrompt?: string) => {
    setLoading(true);
    // Mock AI delay
    setTimeout(() => {
      onApplyAI(`Here is the AI improved version based on: "${customPrompt || prompt}". The content is now significantly more engaging and easier to digest for beginners.`);
      setLoading(false);
      setPrompt('');
    }, 1500);
  };

  return (
    <div className="border border-indigo-100 bg-indigo-50/30 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-indigo-100 p-1.5 rounded-md">
          <Bot size={18} className="text-indigo-600" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">AI Assistant <span className="text-gray-400 font-normal">(Optional)</span></h4>
          <p className="text-xs text-gray-500">Get help improving your lesson content.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {predefinedPrompts.map(p => (
          <button
            key={p}
            onClick={() => handleGenerate(p)}
            className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-indigo-300 hover:text-indigo-600 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI to improve your content..."
          className="w-full bg-white border border-gray-200 rounded-lg pl-4 pr-24 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          onKeyDown={(e) => e.key === 'Enter' && prompt && handleGenerate()}
        />
        <button
          onClick={() => handleGenerate()}
          disabled={!prompt || loading}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-indigo-600 text-white rounded-md text-xs font-medium flex items-center gap-1 hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {loading ? 'Thinking...' : <><Sparkles size={14} /> Generate</>}
        </button>
      </div>
    </div>
  );
}
