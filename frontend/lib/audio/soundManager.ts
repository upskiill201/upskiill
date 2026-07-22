/**
 * Teyro High-Performance Web Audio Engine (Sound Manager Singleton)
 *
 * Built using the Web Audio API (`AudioContext`) with buffer caching, sub-20ms latency,
 * audio pooling, cooldown rate limiting, category volume controls, and music fading.
 */

import {
  SoundId,
  SoundCategory,
  SoundConfig,
  DEFAULT_SOUND_REGISTRY,
} from './soundRegistry';

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

const MAX_SIMULTANEOUS_SFX = 8;

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

  /** Audio buffer cache (url -> AudioBuffer) */
  private bufferCache = new Map<string, AudioBuffer>();

  /** Active audio sources for pooling & simultaneous SFX limit */
  private activeSfxSources: { id: SoundId; source: AudioBufferSourceNode; gain: GainNode }[] = [];

  /** Active background music player state */
  private musicSource: AudioBufferSourceNode | null = null;
  private musicGainNode: GainNode | null = null;
  private currentMusicId: SoundId | null = null;

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
  private isInitialised = false;

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
      this.isInitialised = true;
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    return this.ctx;
  }

  // ─── Preloading & Caching ──────────────────────────────────────────────────

  /**
   * Preloads sounds into Web Audio API buffers for sub-20ms playback latency.
   */
  async preload(soundIds?: SoundId[]): Promise<void> {
    if (typeof window === 'undefined') return;
    const ctx = this.initContext();
    if (!ctx) return;

    const idsToLoad =
      soundIds ||
      (Object.keys(this.registry) as SoundId[]).filter((id) => this.registry[id].preload);

    const promises = idsToLoad.map(async (id) => {
      const cfg = this.registry[id];
      if (!cfg || !cfg.enabled || this.bufferCache.has(cfg.src)) return;

      try {
        const response = await fetch(cfg.src);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        this.bufferCache.set(cfg.src, audioBuffer);
      } catch (err) {
        console.warn(`[SoundManager] Failed to preload sound "${id}" (${cfg.src}):`, err);
      }
    });

    await Promise.all(promises);
  }

  /** Fetch or get decoded AudioBuffer for a given URL */
  private async getAudioBuffer(url: string): Promise<AudioBuffer | null> {
    if (this.bufferCache.has(url)) {
      return this.bufferCache.get(url)!;
    }

    const ctx = this.initContext();
    if (!ctx) return null;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      this.bufferCache.set(url, audioBuffer);
      return audioBuffer;
    } catch (err) {
      console.warn(`[SoundManager] Failed to decode audio buffer from ${url}:`, err);
      return null;
    }
  }

  // ─── Playback Controls ─────────────────────────────────────────────────────

  /**
   * Plays a registered sound effect by SoundId.
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

    const buffer = await this.getAudioBuffer(cfg.src);
    if (!buffer || !ctx) {
      // HTML5 Audio element fallback (guarantees playback without file downloads)
      try {
        const audio = new Audio(cfg.src);
        const catVol = this.volumes[cfg.category as keyof CategoryVolumes] ?? 1.0;
        audio.volume = Math.max(0, Math.min(1, cfg.volume * catVol * (this.isMuted ? 0 : this.volumes.master)));
        audio.playbackRate = cfg.speed || 1.0;
        audio.loop = cfg.loop || false;
        void audio.play().catch(e => console.warn('[SoundManager] HTML5 audio play prevented:', e));
      } catch (err) {
        console.warn(`[SoundManager] HTML5 fallback failed for ${id}:`, err);
      }
      return;
    }

    // Route music separately
    if (cfg.category === 'music' || cfg.loop) {
      this.playMusicBuffer(id, buffer, cfg);
      return;
    }

    // Enforce simultaneous SFX pool limit
    if (this.activeSfxSources.length >= MAX_SIMULTANEOUS_SFX) {
      const oldest = this.activeSfxSources.shift();
      if (oldest) {
        try {
          oldest.source.stop();
        } catch {}
      }
    }

    // Create Source and Gain Node
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = cfg.speed || 1.0;

    const gainNode = ctx.createGain();
    gainNode.gain.value = cfg.volume;

    // Connect to category gain node
    const catGain = this.categoryGainNodes[cfg.category as keyof CategoryVolumes] || this.masterGainNode;
    gainNode.connect(catGain || ctx.destination);
    source.connect(gainNode);

    const startTime = ctx.currentTime + (cfg.delayMs ? cfg.delayMs / 1000 : 0);
    source.start(startTime);

    const poolEntry = { id, source, gain: gainNode };
    this.activeSfxSources.push(poolEntry);

    source.onended = () => {
      this.activeSfxSources = this.activeSfxSources.filter((s) => s.source !== source);
    };
  }

  /** Plays background music with seamless looping & optional fade-in */
  private playMusicBuffer(id: SoundId, buffer: AudioBuffer, cfg: SoundConfig) {
    if (!this.ctx) return;

    if (this.musicSource) {
      try {
        this.musicSource.stop();
      } catch {}
      this.musicSource = null;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.playbackRate.value = cfg.speed || 1.0;

    const gainNode = this.ctx.createGain();
    const musicCategoryGain = this.categoryGainNodes.music || this.masterGainNode;
    gainNode.connect(musicCategoryGain || this.ctx.destination);
    source.connect(gainNode);

    const targetVolume = cfg.volume;

    if (cfg.fadeInSec && cfg.fadeInSec > 0) {
      gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(targetVolume, this.ctx.currentTime + cfg.fadeInSec);
    } else {
      gainNode.gain.value = targetVolume;
    }

    source.start(0);
    this.musicSource = source;
    this.musicGainNode = gainNode;
    this.currentMusicId = id;
  }

  /** Plays background music loop seamlessly */
  playLoop(id: SoundId): void {
    void this.play(id, { loop: true });
  }

  /** Plays one sound randomly from an array of SoundIds */
  playRandom(ids: SoundId[]): void {
    if (!ids || ids.length === 0) return;
    const randId = ids[Math.floor(Math.random() * ids.length)];
    void this.play(randId);
  }

  /** Fades out currently playing music or sound */
  fadeOut(id?: SoundId, durationSec = 1.0): void {
    if (this.ctx && this.musicGainNode && (!id || this.currentMusicId === id)) {
      this.musicGainNode.gain.linearRampToValueAtTime(
        0,
        this.ctx.currentTime + durationSec,
      );
      setTimeout(() => {
        if (this.musicSource) {
          try {
            this.musicSource.stop();
          } catch {}
          this.musicSource = null;
          this.currentMusicId = null;
        }
      }, durationSec * 1000);
    }
  }

  /** Stops all active SFX & music */
  stopAll(): void {
    this.activeSfxSources.forEach((entry) => {
      try {
        entry.source.stop();
      } catch {}
    });
    this.activeSfxSources = [];

    if (this.musicSource) {
      try {
        this.musicSource.stop();
      } catch {}
      this.musicSource = null;
      this.currentMusicId = null;
    }
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
    if (!enabled) {
      this.fadeOut(undefined, 0.5);
    }
  }

  getSfxEnabled(): boolean {
    return this.isSfxEnabled;
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
      if (parsed.registry) this.registry = { ...this.registry, ...parsed.registry };

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
