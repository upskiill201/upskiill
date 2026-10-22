/**
 * The React Native runner's runtime: everything that runs INSIDE a phone
 * preview. Built by scripts/build-rn-runtime.mjs into
 * public/react-native/runtime.js (one static file, no server), and loaded by:
 *
 *   - the learner's phone preview, a sandboxed frame (lib/code/rnRunner.ts)
 *   - the course loader, in jsdom (backend src/originals/originals-rn-verify.ts)
 *
 * It exposes window.__TEYRO_RN__:
 *   mount(js, container)  render a lesson's compiled App; returns an error or null
 *   check(js, tests)      render fresh for each screen check, act, then grade
 *
 * The learner's code is CommonJS from public/react-native/transpile.js. Its
 * imports are answered here: 'react', 'react-native' (react-native-web, with
 * React Native's own rules added back where the web is more forgiving, e.g.
 * raw text outside <Text> crashes like it does on a phone), 'expo-status-bar'.
 */

import * as React from 'react';
import * as JsxRuntime from 'react/jsx-runtime';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import * as RNW from 'react-native-web';
import { act, screenPasses, screenText, type ScreenTest } from '../../lib/code/screenChecks';

type AnyProps = Record<string, unknown> & { children?: React.ReactNode };

// ─── React Native's rules, on the web ─────────────────────────────────────

const TEXT_ERROR = 'Text strings must be rendered within a <Text> component.';

/** A raw string or number directly inside a View crashes a real phone app; do the same here. */
function assertNoRawText(children: React.ReactNode, where: string) {
  React.Children.forEach(children, (child) => {
    if ((typeof child === 'string' && child.trim() !== '') || typeof child === 'number') {
      throw new Error(`${TEXT_ERROR} (Found "${String(child).trim().slice(0, 40)}" inside <${where}>.)`);
    }
  });
}

/**
 * The style this element was given, as React Native sees it (flattened), so
 * screen checks can test fontSize: 32 rather than whatever CSS the web made
 * of it. Rendered as data-teyro-style through react-native-web's dataSet.
 */
function tagStyle(props: AnyProps): AnyProps {
  let style = props.style;
  if (typeof style === 'function') style = (style as (s: { pressed: boolean }) => unknown)({ pressed: false });
  const flat = RNW.StyleSheet.flatten(style as never) as Record<string, unknown> | undefined;
  if (!flat || Object.keys(flat).length === 0) return props;
  let json = '';
  try {
    json = JSON.stringify(flat);
  } catch {
    return props;
  }
  return { ...props, dataSet: { ...(props.dataSet as Record<string, string> | undefined), teyroStyle: json } };
}

/** Wrap a react-native-web component: record its style, and (for containers) enforce the raw-text rule. */
function strict<P extends AnyProps>(Base: React.ComponentType<P>, name: string, container = true) {
  const Wrapped = React.forwardRef<unknown, P>((props, ref) => {
    if (container && typeof props.children !== 'function') assertNoRawText(props.children as React.ReactNode, name);
    return React.createElement(Base as React.ComponentType<P & { ref?: unknown }>, { ...(tagStyle(props) as P), ref });
  });
  Wrapped.displayName = name;
  return Wrapped;
}

// ─── Alert: react-native-web's is a no-op, so show a real dialog ───────────

type AlertButton = { text?: string; onPress?: () => void; style?: string };

function showAlert(title: string, message?: string, buttons?: AlertButton[]) {
  const doc = document;
  const overlay = doc.createElement('div');
  overlay.setAttribute('data-teyro-alert', '');
  overlay.setAttribute('role', 'alertdialog');
  overlay.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;z-index:9999;font-family:system-ui,sans-serif;';
  const box = doc.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:14px;width:270px;max-width:80%;overflow:hidden;text-align:center;';
  const body = doc.createElement('div');
  body.style.cssText = 'padding:18px 16px 14px;';
  const h = doc.createElement('div');
  h.textContent = String(title ?? '');
  h.style.cssText = 'font-weight:700;font-size:17px;color:#111;';
  body.appendChild(h);
  if (message) {
    const p = doc.createElement('div');
    p.textContent = String(message);
    p.style.cssText = 'margin-top:6px;font-size:14px;color:#333;line-height:1.35;';
    body.appendChild(p);
  }
  box.appendChild(body);
  const list = buttons && buttons.length ? buttons : [{ text: 'OK' }];
  for (const b of list) {
    const btn = doc.createElement('div');
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.textContent = b.text ?? 'OK';
    btn.style.cssText = `border-top:1px solid #ddd;padding:12px;font-size:17px;color:${b.style === 'destructive' ? '#d00' : '#0a7aff'};cursor:pointer;${b.style === 'cancel' ? 'font-weight:700;' : ''}`;
    btn.addEventListener('click', () => {
      overlay.remove();
      b.onPress?.();
    });
    box.appendChild(btn);
  }
  overlay.appendChild(box);
  doc.body.appendChild(overlay);
}

// ─── The modules a lesson can import ──────────────────────────────────────

const reactNative: Record<string, unknown> = {
  ...RNW,
  View: strict(RNW.View as React.ComponentType<AnyProps>, 'View'),
  ScrollView: strict(RNW.ScrollView as unknown as React.ComponentType<AnyProps>, 'ScrollView'),
  SafeAreaView: strict(RNW.SafeAreaView as React.ComponentType<AnyProps>, 'SafeAreaView'),
  Pressable: strict(RNW.Pressable as unknown as React.ComponentType<AnyProps>, 'Pressable'),
  TouchableOpacity: strict(RNW.TouchableOpacity as unknown as React.ComponentType<AnyProps>, 'TouchableOpacity'),
  Text: strict(RNW.Text as unknown as React.ComponentType<AnyProps>, 'Text', false),
  TextInput: strict(RNW.TextInput as unknown as React.ComponentType<AnyProps>, 'TextInput', false),
  Image: strict(RNW.Image as unknown as React.ComponentType<AnyProps>, 'Image', false),
  Alert: { alert: showAlert },
};

/**
 * The learner's JSX, with one phone rule: lower-case tags like <div>, <h1> or
 * <p> are HTML, which phones don't have. On a device they crash ("View config
 * not found"), so here they do too, instead of quietly rendering in the
 * browser. (react-native-web's own internals use React directly, not this.)
 */
function phoneOnly(type: unknown) {
  if (typeof type === 'string') {
    throw new Error(`<${type}> isn't a React Native component. Phones don't have HTML tags: use View for boxes and Text for words.`);
  }
}
const jsxRuntime = {
  Fragment: JsxRuntime.Fragment,
  jsx: (type: React.ElementType, props: unknown, key?: React.Key) => {
    phoneOnly(type);
    return JsxRuntime.jsx(type, props, key);
  },
  jsxs: (type: React.ElementType, props: unknown, key?: React.Key) => {
    phoneOnly(type);
    return JsxRuntime.jsxs(type, props, key);
  },
};
const phoneReact = {
  ...React,
  createElement: (type: React.ElementType, ...rest: unknown[]) => {
    phoneOnly(type);
    return (React.createElement as (...args: unknown[]) => unknown)(type, ...rest);
  },
};

const MODULES: Record<string, unknown> = {
  react: phoneReact,
  'react/jsx-runtime': jsxRuntime,
  'react-native': reactNative,
  'expo-status-bar': { StatusBar: () => null },
};

// ─── Running a lesson's code ──────────────────────────────────────────────

let loopCount = 0;
/** Called at the top of every loop body (added by transpile.js): stop runaway loops. */
function guard() {
  if (loopCount === 0) setTimeout(() => (loopCount = 0), 0);
  if (++loopCount > 1_000_000) throw new Error('A loop ran more than a million times, so the preview stopped it. Check the loop can end.');
}

/** Evaluate the compiled module and return its default export (the App component). */
function load(js: string): React.ComponentType {
  const module = { exports: {} as Record<string, unknown> };
  const require = (name: string) => {
    if (name in MODULES) return MODULES[name];
    throw new Error(`The phone preview can't load "${name}" yet. In this lesson, import from "react-native" and "react".`);
  };
  // The learner's own code, run in this sandboxed frame (or jsdom in the loader).
  const run = new Function('require', 'module', 'exports', '__teyroGuard', js);
  run(require, module, module.exports, guard);
  const App = (module.exports.default ?? (module.exports as { App?: unknown }).App) as React.ComponentType | undefined;
  if (typeof App !== 'function') throw new Error('Export your screen as the default: export default function App() { ... }');
  return App;
}

class Boundary extends React.Component<{ onError: (e: Error) => void; children?: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    this.props.onError(error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export interface MountResult {
  error: { message: string } | null;
  unmount: () => void;
}

const describe = (e: unknown) => ({ message: e instanceof Error ? e.message : String(e) });

/** Render the lesson's App into `container`. Errors (in the module or while rendering) come back, never throw. */
function mount(js: string, container: Element, onLateError?: (e: { message: string }) => void): MountResult {
  let root: Root | null = null;
  let error: { message: string } | null = null;
  let mounted = false;
  const unmount = () => {
    const r = root;
    root = null;
    if (r) flushSync(() => r.unmount());
  };
  try {
    const App = load(js);
    root = createRoot(container, {
      onUncaughtError: (e) => {
        error ??= describe(e);
        if (mounted) onLateError?.(describe(e));
      },
      onCaughtError: () => {},
    });
    const r = root;
    flushSync(() =>
      r.render(
        React.createElement(
          Boundary,
          {
            onError: (e) => {
              error ??= describe(e);
              if (mounted) onLateError?.(describe(e));
            },
          },
          React.createElement(App),
        ),
      ),
    );
    mounted = true;
  } catch (e) {
    error = describe(e);
  }
  return { error, unmount };
}

const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

export interface CheckResult {
  passed: boolean[];
  error: { message: string } | null;
  text: string;
}

/** Grade screen checks: a fresh render for each, so one test's taps never leak into the next. */
async function check(js: string, tests: ScreenTest[]): Promise<CheckResult> {
  const passed: boolean[] = [];
  let error: { message: string } | null = null;
  let text = '';
  for (const t of [null as ScreenTest | null, ...tests]) {
    document.querySelectorAll('[data-teyro-alert]').forEach((el) => el.remove());
    const container = document.createElement('div');
    container.setAttribute('data-teyro-screen', '');
    container.style.cssText = 'display:flex;flex-direction:column;min-height:100%;';
    document.body.appendChild(container);
    const m = mount(js, container);
    await tick();
    if (m.error) error ??= m.error;
    if (t === null) {
      text = screenText(document.body); // the screen as it first appears
    } else if (m.error) {
      passed.push(false);
    } else {
      let ok = await act(document.body, window as Window & typeof globalThis, t);
      if (ok) ok = screenPasses(document.body, window as Window & typeof globalThis, t);
      passed.push(ok && !error);
    }
    m.unmount();
    container.remove();
  }
  document.querySelectorAll('[data-teyro-alert]').forEach((el) => el.remove());
  return { passed, error, text: text.trim() };
}

(window as unknown as { __TEYRO_RN__: unknown }).__TEYRO_RN__ = { mount, check, version: 1 };
