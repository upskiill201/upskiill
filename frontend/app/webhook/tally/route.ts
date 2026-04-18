import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// ─── Helper: extract a plain text / email / phone answer by Tally field type ──
function extractByType(fields: any[], type: string): string | null {
  const field = fields.find(
    (f) =>
      f.type === type &&
      f.value !== null &&
      f.value !== undefined &&
      String(f.value).trim() !== ''
  );
  return field ? String(field.value).trim() : null;
}

// ─── Helper: extract the human-readable answer for a MULTIPLE_CHOICE /
//     DROPDOWN field — resolves selected option IDs → option text ─────────────
function extractChoice(fields: any[], labelFragment: string): string | null {
  const field = fields.find(
    (f) =>
      typeof f.label === 'string' &&
      f.label.toLowerCase().includes(labelFragment.toLowerCase()) &&
      Array.isArray(f.value) &&
      f.value.length > 0 &&
      Array.isArray(f.options)
  );
  if (!field) return null;
  const texts = field.options
    .filter((opt: any) => field.value.includes(opt.id))
    .map((opt: any) => opt.text);
  return texts.length > 0 ? texts.join(', ') : null;
}

// ─── Helper: extract a plain text field by partial label match ────────────────
function extractByLabel(fields: any[], labelFragment: string): string | null {
  const field = fields.find(
    (f) =>
      typeof f.label === 'string' &&
      f.label.toLowerCase().includes(labelFragment.toLowerCase()) &&
      f.value !== null &&
      f.value !== undefined &&
      String(f.value).trim() !== ''
  );
  return field ? String(field.value).trim() : null;
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const tallySigningSecret = process.env.TALLY_SIGNING_SECRET;

    if (!supabaseUrl || !supabaseServiceKey || !tallySigningSecret) {
      console.error('[Tally Webhook] Missing required environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // ─── Verify the request came from Tally ───────────────────────────────────
    const rawBody = await request.text();
    const signature = request.headers.get('tally-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing Tally signature header' }, { status: 401 });
    }

    const calculatedSignature = crypto
      .createHmac('sha256', tallySigningSecret)
      .update(rawBody)
      .digest('base64');

    if (calculatedSignature !== signature) {
      console.error('[Tally Webhook] Invalid signature — request rejected');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    if (payload.eventType !== 'FORM_RESPONSE') {
      return NextResponse.json({ message: 'Not a form response event' }, { status: 200 });
    }

    const { data } = payload;
    const fields: any[] = data?.fields || [];

    // ─── Debug: log all incoming fields so we can see what Tally sends ────────
    console.log(
      '[Tally Webhook] Incoming fields:',
      JSON.stringify(
        fields.map((f) => ({ type: f.type, label: f.label, value: f.value })),
        null,
        2
      )
    );

    // ─── Q1: What's Your Name? ────────────────────────────────────────────────
    // Type-first (INPUT_TEXT), fallback to label search
    const name =
      extractByLabel(fields, "what's your name") ??
      extractByLabel(fields, 'your name') ??
      extractByType(fields, 'INPUT_TEXT');

    // ─── Q2: What's your email? ───────────────────────────────────────────────
    // Type-first (INPUT_EMAIL) is the most reliable
    const email =
      extractByType(fields, 'INPUT_EMAIL') ??
      extractByLabel(fields, 'email');
    // NOTE: null if not provided — no fake fallback address

    // ─── Q3: What's Your Phone Number? ───────────────────────────────────────
    // Type-first (INPUT_PHONE_NUMBER)
    const phone =
      extractByType(fields, 'INPUT_PHONE_NUMBER') ??
      extractByLabel(fields, 'phone');

    // ─── Q4: How did you hear about Teyro? ───────────────────────────────────
    // Tally renders this as MULTIPLE_CHOICE or DROPDOWN; resolve option IDs → text
    const discovery_channel =
      extractChoice(fields, 'how did you hear') ??
      extractByLabel(fields, 'how did you hear');

    // ─── Q5: Who are you? ─────────────────────────────────────────────────────
    // Role selection — MULTIPLE_CHOICE; resolve option IDs → text
    const role =
      extractChoice(fields, 'who are you') ??
      extractByLabel(fields, 'who are you');

    console.log(
      `[Tally Webhook] Mapped → name: "${name}" | email: "${email}" | phone: "${phone}" | discovery: "${discovery_channel}" | role: "${role}"`
    );

    // ─── INSERT into Supabase — null for any unanswered question ─────────────
    const { error } = await supabase.from('Waitlist').insert([
      {
        name:               name               ?? null,
        email:              email              ?? null,
        phone:              phone              ?? null,
        discovery_channel:  discovery_channel  ?? null,
        role:               role               ?? null,
        raw_data:           data,                        // full payload always saved
      },
    ]);

    if (error) {
      console.error('[Tally Webhook] Supabase Insert Error:', JSON.stringify(error));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`[Tally Webhook] ✅ Lead captured — email: ${email ?? 'N/A'} | role: ${role ?? 'N/A'}`);
    return NextResponse.json({ success: true, message: 'Waitlist lead captured' }, { status: 200 });

  } catch (err) {
    console.error('[Tally Webhook] Unexpected Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
