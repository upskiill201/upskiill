'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { X, FileText, FileCode, Link as LinkIcon, Video, LayoutTemplate, Image as ImageIcon } from 'lucide-react';
import styles from './AddResourceModal.module.css';
import Button from '@/components/ui/Button';
import { FileUploadZone } from './FileUploadZone';

export interface AddResourceModalProps {
  lessonId: string;
  onClose: () => void;
  onAddResource: (resource: any) => void;
  initialResource?: any | null;
  initialMode?: 'details' | 'replace' | null;
}

type ResourceType = 'pdf' | 'template' | 'link' | 'video' | 'demo';

const RESOURCE_TYPES: { id: ResourceType; label: string; desc: string; icon: React.ElementType }[] = [
  { id: 'pdf', label: 'PDF / Notes', desc: 'Documents, guides, cheatsheets', icon: FileText },
  { id: 'template', label: 'Template / File', desc: 'Design files, templates, spreadsheets', icon: LayoutTemplate },
  { id: 'link', label: 'External Link', desc: 'Web links, articles, resources', icon: LinkIcon },
  { id: 'video', label: 'Video Resource', desc: 'Additional videos from YouTube, etc.', icon: Video },
  { id: 'demo', label: 'Demo File', desc: 'Sample files, project assets', icon: FileCode },
];

export function AddResourceModal({ lessonId, onClose, onAddResource, initialResource, initialMode }: AddResourceModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const typeIconRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Set initial state based on editing mode
  const initType = initialResource?.type === 'fig' ? 'template' : (initialResource?.type as ResourceType) || null;
  const initFile = initialResource && initialMode === 'details' ? { name: initialResource.url || initialResource.title, size: initialResource.size || '1.2 MB', url: initialResource.url } : null;
  
  const [selectedType, setSelectedType] = useState<ResourceType | null>(initialMode === 'replace' ? null : initType);
  const [fileData, setFileData] = useState<{ name: string; size: string; url: string } | null>(initFile);

  // Form State
  const [title, setTitle] = useState(initialResource?.title || '');
  const [timeEstimate, setTimeEstimate] = useState(initialResource?.time || '5 min read');
  const [description, setDescription] = useState(initialResource?.description || '');
  const [category, setCategory] = useState(initialResource?.category || 'Reference');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Once the creator edits the title by hand, stop auto-filling it
  // (e.g. while typing a link URL, which used to rewrite the field every keystroke)
  const titleManuallyEdited = useRef(false);

  // Focus trap & animation in
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    gsap.fromTo(overlayRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.2, ease: 'power2.out' }
    );
    gsap.fromTo(modalRef.current, 
      { scale: 0.95, opacity: 0, y: 10 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.2)' }
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, { 
      scale: 0.95, opacity: 0, y: 10, duration: 0.2, 
      onComplete: onClose 
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const handleSelectType = (id: ResourceType) => {
    setSelectedType(id);
    
    // Clear file data when changing type
    setFileData(null);
    setTitle('');
    
    // Micro-bounce
    const iconEl = typeIconRefs.current[id];
    if (iconEl) {
      gsap.fromTo(iconEl, 
        { scale: 0.8 }, 
        { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }
      );
    }
  };

  const handleFileComplete = (data: { name: string; size: string; url: string }) => {
    setFileData(data);

    // Auto-fill title logic (skipped once the creator has typed their own)
    // e.g. "ui_design_basics_cheatsheet.pdf" -> "Ui Design Basics Cheatsheet"
    if (!titleManuallyEdited.current) {
      let cleanTitle = data.name.split('.').slice(0, -1).join('.') || data.name;
      if (selectedType === 'link') cleanTitle = data.name; // Keep URL as title for now if link
      cleanTitle = cleanTitle.replace(/[-_]/g, ' ');
      cleanTitle = cleanTitle.replace(/\b\w/g, l => l.toUpperCase());
      setTitle(cleanTitle.substring(0, 100)); // limit
    }

    // Auto-calc time estimate (mock logic)
    if (selectedType === 'link') setTimeEstimate('2 min read');
    else if (selectedType === 'video') setTimeEstimate('10 min watch');
    else setTimeEstimate('5 min read');
  };

  const handleSubmit = () => {
    if (!fileData) return;
    setIsSubmitting(true);
    
    // Mock submit delay
    setTimeout(() => {
      onAddResource({
        id: initialResource?.id || Date.now().toString(),
        title: title || fileData.name,
        type: selectedType === 'template' ? 'fig' : selectedType,
        size: fileData.size,
        time: timeEstimate,
        url: fileData.url,
        description,
        category
      });
      handleClose();
    }, 600);
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay} ref={overlayRef} onClick={handleBackdropClick}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Add Learning Resource</h2>
            <p className={styles.subtitle}>Add materials to help learners go deeper into this lesson.</p>
          </div>
          <button className={styles.closeBtn} onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.verticalLayout}>
            {/* STEP 1: Resource Type */}
            <div>
              <h3 className={styles.sectionTitle}>1. Select Resource Type</h3>
              <div className={styles.typeGrid}>
                {RESOURCE_TYPES.map(type => {
                  const isSelected = selectedType === type.id;
                  const Icon = type.icon;
                  return (
                    <div 
                      key={type.id}
                      className={`${styles.typeCard} ${isSelected ? styles.selected : ''}`}
                      onClick={() => handleSelectType(type.id)}
                    >
                      <div 
                        className={styles.iconWrapper} 
                        ref={el => { typeIconRefs.current[type.id] = el; }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className={styles.typeLabel}>{type.label}</div>
                        <div className={styles.typeDesc}>{type.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* STEP 2: Upload Zone */}
            {selectedType && (
              <div>
                <h3 className={styles.sectionTitle}>2. Upload File</h3>
                <FileUploadZone
                  type={selectedType}
                  lessonId={lessonId}
                  onFileComplete={handleFileComplete}
                  onFileCleared={() => { setFileData(null); setTitle(''); }}
                />
              </div>
            )}

            {/* STEP 3 & PREVIEW */}
            {fileData && (
              <div>
                <h3 className={styles.sectionTitle}>3. Resource Details</h3>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>
                      Resource Title <span style={{color: '#EF4444'}}>*</span>
                      <span className={styles.charCount}>{title.length}/100</span>
                    </div>
                    <input
                      type="text"
                      className={styles.input}
                      value={title}
                      onChange={(e) => { titleManuallyEdited.current = true; setTitle(e.target.value.substring(0, 100)); }}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>
                      Time Estimate <span style={{color: '#EF4444'}}>*</span>
                    </div>
                    <select 
                      className={styles.input}
                      value={timeEstimate}
                      onChange={(e) => setTimeEstimate(e.target.value)}
                    >
                      <option value="2 min read">2 min read</option>
                      <option value="5 min read">5 min read</option>
                      <option value="10 min read">10 min read</option>
                      <option value="15 min read">15 min read</option>
                      <option value="10 min watch">10 min watch</option>
                      <option value="20 min watch">20 min watch</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>
                      Description <span className="optional">(Optional)</span>
                      <span className={styles.charCount}>{description.length}/300</span>
                    </div>
                    <textarea 
                      className={styles.input}
                      value={description}
                      onChange={(e) => setDescription(e.target.value.substring(0, 300))}
                      placeholder="A quick reference guide covering key concepts..."
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.label}>
                      Category <span className="optional">(Optional)</span>
                    </div>
                    <select 
                      className={styles.input}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Reference">Reference</option>
                      <option value="Template">Template</option>
                      <option value="Exercise">Exercise</option>
                      <option value="Supplemental">Supplemental</option>
                    </select>
                  </div>
                </div>

                <div className={styles.previewSection}>
                  <div className={styles.previewPanel}>
                    <div className={styles.previewLabel}>Preview <span style={{textTransform:'none'}}>(Shown to students)</span></div>
                    <div className={styles.previewCard}>
                      <div className={styles.previewIcon}>
                        {selectedType === 'pdf' ? <FileText size={16} color="#EF4444" /> :
                         selectedType === 'video' ? <Video size={16} color="#8B5CF6" /> :
                         selectedType === 'demo' ? <FileCode size={16} color="#10B981" /> :
                         selectedType === 'link' ? <LinkIcon size={16} color="#3B82F6" /> :
                         <ImageIcon size={16} color="#F59E0B" />}
                      </div>
                      <div className={styles.previewDetails}>
                        <div className={styles.previewTitle}>
                          {title || (fileData ? fileData.name : 'Resource Title')}
                        </div>
                        <div className={styles.previewMeta}>
                          {selectedType?.toUpperCase() || 'PDF'} · {fileData ? fileData.size : '1.2 MB'} · {timeEstimate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={handleClose}>Cancel</button>
          <Button 
            variant="primary" 
            onClick={handleSubmit} 
            disabled={!fileData || isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Resource'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
