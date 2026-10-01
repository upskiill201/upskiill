'use client';

/**
 * Deepen — OPTIONAL extra resources (docs, articles, repos, files). Switched
 * off, the lesson simply ends after Reflect and publishing isn't blocked.
 * Resources are saved straight away through the lesson resource endpoints.
 */

import { useRef, useState } from 'react';
import { ExternalLink, FileText, Link2, Loader2, Plus, Trash2, UploadCloud } from 'lucide-react';
import { useS3Upload } from '@/hooks/useS3Upload';
import { extractErrorMessage } from '@/lib/apiError';
import { playSound } from '@/lib/audio/lessonSounds';
import type { DeepenDraft, ResourceDraft } from '@/lib/lesson-builder/draft';
import { Switch } from '@/components/settings/SettingsParts';
import styles from './Builder.module.css';

export function DeepenEditor({
  lessonId,
  deepen,
  resources,
  onDeepen,
  onResources,
}: {
  lessonId: string;
  deepen: DeepenDraft;
  resources: ResourceDraft[];
  onDeepen: (d: DeepenDraft) => void;
  onResources: (r: ResourceDraft[]) => void;
}) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, progress } = useS3Upload();

  const addResource = async (r: { title: string; url: string; type: string }) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/lesson/${lessonId}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: r.title, type: r.type, storageUrl: r.url, originalName: r.title, displayOrder: resources.length }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      onResources([...resources, { id: String(data.id), title: r.title, url: r.url, type: r.type }]);
      setTitle('');
      setUrl('');
      playSound('correct');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That resource could not be added.');
      playSound('wrong');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (r: ResourceDraft) => {
    const prev = resources;
    onResources(resources.filter((x) => x.id !== r.id));
    const res = await fetch(`/api/lesson/${lessonId}/resources/${r.id}`, { method: 'DELETE', credentials: 'include' }).catch(() => null);
    if (!res?.ok) {
      onResources(prev);
      setError('That resource could not be removed. Try again?');
    }
  };

  const addLink = () => {
    const clean = url.trim();
    if (!/^https?:\/\/\S+$/i.test(clean)) {
      setError('Paste a full link starting with https://');
      return;
    }
    void addResource({ title: title.trim() || clean.replace(/^https?:\/\//, '').slice(0, 80), url: clean, type: 'link' });
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.optRow}>
          <span className={styles.stepText} style={{ flex: 1 }}>
            <span className={styles.stepName}>Add extra resources</span>
            <span className={styles.hint}>Optional. For learners who want to go further: docs, articles, repos, files.</span>
          </span>
          <Switch checked={deepen.enabled} label="Add extra resources" onChange={(enabled) => onDeepen({ ...deepen, enabled })} />
        </div>
      </div>

      {deepen.enabled && (
        <div className={styles.card}>
          <label className={styles.label}>
            Title
            <input
              className={styles.input}
              value={deepen.collectionTitle}
              maxLength={100}
              placeholder="e.g. Go deeper on variables"
              onChange={(e) => onDeepen({ ...deepen, collectionTitle: e.target.value })}
            />
          </label>
          <label className={styles.label}>
            Short intro (optional)
            <input
              className={styles.input}
              value={deepen.collectionDescription}
              maxLength={300}
              onChange={(e) => onDeepen({ ...deepen, collectionDescription: e.target.value })}
            />
          </label>

          <span className={styles.label}>Resources</span>
          {resources.length === 0 && <p className={styles.hint}>No resources yet.</p>}
          {resources.map((r) => (
            <div key={r.id} className={styles.optRow}>
              {r.type === 'link' ? <Link2 size={18} aria-hidden="true" /> : <FileText size={18} aria-hidden="true" />}
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: 0, fontWeight: 700, color: 'var(--color-ink)' }}>
                {r.title} <ExternalLink size={13} aria-hidden="true" style={{ display: 'inline' }} />
              </a>
              <button type="button" className={`${styles.tool} ${styles.toolDanger}`} aria-label={`Remove ${r.title}`} onClick={() => void remove(r)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <div className={styles.row}>
            <input className={styles.input} value={title} placeholder="Name (optional)" onChange={(e) => setTitle(e.target.value)} />
            <input className={styles.input} value={url} placeholder="https://…" inputMode="url" onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className={styles.row} style={{ alignItems: 'center' }}>
            <button type="button" className={styles.btn} style={{ flex: '0 0 auto' }} onClick={addLink} disabled={busy}>
              {busy ? <Loader2 size={16} className={styles.spin} /> : <Plus size={16} />} Add link
            </button>
            <input
              ref={fileRef}
              type="file"
              hidden
              accept=".pdf,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                if (!file) return;
                try {
                  const { cloudFrontUrl } = await upload(file, lessonId);
                  await addResource({ title: file.name, url: cloudFrontUrl, type: 'file' });
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'The upload failed.');
                }
              }}
            />
            <button type="button" className={styles.btnGhost} style={{ flex: '0 0 auto' }} onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 size={16} className={styles.spin} /> : <UploadCloud size={16} />} {uploading ? `Uploading ${progress}%` : 'Upload a file'}
            </button>
          </div>
          {error && (
            <p className={`${styles.issue} ${styles.issueBad}`} role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default DeepenEditor;
