import React, { useRef, useState } from 'react';
import { UploadCloud, FileVideo, X, PlayCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface VideoUploadProps {
  videoUrl: string | null;
  onUpload: (url: string) => void;
  onRemove: () => void;
}

export function VideoUploadBlock({ videoUrl, onUpload, onRemove }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      // Simulate fake upload
      setTimeout(() => {
        onUpload(`mock-video-url-${Date.now()}.mp4`);
        setUploading(false);
      }, 1500);
    }
  };

  if (videoUrl) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 flex gap-4 bg-gray-50 items-center">
        <div className="w-40 h-24 bg-black rounded-md flex items-center justify-center relative overflow-hidden">
           <PlayCircle color="white" size={32} className="z-10" />
           <div className="absolute inset-0 bg-indigo-900 opacity-50"></div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">{videoUrl}</h4>
          <p className="text-xs text-gray-500 mb-3">24.6 MB • 12:30 • 1280x720</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              Replace Video
            </Button>
            <Button variant="outline" size="sm" onClick={onRemove} className="text-red-600 border-red-200 hover:bg-red-50">
              <X size={16} />
            </Button>
          </div>
        </div>
        <input type="file" accept="video/*" className="hidden" ref={inputRef} onChange={handleFileChange} />
      </div>
    );
  }

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
      onClick={() => inputRef.current?.click()}
    >
      <input type="file" accept="video/*" className="hidden" ref={inputRef} onChange={handleFileChange} />
      {uploading ? (
        <div className="flex flex-col items-center justify-center">
          <UploadCloud className="animate-bounce mb-2 text-indigo-600" size={32} />
          <p className="text-sm font-medium text-gray-600">Uploading video...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <FileVideo className="mb-2 text-gray-400" size={32} />
          <p className="text-sm font-medium text-gray-900 mb-1">Click or drag video to upload</p>
          <p className="text-xs text-gray-500">Recommended length: 1-5 min short, focused videos work best.</p>
        </div>
      )}
    </div>
  );
}
