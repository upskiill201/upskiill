'use client';

import { useState } from 'react';
import { Video } from 'lucide-react';
import {
  Banner,
  Button,
  Card,
  ErrorState,
  Loading,
  PageHeader,
  adminMutate,
  useAdminData,
} from '@/components/admin/AdminUI';
import styles from '../coupons/settings/settings.module.css';

interface IntroVideoSettings {
  url: string | null;
  videoId: string | null;
  updatedAt: string | null;
}

export default function AdminSitePage() {
  const { data, error, isLoading, mutate } = useAdminData<IntroVideoSettings>('/api/admin/settings/intro-video');

  // Seed the field once from the server; later revalidations never overwrite typing.
  const [url, setUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  if (error) return <ErrorState error={error as Error} />;
  if (isLoading || !data) {
    return (
      <>
        <PageHeader title="Homepage video" />
        <Loading />
      </>
    );
  }

  const value = url ?? data.url ?? '';
  const dirty = value.trim() !== (data.url ?? '');

  const save = async (next: string) => {
    setSaving(true);
    setSaveError(null);
    try {
      const updated = await adminMutate<IntroVideoSettings>('/api/admin/settings/intro-video', {
        method: 'PATCH',
        body: { url: next.trim() || null },
      });
      await mutate(updated, { revalidate: false });
      setUrl(null);
      setJustSaved(true);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Could not save the video');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Homepage video"
        subtitle="The introduction video shown right under the hero on teyro.app. Paste a YouTube link to change it; clear it to hide the section."
      />

      <div className={styles.section}>
        <Card title="Introduction video" icon={<Video size={15} />}>
          <div className={styles.row}>
            <div className={styles.rowText}>
              <span className={styles.rowLabel}>YouTube link</span>
              <span className={styles.rowHint}>
                Any normal YouTube link works (youtube.com/watch?v=… or youtu.be/…). Set the video to Public or
                Unlisted on YouTube, or visitors will not be able to play it. The homepage updates within about a
                minute.
              </span>
            </div>
          </div>
          <div className={styles.row}>
            <input
              type="url"
              inputMode="url"
              placeholder="https://youtu.be/…"
              aria-label="YouTube link"
              style={{
                width: '100%',
                minHeight: 44,
                padding: '0 14px',
                border: '1px solid var(--border)',
                borderRadius: 10,
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                font: 'inherit',
              }}
              value={value}
              onChange={(e) => {
                setUrl(e.target.value);
                setJustSaved(false);
              }}
            />
          </div>

          {data.videoId && !dirty && (
            <div style={{ padding: '4px 0 16px' }}>
              <div style={{ position: 'relative', aspectRatio: '16 / 9', maxWidth: 480, borderRadius: 12, overflow: 'hidden' }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${data.videoId}?rel=0`}
                  title="Current homepage video preview"
                  allow="encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                />
              </div>
            </div>
          )}

          {!data.videoId && !dirty && <Banner tone="warn">No video is set, so the homepage shows no video section.</Banner>}
          {saveError && <Banner tone="warn">{saveError}</Banner>}
          {justSaved && <Banner>Saved. teyro.app will show it within about a minute.</Banner>}

          <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
            <Button onClick={() => save(value)} disabled={saving || !dirty}>
              {saving ? 'Saving…' : 'Save video'}
            </Button>
            {data.url && (
              <Button variant="secondary" onClick={() => save('')} disabled={saving}>
                Remove video
              </Button>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
