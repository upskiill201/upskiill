'use client';

/**
 * The last onboarding screens: put Teyro on the Home Screen, then turn on
 * reminders, then into the app. Duolingo's order: install, then the ask.
 *
 * Same rules as the v2 screen (components/onboarding/screens/RemindersScreen,
 * whose header explains them in full), with Teyro's own art:
 *  - Install first in any tab that can install; reminders belong to the
 *    installed app (and on iPhone only exist there).
 *  - The permission is requested only inside the tap on "Turn on reminders".
 *  - Permission granted and subscription registered are separate states.
 *  - A "no" is a valid answer: neutral copy and sound, never a re-prompt.
 *  - This is ask #1 of the reminder budget (lib/push/askPolicy.ts).
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { useTeyPush } from '@/hooks/useTeyPush';
import { emitAudioEvent } from '@/lib/audio/audioEvents';
import { playLevelUpFanfare, playSparkle } from '@/lib/audio/celebrationAudio';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { fireConfetti } from '@/lib/confetti';
import { playHaptic } from '@/lib/haptics';
import { recordAsk } from '@/lib/push/askPolicy';
import { trackInstallEvent } from '@/lib/pwa/analytics';
import { detectBrowser, detectPlatform } from '@/lib/pwa/platform';
import { Art, type ArtName } from './art/Art';
import { Btn, Hero, kitCss as css } from './ui/Kit';

const IosInstallGuide = dynamic(() => import('@/components/start/IosInstallGuide'), { ssr: false });
const ManualInstallGuide = dynamic(() => import('@/components/start/ManualInstallGuide'), { ssr: false });

type Phase = 'resolving' | 'needs-install' | 'install-guide' | 'open-app' | 'ask' | 'result' | 'celebrate';
type Outcome = 'granted' | 'denied' | 'unsupported' | 'subscription-failed';

const TEY = (pose: string) => `/User onbarding Assets/tey/${pose}.webp`;

/** A phone with Teyro dropping onto its Home Screen. */
function HomeScreenPhone() {
  const reduce = useReducedMotion();
  // Nine app slots; Teyro lands in the middle row.
  const tiles = [true, true, true, true, true, false, true, true, true];
  return (
    <div
      className="relative w-[170px] h-[300px] rounded-[34px] p-[10px]"
      style={{ background: 'var(--color-ink)', boxShadow: '0 18px 40px color-mix(in srgb, var(--ink-fixed) 22%, transparent)' }}
      aria-hidden="true"
    >
      <div className="relative w-full h-full overflow-hidden rounded-[26px]" style={{ background: 'linear-gradient(180deg, var(--color-band), var(--bg-page))' }}>
        <div className="mx-auto mt-2 h-[6px] w-[50px] rounded-full" style={{ background: 'var(--color-ink)' }} />
        <div className="grid grid-cols-3 gap-[14px] px-[16px] pt-[22px]">
          {tiles.map((t, i) =>
            t ? (
              <span key={i} className="aspect-square rounded-[12px]" style={{ background: `color-mix(in srgb, var(--color-ink-soft) 14%, white)` }} />
            ) : (
              <motion.span
                key={i}
                className="relative aspect-square"
                initial={reduce ? false : { y: -140, scale: 1.4, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 13 }}
              >
                <Image src="/Icons/icon-192.png" alt="" fill sizes="44px" className="rounded-[12px]" />
              </motion.span>
            ),
          )}
        </div>
        <div
          className="absolute inset-x-[10px] bottom-[10px] grid grid-cols-4 gap-[10px] rounded-[18px] p-[9px]"
          style={{ background: 'color-mix(in srgb, var(--color-ink-soft) 10%, white)' }}
        >
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="aspect-square rounded-[10px]" style={{ background: 'color-mix(in srgb, var(--color-ink-soft) 18%, white)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Perks({ items }: { items: { art: ArtName; text: string }[] }) {
  return (
    <ul className="w-full max-w-[380px] flex flex-col gap-3 text-left">
      {items.map((p) => (
        <li key={p.text} className="flex items-center gap-3 text-[15.5px] font-bold text-[var(--color-ink)]">
          <Art name={p.art} size={36} />
          {p.text}
        </li>
      ))}
    </ul>
  );
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-[420px] flex flex-col gap-2 mt-2">{children}</div>;
}

export function InstallStep(props: {
  name?: string;
  minutes: number;
  courseTitle?: string;
  onNotificationsAnswer: (value: { enabled: boolean; permission?: NotificationPermission | 'unsupported' }) => void;
  onDone: () => void;
}) {
  const reduce = useReducedMotion();
  const { ready, supported, permission, subscribed, needsInstall, busy, enable } = useTeyPush();
  const install = usePwaInstall();
  const [installing, setInstalling] = useState(false);
  const [phase, setPhase] = useState<Phase>('resolving');
  const [outcome, setOutcome] = useState<Outcome>('granted');
  const [retried, setRetried] = useState(false);
  const resolvedRef = useRef(false);
  const askRecordedRef = useRef<string | null>(null);
  const viewTrackedRef = useRef(false);

  const context = useCallback(() => ({ platform: detectPlatform(), browser: detectBrowser(), step: 15 }), []);
  const celebrate = useCallback(() => {
    playLevelUpFanfare();
    if (!reduce) fireConfetti({ particleCount: 120, spread: 90, origin: { y: 0.4 } });
    setPhase('celebrate');
  }, [reduce]);

  // Which screen this learner needs, from the browser's live state, once.
  /* eslint-disable react-hooks/set-state-in-effect -- the phase is read from browser APIs after mount, then moves on taps. */
  useEffect(() => {
    if (!ready || !install.ready || resolvedRef.current) return;
    resolvedRef.current = true;
    if (!install.isStandalone && install.isInstallable && !(permission === 'granted' && subscribed)) return setPhase('needs-install');
    if (needsInstall || !supported || permission === 'unsupported') {
      setOutcome('unsupported');
      return setPhase('celebrate');
    }
    if (permission === 'granted' || permission === 'denied') {
      setOutcome(permission);
      return setPhase('result');
    }
    setPhase('ask');
  }, [ready, install.ready, install.isStandalone, install.isInstallable, needsInstall, supported, permission, subscribed]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const kind = phase === 'needs-install' ? 'install' : phase === 'ask' ? 'enable' : null;
    if (!kind || askRecordedRef.current === kind) return;
    askRecordedRef.current = kind;
    recordAsk(kind, 'onboarding');
  }, [phase]);

  useEffect(() => {
    if (phase !== 'ask' || viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    trackInstallEvent('notification_screen_viewed', context());
  }, [phase, context]);

  const startInstall = async () => {
    playHaptic('medium');
    if (install.installMethod === 'native-prompt') {
      setInstalling(true);
      const result = await install.promptInstall();
      setInstalling(false);
      if (result === 'accepted') {
        playSparkle();
        setPhase('ask');
        return;
      }
      if (result === 'dismissed') return;
    }
    setPhase('install-guide');
  };

  // The request: only ever from inside this tap.
  const turnOn = async () => {
    playHaptic('medium');
    trackInstallEvent('notification_enable_clicked', context());
    let result: Awaited<ReturnType<typeof enable>>;
    try {
      result = await enable();
    } catch {
      result = 'error';
    }
    const grantedPermission = typeof Notification !== 'undefined' && Notification.permission === 'granted';
    if (result === 'granted') {
      trackInstallEvent('notification_permission_granted', context());
      trackInstallEvent('push_subscription_success', context());
      emitAudioEvent('ACTION_SUCCESS');
      playOnboardingCue('notificationOptIn');
      playSparkle();
      props.onNotificationsAnswer({ enabled: true, permission: 'granted' });
      setOutcome('granted');
      return setPhase('result');
    }
    if (grantedPermission) {
      trackInstallEvent('notification_permission_granted', context());
      trackInstallEvent('push_subscription_failed', { ...context(), reason: result });
      props.onNotificationsAnswer({ enabled: true, permission: 'granted' });
      setOutcome('subscription-failed');
      return setPhase('result');
    }
    if (result === 'unsupported') {
      props.onNotificationsAnswer({ enabled: false, permission: 'unsupported' });
      setOutcome('unsupported');
      return celebrate();
    }
    if (result === 'needs-install') return setPhase('needs-install');
    trackInstallEvent('notification_permission_denied', context());
    // The neutral tone, not the error sound: no is a valid answer.
    emitAudioEvent('BUTTON_SECONDARY_CLICK');
    props.onNotificationsAnswer({ enabled: false, permission: 'denied' });
    setOutcome('denied');
    setPhase('result');
  };

  const retry = async () => {
    playHaptic('light');
    setRetried(true);
    try {
      const result = await enable();
      if (result === 'granted') {
        trackInstallEvent('push_subscription_success', { ...context(), retry: true });
        emitAudioEvent('ACTION_SUCCESS');
        setOutcome('granted');
        return;
      }
      trackInstallEvent('push_subscription_failed', { ...context(), retry: true, reason: result });
    } catch {
      trackInstallEvent('push_subscription_failed', { ...context(), retry: true, reason: 'threw' });
    }
  };

  const skip = () => {
    props.onNotificationsAnswer({ enabled: false });
    playHaptic('light');
    trackInstallEvent('notification_permission_denied', { ...context(), reason: 'skipped' });
    celebrate();
  };

  const at = props.minutes ? `${props.minutes} minutes` : 'a few minutes';
  const motionProps = {
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: -12 },
    transition: { duration: 0.22 },
  } as const;

  return (
    <AnimatePresence mode="wait">
      {phase === 'resolving' && (
        <motion.div key="resolving" {...motionProps} className="flex flex-col gap-4" aria-busy="true" aria-label="Loading">
          <div className="h-[300px] rounded-[24px] bg-[var(--bg-section)] animate-pulse" />
          <div className="h-[56px] rounded-[16px] bg-[var(--bg-section)] animate-pulse" />
        </motion.div>
      )}

      {phase === 'needs-install' && (
        <motion.div key="install" {...motionProps}>
          <Hero
            art={<HomeScreenPhone />}
            title="Put Teyro on your Home Screen"
            body={
              install.platform === 'ios'
                ? "On iPhone, reminders only work once I'm on your Home Screen. That's Apple's rule, not mine."
                : 'Open your lesson in one tap, and let me nudge you before your streak runs out.'
            }
          >
            <Actions>
              <Btn onClick={() => void startInstall()} disabled={installing} aria-label="Install Teyro on this device">
                <span className="inline-flex items-center justify-center gap-2">
                  <Art name="phone" size={26} />
                  {installing ? 'Installing…' : install.installMethod === 'native-prompt' ? 'Install Teyro' : 'Show me how'}
                </span>
              </Btn>
              <Btn variant="ghost" onClick={skip}>
                Not now
              </Btn>
            </Actions>
          </Hero>
        </motion.div>
      )}

      {phase === 'install-guide' && (
        <motion.div key="guide" {...motionProps} className="w-full max-w-[440px] mx-auto">
          {install.installMethod === 'ios-share-sheet' ? (
            <IosInstallGuide browser={install.browser === 'chrome' ? 'chrome' : 'safari'} onCompleted={() => setPhase('open-app')} onSkip={skip} />
          ) : (
            <ManualInstallGuide
              platform={install.platform}
              browser={install.browser}
              onDone={() => setPhase(needsInstall ? 'open-app' : 'ask')}
              onSkip={skip}
            />
          )}
        </motion.div>
      )}

      {phase === 'open-app' && (
        <motion.div key="open" {...motionProps}>
          <Hero
            art={<HomeScreenPhone />}
            title="Now open me from your Home Screen"
            body="That's the real Teyro. I'll ask about reminders there, after your next lesson."
          >
            <Actions>
              <Btn onClick={celebrate}>Got it</Btn>
            </Actions>
          </Hero>
        </motion.div>
      )}

      {phase === 'ask' && (
        <motion.div key="ask" {...motionProps}>
          <Hero
            art={
              <div className="flex flex-col items-center gap-3">
                <div className={css.note} style={{ width: 'min(340px, 86vw)' }}>
                  <span className={css.noteIcon}>
                    <Image src="/Icons/icon-192.png" alt="" width={40} height={40} />
                  </span>
                  <span className="flex-1 min-w-0 text-left">
                    <span className={css.noteHead}>
                      <span>Teyro</span>
                      <span>now</span>
                    </span>
                    <span className={`${css.noteTitle} block`}>{props.name ? `${props.name}, ${at}?` : `${at} today?`}</span>
                    <span className={`${css.noteBody} block`}>
                      {props.courseTitle ? `${props.courseTitle} is waiting. Your streak too.` : 'Your lesson is waiting. Your streak too.'}
                    </span>
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TEY('bell')} alt="" width={130} height={130} className={css.teyFloat} />
              </div>
            }
            title="Let me remind you"
            body="Just enough to keep you going. Never spam."
          >
            <Perks
              items={[
                { art: 'pace10', text: 'A nudge before your streak breaks' },
                { art: 'gift', text: 'When a reward is waiting for you' },
                { art: 'calendar', text: `At your time, ${at} a day` },
              ]}
            />
            <Actions>
              <Btn onClick={() => void turnOn()} disabled={busy} aria-label="Turn on reminder notifications">
                <span className="inline-flex items-center justify-center gap-2">
                  <Art name="bell" size={26} />
                  Turn on reminders
                </span>
              </Btn>
              <Btn variant="ghost" onClick={skip}>
                Not now
              </Btn>
            </Actions>
          </Hero>
        </motion.div>
      )}

      {phase === 'result' && (
        <motion.div key="result" {...motionProps}>
          <Hero
            art={<Art name={outcome === 'denied' ? 'moon' : 'bell'} size={120} />}
            title={outcome === 'granted' ? 'Reminders are on!' : outcome === 'denied' ? 'Noted. No hard feelings.' : 'Almost there'}
            body={
              outcome === 'granted'
                ? "I'd hate to watch that streak disappear."
                : outcome === 'denied'
                  ? 'You can turn reminders on any time in Settings. I’ll be here either way.'
                  : 'You said yes, but I couldn’t finish setting reminders up just now. I’ll keep trying quietly.'
            }
          >
            <Actions>
              {outcome === 'subscription-failed' && !retried ? (
                <>
                  <Btn onClick={() => void retry()} disabled={busy}>
                    Try again
                  </Btn>
                  <Btn variant="ghost" onClick={celebrate}>
                    Skip it
                  </Btn>
                </>
              ) : (
                <Btn onClick={celebrate}>Continue</Btn>
              )}
            </Actions>
          </Hero>
        </motion.div>
      )}

      {phase === 'celebrate' && (
        <motion.div key="celebrate" {...motionProps}>
          <Hero
            art={
              <motion.div
                initial={reduce ? false : { scale: 0.6, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 12 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TEY('cheering')} alt="" width={170} height={170} className={css.teyFloat} />
              </motion.div>
            }
            title="You're all set!"
            body={props.courseTitle ? `Your plan is ready. ${props.courseTitle} is waiting.` : "Your plan is ready. Let's go learn something."}
          >
            <Actions>
              <Btn
                variant="green"
                onClick={() => {
                  playHaptic('medium');
                  props.onDone();
                }}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Art name="rocket" size={30} />
                  Enter Teyro
                </span>
              </Btn>
            </Actions>
          </Hero>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
