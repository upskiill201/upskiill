
// ─── MAIN CURRICULUM BUILDER ─────────────────────────────────
export default function CurriculumBuilder({ courseId, onBack, onSaveStatus }: Props) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Module Modal
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [editingModule, setEditingModule] = useState<Section | null>(null);
  const [moduleForm, setModuleForm] = useState({ title: '', goal: '', duration: '', difficulty: 'Beginner' });

  // Lesson Modal
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [lessonModalSectionId, setLessonModalSectionId] = useState('');
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonForm, setLessonForm] = useState({ title: '', lessonType: 'video' as LessonType });

  // Confirm Modal
  const [confirmModal, setConfirmModal] = useState<{ message: string; onConfirm: () => void } | null>(null);

  // AI / Premium modal
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const moduleSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // ─── FETCH ───
  const fetchCurriculum = useCallback(async () => {
    try {
      const res = await fetch(`/api/courses/${courseId}/curriculum`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        const sorted = (data as Section[]).sort((a, b) => a.orderIndex - b.orderIndex);
        setSections(sorted);
        if (sorted.length > 0) setExpandedIds(new Set([sorted[0].id]));
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [courseId]);

  useEffect(() => { fetchCurriculum(); }, [fetchCurriculum]);

  // ─── EXPAND ───
  const toggle = (id: string) => setExpandedIds(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const expandAll = () => {
    if (expandedIds.size === sections.length) setExpandedIds(new Set());
    else setExpandedIds(new Set(sections.map(s => s.id)));
  };

  // ─── MODULE CRUD ───
  const openAddModule = () => { setEditingModule(null); setModuleForm({ title: '', goal: '', duration: '', difficulty: 'Beginner' }); setShowModuleModal(true); };
  const openEditModule = (s: Section) => { setEditingModule(s); setModuleForm({ title: s.title, goal: s.goal || '', duration: '', difficulty: 'Beginner' }); setShowModuleModal(true); };

  const submitModule = async () => {
    if (!moduleForm.title.trim()) return;
    onSaveStatus('saving');
    try {
      if (editingModule) {
        await fetch(`/api/courses/sections/${editingModule.id}`, {
          method: 'PATCH', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: moduleForm.title, goal: moduleForm.goal }),
        });
      } else {
        await fetch(`/api/courses/${courseId}/sections`, {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: moduleForm.title }),
        });
      }
      await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
    } catch { onSaveStatus('error'); }
    setShowModuleModal(false);
  };

  const deleteModule = (sectionId: string) => setConfirmModal({
    message: 'Delete this module and all its lessons? This cannot be undone.',
    onConfirm: async () => {
      setConfirmModal(null); onSaveStatus('saving');
      try {
        await fetch(`/api/courses/sections/${sectionId}`, { method: 'DELETE', credentials: 'include' });
        await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
      } catch { onSaveStatus('error'); }
    }
  });

  const duplicateModule = async (section: Section) => {
    onSaveStatus('saving');
    try {
      const res = await fetch(`/api/courses/${courseId}/sections`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `${section.title} (Copy)` }),
      });
      if (res.ok) {
        const newSec = await res.json();
        for (const l of section.lessons) {
          await fetch(`/api/courses/sections/${newSec.id}/lessons`, {
            method: 'POST', credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: l.title, lessonType: l.lessonType }),
          });
        }
      }
      await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
    } catch { onSaveStatus('error'); }
  };

  // ─── LESSON CRUD ───
  const openAddLesson = (sectionId: string) => {
    setLessonModalSectionId(sectionId);
    setEditingLesson(null);
    setLessonForm({ title: '', lessonType: 'video' });
    setShowLessonModal(true);
  };

  const openEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setLessonForm({ title: lesson.title, lessonType: lesson.lessonType });
    setShowLessonModal(true);
  };

  const submitLesson = async () => {
    if (!lessonForm.title.trim()) return;
    onSaveStatus('saving');
    try {
      if (editingLesson) {
        await fetch(`/api/courses/lessons/${editingLesson.id}`, {
          method: 'PATCH', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: lessonForm.title }),
        });
      } else {
        await fetch(`/api/courses/sections/${lessonModalSectionId}/lessons`, {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: lessonForm.title, lessonType: lessonForm.lessonType }),
        });
        setExpandedIds(prev => new Set(prev).add(lessonModalSectionId));
      }
      await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
    } catch { onSaveStatus('error'); }
    setShowLessonModal(false);
  };

  const deleteLesson = (lessonId: string) => setConfirmModal({
    message: 'Delete this lesson? This cannot be undone.',
    onConfirm: async () => {
      setConfirmModal(null); onSaveStatus('saving');
      try {
        await fetch(`/api/courses/lessons/${lessonId}`, { method: 'DELETE', credentials: 'include' });
        await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
      } catch { onSaveStatus('error'); }
    }
  });

  const duplicateLesson = async (sectionId: string, lesson: Lesson) => {
    onSaveStatus('saving');
    try {
      await fetch(`/api/courses/sections/${sectionId}/lessons`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `${lesson.title} (Copy)`, lessonType: lesson.lessonType }),
      });
      await fetchCurriculum(); onSaveStatus('saved'); setTimeout(() => onSaveStatus('idle'), 3000);
    } catch { onSaveStatus('error'); }
  };

  // ─── DRAG END (MODULES) ───
  const handleModuleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oi = sections.findIndex(s => s.id === active.id);
    const ni = sections.findIndex(s => s.id === over.id);
    if (oi !== -1 && ni !== -1) setSections(prev => arrayMove(prev, oi, ni));
  };

  // ─── DRAG END (LESSONS inside a module) ───
  const handleLessonDragEnd = (sectionId: string, event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSections(prev => prev.map(sec => {
      if (sec.id !== sectionId) return sec;
      const oi = sec.lessons.findIndex(l => l.id === active.id);
      const ni = sec.lessons.findIndex(l => l.id === over.id);
      if (oi === -1 || ni === -1) return sec;
      return { ...sec, lessons: arrayMove(sec.lessons, oi, ni) };
    }));
  };

  const handleBuildLesson = (lessonId: string) => {
    alert(`Step 3 (Lesson Builder) coming soon! Lesson ID: ${lessonId}`);
  };

  // ─── COMPUTED ───
  const totalModules = sections.length;
  const totalLessons = sections.reduce((s, sec) => s + sec.lessons.length, 0);
  const totalDuration = sections.reduce((s, sec) => s + sec.lessons.reduce((ls, l) => ls + (l.durationMinutes || 0), 0), 0);
  const estDays = totalDuration > 0 ? Math.max(1, Math.ceil(totalDuration / 20)) : 0;
  const durStr = totalDuration >= 60
    ? `${Math.floor(totalDuration / 60)}h ${totalDuration % 60 > 0 ? (totalDuration % 60) + 'm' : ''}`
    : `${totalDuration}m`;

  const hasModule = totalModules >= 1;
  const hasLessons = totalLessons >= 3;
  const hasPreview = false;
  const hasEstimation = estDays > 0;
  const checkDone = [hasModule, hasLessons, hasPreview, hasEstimation].filter(Boolean).length;

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94A3B8' }}>
      <div style={{ fontSize: 16, fontWeight: 600 }}>Loading curriculum…</div>
    </div>
  );

  return (
    <>
      {/* PAGE HEADER */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Build Curriculum</h1>
          <p className={styles.pageSubtitle}>Organize your course into modules and lessons. Drag to reorder.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.outlineBtn}><BookOpen size={14} /> Import Curriculum</button>
          <button className={styles.outlineBtn}><Target size={14} /> Templates</button>
          <button className={styles.continueBtn}><span>Continue</span> <ArrowRight size={14} /></button>
        </div>
      </div>

      {/* SUMMARY BAR */}
      <div className={styles.summaryBar}>
        {[
          { value: totalModules.toString(), label: 'Modules' },
          { value: totalLessons.toString(), label: 'Lessons' },
          { value: durStr || '0m', label: 'Total content' },
          { value: estDays > 0 ? `~${estDays} days` : '—', label: 'Est. completion (20 min/day)' },
        ].map(item => (
          <div key={item.label} className={styles.summaryItem}>
            <span className={styles.summaryValue}>{item.value}</span>
            <span className={styles.summaryLabel}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* CONTENT GRID */}
      <div className={styles.contentGrid}>
        {/* LEFT: STRUCTURE */}
        <div>
          <div className={styles.structureHeader}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={styles.structureTitle}>Course Structure</span>
            </div>
            <div className={styles.structureActions}>
              <button className={styles.expandAllBtn} onClick={expandAll}>
                {expandedIds.size === sections.length && sections.length > 0 ? 'Collapse all' : 'Expand all'}
              </button>
              <button className={styles.addModuleBtn} onClick={openAddModule}>
                <Plus size={14} /> Add Module
              </button>
            </div>
          </div>

          {sections.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateTitle}>No modules yet</div>
              <div className={styles.emptyStateDesc}>Start by adding your first module to organize your curriculum.</div>
              <button className={styles.addModuleBtn} onClick={openAddModule}><Plus size={14} /> Add Your First Module</button>
            </div>
          ) : (
            <DndContext sensors={moduleSensors} collisionDetection={closestCenter} onDragEnd={handleModuleDragEnd}>
              <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                <div className={styles.moduleList}>
                  {sections.map((section, i) => (
                    <SortableModule
                      key={section.id} section={section} index={i}
                      expanded={expandedIds.has(section.id)}
                      onToggle={() => toggle(section.id)}
                      onEdit={() => openEditModule(section)}
                      onDuplicate={() => duplicateModule(section)}
                      onDelete={() => deleteModule(section.id)}
                      onAddLesson={() => openAddLesson(section.id)}
                      onDeleteLesson={deleteLesson}
                      onDuplicateLesson={(l) => duplicateLesson(section.id, l)}
                      onBuildLesson={handleBuildLesson}
                      onEditLesson={openEditLesson}
                      onLessonDragEnd={handleLessonDragEnd}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          {sections.length > 0 && (
            <div className={styles.addModuleBottom} onClick={openAddModule}>
              <Plus size={16} color="#4F46E5" />
              <div>
                <div className={styles.addModuleBottomText}>Add Module</div>
                <div className={styles.addModuleBottomHint}>Create a new module to organize more lessons</div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.widgetCard}>
            <h3 className={styles.widgetTitle}>Preview Video</h3>
            <p className={styles.widgetDesc}>Give learners a quick preview of what to expect.</p>
            <div className={styles.videoPreview}><div className={styles.videoPlayIcon}><Play size={24} /></div></div>
            <button className={styles.selectVideoBtn}>Select Video</button>
            <div className={styles.videoHint}>Recommended: 1–2 min (16:9) · MP4, MOV up to 200MB</div>
          </div>

          <div className={styles.widgetCard}>
            <h3 className={styles.widgetTitle}>Curriculum Tips</h3>
            <div className={styles.tipsList}>
              {[
                { icon: <Clock size={15}/>, title: 'Keep lessons short', desc: 'Aim for 5–12 minutes per lesson.' },
                { icon: <Target size={15}/>, title: 'Follow the learning flow', desc: 'Learn → Apply → Reflect → Deepen.' },
                { icon: <Lightbulb size={15}/>, title: 'Use real-world examples', desc: 'Helps learners understand and retain better.' },
              ].map(t => (
                <div key={t.title} className={styles.tipRow}>
                  <div className={styles.tipIcon}>{t.icon}</div>
                  <div><div className={styles.tipTitle}>{t.title}</div><div className={styles.tipDesc}>{t.desc}</div></div>
                </div>
              ))}
            </div>
            <button className={styles.viewGuideLink}>View Curriculum Guide <ExternalLink size={11} /></button>
          </div>

          <div className={styles.widgetCard}>
            <h3 className={styles.widgetTitle}>Curriculum Checklist</h3>
            <p className={styles.widgetDesc}>Complete all required items to continue</p>
            <div className={styles.checklist}>
              {[
                { label: 'Add at least 1 module', done: hasModule },
                { label: 'Add at least 3 lessons', done: hasLessons },
                { label: 'Set preview video', done: hasPreview },
                { label: 'Lessons have content added', done: hasEstimation },
              ].map(item => (
                <div key={item.label} className={styles.checkRow}>
                  <div className={`${styles.checkCircle} ${item.done ? styles.checkCircleDone : ''}`}>
                    {item.done && <Check size={11} />}
                  </div>
                  <span className={styles.checkLabel}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.checkProgress}>
              <div className={styles.progressBarSmall}>
                <div className={styles.progressFillSmall} style={{ width: `${(checkDone / 4) * 100}%` }} />
              </div>
              <span className={styles.progressText}>{checkDone} / 4 complete</span>
            </div>
          </div>
        </aside>
      </div>

      {/* ─── MODULE MODAL ─── */}
      {showModuleModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModuleModal(false)}>
          <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 className={styles.modalTitle} style={{ margin: 0 }}>{editingModule ? 'Edit Module' : 'Add New Module'}</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }} onClick={() => setShowModuleModal(false)}><X size={18} /></button>
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Module Title *</label>
              <input className={styles.modalInput} placeholder="e.g. Introduction to UI Design" value={moduleForm.title} onChange={e => setModuleForm(p => ({ ...p, title: e.target.value }))} autoFocus onKeyDown={e => e.key === 'Enter' && submitModule()} />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Learning Outcome</label>
              <div className={styles.modalHint}>What will learners understand by the end?</div>
              <textarea className={styles.modalTextarea} placeholder="By the end of this module, learners will…" value={moduleForm.goal} onChange={e => setModuleForm(p => ({ ...p, goal: e.target.value }))} rows={2} />
            </div>
            <div className={styles.modalTwoCol}>
              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Estimated Completion</label>
                <input className={styles.modalInput} placeholder="e.g. 45 minutes" value={moduleForm.duration} onChange={e => setModuleForm(p => ({ ...p, duration: e.target.value }))} />
              </div>
              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Difficulty</label>
                <select className={styles.modalSelect} value={moduleForm.difficulty} onChange={e => setModuleForm(p => ({ ...p, difficulty: e.target.value }))}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </div>
            </div>
            <div className={styles.aiSection}>
              <div className={styles.aiSectionTitle}><Sparkles size={14} /> Smart Teyro AI Features</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {['Generate Outline', 'Suggest Lessons', 'Estimate Duration'].map(label => (
                  <button key={label} className={styles.aiBtn} onClick={() => setShowPremiumModal(true)}><Brain size={12} /> {label}</button>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.modalCancelBtn} onClick={() => setShowModuleModal(false)}>Cancel</button>
              <button className={styles.modalSubmitBtn} onClick={submitModule}>{editingModule ? 'Save Changes' : 'Add Module'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── LESSON MODAL ─── */}
      {showLessonModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLessonModal(false)}>
          <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 className={styles.modalTitle} style={{ margin: 0 }}>{editingLesson ? 'Edit Lesson' : 'Add Lesson'}</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }} onClick={() => setShowLessonModal(false)}><X size={18} /></button>
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Lesson Title *</label>
              <input className={styles.modalInput} placeholder="e.g. What is UI Design?" value={lessonForm.title} onChange={e => setLessonForm(p => ({ ...p, title: e.target.value }))} autoFocus onKeyDown={e => e.key === 'Enter' && submitLesson()} />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Lesson Type</label>
              <div className={styles.lessonTypePicker}>
                {LESSON_TYPES.map(t => (
                  <button key={t.key} type="button"
                    className={`${styles.lessonTypeCard} ${lessonForm.lessonType === t.key ? styles.lessonTypeCardActive : ''}`}
                    onClick={() => setLessonForm(p => ({ ...p, lessonType: t.key }))}
                  >
                    <div className={styles.lessonTypeIcon} style={{ background: lessonForm.lessonType === t.key ? t.color + '22' : '#F1F5F9', color: t.color }}>
                      {t.icon}
                    </div>
                    <span className={styles.lessonTypeName}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.modalCancelBtn} onClick={() => setShowLessonModal(false)}>Cancel</button>
              <button className={styles.modalSubmitBtn} onClick={submitLesson}>{editingLesson ? 'Save Changes' : 'Add Lesson'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CONFIRM MODAL ─── */}
      {confirmModal && (
        <ConfirmModal message={confirmModal.message} onConfirm={confirmModal.onConfirm} onCancel={() => setConfirmModal(null)} />
      )}

      {/* ─── PREMIUM MODAL ─── */}
      {showPremiumModal && (
        <div className={styles.premiumOverlay} onClick={() => setShowPremiumModal(false)}>
          <div className={styles.premiumBox} onClick={e => e.stopPropagation()}>
            <div className={styles.premiumIcon}><Sparkles size={32} /></div>
            <h3 className={styles.premiumTitle}>AI Features Coming Soon</h3>
            <p className={styles.premiumDesc}>Teyro AI will help you generate outlines, suggest lessons, and build better learning journeys. Available in our upcoming Pro plan.</p>
            <button className={styles.premiumBtn} onClick={() => setShowPremiumModal(false)}>Got it — can't wait!</button>
          </div>
        </div>
      )}
    </>
  );
}
