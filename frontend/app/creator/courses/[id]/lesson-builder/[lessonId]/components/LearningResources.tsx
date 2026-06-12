import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Plus, FileText, Image as ImageIcon, Link as LinkIcon, MoreVertical, Trash2, RefreshCcw } from 'lucide-react';
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

  const remove = (id: string) => onChange(resources.filter(r => r.id !== id));

  const handleAddResource = (resource: any) => {
    if (editingResource) {
      // Update existing resource
      onChange(resources.map(r => r.id === editingResource.id ? { ...resource, id: editingResource.id } : r));
    } else {
      // Add new
      onChange([...resources, resource]);
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
    setEditingResource(null);
    setEditMode('details');
    setShowModal(true);
  };

  return (
    <div className={styles.resourcesPanel}>
      <div className={styles.resourcesHeader}>
        <div>
          <span className={styles.resourcesLabel}>3. Add Learning Resources</span>
          <span className={styles.resourcesOptional}> (Optional)</span>
        </div>
        <button 
          className={styles.addResourceBtn} 
          onClick={openNewModal}
          disabled={uploading}
        >
          {uploading ? `Uploading ${progress}%` : <><Plus size={14} /> Add Resource</>}
        </button>
      </div>
      <p className={styles.resourcesSubtext}>Upload supporting materials that help learners go deeper. Hosted securely on AWS S3.</p>

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
