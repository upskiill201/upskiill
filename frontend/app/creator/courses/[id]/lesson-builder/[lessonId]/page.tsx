"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, ChevronLeft, ChevronDown, Check, Eye, Play, FileText, Headphones,
  UploadCloud, Sparkles, MoreVertical, Plus, ArrowRight, BookOpen, Trash2, Film, CheckCircle2,
  Target, Award, Info, WifiOff, AlertCircle, AlertTriangle
} from 'lucide-react';
import styles from './LessonBuilder.module.css';
import Skeleton from '@/components/ui/Skeleton';
import { useS3Upload } from '@/hooks/useS3Upload';
import { useDebounce } from '@/hooks/useDebounce';
import { useSyncQueue } from '@/hooks/useSyncQueue';
import { useOrphanedMediaCleanup } from '@/hooks/useOrphanedMediaCleanup';
import { useLinkNavigationGuard } from '@/hooks/useLinkNavigationGuard';
import { Toast } from '@/components/ui/Toast';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

/* ── sub-components ── */
import { LearningResources, ResourceItem } from './components/LearningResources';
import { ApplyTab, MCQActivity } from './components/ApplyTab';
import { ApplySidebar } from './components/ApplySidebar';
import { ReflectTab, ReflectActivity } from './components/ReflectTab';
import { ReflectSidebar } from './components/ReflectSidebar';
import { DeepenTab, DeepenConfig } from './components/DeepenTab';
import { DeepenSidebar } from './components/DeepenSidebar';
import { ReviewPublishTab } from './components/ReviewPublishTab';
import { ReviewPublishSidebar } from './components/ReviewPublishSidebar';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

/* Single source of truth for "is the Deepen phase filled in" — used by the
 * progress UI, the autosave and the publish payload so they can never disagree. */
function deepenPhaseComplete(config: { collectionTitle?: string } | null, resources: { url?: string }[]) {
  return !!(config?.collectionTitle || '').trim()
    && resources.length > 0
    && resources.every(r => !!(r.url || '').trim());
}

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image', 'code-block'],
    ['clean']
  ],
};

/* ─── PAGE ─── */
export default function LessonBuilderPage({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const { id: courseId, lessonId } = React.use(params);
  const router = useRouter();

  // Clean filename extractor helper
  const getFileNameFromUrl = (url: string) => {
    if (!url) return '';
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const match = lastPart.match(/^(.+)_\d+\.([^.]+)$/);
    if (match) {
      return `${match[1]}.${match[2]}`;
    }
    return lastPart;
  };

  // AWS S3 Direct Upload hooks
  const {
    upload: uploadVideo,
    uploading: uploadingVideo,
    progress: videoProgress,
    resumed: videoResumed,
    error: videoError
  } = useS3Upload();

  const {
    upload: uploadAudio,
    uploading: uploadingAudio,
    progress: audioProgress,
    error: audioError
  } = useS3Upload();

  /** "532s of real media" → "9" minutes for time estimates (min 1). */
  const minutesFromSeconds = (seconds: number | null | undefined) => {
    if (!seconds || seconds <= 0) return null;
    return Math.max(1, Math.ceil(seconds / 60));
  };

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      e.target.value = ''; // allow re-picking the same file later
      try {
        const { cloudFrontUrl } = await uploadVideo(file, lessonId, {
          // Real duration read off the local file — replaces the old
          // always-0 estimate that made lesson timings meaningless.
          onDuration: (seconds) => {
            const minutes = minutesFromSeconds(seconds);
            if (minutes) setLesson((l: any) => ({ ...l, durationMinutes: minutes }));
          },
        });
        setLesson((l: any) => {
          // Queue the video this one replaces for cleanup. It is only
          // actually deleted once the new URL is saved AND the server
          // confirms nothing still points at the old object.
          markSuperseded(l?.learnVideoUrl);
          return { ...l, learnVideoUrl: cloudFrontUrl };
        });
        // Persistence is handled by the debounced autosave (learn phase block).
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.error('Video upload failed:', err);
          alert(`The video could not be uploaded: ${err instanceof Error ? err.message : 'please try again.'}`);
        }
      }
    }
  };

  const handleAudioFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      e.target.value = ''; // allow re-picking the same file later
      try {
        const { cloudFrontUrl } = await uploadAudio(file, lessonId, {
          onDuration: (seconds) => {
            const minutes = minutesFromSeconds(seconds);
            if (minutes) setLesson((l: any) => ({ ...l, durationMinutes: minutes }));
          },
        });
        setLesson((l: any) => {
          markSuperseded(l?.learnAudioUrl);
          return { ...l, learnAudioUrl: cloudFrontUrl };
        });
        // Persistence is handled by the debounced autosave (learn phase block).
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.error('Audio upload failed:', err);
          alert(`The audio could not be uploaded: ${err instanceof Error ? err.message : 'please try again.'}`);
        }
      }
    }
  };

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  /** True when a save was rejected with 409 — the lesson changed elsewhere.
   *  Blocks navigation-adjacent lies until the creator picks a side. */
  const [conflict, setConflict] = useState(false);
  const [resolvingConflict, setResolvingConflict] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [courseTitle, setCourseTitle] = useState('Course');
  const [sectionTitle, setSectionTitle] = useState('Section');

  const [currentTab, setCurrentTab] = useState('learn');
  const [contentType, setContentType] = useState('video');
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>([]);
  const [mcqActivity, setMcqActivity] = useState<MCQActivity>({
    scenario: '',
    passingScore: 70,
    allowRetries: true,
    difficultyLevel: 'medium',
    questions: [],
  });
  const [reflectActivity, setReflectActivity] = useState<ReflectActivity>({
    prompt: '',
    type: 'open',
    openConfig: {
      useStarters: false,
      starters: [
        { id: 's_1', text: 'I learned that...' },
        { id: 's_2', text: 'This will help me...' },
        { id: 's_3', text: 'I want to try...' }
      ],
      minWordCount: 20,
      required: true,
      peerVisibility: false,
      allowComments: false,
      allowAttachments: false,
    },
    guidedConfig: {
      questions: [{ id: 'q_1', text: '' }],
      minWordCountPerQuestion: 10,
      required: true,
      allowAttachments: false,
    }
  });
  const [deepenConfig, setDeepenConfig] = useState<DeepenConfig>({
    collectionTitle: '',
    collectionDescription: '',
    resourceSettings: {
      makeRequired: false,
      trackCompletion: false,
      allowDownloads: true,
      openInNewTab: true,
    },
    recommendedNextStep: { type: 'continue' },
    showLearningPathSuggestions: false,
    learningPathSuggestions: [],
  });

  const { isOnline, syncStatus, lastSavedAt, isDirty, syncMetadata, syncPhase, setDirty, adoptServerVersion, getVersion, resyncVersion, clearLocalBackups, flushQueue, getLocalBackupTimestamp, withSaveLock, fetchWithTimeout } = useSyncQueue(lessonId as string, lesson?.version || 1);

  /** Unsynced edits found in localStorage on load — e.g. the tab crashed or
   *  lost network before autosave could flush them to the server. Offering
   *  to restore them (instead of silently doing nothing, which is what
   *  happened before) is what fixes "I refreshed and my work was gone." */
  const [recoverableDraftAt, setRecoverableDraftAt] = useState<number | null>(null);
  const [recovering, setRecovering] = useState(false);

  // Media replaced during authoring is deleted only once the replacement is
  // durably saved — and only if the server agrees nothing references it.
  const { markSuperseded } = useOrphanedMediaCleanup(
    lessonId as string,
    syncStatus === 'saved' && !isDirty,
  );

  // Guard in-app link navigation while there is unsaved or in-flight work.
  useLinkNavigationGuard(!loading && (isDirty || saving));

  // ─── Browser back/forward guard (history sentinel) ───
  // App-router popstate navigations can't be cancelled, so while there is
  // unsaved/in-flight work a duplicate same-URL entry sits above the real
  // one: the first Back press pops only the sentinel (no navigation) and we
  // ask; leaving takes an explicit second Back. One silent press used to
  // discard every unsaved edit.
  const historyGuardRef = useRef({ armed: false, consuming: false });

  useEffect(() => {
    const guard = historyGuardRef.current;
    const shouldArm = !loading && (isDirty || saving);

    if (shouldArm && !guard.armed) {
      window.history.pushState({ teyroLessonGuard: true }, '');
      guard.armed = true;
    } else if (!shouldArm && guard.armed) {
      // Saved/clean again — consume our own sentinel entry so Back isn't a
      // dead first press. The popstate handler recognizes this via `consuming`.
      guard.consuming = true;
      window.history.back();
    }

    const onPopState = () => {
      if (guard.consuming) {
        guard.consuming = false;
        guard.armed = false;
        return;
      }
      if (!guard.armed) return;

      const leave = window.confirm(
        'Leave without saving?\n\nYour unsaved changes will be lost.'
      );
      if (leave) {
        // The pop above consumed the sentinel — go back for real.
        guard.armed = false;
        window.history.back();
      } else {
        // Stay: rebuild the sentinel we just popped.
        window.history.pushState({ teyroLessonGuard: true }, '');
        guard.armed = true;
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [loading, isDirty, saving]);

  const debouncedLesson = useDebounce(lesson, 1000);
  const debouncedMcqActivity = useDebounce(mcqActivity, 1000);
  const debouncedReflectActivity = useDebounce(reflectActivity, 1000);
  const debouncedDeepenConfig = useDebounce(deepenConfig, 1000);
  const debouncedResources = useDebounce(resources, 1000);
  const debouncedWhatYouWillLearn = useDebounce(whatYouWillLearn, 1000);

  /* ── change detection ──
   * Snapshot of everything the builder can save. `lastSavedSnapshot` holds the
   * serialized state as of the last successful save (initialised after load).
   * Dirty is only raised when the live state genuinely differs from it, which
   * prevents the phantom "save on open" that used to fire on every page load.
   */
  const snapshotRef = useRef('');
  // lessonType as it exists on the server — saves only send lessonType when
  // the creator explicitly changes it in this session (see applyLoadedLesson).
  const loadedLessonTypeRef = useRef('video');
  const lastSavedSnapshotRef = useRef<string | null>(null);
  /** Set when freshly loaded server state should become the new "saved"
   *  baseline (discard-and-reload) — consumed once by the dirty effect. */
  const pendingBaselineRef = useRef(false);

  const buildSaveSnapshot = () => JSON.stringify([
    lesson?.title,
    lesson?.shortDescription,
    lesson?.description,
    lesson?.learnVideoUrl,
    lesson?.learnAudioUrl,
    lesson?.learnText,
    lesson?.durationMinutes,
    contentType,
    whatYouWillLearn,
    mcqActivity,
    reflectActivity,
    deepenConfig,
    resources,
  ]);
  snapshotRef.current = buildSaveSnapshot();

  const markLocallySaved = (snapshot?: string) => {
    lastSavedSnapshotRef.current = snapshot ?? snapshotRef.current;
  };

  // Track dirty state when the live state diverges from the last-saved snapshot
  useEffect(() => {
    if (loading) return;
    if (pendingBaselineRef.current) {
      // Fresh server state just replaced everything — adopt it as the new
      // saved baseline instead of mistaking it for user changes.
      pendingBaselineRef.current = false;
      lastSavedSnapshotRef.current = buildSaveSnapshot();
      return;
    }
    if (lastSavedSnapshotRef.current === null) {
      // First pass after load — remember exactly what came from the server so
      // we never mistake loaded data for user changes.
      lastSavedSnapshotRef.current = buildSaveSnapshot();
      return;
    }
    if (buildSaveSnapshot() !== lastSavedSnapshotRef.current) {
      setDirty();
    }
  }, [lesson, mcqActivity, reflectActivity, deepenConfig, resources, contentType, whatYouWillLearn, setDirty]);

  /** Map a server lesson payload onto the builder's state slices. Shared by
   *  the initial load and the conflict banner's "discard & reload" action. */
  const applyLoadedLesson = useCallback((d: any) => {
    setLesson(d);
    if (d.section?.course?.title) setCourseTitle(d.section.course.title);
    if (d.section?.title) setSectionTitle(d.section.title);
    // Legacy rows may hold types this editor can't author (quiz, link, …).
    // Edit them as video but remember the stored value so saves only rewrite
    // lessonType when the creator explicitly picks a different type here.
    const loadedType = d.lessonType || 'video';
    loadedLessonTypeRef.current = loadedType;
    setContentType(['video', 'text', 'audio'].includes(loadedType) ? loadedType : 'video');

    if (d.resources) {
      // DB rows use storageUrl/sizeBytes/estimatedReadMin — map them onto
      // the builder's ResourceItem shape so reloads keep size/time metadata.
      setResources((d.resources as any[]).map(r => ({
        id: r.id,
        title: r.title,
        type: r.type,
        url: r.storageUrl || '',
        size: typeof r.sizeBytes === 'number' && r.sizeBytes > 0 ? `${(r.sizeBytes / (1024 * 1024)).toFixed(1)} MB` : undefined,
        time: r.estimatedReadMin > 0 ? `${r.estimatedReadMin} min read` : undefined,
        estimatedReadMin: r.estimatedReadMin ?? 0,
        description: r.description,
        category: r.category,
      })));
    }
    if (d.contentBlocks) {
      let parsedBlocks = d.contentBlocks;
      if (typeof parsedBlocks === 'string') {
        try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) { parsedBlocks = {}; }
      }
      d.contentBlocks = parsedBlocks; // Ensure other parts of the app use the parsed object

      if (parsedBlocks?.learn) {
        const learnBlocks = parsedBlocks.learn;
        setLesson((l: any) => ({
          ...l,
          learnVideoUrl: learnBlocks.find((b: any) => b.type === 'videoUrl')?.value,
          learnAudioUrl: learnBlocks.find((b: any) => b.type === 'audioUrl')?.value,
          learnText: learnBlocks.find((b: any) => b.type === 'text')?.value,
        }));
        const wylBlock = learnBlocks.find((b: any) => b.type === 'whatYouWillLearn')?.value;
        setWhatYouWillLearn(Array.isArray(wylBlock) ? wylBlock : []);
      }
      if (parsedBlocks?.apply) {
        const applyBlocks = parsedBlocks.apply;
        const mcqBlock = Array.isArray(applyBlocks)
          ? applyBlocks.find((b: any) => b.type === 'mcqActivity')?.value
          : applyBlocks?.mcqActivity;
        if (mcqBlock) setMcqActivity(mcqBlock);
      }
      if (parsedBlocks?.reflect) {
        const reflectBlocks = parsedBlocks.reflect;
        const reflectBlock = Array.isArray(reflectBlocks)
          ? reflectBlocks.find((b: any) => b.type === 'reflectActivity')?.value
          : reflectBlocks?.reflectActivity;
        if (reflectBlock) setReflectActivity(reflectBlock);
      }
      if (parsedBlocks?.deepen) {
        const deepenBlocks = parsedBlocks.deepen;
        const deepenBlock = Array.isArray(deepenBlocks)
          ? deepenBlocks.find((b: any) => b.type === 'deepenActivity')?.value
          : deepenBlocks?.deepenActivity;
        if (deepenBlock) setDeepenConfig(deepenBlock);
      }
    }
  }, []);

  /* fetch */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/lesson/${lessonId}`);
        if (!res.ok) {
          setLoadError(res.status === 404
            ? 'This lesson could not be found. It may have been deleted.'
            : `Could not load this lesson (error ${res.status}). Please try again.`);
          return;
        }
        const d = await res.json();
        applyLoadedLesson(d);
        // Surface any edits left behind by a crashed tab / dropped network
        // instead of silently ignoring them (previous behavior).
        const backupAt = getLocalBackupTimestamp();
        if (backupAt) setRecoverableDraftAt(backupAt);
      } catch (e) {
        console.error(e);
        setLoadError('A network error occurred while loading this lesson. Check your connection and try again.');
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  /** Replay the local backups onto the server via the granular endpoints,
   *  then reload so the builder reflects the merged, now-persisted state. */
  const restoreLocalDraft = async () => {
    setRecovering(true);
    try {
      await flushQueue();
      const res = await fetch(`/api/lesson/${lessonId}`);
      if (res.ok) {
        const d = await res.json();
        pendingBaselineRef.current = true;
        applyLoadedLesson(d);
        adoptServerVersion(d?.version);
      }
      setRecoverableDraftAt(null);
    } catch {
      setSyncError('Could not restore your unsaved draft. It is still kept locally — try again.');
    } finally {
      setRecovering(false);
    }
  };

  const discardLocalDraft = () => {
    if (!window.confirm('Discard the unsaved changes found from your last session? This cannot be undone.')) return;
    clearLocalBackups();
    setRecoverableDraftAt(null);
  };

  /* Autosave */
  // Guards against two overlapping runAutosave() calls: each debounce settle
  // re-fires this effect, and typing again mid-save used to let a second
  // 5-request autosave chain start before the first finished.
  const autosaveInFlightRef = useRef(false);

  useEffect(() => {
    if (loading || !debouncedLesson || !debouncedMcqActivity || !debouncedReflectActivity || !debouncedDeepenConfig) return;
    if (lastSavedSnapshotRef.current === null) return;
    // A conflict banner is already up — don't keep auto-firing more requests
    // with the same stale version while the creator hasn't resolved it yet.
    if (conflict) return;
    if (autosaveInFlightRef.current) return;
    // Only hit the API when the settled state genuinely differs from what the
    // server last acknowledged — prevents the phantom save that used to fire
    // on every page load.
    if (buildSaveSnapshot() === lastSavedSnapshotRef.current) return;

    const runAutosave = async () => {
      autosaveInFlightRef.current = true;
      try {
        const savedSnapshot = buildSaveSnapshot();
        const isLearnCompleted = !!(debouncedLesson.title && (debouncedLesson.learnVideoUrl || debouncedLesson.learnText || debouncedLesson.learnAudioUrl));

        const metadataResult = await syncMetadata({
          title: debouncedLesson.title,
          shortDescription: debouncedLesson.shortDescription,
          description: debouncedLesson.description,
          ...(contentType !== loadedLessonTypeRef.current ? { lessonType: contentType } : {}),
          // Measured media length from the latest upload (undefined → omitted)
          ...(typeof debouncedLesson.durationMinutes === 'number' && {
            durationMinutes: debouncedLesson.durationMinutes,
          }),
        });
        // Stop the chain the moment one call hits a real conflict — the
        // version is now behind, so every remaining call would just 409 too
        // and pile more noise onto the same banner.
        if (metadataResult.conflict) { setConflict(true); return; }

        const learnResult = await syncPhase('learn', {
          contentBlocks: [
            { type: 'videoUrl', value: debouncedLesson.learnVideoUrl },
            { type: 'audioUrl', value: debouncedLesson.learnAudioUrl },
            { type: 'text', value: debouncedLesson.learnText },
            { type: 'whatYouWillLearn', value: debouncedWhatYouWillLearn },
          ],
          isCompleted: isLearnCompleted
        });
        if (learnResult.conflict) { setConflict(true); return; }

        const isApplyCompleted = debouncedMcqActivity.questions.length > 0 &&
          debouncedMcqActivity.questions.every(q => q.questionText.trim() && q.correctOptionId && q.options.length >= 2);
        const applyResult = await syncPhase('apply', {
          contentBlocks: [{ type: 'mcqActivity', value: debouncedMcqActivity }],
          isCompleted: isApplyCompleted
        });
        if (applyResult.conflict) { setConflict(true); return; }

        const isReflectCompleted = debouncedReflectActivity.prompt.trim().length > 0 &&
          (debouncedReflectActivity.type === 'open' ? (!debouncedReflectActivity.openConfig.useStarters || debouncedReflectActivity.openConfig.starters.length > 0) :
          (debouncedReflectActivity.guidedConfig.questions.length > 0 && debouncedReflectActivity.guidedConfig.questions.every(q => q.text.trim())));
        const reflectResult = await syncPhase('reflect', {
          contentBlocks: [{ type: 'reflectActivity', value: debouncedReflectActivity }],
          isCompleted: isReflectCompleted
        });
        if (reflectResult.conflict) { setConflict(true); return; }

        // Deepen config (collection title/settings) persists through the phase block;
        // the resources themselves are persisted via the dedicated resource endpoints.
        const deepenResult = await syncPhase('deepen', {
          contentBlocks: [{ type: 'deepenActivity', value: debouncedDeepenConfig }],
          isCompleted: deepenPhaseComplete(deepenConfig, debouncedResources)
        });
        if (deepenResult.conflict) { setConflict(true); return; }

        if (metadataResult.ok && learnResult.ok && applyResult.ok && reflectResult.ok && deepenResult.ok) {
          markLocallySaved(savedSnapshot);
        }
      } finally {
        autosaveInFlightRef.current = false;
      }
    };

    runAutosave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLesson, debouncedMcqActivity, debouncedReflectActivity, debouncedDeepenConfig, debouncedResources, contentType, loading, debouncedWhatYouWillLearn]);

  /**
   * buildSavePayload — constructs the full-save payload from current live state.
   * Used by both forceManualSave and handlePublish. Carries the current known
   * version so the server can reject conflicting concurrent edits (409).
   */
  const buildSavePayload = () => {
    const currentLesson = lesson;
    const isLearnCompleted = !!(currentLesson?.title && (currentLesson?.learnVideoUrl || currentLesson?.learnText || currentLesson?.learnAudioUrl));
    const isApplyCompleted = mcqActivity.questions.length > 0 &&
      mcqActivity.questions.every((q: any) => q.questionText.trim() && q.correctOptionId && q.options.length >= 2);
    const isReflectCompleted = reflectActivity.prompt.trim().length > 0 &&
      (reflectActivity.type === 'open'
        ? (!reflectActivity.openConfig.useStarters || reflectActivity.openConfig.starters.length > 0)
        : (reflectActivity.guidedConfig.questions.length > 0 && reflectActivity.guidedConfig.questions.every((q: any) => q.text.trim())));
    const isDeepenCompleted = deepenPhaseComplete(deepenConfig, resources);

    return {
      // Metadata
      title: currentLesson?.title || '',
      shortDescription: currentLesson?.shortDescription || '',
      description: currentLesson?.description || '',
      ...(contentType !== loadedLessonTypeRef.current ? { lessonType: contentType } : {}),
      durationMinutes: currentLesson?.durationMinutes,
      // Phase blocks
      learnBlocks: [
        { type: 'videoUrl', value: currentLesson?.learnVideoUrl || '' },
        { type: 'audioUrl', value: currentLesson?.learnAudioUrl || '' },
        { type: 'text', value: currentLesson?.learnText || '' },
        { type: 'whatYouWillLearn', value: whatYouWillLearn },
      ],
      applyBlocks: [{ type: 'mcqActivity', value: mcqActivity }],
      reflectBlocks: [{ type: 'reflectActivity', value: reflectActivity }],
      deepenBlocks: [{ type: 'deepenActivity', value: deepenConfig }],
      // Completion
      isLearnCompleted,
      isApplyCompleted,
      isReflectCompleted,
      isDeepenCompleted,
      // Optimistic locking
      version: getVersion(),
    };
  };

  /**
   * save — ONE request, optimistic UI so creator sees result immediately.
   *
   * Runs through `withSaveLock`, the SAME queue the granular autosave uses.
   * Previously this fired a raw, unlocked `fetch` while autosave's own
   * metadata/phase calls could be mid-flight — two requests racing on the
   * same version counter, so one would legitimately 409 the other even
   * though nobody else had touched the lesson. That self-collision is what
   * produced the "saved elsewhere" banner for a single creator working
   * alone, and it could re-trigger indefinitely since the 60s interval
   * autosave kept retrying with the same stale version. Sharing the lock
   * makes every save (autosave or manual) execute strictly one-at-a-time.
   */
  const forceManualSave = async (bypassConflictGuard = false): Promise<{ ok: boolean }> => {
    if (!lesson) return { ok: false };
    // A conflict is already on screen — only the banner's own explicit
    // "keep mine" / "discard mine" actions (which pass bypassConflictGuard)
    // may save until it's resolved. Otherwise every retry (interval timer,
    // Ctrl+S, another Save click) just re-fires the same losing request and
    // re-shows the same banner.
    if (conflict && !bypassConflictGuard) return { ok: false };
    setSaving(true);

    let ok = false;
    try {
      await withSaveLock(async () => {
        const payload = buildSavePayload();
        const savedSnapshot = buildSaveSnapshot();

        const res = await fetchWithTimeout(`/api/lesson/${lessonId}/full-save`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          if (res.status === 409) {
            // Another session saved first. Surface the conflict and stop — the
            // old flow adopted the server version here, which cleared isDirty
            // and showed "Saved" while NOTHING had been written, silently
            // disarming the close-guard and interval autosave.
            setConflict(true);
          } else {
            setSyncError('Your changes could not be saved because the lesson was modified elsewhere. Review your content and save again.');
          }
          return;
        }

        const data = await res.json().catch(() => null);
        adoptServerVersion(data?.version);   // keep granular autosave in sync + clear dirty
        markLocallySaved(savedSnapshot);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
        ok = true;
      });
    } catch (err) {
      console.error('forceManualSave error:', err);
      const timedOut = err instanceof DOMException && err.name === 'AbortError';
      setSyncError(timedOut
        ? 'Saving is taking too long and was cancelled. Your changes are still in this tab — try again.'
        : 'A network error occurred while saving. Your changes are still in this tab — try again.');
    } finally {
      setSaving(false);
    }
    return { ok };
  };

  /** Save, then navigate ONLY when the save actually succeeded — a failed
   *  "Save & Exit" must leave the creator on the page with their edits. */
  const handleSave = async (redirect?: string) => {
    const result = await forceManualSave();
    if (result.ok && redirect) router.push(redirect);
    return result;
  };

  /**
   * Conflict banner actions. The creator decides which version wins:
   *  - Keep mine: adopt the server's latest counter, then explicitly save my
   *    content over it (user-sanctioned last-write-wins).
   *  - Discard mine: drop local edits + queued backups and reload the server
   *    version as the new baseline.
   */
  const resolveConflictKeepMine = async () => {
    if (resolvingConflict) return;
    setResolvingConflict(true);
    try {
      await resyncVersion();
      const result = await forceManualSave(true);
      if (result.ok) {
        // Stale granular backups must never replay through the offline queue.
        clearLocalBackups();
        setConflict(false);
      } else {
        setSyncError('Still could not save your changes. Copy your content somewhere safe, then try again or reload.');
      }
    } finally {
      setResolvingConflict(false);
    }
  };

  const resolveConflictDiscardMine = async () => {
    if (!window.confirm('Discard ALL unsaved changes in this tab and load the last saved version? This cannot be undone.')) return;
    clearLocalBackups();
    setConflict(false);
    setLoading(true);
    pendingBaselineRef.current = true;
    try {
      const res = await fetch(`/api/lesson/${lessonId}`);
      if (!res.ok) {
        setLoadError(res.status === 404
          ? 'This lesson could not be found. It may have been deleted.'
          : `Could not reload this lesson (error ${res.status}). Please try again.`);
        return;
      }
      const d = await res.json();
      applyLoadedLesson(d);
      adoptServerVersion(d?.version);
    } catch {
      setSyncError('A network error occurred while reloading. Your tab still holds the discarded state — refresh to get the saved version.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (_options: any) => {
    if (conflict) {
      setPublishError('This lesson was changed elsewhere. Resolve the conflict above, then publish again.');
      return;
    }
    setIsPublishing(true);
    setPublishError(null);

    try {
      // Same lock as every other save path — a concurrent autosave call
      // must not race the publish request over the version counter.
      await withSaveLock(async () => {
        const payload = buildSavePayload();

        // Single request: save + publish atomically
        const res = await fetchWithTimeout(`/api/lesson/${lessonId}/full-save-publish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          if (res.status === 409) {
            // Same conflict discipline as manual save: never silently adopt the
            // server version here — that used to clear isDirty and show "Saved"
            // while nothing had been written. Surface the banner instead.
            setConflict(true);
            setPublishError('This lesson was just changed in another tab or session. Resolve the conflict above, then publish again.');
          } else {
            const errorData = await res.json().catch(() => null);
            setPublishError(errorData?.errors?.join(' · ')
              || errorData?.message
              || 'Failed to publish. Please check all required sections.');
          }
          return;
        }

        const data = await res.json().catch(() => null);
        adoptServerVersion(data?.lesson?.version);
        markLocallySaved(buildSaveSnapshot());

        // Success! Navigate to curriculum builder
        router.push(`/creator/builder/${courseId}?step=2`);
      });
    } catch (err) {
      console.error('Publish error:', err);
      const timedOut = err instanceof DOMException && err.name === 'AbortError';
      setPublishError(timedOut
        ? 'Publishing is taking too long and was cancelled. Please try again.'
        : 'A network error occurred. Please check your connection and try again.');
    } finally {
      setIsPublishing(false);
    }
  };


  /* Interval Autosave — kept in a ref so the timer always saves the LATEST
   * state, even when this effect's dependencies haven't re-registered it. */
  const manualSaveRef = useRef(forceManualSave);
  manualSaveRef.current = forceManualSave;

  useEffect(() => {
    // Never auto-retry while a conflict banner is up — same stale version,
    // same 409, forever, which is exactly the "waited minutes, still not
    // saving" complaint. The creator must resolve it first.
    if (!isDirty || saving || conflict) return;
    const interval = setInterval(() => {
      manualSaveRef.current();
    }, 60000);
    return () => clearInterval(interval);
  }, [isDirty, saving, conflict]);

  /* Keyboard Shortcut for Save */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!saving && !conflict) manualSaveRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saving, conflict]);

  const videoTime = lesson?.durationMinutes || 0;
  const textWords = (lesson?.learnText || '').replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const textTime = Math.ceil(textWords / 200);
  const resourceTime = resources.reduce((acc, r) => acc + (r.estimatedReadMin || 0), 0);
  const totalTime = videoTime + textTime + resourceTime;

  const hasTitle = !!lesson?.title;
  const hasContent = !!(lesson?.learnVideoUrl || lesson?.learnText || lesson?.learnAudioUrl);
  
  const isApplyComplete = mcqActivity.questions.length > 0 &&
    mcqActivity.questions.every(q => q.questionText.trim() && q.correctOptionId && q.options.length >= 2);

  const isReflectComplete = reflectActivity.prompt.trim().length > 0 && 
    (reflectActivity.type === 'open' ? (!reflectActivity.openConfig.useStarters || reflectActivity.openConfig.starters.length > 0) : 
    (reflectActivity.guidedConfig.questions.length > 0 && reflectActivity.guidedConfig.questions.every(q => q.text.trim())));

  const isDeepenComplete = deepenPhaseComplete(deepenConfig, resources);

  const completedStepsCount = [
    hasTitle && hasContent, // Learn
    isApplyComplete, // Apply
    isReflectComplete, // Reflect
    isDeepenComplete, // Deepen
  ].filter(Boolean).length;
  
  const progressPct = Math.round((completedStepsCount / 4) * 100);
  const isLearnComplete = hasTitle && hasContent;

  // Types the product can author end-to-end today. 'interactive' was removed:
  // the backend allowlist coerced it to 'video' on save, silently rewriting
  // what the creator picked.
  const CONTENT_TYPES = [
    { id: 'video',       label: 'Video',            icon: <Play size={16} fill="currentColor" /> },
    { id: 'text',        label: 'Text',             icon: <FileText size={16} /> },
    { id: 'audio',       label: 'Audio',            icon: <Headphones size={16} /> },
  ];

  const FLOW_STEPS = [
    { id: 'learn',   num: '1', title: 'Learn',   sub: 'Teach the concept',    status: isLearnComplete ? 'Completed' : 'Current step' },
    { id: 'apply',   num: '2', title: 'Apply',   sub: 'Engage with practice', status: isApplyComplete ? 'Completed' : 'Not started' },
    { id: 'reflect', num: '3', title: 'Reflect', sub: 'Reinforce learning',   status: isReflectComplete ? 'Completed' : 'Not started' },
    { id: 'deepen',  num: '4', title: 'Deepen',  sub: 'Provide more resources', status: isDeepenComplete ? 'Completed' : 'Not started' },
    { id: 'review',  num: '5', title: 'Review',  sub: 'Finalize & publish',   status: 'Not started' },
  ];

  // Calculate Quality Score dynamically
  const calculateQualityScore = () => {
    let score = 0;
    if (lesson?.title?.trim()) score += 10;
    if (lesson?.shortDescription?.trim()) score += 10;
    if (lesson?.learnVideoUrl) score += 20;
    else if (lesson?.learnText?.trim()) score += 10;
    else if (lesson?.learnAudioUrl) score += 10;
    
    if (mcqActivity?.questions?.length > 0) score += 30;
    if (reflectActivity?.prompt?.trim()) score += 20;
    if (resources?.length > 0) score += 10;
    return score;
  };
  const currentQualityScore = calculateQualityScore();

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  if (loading) return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <Skeleton width={300} height={20} />
          <Skeleton width={400} height={24} />
        </div>
        <div className={styles.headerMain}>
          <div>
            <Skeleton width={200} height={32} style={{ marginBottom: 4 }} />
            <Skeleton width={250} height={20} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Skeleton width={100} height={36} style={{ borderRadius: 8 }} />
            <Skeleton width={120} height={36} style={{ borderRadius: 8 }} />
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.leftCol}>
          <div className={styles.tabs} style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            <Skeleton width="25%" height={60} style={{ borderRadius: 8 }} />
            <Skeleton width="25%" height={60} style={{ borderRadius: 8 }} />
            <Skeleton width="25%" height={60} style={{ borderRadius: 8 }} />
            <Skeleton width="25%" height={60} style={{ borderRadius: 8 }} />
          </div>

          <Skeleton height={100} style={{ marginBottom: 24, borderRadius: 12 }} />
          <div className={styles.contentSplit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Skeleton height={400} style={{ borderRadius: 12 }} />
            <Skeleton height={400} style={{ borderRadius: 12 }} />
          </div>
        </div>

        <aside className={styles.rightSidebar}>
          <Skeleton height={300} style={{ marginBottom: 24, borderRadius: 12 }} />
          <Skeleton height={400} style={{ borderRadius: 12 }} />
        </aside>
      </div>
    </div>
  );

  if (loadError) return (
    <div className={styles.shell}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', gap: 16, textAlign: 'center', padding: 24,
      }}>
        <AlertCircle size={36} style={{ color: '#EF4444' }} />
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#1F2A44' }}>Couldn&apos;t open the Lesson Builder</h1>
        <p style={{ fontSize: 14, color: '#64748B', maxWidth: 420 }}>{loadError}</p>
        <button
          className={styles.btnPrimaryCaret}
          onClick={() => { setLoadError(null); setLoading(true); router.refresh(); }}
        >
          Try again
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.shell}>
      {saveSuccess && (
        <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 9999 }}>
          <Toast message="Changes saved successfully" type="success" duration={2500} onClose={() => setSaveSuccess(false)} />
        </div>
      )}
      {recoverableDraftAt && !conflict && (
        <div className={styles.conflictBanner} role="alert">
          <AlertTriangle size={18} style={{ color: 'var(--warning)', flexShrink: 0 }} />
          <div className={styles.conflictText}>
            <strong>Unsaved changes found from your last session.</strong>{' '}
            Edits from {new Date(recoverableDraftAt).toLocaleString()} never made it to the server. Restore them or discard.
          </div>
          <div className={styles.conflictActions}>
            <button
              className={styles.conflictBtnGhost}
              onClick={discardLocalDraft}
              disabled={recovering}
            >
              Discard
            </button>
            <button
              className={styles.conflictBtnPrimary}
              onClick={restoreLocalDraft}
              disabled={recovering}
            >
              {recovering ? 'Restoring…' : 'Restore my draft'}
            </button>
          </div>
        </div>
      )}
      {conflict && (
        <div className={styles.conflictBanner} role="alert">
          <AlertTriangle size={18} style={{ color: 'var(--warning)', flexShrink: 0 }} />
          <div className={styles.conflictText}>
            <strong>This lesson changed elsewhere.</strong>{' '}
            Another tab or session saved a newer version while you were editing. Keep your version or load theirs.
          </div>
          <div className={styles.conflictActions}>
            <button
              className={styles.conflictBtnGhost}
              onClick={resolveConflictDiscardMine}
              disabled={resolvingConflict}
            >
              Load saved version
            </button>
            <button
              className={styles.conflictBtnPrimary}
              onClick={resolveConflictKeepMine}
              disabled={resolvingConflict}
            >
              {resolvingConflict ? 'Saving…' : 'Keep my changes'}
            </button>
          </div>
        </div>
      )}
      {syncError && (
        <div style={{ position: 'fixed', bottom: 32, left: 32, zIndex: 9999, maxWidth: 380 }}>
          <Toast message={syncError} type="error" duration={10000} onClose={() => setSyncError(null)} />
        </div>
      )}

      {/* ── HEADER ── */}
      <header className={styles.header}>
        {/* Row 1: breadcrumb + stepper */}
        <div className={styles.headerTop}>
          <div className={styles.breadcrumbs}>
            <Link href={`/creator/builder/${courseId}`} className={styles.breadcrumbLink}>{courseTitle}</Link>
            <span className={styles.breadcrumbSep}><ChevronRight size={14} /></span>
            <Link href={`/creator/builder/${courseId}?step=2`} className={styles.breadcrumbLink}>{sectionTitle}</Link>
            <span className={styles.breadcrumbSep}><ChevronRight size={14} /></span>
            <span style={{ fontWeight: 600 }}>{lesson?.title || 'Lesson'}</span>
          </div>
          <div className={styles.stepper}>
            <Link href={`/creator/builder/${courseId}`} className={`${styles.stepperItem} ${styles.done}`} style={{ textDecoration: 'none' }}>
              <div className={styles.stepperBadge}><Check size={10} /></div>
              Course Setup
            </Link>
            <ChevronRight size={13} className={styles.stepperArrow} />
            <Link href={`/creator/builder/${courseId}?step=2`} className={`${styles.stepperItem} ${styles.done}`} style={{ textDecoration: 'none' }}>
              <div className={styles.stepperBadge}><Check size={10} /></div>
              Build Curriculum
            </Link>
            <ChevronRight size={13} className={styles.stepperArrow} />
            <div className={`${styles.stepperItem} ${styles.active}`}>
              <div className={styles.stepperBadge}>3</div>
              Lesson Builder
            </div>
            <ChevronRight size={13} className={styles.stepperArrow} />
            <div className={styles.stepperItem}>
              <div className={styles.stepperBadge}>4</div>
              Preview &amp; Publish
            </div>
          </div>
        </div>

        {/* Row 2: title + actions */}
        <div className={styles.headerMain}>
          <div>
            <h1 className={styles.headerTitle}>Lesson Builder</h1>
            <p className={styles.headerSub}>
              Create an engaging, step-by-step learning experience.
              <span className={styles.howItWorks}>
                <span className={styles.howItWorksCircle}>i</span>
                How it works
              </span>
            </p>
          </div>
          <div className={styles.headerActions}>
            <div className={`${styles.autoSaved} ${syncStatus === 'saving' ? styles.saving : syncStatus === 'offline' ? styles.offline : (syncStatus === 'error' || syncStatus === 'conflict') ? styles.error : ''}`}>
              {syncStatus === 'saving' && <span className={styles.pulse}>Saving...</span>}
              {syncStatus === 'offline' && <span>Offline - Queued locally</span>}
              {syncStatus === 'error' && <span>Error saving</span>}
              {syncStatus === 'conflict' && <span>Not saved - changed elsewhere</span>}
              {syncStatus === 'saved' && (
                <>
                  <Check size={13} /> {lastSavedAt ? `Saved ${lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Auto-saved'}
                </>
              )}
            </div>
            <button className={styles.btnOutline}><Eye size={15} /> Preview as Student</button>
            <div className={styles.btnSplitGroup}>
              <button className={styles.btnPrimaryCaret} onClick={() => handleSave()}>Save &amp; Continue</button>
              <button className={styles.btnPrimaryCaretSplit}><ChevronDown size={14} /></button>
            </div>
            <div className={styles.paginationGroup}>
              <button className={styles.btnOutlineSquare}><ChevronLeft size={16} /></button>
              <button className={styles.btnOutlineSquare}><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className={styles.body}>

        {/* LEFT */}
        <div className={styles.leftCol}>

          {/* 4 Tabs */}
          <div className={styles.tabs}>
            {FLOW_STEPS.map(s => (
              <div
                key={s.id}
                className={`${styles.tab} ${currentTab === s.id ? styles.tabActive : ''}`}
                onClick={() => setCurrentTab(s.id)}
              >
                <div className={styles.tabNum}>{s.num}</div>
                <div className={styles.tabText}>
                  <span className={styles.tabTitle}>{s.title}</span>
                  <span className={styles.tabSub}>{s.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {currentTab === 'learn' && (
            <>
              {/* Section heading */}
              <div className={styles.learnHeading}>
                <div>
                  <h2 className={styles.learnTitle}>1. LEARN – Teach the Concept</h2>
                  <p className={styles.learnDesc}>Add the core instructional content that introduces the concept to your students.</p>
                </div>
                <span className={styles.learnMore}>Learn more</span>
              </div>

              {/* Content Type */}
              <div style={{ marginBottom: 24 }}>
                <div className={styles.blockLabel}>1. Content Type</div>
                <div className={styles.contentTypes}>
                  {CONTENT_TYPES.map(t => (
                    <div
                      key={t.id}
                      className={`${styles.typeCard} ${contentType === t.id ? styles.typeActive : ''}`}
                      onClick={() => setContentType(t.id)}
                    >
                      {t.icon} {t.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Split: video + resources */}
              <div className={styles.contentSplit}>
                {/* Left: Content card */}
                <div className={styles.contentCard}>
                  <div className={styles.contentCardHeader}>
                    <div className={styles.contentCardHeaderTitle}>
                      <span className={styles.blockLabel} style={{ margin: 0 }}>2. Add Content</span>
                      <span className={styles.contentCardTypeBadge}>
                        {contentType === 'video' && 'Video Lesson'}
                        {contentType === 'text' && 'Article / Reading'}
                        {contentType === 'audio' && 'Audio Podcast'}
                      </span>
                    </div>
                  </div>

                  {/* VIDEO TYPE */}
                  {contentType === 'video' && (
                    <>
                      {uploadingVideo ? (
                        /* ── UPLOADING STATE ── */
                        <div className={styles.richUploadProgress}>
                          <div className={styles.richUploadProgressInner}>
                            <Film size={28} style={{ color: '#3D5AFE' }} className={styles.pulse} />
                            <div className={styles.richUploadProgressLabel}>
                              {videoResumed ? 'Resuming your upload…' : 'Uploading your video…'}
                            </div>
                            <div className={styles.richUploadBar}>
                              <div className={styles.richUploadBarFill} style={{ width: `${videoProgress}%` }} />
                            </div>
                            <div className={styles.richUploadPct}>{videoProgress}%</div>
                            <div className={styles.richUploadSub}>
                              {videoResumed
                                ? 'We picked up where the last attempt stopped — only the missing part is being sent.'
                                : 'Large videos upload in pieces, so a dropped connection won’t restart it. You can keep working.'}
                            </div>
                            {videoError && <div className={styles.uploadError}>{videoError}</div>}
                          </div>
                        </div>
                      ) : lesson?.learnVideoUrl ? (
                        /* ── UPLOADED STATE ── */
                        <div className={styles.richVideoCard}>
                          {/* Dark video preview panel */}
                          <div className={styles.richVideoPreviewPanel}>
                            <div className={styles.richVideoPlayIcon}>
                              <Play size={20} fill="#fff" color="#fff" />
                            </div>
                            <div className={styles.richVideoCDNBadge}>
                              <CheckCircle2 size={11} /> CloudFront CDN
                            </div>
                          </div>
                          {/* File metadata */}
                          <div className={styles.richVideoMeta}>
                            <div className={styles.richVideoFileName}>
                              {getFileNameFromUrl(lesson.learnVideoUrl)}
                            </div>
                            <div className={styles.richVideoStats}>
                              <span className={styles.richVideoStatBadge} style={{ background: '#DCFCE7', color: '#16A34A' }}>
                                <Check size={10} /> Live on S3
                              </span>
                              <span className={styles.richVideoStatBadge}>AWS S3 · eu-west-1</span>
                            </div>
                            <div className={styles.richVideoActions}>
                              <label className={styles.richVideoBtn}>
                                Replace Video
                                <input type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoFileChange} />
                              </label>
                              <button className={styles.richVideoBtnDanger} title="Remove video" onClick={() => {
                                setLesson((l: any) => ({ ...l, learnVideoUrl: null }));
                                // Persistence is handled by the debounced autosave (learn phase block).
                              }}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* ── EMPTY STATE ── */
                        <label className={styles.richUploadDropZone}>
                          <input type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoFileChange} />
                          <div className={styles.richUploadDropIcon}>
                            <Film size={24} style={{ color: '#3D5AFE' }} />
                          </div>
                          <div className={styles.richUploadDropTitle}>Drop video here or click to browse</div>
                          <div className={styles.richUploadDropSub}>MP4, MOV, MKV, WebM · Max 2GB · Uploads directly to AWS S3</div>
                          <div className={styles.richUploadDropBtn}>Choose Video File</div>
                        </label>
                      )}
                    </>
                  )}

                  {/* TEXT TYPE */}
                  {contentType === 'text' && (
                    <div className={styles.textContentWrap}>
                      <ReactQuill 
                        theme="snow" 
                        value={lesson?.learnText || ''} 
                        onChange={(val) => setLesson((l: any) => ({ ...l, learnText: val }))}
                        modules={quillModules}
                        placeholder="Write the full instructional lesson content here. Support rich formatting, code blocks, bullet points, and links..."
                      />
                    </div>
                  )}

                  {/* AUDIO TYPE */}
                  {contentType === 'audio' && (
                    <>
                      {uploadingAudio ? (
                        <div className={styles.richUploadProgress}>
                          <div className={styles.richUploadProgressInner}>
                            <Headphones size={28} style={{ color: '#3D5AFE' }} className={styles.pulse} />
                            <div className={styles.richUploadProgressLabel}>Uploading audio to AWS S3…</div>
                            <div className={styles.richUploadBar}>
                              <div className={styles.richUploadBarFill} style={{ width: `${audioProgress}%` }} />
                            </div>
                            <div className={styles.richUploadPct}>{audioProgress}%</div>
                            <div className={styles.richUploadSub}>Uploading directly to S3 · CloudFront CDN on completion</div>
                            {audioError && <div className={styles.uploadError}>{audioError}</div>}
                          </div>
                        </div>
                      ) : lesson?.learnAudioUrl ? (
                        <div className={styles.richAudioCard}>
                          <div className={styles.richAudioIconWrap}>
                            <Headphones size={22} style={{ color: '#3D5AFE' }} />
                          </div>
                          <div className={styles.richVideoMeta}>
                            <div className={styles.richVideoFileName}>{getFileNameFromUrl(lesson.learnAudioUrl)}</div>
                            <div className={styles.richVideoStats}>
                              <span className={styles.richVideoStatBadge} style={{ background: '#DCFCE7', color: '#16A34A' }}>
                                <Check size={10} /> Live on S3
                              </span>
                              <span className={styles.richVideoStatBadge}>CloudFront CDN</span>
                            </div>
                            <div className={styles.richVideoActions}>
                              <label className={styles.richVideoBtn}>
                                Replace Audio
                                <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleAudioFileChange} />
                              </label>
                              <button className={styles.richVideoBtnDanger} title="Remove audio" onClick={() => {
                                setLesson((l: any) => ({ ...l, learnAudioUrl: null }));
                                // Persistence is handled by the debounced autosave (learn phase block).
                              }}>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <label className={styles.richUploadDropZone}>
                          <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleAudioFileChange} />
                          <div className={styles.richUploadDropIcon}>
                            <Headphones size={24} style={{ color: '#3D5AFE' }} />
                          </div>
                          <div className={styles.richUploadDropTitle}>Drop audio here or click to browse</div>
                          <div className={styles.richUploadDropSub}>MP3, WAV, AAC, M4A · Max 500MB · Uploads directly to AWS S3</div>
                          <div className={styles.richUploadDropBtn}>Choose Audio File</div>
                        </label>
                      )}
                    </>
                  )}
                  
                  {/* INTERACTIVE DEMO TYPE */}

                </div>

                {/* Right: resources card */}
                <div className={styles.contentCard}>
                  <LearningResources resources={resources} onChange={setResources} lessonId={lessonId as string} />
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16, marginTop: 16, borderTop: '1px solid #F1F5F9', fontSize: 12, color: '#64748B' }}>
                    Total estimated time: <strong style={{ color: '#0F172A', marginLeft: 4 }}>~{totalTime} min</strong>
                  </div>
                </div>
              </div>

              {/* 4. LESSON DETAILS CARD */}
              <div className={styles.detailsCard}>
                <div className={styles.detailsCardHeader}>
                  <div className={styles.detailsCardTitleWrap}>
                    <div className={styles.detailsCardBadge}>4</div>
                    <div>
                      <h3 className={styles.detailsCardTitle}>Lesson Details</h3>
                      <p className={styles.detailsCardSub}>Information visible to students on the course player and syllabus.</p>
                    </div>
                  </div>
                </div>

                <div className={styles.detailsBody}>
                  {/* Lesson Title */}
                  <div className={styles.fieldBlock}>
                    <div className={styles.fieldLabelRow}>
                      <label className={styles.fieldLabel}>
                        Lesson Title <span className={styles.fieldReq}>*</span>
                      </label>
                      <span className={styles.charCountBadge} style={{ color: (lesson?.title || '').length >= 90 ? '#EF4444' : '#64748B' }}>
                        {(lesson?.title || '').length}/100
                      </span>
                    </div>
                    <span className={styles.fieldHint}>Give this lesson a clear, engaging action-oriented name.</span>
                    <div className={styles.inputWrap}>
                      <input
                        className={styles.inputField}
                        value={lesson?.title || ''}
                        onChange={e => setLesson((l: any) => ({ ...l, title: e.target.value }))}
                        placeholder="e.g. Master the Core Framework & Architecture"
                        maxLength={100}
                      />
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className={styles.fieldBlock}>
                    <div className={styles.fieldLabelRow}>
                      <label className={styles.fieldLabel}>Short Description</label>
                      <span className={styles.charCountBadge} style={{ 
                        color: (lesson?.shortDescription?.replace(/<[^>]*>?/gm, '') || '').length >= 280 ? '#EF4444' : '#64748B' 
                      }}>
                        {(lesson?.shortDescription?.replace(/<[^>]*>?/gm, '') || '').length}/300
                      </span>
                    </div>
                    <span className={styles.fieldHint}>Summarize what students will learn and practice in 1–2 sentences.</span>
                    <div className={styles.editorWrap}>
                      <ReactQuill 
                        theme="snow" 
                        value={lesson?.shortDescription || ''} 
                        onChange={(val) => setLesson((l: any) => ({ ...l, shortDescription: val }))}
                        modules={quillModules}
                        placeholder="Explain what students will learn and practice in this lesson..."
                      />
                    </div>
                  </div>

                  {/* Lesson Description (long-form) */}
                  <div className={styles.fieldBlock}>
                    <div className={styles.fieldLabelRow}>
                      <label className={styles.fieldLabel}>Lesson Description</label>
                      <span className={styles.charCountBadge}>
                        {(lesson?.description || '').length} characters
                      </span>
                    </div>
                    <span className={styles.fieldHint}>
                      The detailed description students will see below the lesson video — use this to give context, explain what they&apos;re learning, and prepare them for Apply. Supports multiple paragraphs.
                    </span>
                    <div className={styles.inputWrap}>
                      <textarea
                        className={styles.textareaField}
                        value={lesson?.description || ''}
                        onChange={e => setLesson((l: any) => ({ ...l, description: e.target.value }))}
                        placeholder="Give students a fuller picture of what this lesson covers, why it matters, and what they'll be able to do afterward..."
                      />
                    </div>
                  </div>

                  {/* What You'll Learn (Key Takeaways) */}
                  <div className={styles.fieldBlock}>
                    <div className={styles.fieldLabelRow}>
                      <label className={styles.fieldLabel}>Key Takeaways / Outcomes</label>
                      <span className={styles.charCountBadge}>{whatYouWillLearn.length}/5 points</span>
                    </div>
                    <span className={styles.fieldHint}>Bullet points showing what students will be able to do after completing this lesson.</span>
                    
                    <div className={styles.takeawaysList}>
                      {whatYouWillLearn.map((item, idx) => (
                        <div key={idx} className={styles.takeawayRow}>
                          <div className={styles.takeawayNumPill}>{idx + 1}</div>
                          <input
                            className={styles.takeawayInput}
                            value={item}
                            onChange={e => {
                              const newPoints = [...whatYouWillLearn];
                              newPoints[idx] = e.target.value;
                              setWhatYouWillLearn(newPoints);
                            }}
                            placeholder={`e.g. Understand the fundamental trade-offs in architecture decisions`}
                            maxLength={100}
                          />
                          <button
                            type="button"
                            className={styles.takeawayDeleteBtn}
                            onClick={() => {
                              setWhatYouWillLearn(whatYouWillLearn.filter((_, i) => i !== idx));
                            }}
                            title="Remove point"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {whatYouWillLearn.length < 5 && (
                      <button
                        type="button"
                        className={styles.addTakeawayBtn}
                        onClick={() => setWhatYouWillLearn([...whatYouWillLearn, ''])}
                      >
                        <Plus size={15} /> Add Key Takeaway ({whatYouWillLearn.length}/5)
                      </button>
                    )}
                  </div>
                </div>
              </div>


            </>
          )}

          {currentTab === 'apply' && (
            <ApplyTab activity={mcqActivity} onChange={setMcqActivity} />
          )}

          {currentTab === 'reflect' && (
            <ReflectTab activity={reflectActivity} onChange={setReflectActivity} />
          )}

          {currentTab === 'deepen' && (
            <DeepenTab 
              config={deepenConfig} 
              onChangeConfig={setDeepenConfig} 
              resources={resources} 
              onChangeResources={setResources} 
              lessonId={lessonId as string} 
            />
          )}

          {currentTab === 'review' && (
            <ReviewPublishTab 
              lessonData={debouncedLesson || lesson} 
              mcqActivity={mcqActivity} 
              reflectActivity={reflectActivity} 
              deepenConfig={deepenConfig} 
              resources={resources} 
              onEditPhase={setCurrentTab} 
              qualityScore={currentQualityScore} 
            />
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.rightSidebar}>
          {currentTab === 'apply' && <ApplySidebar activity={mcqActivity} />}
          {currentTab === 'reflect' && <ReflectSidebar activity={reflectActivity} />}
          {currentTab === 'deepen' && <DeepenSidebar config={deepenConfig} resources={resources} />}
          {currentTab === 'review' && (
            <ReviewPublishSidebar 
              lessonData={debouncedLesson || lesson} 
              mcqActivity={mcqActivity} 
              reflectActivity={reflectActivity} 
              deepenConfig={deepenConfig} 
              resources={resources} 
              qualityScore={currentQualityScore} 
              onPublish={handlePublish}
              onSaveDraft={() => forceManualSave()}
              isPublishing={isPublishing}
              publishError={publishError}
              onClearPublishError={() => setPublishError(null)}
            />
          )}
          
          {currentTab === 'learn' && (<>
          {/* Flow preview */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>Lesson Flow Preview</h3>
            <p className={styles.sideCardSub}>This is how students will experience this lesson.</p>
            <div className={styles.flowList}>
              {FLOW_STEPS.map(s => (
                <div key={s.id} className={`${styles.flowItem} ${currentTab === s.id ? styles.flowActive : ''}`}>
                  <div className={styles.flowItemLeft}>
                    <span className={styles.flowItemIcon}>
                      {s.id === 'learn' && <Play size={14} fill="currentColor" />}
                      {s.id === 'apply' && <FileText size={14} />}
                      {s.id === 'reflect' && <Sparkles size={14} />}
                      {s.id === 'deepen' && <BookOpen size={14} />}
                    </span>
                    {s.num}. {s.title}
                  </div>
                  <div className={styles.flowItemRight}>
                    {currentTab === s.id ? 'Current step' : s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson progress */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>Lesson Progress</h3>
            <div className={styles.progressArea}>
              <div className={styles.progressRing}>
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle className={styles.progressRingBg} cx="24" cy="24" r="20" />
                  <circle
                    className={styles.progressRingFill}
                    cx="24" cy="24" r="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (progressPct / 100) * circumference}
                  />
                </svg>
                <div className={styles.progressRingLabel}>{progressPct}%</div>
              </div>
              <div className={styles.progressInfo}>
                <div className={styles.progressStatusHeader}>
                  <div className={styles.progressIconWrapper}>
                    <Target size={13} className={styles.progressIcon} />
                  </div>
                  <div className={styles.progressKeep}>Keep going!</div>
                </div>
                <div className={styles.progressSub}>Complete all steps to publish this lesson.</div>
              </div>
            </div>
            <div className={styles.checkList}>
              {[
                { label: 'Learn content', done: isLearnComplete },
                { label: 'Apply activity', done: isApplyComplete },
                { label: 'Reflect prompt', done: isReflectComplete },
                { label: 'Deepen resources', done: isDeepenComplete },
              ].map(item => (
                <div key={item.label} className={`${styles.checkRow} ${item.done ? styles.checkDone : ''}`}>
                  <div className={styles.checkCircle}>{item.done && <Check size={10} />}</div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* System info */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>System Info</h3>
            <p className={styles.sysInfo}>
              XP is automatically calculated by the system based on lesson content and activity type.
            </p>
            <div className={styles.sysInfoList}>
              <div className={styles.sysInfoRow}>
                <div className={`${styles.sysInfoIconWrapper} ${styles.amber}`}>
                  <Award size={14} className={styles.sysInfoIcon} />
                </div>
                <div className={styles.sysInfoContent}>
                  <div className={styles.sysInfoLabel}>XP will be shown to learners</div>
                </div>
              </div>
              <div className={styles.sysInfoRow}>
                <div className={`${styles.sysInfoIconWrapper} ${styles.blue}`}>
                  <Info size={14} className={styles.sysInfoIcon} />
                </div>
                <div className={styles.sysInfoContent}>
                  <div className={styles.sysInfoLabel}>Earned automatically on lesson completion</div>
                </div>
              </div>
            </div>
          </div>
          </>)}
        </aside>
      </div>

      {/* ── FOOTER FLOW NAV ── */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.footerTextGroup}>
            <div className={styles.footerFlowLabel}>Lesson Flow</div>
            <div className={styles.footerFlowSub}>5-step interactive curriculum</div>
          </div>
          <div className={styles.footerFlow}>
            {FLOW_STEPS.map((s, i) => (
              <div key={s.id} className={styles.footerStep}>
                <div
                  className={`${styles.footerStepBox} ${currentTab === s.id ? styles.footerStepActive : ''}`}
                  onClick={() => setCurrentTab(s.id)}
                >
                  {currentTab === s.id
                    ? <div className={styles.footerStepNum}>{s.num}</div>
                    : <div className={styles.footerStepNum}>{s.num}</div>
                  }
                  <div className={styles.footerStepText}>
                    <span className={styles.footerStepTitle}>{s.title}</span>
                    <span className={`${styles.footerStepStatus} ${
                      (s.id === 'learn' && isLearnComplete) ||
                      (s.id === 'apply' && isApplyComplete) ||
                      (s.id === 'reflect' && isReflectComplete) ||
                      (s.id === 'deepen' && isDeepenComplete)
                        ? '' : styles.pending
                    }`}>
                      {s.id === 'learn' && isLearnComplete ? 'Completed' :
                       s.id === 'apply' && isApplyComplete ? 'Completed' :
                       s.id === 'reflect' && isReflectComplete ? 'Completed' :
                       s.id === 'deepen' && isDeepenComplete ? 'Completed' :
                       s.id === currentTab ? 'In progress' : 'Not started'}
                    </span>
                  </div>
                </div>
                {i < FLOW_STEPS.length - 1 && <ArrowRight size={14} className={styles.footerArrow} />}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.saveStatusWrapper}>
            {syncStatus === 'offline' && <span className={styles.statusError}><WifiOff size={12}/> Offline</span>}
            {(syncStatus === 'error' || syncStatus === 'conflict') && <span className={styles.statusError}><AlertCircle size={12}/> Save failed</span>}
            {syncStatus === 'saving' && <span className={styles.statusSaving}>Saving...</span>}
            {syncStatus === 'saved' && isDirty && <span className={styles.statusDirty}><span className={styles.amberDot} /> Unsaved changes</span>}
            {syncStatus === 'saved' && !isDirty && lastSavedAt && <span className={styles.statusSaved}><Check size={12}/> Saved</span>}
          </div>
          {currentTab !== 'review' && (
            <button className={styles.btnSaveExit} onClick={() => forceManualSave()} disabled={saving}>
              {saving ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
              ) : saveSuccess ? (
                <Check size={14} />
              ) : (
                <Check size={14} />
              )}
              {saving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Draft'}
            </button>
          )}
          <button className={styles.btnSaveExit} onClick={() => handleSave(`/creator/builder/${courseId}`)} disabled={saving}>
            <BookOpen size={14} /> Save &amp; Exit
          </button>
          {currentTab !== 'review' && (
            <button
              className={styles.btnNextStep}
              disabled={(!isLearnComplete && currentTab === 'learn') || saving}
              onClick={async () => {
                // Always save current live state before navigating — but
                // advance ONLY when it actually saved, never strand the
                // creator on a later phase with unsaved edits behind them.
                const result = await forceManualSave();
                if (!result.ok) return;
                if (currentTab === 'learn') setCurrentTab('apply');
                else if (currentTab === 'apply') setCurrentTab('reflect');
                else if (currentTab === 'reflect') setCurrentTab('deepen');
                else if (currentTab === 'deepen') setCurrentTab('review');
              }}
            >
              {saving ? 'Saving...' : 'Save & Continue'} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
