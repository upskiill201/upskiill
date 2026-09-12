-- Type: ADDITIVE ONLY
-- Coupons & Discounts: creator-owned promo codes for the subscription unlock
-- flow (Weekly/Monthly/Yearly). See backend/src/coupons/ for the engine that
-- reads/writes these tables. No existing table is altered by this migration.

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "CouponDiscountType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "CouponRedemptionOutcome" AS ENUM ('APPLIED', 'REFUNDED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "CouponState" AS ENUM ('SCHEDULED', 'ACTIVE', 'PAUSED', 'DISABLED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "coupons" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "internalName" TEXT,
    "discountType" "CouponDiscountType" NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "state" "CouponState" NOT NULL DEFAULT 'ACTIVE',
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "maxRedemptions" INTEGER,
    "successfulRedemptions" INTEGER NOT NULL DEFAULT 0,
    "firstPaymentOnly" BOOLEAN NOT NULL DEFAULT true,
    "disabledByAdminId" TEXT,
    "disabledReason" TEXT,
    "disabledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "coupons_code_key" ON "coupons"("code");
CREATE INDEX IF NOT EXISTS "coupons_creatorId_idx" ON "coupons"("creatorId");
CREATE INDEX IF NOT EXISTS "coupons_state_idx" ON "coupons"("state");

-- CreateTable
CREATE TABLE IF NOT EXISTS "coupon_courses" (
    "id" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "coupon_courses_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "coupon_courses_couponId_courseId_key" ON "coupon_courses"("couponId", "courseId");
CREATE INDEX IF NOT EXISTS "coupon_courses_courseId_idx" ON "coupon_courses"("courseId");

-- CreateTable
CREATE TABLE IF NOT EXISTS "coupon_plans" (
    "id" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,
    "plan" "AccessPlan" NOT NULL,

    CONSTRAINT "coupon_plans_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "coupon_plans_couponId_plan_key" ON "coupon_plans"("couponId", "plan");

-- CreateTable
CREATE TABLE IF NOT EXISTS "coupon_redemptions" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "plan" "AccessPlan" NOT NULL,
    "couponCodeSnapshot" TEXT NOT NULL,
    "discountTypeSnapshot" "CouponDiscountType" NOT NULL,
    "discountValueSnapshot" DOUBLE PRECISION NOT NULL,
    "originalPriceUsd" DOUBLE PRECISION NOT NULL,
    "discountAmountUsd" DOUBLE PRECISION NOT NULL,
    "finalPriceUsd" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "creatorSharePctSnapshot" INTEGER NOT NULL,
    "orderId" TEXT,
    "earningsTransactionId" TEXT,
    "courseSubscriptionId" TEXT,
    "provider" "PaymentProviderType" NOT NULL,
    "providerReference" TEXT NOT NULL,
    "outcome" "CouponRedemptionOutcome" NOT NULL DEFAULT 'APPLIED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupon_redemptions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "coupon_redemptions_publicId_key" ON "coupon_redemptions"("publicId");
CREATE UNIQUE INDEX IF NOT EXISTS "coupon_redemptions_provider_providerReference_key" ON "coupon_redemptions"("provider", "providerReference");
CREATE INDEX IF NOT EXISTS "coupon_redemptions_couponId_idx" ON "coupon_redemptions"("couponId");
CREATE INDEX IF NOT EXISTS "coupon_redemptions_userId_idx" ON "coupon_redemptions"("userId");

-- CreateTable
CREATE TABLE IF NOT EXISTS "platform_settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "couponsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "maxDiscountPercent" INTEGER NOT NULL DEFAULT 80,
    "maxActiveCouponsPerCreator" INTEGER NOT NULL DEFAULT 20,
    "allowFixedAmountDiscounts" BOOLEAN NOT NULL DEFAULT true,
    "allowUnlimitedRedemptions" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedByAdminId" TEXT,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey (guarded — plain ADD CONSTRAINT has no IF NOT EXISTS in Postgres)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'coupons_creatorId_fkey') THEN
    ALTER TABLE "coupons" ADD CONSTRAINT "coupons_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'coupon_courses_couponId_fkey') THEN
    ALTER TABLE "coupon_courses" ADD CONSTRAINT "coupon_courses_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'coupon_courses_courseId_fkey') THEN
    ALTER TABLE "coupon_courses" ADD CONSTRAINT "coupon_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'coupon_plans_couponId_fkey') THEN
    ALTER TABLE "coupon_plans" ADD CONSTRAINT "coupon_plans_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'coupon_redemptions_couponId_fkey') THEN
    ALTER TABLE "coupon_redemptions" ADD CONSTRAINT "coupon_redemptions_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

-- Rollback SQL (manual):
-- DROP TABLE IF EXISTS "coupon_redemptions";
-- DROP TABLE IF EXISTS "coupon_plans";
-- DROP TABLE IF EXISTS "coupon_courses";
-- DROP TABLE IF EXISTS "coupons";
-- DROP TABLE IF EXISTS "platform_settings";
-- DROP TYPE IF EXISTS "CouponState";
-- DROP TYPE IF EXISTS "CouponRedemptionOutcome";
-- DROP TYPE IF EXISTS "CouponDiscountType";
