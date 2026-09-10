import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  try {
    console.log('Testing DailyMissionSet table...');
    const count = await prisma.dailyMissionSet.count();
    console.log('DailyMissionSet count:', count);
  } catch (err: any) {
    console.error('Database query error:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
