'use client';

/**
 * Details — everything a learner reads before starting: title, track and
 * topic (Coding or AI only), level, description, outcomes, requirements,
 * cover, and price (free, or a yearly price whose monthly plan is derived by
 * lib/pricing-engine). Saved with one PATCH carrying the course version, so two tabs
 * can't silently overwrite each other.
 */

import Image from 'next/image';
import { useRef, useState } from 'react';
import { CheckCircle2, ImageIcon, Loader2, Plus, UploadCloud, X } from 'lucide-react';
import { CREATOR_TRACK_LIST, CREATOR_TRACKS, normalizeCourseCategory, type CreatorTrack } from '@/lib/creator/categories';
import { calculateCoursePricingLadder } from '@/lib/pricing-engine';
import { slugifyTitle } from '@/lib/courses/slug';
import { uploadThumbnail } from '@/lib/s3Uploader';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import b from '@/components/lesson-builder/Builder.module.css';
import s from './Workspace.module.css';

export interface CourseDetails {
  id: string;
  title: string;
  subtitle: string | null;
  shortDescription: string | null;
  description: string | null;
  category: string | null;
  subcategory: string | null;
  level: string | null;
  thumbnailUrl: string | null;
  price: number;
  outcomes: string[] | null;
  requirements: string[] | null;
  version: number;
}

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

function List({ label, hint, items, placeholder, onChange, max = 6 }: { label: string; hint: string; items: string[]; placeholder: string; onChange: (v: string[]) => void; max?: number }) {
  return (
    <div className="flex flex-col gap-2">
      <span className={b.label}>
        {label}
        <span className={b.hint}>{hint}</span>
      </span>
      {items.map((it, i) => (
        <div key={i} className={b.optRow}>
          <input className={b.input} value={it} maxLength={160} placeholder={placeholder} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
          <button type="button" className={`${b.tool} ${b.toolDanger}`} aria-label="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>
            <X size={16} />
          </button>
        </div>
      ))}
      {items.length < max && (
        <button type="button" className={b.addRow} onClick={() => onChange([...items, ''])}>
          <Plus size={15} /> Add
        </button>
      )}
    </div>
  );
}

export function DetailsTab({ course, locked, onSaved }: { course: CourseDetails; locked: boolean; onSaved: (c: CourseDetails) => void }) {
  const [form, setForm] = useState(() => ({
    title: course.title ?? '',
    subtitle: course.subtitle ?? '',
    description: course.description === 'New Course Draft' ? '' : course.description ?? '',
    track: normalizeCourseCategory(course.category) as CreatorTrack | null,
    subcategory: course.subcategory ?? '',
    level: course.level ?? 'Beginner',
    thumbnailUrl: course.thumbnailUrl ?? '',
    price: course.price ?? 0,
    outcomes: Array.isArray(course.outcomes) ? course.outcomes : [],
    requirements: Array.isArray(course.requirements) ? course.requirements : [],
  }));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setSaved(false);
    setForm((f) => ({ ...f, [k]: v }));
  };

  const topics = form.track ? CREATOR_TRACKS[form.track].topics : [];
  const ladder = form.price > 0 ? calculateCoursePricingLadder(form.price) : null;

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/courses/${course.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: form.title.trim(),
          subtitle: form.subtitle.trim(),
          description: form.description.trim(),
          shortDescription: form.subtitle.trim() || form.description.trim().slice(0, 280),
          ...(form.track ? { category: CREATOR_TRACKS[form.track].label } : {}),
          subcategory: form.subcategory,
          level: form.level,
          thumbnailUrl: form.thumbnailUrl,
          price: form.price,
          outcomes: form.outcomes.map((o) => o.trim()).filter(Boolean),
          requirements: form.requirements.map((o) => o.trim()).filter(Boolean),
          version: course.version,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) throw new Error('This course was changed in another tab. Reload the page to get the latest, then save again.');
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      onSaved({ ...course, ...data, version: typeof data?.version === 'number' ? data.version : course.version + 1 });
      setSaved(true);
      playSound('profileSaved');
      playHaptic('success', false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That didn’t save. Try again?');
      playSound('wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={b.card}>
        <label className={b.label}>
          Course title
          <input className={b.input} value={form.title} maxLength={100} disabled={locked} onChange={(e) => set('title', e.target.value)} placeholder="e.g. JavaScript from zero" />
          <span className={b.hint}>
            Course page: <strong>teyro.app/courses/{slugifyTitle(form.title)}</strong>. Made from the title, so put the
            words learners search for in it. Change it later and old links still work.
          </span>
        </label>
        <label className={b.label}>
          One-line promise
          <span className={b.hint}>What learners will be able to do. Shown under the title.</span>
          <input className={b.input} value={form.subtitle} maxLength={160} disabled={locked} onChange={(e) => set('subtitle', e.target.value)} placeholder="e.g. Build your first three web apps in bite-size lessons" />
        </label>
        <label className={b.label}>
          Description
          <span className={b.hint}>Who it’s for and what they’ll build. At least 40 characters to submit.</span>
          <textarea className={b.textarea} rows={5} value={form.description} maxLength={5000} disabled={locked} onChange={(e) => set('description', e.target.value)} />
        </label>
      </div>

      <div className={b.card}>
        <span className={b.label}>Track</span>
        <div className={b.chips} role="radiogroup" aria-label="Track">
          {CREATOR_TRACK_LIST.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={form.track === t.id}
              disabled={locked}
              className={`${b.chip} ${form.track === t.id ? b.chipOn : ''}`}
              onClick={() => {
                set('track', t.id);
                set('subcategory', '');
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {topics.length > 0 && (
          <>
            <span className={b.label}>Topic</span>
            <div className={b.chips} role="radiogroup" aria-label="Topic">
              {topics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={form.subcategory === t.label}
                  disabled={locked}
                  className={`${b.chip} ${form.subcategory === t.label ? b.chipOn : ''}`}
                  onClick={() => set('subcategory', t.label)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </>
        )}
        <span className={b.label}>Level</span>
        <div className={b.chips} role="radiogroup" aria-label="Level">
          {LEVELS.map((l) => (
            <button key={l} type="button" role="radio" aria-checked={form.level === l} disabled={locked} className={`${b.chip} ${form.level === l ? b.chipOn : ''}`} onClick={() => set('level', l)}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className={b.card}>
        <List label="What learners will achieve" hint="3 to 6 outcomes, starting with a verb." items={form.outcomes} placeholder="e.g. Build a to-do app with JavaScript" onChange={(v) => set('outcomes', v)} />
        <List label="Before you start" hint="What learners need first. Leave empty if nothing." items={form.requirements} placeholder="e.g. A laptop with a web browser" onChange={(v) => set('requirements', v)} max={5} />
      </div>

      <div className={b.card}>
        <span className={b.label}>
          Cover image
          <span className={b.hint}>JPG, PNG or WebP up to 5MB. Without one, learners see a cover in your track’s colour.</span>
        </span>
        {form.thumbnailUrl ? (
          <div className={s.thumb}>
            <Image src={form.thumbnailUrl} alt="Course cover" fill style={{ objectFit: 'cover' }} sizes="360px" />
          </div>
        ) : (
          <div className={s.thumb} style={{ display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}>
            <ImageIcon size={32} aria-hidden="true" />
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          hidden
          accept="image/png,image/jpeg,image/webp"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = '';
            if (!file) return;
            setUploading(1);
            setError(null);
            try {
              const { url } = await uploadThumbnail(file, { onProgress: (p) => setUploading(Math.max(1, p)) });
              set('thumbnailUrl', url);
              playSound('correct');
            } catch (err) {
              setError(err instanceof Error ? err.message : 'The image could not be uploaded.');
            } finally {
              setUploading(0);
            }
          }}
        />
        <div className={b.row}>
          <button type="button" className={b.btn} style={{ flex: '0 0 auto' }} disabled={locked || uploading > 0} onClick={() => fileRef.current?.click()}>
            {uploading ? <Loader2 size={16} className={b.spin} /> : <UploadCloud size={16} />} {uploading ? `${uploading}%` : form.thumbnailUrl ? 'Replace' : 'Upload'}
          </button>
          {form.thumbnailUrl && (
            <button type="button" className={b.btnGhost} style={{ flex: '0 0 auto' }} disabled={locked} onClick={() => set('thumbnailUrl', '')}>
              Remove
            </button>
          )}
        </div>
      </div>

      <div className={b.card}>
        <span className={b.label}>
          Price
          <span className={b.hint}>Paid courses: the first 2 lessons stay free, then learners subscribe monthly or yearly. You keep 70%.</span>
        </span>
        <div className={b.chips} role="radiogroup" aria-label="Price">
          <button type="button" role="radio" aria-checked={form.price === 0} disabled={locked} className={`${b.chip} ${form.price === 0 ? b.chipOn : ''}`} onClick={() => set('price', 0)}>
            Free
          </button>
          <button type="button" role="radio" aria-checked={form.price > 0} disabled={locked} className={`${b.chip} ${form.price > 0 ? b.chipOn : ''}`} onClick={() => set('price', form.price > 0 ? form.price : 30)}>
            Paid
          </button>
        </div>
        {form.price > 0 && ladder && (
          <>
            <label className={b.label}>
              Yearly price (USD)
              <span className={b.hint}>
                What a learner pays for a full year. The monthly plan is set for you at one sixth of it, so paying yearly
                saves {ladder.yearly.savingsPercent}%.
              </span>
              <input className={b.input} type="number" min={1} step={1} value={form.price} disabled={locked} onChange={(e) => set('price', Math.max(0, Number(e.target.value) || 0))} />
            </label>
            <div className={s.price}>
              <div className={s.priceTile}>
                Yearly
                <strong>{ladder.yearly.formattedPrice}</strong>
              </div>
              <div className={s.priceTile}>
                Monthly
                <strong>{ladder.monthly.formattedPrice}</strong>
              </div>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className={`${b.issue} ${b.issueBad}`} role="alert">
          {error}
        </p>
      )}
      {!locked && (
        <div className={b.row} style={{ alignItems: 'center' }}>
          <button type="button" className={b.btnPrimary} style={{ flex: '0 0 auto' }} disabled={saving} onClick={() => void save()}>
            {saving ? <Loader2 size={16} className={b.spin} /> : null} Save details
          </button>
          {saved && (
            <span className={`${b.status} ${b.statusOk}`} style={{ flex: '0 0 auto' }}>
              <CheckCircle2 size={14} aria-hidden="true" /> Saved
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default DetailsTab;
