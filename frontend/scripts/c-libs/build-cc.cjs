#!/usr/bin/env node
/**
 * Rebuilds public/c/cc.wasm, the C compiler the C runner uses, from xcc's
 * source, using an existing cc.wasm as the compiler (xcc compiles itself).
 * See README.md in this folder for the full recipe.
 *
 *   node scripts/c-libs/build-cc.cjs <xcc source dir> <compiler.wasm> <out.wasm>
 *
 * The C library it links is public/c/libs.json (build-c-libs.mjs), so the
 * compiler's own strtod (float literals) is Teyro's exact one.
 */
const fs = require('fs');
const path = require('path');

const [srcDir, compiler, out] = process.argv.slice(2);
if (!srcDir || !compiler || !out) {
  console.error('usage: node build-cc.cjs <xcc source dir> <compiler.wasm> <out.wasm>');
  process.exit(1);
}
const C = path.resolve(__dirname, '..', '..', 'public', 'c');
const host = require(path.join(C, 'c-host.js'));
const SRC = path.resolve(srcDir);
const enc = new TextEncoder();

const files = host.flattenLibs(JSON.parse(fs.readFileSync(path.join(C, 'libs.json'), 'utf8')));
// xcc's full headers fill in what the browser libs leave out (alloca.h, ...).
const addHeaders = (dir, rel) => {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const r = rel ? `${rel}/${f}` : f;
    if (fs.statSync(p).isDirectory()) addHeaders(p, r);
    else if (!files[`/usr/include/${r}`]) files[`/usr/include/${r}`] = enc.encode(fs.readFileSync(p, 'utf8'));
  }
};
addHeaders(path.join(SRC, 'include'), '');
for (const dir of ['src', 'src/cc', 'src/cpp', 'src/util', 'wasm/src']) {
  for (const f of fs.readdirSync(path.join(SRC, dir))) {
    if (/\.(c|h)$/.test(f)) files[`/home/wasm/xcc/${dir}/${f}`] = enc.encode(fs.readFileSync(path.join(SRC, dir, f), 'utf8'));
  }
}
// The same sources as xcc's wasm/Makefile (WCC_SRCS).
const srcs = [
  'wasm/src/gen_wasm.c', 'wasm/src/traverse.c', 'wasm/src/wasm_util.c', 'wasm/src/wcc.c', 'wasm/src/wcc_util.c',
  'src/cc/lexer.c', 'src/cc/type.c', 'src/cc/var.c', 'src/cc/ast.c', 'src/cc/parser.c', 'src/cc/parser_expr.c',
  'src/cpp/preprocessor.c', 'src/cpp/pp_parser.c', 'src/cpp/macro.c',
  'src/util/util.c', 'src/util/table.c',
].map((s) => `/home/wasm/xcc/${s}`);
const args = ['cc', '-I/usr/include', '-L/usr/lib', '-I/home/wasm/xcc/src/cc', '-I/home/wasm/xcc/src/cpp', '-I/home/wasm/xcc/src/util', '-o/home/wasm/out.wasm', ...srcs];

const started = Date.now();
const r = host.exec(fs.readFileSync(compiler), args, files);
console.log(`exit ${r.code} (${Math.round((Date.now() - started) / 1000)} s)`);
if (r.stdout) console.log(r.stdout);
if (r.stderr) console.log(r.stderr);
const built = r.files['/home/wasm/out.wasm'];
if (r.code !== 0 || !built) process.exit(1);
fs.writeFileSync(out, built);
console.log(`wrote ${out} (${built.length} bytes)`);
