'use client';

/**
 * The network, inside a code exercise:
 *   - stuck (a failed run): "Ask someone who passed this" — opens a question
 *     linked to this lesson in a new tab (the lesson stays put), which the
 *     network routes to people who just passed it
 *   - passed on your own: "Share with my buddies" — proof of work for the feed
 *
 * Renders nothing outside the lesson player, in review replays and previews.
 */

import React from 'react';
import { Glyph } from '@/components/art/Glyph';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { useLessonContext } from '@/lib/lesson/LessonContext';
import { askAboutLessonHref, shareWork } from '@/lib/network';
import styles from '@/components/code/PythonPad.module.css';

export default function LessonNetworkActions({
  stuck,
  passedCode,
  language,
}: {
  /** At least one failed run. */
  stuck: boolean;
  /** Code that passed every check without the shown solution, else null. */
  passedCode: string | null;
  language: 'python' | 'sql';
}) {
  const ctx = useLessonContext();
  const [share, setShare] = React.useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [sharedCode, setSharedCode] = React.useState<string | null>(null);
  if (!ctx?.shareable) return null;

  const canShare = passedCode !== null && passedCode !== sharedCode;

  const doShare = async () => {
    if (passedCode === null) return;
    setShare('busy');
    playSound('select');
    try {
      await shareWork({ lessonId: ctx.lessonId, language, code: passedCode });
      setShare('done');
      setSharedCode(passedCode);
      playSound('correct');
      playHaptic('success', false);
    } catch {
      setShare('error');
      playSound('nodeLocked');
    }
  };

  return (
    <>
      {stuck && passedCode === null && (
        <a
          className={styles.ghost}
          href={askAboutLessonHref(ctx.courseId, ctx.lessonId, ctx.lessonTitle)}
          target="_blank"
          rel="noopener"
          style={{ textDecoration: 'none' }}
          onClick={() => playSound('select')}
        >
          <Glyph name="help" size={16} strokeWidth={2.5} /> Ask someone who passed this
        </a>
      )}
      {(canShare || share === 'done') && (
        <button type="button" className={styles.ghost} disabled={share === 'busy' || !canShare} onClick={() => void doShare()}>
          <Glyph name={share === 'done' && !canShare ? 'check' : 'share'} size={16} strokeWidth={2.5} />
          {share === 'done' && !canShare ? 'Shared with your buddies' : share === 'error' ? 'Try sharing again' : 'Share with my buddies'}
        </button>
      )}
    </>
  );
}
