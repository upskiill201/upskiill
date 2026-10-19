'use client';

/**
 * The HTML & CSS pad: the code editor above a live page that changes as you
 * type (debounced a little), with a phone / desktop switch. Used by Try it
 * live, Build it (Write and run for pages) and the playground's HTML mode.
 *
 * The live page is fully sandboxed (no scripts, forms, popups or navigation),
 * and relative file names resolve to the course's own sounds and pictures
 * (lib/code/htmlRunner.ts). "Check my page" grades a separate hidden render.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, Loader2, Monitor, Smartphone } from 'lucide-react';
import { runAndCheck, type GradedRun } from '@/lib/code/checks';
import { withAssetBase } from '@/lib/code/htmlRunner';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { CheckList, CodeEditor, type PythonPadProps } from './PythonPad';
import padStyles from './PythonPad.module.css';
import styles from './HtmlPad.module.css';

const DESKTOP_WIDTH = 1024;
const PHONE_WIDTH = 390;
const PREVIEW_HEIGHT = 460;
const DEBOUNCE_MS = 250;

type Device = 'phone' | 'desktop';

/** A clean "it rendered" result, for Try it live cards (no checks to pass). */
const rendered = (code: string): GradedRun => ({
  stdout: code,
  error: null,
  exprResults: [],
  timedOut: false,
  ms: 0,
  checks: [],
  allPassed: false,
});

function LivePage({ code, device }: { code: string; device: Device }) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const frameWidth = device === 'desktop' ? DESKTOP_WIDTH : Math.min(PHONE_WIDTH, width || PHONE_WIDTH);
  const scale = width > 0 && frameWidth > width ? width / frameWidth : 1;

  return (
    <div ref={box} className={styles.stage} style={{ height: PREVIEW_HEIGHT * scale }}>
      <iframe
        title="Your page"
        className={styles.frame}
        // An empty sandbox: no scripts, no forms, no popups, no navigation away.
        sandbox=""
        srcDoc={withAssetBase(code)}
        style={{ width: frameWidth, height: PREVIEW_HEIGHT, transform: `scale(${scale})` }}
      />
    </div>
  );
}

export function HtmlPad({
  value,
  onChange,
  resetTo,
  readOnly = false,
  checks,
  onRun,
  runLabel,
  minLines,
  maxLines,
  label = 'HTML code',
  fileName,
  actions,
}: PythonPadProps) {
  const [shown, setShown] = useState(value);
  const [device, setDevice] = useState<Device>('phone');
  const [checking, setChecking] = useState(false);
  const [run, setRun] = useState<GradedRun | null>(null);
  const reported = useRef(false);
  const graded = Boolean(checks?.length);

  // The page follows the code, a moment after typing stops.
  useEffect(() => {
    const t = window.setTimeout(() => setShown(value), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [value]);

  // Try it live: seeing the page counts as running it.
  useEffect(() => {
    if (graded || reported.current || !onRun) return;
    reported.current = true;
    onRun(rendered(shown));
  }, [graded, onRun, shown]);

  const check = async () => {
    if (checking || !checks) return;
    setChecking(true);
    setShown(value);
    playSound('select');
    playHaptic('medium', false);
    try {
      const result = await runAndCheck(value, checks, undefined, 'html');
      setRun(result);
      playSound(result.allPassed ? 'correct' : 'wrong');
      playHaptic(result.allPassed ? 'success' : 'error', false);
      onRun?.(result);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className={padStyles.pad}>
      <CodeEditor
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        minLines={minLines}
        maxLines={maxLines}
        onRun={graded ? () => void check() : undefined}
        label={label}
        fileName={fileName}
        language="html"
        onReset={resetTo !== undefined && value !== resetTo ? () => onChange(resetTo) : undefined}
      />

      <div className={styles.preview}>
        <div className={styles.bar}>
          <span className={styles.barTitle}>Your page</span>
          <div className={styles.devices} role="radiogroup" aria-label="Preview size">
            {(
              [
                ['phone', 'Phone', Smartphone],
                ['desktop', 'Desktop', Monitor],
              ] as const
            ).map(([id, text, Icon]) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={device === id}
                className={`${styles.device} ${device === id ? styles.deviceOn : ''}`}
                onClick={() => {
                  playSound('navTap');
                  setDevice(id);
                }}
              >
                <Icon size={14} strokeWidth={2.5} aria-hidden="true" /> {text}
              </button>
            ))}
          </div>
        </div>
        <LivePage code={shown} device={device} />
      </div>

      {graded && checks && <CheckList checks={checks} results={run?.checks ?? null} title="Your page should" />}

      {graded && !readOnly && (
        <div className={padStyles.runRow}>
          <button type="button" className={padStyles.run} onClick={() => void check()} disabled={checking}>
            {checking ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Check size={18} strokeWidth={3} aria-hidden="true" />}
            {checking ? 'Checking' : (runLabel ?? 'Check my page')}
          </button>
          {actions}
        </div>
      )}
    </div>
  );
}
