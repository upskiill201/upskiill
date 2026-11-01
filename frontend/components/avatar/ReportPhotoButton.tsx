'use client';

/**
 * "Report photo" on someone's profile. Only real photos can be reported
 * (a Teyro character can't be inappropriate). Teyro HQ → Photos reviews it.
 */

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Glyph } from '@/components/art/Glyph';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './AvatarStudio.module.css';

const REASONS = [
  { id: 'inappropriate', label: "It's inappropriate" },
  { id: 'impersonation', label: "It's pretending to be someone else" },
  { id: 'not-a-person', label: "It's not a photo of a person" },
  { id: 'other', label: 'Something else' },
] as const;

export default function ReportPhotoButton({ userId, name }: { userId: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const send = async (reason: string) => {
    setState('sending');
    try {
      const res = await fetch(`/api/avatar/report/${encodeURIComponent(userId)}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) throw new Error();
      setState('sent');
      playSound('toggleOn');
    } catch {
      setState('error');
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.reportLink}
        onClick={() => {
          setState('idle');
          setOpen(true);
        }}
      >
        <Glyph name="flag" size={13} strokeWidth={2.5} /> Report photo
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={`Report ${name}'s photo`} size="sm">
        {state === 'sent' ? (
          <div className={styles.choose}>
            <p className={styles.chooseLead}>Thanks. Teyro will take a look, and {name} won&apos;t know it was you.</p>
            <button type="button" className={styles.primaryBtn} onClick={() => setOpen(false)}>
              Done
            </button>
          </div>
        ) : (
          <div className={styles.chooseOptions}>
            {REASONS.map((r) => (
              <button
                key={r.id}
                type="button"
                className={styles.optionCard}
                style={{ minHeight: 52 }}
                disabled={state === 'sending'}
                onClick={() => void send(r.id)}
              >
                <span className={styles.optionText}>
                  <strong style={{ fontSize: 15 }}>{r.label}</strong>
                </span>
              </button>
            ))}
            {state === 'error' && <p className={styles.error} role="alert">That didn&apos;t send. Try again.</p>}
          </div>
        )}
      </Modal>
    </>
  );
}
