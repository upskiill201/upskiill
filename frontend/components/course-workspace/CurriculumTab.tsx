'use client';

/**
 * Curriculum — modules and their bite-size lessons. Everything saves as you
 * go (each action is one request). Adding a lesson opens it straight in the
 * lesson builder. The first two lessons are free for learners, marked FREE.
 */

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUp, Check, Clock, Loader2, Pencil, Play, Plus, Trash2 } from 'lucide-react';
import { extractErrorMessage } from '@/lib/apiError';
import { playSound } from '@/lib/audio/lessonSounds';
import b from '@/components/lesson-builder/Builder.module.css';
import s from './Workspace.module.css';

export interface CurriculumLesson {
  id: string;
  title: string;
  status: string;
  durationMinutes?: number | null;
}

export interface CurriculumSection {
  id: string;
  title: string;
  lessons: CurriculumLesson[];
}

async function call(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
  return data;
}

export function CurriculumTab({
  courseId,
  sections,
  locked,
  onChange,
  onReload,
}: {
  courseId: string;
  sections: CurriculumSection[];
  locked: boolean;
  onChange: (next: CurriculumSection[]) => void;
  onReload: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newModule, setNewModule] = useState('');
  const [newLesson, setNewLesson] = useState<Record<string, string>>({});

  const run = async (key: string, fn: () => Promise<void>) => {
    setBusy(key);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That didn’t save. Try again?');
      playSound('wrong');
      onReload();
    } finally {
      setBusy(null);
    }
  };

  const addModule = () =>
    run('module', async () => {
      const title = newModule.trim() || `Module ${sections.length + 1}`;
      const created = await call(`/api/courses/${courseId}/sections`, 'POST', { title });
      onChange([...sections, { id: created.id, title: created.title, lessons: [] }]);
      setNewModule('');
      playSound('cardNext');
    });

  const renameModule = (sec: CurriculumSection, title: string) => {
    if (!title.trim() || title === sec.title) return;
    void run(`rename-${sec.id}`, async () => {
      await call(`/api/courses/sections/${sec.id}`, 'PATCH', { title: title.trim() });
      onChange(sections.map((x) => (x.id === sec.id ? { ...x, title: title.trim() } : x)));
    });
  };

  const moveModule = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    playSound('select');
    void run('order', () => call(`/api/courses/${courseId}/sections/reorder`, 'POST', { orderedIds: next.map((x) => x.id) }));
  };

  const deleteModule = (sec: CurriculumSection) => {
    const n = sec.lessons.length;
    if (!window.confirm(n ? `Delete "${sec.title}" and its ${n} lesson${n === 1 ? '' : 's'}? This can’t be undone.` : `Delete "${sec.title}"?`)) return;
    void run(`del-${sec.id}`, async () => {
      await call(`/api/courses/sections/${sec.id}`, 'DELETE');
      onChange(sections.filter((x) => x.id !== sec.id));
      playSound('cardBack');
    });
  };

  const addLesson = (sec: CurriculumSection) =>
    run(`lesson-${sec.id}`, async () => {
      const title = (newLesson[sec.id] ?? '').trim() || `Lesson ${sec.lessons.length + 1}`;
      const created = await call(`/api/courses/sections/${sec.id}/lessons`, 'POST', { title, lessonType: 'interactive' });
      playSound('start');
      router.push(`/creator/courses/${courseId}/lesson-builder/${created.id}`);
    });

  const moveLesson = (sec: CurriculumSection, i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= sec.lessons.length) return;
    const lessons = [...sec.lessons];
    [lessons[i], lessons[j]] = [lessons[j], lessons[i]];
    onChange(sections.map((x) => (x.id === sec.id ? { ...x, lessons } : x)));
    playSound('select');
    void run('order', () => call(`/api/courses/sections/${sec.id}/lessons/reorder`, 'POST', { orderedIds: lessons.map((l) => l.id) }));
  };

  const deleteLesson = (sec: CurriculumSection, lesson: CurriculumLesson) => {
    if (!window.confirm(`Delete "${lesson.title}"? This can’t be undone.`)) return;
    void run(`del-${lesson.id}`, async () => {
      await call(`/api/courses/lessons/${lesson.id}`, 'DELETE');
      onChange(sections.map((x) => (x.id === sec.id ? { ...x, lessons: x.lessons.filter((l) => l.id !== lesson.id) } : x)));
      playSound('cardBack');
    });
  };

  // The first two lessons in course order are the free preview.
  const freeIds = new Set(sections.flatMap((x) => x.lessons).slice(0, 2).map((l) => l.id));

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <p className={`${b.issue} ${b.issueBad}`} role="alert">
          {error}
        </p>
      )}

      {sections.length === 0 && (
        <div className={b.empty}>
          <strong>Plan your course in modules</strong>
          A module groups a few bite-size lessons around one skill, e.g. “Variables and data”, then “Making decisions”.
        </div>
      )}

      {sections.map((sec, i) => (
        <section key={sec.id} className={s.module} aria-label={`Module ${i + 1}`}>
          <div className={s.moduleHead}>
            <span className={s.moduleNum}>{i + 1}</span>
            <input
              className={s.moduleTitle}
              defaultValue={sec.title}
              disabled={locked}
              maxLength={120}
              aria-label="Module title"
              onBlur={(e) => renameModule(sec, e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
            />
            {!locked && (
              <span className={b.cardTools}>
                <button type="button" className={b.tool} onClick={() => moveModule(i, -1)} disabled={i === 0} aria-label="Move module up">
                  <ArrowUp size={16} />
                </button>
                <button type="button" className={b.tool} onClick={() => moveModule(i, 1)} disabled={i === sections.length - 1} aria-label="Move module down">
                  <ArrowDown size={16} />
                </button>
                <button type="button" className={`${b.tool} ${b.toolDanger}`} onClick={() => deleteModule(sec)} aria-label="Delete module">
                  <Trash2 size={16} />
                </button>
              </span>
            )}
          </div>

          {sec.lessons.map((l, j) => {
            const ready = l.status === 'published';
            return (
              <div key={l.id} className={s.lesson}>
                <span className={`${s.lessonIcon} ${ready ? s.lessonIconReady : ''}`} aria-hidden="true">
                  {ready ? <Check size={16} strokeWidth={3.5} /> : <Pencil size={14} strokeWidth={2.75} />}
                </span>
                <span className={s.lessonText}>
                  <Link href={`/creator/courses/${courseId}/lesson-builder/${l.id}`} className={s.lessonTitle} onClick={() => playSound('navTap', 2)}>
                    {l.title}
                  </Link>
                  <span className={s.lessonMeta}>
                    {ready ? 'Ready' : 'Draft'}
                    {l.durationMinutes ? (
                      <>
                        {' · '}
                        <Clock size={11} style={{ display: 'inline', verticalAlign: -1 }} aria-hidden="true" /> {l.durationMinutes} min
                      </>
                    ) : null}
                  </span>
                </span>
                {freeIds.has(l.id) && <span className={s.free}>FREE</span>}
                <span className={b.cardTools}>
                  <a className={b.tool} href={`/preview/lesson/${l.id}`} target="_blank" rel="noopener" aria-label={`Play ${l.title}`}>
                    <Play size={16} />
                  </a>
                  {!locked && (
                    <>
                      <button type="button" className={b.tool} onClick={() => moveLesson(sec, j, -1)} disabled={j === 0} aria-label="Move lesson up">
                        <ArrowUp size={16} />
                      </button>
                      <button type="button" className={b.tool} onClick={() => moveLesson(sec, j, 1)} disabled={j === sec.lessons.length - 1} aria-label="Move lesson down">
                        <ArrowDown size={16} />
                      </button>
                      <button type="button" className={`${b.tool} ${b.toolDanger}`} onClick={() => deleteLesson(sec, l)} aria-label="Delete lesson">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </span>
              </div>
            );
          })}

          {!locked && (
            <div className={s.addLessonRow}>
              <input
                className={b.input}
                value={newLesson[sec.id] ?? ''}
                maxLength={100}
                placeholder="New lesson title, e.g. “What is a variable?”"
                onChange={(e) => setNewLesson((m) => ({ ...m, [sec.id]: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && void addLesson(sec)}
              />
              <button type="button" className={b.btnPrimary} onClick={() => void addLesson(sec)} disabled={busy === `lesson-${sec.id}`}>
                {busy === `lesson-${sec.id}` ? <Loader2 size={16} className={b.spin} /> : <Plus size={16} />} Lesson
              </button>
            </div>
          )}
        </section>
      ))}

      {!locked && (
        <div className={s.addLessonRow}>
          <input
            className={b.input}
            value={newModule}
            maxLength={120}
            placeholder={sections.length ? 'Next module title' : 'First module title, e.g. “Getting started”'}
            onChange={(e) => setNewModule(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void addModule()}
          />
          <button type="button" className={b.btn} onClick={() => void addModule()} disabled={busy === 'module'}>
            {busy === 'module' ? <Loader2 size={16} className={b.spin} /> : <Plus size={16} />} Module
          </button>
        </div>
      )}
    </div>
  );
}

export default CurriculumTab;
