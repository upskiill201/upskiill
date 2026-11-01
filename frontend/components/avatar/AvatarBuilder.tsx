'use client';

/**
 * Build your Teyro character. Start from a character with a personality
 * (Crack Coder, Per My Last Email, Objection!…), then change anything:
 * face, hair, eyes, mouth, outfit, extras. Every option tile shows YOUR
 * character wearing it, so you see the result before you tap.
 */

import React, { useMemo, useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import { Glyph } from '@/components/art/Glyph';
import { AVATAR_PARTS, builtAvatarUrl, encodeAvatar, randomAvatar, type AvatarConfig, type AvatarPart } from '@/lib/avatar/avatar';
import { AVATAR_BG, AVATAR_HAIR, AVATAR_SHIRT, AVATAR_SKIN } from '@/lib/avatar/draw';
import { PERSONAS } from '@/lib/avatar/personas';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import styles from './AvatarStudio.module.css';

type TabId = 'vibe' | 'face' | 'hair' | 'eyes' | 'mouth' | 'style';

const TABS: { id: TabId; label: string }[] = [
  { id: 'vibe', label: 'Characters' },
  { id: 'face', label: 'Face' },
  { id: 'hair', label: 'Hair' },
  { id: 'eyes', label: 'Eyes' },
  { id: 'mouth', label: 'Mouth' },
  { id: 'style', label: 'Style' },
];

/** Each tab: which parts it edits, as shape tiles or colour swatches. */
const SECTIONS: Record<Exclude<TabId, 'vibe'>, { part: AvatarPart; title: string; swatches?: string[] }[]> = {
  face: [
    { part: 'skin', title: 'Skin', swatches: AVATAR_SKIN },
    { part: 'head', title: 'Face shape' },
    { part: 'blush', title: 'Cheeks' },
  ],
  hair: [
    { part: 'hair', title: 'Style' },
    { part: 'hairColor', title: 'Colour', swatches: AVATAR_HAIR },
  ],
  eyes: [
    { part: 'eyes', title: 'Eyes' },
    { part: 'brows', title: 'Brows' },
    { part: 'glasses', title: 'Glasses' },
  ],
  mouth: [
    { part: 'mouth', title: 'Mouth' },
    { part: 'beard', title: 'Facial hair' },
  ],
  style: [
    { part: 'outfit', title: 'Outfit' },
    { part: 'shirt', title: 'Colour', swatches: AVATAR_SHIRT },
    { part: 'extra', title: 'Extras' },
    { part: 'bg', title: 'Background', swatches: AVATAR_BG },
  ],
};

interface Props {
  initial: AvatarConfig;
  busy?: boolean;
  onCancel: () => void;
  onSave: (config: AvatarConfig) => void;
}

export default function AvatarBuilder({ initial, busy, onCancel, onSave }: Props) {
  const [config, setConfig] = useState<AvatarConfig>(initial);
  const [tab, setTab] = useState<TabId>('vibe');
  const code = encodeAvatar(config);
  const persona = useMemo(() => PERSONAS.find((p) => encodeAvatar(p.config) === code) ?? null, [code]);

  const set = (part: AvatarPart, value: number) => {
    playSound('navTap', (value % 6) + 1);
    playHaptic('light', false);
    setConfig((c) => ({ ...c, [part]: value }));
  };

  return (
    <div className={styles.builder}>
      <div className={styles.preview}>
        <Avatar src={builtAvatarUrl(config)} px={136} name="Your character" />
        <div className={styles.previewText}>
          <strong>{persona ? persona.name : 'Your character'}</strong>
          <span>{persona ? `${persona.vibe} · "${persona.line}"` : 'Tap anything below to change it.'}</span>
        </div>
        <button
          type="button"
          className={styles.shuffleBtn}
          onClick={() => {
            playSound('menuOpen');
            playHaptic('medium', false);
            setConfig(randomAvatar());
          }}
        >
          <Glyph name="refresh" size={16} strokeWidth={2.75} /> Shuffle
        </button>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Character parts">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`${styles.tab} ${tab === t.id ? styles.tabOn : ''}`}
            onClick={() => {
              playSound('navTap', 2);
              setTab(t.id);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.options} role="tabpanel">
        {tab === 'vibe' ? (
          <div className={styles.personaGrid}>
            {PERSONAS.map((p) => {
              const on = encodeAvatar(p.config) === code;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`${styles.personaTile} ${on ? styles.tileOn : ''}`}
                  aria-pressed={on}
                  onClick={() => {
                    playSound('toggleOn');
                    playHaptic('light', false);
                    setConfig(p.config);
                  }}
                >
                  <Avatar src={builtAvatarUrl(p.config)} px={72} name={p.name} />
                  <span className={styles.personaName}>{p.name}</span>
                  <span className={styles.personaVibe}>{p.vibe}</span>
                </button>
              );
            })}
          </div>
        ) : (
          SECTIONS[tab].map((sec) => (
            <section key={sec.part} className={styles.section}>
              <h3 className={styles.sectionTitle}>{sec.title}</h3>
              {sec.swatches ? (
                <div className={styles.swatches}>
                  {sec.swatches.map((color, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.swatch} ${config[sec.part] === i ? styles.swatchOn : ''}`}
                      // The swatch shows the drawing's own ink (lib/avatar/draw.ts).
                      style={{ background: color }}
                      aria-label={`${sec.title} ${i + 1}`}
                      aria-pressed={config[sec.part] === i}
                      onClick={() => set(sec.part, i)}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.partGrid}>
                  {Array.from({ length: AVATAR_PARTS[sec.part] }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.partTile} ${config[sec.part] === i ? styles.tileOn : ''}`}
                      aria-label={`${sec.title} ${i + 1}`}
                      aria-pressed={config[sec.part] === i}
                      onClick={() => set(sec.part, i)}
                    >
                      <Avatar src={builtAvatarUrl({ ...config, [sec.part]: i })} px={60} name="" />
                    </button>
                  ))}
                </div>
              )}
            </section>
          ))
        )}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.ghostBtn} onClick={onCancel} disabled={busy}>
          Back
        </button>
        <button type="button" className={styles.primaryBtn} onClick={() => onSave(config)} disabled={busy}>
          {busy ? <Glyph name="spinner" size={16} className="animate-spin" /> : null}
          {busy ? 'Saving…' : 'Save my character'}
        </button>
      </div>
    </div>
  );
}
