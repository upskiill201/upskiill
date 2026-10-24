'use client';

/**
 * The React Native pad: the code editor above a phone that runs the
 * learner's app (lib/code/rnRunner.ts). The phone updates a moment after
 * typing stops, and the learner can tap and type in it like a real app.
 * Errors show as React Native's red screen, in plain words. Used by Try it
 * live, Write and run (graded with screen checks) and, later, the playground.
 *
 * The phone is a sandboxed frame (scripts on, no access to Teyro's page);
 * this component only listens to messages from its own frame.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AlertTriangle, Check, Loader2, RotateCcw } from 'lucide-react';
import { runAndCheck, type GradedRun } from '@/lib/code/checks';
import { PHONE_HEIGHT, PHONE_WIDTH, PhoneFrame, explainRnError, phoneFrameHtml } from '@/lib/code/rnRunner';
import { transpileTsx, warmTypeScript } from '@/lib/code/tsRunner';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { CheckList, CodeEditor, useRunnerStatus, type PythonPadProps } from './PythonPad';
import padStyles from './PythonPad.module.css';
import styles from './PhonePad.module.css';

const DEBOUNCE_MS = 500;
/** The tallest the phone gets on screen, so the editor stays in view. */
const MAX_PHONE_HEIGHT = 520;
const BEZEL = 10;

interface ScreenError {
  message: string;
  line: number | null;
  syntax: boolean;
}

/** A Try it live result: rendered, or not, with the error. */
const asRun = (code: string, error: ScreenError | null): GradedRun => ({
  stdout: code,
  error: error ? { type: error.syntax ? 'SyntaxError' : 'Error', message: error.message, line: error.line } : null,
  exprResults: [],
  timedOut: false,
  ms: 0,
  checks: [],
  allPassed: false,
});

export function PhonePad({
  value,
  onChange,
  resetTo,
  readOnly = false,
  checks,
  onRun,
  runLabel,
  minLines,
  maxLines,
  label = 'React Native code',
  fileName,
  actions,
}: PythonPadProps) {
  const status = useRunnerStatus('react-native');
  const frameRef = useRef<HTMLIFrameElement>(null);
  const phoneRef = useRef<PhoneFrame | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const [error, setError] = useState<ScreenError | null>(null);
  const [rendering, setRendering] = useState(true);
  const [checking, setChecking] = useState(false);
  const [run, setRun] = useState<GradedRun | null>(null);
  const [reloads, setReloads] = useState(0);
  const graded = Boolean(checks?.length);
  const onRunRef = useRef(onRun);
  onRunRef.current = onRun;
  const gradedRef = useRef(graded);
  gradedRef.current = graded;

  useEffect(() => warmTypeScript(), []);

  // One phone frame for the pad's life; its document is set here, after the
  // listener exists, so its "ready" message is never missed.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const phone = new PhoneFrame(frame);
    phoneRef.current = phone;
    phone.setOnError((message) => setError({ message: explainRnError(message), line: null, syntax: false }));
    frame.srcdoc = phoneFrameHtml(window.location.origin);
    return () => {
      phone.dispose();
      phoneRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBoxWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const render = useCallback(async (code: string) => {
    const phone = phoneRef.current;
    if (!phone) return;
    setRendering(true);
    let next: ScreenError | null = null;
    try {
      const compiled = await transpileTsx(code);
      if (!compiled.js) {
        next = { message: compiled.error?.message ?? 'This code has a syntax error.', line: compiled.error?.line ?? null, syntax: true };
      } else {
        const failed = await phone.mount(compiled.js);
        if (failed) next = { message: explainRnError(failed.message), line: null, syntax: false };
      }
    } catch {
      next = { message: "The phone preview couldn't load. Check your connection and try again.", line: null, syntax: false };
    }
    if (phoneRef.current !== phone) return;
    setError(next);
    setRendering(false);
    // Try it live: showing the app counts as running it. A graded exercise
    // only counts "Check my app", never the live preview (or every keystroke
    // would be a failed attempt).
    if (!gradedRef.current) onRunRef.current?.(asRun(code, next));
  }, []);

  // The phone follows the code, a moment after typing stops.
  useEffect(() => {
    const t = window.setTimeout(() => void render(value), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [value, reloads, render]);

  const check = async () => {
    if (checking || !checks) return;
    setChecking(true);
    playSound('select');
    playHaptic('medium', false);
    try {
      const result = await runAndCheck(value, checks, undefined, 'react-native');
      setRun(result);
      playSound(result.allPassed ? 'correct' : 'wrong');
      playHaptic(result.allPassed ? 'success' : 'error', false);
      onRun?.(result);
    } finally {
      setChecking(false);
    }
  };

  // Fit the phone (plus its bezel) to the space, never taller than MAX_PHONE_HEIGHT.
  const outerW = PHONE_WIDTH + BEZEL * 2;
  const outerH = PHONE_HEIGHT + BEZEL * 2;
  const scale = Math.min(1, boxWidth > 0 ? (boxWidth - 16) / outerW : 1, MAX_PHONE_HEIGHT / outerH);
  const loading = status === 'loading' || status === 'idle';

  return (
    <div className={padStyles.pad}>
      <CodeEditor
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        errorLine={error?.syntax ? error.line : null}
        minLines={minLines}
        maxLines={maxLines}
        onRun={graded ? () => void check() : undefined}
        label={label}
        fileName={fileName}
        language="react-native"
        onReset={resetTo !== undefined && value !== resetTo ? () => onChange(resetTo) : undefined}
      />

      <div className={styles.preview}>
        <div className={styles.bar}>
          <span className={styles.barTitle}>Your app</span>
          <button
            type="button"
            className={styles.reload}
            onClick={() => {
              playSound('navTap');
              setReloads((n) => n + 1);
            }}
            aria-label="Restart the app"
          >
            <RotateCcw size={14} strokeWidth={2.5} aria-hidden="true" /> Restart
          </button>
        </div>
        <div ref={boxRef} className={styles.stage} style={{ height: outerH * scale + 24 }}>
          <div
            className={styles.phone}
            style={{ width: outerW, height: outerH, padding: BEZEL, transform: `scale(${scale})` }}
          >
            <div className={styles.screen}>
              <iframe
                ref={frameRef}
                title="Your app"
                className={styles.frame}
                // Scripts run (it's an app), but without allow-same-origin the
                // frame can't touch Teyro's page, cookies or storage.
                sandbox="allow-scripts"
                style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
              />
              {error && (
                <div className={styles.redBox} role="alert">
                  <p className={styles.redTitle}>
                    <AlertTriangle size={18} strokeWidth={2.5} aria-hidden="true" />
                    {error.syntax ? 'Syntax error' : 'Error'}
                    {error.line ? ` on line ${error.line}` : ''}
                  </p>
                  <p className={styles.redMessage}>{error.message}</p>
                  <p className={styles.redHint}>Fix the code and the app reloads by itself.</p>
                </div>
              )}
              {(loading || (rendering && !error)) && (
                <div className={styles.loading} aria-live="polite">
                  <Loader2 size={22} className="animate-spin" aria-hidden="true" />
                  {loading ? 'Getting the phone ready' : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {graded && checks && <CheckList checks={checks} results={run?.checks ?? null} title="Your app should" />}

      {graded && !readOnly && (
        <div className={padStyles.runRow}>
          <button type="button" className={padStyles.run} onClick={() => void check()} disabled={checking || loading}>
            {checking ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Check size={18} strokeWidth={3} aria-hidden="true" />}
            {checking ? 'Checking' : (runLabel ?? 'Check my app')}
          </button>
          {actions}
        </div>
      )}
    </div>
  );
}
