import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Plus, FileText, Image as ImageIcon, Link as LinkIcon, MoreVertical, Trash2, RefreshCcw, Sparkles } from 'lucide-react';
import { useS3Upload } from '@/hooks/useS3Upload';
import styles from '../LessonBuilder.module.css';
import { AddResourceModal } from './AddResourceModal';

export interface ResourceItem {
  id: string;
  title: string;
  type: string;   // 'pdf' | 'pptx' | 'fig' | 'link' | 'video' | 'demo'
  size?: string;
  time?: string;
  url: string;
  estimatedReadMin?: number;
  description?: string;
  category?: string;
}

const MAX_RESOURCES = 10;

/** "12.3 MB" → bytes. Returns 0 for non-size labels like "Link". */
function parseSizeToBytes(size?: string): number {
  if (!size) return 0;
  const match = size.match(/^([\d.]+)\s*(B|KB|MB|GB)$/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  const multiplier = unit === 'GB' ? 1024 ** 3 : unit === 'MB' ? 1024 ** 2 : unit === 'KB' ? 1024 : 1;
  return Math.round(value * multiplier);
}

interface Props {
  resources: ResourceItem[];
  onChange: (r: ResourceItem[]) => void;
  lessonId: string;
}

function iconClass(type: string) {
  if (type === 'pdf')  return styles.iconPdf;
  if (type === 'pptx') return styles.iconPptx;
  if (type === 'fig')  return styles.iconFig;
  return styles.iconLink;
}

function typeLabel(type: string) {
  if (type === 'pdf')  return 'PDF';
  if (type === 'pptx') return 'PPTX';
  if (type === 'fig')  return 'FIG';
  if (type === 'video') return 'VIDEO';
  if (type === 'demo') return 'DEMO';
  return 'LINK';
}

function AnimatedResourceRow({ resource, onRemove, onEdit, onReplace }: { resource: ResourceItem; onRemove: () => void; onEdit: () => void; onReplace: () => void; }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // GSAP slide-in from above + fade on mount
    if (rowRef.current) {
      gsap.fromTo(rowRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current && 
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const openMenu = () => {
    setMenuOpen(true);
    // Menu opens on next tick so ref is attached
    setTimeout(() => {
      if (menuRef.current) {
        gsap.fromTo(menuRef.current,
          { opacity: 0, scale: 0.95, y: -10, transformOrigin: 'top right' },
          { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out' }
        );
      }
    }, 0);
  };

  const closeMenu = (callback?: () => void) => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0, scale: 0.95, y: -5, duration: 0.15, ease: 'power2.in',
        onComplete: () => {
          setMenuOpen(false);
          if (callback) callback();
        }
      });
    } else {
      setMenuOpen(false);
      if (callback) callback();
    }
  };

  const toggleMenu = () => {
    if (menuOpen) closeMenu();
    else openMenu();
  };

  const handleDelete = () => {
    closeMenu(() => {
      if (rowRef.current) {
        gsap.to(rowRef.current, {
          opacity: 0, height: 0, padding: 0, margin: 0, duration: 0.3, ease: 'power2.in',
          onComplete: onRemove
        });
      } else {
        onRemove();
      }
    });
  };

  return (
    <div ref={rowRef} className={styles.resourceRow}>
      <div className={styles.resourceLeft}>
        <div className={`${styles.resourceIcon} ${iconClass(resource.type)}`}>
          {typeLabel(resource.type)}
        </div>
        <div>
          <div className={styles.resourceName}>{resource.title}</div>
          <div className={styles.resourceMeta}>{typeLabel(resource.type)} · {resource.size}</div>
        </div>
      </div>
      <div className={styles.resourceRight}>
        <span className={styles.resourceTime}>{resource.time}</span>
        <div className={styles.resourceRightWrap}>
          <button ref={btnRef} className={styles.resourceMenuBtn} onClick={toggleMenu} title="Menu">
            <MoreVertical size={16} />
          </button>
          
          {menuOpen && (
            <div ref={menuRef} className={styles.menuDropdown}>
              <button className={styles.menuItem} onClick={() => closeMenu(onEdit)}>
                <FileText size={14} /> Edit details
              </button>
              <button className={styles.menuItem} onClick={() => closeMenu(onReplace)}>
                <RefreshCcw size={14} /> Replace file
              </button>
              <button className={`${styles.menuItem} ${styles.delete}`} onClick={handleDelete}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function LearningResources({ resources, onChange, lessonId }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [editMode, setEditMode] = useState<'details' | 'replace'>('details');
  const { uploading, progress } = useS3Upload();

  const remove = async (id: string) => {
    // Optimistically remove from the list…
    const previous = resources;
    onChange(resources.filter(r => r.id !== id));
    try {
      const res = await fetch(`/api/lesson/${lessonId}/resources/${id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 404) {
        // …and restore if the server refused (404 means it was already gone)
        onChange(previous);
        console.error('Failed to delete resource', res.status);
      }
    } catch (err) {
      onChange(previous);
      console.error('Failed to delete resource', err);
    }
  };

  /** Persist a resource's details/replace-file change via the update endpoint.
   *  Payload must stay identical to DeepenTab's editor — they used to diverge
   *  and a file replaced here kept its stale sizeBytes forever. */
  const persistResourceUpdate = (resource: ResourceItem) => {
    return fetch(`/api/lesson/${lessonId}/resources/${resource.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: resource.title,
        type: resource.type,
        storageUrl: resource.url,
        sizeBytes: parseSizeToBytes(resource.size),
        estimatedReadMin: parseInt(resource.time || '') || 0,
        description: resource.description,
        category: resource.category,
      }),
    });
  };

  const handleAddResource = async (resource: any) => {
    try {
      if (editingResource) {
        const updated = { ...resource, id: editingResource.id };
        // Optimistic UI update, then persist through the PATCH endpoint
        onChange(resources.map(r => r.id === editingResource.id ? updated : r));
        setShowModal(false);
        setEditingResource(null);
        try {
          const res = await persistResourceUpdate(updated as ResourceItem);
          if (!res.ok) throw new Error(String(res.status));
        } catch (err) {
          console.error('Failed to save resource changes', err);
          onChange(resources); // revert
          alert('Your resource changes could not be saved. Please try again.');
        }
        return;
      }

      const res = await fetch(`/api/lesson/${lessonId}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resource.title,
          type: resource.type,
          storageUrl: resource.url,
          sizeBytes: parseSizeToBytes(resource.size),
          originalName: resource.title,
          estimatedReadMin: parseInt(resource.time) || 0,
          description: resource.description,
          category: resource.category,
          displayOrder: resources.length,
        }),
      });
      if (res.ok) {
        const newRes = await res.json();
        onChange([...resources, { ...resource, id: newRes.id }]);
      } else {
        console.error('Failed to add resource', res.status);
        alert('The resource could not be added. Please try again.');
      }
    } catch (err) {
      console.error('Failed to add resource', err);
      alert('The resource could not be added. Please check your connection and try again.');
    }
    setShowModal(false);
    setEditingResource(null);
  };

  const handleOpenEdit = (r: ResourceItem) => {
    setEditingResource(r);
    setEditMode('details');
    setShowModal(true);
  };

  const handleOpenReplace = (r: ResourceItem) => {
    setEditingResource(r);
    setEditMode('replace');
    setShowModal(true);
  };

  const openNewModal = () => {
    if (resources.length >= MAX_RESOURCES) {
      alert(`This lesson already has the maximum of ${MAX_RESOURCES} resources.`);
      return;
    }
    setEditingResource(null);
    setEditMode('details');
    setShowModal(true);
  };

  return (
    <div className={styles.resourcesPanel}>
      <div className={styles.resourcesHeaderPremium}>
        <div className={styles.resourcesTitleWrapper}>
          <div className={styles.resourcesIconPremium}>
            <Sparkles size={16} color="#3D5AFE" />
          </div>
          <div>
            <span className={styles.resourcesLabelPremium}>3. Add Learning Resources</span>
            <span className={styles.resourcesOptionalPremium}> (Optional)</span>
          </div>
        </div>
        <button 
          className={styles.addResourceBtnPremium} 
          onClick={openNewModal}
          disabled={uploading}
        >
          {uploading ? `Uploading ${progress}%` : <><Plus size={14} /> Add Resource</>}
        </button>
      </div>
      <p className={styles.resourcesSubtextPremium}>Upload supporting materials that help learners go deeper. Hosted securely on AWS S3.</p>

      {resources.length === 0 ? (
        <div className={styles.resourcesEmpty}>No resources attached yet.</div>
      ) : (
        <div className={styles.resourceList}>
          {resources.map(r => (
            <AnimatedResourceRow 
              key={r.id} 
              resource={r} 
              onRemove={() => remove(r.id)} 
              onEdit={() => handleOpenEdit(r)}
              onReplace={() => handleOpenReplace(r)}
            />
          ))}
        </div>
      )}

      {resources.length > 0 && (
        <div className={styles.resourcesFooter}>
          <span>{resources.length} resource{resources.length !== 1 ? 's' : ''} attached</span>
          <span>Max 10 per lesson</span>
        </div>
      )}

      {showModal && (
        <AddResourceModal 
          lessonId={lessonId} 
          initialResource={editingResource}
          initialMode={editMode}
          onClose={() => { setShowModal(false); setEditingResource(null); }} 
          onAddResource={handleAddResource} 
        />
      )}
    </div>
  );
}
