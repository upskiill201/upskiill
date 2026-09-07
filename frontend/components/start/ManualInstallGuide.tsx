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
import { MoreVertical, Menu, MonitorDown, SquarePlus } from 'lucide-react';
import { browserLabel, type PwaBrowser, type PwaPlatform } from '@/lib/pwa/platform';
import { StartButton, StartCard, StartGhostButton, StartHeadline } from './StartUi';

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
          icon: <Menu className="w-5 h-5" aria-hidden="true" />,
          path: ['Open the menu (☰) in the bottom bar', 'Tap "Add page to"', 'Choose "Home screen"'],
        };
      case 'firefox':
        return {
          icon: <MoreVertical className="w-5 h-5" aria-hidden="true" />,
          path: ['Open the menu (⋮) in the toolbar', 'Tap "Install"', 'Confirm to add Teyro'],
        };
      case 'edge':
        return {
          icon: <MoreVertical className="w-5 h-5" aria-hidden="true" />,
          path: ['Open the menu (⋯) at the bottom', 'Tap "Add to phone"', 'Confirm to add Teyro'],
        };
      default:
        return {
          icon: <MoreVertical className="w-5 h-5" aria-hidden="true" />,
          path: ['Open the menu (⋮) in the top right', 'Tap "Install app" or "Add to Home screen"', 'Confirm to add Teyro'],
        };
    }
  }

  // Desktop Chromium.
  return {
    icon: <MonitorDown className="w-5 h-5" aria-hidden="true" />,
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
    <div className="w-full max-w-[440px] flex flex-col items-center gap-4">
      <div className="text-center">
        <StartHeadline
          lead="Two taps in"
          accent={browserLabel(browser)}
          className="!text-[clamp(1.6rem,7.5vw,2.1rem)]"
        />
      </div>

      <StartCard>
        <ol className="flex flex-col gap-3.5" aria-label={`How to install Teyro in ${browserLabel(browser)}`}>
          {recipe.path.map((line, i) => (
            <li key={line} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full bg-[#EEF2FF] text-[#0172FD] flex items-center justify-center text-[0.8rem] font-[800]"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="text-[0.93rem] font-[600] text-[#071233] leading-snug pt-0.5">{line}</span>
            </li>
          ))}
        </ol>

        <p className="mt-4 text-[0.85rem] font-[600] text-slate-500">
          Your browser keeps this one to itself — I can point, but you get to do the honours.
        </p>
      </StartCard>

      <div className="w-full">
        <StartButton
          onClick={onDone}
          icon={<SquarePlus className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />}
          ariaLabel="I have installed Teyro"
        >
          I&apos;ve installed it
        </StartButton>
        <StartGhostButton onClick={onSkip}>Keep going in my browser</StartGhostButton>
      </div>
    </div>
  );
}
