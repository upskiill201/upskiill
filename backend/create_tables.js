const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Creating tables if they do not exist...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SpinWheelSegment" (
          "id" TEXT NOT NULL,
          "segmentIndex" INTEGER NOT NULL,
          "rewardType" TEXT NOT NULL,
          "amountMin" INTEGER NOT NULL,
          "amountMax" INTEGER NOT NULL,
          "rarityTier" TEXT NOT NULL,
          "weight" INTEGER NOT NULL,
          "colorKey" TEXT NOT NULL,
          "active" BOOLEAN NOT NULL DEFAULT true,

          CONSTRAINT "SpinWheelSegment_pkey" PRIMARY KEY ("id")
      );
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "SpinWheelSegment_segmentIndex_key" ON "SpinWheelSegment"("segmentIndex");
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "WeeklySpin" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "weekStart" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
          "spunAt" TIMESTAMP(3),
          "landedSegmentIndex" INTEGER,
          "rewardSnapshotType" TEXT,
          "rewardSnapshotAmount" INTEGER,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,

          CONSTRAINT "WeeklySpin_pkey" PRIMARY KEY ("id")
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "WeeklySpin_userId_weekStart_key" ON "WeeklySpin"("userId", "weekStart");
    `);

    // Add foreign key if not exists (using DO block to prevent error if exists)
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'WeeklySpin_userId_fkey') THEN
              ALTER TABLE "WeeklySpin" ADD CONSTRAINT "WeeklySpin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
          END IF;
      END $$;
    `);

    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
