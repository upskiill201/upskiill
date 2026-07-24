/**
 * Teyro Centralized Sound Registry
 *
 * Maps abstract, logical Sound IDs to audio asset files and configurations.
 * No component should reference raw filenames directly.
 */

export type SoundId =
  | 'BUTTON_PRIMARY'
  | 'BUTTON_SECONDARY'
  | 'SELECTION'
  | 'SUCCESS_CONFIRM'
  | 'ERROR_SOFT'
  | 'CORRECT'
  | 'TAB_SWITCH'
  | 'MENU_OPEN_CLOSE'
  | 'TOGGLE'
  | 'BACKGROUND_MUSIC';

export type SoundCategory =
  | 'ui'
  | 'learning'
  | 'rewards'
  | 'music'
  | 'mascot'
  | 'ai'
  | 'notifications'
  | 'social';

export type SoundPriority = 'low' | 'medium' | 'high' | 'critical';

export interface SoundConfig {
  id: SoundId;
  name: string;
  category: SoundCategory;
  src: string;
  enabled: boolean;
  /** Volume from 0.0 to 1.0 */
  volume: number;
  /** Delay in milliseconds before playback */
  delayMs: number;
  /** Playback speed (1.0 = normal) */
  speed: number;
  /** Whether the audio should loop seamlessly */
  loop: boolean;
  /** Fade in duration in seconds */
  fadeInSec: number;
  /** Fade out duration in seconds */
  fadeOutSec: number;
  priority: SoundPriority;
  /** Cooldown in milliseconds to prevent tap stacking */
  cooldownMs: number;
  description: string;
  /** Whether to preload this sound on boot */
  preload: boolean;
}

export const DEFAULT_SOUND_REGISTRY: Record<SoundId, SoundConfig> = {
  BUTTON_PRIMARY: {
    id: 'BUTTON_PRIMARY',
    name: 'Primary Button Tap',
    category: 'ui',
    src: '/assets/sounds/ui/UI_BUTTON_PRIMARY.mp3',
    enabled: true,
    volume: 0.8,
    delayMs: 0,
    speed: 1.0,
    loop: false,
    fadeInSec: 0,
    fadeOutSec: 0,
    priority: 'medium',
    cooldownMs: 50,
    description: 'Continue, Start Lesson, Enroll, Save, Submit, Retry, Next, Primary CTAs',
    preload: true,
  },
  BUTTON_SECONDARY: {
    id: 'BUTTON_SECONDARY',
    name: 'Secondary Button Tap',
    category: 'ui',
    src: '/assets/sounds/ui/UI_BUTTON_SECONDARY.mp3',
    enabled: true,
    volume: 0.85,
    delayMs: 0,
    speed: 1.0,
    loop: false,
    fadeInSec: 0,
    fadeOutSec: 0,
    priority: 'medium',
    cooldownMs: 30,
    description: 'Back, Cancel, Skip, Maybe Later, Close, Previous, Secondary actions',
    preload: true,
  },
  SELECTION: {
    id: 'SELECTION',
    name: 'Selection / Chip Tap',
    category: 'ui',
    src: '/assets/sounds/ui/UI_SELECTION.mp3',
    enabled: true,
    volume: 0.75,
    delayMs: 0,
    speed: 1.0,
    loop: false,
    fadeInSec: 0,
    fadeOutSec: 0,
    priority: 'medium',
    cooldownMs: 40,
    description: 'Selecting quiz answers, interests, filters, radio buttons, cards, options',
    preload: true,
  },
  SUCCESS_CONFIRM: {
    id: 'SUCCESS_CONFIRM',
    name: 'Success Confirm',
    category: 'ui',
    src: '/assets/sounds/ui/UI_SUCCESS_CONFIRM.mp3',
    enabled: true,
    volume: 0.85,
    delayMs: 0,
    speed: 1.0,
    loop: false,
    fadeInSec: 0,
    fadeOutSec: 0,
    priority: 'high',
    cooldownMs: 150,
    description: 'Profile saved, settings updated, bookmark added, general successful action',
    preload: true,
  },
  ERROR_SOFT: {
    id: 'ERROR_SOFT',
    name: 'Soft Error Alert',
    category: 'ui',
    src: '/assets/sounds/ui/UI_ERROR_SOFT.mp3',
    enabled: true,
    volume: 0.75,
    delayMs: 0,
    speed: 1.0,
    loop: false,
    fadeInSec: 0,
    fadeOutSec: 0,
    priority: 'high',
    cooldownMs: 200,
    description: 'Invalid input, empty field, network retry needed, gentle error alert',
    preload: true,
  },
  CORRECT: {
    id: 'CORRECT',
    name: 'Correct Answer Fanfare',
    category: 'ui',
    src: '/assets/sounds/ui/UI_CORRECT.mp3',
    enabled: true,
    volume: 0.9,
    delayMs: 0,
    speed: 1.0,
    loop: false,
    fadeInSec: 0,
    fadeOutSec: 0,
    priority: 'critical',
    cooldownMs: 250,
    description: 'Correct quiz answer, XP awarded, challenge completed, practice success',
    preload: true,
  },
  TAB_SWITCH: {
    id: 'TAB_SWITCH',
    name: 'Tab Switch',
    category: 'ui',
    src: '/assets/sounds/ui/UI_TAB_SWITCH.mp3',
    enabled: true,
    volume: 0.6,
    delayMs: 0,
    speed: 1.0,
    loop: false,
    fadeInSec: 0,
    fadeOutSec: 0,
    priority: 'medium',
    cooldownMs: 80,
    description: 'Switching tabs (Home, Learn, Explore, Profile, Creator, AI, Notifications)',
    preload: true,
  },
  MENU_OPEN_CLOSE: {
    id: 'MENU_OPEN_CLOSE',
    name: 'Menu Open / Close',
    category: 'ui',
    src: '/assets/sounds/ui/UI_MENU_OPEN_CLOSE.mp3',
    enabled: true,
    volume: 0.85,
    delayMs: 0,
    speed: 1.0,
    loop: false,
    fadeInSec: 0,
    fadeOutSec: 0,
    priority: 'medium',
    cooldownMs: 30,
    description: 'Opening/closing navigation drawers, bottom sheets, dropdowns, menus',
    preload: true,
  },
  TOGGLE: {
    id: 'TOGGLE',
    name: 'Switch Toggle',
    category: 'ui',
    src: '/assets/sounds/ui/UI_TOGGLE_ON_OFF.mp3',
    enabled: true,
    volume: 0.7,
    delayMs: 0,
    speed: 1.0,
    loop: false,
    fadeInSec: 0,
    fadeOutSec: 0,
    priority: 'medium',
    cooldownMs: 60,
    description: 'Toggling dark mode, notifications, sound, music, haptics, settings switches',
    preload: true,
  },
  BACKGROUND_MUSIC: {
    id: 'BACKGROUND_MUSIC',
    name: 'Background Ambience',
    category: 'music',
    src: '/assets/sounds/ui/UI_BG_MUSIC.mp3',
    enabled: false,
    volume: 0.35,
    delayMs: 0,
    speed: 1.0,
    loop: true,
    fadeInSec: 1.5,
    fadeOutSec: 1.5,
    priority: 'low',
    cooldownMs: 500,
    description: 'Background music for lesson screens, loading, onboarding, course browsing',
    preload: false,
  },
};
