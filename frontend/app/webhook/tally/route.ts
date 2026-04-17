import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize the Supabase Client with the hidden Service Role Key so it runs with admin backend privileges.
// This safely bypasses Row Level Security constraints for webhook writes.
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const tallySigningSecret = process.env.TALLY_SIGNING_SECRET!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    // securely read the raw text stream for precise cryptographic hashing
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
      console.error('Invalid Webhook Signature Detected');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Since it's securely verified, parse the JSON
    const payload = JSON.parse(rawBody);

    // Ensure it's a valid form submission event
    if (payload.eventType !== 'FORM_RESPONSE') {
      return NextResponse.json({ message: 'Irrelevant event type' }, { status: 200 });
    }

    const { data } = payload;
    const fields: any[] = data.fields || [];

    // Dynamically search Tally fields for the email input
    const emailField = fields.find((f) => f.type === 'INPUT_EMAIL');
    const email = emailField ? emailField.value : 'unknown@noemail.com';

    // Heuristic extraction for Name (hunts for 'name' in the question label)
    const nameField = fields.find((f) => typeof f.label === 'string' && f.label.toLowerCase().includes('name'));
    const name = nameField ? String(nameField.value) : null;

    // Heuristic extraction for Role (hunts for 'role', 'student', or 'instructor' context)
    const roleField = fields.find((f) => typeof f.label === 'string' && (f.label.toLowerCase().includes('role') || f.label.toLowerCase().includes('who are you') || f.label.toLowerCase().includes('which best describes')));
    let role = roleField ? String(roleField.value) : null;

    // If Tally passes an array of ID options, we try to extract the literal text
    if (roleField && Array.isArray(roleField.value) && Array.isArray(roleField.options)) {
      const selected = roleField.options.find((opt: any) => roleField.value.includes(opt.id));
      if (selected && selected.text) role = selected.text;
    }

    // Insert the lead into the database securely with all extracted top-level columns
    const { error } = await supabase
      .from('Waitlist')
      .insert([
        {
          email: email,
          name: name,
          role: role,
          raw_data: data // Always save raw fallback data just in case
        }
      ]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Waitlist lead captured' }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error processing webhook' }, { status: 500 });
  }
}
