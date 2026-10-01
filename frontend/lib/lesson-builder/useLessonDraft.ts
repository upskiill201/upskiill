'use client';

/**
 * Loads a lesson into the builder and keeps it saved.
 *
 *  - Autosave: 1.5s after the last edit, one PATCH /lesson/:id/full-save
 *    carrying the version it was loaded at. Saves never overlap; an edit made
 *    during a save is picked up by the next one.
 *  - Conflicts: a 409 (another tab or device saved first) stops autosave and
 *    asks the creator which copy to keep — never silently overwrites.
 *  - Safety net: every edit is also kept in this browser; if the tab closes
 *    before it reaches the server, reopening offers to restore it.
 *  - Leaving with unsaved work asks first (tab close and in-app links).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLinkNavigationGuard } from '@/hooks/useLinkNavigationGuard';
import { useOrphanedMediaCleanup } from '@/hooks/useOrphanedMediaCleanup';
import { draftFromLesson, resourcesFromLesson, savePayload, type LessonDraft, type ResourceDraft } from './draft';

export type SaveStatus = 'loading' | 'saved' | 'unsaved' | 'saving' | 'error' | 'conflict' | 'offline';

const AUTOSAVE_MS = 1500;
const backupKey = (id: string) => `teyro_lesson_backup_${id}`;

interface Backup {
  savedAt: number;
  draft: LessonDraft;
}

function readBackup(id: string): Backup | null {
  try {
    const raw = localStorage.getItem(backupKey(id));
    return raw ? (JSON.parse(raw) as Backup) : null;
  } catch {
    return null;
  }
}

export function useLessonDraft(lessonId: string) {
  const [draft, setDraftState] = useState<LessonDraft | null>(null);
  const [resources, setResources] = useState<ResourceDraft[]>([]);
  const [lessonMeta, setLessonMeta] = useState<{ courseId: string | null; status: string; category: string | null; reviewStatus: string | null } | null>(null);
  const [status, setStatus] = useState<SaveStatus>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [recoverable, setRecoverable] = useState<Backup | null>(null);

  const versionRef = useRef(1);
  const draftRef = useRef<LessonDraft | null>(null);
  const resourcesRef = useRef<ResourceDraft[]>([]);
  const dirtyRef = useRef(false);
  const savingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { markSuperseded } = useOrphanedMediaCleanup(lessonId, status === 'saved');
  useLinkNavigationGuard(status === 'unsaved' || status === 'saving' || status === 'error' || status === 'conflict');

  // ── Load ────────────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setStatus('loading');
    setLoadError(null);
    try {
      const res = await fetch(`/api/lesson/${lessonId}`, { credentials: 'include', cache: 'no-store' });
      if (!res.ok) {
        setLoadError(res.status === 404 ? 'This lesson could not be found. It may have been deleted.' : `Could not load this lesson (error ${res.status}).`);
        return;
      }
      const lesson = await res.json();
      const d = draftFromLesson(lesson);
      versionRef.current = Number(lesson?.version) || 1;
      draftRef.current = d;
      resourcesRef.current = resourcesFromLesson(lesson);
      setDraftState(d);
      setResources(resourcesRef.current);
      setLessonMeta({
        courseId: lesson?.section?.course?.id ?? null,
        status: String(lesson?.status ?? 'draft'),
        category: lesson?.section?.course?.category ?? lesson?.course?.category ?? null,
        reviewStatus: lesson?.section?.course?.reviewStatus ?? null,
      });
      dirtyRef.current = false;
      setStatus('saved');
      const backup = readBackup(lessonId);
      const serverAt = lesson?.updatedAt ? Date.parse(lesson.updatedAt) : 0;
      if (backup && backup.savedAt > serverAt) setRecoverable(backup);
      else if (backup) localStorage.removeItem(backupKey(lessonId));
    } catch {
      setLoadError('A network error stopped this lesson from loading. Check your connection and try again.');
    }
  }, [lessonId]);

  useEffect(() => {
    void load();
  }, [load]);

  // ── Save ────────────────────────────────────────────────────────────────
  const save = useCallback(async (): Promise<boolean> => {
    const d = draftRef.current;
    if (!d || savingRef.current) return false;
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setStatus('offline');
      return false;
    }
    savingRef.current = true;
    dirtyRef.current = false;
    setStatus('saving');
    setSaveError(null);
    try {
      const res = await fetch(`/api/lesson/${lessonId}/full-save`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(savePayload(d, resourcesRef.current, versionRef.current)),
      });
      if (res.status === 409) {
        dirtyRef.current = true;
        setStatus('conflict');
        return false;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        dirtyRef.current = true;
        setSaveError(data?.message || `Saving failed (error ${res.status}).`);
        setStatus('error');
        return false;
      }
      if (typeof data?.version === 'number') versionRef.current = data.version;
      if (dirtyRef.current) {
        // Edited while this save was in flight — go again.
        setStatus('unsaved');
      } else {
        setStatus('saved');
        try {
          localStorage.removeItem(backupKey(lessonId));
        } catch {
          /* ignore */
        }
      }
      return true;
    } catch {
      dirtyRef.current = true;
      setStatus(typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : 'error');
      setSaveError('A network error stopped the save. Your work is kept in this browser.');
      return false;
    } finally {
      savingRef.current = false;
    }
  }, [lessonId]);

  const schedule = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => void save(), AUTOSAVE_MS);
  }, [save]);

  // Re-run when a save finishes with newer edits waiting.
  useEffect(() => {
    if (status === 'unsaved' && !savingRef.current) schedule();
  }, [status, schedule]);

  // Back online: retry.
  useEffect(() => {
    const online = () => {
      if (dirtyRef.current) void save();
    };
    window.addEventListener('online', online);
    return () => window.removeEventListener('online', online);
  }, [save]);

  // Closing the tab with work not on the server.
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current || savingRef.current) e.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, []);

  /** Every edit goes through here. */
  const update = useCallback(
    (fn: (d: LessonDraft) => LessonDraft) => {
      const current = draftRef.current;
      if (!current) return;
      const next = fn(current);
      draftRef.current = next;
      setDraftState(next);
      dirtyRef.current = true;
      try {
        localStorage.setItem(backupKey(lessonId), JSON.stringify({ savedAt: Date.now(), draft: next } satisfies Backup));
      } catch {
        /* storage full: the server save still runs */
      }
      setStatus((s) => (s === 'conflict' ? s : 'unsaved'));
      if (status !== 'conflict') schedule();
    },
    [lessonId, schedule, status],
  );

  const setResourceList = useCallback((list: ResourceDraft[]) => {
    resourcesRef.current = list;
    setResources(list);
  }, []);

  // ── Conflict + recovery ─────────────────────────────────────────────────
  /** Keep this tab's copy: adopt the server's version counter, then save over it. */
  const keepMine = useCallback(async () => {
    try {
      const res = await fetch(`/api/lesson/${lessonId}`, { credentials: 'include', cache: 'no-store' });
      const lesson = await res.json();
      versionRef.current = Number(lesson?.version) || versionRef.current;
      setStatus('unsaved');
      await save();
    } catch {
      setStatus('error');
    }
  }, [lessonId, save]);

  /** Drop this tab's edits and reload what's on the server. */
  const discardMine = useCallback(async () => {
    try {
      localStorage.removeItem(backupKey(lessonId));
    } catch {
      /* ignore */
    }
    await load();
  }, [lessonId, load]);

  const restoreBackup = useCallback(() => {
    if (!recoverable) return;
    update(() => recoverable.draft);
    setRecoverable(null);
  }, [recoverable, update]);

  const dismissBackup = useCallback(() => {
    try {
      localStorage.removeItem(backupKey(lessonId));
    } catch {
      /* ignore */
    }
    setRecoverable(null);
  }, [lessonId]);

  /** Save now and wait (before publish, preview or leaving). */
  const flush = useCallback(async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!dirtyRef.current && status === 'saved') return true;
    while (savingRef.current) await new Promise((r) => setTimeout(r, 120));
    return dirtyRef.current || status !== 'saved' ? save() : true;
  }, [save, status]);

  return {
    draft,
    resources,
    lessonMeta,
    status,
    loadError,
    saveError,
    recoverable,
    version: () => versionRef.current,
    setVersion: (v: number) => {
      versionRef.current = v;
    },
    update,
    setResources: setResourceList,
    save,
    flush,
    reload: load,
    keepMine,
    discardMine,
    restoreBackup,
    dismissBackup,
    markSuperseded,
  };
}
