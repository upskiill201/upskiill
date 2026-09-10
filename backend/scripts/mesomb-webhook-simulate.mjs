/**
 * Simulate a signed MeSomb webhook — lets you verify the ENTIRE server-side
 * webhook path (signature verification → payload parse → access grant)
 * WITHOUT moving any money.
 *
 * It reads MESOMB_WEBHOOK_SECRET from backend/.env, signs a SUCCESS payload
 * exactly like MeSomb does (HMAC-SHA256 over "<ts>.<raw body>", sent in
 * X-MeSomb-Webhook-Signature), and POSTs it to the URL you pass.
 *
 * Usage (from backend/):
 *   node scripts/mesomb-webhook-simulate.mjs <webhookUrl> <userId> <courseId> [plan]
 *   e.g.
 *   node scripts/mesomb-webhook-simulate.mjs \
 *     https://teyro-backend.onrender.com/api/v1/payment/mesomb/webhook \
 *     <your-real-user-id> <a-real-course-id> MONTHLY
 *
 * With your REAL user id + a real course id this mints a real entitlement
 * (a free unlock — it's your own platform). Use a junk userId instead to
 * test only signature verification + delivery (you'll see a logged grant
 * failure server-side but a 200 response).
 */
import { readFileSync } from 'node:fs';
import crypto from 'node:crypto';

// Minimal .env loader (dotenv isn't a backend dependency).
for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) {
    process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const [url, userId, courseId, plan = 'MONTHLY'] = process.argv.slice(2);
const secret = process.env.MESOMB_WEBHOOK_SECRET;

if (!url || !userId || !courseId) {
  console.error('Usage: node scripts/mesomb-webhook-simulate.mjs <webhookUrl> <userId> <courseId> [plan=MONTHLY]');
  process.exit(1);
}
if (!secret) {
  console.error('MESOMB_WEBHOOK_SECRET is not set in backend/.env — nothing to sign with.');
  process.exit(1);
}

const payload = JSON.stringify({
  status: 'SUCCESS',
  pk: `sim_${crypto.randomBytes(6).toString('hex')}`, // unique → idempotency ledger won't dedupe
  amount: 600, // 1 USD worth of XAF at the default rate
  reference: JSON.stringify({ userId, courseId, plan, ccy: 'XAF', rate: 600 }),
});

const timestamp = Math.floor(Date.now() / 1000);
const signature = crypto
  .createHmac('sha256', secret)
  .update(`${timestamp}.`)
  .update(payload)
  .digest('hex');

const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-MeSomb-Webhook-Signature': `t=${timestamp},v1=${signature}`,
  },
  body: payload,
});

const text = await res.text();
console.log(`HTTP ${res.status} ${res.statusText}`);
console.log(text || '(empty body)');
if (res.status === 200 || res.status === 201) {
  console.log('\n✅ Signature verified and payload accepted. If you used a real userId + courseId, check that the course is now unlocked for that user.');
} else if (res.status === 400) {
  console.log('\n❌ Signature REJECTED — check that MESOMB_WEBHOOK_SECRET on the server matches the endpoint signing secret from the MeSomb dashboard.');
} else {
  console.log('\n⚠️ Unexpected response — check the server logs.');
}
