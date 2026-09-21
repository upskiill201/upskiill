'use client';

/**
 * TreasureChest — the ONE Rive-powered treasure chest implementation for all
 * of Teyro. Every chest-worthy reward (Daily Chest today; Monthly Quest,
 * achievements, courses, events tomorrow) renders this component and drives
 * it through this same API. Do not build a second chest component.
 *
 * Division of labour: Rive owns the visual progression, the tap-to-open
 * sequence, reveal timing and the per-reward animation. This wrapper owns the
 * reward *data*, the interaction lifecycle and accessibility. It never calls
 * a reward API and never grants anything — `onRewardReveal` is a presentation
 * signal, not permission to award.
 *
 * All ordering logic lives in `lib/chest/chestLifecycle.ts` as a pure state
 * machine; this file is the driver that turns Rive callbacks into events and
 * performs the effects that come back.
 *
 * ── Verified contract (read from the .riv binary, not the guide) ────────────
 * The animator's integration guide disagrees with the shipped asset in two
 * places; everything below is what the file actually exposes:
 *
 *   artboard        "Safe" (default)
 *   state machine   "State Machine 1" — zero legacy inputs, pure data binding
 *   view model      "TChest"  → triggers `click`, `reset`
 *                             → nested VM `rewords` (guide says `rewards`,
 *                               which resolves to null on the real file)
 *                                 → enum `rewardType`
 *                                 → boolean `isReveal` (Rive-owned, read only)
 *   reveal signal   `rewardReveal` is a **Rive General event (type 128)**,
 *                   NOT a view-model trigger. Binding it as a VM trigger —
 *                   as the previous integration did — silently never fires.
 *
 * Two behaviours found by probing the state machine that the app must respect,
 * because Rive will not protect us from either:
 *   • `rewardType` defaults to `coinRewards`, so a tap landing before the
 *     server has resolved the reward reveals coins regardless of what the
 *     learner actually won. Taps are gated on a configured reward.
 *   • A `click` after the reveal sends the machine back to `hovering` and
 *     flips `isReveal` false — it re-closes the chest. Post-reveal taps are
 *     dropped outright.
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import {
  Alignment,
  EventType,
  Fit,
  Layout,
  RiveEventType,
  useRive,
} from '@rive-app/react-canvas';
import {
  CHEST_REVEAL_EVENT,
  CHEST_REWARD_ENUM_PROPERTY,
  CHEST_REWARD_VM_CANDIDATES,
  CHEST_TRIGGER_CLICK,
  CHEST_TRIGGER_RESET,
  RIVE_REWARD_TYPES,
  safeToRiveRewardType,
  type TeyroRewardType,
} from '../celebration/currency';
import {
  chestReducer,
  initialChestState,
  type ChestEffect,
  type ChestEvent,
  type ChestPhase,
  type ChestState,
} from '@/lib/chest/chestLifecycle';

export type { ChestPhase } from '@/lib/chest/chestLifecycle';

const RIVE_SRC = '/Rive/treasure_chest.riv';
const STATE_MACHINE = 'State Machine 1';
const FALLBACK_IMAGE_SRC = '/Tressure box.webp';

/** Diagnostics are always opt-in via `?chestDebug=1`, including in local dev.
 *
 * Dev used to switch the overlay on unconditionally, which meant a black
 * diagnostic panel sat on top of the chest art in every local session — the
 * one place you most want to actually watch the animation. The information is
 * still one query param away.
 *
 * Outside dev it additionally requires NEXT_PUBLIC_SHOW_CHEST_BENCH (already
 * the "this environment has chest testing turned on" flag, set on staging,
 * never on production). NODE_ENV alone is useless there since `next build` is
 * always 'production' on every deployed environment, staging included — which
 * is why every dev-gated log was silently inert on staging the whole time this
 * was last being debugged. A bare query param would expose it on production. */
const DEV = process.env.NODE_ENV === 'development';
const CHEST_TESTING_ENABLED = DEV || process.env.NEXT_PUBLIC_SHOW_CHEST_BENCH === 'true';
const CHEST_DEBUG =
  CHEST_TESTING_ENABLED &&
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('chestDebug') === '1';

function devLog(...args: unknown[]) {
  if (CHEST_DEBUG) console.debug('[TreasureChest]', ...args);
}

/** Minimal shape of the bits of Rive's ViewModelInstance we actually touch. */
interface RiveEnumProperty {
  value: string;
  values?: string[];
}
interface RiveBooleanProperty {
  value: boolean;
}
interface RiveTriggerProperty {
  trigger: () => void;
}
interface ChestViewModelInstance {
  viewModel(name: string): ChestViewModelInstance | null;
  enum(name: string): RiveEnumProperty | null;
  boolean(name: string): RiveBooleanProperty | null;
  trigger(name: string): RiveTriggerProperty | null;
}

type ChestBinding =
  | { ok: true; root: ChestViewModelInstance; rewardVm: ChestViewModelInstance; rewardPath: string; declared: string[] }
  | { ok: false; detail: string };

export type TreasureChestHandle = {
  /** Forward a tap to the chest. Held (not dropped) until the reward is
   *  configured; ignored once the reward has revealed. */
  click: () => void;
  /** Replay the chest without reloading the .riv file or remounting. */
  reset: () => void;
  /** Current lifecycle phase — for the dev bench and tests. */
  getPhase: () => ChestPhase;
};

export interface TreasureChestProps {
  /** Which reward to visually reveal. Leave undefined until the reward is
   * resolved server-side — taps are accepted but held until this is set, so
   * the chest never reveals a reward category before it's known. */
  rewardType?: TeyroRewardType;
  /** Whether the chest currently accepts taps/keyboard activation. */
  active?: boolean;
  /** Rive layout fit mode. Defaults to Fit.Cover so the chest fills its
   *  container without letterboxing. */
  fit?: Fit;
  /** Visual scale multiplier for the chest graphic (default: 1.6). The chest
   *  occupies well under half its artboard, so this is what makes it read as
   *  the hero of the scene rather than a small object in a large empty box. */
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Fires once the Rive file has loaded and its contract has been verified. */
  onLoad?: () => void;
  /** Fires once per cycle, on the first accepted tap — including a tap that
   *  arrives before the reward is known. The caller's cue to resolve the
   *  reward server-side. */
  onStart?: () => void;
  /** Fires on every tap actually forwarded to Rive's `click` trigger, with a
   *  1-based tap index — drives escalating feedback while the chest opens. */
  onTap?: (tapIndex: number) => void;
  /** Fires exactly once per cycle, when Rive emits its `rewardReveal` event.
   *  Presentation only — never treat this as a reward grant. */
  onRewardReveal?: () => void;
  /** Rive failed to load, or the loaded file doesn't match the expected view
   *  model contract, or the reward has no animation. Falls back to static
   *  art that is still tappable. The caller must be able to complete its
   *  reward flow without waiting on `onRewardReveal`. */
  onError?: (error: Error) => void;
  /** Lifecycle observer for instrumentation and the dev bench. */
  onPhaseChange?: (phase: ChestPhase) => void;
}

const TreasureChest = forwardRef<TreasureChestHandle, TreasureChestProps>(function TreasureChest(
  {
    rewardType,
    active = true,
    fit = Fit.Cover,
    scale = 1.6,
    className,
    style,
    onLoad,
    onStart,
    onTap,
    onRewardReveal,
    onError,
    onPhaseChange,
  },
  ref
) {
  // The reducer's state lives in a ref so Rive's async callbacks always read
  // the live value; `phase` mirrors it for rendering only.
  const stateRef = useRef<ChestState>(initialChestState());
  const [phase, setRenderPhase] = useState<ChestPhase>(stateRef.current.phase);
  const bindingRef = useRef<ChestBinding | null>(null);

  // Latest-callback refs so Rive's mount-time and event callbacks never fire
  // a stale closure. Assigned in an effect, read only asynchronously.
  const cbRef = useRef({ onLoad, onStart, onTap, onRewardReveal, onError, onPhaseChange });
  useEffect(() => {
    cbRef.current = { onLoad, onStart, onTap, onRewardReveal, onError, onPhaseChange };
  }, [onLoad, onStart, onTap, onRewardReveal, onError, onPhaseChange]);

  const [debug, setDebug] = useState({
    rewardPath: null as string | null,
    enumValues: [] as string[],
    triggers: [] as string[],
    listenerBound: false,
    lastEvent: null as string | null,
    lastApplied: null as string | null,
    readback: null as string | null,
    isReveal: null as boolean | null,
    cycle: 0,
    taps: 0,
    guards: 'started=false revealed=false pendingTap=false',
  });
  const patchDebug = useCallback((patch: Partial<typeof debug>) => {
    if (!CHEST_DEBUG) return;
    queueMicrotask(() => setDebug((d) => ({ ...d, ...patch })));
  }, []);

  // ── Effect performer ──────────────────────────────────────────────────────
  const runEffect = useCallback(
    (effect: ChestEffect) => {
      const binding = bindingRef.current;
      switch (effect.type) {
        case 'EmitStart':
          cbRef.current.onStart?.();
          return;
        case 'EmitTap':
          cbRef.current.onTap?.(effect.tapIndex);
          return;
        case 'EmitReveal':
          cbRef.current.onRewardReveal?.();
          return;
        case 'EmitError':
          cbRef.current.onError?.(
            new Error(`[TreasureChest:${effect.reason}] ${effect.detail}`)
          );
          return;
        case 'ApplyReward': {
          if (!binding?.ok) return;
          try {
            const prop = binding.rewardVm.enum(CHEST_REWARD_ENUM_PROPERTY);
            if (!prop) return;
            prop.value = effect.reward;
            devLog('applied reward', effect.reward, '→ readback', prop.value);
            patchDebug({ lastApplied: effect.reward, readback: prop.value });
          } catch (e) {
            devLog('ApplyReward threw', e);
          }
          return;
        }
        case 'FireClick': {
          if (!binding?.ok) return;
          binding.root.trigger(CHEST_TRIGGER_CLICK)?.trigger();
          patchDebug({ isReveal: readIsReveal(binding.rewardVm) });
          return;
        }
        case 'FireReset': {
          if (!binding?.ok) return;
          binding.root.trigger(CHEST_TRIGGER_RESET)?.trigger();
          return;
        }
      }
    },
    [patchDebug]
  );

  /** Feed one event through the machine and perform whatever comes back.
   *  Effects run synchronously so a tap reaches Rive in the same gesture. */
  const dispatch = useCallback(
    (event: ChestEvent) => {
      const before = stateRef.current;
      const { state, effects } = chestReducer(before, event);
      stateRef.current = state;
      if (state.phase !== before.phase) {
        setRenderPhase(state.phase);
        cbRef.current.onPhaseChange?.(state.phase);
      }
      effects.forEach(runEffect);
      // Mirrored into state rather than read off the ref at render time, so
      // the overlay shows the live guards instead of whatever was current at
      // the last re-render.
      patchDebug({
        cycle: state.cycle,
        taps: state.tapIndex,
        guards: `started=${state.started} revealed=${state.revealed} pendingTap=${state.pendingTap}`,
      });
    },
    [runEffect, patchDebug]
  );

  // Lazy useState, not a ref: reading a ref during render is a React
  // anti-pattern. `fit` is mount-time config, stable for the component's life.
  const [layout] = useState(() => new Layout({ fit, alignment: Alignment.Center }));

  const { rive, RiveComponent } = useRive({
    src: RIVE_SRC,
    // Naming the state machine at construction is what stops Rive falling
    // back to the artboard's first *linear* animation (the file has nine of
    // them). The previous integration corrected that after the fact with a
    // stop()/play() dance on load; declaring it up front is the supported
    // route and removes a frame of the wrong animation.
    stateMachines: STATE_MACHINE,
    autoplay: true,
    // Binds the artboard's own default view model instance — the instance the
    // artboard actually READS from. Resolving an instance any other way can
    // land writes on a detached copy that never reaches the animation.
    autoBind: true,
    // We drive the chest entirely through explicit triggers, not Rive's own
    // canvas interactivity, so its internal pointer Listeners are overhead we
    // don't want. Worse: on iOS Safari, if anything in a touch's path calls
    // preventDefault() (which canvas gesture listeners commonly do), iOS
    // refuses to synthesize the subsequent click event at all — silently
    // breaking our own onClick on the wrapping div.
    shouldDisableRiveListeners: true,
    layout,
    onLoadError: (e) => {
      devLog('LOAD ERROR', e);
      dispatch({ type: 'RiveFailed', detail: `Failed to load ${RIVE_SRC}: ${String(e)}` });
    },
  });

  // ── Resolve the view model and verify the contract ────────────────────────
  // Once per Rive instance. If the asset doesn't expose what we need we fail
  // loudly into the static fallback rather than animating a lie.
  const binding = useMemo<ChestBinding | null>(() => {
    if (!rive) return null;
    const root = (rive as unknown as { viewModelInstance: ChestViewModelInstance | null })
      .viewModelInstance;
    if (!root) return { ok: false, detail: 'No bound view model instance (autoBind failed).' };

    let rewardVm: ChestViewModelInstance | null = null;
    let rewardPath: string | null = null;
    for (const candidate of CHEST_REWARD_VM_CANDIDATES) {
      try {
        const nested = root.viewModel(candidate);
        if (nested?.enum(CHEST_REWARD_ENUM_PROPERTY)) {
          rewardVm = nested;
          rewardPath = `${candidate}/${CHEST_REWARD_ENUM_PROPERTY}`;
          break;
        }
      } catch {
        /* try the next spelling */
      }
    }
    if (!rewardVm || !rewardPath) {
      return {
        ok: false,
        detail: `No reward enum found at ${CHEST_REWARD_VM_CANDIDATES.map(
          (c) => `${c}/${CHEST_REWARD_ENUM_PROPERTY}`
        ).join(' or ')}.`,
      };
    }

    const missingTriggers = [CHEST_TRIGGER_CLICK, CHEST_TRIGGER_RESET].filter((name) => {
      try {
        return !root.trigger(name);
      } catch {
        return true;
      }
    });
    if (missingTriggers.length > 0) {
      return { ok: false, detail: `Missing required trigger(s): ${missingTriggers.join(', ')}.` };
    }

    const declared = rewardVm.enum(CHEST_REWARD_ENUM_PROPERTY)?.values ?? [];
    const missingValues = RIVE_REWARD_TYPES.filter((v) => !declared.includes(v));
    if (missingValues.length > 0) {
      return {
        ok: false,
        detail: `Reward enum is missing value(s): ${missingValues.join(
          ', '
        )}. Declared: ${declared.join(', ')}.`,
      };
    }

    return { ok: true, root, rewardVm, rewardPath, declared };
  }, [rive]);

  useEffect(() => {
    if (!binding) return;
    bindingRef.current = binding;
    if (!binding.ok) {
      devLog('CONTRACT ERROR', binding.detail);
      patchDebug({ rewardPath: null, lastEvent: `contract error: ${binding.detail}` });
      dispatch({ type: 'ContractFailed', detail: binding.detail });
      return;
    }
    devLog('contract verified', { rewardPath: binding.rewardPath, values: binding.declared });
    patchDebug({
      rewardPath: binding.rewardPath,
      enumValues: binding.declared,
      triggers: [CHEST_TRIGGER_CLICK, CHEST_TRIGGER_RESET],
    });
    // Clean slate for this instance BEFORE any reward is configured. Rive
    // caches the loaded file and its default view model instance across
    // mounts, so without this a second chest starts in the finished state of
    // the previous one and ignores the new rewardType. Still required on the
    // new asset: a freshly loaded file reports isReveal=true until `reset`.
    binding.root.trigger(CHEST_TRIGGER_RESET)?.trigger();
    dispatch({ type: 'RiveReady' });
    cbRef.current.onLoad?.();
  }, [binding, dispatch, patchDebug]);

  // ── `rewardReveal` is a Rive EVENT, not a view-model trigger ──────────────
  // Registered once per Rive instance and torn down on unmount, so a remount
  // can't leave two listeners double-firing the reveal.
  useEffect(() => {
    if (!rive) return;
    const handler = (event: unknown) => {
      const data = (event as { data?: { name?: string; type?: number } })?.data;
      if (!data?.name) return;
      patchDebug({ lastEvent: `${data.name} (type ${data.type})` });
      if (data.name !== CHEST_REVEAL_EVENT) return;
      // General events only — an OpenUrl event sharing the name would be a
      // different signal entirely.
      if (data.type !== undefined && data.type !== RiveEventType.General) return;
      devLog('rewardReveal received');
      dispatch({ type: 'Reveal' });
    };

    rive.on(EventType.RiveEvent, handler);
    patchDebug({ listenerBound: true });
    return () => {
      rive.off(EventType.RiveEvent, handler);
      patchDebug({ listenerBound: false });
    };
  }, [rive, dispatch, patchDebug]);

  // ── Reward configuration ──────────────────────────────────────────────────
  const configureReward = useCallback(
    (value: TeyroRewardType | undefined) => {
      if (!value) return;
      if (!bindingRef.current?.ok) return;
      const riveValue = safeToRiveRewardType(value);
      if (!riveValue) {
        // The server resolved something this asset has no animation for.
        // Substituting coins would misrepresent a reward the learner has
        // already been granted, so fail into the caller's fallback instead.
        dispatch({
          type: 'RewardUnsupported',
          detail: `Unsupported reward type for the chest animation: ${String(value)}`,
        });
        return;
      }
      dispatch({ type: 'RewardResolved', reward: riveValue });
    },
    [dispatch]
  );

  const rewardTypeRef = useRef(rewardType);
  useEffect(() => {
    rewardTypeRef.current = rewardType;
  }, [rewardType]);

  useEffect(() => {
    configureReward(rewardType);
  }, [rewardType, binding, configureReward]);

  // ── Public handle ─────────────────────────────────────────────────────────
  const handleActivate = useCallback(() => {
    if (!active) return;
    dispatch({ type: 'Tap' });
  }, [active, dispatch]);

  useImperativeHandle(
    ref,
    () => ({
      click: handleActivate,
      reset: () => {
        dispatch({ type: 'Reset' });
        // Re-arm with whatever reward is currently on the props. `reset`
        // does NOT clear Rive's rewardType enum — it keeps the previous
        // cycle's value — and the prop may not change between cycles, so
        // without this the chest would sit in `ready` holding taps forever
        // while Rive still points at the last reward.
        configureReward(rewardTypeRef.current);
      },
      getPhase: () => stateRef.current.phase,
    }),
    [handleActivate, dispatch, configureReward]
  );

  // ── Render ────────────────────────────────────────────────────────────────
  const failed = phase.status === 'error';
  const interactive = active && phase.status !== 'revealed';

  const ariaLabel =
    phase.status === 'revealed'
      ? 'Treasure chest opened'
      : phase.status === 'opening'
        ? 'Opening treasure chest, keep tapping'
        : 'Open treasure chest';

  /** Announced at the transitions that matter. Decorative animation frames
   *  are deliberately not announced. */
  const liveMessage =
    phase.status === 'opening'
      ? 'Opening your chest'
      : phase.status === 'revealed'
        ? 'Your chest is open'
        : '';

  const interactionProps = {
    role: 'button' as const,
    tabIndex: interactive ? 0 : -1,
    'aria-label': ariaLabel,
    'aria-disabled': !interactive,
    'data-chest-phase': phase.status,
    // Single click handler only. Adding pointerdown/touchstart alongside this
    // would make one physical tap advance the machine twice.
    onClick: handleActivate,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivate();
      }
    },
  };

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    cursor: interactive ? 'pointer' : 'default',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    ...style,
  };

  if (failed) {
    // Static art, but still a real button: the learner taps to open exactly
    // as before, and the caller reveals the reward through its fallback path.
    // Auto-opening here would claim the chest with no learner intent.
    return (
      <div className={className} style={wrapperStyle} {...interactionProps}>
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
    <div className={className} style={wrapperStyle} {...interactionProps}>
      <RiveComponent
        style={{
          width: '100%',
          height: '100%',
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'center center',
        }}
      />

      <span
        aria-live="polite"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
        }}
      >
        {liveMessage}
      </span>

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
            maxWidth: 300,
          }}
        >
          <div>
            phase: {phase.status} · cycle {debug.cycle} · taps {debug.taps}
          </div>
          <div>
            rive: {rive ? 'loaded' : 'loading…'} · SM: {STATE_MACHINE}
          </div>
          <div style={{ color: debug.rewardPath ? '#7CFFB2' : '#FF8A8A' }}>
            reward path: {debug.rewardPath ?? '(unresolved)'}
          </div>
          <div style={{ color: '#9ecbff' }}>enum: {debug.enumValues.join(', ') || '(none)'}</div>
          <div>triggers: {debug.triggers.join(', ') || '(none)'}</div>
          <div style={{ color: debug.listenerBound ? '#7CFFB2' : '#FF8A8A' }}>
            rewardReveal listener: {debug.listenerBound ? 'bound' : 'NOT BOUND'}
          </div>
          <div>last Rive event: {debug.lastEvent ?? '—'}</div>
          <div style={{ color: debug.readback === debug.lastApplied ? '#7CFFB2' : '#FF8A8A' }}>
            set: {debug.lastApplied ?? '—'} · readback: {debug.readback ?? '—'}
          </div>
          <div>isReveal (Rive-owned): {debug.isReveal === null ? '—' : String(debug.isReveal)}</div>
          <div>guards: {debug.guards}</div>
        </div>
      )}
    </div>
  );
});

/** Read-only peek at Rive's own reveal flag, for the debug overlay. Never
 *  written — the animator owns this property. */
function readIsReveal(vm: ChestViewModelInstance): boolean | null {
  try {
    return vm.boolean('isReveal')?.value ?? null;
  } catch {
    return null;
  }
}

export default TreasureChest;
