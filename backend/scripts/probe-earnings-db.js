/**
 * One-off diagnostic: does the ON-DISK prisma client see the earnings tables?
 * Run with the dev servers STOPPED for a clean verdict:
 *   node scripts/probe-earnings-db.js
 */
const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  try {
    const txCount = await prisma.earningsTransaction.count();
    const payoutCount = await prisma.creatorPayout.count();
    const methodCount = await prisma.creatorPayoutMethod.count();
    const agreementCount = await prisma.creatorEarningsAgreement.count();
    const auditCount = await prisma.earningsAuditLog.count();
    console.log('PROBE_OK');
    console.log(JSON.stringify({
      earningsTransactions: txCount,
      creatorPayouts: payoutCount,
      payoutMethods: methodCount,
      agreements: agreementCount,
      auditLogs: auditCount,
    }));
  } catch (err) {
    console.error('PROBE_FAIL:', err.message?.slice(0, 300));
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
