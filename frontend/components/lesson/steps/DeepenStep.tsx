'use client';

/**
 * Deepen — hand-picked extras for anyone who wants more. Optional by nature:
 * FINISH is never gated on it. Extras open in a new tab so the lesson, one
 * tap from done, is still here when they come back.
 */

import DOMPurify from 'dompurify';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  ExternalLink,
  FileText,
  Folder,
  LayoutTemplate,
  Link as LinkIcon,
  Presentation,
  Sheet,
  Video,
  type LucideIcon,
} from 'lucide-react';
import type { LessonResource } from '@/lib/lesson/content';
import { playHaptic } from '@/lib/haptics';
import { StepHeading } from './StepHeading';
import { TeySays } from '../TeySays';

const sanitize = (raw: string) => DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });

function resourceKind(type: string | null | undefined): { icon: LucideIcon; color: string; label: string } {
  const t = (type ?? 'link').toLowerCase();
  if (/fig|design|template/.test(t)) return { icon: LayoutTemplate, color: 'var(--brand-purple)', label: 'Template' };
  if (/pdf|doc/.test(t)) return { icon: FileText, color: 'var(--lesson-wrong)', label: 'Guide' };
  if (/video|mp4|youtube/.test(t)) return { icon: Video, color: 'var(--brand-indigo)', label: 'Video' };
  if (/xls|csv|sheet|data/.test(t)) return { icon: Sheet, color: 'var(--lesson-correct)', label: 'Data sheet' };
  if (/ppt|slides|presentation/.test(t)) return { icon: Presentation, color: 'var(--warning)', label: 'Slides' };
  if (/zip|rar|folder|source|file/.test(t)) return { icon: Folder, color: 'var(--color-brand)', label: 'Files' };
  if (/link|url|website/.test(t)) return { icon: LinkIcon, color: 'var(--color-brand)', label: 'Link' };
  return { icon: BookOpen, color: 'var(--brand-purple)', label: 'Notes' };
}

function sizeLabel(bytes: number | null | undefined) {
  if (!bytes) return null;
  return bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

export function DeepenStep({
  title,
  description,
  resources,
}: {
  title: string;
  description: string;
  resources: LessonResource[];
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <StepHeading phase="deepen" title={title} />

      <TeySays pose="searching" lineKey="deepen">
        <span dangerouslySetInnerHTML={{ __html: sanitize(description) }} />
      </TeySays>

      {resources.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {resources.slice(0, 8).map((r, i) => {
            const kind = resourceKind(r.type);
            const Icon = kind.icon;
            const size = sizeLabel(r.sizeBytes);
            return (
              <motion.li
                key={r.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 420, damping: 28 }}
              >
                <a
                  href={r.storageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playHaptic('light', false)}
                  className="flex items-center gap-3.5 rounded-[18px] border-2 border-[var(--border)] bg-white p-3.5 hover:bg-[var(--bg-section)] active:translate-y-[2px] transition-transform"
                  style={{ boxShadow: '0 4px 0 var(--border)' }}
                >
                  <span
                    className="shrink-0 w-12 h-12 rounded-[14px] flex items-center justify-center"
                    style={{ backgroundColor: kind.color, boxShadow: `0 3px 0 color-mix(in srgb, ${kind.color} 75%, black)` }}
                  >
                    <Icon className="w-6 h-6 text-white stroke-[2.5]" aria-hidden="true" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block truncate text-[16px] font-extrabold text-ink">
                      {r.title || r.originalName || 'Resource'}
                    </span>
                    <span className="block text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--text-muted)]">
                      {size ? `${kind.label} · ${size}` : kind.label}
                    </span>
                  </span>
                  <ExternalLink className="shrink-0 w-5 h-5 text-[var(--text-muted)]" aria-hidden="true" />
                </a>
              </motion.li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-[18px] border-2 border-dashed border-[var(--border-strong)] p-5 text-center text-[15px] font-semibold text-[var(--text-secondary)]">
          No extras for this one. You&apos;re ready to finish.
        </p>
      )}

    </div>
  );
}

export default DeepenStep;
