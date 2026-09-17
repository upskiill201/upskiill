'use client';

/**
 * TreasureChest — the ONE Rive-powered treasure chest implementation for all
 * of Teyro. Every chest-worthy reward (Daily Chest today; Monthly Quest,
 * achievements, courses, events tomorrow) renders this component and drives
 * it through this same clean API. Do not build a second chest component —
 * see `frontend/public/Rive md/` for the source spec this was built against.
 *
 * Rive owns the chest's visual progression, opening, and reward-category
 * reveal (internally, via its own state machine) — this wrapper only sets
 * `rewards.rewardType` and forwards taps to the `click` trigger. Reward
 * eligibility/amount/persistence is entirely the caller's responsibility;
 * this component never calls a reward API itself.
 *
 * View model contract (verified against the actual treasure_chest.riv
 * binary, not guessed): view model `TChest`, triggers `click` / `reset`,
 * nested `rewards` view model with enum `rewardType` — values `coinRewards`
 * / `xpRewards` / `streakFreezeRewards` / `xpBoostRewards` / `hartRewards`
 * (that spelling is real — see currency.ts's toRiveRewardType) — and a
 * `rewardReveal` trigger that fires at the exact reveal point.
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceEnum,
  useViewModelInstanceTrigger,
} from '@rive-app/react-canvas';
import { toRiveRewardType, type TeyroRewardType } from '../celebration/currency';

const DEV = process.env.NODE_ENV === 'development';
/** `?chestDebug=1` opts into diagnostics on ANY build, including staging's
 * production build — NODE_ENV alone is useless there since `next build`
 * is always 'production', so every dev-gated log/overlay was silently
 * inert on staging the whole time this was being debugged. Read once per
 * module load (SSR-safe guard); a query param never changes without a
 * full navigation anyway. */
const CHEST_DEBUG =
  DEV ||
  (typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('chestDebug') === '1');
function devLog(...args: unknown[]) {
  if (CHEST_DEBUG) console.debug('[TreasureChest]', ...args);
}

export type TreasureChestHandle = {
  /** Forward a tap/click to the chest's Rive interaction. No-ops (and is
   * queued for replay) until `rewardType` is known. */
  click: () => void;
  /** Replay the chest without reloading the .riv file or remounting. */
  reset: () => void;
};

export interface TreasureChestProps {
  /** Which reward to visually reveal. Leave undefined until the reward is
   * resolved server-side — taps are accepted but held until this is set,
   * so the chest never reveals a reward category before it's known. */
  rewardType?: TeyroRewardType;
  /** Whether the chest currently accepts taps/keyboard activation. */
  active?: boolean;
  /** Rive layout fit mode. Defaults to Fit.Cover so the chest fills the viewport container without letterboxing. */
  fit?: Fit;
  /** Visual scale multiplier for the chest graphic (default: 1.35) */
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Fires once the Rive file has loaded and is ready for interaction. */
  onLoad?: () => void;
  /** Fires once, on the first accepted tap/activation. */
  onStart?: () => void;
  /** Fires on every tap actually forwarded to Rive's `click` trigger
   * (including the first), with a 1-based tap index — use this to drive
   * escalating feedback (shake pulse, rising tap sound, "keep going!"
   * copy) while the chest is mid-open. */
  onTap?: (tapIndex: number) => void;
  /** Fires once per click→reveal cycle. Guarded against duplicate Rive
   * triggers (StrictMode, re-renders) — only `reset()` clears the guard. */
  onRewardReveal?: () => void;
  /** Rive failed to load or bind — falls back to a static image. The
   * caller must be able to complete its own reward flow without waiting
   * on `onRewardReveal` in this case. */
  onError?: (error: Error) => void;
}

const RIVE_SRC = '/Rive/treasure_chest.riv';
const FALLBACK_IMAGE_SRC = '/Tressure box.webp';

const TreasureChest = forwardRef<TreasureChestHandle, TreasureChestProps>(function TreasureChest(
  {
    rewardType,
    active = true,
    fit = Fit.Cover,
    scale = 1.35,
    className,
    style,
    onLoad,
    onStart,
    onTap,
    onRewardReveal,
    onError,
  },
  ref
) {
  const [failed, setFailed] = useState(false);
  /** On-screen readout for `?chestDebug=1` — production builds have no
   * console access on a phone, so this needs to be visible on the chest
   * itself, not just logged. */
  const [debugInfo, setDebugInfo] = useState<{
    smNames: string[];
    smInputs: string[];
    chestVMFound: boolean;
    namedInstanceBound: boolean;
    autoBound: boolean;
    rewordsFound: boolean;
    enumValues: string[];
    lastSet: string | null;
    lastReadback: string | null;
    lastApplied: boolean | null;
    resetFiredAt: number | null;
    revealFiredAt: number | null;
    lastError: string | null;
  }>({
    smNames: [],
    smInputs: [],
    chestVMFound: false,
    namedInstanceBound: false,
    autoBound: false,
    rewordsFound: false,
    enumValues: [],
    lastSet: null,
    lastReadback: null,
    lastApplied: null,
    resetFiredAt: null,
    revealFiredAt: null,
    lastError: null,
  });
  const startedRef = useRef(false);
  const revealedRef = useRef(false);
  const tapIndexRef = useRef(0);
  // A tap that arrives before `rewardType` is known is held here and
  // replayed once it lands, instead of being silently dropped.
  const pendingClickRef = useRef(false);
  // Latest-callback refs so useRive's mount-time callbacks never fire a
  // stale closure. Assigned in an effect (not during render) — these are
  // only read asynchronously on load/error, well after commit.
  const onErrorRef = useRef(onError);
  const onLoadRef = useRef(onLoad);
  useEffect(() => {
    onErrorRef.current = onError;
    onLoadRef.current = onLoad;
  }, [onError, onLoad]);

  // Lazy useState rather than a ref: reading a ref during render is a
  // React anti-pattern (and a lint error here). Stable for the component's
  // lifetime, same as before — `fit` is a mount-time config.
  const [layout] = useState(() => new Layout({ fit, alignment: Alignment.Center }));

  const { rive, RiveComponent } = useRive({
    src: RIVE_SRC,
    autoplay: true,
    // Binds the artboard's own default view model instance. This is the
    // instance the artboard actually READS from — writes to an instance
    // resolved any other way can land on a detached copy that never
    // reaches the animation (which is why every reward rendered as coins).
    autoBind: true,
    // We drive the chest entirely through explicit triggers (click/reset),
    // not Rive's own built-in canvas interactivity — so its internal
    // pointer/touch Listeners (hitBox/hover/swipe, baked into the .riv)
    // are pure overhead we don't want. Worse: on iOS Safari specifically,
    // if anything in a touch's path calls preventDefault() (which canvas
    // gesture listeners commonly do), iOS refuses to synthesize the
    // subsequent click event at all — silently breaking our own onClick
    // handler on the wrapping div. Disabling Rive's listeners removes that
    // interference entirely, on every platform, not just iOS.
    shouldDisableRiveListeners: true,
    layout,
    onLoad: () => onLoadRef.current?.(),
    onLoadError: (e) => {
      devLog('LOAD ERROR', e);
      setFailed(true);
      if (CHEST_DEBUG) setDebugInfo((d) => ({ ...d, lastError: `LOAD ERROR: ${String(e)}` }));
      onErrorRef.current?.(new Error('Failed to load treasure_chest.riv'));
    },
  });

  // The .riv artboard has both linear timeline animations (swipe1/opening/
  // idleClick8/etc.) and the interactive state machine. Left unspecified,
  // Rive's default is to play the first *linear animation* instead of the
  // state machine — so clicks/resets would have nothing listening for them.
  // Discover the real state machine name(s) at runtime (never guessed) and
  // explicitly switch playback to them once the file has loaded.
  useEffect(() => {
    if (!rive) return;
    const names = rive.stateMachineNames;
    devLog('loaded', {
      animationNames: rive.animationNames,
      stateMachineNames: names,
      bounds: rive.bounds,
    });
    if (names.length === 0) {
      devLog('WARNING: no state machine found on this artboard — click/reset will do nothing.');
      if (CHEST_DEBUG) {
        queueMicrotask(() => setDebugInfo((d) => ({ ...d, smNames: [], lastError: 'NO STATE MACHINE FOUND' })));
      }
      return;
    }
    rive.stop();
    rive.play(names, true);

    // Enumerate state machine INPUTS. If the reward branch is selected by an
    // input here rather than by the view model enum, setting the enum alone
    // would never change the visual — exactly the "always coins" symptom.
    const inputSummary: string[] = [];
    names.forEach((sm) => {
      const inputs = rive.stateMachineInputs(sm);
      inputs?.forEach((input) => {
        inputSummary.push(`${input.name}:${input.type}`);
      });
    });
    devLog('state machine inputs', inputSummary);
    if (CHEST_DEBUG) {
      queueMicrotask(() => setDebugInfo((d) => ({ ...d, smNames: names, smInputs: inputSummary })));
    }
  }, [rive]);

  // Bind the TChest view model explicitly by name (verified against the
  // actual .riv binary) rather than relying on `autoBind`'s default-instance
  // heuristic, which can silently fail to find a binding.
  const chestViewModel = useViewModel(rive, { name: 'TChest' });
  const namedVmi = useViewModelInstance(chestViewModel, { useDefault: true, rive });
  // ORDER MATTERS: prefer the autoBind instance — it's the one the artboard
  // renders from. The named lookup is only a fallback for the case where the
  // file's default view model isn't the one we want.
  const vmi = rive?.viewModelInstance ?? namedVmi ?? null;

  // Resolve the nested `rewords` ViewModelInstance (`VMrewards`) from `TChest`.
  // NOTE: in the actual binary artboard, the animator named this property `rewords` (with an 'o').
  const rewordsVmi = React.useMemo(() => {
    if (!vmi) return null;
    try {
      return vmi.viewModel('rewords') ?? vmi.viewModel('rewards') ?? null;
    } catch {
      return null;
    }
  }, [vmi]);

  useEffect(() => {
    if (!rive) return;
    const info = {
      chestViewModelFound: !!chestViewModel,
      namedInstanceBound: !!namedVmi,
      autoBoundFallback: !!rive.viewModelInstance,
      rewordsVmiFound: !!rewordsVmi,
    };
    devLog('viewModel resolution', info);
    if (CHEST_DEBUG) {
      queueMicrotask(() =>
        setDebugInfo((d) => ({
          ...d,
          chestVMFound: info.chestViewModelFound,
          namedInstanceBound: info.namedInstanceBound,
          autoBound: info.autoBoundFallback,
          rewordsFound: info.rewordsVmiFound,
        }))
      );
    }
  }, [rive, chestViewModel, namedVmi, rewordsVmi]);

  // Hook into the nested `rewardType` enum directly on `rewordsVmi`
  const nestedRewardTypeEnum = useViewModelInstanceEnum('rewardType', rewordsVmi);
  // Direct slash path on vmi (`rewords/rewardType` matches the binary structure)
  const pathRewardTypeEnum = useViewModelInstanceEnum('rewords/rewardType', vmi);

  const applyRewardType = useCallback(
    (riveValue: string) => {
      let applied = false;
      // 1. Direct setter on nested enum hook
      if (nestedRewardTypeEnum && typeof nestedRewardTypeEnum.setValue === 'function') {
        try {
          nestedRewardTypeEnum.setValue(riveValue);
          applied = true;
        } catch {}
      }
      // 2. Direct property setter on nested rewords VM
      if (rewordsVmi) {
        try {
          const enumProp = rewordsVmi.enum('rewardType');
          if (enumProp) {
            enumProp.value = riveValue;
            applied = true;
          }
        } catch {}
      }
      // 3. Fallback direct path on vmi
      if (pathRewardTypeEnum && typeof pathRewardTypeEnum.setValue === 'function') {
        try {
          pathRewardTypeEnum.setValue(riveValue);
          applied = true;
        } catch {}
      }
      if (vmi) {
        try {
          const ep =
            vmi.enum('rewords/rewardType') ||
            vmi.enum('rewards/rewardType') ||
            vmi.enum('rewardType');
          if (ep) {
            ep.value = riveValue;
            applied = true;
          }
        } catch {}
      }
      const readback = nestedRewardTypeEnum.value ?? pathRewardTypeEnum.value ?? null;
      devLog('applyRewardType ->', riveValue, { applied, readback });
      if (CHEST_DEBUG) {
        queueMicrotask(() =>
          setDebugInfo((d) => ({ ...d, lastSet: riveValue, lastReadback: readback, lastApplied: applied }))
        );
      }
      return applied;
    },
    [nestedRewardTypeEnum, rewordsVmi, pathRewardTypeEnum, vmi]
  );

  useEffect(() => {
    if (!rewordsVmi && !vmi) return;
    const values = nestedRewardTypeEnum.values.length ? nestedRewardTypeEnum.values : pathRewardTypeEnum.values;
    devLog('rewardType enum bound values:', values);
    if (CHEST_DEBUG) queueMicrotask(() => setDebugInfo((d) => ({ ...d, enumValues: values })));
  }, [rewordsVmi, vmi, nestedRewardTypeEnum.values, pathRewardTypeEnum.values]);

  const clickTrigger = useViewModelInstanceTrigger('click', vmi);
  const resetTrigger = useViewModelInstanceTrigger('reset', vmi);
  useViewModelInstanceTrigger('rewardReveal', vmi, {
    onTrigger: () => {
      devLog('rewardReveal trigger fired from Rive');
      if (CHEST_DEBUG) {
        const firedAt = Date.now();
        queueMicrotask(() => setDebugInfo((d) => ({ ...d, revealFiredAt: firedAt })));
      }
      if (revealedRef.current) return;
      revealedRef.current = true;
      onRewardReveal?.();
    },
  });

  // Reset the Rive experience as soon as the view model binds, BEFORE any
  // reward type is set. Rive caches the loaded file and its default view
  // model instance across mounts, so a second chest would otherwise start
  // with the state machine still in its finished-from-last-time state and
  // ignore the new rewardType — rendering the default (coins) no matter
  // what we set. This is the `reset` trigger the animator's spec calls for:
  // "resets the experience so it can be played again without reloading".
  // Safe to run before rewardType arrives: it only lands after the
  // server responds, which is always later than this.
  const didResetRef = useRef(false);
  useEffect(() => {
    if (!vmi || didResetRef.current) return;
    didResetRef.current = true;
    devLog('firing reset on mount — clean slate for this chest');
    if (CHEST_DEBUG) {
      const firedAt = Date.now();
      queueMicrotask(() => setDebugInfo((d) => ({ ...d, resetFiredAt: firedAt })));
    }
    resetTrigger.trigger();
  }, [vmi, resetTrigger]);

  // Set the reward category once both the ViewModel is bound and the
  // reward is known, then flush any tap that was held waiting for it.
  useEffect(() => {
    if (!vmi || !rewardType) return;
    const riveValue = toRiveRewardType(rewardType);
    devLog('setting rewardType ->', riveValue);
    applyRewardType(riveValue);
    if (pendingClickRef.current) {
      pendingClickRef.current = false;
      devLog('flushing held tap -> click trigger');
      clickTrigger.trigger();
      tapIndexRef.current += 1;
      onTap?.(tapIndexRef.current);
    }
  }, [vmi, rewardType, applyRewardType, clickTrigger, onTap]);

  const handleActivate = useCallback(() => {
    if (!active || failed) return;
    if (!startedRef.current) {
      startedRef.current = true;
      onStart?.();
    }
    if (!vmi || !rewardType) {
      devLog('tap held — rewardType not resolved yet');
      pendingClickRef.current = true;
      return;
    }
    // Re-assert the reward category immediately before every forwarded tap
    // (not just the first) — closes any timing gap between a rewardType
    // prop change and this click reaching Rive, so the reveal can never use
    // a stale category.
    const riveValue = toRiveRewardType(rewardType);
    applyRewardType(riveValue);
    tapIndexRef.current += 1;
    devLog('click trigger fired, tap #', tapIndexRef.current, 'rewardType =', riveValue);
    clickTrigger.trigger();
    onTap?.(tapIndexRef.current);
  }, [active, failed, vmi, rewardType, applyRewardType, clickTrigger, onStart, onTap]);

  useImperativeHandle(
    ref,
    () => ({
      click: handleActivate,
      reset: () => {
        startedRef.current = false;
        revealedRef.current = false;
        pendingClickRef.current = false;
        tapIndexRef.current = 0;
        resetTrigger.trigger();
      },
    }),
    [handleActivate, resetTrigger]
  );

  if (failed) {
    return (
      <div className={className} style={style}>
        <Image
          src={FALLBACK_IMAGE_SRC}
          alt="Teyro treasure chest"
          width={200}
          height={180}
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        cursor: active ? 'pointer' : 'default',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        ...style,
      }}
      role="button"
      tabIndex={active ? 0 : -1}
      aria-label="Open treasure chest"
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivate();
        }
      }}
    >
      <RiveComponent
        style={{
          width: '100%',
          height: '100%',
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'center center',
        }}
      />

      {CHEST_DEBUG && (
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            zIndex: 20,
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.82)',
            color: '#7CFFB2',
            font: '10px/1.5 monospace',
            padding: '6px 8px',
            borderRadius: 6,
            textAlign: 'left',
            maxWidth: 280,
          }}
        >
          <div>rive: {rive ? 'loaded' : 'loading…'} · failed: {String(failed)}</div>
          <div>SM: {debugInfo.smNames.join(', ') || '(none)'}</div>
          <div style={{ color: '#FFD479' }}>SM inputs: {debugInfo.smInputs.join(', ') || '(none)'}</div>
          <div>
            chestVM: {String(debugInfo.chestVMFound)} · named: {String(debugInfo.namedInstanceBound)} · autoBound: {String(debugInfo.autoBound)} · rewords: {String(debugInfo.rewordsFound)}
          </div>
          <div style={{ color: '#9ecbff' }}>enum: {debugInfo.enumValues.join(', ') || '(none)'}</div>
          <div>set: {debugInfo.lastSet ?? '—'} · applied: {String(debugInfo.lastApplied)}</div>
          <div style={{ color: debugInfo.lastReadback === debugInfo.lastSet ? '#7CFFB2' : '#FF8A8A' }}>
            readback: {debugInfo.lastReadback ?? '—'}
          </div>
          <div>reset fired: {debugInfo.resetFiredAt ? new Date(debugInfo.resetFiredAt).toLocaleTimeString() : 'never'}</div>
          <div>reveal fired: {debugInfo.revealFiredAt ? new Date(debugInfo.revealFiredAt).toLocaleTimeString() : 'never'}</div>
          {debugInfo.lastError && <div style={{ color: '#FF8A8A' }}>ERROR: {debugInfo.lastError}</div>}
        </div>
      )}
    </div>
  );
});

export default TreasureChest;
