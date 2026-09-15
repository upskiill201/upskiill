'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Plus, GripVertical, FileText, Video, LayoutTemplate, Link as LinkIcon, Edit2, Trash2, PenTool, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ResourceItem } from './LearningResources';
import { AddResourceModal } from './AddResourceModal';
import styles from './DeepenTab.module.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export interface DeepenConfig {
  collectionTitle: string;
  collectionDescription: string;
  resourceSettings: {
    makeRequired: boolean;
    trackCompletion: boolean;
    allowDownloads: boolean;
    openInNewTab: boolean;
  };
  recommendedNextStep: {
    type: 'continue' | 'practice' | 'project' | 'explore';
    nextLessonId?: string;
  };
  showLearningPathSuggestions: boolean;
  learningPathSuggestions: { id: string; text: string }[];
}

interface Props {
  config: DeepenConfig;
  onChangeConfig: (c: DeepenConfig) => void;
  resources: ResourceItem[];
  onChangeResources: (r: ResourceItem[]) => void;
  lessonId: string;
}

const QUILL_MODULES = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link']
  ],
};

function getResourceIcon(type: string) {
  switch(type) {
    case 'pdf': return <FileText size={14}/>;
    case 'video': return <Video size={14}/>;
    case 'fig':
    case 'template': return <LayoutTemplate size={14}/>;
    default: return <LinkIcon size={14}/>;
  }
}

function getResourceBadge(type: string) {
  switch(type) {
    case 'pdf': return 'PDF';
    case 'video': return 'Video';
    case 'fig':
    case 'template': return 'Template';
    case 'demo': return 'Demo';
    default: return 'Link';
  }
}

const MAX_RESOURCES = 10;

export function DeepenTab({ config, onChangeConfig, resources, onChangeResources, lessonId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);

  const titleLen = config.collectionTitle.length;
  const descLen = (config.collectionDescription || '').replace(/<[^>]*>?/gm, '').length;

  const handleNextStepSelect = (type: DeepenConfig['recommendedNextStep']['type']) => {
    onChangeConfig({
      ...config,
      recommendedNextStep: { ...config.recommendedNextStep, type }
    });
  };

  /** "12.3 MB" → bytes. Returns 0 for non-size labels like "Link". */
  const parseSizeToBytes = (size?: string): number => {
    if (!size) return 0;
    const match = size.match(/^([\d.]+)\s*(B|KB|MB|GB)$/i);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    const multiplier = unit === 'GB' ? 1024 ** 3 : unit === 'MB' ? 1024 ** 2 : unit === 'KB' ? 1024 : 1;
    return Math.round(value * multiplier);
  };

  /**
   * Resources added here go through the SAME backend endpoints as the Learn
   * tab's resource panel, so edits and deletes actually persist. Previously
   * this tab only mutated local state and everything was lost on reload.
   */
  const handleAddResource = async (res: ResourceItem) => {
    if (editingResource) {
      const previous = resources;
      const updated = { ...res, id: editingResource.id };
      onChangeResources(resources.map(r => r.id === editingResource.id ? updated : r));
      setEditingResource(null);
      setIsModalOpen(false);
      try {
        const apiRes = await fetch(`/api/lesson/${lessonId}/resources/${editingResource.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: updated.title,
            type: updated.type,
            storageUrl: updated.url,
            sizeBytes: parseSizeToBytes(updated.size),
            estimatedReadMin: parseInt(updated.time || '') || 0,
            description: updated.description,
            category: updated.category,
          }),
        });
        if (!apiRes.ok) throw new Error(String(apiRes.status));
      } catch (err) {
        console.error('Failed to save resource changes', err);
        onChangeResources(previous);
        alert('Your resource changes could not be saved. Please try again.');
      }
      return;
    }

    try {
      const apiRes = await fetch(`/api/lesson/${lessonId}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: res.title,
          type: res.type,
          storageUrl: res.url,
          sizeBytes: parseSizeToBytes(res.size),
          originalName: res.title,
          estimatedReadMin: parseInt(res.time || '') || 0,
          description: res.description,
          category: res.category,
          displayOrder: resources.length,
        }),
      });
      if (apiRes.ok) {
        const created = await apiRes.json();
        onChangeResources([...resources, { ...res, id: created.id }]);
      } else {
        console.error('Failed to add resource', apiRes.status);
        alert('The resource could not be added. Please try again.');
      }
    } catch (err) {
      console.error('Failed to add resource', err);
      alert('The resource could not be added. Please check your connection and try again.');
    }
    setEditingResource(null);
    setIsModalOpen(false);
  };

  const handleDeleteResource = async (id: string) => {
    const previous = resources;
    onChangeResources(resources.filter(r => r.id !== id));
    try {
      const apiRes = await fetch(`/api/lesson/${lessonId}/resources/${id}`, { method: 'DELETE' });
      if (!apiRes.ok && apiRes.status !== 404) {
        onChangeResources(previous);
        console.error('Failed to delete resource', apiRes.status);
      }
    } catch (err) {
      onChangeResources(previous);
      console.error('Failed to delete resource', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingArea}>
        <div>
          <h2 className={styles.title}>4. DEEPEN — Provide More Resources <span className={styles.opt}>(Optional)</span></h2>
          <p className={styles.desc}>Give learners resources to explore, practice and master this topic further. This whole step can be skipped — a lesson publishes fine with no resources.</p>
        </div>
        <span className={styles.learnMore}>Learn more</span>
      </div>

      <div className={styles.layoutGrid}>
        <div className={styles.mainCol}>
          
          {/* Section 1: Title */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>1. Resource Collection Title <span className={styles.opt}>(Optional)</span></h3>
              <p className={styles.sectionSub}>Only needed if you add resources below — give this collection a title.</p>
            </div>
            
            <div className={styles.inputWrap}>
              <input 
                type="text" 
                className={`${styles.textInput} ${titleLen > 100 ? styles.inputError : ''}`}
                value={config.collectionTitle}
                onChange={(e) => onChangeConfig({ ...config, collectionTitle: e.target.value })}
                placeholder="e.g. 'Advanced Interaction Design', 'Go Deeper into Motion Design'"
                maxLength={100}
              />
              <span className={`${styles.charCount} ${titleLen > 80 ? styles.charCountAmber : ''} ${titleLen >= 100 ? styles.charCountRed : ''}`}>
                {titleLen}/100
              </span>
            </div>
          </div>

          {/* Section 2: Resources */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>2. Add Learning Resources <span className={styles.opt}>(Optional)</span></h3>
              <p className={styles.sectionSub}>Add high-quality resources to help learners go deeper, if you have any.</p>
            </div>
            
            <button
              className={styles.addBtn}
              onClick={() => {
                if (resources.length >= MAX_RESOURCES) {
                  alert(`This lesson already has the maximum of ${MAX_RESOURCES} resources.`);
                  return;
                }
                setEditingResource(null);
                setIsModalOpen(true);
              }}
            >
              <Plus size={14}/> Add Resource
            </button>

            <div className={styles.resourceList}>
              {resources.map((res, i) => (
                <div key={res.id} className={styles.resourceItem}>
                  <div className={styles.resourceDrag}><GripVertical size={14}/></div>
                  <div className={styles.resourceIcon}>{getResourceIcon(res.type)}</div>
                  <div className={styles.resourceContent}>
                    <div className={styles.resourceTitle}>{res.title}</div>
                    <div className={styles.resourceMeta}>
                      <span className={styles.rBadge}>{getResourceBadge(res.type)}</span>
                      {res.size && <span className={styles.rMetaText}>· {res.size}</span>}
                      {res.time && <span className={styles.rMetaText}>· {res.time}</span>}
                    </div>
                  </div>
                  <div className={styles.resourceActions}>
                    <button className={styles.actionBtn} onClick={() => { setEditingResource(res); setIsModalOpen(true); }}>
                      <Edit2 size={13}/>
                    </button>
                    <button className={styles.actionBtn} onClick={() => handleDeleteResource(res.id)}>
                      <Trash2 size={13}/>
                    </button>
                  </div>
                </div>
              ))}
              {resources.length > 1 && <div className={styles.dragHelp}>Drag to reorder resources</div>}
            </div>
          </div>

          {/* Section 5: Learning Path Suggestions */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>5. Learning Path Suggestions <span className={styles.opt}>(Optional)</span></h3>
              <p className={styles.sectionSub}>Suggest what learners should focus on first.</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => onChangeConfig({ ...config, showLearningPathSuggestions: !config.showLearningPathSuggestions })}>
              <button
                className={`${styles.toggleBtn} ${config.showLearningPathSuggestions ? styles.toggleActive : ''}`}
                onClick={(e) => { e.stopPropagation(); onChangeConfig({ ...config, showLearningPathSuggestions: !config.showLearningPathSuggestions }); }}
              >
                <span className={styles.toggleThumb} />
              </button>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>Show learning path suggestions</span>
            </div>

            {config.showLearningPathSuggestions && (
              <div className={styles.suggestionsList}>
                {config.learningPathSuggestions.map((sug, i) => (
                  <div key={sug.id} className={styles.sugItem}>
                    <div className={styles.sugDrag}><GripVertical size={14}/></div>
                    <input 
                      type="text" 
                      className={styles.sugInput}
                      value={sug.text}
                      onChange={(e) => {
                        const newSug = [...config.learningPathSuggestions];
                        newSug[i].text = e.target.value;
                        onChangeConfig({ ...config, learningPathSuggestions: newSug });
                      }}
                      placeholder="Start with the UI Design Principles..."
                      maxLength={100}
                    />
                    <button 
                      className={styles.sugDel}
                      onClick={() => {
                        const newSug = config.learningPathSuggestions.filter(s => s.id !== sug.id);
                        onChangeConfig({ ...config, learningPathSuggestions: newSug });
                      }}
                    >
                      <Trash2 size={14}/>
                    </button>
                  </div>
                ))}
                
                <button 
                  className={styles.addBtnSub}
                  onClick={() => {
                    onChangeConfig({
                      ...config,
                      learningPathSuggestions: [...config.learningPathSuggestions, { id: `sug_${Date.now()}`, text: '' }]
                    });
                  }}
                >
                  <Plus size={14}/> Add Suggestion
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.sideCol}>
          
          {/* Section 3: Description */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>3. Resource Description <span className={styles.opt}>(Optional)</span></h3>
              <p className={styles.sectionSub}>Add a short description for this resource collection.</p>
            </div>
            
            <div className={styles.editorWrap}>
              <ReactQuill 
                theme="snow" 
                value={config.collectionDescription} 
                onChange={(val) => onChangeConfig({ ...config, collectionDescription: val })}
                modules={QUILL_MODULES}
                placeholder="These curated resources will help you go beyond the basics..."
              />
              <div className={`${styles.charCountFloating} ${descLen > 400 ? styles.charCountAmber : ''} ${descLen >= 500 ? styles.charCountRed : ''}`}>
                {descLen}/500
              </div>
            </div>
          </div>

          {/* Section 4: Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>4. Resource Settings</h3>
            </div>
            
            <div className={styles.settingsList}>
              <div className={styles.settingRow}>
                <div className={styles.settingTextGroup}>
                  <div className={styles.settingLabel}>Make this section required for learners</div>
                  <div className={styles.settingDesc}>Learners must review at least one resource to complete the lesson</div>
                </div>
                <button
                  className={`${styles.toggleBtn} ${config.resourceSettings.makeRequired ? styles.toggleActive : ''}`}
                  onClick={() => onChangeConfig({ ...config, resourceSettings: { ...config.resourceSettings, makeRequired: !config.resourceSettings.makeRequired } })}
                >
                  <span className={styles.toggleThumb} />
                </button>
              </div>
              <div className={styles.settingRow}>
                <div className={styles.settingTextGroup}>
                  <div className={styles.settingLabel}>Track resource completion</div>
                  <div className={styles.settingDesc}>Mark resources as completed when learners open them</div>
                </div>
                <button
                  className={`${styles.toggleBtn} ${config.resourceSettings.trackCompletion ? styles.toggleActive : ''}`}
                  onClick={() => onChangeConfig({ ...config, resourceSettings: { ...config.resourceSettings, trackCompletion: !config.resourceSettings.trackCompletion } })}
                >
                  <span className={styles.toggleThumb} />
                </button>
              </div>
              <div className={styles.settingRow}>
                <div className={styles.settingTextGroup}>
                  <div className={styles.settingLabel}>Allow learners to download resources</div>
                  <div className={styles.settingDesc}>Learners can download attached files</div>
                </div>
                <button
                  className={`${styles.toggleBtn} ${config.resourceSettings.allowDownloads ? styles.toggleActive : ''}`}
                  onClick={() => onChangeConfig({ ...config, resourceSettings: { ...config.resourceSettings, allowDownloads: !config.resourceSettings.allowDownloads } })}
                >
                  <span className={styles.toggleThumb} />
                </button>
              </div>
              <div className={styles.settingRow}>
                <div className={styles.settingTextGroup}>
                  <div className={styles.settingLabel}>Open links in new tab</div>
                  <div className={styles.settingDesc}>External links will open in a new tab</div>
                </div>
                <button
                  className={`${styles.toggleBtn} ${config.resourceSettings.openInNewTab ? styles.toggleActive : ''}`}
                  onClick={() => onChangeConfig({ ...config, resourceSettings: { ...config.resourceSettings, openInNewTab: !config.resourceSettings.openInNewTab } })}
                >
                  <span className={styles.toggleThumb} />
                </button>
              </div>
            </div>
          </div>

          {/* Section 6: Recommended Next Steps */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>6. Recommended Next Steps</h3>
              <p className={styles.sectionSub}>Guide learners on what to do after this lesson.</p>
            </div>
            
            <div className={styles.nextStepsList}>
              <div 
                className={`${styles.nextStepItem} ${config.recommendedNextStep.type === 'continue' ? styles.nextStepActive : ''}`}
                onClick={() => handleNextStepSelect('continue')}
              >
                <div className={styles.radio}><div className={styles.radioDot} /></div>
                <div className={styles.nsText}>Continue to next lesson</div>
              </div>
              
              <div 
                className={`${styles.nextStepItem} ${config.recommendedNextStep.type === 'practice' ? styles.nextStepActive : ''}`}
                onClick={() => handleNextStepSelect('practice')}
              >
                <div className={styles.radio}><div className={styles.radioDot} /></div>
                <div className={styles.nsText}>Take another practice</div>
              </div>

              <div 
                className={`${styles.nextStepItem} ${config.recommendedNextStep.type === 'project' ? styles.nextStepActive : ''}`}
                onClick={() => handleNextStepSelect('project')}
              >
                <div className={styles.radio}><div className={styles.radioDot} /></div>
                <div className={styles.nsText}>Work on a project</div>
              </div>

              <div 
                className={`${styles.nextStepItem} ${config.recommendedNextStep.type === 'explore' ? styles.nextStepActive : ''}`}
                onClick={() => handleNextStepSelect('explore')}
              >
                <div className={styles.radio}><div className={styles.radioDot} /></div>
                <div className={styles.nsText}>Explore more resources</div>
              </div>
            </div>
          </div>


        </div>
      </div>

      {isModalOpen && (
        <AddResourceModal
          lessonId={lessonId}
          onClose={() => setIsModalOpen(false)}
          onAddResource={handleAddResource}
          initialResource={editingResource}
          initialMode={editingResource ? 'details' : null}
        />
      )}
    </div>
  );
}
