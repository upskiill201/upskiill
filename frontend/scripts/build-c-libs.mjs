#!/usr/bin/env node
/**
 * Builds public/c/libs.json, the C headers and library that Teyro's C runner
 * compiles every program against (public/c/c-host.js).
 *
 * Source: xcc's own libs (scripts/c-libs/xcc-libs.json, from
 * github.com/tyfkda/xcc gh-pages @ acfc8a2b, MIT) plus Teyro's additions
 * (scripts/c-libs/teyro-libc.c): a printf that rounds, scanf, ungetc, rand,
 * and the rest of what beginner C expects. xcc's weaker versions are renamed
 * out of the way here, never edited by hand.
 *
 *   node scripts/build-c-libs.mjs
 *
 * Re-run after changing teyro-libc.c, then run `npm run originals` for every
 * C track: the checker compiles every lesson's code against the new file.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const libs = JSON.parse(readFileSync(join(here, 'c-libs', 'xcc-libs.json'), 'utf8'));
const extra = readFileSync(join(here, 'c-libs', 'teyro-libc.c'), 'utf8');
const inc = libs.usr.include;
const lib = libs.usr.lib;

function must(text, find, label) {
  if (!text.includes(find)) throw new Error(`build-c-libs: "${label}" not found; did xcc's libs change?`);
  return text;
}

/** Rename one of xcc's definitions so Teyro's replaces it. */
function rename(text, signature, label) {
  must(text, signature, label);
  return text.replace(signature, signature.replace(/\b(\w+)\(/, '__xcc_$1('));
}

// ─── The library ─────────────────────────────────────────────────────────
let libc = lib['libc.c'];
libc = rename(libc, 'int fgetc(FILE *fp) {', 'fgetc');
libc = rename(libc, 'FILE *fdopen(int fd, const char *mode) {', 'fdopen');
libc = rename(libc, 'int vfprintf(FILE *fp, const char *fmt, va_list ap) {', 'vfprintf');
libc = rename(libc, 'int atoi(const char *s) {', 'atoi');
libc = rename(libc, 'double strtod(const char* /*restrict*/ p, char ** /*restrict*/ pp) {', 'strtod');
libc = rename(libc, 'long strtol(const char *p, char **pp, int base) {', 'strtol');
libc = rename(libc, 'unsigned long strtoul(const char *p, char **pp, int base) {', 'strtoul');
libc = rename(libc, '\nvsnprintf(char *out, size_t n, const char *fmt_, va_list ap)\n{', 'vsnprintf');
lib['libc.c'] = `${libc}\n${extra}`;

// One character of pushback for scanf/ungetc, and end-of-file for feof.
lib['_file.h'] = must(lib['_file.h'], 'int fd;', '_file.h').replace('int fd;', 'int fd;\n  int ungot;  // pushed-back character + 1, or 0\n  int eof;');

// ─── Headers ─────────────────────────────────────────────────────────────
function add(name, lines) {
  inc[name] = `${must(inc[name], '#pragma once', name)}\n// Teyro additions (scripts/c-libs/teyro-libc.c)\n${lines.join('\n')}\n`;
}

add('stdio.h', [
  'int ungetc(int c, FILE *fp);',
  'int feof(FILE *fp);',
  'int ferror(FILE *fp);',
  'void clearerr(FILE *fp);',
  'int putchar(int c);',
  'int putc(int c, FILE *fp);',
  'int scanf(const char *fmt, ...);',
  'int fscanf(FILE *fp, const char *fmt, ...);',
  'int sscanf(const char *str, const char *fmt, ...);',
  'int vscanf(const char *fmt, va_list ap);',
  'int vfscanf(FILE *fp, const char *fmt, va_list ap);',
  'int vsscanf(const char *str, const char *fmt, va_list ap);',
]);
add('stdlib.h', [
  '#define EXIT_SUCCESS  (0)',
  '#define EXIT_FAILURE  (1)',
  '#define RAND_MAX      (32767)',
  'long atol(const char *s);',
  'long long atoll(const char *s);',
  'long long strtoll(const char *s, char **end, int base);',
  'double atof(const char *s);',
  'int abs(int x);',
  'long labs(long x);',
  'long long llabs(long long x);',
  'int rand(void);',
  'void srand(unsigned int seed);',
]);
add('ctype.h', [
  'int islower(int c);',
  'int isupper(int c);',
  'int isprint(int c);',
  'int isgraph(int c);',
  'int iscntrl(int c);',
  'int ispunct(int c);',
]);
add('string.h', [
  'char *strtok(char *s, const char *delim);',
  'size_t strspn(const char *s, const char *accept);',
  'size_t strcspn(const char *s, const char *reject);',
]);
add('math.h', [
  'double round(double x);',
  'double trunc(double x);',
  'double fmin(double a, double b);',
  'double fmax(double a, double b);',
  'double log10(double x);',
  'double log2(double x);',
]);
add('limits.h', [
  '#define SCHAR_MIN  (-128)',
  '#define SCHAR_MAX  (127)',
  '#define CHAR_MIN   (-128)',
  '#define CHAR_MAX   (127)',
  '#ifndef LONG_MAX',
  '#define LONG_MIN   (-2147483647L - 1)',
  '#define LONG_MAX   (2147483647L)',
  '#define ULONG_MAX  (4294967295UL)',
  '#endif',
]);
inc['time.h'] = [
  '#pragma once',
  '',
  '// Teyro: time() only (scripts/c-libs/teyro-libc.c).',
  '#include "stddef.h"',
  '',
  'typedef long time_t;',
  '',
  'time_t time(time_t *t);',
  '',
].join('\n');

const out = join(here, '..', 'public', 'c', 'libs.json');
writeFileSync(out, JSON.stringify(libs));
console.log(`Wrote ${out} (${Math.round(JSON.stringify(libs).length / 1024)} KB)`);
