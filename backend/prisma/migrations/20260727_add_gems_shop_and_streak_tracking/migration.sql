-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN IF NOT EXISTS "gems" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN IF NOT EXISTS "longestStreak" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN IF NOT EXISTS "lastLessonCompletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE IF NOT EXISTS "gem_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gem_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "shop_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "cost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shop_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "gem_transactions_userId_idx" ON "gem_transactions"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "shop_transactions_userId_idx" ON "shop_transactions"("userId");

-- AddForeignKey
ALTER TABLE "gem_transactions" ADD CONSTRAINT "gem_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_transactions" ADD CONSTRAINT "shop_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
