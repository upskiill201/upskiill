// ─── Teyro additions to xcc's libc (frontend/scripts/build-c-libs.mjs) ───
// Beginner C needs these to behave like a real C library: printf that
// rounds (%.2f of 3.445 must not print 3.44 because of truncation), every
// common conversion (%u %ld %lld %e %g %-5d ...), scanf, ungetc, rand.
// xcc's own vsnprintf, atoi, fgetc, fdopen and vfprintf are renamed out of
// the way by the build script and replaced here.

#include "ctype.h"
#include "math.h"
#include "stdarg.h"
#include "stddef.h"
#include "stdint.h"
#include "stdio.h"
#include "stdlib.h"
#include "string.h"
#include "strings.h"
#include "time.h"
#include "unistd.h"

#include "./_file.h"

// ─── Input ───────────────────────────────────────────────────────────────

int fgetc(FILE *fp) {
  if (fp == NULL)
    return EOF;
  if (fp->ungot) {
    int c = fp->ungot - 1;
    fp->ungot = 0;
    return c;
  }
  unsigned char c;
  int len = read(fp->fd, &c, 1);
  if (len != 1) {
    fp->eof = 1;
    return EOF;
  }
  return c;
}

int ungetc(int c, FILE *fp) {
  if (c == EOF || fp == NULL)
    return EOF;
  fp->ungot = (unsigned char)c + 1;
  fp->eof = 0;
  return c;
}

int feof(FILE *fp) {
  return fp != NULL && fp->eof && !fp->ungot;
}

int ferror(FILE *fp) {
  return 0;
}

void clearerr(FILE *fp) {
  if (fp != NULL)
    fp->eof = 0;
}

FILE *fdopen(int fd, const char *mode) {
  FILE *fp = malloc(sizeof(*fp));
  if (fp != NULL) {
    fp->fd = fd;
    fp->ungot = 0;
    fp->eof = 0;
  }
  return fp;
}

int putchar(int c) {
  return fputc(c, stdout);
}

int putc(int c, FILE *fp) {
  return fputc(c, fp);
}

// ─── printf ──────────────────────────────────────────────────────────────

typedef struct {
  char *out;
  size_t cap;  // bytes that may be written (excluding the final '\0')
  size_t len;  // bytes that would have been written
} __teyro_Sink;

static void __teyro_sink_put(__teyro_Sink *s, char c) {
  if (s->len < s->cap)
    s->out[s->len] = c;
  s->len++;
}

static void __teyro_sink_rep(__teyro_Sink *s, char c, int n) {
  for (; n > 0; --n)
    __teyro_sink_put(s, c);
}

static void __teyro_sink_str(__teyro_Sink *s, const char *p, int n) {
  for (int i = 0; i < n; ++i)
    __teyro_sink_put(s, p[i]);
}

// Lay out one converted field: sign/prefix, zero or space padding, digits.
static void __teyro_emit_field(__teyro_Sink *s, const char *prefix, const char *body, int bodylen,
                       int width, int left, int zero) {
  int plen = (int)strlen(prefix);
  int pad = width - plen - bodylen;
  if (pad < 0)
    pad = 0;
  if (left) {
    __teyro_sink_str(s, prefix, plen);
    __teyro_sink_str(s, body, bodylen);
    __teyro_sink_rep(s, ' ', pad);
  } else if (zero) {
    __teyro_sink_str(s, prefix, plen);
    __teyro_sink_rep(s, '0', pad);
    __teyro_sink_str(s, body, bodylen);
  } else {
    __teyro_sink_rep(s, ' ', pad);
    __teyro_sink_str(s, prefix, plen);
    __teyro_sink_str(s, body, bodylen);
  }
}

static int __teyro_utoa_base(char *buf, unsigned long long x, int base, int upper) {
  const char *digits = upper ? "0123456789ABCDEF" : "0123456789abcdef";
  char tmp[72];
  int n = 0;
  do {
    tmp[n++] = digits[x % base];
    x /= base;
  } while (x != 0);
  for (int i = 0; i < n; ++i)
    buf[i] = tmp[n - 1 - i];
  return n;
}

// ─── Exact float to decimal ──────────────────────────────────────────────
// printf must print what a real C library prints, digit for digit: 2.675 is
// really 2.67499999..., so "%.2f" gives 2.67, and 0.125 is exactly half, so
// it rounds to even (0.12). Multiplying by 100 first would get both wrong,
// so the digits come from the double's exact value, in big integers.

#define __teyro_BIG_LIMBS 40  // 1280 bits: room for 2^1024 and a 2^-1074 fraction

typedef struct {
  unsigned int v[__teyro_BIG_LIMBS];
  int n;  // limbs in use, little-endian
} __teyro_Big;

static void __teyro_big_trim(__teyro_Big *b) {
  while (b->n > 0 && b->v[b->n - 1] == 0)
    --b->n;
}

static void __teyro_big_set(__teyro_Big *b, unsigned int hi, unsigned int lo) {
  b->v[0] = lo;
  b->v[1] = hi;
  b->n = 2;
  __teyro_big_trim(b);
}

static void __teyro_big_shl(__teyro_Big *b, int bits) {
  if (b->n == 0)
    return;
  int limbs = bits / 32, sh = bits % 32;
  unsigned int out[__teyro_BIG_LIMBS];
  memset(out, 0, sizeof(out));
  for (int i = 0; i < b->n; ++i) {
    unsigned long long w = (unsigned long long)b->v[i] << sh;
    if (i + limbs < __teyro_BIG_LIMBS)
      out[i + limbs] |= (unsigned int)w;
    if (i + limbs + 1 < __teyro_BIG_LIMBS)
      out[i + limbs + 1] |= (unsigned int)(w >> 32);
  }
  memcpy(b->v, out, sizeof(out));
  b->n = __teyro_BIG_LIMBS;
  __teyro_big_trim(b);
}

static unsigned int __teyro_big_divmod(__teyro_Big *b, unsigned int d) {
  unsigned long long r = 0;
  for (int i = b->n - 1; i >= 0; --i) {
    unsigned long long cur = (r << 32) | b->v[i];
    b->v[i] = (unsigned int)(cur / d);
    r = cur % d;
  }
  __teyro_big_trim(b);
  return (unsigned int)r;
}

static void __teyro_big_mul(__teyro_Big *b, unsigned int m) {
  unsigned long long carry = 0;
  for (int i = 0; i < b->n; ++i) {
    unsigned long long cur = (unsigned long long)b->v[i] * m + carry;
    b->v[i] = (unsigned int)cur;
    carry = cur >> 32;
  }
  if (carry != 0 && b->n < __teyro_BIG_LIMBS)
    b->v[b->n++] = (unsigned int)carry;
}

// The bits at position >= k (a small number), removed from b.
static unsigned int __teyro_big_take_high(__teyro_Big *b, int k) {
  int li = k / 32, sh = k % 32;
  if (li >= b->n)
    return 0;
  unsigned long long hi = 0;
  for (int i = b->n - 1; i >= li; --i)
    hi = (hi << 32) | b->v[i];
  hi >>= sh;
  b->v[li] &= sh ? ((1u << sh) - 1) : 0;
  for (int i = li + 1; i < b->n; ++i)
    b->v[i] = 0;
  b->n = li + 1;
  __teyro_big_trim(b);
  return (unsigned int)hi;
}

// Exact digits of a finite x >= 0: the integer digits (at least one), then
// exactly nfrac fraction digits. *sticky is 1 if anything nonzero is left
// after them. Returns the number of digits written.
static int __teyro_exact_digits(double x, int nfrac, char *d, int *nint, int *sticky) {
  unsigned int w[2];
  memcpy(w, &x, sizeof(w));  // little-endian: w[1] holds sign, exponent, top of mantissa
  int bexp = (w[1] >> 20) & 0x7ff;
  unsigned int mhi = w[1] & 0xfffff;
  if (bexp != 0)
    mhi |= 0x100000;
  int e = bexp == 0 ? -1074 : bexp - 1075;

  __teyro_Big ip, fp;
  int k = 0;
  if (e >= 0) {
    __teyro_big_set(&ip, mhi, w[0]);
    __teyro_big_shl(&ip, e);
    fp.n = 0;
  } else {
    k = -e;
    // Integer part: mantissa >> k. Fraction: the low k bits.
    __teyro_big_set(&fp, mhi, w[0]);
    ip = fp;
    if (k >= 64) {
      ip.n = 0;
    } else {
      // ip = m >> k
      unsigned long long m = ((unsigned long long)mhi << 32) | w[0];
      unsigned long long q = m >> k;
      __teyro_big_set(&ip, (unsigned int)(q >> 32), (unsigned int)q);
      unsigned long long one = 1;
      unsigned long long r = m & ((one << k) - one);
      __teyro_big_set(&fp, (unsigned int)(r >> 32), (unsigned int)r);
    }
  }

  // Integer digits, least significant first, then reversed.
  int n = 0;
  if (ip.n == 0) {
    d[n++] = '0';
  } else {
    while (ip.n > 0)
      d[n++] = '0' + __teyro_big_divmod(&ip, 10);
    for (int i = 0; i < n / 2; ++i) {
      char t = d[i];
      d[i] = d[n - 1 - i];
      d[n - 1 - i] = t;
    }
  }
  *nint = n;
  for (int i = 0; i < nfrac; ++i) {
    if (fp.n == 0) {
      d[n++] = '0';
      continue;
    }
    __teyro_big_mul(&fp, 10);
    d[n++] = '0' + __teyro_big_take_high(&fp, k);
  }
  *sticky = fp.n != 0;
  return n;
}

// Keep the first `keep` digits of d[0..len), rounding half to even on the
// exact value. Returns 1 if a carry made the number one digit longer (d now
// starts with an extra '1').
static int __teyro_round_digits(char *d, int len, int keep, int sticky) {
  if (keep >= len)
    return 0;
  int rest = sticky;
  for (int i = keep + 1; i < len && !rest; ++i)
    if (d[i] != '0')
      rest = 1;
  char r = d[keep];
  int odd = keep > 0 && ((d[keep - 1] - '0') & 1);
  if (!(r > '5' || (r == '5' && (rest || odd))))
    return 0;
  int i = keep - 1;
  while (i >= 0 && d[i] == '9') {
    d[i] = '0';
    --i;
  }
  if (i >= 0) {
    d[i]++;
    return 0;
  }
  memmove(d + 1, d, keep);
  d[0] = '1';
  return 1;
}

#define __teyro_FLOAT_DIGITS 1200

// x >= 0 with `prec` decimals: "123.46".
static int __teyro_ftoa_fixed(char *buf, double x, int prec, int alt) {
  static char d[__teyro_FLOAT_DIGITS];
  if (prec > 40)
    prec = 40;
  int nint, sticky;
  int len = __teyro_exact_digits(x, prec + 1, d, &nint, &sticky);
  nint += __teyro_round_digits(d, len, nint + prec, sticky);
  int o = 0;
  for (int i = 0; i < nint; ++i)
    buf[o++] = d[i];
  if (prec > 0 || alt)
    buf[o++] = '.';
  for (int i = 0; i < prec; ++i)
    buf[o++] = d[nint + i];
  return o;
}

// The first nsig significant digits of x > 0, rounded, and the decimal
// exponent of the first one (x = d.ddd * 10^X).
static void __teyro_sig_digits(double x, int nsig, char *sig, int *X) {
  static char d[__teyro_FLOAT_DIGITS];
  int nint, sticky;
  int len, s;
  if (x >= 1) {
    __teyro_exact_digits(x, 0, d, &nint, &sticky);
    int need = nsig + 1 - nint;
    len = __teyro_exact_digits(x, need > 0 ? need : 0, d, &nint, &sticky);
    s = 0;
    *X = nint - 1;
  } else {
    len = __teyro_exact_digits(x, __teyro_FLOAT_DIGITS - 60, d, &nint, &sticky);
    s = nint;
    while (s < len && d[s] == '0')
      ++s;
    *X = nint - 1 - s;
  }
  if (__teyro_round_digits(d + s, len - s, nsig, sticky))
    *X += 1;
  for (int i = 0; i < nsig; ++i)
    sig[i] = s + i < len ? d[s + i] : '0';
}

static int __teyro_put_exp(char *buf, int X, int upper) {
  int o = 0;
  buf[o++] = upper ? 'E' : 'e';
  buf[o++] = X < 0 ? '-' : '+';
  if (X < 0)
    X = -X;
  if (X < 10)
    buf[o++] = '0';
  o += __teyro_utoa_base(buf + o, (unsigned long long)X, 10, 0);
  return o;
}

// x >= 0 as d.ddde+XX with `prec` decimals.
static int __teyro_ftoa_exp(char *buf, double x, int prec, int alt, int upper) {
  char sig[48];
  int X = 0;
  if (prec > 40)
    prec = 40;
  if (x == 0)
    memset(sig, '0', prec + 1);
  else
    __teyro_sig_digits(x, prec + 1, sig, &X);
  int o = 0;
  buf[o++] = sig[0];
  if (prec > 0 || alt)
    buf[o++] = '.';
  for (int i = 1; i <= prec; ++i)
    buf[o++] = sig[i];
  o += __teyro_put_exp(buf + o, X, upper);
  return o;
}

// The exponent %e would show for x with p significant digits (for %g).
static int __teyro_exp_for_g(double x, int p) {
  char sig[48];
  int X = 0;
  if (x != 0)
    __teyro_sig_digits(x, p > 40 ? 40 : p, sig, &X);
  return X;
}

static int __teyro_strip_zeros(char *buf, int n) {
  // Remove trailing zeros (and a trailing '.') before any exponent.
  int epos = n;
  for (int i = 0; i < n; ++i)
    if (buf[i] == 'e' || buf[i] == 'E') {
      epos = i;
      break;
    }
  int dot = -1;
  for (int i = 0; i < epos; ++i)
    if (buf[i] == '.')
      dot = i;
  if (dot < 0)
    return n;
  int end = epos;
  while (end > dot + 1 && buf[end - 1] == '0')
    --end;
  if (end == dot + 1)
    --end;
  int o = end;
  for (int i = epos; i < n; ++i)
    buf[o++] = buf[i];
  return o;
}

int vsnprintf(char *out, size_t n, const char *fmt, va_list ap) {
  __teyro_Sink s;
  s.out = out;
  s.cap = n > 0 ? n - 1 : 0;
  s.len = 0;
  char buf[400];

  for (const char *p = fmt; *p != '\0'; ++p) {
    if (*p != '%') {
      __teyro_sink_put(&s, *p);
      continue;
    }
    ++p;
    int left = 0, plus = 0, space = 0, zero = 0, alt = 0;
    for (;; ++p) {
      if (*p == '-')
        left = 1;
      else if (*p == '+')
        plus = 1;
      else if (*p == ' ')
        space = 1;
      else if (*p == '0')
        zero = 1;
      else if (*p == '#')
        alt = 1;
      else
        break;
    }
    int width = 0;
    if (*p == '*') {
      width = va_arg(ap, int);
      if (width < 0) {
        left = 1;
        width = -width;
      }
      ++p;
    } else {
      while (isdigit(*p))
        width = width * 10 + (*p++ - '0');
    }
    int prec = -1;
    if (*p == '.') {
      ++p;
      prec = 0;
      if (*p == '*') {
        prec = va_arg(ap, int);
        ++p;
      } else {
        while (isdigit(*p))
          prec = prec * 10 + (*p++ - '0');
      }
    }
    int lng = 0;  // 0 int, 1 long, 2 long long, -1 short, -2 char
    for (;; ++p) {
      if (*p == 'l')
        ++lng;
      else if (*p == 'h')
        --lng;
      else if (*p == 'z' || *p == 'j' || *p == 't')
        lng = 1;
      else if (*p == 'L')
        ;
      else
        break;
    }
    if (left)
      zero = 0;
    char c = *p;
    if (c == '\0')
      break;
    switch (c) {
    case 'd':
    case 'i': {
      long long v;
      if (lng >= 2)
        v = va_arg(ap, long long);
      else if (lng == 1)
        v = va_arg(ap, long);
      else
        v = va_arg(ap, int);
      if (lng == -1)
        v = (short)v;
      else if (lng <= -2)
        v = (signed char)v;
      unsigned long long u = v < 0 ? -(unsigned long long)v : (unsigned long long)v;
      int len = (prec == 0 && u == 0) ? 0 : __teyro_utoa_base(buf, u, 10, 0);
      if (prec > len) {
        memmove(buf + (prec - len), buf, len);
        memset(buf, '0', prec - len);
        len = prec;
      }
      __teyro_emit_field(&s, v < 0 ? "-" : plus ? "+" : space ? " " : "", buf, len, width, left, zero && prec < 0);
      break;
    }
    case 'u':
    case 'x':
    case 'X':
    case 'o': {
      unsigned long long u;
      if (lng >= 2)
        u = va_arg(ap, unsigned long long);
      else if (lng == 1)
        u = va_arg(ap, unsigned long);
      else
        u = va_arg(ap, unsigned int);
      if (lng == -1)
        u = (unsigned short)u;
      else if (lng <= -2)
        u = (unsigned char)u;
      int base = c == 'u' ? 10 : c == 'o' ? 8 : 16;
      int len = (prec == 0 && u == 0) ? 0 : __teyro_utoa_base(buf, u, base, c == 'X');
      if (prec > len) {
        memmove(buf + (prec - len), buf, len);
        memset(buf, '0', prec - len);
        len = prec;
      }
      const char *prefix = "";
      if (alt && u != 0)
        prefix = c == 'x' ? "0x" : c == 'X' ? "0X" : c == 'o' ? "0" : "";
      __teyro_emit_field(&s, prefix, buf, len, width, left, zero && prec < 0);
      break;
    }
    case 'p': {
      void *ptr = va_arg(ap, void *);
      int len = __teyro_utoa_base(buf, (unsigned long long)(uintptr_t)ptr, 16, 0);
      __teyro_emit_field(&s, "0x", buf, len, width, left, 0);
      break;
    }
    case 'c': {
      buf[0] = (char)va_arg(ap, int);
      __teyro_emit_field(&s, "", buf, 1, width, left, 0);
      break;
    }
    case 's': {
      const char *str = va_arg(ap, const char *);
      if (str == NULL)
        str = "(null)";
      int len = 0;
      while (str[len] != '\0' && (prec < 0 || len < prec))
        ++len;
      __teyro_emit_field(&s, "", str, len, width, left, 0);
      break;
    }
    case 'f':
    case 'F':
    case 'e':
    case 'E':
    case 'g':
    case 'G': {
      double v = va_arg(ap, double);
      const char *sign = "";
      if (v < 0 || (v == 0 && 1 / v < 0)) {
        sign = "-";
        v = -v;
      } else if (plus) {
        sign = "+";
      } else if (space) {
        sign = " ";
      }
      int len;
      if (v != v) {
        len = 3;
        memcpy(buf, (c >= 'a') ? "nan" : "NAN", 3);
        zero = 0;
      } else if (v > 1.7976931348623157e308) {
        len = 3;
        memcpy(buf, (c >= 'a') ? "inf" : "INF", 3);
        zero = 0;
      } else if (c == 'f' || c == 'F') {
        len = __teyro_ftoa_fixed(buf, v, prec < 0 ? 6 : prec, alt);
      } else if (c == 'e' || c == 'E') {
        len = __teyro_ftoa_exp(buf, v, prec < 0 ? 6 : prec, alt, c == 'E');
      } else {
        int P = prec < 0 ? 6 : prec == 0 ? 1 : prec;
        int X = __teyro_exp_for_g(v, P);
        if (P > X && X >= -4)
          len = __teyro_ftoa_fixed(buf, v, P - 1 - X, alt);
        else
          len = __teyro_ftoa_exp(buf, v, P - 1, alt, c == 'G');
        if (!alt)
          len = __teyro_strip_zeros(buf, len);
      }
      __teyro_emit_field(&s, sign, buf, len, width, left, zero);
      break;
    }
    case 'n': {
      int *pn = va_arg(ap, int *);
      if (pn != NULL)
        *pn = (int)s.len;
      break;
    }
    case '%':
      __teyro_sink_put(&s, '%');
      break;
    default:
      // Unknown conversion: print it as written, so it's visible.
      __teyro_sink_put(&s, '%');
      __teyro_sink_put(&s, c);
      break;
    }
  }
  if (n > 0)
    out[s.len < s.cap ? s.len : s.cap] = '\0';
  return (int)s.len;
}

int vfprintf(FILE *fp, const char *fmt, va_list ap) {
  char small[1024];
  va_list ap2;
  va_copy(ap2, ap);
  int len = vsnprintf(small, sizeof(small), fmt, ap);
  if (len < (int)sizeof(small)) {
    va_end(ap2);
    return write(fileno(fp), small, len);
  }
  char *big = malloc(len + 1);
  if (big == NULL) {
    va_end(ap2);
    return write(fileno(fp), small, sizeof(small) - 1);
  }
  vsnprintf(big, len + 1, fmt, ap2);
  va_end(ap2);
  int w = write(fileno(fp), big, len);
  free(big);
  return w;
}

// ─── scanf ───────────────────────────────────────────────────────────────

// A character source: a FILE (with one character of pushback) or a string.
typedef struct {
  FILE *fp;
  const char *str;
  int pos;
  int count;  // characters consumed
} __teyro_Src;

static int __teyro_src_get(__teyro_Src *s) {
  int c;
  if (s->fp != NULL)
    c = fgetc(s->fp);
  else
    c = s->str[s->pos] != '\0' ? (unsigned char)s->str[s->pos++] : EOF;
  if (c != EOF)
    s->count++;
  return c;
}

static void __teyro_src_unget(__teyro_Src *s, int c) {
  if (c == EOF)
    return;
  s->count--;
  if (s->fp != NULL)
    ungetc(c, s->fp);
  else
    s->pos--;
}

static int __teyro_vscan(__teyro_Src *in, const char *fmt, va_list ap) {
  int assigned = 0;
  int any = 0;  // did any conversion get input (for EOF vs 0)
  // Declared once, up here: xcc (2022) can mix up a double and a long long
  // that live in sibling blocks, and scanf("%lf %d") then stored garbage.
  char tok[80];
  long long v;
  double fv;
  for (const char *p = fmt; *p != '\0'; ++p) {
    if (isspace((unsigned char)*p)) {
      int c;
      do
        c = __teyro_src_get(in);
      while (c != EOF && isspace(c));
      __teyro_src_unget(in, c);
      continue;
    }
    if (*p != '%' || p[1] == '%') {
      if (*p == '%')
        ++p;
      int c = __teyro_src_get(in);
      if (c != (unsigned char)*p) {
        __teyro_src_unget(in, c);
        return (c == EOF && !any) ? EOF : assigned;
      }
      continue;
    }
    ++p;
    int skip = 0;
    if (*p == '*') {
      skip = 1;
      ++p;
    }
    int width = 0;
    while (isdigit((unsigned char)*p))
      width = width * 10 + (*p++ - '0');
    int lng = 0;
    for (;; ++p) {
      if (*p == 'l')
        ++lng;
      else if (*p == 'h')
        --lng;
      else if (*p == 'z' || *p == 'j' || *p == 'L')
        lng = 1;
      else
        break;
    }
    char conv = *p;
    if (conv == '\0')
      break;

    if (conv == 'n') {
      if (!skip)
        { int *pn = va_arg(ap, int *); *pn = in->count; }
      continue;
    }

    int c;
    if (conv != 'c' && conv != '[') {
      do
        c = __teyro_src_get(in);
      while (c != EOF && isspace(c));
      if (c == EOF)
        return any ? assigned : EOF;
      __teyro_src_unget(in, c);
    }
    any = 1;

    if (conv == 'c') {
      int w = width > 0 ? width : 1;
      char *dst = skip ? NULL : va_arg(ap, char *);
      for (int i = 0; i < w; ++i) {
        c = __teyro_src_get(in);
        if (c == EOF)
          return i == 0 && assigned == 0 ? EOF : assigned;
        if (dst)
          dst[i] = (char)c;
      }
      if (!skip)
        ++assigned;
    } else if (conv == 's') {
      char *dst = skip ? NULL : va_arg(ap, char *);
      int i = 0;
      while ((width == 0 || i < width) && (c = __teyro_src_get(in)) != EOF && !isspace(c)) {
        if (dst)
          dst[i] = (char)c;
        ++i;
      }
      if (c != EOF && (width == 0 || i < width))
        __teyro_src_unget(in, c);
      if (dst)
        dst[i] = '\0';
      if (!skip)
        ++assigned;
    } else if (conv == '[') {
      ++p;
      int negate = 0;
      if (*p == '^') {
        negate = 1;
        ++p;
      }
      char set[256];
      memset(set, 0, sizeof(set));
      if (*p == ']') {
        set[(unsigned char)']'] = 1;
        ++p;
      }
      for (; *p != '\0' && *p != ']'; ++p) {
        if (p[1] == '-' && p[2] != ']' && p[2] != '\0') {
          for (int k = (unsigned char)p[0]; k <= (unsigned char)p[2]; ++k)
            set[k] = 1;
          p += 2;
        } else {
          set[(unsigned char)*p] = 1;
        }
      }
      char *dst = skip ? NULL : va_arg(ap, char *);
      int i = 0;
      while ((width == 0 || i < width) && (c = __teyro_src_get(in)) != EOF && (set[c] != 0) != negate) {
        if (dst)
          dst[i] = (char)c;
        ++i;
      }
      if (c != EOF && (width == 0 || i < width))
        __teyro_src_unget(in, c);
      if (i == 0)
        return assigned;
      if (dst)
        dst[i] = '\0';
      if (!skip)
        ++assigned;
      if (*p == '\0')
        break;
    } else if (conv == 'd' || conv == 'i' || conv == 'u' || conv == 'x' || conv == 'X' || conv == 'o') {
      int n = 0;
      int limit = width > 0 && width < 70 ? width : 70;
      c = __teyro_src_get(in);
      if ((c == '-' || c == '+') && n < limit) {
        tok[n++] = (char)c;
        c = __teyro_src_get(in);
      }
      int base = conv == 'x' || conv == 'X' ? 16 : conv == 'o' ? 8 : 10;
      while (c != EOF && n < limit &&
             (isdigit(c) || (base == 16 && isxdigit(c)))) {
        if (base == 8 && c > '7')
          break;
        tok[n++] = (char)c;
        c = __teyro_src_get(in);
      }
      __teyro_src_unget(in, c);
      tok[n] = '\0';
      if (n == 0 || (n == 1 && (tok[0] == '-' || tok[0] == '+')))
        return assigned;
      v = 0;
      int neg = 0;
      const char *q = tok;
      if (*q == '-' || *q == '+')
        neg = *q++ == '-';
      for (; *q; ++q) {
        int d = isdigit((unsigned char)*q) ? *q - '0' : tolower((unsigned char)*q) - 'a' + 10;
        v = v * base + d;
      }
      if (neg)
        v = -v;
      if (!skip) {
        if (lng >= 2)
          { long long *dst = va_arg(ap, long long *); *dst = v; }
        else if (lng == 1)
          { long *dst = va_arg(ap, long *); *dst = (long)v; }
        else if (lng == -1)
          { short *dst = va_arg(ap, short *); *dst = (short)v; }
        else if (lng <= -2)
          { char *dst = va_arg(ap, char *); *dst = (char)v; }
        else
          { int *dst = va_arg(ap, int *); *dst = (int)v; }
        ++assigned;
      }
    } else if (conv == 'f' || conv == 'e' || conv == 'g' || conv == 'E' || conv == 'G' || conv == 'a') {
      int n = 0;
      int limit = width > 0 && width < 78 ? width : 78;
      int seenDot = 0, seenExp = 0, digits = 0;
      c = __teyro_src_get(in);
      if ((c == '-' || c == '+') && n < limit) {
        tok[n++] = (char)c;
        c = __teyro_src_get(in);
      }
      while (c != EOF && n < limit) {
        if (isdigit(c)) {
          ++digits;
        } else if (c == '.' && !seenDot && !seenExp) {
          seenDot = 1;
        } else if ((c == 'e' || c == 'E') && digits > 0 && !seenExp) {
          seenExp = 1;
          tok[n++] = (char)c;
          c = __teyro_src_get(in);
          if ((c == '-' || c == '+') && n < limit) {
            tok[n++] = (char)c;
            c = __teyro_src_get(in);
          }
          continue;
        } else {
          break;
        }
        tok[n++] = (char)c;
        c = __teyro_src_get(in);
      }
      __teyro_src_unget(in, c);
      tok[n] = '\0';
      if (digits == 0)
        return assigned;
      fv = strtod(tok, NULL);
      if (!skip) {
        if (lng >= 1)
          { double *dst = va_arg(ap, double *); *dst = fv; }
        else
          { float *dst = va_arg(ap, float *); *dst = (float)fv; }
        ++assigned;
      }
    } else {
      return assigned;
    }
  }
  return assigned;
}

int vfscanf(FILE *fp, const char *fmt, va_list ap) {
  __teyro_Src s;
  s.fp = fp;
  s.str = NULL;
  s.pos = 0;
  s.count = 0;
  return __teyro_vscan(&s, fmt, ap);
}

int vsscanf(const char *str, const char *fmt, va_list ap) {
  __teyro_Src s;
  s.fp = NULL;
  s.str = str;
  s.pos = 0;
  s.count = 0;
  return __teyro_vscan(&s, fmt, ap);
}

int vscanf(const char *fmt, va_list ap) {
  return vfscanf(stdin, fmt, ap);
}

int scanf(const char *fmt, ...) {
  va_list ap;
  va_start(ap, fmt);
  int r = vfscanf(stdin, fmt, ap);
  va_end(ap);
  return r;
}

int fscanf(FILE *fp, const char *fmt, ...) {
  va_list ap;
  va_start(ap, fmt);
  int r = vfscanf(fp, fmt, ap);
  va_end(ap);
  return r;
}

int sscanf(const char *str, const char *fmt, ...) {
  va_list ap;
  va_start(ap, fmt);
  int r = vsscanf(str, fmt, ap);
  va_end(ap);
  return r;
}

// ─── stdlib ──────────────────────────────────────────────────────────────

// The host (c-host.js) turns the digits into the nearest double, so scanf,
// atof and strtod round exactly like a real C library.
extern double _teyro_parse_double(const char *s, int len);

double strtod(const char *s, char **end) {
  const char *p = s;
  while (isspace((unsigned char)*p))
    ++p;
  const char *start = p;
  if (*p == '+' || *p == '-')
    ++p;
  const char *q = p;
  if (strncasecmp(q, "infinity", 8) == 0 || strncasecmp(q, "nan", 3) == 0 || strncasecmp(q, "inf", 3) == 0) {
    int n = strncasecmp(q, "infinity", 8) == 0 ? 8 : 3;
    if (end != NULL)
      *end = (char *)(q + n);
    return _teyro_parse_double(start, (int)(q + n - start));
  }
  int digits = 0;
  while (isdigit((unsigned char)*p)) {
    ++p;
    ++digits;
  }
  if (*p == '.') {
    ++p;
    while (isdigit((unsigned char)*p)) {
      ++p;
      ++digits;
    }
  }
  if (digits == 0) {
    if (end != NULL)
      *end = (char *)s;
    return 0;
  }
  if (*p == 'e' || *p == 'E') {
    const char *e = p + 1;
    if (*e == '+' || *e == '-')
      ++e;
    if (isdigit((unsigned char)*e)) {
      while (isdigit((unsigned char)*e))
        ++e;
      p = e;
    }
  }
  if (end != NULL)
    *end = (char *)p;
  return _teyro_parse_double(start, (int)(p - start));
}

static unsigned long long __teyro_strtoull(const char *s, char **end, int base, int *neg) {
  const char *p = s;
  while (isspace((unsigned char)*p))
    ++p;
  *neg = 0;
  if (*p == '+' || *p == '-')
    *neg = *p++ == '-';
  if ((base == 0 || base == 16) && p[0] == '0' && (p[1] == 'x' || p[1] == 'X') && isxdigit((unsigned char)p[2])) {
    p += 2;
    base = 16;
  } else if (base == 0) {
    base = p[0] == '0' ? 8 : 10;
  }
  unsigned long long v = 0;
  const char *first = p;
  for (;; ++p) {
    int c = (unsigned char)*p;
    int d = isdigit(c) ? c - '0' : isalpha(c) ? tolower(c) - 'a' + 10 : 99;
    if (d >= base)
      break;
    v = v * base + d;
  }
  if (end != NULL)
    *end = (char *)(p == first ? s : p);
  return v;
}

long strtol(const char *s, char **end, int base) {
  int neg;
  unsigned long long v = __teyro_strtoull(s, end, base, &neg);
  return neg ? -(long)v : (long)v;
}

unsigned long strtoul(const char *s, char **end, int base) {
  int neg;
  unsigned long long v = __teyro_strtoull(s, end, base, &neg);
  return neg ? -(unsigned long)v : (unsigned long)v;
}

long long strtoll(const char *s, char **end, int base) {
  int neg;
  unsigned long long v = __teyro_strtoull(s, end, base, &neg);
  return neg ? -(long long)v : (long long)v;
}

int atoi(const char *s) {
  return (int)strtol(s, NULL, 10);
}

long atol(const char *s) {
  return strtol(s, NULL, 10);
}

long long atoll(const char *s) {
  return strtoll(s, NULL, 10);
}

double atof(const char *s) {
  return strtod(s, NULL);
}

int abs(int x) {
  return x < 0 ? -x : x;
}

long labs(long x) {
  return x < 0 ? -x : x;
}

long long llabs(long long x) {
  return x < 0 ? -x : x;
}

// The C standard's own example rand(), so the same seed gives the same
// numbers everywhere Teyro runs it.
static unsigned long long __teyro_rand_next = 1;

int rand(void) {
  __teyro_rand_next = __teyro_rand_next * 1103515245 + 12345;
  return (int)((__teyro_rand_next / 65536) % 32768);
}

void srand(unsigned int seed) {
  __teyro_rand_next = seed;
}

// ─── ctype ───────────────────────────────────────────────────────────────

int islower(int c) {
  return 'a' <= c && c <= 'z';
}

int isupper(int c) {
  return 'A' <= c && c <= 'Z';
}

int isprint(int c) {
  return 0x20 <= c && c < 0x7f;
}

int isgraph(int c) {
  return 0x20 < c && c < 0x7f;
}

int iscntrl(int c) {
  return (0 <= c && c < 0x20) || c == 0x7f;
}

int ispunct(int c) {
  return isgraph(c) && !isalnum(c);
}

// ─── string ──────────────────────────────────────────────────────────────

static char *__teyro_strtok_save;

char *strtok(char *s, const char *delim) {
  if (s == NULL)
    s = __teyro_strtok_save;
  if (s == NULL)
    return NULL;
  while (*s != '\0' && strchr(delim, *s) != NULL)
    ++s;
  if (*s == '\0') {
    __teyro_strtok_save = NULL;
    return NULL;
  }
  char *start = s;
  while (*s != '\0' && strchr(delim, *s) == NULL)
    ++s;
  if (*s != '\0') {
    *s = '\0';
    __teyro_strtok_save = s + 1;
  } else {
    __teyro_strtok_save = NULL;
  }
  return start;
}

size_t strspn(const char *s, const char *accept) {
  size_t n = 0;
  while (s[n] != '\0' && strchr(accept, s[n]) != NULL)
    ++n;
  return n;
}

size_t strcspn(const char *s, const char *reject) {
  size_t n = 0;
  while (s[n] != '\0' && strchr(reject, s[n]) == NULL)
    ++n;
  return n;
}

// ─── math ────────────────────────────────────────────────────────────────

double round(double x) {
  return x < 0 ? -floor(-x + 0.5) : floor(x + 0.5);
}

double trunc(double x) {
  return x < 0 ? ceil(x) : floor(x);
}

double fmin(double a, double b) {
  return a < b ? a : b;
}

double fmax(double a, double b) {
  return a > b ? a : b;
}

double log10(double x) {
  return log(x) / 2.302585092994046;
}

double log2(double x) {
  return log(x) / 0.6931471805599453;
}

// ─── time ────────────────────────────────────────────────────────────────

// Seconds since 1970 from the host: fixed per run, so programs that seed
// rand() with time(NULL) still print the same thing every time they're checked.
extern int _teyro_time(void);

time_t time(time_t *t) {
  time_t now = _teyro_time();
  if (t != NULL)
    *t = now;
  return now;
}
