import React, { useState } from 'react';
import { Plus, FileText, Link as LinkIcon, Image as ImageIcon, Trash2, GripVertical } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface ResourceItem {
  id: string;
  title: string;
  type: 'PDF' | 'LINK' | 'PPT' | 'FIGMA';
  url: string;
  estimatedTime?: string;
}

interface LearningResourcesProps {
  resources: ResourceItem[];
  onChange: (resources: ResourceItem[]) => void;
}

export function LearningResources({ resources, onChange }: LearningResourcesProps) {
  const [isAdding, setIsAdding] = useState(false);

  const addMockResource = () => {
    const newItem: ResourceItem = {
      id: Date.now().toString(),
      title: 'UI Design Basics Cheatsheet.pdf',
      type: 'PDF',
      url: '#',
      estimatedTime: '3 min read'
    };
    onChange([...resources, newItem]);
    setIsAdding(false);
  };

  const removeResource = (id: string) => {
    onChange(resources.filter(r => r.id !== id));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText size={18} className="text-red-500" />;
      case 'LINK': return <LinkIcon size={18} className="text-blue-500" />;
      default: return <ImageIcon size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-sm">3. Add Learning Resources <span className="text-gray-400 font-normal">(Optional)</span></h3>
          <p className="text-xs text-gray-500 mt-1">Upload supporting materials that help learners go deeper.</p>
        </div>
        <Button variant="outline" size="sm" onClick={addMockResource}>
          <Plus size={14} className="mr-1" /> Add Resource
        </Button>
      </div>

      <div className="space-y-2">
        {resources.map((res) => (
          <div key={res.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-md bg-gray-50 hover:bg-gray-100">
            <GripVertical size={16} className="text-gray-400 cursor-grab" />
            <div className="bg-white p-2 rounded border border-gray-200">
              {getIcon(res.type)}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{res.title}</h4>
              <p className="text-xs text-gray-500">{res.type} • {res.estimatedTime || 'Unknown'}</p>
            </div>
            <button onClick={() => removeResource(res.id)} className="text-gray-400 hover:text-red-600 p-2">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {resources.length === 0 && (
          <div className="text-center py-6 text-sm text-gray-500 border border-dashed border-gray-200 rounded-md">
            No resources added yet.
          </div>
        )}
      </div>
    </div>
  );
}
