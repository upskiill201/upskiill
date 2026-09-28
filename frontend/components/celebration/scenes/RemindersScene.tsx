'use client';

/**
 * RemindersScene — Tey asks to remind you, right after a finished lesson.
 *
 *   enable    Tey with his bell, a preview of the actual notification, and
 *             TURN ON REMINDERS (the browser's permission prompt fires inside
 *             that tap) / NOT NOW. Then: on (a cheer), blocked (kind, points
 *             at Settings), or a failed subscribe (one retry).
 *   install   In a browser tab that can install Teyro, install comes first —
 *             reminders belong to the installed app (on iPhone they only
 *             exist there). Android/desktop Chrome: one-tap install, then
 *             straight on to the reminders ask. iPhone and browser-menu
 *             installs get the same step-by-step guides as /start.
 *
 * When to show it (and how often) is lib/push/askPolicy.ts, applied by
 * ReminderAskWatcher. NOT NOW always leaves quietly — declining is an answer,
 * never a mistake.
 */

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import SceneShell from '../SceneShell';
import sceneStyles from '../Scene.module.css';
import styles from './RemindersScene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { NotificationPreview } from '@/components/push/NotificationPreview';
import { HomeScreenMock } from '@/components/start/HomeScreenMock';
import { useTeyPush } from '@/hooks/useTeyPush';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { trackInstallEvent } from '@/lib/pwa/analytics';
import { detectBrowser, detectPlatform } from '@/lib/pwa/platform';

const IosInstallGuide = dynamic(() => import('@/components/start/IosInstallGuide'), { ssr: false });
const ManualInstallGuide = dynamic(() => import('@/components/start/ManualInstallGuide'), { ssr: false });

type Input = Extract<CelebrationScene, { kind: 'REMINDERS' }>;

type Step =
  | 'ask' // the reminders ask
  | 'install' // install first
  | 'guide' // iPhone / browser-menu walkthrough
  | 'open-app' // iPhone: installed by hand — reminders get asked in the app
  | 'on'
  | 'blocked'
  | 'failed';

function previewLine(days: number) {
  return days > 1
    ? { title: `Keep your ${days}-day streak alive!`, body: 'One quick lesson is all it takes. I saved your spot.' }
    : { title: 'Time for your daily lesson!', body: 'Three minutes today keeps your streak going. I saved your spot.' };
}

export default function RemindersScene({ scene, onAdvance }: { scene: Input; onAdvance: () => void }) {
  const push = useTeyPush();
  const install = usePwaInstall();
  const [step, setStep] = useState<Step>(scene.variant === 'install' ? 'install' : 'ask');
  const [retried, setRetried] = useState(false);
  const [installing, setInstalling] = useState(false);
  const firedRef = useRef(false);
  const ctx = () => ({ platform: detectPlatform(), browser: detectBrowser(), where: 'in-app' as const });

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    playSound('noticeInfo');
    celebrationHaptic('soft');
    if (scene.variant === 'enable') trackInstallEvent('notification_screen_viewed', ctx());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notNow = () => {
    playSound('cardBack');
    playHaptic('light', false);
    trackInstallEvent('notification_permission_denied', { ...ctx(), reason: 'not-now' });
    onAdvance();
  };

  // The permission prompt must fire inside this tap — nothing is awaited first.
  const turnOn = async () => {
    playHaptic('medium', false);
    trackInstallEvent('notification_enable_clicked', ctx());
    const result = await push.enable();
    if (result === 'granted') {
      trackInstallEvent('notification_permission_granted', ctx());
      trackInstallEvent('push_subscription_success', ctx());
      playSound('correct');
      celebrationHaptic('win');
      setStep('on');
    } else if (result === 'denied') {
      trackInstallEvent('notification_permission_denied', ctx());
      playSound('cardBack');
      setStep('blocked');
    } else if (result === 'needs-install') {
      setStep('install');
    } else {
      trackInstallEvent('push_subscription_failed', { ...ctx(), reason: result });
      setStep('failed');
    }
  };

  const startInstall = async () => {
    playHaptic('medium', false);
    if (install.installMethod === 'native-prompt') {
      setInstalling(true);
      const outcome = await install.promptInstall();
      setInstalling(false);
      if (outcome === 'accepted') {
        playSound('courseUnlocked');
        celebrationHaptic('win');
        // Same origin, so a permission granted here reaches the installed app.
        setStep('ask');
        return;
      }
      if (outcome === 'dismissed') {
        notNow();
        return;
      }
      // No held prompt after all: the browser menu still works.
    }
    playSound('cardNext');
    setStep('guide');
  };

  const line = previewLine(scene.streakDays);

  if (step === 'guide') {
    return (
      <SceneShell cta={null}>
        <div className={styles.guide}>
          {install.installMethod === 'ios-share-sheet' ? (
            <IosInstallGuide
              browser={install.browser === 'chrome' ? 'chrome' : 'safari'}
              onCompleted={() => setStep('open-app')}
              onSkip={notNow}
            />
          ) : (
            <ManualInstallGuide
              platform={install.platform}
              browser={install.browser}
              onDone={() => setStep(push.needsInstall ? 'open-app' : 'ask')}
              onSkip={notNow}
            />
          )}
        </div>
      </SceneShell>
    );
  }

  if (step === 'install') {
    const native = install.installMethod === 'native-prompt';
    return (
      <SceneShell
        cta={{ text: installing ? 'INSTALLING…' : native ? 'INSTALL TEYRO' : 'SHOW ME HOW', onClick: () => void startInstall(), variant: 'blue', disabled: installing }}
        secondaryCta={{ text: 'NOT NOW', onClick: notNow }}
      >
        <h1 className={sceneStyles.headline}>
          Let me <span className={sceneStyles.headlineBlue}>remind you</span>
        </h1>
        <p className={sceneStyles.subhead}>
          Put Teyro on your Home Screen and I can nudge you before your streak runs out.
        </p>
        <div className={styles.phone}>
          <HomeScreenMock compact />
        </div>
      </SceneShell>
    );
  }

  if (step === 'open-app') {
    return (
      <SceneShell cta={{ text: 'GOT IT', onClick: onAdvance, variant: 'green' }}>
        <h1 className={sceneStyles.headline}>
          Now open <span className={sceneStyles.headlineBlue}>Teyro</span>
        </h1>
        <p className={sceneStyles.subhead}>
          Tap the new icon on your Home Screen. I&apos;ll ask about reminders there, after your next lesson.
        </p>
        <div className={styles.phone}>
          <HomeScreenMock compact landed />
        </div>
      </SceneShell>
    );
  }

  if (step === 'on') {
    return (
      <SceneShell cta={{ text: 'CONTINUE', onClick: onAdvance, variant: 'green' }}>
        <h1 className={sceneStyles.headline}>
          Reminders <span className={sceneStyles.headlineBlue}>on!</span>
        </h1>
        <p className={sceneStyles.subhead}>I&apos;ll nudge you on days you haven&apos;t practised yet. Never spam.</p>
        <div className={sceneStyles.mascotWrap}>
          <Image src="/User onbarding Assets/tey/cheering.webp" alt="" fill className={sceneStyles.mascotImg} priority />
        </div>
      </SceneShell>
    );
  }

  if (step === 'blocked') {
    return (
      <SceneShell cta={{ text: 'CONTINUE', onClick: onAdvance, variant: 'blue' }}>
        <h1 className={sceneStyles.headline}>No problem</h1>
        <p className={sceneStyles.subhead}>
          If you change your mind, allow notifications for Teyro in your phone&apos;s settings, then turn reminders on
          in Teyro&apos;s Settings.
        </p>
        <div className={sceneStyles.mascotWrap}>
          <Image src="/User onbarding Assets/tey/welcome.webp" alt="" fill className={sceneStyles.mascotImg} priority />
        </div>
      </SceneShell>
    );
  }

  if (step === 'failed') {
    return (
      <SceneShell
        cta={
          retried
            ? { text: 'CONTINUE', onClick: onAdvance, variant: 'blue' }
            : {
                text: 'TRY AGAIN',
                onClick: () => {
                  setRetried(true);
                  void turnOn();
                },
                variant: 'blue',
                disabled: push.busy,
              }
        }
        secondaryCta={retried ? undefined : { text: 'SKIP', onClick: onAdvance }}
      >
        <h1 className={sceneStyles.headline}>Almost there</h1>
        <p className={sceneStyles.subhead}>
          You said yes, but I couldn&apos;t finish setting reminders up. {retried ? 'I’ll keep trying quietly.' : 'One more go?'}
        </p>
        <div className={sceneStyles.mascotWrap}>
          <Image src="/User onbarding Assets/tey/thinking.webp" alt="" fill className={sceneStyles.mascotImg} priority />
        </div>
      </SceneShell>
    );
  }

  // 'ask'
  return (
    <SceneShell
      cta={{ text: push.busy ? 'TURNING ON…' : 'TURN ON REMINDERS', onClick: () => void turnOn(), variant: 'blue', disabled: push.busy }}
      secondaryCta={{ text: 'NOT NOW', onClick: notNow }}
    >
      <h1 className={sceneStyles.headline}>
        Can I <span className={sceneStyles.headlineBlue}>remind you?</span>
      </h1>
      <p className={sceneStyles.subhead}>A nudge on days you haven&apos;t practised, before your streak runs out.</p>
      <div className={styles.preview}>
        <NotificationPreview title={line.title} body={line.body} delay={0.45} />
      </div>
      <div className={`${sceneStyles.mascotWrap} ${styles.bellTey}`}>
        <Image src="/User onbarding Assets/tey/bell.webp" alt="" fill className={sceneStyles.mascotImg} priority />
      </div>
    </SceneShell>
  );
}
