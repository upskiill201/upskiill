'use client';

/**
 * The /download page: one install, for the device the visitor is holding.
 *
 * Detection comes from usePwaInstall (the same service /start, onboarding and
 * the reminders scene use), so this page never re-derives platform, browser
 * or "already installed". What it adds is the site-page framing: a tab per
 * device, honest steps for every browser, and a QR code that carries a
 * computer visitor over to their phone.
 *
 * Every state has a way forward that doesn't need installing: the page always
 * offers to start learning in the browser.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode';
import { FaAndroid, FaApple } from 'react-icons/fa';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Art } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { HomeScreenMock } from '@/components/start/HomeScreenMock';
import { recipeFor } from '@/components/start/ManualInstallGuide';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { browserLabel, isIpad, type PwaBrowser } from '@/lib/pwa/platform';
import { LEARNER_ENTRY } from '@/lib/launch';
import home from '@/components/homepage/v3/Home.module.css';
import d from './Download.module.css';

type Device = 'ios' | 'android' | 'desktop';

const DEVICES: { id: Device; label: string; icon: React.ReactNode }[] = [
  { id: 'ios', label: 'iPhone', icon: <FaApple size={20} /> },
  { id: 'android', label: 'Android', icon: <FaAndroid size={20} /> },
  { id: 'desktop', label: 'Computer', icon: <Art name="laptop" size={24} /> },
];

const COPY: Record<Device, { title: string; sub: string }> = {
  ios: {
    title: 'Teyro for iPhone and iPad',
    sub: 'Add Teyro to your Home Screen. It gets its own icon and opens full screen, like any other app.',
  },
  android: {
    title: 'Teyro for Android',
    sub: 'Install Teyro in one tap. It gets its own icon, opens full screen and reminds you before your streak runs out.',
  },
  desktop: {
    title: 'Teyro for your computer',
    sub: 'Install Teyro on Windows, Mac, Linux or Chromebook. It opens in its own window, straight from your dock or Start menu.',
  },
};

const PERKS = [
  { glyph: 'bolt' as const, title: 'Opens in a tap', line: 'Its own icon, full screen, no tabs.' },
  { glyph: 'wifi' as const, title: 'Works offline', line: 'Lessons you have opened keep working.' },
  { glyph: 'bell' as const, title: 'Streak reminders', line: 'A nudge before your streak runs out.' },
];

const FAQ = [
  {
    q: 'Why isn’t Teyro in the App Store or Google Play?',
    a: 'Teyro installs straight from your browser, so there is no store to go through and no big download. You get the same app: its own icon, full screen, reminders and offline lessons.',
  },
  {
    q: 'Is the app free?',
    a: 'Yes. Installing is free and so is starting to learn. Many courses are free end to end.',
  },
  {
    q: 'Do I have to install it?',
    a: 'No. Everything works in your browser too. Installing just makes Teyro one tap away and lets it remind you.',
  },
];

function deviceFromHash(): Device | null {
  if (typeof window === 'undefined') return null;
  const h = window.location.hash.replace('#', '');
  return h === 'ios' || h === 'android' || h === 'desktop' ? h : null;
}

/** QR code for this page, so a computer visitor can open it on their phone. */
function useQr(device: Device) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    const url = `${window.location.origin}/download#${device}`;
    QRCode.toDataURL(url, { margin: 1, width: 360, errorCorrectionLevel: 'M' })
      .then((data) => alive && setSrc(data))
      .catch(() => alive && setSrc(null));
    return () => {
      alive = false;
    };
  }, [device]);
  return src;
}

// ─── Steps ──────────────────────────────────────────────────────────────────

interface Step {
  icon?: React.ReactNode;
  text: React.ReactNode;
}

function iosSteps(browser: PwaBrowser, ipad: boolean): Step[] {
  if (browser === 'chrome') {
    return [
      { icon: <Glyph name="shareUp" size={18} strokeWidth={3} />, text: 'Tap Share in the address bar' },
      { icon: <Glyph name="moreCircle" size={18} strokeWidth={3} />, text: 'Scroll down and tap More' },
      { icon: <Glyph name="plusSquare" size={18} strokeWidth={3} />, text: 'Tap Add to Home Screen' },
      { text: 'Tap Add. Teyro is on your Home Screen' },
    ];
  }
  return [
    {
      icon: <Glyph name="more" size={18} strokeWidth={3} />,
      text: ipad ? 'In Safari, tap the ••• menu at the top right' : 'In Safari, tap the ••• menu next to the address bar',
    },
    { icon: <Glyph name="shareUp" size={18} strokeWidth={3} />, text: 'Tap Share' },
    { icon: <Glyph name="plusSquare" size={18} strokeWidth={3} />, text: 'Tap Add to Home Screen (under More if you don’t see it)' },
    { text: 'Tap Add. Teyro is on your Home Screen' },
  ];
}

function StepList({ steps, label }: { steps: Step[]; label: string }) {
  return (
    <ol className={d.steps} aria-label={label}>
      {steps.map((step, i) => (
        <li key={i} className={d.step}>
          <span className={d.stepNum} aria-hidden="true">
            {i + 1}
          </span>
          <span className={d.stepText}>{step.text}</span>
          {step.icon && (
            <span className={d.stepIcon} aria-hidden="true">
              {step.icon}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

// ─── Visuals ────────────────────────────────────────────────────────────────

/** A computer window with Teyro open in it. Flat, drawn from tokens. */
function DesktopMock() {
  return (
    <div className={d.desk} aria-hidden="true">
      <div className={d.deskBar}>
        <span />
        <span />
        <span />
        <strong>
          <Image src="/Icons/icon-192.png" alt="" width={16} height={16} /> Teyro
        </strong>
      </div>
      <div className={d.deskBody}>
        <div className={d.deskRail}>
          {(['house', 'trophy', 'shield', 'users'] as const).map((g, i) => (
            <span key={g} className={i === 0 ? d.deskRailOn : undefined}>
              <Glyph name={g} size={16} strokeWidth={2.75} />
            </span>
          ))}
        </div>
        <div className={d.deskMain}>
          <div className={d.deskUnit}>
            <small>Coding · Unit 3</small>
            <b>Python functions</b>
          </div>
          <div className={d.deskPath}>
            <span className={d.deskDone}>
              <Glyph name="check" size={18} strokeWidth={4} />
            </span>
            <span className={d.deskNow}>
              <Glyph name="star" size={20} strokeWidth={2.5} />
            </span>
            <span className={d.deskLocked}>
              <Glyph name="lock" size={16} strokeWidth={3} />
            </span>
          </div>
        </div>
        <div className={d.deskSide}>
          <span>
            <Image src="/Icons/burn.png" alt="" width={18} height={18} /> 128
          </span>
          <span>
            <Image src="/Icons/Coin.png" alt="" width={18} height={18} /> 2,450
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

type InstallResult = 'idle' | 'busy' | 'installed' | 'dismissed';

export default function DownloadExperience() {
  const install = usePwaInstall();
  const reduce = useReducedMotion() ?? false;
  const detected: Device = install.platform === 'ios' || install.platform === 'android' ? install.platform : 'desktop';
  const [picked, setPicked] = useState<Device | null>(null);
  const [result, setResult] = useState<InstallResult>('idle');
  const [copied, setCopied] = useState(false);
  const [ipad, setIpad] = useState(false);

  // A link from the homepage's device chips (/download#android) opens that tab.
  useEffect(() => {
    const fromHash = deviceFromHash();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the URL hash after mount
    if (fromHash) setPicked(fromHash);
    setIpad(isIpad());
  }, []);

  const device = picked ?? detected;
  const onThisDevice = install.ready && device === detected;
  const qr = useQr(device);

  const choose = useCallback((next: Device) => {
    setPicked(next);
    window.history.replaceState(null, '', `#${next}`);
  }, []);

  const runPrompt = useCallback(async () => {
    setResult('busy');
    const outcome = await install.promptInstall();
    setResult(outcome === 'accepted' ? 'installed' : outcome === 'dismissed' ? 'dismissed' : 'idle');
  }, [install]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/download`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  const copy = COPY[device];
  const installed = onThisDevice && (install.isStandalone || result === 'installed');

  /** What to do, for the chosen device, in this browser. */
  const body = useMemo(() => {
    // Looking at another device's tab: carry them over with a QR code.
    if (!onThisDevice) {
      const where = device === 'desktop' ? 'your computer' : device === 'ios' ? 'your iPhone or iPad' : 'your Android phone';
      return {
        kind: 'elsewhere' as const,
        lead:
          device === 'desktop'
            ? 'Open teyro.app/download in Chrome or Edge on your computer and press Install.'
            : detected === 'desktop'
              ? `Scan this with ${where}'s camera to open this page there, then follow the steps.`
              : `Open teyro.app/download on ${where}, then follow the steps.`,
        steps:
          device === 'ios'
            ? iosSteps('safari', false)
            : device === 'android'
              ? recipeFor('android', 'chrome').path.map((text) => ({ text }))
              : recipeFor('desktop', 'chrome').path.map((text) => ({ text })),
      };
    }

    const m = install.installMethod;
    if (install.isInAppBrowser) {
      return {
        kind: 'inapp' as const,
        lead: `${browserLabel(install.browser).replace(/^the /, 'The ')} can't install apps. Open this page in ${
          device === 'ios' ? 'Safari' : 'Chrome'
        } to get Teyro.`,
        steps: [] as Step[],
      };
    }
    if (m === 'native-prompt') return { kind: 'prompt' as const, lead: '', steps: [] as Step[] };
    if (device === 'ios') {
      if (m === 'ios-share-sheet') {
        return { kind: 'steps' as const, lead: 'Four taps in Safari:', steps: iosSteps(install.browser, ipad) };
      }
      return {
        kind: 'switch' as const,
        lead: `${browserLabel(install.browser)} on iPhone can't add apps to the Home Screen. Open teyro.app/download in Safari or Chrome.`,
        steps: [] as Step[],
      };
    }
    if (device === 'desktop' && install.browser === 'safari') {
      return {
        kind: 'steps' as const,
        lead: 'In Safari on a Mac (macOS Sonoma or later):',
        steps: [
          { icon: <Glyph name="shareUp" size={18} strokeWidth={3} />, text: 'Click Share in the toolbar, or open the File menu' },
          { icon: <Glyph name="plusSquare" size={18} strokeWidth={3} />, text: 'Choose Add to Dock' },
          { text: 'Click Add. Teyro is in your Dock' },
        ],
      };
    }
    if (m === 'browser-menu') {
      const recipe = recipeFor(install.platform, install.browser);
      return {
        kind: 'steps' as const,
        lead: `In ${browserLabel(install.browser)}:`,
        steps: recipe.path.map((text, i) => ({ text, icon: i === 0 ? recipe.icon : undefined })),
      };
    }
    return {
      kind: 'switch' as const,
      lead:
        device === 'desktop'
          ? `${browserLabel(install.browser)} can't install apps. Open teyro.app/download in Chrome or Edge, or keep learning right here.`
          : `Open teyro.app/download in Chrome to install Teyro.`,
      steps: [] as Step[],
    };
  }, [device, detected, onThisDevice, install, ipad]);

  return (
    <div className={d.page}>
      <section className={d.hero} aria-labelledby="download-title">
        <div className={d.wrap}>
          <div className={d.head}>
            <span className={home.eyebrow} style={{ marginBottom: 0 }}>
              Get the app
            </span>
            <h1 id="download-title" className={`${home.display} ${home.h1}`}>
              Teyro, <em>one tap away.</em>
            </h1>
            <p className={home.lead}>
              Free on iPhone, Android and computer. It installs from your browser in a few seconds, with no app store
              to go through.
            </p>
          </div>

          <div className={d.tabs} role="tablist" aria-label="Choose your device">
            {DEVICES.map((dev) => {
              // Nothing is picked until detection runs, so no tab flashes on then off.
              const on = (install.ready || picked !== null) && dev.id === device;
              return (
                <button
                  key={dev.id}
                  id={dev.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="download-panel"
                  className={`${d.tab} ${on ? d.tabOn : ''}`}
                  onClick={() => choose(dev.id)}
                >
                  {dev.icon}
                  <span>
                    {dev.label}
                    {dev.id === 'ios' && <span className={d.tabLong}> &amp; iPad</span>}
                  </span>
                  {install.ready && dev.id === detected && <span className={d.tabHere}>This device</span>}
                </button>
              );
            })}
          </div>

          <div id="download-panel" role="tabpanel" className={d.panel} aria-live="polite">
            {!install.ready ? (
              <PanelSkeleton />
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${device}-${installed ? 'in' : 'out'}`}
                  className={d.panelGrid}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className={d.panelCopy}>
                    <span className={d.platformMark}>{DEVICES.find((x) => x.id === device)?.icon}</span>
                    <h2 className={`${home.display} ${d.panelTitle}`}>{installed ? 'Teyro is installed' : copy.title}</h2>
                    <p className={d.panelSub}>
                      {installed
                        ? device === 'desktop'
                          ? 'Find Teyro in your apps, Dock or Start menu.'
                          : 'Find Teyro on your Home Screen.'
                        : copy.sub}
                    </p>

                    {!installed && body.kind === 'prompt' && (
                      <div className={d.actions}>
                        <button
                          type="button"
                          className={home.btn}
                          onClick={runPrompt}
                          disabled={result === 'busy'}
                          aria-busy={result === 'busy'}
                        >
                          <Glyph name="download" size={20} strokeWidth={3} />
                          {device === 'desktop' ? 'Install Teyro' : 'Get Teyro'}
                        </button>
                        {result === 'dismissed' && (
                          <p className={d.note}>No problem. You can install it any time from this page.</p>
                        )}
                      </div>
                    )}

                    {!installed && body.kind !== 'prompt' && (
                      <>
                        {body.lead && <p className={d.lead}>{body.lead}</p>}
                        {body.steps.length > 0 && <StepList steps={body.steps} label={`How to install ${copy.title}`} />}
                        {(body.kind === 'inapp' || body.kind === 'switch') && (
                          <div className={d.actions}>
                            <button type="button" className={home.btnGhost} onClick={copyLink}>
                              <Glyph name={copied ? 'check' : 'copy'} size={18} strokeWidth={3} />
                              {copied ? 'Link copied' : 'Copy link'}
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {installed ? (
                      <div className={d.actions}>
                        <Link href="/launch" className={home.btn}>
                          Open Teyro
                        </Link>
                      </div>
                    ) : (
                      <Link href={LEARNER_ENTRY.href} className={d.browserLink}>
                        {LEARNER_ENTRY.gated ? 'Get notified when we open' : 'Or start learning in your browser'}
                        <Glyph name="arrow" size={16} strokeWidth={3} />
                      </Link>
                    )}
                  </div>

                  <div className={d.panelVisual}>
                    {body.kind === 'elsewhere' && device !== 'desktop' && detected === 'desktop' ? (
                      <div className={d.qr}>
                        {qr ? (
                          // eslint-disable-next-line @next/next/no-img-element -- a generated data: URL
                          <img src={qr} alt={`QR code that opens teyro.app/download on ${copy.title.replace('Teyro for ', '')}`} width={200} height={200} />
                        ) : (
                          <span className={d.qrSkeleton} aria-hidden="true" />
                        )}
                        <span>Scan with your phone&apos;s camera</span>
                      </div>
                    ) : device === 'desktop' ? (
                      <DesktopMock />
                    ) : (
                      <HomeScreenMock landed={installed} />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      <section className={d.band} aria-labelledby="perks-title">
        <div className={d.wrap}>
          <h2 id="perks-title" className={`${home.display} ${home.h3} ${d.center}`}>
            Why install it
          </h2>
          <ul className={d.perks}>
            {PERKS.map((p) => (
              <li key={p.title} className={d.perk}>
                <span className={d.perkIcon}>
                  <Glyph name={p.glyph} size={22} strokeWidth={2.75} />
                </span>
                <span>
                  <strong>{p.title}</strong>
                  <span>{p.line}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className={d.faq}>
            {FAQ.map((f) => (
              <details key={f.q} className={d.faqItem}>
                <summary>
                  {f.q}
                  <Glyph name="chevronDown" size={18} strokeWidth={3} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className={d.panelGrid} aria-busy="true" aria-label="Checking your device">
      <div className={d.panelCopy}>
        <span className={`${d.skel} ${d.skelMark}`} />
        <span className={`${d.skel} ${d.skelTitle}`} />
        <span className={`${d.skel} ${d.skelLine}`} />
        <span className={`${d.skel} ${d.skelLine}`} style={{ width: '70%' }} />
        <span className={`${d.skel} ${d.skelBtn}`} />
      </div>
      <div className={d.panelVisual}>
        <span className={`${d.skel} ${d.skelVisual}`} />
      </div>
    </div>
  );
}
