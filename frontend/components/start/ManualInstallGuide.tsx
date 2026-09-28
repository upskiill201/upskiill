'use client';

/**
 * Fallback install guide for browsers that can install but never handed us a
 * `beforeinstallprompt` — Firefox and Samsung Internet on Android, Chromium on
 * desktop, and Chrome after the prompt has already been consumed once.
 *
 * The point is that "no native prompt" must never mean "no way forward". Each
 * branch names the actual menu path for that browser rather than a generic
 * "use your browser menu", because a learner who cannot find the item reads it
 * as the app being broken.
 */

import React from 'react';
import { MoreVertical, Menu, MonitorDown } from 'lucide-react';
import { browserLabel, type PwaBrowser, type PwaPlatform } from '@/lib/pwa/platform';
import { StartButton, StartCard, StartGhostButton, StartHeadline, TeySays, startStyles } from './StartUi';
import { HomeScreenMock } from './HomeScreenMock';

interface MenuRecipe {
  icon: React.ReactNode;
  /** Ordered menu path, e.g. ['Tap the ⋮ menu', 'Choose Install app']. */
  path: string[];
}

function recipeFor(platform: PwaPlatform, browser: PwaBrowser): MenuRecipe {
  if (platform === 'android') {
    switch (browser) {
      case 'samsung':
        return {
          icon: <Menu size={18} strokeWidth={3} aria-hidden="true" />,
          path: ['Open the menu (☰) in the bottom bar', 'Tap "Add page to"', 'Choose "Home screen"'],
        };
      case 'firefox':
        return {
          icon: <MoreVertical size={18} strokeWidth={3} aria-hidden="true" />,
          path: ['Open the menu (⋮) in the toolbar', 'Tap "Install"', 'Confirm to add Teyro'],
        };
      case 'edge':
        return {
          icon: <MoreVertical size={18} strokeWidth={3} aria-hidden="true" />,
          path: ['Open the menu (⋯) at the bottom', 'Tap "Add to phone"', 'Confirm to add Teyro'],
        };
      default:
        return {
          icon: <MoreVertical size={18} strokeWidth={3} aria-hidden="true" />,
          path: ['Open the menu (⋮) in the top right', 'Tap "Install app" or "Add to Home screen"', 'Confirm to add Teyro'],
        };
    }
  }

  // Desktop Chromium.
  return {
    icon: <MonitorDown size={18} strokeWidth={3} aria-hidden="true" />,
    path: [
      'Look for the install icon at the right of the address bar',
      'Or open the browser menu and choose "Install Teyro"',
      'Confirm to add Teyro to your apps',
    ],
  };
}

export default function ManualInstallGuide({
  platform,
  browser,
  onDone,
  onSkip,
}: {
  platform: PwaPlatform;
  browser: PwaBrowser;
  /** Learner says they installed it. Not proof — the caller re-derives. */
  onDone: () => void;
  onSkip: () => void;
}) {
  const recipe = recipeFor(platform, browser);

  return (
    <div className={startStyles.stack}>
      <div className={startStyles.grow} />
      <HomeScreenMock compact />
      <StartHeadline lead="Two taps in" accent={browserLabel(browser)} size="md" />

      <StartCard>
        <ol className={startStyles.steps} aria-label={`How to install Teyro in ${browserLabel(browser)}`}>
          {recipe.path.map((line, i) => (
            <li key={line} className={startStyles.stepRow}>
              <span className={startStyles.stepNum} aria-hidden="true">
                {i === 0 ? recipe.icon : i + 1}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </StartCard>

      <TeySays>Your browser keeps this one to itself. I can point, but you get to do the honours.</TeySays>
      <div className={startStyles.grow} />

      <div className={startStyles.actions}>
        <StartButton onClick={onDone} tone="green" ariaLabel="I have installed Teyro">
          I&apos;ve installed it
        </StartButton>
        <StartGhostButton onClick={onSkip}>Keep going in my browser</StartGhostButton>
      </div>
    </div>
  );
}
