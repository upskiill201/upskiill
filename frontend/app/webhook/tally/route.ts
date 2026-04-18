import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize the Supabase Client with the hidden Service Role Key so it runs with admin backend privileges.
// This safely bypasses Row Level Security constraints for webhook writes.
export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const tallySigningSecret = process.env.TALLY_SIGNING_SECRET;

    if (!supabaseUrl || !supabaseServiceKey || !tallySigningSecret) {
      console.error('Missing required environment variables for Webhook');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Securely read the raw text stream for precise cryptographic hashing
    const rawBody = await request.text();
    const signature = request.headers.get('tally-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing Tally signature header' }, { status: 401 });
    }

    // Verify the payload came strictly from Tally and not a malicious source
    const calculatedSignature = crypto
      .createHmac('sha256', tallySigningSecret)
      .update(rawBody)
      .digest('base64');

    if (calculatedSignature !== signature) {
      console.error('[Tally Webhook] Invalid Webhook Signature Detected');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    if (payload.eventType !== 'FORM_RESPONSE') {
      return NextResponse.json({ message: 'Irrelevant event type' }, { status: 200 });
    }

    const { data } = payload;
    const fields: any[] = data?.fields || [];

    // Log the full fields for debugging in Vercel logs
    console.log('[Tally Webhook] Fields received:', JSON.stringify(
      fields.map(f => ({ type: f.type, label: f.label, value: f.value, hasOptions: !!f.options })),
      null, 2
    ));

    // --- EMAIL ---
    // Find the first INPUT_EMAIL field that has an actual non-empty value.
    // Tally includes ALL fields in the payload (including skipped branches) but with null values.
    // We must skip null/empty fields to find the one that was actually filled in.
    const emailField = fields.find((f) =>
      f.type === 'INPUT_EMAIL' &&
      f.value !== null && f.value !== undefined &&
      String(f.value).trim() !== ''
    ) ?? fields.find((f) =>
      typeof f.label === 'string' &&
      f.label.toLowerCase().includes('email') &&
      f.value !== null && f.value !== undefined &&
      String(f.value).trim() !== ''
    );
    const email = emailField ? String(emailField.value).trim() : 'unknown@noemail.com';

    // --- NAME ---
    // Find the first name-labeled field that has an actual value (not skipped by branching).
    const nameField = fields.find((f) =>
      typeof f.label === 'string' &&
      f.label.toLowerCase().includes('name') &&
      f.value !== null && f.value !== undefined &&
      String(f.value).trim() !== ''
    );
    const name = nameField ? String(nameField.value).trim() : null;

    // --- PHONE ---
    // Find any INPUT_PHONE_NUMBER type OR a field whose label includes 'phone'.
    // The "Instructor, What's your Phone Number?" label still contains 'phone' so this catches both flows.
    const phoneField = fields.find((f) =>
      (f.type === 'INPUT_PHONE_NUMBER' || (typeof f.label === 'string' && f.label.toLowerCase().includes('phone'))) &&
      f.value !== null && f.value !== undefined &&
      String(f.value).trim() !== ''
    );
    const phone = phoneField ? String(phoneField.value).trim() : null;

    // --- ROLE ---
    // Q1 "Who are you?" is ALWAYS the first MULTIPLE_CHOICE in the form.
    // This works for both Student and Instructor branches — branching only affects later questions.
    const roleField = fields.find((f) => f.type === 'MULTIPLE_CHOICE');
    let role: string | null = null;

    if (roleField) {
      if (Array.isArray(roleField.value) && Array.isArray(roleField.options)) {
        // Tally sends selected option IDs — resolve them to human-readable text
        const selectedIds: string[] = roleField.value;
        const resolvedTexts = roleField.options
          .filter((opt: any) => selectedIds.includes(opt.id))
          .map((opt: any) => opt.text);
        role = resolvedTexts.join(', ') || null;
      } else if (typeof roleField.value === 'string') {
        role = roleField.value;
      }
    }

    console.log(`[Tally Webhook] Extracted → email: ${email} | name: ${name} | phone: ${phone} | role: ${role}`);

    // ALWAYS insert — no submission should ever be silently dropped.
    // raw_data contains the COMPLETE Tally payload (all questions, all answers, nulls for skipped ones).
    const { error } = await supabase
      .from('Waitlist')
      .insert([{ email, name, phone, role, raw_data: data }]);

    if (error) {
      console.error('[Tally Webhook] Supabase Insert Error:', JSON.stringify(error));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('[Tally Webhook] Successfully captured lead:', email);
    return NextResponse.json({ success: true, message: 'Waitlist lead captured' }, { status: 200 });

  } catch (error) {
    console.error('[Tally Webhook] Unexpected Error:', error);
    return NextResponse.json({ error: 'Internal Server Error processing webhook' }, { status: 500 });
  }
}
