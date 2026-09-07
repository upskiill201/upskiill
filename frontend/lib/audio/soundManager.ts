/**
 * Teyro High-Performance Web Audio Engine (Sound Manager Singleton)
 *
 * All UI sounds are synthesized at play time from oscillator recipes
 * (see `uiSounds.ts`) and routed through a shared AudioContext with
 * master + category gain nodes, cooldown rate limiting, and mute/toggle state.
 */

import {
  SoundId,
  SoundCategory,
  SoundConfig,
  DEFAULT_SOUND_REGISTRY,
} from './soundRegistry';
import { playUiSound } from './uiSounds';

export interface CategoryVolumes {
  master: number;
  music: number;
  sfx: number;
  mascot: number;
  aiVoice: number;
}

export interface SoundManagerOptions {
  muted?: boolean;
  sfxEnabled?: boolean;
  musicEnabled?: boolean;
  volumes?: Partial<CategoryVolumes>;
}

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGainNode: GainNode | null = null;
  private categoryGainNodes: Record<keyof CategoryVolumes, GainNode | null> = {
    master: null,
    music: null,
    sfx: null,
    mascot: null,
    aiVoice: null,
  };

  /** Dynamic registry configuration */
  private registry: Record<SoundId, SoundConfig> = { ...DEFAULT_SOUND_REGISTRY };

  /** Cooldown tracker (soundId -> timestamp ms) */
  private lastPlayTimes = new Map<SoundId, number>();

  /** Category Volumes & Mute State */
  private volumes: CategoryVolumes = {
    master: 1.0,
    music: 0.35,
    sfx: 0.8,
    mascot: 0.85,
    aiVoice: 0.9,
  };

  private isMuted = false;
  private isSfxEnabled = true;
  private isMusicEnabled = true;

  constructor() {
    // Lazy initialised on first user click/touch or preload call
  }

  /** Ensures Web Audio API context is running (handles browser autoplay policies) */
  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return null;

      this.ctx = new AudioCtxClass();

      // Master Gain Node
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.value = this.isMuted ? 0 : this.volumes.master;
      this.masterGainNode.connect(this.ctx.destination);

      // Category Gain Nodes
      (Object.keys(this.volumes) as (keyof CategoryVolumes)[]).forEach((cat) => {
        if (cat === 'master') return;
        const gain = this.ctx!.createGain();
        gain.gain.value = this.volumes[cat];
        gain.connect(this.masterGainNode!);
        this.categoryGainNodes[cat] = gain;
      });

      this.categoryGainNodes.master = this.masterGainNode;
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    return this.ctx;
  }

  // ─── Playback Controls ─────────────────────────────────────────────────────

  /**
   * Preloads the audio engine. Synthesized sounds need no asset fetching —
   * this simply unlocks the shared AudioContext on the first user gesture.
   */
  async preload(_soundIds?: SoundId[]): Promise<void> {
    if (typeof window === 'undefined') return;
    this.initContext();
  }

  /**
   * Plays a registered sound by SoundId using its synthesized recipe.
   */
  async play(id: SoundId, overrideConfig?: Partial<SoundConfig>): Promise<void> {
    if (typeof window === 'undefined') return;

    const cfg = { ...this.registry[id], ...overrideConfig };
    if (!cfg || !cfg.enabled || this.isMuted) return;

    // Check SFX/Music category toggle
    if (cfg.category === 'music' && !this.isMusicEnabled) return;
    if (cfg.category !== 'music' && !this.isSfxEnabled) return;

    // Cooldown check (prevent tap stacking)
    const now = Date.now();
    const lastTime = this.lastPlayTimes.get(id) || 0;
    if (now - lastTime < (cfg.cooldownMs || 0)) {
      return;
    }
    this.lastPlayTimes.set(id, now);

    const ctx = this.initContext();
    if (ctx && ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {}
    }

    playUiSound(id, cfg.volume, cfg.speed);
  }

  /** Fades out background music. Retained for API compatibility; music is disabled. */
  fadeOut(_id?: SoundId, _durationSec = 1.0): void {
    // No-op — all sounds are synthesized one-shots, nothing to fade.
  }

  /** Stops all active sounds. Retained for API compatibility. */
  stopAll(): void {
    // Synth notes are short scheduled one-shots (<1s); nothing persistent to stop.
  }

  /** Pause AudioContext */
  pause(): void {
    if (this.ctx && this.ctx.state === 'running') {
      void this.ctx.suspend();
    }
  }

  /** Resume AudioContext */
  resume(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  // ─── Settings & Volume Controls ───────────────────────────────────────────

  setVolume(category: keyof CategoryVolumes, value: number): void {
    const clamped = Math.max(0, Math.min(1, value));
    this.volumes[category] = clamped;

    if (this.categoryGainNodes[category] && this.ctx) {
      this.categoryGainNodes[category]!.gain.setValueAtTime(
        clamped,
        this.ctx.currentTime,
      );
    }
  }

  getVolumes(): CategoryVolumes {
    return { ...this.volumes };
  }

  mute(muted = true): void {
    this.isMuted = muted;
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(
        muted ? 0 : this.volumes.master,
        this.ctx.currentTime,
      );
    }
  }

  unmute(): void {
    this.mute(false);
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  setSfxEnabled(enabled: boolean): void {
    this.isSfxEnabled = enabled;
  }

  setMusicEnabled(enabled: boolean): void {
    this.isMusicEnabled = enabled;
  }

  getSfxEnabled(): boolean {
    return this.isSfxEnabled;
  }

  /**
   * Returns the shared AudioContext plus the sfx category gain node so
   * synthesized (oscillator-based) sounds can route through the same
   * master/sfx volume + mute graph as buffer-based SFX.
   * Returns null when audio is unavailable or muted/sfx disabled.
   */
  getSynthBus(): { ctx: AudioContext; output: GainNode } | null {
    if (typeof window === 'undefined') return null;
    if (this.isMuted || !this.isSfxEnabled) return null;

    const ctx = this.initContext();
    if (!ctx) return null;

    const sfxGain = this.categoryGainNodes.sfx || this.masterGainNode;
    if (!sfxGain) return null;

    return { ctx, output: sfxGain };
  }

  getMusicEnabled(): boolean {
    return this.isMusicEnabled;
  }

  // ─── Sound Registry Customization ──────────────────────────────────────────

  getRegistry(): Record<SoundId, SoundConfig> {
    return { ...this.registry };
  }

  getSoundConfig(id: SoundId): SoundConfig | null {
    return this.registry[id] ? { ...this.registry[id] } : null;
  }

  updateSoundConfig(id: SoundId, updates: Partial<SoundConfig>): void {
    if (this.registry[id]) {
      this.registry[id] = { ...this.registry[id], ...updates };
    }
  }

  resetRegistry(): void {
    this.registry = { ...DEFAULT_SOUND_REGISTRY };
  }

  exportConfigJson(): string {
    return JSON.stringify(
      {
        volumes: this.volumes,
        isMuted: this.isMuted,
        isSfxEnabled: this.isSfxEnabled,
        isMusicEnabled: this.isMusicEnabled,
        registry: this.registry,
      },
      null,
      2,
    );
  }

  importConfigJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.volumes) this.volumes = { ...this.volumes, ...parsed.volumes };
      if (typeof parsed.isMuted === 'boolean') this.mute(parsed.isMuted);
      if (typeof parsed.isSfxEnabled === 'boolean') this.setSfxEnabled(parsed.isSfxEnabled);
      if (typeof parsed.isMusicEnabled === 'boolean') this.setMusicEnabled(parsed.isMusicEnabled);
      if (parsed.registry) {
        // Merge saved per-sound settings onto the current registry so stale
        // fields from older exports (e.g. removed `src` paths) are dropped.
        (Object.keys(this.registry) as SoundId[]).forEach((id) => {
          if (parsed.registry[id]) {
            this.registry[id] = { ...this.registry[id], ...parsed.registry[id] };
          }
        });
      }

      // Apply master gain update
      if (this.masterGainNode && this.ctx) {
        this.masterGainNode.gain.value = this.isMuted ? 0 : this.volumes.master;
      }
      return true;
    } catch (err) {
      console.error('[SoundManager] Failed to import audio config JSON:', err);
      return false;
    }
  }
}

/** Export singleton instance */
export const soundManager = new SoundManager();
export default soundManager;

/**
 * Where AudioContext persists the learner's mute / volume / per-sound settings.
 *
 * v2: the engine moved from MP3 assets to synthesized sounds — stale v1
 * preferences (toggles tuned for the old assets) must not silently disable the
 * new engine.
 */
export const AUDIO_SETTINGS_STORAGE_KEY = 'teyro_audio_settings_v2';

/**
 * Loads saved audio preferences into the singleton.
 *
 * AudioProvider does this on mount, but it only wraps the (app) route group.
 * Surfaces outside that group which still make noise — the /start install
 * gateway is the first one — must call this themselves, or a learner who muted
 * Teyro yesterday gets sound today. Idempotent and safe to call repeatedly.
 */
export function hydrateSoundPreferences(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const saved = window.localStorage.getItem(AUDIO_SETTINGS_STORAGE_KEY);
    if (!saved) return false;
    return soundManager.importConfigJson(saved);
  } catch {
    // Storage blocked (private mode) — defaults are a fine outcome here.
    return false;
  }
}
