/*
 * Teyro's JavaScript runner: the part that lives INSIDE the practice page.
 *
 * The page side (frontend/lib/code/jsRunner.ts) builds a sandboxed frame
 * (allow-scripts allow-forms, never allow-same-origin, so the learner's code
 * can't touch Teyro's cookies, storage or pages), inlines this file into it,
 * and posts { type: 'run', ... }. The loader's checker
 * (backend/src/originals/originals-js-verify.ts) runs this same file in
 * jsdom and calls window.__teyroRun directly. Keep both working.
 *
 * What it adds to a normal page:
 *   console      captured and shown under the editor (and streamed live)
 *   errors       the first uncaught error, with the line in the learner's code
 *   loop guard   a loop that runs for 2.5 s without a break is stopped
 *   localStorage a stand-in (sandboxed frames have none) the pad keeps between runs
 *   fetch        the practice API at https://api.silverpine.test, built in;
 *                any other address goes to the real internet (browser only)
 *   forms/links  a form that would reload the page, or a link that would
 *                leave it, is stopped with a console note instead
 *   checks       hidden check expressions, run after the code settles, with
 *                helpers on window.__t (click, type, submit, text, count...)
 */
(function () {
  'use strict';

  var PRACTICE_HOST = 'api.silverpine.test';
  var MAX_LOGS = 200;
  var LOOP_LIMIT_MS = 2500;

  var native = {
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),
    fetch: typeof window.fetch === 'function' ? window.fetch.bind(window) : null,
    now: function () {
      return typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
    },
  };

  // ─── Console ──────────────────────────────────────────────────────────

  var logs = [];
  var live = null; // (entry) => void, set for the visible preview

  function isElement(v) {
    return v && typeof v === 'object' && v.nodeType === 1 && typeof v.tagName === 'string';
  }

  function quote(s) {
    return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  var IDENT = /^[A-Za-z_$][\w$]*$/;

  /** How a value looks in the console: close to the browser's, kept short. */
  function format(v, depth, seen) {
    depth = depth || 0;
    seen = seen || [];
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    var t = typeof v;
    if (t === 'string') return depth === 0 ? v : quote(v);
    if (t === 'number') return Object.is(v, -0) ? '0' : String(v);
    if (t === 'boolean' || t === 'bigint') return String(v);
    if (t === 'symbol') return v.toString();
    if (t === 'function') return v.name ? '[function ' + v.name + ']' : '[function]';
    if (v instanceof Error) return (v.name || 'Error') + ': ' + v.message;
    if (isElement(v)) {
      var tag = '<' + v.tagName.toLowerCase();
      if (v.id) tag += ' id="' + v.id + '"';
      if (v.className && typeof v.className === 'string') tag += ' class="' + v.className + '"';
      return tag + '>';
    }
    if (v instanceof Date) return isNaN(v.getTime()) ? 'Invalid Date' : v.toISOString();
    if (typeof Promise !== 'undefined' && v instanceof Promise) return 'Promise { <pending> }';
    if (seen.indexOf(v) !== -1) return '[circular]';
    if (depth > 3) return Array.isArray(v) ? '[...]' : '{...}';
    seen = seen.concat([v]);
    if (Array.isArray(v)) {
      var items = [];
      for (var i = 0; i < v.length && i < 100; i++) items.push(format(v[i], depth + 1, seen));
      if (v.length > 100) items.push('... ' + (v.length - 100) + ' more');
      return '[' + items.join(', ') + ']';
    }
    if (typeof Map !== 'undefined' && v instanceof Map) {
      var mp = [];
      v.forEach(function (val, key) {
        mp.push(format(key, depth + 1, seen) + ' => ' + format(val, depth + 1, seen));
      });
      return 'Map(' + v.size + ') {' + (mp.length ? ' ' + mp.join(', ') + ' ' : '') + '}';
    }
    if (typeof Set !== 'undefined' && v instanceof Set) {
      var st = [];
      v.forEach(function (val) {
        st.push(format(val, depth + 1, seen));
      });
      return 'Set(' + v.size + ') {' + (st.length ? ' ' + st.join(', ') + ' ' : '') + '}';
    }
    var keys = Object.keys(v);
    if (keys.length === 0) return '{}';
    var parts = keys.slice(0, 50).map(function (k) {
      return (IDENT.test(k) ? k : quote(k)) + ': ' + format(v[k], depth + 1, seen);
    });
    if (keys.length > 50) parts.push('...');
    return '{ ' + parts.join(', ') + ' }';
  }

  function push(level, args) {
    var text = Array.prototype.map.call(args, function (a) {
      return format(a);
    }).join(' ');
    var entry = { level: level, text: text };
    if (logs.length < MAX_LOGS) logs.push(entry);
    else if (logs.length === MAX_LOGS) logs.push({ level: 'warn', text: '(more than ' + MAX_LOGS + ' lines: the rest are hidden)' });
    if (live) live(entry);
  }

  var levels = { log: 'log', info: 'log', debug: 'log', warn: 'warn', error: 'error' };
  Object.keys(levels).forEach(function (name) {
    console[name] = function () {
      push(levels[name], arguments);
    };
  });
  console.table = function (data) {
    if (Array.isArray(data)) data.forEach(function (row) { push('log', [row]); });
    else push('log', [data]);
  };
  function note(text) {
    push('note', [text]);
  }

  window.alert = function (msg) {
    push('alert', ['alert: ' + (msg === undefined ? '' : format(msg))]);
  };
  window.confirm = function (msg) {
    push('alert', ['confirm: ' + (msg === undefined ? '' : format(msg)) + ' (answered OK)']);
    return true;
  };
  var answers = [];
  window.prompt = function (msg) {
    var a = answers.length ? String(answers.shift()) : null;
    push('alert', ['prompt: ' + (msg === undefined ? '' : format(msg)) + ' -> ' + (a === null ? 'null' : a)]);
    return a;
  };

  // ─── Errors ───────────────────────────────────────────────────────────

  var firstError = null;

  /** The line in the learner's code (main.js) an error came from, if we can tell. */
  function lineOf(err, fallback) {
    var stack = err && typeof err.stack === 'string' ? err.stack : '';
    var m = /main\.js:(\d+)/.exec(stack);
    return m ? Number(m[1]) : fallback || null;
  }

  function record(err, line) {
    var e =
      err && typeof err === 'object'
        ? { type: String(err.name || 'Error'), message: String(err.message || ''), line: line || null }
        : { type: 'Error', message: 'Uncaught ' + format(err), line: line || null };
    if (err && err.teyroLoop) e.type = 'LoopLimit';
    if (!firstError) firstError = e;
    push('error', ['Uncaught ' + e.type + ': ' + e.message + (e.line ? ' (line ' + e.line + ')' : '')]);
  }

  window.addEventListener('error', function (event) {
    if (event.__teyroSeen) return;
    var err = event.error;
    // Syntax errors are reported against the page, with the line inside the learner's script.
    var line = lineOf(err, err && err.name === 'SyntaxError' ? event.lineno : null);
    record(err || { name: 'Error', message: String(event.message || 'Script error') }, line);
    event.preventDefault();
  });
  // For hosts that report rejections themselves (the loader's jsdom has no unhandledrejection event).
  Object.defineProperty(window, '__teyroReport', {
    value: function (err) {
      record(err, lineOf(err));
    },
  });
  window.addEventListener('unhandledrejection', function (event) {
    var r = event.reason;
    record(r, lineOf(r));
    event.preventDefault();
  });

  // ─── Loop guard ───────────────────────────────────────────────────────

  var burstStart = 0;
  var lastTick = -1e9;
  Object.defineProperty(window, '__teyroLoop', {
    value: function () {
      var now = native.now();
      if (now - lastTick > 100) burstStart = now;
      lastTick = now;
      if (now - burstStart > LOOP_LIMIT_MS) {
        var e = new RangeError('This loop kept going for over ' + LOOP_LIMIT_MS / 1000 + ' seconds, so I stopped it.');
        e.teyroLoop = true;
        lastTick = -1e9;
        throw e;
      }
    },
  });

  /**
   * Put a guard call at the start of every loop body: for (...) {, while (...) {, do {.
   * Strings, template literals, comments and regexes are skipped; nothing adds a
   * line, so error line numbers still match the editor.
   */
  function guardLoops(src) {
    var out = '';
    var i = 0;
    var n = src.length;
    var lastSig = ''; // last significant character, for telling regexes from division
    var lastWord = '';
    var pendingLoop = null; // 'paren' | 'brace'
    var parenDepth = 0;
    var loopParenStart = -1;
    var templateDepth = []; // brace depth at each open ${

    function regexAllowed() {
      if (!lastSig) return true;
      if (/[(,=:[!&|?{};+\-*%<>~^]/.test(lastSig)) return true;
      return /^(return|typeof|case|do|else|in|of|new|delete|void|throw)$/.test(lastWord);
    }

    var braceDepth = 0;
    while (i < n) {
      var c = src[i];
      var next = src[i + 1];
      // Comments
      if (c === '/' && next === '/') {
        var end = src.indexOf('\n', i);
        if (end === -1) end = n;
        out += src.slice(i, end);
        i = end;
        continue;
      }
      if (c === '/' && next === '*') {
        var endB = src.indexOf('*/', i + 2);
        endB = endB === -1 ? n : endB + 2;
        out += src.slice(i, endB);
        i = endB;
        continue;
      }
      // Strings
      if (c === '"' || c === "'") {
        var j = i + 1;
        while (j < n && src[j] !== c && src[j] !== '\n') j += src[j] === '\\' ? 2 : 1;
        out += src.slice(i, j + 1);
        i = j + 1;
        lastSig = c;
        lastWord = '';
        continue;
      }
      if (c === '`' || (c === '}' && templateDepth.length && templateDepth[templateDepth.length - 1] === braceDepth)) {
        // A template literal, or the rest of one after a ${...}
        if (c === '}') templateDepth.pop();
        var k = i + 1;
        while (k < n) {
          if (src[k] === '\\') {
            k += 2;
            continue;
          }
          if (src[k] === '`') {
            k += 1;
            break;
          }
          if (src[k] === '$' && src[k + 1] === '{') {
            templateDepth.push(braceDepth);
            k += 2;
            break;
          }
          k += 1;
        }
        out += src.slice(i, k);
        i = k;
        lastSig = '`';
        lastWord = '';
        continue;
      }
      // Regex literals
      if (c === '/' && regexAllowed()) {
        var r = i + 1;
        var inClass = false;
        while (r < n && src[r] !== '\n') {
          if (src[r] === '\\') {
            r += 2;
            continue;
          }
          if (src[r] === '[') inClass = true;
          else if (src[r] === ']') inClass = false;
          else if (src[r] === '/' && !inClass) break;
          r += 1;
        }
        r += 1;
        while (r < n && /[a-z]/i.test(src[r])) r += 1;
        out += src.slice(i, r);
        i = r;
        lastSig = '/';
        lastWord = '';
        continue;
      }
      // Words
      if (/[A-Za-z_$]/.test(c)) {
        var w = i;
        while (w < n && /[\w$]/.test(src[w])) w += 1;
        var word = src.slice(i, w);
        out += word;
        i = w;
        // obj.for / obj.while are property names, not loops.
        if (lastSig !== '.') {
          if (word === 'for' || word === 'while') {
            pendingLoop = 'paren';
            loopParenStart = -1;
          } else if (word === 'do') {
            pendingLoop = 'brace';
          }
        }
        lastSig = 'a';
        lastWord = word;
        continue;
      }
      // Loop headers and bodies
      if (pendingLoop === 'paren') {
        if (c === '(') {
          if (loopParenStart === -1) {
            loopParenStart = i;
            parenDepth = 0;
          }
          parenDepth += 1;
        } else if (c === ')' && loopParenStart !== -1) {
          parenDepth -= 1;
          if (parenDepth === 0) pendingLoop = 'brace';
        } else if (loopParenStart === -1 && !/\s/.test(c)) {
          pendingLoop = null;
        }
      } else if (pendingLoop === 'brace') {
        if (c === '{') {
          out += '{__teyroLoop();';
          i += 1;
          braceDepth += 1;
          pendingLoop = null;
          lastSig = '{';
          lastWord = '';
          continue;
        }
        if (!/\s/.test(c)) pendingLoop = null;
      }
      if (c === '{') braceDepth += 1;
      else if (c === '}') braceDepth -= 1;
      out += c;
      i += 1;
      if (!/\s/.test(c)) {
        lastSig = c;
        lastWord = '';
      }
    }
    return out;
  }

  // ─── localStorage stand-in ────────────────────────────────────────────

  function makeStorage(initial) {
    var data = {};
    Object.keys(initial || {}).forEach(function (k) {
      data[k] = String(initial[k]);
    });
    var api = {
      getItem: function (k) {
        k = String(k);
        return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null;
      },
      setItem: function (k, v) {
        data[String(k)] = String(v);
      },
      removeItem: function (k) {
        delete data[String(k)];
      },
      clear: function () {
        data = {};
      },
      key: function (i) {
        var ks = Object.keys(data);
        return i >= 0 && i < ks.length ? ks[i] : null;
      },
    };
    Object.defineProperty(api, 'length', {
      get: function () {
        return Object.keys(data).length;
      },
    });
    Object.defineProperty(api, '__snapshot', {
      value: function () {
        var copy = {};
        Object.keys(data).forEach(function (k) {
          copy[k] = data[k];
        });
        return copy;
      },
    });
    return api;
  }

  var storage = makeStorage({});
  function installStorage(initial) {
    storage = makeStorage(initial);
    Object.defineProperty(window, 'localStorage', { value: storage, configurable: true, writable: false });
    Object.defineProperty(window, 'sessionStorage', { value: makeStorage({}), configurable: true, writable: false });
  }

  // ─── Timers and fetch, tracked so checks wait for them ────────────────

  var pending = 0;
  var timers = {};
  var latency = 250;

  window.setTimeout = function (fn, ms) {
    var args = Array.prototype.slice.call(arguments, 2);
    var tracked = !(ms > 3000);
    if (tracked) pending += 1;
    var id = native.setTimeout(function () {
      if (tracked && timers[id]) {
        pending -= 1;
        delete timers[id];
      }
      if (typeof fn === 'function') fn.apply(window, args);
    }, ms);
    if (tracked) timers[id] = true;
    return id;
  };
  window.clearTimeout = function (id) {
    if (timers[id]) {
      pending -= 1;
      delete timers[id];
    }
    native.clearTimeout(id);
  };

  function PracticeResponse(status, body, url) {
    this.status = status;
    this.ok = status >= 200 && status < 300;
    this.statusText = { 200: 'OK', 201: 'Created', 400: 'Bad Request', 404: 'Not Found', 500: 'Internal Server Error' }[status] || '';
    this.url = url;
    this.headers = {
      get: function (name) {
        return String(name).toLowerCase() === 'content-type' ? 'application/json' : null;
      },
    };
    var text = JSON.stringify(body);
    var used = false;
    function read() {
      if (used) return Promise.reject(new TypeError('Failed to execute: body stream already read'));
      used = true;
      return Promise.resolve(text);
    }
    this.text = read;
    this.json = function () {
      return read().then(JSON.parse);
    };
  }

  var practice = window.__teyroPracticeApi || null;

  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : input && input.url ? input.url : String(input);
    var parsed = null;
    try {
      parsed = new URL(url, 'https://' + PRACTICE_HOST + '/');
    } catch (e) {
      return Promise.reject(new TypeError('Failed to fetch: "' + url + '" is not a web address'));
    }
    if (parsed.hostname === PRACTICE_HOST) {
      if (!practice) return Promise.reject(new TypeError('Failed to fetch: the practice API is not loaded'));
      pending += 1;
      var method = String((init && init.method) || 'GET').toUpperCase();
      var body = init && init.body !== undefined ? init.body : undefined;
      return new Promise(function (resolve) {
        var answer = practice(method, parsed.pathname, parsed.searchParams, body);
        native.setTimeout(function () {
          pending -= 1;
          resolve(new PracticeResponse(answer.status, answer.body, parsed.href));
        }, answer.delay !== undefined ? answer.delay : latency);
      });
    }
    if (!native.fetch) return Promise.reject(new TypeError('Failed to fetch: no internet in this practice run'));
    pending += 1;
    return native.fetch(input, init).then(
      function (res) {
        pending -= 1;
        return res;
      },
      function (err) {
        pending -= 1;
        throw err;
      },
    );
  };

  /** Resolves once nothing tracked is waiting (or after `max` ms). */
  function settle(max) {
    var limit = native.now() + (max || 4000);
    return new Promise(function (resolve) {
      (function tick() {
        if (pending <= 0 || native.now() > limit) {
          // Let promise callbacks that were queued last run too.
          native.setTimeout(resolve, 0);
        } else {
          native.setTimeout(tick, 10);
        }
      })();
    });
  }

  // ─── Forms and links ──────────────────────────────────────────────────

  var reloads = 0;
  window.addEventListener('submit', function (event) {
    if (!event.defaultPrevented) {
      event.preventDefault();
      reloads += 1;
      note('The form tried to reload the page, which would wipe it. Stop it with event.preventDefault().');
    }
  });
  document.addEventListener('click', function (event) {
    var a = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!a || event.defaultPrevented) return;
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) === '#') return;
    event.preventDefault();
    note('Links are switched off on practice pages (this one goes to ' + href + ').');
  });

  // ─── Check helpers (window.__t) ───────────────────────────────────────

  function el(sel) {
    return typeof sel === 'string' ? document.querySelector(sel) : sel;
  }
  function squash(s) {
    return String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
  }
  function fire(node, type) {
    var ev;
    try {
      ev = new Event(type, { bubbles: true });
    } catch (e) {
      ev = document.createEvent('Event');
      ev.initEvent(type, true, true);
    }
    node.dispatchEvent(ev);
  }

  var helpers = {
    settle: settle,
    /** Click an element (by selector). False if it isn't there. */
    click: function (sel) {
      var node = el(sel);
      if (!node) return false;
      node.click();
      return true;
    },
    /** Type into a field: sets the value and fires input and change, like a person typing. */
    type: function (sel, value) {
      var node = el(sel);
      if (!node) return false;
      node.value = String(value);
      fire(node, 'input');
      fire(node, 'change');
      return true;
    },
    /** Tick or untick a checkbox / pick a radio, firing input and change. */
    check: function (sel, on) {
      var node = el(sel);
      if (!node) return false;
      node.checked = on === undefined ? true : !!on;
      fire(node, 'input');
      fire(node, 'change');
      return true;
    },
    /** Press a key on an element: keydown and keyup. */
    key: function (sel, key) {
      var node = el(sel);
      if (!node) return false;
      ['keydown', 'keyup'].forEach(function (type) {
        var ev;
        try {
          ev = new KeyboardEvent(type, { key: key, bubbles: true, cancelable: true });
        } catch (e) {
          ev = new Event(type, { bubbles: true, cancelable: true });
          ev.key = key;
        }
        node.dispatchEvent(ev);
      });
      return true;
    },
    /** Submit a form the way pressing its button would (built-in validation included). */
    submit: function (sel) {
      var form = el(sel || 'form');
      if (form && form.tagName !== 'FORM') form = form.closest('form');
      if (!form) return false;
      if (typeof form.requestSubmit === 'function') form.requestSubmit();
      else {
        var ev = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(ev);
      }
      return true;
    },
    /** An element's text, spaces squashed ('' if it isn't there). */
    text: function (sel) {
      var node = el(sel);
      return node ? squash(node.textContent) : '';
    },
    /** How many elements match. */
    count: function (sel) {
      return document.querySelectorAll(sel).length;
    },
    /** Does the element have this class? */
    has: function (sel, cls) {
      var node = el(sel);
      return !!(node && node.classList && node.classList.contains(cls));
    },
    /** Everything the console showed so far, one line per entry. */
    logs: function () {
      return logs.map(function (l) {
        return l.text;
      }).join('\n');
    },
    /** A saved localStorage value (or null). */
    store: function (key) {
      return storage.getItem(key);
    },
    /** Times a form tried to reload the page. */
    reloads: function () {
      return reloads;
    },
  };
  Object.defineProperty(window, '__t', { value: helpers });

  // ─── Running ──────────────────────────────────────────────────────────

  function addScript(code) {
    var s = document.createElement('script');
    s.textContent = code + '\n//# sourceURL=main.js';
    (document.body || document.documentElement).appendChild(s);
  }

  /**
   * Run the learner's code, wait for it to settle, run the checks.
   * { code, exprs?, storage?, prompts?, latency?, live? } → result
   */
  function run(payload) {
    var started = native.now();
    answers = Array.isArray(payload.prompts) ? payload.prompts.slice() : [];
    if (payload.latency !== undefined) latency = payload.latency;
    installStorage(payload.storage || {});
    var code = String(payload.code || '');
    var guarded;
    try {
      guarded = guardLoops(code);
    } catch (e) {
      guarded = code;
    }
    addScript(guarded);
    // Code written for a normal page often waits for this; it already happened here.
    try {
      document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
    } catch (e) {
      /* old engines */
    }
    var runError = firstError;
    return settle().then(function () {
      var exprs = Array.isArray(payload.exprs) ? payload.exprs : [];
      var results = [];
      var problems = [];
      var chain = Promise.resolve();
      exprs.forEach(function (expr) {
        chain = chain.then(function () {
          if (firstError) {
            results.push(false);
            problems.push('skipped: the code stopped with an error');
            return;
          }
          var v;
          try {
            v = (0, eval)(expr);
          } catch (e) {
            results.push(false);
            problems.push(String(e && e.message));
            return;
          }
          return Promise.resolve(v)
            .then(function (value) {
              return settle().then(function () {
                results.push(!!value);
                problems.push(null);
              });
            })
            .catch(function (e) {
              results.push(false);
              problems.push(String(e && e.message));
            });
        });
      });
      return chain.then(function () {
        return {
          stdout: logs
            .filter(function (l) {
              return l.level !== 'note';
            })
            .map(function (l) {
              return l.text;
            })
            .join('\n'),
          logs: logs.slice(),
          // An error during the checks themselves (a click handler crashing) counts too.
          error: runError || firstError,
          exprResults: results,
          exprProblems: problems,
          storage: storage.__snapshot(),
          ms: Math.round(native.now() - started),
        };
      });
    });
  }

  Object.defineProperty(window, '__teyroRun', { value: run });

  // In a browser frame: talk to the page through messages.
  if (window.parent && window.parent !== window) {
    window.addEventListener('message', function (event) {
      var data = event.data;
      if (!data || data.type !== 'run') return;
      var id = data.id;
      if (data.live) {
        live = function (entry) {
          window.parent.postMessage({ type: 'log', id: id, entry: entry }, '*');
        };
      }
      run(data).then(function (result) {
        result.type = 'result';
        result.id = id;
        window.parent.postMessage(result, '*');
        // After the run, keep sending the console and the saved data as the learner clicks around.
        if (data.live) {
          var lastSaved = JSON.stringify(result.storage);
          native.setTimeout(function watch() {
            var now = JSON.stringify(storage.__snapshot());
            if (now !== lastSaved) {
              lastSaved = now;
              window.parent.postMessage({ type: 'storage', id: id, storage: storage.__snapshot() }, '*');
            }
            native.setTimeout(watch, 300);
          }, 300);
        }
      });
    });
    // Ready once the page's own HTML is in place.
    var announce = function () {
      window.parent.postMessage({ type: 'ready' }, '*');
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', announce, { once: true });
    else announce();
  }
})();
