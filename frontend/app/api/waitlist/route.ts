import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { WAITLIST_ROLES, type WaitlistRole } from '@/lib/launch';

/**
 * POST /api/waitlist — the notify-me form on the homepage and /teach.
 *
 * Writes to the same Supabase `Waitlist` table the old Tally form fed
 * (app/webhook/tally), so the count and the list stay in one place. Server-only
 * service key; the browser never sees it.
 *
 * Deliberately boring and defensive: it is a public, unauthenticated endpoint.
 *   - strict validation, a hidden honeypot field, and a small per-IP limit
 *   - the same `{ ok: true }` whether or not the email was already on the list
 *     (so it can't be used to check who has signed up)
 *   - email addresses are never written to logs
 */
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMIT = 6; // attempts
const WINDOW_MS = 10 * 60 * 1000;

// Best-effort limiter: per server instance, which is enough to blunt a script
// hammering one endpoint without needing another datastore.
const hits = new Map<string, { n: number; t: number }>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    if (hits.size > 5000) for (const [k, v] of hits) if (now - v.t > WINDOW_MS) hits.delete(k);
    return false;
  }
  rec.n += 1;
  return rec.n > LIMIT;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (tooMany(ip)) {
    return NextResponse.json({ error: 'Too many tries. Please wait a few minutes.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real people never see this field. Pretend it worked.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  const role = body.role as WaitlistRole;
  if (!WAITLIST_ROLES.includes(role)) {
    return NextResponse.json({ error: 'Please choose learner or creator.' }, { status: 400 });
  }
  const source = typeof body.source === 'string' ? body.source.slice(0, 40) : 'site';

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('[waitlist] Supabase env vars are not set');
    return NextResponse.json({ error: 'Sign-ups are unavailable right now. Please try again soon.' }, { status: 503 });
  }

  try {
    const supabase = createClient(url, key);

    const { data: existing, error: lookupError } = await supabase
      .from('Waitlist')
      .select('id')
      .eq('email', email)
      .eq('role', role)
      .limit(1);
    if (lookupError) throw lookupError;

    if (!existing || existing.length === 0) {
      const { error } = await supabase.from('Waitlist').insert([
        {
          name: null,
          email,
          phone: null,
          discovery_channel: `teyro.app:${source}`,
          role,
          raw_data: { via: 'site-form', source, role },
        },
      ]);
      if (error) throw error;
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[waitlist] save failed:', err instanceof Error ? err.message : 'unknown error');
    return NextResponse.json({ error: 'Something went wrong on our side. Please try again.' }, { status: 503 });
  }
}
