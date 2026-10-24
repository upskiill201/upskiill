# Teyro's C runner: where the files come from

The C runner (`public/c`) compiles and runs learners' C in the browser, and
`npm run originals` uses the very same files to check every C lesson
(`backend/src/originals/originals-c-verify.ts`).

| File | What it is |
|---|---|
| `public/c/cc.wasm` | xcc, a small C compiler, built to WebAssembly (MIT, github.com/tyfkda/xcc). Patched and rebuilt, see below. |
| `public/c/libs.json` | The C headers and library every program is compiled with. Built by `scripts/build-c-libs.mjs`. |
| `public/c/c-host.js` | Runs the compiler and the program: an in-memory file system, stdin/stdout, the time and number helpers, plain error shapes. |
| `public/c/runner.worker.js` | The browser's Web Worker around `c-host.js`. |

## libs.json

`c-libs/xcc-libs.json` is xcc's own browser library, unchanged (gh-pages,
commit acfc8a2b). `build-c-libs.mjs` renames xcc's weaker functions out of
the way and appends `c-libs/teyro-libc.c`: a printf that prints exactly what
a real C library prints (exact decimal rounding), every common conversion,
scanf/sscanf/fscanf, ungetc, feof, putchar, rand/srand (the C standard's
sample generator), abs, strtok, a strtod/strtol that round and parse like a
real libc, and time(). xcc compiles the library together with each program,
so everything in `teyro-libc.c` is named `__teyro_...` unless it's a
standard function.

```bash
node scripts/build-c-libs.mjs
```

## cc.wasm

xcc's prebuilt browser compiler (gh-pages, 2022) had a stack-frame bug: a
4-byte local after an 8-byte one (`int` after `double`) overlapped it when
its address was taken, so `scanf("%lf", &price)` lost values. The fix is
`xcc-frame-fix.patch` (two lines in `wasm/src/gen_wasm.c`).

Recipe (xcc compiles itself, as its own `make gen2` does):

1. Get xcc at commit `d394a3a5cfb77565efaf4b05349543b51a374f7d` (the source of the 2022 gh-pages build) and apply `xcc-frame-fix.patch`.
2. Build with the old compiler: `node scripts/c-libs/build-cc.cjs <xcc> <old cc.wasm> gen2.wasm`
3. Build again with the result: `build-cc.cjs <xcc> gen2.wasm gen3.wasm`, then once more to `gen4.wasm`.
4. gen3 and gen4 must be byte-identical (a fixed point). gen3 is `public/c/cc.wasm`.

Checked on 2026-10-24: gen3 = gen4, sha256 `347321f1cbcc3c4fde515f5af3d8c7ae273832c4ae368fa2b806292ee699775c`; xcc's own `tests/valtest.c` passes 193/193 with it.

## Known limits (lessons work around them)

- `int`, `long` and pointers are 4 bytes; `long long` and `double` are 8.
- Whole-number literals above 4294967295 are refused with a plain message (xcc keeps constants in 32 bits).
- Files exist for one run only.
- Each run compiles the library too: about half a second on a laptop.
