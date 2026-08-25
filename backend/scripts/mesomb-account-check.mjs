/**
 * One-shot read-only MeSomb account check — NO payment is collected.
 * Calls getStatus() (the same read-only endpoint the app's
 * getAccountCountries() uses) and prints the account's supported
 * countries/services so the operator registry can be marked verified.
 *
 * Usage: node scripts/mesomb-account-check.mjs   (from backend/)
 */
import { readFileSync } from 'node:fs';
import { PaymentOperation } from '@hachther/mesomb';

// Minimal .env loader (dotenv isn't a backend dependency — Nest loads env itself).
for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) {
    process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const { MESOMB_APP_KEY, MESOMB_ACCESS_KEY, MESOMB_SECRET_KEY } = process.env;
if (!MESOMB_APP_KEY || !MESOMB_ACCESS_KEY || !MESOMB_SECRET_KEY) {
  console.error('MISSING: set MESOMB_APP_KEY / MESOMB_ACCESS_KEY / MESOMB_SECRET_KEY in backend/.env first.');
  process.exit(1);
}

const client = new PaymentOperation({
  applicationKey: MESOMB_APP_KEY,
  accessKey: MESOMB_ACCESS_KEY,
  secretKey: MESOMB_SECRET_KEY,
});

try {
  const status = await Promise.race([
    client.getStatus(),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout after 10s')), 10000)),
  ]);
  console.log('✅ Account reachable. Raw status:');
  console.log(JSON.stringify(status, null, 2));
  const countries = Array.isArray(status?.countries) ? status.countries.map(String) : [];
  const services = Array.isArray(status?.services) ? status.services.map(String) : [];
  console.log('\n── Summary ──');
  console.log('countries:', countries.join(', ') || '(none reported)');
  console.log('services :', services.join(', ') || '(none reported)');
} catch (err) {
  console.error('❌ getStatus failed:', err.message);
  console.error('(If 401/403: the keys in backend/.env are wrong or the account is inactive.');
  console.error(' If timeout: network/DNS issue, or the MeSomb API is down.)');
  process.exit(1);
}
