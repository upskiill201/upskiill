const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  try {
    const sqlPath = path.join(__dirname, 'prisma/migrations/20260729_add_lucky_spin_segments/migration.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Running wheel segments insertion...');
    await prisma.$executeRawUnsafe(sql);
    console.log('Successfully inserted wheel segments!');
  } catch (err) {
    console.error('Error inserting segments:', err);
  } finally {
    await prisma.$disconnect();
  }
}
main();
