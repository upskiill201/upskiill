-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED', 'LOCKED', 'DELETED');

-- AlterTable
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "accountStatus" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN IF NOT EXISTS "emailVerifiedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "lastLoginAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "lastActiveAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "loginCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS "accountLockedUntil" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "User_accountStatus_role_idx" ON "User"("accountStatus", "role");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "User_createdAt_role_idx" ON "User"("createdAt", "role");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "User_lastLoginAt_idx" ON "User"("lastLoginAt");
