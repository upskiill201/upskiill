/*
 * Teyro's C host: compiles and runs a C program with xcc (cc.wasm, MIT,
 * github.com/tyfkda/xcc @ acfc8a2b), entirely in memory. Shared by the
 * browser (runner.worker.js) and `npm run originals`
 * (backend/src/originals/originals-c-verify.ts), so a solution that passes
 * there passes for the learner. Synchronous: the caller runs it off the main
 * thread and enforces the time limit by stopping the thread.
 *
 *   const c = TeyroC.create(ccWasmBytes, libsJson);
 *   c.run(source, stdinText) -> { stdout, compileError, exitCode, crash }
 */
(function (root) {
  'use strict';

  var enc = new TextEncoder();
  var dec = new TextDecoder('utf-8');
  /** Output past this is cut off, so a runaway printf loop can't eat the tab's memory. */
  var MAX_OUTPUT = 64 * 1024;

  function ExitCalled(code) {
    this.code = code;
  }

  /** A tiny file system: path -> bytes, plus open file descriptors. */
  function Files(base) {
    this.files = Object.assign({}, base);
    this.fds = [{ std: 0 }, { std: 1 }, { std: 2 }];
  }
  Files.prototype.alloc = function (desc) {
    for (var i = 3; i < this.fds.length; i++) {
      if (!this.fds[i]) {
        this.fds[i] = desc;
        return i;
      }
    }
    this.fds.push(desc);
    return this.fds.length - 1;
  };

  function readString(mem, ptr) {
    var bytes = new Uint8Array(mem.buffer, ptr);
    var end = bytes.indexOf(0);
    return dec.decode(bytes.subarray(0, end < 0 ? 0 : end));
  }

  /**
   * One process: a wasm program with argv, stdin, stdout/stderr and the
   * files. Returns its exit code; output collects in `out` / `err`.
   */
  function runProcess(module, args, fs, stdin, io) {
    var memory = null;
    var encodedArgs = args.map(function (a) {
      return enc.encode(a);
    });
    var argBytes = encodedArgs.reduce(function (n, a) {
      return n + a.length + 1;
    }, 0);
    var stdinPos = 0;
    var cwd = '/home/wasm';
    var abs = function (p) {
      return p.charAt(0) === '/' ? p : cwd + '/' + p;
    };
    var u8 = function (ptr, len) {
      return new Uint8Array(memory.buffer, ptr, len);
    };
    var u32 = function (ptr, len) {
      return new Uint32Array(memory.buffer, ptr, len);
    };

    var c = {
      args_sizes_get: function (pargc, plen) {
        u32(pargc, 1)[0] = encodedArgs.length;
        u32(plen, 1)[0] = argBytes;
        return 0;
      },
      args_get: function (pargv, pstr) {
        var argv = u32(pargv, encodedArgs.length);
        var str = u8(pstr, argBytes);
        var at = 0;
        encodedArgs.forEach(function (a, i) {
          argv[i] = pstr + at;
          str.set(a, at);
          str[at + a.length] = 0;
          at += a.length + 1;
        });
        return 0;
      },
      read: function (fd, ptr, len) {
        var d = fs.fds[fd];
        if (!d) return -1;
        var dst = u8(ptr, len);
        if (d.std === 0) {
          // Like a terminal: the whole line the program starts reading shows in the output.
          if (io.echo && stdinPos < stdin.length && (stdinPos === 0 || stdin[stdinPos - 1] === 10)) {
            var eol = stdin.indexOf(10, stdinPos);
            var line = stdin.subarray(stdinPos, eol < 0 ? stdin.length : eol + 1);
            io.out.chunks.push(eol < 0 ? concatBytes(line, enc.encode('\n')) : line.slice());
            io.out.size += line.length + (eol < 0 ? 1 : 0);
          }
          var n = Math.min(len, stdin.length - stdinPos);
          dst.set(stdin.subarray(stdinPos, stdinPos + n));
          stdinPos += n;
          return n;
        }
        var src = fs.files[d.path] || d.data || new Uint8Array(0);
        var m = Math.max(0, Math.min(len, src.length - d.pos));
        dst.set(src.subarray(d.pos, d.pos + m));
        d.pos += m;
        return m;
      },
      write: function (fd, ptr, len) {
        var d = fs.fds[fd];
        if (!d) return -1;
        var bytes = u8(ptr, len).slice();
        if (d.std === 1 || d.std === 2) {
          var sink = d.std === 1 ? io.out : io.err;
          if (sink.size < MAX_OUTPUT) sink.chunks.push(bytes);
          else io.truncated = true;
          sink.size += len;
          return len;
        }
        if (d.std === 0) return -1;
        var old = d.path != null ? fs.files[d.path] || new Uint8Array(0) : d.data || new Uint8Array(0);
        var next = new Uint8Array(Math.max(old.length, d.pos + len));
        next.set(old);
        next.set(bytes, d.pos);
        d.pos += len;
        if (d.path != null) fs.files[d.path] = next;
        else d.data = next;
        return len;
      },
      open: function (pname, flags) {
        if (!pname) return -1;
        var path = abs(readString(memory, pname));
        var writing = (flags & 3) !== 0;
        if (!writing && !(path in fs.files)) return -1;
        if (writing && ((flags & 512) /* O_TRUNC */ || !(path in fs.files))) fs.files[path] = new Uint8Array(0);
        var pos = flags & 1024 /* O_APPEND */ ? fs.files[path].length : 0;
        return fs.alloc({ path: path, pos: pos });
      },
      close: function (fd) {
        if (fd < 3 || !fs.fds[fd]) return fd < 3 ? 0 : -1;
        fs.fds[fd] = null;
        return 0;
      },
      lseek: function (fd, offset, whence) {
        var d = fs.fds[fd];
        if (!d || d.std !== undefined) return -1;
        var size = (d.path != null ? fs.files[d.path] : d.data || new Uint8Array(0)).length;
        // off_t is a 64-bit long in xcc's wasm target: offsets arrive as BigInt.
        var off = Number(offset);
        d.pos = whence === 0 ? off : whence === 1 ? d.pos + off : size + off;
        return typeof offset === 'bigint' ? BigInt(d.pos) : d.pos;
      },
      unlink: function (pname) {
        delete fs.files[abs(readString(memory, pname))];
        return 0;
      },
      _tmpfile: function () {
        return fs.alloc({ path: null, pos: 0, data: new Uint8Array(0) });
      },
      _getcwd: function (ptr, size) {
        var b = enc.encode(cwd);
        if (b.length + 1 > size) return -34;
        var dst = u8(ptr, b.length + 1);
        dst.set(b);
        dst[b.length] = 0;
        return b.length + 1;
      },
      exit: function (code) {
        throw new ExitCalled(code);
      },
      _memcpy: function (dst, src, n) {
        new Uint8Array(memory.buffer).copyWithin(dst, src, src + n);
      },
      _memset: function (dst, v, n) {
        new Uint8Array(memory.buffer).fill(v, dst, dst + n);
      },
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      atan: Math.atan,
      sqrt: Math.sqrt,
      log: Math.log,
      exp: Math.exp,
      pow: Math.pow,
      fabs: Math.abs,
      floor: Math.floor,
      ceil: Math.ceil,
      fmod: function (a, b) {
        return a % b;
      },
      _teyro_time: function () {
        return io.time;
      },
      // strtod's last step (teyro-libc.c): the C side finds the number, JS rounds it exactly.
      _teyro_parse_double: function (ptr, len) {
        var s = dec.decode(u8(ptr, len)).trim();
        var lower = s.toLowerCase().replace(/^[+-]/, '');
        var neg = s.charAt(0) === '-';
        if (lower === 'inf' || lower === 'infinity') return neg ? -Infinity : Infinity;
        if (lower === 'nan') return NaN;
        var v = Number(s);
        return v === v ? v : 0;
      },
    };

    // Only hand the program the imports it asks for (xcc links what it uses).
    var imports = { c: {} };
    WebAssembly.Module.imports(module).forEach(function (imp) {
      if (imp.module === 'c' && c[imp.name]) imports.c[imp.name] = c[imp.name];
      else if (imp.module === 'c') imports.c[imp.name] = function () {
        throw new Error('This program uses ' + imp.name + '(), which Teyro\'s C runner does not have.');
      };
    });
    var instance = new WebAssembly.Instance(module, imports);
    memory = instance.exports.memory;
    try {
      return instance.exports._start();
    } catch (e) {
      if (e instanceof ExitCalled) return e.code;
      throw e;
    }
  }

  function joinChunks(sink) {
    var all = new Uint8Array(Math.min(sink.size, MAX_OUTPUT + 4096));
    var at = 0;
    sink.chunks.forEach(function (b) {
      var n = Math.min(b.length, all.length - at);
      all.set(b.subarray(0, n), at);
      at += n;
    });
    return dec.decode(all.subarray(0, at));
  }

  /** Flatten libs.json ({usr: {include: {...}}}) into path -> bytes. */
  function flattenLibs(tree, prefix, out) {
    Object.keys(tree).forEach(function (k) {
      var v = tree[k];
      var p = prefix + '/' + k;
      if (typeof v === 'string') out[p] = enc.encode(v);
      else flattenLibs(v, p, out);
    });
    return out;
  }

  function concatBytes(a, b) {
    var out = new Uint8Array(a.length + b.length);
    out.set(a);
    out.set(b, a.length);
    return out;
  }

  /** The source with comments, strings and character constants blanked (same length, same lines). */
  function codeOnly(source) {
    return source.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, function (m) {
      return m.replace(/[^\n]/g, ' ');
    });
  }

  /**
   * This xcc build keeps whole-number constants in 32 bits, so a literal
   * above 4294967295 would silently be wrong. Refuse it, plainly.
   */
  function tooBigLiteral(source) {
    var code = codeOnly(source);
    var re = /(^|[^\w.])(0[xX][0-9a-fA-F]+|[0-9]+)(?![\w.]|[eE][+-]?\d)/g;
    var m;
    while ((m = re.exec(code))) {
      var text = m[2];
      var value = /^0[xX]/.test(text) ? parseInt(text.slice(2), 16) : /^0\d/.test(text) ? parseInt(text, 8) : Number(text);
      if (value > 4294967295) {
        return {
          type: 'Number too big',
          message: text + ' is bigger than this C runner can write in code (4294967295 is the most). Build it from smaller numbers instead, like 5000000LL * 1000.',
          line: code.slice(0, m.index).split('\n').length,
        };
      }
    }
    return null;
  }

  /** The first error in xcc's output: "main.c(4): `;' expected", then the line and a caret. */
  function compileError(text, source) {
    var m = /main\.c\((\d+)\): (.*)/.exec(text);
    if (m) {
      var message = m[2].replace(/`([^']*)'/g, "'$1'").trim();
      var line = Number(m[1]);
      // xcc notices a missing ; at the next token, often on the next line.
      // The fix belongs on the last line of code before it: point there.
      if (message === "';' expected") {
        var lines = codeOnly(source).split('\n');
        var col = (/\n( *)\^/.exec(text) || [null, ''])[1].length;
        if (!lines[line - 1] || !lines[line - 1].slice(0, col).trim()) {
          for (var k = line - 2; k >= 0; k--) {
            if (lines[k].trim()) {
              line = k + 1;
              break;
            }
          }
        }
      }
      return { type: 'Compile error', message: message, line: line };
    }
    var lineOf = function (re) {
      var idx = source.split('\n').findIndex(function (l) {
        return re.test(l);
      });
      return idx < 0 ? null : idx + 1;
    };
    var directive = /unknown directive: (\w+)/.exec(text);
    if (directive) {
      return { type: 'Compile error', message: "'#" + directive[1] + "' isn't something C knows.", line: lineOf(new RegExp('^\\s*#\\s*' + directive[1] + '\\b')) };
    }
    var header = /Cannot open file: (\S+)/.exec(text);
    if (header) {
      return { type: 'Compile error', message: "There's no header called " + header[1] + '.', line: lineOf(/^\s*#\s*include/) };
    }
    // The error turned up only in the library compiled after the program: the
    // program left something open (a { with no }, a ( or a quote).
    if (/\/usr\/lib\/[\w.]+\(\d+\)/.test(text)) {
      return { type: 'Compile error', message: 'Your code ends before something it opened is closed: a { with no }, or a ( with no ).', line: source.replace(/\s+$/, '').split('\n').length };
    }
    var missing = /Import: `([^']+)' not found/.exec(text);
    if (missing) {
      return missing[1] === 'main'
        ? { type: 'Compile error', message: 'There is no main() function. Every C program starts in main.', line: null }
        : { type: 'Compile error', message: missing[1] + '() is declared but never written: it has no body.', line: null };
    }
    var other = text.trim().split('\n')[0] || 'The program did not compile.';
    return { type: 'Compile error', message: other.replace(/`([^']*)'/g, "'$1'"), line: null };
  }

  /** A trap from the running program, as a short name and WebAssembly's own words. */
  function crashError(e) {
    var msg = String((e && e.message) || e);
    var type = 'Crash';
    if (/divide by zero/i.test(msg)) type = 'Division by zero';
    else if (/unrepresentable|integer overflow/i.test(msg)) type = 'Overflow';
    else if (/out of bounds|null function|signature mismatch/i.test(msg)) type = 'Memory error';
    else if (/call stack|too much recursion/i.test(msg)) type = 'Stack overflow';
    else if (/unreachable/i.test(msg)) type = 'Crash';
    else if (/does not have/.test(msg)) type = 'Missing function';
    return { type: type, message: msg, line: null };
  }

  function create(ccWasm, libs) {
    var cc = new WebAssembly.Module(ccWasm);
    var base = flattenLibs(libs, '', {});

    return {
      /**
       * Compile `source` and, if it compiles, run it with `stdinText`.
       *   stdout    everything printed (stdout, then stderr), with each input
       *             line shown where the program read it, like a terminal
       *   error     { type, message, line } when it didn't compile or crashed
       *             (divide by zero, a bad pointer, endless recursion)
       *   compiled  false when it never ran
       *   exitCode  what main returned or exit() was given
       */
      run: function (source, stdinText, opts) {
        opts = opts || {};
        var big = tooBigLiteral(source);
        if (big) return { stdout: '', error: big, compiled: false, exitCode: null, truncated: false };
        var fs = new Files(base);
        fs.files['/home/wasm/main.c'] = enc.encode(source);
        var io = { out: { chunks: [], size: 0 }, err: { chunks: [], size: 0 }, truncated: false, time: opts.time || 1793145600 };
        var code = runProcess(cc, ['cc', '-I/usr/include', '-L/usr/lib', 'main.c'], fs, new Uint8Array(0), io);
        var program = fs.files['/home/wasm/a.wasm'];
        if (code !== 0 || !program) {
          return { stdout: '', error: compileError(joinChunks(io.err) + joinChunks(io.out), source), compiled: false, exitCode: null, truncated: false };
        }
        var runIo = { out: { chunks: [], size: 0 }, err: { chunks: [], size: 0 }, truncated: false, echo: true, time: io.time };
        var exitCode = null;
        var error = null;
        try {
          exitCode = runProcess(new WebAssembly.Module(program), ['main'], fs, enc.encode(stdinText || ''), runIo);
        } catch (e) {
          error = crashError(e);
        }
        // stderr (fprintf(stderr, ...)) shows in the output too, as a terminal would.
        return {
          stdout: joinChunks(runIo.out) + joinChunks(runIo.err),
          error: error,
          compiled: true,
          exitCode: exitCode,
          truncated: runIo.truncated,
        };
      },
    };
  }

  /**
   * Run any xcc-built wasm program with argv and a set of files (path ->
   * bytes), for tooling such as rebuilding cc.wasm (frontend/scripts/c-libs).
   */
  function exec(wasmBytes, args, files, stdinText) {
    var fs = new Files(files);
    var io = { out: { chunks: [], size: 0 }, err: { chunks: [], size: 0 }, truncated: false, seed: 1, time: 0 };
    var code = runProcess(new WebAssembly.Module(wasmBytes), args, fs, enc.encode(stdinText || ''), io);
    return { code: code, stdout: joinChunks(io.out), stderr: joinChunks(io.err), files: fs.files };
  }

  var api = { create: create, exec: exec, flattenLibs: function (libs) { return flattenLibs(libs, '', {}); }, MAX_OUTPUT: MAX_OUTPUT };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TeyroC = api;
})(typeof self !== 'undefined' ? self : this);
