const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  const users = await prisma.user.findMany();
  console.log('Users in DB:', users.length);
  console.log(users);
}
checkData().catch(console.error).finally(() => prisma.$disconnect());
