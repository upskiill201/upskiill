'use client';

/**
 * The HTML & CSS pad: the code editor above a live page that changes as you
 * type (debounced a little), with a phone / desktop switch. Used by Try it
 * live, Build it (Write and run for pages) and the playground's HTML mode.
 *
 * The live page is sandboxed with scripts, forms and popups off, and relative
 * file names resolve to the course's own sounds and pictures
 * (lib/code/htmlRunner.ts). "Check my page" grades a separate hidden render.
 *
 * Links: the frame adds allow-same-origin (still no scripts, so it stays
 * inert) only so this component can catch link clicks. A #jump link scrolls
 * inside the page; any other link stays put and says where it would go, so
 * the preview never navigates away from the learner's page.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Glyph } from '@/components/art/Glyph';
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

/** Catch link clicks in the rendered page: scroll #jumps in place, report everything else. */
function catchLinks(frame: HTMLIFrameElement, onLink: (href: string) => void) {
  const doc = frame.contentDocument;
  if (!doc) return;
  doc.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a[href], area[href]');
    if (!a) return;
    e.preventDefault();
    const href = a.getAttribute('href') ?? '';
    if (href.startsWith('#')) {
      const id = decodeURIComponent(href.slice(1));
      const target = id ? doc.getElementById(id) : null;
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (target) target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
      else doc.defaultView?.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
      return;
    }
    onLink(href);
  });
}

function LivePage({ code, device, onLink }: { code: string; device: Device; onLink: (href: string) => void }) {
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
        // No scripts, forms or popups. allow-same-origin only lets catchLinks
        // read clicks; without allow-scripts the page itself can't do anything.
        sandbox="allow-same-origin"
        srcDoc={withAssetBase(code)}
        onLoad={(e) => catchLinks(e.currentTarget, onLink)}
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
  const [link, setLink] = useState<string | null>(null);
  const reported = useRef(false);
  const graded = Boolean(checks?.length);

  // The page follows the code, a moment after typing stops.
  useEffect(() => {
    const t = window.setTimeout(() => {
      setShown(value);
      setLink(null);
    }, DEBOUNCE_MS);
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
                ['phone', 'Phone', 'phone'],
                ['desktop', 'Desktop', 'panel'],
              ] as const
            ).map(([id, text, glyph]) => (
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
                <Glyph name={glyph} size={14} strokeWidth={2.5} /> {text}
              </button>
            ))}
          </div>
        </div>
        <LivePage
          code={shown}
          device={device}
          onLink={(href) => {
            playSound('navTap');
            setLink(href);
          }}
        />
        {link !== null && (
          <p className={styles.linkNote} role="status">
            <Glyph name="link" size={14} strokeWidth={2.5} />
            <span>
              {link ? (
                <>
                  This link goes to <code className={styles.linkHref}>{link}</code>. Links stay put in the preview and work on your live site.
                </>
              ) : (
                'This link has an empty href, so it goes nowhere yet.'
              )}
            </span>
          </p>
        )}
      </div>

      {graded && checks && <CheckList checks={checks} results={run?.checks ?? null} title="Your page should" />}

      {graded && !readOnly && (
        <div className={padStyles.runRow}>
          <button type="button" className={padStyles.run} onClick={() => void check()} disabled={checking}>
            {checking ? <Glyph name="spinner" size={18} className="animate-spin" /> : <Glyph name="check" size={18} strokeWidth={3} />}
            {checking ? 'Checking' : (runLabel ?? 'Check my page')}
          </button>
          {actions}
        </div>
      )}
    </div>
  );
}
