const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to db...');
  const res = await prisma.whatsappAuthStore.findFirst();
  console.log('Result:', !!res);
}

main().catch(console.error).finally(() => prisma.$disconnect());
