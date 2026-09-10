-- CreateEnum
CREATE TYPE "AccessPlan" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY', 'LIFETIME');

-- CreateEnum
CREATE TYPE "AccessStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED');

-- CreateTable
CREATE TABLE "course_access_entitlements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "plan" "AccessPlan" NOT NULL DEFAULT 'MONTHLY',
    "status" "AccessStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "stripeSubscriptionId" TEXT,
    "stripeCustomerId" TEXT,
    "pricePaid" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_access_entitlements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_access_entitlements_userId_courseId_key" ON "course_access_entitlements"("userId", "courseId");

-- CreateIndex
CREATE INDEX "course_access_entitlements_userId_courseId_status_expiresAt_idx" ON "course_access_entitlements"("userId", "courseId", "status", "expiresAt");

-- AddForeignKey
ALTER TABLE "course_access_entitlements" ADD CONSTRAINT "course_access_entitlements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_access_entitlements" ADD CONSTRAINT "course_access_entitlements_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
