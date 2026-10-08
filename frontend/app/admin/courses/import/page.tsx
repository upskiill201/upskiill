'use client';

/**
 * Import a course — turn a finished course sitting in Google Drive into a
 * Teyro draft. Three steps: connect Drive, pick the course's folder, check
 * what will be made and choose the course's title, track and level. With
 * autopilot on, the importer plans the course and builds the draft by itself;
 * the admin comes back only to review it.
 *
 * Folder convention (GoogleDriveService#walkFolder): the course folder's
 * direct subfolders become modules; every video or audio file becomes a
 * lesson (one over 15 minutes becomes bite-size parts); other files attach to
 * the lesson before them; a folder with only documents becomes reading
 * lessons.
 */

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  File as FileIcon,
  FileArchive,
  FileText,
  Folder,
  FolderOpen,
  HardDrive,
  Headphones,
  Image as ImageIcon,
  Presentation,
  Scissors,
  Sparkles,
  TriangleAlert,
  Video,
  Wand2,
} from 'lucide-react';
import { adminMutate, useAdminData } from '@/components/admin/AdminUI';
import { Hero, hq } from '@/components/admin/hq/HQ';
import { computeStages, overallPercent } from './[importId]/importProgress';
import {
  LEVELS,
  TRACKS,
  formatBytes,
  formatDuration,
  humanizeDriveError,
  statusInfo,
  type CourseImport,
  type DriveFile,
  type DriveFileCategory,
  type FolderPreview,
} from './importer';
import m from './importer.module.css';

interface ConnectionStatus {
  connected: boolean;
  email?: string;
  connectedAt?: string;
}

interface Crumb {
  id: string;
  name: string;
}

const ICON: Record<DriveFileCategory, typeof Folder> = {
  folder: Folder,
  video: Video,
  audio: Headphones,
  document: FileText,
  presentation: Presentation,
  image: ImageIcon,
  file: FileArchive,
  other: FileIcon,
};

const ICON_TONE: Record<DriveFileCategory, string> = {
  folder: 'var(--warning)',
  video: 'var(--error-red)',
  audio: 'var(--error-red)',
  document: 'var(--color-brand)',
  presentation: 'var(--brand-purple)',
  image: 'var(--success-green)',
  file: 'var(--warning)',
  other: 'var(--text-muted)',
};

function StepHead({ n, title, done, sub }: { n: number; title: string; done?: boolean; sub?: string }) {
  return (
    <div className={m.stepHead}>
      <span className={`${m.stepNum} ${done ? m.stepDone : ''}`}>{done ? <Check size={16} strokeWidth={4} /> : n}</span>
      <span>
        <h2 className={m.stepTitle}>{title}</h2>
        {sub && <p className={m.stepSub}>{sub}</p>}
      </span>
    </div>
  );
}

export default function ImportCoursePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: status, error: statusError, mutate: refreshStatus } = useAdminData<ConnectionStatus>('/api/admin/google-drive/status');
  const { data: imports, error: importsError } = useAdminData<CourseImport[]>('/api/admin/course-imports');

  const [crumbs, setCrumbs] = useState<Crumb[]>([{ id: 'root', name: 'My Drive' }]);
  const folder = crumbs[crumbs.length - 1];
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [track, setTrack] = useState<(typeof TRACKS)[number] | null>(null);
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('Beginner');
  const [autopilot, setAutopilot] = useState(true);
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState(false);

  const { data: children, error: childrenError, isLoading: childrenLoading } = useAdminData<DriveFile[]>(
    status?.connected ? `/api/admin/google-drive/folders?parentId=${folder.id}` : null,
  );
  const { data: preview, error: previewError, isLoading: previewLoading } = useAdminData<FolderPreview>(
    previewId ? `/api/admin/google-drive/folders/${previewId}/preview` : null,
  );
  // Every video/audio file is a lesson, a long one several parts. Reading
  // lessons from document-only folders are decided at planning time.
  const lessonEstimate = preview
    ? preview.videos + preview.audio - preview.videosOverLimit + preview.longVideoParts
    : 0;

  // A preview only describes the folder it was made for.
  useEffect(() => {
    setPreviewId(null);
  }, [folder.id]);

  // Name the course after the folder until the admin types their own.
  useEffect(() => {
    if (preview) setTitle((t) => (t && t !== preview.folderName ? t : preview.folderName));
  }, [preview]);

  // The OAuth callback lands here with a one-time status in the URL.
  const driveConnected = searchParams.get('driveConnected');
  const driveError = searchParams.get('driveError');
  useEffect(() => {
    if (!driveConnected && !driveError) return;
    void refreshStatus();
    const url = new URL(window.location.href);
    url.searchParams.delete('driveConnected');
    url.searchParams.delete('driveError');
    router.replace(url.pathname + url.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driveConnected, driveError]);

  const subfolders = useMemo(() => (children ?? []).filter((f) => f.category === 'folder'), [children]);
  const filesHere = useMemo(() => (children ?? []).filter((f) => f.category !== 'folder'), [children]);

  const disconnect = async () => {
    setDisconnecting(true);
    try {
      await adminMutate('/api/admin/google-drive/disconnect', { method: 'POST' });
      setCrumbs([{ id: 'root', name: 'My Drive' }]);
      setPreviewId(null);
      await refreshStatus();
    } finally {
      setDisconnecting(false);
    }
  };

  const start = async () => {
    if (!preview) return;
    if (autopilot && (!title.trim() || !track)) {
      setStartError('Autopilot needs a course title and a track to build the course with.');
      return;
    }
    setStarting(true);
    setStartError(null);
    try {
      const created = await adminMutate<{ id: string }>('/api/admin/course-imports', {
        method: 'POST',
        body: {
          driveFolderId: preview.folderId,
          autopilot,
          ...(title.trim() ? { courseTitle: title.trim() } : {}),
          ...(track ? { courseCategory: track } : {}),
          courseLevel: level,
        },
      });
      router.push(`/admin/courses/import/${created.id}`);
    } catch (err) {
      setStartError((err as Error).message);
      setStarting(false);
    }
  };

  const connected = !!status?.connected;
  const running = (imports ?? []).filter((i) => !['CANCELLED'].includes(i.status));

  return (
    <div className={hq.page}>
      <Hero
        pose="tablet"
        title="Import a course"
        sub="Turn a finished course in Google Drive into a Teyro draft. Videos become lessons, Tey writes the practice, and you review before anything goes live."
      />

      <div className={m.layout}>
        <div className={m.steps}>
          {/* 1 — Drive */}
          <section className={m.step}>
            <StepHead n={1} title="Connect Google Drive" done={connected} />
            {driveError && !connected && (
              <p className={m.warn}>
                <TriangleAlert size={16} aria-hidden="true" /> Connection failed: {humanizeDriveError(driveError)}
              </p>
            )}
            {statusError && !status ? (
              <p className={m.warn}>
                <TriangleAlert size={16} aria-hidden="true" /> Couldn’t check your Drive connection. It retries on its own.
              </p>
            ) : !status ? (
              <div className={m.skel} />
            ) : connected ? (
              <div className={m.connected}>
                <span className={m.driveIcon} aria-hidden="true">
                  <HardDrive size={20} />
                </span>
                <span className={m.grow}>
                  <strong>Connected</strong>
                  <span>{status.email}</span>
                </span>
                <button type="button" className={m.ghostBtn} onClick={() => void disconnect()} disabled={disconnecting}>
                  {disconnecting ? 'Disconnecting…' : 'Disconnect'}
                </button>
              </div>
            ) : (
              <div className={m.connectBox}>
                <p>Teyro reads only the folder you pick, and copies its files into Teyro’s own storage.</p>
                <button type="button" className={m.primaryBtn} onClick={() => (window.location.href = '/api/admin/google-drive/connect')}>
                  <HardDrive size={18} aria-hidden="true" /> Connect Google Drive
                </button>
              </div>
            )}
          </section>

          {/* 2 — Folder */}
          <section className={`${m.step} ${!connected ? m.stepLocked : ''}`}>
            <StepHead
              n={2}
              title="Pick the course folder"
              done={!!preview}
              sub="Open the folder that holds one whole course. Its subfolders become modules."
            />
            {connected && (
              <>
                <nav className={m.crumbs} aria-label="Folder path">
                  {crumbs.map((c, i) => (
                    <span key={c.id} className={m.crumb}>
                      {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
                      {i === crumbs.length - 1 ? (
                        <strong>{c.name}</strong>
                      ) : (
                        <button type="button" onClick={() => setCrumbs((p) => p.slice(0, i + 1))}>
                          {c.name}
                        </button>
                      )}
                    </span>
                  ))}
                </nav>

                {childrenError ? (
                  <p className={m.warn}>
                    <TriangleAlert size={16} aria-hidden="true" /> This folder didn’t load. {(childrenError as Error).message}
                  </p>
                ) : childrenLoading || !children ? (
                  <div className={m.skel} style={{ height: 180 }} />
                ) : children.length === 0 ? (
                  <p className={m.muted}>This folder is empty.</p>
                ) : (
                  <ul className={m.files}>
                    {subfolders.map((f) => (
                      <li key={f.id}>
                        <button type="button" className={m.fileRow} onClick={() => setCrumbs((p) => [...p, { id: f.id, name: f.name }])}>
                          <span className={m.fileIcon} style={{ '--tone': ICON_TONE.folder } as CSSProperties} aria-hidden="true">
                            <Folder size={18} />
                          </span>
                          <span className={m.fileName}>{f.name}</span>
                          <ChevronRight size={18} className={m.chev} aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                    {filesHere.slice(0, 40).map((f) => {
                      const Icon = ICON[f.category];
                      return (
                        <li key={f.id} className={m.fileRow} data-static="true">
                          <span className={m.fileIcon} style={{ '--tone': ICON_TONE[f.category] } as CSSProperties} aria-hidden="true">
                            <Icon size={18} />
                          </span>
                          <span className={m.fileName}>{f.name}</span>
                          <span className={m.fileMeta}>{formatBytes(f.sizeBytes)}</span>
                        </li>
                      );
                    })}
                    {filesHere.length > 40 && <li className={m.muted}>…and {filesHere.length - 40} more files</li>}
                  </ul>
                )}

                <div className={m.useRow}>
                  <button
                    type="button"
                    className={m.primaryBtn}
                    onClick={() => setPreviewId(folder.id)}
                    disabled={folder.id === 'root' || previewLoading}
                  >
                    <FolderOpen size={18} aria-hidden="true" />
                    {previewLoading && previewId === folder.id ? 'Looking inside…' : `Use “${folder.name}”`}
                  </button>
                  {folder.id === 'root' && <span className={m.muted}>Open the course’s own folder first. My Drive itself can’t be imported.</span>}
                </div>
              </>
            )}
          </section>

          {/* 3 — Check and start */}
          <section className={`${m.step} ${!preview ? m.stepLocked : ''}`}>
            <StepHead n={3} title="Check it and start" sub="What Teyro will make, and the course it builds." />
            {previewError && (
              <p className={m.warn}>
                <TriangleAlert size={16} aria-hidden="true" /> {(previewError as Error).message}
              </p>
            )}
            {preview && (
              <>
                <div className={m.make}>
                  <span className={m.makeItem} style={{ '--tone': 'var(--error-red)' } as CSSProperties}>
                    <strong>{lessonEstimate}</strong>
                    <span>lesson{lessonEstimate === 1 ? '' : 's'}</span>
                    <em>
                      in {preview.modules} module{preview.modules === 1 ? '' : 's'}
                    </em>
                  </span>
                  <span className={m.makeItem} style={{ '--tone': 'var(--color-brand)' } as CSSProperties}>
                    <strong>{preview.documents + preview.presentations + preview.images + preview.projectFiles}</strong>
                    <span>resources</span>
                    <em>docs, slides, images, project files</em>
                  </span>
                  <span className={m.makeItem} style={{ '--tone': 'var(--warning)' } as CSSProperties}>
                    <strong>{formatDuration(preview.estimatedVideoDurationSeconds)}</strong>
                    <span>of video</span>
                    <em>{preview.videosMissingDuration > 0 ? `${preview.videosMissingDuration} without a length` : 'to transcribe'}</em>
                  </span>
                </div>

                {preview.videos + preview.audio + preview.documents === 0 && (
                  <p className={m.warn}>
                    <TriangleAlert size={16} aria-hidden="true" /> There are no videos, audio or documents here, so there’s nothing to
                    build lessons from.
                  </p>
                )}
                {preview.videos + preview.audio + preview.documents > 0 && (
                  <p className={m.note}>
                    Each lesson gets Tey-written Learn cards (key ideas, a tip, a quick check, code when the video shows code, the images
                    handed out with it) and 5–12 hands-on exercises of different kinds. Audio files become audio lessons, and a folder with
                    only documents becomes reading lessons. Project files, PDFs and slides become Deepen downloads.
                  </p>
                )}
                {preview.videosOverLimit > 0 && (
                  <p className={m.note}>
                    <Scissors size={16} aria-hidden="true" />{' '}
                    {preview.videosOverLimit} recording{preview.videosOverLimit === 1 ? ' is' : 's are'} over 15 minutes, so{' '}
                    {preview.videosOverLimit === 1 ? 'it becomes' : 'they become'} {preview.longVideoParts} bite-size parts. Each part plays its
                    own stretch of the video and gets exercises written from that stretch.
                  </p>
                )}
                {preview.videosMissingDuration > 0 && (
                  <p className={m.warn}>
                    <TriangleAlert size={16} aria-hidden="true" />
                    <span>
                      {preview.videosMissingDuration} video{preview.videosMissingDuration === 1 ? ' has' : 's have'} no length in Drive yet.
                      Teyro measures {preview.videosMissingDuration === 1 ? 'it' : 'them'} while transcribing and splits any long one into
                      parts then.
                    </span>
                  </p>
                )}
                {preview.unsupported.length > 0 && (
                  <p className={m.note}>
                    Skipped (not a supported type): {preview.unsupported.map((f) => f.name).join(', ')}
                  </p>
                )}

                <div className={m.form}>
                  <label className={m.field}>
                    <span className={m.label}>Course title</span>
                    <input className={m.input} value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} />
                  </label>
                  <div className={m.field}>
                    <span className={m.label}>Track</span>
                    <div className={m.chips} role="radiogroup" aria-label="Track">
                      {TRACKS.map((t) => (
                        <button key={t} type="button" role="radio" aria-checked={track === t} className={`${m.chip} ${track === t ? m.chipOn : ''}`} onClick={() => setTrack(t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={m.field}>
                    <span className={m.label}>Level</span>
                    <div className={m.chips} role="radiogroup" aria-label="Level">
                      {LEVELS.map((l) => (
                        <button key={l} type="button" role="radio" aria-checked={level === l} className={`${m.chip} ${level === l ? m.chipOn : ''}`} onClick={() => setLevel(l)}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={autopilot}
                    className={`${m.autopilot} ${autopilot ? m.autopilotOn : ''}`}
                    onClick={() => setAutopilot((v) => !v)}
                  >
                    <span className={m.autoIcon} aria-hidden="true">
                      <Wand2 size={20} />
                    </span>
                    <span className={m.grow}>
                      <strong>Autopilot</strong>
                      <span>
                        {autopilot
                          ? 'Tey plans the modules and builds the draft course when every lesson is written. You only come back to review.'
                          : 'You’ll plan the course and build the draft yourself from the import’s page.'}
                      </span>
                    </span>
                    <span className={m.toggle} aria-hidden="true">
                      <span />
                    </span>
                  </button>
                </div>

                {startError && (
                  <p className={m.warn}>
                    <TriangleAlert size={16} aria-hidden="true" /> {startError}
                  </p>
                )}
                <button type="button" className={`${m.primaryBtn} ${m.bigBtn}`} onClick={() => void start()} disabled={starting || preview.videos === 0}>
                  <Sparkles size={18} aria-hidden="true" /> {starting ? 'Starting…' : 'Start the import'}
                </button>
                <p className={m.note}>
                  Videos are copied and transcribed one at a time so the server never runs out of memory, so large courses take hours. On
                  free hosting the server sleeps after about 15 quiet minutes: keep the import’s page open while it runs (it keeps the server
                  awake). If it does sleep, nothing is lost; the import carries on from where it stopped.
                </p>
              </>
            )}
          </section>
        </div>

        <aside className={m.side} aria-label="Your imports">
          <h2 className={m.sideTitle}>Your imports</h2>
          {importsError && !imports ? (
            <p className={m.warn}>
              <TriangleAlert size={16} aria-hidden="true" /> Couldn’t load your imports. Anything running is unaffected.
            </p>
          ) : !imports ? (
            <div className={m.skel} style={{ height: 120 }} />
          ) : running.length === 0 ? (
            <p className={m.muted}>No imports yet. Your first one will show up here with its progress.</p>
          ) : (
            <ul className={m.importList}>
              {running.map((imp) => {
                const st = statusInfo(imp);
                const pct = overallPercent(computeStages(imp));
                return (
                  <li key={imp.id}>
                    <Link href={`/admin/courses/import/${imp.id}`} className={m.importCard}>
                      <span className={m.importTop}>
                        <strong>{imp.courseTitle || imp.sourceDriveFolderName}</strong>
                        <span className={m.status} style={{ '--tone': st.tone } as CSSProperties}>
                          {st.label}
                        </span>
                      </span>
                      <span className={m.bar}>
                        <span style={{ width: `${pct}%` }} />
                      </span>
                      <span className={m.importMeta}>
                        <Clock size={13} aria-hidden="true" /> {new Date(imp.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        {' · '}
                        {pct}%{imp.autopilot ? ' · autopilot' : ''}
                        {imp.counts.failed > 0 ? ` · ${imp.counts.failed} failed` : ''}
                        <ArrowRight size={14} className={m.chev} aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
