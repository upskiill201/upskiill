/**
 * One-off diagnostic for the earnings 500.
 *  1. Probes the DB with a FRESH prisma client (disk truth).
 *  2. Mints a session token for a creator and calls the RUNNING server on
 *     :3001 — whatever it answers with is exactly what the browser sees.
 * Run from backend/: node scripts/diagnose-earnings-500.js
 */
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'super-secret-upskiill-key-2024';

async function main() {
  /* ── 1. fresh-client DB probe ── */
  const prisma = new PrismaClient();
  let creator = null;
  try {
    const counts = {
      tx: await prisma.earningsTransaction.count(),
      payouts: await prisma.creatorPayout.count(),
      agreements: await prisma.creatorEarningsAgreement.count(),
    };
    console.log('FRESH_CLIENT_PROBE_OK', JSON.stringify(counts));
    creator = await prisma.user.findFirst({
      where: { OR: [{ hasCreatorAccess: true }, { role: 'INSTRUCTOR' }, { role: 'ADMIN' }] },
      select: { id: true, email: true },
    });
    if (!creator) creator = await prisma.user.findFirst({ select: { id: true, email: true } });
  } catch (e) {
    console.error('FRESH_CLIENT_PROBE_FAIL:', String(e.message ?? e).slice(0, 400));
  } finally {
    await prisma.$disconnect();
  }
  if (!creator) { console.error('NO_USER_FOUND'); return; }

  /* ── 2. authenticated call against the running server ── */
  const token = jwt.sign({ sub: creator.id, email: creator.email }, SECRET, { expiresIn: '5m' });
  console.log(`CALLING as ${creator.email} (${creator.id})`);
  try {
    const res = await fetch('http://localhost:3001/earnings/summary', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const text = await res.text();
    console.log('HTTP_STATUS', res.status);
    console.log('BODY', text.slice(0, 600));
  } catch (e) {
    console.error('FETCH_FAIL (server down or port blocked?):', String(e.cause?.code ?? e.message).slice(0, 200));
  }
}

main();
